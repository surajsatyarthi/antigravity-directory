# CURRENT TASK — TASK-112: Fix the Archive System — Permanent Task Records

## RESEARCH
- Web: Query: "product development cycle FAANG permanent PRD archive" → URL: https://www.linkedin.com/pulse/how-google-writes-product-requirement-documents-prds → Finding: "PRDs are never deleted. They are the permanent source of truth for why a feature was built."
- Reddit: Query: "JIRA ticket system what gets archived when task closes" → URL: https://community.atlassian.com/t5/Jira-questions/What-happens-to-tickets-when-closed/qaq-p/178432 → Finding: "Closing a ticket archives it permanently — description, comments, attachments, linked PRs all remain."
- Internal audit: Current state of logs/tasks/ — TASK-094 has outcome.md only (no spec). TASK-095 has nothing. TASK_INDEX.md is 10 tasks out of date. CURRENT_TASK.md is wiped after every task. Screenshots never required by gate.

---

## WHAT TO BUILD

The archive system built in TASK-108 is incomplete. It captures what Antigravity did (outcome.md) but destroys the brief (CURRENT_TASK.md overwritten), never requires screenshots, never requires spec archiving, and keeps an index that is never updated. A completed task should leave a permanent, self-contained record: spec + plan + outcome + evidence paths + index entry. Any developer or agent reading it one year from now must be able to reconstruct exactly what was built, why, and what proof exists.

**Three mechanical changes. No optional steps.**

---

## TECHNICAL SPEC

### Change 1 — evidence-gate.sh: add screenshot + spec + outcome checks

File: `.claude/hooks/evidence-gate.sh`

Current checks (keep these):
- `temp/taskXXX_build.log` exists
- `temp/taskXXX_lint.log` exists

Add these three checks:

```bash
SCREENSHOT=$(ls temp/${TASK_LOWER}_*.png 2>/dev/null | head -1)
OUTCOME="logs/tasks/${TASK_NUM}/outcome.md"
SPEC="logs/tasks/${TASK_NUM}/spec.md"

[ -z "$SCREENSHOT" ] && MISSING="$MISSING\n  - temp/${TASK_LOWER}_*.png (at least one screenshot required)"
[ ! -f "$OUTCOME" ]  && MISSING="$MISSING\n  - $OUTCOME"
[ ! -f "$SPEC" ]     && MISSING="$MISSING\n  - $SPEC"
```

The gate must now block DONE writes unless ALL FIVE files exist:
1. `temp/taskXXX_build.log`
2. `temp/taskXXX_lint.log`
3. At least one `temp/taskXXX_*.png`
4. `logs/tasks/TASK-XXX/outcome.md`
5. `logs/tasks/TASK-XXX/spec.md`

---

### Change 2 — Ralph Protocol Phase 5: archive spec + plan before commit

File: `.agent/RALPH_PROTOCOL.md`

In Phase 5 (COMMIT), add these two steps BEFORE the git commit:

```bash
# Archive the spec
mkdir -p logs/tasks/TASK-XXX
cp CURRENT_TASK.md logs/tasks/TASK-XXX/spec.md

# Archive the plan (if it exists)
[ -f implementation_plan.md ] && cp implementation_plan.md logs/tasks/TASK-XXX/plan.md
```

These files must be staged and included in the task commit:
```bash
git add logs/tasks/TASK-XXX/spec.md logs/tasks/TASK-XXX/plan.md logs/tasks/TASK-XXX/outcome.md
```

The commit must include all three archive files. Never commit code changes without the archive.

---

### Change 3 — Ralph Protocol Phase 6: update TASK_INDEX.md

File: `.agent/RALPH_PROTOCOL.md`

In Phase 6 (REPORT), add as mandatory step before sending the report:

Update `logs/TASK_INDEX.md` — append one row:

```
| TASK-XXX | ✅ DONE | YYYY-MM-DD | [git SHA] | logs/tasks/TASK-XXX/ |
```

Stage and include in the same commit as the archive files.

---

### Change 4 — GEMINI.md: reflect the updated Phase 5 + Phase 6 summary

File: `.gemini/GEMINI.md`

In the Phase 5 summary block, add:
```
Before committing: cp CURRENT_TASK.md logs/tasks/TASK-XXX/spec.md
                   cp implementation_plan.md logs/tasks/TASK-XXX/plan.md (if exists)
```

In the Phase 6 summary block, add:
```
Before sending report: update logs/TASK_INDEX.md with one new row.
```

---

### Change 5 — Retroactive fix: TASK-094, TASK-111, TASK-095

For TASK-094 and TASK-111: the specs exist in git history. Recover them:

```bash
# TASK-094 spec — last written before TASK-111 was started
git log --oneline --all -- CURRENT_TASK.md
# Find the commit just before TASK-111 was written, then:
git show [commit_sha]:CURRENT_TASK.md > logs/tasks/TASK-094/spec.md

# TASK-111 spec — last written before TASK-095 was started
git show [commit_sha]:CURRENT_TASK.md > logs/tasks/TASK-111/spec.md
```

For TASK-095: spec is still live in CURRENT_TASK.md right now.
```bash
cp CURRENT_TASK.md logs/tasks/TASK-095/spec.md
```

Also create `logs/tasks/TASK-095/outcome.md` (TASK-095 is not fully archived yet).

Also copy the TASK-095 screenshot once Antigravity provides it.

Update `logs/TASK_INDEX.md` with rows for TASK-094, TASK-095, TASK-111 (retroactive).

---

## QA — PLAYWRIGHT TESTS

No UI changes. Verification is mechanical:

- Test 1: After task completes, run `ls logs/tasks/TASK-112/` — expect: `spec.md`, `plan.md`, `outcome.md` all present
- Test 2: Attempt to write DONE to PROJECT_LEDGER.md without a screenshot in temp/ — expect: gate blocks with error message listing missing `temp/task112_*.png`
- Test 3: Attempt to write DONE without `logs/tasks/TASK-112/outcome.md` — expect: gate blocks
- Test 4: Attempt to write DONE without `logs/tasks/TASK-112/spec.md` — expect: gate blocks
- Test 5: Check `logs/TASK_INDEX.md` — expect: row for TASK-112 present

---

## RETROGRADE CHECK

- **Who is this for?** Every future developer, agent, or PM who needs to understand why a decision was made. Also the founder, who should never have to ask "why was this built" — the answer must be in the archive.
- **Adjacent dead code:** None.
- **Antigravity action:** None beyond this task.

---

## SCREENSHOTS
NONE — no UI changes in this task

## ACCEPTANCE CRITERIA

- [ ] `evidence-gate.sh` blocks DONE writes without at least one `temp/taskXXX_*.png` — verified by: attempting a DONE write without a screenshot and confirming the gate fires
- [ ] `evidence-gate.sh` blocks DONE writes without `logs/tasks/TASK-XXX/outcome.md` — verified by: attempting a DONE write without outcome.md and confirming the gate fires
- [ ] `evidence-gate.sh` blocks DONE writes without `logs/tasks/TASK-XXX/spec.md` — verified by: attempting a DONE write without spec.md and confirming the gate fires
- [ ] Ralph Protocol Phase 5 includes `cp CURRENT_TASK.md logs/tasks/TASK-XXX/spec.md` — verified by: reading `.agent/RALPH_PROTOCOL.md`
- [ ] Ralph Protocol Phase 6 includes `logs/TASK_INDEX.md` update — verified by: reading `.agent/RALPH_PROTOCOL.md`
- [ ] GEMINI.md Phase 5 + Phase 6 summaries updated — verified by: reading `.gemini/GEMINI.md`
- [ ] `logs/tasks/TASK-094/spec.md` exists — verified by: reading the file
- [ ] `logs/tasks/TASK-111/spec.md` exists — verified by: reading the file
- [ ] `logs/tasks/TASK-095/spec.md` exists — verified by: reading the file
- [ ] `logs/tasks/TASK-095/outcome.md` exists — verified by: reading the file
- [ ] `logs/TASK_INDEX.md` has rows for TASK-094, TASK-095, TASK-111, TASK-112 — verified by: reading the file
- [ ] Build passes — verified by: `temp/task112_build.log`
- [ ] Lint passes — verified by: `temp/task112_lint.log`

---

## QUESTIONS FROM ANTIGRAVITY

_Antigravity writes questions here_

## PM ANSWERS

_PM answers here_
