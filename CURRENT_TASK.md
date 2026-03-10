# CURRENT TASK — TASK-015: Dead Code Deletion + Dark Mode Fix (Resource Detail + Tools + Admin)
**Assigned by**: Claude Code (PM)
**Date**: 2026-03-10
**Priority**: CRITICAL

---

## CONTEXT

Two problems discovered by PM full-site audit (2026-03-10):

1. **Dead component files** — 20+ component files with zero imports anywhere in the codebase. They add bundle weight, pollute Antigravity's reading context, and carry light-mode violations that will re-emerge if activated.

2. **Live dark mode violations** — 5 files currently rendered to users contain `bg-white`, `bg-slate-100`, or `bg-white/40+` on containers/cards/sections. Violates locked design spec.

---

## PART 0 — INDEPENDENT AUDIT (RUN FIRST — DO NOT SKIP)

Before implementing anything, run your own grep audit across all src/ .tsx files. This validates PM's scope. Do not rely on PM's list — find violations yourself.

### Step 0A — Grep for all banned light-mode patterns:

```bash
grep -rn "bg-white\|bg-slate-100\|bg-slate-50\|bg-gray-50\|bg-white/50\|bg-white/40\|bg-white/80" \
  /Users/user/Desktop/antigravity-directory/src \
  --include="*.tsx"
```

### Step 0B — Grep for banned border-radius on containers:

```bash
grep -rn "rounded-2xl\|rounded-3xl\|rounded-xl\|rounded-\[" \
  /Users/user/Desktop/antigravity-directory/src \
  --include="*.tsx"
```

### Step 0C — Report ALL results

Paste the raw grep output in your report. Then apply this filter:

**EXCLUDE these intentional patterns (do NOT flag as violations):**
- `bg-white text-black` or `bg-white hover:bg-gray-200 text-black` on `<a>` or `<button>` elements — white CTA buttons, cursor.directory pattern, KEEP
- `bg-gradient-to-br from-slate-900` — dark gradient, KEEP
- `bg-black` — already dark, KEEP
- `bg-white/\[0.` — already uses spec-compliant low-opacity white, KEEP
- `bg-white/5` or `bg-white/10` — spec-compliant, KEEP

**Flag everything else** — file path + line number + exact class string.

### Step 0D — Compare against PM's 7-file list

PM identified violations in these 7 files:
1. `src/components/CitationBlock.tsx`
2. `src/components/BadgeGenerator.tsx`
3. `src/app/t/[slug]/page.tsx`
4. `src/components/tools/ToolsShell.tsx`
5. `src/components/tools/ToolsSidebar.tsx`
6. `src/components/AdminSubmissionQueue.tsx`
7. `src/components/Header.tsx`

If your audit finds violations in ANY files NOT on PM's list — **STOP. Report to PM before implementing.** Do not proceed with Parts 1 or 2 until PM confirms scope.

If your audit confirms PM's list is complete — proceed to Part 1.

---

## MANDATORY CROSS-CHECK PROTOCOL

Before implementing: confirm the PM VERIFIED CONTENT below matches what you see in each file. If it does NOT match — STOP and report to PM.

---

## PART 1 — DELETE DEAD COMPONENT FILES

### PM VERIFIED: these files have ZERO imports in the entire codebase

Run this before deleting to confirm each has 0 references:
```bash
for f in HowItWorks DirectoryIntelligence StatsBar ComparisonPage PromptDetailView MemberCard Testimonials CreatorTestimonials CategoryTabs CategoryGridDiscovery CreatorProofSection MemberFilters ResourcePricingForm ProfileHeader SettingsForm SortDropdown; do
  echo -n "$f: "; grep -rn "$f" /Users/user/Desktop/antigravity-directory/src --include="*.tsx" | grep -v "^.*components/$f\|export\|interface\|function\|const $f\|type $f" | wc -l
done
```

Any file with count > 0 — DO NOT delete it. Report to PM instead.

### Files to delete (confirmed 0 imports by PM grep):

```
src/components/HowItWorks.tsx
src/components/DirectoryIntelligence.tsx
src/components/StatsBar.tsx
src/components/ComparisonPage.tsx
src/components/PromptDetailView.tsx
src/components/MemberCard.tsx
src/components/Testimonials.tsx
src/components/CreatorTestimonials.tsx
src/components/CategoryTabs.tsx
src/components/CategoryGridDiscovery.tsx
src/components/CreatorProofSection.tsx
src/components/MemberFilters.tsx
src/components/ResourcePricingForm.tsx
src/components/ProfileHeader.tsx
src/components/SettingsForm.tsx
src/components/SortDropdown.tsx
```

Also delete dead filter components (only referenced inside each other, chain leads to nothing):
```
src/components/filters/FilterSidebar.tsx
src/components/filters/MobileFilterDrawer.tsx
src/components/filters/TopFilterBar.tsx
src/components/filters/FilterPersistenceManager.tsx
```

Also delete dead tools components (ToolsShell is in /tools/layout.tsx — see PART 2 before deleting):
```
src/components/tools/PromptOptimizer.tsx
src/components/tools/RoiCalculator.tsx
src/components/tools/RagVisualizer.tsx
src/components/tools/TokenCounter.tsx
src/components/tools/JsonToPydantic.tsx
src/components/tools/PromptGenerator.tsx
```

⚠️ DO NOT delete `ToolsShell.tsx` or `ToolsSidebar.tsx` — they are live in `/tools/layout.tsx`. Fix them in PART 2 instead.

After deletion run build + lint. If build fails on a missing import, report to PM — do not restore the file, just identify what imported it.

---

## PART 2 — FIX LIVE DARK MODE VIOLATIONS

### PM VERIFIED violations — read from actual files today

---

**FILE 1: `src/components/CitationBlock.tsx`**

Line 16 — outer wrapper:
```
bg-white border border-gray-900 rounded-2xl
```
Fix → `bg-white/[0.03] border border-white/[0.06] rounded-none`

Line 34 — title text (will be invisible on dark bg):
```
text-slate-900
```
Fix → `text-white`

Lines 42, 46, 57, 61 — four inner grid cells (identical):
```
bg-white/50 border border-gray-900 rounded-xl
```
Fix → `bg-white/[0.03] border border-white/[0.06] rounded-none`

Lines 44, 48, 59, 63 — grid cell body text (invisible on dark bg):
```
text-slate-900
```
Fix → `text-gray-300`

---

**FILE 2: `src/components/BadgeGenerator.tsx`**

Line 28 — outer wrapper:
```
bg-white border border-dashed border-gray-800 rounded-[32px]
```
Fix → `bg-white/[0.03] border border-white/[0.06] rounded-none`

Line 29 — icon container:
```
bg-slate-100 rounded-2xl
```
Fix → `bg-white/[0.05] rounded-none`

Line 32 — heading:
```
text-slate-900
```
Fix → `text-white`

Line 35 — body text:
```
text-slate-500
```
Fix → `text-gray-400`

Line 55 — badge preview text (inside dark gradient — currently invisible):
```
text-slate-900
```
Fix → `text-white`

Line 69 — embed code box:
```
bg-white ... rounded-2xl border border-gray-900
```
Fix → `bg-white/[0.03] rounded-none border border-white/[0.06]`

Line 70 — embed code text:
```
text-slate-500
```
Fix → `text-gray-400`

Line 75 — copy button:
```
bg-slate-100 hover:bg-slate-100 text-slate-900 rounded-lg border-slate-200
```
Fix → `bg-white/[0.05] hover:bg-white/[0.1] text-white rounded-none border-white/[0.1]`

Line 82 — footer note:
```
text-gray-700
```
Fix → `text-gray-500`

---

**FILE 3: `src/app/t/[slug]/page.tsx`**

Line 208 — main article wrapper:
```
border border-gray-900 rounded-3xl
```
Fix → `border border-white/[0.06] rounded-none`

Line 263 — stats bar:
```
bg-gray-900 overflow-hidden border border-gray-900 rounded-2xl
```
Fix → `bg-white/[0.02] overflow-hidden border border-white/[0.06] rounded-none`

Line 264, 271, 275, 279 — stats cells:
```
bg-[#0D0D0D]
```
Keep as-is — already dark.

---

**FILE 4: `src/components/tools/ToolsShell.tsx`**

Line 38 — entire shell container:
```
bg-white text-slate-200
```
Fix → `bg-black text-gray-300`

Line 42 — sidebar panel:
```
bg-white/50
```
Fix → `bg-white/[0.03]`

Line 102 — mobile overlay:
```
bg-white/80
```
Fix → `bg-black/80`

---

**FILE 5: `src/components/tools/ToolsSidebar.tsx`**

Line 15 — sidebar:
```
bg-white/50 backdrop-blur-xl border-r border-slate-200
```
Fix → `bg-white/[0.03] border-r border-white/[0.06]`

---

**FILE 6: `src/components/AdminSubmissionQueue.tsx`**

Line 54 — empty state container:
```
bg-slate-100 border border-slate-200 rounded-lg
```
Fix → `bg-white/[0.03] border border-white/[0.06] rounded-none`

Line 103 — review panel:
```
bg-white/40
```
Fix → `bg-white/[0.03]`

Line 175 — textarea:
```
bg-white/40 border border-slate-200 rounded-lg text-slate-900
```
Fix → `bg-white/[0.03] border border-white/[0.06] rounded-none text-white`

---

**FILE 7: `src/components/Header.tsx`**

Line 43 — nav skeleton loader (shows briefly on load):
```
bg-white border border-slate-200 rounded-full h-9
```
Fix → `bg-white/[0.05] border border-white/[0.06] rounded-full h-9`

---

**FILE 8: `src/components/LoadMoreResourceGrid.tsx`**

⚠️ Found by Antigravity's Part 0 independent audit — not on PM's original list. PM verified. Include in this task.

Line 116 — "Load Next 20" button:
```
bg-slate-100 hover:bg-slate-100 border border-slate-200 text-slate-900 rounded-xl
```
Fix → `bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] text-white rounded-none`

Line 126 — count subtext inside button:
```
text-slate-500
```
Fix → `text-gray-400`

Line 134 — "All X resources loaded" end state text:
```
text-slate-600
```
Fix → `text-gray-500`

---

## PART 3 — BUILD + LINT + VERIFY

```bash
npm run build
npm run lint
```
Both must exit 0.

```bash
curl -o /dev/null -s -w "%{http_code}\n" http://localhost:3000
curl -o /dev/null -s -w "%{http_code}\n" http://localhost:3000/t/tutorial-claude-prompting-best-practices
curl -o /dev/null -s -w "%{http_code}\n" http://localhost:3000/admin/submissions
```

All must return 200.

---

## PART 4 — SCREENSHOTS

Save to:
- `temp/task015_resource_detail_top.png` — /t/[slug] above the fold
- `temp/task015_resource_detail_citation.png` — CitationBlock visible, dark
- `temp/task015_resource_detail_badge.png` — BadgeGenerator visible, dark
- `temp/task015_admin.png` — /admin/submissions page
- `temp/task015_category_load_more.png` — any category page scrolled to bottom, "Load Next 20" button dark

---

## PART 5 — COMMIT

```bash
git add -A
git commit -m "fix(ui): delete 20 dead components + dark mode fix on resource detail, tools, admin"
git log --oneline -1
git diff HEAD~1 HEAD --stat
```

---

## MANDATORY REPORT FORMAT

```
TASK-015 REPORT
==============================

--- CROSS-CHECK: DEAD FILES (0 import count confirmed before delete) ---
HowItWorks: [count]
DirectoryIntelligence: [count]
StatsBar: [count]
ComparisonPage: [count]
PromptDetailView: [count]
MemberCard: [count]
Testimonials: [count]
CreatorTestimonials: [count]
CategoryTabs: [count]
CategoryGridDiscovery: [count]
CreatorProofSection: [count]
MemberFilters: [count]
ResourcePricingForm: [count]
ProfileHeader: [count]
SettingsForm: [count]
SortDropdown: [count]
FilterSidebar: [count]
MobileFilterDrawer: [count]
TopFilterBar: [count]
FilterPersistenceManager: [count]
Tools (PromptOptimizer/RoiCalculator/RagVisualizer/TokenCounter/JsonToPydantic/PromptGenerator): [counts]

Files actually deleted: [list]
Files skipped (had references): [list + reason]

--- CROSS-CHECK: PM VERIFIED CONTENT ---
CitationBlock.tsx line 16 matches spec: [YES/NO]
BadgeGenerator.tsx line 28 matches spec: [YES/NO]
page.tsx line 208 matches spec: [YES/NO]
ToolsShell.tsx line 38 matches spec: [YES/NO]
ToolsSidebar.tsx line 15 matches spec: [YES/NO]
AdminSubmissionQueue.tsx line 54 matches spec: [YES/NO]
Header.tsx line 43 matches spec: [YES/NO]
LoadMoreResourceGrid.tsx line 116 matches spec: [YES/NO]

--- BUILD + LINT ---
npm run build exit code: [0 / error]
npm run lint exit code: [0 / error]

--- HTTP ---
/ → [status]
/t/tutorial-claude-prompting-best-practices → [status]
/admin/submissions → [status]
/prompts → [status]

--- GIT ---
Commit hash: [paste]
Files changed stat: [paste git diff HEAD~1 HEAD --stat]

--- SCREENSHOTS ---
temp/task015_resource_detail_top.png: [YES/NO]
temp/task015_resource_detail_citation.png: [YES/NO — confirm dark background visible]
temp/task015_resource_detail_badge.png: [YES/NO — confirm dark background visible]
temp/task015_admin.png: [YES/NO]
temp/task015_category_load_more.png: [YES/NO — confirm dark "Load Next 20" button visible]

--- BUGS SPOTTED (do not fix, report only) ---
1.
2.
```

---

## DO NOT DO
- Do NOT touch `ToolsShell.tsx` or `ToolsSidebar.tsx` for deletion — fix them only
- Do NOT touch any file not listed in this spec
- Do NOT restore deleted files if build fails — identify the import and report to PM
- Do NOT change the intentional white CTA buttons (`bg-white text-black` on `<a>` and `<button>` elements)
