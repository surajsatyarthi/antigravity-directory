# GO-TO-MARKET PLAN — googleantigravity.directory
**Version**: 2.0
**Date**: 2026-03-08
**Goal**: $2,000 MRR by Week 4 post-launch — pitch on positioning, not traffic

---

## THE ONE CONSTRAINT

Zero budget. Social accounts created 2026-03-13. One founder with a day job.
- Twitter/X: @AntigravityIDE — https://x.com/AntigravityIDE
- Reddit: u/antigravityIDE — https://www.reddit.com/user/antigravityIDE/

Every tactic in this plan costs nothing and can be done in under 2 hours.

---

## REVENUE STRATEGY — PITCH ON POSITIONING (not traffic)

**Updated 2026-03-08. Previous plan waited for traffic before pitching sponsors. That is too slow.**

The new sequence:
1. Launch site with placeholder ads visible ("Sponsored by [Your Brand]" showing on all 3 slots)
2. Send cold emails to 10 target companies on Day 1 — before traffic exists
3. Sell first-mover exclusivity + the placement itself, not audience size
4. Target: signed sponsor by Week 2-3, payment by Week 4

**What you are selling:**
- Site-wide SponsorBadge (fixed bottom-right, every page, every visitor)
- Homepage SponsoredCard (inline in resource list)
- CategorySponsorBanner (top of all 10 category pages)
- First-ever sponsor in this category — exclusivity before competitors exist

**Pricing:** $2,000/month. Offer first month at $1,000 to lower the barrier to yes.

**⚠️ DO NOT pitch CodeRabbit, Warp, or Mistral AI — their logos are already live on the site as placeholders. Pitching them is contradictory.**

**To enable placeholder ads:** Antigravity flips `active: true` in `src/config/sponsor.ts` and updates the placeholder text to "Sponsored by [Your Brand]" — 10 minutes of work. Do this before sending any outreach.

---

## PHASE 1 — LAUNCH WEEK (Days 1–7)

### Goal: Enable placeholder ads. Send first sponsor emails. Get indexed.

**Day 1 — Submission blitz (2 hours, do all of these)**

| Platform | Action | Link |
|---|---|---|
| Google Search Console | Submit sitemap. Request indexing for homepage + 10 category pages. | search.google.com/search-console |
| Bing Webmaster Tools | Submit sitemap | bing.com/webmasters |
| Google AI Developers Forum | Post: "I built a free directory for Antigravity resources — 3,116 MCP servers, Skills, Rules" | discuss.ai.google.dev/c/antigravity |
| r/AntigravityIDE | Same post, Reddit format | reddit.com/r/AntigravityIDE |
| r/cursor (if exists) | Post noting we cover Antigravity (different product from Cursor) | reddit.com |
| Hacker News — Show HN | "Show HN: I built cursor.directory for Google Antigravity IDE" | news.ycombinator.com |
| Dev.to | Article: "The best Antigravity resources in one place" — link to site | dev.to |

**Day 1 — Sponsor outreach (do this before MCP creator outreach)**

Send cold emails to these targets in priority order:

| Priority | Company | Why |
|---|---|---|
| 1 | Together AI | AI API provider — reaches Antigravity devs directly |
| 2 | Fireworks AI | Same — fast inference API, dev audience |
| 3 | Any MCP server company with funding | Their users are our users |
| ❌ | CodeRabbit | Already on site as placeholder — do not pitch |
| ❌ | Warp | Already on site as placeholder — do not pitch |
| ❌ | Mistral AI | Already on site as placeholder — do not pitch |

Email template:
> Subject: You sponsor cursor.directory — we built the same thing for Google Antigravity IDE
>
> Hi [name],
>
> googleantigravity.directory is the first and only resource directory for Google Antigravity IDE — 3,116 MCP servers, Skills, Rules, Prompts and more, all indexed and searchable.
>
> We have one site-wide sponsor slot: your logo and link on every page, every visit — the same placement CodeRabbit has on cursor.directory.
>
> $2,000/month. First month available at $1,000 to get you live quickly.
>
> The site launches this week. The slot is available now.
>
> [Your name]

Send to 10 companies. Expect 1-2 replies. One yes = $2,000 MRR.

**Day 1 — Creator backlink outreach (automated, 1-hour setup)**

We have 3,116 resources. Most have a GitHub URL. Each GitHub URL has an owner. Each owner has a public profile with email, Twitter handle, and website. This is a backlink engine — not manual outreach.

**How it works (semi-automated script — TASK-062):**

1. For each resource with a GitHub URL, extract `{owner}/{repo}` from the URL
2. Hit GitHub API (no auth required for public data):
   - `GET https://api.github.com/users/{owner}` → returns `email`, `twitter_username`, `blog`, `name`
   - Store these as `creatorEmail`, `creatorTwitter`, `creatorWebsite` fields in our DB
3. Open a GitHub Issue on their repo via GitHub API (requires a GitHub token — one-time setup):

Issue title: `Your project is featured on Antigravity Directory`

Issue body:
> Hi! Your project **{resource.title}** is listed on [Antigravity Directory](https://googleantigravity.directory/t/{resource.slug}) — the free resource directory for Google Antigravity IDE users.
>
> If you find the listing useful, consider adding this badge to your README — it links back to your listing and lets users find your project faster:
>
> ```markdown
> [![Listed on Antigravity Directory](https://googleantigravity.directory/api/badges/{resource.slug})](https://googleantigravity.directory/t/{resource.slug})
> ```
>
> No action required — just thought you'd want to know. 🙂

**Why a GitHub Issue, not email:**
- No personal contact info needed
- It is on their public repo — not spam
- The badge ask is a 30-second action that creates a permanent do-follow backlink from an active GitHub repo
- GitHub Issues are indexed by Google — the issue itself creates a secondary link signal

**Phasing:**
- Week 1: Top 500 resources by category (MCP Servers first — largest category, most active GitHub repos)
- Ongoing: Auto-trigger issue for every new resource added with status=LIVE

**Twitter DM (for creators with `twitter_username` in GitHub profile):**
> "Hey — your project {title} is featured on Antigravity Directory, the first resource directory for Google Antigravity IDE: googleantigravity.directory/t/{slug}. Thought you'd want to know!"

No ask. Just awareness. A percentage will tweet it organically.

**Expected results from 500 outreach issues:**
- 15–25% add the badge to their README = 75–125 GitHub README backlinks
- 5–10% tweet it = organic reach to their followers
- 100% receive awareness = future word of mouth

This is how cursor.directory built its backlink profile — their badge is on hundreds of GitHub READMEs from rule and MCP creators. We replicate it with automation.

**Day 2–7 — Monitor and respond**

- Check Google AI Developers Forum for replies — answer every one
- Check Reddit post — answer every comment
- Watch for inbound sponsor enquiries from the Advertise page
- Monitor Google Search Console for first impressions

---

## PHASE 2 — MONTH 1 (Days 8–30)

### Goal: 1,000 monthly organic visitors. First inbound sponsor enquiry.

**Content: One article per week (30–45 min each)**

Write short articles on Dev.to or Hashnode. Cross-post both.

| Week | Title |
|---|---|
| Week 2 | "The best MCP servers for Google Antigravity IDE in 2026" |
| Week 3 | "How to use Skills in Google Antigravity — a complete guide" |
| Week 4 | "Antigravity vs Cursor: which IDE has better resources?" |

Each article:
- Links back to googleantigravity.directory
- Links to specific category pages (internal SEO equity)
- Is genuinely useful, not promotional

**Google Workspace CLI Skills (do this in week 1–2)**

Ingest the 100+ Google Workspace CLI Skills into our DB (see SEO plan section 9). Publish a post:

> "Google just launched 100+ official Agent Skills for Antigravity — we've indexed all of them at googleantigravity.directory/skills"

Post this everywhere. This is a first-mover news story, not a promotion.

**Sponsor follow-up (week 2)**

Follow up on Day 1 outreach. If no reply in 5 days, send one follow-up:
> "Following up — the sponsor slot is still available. Happy to send a screenshot of exactly where your brand would appear."

Attach a screenshot of the live placeholder ad on the site.

---

## PHASE 3 — WEEKS 3–4

### Goal: $2,000 MRR. Close the sponsor. Get paid.

**SEO compounds**

By month 2, Google will have indexed most of the 3,116 resource pages. Long-tail queries start ranking. Traffic grows without any additional work.

Monitor GSC weekly. Double down on whichever category is getting the most impressions — write more content around it.

**Convert first visitor to first sponsor**

When an ad enquiry comes in via the contact form:
- Reply within 2 hours
- Offer a 1-month trial at 50% off ($1,000 for the first month)
- Get them live quickly — a live sponsor makes the next pitch easier

**Community presence**

By month 2 you should be a recognisable name in the Antigravity developer community. Every question about Antigravity resources on Reddit, forums, Discord should mention your site.

This happens by:
- Being present in the Google AI Developers Forum
- Answering questions, not promoting
- Letting the directory link speak for itself

---

## PHASE 4 — CHROME EXTENSION (Future, post Phase 2)

**Product idea:** A Chromium extension that surfaces relevant Antigravity resources from our directory while the developer is working — inside the browser, connected to the IDE.

**Why our data makes this possible:**
- 3,116 structured resources across 10 categories
- Category + tag metadata enables context-aware suggestions
- Badge API already exists — extension can pull live resource data

**What the extension would do:**
- Detect when the user is on a GitHub repo and surface any related Antigravity resources (MCP servers, rules, boilerplates) that match the repo's language/framework
- Sidebar or popup showing top resources for the current context — one-click copy into Antigravity workspace
- Works on all Chromium-based browsers: Chrome, Edge, Brave, Arc

**Why this generates backlinks naturally:**
- Chrome Web Store listing = indexed page linking to our site
- Dev blog posts about "best Antigravity IDE extensions" will reference us
- GitHub READMEs for Antigravity tools will link to our extension
- YouTube setup videos for Antigravity will mention the extension

**When to build this:** After Phase 2 is complete — the directory must have traffic and credibility before an extension is worth distributing. Building the extension before the directory has users is building a solution for an empty room.

**TASK-063** — Chrome extension spec and build. Blocked until TASK-050 (data enrichment) is complete — the extension needs structured fields (language/runtime, install method) to do context-aware matching.

---

## WHAT WE ARE NOT DOING

| Tactic | Why we're not doing it |
|---|---|
| Paid ads | Zero budget. The content is the marketing. |
| Paid social media | Zero budget. Organic only — @AntigravityIDE (Twitter) + u/antigravityIDE (Reddit) exist for community presence, not paid promotion. |
| Product Hunt launch | Low Antigravity-specific audience. Not worth the effort at launch. |
| Building free tools (ROI calculator etc.) | Distraction from core directory. |
| Comparison pages (`/vs/`) | Low priority until core pages are indexed. |

---

## THE NUMBER THAT MATTERS

**$2,000 MRR = one site-wide sponsor.**

One sponsor. That's all. Every GTM action points to finding that one sponsor.

The directory gets them the audience. The Advertise page shows them the price. The outreach emails ask for the sale. That's the entire funnel.

---

## LAUNCH STATUS — COMPLETE (2026-03-13)

Site is live. Development phase closed. Current focus: close first sponsor at $2,000/month.
Active task list: `PROJECT_LEDGER.md`
