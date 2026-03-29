import postgres from 'postgres';
import { config } from 'dotenv';
import { resolve } from 'path';
import { v4 as uuidv4 } from 'uuid';

config({ path: resolve(process.cwd(), '.env.local') });

const sql = postgres(process.env.DATABASE_URL!, { ssl: 'require', prepare: false });

async function fetchSkillList(): Promise<string[]> {
  const response = await fetch('https://api.github.com/repos/googleworkspace/cli/contents/skills/', {
    headers: {
      'User-Agent': 'googleantigravity-directory',
      'Authorization': `token ${process.env.GITHUB_TOKEN}`
    }
  });
  const items = await response.json() as Array<{ name: string; type: string }>;
  return items
    .filter(item => item.type === 'dir' && item.name.startsWith('gws-'))
    .map(item => item.name);
}

async function fetchSkillMd(skillDir: string): Promise<string | null> {
  const response = await fetch(
    `https://api.github.com/repos/googleworkspace/cli/contents/skills/${skillDir}/SKILL.md`,
    {
      headers: {
        'User-Agent': 'googleantigravity-directory',
        'Authorization': `token ${process.env.GITHUB_TOKEN}`
      }
    }
  );
  if (!response.ok) return null;

  const data = await response.json() as { content: string };
  return Buffer.from(data.content, 'base64').toString('utf-8');
}


function parseSkill(skillDir: string, markdown: string): {
  title: string;
  slug: string;
  description: string;
  url: string;
} {
  // Extract description from YAML frontmatter
  const frontmatterMatch = markdown.match(/^---\n([\s\S]*?)\n---/);
  let description = '';
  let serviceName = skillDir;

  if (frontmatterMatch) {
    const frontmatter = frontmatterMatch[1];
    const descMatch = frontmatter.match(/^description:\s*["']?(.+?)["']?\s*$/m);
    if (descMatch) description = descMatch[1].trim();
  }

  // Extract service name from first # heading
  const headingLine = markdown.split('\n').find(l => l.startsWith('# '));
  if (headingLine) serviceName = headingLine.replace(/^#\s+/, '').trim();

  // Fallback description
  if (!description) description = `Official Google Workspace skill for ${serviceName}.`;

  // Trim to 300 chars max
  description = description.slice(0, 300);

  return {
    title: `${serviceName} Skill`,
    slug: `skill-${skillDir}`,
    description,
    url: `https://github.com/googleworkspace/cli/tree/main/skills/${skillDir}`,
  };
}


async function ingest() {
  try {
    // 1. Get skills category
    const [skillsCategory] = await sql`SELECT id FROM categories WHERE slug = 'skills' LIMIT 1`;
    if (!skillsCategory) {
      console.error('❌ skills category not found');
      process.exit(1);
    }

    // 2. Get admin user
    const [admin] = await sql`SELECT id FROM users WHERE role = 'ADMIN' LIMIT 1`;
    const adminId = admin?.id || null;

    // 3. Fetch skill list
    console.log('📥 Fetching skill list from GitHub...');
    const skillDirs = await fetchSkillList();
    console.log(`Found ${skillDirs.length} skills`);

    let inserted = 0;
    let skipped = 0;

    // 4. Process each skill
    for (const skillDir of skillDirs) {
      const markdown = await fetchSkillMd(skillDir);
      if (!markdown) {
        console.log(`⚠️  No SKILL.md found: ${skillDir}`);
        skipped++;
        continue;
      }

      const skill = parseSkill(skillDir, markdown);

      await sql`
        INSERT INTO resources (
          id, title, slug, description, url, category_id, author_id,
          verified, featured, status, github_stars, github_forks,
          is_indexed, last_validated_at
        ) VALUES (
          ${uuidv4()},
          ${skill.title},
          ${skill.slug},
          ${skill.description},
          ${skill.url},
          ${skillsCategory.id},
          ${adminId},
          true,
          false,
          'LIVE',
          0,
          0,
          false,
          NOW()
        )
        ON CONFLICT (slug) DO NOTHING
      `;

      console.log(`✅ ${skill.title}`);
      inserted++;
    }

    console.log(`\n🏁 Done. Inserted: ${inserted}, Skipped: ${skipped}`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Ingestion failed:', error);
    process.exit(1);
  } finally {
    await sql.end();
  }
}

ingest();
