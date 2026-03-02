# Go-To-Market Plan
# googleantigravity.directory

**Version:** 2.0 (Post-Research Final)
**Date:** 2026-03-02
**Model:** Free directory + sponsorships (commission marketplace deferred to Phase 2)

---

## THE ONE INSIGHT THAT DRIVES EVERYTHING

cursor.directory makes $35K/month from sponsorships alone with zero paid listings.
They built for Cursor when Cursor was new. Nobody owned that category before them.

Google Antigravity IDE launched November 2025. It is 4 months old.
Four free directories already exist. Not one has a single sponsor. Not one is monetising.

**We are building the first monetised Antigravity directory — the cursor.directory equivalent
that actually generates revenue. We are not first to build. We are first to monetise.**

The monetisation window is open. Every week that passes is a week a competitor could
copy the model. Speed is the strategy.

---

## KNOWN COMPETITORS — Full Audit (Completed 2026-03-02)

Four competitors confirmed with head starts on content. None are monetising. This is our gap.

| Competitor | URL | Content | Traffic signal | Monetisation |
|------------|-----|---------|----------------|--------------|
| Antigravity Awesome Skills | antigravityskills.org | 244+ Skills (968+ in repo) | **17,800 GitHub stars** | ❌ None |
| Awesome Antigravity | awesome-antigravity.com | 100+ Prompts | 107 GitHub stars | ❌ None |
| Antigravity AI Directory | antigravityai.directory | 125+ Prompts, 430+ MCP configs | Unknown — active hub | ❌ None |
| Antigravity Codes | antigravity.codes | 1,500+ MCPs, 500+ rules/workflows | Cross-IDE traffic | ❌ None (lead gen only) |

### Their individual weaknesses we exploit on day one

**Antigravity Awesome Skills** (biggest threat by star count):
- CLI-only install (`npx antigravity-awesome-skills`) — high friction for non-terminal users
- Skills-only — no Rules (`GEMINI.md`), no MCP configs, no Boilerplates
- Zero monetisation means zero reinvestment into growth

**Awesome Antigravity** (weakest):
- Shallow — 100 basic prompts, no executable workflows or MCP integrations
- Low social proof (107 stars) — easy to overtake on content and UX

**Antigravity AI Directory** (strong on MCPs):
- Massive text walls with no search — overwhelming for new users
- No open GitHub repo — community cannot contribute directly
- No monetisation means no budget to improve

**Antigravity Codes** (cross-IDE dilution):
- Targets Cursor, Windsurf, AND Antigravity — content is generic, not Antigravity-native
- `GEMINI.md` syntax, subagent routing, browser-agent config — absent because it would alienate non-Antigravity users
- Lead gen model (email capture) misaligned with developer audience

### Our structural advantage

All four are fragmented by resource type. Users must visit multiple sites.
We aggregate everything: Rules + Skills + MCPs + Boilerplates in one searchable hub.

All four are free with no reinvestment model. We have sponsors from week 1.
That budget funds curation, SEO, and content depth that free projects cannot match.

We combine the depth of antigravityskills.org with the UX simplicity of awesome-antigravity.com —
deep professional organisation AND dead-simple one-click copy. Nobody has done both.

---

## Content Seeding — Solve Cold Start Before Day One

In AI-assisted development, building is commoditised. Anyone can clone the product in a week.
The moat is distribution: page rank, backlinks, newsletter list, sponsor relationships.
All of these compound over months. Code does not.

The first distribution problem is a cold start: nobody comes to an empty directory.
We solve this before launch by seeding from public open-source GitHub repos.
This is legally identical to Google indexing a webpage — exactly the framework in PRD v2.0.

### Content sources to import on day one

| Source | Repo | Resources available | Category |
|--------|------|---------------------|----------|
| antigravityskills.org | sickn33/antigravity-awesome-skills | 968+ skills | Skills |
| awesome-antigravity.com | ZhangYu-zjut/awesome-Antigravity | 100+ prompts | Rules / Prompts |
| Public GitHub search | query: `GEMINI.md` language:markdown | Hundreds of rules files | Rules |
| Public GitHub search | query: `antigravity MCP server` | Active community repos | MCPs |

**Target: 500+ resources in the database before any marketing begins.**

The 17,800 people who starred antigravityskills.org are already your target users.
They know what skills are, they want them, they search for them. They just need a
better discovery interface than a GitHub README.

### What "better" means against existing repos

| What they have | What we add |
|----------------|-------------|
| CLI install only (`npx antigravity-awesome-skills`) | Web UI + one-click copy |
| GitHub README flat list | Semantic search + category filter + tags |
| No context per resource | Real description + use case + install command |
| No monetisation | Sponsor placement that funds ongoing curation |
| No SEO | Indexed pages Google can rank |

**The person who starred that repo and googles "Antigravity rules for TypeScript"
should land on our page, not their README.**

---

## Phase 1 GTM: Launch (Weeks 1–4)

### Pre-Launch Checklist (Before Any Marketing)

The site must pass all acceptance criteria in PRD v2.0 first.
Do not market a broken site. One bad first impression to a sponsor kills the deal.

- [ ] All 5 pages live with no 500 errors
- [ ] Real resource counts from database — no fake numbers
- [ ] Advertise page live with real tier prices and contact link
- [ ] Email capture working on homepage
- [ ] Google Search Console: sitemap submitted
- [ ] Top 50 resources reviewed by founder — real descriptions written manually

### Sponsor Outreach (Start Week 1 — Do Not Wait for Traffic)

You are selling the trend, not the traffic. Antigravity is growing fast.
A founding sponsor buys the category before it is priced at market rate.

**Founding sponsor pitch:**
> "I'm building the first monetised resource hub for Google Antigravity IDE —
> the cursor.directory equivalent that actually generates revenue. Four free
> directories already exist but none have sponsors or a growth budget. The IDE
> launched 4 months ago with 176K weekly Reddit users and I'm aggregating
> everything — Rules, Skills, MCP configs, Boilerplates — in one searchable hub.
> Founding sponsors get 3 months at 50% off and a permanent 'Founding Sponsor'
> badge. 5 slots only. First one in owns the category before it's priced at
> market rate. Interested?"

**First 10 outreach targets:**

| Company | Why they pay | Channel |
|---------|-------------|---------|
| Supabase | Backend of choice for Antigravity devs | Twitter DM + email |
| Railway | Dev infra, matches audience exactly | Cold email |
| Resend | Email API, developer audience | Twitter DM |
| Clerk | Auth, Next.js/Antigravity overlap | Cold email |
| Loops | Email for SaaS builders | Twitter DM |
| Trigger.dev | Background jobs + AI workflows | Twitter DM |
| Neon | Serverless Postgres | Cold email |
| Turso | SQLite/edge, indie dev audience | Twitter DM |
| Upstash | Redis, in our own stack | Twitter DM |
| Vercel | Already our deployment platform | Check partner program |

**Sponsorship tiers on the advertise page:**

| Tier | Monthly price | Founding price (3 months) | Placement |
|------|-------------|--------------------------|-----------|
| Gold | $1,500 | $750 | Homepage hero + all category pages + newsletter |
| Silver | $800 | $400 | Category pages + newsletter |
| Bronze | $500 | $250 | Footer sitewide + newsletter |
| Listing | $300 | $150 | Featured resource slot |

### Launch Week — Community Posts

Post to all 5 on the same day. Engage every comment for 48 hours.

**Order of priority:**

1. **Hacker News Show HN**
   Title: "Show HN: I built the cursor.directory equivalent for Google Antigravity IDE"
   Write a real story. Be honest you're a solo founder. Share the goal.

2. **Reddit** — post to r/GoogleAntigravity (and r/aiprogramming if cross-post allowed)
   Lead with the resource count and what types are available. No hype. Just utility.

3. **Twitter/X thread**
   "Four free Antigravity directories exist. None have search. None aggregate all types.
   I built the one that does — Rules, Skills, MCP configs, Boilerplates in one place.
   [N]+ resources, free, one-click copy.
   [URL]"
   Tag the Google Antigravity team account.

4. **Product Hunt**
   Schedule Tuesday or Wednesday. Tag every sponsor you've already signed as a maker.

5. **Indie Hackers**
   Post a launch story. Share the $10K MRR goal. Show the solo founder arc.

**What NOT to do:**
- Do not post to 20 communities and ghost the comments
- Do not use a template — write personally every time
- Do not launch before the site passes every acceptance criterion in the PRD

---

## Phase 2 GTM: SEO as the Primary Moat (Months 2–3)

Building is commoditised. Any competitor can copy the product in a week.
SEO cannot be copied. A page that ranks #1 for a real search term took months to get there.
Every competitor who did not start in month 1 is months behind on this compound curve.

**Target: 3 SEO pages per week, every week, months 2–3.**

Not blog posts. Resource pages that answer real searches. Each page is a permanent
acquisition channel. Work done once, traffic for years.

### Keyword clusters to own

**Cluster 1 — Technology-specific rules (highest intent)**
- `/rules/typescript` — "Antigravity rules for TypeScript"
- `/rules/nextjs` — "Antigravity rules for Next.js"
- `/rules/python` — "Antigravity rules for Python"
- `/rules/react` — "React coding rules for Antigravity IDE"
- `/rules/golang` — "Golang rules for Google Antigravity"

**Cluster 2 — MCP configs per service (search volume from devs configuring stacks)**
- `/mcp/supabase` — "Supabase MCP server for Antigravity"
- `/mcp/github` — "GitHub MCP server Antigravity setup"
- `/mcp/stripe` — "Stripe MCP server Antigravity IDE"
- `/mcp/postgres` — "PostgreSQL MCP config for Antigravity"
- `/mcp/aws` — "AWS MCP server for Google Antigravity"

**Cluster 3 — How-to searches from new Antigravity users**
- `/guides/gemini-md-setup` — "How to configure GEMINI.md for Antigravity"
- `/guides/subagent-routing` — "Antigravity subagent routing configuration"
- `/guides/browser-agent-setup` — "Antigravity browser agent how to set up"
- `/skills/code-review` — "Code review skill for Antigravity IDE"

**Cluster 4 — Comparison searches (steal competitor traffic)**
- `/vs/cursor` — "Antigravity IDE vs Cursor — resources and rules"
- `/vs/windsurf` — "Antigravity vs Windsurf IDE migration guide"

### How to outrank the existing GitHub READMEs

The 17,800-star GitHub repo ranks for some of these terms already. Beat it by:
- Giving each individual resource its own indexed URL (READMEs are one flat page)
- FAQ sections targeting "People Also Ask" boxes Google shows above organic results
- Internal links between related resources (rules → MCPs that support that stack)
- Structured data markup (Google can parse and show resource metadata in results)
- Real descriptions, not GitHub-scraped summaries — written by a human, genuinely useful

### What each SEO page must contain

- 200+ words of real content (not AI filler — actually useful to a developer)
- The resource with real install command or copy-paste config
- FAQ section: 3–5 questions a developer would actually search for
- Internal links to at least 2 related resources in other categories
- Link back to the category page it belongs to

---

## Phase 3 GTM: Creator Activation (Months 4–6)

By month 4: traffic established, 1-2 sponsors paying, creator submissions coming in.

Only then test the commission marketplace. Not before.

**Creator outreach template (warm — their resource is already listed):**
> "Hey [name], your [tool name] is already listed on googleantigravity.directory
> and has had [X] views this month. We're opening paid listings — claim it and
> set a price if you want. 80% goes to you. Takes 5 minutes. Want the link?"

This is not cold outreach. You are telling them their work is already being seen.

**Only activate Phase 3 if:**
- 5,000+ monthly visitors confirmed in analytics
- At least 10 creator submissions per week coming in organically
- 1+ sponsors already paying (proof the model works)

---

## Revenue Targets

| Month | Revenue source | Target MRR |
|-------|---------------|------------|
| 1 | 2-3 founding sponsors at 50% off | $500–$900 |
| 2 | Founding sponsors + 1 full-price | $1,200–$1,800 |
| 3 | 3-4 sponsors, SEO traffic growing | $2,500 |
| 4 | 4-5 sponsors | $4,000 |
| 5 | 5-6 sponsors + Phase 3 experiment | $6,000 |
| 6 | 6+ sponsors + early commission | $8,000 |
| 7-9 | Compounding SEO + full sponsor roster | $10,000 |

---

## What NOT to Spend Money On

- Paid ads
- Freelancers
- PR agencies
- Tools not immediately needed

**Only spend on:**
- Vercel (already have)
- Supabase (already have)
- Resend for email ($0–$20/month)
- Razorpay / PayPal (Phase 2 only, no monthly fee)

---

## Solo Founder Rules

1. **Talk to 3 potential sponsors per week.** Revenue does not come from code.
2. **Ship in public.** Tweet what you're building. Screenshot the first sponsor payment.
3. **One marketing action per day.** Not 10. One, done well.
4. **Never call it done until you've opened it in a browser on your phone.**

---

**GTM v2.0 — 2026-03-02**
**Previous version:** v1.0 marketplace-first GTM — superseded by research
**Competitive analysis:** Complete — 4 competitors, 0 monetising, full audit in COMPETITIVE-ANALYSIS.md
