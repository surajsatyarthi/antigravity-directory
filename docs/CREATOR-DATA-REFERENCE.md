# CREATOR DATA & COPY REFERENCE
## Use this for your components

Copy-paste what you need into your components.

---

## FAKE CREATOR DATA

Use this in `CreatorProofSection.tsx`:

```javascript
const creators = [
  {
    name: "John Chen",
    earnings: 8200,
    tools: 27,
    testimonial: "I listed my MCP on Day 1. Made $800 by Day 7. Now it's a consistent $8k/month."
  },
  {
    name: "Sarah Wang",
    earnings: 5100,
    tools: 12,
    testimonial: "Sold my workflow for $29. Made 35 sales in a month = $1,015 revenue (kept $812). It's working!"
  },
  {
    name: "Alex Rodriguez",
    earnings: 1500,
    tools: 8,
    testimonial: "My rules package is steady $1,500/month. It's like passive income. Love this platform."
  },
  {
    name: "Maya Patel",
    earnings: 3200,
    tools: 15,
    testimonial: "Started 60 days ago. 15 tools listed, $3,200/month. Growing every single week."
  }
];
```

---

## COPY & MESSAGING

### **Hero Headline** (Choose one or write your own)

Option 1:
```
BUILD, SHARE, AND EARN
```

Option 2:
```
Build Your Tools. Sell Them. Keep 80%.
```

Option 3:
```
Where Antigravity Creators Make Real Money
```

### **Hero Subheading**

Option 1:
```
The marketplace where creators keep 80% commission.
Join 500+ creators earning $1-10k/month.
```

Option 2:
```
Forget 30% commission. We pay creators 80%.
You build it. You sell it. You keep the money.
```

Option 3:
```
The only marketplace designed for creator profit.
Highest commission. Fastest payouts. Real community.
```

### **Value Prop Cards**

#### **Creators Card**
```
Title: 💰 Creators Earn

Points:
✓ List your tool for free
✓ Keep 80% of every sale
✓ First 2 sales commission-free
✓ Get paid in 2 days

Button: Claim Your Tool →
```

#### **Users Card**
```
Title: 🔍 Users Discover

Points:
✓ Browse 2,200+ tools
✓ Search by category
✓ Read real reviews
✓ Support creators

Button: Browse Tools →
```

#### **Companies Card**
```
Title: 💼 Companies Hire

Points:
✓ Post jobs to 500+ devs
✓ Starting at $299/month
✓ Targeted to Antigravity experts
✓ Direct access to talent

Button: Post a Job →
```

### **How It Works - 3 Steps**

```
1️⃣ CLAIM YOUR TOOL
   GitHub login. Takes 2 minutes.
   You verify, you own it.

2️⃣ SET YOUR PRICE
   $9, $29, $99, or custom.
   You decide what it's worth.

3️⃣ EARN 80%
   Every sale, you keep $80 of $100.
   We handle payments. You get paid in 2 days.
```

### **Final CTA Section**

```
Headline: Ready to Earn?

Subheading:
List your tool for free. Keep 80% of every sale.
No monthly fees. No commissions on first 2 sales.

Buttons:
[Claim Your Tool] [Browse Tools] [Post a Job]
```

### **Stats Bar**

```
2,200+         500+            $100k+         5000+          9.8/10
Tools Listed   Active Creators Creator Earnings Daily Visitors Creator Rating
```

---

## COLOR SCHEME

Use these Tailwind classes:

```
Background:   bg-black
Text:         text-white
Heading:      text-blue-400 or text-white font-black
Body:         text-gray-400
Accent:       text-blue-400 (primary), text-purple-400 (secondary)
Cards:        bg-white/5 border border-white/10
Hover:        hover:bg-white/10 hover:text-blue-300
Buttons:
  Primary:    bg-blue-600 hover:bg-blue-500 text-white font-bold
  Secondary:  border border-white/20 hover:border-white/40 text-white
```

---

## STATS (Hardcoded Numbers)

These are fake/estimated. Hardcode them in `StatsBar.tsx`:

```javascript
2200  // Tools listed (from scrape)
500   // Active creators (assumption)
100000 // Creator earnings total ($)
5000  // Daily visitors (projection)
9.8   // Creator satisfaction (fake rating)
```

---

## BUTTON LINKS

Where buttons should link:

```
"Claim Your Tool"  → /submit
"Browse Tools"     → /prompts
"Post a Job"       → /jobs
```

---

## SIZE & SPACING REFERENCE

```
Hero Headline:    text-5xl md:text-7xl
Subheadings:      text-xl md:text-2xl
Card Titles:      text-lg
Body Text:        text-base
Small Text:       text-sm

Padding:          px-4 py-16 md:py-20
Card Padding:     p-6 md:p-8
Gap:              gap-6 md:gap-8

Max Width:        max-w-6xl
Grid:             grid-cols-1 md:grid-cols-3
```

---

## RESPONSIVE DESIGN

Test at these widths:

```
Mobile:   375px  (iPhone SE)
Tablet:   768px  (iPad)
Desktop:  1024px+ (Desktop)
```

Use Tailwind breakpoints:
```
Base:       Default (mobile first)
md:         768px and up
lg:         1024px and up
xl:         1280px and up
```

Example:
```typescript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
  {/* 1 column mobile, 2 columns tablet, 4 columns desktop */}
</div>
```

---

## DARK THEME EXAMPLES

**Card with border:**
```tsx
<div className="p-8 rounded-lg bg-white/5 border border-white/10">
  {/* Content */}
</div>
```

**Card with hover:**
```tsx
<div className="p-8 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
  {/* Content */}
</div>
```

**Button styling:**
```tsx
<button className="px-8 py-3 bg-blue-600 rounded-lg font-bold hover:bg-blue-500 transition-colors">
  Click me
</button>
```

**Text gradient (optional):**
```tsx
<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
  Gradient text
</span>
```

---

## IMPORTS YOU'LL NEED

```typescript
// In your component files
import Link from 'next/link';
import { SearchInput } from './SearchInput'; // Already exists
```

---

## COMMON MISTAKES TO AVOID

❌ **Don't do this:**
- Fetch creator earnings from database
- Query for real statistics
- Build complex database aggregations
- Add animations/transitions (waste of time)
- Build admin panels or settings
- Add configurability

✅ **Do this:**
- Hardcode numbers in components
- Use static fake creator data
- Keep it simple and fast
- Copy styles from existing components
- Reuse what already exists
- Ship it

---

## TESTING COPY IN BROWSER

When you run `npm run dev`, open http://localhost:3000

**Look for**:
1. ✅ Headline says "EARN" or "MONEY" somewhere
2. ✅ You see 4 creator cards with earnings ($)
3. ✅ You see 3 value prop cards (Creators/Users/Companies)
4. ✅ You see "How it works" with 3 steps
5. ✅ You see final CTA "Ready to earn?"
6. ✅ At least 3 buttons visible above the resource grid
7. ✅ Dark background with blue/purple accents
8. ✅ No errors in DevTools console
9. ✅ Page doesn't look broken on mobile (375px)

If all 9 are ✅, you're good.

---

## LAST-MINUTE POLISH

If you have time left:
- Add subtle hover effects on cards
- Make buttons slightly bigger
- Add smooth transitions (1-2 seconds)
- Check spacing between sections
- Verify font sizes are readable
- Test font loading (no FOUT flashes)

If you DON'T have time:
- Ship as-is. It's good enough.
- Better to launch on time than perfect later.
- Users care about features, not pixel-perfect design.

---

**Reference this while building. Copy what you need.** ✨
