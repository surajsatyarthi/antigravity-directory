# HOMEPAGE REWRITE SPECIFICATION
## For: Antigravity (Development Lead)
## Priority: 🔴 CRITICAL (Phase 3, Week 4)
## Effort: 1.2 weeks (48 hours)
## RICE Score: 6,500 (highest priority)

---

## 📋 EXECUTIVE SUMMARY

Rewrite googleantigravity.directory homepage from **"Generic directory"** to **"Creator marketplace"**. This is the single most important page for converting visitors into creators and buyers.

**Current State**: Generic "Tools Directory" messaging
**Target State**: Revenue-focused "Build, Share, and Earn" marketplace
**Success Metric**: 40+ creator claims from homepage traffic in Week 2

---

## 🎯 ACCEPTANCE CRITERIA (Phase 3 Ralph Gate)

✅ **Functional Requirements**:
- [ ] Homepage loads in <1.5 seconds (performance critical)
- [ ] All CTAs clickable and functional
- [ ] Responsive on mobile (tested at 375px, 768px, 1024px)
- [ ] Search bar functional (filters working)
- [ ] Category tabs switchable without page reload
- [ ] "Claim Your Tool" button links to `/claim` page
- [ ] "Browse Tools" button links to `/browse` page
- [ ] Social proof numbers auto-update from database

✅ **Design Requirements**:
- [ ] Hero section matches mockup (80% visual fidelity)
- [ ] Typography hierarchy clear (H1 > H2 > H3 > body)
- [ ] Color scheme consistent with brand (primary, secondary, accent)
- [ ] Whitespace adequate (breathing room between sections)
- [ ] Buttons have hover/active states
- [ ] No broken images or missing assets

✅ **SEO Requirements**:
- [ ] Meta title: "Build, Share, and Earn with Antigravity Tools | googleantigravity.directory"
- [ ] Meta description: "The marketplace where 500+ creators monetize their tools. Earn 80% commission."
- [ ] H1 tag: "Build, Share, and Earn with Antigravity"
- [ ] Open Graph tags for social sharing
- [ ] Schema.org markup (WebSite + Organization)

✅ **Analytics**:
- [ ] Google Analytics tracking on all CTAs
- [ ] Event tracking: "Hero CTA Clicked", "Category Changed", "Search Used"
- [ ] Heatmap ready (for Week 5 optimization)

---

## 📐 HOMEPAGE STRUCTURE (Build in this order)

### **Section 1: Header/Navigation**
**File**: `src/components/Header.tsx`
**Effort**: 4 hours

```
┌─────────────────────────────────────────────────┐
│ Logo                          [Nav Items] [CTA] │
│ googleantigravity.directory                     │
│                                                 │
│ - Home                                          │
│ - ✨ Create (Earn 80%)                         │
│ - Browse Tools                                  │
│ - Jobs for Developers                           │
│ - Members                                       │
│ - [Post a Job]                                 │
└─────────────────────────────────────────────────┘
```

**Requirements**:
- Logo links to `/`
- "Create" nav item is primary CTA (accent color)
- "Post a Job" button is secondary CTA (outline style)
- Logo + nav sticky on scroll (or collapsible on mobile)
- Mobile hamburger menu for screens <768px

**Props**:
```typescript
interface Header {
  currentPage: 'home' | 'browse' | 'create' | 'jobs' | 'members'
  userIsLoggedIn: boolean
}
```

---

### **Section 2: Hero Section**
**File**: `src/app/(landing)/page.tsx` - Hero portion
**Effort**: 6 hours

```
┌─────────────────────────────────────────────────────────┐
│                                                          │
│   Build, Share, and Earn with Antigravity             │
│   ─────────────────────────────────────────            │
│   The marketplace where creators monetize their tools   │
│                                                          │
│   [Claim Your Tool]  [Browse Tools]  [Post a Job]      │
│                                                          │
│   ┌──────────────────────────────────────────────────┐ │
│   │ 🔍 Search MCPs, Rules, Workflows...         │ 🔍 │ │
│   └──────────────────────────────────────────────────┘ │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

**Copy** (Exact, from COPYWRITING_STRATEGY.md):
```
HEADLINE:
"Build, Share, and Earn with Antigravity"

SUBHEADING:
"The marketplace where creators monetize their tools
Join 500+ creators earning $1-10k/month"

THREE COLUMNS (below search bar):
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│ 💰 CREATORS │  │ 🔍 USERS    │  │ 💼 COMPANIES│
│ EARN        │  │ DISCOVER    │  │ HIRE        │
│             │  │             │  │             │
│ List free  │  │ Browse      │  │ Post jobs to│
│ Keep 80%   │  │ 2,200+ MCPs │  │ 500+ devs   │
│ First 2    │  │ Find what   │  │ $299/month  │
│ sales free │  │ you need    │  │             │
│ [Claim]    │  │ [Browse]    │  │ [Post Job]  │
└─────────────┘  └─────────────┘  └─────────────┘
```

**Requirements**:
- Background image: Gradient (blue to purple) or subtle Antigravity pattern
- Search bar full-width, centered
- Three columns responsive (stack on mobile)
- CTAs are buttons (not links):
  - "Claim Your Tool" → Primary (accent color)
  - "Browse Tools" → Secondary (outline)
  - "Post a Job" → Secondary (outline)
- Animated elements optional (gradient fade, gentle zoom on scroll)

**TypeScript**:
```typescript
export default function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>Build, Share, and Earn with Antigravity</h1>
        <p className="subheading">
          The marketplace where creators monetize their tools
          <br />
          Join 500+ creators earning $1-10k/month
        </p>

        <div className="three-columns">
          {/* Column 1: Creators */}
          {/* Column 2: Users */}
          {/* Column 3: Companies */}
        </div>

        <SearchBar />
      </div>
    </section>
  )
}
```

---

### **Section 3: "Creators Are Earning" Social Proof**
**File**: `src/components/CreatorProofSection.tsx`
**Effort**: 8 hours

```
┌──────────────────────────────────────────────────────┐
│                                                       │
│  Creators Are Earning                               │
│  ─────────────────────                              │
│  500+ creators earning $1-10k/month                 │
│                                                       │
│  [Card 1]  [Card 2]  [Card 3]  [Card 4]            │
│  ─────────────────────────────────────              │
│                                                       │
│  John                 Sarah                 Alex     │
│  MCP Developer        Workflow Designer     Rules    │
│  $8,200/month         $5,100/month         $1,500/m │
│  27 tools             12 tools             8 tools  │
│                                                       │
│  "Claimed in 60 days" "Started with 1     "Turned   │
│  "Now earning $8.2k"  workflow, now 12"   knowledge │
│  [View Profile]       [View Profile]      into passive"
│                       [View Profile]
│
│  ┌────────────────────────────────────────────────┐
│  │ LIST OF STATS (scrolling or static):           │
│  │ 2,200+ Tools | 500+ Creators | $100k+ Earned  │
│  └────────────────────────────────────────────────┘
│                                                       │
│  [See All Top Creators →]                          │
│                                                       │
└──────────────────────────────────────────────────────┘
```

**Data Source**: Pull from database
```typescript
interface CreatorCard {
  name: string
  role: string
  monthlyEarnings: number
  toolsCount: number
  testimonial: string
  profileUrl: string
  imageUrl: string
}

// Fetch top 4 creators by earnings
const topCreators = await db.select()
  .from(users)
  .where(eq(users.isSeedProfile, false)) // Only real creators (eventually)
  .orderBy(desc(users.totalEarnings))
  .limit(4)
```

**Requirements**:
- Fetch real data from database (start with seed profiles Week 1, replace with real creators Week 3+)
- Cards show: Name, Role, Monthly Earnings, Tools Count, Testimonial
- Hover state: Slight shadow, scale up slightly
- "View Profile" button links to `/u/[username]`
- Stats section updates daily from database
- Mobile: Stack cards vertically or carousel (max 2 per row)

**Testimonials** (From COPYWRITING_STRATEGY.md, use exact wording):
```
Card 1:
Name: John
Role: MCP Creator
Earnings: $8,200/month
Tools: 27 listed
Testimonial: "I listed my MCP on Day 1. Made $800 by Day 7."

Card 2:
Name: Sarah
Role: Workflow Designer
Earnings: $5,100/month
Tools: 12 listed
Testimonial: "Sold my workflow for $29. Made 35 sales in a month = $1,015 revenue (keep $812)"

Card 3:
Name: Alex
Role: Antigravity Expert
Earnings: $1,500/month
Tools: 8 listed
Testimonial: "My rules package is steady $300/month. It's like passive income."

Card 4: (Optional, 4th creator or stat card)
"2,200+ Tools Listed | 500+ Active Creators | 9.8/10 Satisfaction"
```

---

### **Section 4: "How It Works" (3 Steps)**
**File**: `src/components/HowItWorks.tsx`
**Effort**: 4 hours

```
┌──────────────────────────────────────────────────┐
│                                                   │
│  How It Works                                    │
│  ────────────                                    │
│                                                   │
│  1️⃣ Claim Your Tool    2️⃣ Set Your Price    3️⃣ Earn │
│  ─────────────────    ───────────────────    ──────── │
│                                                   │
│  GitHub login               $9, $29, $99,        20% commission │
│  2 minutes setup           or custom             80% to you     │
│  Zero friction             Flexible pricing      Direct payout   │
│                                                   │
│  [Get Started →]          [Browse Successful Creators →]       │
│                                                   │
└──────────────────────────────────────────────────┘
```

**Copy** (From COPYWRITING_STRATEGY.md):
```
HOW IT WORKS:
1. Claim your tool (GitHub login - 2 minutes)
2. Set your price ($9, $29, $99, or custom)
3. Start earning (we handle payment processing)
4. Get promoted (featured on homepage, newsletter)
```

**Requirements**:
- 3 steps in a horizontal row (stack on mobile)
- Icons: 1️⃣ 2️⃣ 3️⃣ or custom SVG icons
- CTA buttons: "Get Started" → `/claim`, "Browse" → `/members`
- Each step has headline + description (2-3 lines max)

---

### **Section 5: Category Showcase**
**File**: `src/components/CategoryShowcase.tsx`
**Effort**: 6 hours

```
┌────────────────────────────────────────────────────────┐
│                                                          │
│  Browse 2,200+ Tools by Category                       │
│  ──────────────────────────────────                    │
│                                                          │
│  [MCPs]    [Rules]    [Workflows]    [Skills]         │
│  ──────────────────────────────────────────────────    │
│                                                          │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐       │
│  │ Database   │  │ Query      │  │ Performance│       │
│  │ MCP        │  │ Optimizer  │  │ Rules      │       │
│  │ ⭐⭐⭐⭐⭐ │  │ $29        │  │ $19        │       │
│  │ $49        │  │ 45 sales   │  │ 32 sales   │       │
│  │ 87 sales   │  │            │  │            │       │
│  │ by John    │  │ by Sarah   │  │ by Alex    │       │
│  │ [Buy Now]  │  │ [Buy Now]  │  │ [Buy Now]  │       │
│  └────────────┘  └────────────┘  └────────────┘       │
│                                                          │
│  [View All Tools →]                                    │
│                                                          │
└────────────────────────────────────────────────────────┘
```

**Requirements**:
- Tabs: MCPs, Rules, Workflows, Skills (toggle without reload)
- Show 3 featured tools per category
- Tool card shows: Name, Price, Rating (stars), # of sales, Creator name, [Buy Now] button
- Fetch data from database (order by sales descending)
- "View All" button → `/browse?category=MCPs`
- Mobile: Horizontal scroll or 2 columns

**TypeScript**:
```typescript
// Query featured tools by category
const featuredMCPs = await db.select()
  .from(resources)
  .where(eq(resources.category, 'MCPs'))
  .orderBy(desc(resources.salesCount))
  .limit(3)

// Similar for Rules, Workflows, Skills
```

---

### **Section 6: Stats Bar**
**File**: `src/components/StatsBar.tsx`
**Effort**: 2 hours

```
┌─────────────────────────────────────────────────┐
│                                                  │
│  2,200+ Tools  |  500+ Creators  |  $100k+     │
│  Listed        |  Earning        |  Creator    │
│                |                 |  Earnings   │
│                                                  │
│  5000+ Daily Visitors | 9.8/10 Satisfaction   │
│                                                  │
└─────────────────────────────────────────────────┘
```

**Requirements**:
- Stats auto-update from database (hourly)
- Stat cards: Icon + Number + Label
- Responsive: 3 rows on mobile, 2 rows on tablet, 1 row on desktop
- Performance: Cache stats every 1 hour

---

### **Section 7: Call-to-Action Section**
**File**: `src/components/CTASection.tsx`
**Effort**: 2 hours

```
┌──────────────────────────────────────────────────┐
│                                                   │
│  Ready to Earn?                                  │
│  ──────────────                                  │
│                                                   │
│  List your tool for free. Keep 80% of sales.    │
│                                                   │
│  [Claim Your Tool] [Browse Tools] [Post Job]   │
│                                                   │
└──────────────────────────────────────────────────┘
```

**Requirements**:
- Three CTA buttons
- Contrasting background color (lighter shade)
- Mobile-friendly (stack buttons on small screens)

---

### **Section 8: Footer**
**File**: `src/components/Footer.tsx`
**Effort**: 2 hours

```
┌────────────────────────────────────────────────┐
│                                                 │
│ Logo        Links                              │
│ googleanti  ├─ Home                           │
│ gravity     ├─ Browse Tools                   │
│ .directory  ├─ Create Account                 │
│             ├─ Jobs                           │
│             ├─ Members                        │
│             ├─ Privacy Policy                 │
│             └─ Terms of Service               │
│                                                 │
│ Social: [Twitter] [GitHub] [Discord]          │
│                                                 │
│ © 2026 googleantigravity.directory             │
│                                                 │
└────────────────────────────────────────────────┘
```

**Requirements**:
- Links to all main pages
- Social media links (Twitter, GitHub, Discord)
- Privacy/Terms pages (link to existing)
- Copyright year auto-updates

---

## 🎨 DESIGN GUIDELINES

### **Color Palette**
```
Primary:    #3B82F6 (Blue - CTAs, highlights)
Secondary:  #8B5CF6 (Purple - accents, hover)
Accent:     #10B981 (Green - success, earnings)
Dark:       #1F2937 (Charcoal - text)
Light:      #F3F4F6 (Gray - backgrounds)
White:      #FFFFFF (Pure white - cards)
```

### **Typography**
```
H1: Poppins Bold, 48px, line-height 1.2
H2: Poppins SemiBold, 32px, line-height 1.3
H3: Poppins SemiBold, 20px, line-height 1.4
Body: Inter Regular, 16px, line-height 1.6
Small: Inter Regular, 14px, line-height 1.5
```

### **Spacing**
```
Section padding: 80px top/bottom (desktop), 40px (mobile)
Component gap: 24px
Card gap: 16px
```

### **Shadows & Borders**
```
Card shadow: 0 1px 3px rgba(0,0,0,0.1)
Hover shadow: 0 4px 12px rgba(0,0,0,0.15)
Border radius: 8px (standard), 12px (large cards)
```

---

## 📱 RESPONSIVE BREAKPOINTS

```
Mobile:   <640px  (1 column, full-width)
Tablet:   640-1024px (2 columns, reduced padding)
Desktop:  >1024px (3+ columns, full layout)
```

---

## ⚡ PERFORMANCE REQUIREMENTS

- **Lighthouse Score**: 80+ (Performance, SEO, Accessibility)
- **Page Load Time**: <1.5s on 4G
- **CLS (Cumulative Layout Shift)**: <0.1 (no jank)
- **First Contentful Paint**: <1s
- **Image Optimization**: WebP format, lazy loading for below-fold

---

## 🧪 TESTING CHECKLIST

Before marking as done:

- [ ] All links functional (no 404s)
- [ ] All CTAs track to GA (event tracking)
- [ ] Responsive design tested at 375px, 768px, 1024px
- [ ] Forms work (search, filters)
- [ ] Database queries don't timeout (< 200ms)
- [ ] Images load without breaks
- [ ] No console errors
- [ ] Mobile viewport meta tag set
- [ ] SEO meta tags present
- [ ] Open Graph tags for social sharing
- [ ] Lighthouse score 80+

---

## 📦 DELIVERABLES

### **Files to Create/Modify**:
1. `src/app/(landing)/page.tsx` - Main homepage
2. `src/components/Header.tsx` - Navigation header
3. `src/components/HeroSection.tsx` - Hero with search
4. `src/components/CreatorProofSection.tsx` - Testimonials + cards
5. `src/components/HowItWorks.tsx` - 3-step process
6. `src/components/CategoryShowcase.tsx` - Category tabs
7. `src/components/StatsBar.tsx` - Stats section
8. `src/components/CTASection.tsx` - Final CTA
9. `src/components/Footer.tsx` - Footer (update if exists)
10. `src/styles/homepage.css` or Tailwind config - Styling

### **Database Queries**:
- `getTopCreators(limit=4)` - Top earners
- `getCategoryTools(category, limit=3)` - Featured by category
- `getStats()` - Total tools, creators, earnings
- All queries cached/optimized

### **Git Commit**:
```
feat: Redesign homepage for creator marketplace
- Add revenue-focused hero section
- Add creator earnings social proof cards
- Add category showcase with featured tools
- Add 3-step "how it works" section
- Implement responsive design (mobile-first)
- Add analytics tracking on all CTAs
- Lighthouse score: 82
```

---

## 🚀 ACCEPTANCE DEFINITION (Ralph Gate)

**You are DONE when**:
1. ✅ All sections built and styled
2. ✅ All CTAs functional (links work, buttons click)
3. ✅ Database queries return data correctly
4. ✅ Responsive on 375px, 768px, 1024px
5. ✅ Lighthouse score 80+
6. ✅ No console errors
7. ✅ GA event tracking implemented
8. ✅ User CEO approval of mockup
9. ✅ Code merged to main

---

## 📅 TIMELINE

**Week 4 Execution**:
- Day 1 (4h): Build Header + Hero
- Day 2 (4h): Build Creator Proof cards + How It Works
- Day 3 (4h): Build Category Showcase + Stats Bar
- Day 4 (4h): Build CTA + Footer + styling
- Day 5 (8h): Testing + responsive + performance optimization
- Day 6 (8h): GA tracking + refinement + CEO approval
- Day 7 (8h): Buffer for fixes + deployment

**Total: 48 hours over 1 week**

---

## ❓ QUESTIONS FOR CLARIFICATION?

Send to Claude/PM:
- [ ] Color palette approved?
- [ ] Testimonial copy exact?
- [ ] Database schema for `creator_stats` table ready?
- [ ] GA tracking event names finalized?
- [ ] Figma design mockup available?

---

**Document Version**: 1.0
**Created**: February 2026
**Status**: Ready for Implementation

🚀 **READY TO BUILD**
