# Implementation Plan: ENTRY-010 - Creator Earnings Dashboard

**Date**: 2026-02-13
**PM**: Claude Code (PM Mode)
**Coder**: Antigravity (Implementation)
**Feature**: Creator Earnings Dashboard
**Estimated Time**: 6-8 hours
**Status**: PENDING_APPROVAL

---

## 1. Executive Summary

Implement a comprehensive creator earnings dashboard that enables creators to:
- View total earnings with transparent commission breakdown (100% for first 2 sales, 80% for sales 3+)
- Browse paginated sales history with per-transaction commission details
- Request payouts with $10 USD minimum threshold
- Receive email notifications on payout requests

**Business Value**: Final beta blocker that unlocks creator monetization and completes marketplace MVP.

---

## 2. Technical Architecture

### 2.1 Components (Frontend)

#### Component 1: `EarningsOverview.tsx`
**Purpose**: Display aggregated earnings summary

**Props**:
```typescript
interface EarningsOverviewProps {
  totalEarnings: number;        // Total creator earnings in cents
  firstTwoEarnings: number;     // Earnings from first 2 sales (100%)
  subsequentEarnings: number;   // Earnings from sales 3+ (80%)
  salesCount: number;           // Total sales count
  firstTwoSalesCount: number;   // Count of first 2 sales
  pendingPayout: number;        // Amount available for payout
}
```

**UI Elements**:
- Card with 3 sections:
  1. Total Earnings (prominent display)
  2. Breakdown: "First 2 sales (100%): $X" + "Sales 3+ (80%): $Y"
  3. Pending Payout (available to withdraw)
- "Request Payout" CTA button (opens `PayoutRequestModal`)
- Real-time updates (no caching, fetch on mount)

**Data Source**: `GET /api/creator/earnings`

---

#### Component 2: `SalesHistory.tsx`
**Purpose**: Display paginated list of all sales with commission details

**Props**:
```typescript
interface SalesHistoryProps {
  sales: Sale[];
  totalCount: number;
  page: number;
  onPageChange: (page: number) => void;
}

interface Sale {
  id: string;
  resourceName: string;
  resourceSlug: string;
  saleDate: Date;
  price: number;              // cents
  buyerUsername: string;
  commissionPercent: number;  // 100 or 80
  creatorEarnings: number;    // cents
}
```

**UI Elements**:
- Table with columns: Resource, Date, Price, Buyer, Commission %, Your Earnings
- Pagination controls (50 sales per page)
- Sort by date (newest first)
- Resource name links to `/t/[slug]`
- Mobile-responsive (stack columns on small screens)

**Data Source**: `GET /api/creator/sales?page=1&limit=50`

---

#### Component 3: `PayoutRequestModal.tsx`
**Purpose**: Submit payout requests with validation

**Props**:
```typescript
interface PayoutRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableAmount: number;  // cents
  onSuccess: () => void;
}
```

**UI Elements**:
- Modal/dialog with form:
  1. Amount display (read-only, shows available balance)
  2. Payment method select (Razorpay / PayPal)
  3. Account details textarea (UPI ID, PayPal email, etc.)
  4. Submit button (disabled if amount < $10)
- Validation:
  - Minimum $10 USD threshold
  - Payment method required
  - Account details required (min 5 chars)
- Success toast: "Payout request submitted! We'll review within 3-5 business days."
- Error handling: Show clear error messages

**Data Sink**: `POST /api/creator/payout/request`

---

### 2.2 API Routes (Backend)

#### Route 1: `GET /api/creator/earnings`
**Purpose**: Fetch aggregated earnings summary for logged-in creator

**Auth**: Requires session (NextAuth)

**Logic**:
```typescript
// Fetch all purchases where resource.authorId = session.user.id
const purchases = await db.select()
  .from(purchases)
  .innerJoin(resources, eq(purchases.resourceId, resources.id))
  .where(eq(resources.authorId, session.user.id));

// Calculate earnings based on stored creatorPercent
const firstTwoEarnings = purchases
  .filter(p => p.creatorPercent === 100)
  .reduce((sum, p) => sum + p.creatorEarnings, 0);

const subsequentEarnings = purchases
  .filter(p => p.creatorPercent === 80)
  .reduce((sum, p) => sum + p.creatorEarnings, 0);

const totalEarnings = firstTwoEarnings + subsequentEarnings;

// Calculate pending payout (total - completed payouts)
const completedPayouts = await db.select()
  .from(payoutRequests)
  .where(and(
    eq(payoutRequests.creatorId, session.user.id),
    eq(payoutRequests.status, 'completed')
  ));

const totalPaidOut = completedPayouts.reduce((sum, p) => sum + p.amount, 0);
const pendingPayout = totalEarnings - totalPaidOut;

return {
  totalEarnings,
  firstTwoEarnings,
  subsequentEarnings,
  salesCount: purchases.length,
  firstTwoSalesCount: purchases.filter(p => p.creatorPercent === 100).length,
  pendingPayout
};
```

**Response**:
```json
{
  "totalEarnings": 9800,
  "firstTwoEarnings": 4900,
  "subsequentEarnings": 4900,
  "salesCount": 3,
  "firstTwoSalesCount": 2,
  "pendingPayout": 9800
}
```

---

#### Route 2: `GET /api/creator/sales`
**Purpose**: Fetch paginated sales history for logged-in creator

**Auth**: Requires session (NextAuth)

**Query Params**:
- `page` (default: 1)
- `limit` (default: 50, max: 100)

**Logic**:
```typescript
const page = parseInt(req.query.page as string) || 1;
const limit = Math.min(parseInt(req.query.limit as string) || 50, 100);
const offset = (page - 1) * limit;

const sales = await db.select({
  id: purchases.id,
  resourceName: resources.name,
  resourceSlug: resources.slug,
  saleDate: purchases.createdAt,
  price: purchases.price,
  buyerUsername: users.username,
  commissionPercent: purchases.creatorPercent,
  creatorEarnings: purchases.creatorEarnings
})
  .from(purchases)
  .innerJoin(resources, eq(purchases.resourceId, resources.id))
  .innerJoin(users, eq(purchases.userId, users.id))
  .where(eq(resources.authorId, session.user.id))
  .orderBy(desc(purchases.createdAt))
  .limit(limit)
  .offset(offset);

const totalCount = await db.select({ count: count() })
  .from(purchases)
  .innerJoin(resources, eq(purchases.resourceId, resources.id))
  .where(eq(resources.authorId, session.user.id));

return {
  sales,
  totalCount: totalCount[0].count,
  page,
  limit
};
```

**Response**:
```json
{
  "sales": [
    {
      "id": "uuid",
      "resourceName": "My Awesome MCP Server",
      "resourceSlug": "my-awesome-mcp-server",
      "saleDate": "2026-02-13T10:30:00Z",
      "price": 4900,
      "buyerUsername": "john_doe",
      "commissionPercent": 80,
      "creatorEarnings": 3920
    }
  ],
  "totalCount": 47,
  "page": 1,
  "limit": 50
}
```

---

#### Route 3: `POST /api/creator/payout/request`
**Purpose**: Submit payout request with email notifications

**Auth**: Requires session (NextAuth)

**Request Body**:
```typescript
{
  "amount": 9800,  // cents (must match available balance)
  "paymentMethod": "razorpay" | "paypal",
  "accountDetails": "UPI ID: user@paytm or PayPal: user@example.com"
}
```

**Validation**:
- Amount >= $10 USD (1000 cents)
- Amount <= available balance (pendingPayout from earnings API)
- Payment method in ['razorpay', 'paypal']
- Account details min length: 5 chars

**Logic**:
```typescript
// 1. Verify available balance
const earnings = await getCreatorEarnings(session.user.id);
if (req.body.amount > earnings.pendingPayout) {
  return res.status(400).json({ error: 'Insufficient balance' });
}

// 2. Create payout request
const payoutRequest = await db.insert(payoutRequests).values({
  id: generateUUID(),
  creatorId: session.user.id,
  amount: req.body.amount,
  currency: 'USD',  // MVP: USD only, future: multi-currency
  paymentMethod: req.body.paymentMethod,
  accountDetails: req.body.accountDetails,
  status: 'pending',
  requestedAt: new Date()
});

// 3. Send email notifications
await sendEmail({
  to: session.user.email,
  subject: 'Payout Request Received',
  body: `Your payout request for $${req.body.amount / 100} has been submitted. We'll review within 3-5 business days.`
});

await sendEmail({
  to: 'admin@googleantigravity.directory',
  subject: 'New Payout Request',
  body: `Creator ${session.user.username} requested payout of $${req.body.amount / 100} via ${req.body.paymentMethod}.`
});

return res.status(201).json({ success: true, payoutRequestId: payoutRequest.id });
```

**Response**:
```json
{
  "success": true,
  "payoutRequestId": "uuid"
}
```

---

### 2.3 Database Schema

#### New Table: `payout_requests`

**Migration**: `src/drizzle/migrations/000X_create_payout_requests.sql`

```sql
CREATE TABLE payout_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL,  -- cents
  currency VARCHAR(3) NOT NULL DEFAULT 'USD',
  payment_method VARCHAR(50) NOT NULL,  -- 'razorpay' | 'paypal'
  account_details TEXT NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'pending',  -- 'pending' | 'processing' | 'completed' | 'rejected'
  requested_at TIMESTAMP NOT NULL DEFAULT NOW(),
  processed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_payout_requests_creator_id ON payout_requests(creator_id);
CREATE INDEX idx_payout_requests_status ON payout_requests(status);
CREATE INDEX idx_payout_requests_requested_at ON payout_requests(requested_at DESC);
```

**Drizzle Schema** (`src/drizzle/schema.ts`):
```typescript
export const payoutRequests = pgTable('payout_requests', {
  id: uuid('id').primaryKey().defaultRandom(),
  creatorId: uuid('creator_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  amount: integer('amount').notNull(),
  currency: varchar('currency', { length: 3 }).notNull().default('USD'),
  paymentMethod: varchar('payment_method', { length: 50 }).notNull(),
  accountDetails: text('account_details').notNull(),
  status: varchar('status', { length: 20 }).notNull().default('pending'),
  requestedAt: timestamp('requested_at').notNull().defaultNow(),
  processedAt: timestamp('processed_at'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});
```

---

### 2.4 Dashboard Integration

**Update**: `src/app/dashboard/page.tsx`

**Changes**:
1. Add new tab/section: "Earnings" (after existing dashboard sections)
2. Import and render `EarningsOverview` and `SalesHistory` components
3. Conditional rendering: Only show earnings section if user has claimed resources (`user.claimedResourcesCount > 0`)

**Layout**:
```tsx
<div className="grid gap-6">
  {/* Existing dashboard sections */}

  {/* New earnings section */}
  {user.claimedResourcesCount > 0 && (
    <section>
      <h2>Your Earnings</h2>
      <EarningsOverview />
      <SalesHistory />
    </section>
  )}
</div>
```

---

## 3. Alternatives Considered

### Alternative 1: Database Schema - Single `transactions` Table vs Separate `payout_requests`

**Option A: Single `transactions` table** (purchases + payouts combined)
- ✅ Fewer tables, simpler schema
- ❌ Mixing purchase records with payout records (different data structures)
- ❌ Complex queries to separate purchase logic from payout logic

**Option B: Separate `payout_requests` table** ✅ **SELECTED**
- ✅ Clear separation of concerns (purchases vs payouts)
- ✅ Easier to query payout history independently
- ✅ Different status workflows (purchases: completed/failed, payouts: pending/processing/completed/rejected)
- ❌ One additional table in schema

**Decision**: Use separate `payout_requests` table for clarity and maintainability.

---

### Alternative 2: Payout Request Flow - Manual Review vs Automated

**Option A: Fully automated payouts** (instant processing)
- ✅ Better UX (instant payouts)
- ❌ High fraud risk (fake purchases, stolen credit cards)
- ❌ Requires fraud detection system (out of MVP scope)
- ❌ Razorpay/PayPal integration complexity (automated transfers)

**Option B: Manual review (admin approves payouts)** ✅ **SELECTED**
- ✅ Fraud prevention (admin reviews each request)
- ✅ Simpler MVP implementation (no automated transfers yet)
- ✅ Sets clear expectations (3-5 business days)
- ❌ Slower UX (creators wait for approval)

**Decision**: Manual review for MVP, automate in post-launch (ENTRY-020+).

---

### Alternative 3: Minimum Payout Threshold - $10 vs $50 vs $100

**Option A: $100 minimum** (Google AdSense standard)
- ✅ Fewer payout requests to process
- ❌ High barrier to first payout (discourages new creators)
- ❌ Most creators won't reach $100 in first month

**Option B: $50 minimum** (Twitch standard)
- ✅ Moderate barrier (2-3 $20 sales)
- ❌ Still too high for MVP (most resources priced $10-$30)

**Option C: $10 minimum** ✅ **SELECTED**
- ✅ Low barrier to first payout (1-2 sales)
- ✅ Encourages early creator engagement
- ✅ Competitive advantage vs Gumroad/Patreon
- ❌ More payout requests to process (acceptable for MVP scale)

**Decision**: $10 minimum threshold to maximize creator engagement.

---

### Alternative 4: Email Notifications - Send vs No Send

**Option A: No email notifications** (user checks dashboard manually)
- ✅ Simpler implementation (no email service)
- ❌ Poor UX (creators don't know when payout processed)
- ❌ No admin notification (manual checking required)

**Option B: Email notifications (creator + admin)** ✅ **SELECTED**
- ✅ Better UX (creators notified immediately)
- ✅ Admin alerted to review requests
- ✅ Builds trust (transparent communication)
- ❌ Requires email service integration (already have this for purchases)

**Decision**: Send emails to both creator and admin for transparency.

---

### Alternative 5: Earnings Calculation - Pre-calculated vs On-the-fly

**Option A: Pre-calculated earnings** (cache in `users` table)
- ✅ Faster API response (no aggregation needed)
- ❌ Stale data risk (cache invalidation complexity)
- ❌ Duplicate data (earnings stored in both `purchases` and `users`)

**Option B: Calculate on-the-fly** (aggregate from `purchases` table) ✅ **SELECTED**
- ✅ Always accurate (single source of truth)
- ✅ No cache invalidation needed
- ✅ Audit trail preserved (recalculate from raw data)
- ❌ Slightly slower (acceptable for MVP scale)

**Decision**: Calculate on-the-fly for accuracy, optimize later if needed.

---

## 4. E2E Testing Strategy

**Test File**: `tests/e2e/creator-dashboard.spec.ts`

### Test Scenarios (6 total)

1. **Earnings overview displays correct totals**
   - Create 3 purchases (2 at 100%, 1 at 80%)
   - Verify total earnings = (sale1 + sale2 + sale3 * 0.8)
   - Verify breakdown: "First 2 sales: $X" + "Sales 3+: $Y"

2. **Sales history shows all sales with correct commission**
   - Create 5 purchases with mixed commission rates
   - Verify table displays 5 rows
   - Verify commission column shows 100% or 80%

3. **Sales history pagination works**
   - Create 75 purchases
   - Verify page 1 shows 50 sales
   - Click "Next page"
   - Verify page 2 shows 25 sales

4. **Payout request succeeds with valid data**
   - Set available balance to $50
   - Fill payout form: $20, PayPal, account details
   - Submit form
   - Verify success toast
   - Verify database record created
   - Verify emails sent (mock)

5. **Payout request fails below $10 minimum**
   - Set available balance to $8
   - Attempt payout request
   - Verify button disabled
   - Verify error message: "Minimum payout: $10"

6. **Pending payout updates after payout request**
   - Set available balance to $100
   - Submit payout request for $50
   - Verify pending payout decreases to $50
   - Verify payout request status = 'pending'

---

## 5. Security & Validation

### Authorization Checks
- All API routes require `session.user.id`
- Creators can only view THEIR earnings (not other creators')
- Payout requests verified against actual available balance (prevent overpayment)

### Input Validation
- Amount: Integer, min 1000 cents ($10), max = available balance
- Payment method: Enum ['razorpay', 'paypal']
- Account details: String, min 5 chars, max 500 chars
- Currency: Hardcoded 'USD' for MVP (future: validate against supported currencies)

### Rate Limiting
- Payout request API: Max 5 requests per hour per user (prevent spam)
- Earnings API: Max 100 requests per hour per user (prevent DoS)
- Sales history API: Max 100 requests per hour per user

---

## 6. Dependencies

### Internal Dependencies (Must Exist)
- ✅ ENTRY-008: Payment processing (Razorpay/PayPal) - DONE
- ✅ ENTRY-012: Resource pricing + `salesCount` field - DONE
- ✅ `purchases` table with `creatorEarnings`, `creatorPercent` columns - DONE
- ✅ NextAuth session with `user.id`, `user.email`, `user.username` - DONE

### External Dependencies
- ✅ Supabase PostgreSQL database - EXISTS
- ✅ Drizzle ORM - EXISTS
- ✅ NextAuth 5.0 beta - EXISTS
- ✅ Email service (same as purchase notifications) - EXISTS
- ✅ Playwright for E2E tests - EXISTS

**No blockers identified.**

---

## 7. Implementation Sequence

### Step 1: Database Migration (30 mins)
1. Create migration: `src/drizzle/migrations/000X_create_payout_requests.sql`
2. Update Drizzle schema: `src/drizzle/schema.ts`
3. Apply migration: `npm run db:push`
4. Verify table created: `psql` or Supabase dashboard

---

### Step 2: API Routes (2-3 hours)
1. Create `GET /api/creator/earnings` - Aggregate earnings calculation
2. Create `GET /api/creator/sales` - Paginated sales history
3. Create `POST /api/creator/payout/request` - Submit payout + email notifications
4. Add rate limiting to all 3 routes
5. Test with Postman/curl

---

### Step 3: Frontend Components (2-3 hours)
1. Create `EarningsOverview.tsx` - Earnings summary card
2. Create `SalesHistory.tsx` - Paginated table
3. Create `PayoutRequestModal.tsx` - Payout form
4. Add to dashboard: `src/app/dashboard/page.tsx`
5. Test in browser (manual QA)

---

### Step 4: E2E Tests (1-2 hours)
1. Create `tests/e2e/creator-dashboard.spec.ts`
2. Write 6 test scenarios (see section 4)
3. Run tests: `npm run test:e2e`
4. Fix failures until 6/6 pass

---

### Step 5: Gate 12 Documentation (30 mins)
1. Create `docs/03-implementation/gate-12/ENTRY-010-gate-12.md`
2. Document all changes, files modified, test results
3. Include rollback procedure
4. Submit for PM review (Gate 8)

---

## 8. Rollback Procedure

### Database Rollback
```sql
-- Revert migration
DROP TABLE IF EXISTS payout_requests;
```

### Code Rollback
```bash
git revert <commit-hash>
git push origin main
```

### Manual Cleanup (if partial deployment)
1. Delete API route files: `src/app/api/creator/*`
2. Delete component files: `src/components/Earnings*.tsx`, `src/components/SalesHistory.tsx`, `src/components/PayoutRequestModal.tsx`
3. Revert dashboard changes: `git checkout main -- src/app/dashboard/page.tsx`

---

## 9. Post-Implementation Tasks (Out of Scope for ENTRY-010)

### Future Enhancements
1. **ENTRY-020**: Automated payouts for trusted creators (no manual review)
2. **ENTRY-021**: Multi-currency support (EUR, GBP, INR)
3. **ENTRY-022**: Payout history page (show completed payouts, not just pending)
4. **ENTRY-023**: Earnings analytics (charts, trends, projections)
5. **ENTRY-024**: Tax reporting (1099 forms for US creators)

---

## 10. Approval Section

### PM Sign-Off
- [x] Research audit complete (Gate 2): `audit-gate-0-ENTRY-010.log`
- [x] Implementation plan complete (Gate 3): This document
- [ ] CEO approval received

### CEO Approval
**Instructions**: Review this plan and the research audit. If approved, add your signature below.

```
✅ APPROVED by CEO: Suraj Satyarthi
Date: 2026-02-13
Signature: APPROVED
```

**Approval Criteria**:
- [x] Technical architecture is sound
- [x] Alternatives considered for major decisions
- [x] Security & validation adequate for MVP
- [x] E2E testing strategy comprehensive (6 scenarios)
- [x] Implementation sequence logical
- [x] Estimated time realistic (6-8 hours)

---

## 11. Success Metrics (Post-Launch)

### Technical Metrics
- Build: 0 errors
- Lint: 0 errors
- E2E tests: 6/6 pass
- API response time: <500ms (earnings, sales APIs)
- Database query time: <100ms (with indexes)

### Business Metrics (Month 1 post-beta)
- Payout requests: 10+ (creators are monetizing)
- Average payout: $20-$50 (2-5 sales per creator)
- Payout approval time: <48 hours (manual review SLA)
- Creator satisfaction: Survey NPS >8/10

---

**Plan Status**: ✅ COMPLETE - Ready for CEO Approval
**Next Step**: CEO reviews and approves, then PM unblocks coder with artifact confirmation
