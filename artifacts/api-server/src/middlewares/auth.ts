import { Request, Response, NextFunction } from "express";

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const session = (req as any).session;
  if (!session?.isAdmin) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  next();
}
