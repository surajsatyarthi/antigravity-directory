# PHASE 2.1: HOMEPAGE SIMPLIFICATION & UX CLEANUP
## Executive Prompt for Antigravity (AI Coder)

**Status**: 🔴 BLOCKING - Must complete before Phase 2.1 ships
**Priority**: CRITICAL
**Timeline**: Complete today (Feb 5)
**Reviewer**: Claude (PM) - Will validate using Gate Report Template

---

## THE PROBLEM

Your homepage currently **repeats the same message 3 times**, which doesn't convince users—it confuses them. Repeating a CTA (Call-to-Action) doesn't increase conversions; it wastes valuable real estate and dilutes your message.

### Current Bad Flow:
```
┌─────────────────────────────────┐
│  HERO SECTION (Top of page)     │
│  "Unleash Your Creativity"      │
│  "Browse All Tools"             │ ← CTA #1
│  "List Your Resource (Earn 80%)"│ ← CTA #2
└─────────────────────────────────┘
         ↓ (User scrolls)
┌─────────────────────────────────┐
│  STATS BAR (Nice but optional)  │
│  "2,200+ tools, 500+ creators"  │
└─────────────────────────────────┘
         ↓ (User scrolls)
┌─────────────────────────────────┐
│  CREATOR PROOF (Nice but opt)   │
│  "See what creators are earning" │
└─────────────────────────────────┘
         ↓ (User scrolls)
┌─────────────────────────────────┐
│  HOW IT WORKS (Nice but opt)    │
│  "3 simple steps"               │
└─────────────────────────────────┘
         ↓ (User scrolls)
┌─────────────────────────────────┐
│  CATEGORY SHOWCASE (Redundant)  │
│  "Featured categories"          │
└─────────────────────────────────┘
         ↓ (User scrolls A LOT)
┌─────────────────────────────────┐
│  FULL DIRECTORY (The real value)│
│  "Searchable marketplace here"  │
└─────────────────────────────────┘
         ↓ (User scrolls more)
┌─────────────────────────────────┐
│  CTA SECTION (DUPLICATE!)       │
│  "Claim Your Tool"              │ ← CTA #3 (repetition!)
│  "Browse Tools"                 │ ← CTA #2 AGAIN
│  "Post a Job"                   │ ← WRONG - Phase 2+ feature!
└─────────────────────────────────┘
```

**User Experience**: Lands → sees CTA → scrolls past 4 nice-to-have sections → finally finds marketplace → sees same CTA again = **Confusion, not conviction**

---

## THE SOLUTION: Lean Homepage

### New Better Flow:
```
┌─────────────────────────────────┐
│  HERO SECTION                   │
│  "Unleash Your Creativity"      │
│  ONE clear CTA path:            │
│  "Browse All Tools"             │
│  "List Your Resource (Earn 80%)"│
└─────────────────────────────────┘
         ↓ (Minimal scroll)
┌─────────────────────────────────┐
│  FULL DIRECTORY (IMMEDIATE)     │
│  "Searchable marketplace"       │
│  (User can NOW take action)     │
└─────────────────────────────────┘
         ↓ (Optional - for interested users)
┌─────────────────────────────────┐
│  STATS (Social proof below)     │
│  "2,200+ tools, 500+ creators"  │
└─────────────────────────────────┘
         ↓ (Optional)
┌─────────────────────────────────┐
│  CREATOR PROOF (Motivation)     │
│  "See what creators earn"       │
└─────────────────────────────────┘
         ↓ (Optional)
┌─────────────────────────────────┐
│  HOW IT WORKS (Educational)     │
│  "3 simple steps"               │
└─────────────────────────────────┘
```

**Result**: User lands → sees ONE clear CTA → immediately reaches the marketplace → can search/browse → if interested, scrolls for social proof. **Clear, not repetitive.**

---

## WHAT TO CHANGE

### ✅ KEEP (Don't touch)
- Hero section (perfect as-is)
- Stats bar (move it down, keep it)
- Creator proof cards (move it down, keep it)
- How it works (move it down, keep it)
- Full directory component (move it UP)

### ❌ DELETE (Remove entirely)
- CTASection.tsx component (ENTIRE FILE)
- CategoryShowcase component (ENTIRE FILE - sidebar handles categories)
- All job board references (see below)

### 🔄 REORDER (Move sections in page.tsx)
Currently: Hero → Stats → CreatorProof → HowItWorks → CategoryShowcase → Directory → CTA
**New order**: Hero → Directory → Stats → CreatorProof → HowItWorks

---

## DETAILED TASKS

### TASK 1: Delete Repetitive CTA Component ⏱️ 5 minutes

**File**: `src/components/CTASection.tsx`
**Action**: DELETE the entire file

**Why**: This component duplicates the hero CTAs. It adds nothing new and confuses users.

**Before** (lines 1-50 of page.tsx):
```typescript
import CTASection from '@/components/CTASection'; // REMOVE THIS IMPORT

export default function Home() {
  return (
    <>
      <Header variant="landing" />
      <HeroSection />
      <Stats />
      <CreatorProof />
      <HowItWorks />
      <CategoryShowcase />
      <Directory />
      <CTASection /> {/* ← DELETE THIS LINE */}
    </>
  );
}
```

**After** (lines 1-50 of page.tsx):
```typescript
// CTASection import removed

export default function Home() {
  return (
    <>
      <Header variant="landing" />
      <HeroSection />
      <Directory />
      <Stats />
      <CreatorProof />
      <HowItWorks />
    </>
  );
}
```

**Verification**:
```bash
# Confirm file deleted
ls src/components/CTASection.tsx
# Result: "No such file or directory" ✅

# Confirm no imports remain
grep -r "CTASection" src/
# Result: (empty - no matches) ✅
```

---

### TASK 2: Reorder Homepage Sections ⏱️ 10 minutes

**File**: `src/app/page.tsx`

**Current rendering order** (find this in page.tsx):
```typescript
{!isBrowsing && <HeroSection />}
{!isBrowsing && <Stats />}
{!isBrowsing && <CreatorProof />}
{!isBrowsing && <HowItWorks />}
{!isBrowsing && <CategoryShowcase />}
<Directory id="full-directory" />
{!isBrowsing && <CTA />}
```

**New rendering order**:
```typescript
{!isBrowsing && <HeroSection />}
<Directory id="full-directory" /> {/* ← MOVED HERE - IMMEDIATE */}
{!isBrowsing && (
  <>
    <Stats />
    <CreatorProof />
    <HowItWorks />
  </>
)}
```

**Why this matters**:
- User lands → sees hero (compelling hook)
- Immediately sees searchable marketplace (can take action NOW)
- Optional sections below for social proof/education

**Keep conditional logic**:
- The `{!isBrowsing && ...}` logic MUST stay
- When user clicks search or filter, these sections hide
- Directory stays visible always (it's the product)

**Verification**:
```bash
# Build should pass
npm run build
# Expected: ✅ Compiled successfully

# No TypeScript errors
pnpm tsc --noEmit
# Expected: (no output) ✅

# Open http://localhost:3000 in browser
# Expected: Hero → Directory visible within 1 viewport height
```

---

### TASK 3: Delete CategoryShowcase Component ⏱️ 5 minutes

**File**: `src/components/CategoryShowcase.tsx`
**Action**: DELETE the entire file

**Why**: Redundant. The sidebar already has category filters. Showing featured categories is duplicative and takes up space.

**In page.tsx**, remove:
```typescript
import CategoryShowcase from '@/components/CategoryShowcase'; // REMOVE

// ... in render:
{!isBrowsing && <CategoryShowcase />} {/* ← REMOVE THIS */}
```

**Verification**:
```bash
ls src/components/CategoryShowcase.tsx
# Result: "No such file or directory" ✅

grep -r "CategoryShowcase" src/
# Result: (empty) ✅
```

---

### TASK 4: Remove All Job Board References ⏱️ 10 minutes

**File 1**: `src/components/Header.tsx`

**Line ~28**: Remove from navItems array:
```typescript
// BEFORE (REMOVE THIS)
{ label: 'Jobs for Developers', href: '/jobs' },

// AFTER (DELETE THE LINE)
// Line disappears entirely
```

**Lines ~70-73**: Remove job board button:
```typescript
// BEFORE (REMOVE THIS ENTIRE BLOCK)
<Link href="/jobs" className="px-4 py-2 text-white border border-white/20 hover:bg-white/5">
  Post a Job
</Link>

// AFTER (DELETE THE BLOCK)
// Nothing here
```

**File 2**: `src/components/Footer.tsx`

**Lines ~128-132**: Remove jobs link:
```typescript
// BEFORE (REMOVE THIS)
<Link href="/jobs" className="text-gray-400 hover:text-white">
  Jobs
</Link>

// AFTER (DELETE)
// Nothing here
```

**File 3**: Already deleting CTASection in Task 1 (includes "Post a Job" link)

**Verification**:
```bash
# Search for any remaining /jobs references
grep -rn "href=\"/jobs\"" src/components/
# Result: (empty) ✅

grep -rn "Post a Job" src/components/
# Result: (empty) ✅

grep -rn "Jobs for Developers" src/components/
# Result: (empty) ✅
```

---

### TASK 5: Verify Header/Footer Consistency ⏱️ 5 minutes

**Action**: Check that Header.tsx and Footer.tsx are the only versions

**Verification**:
```bash
# Should return ONLY Header.tsx and Footer.tsx (no variants)
find src -name "*Header*" -type f
# Expected: src/components/Header.tsx (no Header2.tsx, CustomHeader.tsx, etc.)

find src -name "*Footer*" -type f
# Expected: src/components/Footer.tsx (no Footer2.tsx, CustomFooter.tsx, etc.)

# Check all pages import the same Header
grep -r "from.*Header" src/app --include="*.tsx" | head -20
# Expected: All imports point to '@/components/Header'
```

---

## FINAL VERIFICATION CHECKLIST

After completing all 5 tasks, run these commands:

```bash
# 1. Build should pass with 0 errors
npm run build
# Expected: ✅ Compiled successfully in Xs

# 2. TypeScript should have 0 errors
pnpm tsc --noEmit
# Expected: (silent, no output)

# 3. Files should be deleted
ls src/components/CTASection.tsx 2>&1
# Expected: "cannot access (No such file)"

ls src/components/CategoryShowcase.tsx 2>&1
# Expected: "cannot access (No such file)"

# 4. Job references should be gone
grep -rn "href=\"/jobs\"" src/components/
# Expected: (empty)

grep -rn "Post a Job" src/components/
# Expected: (empty)

# 5. Homepage order should be correct
# (Visual verification - open http://localhost:3000)
# Expected:
#   - Hero section visible immediately
#   - Directory visible within 1 viewport height (minimal scroll)
#   - Stats/Creator Proof/How It Works appear below if user scrolls
#   - NO CTA section at bottom
#   - NO Category Showcase
#   - NO job board links anywhere

# 6. Mobile responsive
# Test on mobile (375px), tablet (768px), desktop (1024px)
# Expected: Directory still immediately accessible on all sizes
```

---

## ACCEPTANCE CRITERIA

✅ **You're done when**:

1. [ ] CTASection.tsx deleted
2. [ ] CategoryShowcase.tsx deleted
3. [ ] Homepage reordered (Hero → Directory → Stats/Proof/HowTo)
4. [ ] All /jobs references removed from Header, Footer
5. [ ] "Post a Job" removed from all components
6. [ ] "Jobs for Developers" removed from nav
7. [ ] Build passes: `npm run build` ✅
8. [ ] TypeScript passes: `pnpm tsc --noEmit` ✅
9. [ ] Homepage loads in <2s
10. [ ] Directory visible within 1 viewport height on desktop
11. [ ] Mobile responsive (375px, 768px, 1024px all work)
12. [ ] No console errors
13. [ ] All tests pass: `npm run test` ✅

---

## WHAT I'LL CHECK (PM Validation)

When you submit this work, I will review using **Gate Report Template**:

**Ralph Protocol (12 gates)**:
- [ ] Build: 0 errors
- [ ] TypeScript: 0 errors
- [ ] Console: 0 errors
- [ ] Logic: Correct
- [ ] Performance: <2s
- [ ] Mobile: Responsive
- [ ] Security: Safe
- [ ] Errors: Handled gracefully
- [ ] Code style: Consistent
- [ ] Tests: Passing
- [ ] Deployment: Ready

**PM Protocol** (if applicable):
- Not applicable (this is UX cleanup/infrastructure)

**Decision**: Will give APPROVED / CONDITIONAL / BLOCKED status with detailed feedback

---

## TIMELINE

- **Now → 2 hours**: Complete all 5 tasks
- **2 hours**: Run verification commands
- **2 hours**: PM validation (me checking with Gate Report)
- **Afternoon**: Phase 2.1 ships to production

---

## WHY THIS MATTERS

**Before** (Current):
- User sees CTAs 3 times ❌
- Confusing (same message, different wording) ❌
- Wastes real estate ❌
- Marketplace buried below 5 sections ❌
- Job board links appear (Phase 2+ feature) ❌

**After** (Fixed):
- Single, clear CTA path ✅
- Immediate marketplace access ✅
- Supporting sections (social proof) below ✅
- No feature creep (job board hidden) ✅
- Lean, focused homepage ✅

**Conversion Impact**: Clearer message → faster action → higher conversion rate

---

## QUESTIONS?

If blocked, add to REPORT-CENTER.md under "BLOCKERS & ISSUES" section:
- What's blocked?
- Why are you stuck?
- What do you need?

I check that doc daily.

---

**Start now. Target completion: Today EOD (Feb 5)**

Go.
