#!/bin/bash
# done-gate.sh — Protocol 1 (no duplicate tasks) + Protocol 3 (evidence before DONE)
# Replaces and merges: require-screenshots-before-done.sh + require-http-status-log.sh
# Exit 2 = BLOCK. Exit 0 = allow.

INPUT=$(cat)
FILE=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')
NEW_CONTENT=$(echo "$INPUT" | jq -r '.tool_input.new_string // .tool_input.content // empty')

# Only applies to PROJECT_LEDGER.md
if [[ "$FILE" != *"PROJECT_LEDGER.md" ]]; then
  exit 0
fi

# ============================================================
# PROTOCOL 1 — NO DUPLICATE TASKS
# Skip if this write is marking a task DONE (updating existing row)
# ============================================================
if ! echo "$NEW_CONTENT" | grep -q "✅ DONE"; then
  NEW_TASK_IDS=$(echo "$NEW_CONTENT" | grep -oE 'TASK-[0-9]+' | sort -u)
  for TASK_ID in $NEW_TASK_IDS; do
    if grep -qF "| $TASK_ID |" PROJECT_LEDGER.md 2>/dev/null; then
      echo "========================================" >&2
      echo "BLOCKED: $TASK_ID already exists in PROJECT_LEDGER.md." >&2
      echo "========================================" >&2
      echo "" >&2
      echo "Protocol 1 (INCIDENT-007 prevention):" >&2
      echo "  Run: grep '$TASK_ID' PROJECT_LEDGER.md" >&2
      echo "  If updating an existing task, ensure your edit includes the existing content." >&2
      echo "  If adding a new task, choose a new unused ID." >&2
      echo "========================================" >&2
      exit 2
    fi
  done
fi

# ============================================================
# PROTOCOL 3 — EVIDENCE REQUIRED BEFORE ✅ DONE
# ============================================================
if ! echo "$NEW_CONTENT" | grep -q "✅ DONE"; then
  exit 0
fi

BLOCKED=0
MISSING_FILES=""
ERRORS=""

# CHECK 1: PNG screenshots referenced in CURRENT_TASK.md must exist
SCREENSHOTS=$(grep -oE 'temp/task[0-9]+_[a-zA-Z0-9_]+\.png' CURRENT_TASK.md 2>/dev/null | sort -u)
for f in $SCREENSHOTS; do
  if [ ! -f "$f" ]; then
    MISSING_FILES="$MISSING_FILES\n  MISSING PNG: $f"
    BLOCKED=1
  fi
done

# CHECK 2: .webm recordings referenced in CURRENT_TASK.md must exist
RECORDINGS=$(grep -oE 'temp/task[0-9]+_[a-zA-Z0-9_]+\.webm' CURRENT_TASK.md 2>/dev/null | sort -u)
for f in $RECORDINGS; do
  if [ ! -f "$f" ]; then
    MISSING_FILES="$MISSING_FILES\n  MISSING RECORDING: $f"
    BLOCKED=1
  fi
done

# CHECK 3: HTTP status logs referenced in CURRENT_TASK.md must exist and be 404-free
HTTP_LOGS=$(grep -oE 'temp/task[0-9]+_http_status\.txt' CURRENT_TASK.md 2>/dev/null | sort -u)
for f in $HTTP_LOGS; do
  if [ ! -f "$f" ]; then
    MISSING_FILES="$MISSING_FILES\n  MISSING HTTP LOG: $f"
    BLOCKED=1
  else
    FOUROFOUR=$(grep "404" "$f" 2>/dev/null)
    if [ -n "$FOUROFOUR" ]; then
      ERRORS="$ERRORS\n  404 FOUND in $f:\n$FOUROFOUR"
      BLOCKED=1
    fi
  fi
done

# CHECK 4: PM SCREENSHOT READ section must exist in CURRENT_TASK.md
if ! grep -q "## PM SCREENSHOT READ" CURRENT_TASK.md 2>/dev/null; then
  ERRORS="$ERRORS\n  MISSING: '## PM SCREENSHOT READ' section not in CURRENT_TASK.md"
  ERRORS="$ERRORS\n  PM must Read every screenshot with the Read tool, describe each one,"
  ERRORS="$ERRORS\n  then write this section before marking DONE."
  BLOCKED=1
fi

# CHECK 5 + 6 + 7: Build log, lint log, HTTP status log (task-specific)
TASK_NUM=$(grep -oE 'TASK-[0-9]+' CURRENT_TASK.md 2>/dev/null | head -1 | grep -oE '[0-9]+')
if [ -n "$TASK_NUM" ]; then
  BUILD_LOG="temp/task${TASK_NUM}_build.log"
  if [ ! -f "$BUILD_LOG" ]; then
    MISSING_FILES="$MISSING_FILES\n  MISSING BUILD LOG: $BUILD_LOG"
    MISSING_FILES="$MISSING_FILES\n  (Antigravity: npm run build 2>&1 | tee $BUILD_LOG)"
    BLOCKED=1
  fi

  LINT_LOG="temp/task${TASK_NUM}_lint.log"
  if [ ! -f "$LINT_LOG" ]; then
    MISSING_FILES="$MISSING_FILES\n  MISSING LINT LOG: $LINT_LOG"
    MISSING_FILES="$MISSING_FILES\n  (Antigravity: npm run lint 2>&1 | tee $LINT_LOG)"
    BLOCKED=1
  fi

  HTTP_LOG="temp/task${TASK_NUM}_http_status.txt"
  if [ ! -f "$HTTP_LOG" ]; then
    MISSING_FILES="$MISSING_FILES\n  MISSING HTTP STATUS LOG: $HTTP_LOG"
    MISSING_FILES="$MISSING_FILES\n  (Antigravity: curl each changed page URL and save to $HTTP_LOG)"
    BLOCKED=1
  else
    FOUROFOUR=$(grep "404" "$HTTP_LOG" 2>/dev/null)
    if [ -n "$FOUROFOUR" ]; then
      ERRORS="$ERRORS\n  404 FOUND in $HTTP_LOG:\n$FOUROFOUR"
      BLOCKED=1
    fi
  fi
fi

# OUTPUT
if [ $BLOCKED -eq 1 ]; then
  echo "========================================" >&2
  echo "BLOCKED: Cannot write ✅ DONE to PROJECT_LEDGER.md." >&2
  echo "========================================" >&2

  if [ -n "$MISSING_FILES" ]; then
    echo "" >&2
    echo "MISSING EVIDENCE FILES:" >&2
    echo -e "$MISSING_FILES" >&2
    echo "" >&2
    echo "Antigravity must save these files to temp/ with exact filenames." >&2
    echo "PM must Read each one. Then retry." >&2
  fi

  if [ -n "$ERRORS" ]; then
    echo "" >&2
    echo "ERRORS:" >&2
    echo -e "$ERRORS" >&2
  fi

  echo "" >&2
  echo "Protocol 3: missing evidence = FAIL. No rationalization permitted." >&2
  echo "========================================" >&2
  exit 2
fi

# CHECK 8: Evidence archive exists (TASK-108)
if [ -n "$TASK_NUM" ]; then
  ARCHIVE_DIR="logs/tasks/TASK-${TASK_NUM}"
  if [ ! -d "$ARCHIVE_DIR" ]; then
    echo "========================================" >&2
    echo "DONE-GATE BLOCKED: $ARCHIVE_DIR/ does not exist." >&2
    echo "Create the archive before marking DONE." >&2
    echo "========================================" >&2
    exit 2
  fi
fi

exit 0
