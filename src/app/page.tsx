import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { SponsoredCard } from '@/components/SponsoredCard';
import { CategorySection } from '@/components/CategorySection';
import { getResourcesByCategorySlug, getCategoriesWithCounts } from '@/lib/queries';
import dynamicImport from 'next/dynamic';

export const dynamic = 'force-dynamic';

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

  const totalResources = Object.values(countMap).reduce((sum: number, count) => sum + (Number(count) || 0), 0);

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
        <HeroSection totalCount={totalResources} />

        {/* Ad slot */}
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 pb-4">
          <SponsoredCard />
        </div>

        {/* Category sections — 5 resources each */}
        <div id="directory">
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
        </div>

        {/* Passive email collection */}
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 mt-20 pt-20 border-t border-white/[0.05] pb-24 text-center">
          <NewsletterCapture source="homepage" />
        </div>
      </main>
    </>
  );
}
