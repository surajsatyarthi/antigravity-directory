# Website Copy Audit - Business Model Validation
**Date**: 2026-02-13
**Auditor**: PM (Claude Code)
**Purpose**: Validate ALL website copy matches current marketplace business model

---

## ✅ CURRENT BUSINESS MODEL (SINGLE SOURCE OF TRUTH)

From [docs/01-business/MARKETPLACE_MODEL_SPEC.md](../01-business/MARKETPLACE_MODEL_SPEC.md):

1. **Free listings** - No cost to submit resources
2. **80/20 commission split** - Creator gets 80%, platform gets 20%
3. **First 2 sales FREE** - Creator keeps 100% on first 2 sales, then 80/20 split
4. **Verification-first** - Only CLAIMED resources can be sold (GitHub OAuth)
5. **NO paid submissions** - Old $49/$149 tier model is ARCHIVED
6. **NO unclaimed sales** - Legal liability (copyright), only verified owners can monetize

---

## 🔍 AUDIT RESULTS

### ✅ CORRECT COPY (No Changes Needed)

#### Homepage ([src/app/page.tsx](../../src/app/page.tsx))
- Line 36: "Earn 80% commission on MCP servers" ✅
- Line 39: "Earn 80% commission" ✅

#### HowItWorks Component ([src/components/HowItWorks.tsx](../../src/components/HowItWorks.tsx))
- Line 21: "keep 80% of every sale" ✅

#### Footer ([src/components/Footer.tsx](../../src/components/Footer.tsx))
- Line 125: "Create Account (Earn 80%)" ✅

#### ResourcePricingForm ([src/components/ResourcePricingForm.tsx](../../src/components/ResourcePricingForm.tsx))
- Line 185: "First 2 sales: 100% • Sales 3+: 80%" ✅

#### EarningsOverview Dashboard ([src/components/dashboard/EarningsOverview.tsx](../../src/components/dashboard/EarningsOverview.tsx))
- Line 103: "First 2 sales (100%)" ✅
- Line 107: "Sales 3+ (80%)" ✅

#### StatsBar ([src/components/StatsBar.tsx](../../src/components/StatsBar.tsx))
- Line 52: "80% Commission Payout" ✅

#### ThreeValueCards ([src/components/ThreeValueCards.tsx](../../src/components/ThreeValueCards.tsx))
- Line 19: "Earn 80%" ✅
- Line 22: "Commission" ✅

#### Creator Testimonials ([src/components/CreatorTestimonials.tsx](../../src/components/CreatorTestimonials.tsx))
- Line 30: "80% is fair" ✅
- Line 31: "Fair split" ✅

---

### ⚠️ ISSUES FOUND

#### ❌ ISSUE #1: Submit Form Copy - Confusing "Launch Pricing" Badge
**File**: [src/components/SubmitForm.tsx](../../src/components/SubmitForm.tsx)
**Lines**: 99-106

**Current Copy**:
```tsx
<span className="text-xs font-black text-emerald-500 uppercase tracking-widest leading-none">
  Launch Pricing - Early Adopter Rate
</span>
```

**Problem**: Implies there's a cost to submit ("Launch Pricing"), but submissions are FREE. This contradicts the current business model.

**Fix**: Change to reflect FREE submissions
```tsx
<span className="text-xs font-black text-emerald-500 uppercase tracking-widest leading-none">
  Free Listings - Claim & Monetize
</span>
```

---

#### ❌ ISSUE #2: Submit Form FAQs - References Old Paid Tiers
**File**: [src/components/SubmitForm.tsx](../../src/components/SubmitForm.tsx)
**Lines**: 29-30, 40-42

**Current Copy**:
```tsx
a: "Launch Promo listings (Standard/Featured) go live within <strong>24-48 hours</strong> after manual vetting. Free listings undergo a standard review period of 7-14 days."
```

```tsx
q: "Why do you charge for listings?",
a: "Our fees cover manual vetting, maintaining high-authority SEO, and funding our discovery engine that drives qualified developer traffic to your tool."
```

**Problem**:
1. References "Standard/Featured" paid tiers (ARCHIVED - doesn't exist anymore)
2. Says "Why do you charge for listings?" but we DON'T charge for listings
3. Implies different processing times for paid vs free (no longer applicable)

**Fix**: Update to reflect FREE listings only
```tsx
{
  q: "How quickly will my tool be listed?",
  a: "All listings go live within <strong>24-48 hours</strong> after manual vetting and claim verification via GitHub OAuth."
},
{
  q: "Why do you require GitHub verification?",
  a: "We require GitHub OAuth verification to protect creators' intellectual property and ensure only resource owners can monetize their work. This keeps our marketplace trustworthy and legally compliant."
}
```

---

#### ❌ ISSUE #3: Submit Form Value Props - References Paid Features
**File**: [src/components/SubmitForm.tsx](../../src/components/SubmitForm.tsx)
**Lines**: 130-142

**Current Copy**:
```tsx
<h4 className="text-base font-black text-white uppercase tracking-wider mb-2">Massive Exposure</h4>
<p className="text-sm text-gray-500 leading-relaxed font-medium">Reach 2M+ active AI seekers every month looking for tools like yours.</p>
```

**Problem**: While not explicitly wrong, the value props don't mention the marketplace commission model or claim-to-monetize flow. Users might not understand they can SELL their tools and earn 80%.

**Fix**: Add marketplace benefits
```tsx
<div className="flex gap-4">
  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
    <DollarSign className="w-5 h-5 text-emerald-500" />
  </div>
  <div>
    <h4 className="text-base font-black text-white uppercase tracking-wider mb-2">Monetize Your Work</h4>
    <p className="text-sm text-gray-500 leading-relaxed font-medium">Claim your resource and start earning. Keep 100% on first 2 sales, then 80% on all future sales.</p>
  </div>
</div>
```

---

#### ❌ ISSUE #4: SubmitForm Pricing Section Missing
**File**: [src/components/SubmitForm.tsx](../../src/components/SubmitForm.tsx)
**Lines**: N/A (missing section)

**Problem**: Submit form doesn't clearly communicate:
1. Submissions are FREE
2. Creators can claim and monetize later
3. 80/20 split model
4. First 2 sales free

**Fix**: Add pricing explainer section before the form
```tsx
{/* Pricing Explainer - Add after line 115 */}
<div className="bg-emerald-500/5 border border-emerald-500/20 rounded-3xl p-8 mb-12 max-w-3xl mx-auto">
  <h3 className="text-2xl font-black text-white mb-4 text-center">
    Free to List. <span className="text-emerald-500">Earn When You Sell.</span>
  </h3>
  <div className="space-y-4 text-sm text-gray-400">
    <p className="text-center">
      ✅ <strong>Free Submissions</strong> - List your tool at no cost<br/>
      ✅ <strong>Claim via GitHub</strong> - Verify ownership with one click<br/>
      ✅ <strong>Set Your Price</strong> - You control pricing and availability<br/>
      ✅ <strong>Earn 100%</strong> on first 2 sales, then <strong>80%</strong> on all future sales
    </p>
    <p className="text-center text-xs text-gray-500">
      No upfront fees. No monthly costs. Only pay commission when you earn.
    </p>
  </div>
</div>
```

---

#### ⚠️ ISSUE #5: Resource Detail Page - "Get Resource" vs "Buy" Confusion
**File**: [src/app/t/[slug]/page.tsx](../../src/app/t/[slug]/page.tsx)
**Lines**: 285-352

**Problem**: Already identified in previous audit - users see both "Get Resource" (free GitHub link) AND "Buy" button, causing confusion about what they're paying for.

**Status**: 🔴 CRITICAL - Separate ENTRY-020 created for this fix

**Fix**: Option A (simplest)
- If `price > 0`: Hide "Get Resource" button, show only "Buy for $X - Full Access"
- If `price = 0`: Show "Get Resource" button

---

## 📊 AUDIT SUMMARY

**Total Files Audited**: 15 user-facing components
**Issues Found**: 5
**Critical Issues**: 2 (Submit form FAQs, Get Resource vs Buy confusion)
**Minor Issues**: 3 (Badge copy, missing pricing explainer, value props)

---

## 🔧 RECOMMENDED FIXES (Priority Order)

### Priority 1: CRITICAL (Block Launch)
1. **ENTRY-020**: Fix "Get Resource" vs "Buy" button confusion (ALREADY ASSIGNED)
2. **Submit Form FAQs**: Remove references to paid tiers (30 min)

### Priority 2: HIGH (Should Do Before Launch)
3. **Submit Form Badge**: Change "Launch Pricing" to "Free Listings" (5 min)
4. **Submit Form Pricing Explainer**: Add marketplace model section (15 min)

### Priority 3: MEDIUM (Nice-to-Have)
5. **Submit Form Value Props**: Add "Monetize Your Work" benefit card (15 min)

---

## 🎯 TOTAL TIME TO FIX ALL ISSUES

- **Critical fixes**: 30 min (Submit FAQs only - ENTRY-020 already tracked separately)
- **High priority fixes**: 20 min (Badge + Explainer)
- **Medium priority fixes**: 15 min (Value props)

**Total**: 1 hour 5 minutes (excluding ENTRY-020)

---

## ✅ VERIFICATION CHECKLIST

After fixes applied, verify:
- [ ] No references to "$49" or "$149" anywhere on site
- [ ] No references to "Standard" or "Featured" tiers
- [ ] All commission mentions say "80%" or "80/20"
- [ ] All first-sale mentions say "100%" or "First 2 sales free"
- [ ] Submit form clearly says "FREE" submissions
- [ ] No confusion about "Get Resource" vs "Buy" buttons
- [ ] Marketplace model explained on submit page
- [ ] Homepage, footer, and dashboard all consistent

---

**Status**: AUDIT COMPLETE
**Next Action**: Create ENTRY-021 for submit form copy fixes (1 hour)
**Launch Blocker**: YES - Submit form FAQs contradict business model
