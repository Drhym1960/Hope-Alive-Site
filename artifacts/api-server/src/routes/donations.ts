import { Router, Request, Response } from "express";
import { db, donationsTable } from "@workspace/db";
import { CreateDonationBody, CreateStripeSessionBody, VerifyStripePaymentBody, CreateKorapayChargeBody } from "@workspace/api-zod";
import { eq, desc, count, sql } from "drizzle-orm";
import { sendAdminDonationNotification, sendDonorReceipt } from "../lib/email";

export const donationsRouter = Router();

// Diagnostic endpoint: hits KoraPay with a minimal known-good test payload
// using the configured key, and returns whatever KoraPay says verbatim.
// Hit this on the live site to verify the deployed key + connectivity.
donationsRouter.get("/korapay-diagnose", async (req: Request, res: Response) => {
  const koraKey = process.env["KORAPAY_SECRET_KEY"];
  const keyInfo = koraKey
    ? {
        present: true,
        length: koraKey.length,
        prefix: koraKey.slice(0, 8),
        looksLikeTest: koraKey.startsWith("sk_test"),
        looksLikeLive: koraKey.startsWith("sk_live"),
      }
    : { present: false };

  if (!koraKey) {
    res.json({ keyInfo, note: "KORAPAY_SECRET_KEY is NOT set on this server." });
    return;
  }

  const testPayload = {
    amount: 100,
    currency: "NGN",
    reference: `DIAG${Date.now()}`,
    redirect_url: "https://example.com/thank-you",
    customer: { name: "Diagnose User", email: "diagnose@example.com" },
    narration: "diagnostic ping",
  };

  try {
    const r = await fetch("https://api.korapay.com/merchant/api/v1/charges/initialize", {
      method: "POST",
      headers: { Authorization: `Bearer ${koraKey}`, "Content-Type": "application/json" },
      body: JSON.stringify(testPayload),
    });
    const body = await r.text();
    res.json({ keyInfo, korapayHttpStatus: r.status, korapayBody: body, sentPayload: testPayload });
  } catch (err: any) {
    res.json({ keyInfo, error: String(err?.message ?? err) });
  }
});

function getPublicBaseUrl(req: Request): string {
  const explicit = process.env["PUBLIC_BASE_URL"];
  if (explicit) return explicit.replace(/\/$/, "");
  const replitDomain = process.env["REPLIT_DOMAINS"]?.split(",")[0];
  if (replitDomain) return `https://${replitDomain}`;
  const forwardedHost = (req.headers["x-forwarded-host"] as string | undefined) || req.headers.host;
  // On Render/most prod hosts the public site is always HTTPS; force https in production.
  const isProd = process.env["NODE_ENV"] === "production";
  const forwardedProto = isProd
    ? "https"
    : ((req.headers["x-forwarded-proto"] as string | undefined) || (req.secure ? "https" : "http"));
  if (forwardedHost) return `${forwardedProto}://${forwardedHost}`;
  return "http://localhost:80";
}

donationsRouter.post("/", async (req: Request, res: Response) => {
  const parse = CreateDonationBody.safeParse(req.body);
  if (!parse.success) {
    res.status(400).json({ error: "Validation error", details: parse.error.issues });
    return;
  }

  const data = parse.data;

  try {
    const [donation] = await db.insert(donationsTable).values({
      donorName: data.donorName ?? null,
      donorEmail: data.donorEmail ?? null,
      donorPhone: data.donorPhone ?? null,
      amount: String(data.amount),
      currency: data.currency ?? "NGN",
      paymentMethod: data.paymentMethod,
      paymentStatus: "completed",
      transactionId: data.transactionId ?? null,
      purpose: data.purpose ?? null,
      isAnonymous: data.isAnonymous ?? false,
    }).returning();

    sendAdminDonationNotification(donation).catch(() => {});
    sendDonorReceipt(donation).catch(() => {});

    res.status(201).json(formatDonation(donation));
  } catch (err) {
    req.log.error({ err }, "Failed to create donation");
    res.status(500).json({ error: "Failed to create donation" });
  }
});

donationsRouter.post("/create-stripe-session", async (req: Request, res: Response) => {
  const parse = CreateStripeSessionBody.safeParse(req.body);
  if (!parse.success) {
    res.status(400).json({ error: "Validation error" });
    return;
  }

  const stripeKey = process.env["STRIPE_SECRET_KEY"];
  if (!stripeKey) {
    res.status(503).json({ error: "Stripe is not configured yet. Please use bank transfer or contact us." });
    return;
  }

  const { default: Stripe } = await import("stripe");
  const stripe = new Stripe(stripeKey);

  const data = parse.data;
  const stripeCurrency = (data.currency ?? "GBP").toLowerCase();
  const amountCents = Math.round(data.amount * 100);
  const method = (data.method ?? "card") === "paypal" ? "paypal" : "card";
  const paymentMethodTypes: ("card" | "paypal")[] = method === "paypal" ? ["paypal"] : ["card"];

  const baseUrl = getPublicBaseUrl(req);

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: paymentMethodTypes,
      customer_email: data.donorEmail ?? undefined,
      line_items: [
        {
          price_data: {
            currency: stripeCurrency,
            product_data: {
              name: "Donation to Hope Alive Children Spring Foundation",
              description: data.purpose || "Supporting orphans and vulnerable children",
            },
            unit_amount: amountCents,
          },
          quantity: 1,
        },
      ],
      metadata: {
        donorName: data.donorName ?? "",
        donorPhone: data.donorPhone ?? "",
        purpose: data.purpose ?? "",
        isAnonymous: String(data.isAnonymous ?? false),
      },
      success_url: `${baseUrl}/donate/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/donate`,
    });

    res.json({ sessionId: session.id, url: session.url });
  } catch (err) {
    req.log.error({ err }, "Stripe session creation failed");
    res.status(500).json({ error: "Failed to create payment session" });
  }
});

donationsRouter.post("/verify-stripe", async (req: Request, res: Response) => {
  const parse = VerifyStripePaymentBody.safeParse(req.body);
  if (!parse.success) {
    res.status(400).json({ error: "Validation error" });
    return;
  }

  const stripeKey = process.env["STRIPE_SECRET_KEY"];
  if (!stripeKey) {
    res.status(503).json({ error: "Stripe not configured" });
    return;
  }

  const { default: Stripe } = await import("stripe");
  const stripe = new Stripe(stripeKey);

  try {
    const session = await stripe.checkout.sessions.retrieve(parse.data.sessionId);

    if (session.payment_status !== "paid") {
      res.status(400).json({ error: "Payment not completed" });
      return;
    }

    const existing = await db.select().from(donationsTable)
      .where(eq(donationsTable.stripeSessionId, session.id))
      .limit(1);

    if (existing.length > 0) {
      res.json(formatDonation(existing[0]));
      return;
    }

    const meta = session.metadata ?? {};
    const paidAmount = (session.amount_total ?? 0) / 100;
    const paidCurrency = (session.currency ?? "gbp").toUpperCase();

    const [donation] = await db.insert(donationsTable).values({
      donorName: meta.donorName || null,
      donorEmail: session.customer_email || null,
      donorPhone: meta.donorPhone || null,
      amount: String(paidAmount),
      currency: paidCurrency,
      paymentMethod: (session.payment_method_types?.[0] === "paypal") ? "paypal" : "stripe",
      paymentStatus: "completed",
      transactionId: session.payment_intent as string | null,
      purpose: meta.purpose || null,
      isAnonymous: meta.isAnonymous === "true",
      stripeSessionId: session.id,
    }).returning();

    sendAdminDonationNotification(donation).catch(() => {});
    sendDonorReceipt(donation).catch(() => {});

    res.json(formatDonation(donation));
  } catch (err) {
    req.log.error({ err }, "Stripe verification failed");
    res.status(500).json({ error: "Failed to verify payment" });
  }
});

donationsRouter.post("/create-korapay-charge", async (req: Request, res: Response) => {
  const parse = CreateKorapayChargeBody.safeParse(req.body);
  if (!parse.success) {
    res.status(400).json({ error: "Validation error", details: parse.error.issues });
    return;
  }

  const koraKey = process.env["KORAPAY_SECRET_KEY"];
  if (!koraKey) {
    res.status(503).json({ error: "KoraPay is not configured yet. Please use bank transfer or Stripe." });
    return;
  }

  const data = parse.data;
  // KoraPay requires alphanumeric/underscore-only references
  const reference = `HACS_${Date.now()}_${Math.floor(Math.random() * 1000000)}`;
  const baseUrl = getPublicBaseUrl(req);

  // KoraPay requires a valid email and a non-empty customer name.
  if (!data.donorEmail || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.donorEmail)) {
    res.status(400).json({ error: "A valid email address is required to pay online with KoraPay." });
    return;
  }

  const customerName = (data.isAnonymous ? "Anonymous Donor" : (data.donorName || "Donor")).slice(0, 60);
  // KoraPay narration field has a 30-char maximum.
  const narration = (data.purpose || "HACS donation").slice(0, 30);

  // Build metadata, dropping empty/undefined values (KoraPay rejects empty strings).
  const metadataEntries: Array<[string, string]> = [];
  if (data.donorPhone) metadataEntries.push(["donorPhone", String(data.donorPhone).slice(0, 50)]);
  if (data.purpose) metadataEntries.push(["purpose", String(data.purpose).slice(0, 50)]);
  metadataEntries.push(["isAnonymous", String(data.isAnonymous ?? false)]);
  const metadata = Object.fromEntries(metadataEntries);

  const payload: Record<string, unknown> = {
    amount: Number(data.amount),
    currency: (data.currency ?? "NGN").toUpperCase(),
    reference,
    redirect_url: `${baseUrl}/donate/thank-you?korapay_ref=${reference}`,
    narration,
    customer: {
      name: customerName,
      email: data.donorEmail,
    },
  };
  if (Object.keys(metadata).length > 0) {
    payload["metadata"] = metadata;
  }
  // Only include notification_url when we have a real public HTTPS URL.
  if (baseUrl.startsWith("https://")) {
    payload["notification_url"] = `${baseUrl}/api/donations/korapay-webhook`;
  }

  try {
    const response = await fetch("https://api.korapay.com/merchant/api/v1/charges/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${koraKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const rawText = await response.text();
    let json: any = {};
    try { json = JSON.parse(rawText); } catch { json = { raw: rawText }; }
    if (!response.ok || !json?.status) {
      req.log.error({
        status: response.status,
        korapayResponse: json,
        sentPayload: { ...payload, customer: { ...(payload as any).customer, email: "***" } },
      }, "KoraPay initialize failed");
      // Extract a helpful message: KoraPay returns either { message } or { errors: { field: [msg] } }
      let detail = json?.message || json?.error?.message;
      if (!detail && json?.errors) {
        if (typeof json.errors === "string") detail = json.errors;
        else if (Array.isArray(json.errors)) detail = json.errors.join("; ");
        else if (typeof json.errors === "object") {
          detail = Object.entries(json.errors)
            .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : v}`)
            .join("; ");
        }
      }
      if (!detail) detail = rawText?.slice(0, 200) || "Unknown KoraPay error";
      res.status(502).json({ error: `KoraPay rejected the request: ${detail}` });
      return;
    }

    // Create pending donation record
    await db.insert(donationsTable).values({
      donorName: data.isAnonymous ? null : (data.donorName || null),
      donorEmail: data.donorEmail || null,
      donorPhone: data.donorPhone || null,
      amount: String(data.amount),
      currency: data.currency ?? "NGN",
      paymentMethod: "korapay",
      paymentStatus: "pending",
      purpose: data.purpose || null,
      isAnonymous: data.isAnonymous ?? false,
      korapayReference: reference,
    });

    res.json({ reference, checkoutUrl: json.data.checkout_url });
  } catch (err) {
    req.log.error({ err }, "KoraPay request error");
    res.status(500).json({ error: "Failed to create KoraPay checkout" });
  }
});

donationsRouter.post("/verify-korapay", async (req: Request, res: Response) => {
  const reference = req.body?.reference;
  if (!reference || typeof reference !== "string") {
    res.status(400).json({ error: "Missing reference" });
    return;
  }
  const koraKey = process.env["KORAPAY_SECRET_KEY"];
  if (!koraKey) {
    res.status(503).json({ error: "KoraPay not configured" });
    return;
  }

  try {
    const response = await fetch(`https://api.korapay.com/merchant/api/v1/charges/${encodeURIComponent(reference)}`, {
      headers: { Authorization: `Bearer ${koraKey}` },
    });
    const json: any = await response.json();
    if (!response.ok || !json?.status) {
      res.status(400).json({ error: json?.message || "Verification failed" });
      return;
    }

    const status = json.data?.status; // success, failed, pending, etc.
    const existing = await db.select().from(donationsTable)
      .where(eq(donationsTable.korapayReference, reference))
      .limit(1);

    if (existing.length === 0) {
      res.status(404).json({ error: "Donation not found" });
      return;
    }

    let updated = existing[0];
    if (status === "success" && updated.paymentStatus !== "completed") {
      const [u] = await db.update(donationsTable)
        .set({
          paymentStatus: "completed",
          transactionId: json.data?.payment_reference || json.data?.reference || null,
          amount: json.data?.amount ? String(json.data.amount) : updated.amount,
          currency: json.data?.currency || updated.currency,
        })
        .where(eq(donationsTable.korapayReference, reference))
        .returning();
      updated = u;
      sendAdminDonationNotification(updated).catch(() => {});
      sendDonorReceipt(updated).catch(() => {});
    } else if (status === "failed" && updated.paymentStatus !== "failed") {
      const [u] = await db.update(donationsTable)
        .set({ paymentStatus: "failed" })
        .where(eq(donationsTable.korapayReference, reference))
        .returning();
      updated = u;
    }

    res.json(formatDonation(updated));
  } catch (err) {
    req.log.error({ err }, "KoraPay verify error");
    res.status(500).json({ error: "Failed to verify KoraPay payment" });
  }
});

export function formatDonation(d: any) {
  return {
    id: d.id,
    donorName: d.donorName,
    donorEmail: d.donorEmail,
    donorPhone: d.donorPhone,
    amount: Number(d.amount),
    currency: d.currency,
    paymentMethod: d.paymentMethod,
    paymentStatus: d.paymentStatus,
    transactionId: d.transactionId,
    purpose: d.purpose,
    isAnonymous: d.isAnonymous,
    createdAt: d.createdAt?.toISOString() ?? null,
  };
}
