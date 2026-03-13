# FEATURE STATE — googleantigravity.directory
**Last Updated**: 2026-03-13 (full codebase audit — schema, queries, components, pages all read)
**Purpose**: Single source of truth for what features are active vs removed/backend-only. PM MUST read this before writing any spec that references a data field or UI feature.

---

## RULE: BEFORE ANY SPEC — CHECK THIS FILE FIRST

If the spec references a field (views, ratings, copiedCount, githubStars, etc.) or a UI component, verify its current state here BEFORE writing the spec. If the field is not listed as ACTIVE IN UI, treat it as backend-only. Do NOT build user-facing specs around it.

**Stored in DB ≠ displayed in UI. These are not the same thing.**

---

## ACTIVE UI FEATURES (currently rendered on pages)

| Feature | File | Notes |
|---|---|---|
| Resource title, description, url | `src/app/t/[slug]/page.tsx` | Rendered in SoftwareApplication schema + visible DOM |
| Category name | `src/app/t/[slug]/page.tsx` | Rendered as applicationCategory in schema |
| Resource content (code block) | `src/app/t/[slug]/page.tsx` line 261 | Shown only if `resource.content` is non-null |
| Tags | `src/app/t/[slug]/page.tsx` line 277 | Shown only if tags exist |
| SoftwareApplication JSON-LD | `src/app/t/[slug]/page.tsx` lines 106-120 | Active schema — DO NOT remove |
| BreadcrumbList JSON-LD | `src/app/t/[slug]/page.tsx` lines 153-176 | Active schema — DO NOT remove |
| WebSite JSON-LD (homepage) | `src/app/page.tsx` | Active — potentialAction removed in TASK-057 |
| BadgeGenerator (embed code tool) | `src/components/BadgeGenerator.tsx` | Shows embed code for external badge. Preview is HARDCODED FAKE — see BUG-001 |
| Badge SVG API | `src/app/api/badges/[slug]/route.ts` | Real API — fetches views + avgRating from DB. Returns "👁 0 • ★ 0.0" for all resources because views=0 and ratings table is empty |
| Sponsor slots (CodeRabbit, Warp, Groq) | `src/config/sponsor.ts` | LOCKED active: true — never change |
| Integration icons on ResourceCard | `src/components/ResourceCard.tsx` line 48 | Shows if `resource.integrations` array is non-null |
| Category badge on ResourceCard | `src/components/ResourceCard.tsx` line 65 | Always shown |
| Featured/Sponsored ribbon on ResourceCard | `src/components/ResourceCard.tsx` line 36 | Shown when `resource.featured = true` |
| CitationBlock | `src/app/t/[slug]/page.tsx` line 247 | Shows title, description, category, verified |
| ShareBar | `src/app/t/[slug]/page.tsx` line 291 | Active social sharing |
| Related resources section | `src/app/t/[slug]/page.tsx` | 3 same-category resources ordered by tag overlap. Conditional — hidden if 0 related exist. |
| /tools pages (static utilities) | `src/app/tools/*.tsx` | Static client-side tools (Token Counter, ROI Calc etc.). DO NOT use the `tools` DB table — completely separate |

---

## BACKEND-ONLY FIELDS (in DB/queries, NOT displayed in UI)

| Field | DB Location | Used For | NOT Used For |
|---|---|---|---|
| `views` | `resources.views` | Recommended sort (views DESC in queries.ts:144), stats SUM (queries.ts:314), badge SVG API | Any visible UI component. All resources currently have views=0 — view increment is NEVER called. |
| `copiedCount` | `resources.copiedCount` | Stored, selected in queries | Not displayed anywhere |
| `githubStars` | `resources.githubStars` | Fetched in dead file `src/lib/comparison.ts` only | Nothing active. All values=0. No sync job exists. |
| `githubForks` | `resources.githubForks` | Fetched in dead file `src/lib/comparison.ts` only | Nothing active. All values=0. |
| `avgRating` | Computed via AVG(ratings.rating) | Badge SVG API only — returns 0 | Not on any visible page |
| `ratingCount` | Computed via COUNT(ratings.id) | Badge SVG API only — returns 0 | Not on any visible page |
| `salesCount` | `resources.salesCount` | Stored only | Not displayed anywhere |
| `price` | `resources.price` | Stored, default=0 | Not displayed anywhere |
| `badgeType` | `resources.badgeType` | Fetched in queries | NOT rendered — badge display code removed (ResourceCard line 70-72: "Editors Choice, Trending, and User's Choice Removed") |
| `isIndexed` / `indexedAt` | `resources.isIndexed/indexedAt` | DB flags only | Not shown in UI |
| `lastValidatedAt` | `resources.lastValidatedAt` | DB timestamp | Not shown in UI |
| `claimedAt` / `claimedVia` | `resources.claimedAt/claimedVia` | Claiming columns — never activated | Nothing (claiming removed from scope per BUSINESS_CONTEXT.md) |
| `metaTitle` / `metaDesc` | `resources.metaTitle/metaDesc` | Used in `<head>` metadata only | Not visible in body DOM |
| `thumbnail` | `resources.thumbnail` | Fetched in queries | Not rendered — ResourceCard has no image element |
| `verified` | `resources.verified` | Passed to CitationBlock | Used for a verified badge inside CitationBlock only |

---

## REMOVED FEATURES (built then removed — do NOT re-introduce without new task)

| Feature | Removed In | Commit | What Remains |
|---|---|---|---|
| Rating UI (star display + submit form) | TASK-024 | 361550e | `ratings` table in DB exists but is EMPTY. No user can submit ratings. |
| Views display on resource cards/pages | TASK-024 | 361550e | `views` field still in DB, used for sort only |
| Editors Choice / Trending / Users Choice badges | Unknown | — | `badgeType` still fetched but never rendered. ResourceCard line 70-72 + detail page line 215-216 confirms removal. |
| FAQPage JSON-LD schema | TASK-057 | TBD | Removed from all 3,116 resource detail pages |
| SearchAction / potentialAction in WebSite schema | TASK-057 | TBD | Removed from homepage |
| aggregateRating schema | Never built | — | Not in scope until TASK-058 (vote button) ships real data |

---

## DEAD CODE — Files that exist but no active page uses them

| File | What It Is | Why It's Dead |
|---|---|---|
| `src/lib/comparison.ts` | Fetches githubStars/githubForks for two resources | No page imports it. Comparison page was never built. |
| `queries.ts` → `getTopCreators()` | Marketplace era earnings query | No page calls it |
| `queries.ts` → `getPlatformStats()` | Total users/tools/earnings | No page calls it |
| `queries.ts` → `getOwnerDashboardData()` | Owner dashboard | No dashboard route exists in app directory |
| `queries.ts` → `getCategoryTools()` | Category showcase with mock price=$29 hardcoded | No page calls it |

---

## DEAD SCHEMA TABLES — In DB but no active route uses them

| Table | What It Was | Status |
|---|---|---|
| `payments` | Marketplace transactions | No public page uses it. Marketplace pivot removed. |
| `purchases` | 80/20 revenue split | Dead |
| `creatorEarnings` | Creator payout tracking | Dead |
| `userResourceAccess` | Access control post-purchase | Dead |
| `payoutRequests` | Creator payout requests | Dead |
| `jobs` | Job board listings | Schema exists, no route, never built |
| `tools` (DB table) | pSEO/Banu engine registry | Schema exists. The `/tools` pages are STATIC and use zero DB calls. |
| `follows` | User following system | Dead |
| `resourceClaims` | GitHub-based claiming | Dead — claiming removed from scope per BUSINESS_CONTEXT.md |

---

## KNOWN BUGS (flagged during 2026-03-13 audit)

### BUG-001 — BadgeGenerator preview is hardcoded fake values
**File**: `src/components/BadgeGenerator.tsx` lines 55-58
**What it shows**: Hardcoded "👁 1.2k • ★ 4.9" on the badge preview on every resource detail page
**Reality**: The real badge API returns "👁 0 • ★ 0.0" for all resources — views=0 (never incremented), ratings table empty
**Impact**: Misleading. Authors see impressive numbers that are fake. If they embed the real badge URL on their site it shows 0/0.
**When to fix**: After views tracking is wired + after TASK-058 vote button gives real rating data. Prioritise once real data exists.

### BUG-002 — Views counter is never incremented
**File**: `src/app/t/[slug]/page.tsx` (server component — no increment call)
**What it means**: Every resource has views=0. The "Recommended" sort orders all resources by views DESC, publishedAt DESC — since all views=0, it falls through to publishedAt only. Recommended and Latest are effectively identical.
**When to fix**: After TASK-057 is done. Low priority until we have real traffic, but should be noted as a sequencing issue for the badge flywheel strategy.

---

## PENDING — Not Yet Built (do NOT reference in specs as if they exist)

| Feature | Planned Task | Blocker |
|---|---|---|
| "Was this helpful?" vote button | TASK-058 | None — next task after TASK-057 |
| aggregateRating JSON-LD | Post-TASK-058 | Requires real vote data first |
| IndexNow auto-ping | TASK-048 | None |
| Decision-making filters | TASK-051 | Requires TASK-050 data enrichment |
| Combination pages | TASK-054 | Requires TASK-050 data enrichment |
| Views increment on page load | Unscheduled | Field exists, route handler never increments it |
| Comparison page | Unscheduled | `comparison.ts` exists but no route — would need a page + URL pattern |

---

## HOW TO KEEP THIS FILE CURRENT

Every time Antigravity removes, adds, or changes a UI feature:
1. PM updates this file as part of the post-task verification step
2. Update the relevant row (ACTIVE → REMOVED or BACKEND-ONLY → ACTIVE)
3. Add the task number and commit hash
4. Check DEAD CODE and DEAD SCHEMA sections — remove entries that get activated

This file is the PM's single source of truth. It is not derived from code — it must be actively maintained.
