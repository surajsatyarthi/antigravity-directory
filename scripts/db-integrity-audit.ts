
import postgres from 'postgres';
import { config } from 'dotenv';
import { resolve } from 'path';
import fs from 'fs';

config({ path: resolve(process.cwd(), '.env.local') });

const sql = postgres(process.env.DATABASE_URL!, { prepare: false });

async function runAudit() {
  try {
    let output = `--- DATABASE INTEGRITY AUDIT (TASK-094-A) ---\n`;
    output += `Date: ${new Date().toISOString()}\n\n`;

    // Check 1: Duplicate UUIDs
    output += `### CHECK 1: Duplicate UUIDs\n`;
    const check1 = await sql`
      SELECT id, COUNT(*) as count
      FROM resources
      GROUP BY id
      HAVING COUNT(*) > 1
      ORDER BY count DESC;
    `;
    output += `Duplicate IDs found: ${check1.length}\n`;
    if (check1.length > 0) {
      output += `| ID | Count |\n|---|---|\n`;
      check1.forEach(r => output += `| ${r.id} | ${r.count} |\n`);
    }
    output += `\n`;

    // Check 2: Duplicate slugs (LIVE)
    output += `### CHECK 2: Duplicate slugs (LIVE)\n`;
    const check2 = await sql`
      SELECT slug, COUNT(*) as count, array_agg(id) as ids
      FROM resources
      WHERE status = 'LIVE'
      GROUP BY slug
      HAVING COUNT(*) > 1
      ORDER BY count DESC;
    `;
    output += `Duplicate slugs found: ${check2.length}\n`;
    if (check2.length > 0) {
      output += `| Slug | Count | IDs |\n|---|---|---|\n`;
      check2.forEach(r => output += `| ${r.slug} | ${r.count} | ${r.ids.join(', ')} |\n`);
    }
    output += `\n`;

    // Check 3: Duplicate external URLs (same url on multiple LIVE resources)
    output += `### CHECK 3: Duplicate external URLs (LIVE)\n`;
    const check3 = await sql`
      SELECT url, COUNT(*) as count, array_agg(title) as titles
      FROM resources
      WHERE status = 'LIVE'
        AND url IS NOT NULL
      GROUP BY url
      HAVING COUNT(*) > 1
      ORDER BY count DESC
      LIMIT 50;
    `;
    output += `Duplicate external URLs found: ${check3.length}\n`;
    if (check3.length > 0) {
      output += `| URL | Count | Titles |\n|---|---|---|\n`;
      check3.forEach(r => output += `| ${r.url} | ${r.count} | ${r.titles.join(', ')} |\n`);
    }
    output += `\n`;

    // Check 4: NULL or empty critical fields on LIVE resources
    output += `### CHECK 4: NULL or empty critical fields (LIVE)\n`;
    const check4 = await sql`
      SELECT
        COUNT(*) FILTER (WHERE title IS NULL OR title = '') as null_titles,
        COUNT(*) FILTER (WHERE slug IS NULL OR slug = '') as null_slugs,
        COUNT(*) FILTER (WHERE category_id IS NULL) as null_category_ids,
        COUNT(*) FILTER (WHERE status IS NULL) as null_statuses,
        COUNT(*) FILTER (WHERE url IS NULL OR url = '') as null_urls
      FROM resources
      WHERE status = 'LIVE';
    `;
    output += `| Field | Null/Empty Count |\n|---|---|\n`;
    output += `| title | ${check4[0].null_titles} |\n`;
    output += `| slug | ${check4[0].null_slugs} |\n`;
    output += `| category_id | ${check4[0].null_category_ids} |\n`;
    output += `| status | ${check4[0].null_statuses} |\n`;
    output += `| url | ${check4[0].null_urls} |\n`;
    output += `\n`;

    // Check 5: Total LIVE resource count per category
    output += `### CHECK 5: Total LIVE resource count per category\n`;
    const check5 = await sql`
      SELECT c.name, COUNT(r.id) as live_count
      FROM categories c
      LEFT JOIN resources r ON r.category_id = c.id AND r.status = 'LIVE'
      GROUP BY c.name
      ORDER BY live_count DESC;
    `;
    output += `| Category | Live Count |\n|---|---|\n`;
    check5.forEach(r => output += `| ${r.name} | ${r.live_count} |\n`);
    output += `\n`;

    const tempDir = resolve(process.cwd(), 'temp');
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }
    const outputPath = resolve(tempDir, 'task094a_audit.txt');
    fs.writeFileSync(outputPath, output);

    console.log(`Audit complete. Results saved to: ${outputPath}`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Audit failed:', error);
    process.exit(1);
  }
}

runAudit();
