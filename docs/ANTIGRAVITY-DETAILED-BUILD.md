# ANTIGRAVITY: DETAILED BUILD INSTRUCTIONS
## Homepage + Searchable Resources (Feb 4-14, 2026)

**Read this completely before starting. Reference it daily.**

---

## 📌 YOUR 2 TASKS (11 days total)

### **Task 1: Fix Code Issues** (1 hour, Day 1)
### **Task 2: Build Searchable Directory** (20 hours, Days 2-4)
### **Task 3: Build Revenue-Focused Homepage** (16 hours, Days 5-10)
### **Task 4: Final Testing** (1 hour, Day 11)

---

## TASK 1: FIX CODE ISSUES (Day 1 - 1 hour)

### **Issue**: Build is broken
```
error: Cannot find name 'payments'
at: src/lib/queries.ts:356
```

### **Fix**: Add missing import

**File**: `src/lib/queries.ts`
**Line 7**: Currently says:
```typescript
import { resources, categories, ratings, resourceTags, tags, tools, submissions, users } from '@/drizzle/schema';
```

**Change to**:
```typescript
import { resources, categories, ratings, resourceTags, tags, tools, submissions, users, payments } from '@/drizzle/schema';
```

### **Verify**:
```bash
npm run build
```
Should complete with no errors ✅

### **Commit**:
```bash
git add src/lib/queries.ts
git commit -m "fix: add payments import to queries.ts"
```

---

## TASK 2: BUILD SEARCHABLE DIRECTORY (Days 2-4, ~20 hours)

### **What users should be able to do**:
1. See 1,500+ tools on homepage
2. Search for tools by name ("database" → shows database MCPs)
3. Filter by category (MCPs, Rules, Workflows, Skills)
4. Click a tool → see details + "Buy" button
5. Page loads in <2 seconds
6. Works on mobile (375px) and desktop

### **Current state**:
- SearchInput component exists ✅
- CategoryTabs component exists ✅
- InfiniteResourceGrid exists ✅
- Just verify they work and have no errors

### **Acceptance criteria**:
- [ ] `npm run build` passes with 0 errors
- [ ] No console errors in browser
- [ ] Can search by tool name
- [ ] Can filter by category
- [ ] Results show within 500ms
- [ ] Page load time <2 seconds (test with Lighthouse)
- [ ] Mobile responsive (test 375px, 768px, 1024px)
- [ ] All links clickable

### **How to test**:
```bash
npm run dev
# Open http://localhost:3000
# Try searching: "database", "api", "parser"
# Try category filters
# Check mobile (DevTools → Toggle device toolbar)
```

### **If something breaks**:
1. Check console errors (DevTools → Console tab)
2. Check for TypeScript errors: `npm run build`
3. If stuck >15 min: Ask CEO

---

## TASK 3: BUILD REVENUE-FOCUSED HOMEPAGE (Days 5-10, ~16 hours)

### **What is a "revenue-focused" homepage?**

**NOT this**:
```
"Explore our directory of Antigravity tools"
"Discover MCPs, rules, and workflows"
"Browse 2,200+ resources"
```

**YES this**:
```
"BUILD, SHARE, AND EARN
The only marketplace where creators keep 80%

List your tool. You sell it. You keep $80 of every $100.
First 2 sales are free. Zero commission. Zero risk.

[Claim Your Tool] [Browse] [Post Job]

John made $8,200/month in 60 days.
Sarah earned $5,100/month from 12 tools.
Alex makes $1,500/month from rules.
You could be next.
```

**The difference**: Every sentence answers: "Why would I list my tool here?"

---

## BUILDING YOUR HOMEPAGE: Step-by-Step

### **STEP 1: Plan the layout** (30 min, Day 5)

Sketch on paper or in your head. You don't need approval. Just sketch it.

**Suggested structure**:
```
1. HEADER
   Logo + Nav buttons

2. HERO SECTION
   Big headline: "BUILD, SHARE, AND EARN"
   Subheading about 80% commission
   3-4 value prop cards (Creators/Users/Companies)
   Search bar

3. SOCIAL PROOF
   4 fake creator cards showing earnings

4. HOW IT WORKS
   3 simple steps to earn money

5. CTA SECTION
   "Ready to earn? List your tool free."
   3 buttons

6. RESOURCES GRID
   [Below all the above - the actual searchable resources]
```

### **STEP 2: Create components** (3 hours, Days 5-6)

Create these files in `src/components/`:

**1. HeroSection.tsx** (600 lines)
```typescript
'use client';

import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="pt-20 pb-16 px-4 bg-black text-white">
      <div className="max-w-6xl mx-auto">

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-black mb-6 text-center">
          Build, Share, and Earn
          <br />
          <span className="text-blue-400">with Antigravity</span>
        </h1>

        {/* Subheading */}
        <p className="text-xl text-gray-400 text-center mb-12 max-w-3xl mx-auto">
          The marketplace where creators keep 80% commission.
          Join 500+ creators earning $1-10k/month.
        </p>

        {/* 3 Value Props */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {/* CREATORS CARD */}
          <div className="p-8 rounded-lg bg-white/5 border border-white/10">
            <h3 className="text-lg font-bold mb-4">💰 Creators Earn</h3>
            <ul className="text-gray-400 space-y-2">
              <li>✓ List your tool for free</li>
              <li>✓ Keep 80% of every sale</li>
              <li>✓ First 2 sales commission-free</li>
              <li>✓ Get paid in 2 days</li>
            </ul>
            <Link href="/submit" className="text-blue-400 font-bold mt-6 block">
              Claim Your Tool →
            </Link>
          </div>

          {/* USERS CARD */}
          <div className="p-8 rounded-lg bg-white/5 border border-white/10">
            <h3 className="text-lg font-bold mb-4">🔍 Users Discover</h3>
            <ul className="text-gray-400 space-y-2">
              <li>✓ Browse 2,200+ tools</li>
              <li>✓ Search by category</li>
              <li>✓ Read real reviews</li>
              <li>✓ Support creators</li>
            </ul>
            <Link href="/prompts" className="text-purple-400 font-bold mt-6 block">
              Browse Tools →
            </Link>
          </div>

          {/* COMPANIES CARD */}
          <div className="p-8 rounded-lg bg-white/5 border border-white/10">
            <h3 className="text-lg font-bold mb-4">💼 Companies Hire</h3>
            <ul className="text-gray-400 space-y-2">
              <li>✓ Post jobs to 500+ devs</li>
              <li>✓ Starting at $299/month</li>
              <li>✓ Targeted to Antigravity experts</li>
              <li>✓ Direct access to talent</li>
            </ul>
            <Link href="/jobs" className="text-green-400 font-bold mt-6 block">
              Post a Job →
            </Link>
          </div>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <SearchInput placeholder="Search MCPs, rules, workflows..." />
        </div>
      </div>
    </section>
  );
}
```

**2. CreatorProofSection.tsx** (400 lines)
```typescript
'use client';

export function CreatorProofSection() {
  const creators = [
    {
      name: "John Chen",
      earnings: 8200,
      tools: 27,
      testimonial: "I listed my MCP on Day 1. Made $800 by Day 7. Now it's $8k/month."
    },
    {
      name: "Sarah Wang",
      earnings: 5100,
      tools: 12,
      testimonial: "Sold my workflow for $29. Made 35 sales in a month. Best decision ever."
    },
    {
      name: "Alex Rodriguez",
      earnings: 1500,
      tools: 8,
      testimonial: "My rules package is steady $1,500/month. It's like passive income."
    },
    {
      name: "Maya Patel",
      earnings: 3200,
      tools: 15,
      testimonial: "Started 60 days ago. Already 15 tools, $3k/month. Growing every week."
    }
  ];

  return (
    <section className="py-20 px-4 bg-black text-white border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-black text-center mb-4">Creators Are Earning</h2>
        <p className="text-gray-400 text-center mb-16">500+ creators making real money</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {creators.map(creator => (
            <div key={creator.name} className="p-6 rounded-lg bg-white/5 border border-white/10">
              <div className="mb-4">
                <p className="font-bold text-lg">{creator.name}</p>
                <p className="text-blue-400 font-bold text-xl">${creator.earnings.toLocaleString()}/mo</p>
                <p className="text-gray-400 text-sm">{creator.tools} tools</p>
              </div>
              <p className="text-gray-300 italic text-sm">"{creator.testimonial}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**3. StatsBar.tsx** (150 lines)
```typescript
'use client';

export function StatsBar() {
  const stats = [
    { label: "2,200+", value: "Tools Listed" },
    { label: "500+", value: "Active Creators" },
    { label: "$100k+", value: "Creator Earnings" },
    { label: "5000+", value: "Daily Visitors" },
    { label: "9.8/10", value: "Creator Rating" }
  ];

  return (
    <section className="py-12 px-4 bg-black border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
          {stats.map(stat => (
            <div key={stat.label}>
              <p className="text-3xl font-black text-blue-400">{stat.label}</p>
              <p className="text-gray-400 text-sm mt-2">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**4. HowItWorks.tsx** (200 lines)
```typescript
'use client';

export function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Claim Your Tool",
      description: "GitHub login. Takes 2 minutes. You own it."
    },
    {
      number: "2",
      title: "Set Your Price",
      description: "$9, $29, $99, or custom. Your choice."
    },
    {
      number: "3",
      title: "Earn 80%",
      description: "Every sale, you keep $80 of $100. Get paid in 2 days."
    }
  ];

  return (
    <section className="py-20 px-4 bg-black text-white border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-black text-center mb-16">How It Works</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map(step => (
            <div key={step.number} className="text-center">
              <div className="text-5xl font-black text-blue-400 mb-4">{step.number}</div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-gray-400">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**5. CTASection.tsx** (150 lines)
```typescript
'use client';

import Link from 'next/link';

export function CTASection() {
  return (
    <section className="py-20 px-4 bg-white/5 text-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-black mb-4">Ready to Earn?</h2>
        <p className="text-xl text-gray-400 mb-8">
          List your tool for free. Keep 80% of every sale.
          No monthly fees. No commissions on first 2 sales.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/submit" className="px-8 py-3 bg-blue-600 rounded-lg font-bold hover:bg-blue-500">
            Claim Your Tool
          </Link>
          <Link href="/prompts" className="px-8 py-3 border border-white/20 rounded-lg font-bold hover:border-white/40">
            Browse Tools
          </Link>
          <Link href="/jobs" className="px-8 py-3 border border-white/20 rounded-lg font-bold hover:border-white/40">
            Post a Job
          </Link>
        </div>
      </div>
    </section>
  );
}
```

### **STEP 3: Integrate into page.tsx** (2 hours, Days 6-7)

**File**: `src/app/page.tsx`

Find where the page renders. Around line 99-107, you'll see:
```typescript
{!isBrowsing && (
  <>
    <HeroSection />
    <StatsBar />
    <CreatorProofSection />
    <HowItWorks />
    <CategoryShowcase />
  </>
)}
```

**Replace with your new components** (keep the structure, use yours):
```typescript
{!isBrowsing && (
  <>
    <HeroSection />
    <CreatorProofSection />
    <StatsBar />
    <HowItWorks />
    <CTASection />
    {/* Remove CategoryShowcase for now - it's optional */}
  </>
)}
```

### **STEP 4: Style and Polish** (4 hours, Days 7-8)

Use existing dark theme from codebase:
- Background: Black (`bg-black`)
- Primary color: Blue (`text-blue-400`, `bg-blue-600`)
- Secondary: Purple/Gray (`text-purple-400`, `text-gray-400`)
- Borders: `border-white/10` or `border-white/5`
- Cards: `bg-white/5`

Example styled card:
```typescript
<div className="p-8 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
  {/* Content */}
</div>
```

### **STEP 5: Test Everything** (2 hours, Days 9-10)

```bash
# 1. Build check
npm run build
# Should show: ✓ Compiled successfully

# 2. Dev server
npm run dev
# Open http://localhost:3000

# 3. Manual testing
- [ ] Scroll through entire homepage
- [ ] Click all buttons
- [ ] Search for tools
- [ ] Filter by category
- [ ] Check mobile (375px - DevTools toggle)
- [ ] Check tablet (768px)
- [ ] Check desktop (1024px+)

# 4. Performance
- [ ] Open DevTools → Lighthouse
- [ ] Run audit
- [ ] Score should be 80+
- [ ] Page load <2 seconds

# 5. Browser console
- [ ] Open DevTools → Console
- [ ] No red errors
- [ ] No warnings
```

---

## COMPONENT IMPORTS

Add these imports to `src/app/page.tsx`:
```typescript
import { HeroSection } from '@/components/HeroSection';
import { CreatorProofSection } from '@/components/CreatorProofSection';
import { StatsBar } from '@/components/StatsBar';
import { HowItWorks } from '@/components/HowItWorks';
import { CTASection } from '@/components/CTASection';
```

---

## TASK 4: FINAL TESTING & COMMIT (Day 11, 1 hour)

### **Checklist before "done"**:
- [ ] `npm run build` passes
- [ ] No TypeScript errors
- [ ] No console errors
- [ ] Lighthouse 80+
- [ ] Mobile responsive (375px, 768px, 1024px)
- [ ] All buttons clickable
- [ ] Page load <2 seconds
- [ ] Tested on Chrome, Firefox, Safari
- [ ] Tested on real mobile device

### **Final commit**:
```bash
git add .
git commit -m "feat: build revenue-focused homepage with creator proof cards"
git push origin main
```

---

## TROUBLESHOOTING

### **Build fails with TypeScript errors**
```bash
npm run build
# Read the error message carefully
# Usually missing imports or type issues
# Fix and try again
```

### **Page doesn't load**
```bash
npm run dev
# Check console errors in browser DevTools
# Most common: Missing import or component typo
```

### **Styling looks wrong**
- Check you're using correct Tailwind classes
- `bg-black` = black background
- `text-white` = white text
- `text-blue-400` = light blue
- View in DevTools to inspect styles

### **Still stuck?**
1. Take a screenshot
2. Copy any error message
3. Ask CEO
4. Don't guess - ask!

---

## DAILY PROGRESS TRACKING

**Day 1 (Feb 4)**: ✅ Code fixed
**Day 2-4 (Feb 5-7)**: ✅ Directory works
**Day 5-6 (Feb 8-9)**: ✅ Hero + Creator proof
**Day 7-8 (Feb 10-11)**: ✅ Stats + How it works + CTA
**Day 9-10 (Feb 12-13)**: ✅ Styling + Integration
**Day 11 (Feb 14)**: ✅ Final testing + Launch ready

---

## WHAT SUCCESS LOOKS LIKE

When you're completely done:

1. **Code** ✅
   - `npm run build` passes with 0 errors
   - No TypeScript warnings
   - No console errors in browser

2. **Design** ✅
   - Dark background with blue accents
   - 4 creator cards showing earnings
   - 3 value prop cards
   - Clean, organized layout

3. **Message** ✅
   - Every visitor understands: "Creators earn 80% here"
   - Social proof is visible (creator earnings)
   - CTAs are prominent

4. **Performance** ✅
   - Page loads in <2 seconds
   - Lighthouse score 80+
   - Mobile responsive

5. **Ready to Launch** ✅
   - CEO reviews and approves
   - You push to production
   - Marketplace is live

---

**You got this. Ship it.** 🚀
