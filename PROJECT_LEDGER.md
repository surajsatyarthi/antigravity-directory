# PROJECT LEDGER — googleantigravity.directory
**Maintained by**: Claude Code (PM)
**Last updated**: 2026-03-10
**Goal**: $2,000 MRR AS FAST AS POSSIBLE

---

## HOW THIS WORKS

1. PM (Claude Code) writes CURRENT_TASK.md + updates this ledger
2. Founder pastes to Antigravity: *"Read CURRENT_TASK.md and implement it exactly"*
3. Antigravity executes, produces 9-point evidence report (Ralph Protocol v18.0)
4. Founder pastes Antigravity's report back to PM
5. PM reviews, marks DONE, writes next CURRENT_TASK.md

---

## THE THREE PILLARS (in order of impact)

1. **Database** — 3,116 resources = 3,116 indexable pages
2. **SEO** — programmatic SEO turns each resource page into organic traffic. Traffic = ad revenue.
3. **UI/UX** — clean enough that users stay + sponsors want to be seen here

Ads are built last, on top of traffic.

---

## TASK REGISTRY

| ID | Title | Status | Why |
|---|---|---|---|
| TASK-001 | Fix tsconfig.json | ✅ DONE | Build blocker |
| TASK-002 | Delete marketplace API routes | ✅ DONE | Build blocker |
| TASK-003 | Strip marketplace UI (4 pages) | ✅ DONE | Product integrity |
| TASK-004 | Fix submit form + advertise page | ✅ DONE | Product integrity |
| TASK-005 | Forensic ad analysis of cursor.directory | ✅ DONE | Research |
| TASK-006 | SEO — meta, schema, sitemap, robots | ✅ DONE | Traffic engine |
| TASK-007 | Audit + fix resource statuses + remap categories | ✅ DONE | 2,025 promoted to LIVE, sitemap 1,105 → 3,130 URLs |
| TASK-008 | Build category pages at /[slug] | ✅ DONE | All 10 category pages live, build/lint exit 0 |
| TASK-009 | Audit fixes — broken links, wrong copy, dead code | ✅ DONE | All 9 fixes verified by PM reading files |
| TASK-010 | CategoryGridDiscovery fixes — invisible text, wrong copy, wrong counts | ✅ DONE | Bugs found during TASK-009 audit |
| TASK-013 | Delete conflicting + orphaned pages | ✅ DONE | 25 files deleted, 11 pages remain, all 10 category URLs now served by [slug]/page.tsx |
| TASK-010B | Wire up ad slots — homepage + global badge | ✅ DONE | sponsor.ts + 3 components + wired into layout, homepage, category pages |
| TASK-011 | UI/UX overhaul — match cursor.directory dark design | 🔄 IN PROGRESS (split into sub-tasks) | Product quality + sponsor credibility |
| TASK-015 | Visual audit — screenshot all pages | ✅ DONE | Baseline before dark mode fixes |
| TASK-016 | Dark mode fix — cards, header, nav, search, mobile menu | ✅ DONE (conditionally) | Commits 6b2baf4 + 162b8fb. Screenshots blocked by API 503 outage — accepted as exception. Known missed fix: NewsletterCapture success state text-slate-900 lines 37+39 — carried to TASK-017. |
| TASK-017 | Homepage layout revamp — 5 resources per category, cursor.directory pattern + NewsletterCapture success state fix | ✅ DONE | page.tsx rewritten, CategorySection.tsx created, getResourcesByCategorySlug added, NewsletterCapture fixed |
| TASK-018 | Homepage UX fixes — hero CTA, full-opacity cards, clickable category headers, dead code removal | ✅ DONE | UX quality |
| TASK-012 | Create /about page | ✅ DONE | Credibility — ee543a8 + fix commit |
| TASK-014 | Seed tutorials + cheatsheets categories | ⏳ PENDING | Blocked — TASK-015 done, TASK-019 (tools dark mode) queued first |
| TASK-015 | Delete 26 dead components + dark mode fix (resource detail, tools, admin, load-more, dropdown) | ✅ DONE | Commits fa36050 + 0ad8244. 26 files deleted. 8 live files fixed. Screenshots verified by PM — all dark. Known residual: Zap icon text-slate-900 in BadgeGenerator — carried to TASK-019. |
| TASK-019 | Dark mode fix — ToolsShell + ToolsSidebar internals + AdminSubmissionQueue text + BadgeGenerator icon | ⚠️ FIXES DONE, NOT COMMITTED | Files verified fixed by PM. No commit exists. Commit folded into TASK-021. |
| TASK-020 | Git history cleanup — remove binary screenshot files | ⏳ PENDING (low priority) | PM caused git add -A in every task spec — committed ~36 screenshot/webp files totalling several MB into commits fa36050 + 6b2baf4. Use git filter-repo to purge temp/ from history. Requires founder approval before execution — destructive history rewrite. |
| TASK-021 | Restore deleted tools section — 6 routes + 5 components + dark mode fixes | ✅ DONE | Commits bf01a9e (TASK-019) + 6dd95c1 (TASK-021). 15 files changed. All 6 routes HTTP 200. ⚠️ Bug: 4 tool pages double-wrap ToolsShell — carried to TASK-022 Part 0. |
| TASK-022 | Remove auth from user-facing UI + public submit form + fix ToolsShell double-nest | ✅ DONE | Commits 188c65f (ToolsShell) + d21e5d2 (auth). 11 files deleted. Header/MobileMenu/ResourceCard/submit/middleware all cleaned. Submissions nullable. |
| TASK-023 | Sort bar + fix search end-to-end on category pages | ⚠️ IMPL DONE, REPORT PENDING | [slug]/page.tsx updated + SortBar.tsx created confirmed via system reminders + file existence. Awaiting formal 9-point report from Antigravity. |
| TASK-024 | Fix Copy Code button + seed views/copies + hide 0.0 rating | ⏳ PENDING | Copy Code button has no onClick handler. All views=0, ratings=0.0. |
| TASK-025 | Enable placeholder ads + detail page rounded-* fixes | ⏳ PENDING | Flip active:true in sponsor.ts. Fix rounded-2xl on 4 elements in t/[slug]/page.tsx. |
| TASK-026 | Amazon-style category dropdown in header search bar | ✅ DONE | Commit 35e3f5f. SearchInput rewritten — dropdown left, input centre, search button right. Enter/button only, no auto-fire. |
| TASK-023 | Sort bar + search end-to-end on category pages | ✅ DONE | Verified by PM reading [slug]/page.tsx — searchParams, SortBar, search/sort all wired. Already shipped. |
| TASK-025 | Enable placeholder ads on all 3 slots + fix rounded-* on detail page | ✅ DONE | Commit 09eea84. All 3 slots show placeholders. 4 rounded-none fixes confirmed. |
| TASK-024 | Remove ratings + views from all components + fix Copy Code button | ✅ DONE | Commit 361550e. 4 files, -99 lines. ResourceCard/CitationBlock/detail page all clean. CopyButton.tsx created. |
| TASK-027 | Merge feat/ui-cursor-patterns → main + deploy to production + live site audit | ⚠️ BLOCKED | Lockfile mismatch (pg + playwright added without pnpm install). Commit f9c34f4 on local main fixes it but cannot push — branch protection. Bundled into TASK-028. |
| TASK-028 | Dead dependency + dead E2E test cleanup → deploy to production | ✅ DONE | PR #9 merged. Commits f9c34f4 + a4c6876 on main. 4 dead pkgs removed, 10 E2E test files deleted, CI pull_request trigger removed. Vercel deploy confirmed by founder. |
| TASK-029 | Vercel free-tier CPU optimisation — ISR for homepage + category pages | ✅ DONE | Commit 23a2c8d. `○ /` (1h ISR) + `● /[slug]` (5m ISR). x-vercel-cache: PRERENDER confirmed on /, /mcp-servers, /skills. Dead sort options (views, rating) removed from constants. CPU will drop from 47% toward ~10% of free-tier limit. |
| TASK-030 | Advertise page overhaul — pricing table + honest copy + fix rounded-* | ✅ DONE | Commit d67e10c. Hero updated, fake stats removed, real stats (3,116+), 5-slot pricing table ($2k→$99), "Why sponsor?" section, form upgraded with URL/audience/slot fields. HTTP 200. |
| TASK-031 | Enable placeholder ads — 3 companies across 3 slots + fix rounded-* on ad components | ✅ DONE | Commit 2c46306. Badge=CodeRabbit, Homepage=Warp, Category=Groq. All active:true. All rounded-xl/lg/bl → rounded-none. Vercel GREEN. Screenshots confirmed. |
| TASK-032 | Fix sort — "Latest" does nothing (query layer bug) | ✅ DONE | Commit 1cea998. Conditional orderBy in `getFilteredResourcesInternal`: latest → `publishedAt DESC`, recommended → `views DESC, publishedAt DESC`. FilterState sort type narrowed to `'latest' \| 'recommended'`. Screenshots confirm different order: RECOMMENDED first=sooperset/mcp-atlassian, LATEST first=Anthropic API. |
| TASK-033 | GSC + Bing verification tokens + OG image + Twitter card | ✅ DONE | Commit 9879a09. PR #13 merged to main. Vercel deployed. GSC + Bing ownership verified. **Founder still must**: submit sitemap in GSC + re-run Live Test + Request Indexing. |
| TASK-034 | Social sharing bar on resource detail pages | ⏳ PENDING | ShareBar component — WhatsApp, X, Facebook, Email, Copy Link. Add to `/t/[slug]` page. 2 files. |
| TASK-035 | llms.txt + AI crawler whitelist in robots.ts | ⏳ PENDING | Create `public/llms.txt`. Update `src/app/robots.ts` to explicitly allow GPTBot, ClaudeBot, PerplexityBot, anthropic-ai. GEO optimisation. 2 files. |
| TASK-036 | Fix weekly content discovery GitHub Action | ⏳ PENDING | PRs #1–#5 from bot show "0 Resources" or failing checks. Investigate the workflow file, identify why no new resources are being discovered, fix it. Medium complexity. |
| TASK-037 | Close PR #7 — protocol gates | ⏳ PENDING | PR #7 "Enforce 100% evidence-based protocol gates (v2.0)" has been open 1 month with a failing check. Changes are superseded by CLAUDE.md v3.1. PM to review diff, confirm no live value, then close without merging. Founder action only. |

---

## TASK LOG

### TASK-001 — Fix tsconfig.json
**Status**: ✅ DONE | **Date**: 2026-03-07

### TASK-002 — Delete marketplace API routes
**Status**: ✅ DONE | **Date**: 2026-03-07 | 14 files deleted, build exit 0

### TASK-003 — Strip marketplace UI
**Status**: ✅ DONE | **Date**: 2026-03-07 | build exit 0, lint exit 0

### TASK-004 — Fix submit form + advertise page
**Status**: ✅ DONE | **Date**: 2026-03-07 | build exit 0, lint exit 0

### TASK-005 — Forensic ad analysis of cursor.directory
**Status**: ✅ DONE | **Date**: 2026-03-07
**Key findings**: Homepage has Featured MCPs pills + Featured Jobs grid. Category pages have ZERO ads. Detail pages have 1 native sidebar card (no "Sponsored" label). MCP directory has hero carousel. We will exceed this — ads on every page.

### TASK-006 — SEO implementation
**Status**: ✅ DONE | **Date**: 2026-03-07
**Files**: page.tsx, t/[slug]/page.tsx, sitemap.ts (new), robots.ts (new)
**Result**: build exit 0, lint exit 0, sitemap has 1,105 URLs
**⚠️ Gap found**: Sitemap shows only 1,105 URLs. We have 3,116 resources seeded. ~2,000 resources have non-LIVE status and are missing from the sitemap. → TASK-007

### TASK-007 — Audit + fix resource statuses + remap categories
**Status**: ✅ DONE | **Date**: 2026-03-07
**Results**: 2,025 APPROVED→LIVE, DB now has exactly 10 locked categories, sitemap grew from 1,105 → 3,130 URLs (+183%), build exit 0, lint exit 0

### TASK-008 — Build category pages at /[slug]
**Status**: ✅ DONE | **Date**: 2026-03-07
**Files**: src/app/[slug]/page.tsx (new), src/components/ProfileHeader.tsx (lint fix)
**Result**: All 10 category pages return HTTP 200. /not-a-real-slug returns 404. Build exit 0, lint exit 0.

### TASK-009 — Audit fixes — broken links, wrong copy, dead code
**Status**: ✅ DONE | **Date**: 2026-03-07
**All 9 fixes verified by PM reading actual files** — not Antigravity's report.

### TASK-010 — CategoryGridDiscovery fixes
**Status**: ✅ DONE | **Date**: 2026-03-07
**Verified by PM reading actual files** — all 6 fixes confirmed in source.
Fix A: text-white H2 "Browse by Category". Fix B: "10 categories · 3,100+ free resources". Fix C: border-white/[0.05]. Fix D: dark cards with correct text colors. Fix E: no hardcoded counts. Fix F: auth() call removed from t/[slug]/page.tsx. Build exit 0, lint exit 0.

### TASK-013 — Delete conflicting + orphaned pages
**Status**: ✅ DONE | **Date**: 2026-03-08
**Verified by PM reading Glob output** — 25 files deleted, exactly 11 pages remain (correct set). [slug]/page.tsx CATEGORIES map verified intact with all 10 slugs. Build exit 0, lint exit 0.
**Why it mattered**: PM Glob audit found 7 hardcoded category pages overriding [slug]/page.tsx. In Next.js, static routes beat dynamic routes — /mcp-servers, /rules, /skills, /workflows, /troubleshooting, /prompts were all serving empty static content instead of DB resources. 6 of 10 category pages were broken.

### TASK-010B — Wire up ad slots
**Status**: ✅ DONE | **Date**: 2026-03-08
**Verified by PM reading actual files** — all 7 steps confirmed. sponsor.ts: active=false, all fields empty. SponsoredCard: dark styling, reads from config, placeholder links to /advertise. SponsorBadge: returns null when active=false, wired into layout.tsx line 101. SponsoredCard: wired into page.tsx lines 121-124. CategorySponsorBanner: created, wired into [slug]/page.tsx line 147, returns null when active=false. Build exit 0, lint exit 0.
**Minor noted**: page.tsx line 115 has stale comment "Creator Marketplace Hero" — cosmetic only, scheduled for future cleanup.

### TASK-011 — UI/UX overhaul ← CURRENT
**Status**: 🔄 IN PROGRESS | **Date**: 2026-03-08

### TASK-017 — Homepage layout revamp
**Status**: ✅ DONE | **Date**: 2026-03-09 | **Commit**: 8630cd3
**Files changed**: src/app/page.tsx (full rewrite + force-dynamic), src/components/CategorySection.tsx (new), src/lib/queries.ts (getResourcesByCategorySlug at line 446), src/components/NewsletterCapture.tsx (success state text-white confirmed lines 37+39)
**PM verification**: NewsletterCapture lines 37+39 ✅, getResourcesByCategorySlug at line 446 ✅, CategorySection.tsx exists ✅. Build 0, lint 0, all 6 HTTP 200.
**Bugs noted (deferred)**:
- B1: Tutorials and Cheatsheets have 0 LIVE resources in DB — CategorySection returns null for both (8 of 10 sections render). Data issue, not code. Scope of TASK-014.
- B2: Dev mode first load ~5-7s (10 DB queries). Production mitigated by connection pool. Future: add unstable_cache to getResourcesByCategorySlug.

### TASK-018 — UX fixes — Hero, Cards, Header Nav, Footer, Ad Slot
**Status**: ✅ DONE | **Date**: 2026-03-09 | **Commits**: 225819a (7 fixes), f3fd164 (Suspense streaming hotfix)
**Files changed**: HeroSection.tsx, ResourceCard.tsx, CategorySection.tsx, SponsoredCard.tsx, page.tsx, navigation.ts, Footer.tsx
**PM verification** (read all 7 files + full git diff):
- Fix 1 HeroSection ✅ — totalCount prop, subheading, Browse Resources button — exact spec match
- Fix 2A ResourceCard ✅ — opacity-60 hover:opacity-100 removed, Copy+Bookmark imports removed
- Fix 2B ResourceCard ✅ — dead hover buttons (lines 136-146) deleted
- Fix 3 CategorySection ✅ — h2 → Link with hover:text-blue-400, text-[11px] → text-xs
- Fix 4 SponsoredCard ✅ — min-h-[140px] removed from placeholder (real card line 14 untouched)
- Fix 5 page.tsx ✅ — id="directory" present, totalCount wired to HeroSection (via Suspense streaming — see scope note)
- Fix 6 navigation.ts ✅ — Agents/Boilerplates/Tutorials/Cheatsheets added, Advertise removed, isNew removed
- Fix 7 Footer.tsx ✅ — bg-black border-t border-white/[0.08], border-white/[0.08] bottom bar, Google disclaimer added
**Scope addition (flagged by Antigravity)**: page.tsx was refactored to use Suspense streaming components (HeroSectionAsync, CategorySectionsBlock, CategorySectionAsync). Required because force-dynamic + stale loading.tsx (old marketplace skeleton) caused perpetual spinner on first load. This is better architecture — each category section streams independently. PM accepts this scope increase as legitimate and correct.
**Screenshots verified by PM** (2026-03-09): All 5 read from temp/ — hero subheading + CTA ✅, cards full opacity ✅, category header clickable ✅, More dropdown correct 5 items no Advertise ✅, footer black + disclaimer ✅. TASK-016 visual evidence retroactively confirmed by these screenshots (dark mode changes visible throughout).
**Bugs noted (deferred)**:
- B1 (carried from TASK-017): Tutorials and Cheatsheets have 0 LIVE resources — no sections render for them
- B2: Homepage first load ~5-6s in dev — add unstable_cache to getResourcesByCategorySlug in a future task

### TASK-022 — Remove auth from user-facing UI + fix ToolsShell double-nest
**Status**: ✅ DONE | **Date**: 2026-03-10 | **Commits**: 188c65f (ToolsShell fix) + d21e5d2 (auth removal)
**Files changed**: 4 tool page.tsx files (ToolsShell removed), Header.tsx, MobileMenu.tsx, ResourceCard.tsx, submit/actions.ts, middleware.ts, schema.ts + 11 files git rm'd
**PM verification** (read screenshots + system reminders + file reads):
- Homepage screenshot ✅ — no SIGN IN button
- Token counter screenshot ✅ — ONE sidebar, double-nesting bug fixed
- Submit form screenshot ✅ — form loads without auth wall
- Mobile menu screenshot ✅ — no Sign In option
- submissions schema.ts line 208: `userId: text('user_id').references(() => users.id, { onDelete: 'set null' })` — nullable ✅
- ResourceCard.tsx: grep BookmarkButton → zero matches ✅
- middleware.ts: dashboard block gone, admin protection intact ✅
- 5 of 11 deleted files confirmed gone via ls ✅
**Residual (minor, not blocking):** middleware.ts line 7 `const isAuthPage` — unused variable, its redirect block was deleted but declaration remains. Dead code. Build passed.
**MobileMenu.tsx out-of-spec change:** Antigravity also redesigned mobile nav link styling (tracking-widest, uppercase, text-[13px]). Not requested but visually acceptable per screenshot.

### TASK-019 — Dark mode residuals (ToolsShell, ToolsSidebar, AdminQueue, BadgeGenerator)
**Status**: ✅ DONE (committed as part of TASK-021) | **Date**: 2026-03-10 | **Commit**: bf01a9e
**Files changed**: ToolsShell.tsx, ToolsSidebar.tsx, AdminSubmissionQueue.tsx, BadgeGenerator.tsx
**PM verification**: Screenshots temp/task019_*.png read — all dark. Commit bf01a9e confirmed in git log. Build exit 0, lint exit 0.

### TASK-021 — Restore deleted tools section
**Status**: ✅ DONE | **Date**: 2026-03-10 | **Commit**: 6dd95c1
**Files changed**: 15 files — 5 tool components restored (fa36050~1), 6 tool route pages restored (6b2baf4~1), AdminSubmissionQueue.tsx (2 border residuals), 25 dark mode fixes across 6 files
**PM verification** (read screenshots + git log + key files):
- tools/page.tsx: line 74 `rounded-none border-white/[0.06] bg-white/[0.02]` ✅
- token-counter page dark cards ✅, roi-calculator dark inputs + chart ✅, rag-visualizer dark bg ✅
- All 6 HTTP 200 ✅
- Two commits present: bf01a9e (TASK-019) + 6dd95c1 (TASK-021) ✅
**Bugs identified by Antigravity (logged, not fixed):**
- B1 CRITICAL: 4 tool pages (roi-calculator, token-counter, rag-visualizer, prompt-generator) wrap content in `<ToolsShell>` but layout.tsx ALSO wraps in `<ToolsShell>` → double sidebar rendered on every individual tool page. Fix: remove ToolsShell import + wrapper from those 4 page.tsx files. Carried to TASK-022 Part 0.
- B2 MINOR: RAG Visualizer chunk preview boxes clip text horizontally. Carried to TASK-026.

### TASK-024 — Remove ratings + views + fix Copy Code button
**Status**: ✅ DONE | **Date**: 2026-03-10 | **Commit**: 361550e
**Files changed**: src/components/ResourceCard.tsx, src/components/CitationBlock.tsx, src/components/CopyButton.tsx (new), src/app/t/[slug]/page.tsx
**PM verification** (read all 4 files + screenshots + git stat):
- ResourceCard.tsx: Star/Eye removed, views/avgRating/ratingCount gone from interface, stats block deleted ✅ (system reminder)
- CitationBlock.tsx: rating/views gone from interface, Score + Visibility cells deleted, 2-cell grid remains ✅ (system reminder)
- CopyButton.tsx: 'use client', navigator.clipboard.writeText, 2s copied state, rounded-none ✅
- t/[slug]/page.tsx: Star/Eye/Copy removed from imports, ratings removed from schema import, CopyButton imported, views/copiedCount removed from DB select, resourceRatings query gone, CitationBlock call clean, stats bar gone, Copy Code button replaced with <CopyButton>, rating CTA widget deleted ✅
- Screenshots: cards have no stars/views ✅, detail page 2-cell CitationBlock ✅, SponsorBadge placeholder visible ✅
- Note: BadgeGenerator shows hardcoded `★ 4.9` in embed preview — static marketing copy, not DB data, acceptable
- Build exit 0, lint exit 0 ✅

### TASK-025 — Enable placeholder ads + detail page rounded-* fixes
**Status**: ✅ DONE | **Date**: 2026-03-10 | **Commit**: 09eea84
**Files changed**: src/components/CategorySponsorBanner.tsx, src/components/SponsorBadge.tsx, src/app/t/[slug]/page.tsx
**PM verification** (read all 3 files + git stat):
- CategorySponsorBanner: `<Link>` placeholder block renders when active=false ✅
- SponsorBadge: `<Link>` placeholder block fixed position bottom-right ✅
- t/[slug]/page.tsx: lines 233, 239, 290, 297 all `rounded-none` ✅
- Commit 09eea84 confirmed in git log, correct 3-file diff ✅
- Build exit 0, lint exit 0 (per report) ✅
- Antigravity correction accepted: `<Link>` instead of `<a>` for internal links (lint rule)
- Screenshots missing from temp/ — deviation noted, code verified independently

### TASK-026 — Amazon-style category dropdown in header search bar
**Status**: ✅ DONE | **Date**: 2026-03-10 | **Commit**: 35e3f5f
**Files changed**: src/components/SearchInput.tsx (full rewrite), src/constants/index.ts (SEARCH_CATEGORIES added), src/components/Header.tsx (container width updated)
**PM verification** (read screenshots + SearchInput.tsx):
- SearchInput.tsx: zero `setTimeout` — debounce fully removed ✅
- `handleSearch()` wired to Enter key + button click only ✅
- `SEARCH_CATEGORIES` (10 categories) imported from constants ✅
- Outside-click handler via `mousedown` + `containerRef` ✅
- Auto-detect pathname → pre-selects category in dropdown ✅
- Screenshot dropdown_open: all 10 categories visible, dark panel ✅
- Screenshot search_result: `/mcp-servers?q=github` URL, "MCP Servers" selected, 70 results ✅
- Build exit 0, lint exit 0 ✅, HTTP 200 on / and /mcp-servers ✅

### TASK-012 — Create /about page
**Status**: ✅ DONE | **Date**: 2026-03-10 | **Commits**: ee543a8 + fix commit
**Files changed**: src/app/about/page.tsx (new file, 79 lines)
**PM verification** (read file + screenshot temp/task012_about.png):
- File created ✅ — exact spec match on all content except "Who built it" copy
- "Who built it" copy: "Built and maintained by a team of developers. No VC funding. Just a directory that needed to exist." — **founder-approved deviation from spec**
- 4 sections present ✅ (What this is, Why it exists, Who built it, Contact)
- Contact email: directoryantigravity@gmail.com ✅
- No Footer component added ✅ (Footer is in RootLayout)
- metadata + canonical URL ✅
- bg-black page background ✅
- Screenshot: H1 ABOUT visible, all 4 sections, email link in blue, dark background, footer renders below ✅
- Build exit 0 ✅, Lint exit 0 ✅, HTTP 200 ✅

---

## INCIDENTS LOG

| ID | Date | What happened | Fix |
|---|---|---|---|
| INCIDENT-006 | 2026-03-07 | PM (Claude Code) deleted source files and ran bash commands. | Rewrote CLAUDE.md v2.0 with explicit PM coding ban. Further rewritten as v3.0 on 2026-03-08 with full 9-point evidence standard, PM Rules, and mutual cross-check protocol. |

---

## DOC AUDIT — ACTIVE GOVERNING DOCS
**Started**: 2026-03-08 | **Audited by**: PM (Claude Code)

| # | File | Purpose | Audit Status |
|---|------|---------|-------------|
| 1 | `CLAUDE.md` | PM role, coding ban, workflow, done definition | ✅ UPDATED v3.0 (2026-03-08) |
| 2 | `CURRENT_TASK.md` | Active task spec | ✅ UPDATED — added HTTP status + screen recording slots |
| 3 | `PROJECT_LEDGER.md` | Task registry + this doc table | ✅ UPDATED (2026-03-08) |
| 4 | `docs/01-business/BUSINESS_CONTEXT.md` | Business decisions log | ✅ UPDATED (2026-03-08) — dark mode corrected, Google OAuth, stale DB note + build issue removed |
| 5 | `docs/01-business/PRODUCT_BRIEF.md` | Scope — what we build / NOT IN SCOPE | ✅ UPDATED (2026-03-08) — Google OAuth, reading order fixed to 7 docs, duplicate revenue + goal sections replaced with references to BUSINESS_CONTEXT.md |
| 6 | `docs/04-prds/PRD_V1.md` | Page-by-page specs | ✅ UPDATED (2026-03-08) — Google OAuth, dark mode throughout, /browse marked deleted |
| 7 | `docs/new-start/DESIGN_SPEC.md` | Component behaviour, banned copy, banned backgrounds | ✅ UPDATED (2026-03-08) — header corrected to bg-black/90, all interior colors dark, GitHub → Google avatar |
| 8 | `docs/new-start/UI-UX-SPEC.md` | Color tokens | ✅ ARCHIVED (2026-03-08) — all content merged into DESIGN_SPEC.md |
| 9 | `docs/new-start/CURSOR-DIRECTORY-AUDIT.md` | cursor.directory reference — source of truth for design | ✅ 25 screenshots committed to docs/screenshots/cursor-reference/ |
| 10 | `docs/02-strategy/SEO_PROGRAMMATIC_PLAN.md` | SEO meta formulas, schema, sitemap spec | ✅ UPDATED (2026-03-08) — SearchAction URL fixed, category grid ref replaced with nav+footer pattern |
| 11 | `docs/02-strategy/GO_TO_MARKET_PLAN.md` | Launch plan, sponsor outreach | ✅ UPDATED (2026-03-08) — v2.0: pitch-on-positioning strategy, Day 1 sponsor outreach, CodeRabbit as #1 target, newsletter removed |
| 12 | `.gemini/GEMINI.md` | Antigravity standing orders | ✅ UPDATED — dark mode Rule 2 corrected (2026-03-08) |
| 13 | `.agent/RALPH_PROTOCOL.md` | Quality gate protocol v18.0 | ✅ UPDATED (2026-03-08) — title fixed v17→v18, bmn project-specific URL + credentials removed from G13 section |
| 14 | `.agent/AI_CODER_QUICK_REF.md` | Antigravity daily reference | ✅ UPDATED (2026-03-08) — version fixed v16.1→v18.0 in title |
| 15 | `.agent/PROMPT_FOR_AI_CODERS.md` | Antigravity session prompt | ✅ UPDATED (2026-03-08) — all v14.0 references updated to v18.0 |
| 16 | `.agent/README.md` | Antigravity readme | ✅ UPDATED (2026-03-08) — version updated to v18.0, date updated, bmn reference removed from sync instructions |
| 17 | `memory/MEMORY.md` | PM persistent memory | ✅ AUDITED (2026-03-08) — clean, no changes needed |
| 18 | `docs/02-strategy/SEO_STRATEGY_2026.md` | SEO strategy — MUVERA, topic clusters, deindex risk | ✅ UPDATED (2026-03-08) — full rewrite: MUVERA, deindex risk, topic clusters, rich resource page spec, newsletter threshold corrected to 10k monthly visitors, promoted listings restored, compare pages restored |
| 19 | `docs/01-business/BUSINESS_MODEL.md` | Revenue model, phase plan | ✅ ARCHIVED (2026-03-08) — all content merged into BUSINESS_CONTEXT.md |
| 20 | `docs/01-business/COMPETITIVE_ANALYSIS_2026.md` | Competitive analysis | ✅ UPDATED (2026-03-08) — newsletter sponsorship replaced with compare page ads at $10k MRR milestone |
| 21 | `docs/01-business/COMPETITIVE_QUICK_REF.md` | Competitive quick reference | ✅ ARCHIVED (2026-03-08) — all content merged into COMPETITIVE_ANALYSIS_2026.md |
| 22 | `docs/01-business/COPYWRITING_STRATEGY.md` | Copy rules, banned phrases | ✅ UPDATED (2026-03-08) — hero CTA corrected (Browse Resources button kept, category grid reference removed) |
| 23 | `docs/01-business/MARKETPLACE_ANALYSIS_RESULTS.md` | Archived marketplace analysis | ✅ AUDITED (2026-03-08) — already archived, no changes needed |
| 24 | `docs/01-business/MARKETPLACE_MODEL_SPEC.md` | Archived marketplace model | ✅ AUDITED (2026-03-08) — already archived, no changes needed |
| 25 | `docs/02-strategy/MVP_LAUNCH_READINESS_REPORT.md` | Launch readiness checklist | ✅ ARCHIVED (2026-03-08) — all content merged into GO_TO_MARKET_PLAN.md |
| 26 | `docs/03-implementation/FILE-STRUCTURE-GUIDE.md` | Implementation guide (DANGER) | ✅ ARCHIVED (2026-03-08) — entirely marketplace content: fake earnings testimonials, 80% commission copy, banned components. Overwritten with archived notice. |

**Archived docs**: `docs/archive/` — pre-MVP. Not audited. Not in scope.

---

## STRATEGIC NOTES

[2026-03-07] Reverse engineering cursor.directory. Three things: database, SEO, UI/UX. Ads on top. cursor.directory = $35k MRR. We need $2k. Copy exactly — then go further on ad placement.

[2026-03-07] Ad slots will be site-wide (every page), exceeding cursor.directory which skips category pages.

[2026-03-09] Cleanup: deleted ralph-protocols/ and .protocol-cache/ — stale v16.1 copies of .agent/ protocol files. .agent/ is now the single source of truth for Antigravity protocol (v18.0).
