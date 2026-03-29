SESSION-PROTOCOL-CONFIRMED: 2026-03-29

# CURRENT TASK — TASK-096: Content Backfill — Remaining Categories

## RESEARCH
- Web: Query: "official GitHub repository ingestion SEO directory first mover advantage" → URL: https://nakora.ai/blog/github-seo → Finding: "Many devtool companies and projects use GitHub SEO to get attention, users, and customers, but this acquisition channel is still not very professionalized, so earlier adopters have the potential to get huge results."
- Reddit: Query: "developer tool directory copy button content empty" → URL: https://www.reddit.com/r/devtools/search/?q=copy+button+content+empty&sort=top → Finding: Directories without copyable content lose users immediately — developers expect to copy-paste, not read.
- Internal audit: DB query confirms — workflows: 173 eligible, agents: 52, boilerplates: 42, skills: 44 (subdirectory path issue), prompts: 0 (no GitHub URLs), troubleshooting: 0 resources.

---

## WHAT TO BUILD

`scripts/backfill-content.ts` already exists and supports `--category` flag. Run it against workflows, agents, and boilerplates. Skills have a non-standard URL pattern (`/tree/main/skills/gws-*`) that the backfill script cannot handle — write a separate script for them. Prompts and troubleshooting are explicitly out of scope (0 eligible each).

**Expected result**: ~311 new content fields populated. CopyButton will render on detail pages for these resources.

---

## TECHNICAL SPEC

### Part 1 — Run existing backfill script for 3 categories

Run these commands one at a time. Wait for each to finish before running the next. Capture each log separately.

**Step 1a — workflows (173 eligible):**
```bash
npx tsx scripts/backfill-content.ts --category workflows 2>&1 | tee temp/task096_workflows.log
```

**Step 1b — agents (52 eligible):**
```bash
npx tsx scripts/backfill-content.ts --category agents 2>&1 | tee temp/task096_agents.log
```

**Step 1c — boilerplates (42 eligible):**
```bash
npx tsx scripts/backfill-content.ts --category boilerplates 2>&1 | tee temp/task096_boilerplates.log
```

---

### Part 2 — New script for GWS skills content

Skills URLs are subdirectory paths: `https://github.com/googleworkspace/cli/tree/main/skills/gws-admin-reports`

The backfill script cannot handle these — it parses owner/repo and fetches from repo root. We need to extract the subdirectory and fetch from there.

**Create: `scripts/backfill-gws-skills-content.ts`**

```typescript
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
    headers: { 'User-Agent': 'googleantigravity-directory' }
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
```

**Run it:**
```bash
npx tsx scripts/backfill-gws-skills-content.ts 2>&1 | tee temp/task096_skills.log
```

---

### Part 3 — Verify all 4 categories

```bash
npx tsx -e "
import postgres from 'postgres';
import { config } from 'dotenv';
import { resolve } from 'path';
config({ path: resolve(process.cwd(), '.env.local') });
const sql = postgres(process.env.DATABASE_URL!, { ssl: 'require', prepare: false });
const rows = await sql\`
  SELECT c.slug,
    COUNT(*) as total,
    COUNT(CASE WHEN r.content IS NOT NULL THEN 1 END) as has_content,
    COUNT(CASE WHEN r.content IS NULL THEN 1 END) as empty_content
  FROM resources r
  INNER JOIN categories c ON r.category_id = c.id
  WHERE c.slug IN ('workflows','agents','boilerplates','skills')
  AND r.status = 'LIVE'
  GROUP BY c.slug
  ORDER BY c.slug
\`;
console.log(JSON.stringify(rows, null, 2));
await sql.end();
" 2>&1 | tee temp/task096_verify.log
```

---

### Part 4 — Build + lint

```bash
npm run build 2>&1 | tee temp/task096_build.log
npm run lint 2>&1 | tee temp/task096_lint.log
```

---

### Part 5 — Stage and commit

```bash
git add scripts/backfill-gws-skills-content.ts logs/tasks/TASK-096/spec.md logs/tasks/TASK-096/outcome.md logs/TASK_INDEX.md
git commit -m "TASK-096: Content backfill — workflows, agents, boilerplates, GWS skills"
```

---

## QA — VERIFICATION TESTS

No UI changes. Verification is mechanical:

- Test 1: `temp/task096_workflows.log` — expect: summary shows updated > 0, errors = 0
- Test 2: `temp/task096_agents.log` — expect: summary shows updated > 0, errors = 0
- Test 3: `temp/task096_boilerplates.log` — expect: summary shows updated > 0, errors = 0
- Test 4: `temp/task096_skills.log` — expect: "Done. Updated: N" with N > 0
- Test 5: `temp/task096_verify.log` — expect: has_content > 0 for all 4 categories
- Test 6: Build passes — `temp/task096_build.log`
- Test 7: Lint passes — `temp/task096_lint.log`

---

## RETROGRADE CHECK

- **Who is this for?** Developers on detail pages who want to copy content (workflow YAML, agent config, boilerplate install command, skill instructions). CopyButton only renders when `content` is populated — currently invisible for these 6 categories.
- **Adjacent dead code:** None.
- **Antigravity action:** None beyond this task.

---

## SCREENSHOTS
NONE — no UI changes in this task (DB-only)

## ACCEPTANCE CRITERIA

- [ ] `temp/task096_workflows.log` shows updated > 0 — verified by: reading the file
- [ ] `temp/task096_agents.log` shows updated > 0 — verified by: reading the file
- [ ] `temp/task096_boilerplates.log` shows updated > 0 — verified by: reading the file
- [ ] `temp/task096_skills.log` shows "Updated: N" with N > 0 — verified by: reading the file
- [ ] `temp/task096_verify.log` shows has_content > 0 for all 4 categories — verified by: reading the file
- [ ] `scripts/backfill-gws-skills-content.ts` exists — verified by: reading the file
- [ ] Build passes — verified by: `temp/task096_build.log`
- [ ] Lint passes — verified by: `temp/task096_lint.log`

---

## QUESTIONS FROM ANTIGRAVITY

_Antigravity writes questions here_

## PM ANSWERS

_PM answers here_
