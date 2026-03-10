# CURRENT TASK — TASK-027: Merge to Main + Deploy to Production + Live Site Audit
**Assigned by**: Claude Code (PM)
**Date**: 2026-03-10
**Priority**: CRITICAL — nothing reaches the live site until this is done

---

## CONTEXT

All work since TASK-011 lives on `feat/ui-cursor-patterns`. The `main` branch is 30+ commits behind. Vercel deploys from `main`. The live site at googleantigravity.directory is running old code. This task merges the branch, pushes to production, and verifies the live site looks correct.

---

## MANDATORY PRE-CHECK

Run these before doing anything:

```bash
git log main --oneline -3
git log feat/ui-cursor-patterns --oneline -3
git diff main..feat/ui-cursor-patterns --stat
```

Expected:
- `main` most recent commit should be something old (pre-TASK-011)
- `feat/ui-cursor-patterns` most recent commit: `361550e feat(ux): remove ratings and views...`
- Diff stat: 30+ files changed

If `main` has NEW commits not in `feat/ui-cursor-patterns` — STOP and report to PM before merging. Do NOT force-push.

---

## PART 1 — MERGE AND PUSH

```bash
git checkout main
git merge feat/ui-cursor-patterns --no-edit
git push origin main
git log main --oneline -3
```

Paste the output of `git log main --oneline -3` in your report.

---

## PART 2 — WAIT FOR VERCEL DEPLOY

After pushing, Vercel will auto-deploy. Wait for the deploy to complete before proceeding.

Check deploy status:
```bash
npx vercel ls 2>/dev/null || echo "Use Vercel dashboard"
```

Or simply wait 3–5 minutes and proceed to Part 3.

---

## PART 3 — LIVE SITE VERIFICATION (AUTOMATED BROWSER)

Use the automated browser to visit the live site. Navigate to each URL below and take a screenshot.

Base URL: `https://googleantigravity.directory`

### 3A — Homepage
URL: `https://googleantigravity.directory`

Verify:
- Dark background (black) — NOT white or light grey
- Resource cards visible in the list
- Header has search bar with dropdown (Amazon-style)
- "ADVERTISE HERE" badge visible bottom-right corner
- No "Sign In" button in the header

Screenshot: `temp/task027_homepage.png`

### 3B — Category page (MCP Servers — largest category, 2,033 resources)
URL: `https://googleantigravity.directory/mcp-servers`

Verify:
- Dark background
- "Sponsored / Your tool here" banner at the top
- Resource cards with no star ratings, no view counts
- Sort bar visible
- "ADVERTISE HERE" badge bottom-right

Screenshot: `temp/task027_category.png`

### 3C — Resource detail page
URL: `https://googleantigravity.directory/mcp-servers` → click any resource card

Verify:
- Dark background
- No stats bar (Rating / Views / Copies / Reviews grid)
- No "Rate this resource" stars at the bottom
- No "Sign in to verify your vote" text
- CitationBlock shows only 2 cells: "Entity Type" and "Trust Signal"
- Get Resource button has sharp corners (rounded-none)
- "ADVERTISE HERE" badge bottom-right

Screenshot: `temp/task027_detail.png`

### 3D — Tutorials category (expected: empty or near-empty)
URL: `https://googleantigravity.directory/tutorials`

Record exactly what you see — how many resources, or is it empty?

Screenshot: `temp/task027_tutorials.png`

### 3E — Cheatsheets category
URL: `https://googleantigravity.directory/cheatsheets`

Same — record what you see.

Screenshot: `temp/task027_cheatsheets.png`

### 3F — Advertise page
URL: `https://googleantigravity.directory/advertise`

Verify it loads (not 404). Record what you see.

Screenshot: `temp/task027_advertise.png`

---

## PART 4 — DB AUDIT (DEAD RESOURCES)

Run this SQL query on the production database to count resources with no url AND no content per category:

```sql
SELECT c.name as category, COUNT(*) as dead_count
FROM resources r
JOIN categories c ON r.category_id = c.id
WHERE r.status = 'LIVE'
AND r.url IS NULL
AND r.content IS NULL
GROUP BY c.name
ORDER BY dead_count DESC;
```

Run via Drizzle in a temp script OR via Supabase SQL editor if you have access.

If using a temp script, create `temp/audit.cjs`, run it, then delete it.

Paste the full result table in your report.

---

## PART 5 — HTTP STATUS CHECK (LIVE DOMAIN)

```bash
curl -o /dev/null -s -w "%{http_code}\n" https://googleantigravity.directory/
curl -o /dev/null -s -w "%{http_code}\n" https://googleantigravity.directory/mcp-servers
curl -o /dev/null -s -w "%{http_code}\n" https://googleantigravity.directory/tutorials
curl -o /dev/null -s -w "%{http_code}\n" https://googleantigravity.directory/cheatsheets
curl -o /dev/null -s -w "%{http_code}\n" https://googleantigravity.directory/advertise
```

All must return 200.

---

## DO NOT DO

- Do NOT merge with `--squash` — preserve full commit history
- Do NOT force-push main
- Do NOT change any source files in this task
- Do NOT delete the `feat/ui-cursor-patterns` branch (keep it as backup)

---

## MANDATORY REPORT FORMAT

```
TASK-027 REPORT
==============================

--- PART 0: PRE-CHECK ---
main most recent commit: [paste]
feat/ui-cursor-patterns most recent commit: [paste]
Files in diff: [count]

--- PART 1: MERGE ---
git merge output: [paste]
git push output: [paste]
main after merge (log -3): [paste]

--- PART 2: DEPLOY ---
Deploy status: [DEPLOYED / PENDING / ERROR]
Time waited: [X minutes]

--- PART 3: LIVE SITE ---
Homepage dark background: [YES/NO]
Homepage resource cards visible: [YES/NO]
Homepage search dropdown visible: [YES/NO]
Homepage "ADVERTISE HERE" badge: [YES/NO]
Homepage no Sign In button: [YES/NO]
---
Category page sponsor banner: [YES/NO]
Category page no star ratings on cards: [YES/NO]
---
Detail page no stats bar: [YES/NO]
Detail page no rating widget: [YES/NO]
Detail page 2-cell CitationBlock: [YES/NO]
---
Tutorials page: [empty / X resources]
Cheatsheets page: [empty / X resources]
Advertise page: [loads OK / 404]

--- PART 4: DB AUDIT ---
[paste full query result table]

--- PART 5: HTTP STATUS ---
/ → [status]
/mcp-servers → [status]
/tutorials → [status]
/cheatsheets → [status]
/advertise → [status]

--- SCREENSHOTS ---
temp/task027_homepage.png: [YES/NO]
temp/task027_category.png: [YES/NO]
temp/task027_detail.png: [YES/NO]
temp/task027_tutorials.png: [YES/NO]
temp/task027_cheatsheets.png: [YES/NO]
temp/task027_advertise.png: [YES/NO]

--- BUGS SPOTTED (do not fix, report only) ---
1.
```
