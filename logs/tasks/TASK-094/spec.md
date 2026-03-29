# SPEC — TASK-094: Fix Raw GitHub Slugs as Resource Titles

## Source
Reconstructed from logs/ledger/2026/Q1.md + committed scripts. Original CURRENT_TASK.md was not committed to git.

## What was built (verbatim from ledger)
Commit fe7e31b. 90 resources updated — title + metaTitle rewritten from raw GitHub owner/repo format to human-readable names. Slug unchanged. Scripts: rewrite-titles-dryrun.ts, rewrite-titles-live.ts, verify-raw-titles.ts committed.

## Scripts committed
- scripts/rewrite-titles-dryrun.ts
- scripts/rewrite-titles-live.ts
- scripts/verify-raw-titles.ts

## Evidence files
- temp/task094_pre_fix_diagnosis.txt — 90 resources with raw owner/repo titles
- temp/task094_fix.log — row-by-row transformations
- temp/task094_post_fix_diagnosis.txt — 0 remaining raw titles
- temp/task094_screenshot_before.png — "block/goose" H1
- temp/task094_screenshot_after.png — "Goose" H1
- temp/task094_build.log — ✓ Compiled successfully
- temp/task094_lint.log — exists
