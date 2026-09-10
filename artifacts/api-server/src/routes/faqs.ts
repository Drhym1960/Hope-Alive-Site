import { Router, Request, Response } from "express";
import { db, faqsTable } from "@workspace/db";
import { AdminCreateFaqBody, AdminUpdateFaqBody, AdminDeleteFaqParams, AdminUpdateFaqParams } from "@workspace/api-zod";
import { eq, asc } from "drizzle-orm";
import { requireAdmin } from "../middlewares/auth";

export const faqsRouter = Router();
export const faqsAdminRouter = Router();

function formatFaq(f: any) {
  return {
    id: f.id,
    question: f.question,
    answer: f.answer,
    sortOrder: f.sortOrder,
    createdAt: f.createdAt?.toISOString() ?? null,
  };
}

faqsRouter.get("/", async (req: Request, res: Response) => {
  try {
    if (!process.env.DATABASE_URL) {
      return res.json({ faqs: [] });
    }
    const faqs = await db.select().from(faqsTable).orderBy(asc(faqsTable.sortOrder));
    res.json({ faqs: faqs.map(formatFaq) });
  } catch (err) {
    req.log.error({ err }, "Failed to list FAQs");
    res.status(500).json({ error: "Failed to load FAQs" });
  }
});

faqsAdminRouter.get("/", requireAdmin, async (req: Request, res: Response) => {
  try {
    const faqs = await db.select().from(faqsTable).orderBy(asc(faqsTable.sortOrder));
    res.json({ faqs: faqs.map(formatFaq) });
  } catch (err) {
    req.log.error({ err }, "Failed to list FAQs (admin)");
    res.status(500).json({ error: "Failed to load FAQs" });
  }
});

faqsAdminRouter.post("/", requireAdmin, async (req: Request, res: Response) => {
  const parse = AdminCreateFaqBody.safeParse(req.body);
  if (!parse.success) {
    res.status(400).json({ error: "Validation error" });
    return;
  }

  const data = parse.data;
  try {
    const [faq] = await db.insert(faqsTable).values({
      question: data.question,
      answer: data.answer,
      sortOrder: data.sortOrder ?? 0,
    }).returning();
    res.status(201).json(formatFaq(faq));
  } catch (err) {
    req.log.error({ err }, "Failed to create FAQ");
    res.status(500).json({ error: "Failed to create FAQ" });
  }
});

faqsAdminRouter.put("/:id", requireAdmin, async (req: Request, res: Response) => {
  const paramParse = AdminUpdateFaqParams.safeParse({ id: Number(req.params.id) });
  const bodyParse = AdminUpdateFaqBody.safeParse(req.body);
  if (!paramParse.success || !bodyParse.success) {
    res.status(400).json({ error: "Validation error" });
    return;
  }

  const data = bodyParse.data;
  try {
    const [faq] = await db.update(faqsTable)
      .set({ question: data.question, answer: data.answer, sortOrder: data.sortOrder ?? 0 })
      .where(eq(faqsTable.id, paramParse.data.id))
      .returning();
    res.json(formatFaq(faq));
  } catch (err) {
    req.log.error({ err }, "Failed to update FAQ");
    res.status(500).json({ error: "Failed to update FAQ" });
  }
});

faqsAdminRouter.delete("/:id", requireAdmin, async (req: Request, res: Response) => {
  const parse = AdminDeleteFaqParams.safeParse({ id: Number(req.params.id) });
  if (!parse.success) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }

  try {
    await db.delete(faqsTable).where(eq(faqsTable.id, parse.data.id));
    res.json({ success: true });
  } catch (err) {
    req.log.error({ err }, "Failed to delete FAQ");
    res.status(500).json({ error: "Failed to delete FAQ" });
  }
});
