# CURRENT TASK — TASK-110: Session Protocol Confirmation Gate Hook

## RESEARCH
- Web: Query: "CI/CD pre-flight checklist enforcement before deployment gate" → URL: https://oneuptime.com/blog/post/2026-01-30-deployment-gates/view → Finding: "They sit between pipeline stages and block progression until all criteria are satisfied."
- Reddit: Query: "mandatory checklist before deploy" → URL: https://www.reddit.com/r/devops/comments/1onb20l/how_are_you_enforcing_codequality_gates/ → Finding: "I'd love a way to enforce basic standards - test coverage > 80%, no new critical issues - without babysitting every PR." (64 upvotes, r/devops)
- Twitter/X: Query: "session checklist mandatory before coding" → URL: https://x.com/cline/status/1928901840969805828 → Finding: "Plan for 10 minutes before coding for 2 hours. Brief your AI like onboarding a new developer: architecture, constraints, goals, existing patterns."

---

## WHAT TO BUILD

No mechanical gate prevents PM from skipping required reads at session start. Root cause of TASK-106 session shortcut: PM jumped to writing specs without reading BUSINESS_CONTEXT.md, failures-log.md, and FEATURE_STATE.md — resulting in specs that contradicted strategic direction already documented. The fix is a shell hook that fires when PM writes any spec (CURRENT_TASK.md with ACCEPTANCE CRITERIA present) and blocks unless PM has declared `SESSION-PROTOCOL-CONFIRMED: [today's date]` in the file. One new hook file. One settings.json update.

---

## TECHNICAL SPEC

### File 1 — CREATE: `.claude/hooks/session-protocol-gate.sh`

```bash
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
```

Make the file executable: `chmod +x .claude/hooks/session-protocol-gate.sh`

---

### File 2 — UPDATE: `.claude/settings.json`

Add `session-protocol-gate.sh` to BOTH Write and Edit matchers, BEFORE `research-gate.sh`:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": ".claude/hooks/session-protocol-gate.sh"
          },
          {
            "type": "command",
            "command": ".claude/hooks/research-gate.sh"
          },
          {
            "type": "command",
            "command": ".claude/hooks/evidence-gate.sh"
          }
        ]
      },
      {
        "matcher": "Edit",
        "hooks": [
          {
            "type": "command",
            "command": ".claude/hooks/session-protocol-gate.sh"
          },
          {
            "type": "command",
            "command": ".claude/hooks/research-gate.sh"
          },
          {
            "type": "command",
            "command": ".claude/hooks/evidence-gate.sh"
          }
        ]
      }
    ]
  }
}
```

---

## QA — VERIFICATION TESTS

No Playwright tests — no UI changes. Verification is mechanical:

- Test 1: Write CURRENT_TASK.md with ACCEPTANCE CRITERIA but no `SESSION-PROTOCOL-CONFIRMED:` line → expect gate fires with "BLOCKED: Session protocol not confirmed."
- Test 2: Write CURRENT_TASK.md with both `SESSION-PROTOCOL-CONFIRMED: [today]` AND ACCEPTANCE CRITERIA in the content → expect gate passes
- Test 3: Write CURRENT_TASK.md without ACCEPTANCE CRITERIA → expect gate passes (gate only fires on finalized specs)
- Test 4: `cat .claude/hooks/session-protocol-gate.sh` → expect file exists with correct content
- Test 5: `cat .claude/settings.json` → expect session-protocol-gate.sh listed before research-gate.sh in both matchers

---

## RETROGRADE CHECK

- **Who is this for?** The PM (Claude Code) only. No user-facing impact. No code changes.
- **Adjacent dead code:** None.
- **Antigravity action:** None beyond this task.

---

## SCREENSHOTS
NONE — no UI changes in this task

## ACCEPTANCE CRITERIA

- [ ] `.claude/hooks/session-protocol-gate.sh` exists — verified by: reading the file
- [ ] Hook is executable (`chmod +x`) — verified by: `ls -la .claude/hooks/`
- [ ] Gate blocks CURRENT_TASK.md writes with ACCEPTANCE CRITERIA and no SESSION-PROTOCOL-CONFIRMED with today's date — verified by: running Test 1
- [ ] Gate passes when SESSION-PROTOCOL-CONFIRMED: [today] is in the spec content — verified by: running Test 2
- [ ] `.claude/settings.json` has session-protocol-gate.sh before research-gate.sh in Write matcher — verified by: reading the file
- [ ] `.claude/settings.json` has session-protocol-gate.sh before research-gate.sh in Edit matcher — verified by: reading the file
- [ ] Build passes — verified by: `temp/task110_build.log`
- [ ] Lint passes — verified by: `temp/task110_lint.log`

---

## QUESTIONS FROM ANTIGRAVITY

_Antigravity writes questions here_

## PM ANSWERS

_PM answers here_
