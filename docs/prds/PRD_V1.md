# PRD v1 — googleantigravity.directory
**Version**: 1.0 — LOCKED
**Date**: 2026-03-07
**Status**: APPROVED
**Reference**: `docs/business/PRODUCT_BRIEF.md`

---

## THE ONE GOAL

**$2,000 MRR AS FAST AS POSSIBLE.**

This PRD exists to get the site live. A live site with correct pages and no broken features earns the first sponsor. The first sponsor = $2,000 MRR. Build only what is in this document.

---

## HOW TO USE THIS DOCUMENT

This is the contract between PM and Antigravity (the AI coder).

- Every feature listed under a page is IN SCOPE
- The NOT IN SCOPE section at the bottom is absolute — do not build, do not suggest, do not ask
- Acceptance criteria are the definition of done — if any criterion fails, the feature is not done
- If something is not listed here, it is not in scope

---

## PAGES IN V1

### P1 — Homepage (`/`)

**Purpose**: First impression. Show what the directory is, let users browse and search immediately.

**Layout** (top to bottom):
1. Header (sticky)
2. Hero section
3. Category grid (10 categories)
4. Featured resources carousel (promoted listings only — if none exist, hide section entirely)
5. Full resource listing with search + filter
6. Footer

**Hero section requirements**:
- H1: "The #1 resource directory for Google Antigravity IDE"
- Subheading: "3,116+ MCP servers, Skills, Rules, Prompts and more — free to browse, free to submit."
- Single CTA button: "Browse Resources" → scrolls to resource listing
- NO earnings claims, NO creator testimonials, NO "Collect$" language
- Dark background (`bg-black`), light text (`text-white`)

**Category grid requirements**:
- 10 cards, one per locked category
- Each card: category name, icon, live count from DB (not hardcoded), description, "Browse →" link
- Links to `/[category-slug]` e.g. `/mcp-servers`
- Section heading: "Browse by Category" (not "Shop by Category")

**Resource listing requirements**:
- Default: all resources, sorted by newest
- Search: filters by title + description, debounced 300ms
- Filter: by category (multi-select), no other filters needed at launch
- Sort: Newest, Most Viewed
- Pagination: load more button (not infinite scroll), 20 per page
- Each card: ResourceCard component (see Design Spec)

**Acceptance criteria**:
- [ ] Hero loads in <2s on mobile (375px)
- [ ] Category counts are live from DB — never hardcoded
- [ ] Search returns results within 500ms
- [ ] No payment UI, no checkout, no "earn" language anywhere
- [ ] Dark background (`bg-black`) throughout — no light backgrounds

---

### P2 — Browse Page (`/browse`)

**Status**: ~~DELETED — removed in TASK-013.~~ Search and filter functionality is on the homepage (P1). This page no longer exists — do not build or restore it.

---

### P3 — Category Pages (10 pages: `/mcp-servers`, `/skills`, `/rules`, `/prompts`, `/agents`, `/workflows`, `/boilerplates`, `/troubleshooting`, `/tutorials`, `/cheatsheets`)

**Purpose**: SEO landing page per category. Ranks for "[category] for antigravity" queries.

**Layout**:
1. Header
2. Category hero: H1, description, resource count
3. Resource grid (same as browse, pre-filtered to this category)
4. Footer

**SEO requirements per category page**:
- `<title>`: `[Category Name] for Google Antigravity | googleantigravity.directory`
- Meta description: unique per category (see SEO plan)
- H1: `[Category Name] for Google Antigravity IDE`
- BreadcrumbList schema markup
- Canonical URL

**Acceptance criteria**:
- [ ] Each of 10 category pages exists and loads
- [ ] Resources shown are correctly filtered to that category only
- [ ] Page title and H1 are correct per category
- [ ] Schema markup present

---

### P4 — Resource Detail Page (`/t/[slug]`)

**Purpose**: Individual resource page. SEO value per resource (3,116 pages at launch).

**Layout**:
1. Header
2. Breadcrumb: Home / [Category] / [Resource Name]
3. Resource title (H1)
4. Resource description
5. External link button: "Visit Resource" → `resource.url` (opens in new tab)
6. Category badge
7. Tags
8. Stats bar: Views, Copies, Rating (display only — no interactive rating at launch)
9. Resource content (if exists in DB — plain text, code block)
10. Copy button (copies content to clipboard)
11. Related resources (same category, 3–6 cards)
12. Footer

**What is NOT on this page**:
- No BuyButton
- No ClaimButton
- No ResourcePricingForm
- No "Premium Content" paywall
- No creator earnings display
- No "Promote Tool" link to a checkout

**Acceptance criteria**:
- [ ] Page loads for all 3,116 slugs without 404
- [ ] "Visit Resource" button opens correct URL in new tab
- [ ] Copy button copies `resource.content` to clipboard
- [ ] No payment or claiming UI present
- [ ] SoftwareApplication + FAQPage + BreadcrumbList schema present
- [ ] `robots: noindex` if resource status is not LIVE

---

### P5 — Submit Page (`/submit`)

**Purpose**: Free submission form. Anyone can submit a resource. No payment. No tiers.

**Layout**:
1. Header
2. Page title: "Submit a Resource"
3. Subheading: "Free to submit. Manually reviewed within 7 days."
4. Form (see fields below)
5. Submit button: "Submit Resource"
6. Footer

**Form fields**:
- Category (dropdown — the locked 10 categories)
- Resource name (text input, required)
- URL (url input, required)
- Short description (textarea, max 200 chars, required)
- GitHub URL (optional)
- Tags (optional, comma-separated)

**Form behaviour**:
- On submit: saves to DB with status `VETTING`
- Shows success message: "Submitted. We review every resource manually — expect a response within 7 days."
- No payment step
- No tier selection (Free / Paid)
- No checkout overlay

**What is NOT on this page**:
- No pricing cards ($49, $149)
- No CheckoutOverlay
- No PayPal or Razorpay
- No "Proceed to Payment" button
- No "Free" vs "Paid" category distinction
- No FAQs about why we charge (we don't)

**Acceptance criteria**:
- [ ] Form submits and saves to DB
- [ ] Success message shown after submit
- [ ] No payment UI of any kind
- [ ] Works without being logged in (auth optional for submit)

---

### P6 — Advertise Page (`/advertise`)

**Purpose**: B2B contact page for companies wanting to buy ad slots or promoted listings. No self-serve checkout.

**Layout**:
1. Header
2. Hero: "Reach 10,000+ Antigravity developers"
3. What we offer (ad placement options with pricing)
4. Contact form (name, company, email, message)
5. Footer

**Ad placement options to display** (information only — no buy button):
| Placement | Price |
|---|---|
| Homepage banner | $800–$1,500/month |
| Category page sponsor | $300–$500/month |
| Site-wide sponsor badge | $1,500–$2,000/month |
| Featured listing (homepage carousel) | $299/month |
| Featured listing (top of category) | $199/month |
| Promoted card | $99/month |

**Stats to display** (honest, no fabrication):
- "3,116+ resources indexed"
- "10 categories covering the full Antigravity ecosystem"
- "Launching [current date]"
- Do NOT claim traffic numbers we don't have yet

**Contact form fields**:
- Name (required)
- Company (required)
- Email (required)
- Which placement interests you (dropdown)
- Message (optional)
- Submit button: "Get in Touch"
- On submit: sends email to founder, shows confirmation

**What is NOT on this page**:
- No PayPal or Razorpay
- No self-serve checkout
- No "Standard Boost $49" or "Featured Sponsor $149" pricing
- No fake traffic stats ("50k monthly views", "10k active users")
- No fake social proof ("Trusted by Y Combinator")

**Acceptance criteria**:
- [ ] Contact form submits and sends email to founder
- [ ] Pricing is correct per business model
- [ ] No payment processing of any kind
- [ ] No fabricated stats

---

### P7 — About Page (`/about`)

**Purpose**: Who we are. Required by Google for site credibility and E-E-A-T signals.

**Content**:
- What the site is (1 paragraph)
- Why it exists (1 paragraph — the problem it solves)
- Who built it (founder, solo, India-based)
- Contact: email only (no social links)

**Acceptance criteria**:
- [ ] Page exists (currently 404 — footer links to it)
- [ ] Under 400 words
- [ ] No fabricated claims

---

### P8 — Auth Pages (`/auth/signin`)

**Purpose**: Google OAuth login. Required only for submitting a resource.

**Requirements**:
- Sign in with Google only
- After sign in, redirect to previous page or `/submit`
- No username/password
- No GitHub OAuth, no email magic link

**Acceptance criteria**:
- [ ] Google OAuth works
- [ ] Redirect after auth is correct
- [ ] No other auth methods shown

---

### P9 — Admin Submission Queue (`/admin/submissions`)

**Purpose**: Internal only. Founder reviews and approves/rejects submitted resources.

**Requirements**:
- Protected: admin role only
- List of submissions with status VETTING
- Approve button (sets status to LIVE)
- Reject button (sets status to REJECTED, optionally with reason)
- Not linked from public navigation

**What is NOT here**:
- No payout approval queue
- No creator earnings data
- No revenue stats

**Acceptance criteria**:
- [ ] Only accessible to users with role ADMIN
- [ ] Approve/reject works and updates DB
- [ ] Not reachable from public navigation

---

## NOT IN SCOPE — V1

This list is absolute. If it is not in the pages above, it does not exist in v1.

### Features — do not build
- Payment processing (Razorpay, PayPal, Stripe, any provider)
- Resource claiming or ownership assignment
- Creator earnings dashboard
- Sales history
- Payout request flow
- Payout approval queue (admin)
- BuyButton component
- ClaimButton component
- ClaimModal component
- CheckoutOverlay component
- ResourcePricingForm component
- "Premium Content" paywall on resource detail
- Marketplace pricing tiers on submit form
- Creator testimonials with earnings figures
- Members directory (`/members`)
- Public user profiles (`/u/[username]`)
- Follow/unfollow
- Bookmarks (remove or hide)
- Comparison pages (`/vs/[slug]`)
- Tools section (`/tools/*`)
- ROI calculator, token counter, RAG visualiser, prompt generator
- Job board
- Badge generator / embeddable badges
- Download page
- Sentry debug page (`/sentry-debug`)
- `google-antigravity` page
- `patterns` page

### API routes — delete or disable
- `/api/resources/[id]/claim`
- `/api/resources/[id]/claim-status`
- `/api/resources/[id]/purchase/razorpay`
- `/api/resources/[id]/purchase/paypal`
- `/api/resources/[id]/purchase/paypal/capture`
- `/api/webhooks/razorpay`
- `/api/creator/earnings`
- `/api/creator/sales`
- `/api/creator/payout/request`
- `/api/admin/payouts/[id]`
- `/api/checkout/create-order`
- `/api/checkout/capture-payment`
- `/api/checkout/razorpay/create-order`
- `/api/checkout/razorpay/verify`

### Pages — delete or redirect to homepage
- `/admin/payouts`
- `/vs` and `/vs/[slug]`
- `/compare/claude-vs-chatgpt`
- `/tools` and all sub-pages
- `/google-antigravity`
- `/patterns`
- `/sentry-debug`
- `/download`
- `/members`
- `/u/[username]` (public profile — defer to v2)

---

## ACCEPTANCE CRITERIA — LAUNCH READINESS CHECKLIST

Before any deployment to production, every item below must be checked:

### Build
- [ ] `npm run build` exits 0 (zero errors)
- [ ] `npm run lint` exits 0 (zero errors)
- [ ] No TypeScript errors
- [ ] `ralph-protocols` excluded from tsconfig.json

### Content
- [ ] All 10 category pages load with correct resources
- [ ] Resource detail pages load for a sample of 20 slugs across all categories
- [ ] Category counts on homepage grid are live from DB (not hardcoded)

### Forms
- [ ] Submit form saves to DB and shows success message
- [ ] Advertise contact form sends email to founder
- [ ] No payment UI on any public page

### SEO
- [ ] `sitemap.xml` accessible and lists all resource pages
- [ ] `robots.txt` correct
- [ ] Meta title and description present on all 9 page types
- [ ] Canonical URLs correct

### Design
- [ ] All public pages use dark mode: `bg-black` page background, `bg-white/[0.03]` cards
- [ ] No `bg-white` or `bg-slate-50` as page or card background (BANNED)
- [ ] Header: `bg-black/90`. Footer: `bg-slate-900`
- [ ] Mobile responsive at 375px and 1280px

### Payments / Marketplace
- [ ] No BuyButton visible anywhere
- [ ] No ClaimButton visible anywhere
- [ ] No CheckoutOverlay visible anywhere
- [ ] No payment API routes returning 200 (disable or delete them)
- [ ] No "earn", "commission", "payout", "creator earnings" copy anywhere public-facing
