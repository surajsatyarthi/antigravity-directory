# Monday Launch Checklist - Antigravity Directory
**Target Launch**: Monday, 2026-02-17
**Status**: WEEKEND SPRINT (Sat-Sun work, Mon launch)

---

## 🎯 LAUNCH PHILOSOPHY

**Goal**: "Picture Perfect" launch - No compromises, no technical debt blocking users

**Timeline**:
- **Saturday (Feb 15)**: Core features + critical fixes
- **Sunday (Feb 16)**: Polish + testing + deployment prep
- **Monday (Feb 17)**: LAUNCH 🚀

---

## 🚨 CRITICAL PATH (MUST DO BEFORE LAUNCH)

### 1. ENTRY-019: Admin Payout Approval Dashboard
**Status**: ASSIGNED TO CODER
**Estimated**: 2-3 hours
**Priority**: 🔴 BLOCKING

**Why Critical**: Without this, payouts cannot be processed (incomplete marketplace flow)

**Deliverables**:
- [ ] Admin-only route `/admin/payouts`
- [ ] Approve/reject payout API
- [ ] Email notifications (approve/reject)
- [ ] E2E tests (4 scenarios)

**Depends On**: None (ready to start)
**Blocks**: Launch (incomplete payment cycle)

---

### 2. ENTRY-020: Fix "Get Resource" vs "Buy" Button Confusion
**Status**: NOT STARTED
**Estimated**: 1-2 hours
**Priority**: 🔴 BLOCKING (UX clarity)

**Why Critical**: Resource detail page shows BOTH "Get Resource" (free GitHub link) AND "Buy" button, causing confusion: "Why pay if I can get it free?"

**Deliverables**:
- [ ] If `price > 0`: Hide "Get Resource" button, show only "Buy for $X"
- [ ] If `price = 0`: Show "Get Resource" button only
- [ ] Update button copy to clarify value ("Buy Full Access" vs "Get GitHub Repo")
- [ ] E2E test for paid vs free resource display

**Depends On**: None
**Blocks**: Launch (users won't understand what they're buying)

---

### 3. ENTRY-021: Submit Form Copy Fixes
**Status**: NOT STARTED
**Estimated**: 1 hour
**Priority**: 🔴 BLOCKING (Business model alignment)

**Why Critical**: Submit form references ARCHIVED paid tiers ($49/$149) and contradicts current FREE submission model.

**Deliverables**:
- [ ] Change "Launch Pricing" badge to "Free Listings - Claim & Monetize"
- [ ] Update FAQ #1: Remove "Standard/Featured" tier references
- [ ] Update FAQ #5: Change "Why do you charge" to "Why require GitHub verification"
- [ ] Add marketplace pricing explainer section (80/20 split, first 2 sales free)
- [ ] Add "Monetize Your Work" value prop card

**Depends On**: None
**Blocks**: Launch (users confused about submission cost)

**Reference**: [docs/07-launch/SUBMIT_FORM_COPY_FIXES.md](./SUBMIT_FORM_COPY_FIXES.md)

---

### 4. ENTRY-018: Legal Compliance (DMCA + Terms of Service)
**Status**: NOT STARTED
**Estimated**: 3-4 hours
**Priority**: 🔴 BLOCKING (Legal requirement)

**Why Critical**: ClaimModal references Terms of Service that doesn't exist. DMCA safe harbor requires policy page.

**Deliverables**:
- [ ] `/dmca` takedown page + policy
- [ ] `/terms-of-service` page (referenced in ClaimModal)
- [ ] DMCA agent registration guide
- [ ] Footer links to DMCA + TOS pages

**Depends On**: None
**Blocks**: Launch (legal compliance required)

**PM Artifacts Needed**:
- [ ] Gate 2: Research audit (DMCA requirements, TOS templates)
- [ ] Gate 3: Implementation plan
- [ ] CEO approval

---

### 5. E2E Test FK Constraint Fix
**Status**: NOT STARTED
**Estimated**: 1-2 hours
**Priority**: 🟡 HIGH (Technical debt)

**Why Important**: Clean test suite = confidence in deployment. Currently 15 tests failing on cleanup.

**Solution Options**:
- **Option A**: Add `ON DELETE CASCADE` to FK constraints
- **Option B**: Fix test cleanup order (delete children first)

**Recommended**: Option B (safer, doesn't change production schema)

**Affects Tests**:
- `tests/e2e/claim-ui-flow.spec.ts` (15 failures)
- `tests/e2e/resource-claiming.spec.ts` (likely similar issues)
- `tests/e2e/purchase-flow.spec.ts` (if exists)

**Depends On**: None
**Blocks**: Clean deployment (nice-to-have, not blocking)

---

### 6. Environment Validation (Production)
**Status**: NOT STARTED
**Estimated**: 15 minutes
**Priority**: 🔴 BLOCKING

**Action**:
```bash
npm run validate:env:production
```

**Checklist**:
- [ ] All production env vars set in Vercel
- [ ] Database connection string valid
- [ ] Payment API keys (Razorpay + PayPal) configured
- [ ] GitHub OAuth credentials set
- [ ] NextAuth secret configured
- [ ] Email API key (Resend) configured

**Depends On**: ENTRY-019 (adds RESEND_API_KEY)
**Blocks**: Deployment

---

### 7. Database Migrations (Production)
**Status**: NEEDS VERIFICATION
**Estimated**: 5 minutes
**Priority**: 🔴 BLOCKING

**Action**:
```bash
npm run drizzle:migrate
```

**Verify**:
- [ ] All 7 migrations applied to production DB
- [ ] `payout_requests` table exists
- [ ] All indexes created
- [ ] No migration errors

**Depends On**: None
**Blocks**: Deployment

---

## 🟢 POLISH & UX (SHOULD DO BEFORE LAUNCH)

### 8. Homepage UX Refinements (ENTRY-013)
**Status**: PENDING
**Estimated**: 2 hours
**Priority**: 🟡 HIGH (First impression)

**Deliverables**:
- [ ] Mobile responsiveness audit (375px, 768px, 1024px)
- [ ] No duplicate CTAs
- [ ] Directory visible within 1-2 viewports from hero
- [ ] Zero console errors/warnings
- [ ] Component cleanup (unused imports)

**Depends On**: None
**Blocks**: None (quality improvement)

---

### 9. Error Page Polish (404, 500)
**Status**: NOT STARTED
**Estimated**: 1 hour
**Priority**: 🟡 MEDIUM

**Deliverables**:
- [ ] Custom 404 page (branded, helpful)
- [ ] Custom 500 page (error reporting)
- [ ] Friendly error messages (not stack traces)

**Depends On**: None
**Blocks**: None

---

### 10. Loading States & Skeletons
**Status**: NOT STARTED
**Estimated**: 1.5 hours
**Priority**: 🟡 MEDIUM

**Pages Needing Skeletons**:
- [ ] Browse page (resource cards)
- [ ] Resource detail page
- [ ] Creator dashboard
- [ ] Admin payout page

**Why Important**: Perceived performance = better UX

**Depends On**: None
**Blocks**: None

---

### 11. Email Notification System (CRITICAL - NOT NICE-TO-HAVE!)
**Status**: PARTIAL (payout emails in ENTRY-019)
**Estimated**: 2 hours
**Priority**: 🔴 BLOCKING (User communication)

**Why Critical**: Users MUST be notified about purchases and sales. Without emails, marketplace is broken from communication perspective.

**Emails Needed**:
- [ ] **Purchase Confirmation** (buyer) - Receipt, resource access link, support contact
- [ ] **Sale Notification** (creator) - Amount earned, commission breakdown, buyer username
- [ ] **Payout Approved** (creator) - Included in ENTRY-019 ✅
- [ ] **Payout Rejected** (creator) - Included in ENTRY-019 ✅

**Implementation**:
- Extend Resend integration from ENTRY-019
- Create email templates for purchase/sale
- Send on purchase completion (non-blocking)
- Test with real transactions

**Depends On**: ENTRY-019 (Resend already set up)
**Blocks**: Launch (incomplete user experience)

---

## 🔵 NICE-TO-HAVE (CAN DEFER POST-LAUNCH)

### 12. Analytics Setup (Plausible/PostHog)
**Status**: NOT STARTED
**Estimated**: 30 minutes
**Priority**: 🟢 LOW

**Why Defer**: Can add on Day 2 of launch. Not blocking.

**What to Track**:
- Page views
- Claim button clicks
- Purchase conversions
- Creator signups

---

### 13. Admin Dashboard Enhancements
**Status**: NOT STARTED
**Estimated**: 3-4 hours
**Priority**: 🟢 LOW

**Features**:
- Batch payout approval (not needed for MVP)
- Payout search/filter (nice-to-have)
- Export to CSV (future)
- Fraud detection indicators (future)

**Depends On**: ENTRY-019 (basic admin dashboard)
**Blocks**: None

---

## 📅 SPRINT PLAN (SATURDAY-SUNDAY)

### Saturday (Feb 15) - 10 hours

**Morning (5 hours)**:
- [ ] **ENTRY-019**: Admin Payout Dashboard (2-3 hours) - Coder
- [ ] **ENTRY-020**: Fix Get Resource vs Buy button (1-2 hours) - Coder
- [ ] **ENTRY-018 Research**: PM creates Gate 2 audit (1 hour) - PM

**Afternoon (4 hours)**:
- [ ] **ENTRY-021**: Submit Form Copy Fixes (1 hour) - Coder
- [ ] **ENTRY-018 Plan**: PM creates implementation plan (1 hour) - PM
- [ ] **CEO Review**: Approve ENTRY-018 plan (15 min) - CEO
- [ ] **ENTRY-018 Implementation**: Coder builds DMCA + TOS pages (2-3 hours) - Coder

**Evening (3 hours)**:
- [ ] **E2E Test Fix**: FK constraint cleanup (1-2 hours) - Coder
- [ ] **Email Notifications**: Purchase + Sale emails (2 hours) - Coder

**End of Day**: ENTRY-019 + ENTRY-020 + ENTRY-021 + ENTRY-018 + E2E tests + Email notifications complete ✅

---

### Sunday (Feb 16) - 6 hours

**Morning (3 hours)**:
- [ ] **Homepage UX**: Polish (ENTRY-013) (2 hours) - Coder
- [ ] **Error Pages**: 404/500 polish (1 hour) - Coder

**Afternoon (2 hours)**:
- [ ] **Loading States**: Skeletons for browse + dashboard (1.5 hours) - Coder
- [ ] **Environment Validation**: Production env check (15 min) - DevOps
- [ ] **Database Migrations**: Verify all applied (5 min) - DevOps
- [ ] **Pre-deployment Build**: Final build test (10 min) - DevOps

**Late Afternoon (1 hour)**:
- [ ] **Smoke Tests**: Manual testing of critical flows (30 min) - QA
- [ ] **Deploy to Production** 🚀
- [ ] **Post-deployment Smoke Tests** (30 min)

**Evening**:
- [ ] **Monitor for errors** (1 hour)
- [ ] **Test email delivery** (Resend dashboard)
- [ ] **Test payment flows** (Razorpay + PayPal)

**End of Day**: LIVE ON PRODUCTION ✅

---

## 🚀 MONDAY LAUNCH PLAN (Feb 17)

### Morning (Launch Day)
- [ ] Final smoke tests (homepage, claim, purchase, payout request)
- [ ] Monitor error logs (Vercel dashboard)
- [ ] Test payment flows (Razorpay + PayPal)
- [ ] Verify emails sending (Resend dashboard)

### Afternoon (Soft Launch)
- [ ] Post on Product Hunt (optional - can defer)
- [ ] Share on Twitter/LinkedIn (founder accounts)
- [ ] Email 5-10 beta testers for feedback

### Evening (Monitor)
- [ ] Watch for first claims
- [ ] Watch for first purchases
- [ ] Respond to any support requests
- [ ] Fix critical bugs if found

---

## 📊 LAUNCH METRICS (Week 1 Goals)

**Success Criteria**:
- [ ] 10+ resources claimed
- [ ] 3-5 sales completed
- [ ] 0 critical bugs in payment flow
- [ ] <5 second average page load
- [ ] 95+ Lighthouse score (performance)

**Revenue Target**: $0-100 (first sales, validation)

---

## 🔧 POST-LAUNCH PRIORITIES (Week 1-2)

After Monday launch, focus shifts to:

1. **SEO Optimization** (Week 1-2):
   - User profiles with social links
   - Chrome extension (DR99 backlink)
   - Comparison pages (MCP A vs MCP B)
   - Guide pages (/guide/install-[mcp])

2. **Growth Features** (Week 2-3):
   - Email notifications (welcome, purchase, sales)
   - Analytics dashboard (creator insights)
   - Referral system (optional)

3. **Admin Tools** (Week 3-4):
   - Batch payout approval
   - Fraud detection indicators
   - Manual resource curation

---

## ✅ DEFINITION OF "PICTURE PERFECT"

Launch is ready when:
1. ✅ All 5 beta blockers complete (already done)
2. ✅ ENTRY-019 complete (admin payouts + payout emails)
3. ✅ ENTRY-020 complete (Get Resource vs Buy button clarity)
4. ✅ ENTRY-021 complete (Submit form copy matches business model)
5. ✅ ENTRY-018 complete (legal compliance - DMCA + TOS)
6. ✅ E2E tests passing (FK constraint fixed)
7. ✅ Email notifications working (purchase + sale)
8. ✅ Production environment validated
9. ✅ All database migrations applied
10. ✅ Homepage UX polished (ENTRY-013)
11. ✅ Error pages polished (404, 500)
12. ✅ Loading states added (skeletons)
13. ✅ No console errors on key pages
14. ✅ Mobile responsive (375px+)
15. ✅ All website copy matches current business model (80/20, first 2 free)

**Quality Bar**: Zero known bugs blocking user flows (claim, purchase, payout) + Users properly notified via email

---

## 🚨 ROLLBACK PLAN

If critical issues found post-launch:
```bash
npm run deploy:rollback
```

**Reverts to**: Last working commit (currently ENTRY-011 completion)

**When to Rollback**:
- Payment processing failures
- Database corruption
- Auth system failures
- Critical security vulnerabilities

**Recovery Time**: <5 minutes

---

**Status**: READY FOR WEEKEND SPRINT
**Next Action**: Coder starts ENTRY-019 (Saturday morning)
**Launch Date**: Monday, Feb 17, 2026 🚀
