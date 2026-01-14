import postgres from 'postgres';

const sql = postgres('postgresql://postgres.epuxtctndtminhdqjabu:vxjeBFPJelv4eTXV@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres');

async function checkTools() {
  try {
    const tools = await sql`SELECT name, slug, is_verified, search_volume_signal FROM tools ORDER BY created_at DESC`;
    
    console.log('\n📊 Tools in database:', tools.length);
    
    if (tools.length === 0) {
      console.log('\n❌ NO TOOLS FOUND! The tools table is empty.');
    } else {
      console.log('\n✅ Tools found:\n');
      tools.forEach(t => {
        console.log(`   Name: ${t.name}`);
        console.log(`   Slug: ${t.slug}`);
        console.log(`   Verified: ${t.is_verified}`);
        console.log(`   Signal: ${t.search_volume_signal}`);
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

checkTools();
