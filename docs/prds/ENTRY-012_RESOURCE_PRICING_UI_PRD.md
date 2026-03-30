# PRD: Resource Pricing UI (ENTRY-012)

**Status**: APPROVED
**Priority**: BETA BLOCKER
**Estimated Time**: 4-6 hours
**Date**: 2026-02-13

---

## 🎯 OBJECTIVE

Enable creators to set prices on **claimed resources only**, implementing the "first 2 sales free" business model.

---

## 📋 REQUIREMENTS

### Business Rules (Source: MARKETPLACE_MODEL_SPEC.md)

1. **Only claimed resources can be monetized** (verification-first model)
2. **First 2 sales**: Creator keeps 100% (0% commission)
3. **Sales 3+**: Creator keeps 80% (20% commission)
4. **Price range**: $0-$999 (USD or INR)
5. **Free resources**: price = null (no purchase button)

### Database Schema

**Verify these fields exist in `resources` table:**

```typescript
resources {
  price: number | null           // null = not for sale, number = price
  currency: string                // 'USD' or 'INR'
  salesCount: number default 0    // Track first 2 sales for commission
  isMonetized: boolean default false // Creator enabled sales
  claimedAt: timestamp | null     // Must be non-null to enable pricing
  claimedBy: uuid | null          // Must be non-null to enable pricing
}
```

**If `salesCount` doesn't exist, add migration.**

---

## 🎨 UI COMPONENTS

### 1. Pricing Settings Panel (Claimed Resources Only)

**Location**: Resource edit page (only visible if `claimedAt !== null`)

**Fields:**
- Toggle: "Enable paid access"
- Price input: Number field (0-999)
- Currency selector: Dropdown (USD/INR)
- Commission preview: "First 2 sales: You keep 100% • Sales 3+: You keep 80%"
- Save button

**Validation:**
- Show error if `claimedAt === null`: "You must claim this resource first"
- Price must be 0-999
- If price = 0, show warning: "Setting price to $0 means free (no purchase button)"

### 2. Resource Page Updates

**For unclaimed resources:**
- Badge: "🔓 UNCLAIMED - Not For Sale"
- "Claim This Tool" button
- No pricing UI

**For claimed (free) resources:**
- Badge: "✓ Claimed by @username"
- "Download Free" button
- No pricing UI

**For claimed (paid) resources:**
- Badge: "✓ Claimed by @username"
- Price displayed: "$49" or "₹2,999"
- "Buy Now" button
- Commission info: "First 2 sales free for creator"

---

## 🔧 IMPLEMENTATION STEPS

### Step 1: Database Migration (if needed)

```sql
-- Check if salesCount exists
ALTER TABLE resources ADD COLUMN IF NOT EXISTS salesCount INTEGER DEFAULT 0;
```

### Step 2: Create Pricing Form Component

File: `src/components/ResourcePricingForm.tsx`

**Props:**
- `resourceId: string`
- `claimedAt: timestamp | null`
- `currentPrice: number | null`
- `currentCurrency: string`
- `salesCount: number`

**Logic:**
- If `claimedAt === null`, show "Claim first" message
- Form with price/currency inputs + toggle
- On save, update `resources.price`, `resources.currency`, `resources.isMonetized`

### Step 3: Update Purchase Flow

**File**: `src/app/api/resources/[id]/purchase/route.ts`

**Add commission calculation:**

```typescript
// Get resource with salesCount
const resource = await db.query.resources.findFirst({
  where: eq(resources.id, resourceId)
});

// Calculate dynamic commission
const isFirstTwoSales = resource.salesCount < 2;
const creatorPercent = isFirstTwoSales ? 100 : 80;
const platformPercent = isFirstTwoSales ? 0 : 20;

const creatorEarnings = price * (creatorPercent / 100);
const platformFee = price * (platformPercent / 100);

// Record purchase with actual split
await db.insert(purchases).values({
  resourceId,
  buyerId,
  creatorId: resource.claimedBy,
  amountTotal: price,
  currency: resource.currency,
  creatorEarnings,
  platformFee,
  creatorEarningsPercent: creatorPercent,
  platformFeePercent: platformPercent,
  // ... rest of fields
});

// Increment salesCount
await db.update(resources)
  .set({ salesCount: resource.salesCount + 1 })
  .where(eq(resources.id, resourceId));
```

### Step 4: E2E Tests

**File**: `tests/e2e/resource-pricing.spec.ts`

**Test scenarios:**
1. ✅ Unclaimed resource: Pricing UI hidden
2. ✅ Claimed resource: Pricing UI visible
3. ✅ Set price to $49: Purchase button appears
4. ✅ First sale: 100% goes to creator (verify webhook)
5. ✅ Third sale: 80% goes to creator (verify webhook)
6. ✅ Validation: Price > $999 shows error

---

## ✅ SUCCESS CRITERIA

1. **Database**: `salesCount` field exists on `resources` table
2. **UI**: Pricing form only visible for claimed resources
3. **Logic**: First 2 sales = 0% commission, Sales 3+ = 20% commission
4. **Tests**: 6/6 E2E tests pass
5. **Build**: `npm run build` succeeds
6. **Deployment**: Works on production (googleantigravity.directory)

---

## 📚 REFERENCES

- Business model: [MARKETPLACE_MODEL_SPEC.md](../01-business/MARKETPLACE_MODEL_SPEC.md)
- Legal analysis: [UNCLAIMED_RESOURCES_LEGAL_ANALYSIS.md](../01-business/UNCLAIMED_RESOURCES_LEGAL_ANALYSIS.md)
- Claiming system: [ENTRY-009 implementation](../../src/app/api/resources/[id]/claim/route.ts)
- Payment system: [ENTRY-008 implementation](../../src/app/api/resources/[id]/purchase/route.ts)

---

## ⚠️ CRITICAL NOTES

1. **NEVER allow pricing on unclaimed resources** (legal liability)
2. **salesCount is permanent** (never resets, per-resource lifetime)
3. **Commission is automatic** (based on salesCount, no manual override)
4. **Validation is strict** (0-999 range, claimed resources only)

---

**Approved By**: PM
**Assigned To**: Coder (Antigravity)
**Next Step**: Review PRD, then create LEDGER entry
