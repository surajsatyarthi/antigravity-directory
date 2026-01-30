# 📋 MASTER AUDIT: Open & Pending Items
**Date**: 2026-01-31 (Launch Day)
**Scope**: "Deep and Wide" Codebase & Strategy Scan

## 1. 🚨 IMMEDIATE CRITICAL (Launch Day - Hour 12-24)

### Infrastructure & Deploy
- [ ] **Razorpay Key Missing**: The local environment and Vercel are missing `NEXT_PUBLIC_RAZORPAY_KEY_ID`.
  - **Impact**: Indian users cannot pay. Payment flow partially broken.
  - **Action**: Add to Vercel Environment Variables immediately.
- [ ] **Production Deploy**: `vercel --prod` has been run, but need to **manually verify** the live URL `https://antigravity.directory` (or its alias) specifically for:
  - `robots.txt` serving correct content.
  - `sitemap.xml` accessibility.
  - Static pages for the 50 new seeded tools.

### Launch Marketing
- [ ] **Product Hunt Post**: Content is ready (`LAUNCH_CONTENT_READY_TO_POST.md`), but needs to be **posted manually** at 12:01 AM PT.
- [ ] **Hacker News Post**: Scheduled for 8:00 AM PT.
- [ ] **Twitter/Reddit**: Content drafted, needs posting.

---

## 2. ⚠️ SHORT-TERM TECHNICAL (Week 1)

### Codebase TODOs & FIXMEs
- [ ] **Contact Enrichment** (`src/lib/enrich-contacts.ts`):
  - `TODO: Implement actual Apollo.io API integration`.
  - Currently throws error or returns mock data.
  - **Impact**: We cannot automatically enrich email addresses for new leads yet.
- [ ] **Search Input Hydration** (`src/components/SearchInput.tsx`):
  - Identified in `ISSUES_LOG.md` (P1-2). Risk of layout shift on mobile.
  - **Action**: Wrap client-only state in `useEffect`.

### Security & Protocol
- [ ] **Security Audit Completion** (P1-3):
  - `ISSUES_LOG.md` lists 6 files with `dangerouslySetInnerHTML`.
  - Status: "Refactored/Resolved" in log, but need to strict confirm `dompurify` is active in production build.
- [ ] **Blueprint Documentation**:
  - `docs/reports/phase_2_execution_report_mobile_ux.md` was flagged as a retroactive requirement (P0-2). Needs to be finalized if not already.

---

## 3. 📈 STRATEGIC & GROWTH (Month 1 Roadmap)

### Content Expansion
- [ ] **Comparison Engine**:
  - Current: 7 comparisons live.
  - Target: **add 5 high-intent pairs** (Claude vs ChatGPT, Copilot vs Cursor) - (P1-4).
  - **Why**: These drive high-value, intent-based traffic ($299-$598/mo potential).
- [ ] **Directory Submissions**:
  - `LAUNCH_TO_10K_MRR_PLAYBOOK.md` lists 20 directories (BetaList, Launching Next, etc.) to submit to on Day 2-3.

### Monetization Features
- [ ] **Affiliate Program**:
  - Roadmap item for Month 4, but foundational work (Stripe Connect setup) can start.
- [ ] **Job Board**:
  - `LAUNCH_TO_10K_MRR_PLAYBOOK.md` mentions this as a future $99/post revenue stream. Code scaffolding needed.

---

## 4. 🔍 DATA & ANALYTICS

### Missing Metrics
- [ ] **Apollo.io Integration**: As noted above, missing key for enrichment.
- [ ] **Analytics Verification**:
  - Need to confirm GA4 and Vercel Analytics are receiving events from the production environment (specifically `submit_tool` conversion event).

---
**Summary for User**:

---

## 5. 💡 USER BACKLOG (Phase 3+)
*From `ISSUES_LOG.md`*

### Revenue & Leads
- [ ] **Submit / Promote / Advertise Flow**: Full self-serve monetization.
- [ ] **Newsletter Template**: Design for 2 promoted + 2 organic slots.
- [ ] **Normal Email Signup**: Standard lead gen form (without submission).

### Brand & Content
- [ ] **Remove "Gemini 3 Powered"**: White-label the footer/branding.
- [ ] **"As Seen On" Section**: Social proof bar (needs PR placements first).
- [ ] **Footer Notice**: Update legal/copyright text.

### Product Features
- [ ] **Admin Dashboard**: backend for managing submissions.
- [ ] **Personal Dashboard**: for users to manage their listings/bookmarks.
- [ ] **Mobile View Optimization**: Further refinement for small screens.
- [ ] **Filters Bug**: Investigate reported issue "Filters not working".
- [ ] **Newsletter Component**: Reduce size/scale (UI Polish).

### Expansion & Social
- [ ] **Twitter Feed Integration**: Live social updates.
- [ ] **Reddit Rooms**: Community integration.
- [ ] **Own Community Platform**: Whitelabel forum/community.
- [ ] **Native Mobile Apps**: iOS/Android build.
- [ ] **Browser Extensions**: Chrome/Edge/Mozilla plugins.

### Strategy
- [ ] **Target Paying ICP**: Refine messaging for enterprise/funded startups.
- [ ] **Programmatic SEO (pSEO)**: Scale comparison pages.
- [ ] **List Resources via Antigravity Model**: (Clarify requirements).
- [ ] **Antigravity for Dummies**: Beginner guides.

