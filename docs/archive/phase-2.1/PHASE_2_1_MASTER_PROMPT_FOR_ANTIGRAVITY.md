# PHASE 2.1: MASTER PROMPT FOR ANTIGRAVITY
## Homepage Simplification + Hero Redesign (Rule of 3)

**URGENT**: Complete today (Feb 5). Phase 2.1 blocked until done.

---

## THE CORE PROBLEM

Your homepage repeats the same message 3 times:
- Hero: "Browse All Tools" + "List Your Resource"
- Middle sections: Stats, Creator Proof, How It Works, Category Showcase (4 sections!)
- Bottom: CTA Section with "Claim Your Tool" + "Browse Tools" + "Post a Job"

**Result**: Users see CTAs 3 times = CONFUSION, not conviction. Marketplace buried 5 sections deep.

**The fix**: Simplify + Show the 3 core values clearly in hero.

---

## WHAT ARE THE 3 CORE VALUES?

Users need to see these immediately:

1. **📦 BROWSE** - "Discover 2,200+ MCPs, rules, workflows"
   - For: Users searching for tools
   - Stat: 2,200+
   - Button: "Browse Now"

2. **💰 EARN** - "Keep 80% commission on every sale"
   - For: Creators wanting to monetize
   - Stat: 80%
   - Button: "Start Listing"

3. **👥 COMMUNITY** - "Connect with 500+ creators"
   - For: People wanting to network
   - Stat: 500+
   - Button: "View Profiles"

This is **Rule of 3 copywriting**: 3 things feel complete and memorable. "Browse. Earn. Connect."

---

## TASK 1: HOMEPAGE SIMPLIFICATION (35 minutes)

### Delete CTASection.tsx
**File**: `src/components/CTASection.tsx`
**Action**: DELETE entire file
**Why**: Duplicates hero CTAs, wastes space

In `src/app/page.tsx`:
- Remove import: `import CTASection from '@/components/CTASection';`
- Remove render: `<CTASection />`

Verify:
```bash
grep -r "CTASection" src/ # Should return 0 results
```

---

### Delete CategoryShowcase.tsx
**File**: `src/components/CategoryShowcase.tsx`
**Action**: DELETE entire file
**Why**: Sidebar already has category filters. This is redundant.

In `src/app/page.tsx`:
- Remove import: `import CategoryShowcase from '@/components/CategoryShowcase';`
- Remove render: `{!isBrowsing && <CategoryShowcase />}`

Verify:
```bash
grep -r "CategoryShowcase" src/ # Should return 0 results
```

---

### Reorder Homepage Sections
**File**: `src/app/page.tsx`

**Current order** (BAD):
```
Hero
Stats
CreatorProof
HowItWorks
CategoryShowcase
Directory ← Too late!
CTA (duplicate)
```

**New order** (GOOD):
```
Hero
Directory ← Immediately visible!
Stats
CreatorProof
HowItWorks
```

Find in page.tsx and reorder to:
```typescript
{!isBrowsing && <HeroSection />}
<Directory id="full-directory" /> {/* MOVED HERE */}
{!isBrowsing && (
  <>
    <Stats />
    <CreatorProof />
    <HowItWorks />
  </>
)}
```

Verify:
```bash
npm run build # Should pass
```

---

### Remove All Job Board References
Job board is Phase 2+ feature. Should NOT appear in Phase 2.1.

**File 1: Header.tsx**
- Line ~28: Delete `{ label: 'Jobs for Developers', href: '/jobs' },`
- Lines ~70-73: Delete the "Post a Job" link block

**File 2: Footer.tsx**
- Lines ~128-132: Delete the "Jobs" link block

**File 3: CTASection.tsx**
- Already deleting in Task 1

Verify:
```bash
grep -rn "href=\"/jobs\"" src/components/ # Should return 0
grep -rn "Post a Job" src/components/ # Should return 0
```

---

### Verify Header/Footer Consistency
Confirm only ONE Header.tsx and ONE Footer.tsx exist (no variants).

```bash
find src -name "*Header*" -type f # Only Header.tsx
find src -name "*Footer*" -type f # Only Footer.tsx
```

---

## TASK 2: HERO SECTION REDESIGN (2 hours)

Add **three value cards** below the subheadline in HeroSection.tsx

### New Hero Structure
```
┌─────────────────────────────────────┐
│ Headline: "Unleash Your Creativity" │
│ Subheadline: "Browse. Earn. Connect"│
│                                     │
│ ┌─────────┬─────────┬─────────────┐ │
│ │📦 Browse│💰 Earn │👥 Community │ │
│ │         │        │             │ │
│ │2,200+   │80%     │500+         │ │
│ │Tools    │Commiss │Creators    │ │
│ │         │        │             │ │
│ │[Browse] │[List]  │[Join]      │ │
│ └─────────┴─────────┴─────────────┘ │
│                                     │
│  [Browse All Tools] [List Resource] │
│  [Search bar...]                    │
└─────────────────────────────────────┘
```

### Implementation

1. **Update subheadline** in HeroSection.tsx:
   ```typescript
   // Change from generic to Rule of 3
   <p className="text-2xl font-bold text-blue-400">
     Browse. Earn. Connect.
   </p>
   ```

2. **Create new component**: `src/components/ThreeValueCards.tsx`
   ```typescript
   export function ThreeValueCards() {
     const cards = [
       {
         emoji: "📦",
         title: "Browse Tools",
         description: "Discover 2,200+ MCPs, workflows, and rules",
         stat: "2,200+",
         statLabel: "Resources",
         buttonText: "Browse Now",
         buttonAction: () => document.getElementById('full-directory')?.scrollIntoView()
       },
       {
         emoji: "💰",
         title: "Earn 80%",
         description: "List your resources and keep most of the revenue",
         stat: "80%",
         statLabel: "Commission",
         buttonText: "Start Listing",
         buttonAction: () => window.location.href = '/submit'
       },
       {
         emoji: "👥",
         title: "Join Community",
         description: "Connect with 500+ creators building the future",
         stat: "500+",
         statLabel: "Creators",
         buttonText: "View Profiles",
         buttonAction: () => window.location.href = '/members'
       }
     ];

     return (
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-12">
         {cards.map((card) => (
           <div key={card.title} className="border border-white/10 rounded-lg p-6 hover:bg-white/5 transition">
             <div className="text-4xl mb-4">{card.emoji}</div>
             <h3 className="font-bold text-xl mb-2">{card.title}</h3>
             <p className="text-gray-400 text-sm mb-4">{card.description}</p>
             <div className="mb-4">
               <div className="font-black text-3xl text-blue-400">{card.stat}</div>
               <div className="text-xs text-gray-500">{card.statLabel}</div>
             </div>
             <button
               onClick={card.buttonAction}
               className="w-full px-4 py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700"
             >
               {card.buttonText}
             </button>
           </div>
         ))}
       </div>
     );
   }
   ```

3. **Add to HeroSection.tsx** below subheadline:
   ```typescript
   import { ThreeValueCards } from './ThreeValueCards';

   // In render:
   <p className="text-2xl font-bold text-blue-400">
     Browse. Earn. Connect.
   </p>
   <ThreeValueCards />  {/* ← ADD THIS */}
   ```

4. **Keep existing CTAs** below (don't remove):
   ```typescript
   {/* These stay - they're primary CTAs */}
   <button onClick={() => document.getElementById('full-directory')?.scrollIntoView()}>
     Browse All Tools
   </button>
   <Link href="/submit">
     List Your Resource (Earn 80%)
   </Link>
   ```

5. **Responsive design**:
   - Mobile (375px): 1 column
   - Tablet (768px): 2 columns
   - Desktop (1024px): 3 columns

---

## FINAL VERIFICATION

After completing both tasks:

```bash
# 1. Build should pass
npm run build
# Expected: ✅ Compiled successfully

# 2. TypeScript should have 0 errors
pnpm tsc --noEmit
# Expected: (silent)

# 3. No console errors
# Open http://localhost:3000 in browser, check console
# Expected: Clean console

# 4. Homepage structure
# Hero visible immediately ✅
# Directory visible within 1 viewport height ✅
# No CTA section at bottom ✅
# No category showcase ✅
# Three value cards visible in hero ✅

# 5. Mobile responsive
# Test at 375px - cards stack vertically ✅
# Test at 768px - cards in 2 columns ✅
# Test at 1024px - cards in 3 columns ✅

# 6. Buttons work
# "Browse Now" scrolls to directory ✅
# "Start Listing" goes to /submit ✅
# "View Profiles" goes to /members ✅
# "Browse All Tools" scrolls to directory ✅
# "List Resource" goes to /submit ✅

# 7. No job references
grep -rn "href=\"/jobs\"" src/components/
# Expected: (empty)
```

---

## CHECKLIST BEFORE SUBMITTING

- [ ] CTASection.tsx deleted
- [ ] CategoryShowcase.tsx deleted
- [ ] Homepage reordered (Hero → Directory → Rest)
- [ ] All /jobs references removed
- [ ] ThreeValueCards component created
- [ ] Hero updated with "Browse. Earn. Connect."
- [ ] Three cards visible (Browse, Earn, Community)
- [ ] Card buttons navigate correctly
- [ ] Build passes: npm run build ✅
- [ ] TypeScript passes: pnpm tsc --noEmit ✅
- [ ] Console clean (0 errors)
- [ ] Responsive tested (375px, 768px, 1024px)
- [ ] Screenshots taken (desktop + mobile)

---

## SUBMIT WORK HERE

Update `/docs/REPORT-CENTER.md`:

```
### Task: Phase 2.1 - Homepage Simplification + Hero Redesign

**Status**: 🟢 COMPLETED

**Deliverables**:
- Homepage simplification ✅
- Hero redesign with 3 value cards ✅
- Build passes ✅
- TypeScript passes ✅
- Console clean ✅
- Responsive verified ✅

**Screenshots**:
[Paste screenshot of new hero with Browse/Earn/Community cards]
[Paste screenshot of mobile view]

**Test Results**:
- npm run build: PASS
- pnpm tsc --noEmit: PASS
- Console errors: 0
- Page load time: <2s

**Ready for PM review**: YES
```

---

## WHAT PM WILL CHECK

I'll review using **Gate Report Template**:

1. **Ralph Protocol (12 gates)**:
   - Build passes ✅
   - TypeScript 0 errors ✅
   - Console 0 errors ✅
   - Logic correct ✅
   - Performance <2s ✅
   - Mobile responsive ✅
   - Security safe ✅
   - Error handling ✅
   - Code style consistent ✅
   - Tests passing ✅
   - Deployment ready ✅

2. **UX Validation**:
   - Three value props visible ✅
   - "Browse. Earn. Connect." clear ✅
   - Cards responsive ✅
   - No repetition ✅
   - Marketplace immediately visible ✅

**Result**: APPROVED / CONDITIONAL / BLOCKED

---

## TIMELINE

- **Now → 35 min**: Homepage simplification (delete 2 files, reorder, remove jobs)
- **35 min → 2.5h**: Hero redesign (add 3-value-card component)
- **2.5h → 3h**: Verification (build, test, responsive check)
- **3h → 5h**: PM review (Gate Report validation)
- **5h EOD**: Phase 2.1 shipped ✅

**Target**: Complete by 6 PM today

---

## WHY THIS MATTERS

**Before** (Current):
- Users confused (CTAs repeated 3x)
- Marketplace buried (5 sections away)
- No clarity on value (marketplace only)
- Job board appearing (Phase 2+ feature)

**After** (Fixed):
- Users clear (3 distinct value props visible)
- Marketplace immediate (1 viewport height)
- Full value visible (Browse + Earn + Community)
- Clean scope (no Phase 2+ features)
- Lean homepage (no repetition, no waste)

---

## QUESTIONS?

If blocked:
1. Reread the relevant section above
2. Check `/docs/PHASE_2_1_HOMEPAGE_SIMPLIFICATION_PROMPT.md` for detailed breakdown
3. Check `/docs/PHASE_2_1_HERO_SECTION_JSON_PROMPT.json` for implementation details
4. Add to REPORT-CENTER.md "BLOCKERS & ISSUES" section

PM checks daily.

---

**Go. Ship Phase 2.1 today.**
