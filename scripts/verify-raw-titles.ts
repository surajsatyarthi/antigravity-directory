
import postgres from 'postgres';
import { config } from 'dotenv';
import { resolve } from 'path';
import fs from 'fs';

config({ path: resolve(process.cwd(), '.env.local') });

const sql = postgres(process.env.DATABASE_URL!, { prepare: false });

async function verify() {
  try {
    const results = await sql`
      SELECT id, title, slug
      FROM resources
      WHERE status = 'LIVE'
        AND title ~ '^[a-zA-Z0-9._-]+\\/[a-zA-Z0-9._-]+$'
    `;

    const count = results.length;
    let output = `VERIFICATION: RESOURCES WITH RAW TITLES (PATTERN owner/repo)\n`;
    output += `DATE: ${new Date().toISOString()}\n`;
    output += `TOTAL FOUND: ${count}\n\n`;

    if (count > 0) {
      output += `| ID | Title | Slug |\n`;
      output += `|---|---|---|\n`;
      results.forEach(r => {
        output += `| ${r.id} | ${r.title} | ${r.slug} |\n`;
      });
    } else {
      output += `✅ SUCCESS: No resources with the owner/repo pattern were found in LIVE status.\n`;
    }

    const outputPath = resolve(process.cwd(), 'temp/task094_verify.txt');
    fs.writeFileSync(outputPath, output);
    
    console.log(`Verification complete. Count: ${count}`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Verification failed:', error);
    process.exit(1);
  }
}

verify();
