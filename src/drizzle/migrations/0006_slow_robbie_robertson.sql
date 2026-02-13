ALTER TABLE "purchases" ADD COLUMN "creator_percent" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "purchases" ADD COLUMN "platform_percent" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "resources" ADD COLUMN "sales_count" integer DEFAULT 0 NOT NULL;