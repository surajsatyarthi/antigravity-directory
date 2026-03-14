# CURRENT TASK — TASK-084: Fix www/non-www URL mismatch + title length
**Assigned by**: Claude Code (PM)
**Date**: 2026-03-14
**Branch**: fix/post-audit-cleanup

---

## WHY THIS TASK EXISTS

Ahrefs site audit shows **Health Score: 0**.

Top issues:
- 3XX redirect in sitemap: 3,160
- Canonical points to redirect: 3,160
- Title too long: 3,157

**Root cause — URL mismatch:**
`NEXT_PUBLIC_SITE_URL = https://www.googleantigravity.directory` (with www) — confirmed in `.env.local` line 12.

Every hardcoded URL in the codebase uses `https://googleantigravity.directory` (no www) — 25 occurrences across 12 files. Vercel redirects non-www → www (307). So every sitemap entry and every canonical tag points to the redirecting domain. The Ahrefs crawler follows those URLs, hits a redirect, and flags all 3,160 as broken.

**Root cause — title length:**
Current format on resource detail pages: `${resource.title} — Antigravity ${categoryName} | googleantigravity.directory`
Example: "GitHub MCP Server — Antigravity MCP Servers | googleantigravity.directory" = 74 chars.
Google truncates at ~60 chars. Fix: drop the domain suffix from all title tags.

Fixing both issues resolves **6,320 of 6,323 Ahrefs errors** in one deploy.

---

## ALSO DO IN THIS TASK: commit TASK-082 script

The `scripts/backfill-content.ts` file was never committed to git. Before starting TASK-084 work, commit it:
```
git add scripts/backfill-content.ts
git commit -m "feat(scripts): add content backfill script (TASK-082)"
```

---

## FIX 1 — Global URL find-and-replace (25 occurrences, 12 files)

Replace every instance of:
```
https://googleantigravity.directory
```
with:
```
https://www.googleantigravity.directory
```

**Complete list of files and lines to change:**

| File | Lines |
|---|---|
| `src/app/layout.tsx` | 22, 36 |
| `src/app/sitemap.ts` | 6 |
| `src/app/robots.ts` | 32 |
| `src/app/page.tsx` | 23, 26, 100 |
| `src/app/about/page.tsx` | 8 |
| `src/app/advertise/page.tsx` | 21 |
| `src/app/google-antigravity/page.tsx` | 14 |
| `src/app/t/[slug]/page.tsx` | 50, 60, 143, 160, 166, 172, 238 |
| `src/app/[slug]/page.tsx` | 77, 83, 112, 119, 120 |
| `src/lib/indexnow.ts` | 1 |
| `src/components/BadgeGenerator.tsx` | 15 (fallback string only) |
| `src/lib/validation.ts` | 147 (fallback string only) |

Use a global find-and-replace across `src/`. Do NOT touch any other string.

---

## FIX 2 — Title length (2 files)

### `src/app/t/[slug]/page.tsx` — line 39

**Current:**
```typescript
const title = `${resource.title} — Antigravity ${categoryName} | googleantigravity.directory`;
```

**Fix:**
```typescript
const title = `${resource.title} | Antigravity ${categoryName}`;
```

### `src/app/[slug]/page.tsx` — line 70

**Current:**
```typescript
const title = `${category.name} for Google Antigravity IDE | googleantigravity.directory`;
```

**Fix:**
```typescript
const title = `${category.name} for Google Antigravity IDE`;
```

No other title changes needed. `layout.tsx` default title (line 25) is already 52 chars — acceptable.

---

## CROSS-CHECK INSTRUCTIONS

Before implementing, confirm these exact lines match:

1. `src/app/layout.tsx` line 22: `metadataBase: new URL('https://googleantigravity.directory')` ✅ PM verified
2. `src/app/sitemap.ts` line 6: `const BASE_URL = 'https://googleantigravity.directory';` ✅ PM verified
3. `src/app/t/[slug]/page.tsx` line 39: `` const title = `${resource.title} — Antigravity ${categoryName} | googleantigravity.directory`; `` ✅ PM verified
4. `src/app/[slug]/page.tsx` line 70: `` const title = `${category.name} for Google Antigravity IDE | googleantigravity.directory`; `` ✅ PM verified
5. `.env.local` line 12: `NEXT_PUBLIC_SITE_URL="https://www.googleantigravity.directory"` ✅ PM verified

If any of these do not match — STOP and report before implementing.

---

## FEATURE STATE CHECK

- `metadataBase` in `layout.tsx` — ACTIVE. Affects how Next.js resolves relative OG/Twitter image URLs globally.
- `canonical` URLs — ACTIVE on all page routes. Directly affects Google indexing.
- `sitemap.ts BASE_URL` — ACTIVE. All 3,160 sitemap entries use this.
- Title `template` in `layout.tsx` line 24: `"%s | Antigravity Directory"` — ACTIVE. Not changed by this task.

---

## RETROGRADE CHECK

1. *Who is this for?* Google's crawler and every user who lands on the site via search. Affects every one of 3,116 pages.
2. *Adjacent dead code?* None. This is a string replacement. No logic changes. Zero regression risk.
3. *Risk?* Essentially zero. We are changing non-canonical URLs to match the live canonical domain. The 307 redirects from non-www to www will continue to work — they are Vercel-level, not code-level.

---

## MANDATORY REPORT FORMAT

Required evidence files in `temp/`:
- `temp/task084_build.log` — full build output, exit code 0
- `temp/task084_lint.log` — full lint output, exit code 0
- `temp/task084_http_status.txt` — HTTP status for:
  - `https://www.googleantigravity.directory/` — must be 200
  - `https://www.googleantigravity.directory/t/[any-live-slug]` — must be 200
  - `https://www.googleantigravity.directory/mcp-servers` — must be 200

Required screenshots in `temp/`:
- `temp/task084_detail_page.png` — any resource detail page showing correct page load (no redirect error)
- `temp/task084_sitemap.png` — browser view of `https://www.googleantigravity.directory/sitemap.xml` showing www URLs

Report must include:
1. Confirmation that all 5 cross-check items matched
2. Git commit hash for TASK-082 script commit
3. Git commit hash for TASK-084 URL + title fix
4. Total number of occurrences replaced (must be 25)
5. Confirmation that title format on detail pages no longer includes the domain suffix
6. Build log exit code
7. Lint log exit code
8. HTTP status file contents
