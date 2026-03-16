
import postgres from 'postgres';
import { config } from 'dotenv';
import { resolve } from 'path';
import fs from 'fs';

config({ path: resolve(process.cwd(), '.env.local') });

const sql = postgres(process.env.DATABASE_URL!, { prepare: false });

async function diagnose() {
  try {
    console.log('--- STARTING TASK-094 DIAGNOSIS ---');
    
    // Query for LIVE resources where title matches the owner/repo pattern
    // Pattern: start of string, alphanumeric/._-, one slash, alphanumeric/._-, end of string
    const results = await sql`
      SELECT r.id, r.title, r.slug, r.meta_title, c.name as category_name
      FROM resources r
      JOIN categories c ON r.category_id = c.id
      WHERE r.status = 'LIVE'
        AND r.title ~ '^[a-zA-Z0-9._-]+\\/[a-zA-Z0-9._-]+$'
      ORDER BY c.name, r.title;
    `;

    const count = results.length;
    let output = `TOTAL RAW TITLES FOUND: ${count}\n\n`;
    output += `| ID | Title | Slug | Category |\n`;
    output += `|---|---|---|---|\n`;
    
    results.forEach(r => {
      output += `| ${r.id} | ${r.title} | ${r.slug} | ${r.category_name} |\n`;
    });

    const tempDir = resolve(process.cwd(), 'temp');
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }
    
    const outputPath = resolve(tempDir, 'task094_diagnosis.txt');
    fs.writeFileSync(outputPath, output);
    
    console.log(`Diagnosis complete. Found ${count} raw titles.`);
    console.log(`Saved to: ${outputPath}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Diagnosis failed:', error);
    process.exit(1);
  }
}

diagnose();
