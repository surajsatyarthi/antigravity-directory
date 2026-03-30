# PRD: Resource Purchase System with 80/20 Split

**Document Type**: Product Requirements Document
**Status**: ✅ APPROVED
**Entry ID**: ENTRY-008
**Created**: 2026-02-13
**Owner**: PM
**Reference**: [MARKETPLACE_MODEL_SPEC.md](../01-business/MARKETPLACE_MODEL_SPEC.md)

---

## 🎯 OBJECTIVE

Enable users to purchase paid resources from creators with automatic 80/20 revenue split.

**Business Model**: Marketplace with creator earnings (NOT submission fees)

---

## 📋 USER STORIES

### As a User (Buyer)
- I want to see the price of a resource clearly displayed
- I want to click "Buy Now" and checkout securely
- I want to pay via Razorpay (India) or PayPal (International)
- I want instant access to the resource after purchase
- I want to receive a purchase confirmation email

### As a Creator (Seller)
- I want to set a price for my resource (or keep it free)
- I want to earn 80% of every sale automatically
- I want to see my total earnings in my dashboard
- I want to receive a notification when someone buys my resource
- I want payment within 2 days to my Razorpay/PayPal account

### As Platform
- I want to earn 20% commission on all sales
- I want to track all transactions in the database
- I want to prevent fraud with payment verification
- I want to handle payment failures gracefully

---

## 🏗️ TECHNICAL REQUIREMENTS

### 1. Resource Price Display

**For Free Resources** (price = null):
- No "Buy" button shown
- Show "Download Free" or "View on GitHub" button
- Label: "Free Resource"

**For Paid Resources** (price > 0):
- Display price prominently: "$49" or "₹999"
- Show "Buy Now" button
- Show creator earnings preview: "Creator has earned $X from this resource"
- Security badge: "Secure checkout via Razorpay/PayPal"

### 2. Payment Integration

**Razorpay** (Primary for India):
- Create order endpoint: `/api/resources/[id]/purchase/razorpay`
- Handle order creation with amount
- Verify payment signature on webhook
- Calculate 80/20 split server-side
- Update database on success

**PayPal** (International):
- Create order endpoint: `/api/resources/[id]/purchase/paypal`
- Handle payment capture
- Calculate 80/20 split server-side
- Update database on success

**Payment Flow**:
```
1. User clicks "Buy Now" → Detect location (India vs International)
2. Show Razorpay (India) or PayPal (International) checkout
3. User completes payment
4. Webhook received → Verify payment
5. Split: 80% creator, 20% platform
6. Update database (purchases + creator_earnings)
7. Send emails (buyer + creator)
8. Grant access to resource
```

### 3. Database Schema

```sql
-- Main purchases table
CREATE TABLE purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  resource_id UUID NOT NULL REFERENCES resources(id),
  buyer_id UUID NOT NULL REFERENCES users(id),
  creator_id UUID NOT NULL REFERENCES users(id),

  -- Pricing (in cents/paise)
  amount_total INTEGER NOT NULL,
  creator_earnings INTEGER NOT NULL, -- 80%
  platform_fee INTEGER NOT NULL, -- 20%
  currency TEXT NOT NULL, -- USD, INR

  -- Payment tracking
  payment_method TEXT NOT NULL, -- razorpay or paypal
  payment_id TEXT NOT NULL, -- razorpay_payment_id or paypal order id
  order_id TEXT, -- razorpay_order_id

  -- Status
  status TEXT NOT NULL DEFAULT 'pending', -- pending, success, failed, refunded

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,

  UNIQUE(payment_id)
);

-- Creator earnings aggregation
CREATE TABLE creator_earnings (
  user_id UUID PRIMARY KEY REFERENCES users(id),
  total_earnings INTEGER NOT NULL DEFAULT 0, -- in cents
  sales_count INTEGER NOT NULL DEFAULT 0,
  last_sale_at TIMESTAMPTZ,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Track user purchases for access control
CREATE TABLE user_resource_access (
  user_id UUID NOT NULL REFERENCES users(id),
  resource_id UUID NOT NULL REFERENCES resources(id),
  purchase_id UUID NOT NULL REFERENCES purchases(id),
  granted_at TIMESTAMPTZ DEFAULT NOW(),

  PRIMARY KEY (user_id, resource_id)
);

-- Add price field to resources table (if not exists)
ALTER TABLE resources ADD COLUMN IF NOT EXISTS price INTEGER; -- in cents, null = free
ALTER TABLE resources ADD COLUMN IF NOT EXISTS currency TEXT DEFAULT 'USD';
```

### 4. API Routes

**Create Razorpay Order**:
- `POST /api/resources/[id]/purchase/razorpay`
- Body: `{ amount, currency, userId }`
- Returns: `{ orderId, amount, currency, keyId }`

**Verify Razorpay Payment**:
- `POST /api/webhooks/razorpay`
- Verifies signature
- Creates purchase record
- Splits payment 80/20
- Updates creator_earnings
- Sends confirmation emails

**Create PayPal Order**:
- `POST /api/resources/[id]/purchase/paypal`
- Body: `{ amount, currency, userId }`
- Returns: `{ orderId, approvalUrl }`

**Capture PayPal Payment**:
- `POST /api/resources/[id]/purchase/paypal/capture`
- Body: `{ orderId }`
- Captures payment
- Splits payment 80/20
- Updates database

### 5. UI Components

**Buy Button Component** (`components/BuyButton.tsx`):
- Shows price
- Detects user location
- Opens Razorpay (India) or PayPal (International)
- Handles success/failure states
- Shows loading spinner during checkout

**Purchase Confirmation Modal**:
- Shows after successful purchase
- "Purchase Complete! You now have access to [Resource Name]"
- Link to download/access resource
- Receipt details

---

## ✅ ACCEPTANCE CRITERIA

### Must Have (MVP)
- [ ] Buy button shows on paid resources only
- [ ] Razorpay checkout works for India
- [ ] PayPal checkout works for International
- [ ] 80/20 split calculated correctly
- [ ] Database records all transactions
- [ ] Creator earnings table updates
- [ ] User gets access to purchased resource
- [ ] Payment webhooks work (Razorpay + PayPal)
- [ ] Duplicate payment prevention (idempotency)

### Should Have (Phase 2)
- [ ] Purchase confirmation emails (buyer + creator)
- [ ] Creator dashboard shows earnings
- [ ] Failed payment retry flow
- [ ] Refund handling

### Could Have (Future)
- [ ] Purchase history for users
- [ ] Analytics for creators (sales over time)
- [ ] Discount codes
- [ ] Bulk purchases

---

## 🔒 SECURITY REQUIREMENTS

1. **Payment Verification**:
   - Verify Razorpay signature on webhook
   - Verify PayPal payment on capture
   - Never trust client-side amounts

2. **Fraud Prevention**:
   - Check if user already purchased resource
   - Prevent duplicate payments (idempotency keys)
   - Rate limit purchase endpoints (5 requests/minute)

3. **Data Protection**:
   - Store only payment IDs, never card details
   - Log all payment attempts for audit
   - Encrypt webhook secrets in env vars

---

## 📊 SUCCESS METRICS

### Technical Metrics
- Payment success rate: >95%
- Webhook processing time: <2 seconds
- 80/20 split accuracy: 100%

### Business Metrics
- Total sales volume: Track monthly
- Creator earnings: Track per creator
- Platform revenue (20%): Track monthly
- Purchase conversion rate: Track (views → purchases)

---

## 🚫 OUT OF SCOPE

- ❌ Stripe integration (banned in India)
- ❌ Cryptocurrency payments
- ❌ Subscription model (one-time purchases only)
- ❌ Creator payout automation (manual for MVP)
- ❌ Tax calculation (future enhancement)

---

## 📁 REFERENCE DOCUMENTS

- Business Model: [MARKETPLACE_MODEL_SPEC.md](../01-business/MARKETPLACE_MODEL_SPEC.md)
- Database Schema: `src/drizzle/schema.ts`
- Razorpay Docs: https://razorpay.com/docs/payments/
- PayPal Docs: https://developer.paypal.com/docs/checkout/

---

## 🎯 IMPLEMENTATION NOTES

**For Coder**:
1. Read MARKETPLACE_MODEL_SPEC.md first (business context)
2. Use existing Razorpay/PayPal integration from CheckoutOverlay.tsx as reference
3. Create new tables via Drizzle migration
4. Test with Razorpay test mode (key_id from env)
5. Test with PayPal sandbox
6. Provide screenshot of successful purchase + database record

**Environment Variables Required**:
```
RAZORPAY_KEY_ID=rzp_test_xxx
RAZORPAY_KEY_SECRET=xxx
RAZORPAY_WEBHOOK_SECRET=xxx
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxx

PAYPAL_CLIENT_ID=xxx
PAYPAL_CLIENT_SECRET=xxx
NEXT_PUBLIC_PAYPAL_CLIENT_ID=xxx
```

---

**Status**: ✅ APPROVED - Ready for implementation
**Estimated Effort**: 4-5 hours
**Priority**: HIGH (Phase 1 - Marketplace Launch)
