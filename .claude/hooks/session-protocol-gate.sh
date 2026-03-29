#!/bin/bash
# session-protocol-gate.sh — blocks spec writes without session protocol confirmation
# Fires on: PreToolUse Write + Edit to CURRENT_TASK.md
# Exit 2 = BLOCK. Exit 0 = allow.

INPUT=$(cat)
FILE=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')
NEW_CONTENT=$(echo "$INPUT" | jq -r '.tool_input.new_string // .tool_input.content // empty')

# Only gate writes to CURRENT_TASK.md
if [[ "$FILE" != *"CURRENT_TASK.md" ]]; then
  exit 0
fi

# Only block when spec is being finalized (acceptance criteria present)
if ! echo "$NEW_CONTENT" | grep -qi "ACCEPTANCE CRITERIA"; then
  exit 0
fi

# Get today's date
TODAY=$(date +%Y-%m-%d)

# Check new content has SESSION-PROTOCOL-CONFIRMED with today's date
if echo "$NEW_CONTENT" | grep -q "SESSION-PROTOCOL-CONFIRMED: $TODAY"; then
  exit 0
fi

# Check existing file already has SESSION-PROTOCOL-CONFIRMED with today's date
if grep -q "SESSION-PROTOCOL-CONFIRMED: $TODAY" CURRENT_TASK.md 2>/dev/null; then
  exit 0
fi

# BLOCKED
echo "========================================" >&2
echo "BLOCKED: Session protocol not confirmed." >&2
echo "========================================" >&2
echo "" >&2
echo "Before writing this spec, read:" >&2
echo "  1. docs/01-business/BUSINESS_CONTEXT.md" >&2
echo "  2. memory/failures-log.md" >&2
echo "  3. docs/FEATURE_STATE.md" >&2
echo "" >&2
echo "Then add this line at the top of your spec:" >&2
echo "  SESSION-PROTOCOL-CONFIRMED: $TODAY" >&2
echo "" >&2
echo "This confirms you have read the required documents in this session." >&2
echo "========================================" >&2
exit 2
