import postgres from 'postgres';
import { config } from 'dotenv';
import { resolve } from 'path';

config({ path: resolve(process.cwd(), '.env.local') });

const sql = postgres(process.env.DATABASE_URL!, { ssl: 'require', prepare: false });

async function fetchSkillMd(skillPath: string): Promise<string | null> {
  // skillPath = "skills/gws-admin-reports"
  const apiUrl = `https://api.github.com/repos/googleworkspace/cli/contents/${skillPath}/SKILL.md`;
  await new Promise(r => setTimeout(r, 300));
  const res = await fetch(apiUrl, {
    headers: {
      'User-Agent': 'googleantigravity-directory',
      'Authorization': `token ${process.env.GITHUB_TOKEN}`
    }
  });
  if (!res.ok) return null;
  const data = await res.json() as { content: string };
  return Buffer.from(data.content, 'base64').toString('utf-8');
}

async function main() {
  // Get all GWS skills with no content
  const rows = await sql`
    SELECT id, title, url
    FROM resources
    WHERE url LIKE '%github.com/googleworkspace/cli/tree/main/skills/%'
    AND content IS NULL
    AND status = 'LIVE'
  `;

  console.log(`Found ${rows.length} GWS skills with no content`);

  let updated = 0;
  let failed = 0;

  for (const row of rows) {
    // Extract subdirectory from URL
    // URL: https://github.com/googleworkspace/cli/tree/main/skills/gws-admin-reports
    // Path: skills/gws-admin-reports
    const match = row.url.match(/\/tree\/main\/(skills\/gws-[^/]+)/);
    if (!match) {
      console.log(`⚠️  Could not parse path from URL: ${row.url}`);
      failed++;
      continue;
    }

    const skillPath = match[1];
    const content = await fetchSkillMd(skillPath);

    if (!content) {
      console.log(`⚠️  No SKILL.md found: ${skillPath}`);
      failed++;
      continue;
    }

    // Truncate at 8000 chars
    const truncated = content.length > 8000
      ? content.slice(0, content.lastIndexOf(' ', 8000))
      : content;

    await sql`
      UPDATE resources
      SET content = ${truncated}
      WHERE id = ${row.id}
      AND content IS NULL
    `;

    console.log(`✅ ${row.title} (${truncated.length} chars)`);
    updated++;
  }

  console.log(`\nDone. Updated: ${updated}, Failed: ${failed}`);
  await sql.end();
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
