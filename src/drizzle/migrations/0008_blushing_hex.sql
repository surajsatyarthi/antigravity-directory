ALTER TABLE "payout_requests" ADD COLUMN "admin_id" text;--> statement-breakpoint
ALTER TABLE "payout_requests" ADD COLUMN "rejection_reason" text;--> statement-breakpoint
ALTER TABLE "payout_requests" ADD CONSTRAINT "payout_requests_admin_id_users_id_fk" FOREIGN KEY ("admin_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "payout_requests_admin_id_idx" ON "payout_requests" USING btree ("admin_id");