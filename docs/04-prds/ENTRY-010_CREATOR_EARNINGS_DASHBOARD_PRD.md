# PRD: Creator Earnings Dashboard (ENTRY-010)

**Status**: APPROVED
**Priority**: BETA BLOCKER
**Estimated Time**: 6-8 hours
**Date**: 2026-02-13

---

## 🎯 OBJECTIVE

Enable creators to view earnings, sales history, and request payouts from their claimed resources.

---

## 📋 REQUIREMENTS

### Business Rules (Source: MARKETPLACE_MODEL_SPEC.md)

1. **Display total earnings** (creator's 100% or 80% share only)
2. **Sales breakdown**: "First 2 sales (100%)" vs "Sales 3+ (80%)"
3. **Payout requests**: Minimum $10 threshold
4. **Sales history**: Resource name, price, date, buyer (name only), commission %
5. **Real-time updates**: Earnings update immediately after purchase

### Database Queries

**Aggregate creator earnings:**

```typescript
// Total earnings for logged-in creator
SELECT SUM(creatorEarnings) as totalEarnings,
       COUNT(*) as salesCount,
       SUM(CASE WHEN creatorEarningsPercent = 100 THEN 1 ELSE 0 END) as firstTwoSales,
       SUM(CASE WHEN creatorEarningsPercent = 80 THEN 1 ELSE 0 END) as subsequentSales
FROM purchases
WHERE creatorId = :userId
```

**Sales history:**

```typescript
SELECT p.*, r.name as resourceName, u.name as buyerName
FROM purchases p
JOIN resources r ON p.resourceId = r.id
JOIN users u ON p.buyerId = u.id
WHERE p.creatorId = :userId
ORDER BY p.createdAt DESC
LIMIT 50
```

---

## 🎨 UI COMPONENTS

### 1. Earnings Overview Card

**Location**: `/dashboard` page (top section)

**Display:**
- 💰 **Total Earnings**: $3,200.00
- 📊 **Sales Count**: 65 sales
- 🎁 **First 2 Sales**: 10 sales (100% commission)
- 💸 **Sales 3+**: 55 sales (80% commission)
- 💵 **Pending Payout**: $450.00
- 📅 **Last Payout**: Jan 15, 2026

**Actions:**
- "Request Payout" button (disabled if < $10)

### 2. Sales History Table

**Location**: `/dashboard` page (below overview)

**Columns:**
- Resource name (link to resource page)
- Price (with currency)
- Your earnings (with %)
- Buyer name
- Date (formatted: "Jan 15, 2026")
- Commission type ("First 2 sales" or "80/20 split")

**Features:**
- Pagination (50 per page)
- Sort by date (default: newest first)
- Filter by resource

### 3. Payout Request Modal

**Trigger**: Click "Request Payout" button

**Fields:**
- Payment method: Dropdown (Razorpay/PayPal)
- Account details: Text input (email or UPI ID)
- Amount: Display total pending payout (non-editable)
- Confirmation checkbox: "I confirm payout details are correct"

**Validation:**
- Pending payout ≥ $10
- Payment method selected
- Account details valid format

**On submit:**
- Create record in `payout_requests` table
- Send email to creator: "Payout request received"
- Send email to admin: "New payout request from @username"
- Update UI: Show "Payout requested" status

---

## 🔧 IMPLEMENTATION STEPS

### Step 1: Database Schema

**New table: `payout_requests`**

```typescript
payout_requests {
  id: uuid
  creatorId: uuid (FK to users)
  amount: number
  currency: string
  paymentMethod: string // 'razorpay' | 'paypal'
  accountDetails: string // email or UPI ID
  status: string // 'pending' | 'processing' | 'completed' | 'rejected'
  requestedAt: timestamp
  processedAt: timestamp | null
  notes: string | null
}
```

### Step 2: Create Dashboard Components

**File**: `src/components/dashboard/EarningsOverview.tsx`

- Query creator earnings aggregates
- Display cards with totals
- "Request Payout" button with modal trigger

**File**: `src/components/dashboard/SalesHistory.tsx`

- Query purchases with JOIN to resources + users
- Paginated table component
- Filter/sort controls

**File**: `src/components/dashboard/PayoutRequestModal.tsx`

- Form with payment method + account details
- Validation logic
- Submit handler → API call

### Step 3: Create API Routes

**File**: `src/app/api/creator/earnings/route.ts`

```typescript
GET /api/creator/earnings
// Returns: { totalEarnings, salesCount, firstTwoSales, subsequentSales, pendingPayout }
```

**File**: `src/app/api/creator/sales/route.ts`

```typescript
GET /api/creator/sales?page=1&limit=50
// Returns: { sales: [...], total, page, pages }
```

**File**: `src/app/api/creator/payout/request/route.ts`

```typescript
POST /api/creator/payout/request
Body: { amount, paymentMethod, accountDetails }
// Returns: { success: true, requestId }
```

### Step 4: Update Dashboard Page

**File**: `src/app/dashboard/page.tsx`

```typescript
// Add earnings section
<div className="space-y-6">
  <EarningsOverview userId={session.user.id} />
  <SalesHistory userId={session.user.id} />
</div>
```

### Step 5: E2E Tests

**File**: `tests/e2e/creator-dashboard.spec.ts`

**Test scenarios:**
1. ✅ Earnings overview displays correctly
2. ✅ Sales history shows all sales
3. ✅ Payout button disabled if < $10
4. ✅ Payout request modal opens
5. ✅ Payout request submits successfully
6. ✅ Email sent to creator + admin

---

## ✅ SUCCESS CRITERIA

1. **Earnings display**: Totals calculated correctly (100% + 80% split logic)
2. **Sales breakdown**: First 2 vs subsequent sales shown separately
3. **Sales history**: Paginated, sortable, shows all purchase details
4. **Payout requests**: Minimum $10 enforced, modal works
5. **Tests**: 6/6 E2E tests pass
6. **Build**: `npm run build` succeeds
7. **Deployment**: Works on production

---

## 📚 REFERENCES

- Business model: [MARKETPLACE_MODEL_SPEC.md](../01-business/MARKETPLACE_MODEL_SPEC.md)
- Payment system: [ENTRY-008 implementation](../../src/app/api/resources/[id]/purchase/route.ts)
- Database schema: [schema.ts](../../src/drizzle/schema.ts)

---

## ⚠️ CRITICAL NOTES

1. **Only show creator's earnings** (not platform fee)
2. **Commission breakdown required** (100% vs 80% split)
3. **Payout minimum $10** (business rule)
4. **Real-time updates** (no caching of earnings)
5. **Email notifications** (creator + admin on payout request)

---

## 🔒 SECURITY

- Creators can only view their own earnings (authorize by session.user.id)
- Payout requests require authentication
- Account details encrypted at rest
- Rate limit payout requests (max 1 per hour)

---

**Approved By**: PM
**Assigned To**: Coder (Antigravity) - AFTER ENTRY-012
**Next Step**: Review PRD, create LEDGER entry after ENTRY-012 complete
