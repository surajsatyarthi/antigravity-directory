# CURRENT TASK — TASK-017: Homepage Layout Revamp + NewsletterCapture Fix
**Assigned by**: Claude Code (PM)
**Date**: 2026-03-09
**Priority**: HIGH
**Tier**: L (new query function + new component + page.tsx rewrite + 1 bug fix)

---

## CONTEXT

Current homepage shows all resources in an infinite scroll grid (LoadMoreResourceGrid).
New layout: 5 resources per each of the 10 categories, with a "View all →" link to the category page.
This matches the cursor.directory pattern of categorised content discovery.

Also carries forward a known missed fix from TASK-016: NewsletterCapture success state has `text-slate-900` on two lines — black text on dark background, invisible to users.

---

## MANDATORY CROSS-CHECK PROTOCOL

Before making ANY change: open the file, find the exact line listed, confirm the PM VERIFIED CONTENT matches what you see. If it does NOT match — STOP and report to PM. Do not implement that fix.

---

## FIX 0 — NewsletterCapture success state (missed from TASK-016)
**File**: `src/components/NewsletterCapture.tsx`

**Line 37 — PM VERIFIED CONTENT:**
```
<CheckCircle2 className="w-8 h-8 text-slate-900" />
```
OLD: `text-slate-900`
NEW: `text-white`

**Line 39 — PM VERIFIED CONTENT:**
```
<h3 className="text-3xl font-black text-slate-900 mb-2 tracking-tighter uppercase italic">Access Granted</h3>
```
OLD: `text-slate-900`
NEW: `text-white`

---

## FIX 1 — New query function in `src/lib/queries.ts`

**PM VERIFIED CONTENT — confirmed existing exports:**
- Line 158: `export async function getFilteredResources`
- Line 177: `export async function getFeaturedResources`
- Line 225: `export async function getCategoriesWithCounts`
- No existing `getResourcesByCategorySlug` function — must be added.

**Add this new function** (append after the last export, before end of file):

```typescript
export async function getResourcesByCategorySlug(
  slug: string,
  limit: number = 5
): Promise<ResourceWithRelations[]> {
  const categoryRecord = await db
    .select({ id: categories.id })
    .from(categories)
    .where(eq(categories.slug, slug))
    .limit(1);

  if (!categoryRecord.length) return [];

  const categoryId = categoryRecord[0].id;

  return db
    .select()
    .from(resources)
    .where(and(eq(resources.status, 'LIVE'), eq(resources.categoryId, categoryId)))
    .orderBy(desc(resources.createdAt))
    .limit(limit) as Promise<ResourceWithRelations[]>;
}
```

---

## FIX 2 — New component: `src/components/CategorySection.tsx`

**Create this file** (does not currently exist):

```tsx
import Link from 'next/link';
import { ResourceCard } from './ResourceCard';
import type { ResourceWithRelations } from '@/types/database';

interface CategorySectionProps {
  name: string;
  slug: string;
  icon: string;
  resources: ResourceWithRelations[];
  totalCount: number;
}

export function CategorySection({ name, slug, icon, resources, totalCount }: CategorySectionProps) {
  if (!resources.length) return null;

  return (
    <section className="py-8 max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/[0.05]">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white font-black text-lg uppercase tracking-tight flex items-center gap-2">
          <span>{icon}</span>
          <span>{name}</span>
        </h2>
        <Link
          href={`/${slug}`}
          className="text-[11px] font-semibold text-gray-400 hover:text-white transition-colors tracking-wide uppercase"
        >
          View all {totalCount} →
        </Link>
      </div>
      <div className="flex flex-col gap-2">
        {resources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
    </section>
  );
}
```

---

## FIX 3 — Homepage `src/app/page.tsx` — full rewrite

**PM VERIFIED CONTENT — current imports to remove:**

- Line 4: `import { CategoryGridDiscovery } from '@/components/CategoryGridDiscovery';`
- Line 6: `import { FilterPersistenceManager } from '@/components/filters/FilterPersistenceManager';`
- Line 7: `import { LoadMoreResourceGrid } from '@/components/LoadMoreResourceGrid';`
- Line 9: `import { FeaturedSection } from '@/components/FeaturedSection';`
- Line 10: `import { fetchResourcesAction } from '@/app/actions/get-resources';`
- Line 11: `import { validateCategorySlugs, getFeaturedResources } from '@/lib/queries';`
- Line 12: `import { validateFilterParams } from '@/lib/validation';`

**PM VERIFIED CONTENT — current JSX to remove:**

- Line 110: `<FilterPersistenceManager />`
- Line 115: `{/* Hero */}` (stale comment — already fixed in TASK-016)
- Line 119: `<CategoryGridDiscovery />`
- Lines 127–133: `{featuredResources.length > 0 && (<FeaturedSection .../>)}`
- Lines 135–142: `<section id="directory" ...><LoadMoreResourceGrid .../></section>`

**PM VERIFIED CONTENT — current data fetching to remove (lines 49–84):**
All filter logic, `validateCategorySlugs`, `validateFilterParams`, `fetchResourcesAction` calls.

---

**New `page.tsx` — replace the entire file with this:**

```tsx
import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { SponsoredCard } from '@/components/SponsoredCard';
import { CategorySection } from '@/components/CategorySection';
import { getResourcesByCategorySlug, getCategoriesWithCounts } from '@/lib/queries';
import dynamic from 'next/dynamic';

const NewsletterCapture = dynamic(() => import('@/components/NewsletterCapture').then(mod => mod.NewsletterCapture), {
  ssr: true
});

export const metadata: Metadata = {
  title: "Antigravity Directory — MCP Servers, Skills, Rules & Prompts for Google Antigravity IDE",
  description: "The free directory of Google Antigravity IDE resources. Browse 3,000+ MCP servers, rules, prompts, skills and workflows — all free.",
  openGraph: {
    title: "Antigravity Directory — MCP Servers, Skills, Rules & Prompts for Google Antigravity IDE",
    description: "Browse 3,000+ free MCP servers, rules, prompts and workflows for Google Antigravity IDE.",
    type: "website",
    url: "https://googleantigravity.directory"
  },
  alternates: {
    canonical: "https://googleantigravity.directory"
  }
};

const CATEGORIES = [
  { slug: 'mcp-servers',     name: 'MCP Servers',    icon: '🔌' },
  { slug: 'skills',          name: 'Skills',          icon: '⚡' },
  { slug: 'rules',           name: 'Rules',           icon: '📋' },
  { slug: 'workflows',       name: 'Workflows',       icon: '🔄' },
  { slug: 'prompts',         name: 'Prompts',         icon: '💬' },
  { slug: 'agents',          name: 'Agents',          icon: '🤖' },
  { slug: 'boilerplates',    name: 'Boilerplates',    icon: '📦' },
  { slug: 'tutorials',       name: 'Tutorials',       icon: '📚' },
  { slug: 'cheatsheets',     name: 'Cheatsheets',     icon: '📄' },
  { slug: 'troubleshooting', name: 'Troubleshooting', icon: '🔧' },
];

export default async function HomePage() {
  const [categorySections, categoryCounts] = await Promise.all([
    Promise.all(
      CATEGORIES.map(async (cat) => ({
        ...cat,
        resources: await getResourcesByCategorySlug(cat.slug, 5),
      }))
    ),
    getCategoriesWithCounts(),
  ]);

  const countMap = Object.fromEntries(
    categoryCounts.map((c: any) => [c.slug, c.count])
  );

  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Antigravity Directory",
            "url": "https://googleantigravity.directory",
            "description": "The #1 resource directory for Google Antigravity IDE",
            "potentialAction": {
              "@type": "SearchAction",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://googleantigravity.directory/?q={search_term_string}"
              },
              "query-input": "required name=search_term_string"
            }
          })
        }}
      />

      <main className="min-h-screen bg-black text-white selection:bg-blue-500/30">
        {/* Hero */}
        <HeroSection />

        {/* Ad slot */}
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 pb-4">
          <SponsoredCard />
        </div>

        {/* Category sections — 5 resources each */}
        {categorySections.map((cat) => (
          <CategorySection
            key={cat.slug}
            name={cat.name}
            slug={cat.slug}
            icon={cat.icon}
            resources={cat.resources}
            totalCount={countMap[cat.slug] ?? 0}
          />
        ))}

        {/* Passive email collection */}
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 mt-20 pt-20 border-t border-white/[0.05] pb-24 text-center">
          <NewsletterCapture source="homepage" />
        </div>
      </main>
    </>
  );
}
```

---

## PHASE 2 — BUILD + LINT

```bash
npm run build
npm run lint
```
Both must exit 0. If either fails — stop, report the full error output, do not commit.

---

## PHASE 3 — SCREENSHOTS + EVIDENCE

```bash
curl -o /dev/null -s -w "%{http_code}\n" http://localhost:3000
curl -o /dev/null -s -w "%{http_code}\n" http://localhost:3000/mcp-servers
curl -o /dev/null -s -w "%{http_code}\n" http://localhost:3000/skills
curl -o /dev/null -s -w "%{http_code}\n" http://localhost:3000/rules
curl -o /dev/null -s -w "%{http_code}\n" http://localhost:3000/advertise
curl -o /dev/null -s -w "%{http_code}\n" http://localhost:3000/submit
```

Then commit:
```bash
git add -A
git commit -m "feat(homepage): category sections — 5 resources per category, cursor.directory pattern"
git log --oneline -1
git diff HEAD~1 HEAD
```

---

## MANDATORY REPORT FORMAT

```
TASK-017 REPORT
==============================

--- CROSS-CHECK RESULTS ---
Fix 0 NewsletterCapture line 37 matches: [YES/NO]
Fix 0 NewsletterCapture line 39 matches: [YES/NO]
Fix 1 queries.ts — getResourcesByCategorySlug added: [YES/NO]
Fix 2 CategorySection.tsx — file created: [YES/NO]
Fix 3 page.tsx — CategoryGridDiscovery removed: [YES/NO]
Fix 3 page.tsx — LoadMoreResourceGrid removed: [YES/NO]
Fix 3 page.tsx — FeaturedSection removed: [YES/NO]
Fix 3 page.tsx — FilterPersistenceManager removed: [YES/NO]
Fix 3 page.tsx — 10 category sections render: [YES/NO]

--- BUILD + LINT ---
npm run build exit code: [0 / error]
npm run build full output:
[paste]

npm run lint exit code: [0 / error]
npm run lint full output:
[paste]

--- GIT ---
Commit hash: [paste]
Diff:
[paste git diff HEAD~1 HEAD]

--- SCREENSHOTS ---
Homepage (all 10 category sections visible):
[ATTACH SCREENSHOT]
Observations: [each category shows 5 cards + View all link?]

/mcp-servers after:
[ATTACH SCREENSHOT]

--- HTTP STATUS PER PAGE ---
http://localhost:3000 → [status code]
http://localhost:3000/mcp-servers → [status code]
http://localhost:3000/skills → [status code]
http://localhost:3000/rules → [status code]
http://localhost:3000/advertise → [status code]
http://localhost:3000/submit → [status code]

--- BROWSER CONSOLE ---
Errors: [paste or "none"]

--- NETWORK TAB ---
DB data loading: [yes/no — paste one API response excerpt]

--- SCREEN RECORDING (MANDATORY) ---
[ATTACH RECORDING — scroll homepage showing all 10 category sections, click one "View all" link]
Missing recording = task not done.

--- BUGS SPOTTED (do not fix, report only) ---
1.
2.
3.
```

---

## DO NOT DO
- Do NOT touch any files not listed above
- Do NOT add search/filter back to homepage (search stays in header, redirects stay as-is)
- Do NOT modify the category pages (`src/app/[slug]/page.tsx`)
- Report all bugs spotted — PM decides what to fix next
