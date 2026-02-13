# CODEBASE STATE ANALYSIS - Living Document
**Last Updated**: 2026-02-13 (Initial Comprehensive Scan)
**Next Update**: After ENTRY-010, ENTRY-011 completion
**Maintained By**: PM (Claude Code)
**Purpose**: Single source of truth for "what exists" in the codebase

---

## EXECUTIVE SUMMARY

**Project Status**: BETA-READY (Estimated 10-14 hours to launch)
**Tech Stack**: Next.js 16.1, TypeScript, Supabase PostgreSQL, Drizzle ORM, Playwright E2E
**Current Phase**: ENTRY-012 (Resource Pricing UI) - COMPLETED on 2026-02-13
**Build Status**: ✅ PASSING (0 errors, 4 warnings)
**Lint Status**: ⚠️ 4 warnings (react-hooks dependencies in filter components)

**What's Live & Working**:
- ✅ Resource marketplace with 300+ tools indexed
- ✅ GitHub OAuth authentication
- ✅ Resource claiming system (ENTRY-009)
- ✅ Razorpay + PayPal payment integration (ENTRY-008)
- ✅ Resource pricing UI with dynamic commission (ENTRY-012)
- ✅ **5 Free Tools for SEO** (Token Counter, ROI Calculator, JSON to Pydantic, Prompt Generator, RAG Visualizer)

**Beta Blockers (10-14 hours)**:
- 🔴 ENTRY-010: Creator Earnings Dashboard (components built, needs dashboard integration)
- 🔴 ENTRY-011: Claim Button UI Polish (basic working, needs UX enhancement)
- 🔴 Admin payout approval workflow (manual DB updates currently)

---

## 1. FEATURE INVENTORY (Complete List)

### ✅ LIVE & WORKING FEATURES

| Feature | Status | Location | E2E Tests | Last Modified |
|---------|--------|----------|-----------|---------------|
| **Homepage** | ✅ LIVE | `/src/app/page.tsx` | ✅ PASS | 2026-02-XX |
| **Browse Resources** | ✅ LIVE | `/src/app/browse/page.tsx` | ✅ PASS | 2026-02-XX |
| **Resource Detail Page** | ✅ LIVE | `/src/app/t/[slug]/page.tsx` | ✅ PASS | 2026-02-13 |
| **GitHub OAuth Auth** | ✅ LIVE | `/src/app/api/auth/[...nextauth]/route.ts` | ✅ PASS | 2026-02-XX |
| **Resource Claiming** | ✅ LIVE (ENTRY-009) | `/src/app/api/resources/[id]/claim` | ✅ PASS | 2026-02-12 |
| **Price Setting (Creators)** | ✅ LIVE (ENTRY-012) | `/src/components/ResourcePricingForm.tsx` | ✅ PASS | 2026-02-13 |
| **Razorpay Payments** | ✅ LIVE (ENTRY-008) | `/src/app/api/resources/[id]/purchase/razorpay` | ✅ PASS | 2026-02-10 |
| **PayPal Payments** | ✅ LIVE (ENTRY-008) | `/src/app/api/resources/[id]/purchase/paypal` | ✅ PASS | 2026-02-10 |
| **User Profiles** | ✅ LIVE | `/src/app/u/[username]/page.tsx` | ✅ PASS | 2026-02-XX |
| **Admin Dashboard** | ✅ LIVE | `/src/app/dashboard/page.tsx` | ⚠️ LIMITED | 2026-02-XX |
| **Resource Submission** | ✅ LIVE | `/src/app/submit/page.tsx` | ✅ PASS | 2026-02-XX |
| **Comparison Pages** | ✅ LIVE | `/src/app/vs/[slug]/page.tsx` | ✅ PASS | 2026-02-XX |
| **Rate Limiting** | ✅ LIVE | `/src/lib/ratelimit.ts` | ⚠️ UNIT | 2026-02-10 |

### 🆓 FREE TOOLS (SEO/pSEO Strategy) - 5 LIVE

**Location**: `/src/app/tools/` + `/src/components/tools/`

1. **TikToken Counter** (`/tools/token-counter`)
   - Component: `/src/components/tools/TokenCounter.tsx`
   - Purpose: Count tokens for GPT-4, Claude, Llama models
   - SEO Keywords: "token counter", "tiktoken", "gpt token count"
   - Status: ✅ LIVE

2. **LLM ROI Calculator** (`/tools/roi-calculator`)
   - Component: `/src/components/tools/RoiCalculator.tsx`
   - Purpose: Compare API costs across OpenAI, Anthropic, Google
   - SEO Keywords: "llm pricing", "api cost calculator", "ai roi"
   - Status: ✅ LIVE

3. **JSON to Pydantic** (`/tools/json-to-pydantic`)
   - Component: `/src/components/tools/JsonToPydantic.tsx`
   - Purpose: Convert JSON to Python Pydantic v1/v2 classes
   - SEO Keywords: "json to pydantic", "pydantic converter"
   - Status: ✅ LIVE

4. **System Prompt Generator** (`/tools/prompt-generator`)
   - Component: `/src/components/tools/PromptGenerator.tsx`
   - Purpose: Generate structured system instructions
   - SEO Keywords: "prompt generator", "system prompt", "llm instructions"
   - Status: ✅ LIVE

5. **RAG Chunking Visualizer** (`/tools/rag-visualizer`)
   - Component: `/src/components/tools/RagVisualizer.tsx`
   - Purpose: Visualize text chunking for vector databases
   - SEO Keywords: "rag chunking", "text splitter", "vector database"
   - Status: ✅ LIVE

**Infrastructure**:
- `/src/app/tools/page.tsx` - Tools index/landing page (SEO optimized)
- `/src/app/tools/layout.tsx` - Tools layout wrapper
- `/src/components/tools/ToolsShell.tsx` - Shared tool container
- `/src/components/tools/ToolsSidebar.tsx` - Tool navigation sidebar

**Tests**: ✅ `/src/components/tools/__tests__/ToolsShell.test.tsx`

**SEO Performance**: (TODO - Add Google Search Console data after launch)

---

### 🟡 BETA / IN-PROGRESS FEATURES

| Feature | Status | Blocker | ETA |
|---------|--------|---------|-----|
| **Creator Earnings Dashboard** | 🟡 80% | Dashboard integration | 3-4 hours |
| **Payout Request System** | 🟡 70% | Email notifications, admin workflow | 3-4 hours |
| **Sales History Table** | 🟡 80% | Dashboard integration | 1-2 hours |
| **Claim Button UI Polish** | 🟡 50% | Modal/dialog UX enhancement | 2-3 hours |

**Details**:

**ENTRY-010: Creator Earnings Dashboard** (80% Complete)
- ✅ Built: `/src/components/dashboard/EarningsOverview.tsx`
- ✅ Built: `/src/components/dashboard/SalesHistory.tsx`
- ✅ Built: `/src/components/dashboard/PayoutRequestModal.tsx`
- ✅ Built: `/src/app/api/creator/earnings/route.ts`
- ✅ Built: `/src/app/api/creator/sales/route.ts`
- ✅ Built: `/src/app/api/creator/payout/request/route.ts`
- ❌ Missing: Integration on `/dashboard` page
- ❌ Missing: Email notifications (TODO at route.ts:82)
- ❌ Missing: Admin approval endpoints

**ENTRY-011: Claim Button UI** (50% Complete)
- ✅ Built: `/src/components/ClaimButton.tsx`
- ✅ Working: Backend claim logic
- ❌ Missing: Enhanced modal/dialog flow
- ❌ Missing: Better success/error states
- ❌ Missing: Mobile-optimized UX

**ENTRY-012: Resource Pricing UI** (100% Complete ✅)
- ✅ Built: `/src/components/ResourcePricingForm.tsx`
- ✅ Built: `/src/app/api/resources/[id]/route.ts` (PATCH)
- ✅ Tests: `/tests/e2e/resource-pricing.spec.ts` (8 test cases)
- ✅ Database: Migration 0006 (salesCount, creatorPercent, platformPercent)
- ✅ Commission Logic: First 2 sales = 100%, Sales 3+ = 80/20

---

## 2. DATABASE SCHEMA (20 Tables)

**Last Migration**: `0006_slow_robbie_robertson.sql` (2026-02-13)

### Core Tables

**users** (Authentication & Profiles)
```sql
id, email, username, name, bio, image, role (user/admin),
githubUsername, twitterHandle, linkedinUrl, website,
profileCompletionScore, emailVerified, createdAt, updatedAt
```

**resources** (Marketplace Catalog)
```sql
id, title, slug, description, url, githubUrl, category,
tags[], status (pending/approved/rejected),
price (INTEGER cents), currency (USD/INR),
salesCount (INTEGER DEFAULT 0), -- ENTRY-012
claimedAt (TIMESTAMP), authorId, submitterId,
views, bookmarks, createdAt, updatedAt
```

**purchases** (Sales Records)
```sql
id, resourceId, buyerId, sellerId,
amount (INTEGER cents), currency,
creatorEarnings (INTEGER cents),
creatorPercent (INTEGER), -- ENTRY-012
platformPercent (INTEGER), -- ENTRY-012
status (pending/completed/refunded),
paymentProvider (razorpay/paypal),
paymentId, createdAt
```

**resource_claims** (Ownership Proof)
```sql
id, resourceId, userId,
githubUsername, githubRepoUrl,
verifiedAt, createdAt
UNIQUE(resourceId, userId)
```

**payout_requests** (Creator Withdrawals)
```sql
id, userId, amount (INTEGER cents),
status (pending/approved/rejected/completed),
paymentMethod (razorpay/paypal),
accountDetails (JSONB),
requestedAt, processedAt, adminNotes
```

**creator_earnings** (Aggregated Totals)
```sql
id, userId, totalEarnings (INTEGER cents),
salesCount, lastSaleAt, updatedAt
```

### Secondary Tables
- **categories** (20+ categories for filtering)
- **tags** (Resource tags, many-to-many via resource_tags)
- **ratings** (User reviews)
- **user_resource_access** (Purchase access control)
- **payments** (Payment transaction log)
- **bookmarks** (User favorites)
- **follows** (User follows)
- **tools** (SEO tools metadata)
- **subscribers** (Newsletter)
- **jobs** (Job board - future)
- **submissions** (Content submissions)
- **accounts**, **sessions**, **verification_tokens** (NextAuth)

### Key Indexes
```sql
INDEX ON resources(category_id)
INDEX ON resources(author_id)
INDEX ON resources(status)
INDEX ON purchases(buyer_id)
INDEX ON purchases(resource_id)
INDEX ON user_resource_access(user_id, resource_id)
UNIQUE ON resource_claims(resource_id, user_id)
```

---

## 3. API ENDPOINTS (Complete Inventory)

### Authentication
```
POST   /api/auth/[...nextauth]     NextAuth handler
GET    /api/auth/signin            GitHub OAuth page
```

### Resources
```
GET    /api/resources               List all (public)
POST   /api/resources               Create resource (TODO: validation)
GET    /api/resources/[id]          Get by ID
PATCH  /api/resources/[id]          Update price/currency (author only) ✅ ENTRY-012
```

### Claiming (ENTRY-009)
```
POST   /api/resources/[id]/claim               Claim ownership
GET    /api/resources/[id]/claim-status       Check status
```

### Payments - Razorpay (ENTRY-008)
```
POST   /api/resources/[id]/purchase/razorpay           Create order
POST   /api/checkout/razorpay/create-order             Alt order endpoint
POST   /api/checkout/razorpay/verify                   Verify signature
POST   /api/webhooks/razorpay                          Payment webhook
```

### Payments - PayPal (ENTRY-008)
```
POST   /api/resources/[id]/purchase/paypal             Create order
POST   /api/resources/[id]/purchase/paypal/capture     Capture payment
POST   /api/checkout/capture-payment                   Alt capture
```

### Creator Dashboard (ENTRY-010)
```
GET    /api/creator/earnings                  Get earnings summary ✅
GET    /api/creator/sales                     Get sales history ✅
POST   /api/creator/payout/request            Request payout ✅
```

### Utilities
```
GET    /api/badges/[slug]           Generate embeddable badge
```

### ❌ MISSING ENDPOINTS (To Implement)
```
GET    /api/admin/payout/list                 List pending payouts
PATCH  /api/admin/payout/[id]/approve         Approve payout
PATCH  /api/admin/payout/[id]/reject          Reject payout
GET    /api/creator/payout/status             Check payout status
```

---

## 4. FRONTEND PAGES (24 Pages)

| Route | Purpose | Status | SEO Ready |
|-------|---------|--------|-----------|
| `/` | Homepage | ✅ LIVE | ✅ YES |
| `/browse` | Browse/filter resources | ✅ LIVE | ✅ YES |
| `/t/[slug]` | Resource detail | ✅ LIVE | ✅ YES |
| `/dashboard` | Creator/admin dashboard | ✅ LIVE | ❌ NO INDEX |
| `/settings` | Profile settings | ✅ LIVE | ❌ NO INDEX |
| `/u/[username]` | User profile | ✅ LIVE | ✅ YES |
| `/submit` | Submit resource | ✅ LIVE | ❌ NO INDEX |
| `/auth/signin` | GitHub OAuth | ✅ LIVE | ❌ NO INDEX |
| `/admin/submissions` | Submission queue | ✅ LIVE | ❌ NO INDEX |
| `/categories/[slug]` | Category pages | ✅ LIVE | ✅ YES |
| `/tools` | Free tools index | ✅ LIVE | ✅ YES (pSEO) |
| `/tools/[slug]` | Individual tools | ✅ LIVE | ✅ YES (pSEO) |
| `/members` | Creator directory | ✅ LIVE | ✅ YES |
| `/prompts` | Prompt templates | ✅ LIVE | ✅ YES |
| `/vs/[slug]` | Comparison pages | ✅ LIVE | ✅ YES |
| `/advertise` | Ad packages | ✅ LIVE | ✅ YES |
| `/terms` | Terms of Service | ✅ LIVE | ✅ YES |
| `/privacy` | Privacy Policy | ✅ LIVE | ✅ YES |
| `/download` | Extension download | ✅ LIVE | ✅ YES |
| `/troubleshooting` | Support | ✅ LIVE | ✅ YES |

---

## 5. COMPONENTS (43 Total)

**Key Components for Marketplace**:
- **ResourceCard.tsx** - Resource grid item
- **InfiniteResourceGrid.tsx** - Auto-loading grid
- **BuyButton.tsx** - Payment trigger ✅ ENTRY-008
- **ClaimButton.tsx** - Ownership claiming ✅ ENTRY-009
- **ResourcePricingForm.tsx** - Price setting ✅ ENTRY-012

**Creator Dashboard (ENTRY-010)**:
- **EarningsOverview.tsx** - Stats cards (built, not integrated)
- **SalesHistory.tsx** - Transaction table (built, not integrated)
- **PayoutRequestModal.tsx** - Payout form (built, not integrated)

**Tools Infrastructure**:
- **ToolsShell.tsx** - Tool container
- **ToolsSidebar.tsx** - Tool navigation
- **TokenCounter.tsx**, **RoiCalculator.tsx**, etc. - 5 live tools

**Marketing/Landing**:
- **HeroSection.tsx**, **CreatorTestimonials.tsx**, **ThreeValueCards.tsx**

**Forms & Inputs**:
- **SubmitForm.tsx**, **SettingsForm.tsx**, **SearchInput.tsx**

---

## 6. WHAT'S OLD/REDUNDANT

### To Remove
1. **CheckoutOverlay.tsx** - Replaced by BuyButton (verify usage first)
2. **CTASection.tsx** - Removed from page.tsx (line 8 comment confirms)
3. **Deprecated imports** - Some pages import removed components

### Lint Warnings (Fix Before Production)
```
⚠️ React Hook useEffect missing dependencies:
   - /src/components/filters/FilterPersistenceManager.tsx
   - /src/components/filters/TopFilterBar.tsx

Missing deps: hasUrlParams, isReady, pathname, router,
             badgesParam, groupParam, pricingParam
```

---

## 7. INCOMPLETE WORK (Active Tasks)

### ENTRY-010: Creator Earnings Dashboard (3-4 hours)
**Built But Not Integrated**:
- ✅ Components exist
- ✅ API routes working
- ❌ Not wired to /dashboard page
- ❌ No email notifications
- ❌ No admin approval workflow

**Next Steps**:
1. Add components to `/src/app/dashboard/page.tsx`
2. Implement email notifications (route.ts:82)
3. Create admin approval endpoints
4. Test end-to-end

### ENTRY-011: Claim Button UI (2-3 hours)
**Current State**:
- ✅ Basic button working
- ✅ Backend logic complete
- ❌ No modal/dialog UX
- ❌ Basic success/error states
- ❌ Not mobile-optimized

**Next Steps**:
1. Add modal dialog flow
2. Enhance success/error messaging
3. Mobile UI optimization
4. Conversion messaging improvements

### Admin Payout Approval (2-3 hours)
**Missing**:
- Admin UI to approve/reject payouts
- Email notifications to creators
- Payout status tracking

---

## 8. TESTING COVERAGE

### E2E Tests (17 Files)
```
✅ auth.spec.ts                    GitHub OAuth
✅ browsing.spec.ts                Browse & filters
✅ creator-earnings.spec.ts        Earnings calculation
✅ dashboard.spec.ts               Dashboard
✅ homepage.spec.ts                Homepage
✅ resource-claiming.spec.ts       Claim flow (ENTRY-009)
✅ resource-pricing.spec.ts        Pricing UI (ENTRY-012)
✅ resource-purchase.spec.ts       Payment flow (ENTRY-008)
✅ comparison-pages.spec.ts        vs. pages
✅ mobile-responsiveness.spec.ts   Mobile layout
⚠️ example.spec.ts                 Empty placeholder
⚠️ user-journeys.spec.ts           Needs updates
```

### Unit Tests (7 Files)
```
✅ schema.test.ts                  Database validation
✅ payment.test.ts                 Commission calculation
✅ safeJsonLd.test.ts              JSON-LD sanitization
⚠️ profile-utils.test.ts           Utility functions
```

**Test Coverage**: ~70% (critical paths covered)

---

## 9. TECHNICAL DEBT

### High Priority (Fix Before Launch)
1. **Lint warnings** - React hooks dependencies (4 warnings)
2. **Missing email notifications** - Payout requests need alerts
3. **No admin approval workflow** - Manual DB updates required

### Medium Priority
4. **CheckoutOverlay dead code** - Verify usage, remove if unused
5. **Limited integration tests** - Payment capture, webhooks need tests
6. **ENTRY-010 dashboard wiring** - Components built but not integrated

### Low Priority
7. **Profile completion gamification** - SEO strategy (future)
8. **Advanced analytics** - Creator trends, conversion tracking (future)

---

## 10. ENVIRONMENT CONFIGURATION

**Required Variables** (`.env.local`):
```env
DATABASE_URL=postgresql://...
AUTH_SECRET=...
GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...
RAZORPAY_KEY_ID=rzp_test_...
RAZORPAY_KEY_SECRET=...
PAYPAL_CLIENT_ID=...
PAYPAL_CLIENT_SECRET=...
NEXT_PUBLIC_PAYPAL_CLIENT_ID=...
NEXT_PUBLIC_SITE_URL=https://...
NEXT_PUBLIC_GA_ID=...
```

**Config Files**:
- ✅ `.env.example` - Template
- ✅ `next.config.ts` - Next.js 16.1
- ✅ `drizzle.config.ts` - ORM
- ✅ `playwright.config.ts` - E2E
- ✅ `tsconfig.json` - TypeScript
- ✅ `tailwind.config.js` - Tailwind CSS

---

## 11. DEPLOYMENT READINESS

| Item | Status | Blocker |
|------|--------|---------|
| **Build** | ✅ PASS | None |
| **Lint** | ⚠️ 4 WARNINGS | React hooks deps (non-blocking) |
| **E2E Tests** | ✅ PASS | None |
| **Unit Tests** | ✅ PASS | None |
| **Database** | ✅ READY | None |
| **Auth** | ✅ READY | None |
| **Payments** | ✅ READY | None |
| **Environment** | ⚠️ NEEDS CONFIG | Secrets required |
| **Performance** | ✅ GOOD | None |
| **SEO** | ✅ READY | JSON-LD, sitemap done |
| **Security** | ✅ GOOD | Rate limiting OK |

**Overall**: 🟡 **BETA-READY (80%)** - 10-14 hours to launch

---

## 12. KEY DISCOVERIES (PM Self-Assessment)

### What I Missed Before This Scan
1. **5-6 Free Tools Already Built** ❌ - Did not know until user pointed it out
   - TikToken Counter, ROI Calculator, JSON to Pydantic, Prompt Generator, RAG Visualizer
   - All live at `/tools/` with proper SEO metadata
   - This was a CRITICAL oversight in SEO strategy document

2. **ENTRY-010 Components Already Built** ✅ - But not integrated
   - EarningsOverview, SalesHistory, PayoutRequestModal exist
   - Just need wiring to dashboard page (3-4 hours)

3. **ENTRY-012 Fully Complete** ✅ - ResourcePricingForm working
   - 80/20 commission logic implemented
   - E2E tests passing (8 scenarios)
   - Migration 0006 applied

### Lessons Learned
- ❌ **Never recommend "build X from scratch" without checking first**
- ✅ **Always run comprehensive codebase scan before strategic recommendations**
- ✅ **Maintain this living document as single source of truth**
- ✅ **Update after every major feature completion**

---

## 13. MAINTENANCE PROTOCOL

**Update This Document When**:
1. New feature completed (ENTRY-XXX done)
2. Database migration applied
3. New API endpoint added
4. Component built or removed
5. Test coverage changes
6. Production deployment happens

**Update Frequency**:
- ✅ After every ENTRY completion (Gate 12 docs)
- ✅ Weekly during active development
- ✅ Monthly after beta launch

**Version History**:
- v1.0 (2026-02-13): Initial comprehensive scan
- v1.1 (TBD): After ENTRY-010 completion
- v1.2 (TBD): After ENTRY-011 completion
- v2.0 (TBD): Beta launch state

---

## 14. QUICK REFERENCE CHECKLIST

**Before Making Any Strategic Recommendation**:
- [ ] Read this document first
- [ ] Check feature inventory (Section 1)
- [ ] Verify in codebase with Glob/Grep
- [ ] Update this document if findings differ
- [ ] Never assume - always verify

**Before Creating PRD**:
- [ ] Confirm feature doesn't already exist
- [ ] Check incomplete work (Section 7)
- [ ] Review technical debt (Section 9)
- [ ] Identify dependencies

**Before Assigning Task to Coder**:
- [ ] Verify PM gates complete (Gate 0-3)
- [ ] Check this document is current
- [ ] Confirm no blockers in ledger

---

**END OF ANALYSIS**

**Next Update**: After ENTRY-010 dashboard integration (v1.1)
**Maintained By**: PM (Claude Code)
**Purpose**: Prevent "I didn't know that existed" surprises

---

**Status**: ✅ ACTIVE LIVING DOCUMENT
**Agent ID**: a1b1519 (Explore agent used for this scan)
**Scan Duration**: 277 seconds (4.6 minutes)
**Total Tool Uses**: 53
**Files Analyzed**: 100+
