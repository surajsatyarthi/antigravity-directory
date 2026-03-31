# TASK-083 — Copy Button on Listing Cards

**Status**: ✅ DONE
**Date**: 2026-03-31
**Executed by**: Antigravity (spec by PM)

---

## What Was Done

Added a copy icon button to resource listing cards. The button renders conditionally — only when the resource's `content` field is non-null. Clicking it copies the content to clipboard and shows a green ✓ for 2 seconds. The button sits at z-30 (above the z-20 card Link overlay) with `e.stopPropagation()` so clicks do not trigger page navigation.

## Files Changed

| File | Change |
|------|--------|
| `src/lib/queries.ts` | Added `content: resources.content` to SELECT in `getFilteredResourcesInternal` (line 113) |
| `src/components/CopyButton.tsx` | Added `iconOnly?: boolean` prop; added `e.preventDefault()` + `e.stopPropagation()` to handleCopy; added icon-only render branch matching ArrowRight button style |
| `src/components/ResourceCard.tsx` | Added `content?: string | null` to props interface; imported CopyButton; rendered `{resource.content && <CopyButton content={resource.content} iconOnly />}` in right action area |

## UX Clarifications (QA)

**Q: Why do only some cards show the copy icon?**
Content field is only populated for resources that went through the backfill scripts (Rules, Prompts). MCP servers, Tools, Tutorials have only a URL → no content → no copy button. This is expected, not a bug.

**Q: Why do some cards have both copy icon AND arrow?**
- Copy icon = copies raw content inline, user stays on listing page
- Arrow = navigates to detail page for more context
They are different actions serving different user intents. Both are intentional.

## Verification

| Check | Result |
|-------|--------|
| Build exit 0 | ✅ `Compiled successfully in 44s` |
| Lint exit 0 | ✅ 0 errors |
| HTTP 200 /rules | ✅ 200 |
| HTTP 200 /mcp-servers | ✅ 200 |
| Screenshot 1 — copy icon on Rules card | ✅ `temp/task083_screenshot1.png` — two circular buttons visible at 200% zoom: left = copy icon (two overlapping rectangles), right = arrow (→). Both clearly distinguishable. |
| Screenshot 2 — page stays on /rules after click | ✅ `temp/task083_screenshot2.png` — URL bar shows `http://localhost:3000/rules`. Page did NOT navigate. NOTE: green ✓ state not captured (2-second animation window missed); page-stays criterion confirmed. |
| Screenshot 3 — no copy icon on sponsored MCP card | ✅ `temp/task083_screenshot3.png` — SPONSORED ribbon visible, only arrow button present, no copy icon. Conditional rendering confirmed. |
