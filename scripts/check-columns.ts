const postgres = require('postgres');
const path = require('path');
require('dotenv').config({ path: path.resolve(process.cwd(), '.env.local') });

const isTestDb = process.env.DATABASE_URL?.includes('localhost') || process.env.DATABASE_URL?.includes('127.0.0.1');
const sql = postgres(process.env.DATABASE_URL, { ssl: isTestDb ? false : 'require' });

async function checkColumns() {
  try {
    console.log('🔍 Checking users table columns...\n');
    
    const columnsResult = await sql`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'sessions' 
      AND table_schema = 'public'
      ORDER BY ordinal_position;
    `;
    
    console.log('📋 Users Table Columns:');
    columnsResult.forEach(col => {
      console.log(`   - ${col.column_name} (${col.data_type})`);
    });
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await sql.end();
  }
}

checkColumns();
