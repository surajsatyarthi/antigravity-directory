---
tags: [ACTIVE, REPORT, ANALYSIS]
phase: All Phases
owner: PM
status: ACTIVE
created: 2026-02-11
last_updated: 2026-02-11
---

# 🎯 RICE SCORING ANALYSIS - MVP Task Prioritization

**Purpose**: Prioritize all 17 ledger entries using RICE methodology
**Created**: 2026-02-11
**Owner**: PM (Claude Code)
**Approved By**: CEO (pending)

---

## 📊 RICE METHODOLOGY

**Formula**: RICE Score = (Reach × Impact × Confidence) / Effort

**Components**:
- **Reach**: How many users/people affected in first quarter (number)
- **Impact**: Per-user/per-business impact (0.25 = minimal, 0.5 = low, 1 = medium, 2 = high, 3 = massive)
- **Confidence**: How confident in estimates (0.5 = 50%, 0.8 = 80%, 1.0 = 100%)
- **Effort**: Person-weeks of work (1 week = 40 hours)

---

## 📈 RICE SCORES - ALL TASKS

| Rank | Entry | Task | RICE | Reach | Impact | Conf | Effort |
|------|-------|------|------|-------|--------|------|--------|
| 1 | 002 | **Install Playwright** | **4,000** | 100 | 3.0 | 1.0 | 0.075w |
| 2 | 003 | **E2E Homepage Tests** | **3,600** | 100 | 2.0 | 0.9 | 0.05w |
| 3 | 015 | **Ralph Protocol Gates** | **3,600** | 100 | 2.0 | 0.9 | 0.05w |
| 4 | 016 | **Prod Deployment Prep** | **3,200** | 100 | 3.0 | 0.8 | 0.075w |
| 5 | 004 | **E2E Browsing Tests** | **2,880** | 80 | 2.0 | 0.9 | 0.05w |
| 6 | 005 | **E2E Auth Tests** | **2,526** | 50 | 3.0 | 0.8 | 0.0475w |
| 7 | 017 | **Production Deployment** | **1,867** | 100 | 3.0 | 0.7 | 0.1125w |
| 8 | 013 | **Homepage UX Refinement** | **1,800** | 100 | 1.0 | 0.9 | 0.05w |
| 9 | 006 | **E2E Dashboard Tests** | **720** | 20 | 2.0 | 0.9 | 0.05w |
| 10 | 014 | **Full E2E Suite Run** | **640** | 100 | 2.0 | 0.8 | 0.25w |
| 11 | 011 | **Claim Button UI** | **576** | 20 | 2.0 | 0.9 | 0.0625w |
| 12 | 012 | **Resource Pricing UI** | **576** | 20 | 2.0 | 0.9 | 0.0625w |
| 13 | 008 | **Payment System** | **420** | 50 | 3.0 | 0.7 | 0.25w |
| 14 | 007 | **CI/CD Integration** | **288** | 20 | 2.0 | 0.9 | 0.125w |
| 15 | 009 | **Resource Claiming** | **256** | 20 | 3.0 | 0.8 | 0.1875w |
| 16 | 010 | **Earnings Dashboard** | **256** | 20 | 2.0 | 0.8 | 0.125w |
| 17 | 001 | **E2E Testing PRD** | **180** | 100 | 2.0 | 0.9 | 1.0w |

---

## 🔍 DETAILED SCORING BREAKDOWN

### 🥇 TOP PRIORITY (RICE > 2,000)

#### 1. [ENTRY-002] Install Playwright & Configure - **RICE: 4,000**
**Why Top Priority**:
- **Blocks everything else** in Phase 0 (E2E testing)
- Quick win (3 hours)
- Enables all subsequent testing
- Foundation for quality assurance

**Scoring**:
- Reach: 100 (enables testing for 100 users worth of features)
- Impact: 3.0 (Massive - enables entire testing infrastructure)
- Confidence: 1.0 (100% - standard Playwright setup)
- Effort: 0.075 weeks (3 hours)
- **RICE**: (100 × 3.0 × 1.0) / 0.075 = **4,000**

**Recommendation**: **START HERE** ⭐

---

#### 2. [ENTRY-003] E2E Tests for Homepage - **RICE: 3,600**
**Why High Priority**:
- Homepage is #1 user entry point (100% of users)
- Prevents regressions on critical path
- Only 1 hour of work
- Immediate ROI

**Scoring**:
- Reach: 100 (all users visit homepage)
- Impact: 2.0 (High - prevents critical bugs)
- Confidence: 0.9 (90% - straightforward tests)
- Effort: 0.05 weeks (2 hours - includes writing + debugging)
- **RICE**: (100 × 2.0 × 0.9) / 0.05 = **3,600**

**Recommendation**: Do immediately after ENTRY-002

---

#### 3. [ENTRY-015] Ralph Protocol Quality Gates - **RICE: 3,600**
**Why Critical**:
- **Blocks production deployment** (cannot deploy without passing gates)
- Fixes lint error (currently blocking commits)
- Ensures build quality
- 2 hours effort

**Scoring**:
- Reach: 100 (affects all users via quality)
- Impact: 2.0 (High - production readiness)
- Confidence: 0.9 (90%)
- Effort: 0.05 weeks (2 hours)
- **RICE**: (100 × 2.0 × 0.9) / 0.05 = **3,600**

**Recommendation**: Fix lint error ASAP (blocking pre-commit)

---

#### 4. [ENTRY-016] Production Deployment Prep - **RICE: 3,200**
**Why Important**:
- **Enables go-live** (no prep = no launch)
- Relatively quick (2 hours)
- High confidence
- Critical for Phase D

**Scoring**:
- Reach: 100 (all users)
- Impact: 3.0 (Massive - enables launch)
- Confidence: 0.8 (80% - some deployment uncertainty)
- Effort: 0.075 weeks (3 hours)
- **RICE**: (100 × 3.0 × 0.8) / 0.075 = **3,200**

**Recommendation**: Do before final deployment

---

#### 5. [ENTRY-004] E2E Browsing Tests - **RICE: 2,880**
**Why High Value**:
- Core user flow (80% browse resources)
- Quick (1 hour)
- Prevents browsing bugs

**Scoring**:
- Reach: 80 (most users browse)
- Impact: 2.0 (High)
- Confidence: 0.9
- Effort: 0.05 weeks (2 hours)
- **RICE**: (80 × 2.0 × 0.9) / 0.05 = **2,880**

---

#### 6. [ENTRY-005] E2E Auth Tests - **RICE: 2,526**
**Why Security Critical**:
- Authentication = security
- Affects all creators (50 users initially)
- Massive impact if broken
- 45 min effort

**Scoring**:
- Reach: 50 (creators need auth)
- Impact: 3.0 (Massive - security critical)
- Confidence: 0.8 (80% - OAuth mocking can be tricky)
- Effort: 0.0475 weeks (1.9 hours - includes OAuth setup)
- **RICE**: (50 × 3.0 × 0.8) / 0.0475 = **2,526**

---

### 🥈 MEDIUM PRIORITY (RICE 500-2,000)

#### 7. [ENTRY-017] Production Deployment - **RICE: 1,867**
**Scoring**:
- Reach: 100, Impact: 3.0, Confidence: 0.7, Effort: 0.1125w (4.5h)
- Lower confidence due to deployment complexity
- **Recommendation**: Do after all testing complete

---

#### 8. [ENTRY-013] Homepage UX Refinement - **RICE: 1,800**
**Scoring**:
- Reach: 100, Impact: 1.0 (Medium - polish), Confidence: 0.9, Effort: 0.05w (2h)
- Nice-to-have, not critical
- **Recommendation**: Do if time permits before launch

---

#### 9. [ENTRY-006] E2E Dashboard Tests - **RICE: 720**
**Scoring**:
- Reach: 20 (creators only), Impact: 2.0, Confidence: 0.9, Effort: 0.05w (2h)
- Lower reach (creator-only feature)
- **Recommendation**: Do after core tests (002-005)

---

#### 10. [ENTRY-014] Full E2E Suite Run - **RICE: 640**
**Scoring**:
- Reach: 100, Impact: 2.0, Confidence: 0.8, Effort: 0.25w (10h)
- Higher effort (finding/fixing bugs takes time)
- **Recommendation**: Do before deployment (Phase C)

---

#### 11-12. [ENTRY-011] Claim Button UI & [ENTRY-012] Pricing UI - **RICE: 576 each**
**Scoring**:
- Reach: 20 (creators), Impact: 2.0, Confidence: 0.9, Effort: 0.0625w (2.5h each)
- Creator-facing features
- **Recommendation**: Phase B - after backend ready

---

### 🥉 LOWER PRIORITY (RICE < 500)

#### 13. [ENTRY-008] Payment System - **RICE: 420**
**Why Lower Despite Importance**:
- **High effort** (10 hours) reduces RICE score
- Complex integration (Razorpay, webhooks, splits)
- Lower confidence (0.7) due to payment edge cases
- Still **critical for MVP** but not first task

**Scoring**:
- Reach: 50 (buyers), Impact: 3.0 (Massive - revenue!), Confidence: 0.7, Effort: 0.25w (10h)
- **Recommendation**: Phase A - after E2E infrastructure ready

---

#### 14. [ENTRY-007] CI/CD Integration - **RICE: 288**
**Why Lower**:
- Only affects dev team initially (Reach: 20)
- Can run tests manually until this is done
- **Recommendation**: Do after core tests exist (Phase 0)

---

#### 15. [ENTRY-009] Resource Claiming - **RICE: 256**
**Scoring**:
- Reach: 20, Impact: 3.0, Confidence: 0.8, Effort: 0.1875w (7.5h)
- **Recommendation**: Phase A - enables marketplace

---

#### 16. [ENTRY-010] Earnings Dashboard - **RICE: 256**
**Scoring**:
- Reach: 20, Impact: 2.0, Confidence: 0.8, Effort: 0.125w (5h)
- **Recommendation**: Phase A - after payments working

---

#### 17. [ENTRY-001] E2E Testing PRD - **RICE: 180**
**Why Lowest**:
- PRD creation (1 week of PM time if done thoroughly)
- Doesn't deliver code, just documentation
- We already have requirements in ledger
- **Recommendation**: Skip detailed PRD, use ledger entries

---

## 🎯 RECOMMENDED EXECUTION ORDER

### Phase 0: Foundation (Week 1)
**Goal**: Get testing infrastructure + fix quality gates

1. **[ENTRY-015] Ralph Protocol Gates** (2h) ⚡ **FIX LINT ERROR FIRST**
   - RICE: 3,600
   - Why: Currently blocking commits with pre-commit hook
   - Deliverable: `npm run lint` passes, pre-commit unblocked

2. **[ENTRY-002] Install Playwright** (3h)
   - RICE: 4,000
   - Why: Enables all testing
   - Deliverable: Playwright configured, 1 sample test passing

3. **[ENTRY-003] E2E Homepage Tests** (2h)
   - RICE: 3,600
   - Why: Highest user impact, quick win
   - Deliverable: Homepage critical path tested

4. **[ENTRY-004] E2E Browsing Tests** (2h)
   - RICE: 2,880
   - Why: Core browsing flow
   - Deliverable: Category filtering, resource cards tested

5. **[ENTRY-005] E2E Auth Tests** (2h)
   - RICE: 2,526
   - Why: Security critical
   - Deliverable: Login/logout flow tested

6. **[ENTRY-006] E2E Dashboard Tests** (2h)
   - RICE: 720
   - Why: Creator workflows
   - Deliverable: Dashboard, settings tested

7. **[ENTRY-007] CI/CD Integration** (1h)
   - RICE: 288
   - Why: Automates testing
   - Deliverable: GitHub Actions running tests

**Total Phase 0**: 14 hours (1.75 days)

---

### Phase A: Marketplace Backend (Week 2-3)
**Goal**: Enable payments + claiming

8. **[ENTRY-008] Payment System** (10h)
   - RICE: 420
   - Why: Revenue generation
   - Deliverable: Razorpay checkout + 80/20 split working

9. **[ENTRY-009] Resource Claiming** (7.5h)
   - RICE: 256
   - Why: Enables marketplace
   - Deliverable: Claim button + OAuth verification

10. **[ENTRY-010] Earnings Dashboard** (5h)
    - RICE: 256
    - Why: Creator transparency
    - Deliverable: Earnings display, sales history

**Total Phase A**: 22.5 hours (2.8 days)

---

### Phase B: Creator UI (Week 3)
**Goal**: Polish creator-facing features

11. **[ENTRY-011] Claim Button UI** (2.5h)
    - RICE: 576
    - Why: UX for claiming
    - Deliverable: Claim modal, success states

12. **[ENTRY-012] Resource Pricing UI** (2.5h)
    - RICE: 576
    - Why: Enable pricing
    - Deliverable: Price editor, buy button

**Total Phase B**: 5 hours (0.6 days)

---

### Phase C: Polish & QA (Week 4)
**Goal**: Production readiness

13. **[ENTRY-013] Homepage UX Refinement** (2h)
    - RICE: 1,800
    - Why: Final polish
    - Deliverable: Mobile responsive, clean console

14. **[ENTRY-014] Full E2E Suite Run** (10h)
    - RICE: 640
    - Why: Catch all bugs
    - Deliverable: 100% tests passing, bugs fixed

**Total Phase C**: 12 hours (1.5 days)

---

### Phase D: Deployment (Week 4)
**Goal**: Go live

15. **[ENTRY-016] Production Deployment Prep** (3h)
    - RICE: 3,200
    - Why: Prepare for launch
    - Deliverable: Env vars, migrations, release tag

16. **[ENTRY-017] Production Deployment** (4.5h)
    - RICE: 1,867
    - Why: Launch!
    - Deliverable: Live site, smoke tests passing

**Total Phase D**: 7.5 hours (0.9 days)

---

## 📊 SUMMARY

**Total MVP Effort**: 61.5 hours (7.7 days at 8h/day)

**By Phase**:
- Phase 0 (E2E Foundation): 14h (23% of total)
- Phase A (Payment/Claiming): 22.5h (37% of total)
- Phase B (Creator UI): 5h (8% of total)
- Phase C (Polish/QA): 12h (19% of total)
- Phase D (Deployment): 7.5h (12% of total)

**Critical Path**:
1. Fix lint error (ENTRY-015) → Unblocks commits
2. Install Playwright (ENTRY-002) → Enables testing
3. Write core tests (ENTRY-003, 004, 005) → Prevents regressions
4. Build payment system (ENTRY-008) → Revenue
5. Build claiming (ENTRY-009) → Marketplace
6. Deploy (ENTRY-016, 017) → Launch

**Can Be Deferred**:
- ENTRY-001 (E2E Testing PRD) - Skip, use ledger
- ENTRY-013 (Homepage UX) - Nice-to-have polish
- ENTRY-007 (CI/CD) - Can run tests manually initially

---

## 🚨 BLOCKING ISSUES

### Issue #1: Lint Error (Highest Priority)
**Current State**: Pre-commit hook blocks all commits
**Impact**: Cannot commit ANY code until fixed
**Solution**: ENTRY-015 (Ralph Protocol Gates) - 2 hours
**Action**: **Assign to Coder immediately**

### Issue #2: No E2E Infrastructure
**Current State**: No Playwright, no tests
**Impact**: Risk of shipping bugs
**Solution**: ENTRY-002 (Install Playwright) - 3 hours
**Action**: Assign after lint fixed

---

## 💡 STRATEGIC INSIGHTS

### Insight #1: Testing Has Highest ROI
- **Top 6 tasks by RICE** are all testing/quality related
- Quick wins (1-3 hours each)
- Massive impact on quality
- **Recommendation**: Frontload Phase 0

### Insight #2: Payment System Is Complex
- Ranked #13 despite being critical for revenue
- High effort (10h) + lower confidence (0.7)
- **Recommendation**: Allocate extra time, expect edge cases

### Insight #3: Creator Features Lower Reach
- ENTRY-009, 010, 011, 012 all score lower
- Why: Only 20 creators initially vs 100 total users
- Still **critical for marketplace** but can be done after core tests

### Insight #4: Quick Wins First
- 6 tasks under 3 hours each
- Combined RICE: 18,806 (61% of total score)
- **Recommendation**: Knock out quick wins in Week 1

---

## ✅ NEXT STEPS

**For CEO**:
1. Review RICE scores - do you agree with reach/impact estimates?
2. Approve recommended execution order (or adjust)
3. Assign first task to Coder: **ENTRY-015 (Fix Lint Error)**

**For Coder (Antigravity)**:
1. Wait for CEO approval
2. Start with ENTRY-015 (Ralph Protocol Gates - 2h)
3. Then ENTRY-002 (Install Playwright - 3h)
4. Then ENTRY-003, 004, 005 (E2E tests - 6h total)

**For PM (Me)**:
1. Update PROJECT_LEDGER.md with RICE scores
2. Create detailed PRDs for Phase A (if CEO requests)
3. Monitor progress, validate at gates

---

## 📝 CHANGE LOG

| Date | Change | By |
|------|--------|-----|
| 2026-02-11 | Created RICE scoring analysis for all 17 MVP tasks | PM |

---

**Approval Status**: PENDING CEO approval
**Next Update**: After CEO approves execution order

---

**Version**: 1.0
**Last Updated**: 2026-02-11
**Maintained By**: PM (Claude Code)
