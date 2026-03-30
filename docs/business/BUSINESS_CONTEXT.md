# BUSINESS CONTEXT — googleantigravity.directory
## Running Log of Strategic Decisions & Discussions

**⚠️ LOAD THIS FILE AT THE START OF EVERY SESSION — NO EXCEPTIONS**
**This is the memory of all business decisions made. Never ask the founder to repeat context covered here.**

## RULES FOR THIS DOCUMENT (AI must follow — no exceptions)

1. **Load first** — read before responding to anything
2. **Update after every major decision** — add to KEY STRATEGIC DECISIONS LOG with date + reasoning
3. **Only strategic content** — no implementation details, no code, no task lists, no Ralph gates
4. **No speculation** — only write what the founder has explicitly confirmed
5. **Founder overrides everything** — if founder contradicts this doc, update immediately
6. **Keep it tight** — bullet points and tables only, no waffle

---

## THE ONE GOAL

**$50,000 MRR MINIMUM. 20-YEAR BUSINESS. (Updated 2026-03-30)**

Immediate milestone: $2,000 MRR — one site-wide sponsor at $2,000/month.
Ultimate target: $50,000 MRR. This is a long-term business, not a side project.

---

## WHO WE ARE (LOCKED — 2026-03-07)

**googleantigravity.directory** is the **cursor.directory for Google Antigravity IDE.**

A free, community-driven directory of Antigravity resources. We make money from ads and promoted listings — exactly how cursor.directory makes $35k/month.

---

## THE FOUNDER

- Solo founder, based in India
- Goal: quit job ASAP — needs $10,000 MRR
- Immediate target: **$2,000 MRR**
- Limited time, limited budget
- Communication style: direct, no bullshit, thinks like a startup founder
- Gets frustrated when AI loses context and asks him to repeat himself

---

## THE PRODUCT

| | |
|---|---|
| URL | googleantigravity.directory |
| Type | Free resource directory (NOT a marketplace) |
| Stack | Next.js 15, TypeScript, Tailwind, shadcn/ui, Supabase, Drizzle ORM |
| Auth | Google OAuth (NextAuth) |
| Payments | **NONE** — we are free, no transactions |
| Deployment | Vercel |
| Branch | feat/ui-cursor-patterns (active) |

---

## REVENUE MODEL (LOCKED — 2026-03-07)

**Free to browse. Free to submit a listing. Money comes from B2B, not users.**

### Stream 1 — Display Ads (Day 1)
| Placement | Price |
|---|---|
| Homepage banner | $800–$1,500/month |
| Category page sponsor | $300–$500/month |
| Resource page inline (3,116 pages) | $200–$400/month |
| Site-wide sponsor badge (CodeRabbit-style, fixed bottom-right) | $1,500–$2,000/month |

### Stream 2 — Promoted Listings (Day 1)
| Product | Price |
|---|---|
| Featured MCP/Skill slot (homepage carousel) | $299/month |
| Featured placement (top of category) | $199/month |
| Promoted card (highlighted in results) | $99/month |

⚠️ **Promoted listing prices are provisional.** Set on 2026-03-07 without traffic data. Review and finalise when site reaches 1,000 monthly visitors and Google Search Console data is available.

### Stream 3 — Job Board (Phase 2, after $3k MRR)
$99–$299 per listing

**Path to $2k MRR:** One site-wide sponsor at $2,000/month. That's it.

---

## WHAT WE ARE NOT (LOCKED — NEVER REVISIT UNLESS FOUNDER SAYS SO)

- ❌ NOT a marketplace (no user-to-user transactions)
- ❌ NO payments from end users
- ❌ NO resource claiming system
- ❌ NO creator earnings or payouts
- ❌ NO Razorpay, NO PayPal, NO Stripe
- ❌ NOT multi-IDE (Antigravity-only)
- ✅ Twitter/X: https://x.com/AntigravityIDE (created 2026-03-13)
- ✅ Reddit account: created 2026-03-13

---

## THE 10 CATEGORIES (LOCKED — DO NOT CHANGE)

1. MCP Servers → `/mcp-servers`
2. Skills → `/skills`
3. Rules → `/rules`
4. Prompts → `/prompts`
5. Agents → `/agents`
6. Workflows → `/workflows`
7. Boilerplates → `/boilerplates`
8. Troubleshooting → `/troubleshooting`
9. Tutorials → `/tutorials`
10. Cheatsheets → `/cheatsheets`

---

## COMPETITORS (ACTUAL — NOT cursor.directory)

| Competitor | What they have | Their weakness |
|---|---|---|
| **antigravity.codes** | ~1,669 indexed URLs: 1,071 agent skills, 293 rules, 98 workflows, 154 blog posts | Dark cluttered design, GoDaddy ads, no Skills category |
| **antigravityai.directory** | ~1,899 indexed URLs: 1,085 MCPs, 730 prompts, 51 blog posts | Framework-organised prompts, multi-lingual, no monetisation |

Full competitive intelligence: `docs/strategy/COMPETITOR_RESEARCH_2026.md` — do not re-run this research.

**cursor.directory is our BLUEPRINT, not a competitor.** They serve Cursor IDE users. We serve Antigravity IDE users. Different ecosystems.

cursor.directory makes $35k/month from a free directory. Pontus built it in 3 hours. That's our proof of concept.

**COMPETITOR RESEARCH IS FOR CONTENT GAPS ONLY.**
Use competitor data to answer: "what resources do they have that we are missing?"
Never use it to drive URL structure, page design, copy, or SEO strategy.
All structural and strategic decisions must be justified by first principles — SEO best practices, user intent, conversion fundamentals. Not by what a competitor happens to do.

---

## CURRENT DB STATE

- **3,116 total resources** in database
- MCP Servers: 2,033 | Workflows: 220 | Prompts: 117 | Agents: 104 | Rules: 45 | Boilerplates: 64 | others: ~573
- More resources than both competitors combined
- All 10 categories remapped — DONE (TASK-007)

---

## DESIGN DIRECTION (LOCKED)

- **Dark mode only** — `bg-black` pages, `bg-white/[0.03]` cards
- **cursor.directory aesthetic** — cards at 60% opacity → 100% on hover, action buttons revealed on hover
- Reference spec: `docs/design/DESIGN_SPEC.md` (UI-UX-SPEC.md merged in — archived)
- Reference audit: `docs/design/CURSOR-DIRECTORY-AUDIT.md`
- Font: Inter + JetBrains Mono
- Currently implementing on branch: `feat/ui-cursor-patterns`

---

## KNOWN BUILD ISSUES

None. All resolved.
*(tsconfig.json exclude fixed — TASK-001, 2026-03-07)*

---

## GOOGLE WORKSPACE CLI — CONTENT OPPORTUNITY (2026-03-07)

Google launched `googleworkspace/cli` on March 6, 2026.
Ships **100+ Agent Skills (SKILL.md files)** — the exact format Antigravity IDE uses.
These are open source, Google-authored Skills we can ingest into our Skills category immediately.
This is a first-mover content opportunity — nobody else has catalogued these yet.
Repo: https://github.com/googleworkspace/cli

---

## PHASE PLAN

| Phase | Trigger | Goal |
|---|---|---|
| **Phase 1 — Launch** | Now | Ship directory, $2k MRR from ads/promoted |
| **Phase 2 — Growth** | At $3–5k MRR | Job board |
| **Phase 3 — Marketplace** | At $5k+ MRR | Optionally add marketplace OR launch separate site |

---

## KEY STRATEGIC DECISIONS LOG

### 2026-03-30 — Antigravity Market Pulse (UPDATE REGULARLY)
**Situation**: Token quota crisis hit mid-March 2026 with v1.20.5. Pro users ($20/month) saw 97%+ quota reduction overnight. Ultra ($250/month) also affected. 7-10 day lockouts. Forum threads at 16K+ views. Users calling it a "paperweight." Exodus to Cursor accelerating. Market: Cursor 18%, Claude Code 10%, Windsurf 5%.
**Google's position**: Has NOT officially acknowledged or fixed. But spent $2.4B on Windsurf acquisition — not walking away. This is a monetisation problem, not a product failure.
**Strategic implication**: First-mover SEO thesis still holds — Google will fix this. Meanwhile the quota crisis = immediate content opportunity. Zero-competition queries: "antigravity quota fix", "antigravity token limit", "antigravity alternatives". Write troubleshooting content NOW to capture frustrated users and convert them to regular visitors.
**New sponsor target**: Cursor — actively trying to capture frustrated Antigravity users. They are our audience.

### 2026-03-30 — SEO First-Mover Thesis (CRITICAL — do not lose this)
**Decision**: Our entire SEO strategy is built on owning Antigravity keywords NOW while competition is zero, before Google's marketing machine pushes search volumes to massive scale.
**The thesis**: Google Antigravity launched Nov 2025. Currently 500K searches/month. Google is a trillion-dollar company actively promoting this product. As they push it — the same way they push Gmail, Google Maps, Android — "google antigravity", "antigravity ide" and all related keywords will scale to Claude Code-level volumes (5M+) or beyond. We will already own top rankings because we were there first.
**What this means**: Do NOT chase other products' keywords (Claude Code, Cursor, etc.). Plant flags on EVERY Antigravity-specific keyword NOW. Each page we rank today becomes a permanent asset when volume surges. Waiting = losing ground to competitors who will appear once Google's promotion kicks in.
**Discussed**: Three times with founder. Never lose this context.

### 2026-03-07 — Major Pivot: Directory not Marketplace
**Decision**: Pivot from marketplace (creator earnings, Razorpay, claiming) to free directory + ads/promoted listings.
**Reason**: Limited budget and time. Directory is faster to launch, easier to maintain, proven model (cursor.directory). Marketplace can be added later or as a separate site once audience is proven.
**Founder's words**: "directory is easy to build and once we get results from SCO it is easy to maintain due to my limited budget and limited time"

### 2026-03-07 — Revenue from Day 1
**Decision**: Ads + promoted listings from day 1. Not after launch — from day 1.
**Reason**: Competitors charge for promoted listings. No reason to leave that revenue on the table.
**Founder's words**: "my competitors do charge for listing products why shouldn't we or at least why shouldn't we charge for promoting those products"

### 2026-03-07 — cursor.directory is blueprint not competitor
**Decision**: cursor.directory serves Cursor IDE users. We serve Antigravity IDE users. They are our model, not someone we compete against.
**Context**: Earlier competitive analysis incorrectly listed cursor.directory as a competitor.

### 2026-03-07 — $2,000 MRR as immediate target
**Decision**: Focus everything on hitting $2k MRR as fast as possible.
**Path**: One site-wide sponsor at $2k/month or 3–4 smaller slots.

### 2026-03-07 — Marketplace code is legacy
**Decision**: All marketplace code (ENTRY-008 through ENTRY-019) is built but considered legacy. Do not build on it. Do not expose it in the UI.
**Payments**: Razorpay, PayPal — removed from scope entirely.

### 2026-03-07 — Placeholder ads at launch
**Decision**: Launch the site with placeholder/mockup ads in all ad slots before any real sponsor is confirmed.
**Reason**: Site looks established from day one. Sponsors can see exactly what they are buying. Reduces friction in the sales conversation — showing beats telling.
**What this means for build**: Every ad slot (homepage banner, category sponsor, site-wide badge) must be built and visible at launch, populated with a realistic placeholder. Not "Your ad here" — a proper mockup that looks like a real ad.
**Outreach starts after launch**, not before. Get the site live first.

### 2026-03-08 — Homepage layout + card corner decisions (LOCKED)
**Decisions** (founder, 2026-03-08):
1. **Footer**: keep — `bg-slate-900`, 3 columns
2. **Hero with CTA**: keep — H1 + subheading + "Browse Resources" button
3. **Category grid on homepage**: REMOVED — no CategoryGridDiscovery on homepage. Categories accessible via nav and footer only.
4. **Card corners**: `rounded-none` — sharp 90-degree corners, matching cursor.directory exactly. All cards site-wide.
**Reference screenshots**: `docs/screenshots/cursor-reference/` — 25 cursor.directory screenshots committed.

### 2026-03-13 — Social accounts created
**Twitter/X**: https://x.com/AntigravityIDE
**Reddit**: account created (handle TBC)
**What this unblocks**: Day 1 GTM actions — launch post on Reddit (r/AntigravityIDE, r/cursor), Twitter announcement, Google AI Developers Forum post.

### 2026-03-13 — Development phase declared COMPLETE. Phase 2 begins.
**Decision**: Founder has officially closed the development phase. No new feature development until $2k MRR is hit.
**Phase 2 focus**: Sponsor outreach, SEO compounding, marketing (Reddit, HN, creator outreach), data enrichment.
**What this means**: No new code tasks unless directly required by a sponsor deal or a blocking SEO issue. All effort redirects to distribution and revenue.

### 2026-03-08 — Promoted listing prices confirmed provisional
**Decision**: $99–$299 promoted listing prices are provisional starting points, not final prices.
**Reason**: Set before any traffic data exists. Real pricing requires knowing actual monthly visitor numbers.
**Trigger to revisit**: When site reaches 1,000 monthly visitors — check Google Search Console, then set final prices.

### 2026-03-07 — Business documents rewritten
All stale marketplace-era business docs updated to reflect directory model:
- `docs/business/BUSINESS_MODEL.md` — new master doc
- `docs/business/COMPETITIVE_ANALYSIS_2026.md` — updated
- `docs/business/COMPETITIVE_QUICK_REF.md` — updated
- `docs/business/COPYWRITING_STRATEGY.md` — updated
- `docs/strategy/MVP_LAUNCH_READINESS_REPORT.md` — updated
- `docs/strategy/SEO_STRATEGY_2026.md` — updated
- `docs/business/MARKETPLACE_MODEL_SPEC.md` — archived
- `docs/business/MARKETPLACE_ANALYSIS_RESULTS.md` — archived

---

## MANDATORY DOCUMENT LOAD ORDER (every session, no exceptions)

1. `docs/business/BUSINESS_CONTEXT.md` ← this file, always first
2. `docs/business/PRODUCT_BRIEF.md` ← what we are building, who for, what is NOT in scope
3. `docs/prds/PRD_V1.md` ← exact page specs, feature list, NOT IN SCOPE list
4. `docs/design/DESIGN_SPEC.md` ← exact component behaviour, banned copy, banned backgrounds
5. `docs/strategy/SEO_PROGRAMMATIC_PLAN.md` ← meta formulas, schema, sitemap, programmatic SEO
6. `docs/strategy/GO_TO_MARKET_PLAN.md` ← launch plan, sponsor outreach, week-by-week actions

---

---
*For AI instructions and workflow protocols, see `CLAUDE.md` (PM) and `.gemini/GEMINI.md` (Antigravity).*
