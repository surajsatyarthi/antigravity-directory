
import postgres from 'postgres';
import { config } from 'dotenv';
import { resolve } from 'path';
import fs from 'fs';

config({ path: resolve(process.cwd(), '.env.local') });

const sql = postgres(process.env.DATABASE_URL!, { prepare: false });

async function hardDelete() {
  try {
    const logPath = resolve(process.cwd(), 'temp/task093_fix_log.txt');
    const logContent = fs.readFileSync(logPath, 'utf8');
    
    // Extract UUIDs using regex
    const uuidRegex = /DRAFT: \[(.*?)\]/g;
    const uuids: string[] = [];
    let match;
    
    while ((match = uuidRegex.exec(logContent)) !== null) {
      uuids.push(match[1]);
    }
    
    console.log(`Found ${uuids.length} resources to delete.`);
    
    if (uuids.length === 0) {
      console.log('No UUIDs found in log. Exiting.');
      process.exit(0);
    }
    
    // Perform hard-delete
    const result = await sql`
      DELETE FROM resources 
      WHERE id = ANY(${uuids})
    `;
    
    console.log(`Successfully hard-deleted ${uuids.length} resources.`);
    
    // Verification query
    const remaining = await sql`
      SELECT count(*) FROM resources WHERE id = ANY(${uuids})
    `;
    console.log(`Resources remaining in DB: ${remaining[0].count}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Deletion failed:', error);
    process.exit(1);
  }
}

hardDelete();
