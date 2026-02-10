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
- Creators list resources **FREE**
- Creators set their own price ($0-$999)
- When a user buys, we split: **80% to creator, 20% to platform**
- Payments via Stripe Connect (direct to creator accounts)

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

3. **Earn 80% on Every Sale**
   - User purchases → money splits automatically
   - 80% goes to creator's Stripe Connect account
   - 20% goes to platform
   - Creator gets paid within 2 days

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

2. **Buy Resources**
   - Click "Buy" button on paid resources
   - Checkout via Stripe
   - Instant access after purchase
   - Support creators directly

3. **No Account Needed to Browse**
   - Search works without login
   - Account only needed for purchases and submissions

---

## 📊 REVENUE PROJECTIONS

### **Month 1: $1,000 MRR**
- 40 creator claims
- 5-10 sales ($29-49 avg)
- Platform commission (20%): $150
- Ad revenue (1 sponsor): $799
- **Total MRR**: ~$1,000

### **Month 4: $10,000 MRR**
- 200 creator claims
- $40,000 creator sales
- Platform commission (20%): $8,000
- Ad revenue (2-3 sponsors): $2,000
- **Total MRR**: ~$10,000

### **Year 1: $35,000 MRR** (Cursor.directory parity)
- 500+ creator claims
- $150,000 creator sales/month
- Platform commission (20%): $30,000
- Ad revenue (4-5 sponsors): $5,000
- **Total MRR**: ~$35,000

---

## 🏗️ TECHNICAL ARCHITECTURE

### **Database Schema**

```typescript
// Resources can be free or paid
resources {
  id: uuid
  name: string
  price: number | null  // null = free, number = paid
  creatorId: uuid       // Link to user who claimed it
  stripeProductId: string | null
  stripePriceId: string | null
}

// Creators claim resources
resourceClaims {
  resourceId: uuid
  userId: uuid
  claimedAt: timestamp
  verificationMethod: "github_oauth"
}

// Track sales
payments {
  id: uuid
  resourceId: uuid
  buyerId: uuid
  creatorId: uuid
  amount: number
  platformFee: number     // 20%
  creatorEarnings: number // 80%
  stripePaymentId: string
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

### **Payment Flow (Stripe Connect)**

```
User clicks "Buy" ($49 resource)
  ↓
Stripe checkout ($49)
  ↓
Payment succeeds
  ↓
Webhook: payment.succeeded
  ↓
Split payment:
  - $39.20 → Creator Stripe Connect account (80%)
  - $9.80 → Platform account (20%)
  ↓
Update database:
  - payments table: record transaction
  - creatorEarnings: increment totalEarnings
  ↓
Send emails:
  - Buyer: "Purchase confirmed"
  - Creator: "You earned $39.20"
```

---

## 🎨 USER EXPERIENCE

### **Homepage Messaging**

**Hero Section:**
```
"Build, Share, and Earn with Antigravity"

Three Value Props:
💰 Creators Earn (Keep 80% of every sale) [Claim Your Tool]
🔍 Users Discover (Browse 2,200+ tools) [Browse Tools]
💼 Companies Hire (Post jobs - coming soon) [Post a Job]
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

**For Free Resources:**
- No "Buy" button
- "Download Free" or "View on GitHub" button
- Creator profile link

**For Paid Resources:**
- Price displayed prominently ($49)
- "Buy Now" button
- Creator earnings preview: "Creator has earned $3,200 from this tool"
- Secure checkout badge

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
- ✅ "List your tool FREE"
- ✅ "Keep 80% of every sale"
- ✅ "Earn from your Antigravity tools"
- ✅ "Marketplace for creators"
- ✅ "Support creators directly"

### **Never Say:**
- ❌ "Submit your tool for $49"
- ❌ "Paid listing tiers"
- ❌ "Standard ($49) / Featured ($149)"
- ❌ "Directory listing fees"
- ❌ "Sponsored placement required"

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
A: 20% commission on sales + dynamic ad revenue.

**Q: What if a creator wants to list for $999?**
A: Allowed. No price restrictions. Market decides.

---

## ✅ DOCUMENT STATUS

**This is the ONLY business model document.**

- All code must align with this spec
- All copy must follow these guidelines
- All strategy must reference this document
- All PRDs must cite this as source of truth

**When in doubt, refer to this document.**

---

**Last Updated**: February 11, 2026
**Next Review**: After Phase 1 launch (measure actual creator earnings vs projections)
