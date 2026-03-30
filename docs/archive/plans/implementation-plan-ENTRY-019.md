# Implementation Plan - ENTRY-019: Admin Payout Approval Dashboard

**Date**: 2026-02-13
**PM**: Claude Code
**Task**: Admin dashboard for approving/rejecting creator payout requests
**Estimated**: 2-3 hours

---

## 1. OVERVIEW

Build admin UI to review and approve/reject creator payout requests submitted via ENTRY-010 dashboard.

**Dependencies**:
- ✅ ENTRY-010 complete (payout_requests table, request API)
- ✅ Database: payout_requests table exists
- ✅ Admin role: users table has role field

---

## 2. COMPONENTS TO BUILD

### Component 1: AdminPayoutQueue.tsx

**Location**: `src/components/admin/AdminPayoutQueue.tsx`

**Purpose**: Table view of all payout requests with inline actions

**Interface**:
```typescript
interface PayoutRequest {
  id: string;
  userId: string;
  creator: {
    name: string;
    email: string;
    username: string;
  };
  amount: number; // cents
  currency: string;
  paymentMethod: 'razorpay' | 'paypal';
  accountDetails: {
    // Razorpay: bank account, IFSC
    // PayPal: email
  };
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  requestedAt: Date;
  processedAt?: Date;
  adminNotes?: string;
}
```

**Features**:
- Table columns: Creator, Amount, Method, Requested Date, Status, Actions
- Filter dropdown: All | Pending | Approved | Rejected
- Inline actions: Approve button, Reject button
- Click row → open PayoutDetailsDrawer

**Styling**: shadcn/ui Table component, tailwind

---

### Component 2: PayoutApprovalModal.tsx

**Location**: `src/components/admin/PayoutApprovalModal.tsx`

**Purpose**: Confirmation dialog for approve/reject actions

**Props**:
```typescript
interface PayoutApprovalModalProps {
  payout: PayoutRequest;
  action: 'approve' | 'reject';
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (notes?: string) => Promise<void>;
}
```

**Features**:
- Show payout summary (creator, amount, account details)
- For reject: required text area for rejection reason
- For approve: optional notes field
- Confirm/Cancel buttons
- Loading state during API call

---

### Component 3: PayoutDetailsDrawer.tsx (Optional - Nice to Have)

**Location**: `src/components/admin/PayoutDetailsDrawer.tsx`

**Purpose**: Side drawer with full payout request details

**Features**:
- Creator profile link
- Full account details
- Request history (if re-submitted)
- Approve/Reject buttons in drawer footer

**Note**: Optional for MVP, can defer to post-beta

---

## 3. API ROUTES TO BUILD

### Route 1: GET /api/admin/payout/list

**Location**: `src/app/api/admin/payout/list/route.ts`

**Purpose**: Fetch all payout requests (admin only)

**Query Params**:
- `status` (optional): 'pending' | 'approved' | 'rejected' | 'all' (default: 'all')

**Response**:
```typescript
{
  payouts: PayoutRequest[],
  stats: {
    pendingCount: number,
    pendingAmount: number, // total pending in cents
  }
}
```

**Logic**:
```typescript
export async function GET(request: Request) {
  const session = await auth();
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status') || 'all';

  const payouts = await db
    .select()
    .from(payoutRequests)
    .leftJoin(users, eq(payoutRequests.userId, users.id))
    .where(status === 'all' ? undefined : eq(payoutRequests.status, status))
    .orderBy(desc(payoutRequests.requestedAt));

  const stats = await db
    .select({
      count: count(),
      total: sum(payoutRequests.amount),
    })
    .from(payoutRequests)
    .where(eq(payoutRequests.status, 'pending'));

  return NextResponse.json({ payouts, stats });
}
```

---

### Route 2: PATCH /api/admin/payout/[id]/approve

**Location**: `src/app/api/admin/payout/[id]/approve/route.ts`

**Purpose**: Approve payout request

**Body**:
```typescript
{
  notes?: string; // optional admin notes
}
```

**Logic**:
```typescript
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const { notes } = await request.json();
  const payoutId = params.id;

  // Update payout status
  await db
    .update(payoutRequests)
    .set({
      status: 'approved',
      processedAt: new Date(),
      adminNotes: notes,
    })
    .where(eq(payoutRequests.id, payoutId));

  // TODO: Trigger actual payout processing (Razorpay/PayPal API)
  // TODO: Send email to creator (ENTRY-020)

  return NextResponse.json({ success: true });
}
```

**Notes**:
- Actual payment processing deferred (manual transfer for MVP)
- Email notifications = separate ENTRY-020

---

### Route 3: PATCH /api/admin/payout/[id]/reject

**Location**: `src/app/api/admin/payout/[id]/reject/route.ts`

**Purpose**: Reject payout request with reason

**Body**:
```typescript
{
  reason: string; // required rejection reason
}
```

**Logic**: Similar to approve, but status='rejected', reason stored in adminNotes

---

## 4. DATABASE CHANGES

**No schema changes needed** - `payout_requests` table already exists (ENTRY-010)

**Verification**:
```sql
-- Ensure table has required fields
SELECT column_name FROM information_schema.columns
WHERE table_name = 'payout_requests';

-- Required: id, userId, amount, status, paymentMethod, accountDetails,
--           requestedAt, processedAt, adminNotes
```

---

## 5. UI INTEGRATION

**Page**: `/src/app/dashboard/page.tsx` (admin view)

**Changes**:
```typescript
// Add conditional rendering for admin users
{session?.user?.role === 'admin' && (
  <div className="mt-8">
    <h2 className="text-2xl font-bold mb-4">Payout Requests</h2>
    <AdminPayoutQueue />
  </div>
)}
```

**Alternatively**: Create `/src/app/admin/payouts/page.tsx` (dedicated page)

---

## 6. E2E TESTS

**File**: `tests/e2e/admin-payout-approval.spec.ts`

**Scenarios**:
1. Admin can view pending payout requests
2. Admin can approve payout (status updates, processedAt set)
3. Admin can reject payout with reason (adminNotes saved)
4. Non-admin cannot access payout approval endpoints (403 Forbidden)
5. Payout disappears from pending queue after approval
6. Stats update after approval (pendingCount decrements)

---

## 7. ALTERNATIVES CONSIDERED

### Alternative 1: Embed in existing /dashboard page vs dedicated /admin/payouts page
- **Option A**: Embed in /dashboard (simpler, 1 page)
- **Option B**: Dedicated /admin/payouts page (cleaner separation)
- **Chosen**: A (MVP), refactor to B if admin features grow

### Alternative 2: Real-time updates vs manual refresh
- **Option A**: Real-time via WebSocket (complex)
- **Option B**: Manual refresh button (simple)
- **Chosen**: B (MVP), add real-time later if needed

### Alternative 3: Email notifications now vs later
- **Option A**: Build emails in ENTRY-019 (5 hours total)
- **Option B**: Separate ENTRY-020 for emails (2 hours later)
- **Chosen**: B (decouple, email not critical for MVP testing)

---

## 8. SECURITY CONSIDERATIONS

1. **Role-based access**: Check `session.user.role === 'admin'` on all endpoints
2. **Audit logging**: Log all approve/reject actions (future enhancement)
3. **Rate limiting**: Apply to approve/reject endpoints (prevent abuse)
4. **Input validation**: Validate payout ID exists, status is 'pending' before approval

---

## 9. ROLLBACK PLAN

If bugs found in production:
1. **Disable admin approval UI**: Comment out AdminPayoutQueue rendering
2. **Manual DB updates**: Admin approves via direct SQL until fix deployed
3. **Status check**: Verify no partial state (approved but not processedAt)

---

## 10. ACCEPTANCE CRITERIA

- [ ] Admin can view list of all payout requests
- [ ] Admin can filter by status (pending/approved/rejected)
- [ ] Admin can approve payout (status updates, processedAt set)
- [ ] Admin can reject payout with reason (adminNotes saved)
- [ ] Non-admin users cannot access admin payout endpoints (403)
- [ ] Payout stats display correctly (pending count, total amount)
- [ ] E2E tests pass (6 scenarios)
- [ ] Build passes (`npm run build`)
- [ ] Lint passes (`npm run lint`)

---

## 11. CEO APPROVAL

- [ ] **CEO APPROVAL REQUIRED**

---

**Status**: AWAITING CEO APPROVAL
**PM Signature**: Claude Code (PM)
**Date**: 2026-02-13

**APPROVAL SECTION**:

```
✅ APPROVED by CEO on 2026-02-13

CEO Signature: __________________
Approval Date: 2026-02-13
Comments: Approved - proceed with implementation
```

---

**Next Steps**:
1. CEO reviews and approves plan
2. Coder runs: `npm run verify:pm-gates -- ENTRY-019`
3. If exit 0 → Start implementation (2-3 hours)
4. Complete acceptance criteria checklist
5. Create Gate 12 docs
6. Submit for PM review

**Estimated Time**: 2-3 hours
**Priority**: POST-BETA (after ENTRY-011 complete)
