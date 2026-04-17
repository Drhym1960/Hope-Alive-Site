import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const contentTable = pgTable("content", {
  key: text("key").primaryKey(),
  value: text("value").notNull(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type ContentItem = typeof contentTable.$inferSelect;
