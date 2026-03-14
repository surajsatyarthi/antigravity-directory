# TASK-059 Implementation Plan: Marketplace Dead Code Cleanup

## Counter-Analysis Findings Summary
Antigravity's independent grepping confirmed all of PM's initial findings regarding dead code. Additionally, the analysis of the DB schema unraveled cross-dependencies within relation declarations that need adjustment.

1. **Dead Query Functions (`src/lib/queries.ts`)**: `getFeaturedResources`, `getOwnerDashboardData`, `getTopCreators`, `getPlatformStats`, `getCategoryTools` are confirmed 100% dead with zero references across `src/`.
2. **Pricing UI**: Checked all UI components in `src/components/`. No component passes or controls `pricing`. Therefore, the `pricing` filter logic in `getFilteredResources` is dead code and safe to remove along with `price` logic in URL state parsing.
3. **Dashboard Components**: Found `SalesHistory.tsx` in `src/components/dashboard/` which depends on `creatorEarnings` table, but it is 100% unused and not imported anywhere. However, adhering to PM's instruction "DO NOT TOUCH: Any component in `src/components/`", this file will not be touched in this task.
4. **Dead Relations (`src/drizzle/schema.ts`)**: Confirmed `relations()` functions for `ratings`, `bookmarks`, `payments`, `purchases`, `creatorEarnings`, `userResourceAccess`, and `payoutRequests` can be safely deleted. 
   - *Correction*: The active `usersRelations` and `resourcesRelations` arrays also actively reference the `ratings`, `bookmarks`, and `payments` tables. Those specific lines inside the active relations must be pruned.
5. **Dead DB Tables**: Verified the existence of `resourceClaims`, `ratings`, `follows`, `bookmarks`, `jobs`, `payments`, `purchases`, `creatorEarnings`, `userResourceAccess`, and `payoutRequests`. They are indeed fully dead pieces of marketplace metadata. These will NOT be deleted, but explicitly reported.

## Proposed Changes

### `src/lib/queries.ts`
- **[DELETE]** `getFeaturedResources` (lines 178-221)
- **[DELETE]** `getOwnerDashboardData` (lines 311-341)
- **[DELETE]** `getTopCreators` (lines 379-399)
- **[DELETE]** `getPlatformStats` (lines 404-416)
- **[DELETE]** `getCategoryTools` (lines 421-445)
- **[MODIFY]** Remove the `pricing` query filter logic (lines 79-87) 
- **[MODIFY]** Remove `payments` and `ratings` from the imports at the top. Note: `users` might still be used if `getAdminDashboardData` references it (requires validation during execution).

### `src/app/actions/get-resources.ts`
- **[MODIFY]** Remove `pricing?: string;` from the interface and URL param mapping logic.

### `src/hooks/useFilterPersistence.ts` & `src/lib/validation.ts`
- **[MODIFY]** Strip `pricing` extraction, fallback, validation, and encoding handlers completely.

### `src/app/api/badges/[slug]/route.ts`
- **[MODIFY]** Remove `ratings` and `sql` from the imports block.

### `src/drizzle/schema.ts`
- **[DELETE]** Block `ratingsRelations` (lines 367-376)
- **[DELETE]** Block `bookmarksRelations` (lines 400-409)
- **[DELETE]** Block `paymentsRelations` (lines 411-420)
- **[DELETE]** Block `purchasesRelations` (lines 422-435)
- **[DELETE]** Block `userResourceAccessRelations` (lines 437-450)
- **[DELETE]** Block `creatorEarningsRelations` (lines 477-482)
- **[DELETE]** Block `payoutRequestsRelations` (lines 484-489)
- **[MODIFY]** Remove lines inside `usersRelations`: `ratings`, `bookmarks`, `payments` (lines 342, 344, 345).
- **[MODIFY]** Remove lines inside `resourcesRelations`: `ratings`, `bookmarks`, `payments` (lines 361, 363, 364).

## Verification Plan
1. `npm run build` and `npm run lint` must cleanly pass.
2. The UI (`/`, `/tools`, `/admin`, `/t/any-resource`) must load properly.
3. Provide the full mandated 9-point evidence report (temp files created, git diff, build/lint logs, and findings checklist).
