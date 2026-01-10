import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Star, Eye, Copy, ExternalLink, ArrowLeft } from 'lucide-react';
import { db } from '@/lib/db';
import { resources, categories, ratings, tags, resourceTags } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';
import { MarketplaceHeader } from '@/components/MarketplaceHeader';

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
      description: resources.description,
      content: resources.content,
      url: resources.url,
      views: resources.views,
      copiedCount: resources.copiedCount,
      categoryName: categories.name,
    })
    .from(resources)
    .leftJoin(categories, eq(resources.categoryId, categories.id))
    .where(eq(resources.slug, slug))
    .limit(1);

  if (!resource) {
    notFound();
  }

  // Get ratings
  const resourceRatings = await db
    .select({ rating: ratings.rating })
    .from(ratings)
    .where(eq(ratings.resourceId, resource.id));

  const avgRating =
    resourceRatings.length > 0
      ? resourceRatings.reduce((sum, r) => sum + r.rating, 0) / resourceRatings.length
      : 0;

  // Get tags
  const resourceTagsList = await db
    .select({ name: tags.name })
    .from(resourceTags)
    .leftJoin(tags, eq(resourceTags.tagId, tags.id))
    .where(eq(resourceTags.resourceId, resource.id));

  return (
    <div className="min-h-screen bg-background-app flex flex-col">
      <MarketplaceHeader />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span>/</span>
            <Link href="/resources" className="hover:text-blue-600">Resources</Link>
            <span>/</span>
            <span className="text-gray-900 dark:text-gray-100 font-medium truncate">{resource.title}</span>
          </nav>

          <article className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm">
            <div className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
                <div>
                  <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border border-blue-100 dark:border-blue-800 mb-4">
                    {resource.categoryName}
                  </div>
                  <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 leading-tight">
                    {resource.title}
                  </h1>
                </div>
                
                {resource.url && (
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 transition-all active:scale-95"
                  >
                    Get Resource
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl mb-8 border border-gray-100 dark:border-gray-800">
                <div className="text-center md:border-r border-gray-200 dark:border-gray-800">
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Rating</div>
                  <div className="flex items-center justify-center gap-1.5 font-bold">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    {avgRating.toFixed(1)}
                  </div>
                </div>
                <div className="text-center md:border-r border-gray-200 dark:border-gray-800">
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Views</div>
                  <div className="font-bold">{resource.views.toLocaleString()}</div>
                </div>
                <div className="text-center md:border-r border-gray-200 dark:border-gray-800">
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Downloads</div>
                  <div className="font-bold">{resource.copiedCount.toLocaleString()}</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Reviews</div>
                  <div className="font-bold">{resourceRatings.length}</div>
                </div>
              </div>

              {/* Description */}
              <div className="prose dark:prose-invert max-w-none mb-10">
                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                  {resource.description}
                </p>
              </div>

              {/* Content / Code Preview */}
              {resource.content && (
                <div className="mb-10">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold tracking-tight">Resource Content</h2>
                    <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-lg transition-colors">
                      <Copy className="w-4 h-4" />
                      Copy
                    </button>
                  </div>
                  <div className="relative group">
                    <pre className="whitespace-pre-wrap font-mono text-sm bg-gray-50 dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 overflow-x-auto max-h-[500px]">
                      {resource.content}
                    </pre>
                  </div>
                </div>
              )}

              {/* Tags */}
              {resourceTagsList.length > 0 && (
                <div className="mb-10 flex flex-wrap gap-2">
                  {resourceTagsList.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400 border border-gray-100 dark:border-gray-800 rounded-lg text-sm font-medium"
                    >
                      #{tag.name}
                    </span>
                  ))}
                </div>
              )}

              {/* Rating CTA */}
              <div className="pt-8 border-t border-gray-100 dark:border-gray-800 text-center">
                <h3 className="text-lg font-bold mb-4">How useful was this?</h3>
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      className="p-2 hover:scale-125 transition-transform"
                    >
                      <Star className="w-8 h-8 text-gray-200 dark:text-gray-800 hover:text-yellow-400 transition-colors" />
                    </button>
                  ))}
                </div>
                <p className="mt-4 text-sm text-gray-400">
                  Sign in to leave a review
                </p>
              </div>
            </div>
          </article>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 py-12 mt-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-500">
            © 2026 Antigravity Directory. Curated resources for the next generation of developers.
          </p>
        </div>
      </footer>
    </div>
  );
}
