#!/bin/bash
# research-gate.sh — blocks spec writes without online research
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

# Check new content has research with a URL
if echo "$NEW_CONTENT" | grep -qi "## RESEARCH" && echo "$NEW_CONTENT" | grep -q "http"; then
  exit 0
fi

# Check existing file already has research with a URL
if grep -qi "## RESEARCH" CURRENT_TASK.md 2>/dev/null && grep -q "http" CURRENT_TASK.md 2>/dev/null; then
  exit 0
fi

# BLOCKED
echo "========================================" >&2
echo "BLOCKED: Spec has no research." >&2
echo "========================================" >&2
echo "" >&2
echo "Add a RESEARCH section before ACCEPTANCE CRITERIA:" >&2
echo "" >&2
echo "  ## RESEARCH" >&2
echo "  - Web: Query: \"[search]\" → URL: https://... → Finding: \"[exact quote]\"" >&2
echo "  - Reddit: Query: \"[search]\" → URL: https://... → Finding: \"[exact quote]\"" >&2
echo "  - Twitter: Query: \"[search]\" → URL: https://... → Finding: \"[exact quote]\"" >&2
echo "" >&2
echo "No spec ships without evidence of research." >&2
echo "========================================" >&2
exit 2
