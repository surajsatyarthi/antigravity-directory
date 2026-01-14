import postgres from 'postgres';
import { readFileSync } from 'fs';
import { randomUUID } from 'crypto';

const sql = postgres('postgresql://postgres.epuxtctndtminhdqjabu:vxjeBFPJelv4eTXV@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres');

function createSlug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

async function importTools() {
  try {
    const seedData = JSON.parse(readFileSync('./data/seed-tools.json', 'utf-8'));
    
    console.log(`\n🚀 Importing ${seedData.length} tools...\n`);
    
    let imported = 0;
    let skipped = 0;
    
    for (const tool of seedData) {
      const id = randomUUID();
      const slug = createSlug(tool.name);
      
      try {
        await sql`
          INSERT INTO tools (id, name, slug, description, category, website, search_volume_signal, is_verified, created_at, updated_at)
          VALUES (${id}, ${tool.name}, ${slug}, ${tool.description}, ${tool.category}, ${tool.website}, ${tool.searchVolumeSignal}, false, NOW(), NOW())
        `;
        imported++;
        console.log(`✅ ${tool.name} (${tool.searchVolumeSignal.toLocaleString()} searches)`);
      } catch (error) {
        if (error.message.includes('unique constraint')) {
          console.log(`⏭️  ${tool.name} (already exists)`);
          skipped++;
        } else {
          console.error(`❌ ${tool.name}: ${error.message}`);
        }
      }
    }
    
    console.log(`\n✅ Import complete!`);
    console.log(`   Imported: ${imported}`);
    console.log(`   Skipped: ${skipped}`);
    console.log(`\n🎯 Next steps:`);
    console.log(`   1. Refresh http://localhost:3000/tools`);
    console.log(`   2. Go to http://localhost:3000/dashboard`);
    console.log(`   3. Click "🔍 Enrich Contacts" to find emails`);
    console.log(`   4. Start sending Edward's pitches!\n`);
    
  } catch (error) {
    console.error('\n❌ Import failed:', error.message);
  } finally {
    await sql.end();
    process.exit(0);
  }
}

importTools();
