# BUILD PROMPT FOR ANTIGRAVITY AI CODER
## Focus: Just These 2 Things (Feb 4-14)

---

## YOUR JOB: Build 2 Features

### **1. Fix Code Issues (Today - 1 hour)**

**Status**: Build is broken. Fix it.

**Issue**: `src/lib/queries.ts` missing `payments` import
- Line 7: Add `payments` to the imports
- Before: `import { resources, categories, ratings, resourceTags, tags, tools, submissions, users }`
- After: `import { resources, categories, ratings, resourceTags, tags, tools, submissions, users, payments }`

**Verify**: Run `npm run build` → Should pass ✅

---

### **2. Build Searchable Resource Directory (Feb 5-10, ~20 hours)**

**What**: Make 1,500+ MCPs/rules/workflows searchable on homepage

**Exactly what I need**:
1. ✅ All 1,500 resources load without errors
2. ✅ User can search by name (type "database" → shows database tools)
3. ✅ User can filter by category (MCPs, Rules, Workflows)
4. ✅ Results show: Tool name, description, category, price
5. ✅ Click tool → See details + "Buy" button
6. ✅ Page loads <2 seconds
7. ✅ Mobile responsive (test 375px, 768px, 1024px)
8. ✅ No console errors

**Don't need yet**:
- Creator claiming (we'll add later)
- Payments (we'll add later)
- Complex filters (just category + search)
- Sorting by popularity (nice-to-have, defer)

**Current state**: Search/filter already built. Just ensure:
- No data loading errors
- No broken imports
- Fast performance

**Success**: User can find any tool in 3 seconds via search/category

---

### **3. Build Revenue-Focused Homepage (Feb 11-14, ~16 hours)**

**What**: Own the entire homepage from end-to-end. Design + copy.

**You decide everything**:
- ✅ Hero headline (something like "Build, Share, and Earn" or your own)
- ✅ Subheading (emphasize creators earning 80%)
- ✅ 3-4 value prop cards (Creators, Users, Companies)
- ✅ 4 fake creator cards with testimonials (you make up the copy)
- ✅ Stats bar (hardcoded: "2,200+ Tools", "500+ Creators", "5000+ Daily Visitors", etc.)
- ✅ "How it works" section (3 steps)
- ✅ Final CTA section ("Ready to earn?" with buttons)
- ✅ Colors: Dark background (black), blue/purple accents
- ✅ Mobile responsive (375px, 768px, 1024px)
- ✅ Smooth scrolling, hover effects
- ✅ Page loads <2 seconds

**Key requirements** (don't miss these):
1. **Message**: Homepage should shout "CREATORS EARN 80% HERE"
   - Every visitor should understand: If you list a tool, you keep 80%
   - Not about "discovering tools" - about "making money"

2. **Social Proof**: Show fake creators earning money
   - John: "$8,200/month, 27 tools listed"
   - Sarah: "$5,100/month, 12 tools listed"
   - Alex: "$1,500/month, 8 tools listed"
   - Make up testimonials (keep them real-sounding)

3. **CTAs**: At least 3 buttons visible
   - "Claim Your Tool" (primary)
   - "Browse Tools" (secondary)
   - "Post Job" (secondary)

4. **No Database Queries**:
   - Don't fetch creator earnings from DB
   - Don't calculate stats from DB
   - Hardcode everything
   - Use static fake data

**Your components** (create these):
- `HeroSection.tsx` - Hero + value props
- `CreatorProofSection.tsx` - 4 fake creator cards
- `StatsBar.tsx` - Hardcoded stats
- `HowItWorks.tsx` - 3-step process
- `CTASection.tsx` - Final call-to-action

**Integrate into** `src/app/page.tsx`:
- Show homepage sections above the resources grid
- Only show when NOT searching/filtering
- When user searches or filters, hide hero and show results

**Testing checklist**:
- [ ] No TypeScript errors: `npm run build`
- [ ] No console errors in browser
- [ ] Page loads <2 seconds (test with Lighthouse)
- [ ] Mobile responsive (test 375px, 768px, 1024px)
- [ ] Lighthouse score 80+
- [ ] All buttons clickable
- [ ] No broken images

---

## DAILY CHECKLIST

### **Day 1 (Feb 4)**: Code Fixes
- [ ] Add `payments` import to queries.ts
- [ ] Run build: `npm run build` (should pass)
- [ ] Commit: "fix: add payments import to queries.ts"

### **Day 2-4 (Feb 5-7)**: Search & Directory
- [ ] Verify 1,500 resources load without errors
- [ ] Test search by name works
- [ ] Test category filter works
- [ ] Test on mobile (375px, 768px)
- [ ] Test on desktop
- [ ] Verify page load time <2 seconds
- [ ] Commit: "feat: verify resource directory loads and searches work"

### **Day 5-7 (Feb 8-10)**: Homepage Design & Copy
- [ ] Sketch what homepage should look like (don't overthink)
- [ ] Build HeroSection component (headline + 3-4 value props)
- [ ] Build CreatorProofSection (4 fake creator cards with earnings)
- [ ] Build StatsBar (hardcoded numbers)
- [ ] Build HowItWorks (3 steps to earn money)
- [ ] Build CTASection (final call-to-action)
- [ ] Commit: "feat: add revenue-focused homepage sections"

### **Day 8-9 (Feb 11-12)**: Integration & Styling
- [ ] Integrate all components into page.tsx
- [ ] Style: Dark background (black), blue/purple accents
- [ ] Add hover effects on buttons
- [ ] Test responsive design (375px, 768px, 1024px)
- [ ] Commit: "style: implement responsive dark theme homepage"

### **Day 10 (Feb 13)**: Final Testing
- [ ] No TypeScript errors: `npm run build`
- [ ] No console errors in browser DevTools
- [ ] Lighthouse score: Run audit, aim for 80+
- [ ] Page load time: <2 seconds (Lighthouse)
- [ ] Mobile test: Open on phone, scroll, tap buttons
- [ ] Desktop test: Chrome, Firefox, Safari
- [ ] Commit: "test: verify homepage performance and responsiveness"

### **Day 11 (Feb 14)**: Done
- [ ] All checklist items complete
- [ ] Ready for CEO review
- [ ] Create pull request with description

---

## WHAT "REVENUE-FOCUSED" MEANS

**NOT**: "Check out our amazing directory of tools!"
**YES**: "List your tool. Earn 80%. Keep the money. Get paid in 2 days."

Every section should answer: **Why would a creator want to list here?**

Example creator card:
```
John Chen
💰 $8,200/month
27 tools listed
"I listed my MCP on Day 1. Made $800 by Day 7.
Now it's a consistent $8k/month."
```

Example hero:
```
BUILD, SHARE, AND EARN
The only marketplace where creators keep 80%

Forget taking 30%. We pay creators 80% commission.
You build it. You sell it. You keep the money.
First 2 sales are free. Zero risk.

[Claim Your Tool] [Browse] [Post Job]
```

That's the vibe.

---

## HOW TO DO THIS LEAN/CHEAP

### **Don't Over-Engineer**
- ❌ Don't add animations/transitions (wastes time)
- ❌ Don't build complex database queries (hardcode everything)
- ❌ Don't add configurability (no admin panels, no settings)
- ✅ Do keep it simple: Good copy + clean design = ship it

### **Reuse What Exists**
- SearchInput component → Already built, use it
- CategoryTabs component → Already built, use it
- InfiniteResourceGrid → Already built, use it
- Dark theme → Already exists in codebase, follow it
- Don't rebuild, just reuse

### **Write Your Own Copy**
- You own the homepage copy end-to-end
- Don't wait for anyone else
- Make it real: Put yourself in a creator's shoes
- What would convince YOU to list your tool here?
- That's your copy

### **Fake Data is Your Friend**
- Don't fetch creator earnings from DB
- Create 4 fake creator profiles:
  ```javascript
  const creators = [
    { name: "John Chen", earnings: 8200, tools: 27, bio: "I listed my MCP on Day 1..." },
    { name: "Sarah Wang", earnings: 5100, tools: 12, bio: "Sold my workflow for $29..." },
    { name: "Alex Rodriguez", earnings: 1500, tools: 8, bio: "My rules package is steady..." },
    { name: "Maya Patel", earnings: 3200, tools: 15, bio: "Best decision I made..." }
  ]
  ```
- Paste into component
- Done

---

## IF YOU GET STUCK

**Stuck on something?** Do this:
1. Is it in the checklist above? → Keep going
2. Is it in the "Don't build" section? → Skip it
3. Completely stuck (>30 min)? → Ask CEO
4. Don't guess. Don't overthink. Just build what's listed.

**Most common questions**:
- "Should I add animations?" → No, keep it simple
- "Should I fetch creator data from DB?" → No, hardcode fake data
- "Should I add more filters?" → No, search + category only
- "Should I build admin panel for ads?" → No, that's later

---

## SUCCESS = LAUNCH READY

When you're done:
- ✅ 1,500 resources searchable
- ✅ Homepage with "creators earn 80%" message
- ✅ 4 fake creator proof cards
- ✅ Clean dark design with blue/purple accents
- ✅ Mobile responsive
- ✅ <2 second load time
- ✅ No TypeScript errors
- ✅ No console errors
- ✅ Lighthouse 80+

**That's it. Ship it. We launch.**

---

**Prompt Version**: 2.0 (Antigravity owns homepage)
**Created**: Feb 4, 2026
**Status**: Ready to Build

🚀 Go own this homepage.
