# 📁 DOCUMENTATION STRUCTURE
## Organized Folder System for Antigravity Directory

**Last Updated**: 2026-02-13
**Maintained By**: PM (Claude Code)
**Status**: Pre-Launch (Beta Pending - Need ENTRY-012 + ENTRY-010)

---

## 📋 FOLDER STRUCTURE

```
docs/
├── 01-business/          # Business model, marketplace specs
├── 02-strategy/          # Strategy, roadmaps, SEO plans
├── 03-implementation/    # How-to guides, checklists
├── 04-prds/             # Product Requirements Documents
│   └── archive/         # Completed/old PRDs
├── 05-reports/          # Quality reports, audits
│   ├── quality/         # QA reports, PM reviews
│   ├── phase-completions/ # Phase summary reports
│   └── audits/          # Technical audits
├── 06-plans/            # Implementation plans
├── 07-walkthroughs/     # Step-by-step guides
└── archive/             # Historical/completed docs
    ├── pre-mvp/         # Docs before MVP work
    ├── phase-0/         # Content Seeding (Feb 4)
    ├── phase-1/         # Core Directory (Feb 5)
    ├── phase-2.1/       # Homepage Transform (Feb 5)
    └── reports-historical/ # Completed task reports
```

---

## 📂 FOLDER DESCRIPTIONS

### 01-business/
**Purpose**: Business model, marketplace specifications, revenue strategy

**Contains**:
- `MARKETPLACE_MODEL_SPEC.md` ⭐ Single source of truth (first 2 sales free, 80/20 split)
- `COMPETITIVE_ANALYSIS_2026.md` ⭐ Market validation (cursor.directory $35k/month, NEVER research again)
- `UNCLAIMED_RESOURCES_LEGAL_ANALYSIS.md` ⭐ Legal protection (DMCA safe harbor, verification-first)
- `COPYWRITING_STRATEGY.md` - Messaging guidelines
- `CREATOR-DATA-REFERENCE.md` - Creator database reference

**Who Uses**: CEO, PM, Marketing, Legal
**Update Frequency**: Updated 2026-02-13 (business model finalized, market validated)
**Status**: ✅ COMPLETE - All research done, ready to launch

---

### 02-strategy/
**Purpose**: Strategic planning, roadmaps, growth tactics

**Contains**:
- `MVP_LAUNCH_READINESS_REPORT.md` ⭐ Current MVP status (85% complete)
- `POST_MVP_DEFERRED.md` - Post-launch tasks (growth hacks, features)
- `USER-PROFILES-SEO-STRATEGY.md` - SEO growth plan (Phase 2)
- `README.md` - Strategy overview

**Who Uses**: CEO, PM
**Update Frequency**: Weekly (during active development)

---

### 03-implementation/
**Purpose**: Technical guides, checklists, how-tos

**Contains**:
- `SECRETS_REFERENCE.md` ⭐ - All API keys/secrets/env vars guide
- `FILE-STRUCTURE-GUIDE.md` - Codebase structure
- `IMPLEMENTATION-GUIDE.md` - Development guidelines
- `SECURITY_CHECKLIST.md` - Security requirements
- `accessibility-checklist.md` - A11y requirements
- `QUICK-START-CHECKLIST.md` - Onboarding guide
- `state-management.md` - State management patterns

**Who Uses**: Coder (Antigravity), PM, CEO (maintains actual secrets)
**Update Frequency**: As needed (when patterns change)

---

### 04-prds/
**Purpose**: Product Requirements Documents for upcoming features

**Contains** (as PM creates them):
- Phase 0: E2E Testing Infrastructure PRD
- Phase A: Payment System PRD
- Phase A: Resource Claiming PRD
- Phase A: Creator Earnings Dashboard PRD
- Phase B: Claim Button UI PRD
- Phase B: Resource Pricing UI PRD

**Who Uses**: PM (creates), Coder (implements), CEO (approves)
**Update Frequency**: Before each new feature

**Naming Convention**: `PRD_FEATURE_NAME.md`
**Tags**: `[APPROVED]`, `[PENDING_APPROVAL]`, `[REJECTED]`

**Subdirectory**:
- `archive/` - Old/completed PRDs (old directory model PRDs)

---

### 05-reports/
**Purpose**: Quality reports, audits, validations

**Subdirectories**:

#### quality/
- QA reports
- PM protocol analysis
- Gate reports
- Phase reviews

#### phase-completions/
- `PHASE-1-COMPLETE-SUMMARY.md`
- `PHASE-2-PREVIEW.md`
- `STRATEGIC-ASSESSMENT-PHASE-1.md`

#### audits/
- Architecture audits
- Performance audits
- Security scans
- Accessibility audits
- Ralph Protocol self-audits

**Who Uses**: PM (creates), CEO (reviews), Coder (reads feedback)
**Update Frequency**: After each task/phase completion

---

### 06-plans/
**Purpose**: Detailed implementation plans (Ralph Protocol Gate 3)

**Contains**:
- `PHASE_0_PLAN_2026-02-03.md` - Phase 0 implementation plan
- (Future plans added here as PM creates them)

**Naming Convention**: `PHASE_X_FEATURE_NAME_PLAN_YYYY-MM-DD.md`
**Required Fields**:
- Problem statement
- Proposed solution
- Alternatives considered ⭐ (Ralph Law 23)
- Implementation steps
- Success criteria

**Who Uses**: PM (creates), Coder (follows), CEO (approves)
**Update Frequency**: Before starting each new phase/feature

---

### 07-walkthroughs/
**Purpose**: Step-by-step implementation guides, how-tos

**Contains**:
- `FINAL_SHIP_PHASE_1.md`
- `walkthrough_TASK_009.md`
- `walkthrough_TASK_010.md`
- `walkthrough_TASK_011.md`
- `walkthrough_TASK_44.md`

**Who Uses**: Coder (reference), PM (validation)
**Update Frequency**: After completing complex tasks

---

### archive/
**Purpose**: Historical documents, completed work, deprecated specs

**Subdirectories**:

#### pre-mvp/
Documents before MVP development started:
- Old task lists (replaced by PROJECT_LEDGER.md)
- Launch prep documents
- CEO directives
- Quality standards
- Ralph Protocol iterations

#### phase-0/
Content Seeding phase (Completed Feb 4, 2026):
- `REPORT-CENTER.md` (replaced by PROJECT_LEDGER.md)

#### phase-1/
Core Directory phase (Completed Feb 5, 2026):
- (Will be populated when backfilling ledger - see ENTRY-999)

#### phase-2.1/
Homepage Transform (Completed Feb 5, 2026):
- Phase 2.1 cleanup docs
- Review reports
- Execution briefs

#### reports-historical/
Task-specific reports from completed work:
- Assessment reports (TASK_XXX)
- Execution reports (TASK_XXX)
- Production verifications (TASK_XXX)
- Test results (TASK_XXX)

**Who Uses**: Reference only (historical record)
**Update Frequency**: Never (archived = frozen)

---

## 🏷️ DOCUMENT TAGS

Add tags to document headers for easy filtering:

```markdown
---
tags: [ACTIVE, PRD, APPROVED]
phase: Phase-A
owner: PM
status: APPROVED
created: 2026-02-11
last_updated: 2026-02-11
---
```

**Tag Categories**:

### Status Tags
- `[ACTIVE]` - Currently in use
- `[ARCHIVED]` - Historical/deprecated
- `[DRAFT]` - Work in progress
- `[APPROVED]` - CEO/PM approved
- `[PENDING_APPROVAL]` - Awaiting review
- `[REJECTED]` - Not approved

### Type Tags
- `[PRD]` - Product Requirements
- `[PLAN]` - Implementation Plan
- `[REPORT]` - Quality/audit report
- `[STRATEGY]` - Strategic document
- `[GUIDE]` - How-to/checklist

### Phase Tags
- `[Phase-0]` - E2E Testing
- `[Phase-A]` - Payment/Claiming
- `[Phase-B]` - Creator UI
- `[Phase-C]` - Polish/Testing
- `[Phase-D]` - Deployment
- `[Post-MVP]` - Future work

---

## 📝 NAMING CONVENTIONS

### PRDs
`PRD_FEATURE_NAME.md`
- Example: `PRD_PAYMENT_SYSTEM.md`
- Example: `PRD_CLAIMING_SYSTEM.md`

### Plans
`PHASE_X_FEATURE_NAME_PLAN_YYYY-MM-DD.md`
- Example: `PHASE_A_PAYMENT_PLAN_2026-02-12.md`

### Reports
`REPORT_TYPE_SUBJECT_YYYY-MM-DD.md`
- Example: `QA_REPORT_PAYMENT_SYSTEM_2026-02-15.md`
- Example: `PM_REVIEW_CLAIM_BUTTON_2026-02-16.md`

### Walkthroughs
`walkthrough_TASK_XXX.md` (where XXX = task number)
- Example: `walkthrough_TASK_015.md`

---

## 🔍 HOW TO FIND DOCUMENTS

### Looking for API Keys/Secrets/Environment Variables?
→ `docs/archive/implementation/SECRETS_REFERENCE.md` ⭐

### Looking for Documentation Rules?
→ `docs/DOCUMENTATION_RULES.md` ⭐

### Looking for Business Rules?
→ `docs/business/MARKETPLACE_MODEL_SPEC.md`

### Looking for MVP Status?
→ `docs/strategy/MVP_LAUNCH_READINESS_REPORT.md`

### Looking for Implementation Guides?
→ `docs/archive/implementation/`

### Looking for PRD for New Feature?
→ `docs/prds/` (or check PROJECT_LEDGER.md for entry number)

### Looking for QA Reports?
→ `docs/archive/reports/quality/`

### Looking for Phase Completion Summary?
→ `docs/archive/reports/phase-completions/`

### Looking for Implementation Plan?
→ `docs/archive/plans/`

### Looking for Old/Completed Docs?
→ `docs/archive/`

---

## 🚀 QUICK REFERENCE

| Need | Location |
|------|----------|
| **Current MVP tasks** | `PROJECT_LEDGER.md` (root) ⭐ |
| **How to use ledger** | `LEDGER_GUIDE.md` (root) |
| **PM ↔ Coder communication** | `docs/COMMUNICATION_PROTOCOL.md` ⭐ |
| **All API keys/secrets** | `docs/archive/implementation/SECRETS_REFERENCE.md` ⭐ |
| **Doc maintenance rules** | `docs/DOCUMENTATION_RULES.md` ⭐ |
| **Business model** | `docs/business/MARKETPLACE_MODEL_SPEC.md` |
| **MVP status** | `docs/strategy/MVP_LAUNCH_READINESS_REPORT.md` |
| **Post-MVP plans** | `docs/strategy/POST_MVP_DEFERRED.md` |
| **Security checklist** | `docs/archive/implementation/SECURITY_CHECKLIST.md` |
| **New feature PRDs** | `docs/prds/` |
| **QA reports** | `docs/archive/reports/quality/` |
| **Phase summaries** | `docs/archive/reports/phase-completions/` |
| **Implementation plans** | `docs/archive/plans/` |
| **Alpha Protocol** | `.agent/README.md` |
| **Ralph Protocol** | `.agent/RALPH_PROTOCOL.md` |
| **PM Protocol** | `.agent/PM_PROTOCOL.md` |

---

## ✅ BEST PRACTICES

1. **Follow documentation rules** → See `DOCUMENTATION_RULES.md` for all rules ⭐
2. **Create PRDs in ledger first** → Then detailed PRD in `04-prds/`
3. **Link ledger entries** → Reference `[ENTRY-XXX]` in all docs
4. **Use required tags** → Every doc needs frontmatter tags (mandatory)
5. **Follow naming conventions** → PRD_FEATURE_NAME.md, PHASE_X_PLAN_YYYY-MM-DD.md
6. **Archive completed work** → Never delete, move to `docs/archive/` with notice
7. **No files in root** → Only PROJECT_LEDGER.md, LEDGER_GUIDE.md, README.md allowed
8. **Check for secrets** → See `SECRETS_REFERENCE.md` before asking CEO ⭐
9. **One source of truth** → No duplicate docs, update existing instead
10. **Update this README** → When adding new folders/patterns

---

## 🔄 MAINTENANCE

**Weekly** (During active development):
- Update MVP status in `02-strategy/MVP_LAUNCH_READINESS_REPORT.md`
- Archive completed phase docs
- Create new PRDs in `04-prds/`

**Monthly** (Post-launch):
- Review and consolidate reports
- Update business model if needed
- Archive old strategies

**Quarterly**:
- Audit archive folders (delete truly obsolete docs)
- Update folder structure if needed
- Review naming conventions

---

**This README is the map to all documentation.**

**Confused? Check here first.**

---

## 📝 CHANGE LOG

| Date | Change | By |
|------|--------|-----|
| 2026-02-11 | Created comprehensive docs structure guide | PM |
| 2026-02-11 | Added SECRETS_REFERENCE.md and DOCUMENTATION_RULES.md | PM |

---

**Version**: 1.2
**Last Updated**: 2026-02-13
**Maintained By**: PM (Claude Code)

---

## 🎯 CRITICAL: BETA LAUNCH BLOCKERS

**Site Status**: ✅ LIVE at https://www.googleantigravity.directory

**What's Working**:
- ✅ Resource claiming via GitHub OAuth (ENTRY-009)
- ✅ Payment processing via Razorpay + PayPal (ENTRY-008)
- ✅ E2E tests for purchase flow (15/15 passed)

**What's Missing (BLOCKING BETA)**:
1. ❌ **ENTRY-012**: Resource Pricing UI (4-6 hours)
   - Creators can't set prices yet (no UI)
   - Blocks monetization entirely
2. ❌ **ENTRY-010**: Creator Earnings Dashboard (6-8 hours)
   - Creators can't see earnings/sales
   - No payout request flow

**Estimated Time to Beta Ready**: 10-14 hours (2 focused days)

**Legal Nice-to-Have** (not blocking):
- ⚠️ DMCA agent registration
- ⚠️ `/dmca` takedown page
- ⚠️ Terms of Service updates

See [UNCLAIMED_RESOURCES_LEGAL_ANALYSIS.md](./01-business/UNCLAIMED_RESOURCES_LEGAL_ANALYSIS.md) for full legal analysis.
