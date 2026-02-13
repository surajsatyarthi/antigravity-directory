
import dotenv from 'dotenv';
import path from 'path';
import postgres from 'postgres';

// Load test environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.test.local') });

async function applySchemaChanges() {
  if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL not found in .env.test.local');
    process.exit(1);
  }

  const sql = postgres(process.env.DATABASE_URL, { max: 1 });

  try {
    console.log('Applying schema changes to test database...');

    // 1. Add admin_id to payout_requests
    try {
      await sql`
        ALTER TABLE payout_requests 
        ADD COLUMN IF NOT EXISTS admin_id text REFERENCES users(id);
      `;
      console.log('✓ Added admin_id to payout_requests');
    } catch (error) {
      console.log('⚠ Error adding admin_id (might exist):', error.message);
    }

    // 2. Add rejection_reason to payout_requests
    try {
      await sql`
        ALTER TABLE payout_requests 
        ADD COLUMN IF NOT EXISTS rejection_reason text;
      `;
      console.log('✓ Added rejection_reason to payout_requests');
    } catch (error) {
      console.log('⚠ Error adding rejection_reason (might exist):', error.message);
    }

    console.log('All schema changes applied successfully!');
  } catch (error) {
    console.error('Error applying schema changes:', error);
    process.exit(1);
  } finally {
    await sql.end();
  }
}

applySchemaChanges();
