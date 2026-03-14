# CURRENT TASK — TASK-069: Full marketplace dead code sweep
**Assigned by**: Claude Code (PM)
**Date**: 2026-03-14
**Branch**: fix/post-audit-cleanup (current branch)

---

## WHY THIS TASK EXISTS

This site is a free directory with B2B ads. No marketplace. No payments. No creator earnings. Retrograde analysis found 5 dead files and 5 files with dead marketplace code still in the codebase — payout emails, payment badges, Razorpay/PayPal config, and components for users who no longer exist. These are all being deleted or gutted now.

---

## RETROGRADE CHECK

*Who is this code for, and does that person still exist on a free directory with B2B ads?*
- `AdminPayoutQueue`, `PayoutApprovalModal` — for admin reviewing creator payouts. No creators. Dead.
- `SalesHistory` — for creator dashboard showing sales. No creators. Dead.
- `ThreeValueCards` — "Earn 80%" / "Join Community" / "View Profiles" marketplace marketing. No marketplace. Dead.
- `src/lib/email.ts` — payout approval/rejection emails to creators. No payouts. Dead.
- `sendPaymentConfirmation` — email sent after a paid resource submission. No paid submissions. Dead.
- `paymentStatus === 'PAID'` blocks in actions.ts — fires when a paid submission is approved. `paymentStatus` is always `NONE`. Never fires. Dead.
- Razorpay/PayPal in env.ts — required validation for payment keys. No payments. Crashes build if keys absent. Dead.
- Payment sections in .env.example — documentation for payment keys that don't exist. Dead.

*Adjacent dead code to follow downstream?*
DB table drops (payments, purchases, creatorEarnings, payoutRequests, etc.) are **TASK-060** — requires founder approval before Drizzle generates DROP TABLE migrations. Do NOT touch schema.ts in this task.

---

## FEATURE STATE CHECK

| Field/Feature | Status | Source |
|---|---|---|
| Payments / marketplace | DEAD — removed from product | BUSINESS_CONTEXT.md |
| `paymentStatus` on submissions | Always `NONE` — never `PAID` | `src/app/admin/submissions/actions.ts` line 52 |
| Razorpay vars in env.ts | Required `.min(1)` — crashes build if absent | `src/lib/env.ts` lines 13-16 |
| PayPal vars in env.ts | Required `.min(1)` — crashes build if absent | `src/lib/env.ts` lines 18-19 |
| `sendListingLive` in email/templates.ts | KEEP — valid for future free submission flow | `src/lib/email/templates.ts` lines 62-105 |
| Scraper test files (`__tests__/scripts/`) | KEEP — scraper tests, not marketplace code | `src/__tests__/scripts/` |

---

## PM VERIFIED CONTENT

### Files to DELETE — all confirmed zero external imports (PM grepped 2026-03-14)

**`src/components/admin/AdminPayoutQueue.tsx`** — payout queue UI. Zero imports outside own file. DELETE.

**`src/components/admin/PayoutApprovalModal.tsx`** — payout approval modal. Zero imports outside own file. DELETE.

**`src/components/dashboard/SalesHistory.tsx`** — creator sales history. Zero imports outside own file. DELETE.

**`src/components/ThreeValueCards.tsx`** — marketplace marketing cards ("Earn 80%", "Join Community", "View Profiles"). Zero imports outside own file. DELETE.

**`src/lib/email.ts`** — payout approved/rejected email functions. Zero imports anywhere (PM confirmed via grep). DELETE entire file.

---

### File edits — PM verified exact lines

**`src/lib/env.ts` lines 13-19** (PM read 2026-03-14):
```typescript
  // Payments - Razorpay
  RAZORPAY_KEY_ID: z.string().min(1, 'RAZORPAY_KEY_ID is required'),
  RAZORPAY_KEY_SECRET: z.string().min(1, 'RAZORPAY_KEY_SECRET is required'),

  // Payments - PayPal
  PAYPAL_CLIENT_ID: z.string().min(1, 'PAYPAL_CLIENT_ID is required'),
  PAYPAL_CLIENT_SECRET: z.string().min(1, 'PAYPAL_CLIENT_SECRET is required'),
```
DELETE these 7 lines. Nothing in the codebase uses these env vars.

---

**`src/lib/email/templates.ts` lines 6-60** (PM read 2026-03-14):
```typescript
export async function sendPaymentConfirmation({...}) { ... }
```
DELETE this entire function (lines 6 through 60 inclusive). `sendListingLive` at lines 62-105 **stays untouched**.

---

**`src/app/admin/submissions/actions.ts`** (PM read 2026-03-14):

Line 7 — DELETE (becomes unused after PAID block removal):
```typescript
import { sendListingLive } from '@/lib/email/templates';
```

Line 9 — DELETE (becomes unused after PAID block removal):
```typescript
import { pingIndexNow } from '@/lib/indexnow';
```

Lines 51-91 — DELETE entire PAID block in `approveSubmission` (the `if (submission.paymentStatus === 'PAID')` block and everything inside it).

Lines 127-139 — DELETE entire PAID block in `rejectSubmission` (the `if (submission.paymentStatus === 'PAID')` block and everything inside it).

After deletions: check if `and` (imported from drizzle-orm line 5) and `resources` table (imported line 4) are still used elsewhere in the file. If no remaining references, remove them from the import. Only remove what is genuinely unused after the deletions.

---

**`src/components/AdminSubmissionQueue.tsx` lines 76-87** (PM read 2026-03-14):
```tsx
                <span className={`px-3 py-1 rounded-full text-xs font-mono uppercase ${
                  submission.paymentStatus === 'PAID'
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : 'bg-gray-500/20 text-slate-400'
                }`}>
                  {submission.paymentStatus === 'PAID' ? '💰 Paid' : 'Free'}
                </span>
                {submission.paymentType === 'FEATURED' && (
                  <span className="px-3 py-1 rounded-full text-xs font-mono uppercase bg-yellow-500/20 text-yellow-400">
                    ⭐ Featured
                  </span>
                )}
```
DELETE these 12 lines. Always showed "Free" — paymentStatus is never PAID. Keep all other submission card content untouched.

---

**`.env.example` lines 28-43** (PM read 2026-03-14):
```
# ============================================
# PAYMENTS - RAZORPAY (India)
# ============================================
# Get from Razorpay Dashboard: https://dashboard.razorpay.com/
NEXT_PUBLIC_RAZORPAY_KEY_ID="rzp_test_xxxxxxxxxxxxx"
RAZORPAY_KEY_SECRET="your-razorpay-secret-key"
RAZORPAY_WEBHOOK_SECRET="your-razorpay-webhook-secret"

# ============================================
# PAYMENTS - PAYPAL (International)
# ============================================
# Get from PayPal Developer: https://developer.paypal.com/
NEXT_PUBLIC_PAYPAL_CLIENT_ID="your-paypal-client-id"
PAYPAL_CLIENT_SECRET="your-paypal-secret-key"
PAYPAL_MODE="sandbox" # Use "live" for production
```
DELETE all 15 lines (lines 28-43 inclusive, including the blank line between sections). Everything before line 28 and after line 43 stays untouched.

---

## MANDATORY CROSS-CHECK

Before implementing, Antigravity must confirm:
1. `src/lib/env.ts` lines 13-19: Razorpay + PayPal required blocks — present ✓
2. `src/lib/email/templates.ts` line 6: `export async function sendPaymentConfirmation` — present ✓
3. `src/app/admin/submissions/actions.ts` line 7: `import { sendListingLive }` — present ✓
4. `src/app/admin/submissions/actions.ts` line 9: `import { pingIndexNow }` — present ✓
5. `src/app/admin/submissions/actions.ts` line 52: `if (submission.paymentStatus === 'PAID')` — present ✓
6. `src/components/AdminSubmissionQueue.tsx` line 77: `submission.paymentStatus === 'PAID'` in badge span — present ✓
7. `.env.example` line 29: `# PAYMENTS - RAZORPAY (India)` — present ✓
8. Grep `src/` for imports of `AdminPayoutQueue`, `PayoutApprovalModal`, `SalesHistory`, `ThreeValueCards`, `lib/email` — all must return zero external results before deleting

If any do not match — STOP and report to PM.

---

## DO NOT TOUCH

- `src/lib/email/templates.ts` lines 62-105 — `sendListingLive` function stays
- `src/lib/indexnow.ts` — stays (TASK-066 will wire it correctly)
- `src/__tests__/scripts/` — scraper tests, not marketplace code
- `src/components/AdminSubmissionQueue.tsx` — keep the whole file, only remove the 12 payment badge lines (76-87)
- `src/drizzle/schema.ts` — DB table drops are TASK-060, require founder approval
- `GITHUB_TOKEN` in `.env.example` — scraper PAT, stays

---

## MANDATORY REPORT FORMAT

Antigravity must provide ALL 9 evidence items:

1. **Screenshots** — save to:
   - `temp/task069_admin_submissions.png` — admin submissions page showing submission cards WITHOUT payment badges
   - `temp/task069_homepage.png` — homepage loading correctly (smoke test)

2. **Screen recording** — save to `temp/task069_recording.webm`

3. **Git commit hash** — paste inline

4. **Git diff** — paste exact changed lines inline (5 deleted files + 5 edited files)

5. **Build log** — run `npm run build 2>&1 | tee temp/task069_build.log` — must exit 0

6. **Lint log** — run `npm run lint 2>&1 | tee temp/task069_lint.log` — must exit 0

7. **HTTP status** — save to `temp/task069_http_status.txt`:
   ```
   / → 200
   /mcp-servers → 200
   ```

8. **Browser console** — no errors on homepage and admin page

9. **Dead code confirmed** — state: "5 files deleted, 5 files edited, build passes, no marketplace imports remain"

**Required files on disk in temp/:**
- `temp/task069_build.log`
- `temp/task069_lint.log`
- `temp/task069_http_status.txt`
- `temp/task069_admin_submissions.png`
- `temp/task069_homepage.png`
- `temp/task069_recording.webm`

Task is NOT done if any of these files are missing.

---

## AFTER THIS TASK — TASK-070 IS NEXT

Fix Groq logo: (1) replace McLaren co-branded URL in `src/config/sponsor.ts` line 27 with standalone wordmark `https://cdn.sanity.io/images/chol0sk5/production/2a8cc526896d13f521915aee21282d11cf522a3c-95x30.svg`, (2) change logo size in `CategorySponsorBanner.tsx` line 40 from `h-5 w-auto` to `h-12 w-12` to match Warp's 48×48px.

---

## PM SCREENSHOT READ — TASK-068 (verified 2026-03-14)

| File | What PM saw | Verdict |
|---|---|---|
| `task068_signin_page.png` | `/api/auth/providers` JSON from production (googleantigravity.directory). Only one key: `"google"` — `id: "google", name: "Google", type: "oidc"`. No GitHub key present. | ✅ PASS |
| `task068_homepage.png` | Homepage loading correctly on dark background. Hero visible: "THE #1 RESOURCE DIRECTORY FOR GOOGLE ANTIGRAVITY IDE". CodeRabbit sponsor badge top-right. Warp sponsored card visible. Resource list rendering. No errors. | ✅ PASS |

**HTTP status**: `/ → 200`, `/mcp-servers → 200` — ✅ PASS
**No 404 entries in http_status.txt** — ✅ PASS
**All 6 required files present in temp/** — ✅ PASS
**Git commit 7f22d1c confirmed in log** — ✅ PASS
**G13 GATE**: Screenshots from `googleantigravity.directory` (production) — ✅ PASS
