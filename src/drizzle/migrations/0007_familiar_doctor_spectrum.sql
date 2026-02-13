CREATE TABLE "payout_requests" (
	"id" text PRIMARY KEY NOT NULL,
	"creator_id" text NOT NULL,
	"amount" integer NOT NULL,
	"currency" varchar(3) DEFAULT 'USD' NOT NULL,
	"payment_method" text NOT NULL,
	"account_details" text NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"requested_at" timestamp DEFAULT now() NOT NULL,
	"processed_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "payout_requests" ADD CONSTRAINT "payout_requests_creator_id_users_id_fk" FOREIGN KEY ("creator_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "payout_requests_creator_id_idx" ON "payout_requests" USING btree ("creator_id");--> statement-breakpoint
CREATE INDEX "payout_requests_status_idx" ON "payout_requests" USING btree ("status");--> statement-breakpoint
CREATE INDEX "payout_requests_requested_at_idx" ON "payout_requests" USING btree ("requested_at");