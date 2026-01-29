# 🦅 THE RALPH PROTOCOL PLAYBOOK (v3.3)
## The Supreme Constitution for AI-Driven Engineering Excellence

> [!IMPORTANT]
> **"Nullius in verba"** — Take nobody's word for it. 
> This playbook is the **sole authoritative source** for all engineering, security, and operational protocols. Any AI agent interacting with this project MUST follow these gates sequentially and provide physical proof for every claim.

---

## 📜 I. THE 10 COMMANDMENTS (Non-Negotiable Laws)
*Violation of any law = **P0 Protocol Breach***

1.  **Limit Law**: All \`SELECT\` queries must include a \`LIMIT\` clause.
2.  **Security Law**: Never use \`dangerouslySetInnerHTML\` without \`dompurify\`.
3.  **JSON-LD Law**: Always use the \`safeJsonLd()\` utility.
4.  **Revenue Law**: Every Phase 3 execution must run \`revenue-integrity-check.ts\`.
5.  **Sequential Law**: All 10 Gates must be followed in strict chronological order.
6.  **Proof Law**: Evidence = Raw Terminal Logs + Screenshots + Git HEAD hash.
7.  **Air-Gap Law**: Write operations only via \`lib/sanity.server.ts\`.
8.  **Context Law**: All logs/reports must anchor to the current Git HEAD.
9.  **Semantic Law**: Every commit must contain \`SECURITY-CHECKLIST [#ID]:\`.
10. **Integrity Law**: All reports must pass the \`validate-phase-report.sh\` script.

---

## 🏁 II. THE 10 QUALITY GATES (The Physical Lifecycle)

### PHASE 1: Assessment
- **Gate 1 – Physical Audit**: \`grep\`, \`view_file\`, and \`curl\`. Never assume; always verify the current state of code and production.
- **Gate 2 – Logic Mapping**: Identify all consumers/dependencies of the code being changed. Document minimum 3 external web searches for documentation or similar issues.

### PHASE 2: Planning
- **Gate 3 – Blueprint**: Create \`implementation_plan.md\` and obtain EXPLICIT user approval before writing a single line of code.

### PHASE 3: Execution
- **Gate 4 – Implementation**: Execute approved changes. No scope creep.
- **Gate 6.5 – Code Verification**: Run \`git diff --cached --quiet\`. If there are no staged changes but the message claims them, the commit is BLOCKED.
- **Gate 7 – TDD Proof**: Run Vitest and Playwright tests. Local \`pnpm build\` is mandatory.
- **Gate 8 – Sanity Schema Gate**: \`sanity schema validate\` → \`sanity schema deploy\`.
- **Gate 9 – UI Proof**: Verify in Sanity Studio + capture screenshots.

### PHASE 4: Verification
- **Gate 9.5 – Production Verification**: 
    1. Wait for Vercel (min 90s).
    2. Check Vercel status = \`READY\`.
    3. Physical verification on the live URL.
    4. **MANDATORY**: Screenshot with timestamp and URL visible.
- **Gate 10 – Watchtower**: 24-hour post-deployment monitoring. Check production at Hour 0, 6, 12, and 24.

---

## 🔍 III. GIT FORENSICS & STATE VALIDATION
*Prevent "disappearing code" through rigorous state checking.*

### Phase 0: State Validation (Run BEFORE Debugging)
\`\`\`bash
# Check for orphaned work
git stash list
# Search stashes by keyword
git stash list | grep -i "<feature-name>|<issue-number>"
# Check unmerged feature branches
git branch -a | grep feature/
# Include ALL refs in history search
git log --all --oneline --since="30 days ago"
\`\`\`

---

## 🛠️ IV. MANDATORY WORKFLOW FOR AI AGENTS

1.  **START** by running \`.agent/workflows/validate-ralph-gates.sh <ISSUE_NUM>\`.
2.  **IF GATES FAIL**: You are **NOT AUTHORIZED** to edit code. Complete the missing reports first.
3.  **REPORTS**: Every issue requires:
    - \`docs/reports/phase_1_assessment_report_<ISSUE_NUM>.md\` (Audit + Research)
    - \`docs/reports/phase_2_execution_report_<ISSUE_NUM>.md\` (Plan + Approval)
    - \`docs/reports/production_verification_<ISSUE_NUM>.md\` (Proof of Launch)

---

## ⚠️ V. COGNITIVE FAILURE MODES (ANTI-PATTERNS)

| Failure Mode | Description | Prevention |
| :--- | :--- | :--- |
| **Assumption Failure** | Assuming "working code" was deployed. | Verify deployment history vs. local branches. |
| **Search Strategy Failure** | Ignoring stashes/branches. | Run Phase 0 (Audit) first. |
| **Communication Failure** | Not asking clarifying questions. | Use Timeline Reconstruction Questions. |

---
**Signed**: Systemic Quality Agent
**Status**: ACTIVE & ENFORCED
