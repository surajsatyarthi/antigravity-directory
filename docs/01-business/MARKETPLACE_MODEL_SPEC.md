# MARKETPLACE MODEL SPECIFICATION
## Single Source of Truth - Antigravity Directory Business Model

**Document Type**: Master Business Model Specification
**Status**: ✅ ACTIVE (Replaces all previous directory/listing models)
**Last Updated**: February 11, 2026
**Owner**: CEO (Suraj)

---

## 🎯 WHAT WE ARE

**Antigravity Directory is a MARKETPLACE, not a directory.**

We are the **Gumroad for Antigravity tools** - connecting creators who build valuable resources with users who want to discover and purchase them.

---

## 💰 REVENUE MODEL (The Only One)

### **Primary Revenue: Sales Commissions**
- Creators claim resources **FREE** (via GitHub OAuth)
- Creators set their own price ($0-$999)
- **First 2 sales**: Creator keeps **100%** (0% commission) 🎉
- **Sales 3+**: **80% to creator, 20% to platform**
- Payments via Razorpay (India) + PayPal (International)
- ⚠️ **CRITICAL**: Only CLAIMED resources can be sold (verification-first model)

### **Secondary Revenue: Dynamic Ads**
- Ad placements on homepage, category pages, resource pages, user profiles
- Cursor.directory style - dynamic, non-intrusive
- Pricing: $799-$1,500/month per ad slot
- **NOT** aggressive ads - tasteful, creator-friendly

### **Future Revenue: Job Board** (Phase 3+)
- Standard listing: $99/month
- Featured listing: $299/month
- NOT in MVP - coming later

---

## ❌ WHAT WE ARE NOT

### **We Do NOT Charge:**
- ❌ Submission fees ($49/$149 listing fees) - **DELETED MODEL**
- ❌ Paid "featured placement" for listings - **DELETED MODEL**
- ❌ Upfront fees to claim resources - **DELETED MODEL**
- ❌ Monthly fees for creator accounts - **DELETED MODEL**

### **We Do NOT Operate Like:**
- ❌ A directory (passive listing site)
- ❌ Yahoo-style link farm
- ❌ Paid submission board

---

## 🔄 HOW THE MARKETPLACE WORKS

### **For Creators (Supply Side)**

1. **Claim Your Resource (FREE)**
   - Creator logs in with GitHub OAuth
   - Claims their resource (proves ownership via GitHub repo)
   - No payment required to claim

2. **Set Your Price**
   - Choose any price: $0 (free), $9, $29, $49, $99, $999
   - Or keep it free (no purchase button)
   - No platform approval needed for pricing

3. **Earn 100% on First 2 Sales, Then 80%**
   - **First 2 sales**: Creator keeps 100% (zero commission) 🎁
   - **Sales 3+**: 80% creator, 20% platform
   - User purchases → money splits automatically via Razorpay/PayPal
   - Creator gets paid within 2-7 days (depending on payment processor)
   - Competitive with Walmart (30-75% off fees), TikTok, Shopee incentives

4. **Track Your Earnings**
   - Creator dashboard shows:
     - Total earnings
     - Sales count
     - Average sale price
     - Pending payouts
   - Request payout anytime (minimum $10)

### **For Users (Demand Side)**

1. **Browse Free**
   - Search 2,200+ resources
   - Filter by category (MCPs, Rules, Workflows, Skills, Prompts)
   - View resource details, descriptions, creator profiles
   - **Unclaimed resources**: Visible but marked "Not For Sale" (see Legal Protection section)

2. **Buy Resources**
   - Click "Buy" button on **claimed + monetized** resources only
   - Checkout via Razorpay (India) or PayPal (International)
   - Instant access after purchase
   - Support creators directly
   - **First 2 purchases**: 100% goes to creator (platform earns $0)
   - **Purchases 3+**: 80% creator, 20% platform

3. **No Account Needed to Browse**
   - Search works without login
   - Account only needed for purchases and submissions

---

## 📊 REVENUE PROJECTIONS

### **Month 1: $1,000 MRR**
- 40 creator claims
- 5-10 sales per creator ($29-49 avg)
- First 2 sales free = 80 sales with 0% commission
- Sales 3+ = ~20 sales with 20% commission = $116
- Ad revenue (1 sponsor): $799
- **Total MRR**: ~$915 (ramping up)

### **Month 4: $10,000 MRR**
- 200 creator claims
- 50% monetized (100 paid resources)
- 5 sales/resource/month = 500 total sales
- All past "first 2 free" threshold (400 sales earlier)
- Platform commission (20% on 500 sales × $29): $2,900
- Ad revenue (3-4 sponsors): $3,000-4,500
- **Total MRR**: ~$6,000-7,400 (conservative, growing exponentially)

### **Year 1: $35,000 MRR** (Cursor.directory parity)
- 500+ creator claims
- 250 active paid resources (50% monetization rate)
- 10 sales/resource/month = 2,500 sales/month
- All past "first 2 free" (500 free sales earlier in year)
- $150,000 creator sales/month @ $60 avg price
- Platform commission (20%): $30,000
- Ad revenue (5-6 sponsors): $5,000-7,500
- **Total MRR**: ~$35,000-37,500

---

## 🏗️ TECHNICAL ARCHITECTURE

### **Database Schema**

```typescript
// Resources can be free or paid (ONLY after claimed)
resources {
  id: uuid
  name: string
  price: number | null           // null = not for sale, number = price
  currency: string                // INR or USD
  creatorId: uuid | null          // null = unclaimed, uuid = claimed
  claimedAt: timestamp | null     // when creator claimed (null = unclaimed)
  claimedVia: string | null       // "github_oauth"
  salesCount: number default 0    // Track first 2 sales for commission logic
  isMonetized: boolean default false // true = creator enabled sales
}

// Creators claim resources
resourceClaims {
  id: uuid
  resourceId: uuid
  userId: uuid
  githubUsername: string
  githubRepoUrl: string
  claimedAt: timestamp
  verificationMethod: "github_oauth"
}

// Track sales (with dynamic commission)
purchases {
  id: uuid
  resourceId: uuid
  buyerId: uuid
  creatorId: uuid
  amountTotal: number
  currency: string
  creatorEarnings: number         // 100% for first 2 sales, 80% after
  platformFee: number              // 0% for first 2 sales, 20% after
  creatorEarningsPercent: number   // 100 or 80
  platformFeePercent: number       // 0 or 20
  paymentMethod: string            // 'razorpay' | 'paypal'
  razorpayOrderId: string | null
  razorpayPaymentId: string | null
  paypalOrderId: string | null
}

// Creator earnings dashboard
creatorEarnings {
  userId: uuid
  totalEarnings: number
  salesCount: number
  pendingPayout: number
  lastPayoutAt: timestamp
}
```

### **Payment Flow (Razorpay/PayPal with Dynamic Commission)**

```
User clicks "Buy" ($49 resource)
  ↓
Check resource.salesCount
  ↓
If salesCount < 2:
  Commission = 0% (creator gets 100%)
Else:
  Commission = 20% (creator gets 80%)
  ↓
Razorpay/PayPal checkout ($49)
  ↓
Payment succeeds
  ↓
Webhook: payment.captured
  ↓
Calculate split based on salesCount:

  FIRST 2 SALES:
  - $49.00 → Creator account (100%)
  - $0.00 → Platform account (0%)

  SALES 3+:
  - $39.20 → Creator account (80%)
  - $9.80 → Platform account (20%)
  ↓
Update database:
  - purchases table: record transaction with actual % split
  - resources.salesCount: increment by 1
  - creatorEarnings: increment totalEarnings
  ↓
Send emails:
  - Buyer: "Purchase confirmed"
  - Creator:
    "You earned $49.00! (First sale - 100% is yours!)" OR
    "You earned $39.20 (80% commission)"
```

---

## 🎨 USER EXPERIENCE

### **Homepage Messaging**

**Hero Section:**
```
"Build, Share, and Earn with Antigravity"

Three Value Props:
💰 Creators Earn (First 2 sales FREE, then 80%) [Claim Your Tool]
🔍 Users Discover (Browse 2,200+ tools) [Browse Tools]
💼 Companies Hire (Post jobs - coming soon) [Post a Job]

Sub-headline:
"Join 200+ creators keeping 100% on their first 2 sales"
```

**Creator Earnings Section:**
```
"Creators Are Earning"

[Creator Card 1: Alex Chen - $8,200/month - 27 tools]
[Creator Card 2: Sarah Williams - $5,100/month - 12 tools]
[Creator Card 3: John Chen - $3,400/month - 8 tools]

[View All Top Creators]
```

### **Resource Page Elements**

**For Unclaimed Resources:**
- Badge: "UNCLAIMED RESOURCE - Not For Sale"
- "Claim This Tool" button (GitHub OAuth)
- Message: "This tool hasn't been claimed yet. Are you the creator?"
- No pricing, no buy button
- GitHub repo link visible

**For Claimed (Free) Resources:**
- Badge: "✓ Claimed by @username"
- "Download Free" or "View on GitHub" button
- Creator profile link
- No pricing, no buy button

**For Claimed + Paid Resources:**
- Badge: "✓ Claimed by @username"
- Price displayed prominently ($49)
- "Buy Now" button
- Creator earnings preview: "Creator has earned $3,200 from 65 sales"
- Commission info: "First 2 sales: Creator keeps 100% • Sales 3+: Creator keeps 80%"
- Secure checkout badge (Razorpay/PayPal)

### **Creator Profile Page**

```
[Avatar] John Smith (@johnsmith)
"$3,200 earned | 8 tools listed | 65 sales"

GitHub: @johnsmith
Twitter: @johnsmith
Website: johnsmith.dev

[Follow] [Message]

---

This Creator's Tools (8):
[Grid of resources with prices and sales counts]

Recent Sales (10):
- Database MCP - $49 - 2 hours ago
- API Tester - $29 - 5 hours ago
...
```

---

## 🚀 IMPLEMENTATION PHASES

### **Phase 0: Foundation (DONE)**
- ✅ 2,330 resources seeded
- ✅ Search and filtering working
- ✅ Database schema ready

### **Phase 1: Marketplace Launch (MVP - 5-7 days)**
- [ ] GitHub OAuth claiming
- [ ] Buy button on paid resources
- [ ] Stripe Connect checkout (80/20 split)
- [ ] Creator earnings dashboard
- [ ] Homepage with "Earn 80%" messaging
- [ ] Dynamic ad placements (empty, ready for sponsors)

### **Phase 2: Growth (Month 2-3)**
- [ ] Creator outreach emails (450 creators)
- [ ] SEO optimization (structured data, Product schema)
- [ ] User profiles with social links
- [ ] Chrome extension (DR 99 backlink)

### **Phase 3: Scale (Month 4+)**
- [ ] Job board
- [ ] Advanced analytics for creators
- [ ] Featured placement options (non-mandatory)
- [ ] Affiliate program

---

## 📝 COPYWRITING GUIDELINES

### **Always Say:**
- ✅ "Claim your tool FREE"
- ✅ "First 2 sales: Keep 100%"
- ✅ "Sales 3+: Keep 80%"
- ✅ "Verification-first marketplace"
- ✅ "Support verified creators directly"
- ✅ "Only claimed resources can be sold" (legal protection)

### **Never Say:**
- ❌ "Submit your tool for $49"
- ❌ "Paid listing tiers"
- ❌ "Standard ($49) / Featured ($149)"
- ❌ "Directory listing fees"
- ❌ "Sponsored placement required"
- ❌ "Sell unclaimed resources" (legal liability)
- ❌ "Platform keeps unclaimed proceeds" (copyright infringement)

---

## 🎯 SUCCESS METRICS

### **Creator Metrics**
- Total creators claimed: Target 40 (Month 1), 200 (Month 4)
- Average earnings per creator: $50-200/month
- Creator retention: 80%+ list second resource

### **Revenue Metrics**
- MRR from commissions: $150 (Month 1) → $8,000 (Month 4)
- MRR from ads: $799 (Month 1) → $2,000 (Month 4)
- Total MRR: $1,000 (Month 1) → $10,000 (Month 4)

### **Platform Metrics**
- Daily visitors: 500 (Month 1) → 5,000 (Month 4)
- Resources listed: 2,200+ (launch) → 3,000+ (Month 4)
- Total sales volume: $1,000 (Month 1) → $40,000 (Month 4)

---

## ⚖️ COMPETITIVE POSITIONING

### **vs. cursor.directory ($35k MRR)**
- ✅ **Better creator incentives**: 80/20 split (they have sales but unclear split)
- ✅ **Better community**: On-site profiles (they have community features)
- ✅ **Better UX**: Marketplace model (not just directory)
- ✅ **Same traffic strategy**: SEO + Chrome extension

### **vs. antigravity.codes (competitor)**
- ✅ **Better monetization**: Marketplace (they have aggressive ads only)
- ✅ **Better creator value**: Earnings (they have no creator incentives)
- ✅ **Better community**: On-site retention (they rely on Discord)

---

## 🔒 LEGAL PROTECTION & COMPLIANCE

### **Why Verification-First Model?**

**Based on industry research (see UNCLAIMED_RESOURCES_LEGAL_ANALYSIS.md):**

1. **DMCA Safe Harbor Protection**
   - Marketplaces are liable for selling third-party content without permission
   - To qualify for safe harbor: must have no knowledge of infringement
   - Selling unclaimed resources = explicit knowledge we lack permission = liability

2. **Industry Best Practices**
   - GitHub npm suspended ALL ownership transfers after disputed claims
   - First-come, first-served with verification is legally safest
   - Avoid ownership disputes entirely

3. **Legal Requirements**
   - Register DMCA agent with US Copyright Office
   - Implement notice-and-takedown process (24-hour response)
   - Terms of Service must require ownership verification
   - Track repeat infringers (3 strikes = account ban)

### **DMCA Compliance Checklist**

**Required Actions** (Phase 1 Launch):
- [ ] Register DMCA agent with Copyright Office
- [ ] Create `/dmca` page with takedown notice process
- [ ] Add DMCA policy link to footer
- [ ] Update Terms of Service:
  ```
  By claiming a resource, you represent and warrant that:
  1. You are the original creator or authorized representative
  2. You have legal right to monetize this resource
  3. The resource does not infringe third-party IP rights
  ```
- [ ] Implement automated takedown workflow
- [ ] Create repeat infringer tracking system

### **Why First 2 Sales Commission-Free?**

**Industry Standard** (see research):
- Walmart: Up to $750k GMV with reduced fees
- TikTok: Temporary fee reduction for new sellers
- Shopee: 3 months zero commission
- Facebook Marketplace: Zero fees for local sales

**Our Policy**:
- First 2 sales = 100% to creator (more generous than 80/20 from start)
- Sales 3+ = 80/20 split (sustainable long-term)
- NO reset, NO time limit - permanent per-resource

**Benefits**:
- ✅ Attracts creators (competitive incentive)
- ✅ Builds trust (we're creator-first)
- ✅ Low risk (we verify ownership first)
- ✅ Sustainable (20% on high-volume sales later)

---

## 🔒 WHAT THIS DOCUMENT REPLACES

All of these documents are **ARCHIVED** and no longer valid:

- ❌ STAGE-1-SPEC.md (had paid submission tiers)
- ❌ ANTIGRAVITY-BUILD-PROMPT.md (wrong revenue model)
- ❌ HOMEPAGE-REWRITE-SPEC.md (paid listings)
- ❌ LAUNCH-PLAN-RESEARCHED.md (directory model)
- ❌ PRODUCT_REQUIREMENTS.md (contradictory)
- ❌ MASTER_PLAN.md (mixed models)
- ❌ 01-ANTIGRAVITY-35K-MRR-STRATEGY.md (paid submissions)

**All archived in**: `docs/archive-old-directory-model/`

---

## 📞 QUESTIONS & CLARIFICATIONS

**Q: Can creators list for free?**
A: Yes. Resources can be free (no purchase button) or paid (any price).

**Q: How do creators get paid?**
A: Stripe Connect. 80% goes directly to their account, 2-day payout.

**Q: Do we charge to claim resources?**
A: NO. Claiming is FREE via GitHub OAuth.

**Q: What about featured placements?**
A: Phase 3+ only. NOT required, NOT a primary revenue source.

**Q: How do we make money?**
A: 0% commission on first 2 sales, 20% commission on sales 3+ + dynamic ad revenue.

**Q: What if a creator wants to list for $999?**
A: Allowed. No price restrictions. Market decides.

**Q: Can we sell unclaimed resources?**
A: NO. Legal liability (copyright infringement). Only verified owners can monetize.

**Q: What happens to unclaimed resources?**
A: Listed as "Not For Sale" until creator claims via GitHub OAuth. Community can browse but not purchase.

**Q: When does the "first 2 sales free" reset?**
A: Never. It's per-resource lifetime. Sales 1-2 = 0% commission, sales 3+ = 20% commission forever.

---

## ✅ DOCUMENT STATUS

**This is the ONLY business model document.**

- All code must align with this spec
- All copy must follow these guidelines
- All strategy must reference this document
- All PRDs must cite this as source of truth

**When in doubt, refer to this document.**

---

**Last Updated**: February 13, 2026
**Next Review**: After Phase 1 launch (measure actual creator earnings vs projections)

---

## 📚 RELATED DOCUMENTS

**Essential Reading**:
- [UNCLAIMED_RESOURCES_LEGAL_ANALYSIS.md](./UNCLAIMED_RESOURCES_LEGAL_ANALYSIS.md) - Legal research & verification-first model justification
- [docs/04-prds/RESOURCE_CLAIMING_SYSTEM_PRD.md](../04-prds/RESOURCE_CLAIMING_SYSTEM_PRD.md) - GitHub OAuth claiming implementation
- [docs/04-prds/RESOURCE_PRICING_UI_PRD.md](../04-prds/RESOURCE_PRICING_UI_PRD.md) - Pricing UI with first 2 sales free logic (PENDING)
- [docs/04-prds/CREATOR_EARNINGS_DASHBOARD_PRD.md](../04-prds/CREATOR_EARNINGS_DASHBOARD_PRD.md) - Creator dashboard (PENDING)
