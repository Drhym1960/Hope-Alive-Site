import { Router, Request, Response } from "express";
import { db, donationsTable, contactsTable } from "@workspace/db";
import { AdminLoginBody, AdminListDonationsQueryParams, AdminListContactsQueryParams } from "@workspace/api-zod";
import { desc, count, sql, eq } from "drizzle-orm";
import { requireAdmin } from "../middlewares/auth";
import { formatDonation } from "./donations";

export const adminRouter = Router();

adminRouter.post("/login", async (req: Request, res: Response) => {
  const parse = AdminLoginBody.safeParse(req.body);
  if (!parse.success) {
    res.status(400).json({ error: "Invalid request" });
    return;
  }

  const { username, password } = parse.data;
  const adminUser = process.env["ADMIN_USERNAME"] || "admin";
  const adminPass = process.env["ADMIN_PASSWORD"] || "hacsadmin2024";

  if (username === adminUser && password === adminPass) {
    (req as any).session = { isAdmin: true, username };
    (req as any).session.save?.();
    res.json({ success: true, message: "Login successful" });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

adminRouter.post("/logout", (req: Request, res: Response) => {
  const session = (req as any).session;
  if (session?.destroy) {
    session.destroy(() => {
      res.json({ success: true });
    });
  } else {
    (req as any).session = null;
    res.json({ success: true });
  }
});

adminRouter.get("/me", (req: Request, res: Response) => {
  const session = (req as any).session;
  if (!session?.isAdmin) {
    res.status(401).json({ error: "Not authenticated" });
    return;
  }
  res.json({ username: session.username, isAdmin: true });
});

adminRouter.get("/donations", requireAdmin, async (req: Request, res: Response) => {
  const queryParse = AdminListDonationsQueryParams.safeParse(req.query);
  if (!queryParse.success) {
    res.status(400).json({ error: "Invalid query params" });
    return;
  }

  const { page = 1, limit = 20, method } = queryParse.data;
  const offset = (page - 1) * limit;

  try {
    let query = db.select().from(donationsTable);
    if (method) {
      // @ts-ignore
      query = query.where(eq(donationsTable.paymentMethod, method));
    }

    const donations = await query.orderBy(desc(donationsTable.createdAt)).limit(limit).offset(offset);
    const [{ total }] = await db.select({ total: count() }).from(donationsTable);

    res.json({
      donations: donations.map(formatDonation),
      total: Number(total),
      page,
      limit,
    });
  } catch (err) {
    req.log.error({ err }, "Failed to list donations (admin)");
    res.status(500).json({ error: "Failed to load donations" });
  }
});

adminRouter.get("/analytics", requireAdmin, async (req: Request, res: Response) => {
  try {
    const [totals] = await db.select({
      total: count(),
      totalAmount: sql<number>`COALESCE(SUM(CAST(amount AS numeric)), 0)`,
    }).from(donationsTable).where(eq(donationsTable.paymentStatus, "completed"));

    const uniqueDonors = await db.select({ email: donationsTable.donorEmail })
      .from(donationsTable)
      .where(eq(donationsTable.isAnonymous, false));
    const uniqueEmails = new Set(uniqueDonors.map(d => d.email).filter(Boolean));

    const methodBreakdown = await db.select({
      method: donationsTable.paymentMethod,
      count: count(),
      total: sql<number>`COALESCE(SUM(CAST(amount AS numeric)), 0)`,
    }).from(donationsTable)
      .where(eq(donationsTable.paymentStatus, "completed"))
      .groupBy(donationsTable.paymentMethod);

    const monthlyTotals = await db.execute(sql`
      SELECT 
        TO_CHAR(created_at, 'YYYY-MM') as month,
        COALESCE(SUM(CAST(amount AS numeric)), 0) as total,
        COUNT(*) as count
      FROM donations
      WHERE payment_status = 'completed'
      GROUP BY TO_CHAR(created_at, 'YYYY-MM')
      ORDER BY month DESC
      LIMIT 12
    `);

    const recentDonations = await db.select().from(donationsTable)
      .orderBy(desc(donationsTable.createdAt))
      .limit(10);

    res.json({
      totalDonations: Number(totals.total),
      totalAmount: Number(totals.totalAmount),
      totalDonors: uniqueEmails.size,
      methodBreakdown: methodBreakdown.map(m => ({
        method: m.method,
        count: Number(m.count),
        total: Number(m.total),
      })),
      monthlyTotals: (monthlyTotals.rows as any[]).map((r: any) => ({
        month: r.month,
        total: Number(r.total),
        count: Number(r.count),
      })),
      recentDonations: recentDonations.map(formatDonation),
    });
  } catch (err) {
    req.log.error({ err }, "Failed to get analytics");
    res.status(500).json({ error: "Failed to load analytics" });
  }
});

adminRouter.get("/contacts", requireAdmin, async (req: Request, res: Response) => {
  const queryParse = AdminListContactsQueryParams.safeParse(req.query);
  if (!queryParse.success) {
    res.status(400).json({ error: "Invalid query params" });
    return;
  }

  const { page = 1, limit = 20 } = queryParse.data;
  const offset = (page - 1) * limit;

  try {
    const contacts = await db.select().from(contactsTable)
      .orderBy(desc(contactsTable.createdAt))
      .limit(limit)
      .offset(offset);
    const [{ total }] = await db.select({ total: count() }).from(contactsTable);

    res.json({
      contacts: contacts.map(c => ({
        id: c.id,
        name: c.name,
        email: c.email,
        phone: c.phone,
        subject: c.subject,
        message: c.message,
        createdAt: c.createdAt?.toISOString() ?? null,
      })),
      total: Number(total),
      page,
      limit,
    });
  } catch (err) {
    req.log.error({ err }, "Failed to list contacts (admin)");
    res.status(500).json({ error: "Failed to load contacts" });
  }
});
