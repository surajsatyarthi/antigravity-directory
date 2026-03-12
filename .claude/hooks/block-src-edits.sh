#!/bin/bash
# Mechanically blocks PM (Claude Code) from editing files in src/
# Exit 2 = block the tool call. Exit 0 = allow.

INPUT=$(cat)
FILE=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

if [[ "$FILE" == src/* ]] || [[ "$FILE" == */src/* ]]; then
  echo "BLOCKED: PM cannot modify src/ files. Write a task spec for Antigravity instead." >&2
  exit 2
fi

exit 0
