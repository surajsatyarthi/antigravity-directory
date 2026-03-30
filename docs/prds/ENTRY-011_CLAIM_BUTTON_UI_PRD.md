# PRD: Claim Button & UI Flow Polish (ENTRY-011)

**Status**: APPROVED
**Priority**: PHASE B - UI POLISH
**Estimated Time**: 2-3 hours
**Date**: 2026-02-13

---

## 🎯 OBJECTIVE

Polish and enhance the resource claiming UI/UX flow to make it intuitive, visually appealing, and conversion-optimized.

---

## 📋 CONTEXT

**What Already Exists (ENTRY-009):**
- ✅ Backend API: `/api/resources/[id]/claim`
- ✅ ClaimButton component (basic)
- ✅ GitHub OAuth integration
- ✅ E2E tests for claiming flow

**What This PRD Adds:**
- Enhanced UI/UX for claim button
- Improved modal/dialog flow
- Better success/error states
- Conversion-optimized messaging
- Mobile-responsive claim flow

---

## 🎨 UI/UX REQUIREMENTS

### 1. Enhanced ClaimButton Component

**Current State**: Basic button
**New Requirements**:

**Button States:**
```typescript
// For unclaimed resources
<ClaimButton
  variant="primary"
  size="lg"
  icon={<ShieldCheckIcon />}
>
  Claim This Resource
</ClaimButton>

// For claimed resources (by others)
<Badge variant="success">
  ✓ Claimed by @username
</Badge>

// For claimed resources (by you)
<Badge variant="info">
  ✓ Claimed by You
</Badge>
```

**Visual Design:**
- Primary CTA styling (stands out)
- Icon: Shield with checkmark
- Hover state: Scale + shadow
- Loading state: Spinner + "Claiming..."
- Disabled state: Grayed out with tooltip

**Location on Resource Page:**
- Desktop: Top-right of resource header
- Mobile: Fixed bottom bar (always visible)

---

### 2. Claim Modal/Dialog

**Trigger**: Click "Claim This Resource" button

**Modal Content:**
```
┌─────────────────────────────────────────┐
│  Claim "[Resource Name]"                │
│                                         │
│  [Resource Preview Card]                │
│  - Icon                                 │
│  - Name                                 │
│  - Category                             │
│  - GitHub URL                           │
│                                         │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                         │
│  Verify Ownership via GitHub            │
│                                         │
│  [GitHub OAuth Button]                  │
│  Continue with GitHub                   │
│                                         │
│  By claiming, you confirm:              │
│  ✓ You are the original creator         │
│  ✓ You have rights to monetize this    │
│  ✓ No third-party IP infringement       │
│                                         │
│  [Cancel]              [Claim Resource] │
└─────────────────────────────────────────┘
```

**Acceptance Criteria:**
- [ ] Modal opens smoothly (fade in animation)
- [ ] Resource preview shows correct data
- [ ] GitHub OAuth button is prominent
- [ ] Terms checkbox required before claim
- [ ] Cancel button closes modal
- [ ] Keyboard navigation (ESC to close)
- [ ] Click outside to close

---

### 3. Success State

**After successful claim:**

**Option A: Toast Notification (Recommended)**
```
┌────────────────────────────────────┐
│ ✓ Resource Claimed Successfully!  │
│                                    │
│ You can now set a price and start  │
│ earning from this resource.        │
│                                    │
│ [Set Price Now] [Go to Dashboard]  │
└────────────────────────────────────┘
```

**Option B: Full-Page Success**
```
/claim/success?resourceId=xxx

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  🎉 Congratulations!

  You've claimed "[Resource Name]"

  What's Next?
  1. Set your price (optional)
  2. Track earnings in dashboard
  3. Share with your audience

  [Set Price] [View Dashboard] [Back to Resource]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Recommended**: Option A (toast) for better UX

**Badge Update:**
- Resource page badge updates immediately
- Shows "✓ Claimed by You" (not generic "Claimed by @username")

---

### 4. Error States

**Error Scenarios:**

**1. Not Authenticated**
```
┌────────────────────────────────────┐
│ ⚠️ Sign In Required                │
│                                    │
│ You must be signed in to claim     │
│ resources.                         │
│                                    │
│ [Cancel]         [Sign In]         │
└────────────────────────────────────┘
```
**Action**: Redirect to `/auth/signin?callbackUrl=/t/[resourceSlug]`

**2. Already Claimed (by someone else)**
```
┌────────────────────────────────────┐
│ ⚠️ Already Claimed                 │
│                                    │
│ This resource was claimed by       │
│ @username on Feb 10, 2026.         │
│                                    │
│ [OK]                               │
└────────────────────────────────────┘
```

**3. GitHub Verification Failed**
```
┌────────────────────────────────────┐
│ ❌ Verification Failed              │
│                                    │
│ We couldn't verify ownership via   │
│ GitHub. Please ensure:             │
│                                    │
│ • You're the repo owner            │
│ • Repo URL matches listing         │
│ • GitHub OAuth permissions granted │
│                                    │
│ [Try Again]        [Contact Support]│
└────────────────────────────────────┘
```

**4. Network Error**
```
┌────────────────────────────────────┐
│ ⚠️ Connection Error                │
│                                    │
│ Could not reach server. Please     │
│ check your connection and retry.   │
│                                    │
│ [Cancel]         [Retry]           │
└────────────────────────────────────┘
```

---

## 🔧 IMPLEMENTATION REQUIREMENTS

### Step 1: Update ClaimButton Component

**File**: `src/components/ClaimButton.tsx`

**Enhancements:**
- Add loading state with spinner
- Add disabled state with tooltip
- Add icon (ShieldCheckIcon from Heroicons)
- Add hover/focus animations
- Make responsive (full-width on mobile)

**Props:**
```typescript
interface ClaimButtonProps {
  resourceId: string;
  resourceName: string;
  resourceUrl: string;
  isClaimed: boolean;
  claimedBy?: string;
  currentUserId?: string;
}
```

---

### Step 2: Create ClaimModal Component

**File**: `src/components/ClaimModal.tsx`

**Features:**
- Resource preview card
- GitHub OAuth button
- Terms checkbox
- Cancel/Confirm actions
- Accessibility (focus trap, ARIA labels)

**State Management:**
```typescript
const [isOpen, setIsOpen] = useState(false);
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState<string | null>(null);
const [agreedToTerms, setAgreedToTerms] = useState(false);
```

---

### Step 3: Add Toast Notifications

**Library**: `sonner` (already used in project?)

**File**: `src/components/ui/toast.tsx`

**Toast Types:**
- Success: Green with checkmark
- Error: Red with X icon
- Info: Blue with info icon

---

### Step 4: Update Resource Page

**File**: `src/app/t/[slug]/page.tsx`

**Changes:**
- Integrate enhanced ClaimButton
- Add mobile-friendly claim CTA
- Update badge styling
- Add claim status indicators

---

### Step 5: E2E Tests

**File**: `tests/e2e/claim-ui-flow.spec.ts`

**Test Scenarios:**
1. ✅ Claim button visible on unclaimed resource
2. ✅ Claim modal opens on button click
3. ✅ Resource preview displays correctly
4. ✅ GitHub OAuth button functional
5. ✅ Success toast appears after claim
6. ✅ Badge updates to "Claimed by You"
7. ✅ Error modal shows for already-claimed resources
8. ✅ Mobile responsive (button + modal)

---

## ✅ SUCCESS CRITERIA

1. **Visual Polish**: Claim button stands out, professional design
2. **User Flow**: Intuitive 3-step flow (Button → Modal → Success)
3. **Error Handling**: Clear error messages for all scenarios
4. **Mobile Responsive**: Works on 375px to 1920px
5. **Accessibility**: Keyboard navigation, ARIA labels, focus management
6. **Tests**: 8/8 E2E tests pass
7. **Build**: `npm run build` succeeds

---

## 📚 REFERENCES

- ENTRY-009 implementation: `src/app/api/resources/[id]/claim/route.ts`
- ClaimButton: `src/components/ClaimButton.tsx` (existing)
- Business model: [MARKETPLACE_MODEL_SPEC.md](../01-business/MARKETPLACE_MODEL_SPEC.md)
- Legal requirements: [UNCLAIMED_RESOURCES_LEGAL_ANALYSIS.md](../01-business/UNCLAIMED_RESOURCES_LEGAL_ANALYSIS.md)

---

## ⚠️ CRITICAL NOTES

1. **No changes to backend API** - ENTRY-009 API works, keep it
2. **Frontend polish only** - Focus on UI/UX improvements
3. **Terms of Service link** - Add link to TOS in modal (will be created in ENTRY-018)
4. **Conversion optimization** - Make claiming feel rewarding (celebrate success)
5. **Mobile-first** - Most creators will claim on mobile

---

## 🎨 DESIGN INSPIRATION

**Reference Styles:**
- GitHub's "Fork" button flow
- Gumroad's product claim flow
- Shopify's store setup wizard

**Key Principle**: Make claiming feel like a **reward**, not a transaction.

---

**Approved By**: PM
**Assigned To**: Coder (Antigravity) - AFTER ENTRY-010
**Next Step**: Assign to coder after ENTRY-010 complete

