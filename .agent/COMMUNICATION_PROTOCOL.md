---
tags: [ACTIVE, GUIDE, PROTOCOL]
phase: All Phases
owner: CEO
status: ACTIVE
created: 2026-02-11
last_updated: 2026-02-11
---

# 💬 COMMUNICATION PROTOCOL
## How CEO, PM, and Coder Communicate During MVP Development

**Version**: 1.0
**Created**: 2026-02-11
**For**: CEO, PM (Claude Code), Coder (Antigravity)

---

## 🎯 CORE PRINCIPLE

**PM and Coder CANNOT communicate directly.**

**CEO is the notification layer** - NOT the data entry layer.

**All communication happens in PROJECT_LEDGER.md** under specific task entries.

---

## 👥 ROLES

### CEO
**Responsibilities**:
- ✅ Notify PM when Coder updates ledger
- ✅ Notify Coder when PM updates ledger
- ✅ Approve major decisions (PRDs, pivots, deployments)

**Does NOT**:
- ❌ Copy-paste messages between PM and Coder
- ❌ Edit ledger content
- ❌ Make technical decisions

**Workload**: ~5 notifications per day (30 seconds each)

---

### PM (Claude Code)
**Responsibilities**:
- ✅ Create PRDs and tasks in ledger
- ✅ Review Coder's work via ledger comments
- ✅ Validate code submissions (gate checks)
- ✅ Approve task completions
- ✅ Add comments directly to ledger

**Does NOT**:
- ❌ Write code (tokens too expensive)
- ❌ Wait for CEO to relay messages

**Communication**: Edits PROJECT_LEDGER.md → Notifies CEO

---

### Coder (Antigravity)
**Responsibilities**:
- ✅ Implement tasks from ledger
- ✅ Update task status in ledger
- ✅ Add git commits and evidence
- ✅ Ask clarifying questions via ledger comments
- ✅ Submit work for QA via ledger

**Does NOT**:
- ❌ Wait for CEO to relay messages
- ❌ Create PRDs (PM does this)

**Communication**: Edits PROJECT_LEDGER.md → Notifies CEO

---

## 🔄 COMMUNICATION WORKFLOW

### Scenario 1: PM Assigns Task to Coder

**Step 1**: PM opens `PROJECT_LEDGER.md`

**Step 2**: PM finds entry (e.g., ENTRY-015 - Fix lint error)

**Step 3**: PM adds comment:
```markdown
## 💬 COMMENTS (PM ↔ Coder via CEO)

[2026-02-11 18:00] PM → Coder:
🚨 CRITICAL PRIORITY - This task blocks all commits.
RICE Score: 3,600 (2nd highest).
Please fix Next.js lint configuration ASAP.
Notify CEO when complete with git commit hash.
```

**Step 4**: PM saves and commits ledger

**Step 5**: PM tells CEO: *"I updated ledger with task assignment for ENTRY-015. Please notify Coder."*

**Step 6**: CEO tells Coder: *"Check PROJECT_LEDGER.md - new task assigned (ENTRY-015)"*

**Step 7**: Coder opens ledger → Reads PM's comment → Starts work

---

### Scenario 2: Coder Completes Task

**Step 1**: Coder finishes work (fixes lint error)

**Step 2**: Coder commits code:
```bash
git commit -m "fix: resolve Next.js lint configuration error"
# Gets git hash: a1b2c3d4
```

**Step 3**: Coder opens `PROJECT_LEDGER.md`

**Step 4**: Coder updates ENTRY-015:
```markdown
**Status**: COMPLETED
**Git Hash**: a1b2c3d4
**Evidence**: docs/evidence/entry-015-lint-fixed.png
```

**Step 5**: Coder adds comment:
```markdown
[2026-02-11 20:30] Coder → PM:
✅ Task COMPLETED.
- Fixed Next.js lint config (updated next.config.js)
- All linting errors resolved
- Pre-commit hook now working
- Git commit: a1b2c3d4
- Evidence: Screenshot attached showing `npm run lint` passing

Ready for QA validation.
```

**Step 6**: Coder saves and commits ledger

**Step 7**: Coder tells CEO: *"I completed ENTRY-015 and updated ledger. Please notify PM for QA review."*

**Step 8**: CEO tells PM: *"Check PROJECT_LEDGER.md - Coder completed ENTRY-015"*

**Step 9**: PM opens ledger → Reads Coder's comment → Validates work

---

### Scenario 3: PM Validates and Approves

**Step 1**: PM reads Coder's completion comment in ENTRY-015

**Step 2**: PM checks evidence:
- Views screenshot: `docs/evidence/entry-015-lint-fixed.png`
- Verifies git commit exists: `a1b2c3d4`
- Runs local validation (if possible)

**Step 3**: PM adds approval comment:
```markdown
[2026-02-11 21:00] PM → Coder:
✅ APPROVED - Task verified and passing all gates.
- Checked git commit a1b2c3d4 ✅
- Viewed evidence screenshot ✅
- Lint configuration fixed ✅
- Pre-commit hook functional ✅

Status: COMPLETED ✅
Next task: ENTRY-002 (Install Playwright, RICE: 4,000)
Check ledger for details.
```

**Step 4**: PM updates ENTRY-015 status to COMPLETED in statistics

**Step 5**: PM saves and commits ledger

**Step 6**: PM tells CEO: *"I approved ENTRY-015 and assigned ENTRY-002. Please notify Coder."*

**Step 7**: CEO tells Coder: *"Check PROJECT_LEDGER.md - ENTRY-015 approved, new task assigned (ENTRY-002)"*

---

### Scenario 4: Coder Needs Clarification

**Step 1**: Coder reads task ENTRY-008 (Payment System)

**Step 2**: Coder has question about requirements

**Step 3**: Coder adds comment to ENTRY-008:
```markdown
[2026-02-12 10:00] Coder → PM:
❓ CLARIFICATION NEEDED:

For the payment system, the PRD mentions "80/20 split" but doesn't specify:
1. Do we split on gross amount or after payment gateway fees?
2. Who pays the Razorpay transaction fee (2.5%)?
   - Option A: Deduct from creator's 80%
   - Option B: Deduct from platform's 20%
   - Option C: Add to total (buyer pays extra)

Please advise before I implement the calculation logic.

BLOCKED until clarification received.
```

**Step 4**: Coder updates task status:
```markdown
**Status**: BLOCKED
```

**Step 5**: Coder saves and commits ledger

**Step 6**: Coder tells CEO: *"I need PM clarification on ENTRY-008 (payment split calculation). Updated ledger. BLOCKED."*

**Step 7**: CEO tells PM: *"Check PROJECT_LEDGER.md - Coder has question on ENTRY-008 (BLOCKED)"*

**Step 8**: PM reads question → Consults CEO if needed → Responds in ledger

---

### Scenario 5: PM Provides Clarification

**Step 1**: PM reads Coder's question in ENTRY-008

**Step 2**: PM consults CEO (if business decision needed)

**Step 3**: PM adds response:
```markdown
[2026-02-12 11:30] PM → Coder:
✅ CLARIFICATION PROVIDED:

**80/20 Split Calculation**:
1. Split happens on NET amount (after Razorpay fees)
   - Example: Sale = ₹100
   - Razorpay fee (2.5%) = ₹2.50
   - Net amount = ₹97.50
   - Creator gets: ₹97.50 × 80% = ₹78
   - Platform gets: ₹97.50 × 20% = ₹19.50

2. Razorpay fees deducted BEFORE split (neither party pays directly)

**Implementation**:
```javascript
const saleAmount = 100;
const razorpayFee = saleAmount * 0.025; // 2.5%
const netAmount = saleAmount - razorpayFee;
const creatorEarnings = netAmount * 0.80;
const platformFee = netAmount * 0.20;
```

Task UNBLOCKED. Proceed with implementation.
CEO approved this approach.
```

**Step 4**: PM updates task status:
```markdown
**Status**: IN_PROGRESS (unblocked)
```

**Step 5**: PM saves and commits ledger

**Step 6**: PM tells CEO: *"I clarified ENTRY-008 payment split logic. Please notify Coder - task unblocked."*

**Step 7**: CEO tells Coder: *"Check PROJECT_LEDGER.md - ENTRY-008 clarification provided, unblocked"*

---

## 📋 COMMENT FORMAT (MANDATORY)

### Template
```
[YYYY-MM-DD HH:MM] [PM/Coder] → [Coder/PM]:
Your message here.
```

### Rules
- ✅ Always include timestamp `[2026-02-11 18:00]`
- ✅ Always include direction `PM → Coder` or `Coder → PM`
- ✅ Use emojis for clarity:
  - 🚨 Critical/urgent
  - ✅ Approved/completed
  - ❌ Rejected/failed
  - ❓ Question/clarification needed
  - 🔴 Blocker
  - 🟡 Warning
  - 🟢 Success
- ✅ Be specific with references (git hashes, file paths, entry numbers)

### Good Examples

✅ **Clear and Specific**:
```
[2026-02-11 18:00] PM → Coder:
🚨 Fix ENTRY-015 first - blocks all commits.
See RICE_SCORING_ANALYSIS.md line 42.
Estimated: 2 hours.
```

✅ **Detailed Completion**:
```
[2026-02-11 20:30] Coder → PM:
✅ ENTRY-015 complete.
Git: a1b2c3d4
Files changed: next.config.js, package.json
Evidence: docs/evidence/lint-pass.png
Ready for QA.
```

❌ **Vague and Unclear**:
```
[2026-02-11 18:00] PM → Coder:
Fix this please.
```

❌ **Missing Context**:
```
[2026-02-11 20:30] Coder → PM:
Done.
```

---

## 📊 CEO NOTIFICATION TEMPLATES & SHAREABLE PROMPTS

### 🚨 MANDATORY SHAREABLE PROMPT FORMAT

**Every message from PM or Coder to CEO MUST end with this section:**

```markdown
---
📋 SHAREABLE PROMPT FOR CEO

Copy-paste to [PM/Coder]:

"[Clear, concise message that CEO copies directly to the other party]"
```

**Why**: CEO should never have to parse long messages. Just copy the text in the box and send it.

**Examples below show the NEW MANDATORY FORMAT.**

---

### When PM Updates Ledger:
```
PM → CEO: "I updated ledger [ENTRY-XXX] with [assignment/approval/clarification].

---
📋 SHAREABLE PROMPT FOR CEO

Copy-paste to Coder:

"Check PROJECT_LEDGER.md - [new task/approval/response] for ENTRY-XXX"
```

### When Coder Updates Ledger:
```
Coder → CEO: "I updated ledger [ENTRY-XXX] - [completed/question/blocked].

---
📋 SHAREABLE PROMPT FOR CEO

Copy-paste to PM:

"Check PROJECT_LEDGER.md - Coder [completed/has question on/blocked by] ENTRY-XXX"
```

### Example Conversations (WITH SHAREABLE PROMPTS)

**Task Assignment**:
```
PM → CEO: "I updated ledger ENTRY-015 with task assignment.

---
📋 SHAREABLE PROMPT FOR CEO

Copy-paste to Coder:

"Check PROJECT_LEDGER.md - new task assigned (ENTRY-015)"
```

**Task Completion**:
```
Coder → CEO: "I updated ledger ENTRY-015 - task completed.

---
📋 SHAREABLE PROMPT FOR CEO

Copy-paste to PM:

"Check PROJECT_LEDGER.md - Coder completed ENTRY-015 (git: e96c995). Ready for review."
```

**Clarification Needed**:
```
Coder → CEO: "I updated ledger ENTRY-008 - need clarification, BLOCKED.

---
📋 SHAREABLE PROMPT FOR CEO

Copy-paste to PM:

"ENTRY-008 BLOCKED - Coder needs clarification on payment split calculation. Check PROJECT_LEDGER.md comments."
```

**Clarification Provided**:
```
PM → CEO: "I updated ledger ENTRY-008 with clarification, unblocked.

---
📋 SHAREABLE PROMPT FOR CEO

Copy-paste to Coder:

"ENTRY-008 UNBLOCKED - Payment split clarification provided in PROJECT_LEDGER.md. You can proceed."
```

**Work Approved**:
```
PM → CEO: "I reviewed and approved ENTRY-015.

---
📋 SHAREABLE PROMPT FOR CEO

Copy-paste to Coder:

"ENTRY-015 APPROVED ✅ - Work passes all gates. Proceed to ENTRY-002 (Install Playwright). Check PROJECT_LEDGER.md for details."
```

**Work Rejected**:
```
PM → CEO: "I reviewed ENTRY-015 - REJECTED due to quality issues.

---
📋 SHAREABLE PROMPT FOR CEO

Copy-paste to Coder:

"ENTRY-015 REJECTED ❌ - Fix build errors (see PROJECT_LEDGER.md comments). Resubmit after fixes."
```

---

## ⏰ RESPONSE TIME EXPECTATIONS

### CEO Notifications
- **Target**: Within 1-2 hours during work hours
- **After Hours**: Next morning
- **Urgent (🚨)**: Within 30 minutes (if possible)

### PM Reviews
- **Task Completion**: Within 4 hours
- **Clarification Questions**: Within 2 hours
- **Urgent Blockers**: Within 1 hour

### Coder Updates
- **Task Status**: Daily (end of work session)
- **Completion Notification**: Immediately after commit
- **Blockers**: Immediately when discovered

---

## 🚨 ESCALATION PROCESS

### When Coder is Blocked (Urgent)

1. **Coder updates ledger** with BLOCKED status
2. **Coder notifies CEO**: "URGENT: ENTRY-XXX blocked, need PM response ASAP"
3. **CEO notifies PM**: "URGENT: Check ledger - Coder blocked on ENTRY-XXX"
4. **PM responds within 1 hour** (or delegates to CEO if business decision)

### When PM Needs Immediate Coder Attention

1. **PM updates ledger** with 🚨 CRITICAL tag
2. **PM notifies CEO**: "CRITICAL: ENTRY-XXX needs immediate attention"
3. **CEO notifies Coder**: "URGENT: Check ledger - critical task ENTRY-XXX"
4. **Coder responds within 1 hour**

### When CEO Needs to Make Decision

1. **PM/Coder adds comment**: "CEO_DECISION_REQUIRED: [question]"
2. **Notifies CEO** via normal channel
3. **CEO reviews and decides**
4. **CEO tells PM** who updates ledger with decision

---

## ✅ BEST PRACTICES

### For PM (Claude Code):
1. ✅ Always reference specific entry numbers (ENTRY-015)
2. ✅ Include RICE scores when prioritizing
3. ✅ Link to supporting docs (RICE_SCORING_ANALYSIS.md)
4. ✅ Be specific about deliverables and acceptance criteria
5. ✅ Validate work thoroughly before approving
6. ✅ Update ledger statistics after each completion
7. ✅ **MANDATORY**: End every CEO message with "📋 SHAREABLE PROMPT FOR CEO" section

### For Coder (Antigravity):
1. ✅ Update status immediately when starting work
2. ✅ Commit early, commit often (get git hashes)
3. ✅ Provide evidence (screenshots, test results)
4. ✅ Ask questions early if requirements unclear
5. ✅ Mark tasks BLOCKED immediately (don't waste time)
6. ✅ Reference specific files/lines in comments
7. ✅ **MANDATORY**: End every CEO message with "📋 SHAREABLE PROMPT FOR CEO" section

### For CEO:
1. ✅ Check messages 2-3 times per day minimum
2. ✅ Use copy-paste templates (save time)
3. ✅ Flag URGENT items immediately
4. ✅ Trust PM and Coder to manage ledger content
5. ✅ Only intervene for business decisions

---

## 📈 METRICS TO TRACK

**CEO Dashboard** (optional, track if desired):

### Communication Metrics:
- Average response time (CEO → notification)
- Average PM review time (comment → approval)
- Number of blockers per week
- Clarification requests per week

### Velocity Metrics:
- Tasks completed per week
- Average task completion time
- Pre-commit hook blocks (should decrease to zero)

### Quality Metrics:
- QA pass rate (target: >90%)
- Rework requests (target: <10%)
- Gate failures (should be zero)

---

## 🔄 CONTINUOUS IMPROVEMENT

**Monthly Review** (CEO + PM):
- Is communication workflow working?
- Are response times acceptable?
- Should we adjust notification frequency?
- Any process bottlenecks?

**Update This Doc** if workflow changes.

---

## 📝 CHANGE LOG

| Date | Change | By |
|------|--------|-----|
| 2026-02-11 | Created communication protocol | PM |

### 🚨 MANDATORY PLANNING HANDOVER FORMAT
**Every planning notification from Coder to CEO MUST include a clear handover block for the PM.**

**Coder MUST NOT proceed to execution until CEO provides explicit approval of the plan.**

**Template**:
```markdown
---
📋 PM HANDOVER: [Task Number] - [Brief Goal]

PLAN PATH: [file:///absolute/path/to/implementation_plan.md]
TASK PATH: [file:///absolute/path/to/task.md]

Copy-paste to PM:
"Review the implementation plan for [Task Number] here: [plan path]. Inform me once APPROVED."
```

---

## 🎯 SUMMARY (TL;DR)

1. **PM and Coder edit PROJECT_LEDGER.md directly** - add comments under task entries
2. **CEO is notified** - relays "check ledger" to other party
3. **CEO does NOT copy-paste** - just notifies
4. **All communication is in ledger** - single source of truth
5. **Timestamped, auditable, traceable** - blockchain-style

**CEO workload**: ~5 notifications/day × 30 seconds = 2.5 minutes/day

**PM/Coder benefit**: Direct communication via ledger, zero message loss, full context preserved

---

**This is the OFFICIAL communication protocol for MVP development.**

**Any deviations require CEO approval and doc update.**

---

**Version**: 1.0
**Last Updated**: 2026-02-11
**Maintained By**: PM (Claude Code)
**Approved By**: CEO (pending)
