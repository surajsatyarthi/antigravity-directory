import postgres from 'postgres';
import dotenv from 'dotenv';

// Load test environment
dotenv.config({ path: '.env.test.local' });

const sql = postgres(process.env.DATABASE_URL!);

async function applyMigration() {
  try {
    console.log('Applying schema changes to test database...');
    
    await sql`ALTER TABLE purchases ADD COLUMN IF NOT EXISTS creator_percent integer NOT NULL DEFAULT 80`;
    console.log('✓ Added creator_percent to purchases');
    
    await sql`ALTER TABLE purchases ADD COLUMN IF NOT EXISTS platform_percent integer NOT NULL DEFAULT 20`;
    console.log('✓ Added platform_percent to purchases');
    
    await sql`ALTER TABLE resources ADD COLUMN IF NOT EXISTS sales_count integer DEFAULT 0 NOT NULL`;
    console.log('✓ Added sales_count to resources');
    
    console.log('All schema changes applied successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  } finally {
    await sql.end();
  }
}

applyMigration();
