CREATE TABLE `community_posts` (
	`id` text PRIMARY KEY NOT NULL,
	`type` text NOT NULL,
	`campus` text NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`category` text,
	`store` text,
	`amount` real NOT NULL,
	`contact` text,
	`image_key` text,
	`status` text DEFAULT 'open' NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_community_posts_campus_type_created` ON `community_posts` (`campus`,`type`,`created_at`);--> statement-breakpoint
CREATE TABLE `community_rate_limits` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`visitor_hash` text NOT NULL,
	`action` text NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_community_rate_limits_visitor_action_created` ON `community_rate_limits` (`visitor_hash`,`action`,`created_at`);--> statement-breakpoint
CREATE TABLE `community_reports` (
	`id` text PRIMARY KEY NOT NULL,
	`target_type` text NOT NULL,
	`target_id` text NOT NULL,
	`reason` text NOT NULL,
	`visitor_hash` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_community_reports_target` ON `community_reports` (`target_type`,`target_id`);--> statement-breakpoint
CREATE TABLE `culture_tips` (
	`id` text PRIMARY KEY NOT NULL,
	`campus` text NOT NULL,
	`category` text NOT NULL,
	`name` text DEFAULT 'Anonymous' NOT NULL,
	`tip` text NOT NULL,
	`views` integer DEFAULT 0 NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_culture_tips_campus_views_created` ON `culture_tips` (`campus`,`views`,`created_at`);
--> statement-breakpoint
PRAGMA optimize;
