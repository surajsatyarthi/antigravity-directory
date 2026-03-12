#!/bin/bash
# Mechanically blocks PM (Claude Code) from running build/lint/test commands
# Exit 2 = block the tool call. Exit 0 = allow.

INPUT=$(cat)
CMD=$(echo "$INPUT" | jq -r '.tool_input.command // empty')

# Block build, lint, test commands on source code
if echo "$CMD" | grep -qE "(npm run build|npm run lint|npm run test|npm run dev|pnpm build|pnpm lint|pnpm test|pnpm dev|npx tsc|npx next)"; then
  echo "BLOCKED: PM cannot run build/lint/test commands." >&2
  echo "Antigravity runs builds. PM reads output only." >&2
  exit 2
fi

exit 0
