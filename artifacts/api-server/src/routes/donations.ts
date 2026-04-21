import { Router, Request, Response } from "express";
import { db, donationsTable } from "@workspace/db";
import { CreateDonationBody, CreateStripeSessionBody, VerifyStripePaymentBody, CreateKorapayChargeBody } from "@workspace/api-zod";
import { eq, desc, count, sql } from "drizzle-orm";
import { sendAdminDonationNotification, sendDonorReceipt } from "../lib/email";

export const donationsRouter = Router();

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

  const domains = process.env["REPLIT_DOMAINS"]?.split(",")[0];
  const baseUrl = domains ? `https://${domains}` : "http://localhost:80";

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
  const reference = `HACS-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
  const domains = process.env["REPLIT_DOMAINS"]?.split(",")[0];
  const baseUrl = domains ? `https://${domains}` : "http://localhost:80";

  const payload = {
    amount: data.amount,
    currency: data.currency ?? "NGN",
    reference,
    notification_url: `${baseUrl}/api/donations/korapay-webhook`,
    redirect_url: `${baseUrl}/donate/thank-you?korapay_ref=${reference}`,
    narration: data.purpose || "Donation to Hope Alive Children Spring Foundation",
    customer: {
      name: data.donorName || "Donor",
      email: data.donorEmail || "donor@hacsfoundation.org",
    },
    metadata: {
      donorName: data.donorName ?? "",
      donorPhone: data.donorPhone ?? "",
      purpose: data.purpose ?? "",
      isAnonymous: String(data.isAnonymous ?? false),
    },
  };

  try {
    const response = await fetch("https://api.korapay.com/merchant/api/v1/charges/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${koraKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const json: any = await response.json();
    if (!response.ok || !json?.status) {
      req.log.error({ json }, "KoraPay initialize failed");
      res.status(500).json({ error: json?.message || "Failed to create KoraPay checkout" });
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
