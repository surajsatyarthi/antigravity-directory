# PRODUCT BRIEF — googleantigravity.directory
**Version**: 1.0 — LOCKED
**Date**: 2026-03-07
**Author**: PM (Claude Code)
**Status**: APPROVED — load this before every build session

---

## MANDATORY READING ORDER FOR EVERY AI SESSION

1. `docs/01-business/BUSINESS_CONTEXT.md` — decisions log (load first, always)
2. **This file** — what we are building and for whom
3. `docs/04-prds/PRD_V1.md` — exact feature spec
4. `docs/new-start/DESIGN_SPEC.md` — component behaviour, banned copy, banned backgrounds
5. `docs/new-start/UI-UX-SPEC.md` — design system / color tokens
6. `docs/02-strategy/SEO_PROGRAMMATIC_PLAN.md` — meta formulas, schema, sitemap
7. `docs/02-strategy/GO_TO_MARKET_PLAN.md` — launch plan, sponsor outreach

---

## THE ONE GOAL

**$2,000 MRR AS FAST AS POSSIBLE.**

Path: one site-wide sponsor at $2,000/month. That is all we need. Everything else is noise until we hit this number.

---

## 1. WHAT ARE WE BUILDING

**googleantigravity.directory** is a free, searchable directory of resources for Google Antigravity IDE.

It is the **cursor.directory for Antigravity**. cursor.directory is a free resource directory that makes $35k/month from ads and promoted listings. We replicate that model for the Antigravity ecosystem.

### One sentence
> A free directory where Antigravity developers find MCP servers, Skills, Rules, Prompts, Agents, Workflows, Boilerplates, Troubleshooting guides, Tutorials, and Cheatsheets — all in one place.

### What it is NOT
- NOT a marketplace (no user-to-user transactions)
- NOT a creator monetisation platform (no earnings, no payouts)
- NOT a tool that charges end users anything
- NOT multi-IDE (Antigravity only)
- NOT a social network (no following, no feeds)

---

## 2. WHO IS IT FOR

### Primary user — The Antigravity Developer

**Name**: Ravi (representative persona)
**Role**: Software engineer, recently adopted Antigravity IDE
**Goal**: Find the best MCP servers, rules, and skills for his specific stack (Next.js, Python, Postgres) without manually searching GitHub READMEs
**Frustration**: Resources are scattered across GitHub, Discord, Reddit — no single authoritative source
**Job to be done**: "When I start a new project in Antigravity, I need to find the right tools and configurations fast so I don't waste setup time."
**Behaviour**: Searches by category or stack, copies a rule or installs an MCP, leaves. Returns when starting a new project.
**Pays us**: Nothing. Ever.

### Secondary user — The Resource Creator / Company

**Name**: Alex (representative persona)
**Role**: Developer who built an MCP server or tool for Antigravity
**Goal**: Get their tool discovered by Antigravity developers
**Job to be done**: "I built something useful for Antigravity users. I need to list it where they'll find it."
**Behaviour**: Submits a listing via the free submit form. May pay to promote it.
**Pays us**: Optional — promoted listing fee ($99–$299/month)

### Revenue user — The B2B Sponsor / Advertiser

**Name**: Company that sells to developers (dev tools, cloud platforms, AI APIs)
**Goal**: Reach Antigravity developers at the moment they're building
**Job to be done**: "I want to put my product in front of 10k+ Antigravity developers without spending on broad ads."
**Behaviour**: Contacts us via the Advertise page. Pays monthly for ad placement.
**Pays us**: $300–$2,000/month for ad slots

---

## 3. WHY THIS EXISTS (THE PROBLEM)

Google Antigravity IDE launched November 2025. Search interest grew 2,000–5,000% in Q1 2026. There are already 3,000+ community-built resources (MCP servers, rules, prompts, skills) scattered across GitHub, Reddit, and Discord.

There is no single place to find them.

The two existing attempts (antigravity.codes, antigravityai.directory) are dark, cluttered, unmaintained, and have zero monetisation. Neither has Skills — our exclusive category.

cursor.directory solved this exact problem for Cursor IDE users. It now makes $35k/month. Pontus built v1 in 3 hours.

We are doing the same for Antigravity, two years earlier in its lifecycle.

---

## 4. HOW WE MAKE MONEY

→ See `docs/01-business/BUSINESS_CONTEXT.md` — REVENUE MODEL section. Single source of truth for all pricing and revenue streams.

---

## 5. WHAT SUCCESS LOOKS LIKE

### Launch (Day 0)
- Site is live at googleantigravity.directory
- All 10 categories browsable
- 3,116 resources visible and searchable
- Submit form works (free, no payment)
- Advertise page has correct B2B pricing and a contact form
- **All 3 ad slots are live with placeholder ads** — realistic mockups, not blank spaces
- No marketplace UI anywhere on the site
- Build passes with zero errors

### Month 1
- First inbound sponsor enquiry
- 1,000+ monthly organic visitors
- Submitted to Google Search Console

### Month 2–3
- $2,000 MRR
- 5,000+ monthly organic visitors

---

## 6. V1 SCOPE — EXACTLY THIS, NOTHING MORE

### In scope
- Homepage with hero, resource listing (all categories)
- **3 placeholder ad slots** (built and visible at launch — realistic mockups):
  - Homepage banner slot (below header)
  - Category page sponsor slot (top of each category page)
  - Site-wide sponsor badge (fixed bottom-right, persists on scroll)
- Browse page with search, filter by category, sort
- 10 category pages (`/mcp-servers`, `/skills`, `/rules`, `/prompts`, `/agents`, `/workflows`, `/boilerplates`, `/troubleshooting`, `/tutorials`, `/cheatsheets`)
- Resource detail page (`/t/[slug]`)
- Submit form (free, no payment, no tier selection)
- Advertise page (B2B contact form with pricing info, no checkout)
- About page (simple, who we are)
- Auth (Google OAuth — required for submit only)
- Admin submission review queue (internal, not user-facing)
- Sitemap and robots.txt
- Basic SEO meta per page

### NOT in scope for v1 — DO NOT BUILD
- Any payment processing (Razorpay, PayPal, Stripe)
- Resource claiming or ownership
- Creator earnings, sales dashboards, payout flows
- BuyButton, CheckoutOverlay, ClaimButton, ClaimModal
- ResourcePricingForm
- Marketplace pricing tiers on submit form
- Admin payout approval queue
- Creator testimonials about earnings
- Members / social profiles beyond basic auth
- Comparison pages (`/vs/[slug]`)
- Tools section (ROI calculator, token counter, etc.)
- Job board
- Newsletter (not building)
- Discord / social media links (we have none)

---

## 7. THE ONE METRIC THAT MATTERS

→ See `docs/01-business/BUSINESS_CONTEXT.md` — THE ONE GOAL section. Single source of truth.
