import { Router, Request, Response } from "express";
import { db, galleryTable } from "@workspace/db";
import { AdminCreateGalleryImageBody, AdminDeleteGalleryImageParams } from "@workspace/api-zod";
import { eq, asc } from "drizzle-orm";
import { requireAdmin } from "../middlewares/auth";

export const galleryRouter = Router();
export const galleryAdminRouter = Router();

function formatImage(img: any) {
  return {
    id: img.id,
    url: img.url,
    caption: img.caption,
    category: img.category,
    sortOrder: img.sortOrder,
    createdAt: img.createdAt?.toISOString() ?? null,
  };
}

galleryRouter.get("/", async (req: Request, res: Response) => {
  try {
    const images = await db.select().from(galleryTable).orderBy(asc(galleryTable.sortOrder));
    res.json({ images: images.map(formatImage) });
  } catch (err) {
    req.log.error({ err }, "Failed to list gallery");
    res.status(500).json({ error: "Failed to load gallery" });
  }
});

galleryAdminRouter.get("/", requireAdmin, async (req: Request, res: Response) => {
  try {
    const images = await db.select().from(galleryTable).orderBy(asc(galleryTable.sortOrder));
    res.json({ images: images.map(formatImage) });
  } catch (err) {
    req.log.error({ err }, "Failed to list gallery (admin)");
    res.status(500).json({ error: "Failed to load gallery" });
  }
});

galleryAdminRouter.post("/", requireAdmin, async (req: Request, res: Response) => {
  const parse = AdminCreateGalleryImageBody.safeParse(req.body);
  if (!parse.success) {
    res.status(400).json({ error: "Validation error" });
    return;
  }

  const data = parse.data;
  try {
    const [image] = await db.insert(galleryTable).values({
      url: data.url,
      caption: data.caption ?? null,
      category: data.category ?? null,
      sortOrder: data.sortOrder ?? 0,
    }).returning();
    res.status(201).json(formatImage(image));
  } catch (err) {
    req.log.error({ err }, "Failed to add gallery image");
    res.status(500).json({ error: "Failed to add image" });
  }
});

galleryAdminRouter.delete("/:id", requireAdmin, async (req: Request, res: Response) => {
  const parse = AdminDeleteGalleryImageParams.safeParse({ id: Number(req.params.id) });
  if (!parse.success) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }

  try {
    await db.delete(galleryTable).where(eq(galleryTable.id, parse.data.id));
    res.json({ success: true });
  } catch (err) {
    req.log.error({ err }, "Failed to delete gallery image");
    res.status(500).json({ error: "Failed to delete image" });
  }
});
