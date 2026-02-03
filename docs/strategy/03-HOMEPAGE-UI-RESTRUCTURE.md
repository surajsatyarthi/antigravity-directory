# HOMEPAGE UI RESTRUCTURE: Clean Design Like Cursor.Directory

**Goal**: Create a clean, scannable homepage and header that showcases Antigravity content categories prominently
**Inspiration**: cursor.directory's minimal navigation and category-first design
**Priority**: Fix header clutter, add category showcases to homepage

---

## PROBLEM ANALYSIS

### Current Header Structure (TOO CLUTTERED)
```
[Logo] [Search] | Download | Help | Resources▼ | Community▼ | Advertise | [Submit] [Profile]
```

**Issues:**
1. **Hidden categories** - Prompts, Workflows, MCPs, Skills buried in "Resources" dropdown
2. **Low-priority items** taking valuable header space (Download, Help, Advertise)
3. **Dropdowns** make navigation slower (extra click)
4. **No category visibility** - Users don't see what content you have

### Current Homepage Structure
```
[DirectoryIntelligence] → [Testimonials] → [Sidebar Filters] | [Resource Grid]
```

**Issues:**
1. **No category showcases** - Just a filtered grid
2. **Categories hidden in sidebar** - Only visible after scrolling
3. **No featured sections** - cursor.directory shows "Featured MCPs", "Featured Jobs" prominently
4. **Looks like a generic directory** - Not differentiated

---

## CURSOR.DIRECTORY'S WINNING FORMULA

### Their Header (8 Items - CLEAN)
```
[Logo] | Rules | Trending | Jobs | MCPs | Generate | Members | More▼ | [Submit]
```

**Why It Works:**
1. ✅ **Primary categories at top level** - Rules, Jobs, MCPs directly accessible
2. ✅ **No dropdowns** for main content (only "More" for secondary)
3. ✅ **Action-focused** - Generate, Submit CTAs prominent
4. ✅ **Community visible** - Members link builds social proof

### Their Homepage
```
[Search Bar] → [Featured MCPs] → [Featured Jobs] → [Category Tabs: TypeScript | Python | React | etc.]
```

**Why It Works:**
1. ✅ **Category showcases** - Users see content variety immediately
2. ✅ **Featured sections** - Best content surfaced
3. ✅ **Technology filters** - TypeScript (23), Python (16), Next.js (12) with counts
4. ✅ **Visual hierarchy** - Clear sections, not just infinite scroll

---

## PROPOSED SOLUTION

### NEW Header Structure (9 Items - CLEAN)
```
[Logo] [Search] | Rules | Prompts | MCPs | Workflows | Skills | Members | More▼ | [Submit] [Profile]
```

**Changes:**
1. **Remove from header**: Download, Help, Community dropdown, Advertise
2. **Add directly to header**: Rules, Prompts, MCPs, Workflows, Skills (primary categories)
3. **Add "Members" link** (for future community - cursor.directory has this)
4. **Create "More" dropdown** for secondary items:
   - Help / Troubleshooting
   - Download Antigravity
   - Advertise
   - Community (Discord link)
   - About / Blog

**File Changes:**
- `src/config/navigation.ts` - Restructure NAV_ITEMS
- `src/components/MarketplaceHeader.tsx` - Keep minimal
- `src/components/NavLinks.tsx` - Render new structure

### NEW Homepage Structure
```
[Hero Section with Search]
↓
[Category Tabs: All | Rules | Prompts | MCPs | Workflows | Skills]
↓
[Featured Section for Active Tab]
↓
[Resource Grid for Active Tab]
↓
[Newsletter Capture]
```

**Changes:**
1. **Add hero section** with large search bar (like cursor.directory)
2. **Add category tab navigation** - Like TypeScript/Python/React tabs on cursor.directory
3. **Add "Featured" sections** - Showcase best content per category
4. **Keep infinite scroll** for main content
5. **Move testimonials** to footer or separate page

**File Changes:**
- `src/app/page.tsx` - Restructure layout
- `src/components/CategoryTabs.tsx` - NEW: Tab navigation component
- `src/components/FeaturedSection.tsx` - NEW: Featured resources per category
- `src/components/HeroSearch.tsx` - NEW: Large hero search

---

## IMPLEMENTATION PLAN

### PHASE 1: Header Cleanup (2 hours)

**1.1 Restructure Navigation Config** (30 mins)
File: `src/config/navigation.ts`

**Remove:**
- Download (move to More)
- Help (move to More)
- Resources dropdown (explode to top level)
- Community dropdown (move to More)
- Advertise (move to More)

**Add at Top Level:**
- Rules
- Prompts
- MCPs
- Workflows
- Skills
- Members (link to /members when built, placeholder for now)

**Add "More" Dropdown:**
```typescript
{
  label: 'More',
  href: '#',
  children: [
    { label: 'Troubleshooting', href: '/troubleshooting' },
    { label: 'Download Antigravity', href: '/download' },
    { label: 'Advertise', href: '/advertise' },
    { label: 'Community', href: 'https://discord.gg/antigravity', external: true },
    { label: 'About', href: '/about' },
  ]
}
```

**New Navigation:**
```typescript
export const NAV_ITEMS: NavItem[] = [
  { label: 'Rules', href: '/rules' },
  { label: 'Prompts', href: '/prompts', isNew: true },
  { label: 'MCPs', href: '/mcp-servers' },
  { label: 'Workflows', href: '/workflows' },
  { label: 'Skills', href: '/skills' },
  { label: 'Members', href: '/members' }, // Future community
  {
    label: 'More',
    href: '#',
    children: [
      { label: 'Troubleshooting', href: '/troubleshooting' },
      { label: 'Download', href: '/download' },
      { label: 'Advertise', href: '/advertise' },
      { label: 'Community', href: 'https://discord.gg/antigravity', external: true },
    ]
  },
];
```

**1.2 Update MarketplaceHeader** (30 mins)
File: `src/components/MarketplaceHeader.tsx`

**Changes:**
- Keep current structure (Logo, Search, NavLinks, Submit, Profile)
- No structural changes needed - just navigation config drives it
- Ensure search bar stays centered
- Keep sticky header behavior

**1.3 Test Header** (1 hour)
- Desktop: All links visible, no wrapping
- Mobile: Hamburger menu works
- Search bar functional
- Dropdowns work ("More" menu)

---

### PHASE 2: Homepage Restructure (4 hours)

**2.1 Create CategoryTabs Component** (1 hour)
File: `src/components/CategoryTabs.tsx`

**Features:**
- Horizontal tab bar: All | Rules | Prompts | MCPs | Workflows | Skills
- Active state styling (like cursor.directory)
- Shows resource count per category: "MCPs (1,234)"
- Sticky below header when scrolling
- Client-side filtering (fast)

**Design:**
```tsx
<div className="border-b border-white/[0.05] bg-black sticky top-14 z-40">
  <div className="max-w-7xl mx-auto px-4 flex gap-6 overflow-x-auto">
    <button className="px-4 py-3 text-white border-b-2 border-blue-500">
      All (2,456)
    </button>
    <button className="px-4 py-3 text-gray-400 hover:text-white">
      Rules (423)
    </button>
    {/* ... */}
  </div>
</div>
```

**2.2 Create FeaturedSection Component** (1.5 hours)
File: `src/components/FeaturedSection.tsx`

**Features:**
- Shows 4-6 featured resources per category
- Horizontal scrollable cards
- "View All →" link to category page
- Only shown when category tab is active

**Design (like cursor.directory):**
```tsx
<section className="mb-12">
  <h2 className="text-2xl font-bold mb-6">Featured MCPs</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {featuredMCPs.map(mcp => (
      <ResourceCard key={mcp.id} resource={mcp} featured />
    ))}
  </div>
  <Link href="/mcp-servers" className="text-blue-400 hover:underline">
    View all MCPs →
  </Link>
</section>
```

**2.3 Create HeroSearch Component** (1 hour)
File: `src/components/HeroSearch.tsx`

**Features:**
- Large search bar prominently displayed
- Placeholder: "Search for Antigravity rules, MCPs, workflows..."
- Search suggestions dropdown (popular searches)
- Quick action buttons: "Browse Rules", "View MCPs"

**Design:**
```tsx
<div className="py-16 text-center">
  <h1 className="text-4xl font-bold mb-4">
    Discover Antigravity Resources
  </h1>
  <p className="text-gray-400 mb-8">
    500+ curated MCPs, rules, and workflows for Google Antigravity IDE
  </p>
  <div className="max-w-2xl mx-auto">
    <SearchInput large />
  </div>
</div>
```

**2.4 Restructure Homepage** (30 mins)
File: `src/app/page.tsx`

**New Layout:**
```tsx
return (
  <>
    <MarketplaceHeader />

    <main className="min-h-screen bg-black">
      {/* Hero Section with Search */}
      <HeroSearch />

      {/* Category Tabs */}
      <CategoryTabs
        categories={categoriesWithCounts}
        activeCategory={activeCategory}
      />

      {/* Featured Section (per active tab) */}
      {activeCategory && (
        <FeaturedSection
          category={activeCategory}
          resources={featuredResources}
        />
      )}

      {/* Main Resource Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <InfiniteResourceGrid
          initialResources={filteredResources}
          initialTotalCount={totalCount}
        />
      </div>

      {/* Newsletter */}
      <NewsletterCapture source="homepage" />
    </main>
  </>
);
```

**Changes:**
- Remove DirectoryIntelligence (move to /about page)
- Remove Testimonials (move to footer or /about)
- Remove FilterSidebar (replaced by CategoryTabs)
- Add HeroSearch at top
- Add CategoryTabs below hero
- Add FeaturedSection per category
- Keep InfiniteResourceGrid for main content

---

## VISUAL COMPARISON

### BEFORE (Current - Cluttered)
```
Header: [Logo][Search] Download | Help | Resources▼ | Community▼ | Advertise | Submit
Homepage: DirectoryIntelligence → Testimonials → [Sidebar] | [Grid]
```

### AFTER (Clean - cursor.directory style)
```
Header: [Logo][Search] Rules | Prompts | MCPs | Workflows | Skills | Members | More▼ | Submit
Homepage: Hero Search → Category Tabs → Featured Section → Grid
```

**Key Improvements:**
1. ✅ **Header**: 5 primary categories visible (not hidden)
2. ✅ **Homepage**: Category-first design with featured sections
3. ✅ **Navigation**: 1 click to any category (not 2 with dropdown)
4. ✅ **Discovery**: Featured content surfaces best resources
5. ✅ **Visual**: Clean, scannable, professional

---

## FILES TO MODIFY

### Phase 1: Header (2 hours)
1. `src/config/navigation.ts` - Restructure NAV_ITEMS
2. `src/components/NavLinks.tsx` - No changes (driven by config)
3. `src/components/MarketplaceHeader.tsx` - No changes needed

### Phase 2: Homepage (4 hours)
1. `src/app/page.tsx` - Restructure layout
2. `src/components/CategoryTabs.tsx` - NEW component
3. `src/components/FeaturedSection.tsx` - NEW component
4. `src/components/HeroSearch.tsx` - NEW component
5. `src/components/SearchInput.tsx` - Add "large" variant prop

---

## CURSOR.DIRECTORY DESIGN REFERENCES

**Header:**
- 8 primary navigation items
- Clean sans-serif font
- Minimal spacing
- No visual noise

**Homepage:**
- Large search bar with placeholder text
- Horizontal category tabs with counts
- Featured sections per category
- Card-based grid layout
- Consistent spacing

**Key Principle:** **Content-first, not chrome-first**

---

## SUCCESS METRICS

### Header Improvements
- [ ] Navigation items reduced from 7 to 6 (but 5 categories now visible)
- [ ] Zero dropdowns for primary categories
- [ ] "More" dropdown for secondary items only
- [ ] Search bar remains centered and prominent

### Homepage Improvements
- [ ] Hero search prominently displayed
- [ ] Category tabs visible without scrolling
- [ ] Featured section shows best 4-6 resources per category
- [ ] Resource counts shown per category
- [ ] Cleaner visual hierarchy

### User Experience
- [ ] 1-click access to any category (was 2 clicks with dropdown)
- [ ] Immediate visibility of content types (Rules, MCPs, etc.)
- [ ] Featured content discovery (best resources surfaced)
- [ ] Faster navigation (no dropdown delay)

---

## IMPLEMENTATION PRIORITY

**Week 1: Header Cleanup**
- Day 1: Restructure navigation config (2 hours)
- Day 2: Test across devices (1 hour)
- **Ship it** (header is immediately cleaner)

**Week 2: Homepage Restructure**
- Day 1-2: Build CategoryTabs component (1 hour)
- Day 3: Build FeaturedSection component (1.5 hours)
- Day 4: Build HeroSearch component (1 hour)
- Day 5: Integrate into homepage (1 hour)
- **Ship it** (homepage now category-first)

**Total Effort: 6 hours**

---

## WHY THIS MATTERS

**Current State:** Users land on homepage, see testimonials, have to open "Resources" dropdown to find MCPs/Rules

**After This Change:** Users land on homepage, see categories immediately in header AND homepage, featured content guides discovery

**Result:**
- Lower bounce rate (immediate value visible)
- Higher engagement (featured sections guide discovery)
- Better SEO (category pages linked from homepage)
- Professional appearance (like cursor.directory)

**This is the "Google vs Yahoo" UX advantage in action.**

---

## CURSOR.DIRECTORY SPECIFIC LEARNINGS

From analyzing their site:
1. **Categories in header** - Not hidden in dropdowns
2. **Counts everywhere** - "TypeScript (23)" gives users expectations
3. **Featured sections** - Surface best content per category
4. **Minimal chrome** - No clutter, just content
5. **Tab navigation** - Easy category switching without page reload

**Apply these principles to antigravity.directory.**
