#!/bin/bash
# Blocks PM from writing ✅ DONE to PROJECT_LEDGER.md unless:
# 1. All .png screenshots referenced in CURRENT_TASK.md exist in temp/
# 2. All .webm recordings referenced in CURRENT_TASK.md exist in temp/
# 3. HTTP status log exists in temp/ (if referenced) and contains zero 404 lines
# 4. CURRENT_TASK.md contains a ## PM SCREENSHOT READ section
#    (proves PM used Read tool on each screenshot and described the content)
# Exit 2 = BLOCK. Exit 0 = allow.

INPUT=$(cat)
FILE=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')
NEW_CONTENT=$(echo "$INPUT" | jq -r '.tool_input.new_string // .tool_input.content // empty')

# Only applies to PROJECT_LEDGER.md
if [[ "$FILE" != *"PROJECT_LEDGER.md" ]]; then
  exit 0
fi

# Only triggers when writing ✅ DONE status
if ! echo "$NEW_CONTENT" | grep -q "✅ DONE"; then
  exit 0
fi

BLOCKED=0
MISSING_FILES=""
ERRORS=""

# --- CHECK 1: PNG screenshots ---
SCREENSHOTS=$(grep -oE 'temp/task[0-9]+_[a-zA-Z0-9_]+\.png' CURRENT_TASK.md 2>/dev/null | sort -u)
for f in $SCREENSHOTS; do
  if [ ! -f "$f" ]; then
    MISSING_FILES="$MISSING_FILES\n  MISSING PNG: $f"
    BLOCKED=1
  fi
done

# --- CHECK 2: .webm screen recordings ---
RECORDINGS=$(grep -oE 'temp/task[0-9]+_[a-zA-Z0-9_]+\.webm' CURRENT_TASK.md 2>/dev/null | sort -u)
for f in $RECORDINGS; do
  if [ ! -f "$f" ]; then
    MISSING_FILES="$MISSING_FILES\n  MISSING RECORDING: $f"
    BLOCKED=1
  fi
done

# --- CHECK 3: HTTP status log — must exist AND contain zero 404 lines ---
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

# --- CHECK 4: PM SCREENSHOT READ section must exist in CURRENT_TASK.md ---
# PM must use Read tool on each screenshot and write what they saw.
# This section proves PM actually looked at the images — not just that files exist.
if ! grep -q "## PM SCREENSHOT READ" CURRENT_TASK.md 2>/dev/null; then
  ERRORS="$ERRORS\n  MISSING SECTION: '## PM SCREENSHOT READ' not found in CURRENT_TASK.md"
  ERRORS="$ERRORS\n  PM must Read every screenshot in temp/ using the Read tool,"
  ERRORS="$ERRORS\n  describe what each one shows, and write a '## PM SCREENSHOT READ'"
  ERRORS="$ERRORS\n  section in CURRENT_TASK.md before marking DONE."
  BLOCKED=1
fi

# --- CHECK 5: Build log must exist ---
TASK_NUM=$(grep -oE 'TASK-[0-9]+' CURRENT_TASK.md 2>/dev/null | head -1 | grep -oE '[0-9]+')
if [ -n "$TASK_NUM" ]; then
  BUILD_LOG="temp/task${TASK_NUM}_build.log"
  if [ ! -f "$BUILD_LOG" ]; then
    MISSING_FILES="$MISSING_FILES\n  MISSING BUILD LOG: $BUILD_LOG"
    MISSING_FILES="$MISSING_FILES\n  (Antigravity must run: npm run build 2>&1 | tee $BUILD_LOG)"
    BLOCKED=1
  fi

  # --- CHECK 6: Lint log must exist ---
  LINT_LOG="temp/task${TASK_NUM}_lint.log"
  if [ ! -f "$LINT_LOG" ]; then
    MISSING_FILES="$MISSING_FILES\n  MISSING LINT LOG: $LINT_LOG"
    MISSING_FILES="$MISSING_FILES\n  (Antigravity must run: npm run lint 2>&1 | tee $LINT_LOG)"
    BLOCKED=1
  fi

  # --- CHECK 7: HTTP status log must exist AND be 404-free ---
  HTTP_LOG="temp/task${TASK_NUM}_http_status.txt"
  if [ ! -f "$HTTP_LOG" ]; then
    MISSING_FILES="$MISSING_FILES\n  MISSING HTTP STATUS LOG: $HTTP_LOG"
    MISSING_FILES="$MISSING_FILES\n  (Antigravity must curl each changed page URL and save results)"
    BLOCKED=1
  else
    FOUROFOUR=$(grep "404" "$HTTP_LOG" 2>/dev/null)
    if [ -n "$FOUROFOUR" ]; then
      ERRORS="$ERRORS\n  404 FOUND in $HTTP_LOG:\n$FOUROFOUR"
      BLOCKED=1
    fi
  fi
fi

# --- OUTPUT ---
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
    echo "ERRORS / MISSING SECTIONS:" >&2
    echo -e "$ERRORS" >&2
  fi

  echo "" >&2
  echo "PM Rule 11: a screenshot showing 404 = task FAILS. No rationalization." >&2
  echo "PM Rule 12: a missing evidence file = task FAILS. No description substitutes." >&2
  echo "========================================" >&2
  exit 2
fi

exit 0
