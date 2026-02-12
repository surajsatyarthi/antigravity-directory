# 🚀 PHASE 0 - CODER ASSIGNMENT

**Date**: 2026-02-12
**From**: CEO
**To**: Coder (Antigravity)
**Project**: googleantigravity.directory MVP

---

## 📋 WELCOME TO PHASE 0

You are being assigned **Phase 0: E2E Testing Infrastructure** (7 tasks, 14 hours total).

**CRITICAL**: There is a **blocking lint error** that prevents all git commits. This MUST be fixed before any other work can proceed.

---

## 🎯 YOUR FIRST TASK (URGENT)

**[ENTRY-015] Fix Ralph Protocol Gates - Lint Configuration Error**

**Current Problem**:
```bash
$ npm run lint
> next lint
Invalid project directory provided, no such directory: /Users/surajsatyarthi/Desktop/antigravity-directory/lint
```

**Impact**: Pre-commit hook blocks ALL git commits (even documentation)

**Your Task**:
1. Investigate Next.js lint configuration
2. Fix the invalid directory path error
3. Verify `npm run lint` runs successfully
4. Verify pre-commit hook no longer blocks commits
5. Document fix in ledger comment

**Effort**: 2 hours
**Priority**: 🚨 CRITICAL - Everything else is blocked until this is fixed

**Success Criteria**:
- `npm run lint` passes without directory errors
- Can commit code without pre-commit blocking
- Zero lint errors in codebase

---

## 📚 MANDATORY READING (Read These First)

**Before writing ANY code, read these files in this order:**

### 1. Communication & Process (15 min)
- `PROJECT_LEDGER.md` - Your task registry and communication hub
- `LEDGER_GUIDE.md` - How to use the ledger
- `docs/COMMUNICATION_PROTOCOL.md` - How we communicate (CEO is notification layer)

### 2. Quality Standards (30 min)
- `.agent/RALPH_PROTOCOL.md` - 12 technical quality gates (NON-NEGOTIABLE)
- `.agent/PM_PROTOCOL.md` - 7 strategic validation gates
- `.agent/QA_PROTOCOL.md` - 6 independent verification gates
- `.agent/STANDING_ORDERS.md` - Zero-tolerance rules

### 3. Workflow (15 min)
- `.agent/WORKFLOW.md` - Complete feature journey through protocols
- `.agent/PROMPT_FOR_AI_CODERS.md` - Quick reference for AI coders
- `.agent/AI_CODER_ADAPTATION_GUIDE.md` - Detailed guidance

### 4. Phase 0 Requirements (20 min)
- `docs/04-prds/PHASE_0_E2E_TESTING_PRD.md` - Complete PRD for E2E testing
- `docs/05-reports/RICE_SCORING_ANALYSIS.md` - Task prioritization

### 5. Project Context (10 min)
- `docs/DOCUMENTATION_RULES.md` - File tagging and organization
- `docs/03-implementation/SECRETS_REFERENCE.md` - Environment variables

**Total Reading Time**: ~90 minutes

---

## 🔒 NON-NEGOTIABLE RULES

**These are MANDATORY, not optional:**

### 1. Communication Protocol
- ✅ **ALL updates go in PROJECT_LEDGER.md** under task comments
- ✅ **Format**: `[YYYY-MM-DD HH:MM] Coder → PM: Your message`
- ✅ **MANDATORY: End EVERY message with shareable prompt** (Rule 5 - NON-NEGOTIABLE)
- ❌ **DO NOT** communicate outside the ledger
- ❌ **DO NOT** wait for PM to read ledger - CEO will notify PM
- ❌ **DO NOT** send messages without shareable prompt (will be REJECTED)

**Shareable Prompt Requirement**:
Every message to CEO MUST end with this exact format:

```markdown
---
📋 SHAREABLE PROMPT FOR CEO

Copy-paste to PM:

```
[Your message in plain text that CEO can copy-paste to PM without editing]
```
```

**Why**: CEO is notification layer only, not a translator. Shareable prompts eliminate CEO workload.

**Enforcement**: Messages without shareable prompts will be REJECTED. You must resubmit with proper format.

**Reference**: `docs/CIRCULAR_ENFORCEMENT.md:204-208` (Rule 5)

**Examples**: See `docs/CIRCULAR_ENFORCEMENT.md` lines 212-299 for templates

### 2. Ralph Protocol (12 Gates)
Every code submission MUST pass all 12 gates:
1. Build compiles (0 errors)
2. TypeScript (0 type errors)
3. Console (0 errors/warnings)
4. Logic correctness verified
5. No N+1 database queries
6. Performance <2s page load
7. Mobile responsive (375px, 768px, 1024px)
8. Security (no XSS, SQL injection, CSRF)
9. Error handling (graceful failures)
10. Code style (consistent formatting)
11. Tests pass (unit + integration)
12. CI/CD passes

**Verification Command**: `npm run ralph -- verify`

**Failure = Automatic rejection**

### 3. Evidence Requirements
For EVERY task completion, provide:
- Git commit hash
- Screenshots (if UI work)
- Test results
- Build logs
- Performance metrics (if applicable)

### 4. Commit Standards
```bash
# Format
git commit -m "[ENTRY-XXX] Brief description

Detailed explanation of changes.

Evidence:
- Test results: [path/url]
- Screenshots: [path/url]

Closes ENTRY-XXX"
```

### 5. Pre-Commit Checklist
Before EVERY commit:
- [ ] `npm run build` passes
- [ ] `npm run lint` passes
- [ ] `npm run test` passes
- [ ] No console errors/warnings
- [ ] TypeScript errors = 0
- [ ] Commit message references ledger entry

---

## 📊 PHASE 0 TASK LIST

After fixing the lint error, proceed with these tasks in order:

| # | Task | Effort | RICE |
|---|------|--------|------|
| **015** | **Fix Lint Error** | **2h** | **3,600** 🚨 |
| 002 | Install Playwright & Configure | 3h | 4,000 |
| 003 | E2E Tests - Homepage & Search | 2h | 3,600 |
| 004 | E2E Tests - Resource Browsing | 2h | 2,880 |
| 005 | E2E Tests - Authentication | 2h | 2,526 |
| 006 | E2E Tests - Dashboard | 2h | 720 |
| 007 | CI/CD Integration | 1h | 288 |

**Total**: 14 hours across 7 tasks

**Phase 0 Goal**: 90%+ E2E test coverage of critical paths

---

## 🔄 YOUR WORKFLOW

### For Each Task:

1. **Update Ledger - Start**
   ```markdown
   [2026-02-12 10:00] Coder → PM:
   Starting [ENTRY-XXX]: [Task name]
   Estimated completion: [time]
   ```

2. **Do The Work**
   - Follow PRD requirements
   - Meet all acceptance criteria
   - Pass all Ralph Protocol gates
   - Write tests (if code changes)

3. **Self-Validate**
   ```bash
   npm run build         # Must pass
   npm run lint          # Must pass
   npm run test          # Must pass
   npm run ralph -- verify  # Must show 12/12 gates
   ```

4. **Commit Changes**
   ```bash
   git add .
   git commit -m "[ENTRY-XXX] Description"
   # Pre-commit hook will run automatically
   ```

5. **Update Ledger - Complete**
   ```markdown
   [2026-02-12 14:30] Coder → PM:
   Completed [ENTRY-XXX]: [Task name]

   Git Hash: abc123def
   Status: ✅ READY FOR REVIEW

   Evidence:
   - Build: ✅ PASS
   - Lint: ✅ PASS
   - Tests: ✅ PASS (15/15)
   - Ralph Gates: ✅ 12/12

   Next: [ENTRY-XXX] [Next task name]

   ---
   📋 SHAREABLE PROMPT FOR CEO

   Copy-paste to PM:

   ```
   Coder completed ENTRY-XXX: [Task name]

   Status: Ready for review
   Git hash: abc123def

   Evidence:
   - Build, lint, tests: All passing
   - Ralph gates: 12/12

   Check PROJECT_LEDGER.md for full details.
   ```
   ```

6. **Wait for PM Review**
   - CEO will notify you when PM completes review
   - If approved: Proceed to next task
   - If rejected: Fix issues and resubmit

---

## 🚨 COMMON MISTAKES TO AVOID

❌ **DON'T**:
- Skip reading the protocols
- Commit without running all validation commands
- Skip ledger updates
- Work on multiple tasks in parallel
- Assume gates passed without evidence
- Delete tests to make them pass
- Lower code quality standards
- Communicate outside ledger
- Push directly to main without approval

✅ **DO**:
- Read all mandatory documentation first
- Update ledger at start and completion
- Run full validation before committing
- Provide evidence for all claims
- Ask questions in ledger if unclear
- Follow protocols exactly as written
- Complete one task fully before starting next

---

## 🎯 SUCCESS METRICS

**Phase 0 Complete When**:
- [ ] All 7 tasks completed
- [ ] 90%+ E2E test coverage achieved
- [ ] All tests passing (100% pass rate)
- [ ] Ralph Protocol 12/12 gates passed
- [ ] PM approval received for all work
- [ ] No blocking issues remain

**Then**: Proceed to Phase A (Payment System)

---

## 📞 GETTING HELP

**If you're blocked or have questions:**

1. Check documentation first (likely already answered)
2. Post question in ledger under relevant task entry
3. CEO will notify PM
4. PM will respond in ledger
5. CEO will notify you of PM's response

**Example**:
```markdown
[2026-02-12 11:00] Coder → PM:
Question about [ENTRY-XXX]:

I'm seeing [specific issue]. I've tried [approaches].
Should I [option A] or [option B]?

Current status: Blocked, awaiting guidance
```

---

## 🔐 ENVIRONMENT SETUP

**Before starting work:**

1. Clone repository (if not done)
2. Install dependencies: `npm install`
3. Copy environment variables: See `docs/03-implementation/SECRETS_REFERENCE.md`
4. Verify environment: `npm run validate:env`
5. Run build: `npm run build` (should pass)
6. Run lint: `npm run lint` (currently FAILS - your first task to fix!)
7. Run tests: `npm run test` (should pass existing tests)

---

## ✅ READY TO START?

**Your immediate next steps:**

1. ✅ Read all mandatory documentation (~90 min)
2. ✅ Review PROJECT_LEDGER.md entries 001-007, 015
3. ✅ Read Phase 0 PRD completely
4. ✅ Update ledger: "Starting ENTRY-015"
5. ✅ Fix lint error (2 hours)
6. ✅ Update ledger: "Completed ENTRY-015" with evidence
7. ⏳ Wait for PM approval
8. ⏳ Proceed to ENTRY-002 (Playwright setup)

---

## 📋 LEDGER UPDATE TEMPLATE

**Copy this template for your first update:**

```markdown
## 💬 COMMENTS (PM ↔ Coder via CEO)

[2026-02-12 HH:MM] Coder → PM:
Starting Phase 0 work.

Documentation read:
- ✅ PROJECT_LEDGER.md
- ✅ RALPH_PROTOCOL.md
- ✅ PM_PROTOCOL.md
- ✅ QA_PROTOCOL.md
- ✅ STANDING_ORDERS.md
- ✅ WORKFLOW.md
- ✅ PHASE_0_E2E_TESTING_PRD.md
- ✅ COMMUNICATION_PROTOCOL.md

Starting [ENTRY-015]: Fix Ralph Protocol Gates (Lint Error)
Estimated completion: 2 hours
Expected finish time: [HH:MM]

Status: 🚧 IN PROGRESS

---
📋 SHAREABLE PROMPT FOR CEO

Copy-paste to PM:

```
Coder started ENTRY-015: Fix Ralph Protocol Gates (Lint Error)

Estimated completion: 2 hours
Expected finish: [HH:MM]

Status: In progress
```
```

---

## 🎯 FINAL CHECKLIST BEFORE CODING

- [ ] I have read all mandatory documentation
- [ ] I understand the Ralph Protocol (12 gates)
- [ ] I understand the PM Protocol (7 gates)
- [ ] I understand the ledger communication system
- [ ] I know how to update ledger with comments
- [ ] I know the commit message format
- [ ] I know the evidence requirements
- [ ] I have reviewed Phase 0 PRD completely
- [ ] I am ready to fix ENTRY-015 (lint error)

---

**Questions?** Post in PROJECT_LEDGER.md under ENTRY-015.

**Good luck!** 🚀

---

**This prompt expires**: Never (reference document)
**Last Updated**: 2026-02-12
**Maintained By**: CEO
