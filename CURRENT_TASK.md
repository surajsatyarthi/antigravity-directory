# CURRENT TASK — TASK-018: UX Fixes — Hero, Cards, Header Nav, Footer, Ad Slot
**Assigned by**: Claude Code (PM)
**Date**: 2026-03-09
**Priority**: HIGH
**Tier**: M (7 file edits, no new files)

---

## CONTEXT

Homepage is live with 10 category sections (TASK-017). PM design audit found 5 UX problems:
1. HeroSection has no subheading, no stat, no CTA button — spec says KEEP all three
2. ResourceCard rests at opacity-60 — makes all 50 cards look washed out
3. CategorySection h2 (icon + name) is not clickable — missed click target
4. "View all" link is 11px — barely readable
5. SponsoredCard placeholder is 140px tall — too heavy when no sponsor is active
6. Header nav More dropdown has Advertise (a business page, not a category) — already in footer, redundant in nav. Also: 4 categories (Agents, Boilerplates, Tutorials, Cheatsheets) are missing from nav entirely.
7. Footer background is `bg-slate-900` while the page is `bg-black` — visual break. Bottom bar border uses `border-slate-700` instead of design token. No Google non-affiliation disclaimer — legal risk.
Plus: dead code in ResourceCard (hidden copy+bookmark on hover — copy has no onClick, bookmark duplicates the one already in stats row)

---

## MANDATORY CROSS-CHECK PROTOCOL

Before making ANY change: open the file, find the exact line listed, confirm the PM VERIFIED CONTENT matches what you see. If it does NOT match — STOP and report to PM. Do not implement that fix.

---

## FIX 1 — HeroSection.tsx — add subheading + stat + CTA

**File**: `src/components/HeroSection.tsx`

**Line 3 — PM VERIFIED CONTENT:**
```
export function HeroSection() {
```
OLD signature: `HeroSection()` — no props

NEW signature: `HeroSection({ totalCount }: { totalCount?: number })`

**Line 5 — PM VERIFIED CONTENT:**
```
<section className="relative py-16 md:py-20 flex items-center justify-center overflow-hidden">
```
No changes to section wrapper.

**Lines 9–13 — PM VERIFIED CONTENT (entire inner div):**
```
      <div className="container mx-auto px-6 sm:px-8 relative z-10 text-center max-w-5xl">
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase italic leading-[1.1]">
          The #1 Resource Directory for Google Antigravity IDE
        </h1>
      </div>
```

**Replace the entire inner div with:**
```tsx
      <div className="container mx-auto px-6 sm:px-8 relative z-10 text-center max-w-5xl">
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase italic leading-[1.1]">
          The #1 Resource Directory for Google Antigravity IDE
        </h1>
        {totalCount !== undefined && totalCount > 0 && (
          <p className="mt-4 text-gray-400 text-base md:text-lg font-medium">
            Browse {totalCount.toLocaleString()}+ free MCP servers, rules, prompts, skills and workflows.
          </p>
        )}
        <div className="mt-6">
          <a
            href="#directory"
            className="inline-block px-8 py-3 bg-white text-black font-black text-sm uppercase tracking-widest hover:bg-gray-100 transition-colors"
          >
            Browse Resources
          </a>
        </div>
      </div>
```

---

## FIX 2 — ResourceCard.tsx — remove opacity dimming + remove dead hover buttons

**File**: `src/components/ResourceCard.tsx`

### Part A — Remove opacity

**Line 30 — PM VERIFIED CONTENT:**
```
      className={`group relative flex flex-col sm:flex-row items-start sm:items-center bg-white/[0.03] border rounded-none overflow-hidden opacity-60 hover:opacity-100 hover:border-blue-500/40 transition-all duration-200 focus-within:ring-1 focus-within:ring-blue-500/50 focus-within:ring-offset-1 focus-within:ring-offset-black ${
```
OLD: `opacity-60 hover:opacity-100 hover:border-blue-500/40`
NEW: `hover:border-blue-500/40`

Remove `opacity-60` and `hover:opacity-100` only. Keep all other classes unchanged.

### Part B — Remove dead hover buttons (lines 136–146)

**Lines 136–146 — PM VERIFIED CONTENT:**
```
      {/* Action buttons — hidden by default, shown on hover */}
      <div className="absolute bottom-3 right-3 hidden group-hover:flex items-center gap-2 z-10">
        {/* Copy button */}
        <button className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-slate-700 transition-colors">
          <Copy className="w-3.5 h-3.5" />
        </button>
        {/* Bookmark button */}
        <button className="w-8 h-8 rounded-full bg-white/[0.06] border border-white/[0.12] text-gray-400 flex items-center justify-center hover:border-slate-400 transition-colors">
          <Bookmark className="w-3.5 h-3.5" />
        </button>
      </div>
```
**Delete** these 11 lines entirely. The Copy button has no onClick handler (dead code). The Bookmark button duplicates the BookmarkButton already rendered at line 122.

After deletion, also check the imports at the top of the file. If `Copy` and `Bookmark` are no longer used anywhere else in the file, remove them from the import on line 3:

**Line 3 — PM VERIFIED CONTENT:**
```
import { Star, Eye, ArrowRight, Package, Copy, Bookmark } from 'lucide-react';
```
NEW (remove `Copy` and `Bookmark` if unused):
```
import { Star, Eye, ArrowRight, Package } from 'lucide-react';
```
Verify `Copy` and `Bookmark` are not used elsewhere in the file before removing. If they are used elsewhere, keep them.

---

## FIX 3 — CategorySection.tsx — clickable header + larger "View all"

**File**: `src/components/CategorySection.tsx`

**Lines 18–29 — PM VERIFIED CONTENT:**
```
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white font-black text-lg uppercase tracking-tight flex items-center gap-2">
          <span>{icon}</span>
          <span>{name}</span>
        </h2>
        <Link
          href={`/${slug}`}
          className="text-[11px] font-semibold text-gray-400 hover:text-white transition-colors tracking-wide uppercase"
        >
          View all {totalCount} →
        </Link>
      </div>
```

**Replace with:**
```tsx
      <div className="flex items-center justify-between mb-4">
        <Link
          href={`/${slug}`}
          className="text-white font-black text-lg uppercase tracking-tight flex items-center gap-2 hover:text-blue-400 transition-colors"
        >
          <span>{icon}</span>
          <span>{name}</span>
        </Link>
        <Link
          href={`/${slug}`}
          className="text-xs font-semibold text-gray-400 hover:text-white transition-colors tracking-wide uppercase"
        >
          View all {totalCount} →
        </Link>
      </div>
```

Note: `text-[11px]` → `text-xs` (12px — more readable, still compact).

---

## FIX 4 — SponsoredCard.tsx — reduce placeholder height

**File**: `src/components/SponsoredCard.tsx`

**Line 58 — PM VERIFIED CONTENT (the placeholder/inactive Link className):**
```
      className="group relative flex flex-col sm:flex-row items-start sm:items-center bg-white/[0.02] border border-dashed border-white/[0.06] rounded-lg overflow-hidden hover:border-white/20 transition-all duration-300 min-h-[140px]"
```
OLD: `min-h-[140px]`
NEW: remove `min-h-[140px]` entirely (let content determine height)

The real sponsor card at line 14 also has `min-h-[140px]` — do NOT touch that. Only change the placeholder card (line 58).

---

## FIX 5 — page.tsx — compute totalResources, pass to HeroSection, add id="directory"

**File**: `src/app/page.tsx`

**Line 53 — PM VERIFIED CONTENT:**
```
  const countMap = Object.fromEntries(
    categoryCounts.map((c: any) => [c.slug, c.count])
  );
```

**After line 55 (after the closing `);` of countMap), add:**
```tsx
  const totalResources = Object.values(countMap).reduce((sum: number, count) => sum + (Number(count) || 0), 0);
```

**Line 113 — PM VERIFIED CONTENT:**
```
        <HeroSection />
```
OLD: `<HeroSection />`
NEW: `<HeroSection totalCount={totalResources} />`

**Line 120 — PM VERIFIED CONTENT:**
```
        {/* Category sections — 5 resources each */}
        {categorySections.map((cat) => (
```
Add `id="directory"` wrapper div around the category sections map:

OLD:
```tsx
        {/* Category sections — 5 resources each */}
        {categorySections.map((cat) => (
          <CategorySection
            key={cat.slug}
            name={cat.name}
            slug={cat.slug}
            icon={cat.icon}
            resources={cat.resources}
            totalCount={countMap[cat.slug] ?? 0}
          />
        ))}
```
NEW:
```tsx
        {/* Category sections — 5 resources each */}
        <div id="directory">
          {categorySections.map((cat) => (
            <CategorySection
              key={cat.slug}
              name={cat.name}
              slug={cat.slug}
              icon={cat.icon}
              resources={cat.resources}
              totalCount={countMap[cat.slug] ?? 0}
            />
          ))}
        </div>
```

---

## FIX 6 — navigation.ts — clean up nav: remove Advertise, add missing categories

**File**: `src/config/navigation.ts`

**Lines 11–26 — PM VERIFIED CONTENT (entire NAV_ITEMS array):**
```typescript
export const NAV_ITEMS: NavItem[] = [
  { label: 'Rules', href: '/rules' },
  { label: 'Prompts', href: '/prompts', isNew: true },
  { label: 'MCPs', href: '/mcp-servers' },
  { label: 'Workflows', href: '/workflows' },
  { label: 'Skills', href: '/skills' },
  {
    label: 'More',
    href: '#',
    children: [
      { label: 'Troubleshooting', href: '/troubleshooting' },

      { label: 'Advertise', href: '/advertise' },
    ]
  },
];
```

Issues:
- `Advertise` is in the More dropdown — it's a business/sales page, not a resource category. Already in footer. Remove it.
- `isNew: true` on Prompts is dead code — NavLinks never renders it. Remove it.
- Agents, Boilerplates, Tutorials, Cheatsheets are missing from the nav entirely. Add them to the More dropdown.

**Replace the entire NAV_ITEMS array with:**
```typescript
export const NAV_ITEMS: NavItem[] = [
  { label: 'Rules', href: '/rules' },
  { label: 'Prompts', href: '/prompts' },
  { label: 'MCPs', href: '/mcp-servers' },
  { label: 'Workflows', href: '/workflows' },
  { label: 'Skills', href: '/skills' },
  {
    label: 'More',
    href: '#',
    children: [
      { label: 'Agents', href: '/agents' },
      { label: 'Boilerplates', href: '/boilerplates' },
      { label: 'Tutorials', href: '/tutorials' },
      { label: 'Cheatsheets', href: '/cheatsheets' },
      { label: 'Troubleshooting', href: '/troubleshooting' },
    ]
  },
];
```

---

## FIX 7 — Footer.tsx — bg-black, correct border, add Google disclaimer

**File**: `src/components/Footer.tsx`

**Line 5 — PM VERIFIED CONTENT:**
```
    <footer className="bg-slate-900 text-white">
```
OLD: `bg-slate-900`
NEW: `bg-black border-t border-white/[0.08]`

**Line 53 — PM VERIFIED CONTENT:**
```
        <div className="border-t border-slate-700 mt-12 pt-6 flex items-center justify-between text-xs text-slate-500">
```
OLD: `border-slate-700`
NEW: `border-white/[0.08]`

**Line 54 — PM VERIFIED CONTENT:**
```
          <p>© 2026 Antigravity Directory</p>
```
**Replace line 54 with:**
```tsx
          <p>© 2026 Antigravity Directory</p>
          <p className="text-slate-600 text-[11px] text-right max-w-xs">
            Not affiliated with or endorsed by Google LLC. Google Antigravity IDE is a trademark of Google LLC.
          </p>
```

---

## PHASE 2 — BUILD + LINT

```bash
npm run build
npm run lint
```
Both must exit 0. If either fails — stop, report the full error output, do not commit.

---

## PHASE 3 — SCREENSHOTS + EVIDENCE

**MANDATORY: Save every screenshot as a file to `temp/` — do NOT just display inline. PM reads the files directly.**

```bash
# HTTP checks
curl -o /dev/null -s -w "%{http_code}\n" http://localhost:3000
curl -o /dev/null -s -w "%{http_code}\n" http://localhost:3000/mcp-servers
curl -o /dev/null -s -w "%{http_code}\n" http://localhost:3000/rules
curl -o /dev/null -s -w "%{http_code}\n" http://localhost:3000/advertise
```

Screenshots to save (use your browser tool — save each as a file):
- `temp/task018_hero.png` — homepage hero section (subheading + button visible)
- `temp/task018_cards.png` — homepage cards (full opacity, not dimmed)
- `temp/task018_category_header.png` — category section header (icon+name area)
- `temp/task018_nav_more.png` — header More dropdown open (all 5 categories, no Advertise)
- `temp/task018_footer.png` — footer (dark bg, disclaimer text visible)

Then commit:
```bash
git add -A
git commit -m "fix(ux): hero CTA + full-opacity cards + nav cleanup + footer bg + Google disclaimer"
git log --oneline -1
git diff HEAD~1 HEAD
```

---

## MANDATORY REPORT FORMAT

```
TASK-018 REPORT
==============================

--- CROSS-CHECK RESULTS ---
Fix 1 HeroSection line 3 matches: [YES/NO]
Fix 1 HeroSection lines 9-13 matches: [YES/NO]
Fix 2A ResourceCard line 30 matches (opacity-60 present): [YES/NO]
Fix 2B ResourceCard lines 136-146 matches (dead hover buttons present): [YES/NO]
Fix 3 CategorySection lines 18-29 matches: [YES/NO]
Fix 4 SponsoredCard line 58 matches (min-h-[140px] present): [YES/NO]
Fix 5 page.tsx line 53 matches (countMap block): [YES/NO]
Fix 5 page.tsx line 113 matches (<HeroSection />): [YES/NO]
Fix 5 page.tsx line 120 matches (category sections map): [YES/NO]
Fix 6 navigation.ts lines 11-26 matches (NAV_ITEMS array): [YES/NO]
Fix 7 Footer.tsx line 5 matches (bg-slate-900): [YES/NO]
Fix 7 Footer.tsx line 53 matches (border-slate-700): [YES/NO]
Fix 7 Footer.tsx line 54 matches (© 2026 only, no disclaimer): [YES/NO]

--- BUILD + LINT ---
npm run build exit code: [0 / error]
npm run build full output:
[paste]

npm run lint exit code: [0 / error]
npm run lint full output:
[paste]

--- GIT ---
Commit hash: [paste]
Diff:
[paste git diff HEAD~1 HEAD]

--- SCREENSHOTS (files saved to temp/ — PM will read them directly) ---
temp/task018_hero.png saved: [YES/NO]
temp/task018_cards.png saved: [YES/NO]
temp/task018_category_header.png saved: [YES/NO]
temp/task018_nav_more.png saved: [YES/NO]
temp/task018_footer.png saved: [YES/NO]

Observations:
- Hero: subheading visible? [YES/NO] | Browse Resources button visible? [YES/NO]
- Cards: rendering at full opacity (not dimmed)? [YES/NO]
- Category header: clicking icon+name navigates to category page? [YES/NO]
- Nav More dropdown: contains Agents, Boilerplates, Tutorials, Cheatsheets, Troubleshooting? [YES/NO] | Advertise absent? [YES/NO]
- Footer: dark background matching page? [YES/NO] | Disclaimer text visible? [YES/NO]

--- HTTP STATUS PER PAGE ---
http://localhost:3000 → [status code]
http://localhost:3000/mcp-servers → [status code]
http://localhost:3000/rules → [status code]

--- BROWSER CONSOLE ---
Errors: [paste or "none"]

--- SCREEN RECORDING (MANDATORY) ---
[ATTACH RECORDING — scroll homepage, click Browse Resources button, click a category header]
Missing recording = task not done.

--- BUGS SPOTTED (do not fix, report only) ---
1.
2.
3.
```

---

## DO NOT DO
- Do NOT touch any files not listed above (7 files only)
- Do NOT change the real sponsor card (line 14 of SponsoredCard.tsx) — only the placeholder (line 58)
- Do NOT modify category pages (`src/app/[slug]/page.tsx`)
- Do NOT remove the About or Advertise links from the footer Company column — only remove Advertise from the nav dropdown
- Report all bugs spotted — PM decides what to fix next
