# SEO Strategy
## Developer Resource Directory

**Date**: 2026-03-02
**Goal**: 5,000 organic monthly visitors by Month 3 | 20,000 by Month 12

---

## The SEO Opportunity

Three conditions exist simultaneously right now that rarely align:

1. **High search growth, low competition**: Antigravity IDE searches are at 5,000%+ growth. The keyword universe is forming. Established sites have not optimized for these terms yet.

2. **Long-tail keyword vacuum**: Nobody owns "best MCP server for Notion" or "cursor rules for TypeScript React" at a domain level. These are real searches with zero authoritative answers.

3. **Directory structure = SEO goldmine**: Every resource, every category, every tag combination is a potential landing page. A 500-resource directory with proper SEO generates thousands of indexed pages from day one.

This is the same pattern that built The Algorithms (HackerNews-adjacent), TAAFT (There's an AI For That), and Futurepedia — all directories that captured a search category before it matured.

---

## Keyword Strategy

### Tier 1: Primary Keywords (own these)

These go on homepage, category pages, and site-wide meta.

| Keyword | Monthly Searches (est.) | Competition | Target Page |
|---|---|---|---|
| google antigravity ide resources | Growing | Low | Homepage |
| antigravity ide tools | Growing | Low | Homepage |
| mcp servers directory | Growing | Low | /mcp-servers |
| cursor rules collection | Growing | Low | /cursor-rules |
| claude prompts for developers | Growing | Low | /prompts |
| next.js boilerplate 2026 | Medium | Medium | /boilerplates |
| ai workflow templates | Medium | Medium | /workflows |

### Tier 2: Long-tail Keywords (capture these at scale)

These go on individual resource pages and subcategory pages. Each page targets one long-tail query.

**MCP Server long-tails:**
- "mcp server for notion"
- "mcp server for github"
- "mcp server for postgres"
- "best mcp servers for claude"
- "mcp servers list 2026"
- "free mcp servers for antigravity ide"

**Cursor Rules long-tails:**
- "cursor rules for typescript"
- "cursor rules for react"
- "cursor rules for next.js"
- "best cursor rules 2026"
- "cursor rules for python"
- ".cursorrules file examples"

**Prompt long-tails:**
- "system prompt for code review claude"
- "best prompts for antigravity ide"
- "claude prompt for debugging"
- "chatgpt prompt for next.js development"

**Boilerplate long-tails:**
- "next.js supabase starter 2026"
- "saas boilerplate with stripe"
- "next.js 15 starter kit"
- "react typescript boilerplate with auth"

---

## Site Architecture for SEO

Every URL should be a real, indexable landing page. No pagination traps, no JS-only rendering.

```
/                           ← "developer resources for antigravity ide"
/mcp-servers                ← "mcp servers for claude and antigravity ide"
/mcp-servers/for-notion     ← "best mcp server for notion"
/mcp-servers/for-github     ← "mcp server for github integration"
/cursor-rules               ← "cursor rules and .cursorrules files"
/cursor-rules/typescript    ← "cursor rules for typescript projects"
/prompts                    ← "developer prompts for claude and gpt"
/prompts/code-review        ← "code review prompts for ai"
/boilerplates               ← "saas boilerplates and next.js starters"
/r/[resource-slug]          ← individual resource pages
/compare/[a]-vs-[b]         ← comparison pages (high-intent traffic)
/new                        ← recently added (Google loves fresh content)
/trending                   ← most viewed this week
```

### URL Naming Rules
- Use hyphens, never underscores
- Descriptive slugs: `/mcp-servers/notion-integration` not `/r/abc123`
- Category + subcategory pattern for drill-down SEO
- Maximum 3 levels deep

---

## On-Page SEO: Every Resource Page

Each resource page at `/r/[slug]` must have:

**Title tag**: `[Resource Name] — [Category] for [Use Case] | [Site Name]`
Example: `Notion MCP Server — MCP Servers for Claude and Antigravity IDE | DevResources`

**Meta description**: 155 chars max, includes primary keyword, written for click-through.
Example: `The Notion MCP Server lets Claude and Antigravity IDE read, write, and search your Notion workspace. Free and open source. Install in 2 minutes.`

**H1**: Matches the resource name exactly
**H2**: "What is [Resource Name]?" or "How to use [Resource Name]"
**H3**: "Installation", "Use Cases", "Related Resources"

**Structured data (JSON-LD)**: SoftwareApplication or ItemList schema on every resource page. This generates rich snippets in Google.

**Internal links**: Every resource page links to:
- Its category page
- 3 related resources
- The submit page

---

## Category Pages

Each category page (`/mcp-servers`, `/cursor-rules`, etc.) must be a real editorial page, not just a filtered list.

**Structure:**
1. **Hero with keyword-rich H1** — "The Best MCP Servers for Claude and Antigravity IDE"
2. **Short editorial intro** (150 words) — what are MCP servers, why they matter
3. **Resource grid** — paginated, with filters by tag
4. **FAQ section** — 3–5 questions targeting "People Also Ask" boxes
5. **Related categories** — links to adjacent categories

**The FAQ section is disproportionately valuable.** Google's "People Also Ask" feature pulls from FAQ schema. Target questions like:
- "What is an MCP server?"
- "How do I install MCP servers in Claude?"
- "Are MCP servers free?"
- "What's the best MCP server for [X]?"

---

## Content Calendar: 3 New Pages Per Week

These are SEO pages, not blog posts. Each takes 30–60 minutes to produce.

**Week 1–4:** Create the 10 core category and subcategory pages
**Week 5–8:** Create 12 comparison pages (`/compare/[tool-a]-vs-[tool-b]`)
**Week 9–12:** Create 12 "best X for Y" pages based on what's ranking

### Comparison Page Template
`/compare/supabase-mcp-vs-planetscale-mcp`

```
H1: Supabase MCP vs PlanetScale MCP — Which is Better for Antigravity IDE?

[200 word intro]

## Feature Comparison Table
## Supabase MCP: Pros and Cons
## PlanetScale MCP: Pros and Cons
## Verdict: Which Should You Use?

[Internal links to both resource pages]
[CTA to browse all database MCP servers]
```

These pages rank well because they target high-intent "vs" searches and have clear structure.

---

## Technical SEO Checklist

These must be done before the site is launched:

- [ ] `sitemap.xml` generated dynamically, submitted to Google Search Console
- [ ] `robots.txt` allows all crawlers, blocks `/api/` routes
- [ ] `next/image` used for all images (automatic WebP, lazy loading)
- [ ] Core Web Vitals passing (Lighthouse score 90+)
- [ ] All pages render server-side (no client-only rendering for content)
- [ ] Canonical URLs set on all pages
- [ ] Open Graph tags for every page (for Twitter/LinkedIn sharing)
- [ ] JSON-LD structured data on resource pages
- [ ] 404 page that links back to browse and categories
- [ ] No broken internal links

---

## Backlink Strategy (Month 2+)

You cannot buy links. You earn them. These are the best options for a solo founder with no budget:

1. **Get listed on Awesome lists**: GitHub has "awesome-mcp-servers", "awesome-cursorrules" etc. Submit a PR adding your directory to these lists. Each is a high-DA backlink.

2. **Get listed on other directories**: TAAFT, Futurepedia, AlternativeTo, ProductHunt. Submit to all of them. Each is a backlink.

3. **Resource roundup posts**: When developers write "Top 10 MCP servers" posts, you want to be listed as a source. Reach out to authors after they publish.

4. **Hacker News / Reddit links**: When your resource pages rank for real queries, developers link to them naturally in discussions.

5. **Creator backlinks**: When you activate creators to sell on your platform, many will link to their listing from their GitHub README.

---

## How to Measure Progress

Check these weekly, not daily:

| Metric | Month 1 Target | Month 3 Target | Month 6 Target |
|---|---|---|---|
| Google Search Console impressions | 1,000 | 20,000 | 100,000 |
| Indexed pages | 100 | 600 | 2,000 |
| Organic clicks | 100 | 1,500 | 8,000 |
| Domain authority (Ahrefs/Moz) | baseline | +5 | +15 |
| Keywords ranking top 10 | 5 | 50 | 200 |

**The most important early metric**: number of pages indexed by Google. If 500 pages are indexed, some will rank. If 50 pages are indexed, very few will rank. Submit your sitemap on day one and check Google Search Console weekly.

---

## The Single Most Important SEO Decision

**Make every resource page genuinely useful, not just a title and a link.**

A page that says:
```
Title: Notion MCP Server
Link: github.com/...
```
Will not rank.

A page that says:
```
Title: Notion MCP Server for Claude and Antigravity IDE
Description: The Notion MCP Server connects Claude to your Notion workspace.
Use it to read pages, search databases, create new entries, and manage your
workspace through natural language. Works with Claude Desktop and Antigravity IDE.

Installation: [clear steps]
Use cases: [3–5 bullet points]
Related: [3 similar servers]
```
Will rank for "mcp server for notion" and "claude notion integration".

The difference is 200 words of genuine content per page. At 500 resources, that is 100,000 words of content that no competitor has written yet. This is the SEO moat.
