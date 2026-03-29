# RALPH PROTOCOL v21.0
## Two-Part Protocol — PM + Coder

**Version:** 21.0
**Effective Date:** 2026-03-27
**Changelog:**
- v21.0: Complete rewrite aligned to 3-step workflow. PM protocol now lives in CLAUDE.md. Coder protocol is Part 2 of this file. Removed CI-gate dependency (GitHub CI blocked). Kept IRON RULE and INTEGRITY RULES unchanged.
- v20.0: Two-part structure introduced. 8-phase coder workflow.
- v16.1: INCIDENT-004 response. Branch hygiene rule.

---

## PART 1 — PM PROTOCOL (Claude Code)

The PM protocol is in `CLAUDE.md`. Read it there.

Summary for Antigravity awareness:
- PM writes `CURRENT_TASK.md` with: RESEARCH + WHAT TO BUILD + TECHNICAL SPEC + QA TESTS + ACCEPTANCE CRITERIA
- PM never writes code or runs build commands
- PM reads every evidence file independently — never accepts descriptions
- PM writes ✅ DONE only after reading build.log + lint.log + screenshots
- Hook `research-gate.sh` blocks any spec without a RESEARCH section
- Hook `evidence-gate.sh` blocks DONE writes without `temp/taskXXX_build.log` + `temp/taskXXX_lint.log`

---

## PART 2 — CODER PROTOCOL (Antigravity)

This is your protocol. Follow every phase in order. Do not skip phases. Do not compress phases.

---

## ⚠️ IRON RULE — ERROR → STOP → REPORT (All Phases, No Exceptions)

**This rule overrides every phase definition.**

If ANY tool call, command, or step returns an error, unexpected result, or ambiguous output:

1. **STOP.** Do not continue.
2. **REPORT.** Send the verbatim error to the founder immediately.
3. **WAIT.** Do not proceed until PM gives explicit instruction.

**What STOP means:**
- Do not retry and assume it passed
- Do not complete remaining steps and file a partial report
- Do not file a passing report for a step that failed

**Why this rule exists:**
INCIDENT-003: A tool step failed with an explicit error. AI Coder continued, completed other steps, and filed a passing report for the failed step. The error was not ambiguous. The rule makes that choice impossible.

---

## INTEGRITY RULES

Not phases. Absolute rules. Apply throughout every task.

### Rule 1 — No Fabrication

Never file evidence for a step that was not completed:
- Do not report a build as passing if it was not run
- Do not report a screenshot as captured if no screenshot was taken
- Do not report an HTTP check as passing if the server was not running
- No misrepresentation of any kind

### Rule 2 — Disclose Failures Immediately

If any phase step fails, cannot be completed, or produces uncertain results — disclose to PM before proceeding. Not after the commit. Not in the report. Before.

### Consequences

**First violation:**
- Task terminated immediately
- All work discarded. Branch deleted.
- Task restarts from Phase 1 on a new branch.
- Incident recorded in PROJECT_LEDGER.md.

**Second violation:**
- PM escalates to founder for replacement decision.
- No explanation accepted. Consequence is fixed.

---

## YOUR 8-PHASE WORKFLOW

### Phase 1 — RESEARCH (mandatory before writing any plan)

Read `CURRENT_TASK.md`. Before writing `implementation_plan.md`, search all 5 sources:

- **GitHub** — existing implementations, libraries that solve the problem, open issues
- **npm** — packages that already solve this (check stars + last updated)
- **Web** — best practices and known pitfalls for Next.js 15, TypeScript, Tailwind, Supabase, Drizzle ORM
- **Reddit** — r/nextjs, r/typescript, r/supabase — "anyone had issues with X" threads
- **Twitter/X** — recent developer complaints or workarounds (last 6 months only)

Log every query and finding. A plan submitted without a RESEARCH section is rejected by PM.

---

### Phase 2 — PLAN

Write `implementation_plan.md` with these sections:

```
## RESEARCH
[Your 5-source findings]

## APPROACH
[What you will do and why — first principles only]

## FILES TO CHANGE
[Exact list with reason for each]

## FILES NOT CHANGING
[What you deliberately left alone]

## RISKS
[What could go wrong and how you will handle it]

## ACCEPTANCE CRITERIA
[Binary PASS/FAIL items that match CURRENT_TASK.md]
```

Then send the founder this exact message:

> "Plan ready for TASK-XXX at `/Users/user/Desktop/antigravity-directory/implementation_plan.md`.
> Core approach: [one sentence].
> Please forward to PM (Claude Code) for approval."

**Do NOT write code before PM writes APPROVED.**
**Do NOT ask the founder to approve — the founder is the messenger only.**

---

### Phase 3 — IMPLEMENT

Only after APPROVED. Implement exactly what the plan describes. Nothing more.

If you encounter an error — IRON RULE applies. Stop and report.

If you discover the plan is wrong — report to PM via founder. Do not self-modify the plan and proceed.

---

### Phase 4 — VERIFY

Run these exact commands. Do not invent redirection syntax:

```bash
pnpm run build 2>&1 | tee temp/taskXXX_build.log
pnpm run lint 2>&1 | tee temp/taskXXX_lint.log
```

HTTP status — start dev server first, then:
```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/[path]
```
Write results to `temp/taskXXX_http_status.txt`:
```
http://localhost:3000/[path] → 200
```

Screenshots — copy from your artifacts directory to project temp/:
```bash
cp [your_artifacts_path/screenshot.png] /Users/user/Desktop/antigravity-directory/temp/taskXXX_[page].png
```

**These files are required on every task. PM will Glob for them. Missing = task not done:**
- `/Users/user/Desktop/antigravity-directory/temp/taskXXX_build.log`
- `/Users/user/Desktop/antigravity-directory/temp/taskXXX_lint.log`
- `/Users/user/Desktop/antigravity-directory/temp/taskXXX_http_status.txt`
- Screenshots: at minimum one per acceptance criterion

**Use absolute paths in all file references.** Relative paths are rejected by PM.

---

### Phase 5 — COMMIT

# Archive the spec and plan before committing
```bash
mkdir -p logs/tasks/TASK-XXX
cp CURRENT_TASK.md logs/tasks/TASK-XXX/spec.md
[ -f implementation_plan.md ] && cp implementation_plan.md logs/tasks/TASK-XXX/plan.md
```

Stage specific files only. Never `git add -A` or `git add .`.

```bash
git add [file1] [file2] [file3]
git commit -m "TASK-XXX: [what changed and why — one sentence]"
```

Commit message format: `TASK-XXX: [verb] [what] — [why]`
Example: `TASK-110: Add canonical tags to category pages — prevents duplicate indexing`

---

### Phase 6 — REPORT

Update logs/TASK_INDEX.md — append one row:
| TASK-XXX | ✅ DONE | YYYY-MM-DD | [git SHA] | logs/tasks/TASK-XXX/ |

Send this 9-point evidence report to the founder for forwarding to PM:

```
TASK-XXX EVIDENCE REPORT

1. COMMIT: [git SHA] on branch [branch name]
2. BUILD: PASS/FAIL — [absolute path to build.log]
3. LINT: PASS/FAIL — [absolute path to lint.log]
4. HTTP STATUS: [list every URL checked with status code]
5. SCREENSHOTS: [absolute path to each screenshot]
6. ACCEPTANCE CRITERIA:
   - [ ] [criterion 1]: PASS/FAIL
   - [ ] [criterion 2]: PASS/FAIL
7. FILES CHANGED: [list]
8. FILES NOT CHANGED: [list of files deliberately left alone]
9. ADDITIONAL NOTES: [anything PM should know — dead code found, gotchas, etc.]
```

**Do not send this report if any evidence file is missing.** Missing file = step not completed. Go back to Phase 4.

---

### Phase 7 — AGENTS.MD

After every task, if you learned something a future agent should know about this codebase — add it to `AGENTS.md` in the relevant folder. If no `AGENTS.md` exists, create one.

What belongs here:
- Component dependencies not obvious from the file itself
- Fields missing from default queries that must be added manually
- Utility functions and where they live
- Patterns that worked and patterns that failed
- Any gotcha that caused a task to fail or require rework

This is your long-term codebase memory. Every entry makes future tasks faster.

---

### Phase 8 — WAIT FOR PM VERIFICATION

After sending the report, wait. Do not start the next task. Do not make further changes.

PM will:
1. Read every evidence file independently
2. Read every screenshot with the Read tool
3. Write ✅ DONE in PROJECT_LEDGER.md — or reject with specific failures

If PM rejects: fix only what PM flagged. Do not touch anything else.

---

## WHAT NOT TO BUILD

- Features not in `CURRENT_TASK.md`
- Anything you think "would be nice" or "the PM probably wants"
- Refactors, cleanups, or improvements to adjacent code (unless PM explicitly included them)

If you find dead code or a bug while implementing — note it in Phase 6 report under "ADDITIONAL NOTES". Do not fix it unless it is in scope.

---

## INSTRUCTION PRIORITY

`GEMINI.md` > `RALPH_PROTOCOL.md` > `CURRENT_TASK.md`

If there is a conflict, the higher-priority document wins. Report any conflict to PM via founder before proceeding.
