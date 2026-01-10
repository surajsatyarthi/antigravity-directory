import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Star, Eye, Copy, ExternalLink } from 'lucide-react';
import { db } from '@/lib/db';
import { resources, categories, ratings, tags, resourceTags } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';

export default async function ResourceDetailPage({
  params,
}: {
  params: { slug: string };
}) {
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
    .where(eq(resources.slug, params.slug))
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <Link href="/resources" className="text-blue-600 hover:underline">
            ← Back to Resources
          </Link>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <article className="bg-white rounded-lg shadow-sm p-8">
          {/* Category Badge */}
          <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full mb-4">
            {resource.categoryName}
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold mb-4">{resource.title}</h1>

          {/* Meta Info */}
          <div className="flex items-center gap-6 text-gray-600 mb-8 pb-8 border-b">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{avgRating.toFixed(1)}</span>
              <span>({resourceRatings.length} ratings)</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              <span>{resource.views} views</span>
            </div>
            <div className="flex items-center gap-2">
              <Copy className="w-5 h-5" />
              <span>{resource.copiedCount} copies</span>
            </div>
          </div>

          {/* Description */}
          <div className="prose max-w-none mb-8">
            <p className="text-lg text-gray-700">{resource.description}</p>
          </div>

          {/* Content */}
          {resource.content && (
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Content</h2>
              <pre className="whitespace-pre-wrap font-mono text-sm bg-white p-4 rounded border overflow-x-auto">
                {resource.content}
              </pre>
              <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2">
                <Copy className="w-4 h-4" />
                Copy to Clipboard
              </button>
            </div>
          )}

          {/* External URL */}
          {resource.url && (
            <div className="mb-8">
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <ExternalLink className="w-5 h-5" />
                View Original Source
              </a>
            </div>
          )}

          {/* Tags */}
          {resourceTagsList.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {resourceTagsList.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Rating Section */}
          <div className="border-t pt-8">
            <h3 className="text-2xl font-semibold mb-4">Rate this Resource</h3>
            <div className="flex gap-2 mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  className="p-2 hover:scale-110 transition"
                  aria-label={`Rate ${star} stars`}
                >
                  <Star className="w-8 h-8 text-gray-300 hover:text-yellow-400" />
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-500">
              Sign in to rate this resource
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}
