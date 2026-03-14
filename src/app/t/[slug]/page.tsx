import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ExternalLink, ArrowLeft, ChevronRight } from 'lucide-react';
import { db } from '@/lib/db';
import { resources, categories, tags, resourceTags, users } from '@/drizzle/schema';
import { eq, and, sql, ne } from 'drizzle-orm';
import { Header } from '@/components/Header';
import { CitationBlock } from '@/components/CitationBlock';
import { BadgeGenerator } from '@/components/BadgeGenerator';
import { safeJsonLd } from '@/lib/utils/safeJsonLd';
import { CopyButton } from '@/components/CopyButton';
import { ShareBar } from '@/components/ShareBar';
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = await params;
  const [resource] = await db
    .select({
      title: resources.title,
      description: resources.description,
      metaDesc: resources.metaDesc,
      categoryName: categories.name,
    })
    .from(resources)
    .leftJoin(categories, eq(resources.categoryId, categories.id))
    .where(eq(resources.slug, slug))
    .limit(1);

  if (!resource) {
    return {
      title: 'Resource Not Found | Antigravity Directory',
    };
  }

  const categoryName = resource.categoryName ?? 'Resource';
  const title = `${resource.title} — Antigravity ${categoryName} | googleantigravity.directory`;
  const description = resource.metaDesc
    ?? `${resource.description} — A ${categoryName} for Google Antigravity IDE. Browse more ${categoryName} resources on googleantigravity.directory.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://googleantigravity.directory/t/${slug}`,
      images: [{ url: '/opengraph-image.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/twitter-image.png'],
    },
    alternates: {
      canonical: `https://googleantigravity.directory/t/${slug}`,
    },
  };
}

export default async function ResourceDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  
  // Fetch resource with category
  const [resource] = await db
    .select({
      id: resources.id,
      title: resources.title,
      slug: resources.slug,
      description: resources.description,
      content: resources.content,
      url: resources.url,

      verified: resources.verified,
      badgeType: resources.badgeType,
      categoryName: categories.name,
      categorySlug: categories.slug,
    })
    .from(resources)
    .leftJoin(categories, eq(resources.categoryId, categories.id))
    .where(eq(resources.slug, slug))
    .limit(1);

  if (!resource) {
    notFound();
  }



  // Get tags
  const resourceTagsList = await db
    .select({ name: tags.name })
    .from(resourceTags)
    .leftJoin(tags, eq(resourceTags.tagId, tags.id))
    .where(eq(resourceTags.resourceId, resource.id));

  // Related resources — tag overlap DESC, publishedAt fallback, same category, exclude self, LIVE only
  const relatedResources = await db
    .select({
      title: resources.title,
      slug: resources.slug,
      description: resources.description,
      categoryName: categories.name,
      categorySlug: categories.slug,
    })
    .from(resources)
    .leftJoin(categories, eq(resources.categoryId, categories.id))
    .where(
      and(
        eq(categories.slug, resource.categorySlug ?? ''),
        eq(resources.status, 'LIVE'),
        ne(resources.id, resource.id)
      )
    )
    .orderBy(
      sql`(
        SELECT COUNT(*) FROM resource_tags rt2
        WHERE rt2.resource_id = ${resources.id}
        AND rt2.tag_id IN (
          SELECT tag_id FROM resource_tags WHERE resource_id = ${resource.id}
        )
      ) DESC NULLS LAST`,
      sql`${resources.publishedAt} DESC NULLS LAST`
    )
    .limit(3);


  const softwareAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": resource.title,
    "description": resource.description,
    "applicationCategory": resource.categoryName || "Utility",
    "operatingSystem": "Google Antigravity IDE",
    "url": resource.url || `https://googleantigravity.directory/t/${resource.slug}`,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    }
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://googleantigravity.directory"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": resource.categoryName || "Resources",
        "item": `https://googleantigravity.directory/${resource.categorySlug || ''}`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": resource.title,
        "item": `https://googleantigravity.directory/t/${resource.slug}`
      }
    ]
  };
  function getCopyLabel(categoryName: string | null | undefined): string {
    switch (categoryName) {
      case 'Prompts':        return 'Copy Prompt';
      case 'Rules':          return 'Copy Rule';
      case 'Skills':         return 'Copy Skill';
      case 'Workflows':      return 'Copy Workflow';
      case 'Agents':         return 'Copy Agent';
      case 'Boilerplates':   return 'Copy Boilerplate';
      case 'Tutorials':      return 'Copy Tutorial';
      case 'Cheatsheets':    return 'Copy Cheatsheet';
      case 'Troubleshooting':return 'Copy Fix';
      case 'MCP Servers':    return 'Copy Config';
      default:               return 'Copy';
    }
  }

  return (
    <div className="min-h-screen bg-black flex flex-col selection:bg-white/10">
      {/* JSON-LD Layer (AEO) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(softwareAppJsonLd) }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbJsonLd) }}
      />
      <Header />

      <main className="flex-1 container mx-auto px-4 py-12 pb-24 md:pb-12 max-w-4xl">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-12 font-mono">
          <Link href="/" className="hover:text-white transition-colors">home</Link>
          <span className="text-gray-800">/</span>
          <Link href={`/${resource.categorySlug || ''}`} className="hover:text-white transition-colors">
            {resource.categoryName?.toLowerCase() || 'category'}
          </Link>
          <span className="text-gray-800">/</span>
          <span className="text-gray-300 truncate">{resource.title.toLowerCase()}</span>
        </nav>

        <article className="border border-white/[0.06] rounded-none overflow-hidden bg-[#0A0A0A]">
          <div className="p-8 md:p-16">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-12">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-6">
                  <div className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-white/5 text-blue-500 border border-blue-500/20 uppercase tracking-widest font-mono">
                    {resource.categoryName}
                  </div>
                  {/* Editors Choice Removed */}
                  {/* Badges Removed */}
                </div>
                <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight mb-4">
                  {resource.title}
                </h1>
                <p className="text-lg text-gray-400 leading-relaxed font-medium">
                  {resource.description}
                </p>
                
                {/* Social Sharing */}
                <ShareBar
                  url={`https://googleantigravity.directory/t/${resource.slug}`}
                  title={resource.title}
                />
              </div>
              
              <div className="flex flex-col gap-3 shrink-0">
                {resource.url ? (
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-gray-200 text-black font-bold rounded-none shadow-xl transition-all active:scale-95 text-center min-w-[200px]"
                  >
                    Get Resource
                    <ExternalLink className="w-4 h-4" />
                  </a>
                ) : (
                  <div className="inline-flex flex-col items-center justify-center gap-1 px-8 py-4 bg-gray-900 text-gray-500 font-bold rounded-none border border-white/5 text-center min-w-[200px] cursor-not-allowed">
                    <span className="text-xs">URL Not Available</span>
                  </div>
                )}

              </div>
            </div>

            {/* AEO Citation Block */}
            <CitationBlock 
              data={{
                title: resource.title,
                description: resource.description,
                category: resource.categoryName || 'General',
                verified: resource.verified,
              }}
            />





            {/* Content / Code Preview */}
            {resource.content && (
              <div className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold tracking-tight text-white font-mono uppercase tracking-widest text-sm text-gray-500">Resource Content</h2>
                  <CopyButton content={resource.content!} label={getCopyLabel(resource.categoryName)} />
                </div>
                
                <div className="relative group">
                  <pre className="whitespace-pre-wrap font-mono text-sm bg-black p-8 rounded-none border border-gray-900 text-gray-300 overflow-x-auto max-h-[600px] leading-relaxed">
                    {resource.content}
                  </pre>
                </div>
              </div>
            )}

            {/* Tags */}
            {resourceTagsList.length > 0 && (
              <div className="mb-12 flex flex-wrap gap-3">
                {resourceTagsList.map((tag, index) => (
                  <span
                    key={index}
                    className="px-4 py-1.5 bg-white/5 text-gray-400 border border-white/5 rounded-full text-xs font-mono lowercase"
                  >
                    #{tag.name}
                  </span>
                ))}
              </div>
            )}

            {/* Related Resources */}
            {relatedResources.length > 0 && (
              <div className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest font-mono">
                    More {resource.categoryName}
                  </h2>
                  <Link
                    href={`/${resource.categorySlug || ''}`}
                    className="text-xs text-blue-400 hover:text-blue-300 transition-colors font-mono"
                  >
                    View all →
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {relatedResources.map((related) => (
                    <Link
                      key={related.slug}
                      href={`/t/${related.slug}`}
                      className="block p-4 bg-white/[0.03] border border-white/[0.06] rounded-none hover:border-blue-500/40 transition-colors group"
                    >
                      <div className="text-xs font-mono text-blue-500 uppercase tracking-widest mb-2">
                        {related.categoryName}
                      </div>
                      <h3 className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors mb-2 leading-snug">
                        {related.title}
                      </h3>
                      <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                        {related.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Badge Flywheel Section */}
            <BadgeGenerator 
              slug={resource.slug} 
              title={resource.title} 
            />
          </div>
        </article>
      </main>

    </div>
  );
}
