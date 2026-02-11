# 📘 PROJECT LEDGER GUIDE
## How PM and Coder Use the Blockchain-Style Registry

**Version**: 1.0
**Created**: 2026-02-11
**For**: PM (Claude Code) & Coder (Antigravity)

---

## 🎯 PURPOSE

The Project Ledger is the **single source of truth** for:
- What to build (PRDs)
- What to do (Tasks)
- What was done (QA Reports)
- What was decided (PM Approvals)
- Why it was done (Evidence)

**Goal**: Zero confusion, zero duplicate docs, zero wrong references.

---

## 🔐 BLOCKCHAIN PRINCIPLES

### 1. Immutability
- Once an entry is created, core facts don't change
- Updates append new information (audit trail)
- Git hashes provide cryptographic verification

### 2. Timestamping
- Every entry has ISO 8601 timestamp
- Chronological order preserved
- Timeline reconstruction possible

### 3. Linking
- Entries link to related entries (tasks → PRD)
- Chain of events traceable
- Dependencies visible

### 4. Single Source of Truth
- Only ONE ledger file: `PROJECT_LEDGER.md`
- All other docs link TO ledger (not vice versa)
- Ledger is the registry, docs are the details

---

## 👥 ROLES & RESPONSIBILITIES

### PM (Claude Code)
**Creates**:
- PRD entries
- PM Decision entries
- Task assignment updates

**Approves**:
- PRDs (self-created, needs CEO approval)
- Task completions (after QA validation)
- Deployment decisions

**Updates**:
- Approval status
- Links between entries
- Ledger statistics

### Coder (Antigravity)
**Creates**:
- Task completion submissions
- Evidence files
- Technical documentation

**Updates**:
- Task status (PENDING → IN_PROGRESS → COMPLETED)
- Git hashes (after commits)
- Evidence file paths

**Requests**:
- Task clarifications (if requirements unclear)
- QA validation (when task complete)

### QA (Automated/PM)
**Creates**:
- QA Report entries
- Validation results

**Updates**:
- Pass/Fail status
- Issues found
- Retesting results

---

## 📋 ENTRY TYPES

### 1. PRD (Product Requirements Document)
```
[ENTRY-XXX] PRD | STATUS | TIMESTAMP | PM | -
Title: Feature name
Owner: PM
Status: PENDING_APPROVAL | APPROVED | REJECTED
Links: [Related entries]

User Stories:
- As a [role], I want [goal]

Requirements:
- Functional requirement 1
- Functional requirement 2

Acceptance Criteria:
- [ ] Criterion 1
- [ ] Criterion 2

Technical Spec:
- API routes
- Database changes
- Components

Approval: PENDING | APPROVED by [who] on [date]
Evidence: Path to full PRD doc
```

**When to Create**: Before any implementation work starts

---

### 2. TASK (Implementation Work)
```
[ENTRY-XXX] TASK | STATUS | TIMESTAMP | Coder | -
Title: Task name
Parent: [ENTRY-XXX] (PRD it implements)
Owner: Coder name
Status: PENDING_ASSIGNMENT | IN_PROGRESS | COMPLETED | BLOCKED
Estimated: X hours

Deliverables:
1. Specific deliverable
2. Another deliverable

Acceptance Criteria:
- [ ] Criterion 1
- [ ] Criterion 2

Assignment Date: YYYY-MM-DD
Due Date: YYYY-MM-DD
Git Hash: abc123 (pending until committed)
Evidence: File paths, screenshots
```

**When to Create**: When PRD is approved and ready for implementation

---

### 3. QA REPORT (Validation Results)
```
[ENTRY-XXX] QA_REPORT | STATUS | TIMESTAMP | QA | -
Title: QA for [TASK-XXX]
Parent: [ENTRY-XXX] (task being validated)
Owner: QA Agent/PM
Status: PASS | FAIL | RETEST

Test Results:
✓ Test case 1: PASS
✗ Test case 2: FAIL (reason)
✓ Test case 3: PASS

Issues Found:
1. Issue description [Severity: P0/P1/P2]
2. Another issue

Ralph Gates:
- Gate 5 (Security): PASS
- Gate 7 (Build): PASS
- Gate 8 (Tests): FAIL (coverage 70%, need 80%)

Overall: PASS | FAIL
Retesting: Required | Not Required
Evidence: Test logs, screenshots
```

**When to Create**: After coder submits task for validation

---

### 4. PM_DECISION (Approval/Rejection)
```
[ENTRY-XXX] PM_DECISION | APPROVED | TIMESTAMP | PM | -
Title: Decision on [ENTRY-XXX]
Subject: [Entry being decided on]
Decision: APPROVED | REJECTED | NEEDS_REVISION

Reasoning:
- Why this decision was made
- What was considered
- Alternatives evaluated

Conditions (if approved):
- Condition 1 that must be met
- Condition 2

Next Steps:
1. Action 1
2. Action 2

Evidence: Meeting notes, review comments
```

**When to Create**: When approving/rejecting PRDs or major changes

---

## 🔄 WORKFLOW

### Happy Path: PRD → Task → QA → Deployment

```
1. PM creates PRD entry
   └─ Status: PENDING_APPROVAL

2. CEO/PM approves PRD
   └─ Status: APPROVED

3. PM creates TASK entries for PRD
   └─ Status: PENDING_ASSIGNMENT

4. PM assigns task to Coder
   └─ Status: IN_PROGRESS
   └─ Coder updates assignment date

5. Coder completes task
   └─ Coder commits code (gets git hash)
   └─ Coder updates task with git hash + evidence
   └─ Coder requests QA validation

6. QA validates task
   └─ QA creates QA_REPORT entry
   └─ Status: PASS or FAIL

7a. If PASS:
    └─ PM marks task COMPLETED
    └─ Ledger updated with completion

7b. If FAIL:
    └─ Task returns to IN_PROGRESS
    └─ Coder fixes issues
    └─ Repeat from step 5
```

---

## 💬 COMMUNICATION WORKFLOW (PM ↔ Coder via CEO)

### How It Works

**PM and Coder CANNOT communicate directly** - CEO acts as notification layer only.

**Communication Method**: Both edit PROJECT_LEDGER.md directly, adding COMMENTS under specific entries.

### Step-by-Step Process

#### When PM Needs to Communicate with Coder:

1. **PM opens PROJECT_LEDGER.md**
2. **PM finds the relevant entry** (e.g., ENTRY-015)
3. **PM scrolls to COMMENTS section** under that entry
4. **PM adds comment with timestamp**:
   ```
   [2026-02-11 18:30] PM → Coder:
   Please prioritize this task. See RICE_SCORING_ANALYSIS.md - RICE score: 3,600.
   ```
5. **PM saves and commits** ledger
6. **PM notifies CEO**: "I updated ledger with comments for ENTRY-015"
7. **CEO notifies Coder**: "Check ledger for updates"

#### When Coder Needs to Communicate with PM:

1. **Coder opens PROJECT_LEDGER.md**
2. **Coder finds the relevant entry** (e.g., ENTRY-015)
3. **Coder scrolls to COMMENTS section** under that entry
4. **Coder adds comment with timestamp**:
   ```
   [2026-02-11 20:00] Coder → PM:
   ✅ Task completed. Lint error fixed.
   Git commit: abc123f
   Evidence: Screenshot at docs/evidence/lint-fixed.png
   ```
5. **Coder saves and commits** ledger
6. **Coder notifies CEO**: "I updated ledger for ENTRY-015, task complete"
7. **CEO notifies PM**: "Check ledger for updates"

### Comment Format (MANDATORY)

```
[YYYY-MM-DD HH:MM] [PM/Coder] → [Coder/PM]:
Your message here.
Can be multiple lines.
```

**Example**:
```
[2026-02-11 14:30] PM → Coder:
This is BLOCKING all commits. Please fix ASAP.
RICE Score: 3,600 (2nd highest priority).

[2026-02-11 16:00] Coder → PM:
Starting work now. Will report back in 2 hours.

[2026-02-11 18:15] Coder → PM:
✅ COMPLETED. Git hash: a1b2c3d
Evidence: docs/evidence/entry-015-proof.png

[2026-02-11 18:30] PM → Coder:
✅ APPROVED. Verified lint passing. Moving to COMPLETED.
Next task: ENTRY-002 (Install Playwright). Check ledger.
```

### What CEO Does (Simple)

**CEO does NOT**:
- ❌ Copy-paste messages
- ❌ Edit ledger content
- ❌ Make decisions

**CEO only**:
- ✅ Notifies PM: "Check ledger for updates"
- ✅ Notifies Coder: "Check ledger for updates"
- ✅ That's it!

### Benefits

✅ **Single source of truth** - All communication tied to specific tasks
✅ **Audit trail** - Every message timestamped and version-controlled
✅ **Context preserved** - Anyone can see full conversation history per task
✅ **No separate files** - Everything in PROJECT_LEDGER.md
✅ **CEO workload minimal** - Just notification, no data entry

---

## 📝 HOW TO ADD AN ENTRY

### PM Adding a PRD

1. **Determine Entry Number**:
   - Check last entry number in ledger
   - New entry = last number + 1
   - Example: Last is ENTRY-017, new is ENTRY-018

2. **Copy PRD Template**:
   ```
   [ENTRY-018] PRD | PENDING_APPROVAL | 2026-02-11T12:00:00Z | PM | -
   ```

3. **Fill Required Fields**:
   - Title: Clear, concise feature name
   - User Stories: What user wants to achieve
   - Requirements: What must be built
   - Acceptance Criteria: How to verify it works
   - Technical Spec: Implementation details

4. **Set Status**:
   - Always starts as PENDING_APPROVAL
   - Changes to APPROVED after review

5. **Create Supporting Doc** (optional):
   - Full PRD in `docs/PRD_FEATURE_NAME.md`
   - Link from ledger entry: `Evidence: docs/PRD_FEATURE_NAME.md`

6. **Commit Ledger**:
   ```bash
   git add PROJECT_LEDGER.md
   git commit -m "ledger: add [ENTRY-018] PRD for Feature Name"
   git push
   ```

---

### Coder Updating Task Status

1. **Find Your Task**:
   - Search ledger for your assigned task
   - Example: `[ENTRY-009] TASK | IN_PROGRESS | ... | Antigravity`

2. **Update Status**:
   - Change status as you work:
     - PENDING_ASSIGNMENT → IN_PROGRESS (when you start)
     - IN_PROGRESS → COMPLETED (when done, after QA pass)

3. **Add Evidence**:
   - Git hash of your commits
   - File paths created/modified
   - Screenshots of working feature
   - Test results

4. **Example Update**:
   ```diff
   - Status: IN_PROGRESS
   + Status: COMPLETED
   - Git Hash: TBD
   + Git Hash: abc123def456
   - Evidence: TBD
   + Evidence:
   +   - Files: src/components/ClaimButton.tsx
   +   - Tests: tests/e2e/claiming.spec.ts (all passing)
   +   - Screenshots: docs/screenshots/claim-flow.png
   +   - QA Report: [ENTRY-025]
   ```

5. **Request QA**:
   - Update ledger with your completion
   - Notify PM: "Task [ENTRY-009] ready for QA validation"
   - PM will create QA_REPORT entry

6. **Commit Update**:
   ```bash
   git add PROJECT_LEDGER.md
   git commit -m "ledger: complete [ENTRY-009] - Claim Button UI"
   git push
   ```

---

## 🔍 HOW TO REFERENCE ENTRIES

### In Code Comments
```typescript
/**
 * Claim Button Component
 * Implements: [ENTRY-009] PRD - Resource Claiming System
 * Task: [ENTRY-015] TASK - Claim Button & UI Flow
 * QA: [ENTRY-020] QA_REPORT - Pass
 */
export function ClaimButton() {
  // ...
}
```

### In Git Commits
```bash
git commit -m "feat: implement claim button [ENTRY-015]

- Add ClaimButton component
- Add claim modal UI
- Add success/error states

Implements: [ENTRY-009] PRD - Resource Claiming System
Evidence: See PROJECT_LEDGER.md entry ENTRY-015"
```

### In Documentation
```markdown
# Feature: Resource Claiming

**Ledger Entry**: [ENTRY-009] PRD | APPROVED
**Implementation Tasks**: [ENTRY-015], [ENTRY-016]
**QA Report**: [ENTRY-020] QA_REPORT | PASS

## Overview
...
```

---

## 🚨 COMMON MISTAKES TO AVOID

### ❌ DON'T: Create duplicate docs without linking
```
Bad:
- Create "payment-system-spec.md" separately
- No link to ledger
- PM and Coder reference different docs
```

### ✅ DO: Create PRD in ledger, link to detailed doc
```
Good:
- Create [ENTRY-008] PRD in ledger (summary)
- Create docs/PRD_PAYMENT_SYSTEM.md (details)
- Link from ledger: Evidence: docs/PRD_PAYMENT_SYSTEM.md
- Everyone references ledger entry number
```

---

### ❌ DON'T: Update task status without evidence
```
Bad:
Status: COMPLETED
Git Hash: TBD
Evidence: TBD
```

### ✅ DO: Update with full evidence
```
Good:
Status: COMPLETED
Git Hash: abc123def456
Evidence:
  - Files: src/app/api/claims/route.ts
  - Tests: 15/15 passing
  - Screenshots: docs/screenshots/claim-success.png
  - QA: [ENTRY-020] PASS
```

---

### ❌ DON'T: Create tasks without approved PRD
```
Bad:
1. Coder sees feature request
2. Starts coding immediately
3. No PRD entry
4. PM has different expectations
5. Work needs to be redone
```

### ✅ DO: PRD first, then tasks
```
Good:
1. PM creates [ENTRY-008] PRD
2. CEO/PM approves PRD
3. PM creates [ENTRY-009] TASK linked to PRD
4. Coder implements exactly what PRD describes
5. No confusion, no rework
```

---

## 🔗 LINKING STRATEGY

### Parent-Child Relationships
```
[ENTRY-008] PRD - Payment System
  ├─ [ENTRY-009] TASK - Payment API Routes
  │   └─ [ENTRY-020] QA_REPORT - PASS
  ├─ [ENTRY-010] TASK - Payment Webhook
  │   └─ [ENTRY-021] QA_REPORT - FAIL (retest needed)
  └─ [ENTRY-011] TASK - Payment E2E Tests
      └─ [ENTRY-022] QA_REPORT - PASS
```

### Cross-References
```
[ENTRY-012] PRD - Claiming System
Links:
  - Depends on: [ENTRY-008] (needs payment system)
  - Related to: [ENTRY-015] (claiming UI)
  - Tested by: [ENTRY-018] (E2E tests)
```

---

## 📊 STATISTICS TRACKING

PM updates ledger statistics after each batch of changes:

```markdown
## 📊 LEDGER STATISTICS

**Total Entries**: 25
**PRDs**: 8 (6 approved, 2 pending)
**Tasks**: 15 (3 completed, 5 in-progress, 7 pending)
**QA Reports**: 2 (1 pass, 1 fail)

**Status Breakdown**:
- ✅ APPROVED: 6
- ✅ COMPLETED: 3
- 🚧 IN_PROGRESS: 5
- ⏳ PENDING: 9
- ❌ BLOCKED: 0

**Phase Progress**:
- Phase 0: 40% (4/10 tasks)
- Phase A: 20% (1/5 tasks)
- Phase B: 0% (0/3 tasks)

**Overall MVP**: 18% (5/28 entries complete)
```

**Update Frequency**: Daily or after major changes

---

## 🎯 DECISION POINTS

### When to Create a New PRD vs. Modify Existing?

**Create New PRD if**:
- Feature is significantly different
- User story is different
- Acceptance criteria change fundamentally

**Modify Existing PRD if**:
- Small clarification needed
- Implementation detail changes (not requirements)
- Add one acceptance criterion

**How to Modify**:
```diff
[ENTRY-008] PRD | APPROVED | 2026-02-11T10:00:00Z | PM | -
Title: Payment System

Requirements:
- Razorpay integration
- 80/20 split
+ - Stripe fallback support (added 2026-02-12)

+ MODIFICATION LOG:
+ - 2026-02-12: Added Stripe fallback per CEO request
```

---

### When Does a Task Need QA?

**Always Requires QA**:
- ✅ Backend API changes
- ✅ Frontend UI components
- ✅ Database migrations
- ✅ Payment/security features
- ✅ Authentication changes

**May Skip QA** (at PM discretion):
- Documentation updates
- Copy changes (if no logic)
- Minor CSS tweaks

**QA Process**:
1. Coder completes task
2. Coder requests QA in ledger
3. PM/QA Agent validates
4. QA_REPORT entry created
5. Pass → task complete, Fail → back to coder

---

## 🚀 QUICK REFERENCE

### Status Values

| Type | Possible Statuses |
|------|------------------|
| **PRD** | PENDING_APPROVAL, APPROVED, REJECTED, NEEDS_REVISION |
| **TASK** | PENDING_ASSIGNMENT, IN_PROGRESS, COMPLETED, BLOCKED |
| **QA_REPORT** | PASS, FAIL, RETEST |
| **PM_DECISION** | APPROVED, REJECTED, DEFERRED |

### Entry Number Format
- `[ENTRY-001]` to `[ENTRY-998]` - Active entries
- `[ENTRY-999]` - Reserved for future/deferred tasks

### Timestamp Format
- ISO 8601: `2026-02-11T10:30:00Z`
- Always UTC timezone
- Generated: `date -u +"%Y-%m-%dT%H:%M:%SZ"`

### Git Commit Format
```
ledger: <action> [ENTRY-XXX] <brief description>

Examples:
- ledger: add [ENTRY-018] PRD for Payment System
- ledger: complete [ENTRY-009] Claim Button UI
- ledger: approve [ENTRY-008] after CEO review
- ledger: link [ENTRY-020] QA report to [ENTRY-009]
```

---

## 📞 WHEN TO ASK FOR HELP

### PM Should Clarify If:
- ❓ Task requirements unclear
- ❓ Multiple valid approaches (which to choose?)
- ❓ Acceptance criteria ambiguous
- ❓ Dependencies blocking work

**How to Ask**:
1. Update task entry with question
2. Set status: BLOCKED
3. Add blocker reason
4. Notify PM in ledger commit message

### Coder Should Escalate If:
- 🚨 Task cannot be completed as specified
- 🚨 PRD has technical impossibility
- 🚨 Estimated time wildly off (2h → 20h)
- 🚨 Breaking change required

**How to Escalate**:
1. Update task: Status = BLOCKED
2. Add detailed blocker description
3. Propose alternative approach
4. Request PM decision entry

---

## ✅ CHECKLIST: Before Closing a Task

Coder verifies:
- [ ] All deliverables completed
- [ ] All acceptance criteria met
- [ ] Code committed with git hash
- [ ] Tests written and passing
- [ ] Ralph gates passed (build, lint, test)
- [ ] Evidence files created
- [ ] Ledger entry updated
- [ ] QA validation requested

PM verifies:
- [ ] QA report exists and shows PASS
- [ ] Git hash matches actual commits
- [ ] Evidence matches requirements
- [ ] No outstanding issues
- [ ] Ready for next phase/deployment

Only then: Status = COMPLETED

---

## 🎓 BEST PRACTICES

1. **Update Early, Update Often**
   - Don't wait until task complete to update ledger
   - Update status when starting work
   - Add evidence as you create it

2. **Be Specific with Evidence**
   - Don't say "code works"
   - Say "15/15 tests passing, screenshot attached"

3. **Link Liberally**
   - Link tasks to PRDs
   - Link QA reports to tasks
   - Link related features to each other

4. **Use Git Hashes**
   - Every completed task gets git hash
   - Enables exact code verification
   - Cryptographic proof of what was done

5. **One Source of Truth**
   - Always check ledger first
   - If ledger and doc conflict, ledger wins
   - Update both to match

---

**This guide is the instruction manual for PROJECT_LEDGER.md**

**Questions?** Update this guide with the answer!

---

**Version**: 1.0
**Last Updated**: 2026-02-11
**Maintained By**: PM (Claude Code)
