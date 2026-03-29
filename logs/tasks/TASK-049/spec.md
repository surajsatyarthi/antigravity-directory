SESSION-PROTOCOL-CONFIRMED: 2026-03-29

# CURRENT TASK — TASK-049: Google Workspace CLI Skills Ingestion

## RESEARCH
- Web: Query: "official GitHub repository ingestion SEO directory first mover advantage" → URL: https://nakora.ai/blog/github-seo → Finding: "Many devtool companies and projects use GitHub SEO to get attention, users, and customers, but this acquisition channel is still not very professionalized, so earlier adopters have the potential to get huge results."
- Reddit: Query: "google workspace cli skills directory" → URL: https://www.reddit.com/r/Anthropic/comments/1rlxr1e/new_agent_skills_googleworkspace_cli_isnt_at_all_optimized/ → Finding: "Trying to find a list of what all the tools actually do is a nightmare." (45 upvotes, r/Anthropic) — confirms nobody has catalogued these properly, first-mover confirmed.
- Twitter/X: Query: "google workspace skills directory" → URL: https://x.com/search?q=google%20workspace%20skills → Finding: "Anyone have a curated list of the new Google Workspace CLI tools? The docs are a wall of text." — active demand, no solution exists.

---

## WHAT TO BUILD

The Google Workspace CLI repo (`github.com/googleworkspace/cli`) contains 100+ official SKILL.md files authored by Google. Nobody has catalogued them into a human-readable directory. We ingest all of them into our Skills category as LIVE resources. Google-authored content = maximum E-E-A-T signal for SEO. First-mover advantage confirmed by Reddit research. One TypeScript ingestion script that fetches, parses, and inserts all skills. Run once, commit the script.

---

## TECHNICAL SPEC

### Step 1 — Fetch the skill list from GitHub API

Use the GitHub API (no auth needed for public repos) to list all directories in the repo root:

```
https://api.github.com/repos/googleworkspace/cli/contents/
```

Each skill is a subdirectory. For each subdirectory, fetch its `SKILL.md`:

```
https://api.github.com/repos/googleworkspace/cli/contents/[skill-name]/SKILL.md
```

The file content is base64-encoded in the API response. Decode it.

---

### Step 2 — Parse each SKILL.md

Each SKILL.md has this structure (example from `gws-gmail`):
```markdown
# Gmail

Description of what this skill does...

## Tools
- tool-name: what it does
```

Extract:
- **Service name**: first `#` heading (e.g. `Gmail`, `Google Calendar`, `Google Drive`)
- **Raw description**: first paragraph after the heading (before any `##` section)
- **Skill directory name**: the folder name (e.g. `gws-gmail`, `gws-calendar`)

---

### Step 3 — Transform into resource fields

For each skill, generate these fields:

| Field | Value |
|-------|-------|
| `title` | `[Service Name] Skill` — e.g. "Gmail Skill", "Google Calendar Skill" |
| `slug` | `skill-[directory-name]` — e.g. `skill-gws-gmail`, `skill-gws-calendar` |
| `description` | First 200 chars of the raw description from SKILL.md. Must start with a verb. If it doesn't, prepend "Use this skill to ". Never exceed 300 chars. |
| `url` | `https://github.com/googleworkspace/cli/tree/main/[directory-name]` |
| `category_id` | Look up: `SELECT id FROM categories WHERE slug = 'skills' LIMIT 1` |
| `author_id` | Look up: `SELECT id FROM users WHERE role = 'ADMIN' LIMIT 1` |
| `verified` | `true` — Google-authored |
| `featured` | `false` |
| `status` | `LIVE` |
| `github_stars` | `0` |
| `github_forks` | `0` |
| `is_indexed` | `false` |

---

### Step 4 — Insert with duplicate protection

Use `ON CONFLICT (slug) DO NOTHING` — same pattern as all existing seed scripts.

---

### File to create: `scripts/ingest-gws-skills.ts`

```typescript
import postgres from 'postgres';
import { config } from 'dotenv';
import { resolve } from 'path';
import { v4 as uuidv4 } from 'uuid';

config({ path: resolve(process.cwd(), '.env.local') });

const sql = postgres(process.env.DATABASE_URL!, { ssl: 'require', prepare: false });

async function fetchSkillList(): Promise<string[]> {
  const response = await fetch('https://api.github.com/repos/googleworkspace/cli/contents/', {
    headers: { 'User-Agent': 'googleantigravity-directory' }
  });
  const items = await response.json() as Array<{ name: string; type: string }>;
  return items
    .filter(item => item.type === 'dir' && item.name.startsWith('gws-'))
    .map(item => item.name);
}

async function fetchSkillMd(skillDir: string): Promise<string | null> {
  const response = await fetch(
    `https://api.github.com/repos/googleworkspace/cli/contents/${skillDir}/SKILL.md`,
    { headers: { 'User-Agent': 'googleantigravity-directory' } }
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
  const lines = markdown.split('\n');

  // Extract service name from first # heading
  const headingLine = lines.find(l => l.startsWith('# '));
  const serviceName = headingLine ? headingLine.replace(/^#\s+/, '').trim() : skillDir;

  // Extract first paragraph (non-empty line after heading, before next ##)
  let rawDesc = '';
  let pastHeading = false;
  for (const line of lines) {
    if (line.startsWith('# ')) { pastHeading = true; continue; }
    if (!pastHeading) continue;
    if (line.startsWith('##')) break;
    if (line.trim()) { rawDesc = line.trim(); break; }
  }

  // Ensure description starts with a verb
  let description = rawDesc.slice(0, 300);
  if (!description) description = `Use this skill to manage ${serviceName} in Google Workspace.`;
  if (!/^[A-Z]/.test(description)) description = `Use this skill to ${description}`;

  return {
    title: `${serviceName} Skill`,
    slug: `skill-${skillDir}`,
    description,
    url: `https://github.com/googleworkspace/cli/tree/main/${skillDir}`,
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
```

---

### Step 5 — Run the script

```bash
npx tsx scripts/ingest-gws-skills.ts 2>&1 | tee temp/task049_ingest.log
```

---

### Step 6 — Verify the insert

```bash
npx tsx -e "
import postgres from 'postgres';
import { config } from 'dotenv';
import { resolve } from 'path';
config({ path: resolve(process.cwd(), '.env.local') });
const sql = postgres(process.env.DATABASE_URL!, { ssl: 'require', prepare: false });
const rows = await sql\`SELECT COUNT(*) as count FROM resources WHERE slug LIKE 'skill-gws-%' AND status = 'LIVE'\`;
console.log('GWS skills in DB:', rows[0].count);
await sql.end();
" 2>&1 | tee temp/task049_verify.log
```

Expected: count > 0 (should be 80–120 depending on repo contents)

---

## QA — VERIFICATION TESTS

No UI changes. Verification is mechanical:

- Test 1: `cat temp/task049_ingest.log` — expect: "Done. Inserted: [N]" with N > 0, zero errors
- Test 2: `cat temp/task049_verify.log` — expect: count matching inserted number
- Test 3: Check 3 random rows: `SELECT title, slug, description, url, verified, status FROM resources WHERE slug LIKE 'skill-gws-%' LIMIT 3` — expect: title ends in " Skill", slug starts with "skill-gws-", description is 30-300 chars, url is a valid github.com link, verified=true, status=LIVE
- Test 4: Build passes — `temp/task049_build.log`
- Test 5: Lint passes — `temp/task049_lint.log`

---

## RETROGRADE CHECK

- **Who is this for?** Developers searching for Google Workspace automation skills. These are the highest-authority skills available — Google-authored, official, production-ready.
- **Adjacent dead code:** None.
- **Antigravity action:** None beyond this task.

---

## SCREENSHOTS
NONE — no UI changes in this task (DB ingestion only)

## ACCEPTANCE CRITERIA

- [ ] `scripts/ingest-gws-skills.ts` exists — verified by: reading the file
- [ ] `temp/task049_ingest.log` shows "Done. Inserted: N" with N > 0 — verified by: reading the file
- [ ] `temp/task049_verify.log` shows count > 0 — verified by: reading the file
- [ ] 3 random DB rows verified: title ends in " Skill", slug starts "skill-gws-", description 30-300 chars, url valid github link, verified=true, status=LIVE — verified by: reading temp/task049_verify.log
- [ ] Build passes — verified by: `temp/task049_build.log`
- [ ] Lint passes — verified by: `temp/task049_lint.log`

---

## QUESTIONS FROM ANTIGRAVITY

_Antigravity writes questions here_

## PM ANSWERS

_PM answers here_
