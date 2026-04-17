import { Router } from "express";
import healthRouter from "./health";
import { donationsRouter } from "./donations";
import { contactsRouter } from "./contacts";
import { galleryRouter, galleryAdminRouter } from "./gallery";
import { faqsRouter, faqsAdminRouter } from "./faqs";
import { adminRouter } from "./admin";
import { contentRouter, contentAdminRouter } from "./content";

const router = Router();

router.use(healthRouter);
router.use("/donations", donationsRouter);
router.use("/contacts", contactsRouter);
router.use("/gallery", galleryRouter);
router.use("/faqs", faqsRouter);
router.use("/content", contentRouter);
router.use("/admin", adminRouter);
router.use("/admin/gallery", galleryAdminRouter);
router.use("/admin/faqs", faqsAdminRouter);
router.use("/admin/content", contentAdminRouter);

export default router;
