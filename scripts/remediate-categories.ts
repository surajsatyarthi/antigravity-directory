/**
 * TASK-097 Remediation — Fix wrongly-categorised gap resources
 *
 * The original ingest script hardcoded all 204 inserted resources into the
 * 'skills' category regardless of their actual type. This script reads the
 * source slug list, infers the correct category from the competitor prefix,
 * and updates the DB. publisher/* entries are deleted — they are publisher
 * accounts, not resources.
 *
 * Usage:
 *   npx tsx scripts/remediate-categories.ts --dry-run   # preview only
 *   npx tsx scripts/remediate-categories.ts             # execute
 */

import postgres from 'postgres';
import { config } from 'dotenv';
import { resolve } from 'path';
import fs from 'fs';

config({ path: resolve(process.cwd(), '.env.local') });

const sql = postgres(process.env.DATABASE_URL!, { ssl: 'require', prepare: false });
const isDryRun = process.argv.includes('--dry-run');

// Map competitor topic prefix → our category slug
// Covers all 52 prefixes present in resources_to_ingest.json
const PREFIX_TO_CATEGORY: Record<string, string> = {
  // Agents
  'agentic-ai': 'agents',

  // Workflows
  'antigravity-workflows': 'workflows',
  'workflow': 'workflows',
  'devops': 'workflows',
  'devops-infrastructure': 'workflows',
  'cloud-serverless': 'workflows',

  // Rules (language-specific coding rules)
  'python': 'rules',
  'typescript': 'rules',
  'go': 'rules',
  'rust': 'rules',
  'javascript': 'rules',
  'js': 'rules',
  'git': 'rules',

  // Boilerplates (framework starters / templates)
  'nextjs': 'boilerplates',
  'react': 'boilerplates',
  'vue': 'boilerplates',
  'nuxt': 'boilerplates',
  'expo': 'boilerplates',
  'mobile': 'boilerplates',
  'mobile-development': 'boilerplates',
  'backend': 'boilerplates',
  'backend-frameworks': 'boilerplates',
  'frontend-frameworks': 'boilerplates',
  'web-development': 'boilerplates',

  // Troubleshooting
  'qa-debugging': 'troubleshooting',
  'testing': 'troubleshooting',
  'testing-quality-assurance': 'troubleshooting',
  'testing-monitoring': 'troubleshooting',
  'debugging': 'troubleshooting',
  'emergency': 'troubleshooting',
  'production': 'troubleshooting',
  'local-dev': 'troubleshooting',

  // Skills (everything else that doesn't fit above)
  'ai-tools': 'skills',
  'ai-machine-learning': 'skills',
  'security': 'skills',
  'seo': 'skills',
  'marketing': 'skills',
  'database': 'skills',
  'database-data': 'skills',
  'architecture': 'skills',
  'documentation': 'skills',
  'communication': 'skills',
  'performance-optimization': 'skills',
  'developer-experience': 'skills',
  'ui-design': 'skills',
  'advanced': 'skills',
  'integrations': 'skills',
  'creative': 'skills',
  'server': 'skills',
  'client': 'skills',
  'payments': 'skills',
  'bundle': 'skills',
  'async': 'skills',
  'rerender': 'skills',
  'rendering': 'skills',
  'features': 'skills',
  'other': 'skills',
};

const DELETE_PREFIXES = new Set(['publisher']);

function inferCategorySlug(originalSlug: string): string | null {
  const prefix = originalSlug.split('/')[0];
  if (DELETE_PREFIXES.has(prefix)) return null; // signal: delete
  return PREFIX_TO_CATEGORY[prefix] ?? 'skills';
}

async function run() {
  console.log(`\n🔧 TASK-097 Category Remediation${isDryRun ? ' [DRY RUN]' : ''}\n`);

  // 1. Load category ID map from DB — no hardcoded UUIDs
  const categoryRows = await sql`SELECT id, slug FROM categories`;
  const categoryIdBySlug = Object.fromEntries(categoryRows.map(r => [r.slug, r.id]));
  console.log('Categories loaded:', Object.keys(categoryIdBySlug).join(', '));

  const skillsCategoryId = categoryIdBySlug['skills'];
  if (!skillsCategoryId) throw new Error('skills category not found in DB');

  // 2. Load source slugs from gap analysis output
  const sourceList: string[] = JSON.parse(
    fs.readFileSync('temp/resources_to_ingest.json', 'utf-8')
  );

  // 3. Build lookup: db_slug → { correctCategorySlug, shouldDelete }
  const corrections: Array<{
    dbSlug: string;
    correctCategorySlug: string | null;
  }> = sourceList.map(original => ({
    dbSlug: original.replace(/\//g, '-'),
    correctCategorySlug: inferCategorySlug(original),
  }));

  // 4. Fetch matching resources from DB (those currently in wrong 'skills' category)
  const dbSlugs = corrections.map(c => c.dbSlug);

  const existing = await sql`
    SELECT r.id, r.slug, r.title, c.slug as current_category
    FROM resources r
    JOIN categories c ON c.id = r.category_id
    WHERE r.slug = ANY(${dbSlugs})
  `;

  const existingBySlug = Object.fromEntries(existing.map(r => [r.slug, r]));
  console.log(`\nFound ${existing.length} of ${sourceList.length} source slugs in DB\n`);

  // 5. Categorise what needs to happen
  const toDelete: typeof existing = [];
  const toUpdate: Array<{ id: string; slug: string; title: string; from: string; to: string }> = [];
  const alreadyCorrect: string[] = [];

  for (const { dbSlug, correctCategorySlug } of corrections) {
    const row = existingBySlug[dbSlug];
    if (!row) continue;

    if (correctCategorySlug === null) {
      toDelete.push(row);
    } else if (row.current_category !== correctCategorySlug) {
      toUpdate.push({
        id: row.id,
        slug: row.slug,
        title: row.title,
        from: row.current_category,
        to: correctCategorySlug,
      });
    } else {
      alreadyCorrect.push(row.slug);
    }
  }

  // 6. Report plan
  console.log(`📊 Summary:`);
  console.log(`  Already correct:  ${alreadyCorrect.length}`);
  console.log(`  To update:        ${toUpdate.length}`);
  console.log(`  To delete:        ${toDelete.length}`);

  if (toUpdate.length > 0) {
    console.log('\n📝 Category updates:');
    const byCat: Record<string, number> = {};
    for (const u of toUpdate) {
      byCat[u.to] = (byCat[u.to] || 0) + 1;
    }
    Object.entries(byCat)
      .sort((a, b) => b[1] - a[1])
      .forEach(([cat, count]) => console.log(`  ${cat}: +${count}`));
  }

  if (toDelete.length > 0) {
    console.log('\n🗑  To delete (publisher accounts, not resources):');
    toDelete.forEach(r => console.log(`  ${r.slug} — ${r.title}`));
  }

  if (isDryRun) {
    console.log('\n⏸  DRY RUN — no changes made. Run without --dry-run to execute.\n');
    await sql.end();
    process.exit(0);
  }

  // 7. Execute updates
  let updatedCount = 0;
  for (const update of toUpdate) {
    const newCatId = categoryIdBySlug[update.to];
    if (!newCatId) {
      console.warn(`⚠  Unknown category '${update.to}' — skipping ${update.slug}`);
      continue;
    }
    await sql`UPDATE resources SET category_id = ${newCatId} WHERE id = ${update.id}`;
    updatedCount++;
  }

  // 8. Execute deletes
  let deletedCount = 0;
  for (const row of toDelete) {
    await sql`DELETE FROM resources WHERE id = ${row.id}`;
    deletedCount++;
  }

  // 9. Final count
  const [{ count: liveCount }] = await sql`
    SELECT COUNT(*) as count FROM resources WHERE status = 'LIVE'
  `;

  console.log(`\n✅ Done.`);
  console.log(`  Updated:  ${updatedCount} resources`);
  console.log(`  Deleted:  ${deletedCount} publisher entries`);
  console.log(`  LIVE total: ${liveCount}`);

  await sql.end();
  process.exit(0);
}

run().catch(err => {
  console.error('❌ Remediation failed:', err);
  process.exit(1);
});
