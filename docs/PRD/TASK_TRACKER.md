# Task Tracker: Agentic Resource Hub (Operational Phase)

## Overview

**Status**: **Phase 2 Pre-Entry (Architect Audit Complete)**
**Main Goal**: **$12,000-$18,000 MRR by Dec 2026** (Revised up +20% from audit)
**Git HEAD**: `7dbfa22`
**Last Updated**: 2026-01-30
**Total Estimated Effort**: 83 Hours (42 original + 41 new from audit)

---

## 🚨 PRIORITY 0: P0 BLOCKERS (URGENT - 48 Hour Deadline)

_Objective: Resolve critical issues blocking Phase 2 entry. Must complete by Feb 1, 2026 EOD._

| Task                               | Description                                           | Est. Time | Status | Owner       | Ref  |
| :--------------------------------- | :---------------------------------------------------- | :-------- | :----- | :---------- | :--- |
| **0.1. Fix Mobile Menu Route Bug** | Add usePathname() effect to close menu on navigation | 30 min    | [ ]    | Antigravity | P0-1 |
| **0.2. Blueprint Documentation**   | Create phase_2_execution_report_mobile_ux.md         | 2 hrs     | [ ]    | Antigravity | P0-2 |
| **0.3. Production Verification**   | Test + screenshot mobile drawer on 3 devices         | 3 hrs     | [ ]    | Antigravity | P0-3 |
| **0.4. Security Audit Planning**   | Create SECURITY-CHECKLIST [#002] for 6 files         | 30 min    | [ ]    | Antigravity | P1-3 |

**Blocker Total**: 6 hours
**Deadline**: 2026-02-01 EOD
**Approval Gate**: All tasks must be completed before Phase 2 entry

---

## 🚀 PRIORITY 1: The Community Loop (High ROI)

_Objective: Build the "Cursor-style" content engine to trigger organic growth._

| Task                            | Description                                | Est. Time | Status | Ref  |
| :------------------------------ | :----------------------------------------- | :-------- | :----- | :--- |
| **1.1. User Submission Form**   | No-friction frontend + Supabase ingestion. | 3 hrs     | [x]    | Done |
| **1.2. Interactive Post Board** | Real-time community discussion/showcase.   | 6 hrs     | [ ]    | -    |
| **1.3. Founding Badge System**  | Automated "Founding Member" logic/UI.      | 2 hrs     | [ ]    | -    |

---

## 🏭 PRIORITY 2: Growth Factory (pSEO)

_Objective: Scale traffic from 1k to 50k uniques via programmatic tools._

| Task                             | Description                               | Est. Time | Status | Ref  |
| :------------------------------- | :---------------------------------------- | :-------- | :----- | :--- |
| **2.1. /tools Shell**            | Dynamic routing for keyword-driven tools. | 4 hrs     | [ ]    | -    |
| **2.2. Banu Script**             | Automated Keyword -> Tool generation.     | 5 hrs     | [ ]    | -    |
| **2.3. Initial Tool Deployment** | Launching the first 10 high-volume tools. | 3 hrs     | [ ]    | -    |

---

## 💰 PRIORITY 3: Revenue Influx (Job Board)

_Objective: Reach the first $1,000 MRR milestone._

| Task                          | Description                              | Est. Time | Status | Ref  |
| :---------------------------- | :--------------------------------------- | :-------- | :----- | :--- |
| **3.1. Job Board Schema**     | Advanced DB fields + Admin seeding view. | 4 hrs     | [ ]    | -    |
| **3.2. Manual Ghost Seeding** | 5 high-profile Roles (OrbitAI style).    | 2 hrs     | [ ]    | -    |
| **3.3. Stripe Integration**   | Standard/Featured checkout flows.        | 8 hrs     | [ ]    | -    |

---

## 🛡️ PRIORITY 4: Strategic Polish

_Objective: Professional-grade analytics and trust signals._

| Task                        | Description                             | Est. Time | Status | Ref  |
| :-------------------------- | :-------------------------------------- | :-------- | :----- | :--- |
| **4.1. Dub.co Integration** | Real-time click transparency dashboard. | 2 hrs     | [ ]    | -    |
| **4.2. Grid Ad System**     | Sidebar/Homepage banner logic.          | 3 hrs     | [ ]    | -    |

---

## 🎯 PRIORITY 5: Comparison Engine Expansion (NEW FROM AUDIT)

_Objective: Add 5 high-intent comparison pairs to steal competitor traffic._
_Expected Impact: +1,400-2,400 uniques/mo, +$1,095-$2,191/mo revenue_

| Task                                          | Description                                            | Est. Time | Status | Owner       | Traffic/Mo | Revenue/Mo |
| :-------------------------------------------- | :----------------------------------------------------- | :-------- | :----- | :---------- | :--------- | :--------- |
| **5.1. Claude vs ChatGPT (Agentic)**          | Model comparison for MCP development                   | 5 hrs     | [ ]    | Antigravity | 500-800    | $299-$598  |
| **5.2. GitHub Copilot vs Cursor**             | IDE comparison (steal from Cursor.directory)           | 4 hrs     | [ ]    | Antigravity | 300-500    | $299-$498  |
| **5.3. Gemini 3 vs Claude 3.5 for Coding**    | Context window + reasoning depth comparison            | 6 hrs     | [ ]    | Antigravity | 200-400    | $199-$398  |
| **5.4. Vercel vs Netlify for AI Apps**        | Deployment platform for LLM streaming                  | 4 hrs     | [ ]    | Antigravity | 250-400    | $199-$398  |
| **5.5. Supabase vs PlanetScale (Vector)**     | Database comparison for RAG/embeddings                 | 5 hrs     | [ ]    | Antigravity | 150-300    | $99-$299   |

**Total Priority 5**: 24 hours
**Combined Traffic**: 1,400-2,400 uniques/mo
**Combined Revenue**: $1,095-$2,191/mo

---

## 🔒 PRIORITY 6: Technical Debt & Security (NEW FROM AUDIT)

_Objective: Resolve P1 technical risks and harden security._

| Task                                   | Description                                        | Est. Time | Status | Owner       | Ref  |
| :------------------------------------- | :------------------------------------------------- | :-------- | :----- | :---------- | :--- |
| **6.1. Username Stale Prop Fix**       | Implement SWR for username revalidation            | 4 hrs     | [ ]    | Antigravity | P1-1 |
| **6.2. SearchInput Hydration Fix**     | Match fallback skeleton to prevent CLS             | 3 hrs     | [ ]    | Antigravity | P1-2 |
| **6.3. Security Audit Execution**      | Audit 6 files + implement dompurify                | 6 hrs     | [ ]    | Antigravity | P1-3 |
| **6.4. Live Intelligence Badge**       | GitHub Stars auto-sync + "Last Updated" timestamp  | 8 hrs     | [ ]    | Antigravity | P1-5 |

**Total Priority 6**: 21 hours

---

## 📊 SPRINT PLANNING

### Sprint 0: P0 Blockers (Feb 1, 2026)
**Duration**: 1 day
**Tasks**: 0.1, 0.2, 0.3, 0.4
**Total Effort**: 6 hours
**Goal**: Achieve Phase 2 entry approval

### Sprint 1: Quick Wins (Phase 2 Week 1)
**Duration**: 5 days
**Tasks**: 5.1, 5.2, 6.4
**Total Effort**: 17 hours
**Goal**: Add 2 comparisons + Live Intelligence badge

### Sprint 2: Revenue Foundation (Phase 2 Week 2)
**Duration**: 5 days
**Tasks**: 5.3, 5.4, 5.5, 6.3
**Total Effort**: 21 hours
**Goal**: Complete comparison suite + security hardening

### Sprint 3: Community & Tools (Phase 2 Week 3-4)
**Duration**: 10 days
**Tasks**: 1.2, 1.3, 2.1, 2.2, 2.3, 6.1, 6.2
**Total Effort**: 30 hours
**Goal**: Launch interactive board + pSEO tools

### Sprint 4: Monetization (Phase 2 Month 2)
**Duration**: 10 days
**Tasks**: 3.1, 3.2, 3.3, 4.1, 4.2
**Total Effort**: 19 hours
**Goal**: Enable revenue streams (job board + ads)

---

## 🎯 SUCCESS METRICS

### Phase 2 Entry Criteria (Must Complete Sprint 0)
- [x] Build passes without errors
- [ ] All P0 blockers resolved (Tasks 0.1-0.4)
- [ ] ISSUES_LOG.md updated with audit findings
- [ ] Production verification complete
- [ ] Security audit plan created

### Month 1 Targets
- Traffic: 1,000+ uniques (baseline)
- Comparisons: 9 total (7 existing + 2 new)
- Revenue: $0 (validation phase)

### Month 2 Targets
- Traffic: 3,000+ uniques (+200% from comparisons)
- Comparisons: 12 total (all 5 new ones live)
- Revenue: $500-$1,000 (first sponsors)

### Month 3 Targets
- Traffic: 50,000+ uniques (pSEO tools live)
- pSEO Tools: 10+ high-volume keyword pages
- Revenue: $3,000-$5,000 (job board + sponsors)

### Month 4 Targets (Revenue Activation)
- Traffic: 75,000+ uniques
- Revenue: **$12,000-$18,000 MRR** (revised goal)
- Job Board: 20+ listings
- Sponsors: 5-8 partners

---

## 📋 TASK DEPENDENCIES

```
P0 Blockers (Sprint 0)
  ↓
Comparison Engine (Sprint 1-2) ← Live Intelligence Badge
  ↓
Community Loop (Sprint 3) ← Interactive Board
  ↓
pSEO Tools (Sprint 3) ← Traffic Multiplier
  ↓
Monetization (Sprint 4) ← Revenue Streams
```

---

## 🔍 MONITORING & GOVERNANCE

**Task Review Frequency**: Daily during Sprint 0, Weekly during Phase 2
**Status Report Cadence**: End of each sprint
**Blocker Escalation**: Immediate (within 2 hours)
**Ralph Protocol Compliance**: Gate validation before each merge

**Responsible Agent**: Antigravity
**Oversight**: Ralph Protocol (automated gates)
**Audit Schedule**:
- Phase 2 Week 2 (post-comparison launch)
- Phase 2 Month 1 (pre-revenue activation)
- Phase 2 Month 3 (pre-scaling)

---

## 📚 REFERENCE DOCUMENTS

- [ARCHITECT_AUDIT_2026_01_30.md](../reports/ARCHITECT_AUDIT_2026_01_30.md) - Full audit report
- [ISSUES_LOG.md](../../ISSUES_LOG.md) - Issue tracking (SSOT)
- [MASTER_PLAN.md](MASTER_PLAN.md) - Strategic roadmap
- [MASTER_ISSUE_LOG.md](MASTER_ISSUE_LOG.md) - Historical issues
- [RALPH_PROTOCOL_PLAYBOOK.md](../../RALPH_PROTOCOL_PLAYBOOK.md) - Quality gates

---

> [!IMPORTANT]
> **Single Source of Truth (SSOT) Policy**
> - **Tasks**: THIS FILE (TASK_TRACKER.md)
> - **Issues**: ISSUES_LOG.md (root directory)
> - **Strategy**: MASTER_PLAN.md
> - **Audit Reports**: docs/reports/
>
> All other tracking documents are DEPRECATED. If conflict exists, this hierarchy prevails.

---

> [!NOTE]
> All tasks follow the **V17.0 Master Plan** (Smart Scraping for Q1, Independent Hub branding).
> Estimates assume Antigravity autonomous execution with Ralph Protocol gates.
> Updated 2026-01-30 to reflect Senior Architect audit findings.
