# Product Requirements Document
# googleantigravity.directory

**Version:** 2.0 (Post-Research Final)
**Date:** 2026-03-02
**Owner:** Suraj Satyarthi
**Status:** APPROVED — build starts now

---

## THE MISSION (READ THIS FIRST)

THE SOLE PURPOSE OF THIS PROJECT IS TO GENERATE $10,000 MRR AS FAST AS POSSIBLE SO THE FOUNDER CAN QUIT HIS JOB.

EVERY DECISION — DESIGN, FEATURE, TECHNOLOGY — IS JUDGED AGAINST ONE QUESTION: DOES THIS HELP US GET TO $10K MRR FASTER?

IF IT DOES NOT, IT DOES NOT GET BUILT.

---

## LEGAL CONSTRAINT (NON-NEGOTIABLE)

DO NOT LIST, DISPLAY, OR MONETISE ANY RESOURCE THAT VIOLATES ITS ORIGINAL LICENSE.

All resources are publicly available on GitHub under open-source licenses. The directory links to them and displays their public metadata. This is legally the same as Google indexing a webpage. No resource files are hosted. No content is copied beyond what GitHub's public API provides.

---

## What We Are Building

**The cursor.directory for Google Antigravity IDE.**

Google Antigravity is a new AI-powered IDE released November 2025. It is 4 months old. There is no dedicated community resource hub for it yet. We are building that hub before anyone else does.

Developers using Antigravity need:
- Antigravity rules (coding standards and behaviour configs)
- Skills (domain-specific prompt packs)
- MCP server configurations tested with Antigravity
- Boilerplates pre-configured for Antigravity workflows

Right now they search GitHub, Reddit, and random blog posts. There is no single trusted place. We are that place.

---

## Validated Research Summary

Two independent first-principles research reports completed before writing this PRD.

| Question | Finding |
|----------|---------|
| Will developers pay for rules/configs? | NO — open-source culture, pricing power does not exist |
| Is there demand for a free Antigravity directory? | YES — 176K weekly Reddit visitors, 4 competitors exist but NONE monetising |
| Does sponsorship revenue work for this model? | YES — cursor.directory proved $35K/month from sponsorships alone |
| Is there a first-mover opportunity? | YES — Antigravity is 4 months old, window is open now |

**Conclusion:** Free directory + sponsorship revenue is the validated model. Commission marketplace is deferred to Phase 2 experiment (month 4-6) after traffic is established.

---

## Competitive Position

Competitive audit completed 2026-03-02. Four active Antigravity-specific directories exist. **None are monetising.**

| Platform | IDE focus | Content | Sponsor revenue | Weakness |
|----------|-----------|---------|-----------------|----------|
| cursor.directory | Cursor only | Rules + MCPs | ✅ $35K/month | Not Antigravity |
| antigravityskills.org | Antigravity | Skills only (CLI) | ❌ | CLI-only, no Rules/MCPs |
| awesome-antigravity.com | Antigravity | 100 prompts | ❌ | Shallow |
| antigravityai.directory | Antigravity | Prompts + 430 MCPs | ❌ | Text walls, no search |
| antigravity.codes | Multi-IDE | 1,500+ MCPs | ❌ | Diluted, not Antigravity-native |
| **googleantigravity.directory** | **Antigravity** | **All types unified** | **✅ Phase 1** | — |

We are not first to build. We are first to monetise. We are first to unify all resource types (Rules + Skills + MCPs + Boilerplates) in one searchable hub. Sponsor revenue funds curation and SEO that free projects cannot match. The window closes when a competitor copies this model.

---

## Revenue Model

### Primary: Sponsorships (from day one)

Dev tool companies pay to reach Antigravity developers.

| Tier | Monthly price | Placement |
|------|--------------|-----------|
| Gold | $1,500 | Homepage hero + all category pages + newsletter |
| Silver | $800 | Category pages + newsletter |
| Bronze | $500 | Footer sitewide + newsletter |
| Listing | $300 | One featured resource slot |

**First 10 outreach targets:** Supabase, Railway, Resend, Clerk, Loops, Trigger.dev, Neon, Turso, Upstash, Vercel.

### Secondary: Commission marketplace (Phase 2, month 4-6)
Unlock only after 5,000+ monthly visitors AND active creator submissions. Small experiment with 5-10 creators first. Expand only if conversion data supports it.

---

## Phase 1 Scope — What Gets Built

### Must have at launch (non-negotiable)

**1. Homepage**
- Clear headline: what this site is and who it is for
- Search bar (searches resource names and descriptions)
- Category grid (Rules, Skills, MCPs, Boilerplates)
- Real resource count pulled from database — no hardcoded numbers
- Sponsor placement slot (visible even if empty at launch)
- No fake testimonials, no fake stats, no placeholder content

**2. Browse page**
- Filter by category, sort by stars / newest / popular
- Each card: name, one-line description, GitHub stars, category tag
- Pagination
- Real data only

**3. Resource detail page**
- Name, description from GitHub README (first 200 words)
- Install command with copy button
- GitHub stars, last updated, license
- Link to original GitHub repo
- Category and tags

**4. Submit page**
- Input: GitHub URL
- System auto-pulls: name, description, stars, license, install command
- Creator selects category
- Goes into manual review queue (founder approves first 100)
- No auth required to submit

**5. Advertise page**
- Sponsorship tiers with real prices
- Visual showing where placements appear
- Single CTA: email or Calendly link
- No broken payment checkout

### Explicitly NOT in Phase 1

- User accounts, login, dashboard
- Creator claiming / GitHub OAuth verification
- Paid listings / checkout / payments
- Ratings and reviews
- Newsletter send system (collect emails only)
- Job board
- Social features (follows, bookmarks)

---

## Database — Phase 1

**Keep:** users, resources, categories, tags, resource_tags, submissions, subscribers

**Ignore for Phase 1:** resource_claims, payments, purchases, creator_earnings, payout_requests, user_resource_access, jobs, tools, follows, bookmarks

---

## Technical Constraints

- **Stack:** Next.js 15, TypeScript, Supabase/PostgreSQL, Drizzle ORM, Tailwind CSS, shadcn/ui
- **Payments:** Phase 2 only. When added: Razorpay (India) + PayPal (international). Stripe is blocked in India.
- **Auth:** Not needed in Phase 1
- **Rate limiting:** Upstash Redis for POST endpoints
- **Deployment:** Vercel

---

## Non-Negotiable Code Rules

These apply to every file written for this project:

1. `NEXT_PUBLIC_IS_E2E` must not exist anywhere in the codebase
2. Test bypass headers (`x-e2e-tests-bypass-verification`, `x-e2e-tests-user-id`) must not exist anywhere
3. No hardcoded fake data — real DB counts or show nothing
4. No dynamic Tailwind class assembly (`bg-${var}-500`) — Tailwind JIT cannot see these
5. Rate limiter must use Upstash Redis — in-memory rate limiting does not work on serverless

---

## Acceptance Criteria

Verified by founder in a real browser on the live Vercel URL — not localhost, not AI-generated test output:

- [ ] Homepage loads without errors on mobile and desktop
- [ ] Browse page shows real resources with real counts
- [ ] At least one resource detail page loads with real data
- [ ] Submit form accepts a GitHub URL and queues the submission
- [ ] Advertise page shows real tiers and a working contact link
- [ ] No 500 errors on any page
- [ ] No fake stats or placeholder content visible anywhere
- [ ] Security holes (test bypass headers, NEXT_PUBLIC_IS_E2E) confirmed absent via grep

---

## Launch Sequence

| Week | Action |
|------|--------|
| 1-2 | Build Phase 1 — 5 pages |
| 3 | Founder reviews top 50 resources, writes real descriptions |
| 3 | Sponsor cold outreach begins (do not wait for launch) |
| 3 | Post to HN, Reddit, X |
| 4-6 | First sponsor signed |
| Month 2-3 | 2-3 sponsors, growing SEO traffic |
| Month 4-6 | Evaluate Phase 2 marketplace experiment |

---

## 90-Day Success Metrics

- 5,000+ monthly unique visitors
- 1 signed sponsor (any tier)
- 500+ community-submitted resources
- MRR: $500–$1,500
- Path to $10K MRR via 4+ Gold sponsors visible

---

**PRD v2.0 — 2026-03-02**
**Research basis:** Two first-principles market research reports validated this model
**Previous version:** v1.0 marketplace-first model — invalidated by research
