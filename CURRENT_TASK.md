# CURRENT TASK — TASK-057: Schema Cleanup + Badge Fix (3 fixes)
**Assigned by**: Claude Code (PM)
**Date**: 2026-03-13
**Branch**: fix/post-audit-cleanup (current branch)

---

## WHY THIS TASK EXISTS

TASK-056 SEO audit identified dead/deprecated schema on two pages. Fix 3 was added after PM full codebase audit (2026-03-13) found the BadgeGenerator is showing hardcoded fake stats on every resource detail page.

**Note on aggregateRating**: Originally planned as Fix 1. REMOVED from this task. Rating UI was removed in TASK-024 (commit 361550e). No user can submit ratings. Ratings table will be empty. Adding aggregateRating schema without real visible ratings = misleading structured data = Google ignores or flags it. Will be addressed separately once a real signal mechanism exists (TASK-058).

---

## FEATURE STATE CHECK (PM Rule 10)

Fields referenced in this task — verified against `docs/FEATURE_STATE.md`:
- `faqJsonLd` — schema variable in `src/app/t/[slug]/page.tsx` lines 122-151. No UI feature depends on it. Safe to delete.
- `potentialAction` / `SearchAction` — inside WebSite JSON-LD in `src/app/page.tsx` lines 102-109. No UI feature depends on it. Safe to delete.
- `views` / `avgRating` — used in badge API. BACKEND-ONLY (views=0, ratings table empty). Badge should NOT reference them. Removing from SVG is correct.

---

## PM VERIFIED CONTENT

### Fix 1 — FAQPage dead schema (resource detail pages)

**File**: `src/app/t/[slug]/page.tsx`

PM read lines 122-151: `faqJsonLd` variable defined. Three fake Q&A pairs hardcoded.
PM read lines 185-188: script tag outputs it.

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: safeJsonLd(faqJsonLd) }}
/>
```

**Why remove**: FAQPage rich results restricted to gov/health sites since 2023. Generates GSC structured data warnings across 3,116 pages. Zero SEO value.

---

### Fix 2 — SearchAction deprecated (homepage)

**File**: `src/app/page.tsx`

PM read lines 93-112. Contains `potentialAction` block with `SearchAction`.

**Why remove potentialAction only**: Google deprecated Sitelinks Search Box November 2024. `WebSite` schema itself must stay — Google uses it for site name recognition in SERP.

**After fix**, the script tag must contain only:
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Antigravity Directory",
  "url": "https://googleantigravity.directory",
  "description": "The #1 resource directory for Google Antigravity IDE"
}
```

---

### Fix 3 — BadgeGenerator fake stats (resource detail pages)

**Files**: `src/components/BadgeGenerator.tsx` AND `src/app/api/badges/[slug]/route.ts`

**PM read BadgeGenerator.tsx lines 53-59:**
```tsx
<span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Featured on Antigravity</span>
<span className="text-[13px] font-bold text-white font-sans flex items-center gap-1.5">
   <span>👁 1.2k</span>
   <span className="text-slate-600">•</span>
   <span>★ 4.9</span>
</span>
```
These numbers are hardcoded. Not real data. Every resource page shows "👁 1.2k • ★ 4.9" to authors.

**PM read badge API route.ts lines 37-39:**
```ts
const viewsText = formatNumber(data.views);
const ratingText = Number(data.avgRating).toFixed(1);
const statsLine = `👁 ${viewsText} • ★ ${ratingText}`;
```
Actual badge SVG served to external embeds shows "👁 0 • ★ 0.0" for all resources because views=0 and ratings table is empty.

**Founder direction**: Badge should only say "Listed on Antigravity Directory". No stats.

**After fix — BadgeGenerator.tsx preview:**
- Change text from "Featured on Antigravity" → "Listed on Antigravity Directory"
- Delete the entire stats span block (both the emoji spans and their parent)
- Keep lightning bolt logo, keep embed code logic, keep heading and description

**After fix — badge API SVG:**
- Remove `formatNumber` function entirely
- Remove `viewsText`, `ratingText`, `statsLine` variables
- Remove DB join with `ratings` table — only select `title` from `resources`
- Change SVG `<text>` content from "Featured on Antigravity" → "Listed on Antigravity Directory"
- Remove the second `<text>` element (was rendering statsLine)
- Set the remaining `<text>` element `y="30"` to vertically centre in 50px badge
- Keep gradient, logo path, border rect, 200×50 dimensions

---

## IMPLEMENTATION INSTRUCTIONS

### Fix 1 — Remove FAQPage (`src/app/t/[slug]/page.tsx`)
1. Delete `faqJsonLd` variable definition (lines 122-151)
2. Delete script tag that outputs it (lines 185-188)
3. Do NOT touch SoftwareApplication schema or BreadcrumbList schema

### Fix 2 — Remove SearchAction (`src/app/page.tsx`)
Remove only the `potentialAction` object from the WebSite JSON. Keep `@context`, `@type`, `name`, `url`, `description`. Do not touch anything else.

### Fix 3 — Fix BadgeGenerator

**BadgeGenerator.tsx:**
1. Change preview header text: "Featured on Antigravity" → "Listed on Antigravity Directory"
2. Delete the entire stats span block (👁 1.2k • ★ 4.9 and parent)
3. Do not change embed code logic, heading, description, or copy button

**badge API route.ts:**
1. Remove `formatNumber` function
2. Remove `viewsText`, `ratingText`, `statsLine` variables
3. Remove `views`, `avgRating`, `ratingCount` from DB select — only keep `title`
4. Remove `.leftJoin(ratings, ...)` — no longer needed
5. In SVG: change first `<text>` content to "Listed on Antigravity Directory"
6. In SVG: delete the second `<text>` element (statsLine)
7. Set remaining `<text>` element `y="30"` for vertical centering
8. Keep gradient, logo, border, 200×50 dimensions

---

## MANDATORY CROSS-CHECK

Before implementing, Antigravity must confirm:

1. Read `src/app/t/[slug]/page.tsx` lines 122-151 — does `faqJsonLd` have three fake Q&A pairs?
2. Read lines 185-188 of same file — is FAQPage script tag present?
3. Read `src/app/page.tsx` lines 93-112 — does WebSite + SearchAction block match?
4. Read `src/components/BadgeGenerator.tsx` lines 53-59 — hardcoded "👁 1.2k • ★ 4.9" present?
5. Read `src/app/api/badges/[slug]/route.ts` lines 37-39 — `viewsText`, `ratingText`, `statsLine` present?

If ANY reading does not match — STOP and report. Do not implement until PM confirms.

---

## MANDATORY REPORT FORMAT

```
TASK-057 IMPLEMENTATION REPORT
================================

Cross-check results:
- Fix 1 faqJsonLd check: [MATCH / MISMATCH — paste lines 122-151]
- Fix 1 script tag check: [MATCH / MISMATCH — paste lines 185-188]
- Fix 2 WebSite check: [MATCH / MISMATCH — paste lines 93-112]
- Fix 3 BadgeGenerator check: [MATCH / MISMATCH — paste lines 53-59]
- Fix 3 badge API check: [MATCH / MISMATCH — paste lines 37-39]

Changes made:

Fix 1 — FAQPage removed:
[confirm: faqJsonLd variable deleted]
[confirm: script tag deleted]
[paste surrounding lines showing clean removal]

Fix 2 — SearchAction removed:
[paste updated WebSite JSON-LD block — must show potentialAction gone]

Fix 3 — BadgeGenerator fixed:
[paste updated BadgeGenerator preview block — must show "Listed on Antigravity Directory", no stats]
[paste updated badge API SVG block — no statsLine, single text element at y="30"]

Evidence:
1. Screenshots: temp/task057_detail_page.png, temp/task057_homepage.png, temp/task057_badge_preview.png
2. Screen recording: temp/task057_recording.webm
3. Git commit hash: [hash]
4. Git diff: [exact changed lines only]
5. Build log: [full output + exit code 0]
6. Lint log: [full output + exit code 0]
7. HTTP status: /t/[any-slug] → 200, / → 200
8. Browser console: no errors on detail page and homepage
9. Network tab: no schema errors in console
```

---

## DO NOT CHANGE

- SoftwareApplication schema block
- BreadcrumbList schema
- Embed code URL logic in BadgeGenerator (only the visual preview + API SVG change)
- Any component files other than BadgeGenerator.tsx
- Any category page files
- Any DB schema files
- No aggregateRating changes
