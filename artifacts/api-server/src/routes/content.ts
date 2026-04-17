import { Router, Request, Response } from "express";
import { db, contentTable } from "@workspace/db";
import { AdminUpdateContentBody, GetContentParams, AdminUpdateContentParams } from "@workspace/api-zod";
import { eq } from "drizzle-orm";
import { requireAdmin } from "../middlewares/auth";

export const contentRouter = Router();
export const contentAdminRouter = Router();

contentRouter.get("/:key", async (req: Request, res: Response) => {
  const parse = GetContentParams.safeParse({ key: req.params.key });
  if (!parse.success) {
    res.status(400).json({ error: "Invalid key" });
    return;
  }

  try {
    const [item] = await db.select().from(contentTable).where(eq(contentTable.key, parse.data.key));
    if (!item) {
      res.status(404).json({ error: "Content not found" });
      return;
    }
    res.json({ key: item.key, value: item.value, updatedAt: item.updatedAt?.toISOString() ?? null });
  } catch (err) {
    req.log.error({ err }, "Failed to get content");
    res.status(500).json({ error: "Failed to load content" });
  }
});

contentAdminRouter.put("/:key", requireAdmin, async (req: Request, res: Response) => {
  const paramParse = AdminUpdateContentParams.safeParse({ key: req.params.key });
  const bodyParse = AdminUpdateContentBody.safeParse(req.body);
  if (!paramParse.success || !bodyParse.success) {
    res.status(400).json({ error: "Validation error" });
    return;
  }

  try {
    const existing = await db.select().from(contentTable).where(eq(contentTable.key, paramParse.data.key));
    let item;
    if (existing.length > 0) {
      [item] = await db.update(contentTable)
        .set({ value: bodyParse.data.value, updatedAt: new Date() })
        .where(eq(contentTable.key, paramParse.data.key))
        .returning();
    } else {
      [item] = await db.insert(contentTable).values({
        key: paramParse.data.key,
        value: bodyParse.data.value,
      }).returning();
    }
    res.json({ key: item.key, value: item.value, updatedAt: item.updatedAt?.toISOString() ?? null });
  } catch (err) {
    req.log.error({ err }, "Failed to update content");
    res.status(500).json({ error: "Failed to update content" });
  }
});
