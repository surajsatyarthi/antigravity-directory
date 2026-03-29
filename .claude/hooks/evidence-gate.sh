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

# Archiving checks (TASK-112)
TASK_DIR="logs/tasks/$TASK_NUM"
SPEC_FILE="$TASK_DIR/spec.md"
OUTCOME_FILE="$TASK_DIR/outcome.md"
BUILD_LOG="temp/${TASK_LOWER}_build.log"
LINT_LOG="temp/${TASK_LOWER}_lint.log"

MISSING=""
[ ! -d "$TASK_DIR" ] && MISSING="$MISSING\n  - Directory: $TASK_DIR"
[ ! -f "$SPEC_FILE" ] && MISSING="$MISSING\n  - Specification: $SPEC_FILE"
[ ! -f "$OUTCOME_FILE" ] && MISSING="$MISSING\n  - Outcome record: $OUTCOME_FILE"
[ ! -f "$BUILD_LOG" ]  && MISSING="$MISSING\n  - Build log: $BUILD_LOG"
[ ! -f "$LINT_LOG" ]   && MISSING="$MISSING\n  - Lint log: $LINT_LOG"

# Screenshot check: only required if spec says SCREENSHOTS: REQUIRED
SPEC_FILE_CHECK="logs/tasks/${TASK_NUM}/spec.md"
SCREENSHOTS_REQUIRED=false
if grep -q "SCREENSHOTS: REQUIRED" "$SPEC_FILE_CHECK" 2>/dev/null; then
  SCREENSHOTS_REQUIRED=true
elif ! grep -q "SCREENSHOTS: NONE" "$SPEC_FILE_CHECK" 2>/dev/null; then
  # No explicit declaration — default to required (safe fallback)
  SCREENSHOTS_REQUIRED=true
fi

if [ "$SCREENSHOTS_REQUIRED" = true ]; then
  SCREENSHOT_COUNT=$(ls temp/${TASK_LOWER}_*.png 2>/dev/null | wc -l)
  if [ "$SCREENSHOT_COUNT" -eq 0 ]; then
    MISSING="$MISSING\n  - Screenshot: temp/${TASK_LOWER}_*.png (spec says SCREENSHOTS: REQUIRED or has no declaration)"
  fi
fi

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
echo "Antigravity must produce these files and archive them before DONE is written." >&2
echo "========================================" >&2
exit 2
