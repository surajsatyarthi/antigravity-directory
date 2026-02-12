CREATE TABLE "creator_earnings" (
	"user_id" text PRIMARY KEY NOT NULL,
	"total_earnings" integer DEFAULT 0,
	"sales_count" integer DEFAULT 0,
	"last_sale_at" timestamp,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "purchases" (
	"id" text PRIMARY KEY NOT NULL,
	"resource_id" text NOT NULL,
	"buyer_id" text NOT NULL,
	"creator_id" text NOT NULL,
	"amount_total" integer NOT NULL,
	"creator_earnings" integer NOT NULL,
	"platform_fee" integer NOT NULL,
	"currency" text NOT NULL,
	"payment_method" text NOT NULL,
	"payment_id" text NOT NULL,
	"order_id" text,
	"status" text DEFAULT 'pending',
	"created_at" timestamp DEFAULT now(),
	"completed_at" timestamp,
	CONSTRAINT "purchases_payment_id_unique" UNIQUE("payment_id")
);
--> statement-breakpoint
CREATE TABLE "user_resource_access" (
	"user_id" text NOT NULL,
	"resource_id" text NOT NULL,
	"purchase_id" text,
	"granted_at" timestamp DEFAULT now(),
	CONSTRAINT "user_resource_access_user_id_resource_id_pk" PRIMARY KEY("user_id","resource_id")
);
--> statement-breakpoint
ALTER TABLE "resources" ADD COLUMN "price" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "resources" ADD COLUMN "currency" text DEFAULT 'USD';--> statement-breakpoint
ALTER TABLE "creator_earnings" ADD CONSTRAINT "creator_earnings_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_resource_id_resources_id_fk" FOREIGN KEY ("resource_id") REFERENCES "public"."resources"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_buyer_id_users_id_fk" FOREIGN KEY ("buyer_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_creator_id_users_id_fk" FOREIGN KEY ("creator_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_resource_access" ADD CONSTRAINT "user_resource_access_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_resource_access" ADD CONSTRAINT "user_resource_access_resource_id_resources_id_fk" FOREIGN KEY ("resource_id") REFERENCES "public"."resources"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_resource_access" ADD CONSTRAINT "user_resource_access_purchase_id_purchases_id_fk" FOREIGN KEY ("purchase_id") REFERENCES "public"."purchases"("id") ON DELETE no action ON UPDATE no action;