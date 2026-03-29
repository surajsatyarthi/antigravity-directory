# SPEC — TASK-095: Fix Missing and Broken Resource Descriptions

## Source
Reconstructed from logs/ledger/2026/Q1.md + committed scripts. Original CURRENT_TASK.md was not committed to git.

## What was built (verbatim from ledger)
471 LIVE resources had broken descriptions (empty, < 30 chars, same as title, or raw slug). Scripts: diagnose-descriptions.ts + fix-descriptions.ts. Template: {title} — {category} for Google Antigravity IDE. Result: 471 → 0 broken descriptions. Build: ✅ Compiled successfully (2.1min). Archive: logs/tasks/TASK-095/.

## Definition of broken (from spec)
WHERE status = 'LIVE' AND (description = '' OR LENGTH(description) < 30 OR description = title OR description ~ '^[a-zA-Z0-9._-]+\/[a-zA-Z0-9._-]+$')

## Fix template
{title} — {category_name} for Google Antigravity IDE

## Scripts committed
- scripts/diagnose-descriptions.ts
- scripts/fix-descriptions.ts

## Evidence files
- temp/task095_pre_fix_diagnosis.txt — TOTAL BROKEN DESCRIPTIONS FOUND: 471
- temp/task095_fix.log — 471 entries, ends "Updated 471 resources"
- temp/task095_post_fix_diagnosis.txt — TOTAL BROKEN DESCRIPTIONS FOUND: 0
- temp/task095_build.log — ✓ Compiled successfully in 2.1min
- temp/task095_lint.log — exists
