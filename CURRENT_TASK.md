SESSION-PROTOCOL-CONFIRMED: 2026-03-30

# CURRENT TASK — TASK-111: Repository Restructure — Clean Folder Hierarchy

## WHAT TO BUILD
Reorganise the entire `docs/` folder and clean up root-level clutter. Remove numbered prefixes that conflict (three `03-*` folders, two `04-*`, etc.), rename folders to descriptive names, move misplaced root-level folders into `docs/`, delete dead folders, and fix all broken links created by the moves.

## TECHNICAL SPEC

### PHASE 1 — Move files using git mv (preserves history)

```bash
# Rename docs/ subfolders — remove numbered prefixes
git mv docs/01-business docs/business
git mv docs/02-strategy docs/strategy
git mv docs/03-decisions docs/decisions
git mv docs/03-gtm docs/gtm
git mv docs/04-prds docs/prds
git mv docs/04-roadmap docs/roadmap
git mv docs/06-legal docs/legal
git mv docs/new-start docs/design

# Move into archive/ (old content, keep for history)
mkdir -p docs/archive
git mv docs/03-implementation docs/archive/implementation
git mv docs/05-reports docs/archive/reports
git mv docs/06-plans docs/archive/plans
git mv docs/07-launch docs/archive/launch
git mv docs/07-walkthroughs docs/archive/walkthroughs

# Merge root SEO/ into docs/seo/
# docs/04-seo/ was created today but is empty — use it as docs/seo/
git mv docs/04-seo docs/seo
cp SEO/* docs/seo/
git add docs/seo/
git rm -r SEO/

# Move root artifacts/ and dist/ to archive
git mv artifacts docs/archive/artifacts
git mv dist docs/archive/dist

# Move docs/screenshots under docs/design/
git mv docs/screenshots docs/design/screenshots

# Remove empty folders (if they exist and are empty)
rmdir docs/research 2>/dev/null || true
rmdir docs/evidence 2>/dev/null || true
rmdir docs/specs 2>/dev/null || true

# Delete docs/04-seo and docs/05-qa if now empty after renames above
rmdir docs/05-qa 2>/dev/null || git mv docs/05-qa docs/qa

# Delete .agents/ (wrong path — correct path is .agent/ singular, already exists)
rm -rf .agents/

# Remove root memory/ folder
rm -rf memory/
```

### PHASE 2 — Fix broken links in live documents

Update every reference from old path to new path in a single pass per file.

**File: `docs/business/BUSINESS_CONTEXT.md`**
Replace all occurrences:
- `docs/design/` → `docs/design/`
- `docs/business/` → `docs/business/`
- `docs/strategy/` → `docs/strategy/`

**File: `docs/business/PRODUCT_BRIEF.md`**
Replace all occurrences:
- `docs/design/` → `docs/design/`
- `docs/business/` → `docs/business/`
- `docs/strategy/` → `docs/strategy/`

**File: `docs/strategy/SEO_PROGRAMMATIC_PLAN.md`**
Replace all occurrences:
- `docs/strategy/` → `docs/strategy/`

**File: `docs/prds/PRD_V1.md`**
Replace all occurrences:
- `docs/business/` → `docs/business/`
- `docs/design/` → `docs/design/`
- `docs/prds/` → `docs/prds/`

**File: `CLAUDE.md`**
Replace all occurrences:
- `docs/design/` → `docs/design/`
- `docs/business/` → `docs/business/`
- `docs/strategy/` → `docs/strategy/`
- `docs/03-decisions/` → `docs/decisions/`
- `docs/04-roadmap/` → `docs/roadmap/`
- `docs/prds/` → `docs/prds/`

**File: `PROJECT_LEDGER.md`**
Replace all occurrences of any `docs/0*-` numbered path with the clean name equivalent.

**File: `.claude/hooks/session-protocol-gate.sh`**
- `docs/business/BUSINESS_CONTEXT.md` → `docs/business/BUSINESS_CONTEXT.md`

**File: `docs/README.md`** (if exists at docs/README.md)
Replace all old numbered path references with new clean names.

**File: `docs/archive/implementation/FILE-STRUCTURE-GUIDE.md`**
- `docs/design/DESIGN_SPEC.md` → `docs/design/DESIGN_SPEC.md`
- `docs/prds/PRD_V1.md` → `docs/prds/PRD_V1.md`

**File: `logs/ledger/2026/Q1.md`**
Replace all occurrences:
- `docs/design/` → `docs/design/`
- `docs/business/` → `docs/business/`
- `docs/strategy/` → `docs/strategy/`

**File: `docs/NAVIGATION_GUIDE.md`**
Replace all occurrences:
- `docs/business/` → `docs/business/`
- `01-business/` → `business/`
- `docs/strategy/` → `docs/strategy/`
- `02-strategy/` → `docs/strategy/`
- `docs/legal/` → `docs/legal/`
- `06-legal/` → `legal/`
- `├── 01-business/` → `├── business/`
- `├── 02-strategy/` → `├── strategy/`
- `├── 06-legal/` → `├── legal/`

**File: `eslint.config.mjs`**
Remove `.agents/**` from the ignores array (line 25). The `.agents/` folder is being deleted — no need to ignore it.

### PHASE 3 — Verify zero broken references

Run and confirm 0 matches:
```bash
grep -rn "docs/01-business\|docs/02-strategy\|docs/03-decisions\|docs/03-gtm\|docs/03-implementation\|docs/04-prds\|docs/04-roadmap\|docs/new-start\|docs/05-reports\|docs/06-legal\|docs/06-plans\|docs/07-launch\|docs/07-walkthroughs" . \
  --include="*.md" --include="*.ts" --include="*.tsx" --include="*.sh" \
  | grep -v "\.git\|node_modules\|\.next\|task_16_diff\|logs/tasks\|temp/"
```

If any remain, fix before proceeding. Do NOT proceed to Phase 4 with broken references.

### PHASE 4 — Build and lint
```bash
npm run build 2>&1 | tee temp/task111_build.log
npm run lint 2>&1 | tee temp/task111_lint.log
```

### PHASE 5 — Commit
```bash
git add -A
git commit -m "chore: restructure docs/ — clean folder hierarchy, remove numbered prefixes"
```
Save commit SHA to `temp/task111_build.log`.

## ACCEPTANCE CRITERIA
- [ ] `docs/` contains only clean named folders: business/, strategy/, gtm/, seo/, design/, decisions/, roadmap/, prds/, legal/, qa/, archive/
- [ ] No numbered folder prefixes remain anywhere in docs/
- [ ] Root-level SEO/ folder gone — contents in docs/seo/
- [ ] Root-level artifacts/ and dist/ gone — contents in docs/archive/
- [ ] `.agents/` deleted
- [ ] Root `memory/` deleted
- [ ] Phase 3 grep returns 0 matches
- [ ] Build: exit 0
- [ ] Lint: exit 0

## SCREENSHOTS
NONE — no UI changes.

## EVIDENCE REQUIRED
- `temp/task111_build.log` — build output + commit SHA
- `temp/task111_lint.log` — lint output
- Phase 3 grep output showing 0 matches
