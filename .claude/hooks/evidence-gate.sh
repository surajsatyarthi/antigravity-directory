#!/bin/bash
# evidence-gate.sh — blocks DONE writes without build + lint evidence
# Fires on: PreToolUse Write + Edit to PROJECT_LEDGER.md
# Exit 2 = BLOCK. Exit 0 = allow.

INPUT=$(cat)
FILE=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')
NEW_CONTENT=$(echo "$INPUT" | jq -r '.tool_input.new_string // .tool_input.content // empty')

# Only gate writes to PROJECT_LEDGER.md
if [[ "$FILE" != *"PROJECT_LEDGER.md" ]]; then
  exit 0
fi

# Only block when writing DONE
if ! echo "$NEW_CONTENT" | grep -q "✅ DONE"; then
  exit 0
fi

# Extract task number (e.g. TASK-110)
TASK_NUM=$(echo "$NEW_CONTENT" | grep -o "TASK-[0-9]*" | head -1)
if [ -z "$TASK_NUM" ]; then
  exit 0
fi

# Convert to temp file format: TASK-110 → task110
TASK_LOWER=$(echo "$TASK_NUM" | tr '[:upper:]' '[:lower:]' | tr -d '-')

BUILD_LOG="temp/${TASK_LOWER}_build.log"
LINT_LOG="temp/${TASK_LOWER}_lint.log"

MISSING=""
[ ! -f "$BUILD_LOG" ] && MISSING="$MISSING\n  - $BUILD_LOG"
[ ! -f "$LINT_LOG" ]  && MISSING="$MISSING\n  - $LINT_LOG"

if [ -z "$MISSING" ]; then
  exit 0
fi

# BLOCKED
echo "========================================" >&2
echo "BLOCKED: Missing evidence for $TASK_NUM." >&2
echo "========================================" >&2
echo "" >&2
echo "Cannot write DONE without:" >&2
echo -e "$MISSING" >&2
echo "" >&2
echo "Antigravity must produce these files before DONE is written." >&2
echo "========================================" >&2
exit 2
