import { db } from './db';
import { sql } from 'drizzle-orm';

async function migrate() {
  console.log('🚀 Starting manual migration...');

  try {
    // 1. Add email_verified to users
    await db.execute(sql`ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "email_verified" timestamp;`);
    console.log('✅ Added email_verified column');

    // 2. Create accounts table
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS "accounts" (
        "userId" text NOT NULL,
        "type" text NOT NULL,
        "provider" text NOT NULL,
        "providerAccountId" text NOT NULL,
        "refresh_token" text,
        "access_token" text,
        "expires_at" integer,
        "token_type" text,
        "scope" text,
        "id_token" text,
        "session_state" text,
        CONSTRAINT "accounts_provider_providerAccountId_pk" PRIMARY KEY("provider","providerAccountId"),
        FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE cascade
      );
    `);
    console.log('✅ Created accounts table');

    // 3. Create sessions table
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS "sessions" (
        "sessionToken" text PRIMARY KEY NOT NULL,
        "userId" text NOT NULL,
        "expires" timestamp NOT NULL,
        FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE cascade
      );
    `);
    console.log('✅ Created sessions table');

    // 4. Create verification_tokens table
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS "verification_tokens" (
        "identifier" text NOT NULL,
        "token" text NOT NULL,
        "expires" timestamp NOT NULL,
        CONSTRAINT "verification_tokens_identifier_token_pk" PRIMARY KEY("identifier","token")
      );
    `);
    console.log('✅ Created verification_tokens table');

    console.log('✨ Migration complete!');
  } catch (err) {
    console.error('❌ Migration failed:', err);
  } finally {
    process.exit(0);
  }
}

migrate();
