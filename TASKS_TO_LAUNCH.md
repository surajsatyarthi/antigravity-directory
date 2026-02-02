# 🎯 ANTIGRAVITY DIRECTORY - TASKS TO LAUNCH
**Status:** Build Fixed ✅ | Ready for Final 4 Critical Tasks

---

## ✅ JUST FIXED
- [x] Installed @sentry/nextjs
- [x] Installed resend
- [x] Build passing locally
- [x] Pushed to main (commit 20798e2)
- [x] Ralph Protocol security scan: 4/4 PASSED

Vercel is now rebuilding... **check your deployment in ~2 minutes**

---

## 🔴 4 CRITICAL TASKS LEFT TO LAUNCH

### **#1 Wire Up Payment Confirmation Emails** ⏱️ 30 mins 🚀 **START HERE**
**Why:** Users need instant confirmation they paid successfully

**File:** `src/app/api/checkout/razorpay/verify/route.ts`

**What to add:**
```typescript
// After payment verification succeeds:
if (result.verified) {
  // Import and call email function
  await sendPaymentConfirmation({
    userEmail: user.email,
    userName: user.name,
    resourceTitle: submission.title,
    amount: payment.amount,
    currency: 'INR',
    transactionId: paymentId,
    tier: submission.paymentType as 'STANDARD' | 'FEATURED'
  });
}
```

**Also do for:** PayPal webhook when payment confirmed

---

### **#2 Build Admin Moderation Queue** ⏱️ 4 hours 🔨 **SECOND PRIORITY**
**Why:** Need to review submissions before they go live (prevents spam/malicious content)

**File:** Create `src/app/dashboard/admin/moderation/page.tsx`

**What it needs:**
```
┌─────────────────────────────────────────┐
│ Admin Moderation Queue                  │
├─────────────────────────────────────────┤
│ Pending: 5 submissions                  │
├─────────────────────────────────────────┤
│ [1] "MCP Server X"                      │
│     By: user@example.com                │
│     Tier: Featured ($149)               │
│     Status: PENDING                     │
│     [✓ Approve] [✗ Reject]             │
├─────────────────────────────────────────┤
│ [2] "AI Tool Y"                         │
│     ... (repeat)                        │
```

**Required actions:**
- Display all PENDING submissions
- Approve button → creates resource + sends "listing live" email
- Reject button → shows modal for reason + sends rejection email
- Show payment details per submission

**Database query:**
```typescript
const pendingSubmissions = await db.query.submissions.findMany({
  where: eq(submissions.status, 'PENDING'),
  orderBy: (submissions, { desc }) => [desc(submissions.createdAt)],
  with: { user: true, payment: true }
});
```

---

### **#3 Add Rate Limiting to Submit** ⏱️ 1 hour
**Why:** Prevent spam/brute force on submission form

**File:** `src/app/submit/actions.ts` (your server action)

**What to add:**
```typescript
import { checkRateLimit } from '@/lib/ratelimit';

export async function submitResourceAction(formData: FormData) {
  'use server';

  // Add this check at the top
  const rateLimitResult = await checkRateLimit(
    request,
    3,        // max 3 requests
    3600000   // per hour (in ms)
  );

  if (!rateLimitResult.success) {
    return {
      error: 'Too many submissions. Try again later.',
      retryAfter: rateLimitResult.reset
    };
  }

  // ... rest of your code
}
```

---

### **#4 Setup Sentry Alerts** ⏱️ 1 hour
**Why:** Get notified when payments fail or errors spike

**Steps:**
1. Go to sentry.io → Your project
2. Create alerts for:
   - **Payment verification errors** → email immediately
   - **Error rate >10/min** → warning
   - **Database connection issues** → critical
3. Test the alert by throwing test error in `/sentry-debug` page

---

## 📊 EFFORT BREAKDOWN

| Task | Time | Notes |
|------|------|-------|
| Email confirmations | 30 mins | Copy/paste + wire up |
| Admin moderation | 4 hours | Most complex piece |
| Rate limiting | 1 hour | Already have lib, just wire |
| Sentry alerts | 1 hour | GUI configuration |
| **TOTAL** | **~6.5 hours** | Can launch after this |

---

## 🚀 LAUNCH AFTER THESE 4 TASKS ARE DONE

Once you complete the 4 critical tasks above, you can:
- ✅ Accept user submissions
- ✅ Charge for featured listings ($49/$149)
- ✅ Send payment confirmations
- ✅ Review submissions before publishing
- ✅ Stop spam attacks
- ✅ See errors in production
- ✅ **LAUNCH** 🎉

---

## 📋 OPTIONAL (But Recommended for Day 2-3)

After launching, do these to polish:
- E2E tests for payment flow (2 hours)
- Write comprehensive README (2 hours)
- Console.log cleanup (2 hours)
- Database backup verification (1 hour)

---

## ⏱️ RECOMMENDED TIMELINE

**TODAY:**
- [ ] Fix email confirmations (30 mins)
- [ ] Start admin moderation (work on it)

**TOMORROW:**
- [ ] Finish admin moderation
- [ ] Wire rate limiting
- [ ] Setup Sentry alerts
- [ ] Test full flow

**DAY 3:**
- [ ] Final QA
- [ ] LAUNCH 🚀

---

## 🎬 START NOW

**Pick one task and start:**

### Quick Win (Start This): Email Confirmations
```bash
# 1. Open file: src/app/api/checkout/razorpay/verify/route.ts
# 2. Find where payment verification succeeds
# 3. Add: await sendPaymentConfirmation({...})
# 4. Import: import { sendPaymentConfirmation } from '@/lib/email/templates'
# 5. Test: Submit form, complete payment, check your email
```

### Biggest Task: Admin Moderation
```bash
# 1. Create new file: src/app/dashboard/admin/moderation/page.tsx
# 2. Fetch pending submissions from database
# 3. Display in a table/list
# 4. Add approve/reject buttons
# 5. Wire up email triggers
# 6. Test in dashboard
```

---

**Questions?**
- Email confirmations logic is in: `src/lib/email/templates.ts`
- Rate limit lib is in: `src/lib/ratelimit.ts`
- Database schema in: `src/drizzle/schema.ts`

**You've got this! 🚀**
