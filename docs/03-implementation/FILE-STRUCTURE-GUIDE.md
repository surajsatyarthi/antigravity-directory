# FILE STRUCTURE GUIDE
## Where to create/modify files

---

## FILES TO CREATE

### **New Components** (create these 5 files)

```
src/components/
├── HeroSection.tsx                    ← CREATE (600 lines)
├── CreatorProofSection.tsx            ← CREATE (400 lines)
├── StatsBar.tsx                       ← CREATE (150 lines)
├── HowItWorks.tsx                     ← CREATE (200 lines)
└── CTASection.tsx                     ← CREATE (150 lines)
```

### **Example content for HeroSection.tsx:**

```typescript
'use client';

import Link from 'next/link';
import { SearchInput } from './SearchInput';

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
          {/* Card 1: Creators */}
          <div className="p-8 rounded-lg bg-white/5 border border-white/10">
            <h3 className="text-lg font-bold mb-4">💰 Creators Earn</h3>
            <ul className="text-gray-400 space-y-2 text-sm">
              <li>✓ List your tool for free</li>
              <li>✓ Keep 80% of every sale</li>
              <li>✓ First 2 sales commission-free</li>
              <li>✓ Get paid in 2 days</li>
            </ul>
            <Link href="/submit" className="text-blue-400 font-bold mt-6 block hover:text-blue-300">
              Claim Your Tool →
            </Link>
          </div>

          {/* Card 2: Users */}
          <div className="p-8 rounded-lg bg-white/5 border border-white/10">
            <h3 className="text-lg font-bold mb-4">🔍 Users Discover</h3>
            <ul className="text-gray-400 space-y-2 text-sm">
              <li>✓ Browse 2,200+ tools</li>
              <li>✓ Search by category</li>
              <li>✓ Read real reviews</li>
              <li>✓ Support creators</li>
            </ul>
            <Link href="/prompts" className="text-purple-400 font-bold mt-6 block hover:text-purple-300">
              Browse Tools →
            </Link>
          </div>

          {/* Card 3: Companies */}
          <div className="p-8 rounded-lg bg-white/5 border border-white/10">
            <h3 className="text-lg font-bold mb-4">💼 Companies Hire</h3>
            <ul className="text-gray-400 space-y-2 text-sm">
              <li>✓ Post jobs to 500+ devs</li>
              <li>✓ Starting at $299/month</li>
              <li>✓ Targeted to Antigravity experts</li>
              <li>✓ Direct access to talent</li>
            </ul>
            <Link href="/jobs" className="text-green-400 font-bold mt-6 block hover:text-green-300">
              Post a Job →
            </Link>
          </div>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto">
          <SearchInput placeholder="Search MCPs, rules, workflows..." />
        </div>
      </div>
    </section>
  );
}
```

---

## FILES TO MODIFY

### **File 1: src/lib/queries.ts**

**What to change**: Line 7

**Current:**
```typescript
import { resources, categories, ratings, resourceTags, tags, tools, submissions, users } from '@/drizzle/schema';
```

**Change to:**
```typescript
import { resources, categories, ratings, resourceTags, tags, tools, submissions, users, payments } from '@/drizzle/schema';
```

---

### **File 2: src/app/page.tsx**

**What to change**: Add imports at the top (lines 1-20), replace components in render

**Add these imports** (around line 1-20):
```typescript
import { HeroSection } from '@/components/HeroSection';
import { CreatorProofSection } from '@/components/CreatorProofSection';
import { StatsBar } from '@/components/StatsBar';
import { HowItWorks } from '@/components/HowItWorks';
import { CTASection } from '@/components/CTASection';
```

**Find this section** (around line 99-107):
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

**It's already there!** Just verify it's using your new components.

---

## COMPONENT FILE TEMPLATES

### **CreatorProofSection.tsx**

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
      testimonial: "Started 60 days ago. 15 tools, $3k/month. Growing every week."
    }
  ];

  return (
    <section className="py-20 px-4 bg-black text-white border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-black text-center mb-4">Creators Are Earning</h2>
        <p className="text-gray-400 text-center mb-16">500+ creators making real money</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {creators.map(creator => (
            <div
              key={creator.name}
              className="p-6 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            >
              <div className="mb-4">
                <p className="font-bold text-lg">{creator.name}</p>
                <p className="text-blue-400 font-bold text-xl">${creator.earnings.toLocaleString()}/mo</p>
                <p className="text-gray-400 text-sm">{creator.tools} tools listed</p>
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

### **StatsBar.tsx**

```typescript
'use client';

export function StatsBar() {
  const stats = [
    { number: "2,200+", label: "Tools Listed" },
    { number: "500+", label: "Active Creators" },
    { number: "$100k+", label: "Creator Earnings" },
    { number: "5000+", label: "Daily Visitors" },
    { number: "9.8/10", label: "Creator Rating" }
  ];

  return (
    <section className="py-12 px-4 bg-black border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
          {stats.map(stat => (
            <div key={stat.number} className="py-4">
              <p className="text-3xl md:text-4xl font-black text-blue-400">{stat.number}</p>
              <p className="text-gray-400 text-xs md:text-sm mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

### **HowItWorks.tsx**

```typescript
'use client';

export function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Claim Your Tool",
      description: "GitHub login. Takes 2 minutes. You verify, you own it."
    },
    {
      number: "2",
      title: "Set Your Price",
      description: "$9, $29, $99, or custom. You decide what it's worth."
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
              <p className="text-gray-400 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

### **CTASection.tsx**

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
          <Link
            href="/submit"
            className="px-8 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-500 transition-colors"
          >
            Claim Your Tool
          </Link>
          <Link
            href="/prompts"
            className="px-8 py-3 border border-white/20 text-white rounded-lg font-bold hover:border-white/40 transition-colors"
          >
            Browse Tools
          </Link>
          <Link
            href="/jobs"
            className="px-8 py-3 border border-white/20 text-white rounded-lg font-bold hover:border-white/40 transition-colors"
          >
            Post a Job
          </Link>
        </div>
      </div>
    </section>
  );
}
```

---

## FULL FILE TREE (After you're done)

```
src/
├── app/
│   └── page.tsx                  ← MODIFY (add imports + use new components)
├── components/
│   ├── HeroSection.tsx            ← CREATE
│   ├── CreatorProofSection.tsx    ← CREATE
│   ├── StatsBar.tsx              ← CREATE
│   ├── HowItWorks.tsx            ← CREATE
│   ├── CTASection.tsx            ← CREATE
│   ├── SearchInput.tsx           ✓ Already exists
│   ├── CategoryTabs.tsx          ✓ Already exists
│   ├── InfiniteResourceGrid.tsx  ✓ Already exists
│   └── ... other components
└── lib/
    └── queries.ts                ← MODIFY (add payments import)
```

---

## STEP-BY-STEP CREATION

### **Step 1: Create HeroSection.tsx**
- Right-click `src/components/` folder
- "New File"
- Name: `HeroSection.tsx`
- Copy template above
- Save

### **Step 2: Create CreatorProofSection.tsx**
- Repeat process
- Name: `CreatorProofSection.tsx`
- Copy template above
- Save

### **Step 3: Create StatsBar.tsx**
- Name: `StatsBar.tsx`
- Copy template
- Save

### **Step 4: Create HowItWorks.tsx**
- Name: `HowItWorks.tsx`
- Copy template
- Save

### **Step 5: Create CTASection.tsx**
- Name: `CTASection.tsx`
- Copy template
- Save

### **Step 6: Update src/lib/queries.ts**
- Open file
- Find line 7
- Add `payments` to imports
- Save

### **Step 7: Verify src/app/page.tsx**
- Open file
- Check that imports are there
- Check that components are being used
- Save if you made changes

---

## QUICK REFERENCE

**If you're lost, ask:**
- "Where do I put the component?"
  → `src/components/ComponentName.tsx`

- "How do I import a component?"
  → `import { ComponentName } from '@/components/ComponentName';`

- "Where does it go in page.tsx?"
  → In the `{!isBrowsing && ( ... )}` section

- "What's the directory structure?"
  → See "FULL FILE TREE" section above

---

**Use this guide as a checklist. Check off as you go.** ✅
