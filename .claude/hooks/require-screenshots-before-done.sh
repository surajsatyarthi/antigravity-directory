#!/bin/bash
# Blocks PM from writing ✅ DONE to PROJECT_LEDGER.md
# unless all screenshots referenced in CURRENT_TASK.md exist in temp/
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

# Extract screenshot filenames referenced in CURRENT_TASK.md (macOS-compatible grep)
SCREENSHOTS=$(grep -oE 'temp/task[0-9]+_[a-zA-Z0-9_]+\.png' CURRENT_TASK.md 2>/dev/null | sort -u)

if [ -z "$SCREENSHOTS" ]; then
  exit 0  # No screenshots required for this task
fi

MISSING=""
for f in $SCREENSHOTS; do
  if [ ! -f "$f" ]; then
    MISSING="$MISSING $f"
  fi
done

if [ -n "$MISSING" ]; then
  echo "BLOCKED: Cannot write ✅ DONE to PROJECT_LEDGER.md." >&2
  echo "These screenshots from CURRENT_TASK.md are not saved to temp/ yet:" >&2
  for f in $MISSING; do
    echo "  MISSING: $f" >&2
  done
  echo "" >&2
  echo "Antigravity must save these files. PM must Read each one. Then retry." >&2
  exit 2
fi

exit 0
