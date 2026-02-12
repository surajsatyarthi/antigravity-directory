CREATE TABLE "resource_claims" (
	"id" text PRIMARY KEY NOT NULL,
	"resource_id" text NOT NULL,
	"user_id" text NOT NULL,
	"github_username" text NOT NULL,
	"github_repo_url" text NOT NULL,
	"verification_method" text NOT NULL,
	"claimed_at" timestamp DEFAULT now(),
	CONSTRAINT "resource_claims_resource_id_unique" UNIQUE("resource_id")
);
--> statement-breakpoint
ALTER TABLE "resources" ADD COLUMN "claimed_at" timestamp;--> statement-breakpoint
ALTER TABLE "resources" ADD COLUMN "claimed_via" text;--> statement-breakpoint
ALTER TABLE "resource_claims" ADD CONSTRAINT "resource_claims_resource_id_resources_id_fk" FOREIGN KEY ("resource_id") REFERENCES "public"."resources"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "resource_claims" ADD CONSTRAINT "resource_claims_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;