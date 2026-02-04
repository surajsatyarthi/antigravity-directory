# ANTIGRAVITY EXECUTION PROMPT
## Your Job: Fix Code + Build Phase 1 (11 Days)

**Timeline**: Feb 4-14, 2026
**Goal**: Fix build errors + make 1,500 resources searchable + build revenue-focused homepage
**Status**: Ready to start

---

## 🎯 YOUR MISSION (2 Tasks)

### **Task 1: Fix Code Issues (Day 1 - 1 hour)**

**Status**: Build is broken.

**What to do**:
1. Open `src/lib/queries.ts`
2. Go to line 7
3. Find: `import { resources, categories, ratings, resourceTags, tags, tools, submissions, users }`
4. Change to: `import { resources, categories, ratings, resourceTags, tags, tools, submissions, users, payments }`
5. Save file
6. Run: `npm run build`
7. Verify: "✓ Compiled successfully"
8. Commit: `git add . && git commit -m "fix: add payments import to queries.ts"`

**Done ✅**

---

### **Task 2: Build Searchable Directory + Revenue-Focused Homepage (Days 2-11)**

**Exactly what you need to build**:

✅ All 1,500 resources load without errors
✅ User can search by name (type "database" → shows database tools)
✅ User can filter by category (MCPs, Rules, Workflows)
✅ Results show: Tool name, description, category, price
✅ Homepage with 5 sections ABOVE the resource grid:
  - Hero section with headline + 3 value prop cards
  - 4 creator cards with fake earnings data
  - Stats bar (hardcoded numbers)
  - "How it works" section (3 steps)
  - Final CTA section with buttons
✅ Mobile responsive (test 375px, 768px, 1024px)
✅ No console errors, no TypeScript errors
✅ Page loads <2 seconds

**What NOT to build**:
- ❌ Creator earnings dashboard
- ❌ Real-time stats from database
- ❌ Complex filters (search + category only)
- ❌ Payment flows (payment system already works, don't change it)

---

## 📋 REFERENCE DOCUMENTS (Read These First)

All these files are in `/docs/`:

1. **ANTIGRAVITY-DETAILED-BUILD.md** (Start here!)
   - Step-by-step 11-day breakdown
   - Full component code templates you can copy-paste
   - Component names, file locations, exact structure
   - Testing procedures for each day
   - Troubleshooting guide

2. **QUICK-START-CHECKLIST.md** (Use daily)
   - Daily checklist to track progress
   - Build verification steps
   - Mobile testing at 3 breakpoints
   - Design verification
   - Code quality checks

3. **CREATOR-DATA-REFERENCE.md** (Copy the fake data)
   - 4 fake creator profiles with earnings
   - Copy options for hero, subheadings, CTAs
   - Tailwind color scheme (dark background, blue/purple accents)
   - Ready to paste into your components

4. **FILE-STRUCTURE-GUIDE.md** (Know your file layout)
   - Where to create 5 new components
   - Exact import statements for page.tsx
   - Full code templates for each component
   - Step-by-step file creation

---

## 🚀 START HERE

### **Right Now**:
1. Read `ANTIGRAVITY-DETAILED-BUILD.md` (15 min)
2. Follow Day 1 tasks (fix code, run build)
3. Commit your fix

### **Tomorrow (Day 2)**:
1. Run `npm run dev`
2. Test that resources load without errors
3. Test search and category filters
4. Check mobile responsiveness
5. Commit: `git add . && git commit -m "feat: verify directory search and filters work"`

### **Days 3-11**:
1. Follow the daily checklist in `QUICK-START-CHECKLIST.md`
2. Use code templates from `FILE-STRUCTURE-GUIDE.md` and `ANTIGRAVITY-DETAILED-BUILD.md`
3. Copy fake creator data from `CREATOR-DATA-REFERENCE.md`
4. Test on mobile (375px, 768px) and desktop
5. Run `npm run build` daily to check for errors
6. Commit after each milestone

---

## 💡 KEY PRINCIPLES

1. **You own the homepage design end-to-end**
   - CEO will review mockup for approval
   - You decide layout, spacing, messaging
   - Use the copy options provided, but make it your own

2. **No database queries on homepage**
   - Don't fetch creator earnings from DB
   - Don't calculate stats from DB
   - Hardcode everything: 40 fake profiles, fixed numbers
   - This keeps it fast and simple

3. **Keep it simple**
   - Dark background (black), blue/purple accents
   - Clean cards, good spacing
   - Hover effects on buttons
   - No animations (waste of time)

4. **Mobile-first testing**
   - Test at 375px (mobile), 768px (tablet), 1024px (desktop)
   - DevTools → Toggle device toolbar
   - Make sure buttons are clickable
   - Make sure text is readable

---

## 📞 IF YOU GET STUCK

**Stuck for >15 minutes?**

1. Check the reference docs (answer might be there)
2. Check TypeScript errors: `npm run build`
3. Check console errors: DevTools → Console
4. Search error message on Google
5. Ask CEO

**Most common issues**:
- "Cannot find module" → Check import path spelling
- "Component not rendering" → Check imports in page.tsx
- "Styling looks wrong" → Check Tailwind class names
- "Page is slow" → Check for N+1 queries in console
- "Mobile looks broken" → Adjust grid breakpoints: `grid-cols-1 md:grid-cols-3`

---

## ✅ SUCCESS = THESE 3 THINGS

When you're done, verify:

1. **Build passes**: `npm run build` → "✓ Compiled successfully"
2. **No errors**: DevTools → Console shows 0 red errors
3. **Works on mobile**: Test at 375px, 768px, 1024px widths

If all 3 pass, you're done. Commit and notify CEO.

---

## 📅 TIMELINE

| Day | Task | Status |
|-----|------|--------|
| **Day 1 (Feb 4)** | Fix code issues (1h) | TODO |
| **Days 2-4 (Feb 5-7)** | Verify search works (20h) | TODO |
| **Days 5-10 (Feb 8-13)** | Build homepage (16h) | TODO |
| **Day 11 (Feb 14)** | Final testing (1h) | TODO |

---

## 🎯 EXACTLY WHAT TO BUILD (Day-by-Day)

### **Day 1: Code Fix** ⏱️ 1 hour
- [ ] Add `payments` import to queries.ts
- [ ] Run build: `npm run build` (should pass)
- [ ] Commit the fix

### **Days 2-4: Directory Search** ⏱️ 20 hours
- [ ] Verify 1,500 resources load without errors
- [ ] Test search by name works ("database" → results)
- [ ] Test category filter works (MCPs, Rules, Workflows)
- [ ] Test on mobile (375px, 768px, 1024px)
- [ ] Test on desktop
- [ ] Verify page load time <2 seconds
- [ ] Commit: "feat: verify resource directory loads and searches work"

### **Days 5-10: Build Homepage** ⏱️ 16 hours

#### Create 5 New Components (2 hours):
- [ ] `src/components/HeroSection.tsx` - Hero + 3 value prop cards
- [ ] `src/components/CreatorProofSection.tsx` - 4 fake creator cards
- [ ] `src/components/StatsBar.tsx` - Hardcoded stats
- [ ] `src/components/HowItWorks.tsx` - 3-step process
- [ ] `src/components/CTASection.tsx` - Final CTA buttons

#### Integrate into page.tsx (1 hour):
- [ ] Add imports for all 5 components
- [ ] Add section around line 99-107 (only show when NOT browsing)
- [ ] Test: Homepage loads with all sections

#### Style & Polish (2 hours):
- [ ] Dark background (black), blue/purple accents
- [ ] Good spacing and hover effects
- [ ] Responsive: 375px, 768px, 1024px
- [ ] Run: `npm run build` (0 errors)

#### Test on Multiple Devices (1 hour):
- [ ] Mobile (375px) - DevTools → Toggle device toolbar
- [ ] Tablet (768px) - Select iPad
- [ ] Desktop (1024px+) - Full screen browser

#### Final Commit:
- [ ] Run: `npm run build` (final check)
- [ ] Commit: "feat: build revenue-focused homepage"

### **Day 11: Final Testing** ⏱️ 1 hour
- [ ] Build passes: `npm run build`
- [ ] No console errors
- [ ] No TypeScript errors
- [ ] Lighthouse score: Aim for 80+
- [ ] Mobile responsive
- [ ] All buttons clickable
- [ ] Commit: "feat: final homepage polish"

---

## 📚 FULL REFERENCE

For more detail, read these in order:
1. `ANTIGRAVITY-DETAILED-BUILD.md` - Full step-by-step with code
2. `FILE-STRUCTURE-GUIDE.md` - File templates and structure
3. `CREATOR-DATA-REFERENCE.md` - Fake data ready to copy
4. `QUICK-START-CHECKLIST.md` - Daily tracking

---

## 🚀 GO BUILD IT

You have everything you need. Reference docs are ready. Code templates are ready. Fake data is ready.

**11 days. 2 tasks. Ship it.**

Questions? Ask CEO.

---

**Last Updated**: Feb 4, 2026
**Status**: Ready to Execute
**Your Role**: Build Phase 1 (searchable directory + revenue-focused homepage)

