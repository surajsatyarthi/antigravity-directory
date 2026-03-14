import { Suspense } from 'react';
import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { SponsoredCard } from '@/components/SponsoredCard';
import { CategorySection } from '@/components/CategorySection';
import { getResourcesByCategorySlug, getCategoriesWithCounts } from '@/lib/queries';
import dynamicImport from 'next/dynamic';

export const revalidate = 3600; // ISR — rebuild homepage at most once per hour

const NewsletterCapture = dynamicImport(() => import('@/components/NewsletterCapture').then(mod => mod.NewsletterCapture), {
  ssr: true
});

export const metadata: Metadata = {
  title: "Antigravity Directory — MCP Servers, Skills, Rules & Prompts for Google Antigravity IDE",
  description: "The free directory of Google Antigravity IDE resources. Browse 3,000+ MCP servers, rules, prompts, skills and workflows — all free.",
  openGraph: {
    title: "Antigravity Directory — MCP Servers, Skills, Rules & Prompts for Google Antigravity IDE",
    description: "Browse 3,000+ free MCP servers, rules, prompts and workflows for Google Antigravity IDE.",
    type: "website",
    url: "https://www.googleantigravity.directory"
  },
  alternates: {
    canonical: "https://www.googleantigravity.directory"
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

// Async server component — fetches its own data so it can be Suspense-streamed
async function CategorySectionAsync({
  slug, name, icon, totalCount,
}: { slug: string; name: string; icon: string; totalCount: number }) {
  const resources = await getResourcesByCategorySlug(slug, 5);
  return (
    <CategorySection
      name={name}
      slug={slug}
      icon={icon}
      resources={resources}
      totalCount={totalCount}
    />
  );
}

// Async component for hero stat — fetches total resource count separately
async function HeroSectionAsync() {
  const categoryCounts = await getCategoriesWithCounts();
  const total = categoryCounts.reduce((sum: number, c: any) => sum + (Number(c.count) || 0), 0);
  return <HeroSection totalCount={total} />;
}

// Async component for category shells — fetches counts for "View all N" links
async function CategorySectionsBlock() {
  const categoryCounts = await getCategoriesWithCounts();
  const countMap = Object.fromEntries(
    categoryCounts.map((c: any) => [c.slug, c.count])
  );

  return (
    <div id="directory">
      {CATEGORIES.map((cat) => (
        <Suspense key={cat.slug} fallback={null}>
          <CategorySectionAsync
            slug={cat.slug}
            name={cat.name}
            icon={cat.icon}
            totalCount={countMap[cat.slug] ?? 0}
          />
        </Suspense>
      ))}
    </div>
  );
}

export default async function HomePage() {
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
            "url": "https://www.googleantigravity.directory",
            "description": "The #1 resource directory for Google Antigravity IDE"
          })
        }}
      />

      <main className="min-h-screen bg-black text-white selection:bg-blue-500/30">
        {/* Hero — streams in with total count */}
        <Suspense fallback={<HeroSection />}>
          <HeroSectionAsync />
        </Suspense>

        {/* Ad slot — renders immediately */}
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 pb-4">
          <SponsoredCard />
        </div>

        {/* Category sections stream in progressively */}
        <Suspense fallback={null}>
          <CategorySectionsBlock />
        </Suspense>

        {/* Newsletter — renders immediately */}
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 mt-20 pt-20 border-t border-white/[0.05] pb-24 text-center">
          <NewsletterCapture source="homepage" />
        </div>
      </main>
    </>
  );
}
