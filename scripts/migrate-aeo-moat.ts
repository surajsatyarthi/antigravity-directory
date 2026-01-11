import postgres from 'postgres';
import { config } from 'dotenv';
import { resolve } from 'path';

config({ path: resolve(process.cwd(), '.env.local') });

async function migrate() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error('❌ DATABASE_URL is not set in .env.local');
    process.exit(1);
  }

  const sql = postgres(databaseUrl, { prepare: false });
  
  try {
    console.log('🔄 Migrating database for Staged Indexing & AEO...');

    // Add is_indexed column
    await sql`ALTER TABLE resources ADD COLUMN IF NOT EXISTS is_indexed BOOLEAN NOT NULL DEFAULT false`;
    console.log('✅ Added column: is_indexed');

    // Add indexed_at column
    await sql`ALTER TABLE resources ADD COLUMN IF NOT EXISTS indexed_at TIMESTAMP`;
    console.log('✅ Added column: indexed_at');

    // Add github_stars column
    await sql`ALTER TABLE resources ADD COLUMN IF NOT EXISTS github_stars INTEGER DEFAULT 0`;
    console.log('✅ Added column: github_stars');

    // Add github_forks column
    await sql`ALTER TABLE resources ADD COLUMN IF NOT EXISTS github_forks INTEGER DEFAULT 0`;
    console.log('✅ Added column: github_forks');

    // Add last_validated_at column
    await sql`ALTER TABLE resources ADD COLUMN IF NOT EXISTS last_validated_at TIMESTAMP DEFAULT NOW()`;
    console.log('✅ Added column: last_validated_at');

    console.log('✨ Migration complete!');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  } finally {
    await sql.end();
  }
}

migrate();
