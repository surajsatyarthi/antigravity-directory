# SPEC — TASK-111: Correct 13 Sub-optimal Title Transforms from TASK-094

## Source
Reconstructed from logs/ledger/2026/Q1.md + committed scripts. Original CURRENT_TASK.md was not committed to git.

## What was built (verbatim from ledger)
13 brand-name corrections applied via direct SQL UPDATEs: LocalAI, AG2, IDA Pro MCP, Chrome DevTools MCP, Desktop Commander MCP, OpenMetadata, UI TARS Desktop, FastAPI MCP, WhatsApp MCP, FastMCP, AstrBot, 53AI Hub, ACI. Build ✅ 49s. All 13 verified via SELECT. Archive: logs/tasks/TASK-111/.

## Why these 13
TASK-094 algorithm split on hyphens/underscores and capitalized first letter only. CamelCase repo names (DesktopCommanderMCP → Desktopcommandermcp) and acronyms (ag2 → Ag2 instead of AG2) were not handled. 13 brand names required manual correction.

## Scripts committed
- scripts/fix-titles-111.ts — 13 direct SQL UPDATE statements

## Evidence files
- temp/task111_fix.log — 13 lines, all "— UPDATED"
- temp/task111_verify.txt — SELECT output showing all 13 IDs with correct titles
- temp/task111_build.log — ✓ Compiled successfully in 49s
- temp/task111_lint.log — exists
