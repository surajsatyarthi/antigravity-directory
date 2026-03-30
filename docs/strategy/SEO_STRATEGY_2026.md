# SEO STRATEGY — googleantigravity.directory (2026)
**Updated**: 2026-03-08 — MUVERA + deindex risk + topic clusters added
**Why this document matters**: SEO drives organic traffic. Traffic justifies sponsor pricing, enables promoted listing revenue at scale, and powers renewal deals. The first sponsor is closed on positioning (day 1, before traffic exists). Every sponsor after that is closed on traffic data. SEO is how we scale beyond the first deal.

---

## GOAL

Own every search query in the Antigravity developer ecosystem.
Drive organic traffic → monetise with ads + promoted listings.
Target: cursor.directory trajectory ($35k/month from organic SEO, $0 paid marketing).

---

## THE PONTUS PLAYBOOK (cursor.directory's actual strategy)

1. Build a free directory with lots of high-quality content
2. Organic traffic from tech YouTubers, forums, community sharing
3. No paid marketing needed — the content IS the marketing
4. Add new categories/features as search demand appears (MCPs jumped them from 150k→200k/month)
5. One post offering ad slots → sold out in minutes

We follow this exactly.

---

## GOOGLE'S 2026 ALGORITHM — WHAT HAS CHANGED (READ THIS FIRST)

### MUVERA — The Biggest Change Since Neural Search
Google's **MUVERA** (Multi-Vector Retrieval via Fixed Dimensional Encodings) was announced June 2025 and is fully rolling out Q2 2026. It understands search queries 90% faster and with 10% better accuracy.

**What changed**: Google no longer matches keywords. It understands the semantic meaning of an entire page simultaneously — in context with surrounding content, linked pages, and topic signals.

**What wins under MUVERA**:
- **Topic clusters** — a group of pages all connected around one topic (resource page → compare page → category page → guide page). Isolated pages don't hold value.
- **Semantic depth** — a page about `github-mcp` that explains what it does, how to install it, how it compares to alternatives, and links to related resources beats a page that just has the title.
- **Chunkable content** — clean H2 structure, tables, lists, schema markup. Google's AI Overviews pull these as passages. Walls of unstructured text get ignored.

**What dies under MUVERA**:
- Keyword stuffing
- Thin pages that only change one word from a template
- Isolated pages with no internal links to/from them

### Google's AI Page Replacement Patent (US12536233B1 — January 2026)
Google patented a system that **replaces your page with an AI-generated version** if your page scores poorly on: conversion rate, bounce rate, click-through rate, design quality.

**What this means for us**: If a user lands on `/t/github-mcp` and bounces in 2 seconds because the page is just a title and a copy button, Google will eventually stop sending traffic there and serve its own AI summary instead.

**The fix**: Resource pages must give users a reason to stay — description, tags, install snippet, related resources, usage examples. See "Rich Resource Page Spec" below.

---

## KEYWORD TARGETS

### Primary (own these)
- `antigravity rules` — rules for Antigravity IDE
- `antigravity skills` — Skills packages for Antigravity
- `antigravity MCP servers` — MCP integrations for Antigravity
- `google antigravity prompts` — Gemini/Antigravity prompts
- `antigravity workflows` — saved workflow templates
- `antigravity boilerplate` — project starters

### Long-tail (high value, low competition)
- `best MCP servers for antigravity`
- `antigravity rules for [framework]` (Next.js, Python, etc.)
- `how to install [MCP name] in antigravity`
- `antigravity skill for [task]`
- `google antigravity vs cursor rules`
- `[mcp-name] vs [mcp-name] antigravity` — compare page targets

### Programmatic pages (scale)
- `/t/[slug]` — individual resource pages (3,116 pages, all categories) — Phase 1, live
- `/[category-slug]` — 10 category pages (e.g. /mcp-servers, /rules, /skills) — Phase 1, live
- `/compare/[resource-a]-vs-[resource-b]` — comparison pages — Phase 2, not yet built
- `/guide/install-[mcp-name]-antigravity` — installation guides — Phase 2, not yet built

---

## CONTENT STRUCTURE

### Category pages (10 × SEO-optimised)
Each category page:
- H1: "[Category] for Google Antigravity"
- Description: what this resource type does in Antigravity
- Resource grid with search + filter
- "Submit a [resource type]" CTA at bottom

### Individual resource pages — RICH RESOURCE PAGE SPEC (minimum to avoid deindex)
Each `/t/[slug]` page must have ALL of the following to be considered non-thin:
- H1: "[Resource Name] — Antigravity [Category]"
- Description (from DB — must be meaningful, not one line)
- Tags (from DB — minimum 3 tags per resource)
- Install snippet or usage example (e.g. the rule text, the skill command, the MCP config)
- **Copy button** — one-click copy (rules/prompts/skills) or install command (MCPs)
- **Related resources** — minimum 3 internal links to similar resources in same category
- GitHub stars + source link if applicable

**Why this matters**: 3,116 pages where only the title changes = thin content = deindex risk. The copy button + related resources + tags make each page functionally unique even with a shared template.

### Compare pages — Phase 2 (Zapier model)
`/compare/[resource-a]-vs-[resource-b]`
- Side-by-side table: tags, stars, install method, use case
- Unique because the *combination* is unique — 3,116 resources = millions of possible pairs
- Each compare page links back to both resource pages + the category page (topic cluster)
- Targets "X vs Y" search queries — high intent, near-zero competition

### Guide pages — Phase 2
- `/guide/install-[mcp-name]-in-antigravity`
- `/guide/best-antigravity-rules-for-[framework]`
- `/guide/how-to-use-skills-in-antigravity`

---

## TOPIC CLUSTER ARCHITECTURE (MUVERA compliance)

This is the internal linking map that signals depth to MUVERA:

```
Category page (/mcp-servers)
    ↕ links both ways
Individual resource page (/t/github-mcp)
    ↕ links both ways
Compare page (/compare/github-mcp-vs-filesystem-mcp)     [Phase 2]
    ↕ links both ways
Guide page (/guide/install-github-mcp-in-antigravity)    [Phase 2]
```

**Phase 1 minimum** (what we must ship at launch):
- Every `/t/[slug]` → links to its category page (`/[category-slug]`)
- Every `/t/[slug]` → links to 3+ related resources (`/t/[other-slug]`)
- Every `/[category-slug]` → links to its top resources

**Phase 2** (after launch):
- Compare pages link to both resource pages + category
- Guide pages link to the relevant resource + category
- Full cluster = every page has multiple entry/exit points → PageRank flows across entire site

---

## TECHNICAL SEO

- Clean URL structure: `/t/[slug]` for resources, `/[category-slug]` for categories
- Schema markup: `SoftwareApplication` for resources, `ItemList` for category pages
- Sitemap: auto-generated from DB (3,116+ pages at launch, submitted to Google Search Console immediately)
- Breadcrumbs with schema on all pages
- Meta titles: "[Resource Name] — Antigravity [Category] | googleantigravity.directory"
- Meta descriptions: "[Resource description] — free to use in Google Antigravity IDE"
- Mobile-first (375px+)
- Page speed: <3s (Next.js + Vercel edge)
- Core Web Vitals: target green on all metrics (LCP < 2.5s, CLS < 0.1, FID < 100ms)
- Chunkable content: H2 structure, lists, tables — gets pulled into AI Overviews as passages

---

## DISTRIBUTION STRATEGY (How we get initial traffic)

### Tier 1 — Immediate (launch week)
1. **r/AntigravityIDE** — announce the directory. Link to the homepage + a specific popular resource. Reddit posts rank in Google within 2–4 weeks. Google has a licensing deal with Reddit — Reddit content feeds directly into Google AI Overviews.
2. **Google AI Developers Forum** (discuss.ai.google.dev/c/antigravity) — post about the directory
3. **MCP creators** — email/DM the creator of each MCP asking them to link to their listing on our site. Every backlink from a GitHub README or personal site counts.

### Tier 2 — Ongoing (first 30 days)
4. **Reddit answer strategy** — search Reddit for "which MCP should I use for X" questions. Answer genuinely with a link to the relevant resource page (not homepage). These rank in Google AND get cited in ChatGPT/Gemini answers because LLMs are trained on Reddit.
5. **Dev.to / Hashnode** — "The complete Antigravity IDE resource list" article. Links back to category pages.
6. **GitHub README** — open source the resource list CSV/JSON, link back to site (cursor.directory does this — it's a backlink machine)

### Tier 3 — Phase 2
7. **Compare page distribution** — when a user asks "which MCP is better: X or Y?" on any forum, link to the compare page. The page was built for exactly this scenario.

---

## WHAT NOT TO DO

- ❌ Paid ads (zero budget, zero need — content does the work)
- ❌ Thin resource pages — title + one-line description + nothing else = deindex risk at scale
- ❌ Targeting high-KD keywords like "AI tools" or "MCP server" — too competitive, wrong audience
- ❌ Newsletter before 10,000 monthly organic visitors — collect emails passively before that, send nothing
- ❌ Building free tools before the core directory is live
- ❌ Creating pages without internal links — isolated pages don't hold value under MUVERA
- ❌ Launching without submitting sitemap to Google Search Console on day 1

---

## PROVEN DIRECTORY BENCHMARKS

| Site | Monthly Traffic | Pages | Model |
|---|---|---|---|
| Zapier | 6.3M visits | 70,000+ programmatic | App integration combos |
| TripAdvisor | 226M visits | Millions | City + category + UGC |
| Brewery Directory (Reddit, 2025) | 20k visits | City + category | Ranked above Yelp |
| cursor.directory | ~200k visits | ~3,000 resources | Developer tools directory |

**Our model**: cursor.directory + compare pages + richer resource pages. We exceed their ad coverage (they skip category pages — we don't).

---

## 90-DAY MILESTONES

| Day | Goal |
|---|---|
| Launch | 10 categories live, 3,116 resources, sitemap submitted to GSC, Reddit post live |
| Day 30 | 50+ indexed pages ranking, first organic visitors, GSC impressions growing |
| Day 60 | 1,000+ monthly organic visitors, first ad enquiry, Reddit threads ranking in Google |
| Day 90 | 5,000+ monthly organic visitors, $1,000+ MRR, compare pages scoped for Phase 2 |
