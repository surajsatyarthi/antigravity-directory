import postgres from 'postgres';

const sql = postgres('postgresql://postgres.epuxtctndtminhdqjabu:vxjeBFPJelv4eTXV@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres');

async function checkCategories() {
  try {
    const categories = await sql`SELECT name, slug, description FROM categories ORDER BY "order"`;
    
    console.log('\n📊 Categories in database:', categories.length);
    
    if (categories.length === 0) {
      console.log('\n❌ NO CATEGORIES FOUND!');
    } else {
      console.log('\n✅ Categories:\n');
      categories.forEach(c => {
        console.log(`   Name: ${c.name}`);
        console.log(`   Slug: ${c.slug}`);
        console.log(`   Desc: ${c.description || 'None'}`);
        console.log('');
      });
    }
  } catch (error) {
    console.error('\n❌ Error:', error.message);
  } finally {
    await sql.end();
    process.exit(0);
  }
}

checkCategories();
