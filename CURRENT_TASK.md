# CURRENT TASK — TASK-059: Marketplace Dead Code Counter-Analysis + Safe Cleanup
**Assigned by**: Claude Code (PM)
**Date**: 2026-03-13
**Branch**: fix/post-audit-cleanup (current branch)

---

## WHY THIS TASK EXISTS

The codebase still contains substantial marketplace-era dead code: tables, query functions, and imports that serve no active public route. This bloats the bundle, adds JOIN overhead to every active query that imports the dead functions, and creates confusion about what the site actually does. Founder direction: nothing from the marketplace phase survives.

PM has done an initial audit. Antigravity must do a COUNTER-ANALYSIS — read every file independently, find what PM missed, then clean what is safe to clean.

---

## SCOPE SPLIT — WHAT ANTIGRAVITY MAY CLEAN VS. WHAT REQUIRES PM DECISION

### SAFE TO CLEAN IN THIS TASK (TypeScript/code only — no DB changes):
1. Dead **query functions** in `src/lib/queries.ts` — delete the entire function
2. Dead **imports** in any file — remove unused imports
3. Dead **relations** in `src/drizzle/schema.ts` that reference dead tables — remove only the `relations()` blocks, NOT the table definition itself

### NOT SAFE — REQUIRES PM + FOUNDER DECISION BEFORE ANY ACTION:
- Removing table definitions from `schema.ts` — Drizzle will generate DROP TABLE migrations on next `db:push`. Live DB. Tables may have real rows (even if UI is gone). Requires explicit founder approval.
- Dropping DB columns from active tables (e.g. `price`, `salesCount` on resources) — same risk.
- Any schema migration

**Antigravity must report these but NOT act on them.**

---

## PM VERIFIED STARTING LIST

### Dead schema tables (verified by PM reading `src/drizzle/schema.ts`)

| Table | Lines | Why dead |
|---|---|---|
| `resourceClaims` | 144-153 | Claiming system removed. No active route calls it. |
| `ratings` | 155-169 | UI removed TASK-024 (commit 361550e). Table empty. |
| `follows` | 214-223 | Social graph — no UI ever built or shipped. |
| `bookmarks` | 226-234 | BookmarkButton removed TASK-022. No active route. |
| `jobs` | 263-279 | Jobs board never built. No route exists. |
| `payments` | 281-297 | Marketplace payments. All payment routes deleted TASK-002/003. |
| `purchases` | 299-317 | 80/20 split system. Deleted same tasks. |
| `creatorEarnings` | 319-327 | Creator payout tracking. Deleted same tasks. |
| `userResourceAccess` | 329-337 | Purchase access control. Deleted same tasks. |
| `payoutRequests` | 452-475 | Creator payout requests. Deleted same tasks. |

**These table definitions must NOT be deleted in this task.** Report them with confirmation. PM will write a separate DB migration task with founder approval.

### Dead query functions (verified by PM reading `src/lib/queries.ts`)

| Function | Lines | Why dead |
|---|---|---|
| `getFeaturedResources` | 178-221 | Queries `featured` resources. `SponsoredCard` handles featured ads via `sponsor.ts` config — not DB query. Antigravity must grep `src/` for `getFeaturedResources` to confirm zero consumers before deleting. |
| `getOwnerDashboardData` | 311-341 | Owner dashboard removed. Queries `authorId` + ratings. Antigravity must grep for `getOwnerDashboardData` to confirm. |
| `getTopCreators` | 379-399 | Marketplace — queries `payments.amount` for creator earnings leaderboard. Antigravity must grep for `getTopCreators` to confirm. |
| `getPlatformStats` | 404-416 | Marketplace — queries total earnings from `payments`. References `StatsBar` in comment but component was deleted. Antigravity must grep for `getPlatformStats` to confirm. |
| `getCategoryTools` | 421-445 | Marketplace — fetches resources by category with mock price `29` hardcoded on line 432, joined with `payments`. Antigravity must grep for `getCategoryTools` to confirm. |

**If grep confirms zero consumers, delete these functions.**

### Dead imports (verified by PM)

| File | Import | Why dead |
|---|---|---|
| `src/lib/queries.ts` line 7 | `payments` from schema | Only used in `getTopCreators`, `getPlatformStats`, `getCategoryTools` — all dead if confirmed above |
| `src/lib/queries.ts` line 7 | `users` from schema | Used in `getOwnerDashboardData` + `getAdminDashboardData`. If `getOwnerDashboardData` is deleted, check if `users` is still needed for `getAdminDashboardData`. |
| `src/app/api/badges/[slug]/route.ts` line 2 | `ratings` from schema | Dead since TASK-057. No longer used. |
| `src/app/api/badges/[slug]/route.ts` line 3 | `sql` from drizzle-orm | Dead since TASK-057. No longer used. |

### Dead fields on active tables (report only — DO NOT remove)

These fields exist on LIVE tables. Removing them requires column-drop migrations. PM must review and get founder approval.

**On `resources` table:**
- `price` (line 109) — marketplace pricing, filter in `getFilteredResources` line 82-83 but no UI exposes this filter
- `currency` (line 110) — marketplace
- `salesCount` (line 111) — marketplace per-resource sales tracking
- `isIndexed` / `indexedAt` (lines 114-115) — staged indexing feature, no active consumer
- `githubStars` / `githubForks` (lines 118-119) — no GitHub sync API active, always 0
- `claimedAt` / `claimedVia` (lines 127-128) — claiming system removed

**On `users` table:**
- `bio`, `location`, `tagline`, `website`, `githubUsername`, `twitterHandle`, `linkedinUrl`, `youtubeChannel`, `discordUsername` (lines 14-20) — social profile fields, no profile page exists
- `profileCompletionScore`, `followersCount`, `followingCount` (lines 23-26) — social metrics, no UI

**Note on `pricing` filter in `getFilteredResources`**: If `price` field is confirmed dead, the `pricing` filter block (lines 79-89 in queries.ts) should also be removed. Antigravity must check if `pricing` is passed from any active UI component before removing.

---

## COUNTER-ANALYSIS INSTRUCTIONS

Antigravity must NOT simply trust PM's list. Read every file independently:

1. **Read every file in `src/app/`** — list all active page routes and API routes
2. **Read every file in `src/components/`** — list all components and what data they consume
3. **Read `src/lib/queries.ts`** — for each exported function, grep `src/` for its import. Zero imports = dead.
4. **Read `src/drizzle/schema.ts`** — for each table export, grep `src/` for its usage. Confirm which are truly dead.
5. **Read `src/types/database.ts`** if it exists — check for dead type definitions
6. **Grep for any additional dead patterns** PM may have missed

**If Antigravity finds anything PM did NOT list — add it to the report.**

---

## WHAT TO ACTUALLY CLEAN IN THIS TASK

After counter-analysis confirms the dead code:

### DELETE (safe — TypeScript code only):
1. Dead query functions confirmed by grep: delete the entire function body
2. Dead imports in `queries.ts`: remove from the import line (keep active ones)
3. Dead imports in `route.ts`: remove `ratings` and `sql`
4. Dead `relations()` blocks in `schema.ts` that reference dead tables ONLY — e.g. `ratingsRelations`, `bookmarksRelations`, `paymentsRelations`, `purchasesRelations`, `creatorEarningsRelations`, `payoutRequestsRelations`, `userResourceAccessRelations` (the `relations()` functions, NOT the `pgTable` definitions)
5. Any other dead imports/functions Antigravity finds in the counter-analysis

### DO NOT TOUCH:
- `pgTable` definitions in `schema.ts` — no DB changes in this task
- DB columns on active tables (`price`, `salesCount`, etc.)
- Any active query function (getFilteredResources, getCategoriesWithCounts, getResourcesByCategorySlug, getAllTags, getTopTools, getToolBySlug, getAdminDashboardData)
- Any active component

---

## MANDATORY REPORT FORMAT

```
TASK-059 COUNTER-ANALYSIS + CLEANUP REPORT
===========================================

COUNTER-ANALYSIS FINDINGS:

PM list confirmed:
- Dead query functions: [list each + grep result confirming zero consumers]
- Dead imports: [list each]

PM list corrections (anything PM got wrong):
- [list anything where PM's reading was incorrect]

Additional dead code found by Antigravity (not in PM list):
- [file, line, what it is, why dead]

DEAD DB TABLES (report only — no action):
[paste the 10 tables from PM list + confirm with grep results]

DEAD FIELDS ON ACTIVE TABLES (report only — no action):
[paste PM list + any additions]

CHANGES MADE:

Deleted query functions:
[for each: function name, lines deleted, grep result confirming zero consumers]

Removed dead imports:
[for each: file, line, what was removed]

Removed dead relations():
[for each: relation name, lines deleted]

Any other dead code removed:
[list]

Evidence:
1. Screenshots: temp/task059_tools_page.png (verify tools still work), temp/task059_admin_page.png, temp/task059_homepage.png
2. Screen recording: temp/task059_recording.webm
3. Git commit hash: [hash]
4. Git diff: [all changed lines]
5. Build log: [full output + exit code 0]
6. Lint log: [full output + exit code 0]
7. HTTP status: / → 200, /mcp-servers → 200, /tools → 200, /admin → 200, /t/[any-slug] → 200
8. Browser console: no errors
9. Network tab: no errors
```

---

## DO NOT CHANGE

- Any `pgTable` definition in `schema.ts`
- Any active query function
- Any component in `src/components/`
- Any page in `src/app/`
- Any config file (`sponsor.ts`, `navigation.ts`, etc.)
- No `npm run` commands beyond build + lint
