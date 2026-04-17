import { Router, Request, Response } from "express";
import { db, contactsTable } from "@workspace/db";
import { SubmitContactBody } from "@workspace/api-zod";

export const contactsRouter = Router();

contactsRouter.post("/", async (req: Request, res: Response) => {
  const parse = SubmitContactBody.safeParse(req.body);
  if (!parse.success) {
    res.status(400).json({ error: "Validation error", details: parse.error.issues });
    return;
  }

  const data = parse.data;

  if (data.honeypot) {
    res.status(201).json({ id: 0, name: data.name, email: data.email, phone: null, subject: data.subject, message: data.message, createdAt: new Date().toISOString() });
    return;
  }

  try {
    const [contact] = await db.insert(contactsTable).values({
      name: data.name,
      email: data.email,
      phone: data.phone ?? null,
      subject: data.subject,
      message: data.message,
    }).returning();

    res.status(201).json({
      id: contact.id,
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      subject: contact.subject,
      message: contact.message,
      createdAt: contact.createdAt?.toISOString() ?? null,
    });
  } catch (err) {
    req.log.error({ err }, "Failed to submit contact");
    res.status(500).json({ error: "Failed to submit message" });
  }
});
