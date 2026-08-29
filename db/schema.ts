import { index, integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const communityPosts = sqliteTable("community_posts", {
  id: text("id").primaryKey(),
  type: text("type", { enum: ["secondhand", "errand"] }).notNull(),
  campus: text("campus", { enum: ["cairns", "townsville"] }).notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category"),
  store: text("store"),
  amount: real("amount").notNull(),
  contact: text("contact"),
  imageKey: text("image_key"),
  status: text("status", { enum: ["open", "claimed"] }).notNull().default("open"),
  createdAt: text("created_at").notNull(),
}, (table) => [
  index("idx_community_posts_campus_type_created").on(table.campus, table.type, table.createdAt),
]);

export const cultureTips = sqliteTable("culture_tips", {
  id: text("id").primaryKey(),
  campus: text("campus", { enum: ["cairns", "townsville"] }).notNull(),
  category: text("category").notNull(),
  name: text("name").notNull().default("Anonymous"),
  tip: text("tip").notNull(),
  views: integer("views").notNull().default(0),
  createdAt: text("created_at").notNull(),
}, (table) => [
  index("idx_culture_tips_campus_views_created").on(table.campus, table.views, table.createdAt),
]);

export const communityReports = sqliteTable("community_reports", {
  id: text("id").primaryKey(),
  targetType: text("target_type", { enum: ["post", "tip"] }).notNull(),
  targetId: text("target_id").notNull(),
  reason: text("reason").notNull(),
  visitorHash: text("visitor_hash").notNull(),
  createdAt: text("created_at").notNull(),
}, (table) => [
  index("idx_community_reports_target").on(table.targetType, table.targetId),
]);

export const communityRateLimits = sqliteTable("community_rate_limits", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  visitorHash: text("visitor_hash").notNull(),
  action: text("action").notNull(),
  createdAt: integer("created_at").notNull(),
}, (table) => [
  index("idx_community_rate_limits_visitor_action_created").on(table.visitorHash, table.action, table.createdAt),
]);
