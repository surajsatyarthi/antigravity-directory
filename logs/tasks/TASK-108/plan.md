# TASK-108: Build Evidence Archive System + PM Cross-Verification Hooks

## Goal
Implement a permanent task evidence archive system to ensure a provable audit trail for all development work.

## Proposed Changes

### Infrastructure
#### [NEW] logs/tasks/ (directory)
Base directory for task-specific evidence archives.

#### [NEW] logs/TASK_INDEX.md
Index file tracking all completed tasks with status, date, commit hash, and archive link.

### PM Enforcement Hooks
#### [MODIFY] .claude/hooks/done-gate.sh
Append a new check before `exit 0` to verify that `logs/tasks/TASK-${TASK_NUM}/` exists if the content contains `✅ DONE`. This ensures archiving happens before the task is marked completed in the ledger.

### Project Configuration
#### [MODIFY] .gemini/GEMINI.md
Add the "EVIDENCE ARCHIVE — YOUR RESPONSIBILITY AFTER EVERY DONE" section to define the coder's archiving workflow.

#### [MODIFY] .agent/RALPH_PROTOCOL.md
Ensure consistency with v22.0 and fix any legacy version references.

## Verification Plan

### Automated Tests
- Run `npm run build` and `npm run lint` to ensure no infrastructure changes broke the build.
- Manually trigger the `done-gate.sh` hook by attempting to write `✅ DONE` to `PROJECT_LEDGER.md` without the archive folder present.

### Manual Verification
- Create the first archive in `logs/tasks/TASK-108/` for this very task.
- Verify `logs/TASK_INDEX.md` is updated correctly.
