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

**Highest-priority target — CodeRabbit:**
CodeRabbit already sponsors cursor.directory. They have a budget line for exactly this model. Email subject: "You sponsor cursor.directory — we're the same thing for Google Antigravity IDE." One email. They need zero education.

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
| 1 | CodeRabbit | Already sponsors cursor.directory. Budget exists. Zero education needed. |
| 2 | Together AI | AI API provider — reaches Antigravity devs directly |
| 3 | Groq | Same — fast inference API, dev audience |
| 4 | Fireworks AI | Same category |
| 5 | Any MCP server company with funding | Their users are our users |

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

**Day 1 — Direct outreach to MCP creators (1 hour)**

Search GitHub for repos with "antigravity" in the name or description. Find the authors. Send one message:

> "Hi — I built a free directory of Antigravity resources (googleantigravity.directory). Your [project name] is already listed. I thought you'd want to know, and if you'd like a do-follow backlink added to your listing, just let me know."

This gets:
- Backlinks from their GitHub READMEs
- Word of mouth to their users
- Authentic creator engagement

Target: 20 outreach messages in week 1.

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

## WHAT WE ARE NOT DOING

| Tactic | Why we're not doing it |
|---|---|
| Paid ads | Zero budget. The content is the marketing. |
| Social media accounts | No time to maintain them. Not needed. |
| Product Hunt launch | Low Antigravity-specific audience. Not worth the effort at launch. |
| Building free tools (ROI calculator etc.) | Distraction from core directory. |
| Comparison pages (`/vs/`) | Low priority until core pages are indexed. |

---

## THE NUMBER THAT MATTERS

**$2,000 MRR = one site-wide sponsor.**

One sponsor. That's all. Every GTM action points to finding that one sponsor.

The directory gets them the audience. The Advertise page shows them the price. The outreach emails ask for the sale. That's the entire funnel.

---

## WEEK-BY-WEEK CHECKLIST

| Week | Action | Owner |
|---|---|---|
| Week 0 (now) | TASK-016 done. Enable placeholder ads. Launch. | Antigravity + PM |
| Day 1 post-launch | Send 10 sponsor emails (CodeRabbit first). Submit to GSC + Bing. Post on Reddit/HN/forum. | Founder |
| Week 1–2 | Follow up on sponsor outreach. Ingest Google Workspace CLI Skills. Outreach to 20 MCP creators. | Antigravity + Founder |
| Week 2–3 | Close first sponsor. Swap placeholder for real sponsor logo. | Founder |
| Week 4 | $2,000 MRR. Invoice sent. Write first Dev.to article. | Founder |
| Month 2 | SEO compounds. Second sponsor outreach round. Write 2 articles. | Founder |
| Month 3 | Assess Phase 2 (job board, second sponsor slot). | Founder |

---

## LAUNCH READINESS CHECKLIST

### Current State

| Area | Status |
|---|---|
| Content — 3,116 resources in DB | ✅ Ready |
| Category remapping to locked 10 | ✅ Done (TASK-007) |
| tsconfig build error | ✅ Fixed (TASK-001) |
| Design overhaul (cursor.directory pattern) | 🟡 In progress (TASK-016) |
| Strip marketplace UI from user-facing pages | 🟡 In progress (TASK-016) |
| Add Advertise page | ⏳ Pending |

### NOT Needed for Launch

- ❌ Payment system (Razorpay/PayPal removed from scope)
- ❌ Creator claiming flow
- ❌ Earnings dashboard
- ❌ Admin payout approval

### Launch Success Criteria

- [ ] Build passes (0 errors)
- [ ] All 10 categories show correct resources
- [ ] Search and filtering work
- [ ] Resource detail pages load
- [ ] Submit form works
- [ ] At least one ad slot visible (even placeholder)
- [ ] Mobile responsive (375px + 1280px)
- [ ] No marketplace/claiming UI visible to public
