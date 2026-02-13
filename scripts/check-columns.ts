const postgres = require('postgres');
const path = require('path');
require('dotenv').config({ path: path.resolve(process.cwd(), '.env.local') });

const sql = postgres(process.env.DATABASE_URL, { ssl: 'require' });

async function checkColumns() {
  try {
    console.log('🔍 Checking resources table columns...\n');
    
    const columnsResult = await sql`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'resources' 
      AND table_schema = 'public'
      ORDER BY ordinal_position;
    `;
    
    console.log('📋 Resources Table Columns:');
    columnsResult.forEach(col => {
      console.log(`   - ${col.column_name} (${col.data_type})`);
    });
    
    console.log('\n🔍 Checking categories table columns...\n');
    
    const catColumnsResult = await sql`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'categories' 
      AND table_schema = 'public'
      ORDER BY ordinal_position;
    `;
    
    console.log('📋 Categories Table Columns:');
    catColumnsResult.forEach(col => {
      console.log(`   - ${col.column_name} (${col.data_type})`);
    });
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await sql.end();
  }
}

checkColumns();
