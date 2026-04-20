import { Router, Request, Response } from "express";
import { db, donationsTable } from "@workspace/db";
import { CreateDonationBody, CreateStripeSessionBody, VerifyStripePaymentBody } from "@workspace/api-zod";
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
