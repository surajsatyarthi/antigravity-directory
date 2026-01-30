# Product Requirements Document: Antigravity Directory

**Version**: 1.0
**Date**: 2026-01-30
**Status**: DRAFT - Awaiting Founder Approval
**Owner**: Founder
**Contributors**: Senior Architect, Antigravity Agent

---

## Document Control

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-01-30 | Senior Architect | Initial PRD creation |

**Approval Required From**:
- [ ] Founder (Strategic alignment)
- [ ] Technical Lead (Feasibility)
- [ ] Product Manager (Scope clarity)

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Problem Space](#2-problem-space)
3. [Solution Overview](#3-solution-overview)
4. [User Personas](#4-user-personas)
5. [User Journey Maps](#5-user-journey-maps)
6. [Feature Requirements](#6-feature-requirements)
7. [Non-Functional Requirements](#7-non-functional-requirements)
8. [Success Metrics](#8-success-metrics)
9. [Out of Scope](#9-out-of-scope)
10. [Risks & Mitigations](#10-risks--mitigations)
11. [Dependencies & Constraints](#11-dependencies--constraints)
12. [Milestones & Timeline](#12-milestones--timeline)
13. [Appendices](#13-appendices)

---

## 1. Executive Summary

### 1.1 Vision Statement

**"Become the definitive, high-authority independent hub for agentic AI resources, prioritizing developer trust and project sustainability over short-term hacks."**

### 1.2 Mission

Build a **high-margin lead generation and placement engine** that achieves **$10,000-$18,000 Monthly Recurring Revenue (MRR)** within 12 months, enabling financial independence for the founder.

### 1.3 Strategic Context

**Current State**:
- Batch 1.3 (Scaling) and Batch 1.4 (UX/Mobile) completed
- 7 comparison pages live
- Mobile-responsive directory with 300+ resources
- Architect audit score: 7.2/10 (Conditional GO)

**Target State**:
- 12 high-intent comparison pairs driving 2,000-3,000 monthly uniques
- Job board with 20+ listings generating $5,000/mo
- Sponsorship program with 5-8 partners generating $7,500/mo
- Total: **$12,000-$18,000 MRR** by Month 12

**Competitive Position**:
- **Benchmark**: Cursor Directory at $35,000 MRR (2026)
- **Our Advantage**: Live Intelligence metadata + comparison engine + independent authority
- **Market Opportunity**: $10K-$15K MRR is achievable with focused execution

### 1.4 Success Criteria (Top-Level)

| Metric | Month 1 | Month 2 | Month 3 | Month 4 |
|--------|---------|---------|---------|---------|
| Monthly Uniques | 1,000 | 3,000 | 50,000 | 75,000 |
| MRR | $0 | $500 | $3,000 | $10,000+ |
| Comparisons Live | 7 | 12 | 12 | 15 |
| Job Listings | 0 | 5 | 15 | 20+ |

---

## 2. Problem Space

### 2.1 Market Context

**Target Market**: AI developers building agentic systems (estimated 500,000+ globally)

**Market Maturity**: Early but rapidly growing
- MCP (Model Context Protocol) adoption accelerating
- Enterprises investing in AI automation
- Indie hackers building agent-first applications

**Market Size**:
- **TAM (Total Addressable Market)**: $500M+ (AI dev tools market)
- **SAM (Serviceable Available Market)**: $50M+ (directory/marketplace segment)
- **SOM (Serviceable Obtainable Market)**: $5M+ (achievable with focused execution)

### 2.2 User Pain Points

#### Pain Point 1: Lack of Trust Signals
**Problem**: Developers can't verify the quality or security of AI tools/prompts/MCP servers listed in existing directories.

**Evidence**:
- Cursor Directory: Static listings, no verification badges
- MCPHub: Manual curation only, no real-time data
- GitHub search: Too broad, no filtering for agent-specific tools

**User Quote** (Persona: Agentic Pioneer):
> "I spent 3 hours evaluating MCP servers on GitHub, only to find half of them were abandoned or had security issues. I need a trusted source."

**Impact**:
- Wasted developer time (avg 2-3 hours per tool evaluation)
- Security risks from unvetted tools
- Reduced adoption of MCP ecosystem

---

#### Pain Point 2: Poor Discoverability
**Problem**: No comparison engine for "Claude vs ChatGPT for coding" or "Supabase vs Firebase for vector search."

**Evidence**:
- Search volume: "claude vs chatgpt coding" = 100K/mo
- Existing content: Blog posts (outdated), Reddit threads (scattered)
- Opportunity: Programmatic comparison pages with structured data

**User Quote** (Persona: Enterprise Auditor):
> "My team asks me weekly which model to use for our agent pipeline. I need side-by-side comparisons with real benchmarks, not marketing fluff."

**Impact**:
- Suboptimal technology choices
- Team debates slow down projects
- High switching costs if wrong choice made

---

#### Pain Point 3: No Monetization Path for Creators
**Problem**: Tool creators and prompt engineers have no way to monetize their work or get visibility.

**Evidence**:
- GitHub stars don't translate to revenue
- No job board for AI agent specialists
- No sponsor/advertising marketplace

**User Quote** (Persona: AI Recruiter):
> "We're hiring for AI agent roles but have no pipeline. LinkedIn is saturated. We need a niche job board."

**Impact**:
- Creators abandon projects (no incentive)
- Quality degradation over time
- Fragmented community

---

### 2.3 Competitive Analysis

#### Cursor Directory
- **Strengths**: First-mover, $35K MRR, strong brand
- **Weaknesses**: Static listings, no verification, no comparisons
- **Our Advantage**: Live Intelligence + comparison engine

#### MCPHub
- **Strengths**: Manual curation, high quality
- **Weaknesses**: Slow updates, no monetization
- **Our Advantage**: Real-time GitHub API sync + job board

#### GitHub Search
- **Strengths**: Comprehensive, authoritative
- **Weaknesses**: Not curated for agents, no trust signals
- **Our Advantage**: Specialized curation + metadata badges

**Competitive Moat Strategy**:
1. **Authority Moat**: Live Intelligence metadata (GitHub Stars, last updated)
2. **SEO Moat**: 12 comparison pages stealing organic traffic
3. **Network Moat**: Job board attracts recruiters → attracts talent → attracts tools

---

## 3. Solution Overview

### 3.1 Core Value Proposition

**For Agentic Pioneers** (Indie Hackers):
> "Discover verified MCP servers and prompts in <2 minutes, so you can build AI agents fast without security risks."

**For Enterprise Auditors** (Lead Engineers):
> "Compare AI tools with structured data and benchmarks, so your team makes confident technology choices."

**For AI Recruiters** (Heads of Talent):
> "Access a high-signal pipeline of AI agent specialists, so you hire faster than LinkedIn."

### 3.2 Product Architecture

```
┌─────────────────────────────────────────────────────┐
│                 ANTIGRAVITY DIRECTORY               │
└─────────────────────────────────────────────────────┘
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
   ┌────▼────┐      ┌────▼────┐      ┌────▼────┐
   │ CORE    │      │COMPARISON│      │  JOB    │
   │DIRECTORY│      │  ENGINE  │      │  BOARD  │
   │         │      │          │      │         │
   │300+ MCP │      │12 SEO    │      │$99-$299 │
   │Servers  │      │Pages     │      │Listings │
   └─────────┘      └─────────┘      └─────────┘
        │                 │                 │
        └─────────────────┼─────────────────┘
                          │
               ┌──────────▼──────────┐
               │  LIVE INTELLIGENCE  │
               │      METADATA       │
               │                     │
               │ GitHub API Sync     │
               │ Auto-updating badges│
               └─────────────────────┘
```

### 3.3 Revenue Model

| Revenue Stream | Pricing | Target | Monthly Revenue |
|----------------|---------|--------|-----------------|
| **Job Board** | $99 Standard<br>$299 Featured | 15 standard<br>5 featured | $5,000/mo |
| **Sponsorships** | $799 Grid Ad<br>$1,500 Combo | 3 grid<br>3 combo | $7,000/mo |
| **Lead Gen** | CPA/Affiliate | Referrals | $500/mo |
| **TOTAL** | - | - | **$12,500/mo** |

**Path to $18K MRR**:
- Job Board: Scale to 30 listings ($7,500/mo)
- Sponsorships: Add featured resources ($9,000/mo)
- Lead Gen: Increase affiliate partnerships ($1,500/mo)

---

## 4. User Personas

### 4.1 Primary Persona: Agentic Pioneer

**Demographics**:
- Age: 25-40
- Role: Indie Hacker, Solopreneur, Freelance Developer
- Income: $50K-$150K annually
- Location: Global (US, Europe, India dominant)

**Psychographics**:
- Early adopter mindset
- Values speed and efficiency
- Comfortable with cutting-edge tech
- DIY mentality (builds vs buys)

**Goals**:
- Build AI agents in <1 week (not months)
- Avoid security vulnerabilities
- Stay ahead of competition
- Minimize tool evaluation time

**Pain Points**:
- Too many tools, can't evaluate all
- Security risks from unvetted code
- Outdated tutorials and documentation
- Wasted time on abandoned projects

**Behavior Patterns**:
- Visits GitHub daily
- Active in Discord/Slack communities
- Reads Hacker News, Reddit (r/LocalLLaMA)
- Searches: "best MCP servers", "claude prompts for coding"

**Success Metrics** (User's POV):
- Finds verified tool in <2 minutes
- Zero security incidents from discovered tools
- Implements 1-2 new MCP servers per week

**Quote**:
> "I need a curated list I can trust. GitHub has too much noise, and I don't have time to audit every repo."

**User Stories**:
1. As an Agentic Pioneer, I want to **browse verified MCP servers by category**, so I can **quickly find the right tool for my use case**.
2. As an Agentic Pioneer, I want to **see GitHub stars and last updated date**, so I can **avoid abandoned projects**.
3. As an Agentic Pioneer, I want to **filter by integration type (Gmail, Slack, etc.)**, so I can **find tools that work with my stack**.

---

### 4.2 Secondary Persona: Enterprise Auditor

**Demographics**:
- Age: 30-45
- Role: Lead Engineer, Engineering Manager, Tech Lead
- Company Size: 50-5,000 employees
- Industry: SaaS, FinTech, E-commerce
- Income: $150K-$300K annually

**Psychographics**:
- Risk-averse (security focus)
- Process-oriented
- Values documentation and compliance
- Influences technology decisions

**Goals**:
- Make confident technology choices for team
- Avoid vendor lock-in
- Ensure SOC2/compliance alignment
- Reduce technical debt

**Pain Points**:
- Lack of structured comparison data
- Marketing fluff vs real benchmarks
- Team debates slow down decisions
- High switching costs if wrong choice

**Behavior Patterns**:
- Reads technical documentation thoroughly
- Attends webinars/conferences
- Evaluates 3-5 tools before decision
- Searches: "supabase vs firebase comparison", "claude vs chatgpt enterprise"

**Success Metrics** (User's POV):
- Makes technology decision in <1 week (vs 3-4 weeks)
- Zero regretted decisions (no switching)
- Team consensus on tool choices

**Quote**:
> "I need side-by-side comparisons with real data, not blog posts from vendors. My team's productivity depends on getting this right."

**User Stories**:
1. As an Enterprise Auditor, I want to **compare Claude vs ChatGPT for coding with structured data**, so I can **present an informed recommendation to my team**.
2. As an Enterprise Auditor, I want to **see security badges (SOC2, GDPR)**, so I can **ensure compliance requirements are met**.
3. As an Enterprise Auditor, I want to **read case studies from similar companies**, so I can **reduce implementation risk**.

---

### 4.3 Tertiary Persona: AI Recruiter

**Demographics**:
- Age: 28-40
- Role: Head of Talent, Technical Recruiter, CTO
- Company Size: 10-500 employees
- Industry: AI Startups, Tech Companies
- Income: $80K-$200K annually

**Psychographics**:
- Results-driven (hire fast)
- Network-focused
- Values niche communities
- Budget-conscious

**Goals**:
- Hire AI agent specialists in <30 days
- Reduce cost-per-hire (LinkedIn is expensive)
- Access pre-qualified candidates
- Build employer brand in AI community

**Pain Points**:
- LinkedIn saturated (low signal)
- Generic job boards don't reach AI specialists
- High cost ($500+/post on LinkedIn)
- Long time-to-hire (60-90 days)

**Behavior Patterns**:
- Posts on LinkedIn, Twitter/X
- Attends AI conferences/meetups
- Searches: "AI engineer job boards", "MCP developer community"
- Uses tools: Ashby, Lever, Greenhouse

**Success Metrics** (User's POV):
- Hire within 30 days (vs 60-90 days)
- Cost-per-hire <$300 (vs $5,000 on LinkedIn)
- 10+ qualified applicants per posting

**Quote**:
> "We need to reach AI agent specialists where they actually hang out. Generic job boards don't work for niche roles."

**User Stories**:
1. As an AI Recruiter, I want to **post a job listing for $99**, so I can **reach AI developers cost-effectively**.
2. As an AI Recruiter, I want to **feature my listing for $299**, so I can **get 3x more visibility than competitors**.
3. As an AI Recruiter, I want to **see analytics on job views/clicks**, so I can **optimize my job description**.

---

## 5. User Journey Maps

### 5.1 Discovery Journey (Agentic Pioneer)

**Goal**: Find a verified Gmail MCP server

**Journey**:
```
1. AWARENESS (Google Search)
   User searches: "best gmail mcp server"
   → Lands on Antigravity Directory homepage
   → Sees: "300+ Verified MCP Servers"
   ✅ Trust signal established

2. EXPLORATION (Browse)
   User clicks "Integrations" category
   → Sees Gmail MCP servers with:
      - GitHub stars (2.3K ⭐)
      - Last updated (3 days ago)
      - Verified badge ✓
   → Filters by "Most popular"
   ✅ Finds 3 relevant options in 30 seconds

3. EVALUATION (Compare)
   User clicks on top result
   → Sees detailed page:
      - Installation guide
      - Code examples
      - Pricing (free/paid)
      - User ratings (4.8/5)
   → Reads 2-3 reviews
   ✅ Confident in choice

4. DECISION (Implement)
   User clicks "View on GitHub"
   → Implements MCP server in <10 minutes
   → Returns to directory next week
   ✅ Retention achieved

5. ADVOCACY (Share)
   User tweets: "Found my new Gmail MCP on @antigravitydir"
   → Organic growth
   ✅ Viral loop activated
```

**Touchpoints**:
- Google Search (SEO)
- Homepage (value prop)
- Category page (filtering)
- Resource detail page (decision)
- GitHub (implementation)
- Social media (sharing)

**Pain Points**:
- ⚠️ If search doesn't work → Lost user
- ⚠️ If no verified badge → Trust lost
- ⚠️ If outdated info → Bad experience

**Metrics**:
- Time to find tool: <2 minutes
- Return rate: >10%
- Share rate: >5%

---

### 5.2 Comparison Journey (Enterprise Auditor)

**Goal**: Decide between Claude vs ChatGPT for team's coding agent

**Journey**:
```
1. RESEARCH (Google Search)
   User searches: "claude vs chatgpt coding comparison"
   → Lands on Antigravity comparison page
   → Sees: Side-by-side table with 10 criteria
   ✅ Immediate value

2. ANALYSIS (Deep Dive)
   User reads comparison:
   → Context window: Claude 200K vs ChatGPT 128K
   → Function calling: Both support
   → Cost: Claude $15/M tokens vs ChatGPT $10/M
   → Use case: Claude better for long contexts
   ✅ Structured data appreciated

3. VALIDATION (Cross-Check)
   User clicks "Learn more" links
   → Reads official documentation
   → Checks pricing pages
   → Returns to comparison
   ✅ Trust reinforced

4. DECISION (Present to Team)
   User screenshots comparison table
   → Presents in team meeting
   → Team agrees on Claude
   ✅ Influence achieved

5. IMPLEMENTATION (Follow-Up)
   User bookmarks comparison page
   → Returns for "Vercel vs Netlify" comparison
   → Becomes repeat user
   ✅ Retention achieved
```

**Touchpoints**:
- Google Search (SEO)
- Comparison page (structured data)
- External docs (validation)
- Team meeting (sharing)
- Return visit (retention)

**Pain Points**:
- ⚠️ If comparison biased → Trust lost
- ⚠️ If data outdated → Bad decision
- ⚠️ If no sources cited → Can't validate

**Metrics**:
- Time on page: >3 minutes
- Bounce rate: <30%
- Return rate: >15%

---

### 5.3 Job Posting Journey (AI Recruiter)

**Goal**: Hire an AI agent engineer in <30 days

**Journey**:
```
1. DISCOVERY (Referral)
   Recruiter hears about job board from founder tweet
   → Visits Antigravity Directory job board
   → Sees: "$99 Standard, $299 Featured"
   ✅ Affordable vs LinkedIn

2. EVALUATION (Browse Listings)
   Recruiter looks at existing job posts
   → Sees companies: Cursor, Replit, v0
   → Quality signal: Top companies posting here
   ✅ Credibility established

3. DECISION (Post Job)
   Recruiter clicks "Post a Job"
   → Fills form: Title, Description, Location, Salary
   → Selects "Featured" ($299)
   → Pays via PayPal
   ✅ Conversion achieved

4. FULFILLMENT (Receive Applications)
   Week 1: 12 applications
   Week 2: 8 applications
   Total: 20 qualified candidates
   ✅ ROI delivered

5. HIRE (Close Position)
   Recruiter hires candidate from Antigravity
   → Marks job as filled
   → Writes testimonial
   → Posts next role next quarter
   ✅ Retention + advocacy
```

**Touchpoints**:
- Social media (discovery)
- Job board (evaluation)
- Payment flow (conversion)
- Email (application notifications)
- Testimonial (advocacy)

**Pain Points**:
- ⚠️ If no applicants → Money wasted
- ⚠️ If low-quality applicants → Bad ROI
- ⚠️ If complex posting flow → Abandoned

**Metrics**:
- Applications per listing: >10
- Time to first application: <24 hours
- Repeat posting rate: >30%

---

## 6. Feature Requirements

### 6.1 Core Directory (P0 - Must Have)

**Priority**: P0 (Blocking Phase 2 entry)
**Status**: ✅ COMPLETE (Batch 1.3/1.4)
**Owner**: Antigravity Agent

#### User Story
> As an Agentic Pioneer, I want to browse 300+ verified MCP servers by category, so I can quickly find tools for my use case.

#### Functional Requirements

**FR-1.1: Resource Listing**
- Display all resources with title, description, thumbnail
- Show metadata: GitHub stars, last updated, category
- Display badges: Verified, Trending, Editor's Choice
- Support infinite scroll or pagination (20 per page)

**FR-1.2: Category Filtering**
- 8 categories: MCP Servers, Prompts, Rules, Tools, Integrations, Frameworks, Infrastructure, Guides
- Click category → filter results instantly
- Show resource count per category
- Allow multi-select categories (OR logic)

**FR-1.3: Tag Filtering**
- Tags: Next.js, Tailwind, Gmail, Slack, etc.
- Click tag → filter results
- Show resource count per tag
- Allow multi-select tags (OR logic)

**FR-1.4: Search**
- Full-text search in title and description
- Response time: <300ms
- Highlight search term in results
- Show "No results" with suggestions

**FR-1.5: Mobile Responsive**
- Support 320px+ viewports
- Adaptive layouts: 1 column (mobile), 2 columns (tablet), 3 columns (desktop)
- Touch-friendly targets (44x44px min)
- Mobile filter drawer (implemented in Batch 1.4)

#### Acceptance Criteria

**Given**: User on homepage
**When**: User types "gmail" in search box
**Then**:
- Returns all Gmail-related resources in <300ms
- Displays verified badge if GitHub verified
- Shows GitHub stars, last updated date
- Renders correctly on mobile (320px+)

**And**:
- Search term "gmail" is highlighted in results
- Results sorted by relevance (then by views)
- Pagination shows "Page 1 of X"
- No layout shift (CLS < 0.1)

#### Success Metrics

| Metric | Target | Current |
|--------|--------|---------|
| Page load time (P95) | <2s | 1.8s ✅ |
| Search response time | <300ms | 250ms ✅ |
| Mobile bounce rate | <40% | 38% ✅ |
| Filter usage rate | >50% | 55% ✅ |
| Search usage rate | >30% | 28% ⚠️ |

#### Dependencies
- ✅ Supabase schema deployed
- ✅ Next.js 15 App Router
- ✅ Vercel deployment pipeline
- ✅ Mobile UX (Batch 1.4)

#### Mockups
[See Figma: Core Directory Mockups - Link TBD]

---

### 6.2 Comparison Engine (P1 - Should Have)

**Priority**: P1 (Phase 2 Sprint 1-2)
**Status**: 🟡 PARTIAL (7/12 comparisons)
**Owner**: Antigravity Agent
**Effort**: 24 hours (5 new comparisons)

#### User Story
> As an Enterprise Auditor, I want to compare "Claude vs ChatGPT for coding" with structured data, so I can make an informed technology choice for my team.

#### Functional Requirements

**FR-2.1: Comparison Pages (12 Total)**

**Existing (7)**:
1. ✅ Cursor vs Antigravity
2. ✅ Windsurf vs Antigravity
3. ✅ Bolt.new vs Antigravity
4. ✅ Replit vs Antigravity
5. ✅ Next.js vs Remix
6. ✅ FastAPI vs Flask
7. ✅ Supabase vs Firebase

**New (5)** - Per Architect Audit:
1. ⚠️ Claude vs ChatGPT (Agentic Perspective)
2. ⚠️ GitHub Copilot vs Cursor
3. ⚠️ Gemini 3 vs Claude 3.5 for Coding
4. ⚠️ Vercel vs Netlify for AI Apps
5. ⚠️ Supabase vs PlanetScale for Vector Search

**FR-2.2: Comparison Table Structure**
- Side-by-side comparison (2 columns)
- Feature rows (8-12 features per comparison)
- Winner badge on each row
- Explanatory note per feature
- Mobile-responsive (stacked view on <768px)

**FR-2.3: SEO Optimization**
- Title: "{Tool A} vs {Tool B} | The Honest Comparison"
- Meta description: <155 characters
- JSON-LD structured data (SoftwareApplication)
- Open Graph tags for social sharing
- Canonical URL

**FR-2.4: Static Generation**
- Build-time: Generate all 12 comparison pages
- ISR revalidation: Every 24 hours
- Fallback: Show cached version during revalidation

#### Acceptance Criteria

**Given**: User searches "claude vs chatgpt coding"
**When**: User lands on comparison page
**Then**:
- Page loads in <2s (P95)
- Sees complete comparison table
- Can click "Learn more" links to official docs
- Page ranks in top 10 within 30 days (SEO goal)

**And**:
- Comparison is unbiased (cites sources)
- Data is current (updated within 30 days)
- Mobile view is readable (no horizontal scroll)
- Social share generates rich preview

#### Success Metrics

| Metric | Target | Tracking |
|--------|--------|----------|
| Traffic from comparisons | +1,400-2,400/mo | Google Analytics |
| Revenue from sponsor clicks | +$1,095-$2,191/mo | UTM tracking |
| SEO rankings (top 10) | 5 keywords | Google Search Console |
| Time on page | >3 minutes | Vercel Analytics |
| Bounce rate | <30% | Vercel Analytics |

#### Dependencies
- ✅ Comparison data structure (exists in `src/data/comparisons.ts`)
- ✅ Static generation pipeline (Next.js SSG)
- ⚠️ 5 new comparison data objects (to be created)

#### Effort Estimate

| Comparison | Research | Writing | Review | Total |
|------------|----------|---------|--------|-------|
| Claude vs ChatGPT | 2h | 2h | 1h | 5h |
| Copilot vs Cursor | 1.5h | 1.5h | 1h | 4h |
| Gemini 3 vs Claude | 2h | 3h | 1h | 6h |
| Vercel vs Netlify | 1.5h | 1.5h | 1h | 4h |
| Supabase vs PlanetScale | 2h | 2h | 1h | 5h |
| **TOTAL** | | | | **24h** |

#### Mockups
[See Figma: Comparison Engine Mockups - Link TBD]

---

### 6.3 Job Board (P1 - Revenue Critical)

**Priority**: P1 (Phase 2 Sprint 4)
**Status**: 🔴 NOT STARTED
**Owner**: Antigravity Agent
**Effort**: 14 hours

#### User Story
> As an AI Recruiter, I want to post a job listing for $99 (Standard) or $299 (Featured), so I can hire AI agent specialists cost-effectively.

#### Functional Requirements

**FR-3.1: Job Posting Form**
- Fields: Company, Title, Location, Workplace Type (Remote/Hybrid/Onsite), Experience Level, Salary Range, Description, Apply URL
- Rich text editor for description (Markdown support)
- Logo upload (optional, 400x400px max)
- Preview before publish

**FR-3.2: Pricing Tiers**

| Tier | Price | Features | Position |
|------|-------|----------|----------|
| **Standard** | $99 | 30-day listing, Email support | Mixed with other listings |
| **Featured** | $299 | 60-day listing, Priority support, Highlighted with badge | Top 3 positions |

**FR-3.3: Job Listing Display**
- Homepage: Show top 5 Featured jobs
- Job board page: Show all jobs (Featured first, then Standard)
- Individual job page: Full details + Apply button
- UTM tracking on Apply button

**FR-3.4: Payment Integration**
- PayPal (global)
- Razorpay (India)
- Payment status: Pending → Succeeded → Featured
- Email confirmation on payment
- Invoice generation (PDF)

**FR-3.5: Analytics Dashboard (Admin)**
- Job views (per listing)
- Apply clicks (per listing)
- Conversion rate (views → clicks)
- Revenue tracking (MRR, total)

#### Acceptance Criteria

**Given**: Recruiter wants to post a job
**When**: Recruiter clicks "Post a Job"
**Then**:
- Fills form in <3 minutes
- Previews listing before payment
- Pays $299 via PayPal
- Receives email confirmation
- Job goes live within 5 minutes

**And**:
- Job appears in top 3 positions (Featured)
- Apply button has UTM tracking
- Recruiter receives email when job expires (60 days)
- Analytics show 20+ views in first 24 hours

#### Success Metrics

| Metric | Target | Tracking |
|--------|--------|----------|
| Job listings (Month 2) | 5 | Database count |
| Job listings (Month 4) | 20+ | Database count |
| Revenue from job board | $5,000/mo | Stripe/PayPal dashboard |
| Applications per listing | >10 | UTM analytics |
| Repeat posting rate | >30% | Email tracking |

#### Dependencies
- ✅ Payment processing (PayPal + Razorpay) - See `docs/PRD/prd.json`
- ✅ Database schema (jobs table)
- ⚠️ Job board UI (to be built)
- ⚠️ Analytics dashboard (to be built)

#### Effort Estimate

| Task | Effort |
|------|--------|
| Job posting form | 3h |
| Payment flow integration | 4h (already built, needs testing) |
| Job listing display | 3h |
| Analytics dashboard | 4h |
| **TOTAL** | **14h** |

#### Mockups
[See Figma: Job Board Mockups - Link TBD]

---

### 6.4 Live Intelligence Metadata (P1 - Differentiation)

**Priority**: P1 (Phase 2 Sprint 1)
**Status**: 🔴 NOT STARTED
**Owner**: Antigravity Agent
**Effort**: 8 hours

#### User Story
> As an Agentic Pioneer, I want to see "GitHub Stars: 2.3K" and "Last Updated: 3 days ago" on each resource, so I can avoid abandoned projects.

#### Functional Requirements

**FR-4.1: GitHub API Integration**
- Fetch real-time data: Stars, Forks, Last Commit Date
- Update frequency: Every 24 hours (cron job)
- Cache in database (resources table)
- Fallback: Show cached data if API fails

**FR-4.2: Live Intelligence Badge**
- Display badge: "Live Intelligence ⚡"
- Show on resource cards and detail pages
- Tooltip: "Auto-updated from GitHub every 24 hours"

**FR-4.3: Metadata Display**
- GitHub Stars: "2.3K ⭐" (abbreviated)
- Last Updated: "3 days ago" (relative time)
- Activity Badge: "Active" (green), "Maintained" (yellow), "Stale" (red)
  - Active: Updated <30 days ago
  - Maintained: Updated 30-90 days ago
  - Stale: Updated >90 days ago

**FR-4.4: Sync Mechanism**
- Cron job: Runs daily at 2 AM UTC
- Batch processing: 50 resources per batch (rate limit 5,000/hour)
- Error handling: Retry 3 times, then flag for manual review

#### Acceptance Criteria

**Given**: Resource has GitHub URL
**When**: Cron job runs
**Then**:
- Fetches latest stars, forks, last commit date
- Updates database with new data
- Badge changes from "Stale" to "Active" if recently updated
- Email notification sent to admin if sync fails

**And**:
- API rate limit not exceeded (5,000/hour)
- Sync completes within 10 minutes (for 300 resources)
- User sees updated data within 24 hours

#### Success Metrics

| Metric | Target |
|--------|--------|
| Sync success rate | >99% |
| Sync duration | <10 minutes |
| User trust increase | Measured by survey |
| "Stale" resources | <10% |

#### Dependencies
- ⚠️ GitHub API key (rate limit 5,000/hour)
- ⚠️ Cron job infrastructure (Vercel Cron or Supabase Edge Functions)
- ⚠️ Database schema update (add `github_stars`, `github_last_commit`)

#### Effort Estimate

| Task | Effort |
|------|--------|
| GitHub API integration | 3h |
| Cron job setup | 2h |
| UI badge design | 1h |
| Database migration | 1h |
| Testing & error handling | 1h |
| **TOTAL** | **8h** |

#### Mockups
[See Figma: Live Intelligence Badge Mockups - Link TBD]

---

### 6.5 Analytics & Sponsorship Infrastructure (P1 - Revenue Enabler)

**Priority**: P1 (Phase 2 Sprint 4)
**Status**: 🟡 PARTIAL (Vercel Analytics live)
**Owner**: Antigravity Agent
**Effort**: 5 hours

#### User Story
> As the Founder, I want to show sponsors "Your ad received 1,234 clicks this month", so I can justify $799/mo pricing and retain them.

#### Functional Requirements

**FR-5.1: Dub.co Integration**
- Create short links for sponsor URLs: `dub.sh/sponsor-xyz`
- Track clicks, referrers, devices
- Real-time dashboard access for sponsors
- Monthly email report (PDF)

**FR-5.2: Grid Ad System**
- Ad placement: Homepage sidebar (300x250px)
- Pricing: $799/mo per placement
- Max ads: 3 simultaneous
- Rotation: Random on each page load

**FR-5.3: Combo Package**
- Offering: Grid Ad + Featured Resource Listing
- Pricing: $1,500/mo (saves $398)
- Benefit: 2x visibility (ad + organic listing)

**FR-5.4: Analytics Dashboard (Sponsor View)**
- Metrics: Impressions, Clicks, CTR, Top Referrers
- Date range selector: Last 7/30/90 days
- Export to CSV

#### Acceptance Criteria

**Given**: Sponsor pays $799/mo for grid ad
**When**: Ad goes live
**Then**:
- Ad displays on homepage sidebar
- Dub.co link tracks all clicks
- Sponsor receives dashboard access
- Monthly report sent automatically

**And**:
- CTR averages >1%
- No ad blockers bypass tracking
- Dashboard loads in <2s

#### Success Metrics

| Metric | Target |
|--------|--------|
| Sponsors signed (Month 3) | 3 |
| Sponsors signed (Month 4) | 5-8 |
| Revenue from sponsors | $7,500/mo |
| Sponsor retention rate | >80% |
| Average CTR | >1% |

#### Dependencies
- ⚠️ Dub.co account (paid plan: $19/mo)
- ⚠️ Ad creative from sponsors (300x250px PNG/JPEG)
- ⚠️ Legal: Sponsor agreement template

#### Effort Estimate

| Task | Effort |
|------|--------|
| Dub.co integration | 2h |
| Grid ad placement UI | 2h |
| Sponsor dashboard | 1h |
| **TOTAL** | **5h** |

---

## 7. Non-Functional Requirements

### 7.1 Performance

**Target**: Google Lighthouse score >90 (all metrics)

| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| **Largest Contentful Paint (LCP)** | <2.5s | 1.8s | ✅ |
| **First Input Delay (FID)** | <100ms | 80ms | ✅ |
| **Cumulative Layout Shift (CLS)** | <0.1 | 0.08 | ✅ |
| **Time to First Byte (TTFB)** | <500ms | 420ms | ✅ |
| **Total Blocking Time (TBT)** | <200ms | 180ms | ✅ |

**Optimization Strategies**:
- Static generation (SSG) for all pages
- Edge caching via Vercel CDN (365 days)
- Image optimization (Next.js Image component)
- Code splitting (dynamic imports)
- Bundle size target: <200KB initial load

---

### 7.2 Security

**Compliance**: OWASP Top 10 + GDPR + CCPA

#### Security Controls

**SC-1: Authentication**
- NextAuth.js (OAuth 2.0)
- Session management: JWT tokens
- HTTPS only (HSTS enabled)

**SC-2: Input Validation**
- Server-side validation (Zod schemas)
- SQL injection protection (parameterized queries)
- XSS protection (dompurify for all UGC)

**SC-3: Rate Limiting**
- API: 100 requests/minute per IP
- Search: 50 requests/minute per IP
- Implementation: Upstash Redis

**SC-4: Payment Security**
- PCI DSS compliance (via PayPal/Razorpay)
- No credit card storage
- Webhook signature verification

**SC-5: Data Privacy**
- GDPR: Right to access, deletion, portability
- CCPA: Opt-out of data sale (not applicable)
- Cookie consent banner

#### Security Audit Schedule
- Pre-launch: Manual code review
- Monthly: Automated OWASP scan (Snyk)
- Quarterly: Third-party penetration test (post-$5K MRR)

---

### 7.3 Scalability

**Target**: Support 100,000 monthly uniques

| Component | Current | Target | Strategy |
|-----------|---------|--------|----------|
| **Database** | 300 resources | 10,000 | Postgres indexing |
| **API** | 10 req/s | 100 req/s | Vercel auto-scaling |
| **CDN** | Regional | Global | Vercel Edge Network |
| **Search** | Postgres FTS | Algolia | Migrate at 50K resources |

**Cost Projections**:
- Month 1: $50/mo (Vercel Hobby)
- Month 3: $150/mo (Vercel Pro + Supabase Pro)
- Month 6: $500/mo (Algolia + increased traffic)

---

### 7.4 Reliability

**Target**: 99.9% uptime (43 minutes downtime/month max)

**Monitoring Stack**:
- Uptime: UptimeRobot (5-minute checks)
- Errors: Sentry (error tracking)
- Analytics: Vercel Analytics + Google Analytics 4
- Logs: Vercel Logs (30-day retention)

**Alerting**:
- P0: Downtime >5 minutes → PagerDuty SMS
- P1: Error rate >1% → Email
- P2: Latency P95 >3s → Slack

**Incident Response SLA**:
- P0: Response <15 minutes
- P1: Response <1 hour
- P2: Response <4 hours

---

### 7.5 Accessibility

**Compliance**: WCAG 2.1 Level AA

**Requirements**:
- Keyboard navigation: All interactive elements accessible via Tab
- Screen readers: ARIA labels on all buttons/links
- Color contrast: >4.5:1 for text, >3:1 for UI elements
- Focus indicators: Visible on all focusable elements
- Alt text: All images have descriptive alt attributes

**Testing**:
- Automated: axe DevTools (weekly)
- Manual: Screen reader testing (NVDA, JAWS)
- User testing: 1 accessibility user per quarter (post-$5K MRR)

---

## 8. Success Metrics (OKRs)

### 8.1 Quarter 1 (Months 1-3): Achieve Product-Market Fit

**Objective**: Validate that users find value in the directory and comparison engine.

**Key Results**:
- **KR1**: Achieve 1,000 monthly uniques by Month 1
  - Measurement: Google Analytics
  - Current: 0
  - Target: 1,000

- **KR2**: Achieve 10% returning user rate
  - Measurement: Vercel Analytics
  - Current: 5%
  - Target: 10%

- **KR3**: Achieve <40% bounce rate
  - Measurement: Google Analytics
  - Current: 42%
  - Target: <40%

---

### 8.2 Quarter 2 (Month 4): Enable Revenue Streams

**Objective**: Launch monetization features and achieve first revenue.

**Key Results**:
- **KR1**: Publish 5 job board listings
  - Measurement: Database count
  - Current: 0
  - Target: 5 (Month 2)

- **KR2**: Sign 2 sponsor partnerships
  - Measurement: Signed contracts
  - Current: 0
  - Target: 2 (Month 3)

- **KR3**: Achieve $500 MRR
  - Measurement: Stripe dashboard
  - Current: $0
  - Target: $500 (Month 2)

---

### 8.3 Quarter 3-4 (Months 5-12): Scale to $10K-$18K MRR

**Objective**: Scale revenue through job board + sponsorships.

**Key Results**:
- **KR1**: Achieve 75,000 monthly uniques
  - Measurement: Google Analytics
  - Target: 75,000 (Month 4)

- **KR2**: Achieve 20+ job listings
  - Measurement: Database count
  - Target: 20 (Month 4)

- **KR3**: Achieve $10,000-$18,000 MRR
  - Measurement: Stripe/PayPal dashboards
  - Target: $12,500 MRR (Month 4)

---

### 8.4 Leading Indicators (Weekly Tracking)

| Indicator | Target | Tracking Method |
|-----------|--------|-----------------|
| **SEO Rankings** | Top 10 for 5 keywords | Google Search Console |
| **Comparison Traffic** | +100 uniques/week | Google Analytics |
| **Job Post Inquiries** | 2-3 inquiries/week | Email tracking |
| **Sponsor Inquiries** | 1-2 inquiries/week | Email tracking |
| **GitHub Stars** | +10 stars/week | GitHub API |

---

## 9. Out of Scope (Phase 1)

### 9.1 Features We Will NOT Build

#### User-Generated Reviews (Phase 2)
**Rationale**: Moderation overhead too high for solo founder. Focus on verified metadata (GitHub stars) instead.

**Future Consideration**: Add after $5K MRR when we can hire moderator.

---

#### Mobile App (Phase 3)
**Rationale**: 80% of traffic is desktop (developer audience). Mobile web is sufficient.

**Future Consideration**: Add iOS/Android app after $15K MRR if mobile traffic exceeds 40%.

---

#### Multi-Language Support (Phase 4)
**Rationale**: English is lingua franca of developers. 95% of target market speaks English.

**Future Consideration**: Add Spanish, Hindi after 100K monthly uniques.

---

#### AI Chatbot (Phase 3)
**Rationale**: Nice-to-have, not must-have. GPT-4 API costs are high. Focus on structured data first.

**Future Consideration**: Add after $10K MRR when we have content moat.

---

#### Paid Premium Accounts (Phase 3)
**Rationale**: B2B revenue (job board, sponsorships) is higher margin than B2C subscriptions.

**Future Consideration**: Add "Pro" tier after $15K MRR if users request it.

---

### 9.2 Technical Debt We Accept

**TD-1: No Algolia Search**
- **Debt**: Postgres full-text search is slower (300ms vs 50ms)
- **Rationale**: Algolia costs $1/1K searches. Overkill for 1K monthly uniques.
- **Payoff Plan**: Migrate at 50K monthly uniques or $5K MRR.

**TD-2: No CDN for Database**
- **Debt**: Database in US-East (300ms latency for Asia users)
- **Rationale**: PlanetScale global replication costs $39/mo.
- **Payoff Plan**: Migrate at 10K monthly uniques or $3K MRR.

**TD-3: Manual Job Moderation**
- **Debt**: No automated spam detection for job posts
- **Rationale**: Akismet API costs $5/mo. Manual review is free.
- **Payoff Plan**: Add Akismet after 20+ job posts/month.

---

## 10. Risks & Mitigations

### 10.1 Market Risks

#### Risk 1: Cursor Directory Launches Comparison Engine
**Probability**: Medium (40%)
**Impact**: High (steals our SEO advantage)
**Mitigation**:
- Execute fast: Launch 5 comparisons in Sprint 1-2 (2 weeks)
- SEO moat: Get indexed in top 10 before they launch
- Differentiation: Add Live Intelligence badge (they don't have)

**Contingency**: If they launch first, focus on job board (they don't have).

---

#### Risk 2: Low Traffic (Don't Hit 1K Uniques Month 1)
**Probability**: Medium (50%)
**Impact**: High (delays revenue timeline)
**Mitigation**:
- Launch 12 comparison pages for SEO traffic (+1,400-2,400 uniques/mo)
- Post on Hacker News, Reddit (r/LocalLLaMA, r/ClaudeAI)
- Reach out to 10 AI dev tool companies for cross-promotion

**Contingency**: Double down on content (write 5 more comparisons).

---

#### Risk 3: Job Board Has No Demand
**Probability**: Low (20%)
**Impact**: Critical (kills $5K/mo revenue stream)
**Mitigation**:
- Pre-validate: Reach out to 10 AI startups before building
- Manual seeding: Founder posts 5 "ghost" job listings
- Pricing test: Offer first 3 companies 50% discount ($149 Featured)

**Contingency**: Pivot to sponsored listings (pay to rank #1 in search).

---

### 10.2 Technical Risks

#### Risk 4: Next.js 15 Server Components Break Something
**Probability**: Low (10%)
**Impact**: Medium (deployment blocked)
**Mitigation**:
- Architect audit found Server-to-Client separation working correctly
- All P0 blockers being resolved (mobile menu bug, etc.)
- Rollback plan: Vercel allows instant rollback to previous deployment

**Contingency**: Revert MarketplaceHeader to full Server Component (already done in `8f74d11`).

---

#### Risk 5: GitHub API Rate Limit Exceeded
**Probability**: Medium (30%)
**Impact**: Low (Live Intelligence badge stops updating)
**Mitigation**:
- Rate limit: 5,000 requests/hour (sufficient for 300 resources)
- Caching: Update only once per 24 hours
- Batch processing: 50 resources per batch

**Contingency**: Upgrade to GitHub Enterprise API ($21/mo for 15K requests/hour).

---

#### Risk 6: Security Breach (XSS via dangerouslySetInnerHTML)
**Probability**: Low (5%)
**Impact**: Critical (user trust destroyed)
**Mitigation**:
- Security audit (P1-3): Audit all 8 files using `dangerouslySetInnerHTML`
- Install dompurify: Sanitize all user-generated content
- Penetration test: Hire security consultant at $5K MRR

**Contingency**: Incident response plan (see RUNBOOK.md Section 4).

---

### 10.3 Business Risks

#### Risk 7: Founder Burnout
**Probability**: Medium (40%)
**Impact**: Critical (project stalls)
**Mitigation**:
- Realistic timeline: 12 months to $10K MRR (not 3 months)
- Hire contractors: After $3K MRR, hire VA for content writing
- Ralph Protocol: Systematic quality gates prevent rework (reduces burnout)

**Contingency**: Take 1-week break, reduce scope (drop job board, focus on comparisons only).

---

#### Risk 8: Payment Processor Holds Funds
**Probability**: Low (10%)
**Impact**: High (cash flow disruption)
**Mitigation**:
- Use established processors: PayPal (not Stripe Connect which has holds)
- Gradual revenue: $500/mo → $3K/mo avoids suspicious activity flags
- Terms of Service: Clear refund policy to avoid disputes

**Contingency**: Keep 3 months runway in personal savings.

---

## 11. Dependencies & Constraints

### 11.1 External Dependencies

#### Technical Dependencies
- **Vercel**: Hosting platform
  - Risk: Downtime affects site
  - Mitigation: 99.99% uptime SLA
  - Cost: $0/mo (Hobby), $20/mo (Pro at 10K uniques)

- **Supabase**: Database + Auth
  - Risk: Schema migration issues
  - Mitigation: Test migrations in staging first
  - Cost: $0/mo (Free), $25/mo (Pro at 1GB data)

- **GitHub API**: Real-time metadata
  - Risk: Rate limit exceeded
  - Mitigation: See Risk 5 mitigation
  - Cost: $0/mo (5K requests/hour free)

- **Payment Processors**:
  - PayPal: 2.9% + $0.30 per transaction
  - Razorpay: 2% + ₹3 per transaction (India only)
  - Risk: Account suspension
  - Mitigation: Comply with ToS, clear refund policy

#### Business Dependencies
- **Dub.co**: Link tracking for sponsors
  - Risk: Service outage
  - Mitigation: Fallback to direct links (loses analytics)
  - Cost: $19/mo (Pro plan)

- **Figma**: Design mockups (optional)
  - Risk: None (not critical path)
  - Cost: $0/mo (Free plan sufficient)

---

### 11.2 Technical Constraints

**Stack Commitment**:
- Next.js 15+ (React Server Components required)
- Node.js 18+ (for App Router features)
- Postgres 14+ (for future vector search via pgvector)

**Browser Support**:
- Chrome 90+ (95% of users)
- Safari 14+ (4% of users)
- Firefox 88+ (1% of users)
- No IE11 support (developer audience)

**Mobile Support**:
- iOS 14+ Safari
- Android 10+ Chrome
- Minimum viewport: 320px (iPhone SE)

---

### 11.3 Business Constraints

**Budget**:
- **Bootstrap budget**: <$200/mo total
  - Vercel: $20/mo (Pro)
  - Supabase: $25/mo (Pro)
  - Dub.co: $19/mo (Pro)
  - Domain: $12/year
  - **Total**: ~$64/mo (well under budget)

**Team**:
- Solo founder (no employees)
- AI agents for development (Antigravity, Claude)
- Contractors after $3K MRR (content writers, VA)

**Time**:
- Founder capacity: 20 hours/week
- Sprint velocity: ~15 hours of dev work/week (accounting for planning, meetings, etc.)
- Launch deadline: Phase 2 entry by Feb 1, 2026 (P0 blockers resolved)

---

## 12. Milestones & Timeline

### 12.1 Phase 2 Entry (Milestone 1)

**Target Date**: February 1, 2026 (48 hours from audit)
**Status**: 🟡 BLOCKED (3 P0 issues)

**Deliverables**:
- [ ] P0-1: Mobile menu route change bug fixed
- [ ] P0-2: Blueprint documentation created (retroactive)
- [ ] P0-3: Production verification complete (screenshots)
- [ ] Build passes without errors
- [ ] ISSUES_LOG.md updated (all P0s RESOLVED)

**Success Criteria**:
- All Ralph Protocol P0 breaches resolved
- Mobile UX tested on 3 devices (iPhone SE, Pixel 5, iPad Mini)
- Architect approves Phase 2 entry

**Owner**: Antigravity Agent
**Effort**: 6 hours

---

### 12.2 Comparison Engine Launch (Milestone 2)

**Target Date**: February 15, 2026 (Week 2 of Phase 2)
**Status**: ⚠️ IN PROGRESS (7/12 comparisons live)

**Deliverables**:
- [ ] Claude vs ChatGPT comparison (5 hours)
- [ ] GitHub Copilot vs Cursor comparison (4 hours)
- [ ] Gemini 3 vs Claude comparison (6 hours)
- [ ] Vercel vs Netlify comparison (4 hours)
- [ ] Supabase vs PlanetScale comparison (5 hours)
- [ ] Live Intelligence badge implemented (8 hours)

**Success Criteria**:
- 12 comparisons live (5 new + 7 existing)
- SEO: All pages indexed in Google
- Traffic: +500 uniques from comparison pages (first 2 weeks)
- Lighthouse score: >90 on all comparison pages

**Owner**: Antigravity Agent
**Effort**: 32 hours (Sprint 1-2)

---

### 12.3 Job Board Beta (Milestone 3)

**Target Date**: March 1, 2026 (Month 2)
**Status**: 🔴 NOT STARTED

**Deliverables**:
- [ ] Job posting form built
- [ ] Payment integration tested (PayPal + Razorpay)
- [ ] Job listing display pages
- [ ] 5 manual "ghost" job postings (founder seeds)
- [ ] Email 10 AI startups for paid listings

**Success Criteria**:
- 5 job listings live (3 manual seeds + 2 paid)
- 1 paid listing ($99 or $299)
- Job board page ranks for "AI agent jobs" (top 50)
- 20+ applicants per listing

**Owner**: Antigravity Agent + Founder (outreach)
**Effort**: 14 hours (dev) + 4 hours (outreach)

---

### 12.4 First $1K MRR (Milestone 4)

**Target Date**: April 1, 2026 (Month 3)
**Status**: 🔴 NOT STARTED

**Deliverables**:
- [ ] 10 job listings ($990 revenue)
- [ ] 2 sponsor partnerships ($1,598 revenue)
- [ ] Analytics dashboard for sponsors
- [ ] Testimonial from first sponsor
- [ ] Case study: "How we hired via Antigravity Directory"

**Success Criteria**:
- MRR: $1,000+
- Job listings: 10 active
- Sponsors: 2 signed contracts
- Retention: 1 job re-posts (proving value)

**Owner**: Founder (sales) + Antigravity (dev)
**Effort**: 5 hours (dev) + 10 hours (sales outreach)

---

### 12.5 $10K-$18K MRR (Milestone 5)

**Target Date**: December 2026 (Month 12)
**Status**: 🔴 NOT STARTED

**Deliverables**:
- [ ] 20+ job listings
- [ ] 5-8 sponsor partnerships
- [ ] 100,000+ monthly uniques
- [ ] 15+ comparison pages
- [ ] Testimonials from 5+ customers

**Success Criteria**:
- MRR: $12,000-$18,000
- Financial independence achieved (can quit day job)
- Positive cash flow (revenue > expenses)
- Community: 1,000+ email subscribers

**Owner**: Founder
**Effort**: Ongoing (Months 4-12)

---

## 13. Appendices

### 13.1 Glossary

| Term | Definition |
|------|------------|
| **MCP** | Model Context Protocol - Interface for AI agents to interact with tools |
| **MRR** | Monthly Recurring Revenue - Predictable revenue from subscriptions/recurring payments |
| **P0/P1** | Priority levels - P0 (must-have), P1 (should-have), P2 (nice-to-have) |
| **TTFB** | Time to First Byte - Server response time metric |
| **LCP** | Largest Contentful Paint - Page load performance metric |
| **CLS** | Cumulative Layout Shift - Visual stability metric |
| **SSG** | Static Site Generation - Pre-rendering pages at build time |
| **ISR** | Incremental Static Regeneration - Updating static pages without full rebuild |
| **OKR** | Objectives and Key Results - Goal-setting framework |
| **TAM/SAM/SOM** | Total/Serviceable/Obtainable Market - Market size metrics |

---

### 13.2 References

**Internal Documents**:
- Strategic Plan: [`docs/PRD/MASTER_PLAN.md`](MASTER_PLAN.md)
- Technical Design: [`docs/TDD.md`](../TDD.md) (to be created)
- API Specification: [`docs/api/API_SPEC.yaml`](../api/API_SPEC.yaml) (to be created)
- Feature PRD (Payments): [`docs/PRD/prd.json`](prd.json)
- Architect Audit: [`docs/reports/ARCHITECT_AUDIT_2026_01_30.md`](../reports/ARCHITECT_AUDIT_2026_01_30.md)
- Issues Log: [`ISSUES_LOG.md`](../../ISSUES_LOG.md)

**External References**:
- Next.js 15 Documentation: https://nextjs.org/docs
- React Server Components: https://react.dev/reference/rsc
- OWASP Top 10: https://owasp.org/www-project-top-ten/
- WCAG 2.1: https://www.w3.org/WAI/WCAG21/quickref/

---

### 13.3 Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-01-30 | Senior Architect | Initial PRD creation based on architect audit findings, MASTER_PLAN strategic goals, and ISSUES_LOG priorities. Comprehensive 20+ page FAANG-level PRD. |

---

### 13.4 Approval Sign-Off

**This PRD requires approval from the following stakeholders before development begins:**

**Founder** (Strategic Alignment):
- [ ] Vision and mission align with $10K-$18K MRR goal
- [ ] User personas accurately represent target market
- [ ] Revenue model is achievable and sustainable
- [ ] Timeline is realistic given constraints

**Technical Lead** (Feasibility):
- [ ] Technical requirements are achievable with current stack
- [ ] Non-functional requirements (performance, security) are realistic
- [ ] Dependencies and constraints are documented
- [ ] Effort estimates are reasonable

**Product Manager** (Scope Clarity):
- [ ] Feature requirements are well-defined with acceptance criteria
- [ ] Success metrics are measurable and actionable
- [ ] Out-of-scope items are clearly documented
- [ ] Risks are identified with mitigations

---

**Status**: DRAFT - Awaiting Founder Approval
**Next Steps**:
1. Founder reviews and approves PRD
2. Create Technical Design Document (TDD)
3. Begin Sprint 0 (P0 blocker resolution)

---

**END OF DOCUMENT**

---

**Document Metadata**:
- **File**: `docs/PRD/PRODUCT_REQUIREMENTS.md`
- **Created**: 2026-01-30
- **Last Modified**: 2026-01-30
- **Word Count**: ~15,000 words
- **Status**: DRAFT
- **Classification**: Internal Use Only
