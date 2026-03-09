# PROJECT LEDGER — googleantigravity.directory
**Maintained by**: Claude Code (PM)
**Last updated**: 2026-03-08
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
| TASK-016 | Dark mode fix — cards, header, nav, search, mobile menu | 🔴 CURRENT | Entire site was light mode on dark background |
| TASK-017 | Homepage layout revamp — 5 resources per category, cursor.directory pattern | ⏳ PENDING — spec ready at docs/TASK-017-SPEC.md | UX + SEO |
| TASK-012 | Create /about page | ⏳ PENDING | Credibility |
| TASK-014 | Ingest Google Workspace CLI Skills | ⏳ PENDING | Content + SEO |

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
**Status**: 🔴 IN PROGRESS | **Date**: 2026-03-08

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
