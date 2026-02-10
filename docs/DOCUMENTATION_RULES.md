# 📐 DOCUMENTATION RULES
## Maintaining the Organized System

**Created**: 2026-02-11
**Owner**: PM (enforces these rules)
**Applies To**: CEO, PM, Coder (everyone creating docs)

---

## 🎯 PURPOSE

These rules ensure our organized documentation system **STAYS organized**.

**The Problem**: Without rules, chaos returns:
- ❌ Random files in project root
- ❌ Duplicate documents with conflicting info
- ❌ No one knows which doc is current
- ❌ Tags not applied
- ❌ Naming conventions ignored

**The Solution**: Follow these 10 rules religiously.

---

## 📜 THE 10 COMMANDMENTS OF DOCUMENTATION

### 1. Never Create Docs in Project Root
**Rule**: Only 3 files allowed in root:
- `PROJECT_LEDGER.md` (blockchain registry)
- `LEDGER_GUIDE.md` (how to use ledger)
- `README.md` (project overview)

**Where to Create Instead**:
- Business docs → `docs/01-business/`
- Strategy docs → `docs/02-strategy/`
- Technical guides → `docs/03-implementation/`
- PRDs → `docs/04-prds/`
- Reports → `docs/05-reports/quality/` or `/phase-completions/` or `/audits/`
- Plans → `docs/06-plans/`
- Walkthroughs → `docs/07-walkthroughs/`
- Old stuff → `docs/archive/`

**Enforcement**:
```bash
# Before committing, check root
ls *.md
# If more than 3 files exist → BLOCKED
```

---

### 2. Use Required Tags in Every Document
**Rule**: Every markdown file MUST have frontmatter tags

**Required Template**:
```markdown
---
tags: [STATUS, TYPE]
phase: Phase-X
owner: CEO | PM | Coder
status: ACTIVE | ARCHIVED | DRAFT | APPROVED | PENDING_APPROVAL | REJECTED
created: YYYY-MM-DD
last_updated: YYYY-MM-DD
---

# Document Title
```

**Tag Categories**:

**Status Tags** (pick ONE):
- `[ACTIVE]` - Currently in use
- `[ARCHIVED]` - Historical/deprecated
- `[DRAFT]` - Work in progress
- `[APPROVED]` - CEO/PM approved
- `[PENDING_APPROVAL]` - Awaiting review
- `[REJECTED]` - Not approved

**Type Tags** (pick ONE or more):
- `[PRD]` - Product Requirements
- `[PLAN]` - Implementation Plan
- `[REPORT]` - Quality/audit report
- `[STRATEGY]` - Strategic document
- `[GUIDE]` - How-to/checklist
- `[REFERENCE]` - Lookup/reference doc

**Phase Tags** (if applicable):
- `[Phase-0]` - E2E Testing Infrastructure
- `[Phase-A]` - Payment & Claiming System
- `[Phase-B]` - Creator UI & Dashboards
- `[Phase-C]` - Polish & Testing
- `[Phase-D]` - Deployment & Rollout
- `[Post-MVP]` - Future work

**Example**:
```markdown
---
tags: [ACTIVE, PRD, APPROVED]
phase: Phase-A
owner: PM
status: APPROVED
created: 2026-02-11
last_updated: 2026-02-11
---

# PRD: Payment System Integration
```

---

### 3. Follow Naming Conventions Strictly
**Rule**: File names must follow prescribed patterns

**PRDs**:
```
Pattern: PRD_FEATURE_NAME.md
Examples:
✅ PRD_PAYMENT_SYSTEM.md
✅ PRD_CLAIMING_FLOW.md
✅ PRD_EARNINGS_DASHBOARD.md
❌ payment-prd.md
❌ PRD for Payment.md
```

**Plans**:
```
Pattern: PHASE_X_FEATURE_NAME_PLAN_YYYY-MM-DD.md
Examples:
✅ PHASE_A_PAYMENT_PLAN_2026-02-12.md
✅ PHASE_B_CLAIM_BUTTON_PLAN_2026-02-15.md
❌ payment-plan.md
❌ Plan for Phase A.md
```

**Reports**:
```
Pattern: REPORT_TYPE_SUBJECT_YYYY-MM-DD.md
Examples:
✅ QA_REPORT_PAYMENT_SYSTEM_2026-02-15.md
✅ PM_REVIEW_CLAIM_BUTTON_2026-02-16.md
✅ GATE_REPORT_PHASE_A_2026-02-20.md
❌ qa-report.md
❌ Report on Payment.md
```

**Walkthroughs**:
```
Pattern: walkthrough_TASK_XXX.md
Examples:
✅ walkthrough_TASK_015.md
✅ walkthrough_TASK_044.md
❌ task-15-walkthrough.md
```

**Enforcement**:
- PM reviews all new docs
- Incorrect naming → BLOCKED until fixed

---

### 4. One Source of Truth Per Topic
**Rule**: No duplicate documents on same topic

**How to Avoid Duplicates**:
1. **Before creating new doc**: Search existing docs
   ```bash
   grep -r "Payment System" docs/
   ```

2. **If topic exists**: Update existing doc, don't create new one

3. **If truly different**: Clearly distinguish in title
   - `PRD_PAYMENT_INTEGRATION.md` (integration spec)
   - `PAYMENT_SECURITY_AUDIT.md` (security audit)
   - These are different topics despite both mentioning "payment"

**Examples**:

❌ **BAD** (Duplicates):
```
docs/payment-spec.md
docs/PRD_PAYMENT.md
docs/payment-requirements.md
```
All three docs talk about payment requirements → Pick ONE canonical doc

✅ **GOOD** (Different topics):
```
docs/04-prds/PRD_PAYMENT_SYSTEM.md          # Requirements
docs/06-plans/PHASE_A_PAYMENT_PLAN.md       # Implementation plan
docs/05-reports/QA_REPORT_PAYMENT.md        # QA validation
```
Each doc serves different purpose

**If Duplicates Found**:
1. Identify canonical document (most complete/recent)
2. Merge content from duplicates into canonical
3. Archive duplicates in `docs/archive/`
4. Update all references to point to canonical

---

### 5. Archive Old Docs, Don't Delete
**Rule**: Never delete docs, archive them instead

**Why**:
- Historical context valuable
- Audit trails important
- May need to reference old decisions

**How to Archive**:

**Step 1: Identify outdated doc**
```bash
# Example: Old task tracking doc
docs/old-tasks.md
```

**Step 2: Move to appropriate archive folder**
```bash
# Determine which phase/category
mv docs/old-tasks.md docs/archive/pre-mvp/TASK_TRACKING_OLD.md
```

**Step 3: Update with archive notice**
```markdown
---
tags: [ARCHIVED]
status: ARCHIVED
archived_date: 2026-02-11
replaced_by: PROJECT_LEDGER.md
---

# [ARCHIVED] Old Task Tracking

**⚠️ DEPRECATED**: This document is archived and no longer maintained.

**Replacement**: See `PROJECT_LEDGER.md` for current task tracking.

**Archived**: 2026-02-11

---

[Original content below...]
```

**Archive Folder Structure**:
```
docs/archive/
├── pre-mvp/           # Before MVP work started
├── phase-0/           # Content Seeding (completed Feb 4)
├── phase-1/           # Core Directory (completed Feb 5)
├── phase-2.1/         # Homepage Transform (completed Feb 5)
└── reports-historical/  # Old task reports
```

---

### 6. Link to Ledger Entries
**Rule**: All PRDs, Tasks, Reports must reference ledger entry

**Format**:
```markdown
# PRD: Payment System Integration

**Ledger Entry**: [ENTRY-008] PRD | APPROVED
**Related Tasks**: [ENTRY-009], [ENTRY-010], [ENTRY-011]
**QA Report**: [ENTRY-020] QA_REPORT | PASS

---

[Document content...]
```

**Why**:
- Creates bidirectional links
- Easy to trace decisions
- Blockchain-style audit trail

**Enforcement**:
- PM checks all new PRDs/Tasks/Reports have ledger reference
- Missing reference → BLOCKED until added

---

### 7. Update Last Modified Date
**Rule**: Change `last_updated` in frontmatter whenever doc is edited

**Before Edit**:
```markdown
---
created: 2026-02-11
last_updated: 2026-02-11
---
```

**After Edit** (on Feb 15):
```markdown
---
created: 2026-02-11
last_updated: 2026-02-15  ← CHANGED
---
```

**Also Add Change Log**:
```markdown
## 📝 CHANGE LOG

| Date | Change | By |
|------|--------|-----|
| 2026-02-11 | Created document | PM |
| 2026-02-15 | Added Stripe Connect requirements | CEO |
```

**Why**:
- Know which docs are stale
- Track who changed what
- Audit compliance

---

### 8. Use Descriptive Headers and Sections
**Rule**: Every doc must have clear structure

**Required Sections** (PRD):
```markdown
# PRD: [Feature Name]

## Overview
Brief description (2-3 sentences)

## User Stories
- As a [role], I want [goal]

## Requirements
### Functional
1. Requirement 1

### Non-Functional
1. Performance requirement

## Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2

## Technical Specification
### API Routes
### Database Schema
### Components

## Dependencies
- Depends on: [ENTRY-XXX]

## Out of Scope
- What we're NOT building

## Approval
- [ ] Approved by: CEO/PM
- Date: YYYY-MM-DD
```

**Required Sections** (Report):
```markdown
# QA Report: [Feature Name]

## Summary
PASS/FAIL with key findings

## Test Results
✓ Test 1: PASS
✗ Test 2: FAIL (reason)

## Issues Found
1. Issue description [Severity: P0/P1/P2]

## Ralph Protocol Gates
- Gate 5 (Security): PASS
- Gate 7 (Build): PASS
- Gate 8 (Tests): FAIL

## Recommendations
1. Action item 1

## Conclusion
Overall assessment
```

---

### 9. No Orphan Documents
**Rule**: Every doc must be linked from at least one index

**Primary Index**: `docs/README.md`

**Check**:
```bash
# After creating new doc, search for link
grep -r "my-new-doc.md" docs/README.md

# If no results → ORPHAN → Add link
```

**Where to Link**:
1. `docs/README.md` (main index)
2. Folder-specific README (if exists)
3. Related documents
4. `PROJECT_LEDGER.md` (if task/PRD/report)

**Example**:

**Created**: `docs/04-prds/PRD_EARNINGS_DASHBOARD.md`

**Must Add Links**:
1. In `docs/README.md`:
   ```markdown
   ### 04-prds/
   - `PRD_PAYMENT_SYSTEM.md`
   - `PRD_CLAIMING_SYSTEM.md`
   - `PRD_EARNINGS_DASHBOARD.md` ← ADD THIS
   ```

2. In `PROJECT_LEDGER.md`:
   ```markdown
   [ENTRY-012] PRD | APPROVED | 2026-02-15 | PM | -
   Title: Creator Earnings Dashboard
   Evidence: docs/04-prds/PRD_EARNINGS_DASHBOARD.md ← ADD THIS
   ```

---

### 10. Keep Root README Updated
**Rule**: When adding folders or major docs, update `docs/README.md`

**What to Update**:
1. Folder structure diagram (if new folder)
2. Folder descriptions (if new folder)
3. Quick reference table (if critical doc)
4. Naming conventions (if new pattern)

**Example**:

**New Folder Created**: `docs/08-deployment/`

**Update Required**:
```markdown
# In docs/README.md

## 📂 FOLDER STRUCTURE

```
docs/
├── 01-business/
├── 02-strategy/
├── 03-implementation/
├── 04-prds/
├── 05-reports/
├── 06-plans/
├── 07-walkthroughs/
├── 08-deployment/        ← ADD THIS
└── archive/
```

### 08-deployment/          ← ADD THIS SECTION
**Purpose**: Deployment checklists, production configs
**Contains**: Pre-deployment checklists, rollback plans
**Who Uses**: PM (creates), Coder (follows)
**Update Frequency**: Before each production deploy
```

---

## ✅ CHECKLIST: Before Creating Any Document

Use this checklist EVERY time you create a new markdown file:

- [ ] **Location**: Is this in the correct folder? (Not root unless ledger/README)
- [ ] **Naming**: Does file name follow conventions?
- [ ] **Tags**: Does frontmatter include all required tags?
- [ ] **Duplicate Check**: Did I search for existing docs on this topic?
- [ ] **Ledger Link**: If PRD/Task/Report, did I reference ledger entry?
- [ ] **Structure**: Does doc have required sections for its type?
- [ ] **Index Link**: Is doc linked from `docs/README.md` or `PROJECT_LEDGER.md`?
- [ ] **Change Log**: Did I add initial change log entry?
- [ ] **Ownership**: Is `owner` field set (CEO/PM/Coder)?
- [ ] **Date**: Is `created` and `last_updated` set to today?

**Only create doc if ALL boxes checked** ✅

---

## ✅ CHECKLIST: Before Editing Any Document

Use this checklist when editing existing docs:

- [ ] **Last Updated**: Changed `last_updated` date in frontmatter?
- [ ] **Change Log**: Added entry to change log with date and description?
- [ ] **Status**: If finalizing draft, changed status to `APPROVED`?
- [ ] **Archive**: If deprecating, moved to `docs/archive/` with notice?
- [ ] **Links**: Updated all links if file was renamed/moved?
- [ ] **Ledger**: Updated related ledger entry if major change?

---

## 🚨 ANTI-PATTERNS (What NOT to Do)

### ❌ Anti-Pattern 1: Random Files in Root
**DON'T**:
```
project-root/
├── payment-notes.md
├── todo.md
├── ideas.md
├── scratch.md
```

**DO**:
```
docs/
├── 04-prds/PRD_PAYMENT_SYSTEM.md
├── archive/pre-mvp/OLD_TODO.md
└── 02-strategy/FUTURE_IDEAS.md
```

---

### ❌ Anti-Pattern 2: No Tags
**DON'T**:
```markdown
# Payment System PRD

Requirements:
- Razorpay integration
```

**DO**:
```markdown
---
tags: [ACTIVE, PRD, APPROVED]
phase: Phase-A
owner: PM
status: APPROVED
created: 2026-02-11
last_updated: 2026-02-11
---

# PRD: Payment System Integration

**Ledger Entry**: [ENTRY-008]

Requirements:
- Razorpay integration
```

---

### ❌ Anti-Pattern 3: Unclear Naming
**DON'T**:
```
docs/payment-stuff.md
docs/notes-on-payments.md
docs/payment-v2-final-FINAL.md
```

**DO**:
```
docs/04-prds/PRD_PAYMENT_SYSTEM.md
docs/06-plans/PHASE_A_PAYMENT_PLAN_2026-02-12.md
docs/05-reports/QA_REPORT_PAYMENT_2026-02-15.md
```

---

### ❌ Anti-Pattern 4: Duplicate Docs
**DON'T**:
```
docs/claiming-spec.md         # Created by CEO
docs/PRD_CLAIMING.md          # Created by PM
docs/claiming-requirements.md  # Created by Coder
```
All three say the same thing!

**DO**:
```
docs/04-prds/PRD_CLAIMING_SYSTEM.md  # ONE canonical doc
```
Everyone references this one doc

---

### ❌ Anti-Pattern 5: No Archive Notice
**DON'T**:
Just move old doc to archive without notice:
```
docs/archive/old-spec.md
# [Original content, no indication it's deprecated]
```

**DO**:
Add clear deprecation notice:
```markdown
---
tags: [ARCHIVED]
status: ARCHIVED
archived_date: 2026-02-11
replaced_by: docs/04-prds/PRD_PAYMENT_SYSTEM.md
---

# [ARCHIVED] Old Payment Spec

**⚠️ DEPRECATED**: This document is archived and no longer maintained.

**Replacement**: See `docs/04-prds/PRD_PAYMENT_SYSTEM.md`

---

[Original content...]
```

---

## 🛠️ ENFORCEMENT MECHANISMS

### PM Enforcement (Ralph Protocol - Documentation Law)
PM will enforce these rules during:
- Gate 3: Plan approval (checks plan follows rules)
- Gate 11: Delivery validation (checks docs updated)
- All PRD reviews
- All QA report reviews

**Blocked Scenarios**:
- ❌ PRD without tags → BLOCKED
- ❌ File in root (not allowed) → BLOCKED
- ❌ Duplicate doc detected → BLOCKED
- ❌ No ledger reference → BLOCKED
- ❌ Wrong naming convention → BLOCKED

### Git Pre-commit Hook (Future)
Add to `.git/hooks/pre-commit`:
```bash
# Check for docs in root (exclude allowed 3)
ROOT_DOCS=$(ls *.md 2>/dev/null | grep -v -E "(PROJECT_LEDGER|LEDGER_GUIDE|README)" | wc -l)
if [ "$ROOT_DOCS" -gt 0 ]; then
  echo "❌ BLOCKED: Markdown files in root (move to docs/)"
  ls *.md | grep -v -E "(PROJECT_LEDGER|LEDGER_GUIDE|README)"
  exit 1
fi

# Check all docs/ files have tags
for file in docs/**/*.md; do
  if ! grep -q "^tags:" "$file"; then
    echo "❌ BLOCKED: Missing tags in $file"
    exit 1
  fi
done
```

### Automated Checks (CI/CD - Future)
```yaml
# .github/workflows/docs-lint.yml
name: Documentation Lint
on: [pull_request]
jobs:
  check-docs:
    runs-on: ubuntu-latest
    steps:
      - name: Check tags exist
        run: |
          for file in docs/**/*.md; do
            grep -q "^tags:" "$file" || exit 1
          done
```

---

## 📊 DOCUMENTATION HEALTH METRICS

**PM Reviews Monthly**:

### Metric 1: Root Cleanliness
```bash
# Count markdown files in root (should be 3)
ls *.md | wc -l
# Target: 3 (PROJECT_LEDGER, LEDGER_GUIDE, README)
```

### Metric 2: Tag Compliance
```bash
# Count docs without tags
find docs/ -name "*.md" -exec grep -L "^tags:" {} \; | wc -l
# Target: 0
```

### Metric 3: Orphan Documents
```bash
# Find docs not linked anywhere
# Manual review needed
```

### Metric 4: Stale Documents
```bash
# Find docs not updated in 90+ days
find docs/ -name "*.md" -mtime +90
# Review if still relevant
```

**PM Action**:
- If metrics degrade → Create cleanup task
- Schedule quarterly doc audits
- Archive outdated docs

---

## 📝 EXAMPLES: Good vs Bad

### Example 1: Creating PRD

**❌ BAD**:
```bash
# Create file anywhere
touch payment-prd.md
nano payment-prd.md
```
```markdown
# Payment PRD

We need Razorpay integration.

Requirements:
- Add payment button
- Process payments
```

**Why Bad**:
- File in root (not allowed)
- No tags
- Wrong naming
- No ledger reference
- No structure

---

**✅ GOOD**:
```bash
# 1. Check if PRD already exists
grep -r "Payment" docs/04-prds/

# 2. Create with correct naming
touch docs/04-prds/PRD_PAYMENT_SYSTEM.md

# 3. Use template with all required fields
nano docs/04-prds/PRD_PAYMENT_SYSTEM.md
```

```markdown
---
tags: [ACTIVE, PRD, PENDING_APPROVAL]
phase: Phase-A
owner: PM
status: PENDING_APPROVAL
created: 2026-02-11
last_updated: 2026-02-11
---

# PRD: Payment System Integration

**Ledger Entry**: [ENTRY-008] PRD | PENDING_APPROVAL
**Phase**: Phase-A
**Owner**: PM
**Created**: 2026-02-11

---

## Overview
Integrate Razorpay and PayPal for 80/20 commission split payments.

## User Stories
- As a creator, I want to receive 80% of sale proceeds via Razorpay/PayPal
- As platform, I want to automatically collect 20% commission

## Requirements
### Functional
1. Razorpay integration for Indian creators
2. PayPal integration for international creators
3. Automatic 80/20 split on purchase
4. Transaction history visible to creators

### Non-Functional
1. Payment processing < 5 seconds
2. 99.9% uptime SLA
3. PCI DSS compliance

## Acceptance Criteria
- [ ] Creator can connect Razorpay account
- [ ] Creator can connect PayPal account
- [ ] Purchase splits payment 80/20 correctly
- [ ] Creator sees transaction in dashboard
- [ ] Platform receives 20% commission

## Technical Specification
### API Routes
- POST `/api/payments/razorpay/connect`
- POST `/api/payments/paypal/connect`
- POST `/api/payments/process`
- GET `/api/payments/history`

### Database Schema
```sql
CREATE TABLE payments (
  id UUID PRIMARY KEY,
  resource_id UUID REFERENCES resources(id),
  creator_id UUID REFERENCES users(id),
  amount DECIMAL(10,2),
  creator_amount DECIMAL(10,2),  -- 80%
  platform_fee DECIMAL(10,2),     -- 20%
  status VARCHAR(50),
  gateway VARCHAR(50),  -- 'razorpay' or 'paypal'
  created_at TIMESTAMP
);
```

### Components
- `PaymentSetupForm.tsx` - Connect gateway accounts
- `PaymentCheckout.tsx` - Purchase flow
- `TransactionHistory.tsx` - Creator earnings view

## Dependencies
- Depends on: [ENTRY-005] (User authentication)
- Blocks: [ENTRY-012] (Earnings dashboard needs this)

## Out of Scope
- Cryptocurrency payments (deferred to Phase 2)
- Subscriptions (only one-time purchases for MVP)
- Refunds (manual process for MVP)

## Approval
- [ ] Approved by: TBD
- Date: TBD

## 📝 CHANGE LOG

| Date | Change | By |
|------|--------|-----|
| 2026-02-11 | Created PRD | PM |
```

**Then**:
```bash
# 4. Add to ledger
# (Update PROJECT_LEDGER.md with [ENTRY-008])

# 5. Link from docs/README.md
# (Add to PRD section)

# 6. Commit with proper message
git add docs/04-prds/PRD_PAYMENT_SYSTEM.md PROJECT_LEDGER.md docs/README.md
git commit -m "docs: add [ENTRY-008] PRD for Payment System"
```

---

### Example 2: Archiving Old Doc

**❌ BAD**:
```bash
# Just delete it
rm docs/old-launch-plan.md
git commit -m "remove old file"
```

**Why Bad**:
- Lost historical context
- Can't reference old decisions
- Breaks audit trail

---

**✅ GOOD**:
```bash
# 1. Identify replacement doc
ls docs/02-strategy/MVP_LAUNCH_READINESS_REPORT.md

# 2. Move to archive with clear naming
mv docs/old-launch-plan.md docs/archive/pre-mvp/LAUNCH_PLAN_OLD_2026-01-15.md

# 3. Update with deprecation notice
nano docs/archive/pre-mvp/LAUNCH_PLAN_OLD_2026-01-15.md
```

```markdown
---
tags: [ARCHIVED]
status: ARCHIVED
archived_date: 2026-02-11
replaced_by: docs/02-strategy/MVP_LAUNCH_READINESS_REPORT.md
---

# [ARCHIVED] Old Launch Plan

**⚠️ DEPRECATED**: This document is archived and no longer maintained.

**Replacement**: See `docs/02-strategy/MVP_LAUNCH_READINESS_REPORT.md` for current MVP launch plan.

**Archived**: 2026-02-11
**Reason**: Superseded by new strategy with blockchain ledger system

---

[Original content preserved below...]
```

```bash
# 4. Commit with explanation
git add docs/archive/pre-mvp/LAUNCH_PLAN_OLD_2026-01-15.md
git commit -m "docs: archive old launch plan, replaced by MVP_LAUNCH_READINESS_REPORT"
```

---

## 🎓 TRAINING: New Team Members

**When onboarding new PM/Coder**:

1. Read this doc first: `docs/DOCUMENTATION_RULES.md`
2. Read organization guide: `docs/README.md`
3. Read ledger guide: `LEDGER_GUIDE.md`
4. Practice: Create sample PRD following all rules
5. PM reviews: Gives feedback on compliance
6. Repeat until 100% compliant

**Graduation Criteria**:
- [ ] Can create PRD with all required fields
- [ ] Knows where each doc type goes
- [ ] Applies tags correctly
- [ ] Links to ledger entries
- [ ] Follows naming conventions
- [ ] Archives old docs properly

---

## 📞 QUESTIONS?

**"Where does this doc go?"**
→ Check `docs/README.md` folder descriptions

**"What do I name this file?"**
→ Check Rule #3 naming conventions

**"Do I really need tags?"**
→ YES. Non-negotiable (Rule #2)

**"Can I just delete this old doc?"**
→ NO. Archive it (Rule #5)

**"This doc already exists, can I create new one?"**
→ NO. Update existing or clearly distinguish topic (Rule #4)

**"I'm in a hurry, can I skip the checklist?"**
→ NO. Checklist takes 2 minutes, prevents hours of cleanup later

---

## 🔄 CONTINUOUS IMPROVEMENT

**These rules will evolve**. When updating:

1. Document change in this file's change log
2. Announce change to team (CEO, PM, Coder)
3. Update `docs/README.md` if folder structure changes
4. Update templates if required sections change
5. Add to automated enforcement (if applicable)

**Propose Changes**:
- Create ledger entry: `[ENTRY-XXX] PM_DECISION`
- Describe proposed rule change
- Get CEO approval
- Update this doc

---

## 📝 CHANGE LOG

| Date | Change | By |
|------|--------|-----|
| 2026-02-11 | Created documentation rules | PM |
| TBD | Add automated enforcement hooks | PM |

---

**These rules are MANDATORY, not optional.**

**Violations will be caught by PM during gate reviews.**

**When in doubt, ask PM before creating doc.**

---

**Version**: 1.0
**Last Updated**: 2026-02-11
**Maintained By**: PM (Claude Code)
