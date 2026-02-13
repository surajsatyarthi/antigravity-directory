const postgres = require('postgres');
const path = require('path');
require('dotenv').config({ path: path.resolve(process.cwd(), '.env.local') });

const sql = postgres(process.env.DATABASE_URL, { ssl: 'require' });

async function testQuery() {
  try {
    console.log('🧪 Testing the exact query that fails on homepage...\n');
    
    const result = await sql`
      select "categories"."id", "categories"."name", "categories"."slug", 
             "categories"."description", "categories"."icon", "categories"."group", 
             "categories"."order", "categories"."created_at", "categories"."updated_at", 
             COUNT("resources"."id") as count
      from "categories" 
      left join "resources" on "categories"."id" = "resources"."category_id" 
      group by "categories"."id" 
      order by "categories"."order" asc
    `;
    
    console.log(`✅ Query succeeded! Found ${result.length} categories:\n`);
    result.forEach(cat => {
      console.log(`   - ${cat.name} (${cat.count} resources)`);
    });
    
  } catch (error) {
    console.error('❌ Query failed:', error.message);
    console.error('Details:', error);
  } finally {
    await sql.end();
  }
}

testQuery();
