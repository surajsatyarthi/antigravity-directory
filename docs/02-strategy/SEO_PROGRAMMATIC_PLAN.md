# SEO + PROGRAMMATIC SEO PLAN — googleantigravity.directory
**Version**: 1.0
**Date**: 2026-03-07
**Reference**: `docs/02-strategy/SEO_STRATEGY_2026.md` (keyword targets, Pontus playbook)

---

## THE ONE GOAL

**$2,000 MRR AS FAST AS POSSIBLE.**

SEO drives organic traffic. Traffic gives sponsors a reason to pay. Every decision in this document exists to get googleantigravity.directory indexed, ranked, and generating inbound sponsor enquiries.

---

## PURPOSE

This document is an implementation spec, not a strategy overview. It tells Antigravity exactly what to build for SEO — meta formulas, schema markup, URL structure, sitemap logic, internal linking rules. Strategy is in `SEO_STRATEGY_2026.md`. This is the how.

---

## 1. URL STRUCTURE

### Final URLs for all page types

| Page type | URL pattern | Example |
|---|---|---|
| Homepage | `/` | `googleantigravity.directory/` |
| Category page | `/[slug]` | `/mcp-servers` |
| Resource detail | `/t/[slug]` | `/t/github-mcp-server` |
| Submit | `/submit` | `/submit` |
| Advertise | `/advertise` | `/advertise` |
| About | `/about` | `/about` |

### Category slugs (locked — do not change)

| Category | Slug |
|---|---|
| MCP Servers | `mcp-servers` |
| Skills | `skills` |
| Rules | `rules` |
| Prompts | `prompts` |
| Agents | `agents` |
| Workflows | `workflows` |
| Boilerplates | `boilerplates` |
| Troubleshooting | `troubleshooting` |
| Tutorials | `tutorials` |
| Cheatsheets | `cheatsheets` |

### Resource detail URL rule
- Always `/t/[slug]`
- Slug is generated from resource title: lowercase, hyphens, no special chars
- Max 60 chars
- Must be unique — append `-2`, `-3` if duplicate
- Never change a slug after a resource is published (breaks inbound links)

---

## 2. META TITLE FORMULAS

These are exact formulas. Antigravity must implement these as code, not copy static strings.

### Homepage
```
Antigravity Directory — MCP Servers, Skills, Rules & Prompts for Google Antigravity IDE
```

### Category pages
```
[Category Name] for Google Antigravity IDE | googleantigravity.directory
```
Examples:
- `MCP Servers for Google Antigravity IDE | googleantigravity.directory`
- `Skills for Google Antigravity IDE | googleantigravity.directory`
- `Rules for Google Antigravity IDE | googleantigravity.directory`

### Resource detail pages
```
[Resource Title] — Antigravity [Category Name] | googleantigravity.directory
```
Examples:
- `GitHub MCP Server — Antigravity MCP Servers | googleantigravity.directory`
- `Next.js Rules — Antigravity Rules | googleantigravity.directory`

### Submit page
```
Submit a Resource | googleantigravity.directory
```

### Advertise page
```
Advertise on Antigravity Directory | Reach 10,000+ Antigravity Developers
```

### About page
```
About | googleantigravity.directory
```

---

## 3. META DESCRIPTION FORMULAS

### Category pages (unique per category — use these exact strings)

| Category | Meta description |
|---|---|
| MCP Servers | `Browse [count]+ MCP servers for Google Antigravity IDE. Find the best tool integrations, APIs and context providers for your Antigravity workspace.` |
| Skills | `Browse [count]+ Skills for Google Antigravity IDE. Agent capabilities, SKILL.md packages and pre-built skills for your Antigravity workflows.` |
| Rules | `Browse [count]+ rules for Google Antigravity IDE. Custom AI behaviours, coding standards and context rules to shape your Antigravity experience.` |
| Prompts | `Browse [count]+ prompts for Google Antigravity IDE. System prompts, task prompts and instruction sets optimised for Gemini and Antigravity.` |
| Agents | `Browse [count]+ agents for Google Antigravity IDE. Pre-configured agentic setups and agent templates for complex workflows.` |
| Workflows | `Browse [count]+ workflows for Google Antigravity IDE. Automation templates, multi-step flows and saved workflow configurations.` |
| Boilerplates | `Browse [count]+ boilerplates for Google Antigravity IDE. Project starters, repo templates and scaffolds configured for Antigravity.` |
| Troubleshooting | `Browse [count]+ troubleshooting guides for Google Antigravity IDE. Common errors, fixes and how-to guides for Antigravity users.` |
| Tutorials | `Browse [count]+ tutorials for Google Antigravity IDE. Step-by-step guides for getting the most out of Antigravity and Gemini.` |
| Cheatsheets | `Browse [count]+ cheatsheets for Google Antigravity IDE. Quick reference cards for commands, shortcuts and configurations.` |

`[count]` = live count from DB, not hardcoded.

### Resource detail pages
```
[resource.description] — A [resource.categoryName] for Google Antigravity IDE. Browse more [category] resources on googleantigravity.directory.
```
If `resource.metaDesc` is set, use that instead.

---

## 4. SCHEMA MARKUP — PER PAGE TYPE

### 4A. Homepage — WebSite + SearchAction

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Antigravity Directory",
  "url": "https://googleantigravity.directory",
  "description": "The #1 resource directory for Google Antigravity IDE",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://googleantigravity.directory/?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
}
```

### 4B. Category pages — CollectionPage + BreadcrumbList

```json
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "[Category Name] for Google Antigravity IDE",
  "description": "[meta description]",
  "url": "https://googleantigravity.directory/[slug]"
}
```

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://googleantigravity.directory" },
    { "@type": "ListItem", "position": 2, "name": "[Category Name]", "item": "https://googleantigravity.directory/[slug]" }
  ]
}
```

### 4C. Resource detail pages — SoftwareApplication + FAQPage + BreadcrumbList

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "[resource.title]",
  "description": "[resource.description]",
  "applicationCategory": "[resource.categoryName]",
  "operatingSystem": "Google Antigravity IDE",
  "url": "[resource.url]",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "[avgRating]",
    "reviewCount": "[ratingCount]"
  }
}
```

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is [resource.title]?",
      "acceptedAnswer": { "@type": "Answer", "text": "[resource.description]" }
    },
    {
      "@type": "Question",
      "name": "Is [resource.title] free?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. [resource.title] is free to access on Antigravity Directory. Browse and copy resources at no cost." }
    },
    {
      "@type": "Question",
      "name": "How do I use [resource.title] in Antigravity?",
      "acceptedAnswer": { "@type": "Answer", "text": "Visit the resource page and use the copy button to copy the content directly into your Antigravity workspace." }
    }
  ]
}
```

BreadcrumbList:
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://googleantigravity.directory" },
    { "@type": "ListItem", "position": 2, "name": "[category]", "item": "https://googleantigravity.directory/[categorySlug]" },
    { "@type": "ListItem", "position": 3, "name": "[resource.title]", "item": "https://googleantigravity.directory/t/[slug]" }
  ]
}
```

---

## 5. SITEMAP SPEC

### File: `/sitemap.xml` (auto-generated by Next.js)

**Priority order** (highest crawl priority first):

| URL | Priority | Change frequency |
|---|---|---|
| `/` | 1.0 | daily |
| `/mcp-servers` | 0.9 | daily |
| `/skills` | 0.9 | daily |
| `/rules` | 0.9 | daily |
| `/prompts` | 0.9 | daily |
| `/agents` | 0.9 | daily |
| `/workflows` | 0.9 | daily |
| `/boilerplates` | 0.9 | daily |
| `/troubleshooting` | 0.9 | daily |
| `/tutorials` | 0.9 | daily |
| `/cheatsheets` | 0.9 | daily |
| `/t/[slug]` for all LIVE resources | 0.7 | weekly |
| `/submit` | 0.5 | monthly |
| `/advertise` | 0.5 | monthly |
| `/about` | 0.3 | monthly |

**Exclude from sitemap**:
- `/admin/*`
- `/auth/*`
- `/dashboard`
- `/settings`
- Resources with status !== 'LIVE'
- Resources with `isIndexed = false`

### Implementation in `src/app/sitemap.ts`

```typescript
// Fetch all LIVE, indexed resources from DB
// Generate one entry per resource
// Include category pages as static entries
// Set lastmod to resource.updatedAt
```

---

## 6. ROBOTS.TXT

```
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /auth/
Disallow: /dashboard
Disallow: /settings
Disallow: /api/

Sitemap: https://googleantigravity.directory/sitemap.xml
```

---

## 7. CANONICAL URLS

- Every page must have `<link rel="canonical" href="[absolute URL]" />`
- Resource detail: `https://googleantigravity.directory/t/[slug]`
- Category pages: `https://googleantigravity.directory/[category-slug]`
- No trailing slashes
- Always HTTPS

---

## 8. PROGRAMMATIC SEO — RESOURCE DETAIL PAGES

### The scale strategy

We have 3,116 resources at launch. Each gets its own indexed page. That is 3,116 SEO landing pages on day one — more than any competitor has.

### What makes each page unique (Google's requirement to avoid thin content)

Every resource detail page must have at minimum:
1. Unique H1 (`[resource.title]`)
2. Unique meta description (from `resource.description` or `resource.metaDesc`)
3. Unique body content: description paragraph + content block (if exists)
4. FAQ schema (dynamically generated from resource title)
5. Related resources section (3–6 resources from same category)
6. Stats: views, copies, rating (even if 0 at launch)

### Resources with no content field

If `resource.content` is null or empty:
- Still render the page
- Show: title, description, external link, category, tags, related resources
- Do NOT show "content not available" — just omit the content block
- Page is still unique due to title, description, tags combination

### Priority pages to verify manually before launch

Pick 5 resources from each of the 10 categories (50 pages total) and manually verify they:
- Load without error
- Have correct title, description, category badge
- Have external link that works
- Have schema markup
- Are included in sitemap

---

## 9. GOOGLE WORKSPACE CLI — SKILLS INGESTION

### The opportunity

Google launched `googleworkspace/cli` on March 6, 2026. It ships 100+ Agent Skills (SKILL.md files) — the exact format Antigravity IDE uses. These are open source, Google-authored Skills. Nobody has catalogued them yet.

### What to do

1. Clone or fetch the repo: `https://github.com/googleworkspace/cli`
2. Extract all SKILL.md files
3. Parse each: name, description, content
4. Create a resource record for each in our DB:
   - `categoryId` = Skills category ID
   - `title` = skill name from SKILL.md
   - `description` = first paragraph of SKILL.md
   - `content` = full SKILL.md content
   - `url` = link to the specific file on GitHub
   - `status` = LIVE (pre-approved — Google-authored, authoritative)
   - `source` = "Google Workspace CLI"
   - `tags` = ["google", "workspace", "official"]

5. These become 100+ additional indexed pages immediately
6. We are first to catalogue them — first-mover SEO advantage

### SEO value of Google Workspace CLI Skills

- Author is Google — maximum E-E-A-T signal
- Brand new (March 2026) — low existing competition for these queries
- Skills is our exclusive category (neither competitor has it)
- Queries like "google workspace cli skills antigravity" — we own them from day one

---

## 10. INTERNAL LINKING RULES

### Resource detail → related resources

- Show 3–6 resources from the same category
- Sorted by: views DESC
- Exclude: the current resource
- Link text: resource title
- This creates internal link clusters per category — important for crawl depth

### Category pages → resource detail

- Each resource card on a category page links to `/t/[slug]`
- This is already the pattern — do not change

### Homepage → category pages

- Categories are linked via header nav and footer Browse column only — no category grid on homepage (removed 2026-03-08)

### Footer → category pages

- All 10 categories linked in footer Browse column
- Already implemented correctly

---

## 11. H1 RULES (one H1 per page, always)

| Page | H1 |
|---|---|
| Homepage | "The #1 Resource Directory for Google Antigravity IDE" |
| MCP Servers | "MCP Servers for Google Antigravity IDE" |
| Skills | "Skills for Google Antigravity IDE" |
| Rules | "Rules for Google Antigravity IDE" |
| Prompts | "Prompts for Google Antigravity IDE" |
| Agents | "Agents for Google Antigravity IDE" |
| Workflows | "Workflows for Google Antigravity IDE" |
| Boilerplates | "Boilerplates for Google Antigravity IDE" |
| Troubleshooting | "Troubleshooting for Google Antigravity IDE" |
| Tutorials | "Tutorials for Google Antigravity IDE" |
| Cheatsheets | "Cheatsheets for Google Antigravity IDE" |
| Resource detail | `[resource.title]` — dynamic, from DB |
| About | "About Antigravity Directory" |
| Advertise | "Reach Antigravity Developers Where They Build" |
| Submit | "Submit a Resource to Antigravity Directory" |

---

## 12. POST-LAUNCH — SEARCH ENGINE SUBMISSION (ALL ENGINES)

### Current status (as of 2026-03-13)
- Google Search Console: ✅ property verified, ❌ sitemap NOT submitted
- Bing Webmaster Tools: ✅ property verified (imported from GSC), ❌ sitemap NOT submitted
- IndexNow key: ✅ obtained and in .env.local, ❌ not yet wired to auto-ping

---

### 12A. Google Search Console

**Immediate (do now — manual):**
1. Go to search.google.com/search-console
2. Sitemaps → submit `https://googleantigravity.directory/sitemap.xml`
3. URL Inspection → request indexing for homepage + all 10 category pages manually

**Week 2:**
- Check coverage report — how many of 3,116 pages are indexed
- Fix any crawl errors
- Submit top 50 resources manually via URL Inspection

**Monthly:**
- Check which queries are getting impressions
- Double down on content in those categories

---

### 12B. Bing Webmaster Tools

**Immediate (do now — manual):**
1. Go to bing.com/webmasters
2. Your site is already imported from GSC
3. Sitemaps → submit `https://googleantigravity.directory/sitemap.xml`

**Why Bing matters:**
- Bing powers DuckDuckGo, Yahoo, Ecosia, and AOL search — one submission covers all of them
- Bing indexes developer content aggressively
- Bing's AI (Copilot) pulls from its index — getting indexed = appearing in AI answers

**Monthly:**
- Check Bing Webmaster Tools for crawl errors and keyword data

---

### 12C. IndexNow — Auto-ping on new content

**What it is:** A protocol supported by Bing, Yandex, Seznam, and Naver. One API call notifies all of them instantly when a new page is published. Google does NOT support IndexNow (they have their own system).

**Status:** IndexNow key already obtained (TASK-033). Not yet wired.

**What Antigravity needs to build (future task):**
When a new resource is inserted into the DB with status=LIVE, ping:
```
https://www.bing.com/indexnow?url=https://googleantigravity.directory/t/[slug]&key=[INDEXNOW_KEY]
```
This tells Bing/Yandex/Seznam immediately — no waiting for crawl.

**Engines covered by one IndexNow ping:**
- Bing ✅
- DuckDuckGo (via Bing) ✅
- Yahoo (via Bing) ✅
- Yandex ✅
- Ecosia (via Bing) ✅
- Seznam ✅

---

### 12D. Yandex Webmaster (optional, low priority)

- Yandex is covered by IndexNow
- Only add Yandex Webmaster Tools manually if traffic data shows Russian/Eastern European visitors

---

### 12E. Search engine market share context

| Engine | Global share | Notes |
|---|---|---|
| Google | ~91% | Largest — primary focus |
| Bing | ~4% | Powers DuckDuckGo, Yahoo, Copilot AI |
| Yandex | ~2.5% | Covered by IndexNow |
| DuckDuckGo | ~0.6% | Pulls from Bing index |
| Others | <1% | Not worth separate submission |

Submitting to Google + Bing + IndexNow covers ~98% of all search traffic with minimal effort.
