import Link from 'next/link';
import { Search, Filter, Star } from 'lucide-react';
import { db } from '@/lib/db';
import { resources, categories, ratings } from '@/drizzle/schema';
import { eq, desc } from 'drizzle-orm';

export default async function ResourcesPage() {
  // Fetch all resources with categories
  const allResources = await db
    .select({
      id: resources.id,
      title: resources.title,
      slug: resources.slug,
      description: resources.description,
      views: resources.views,
      categoryName: categories.name,
    })
    .from(resources)
    .leftJoin(categories, eq(resources.categoryId, categories.id))
    .orderBy(desc(resources.publishedAt))
    .limit(50);

  // Get ratings for each resource
  const resourcesWithRatings = await Promise.all(
    allResources.map(async (resource) => {
      const resourceRatings = await db
        .select({ rating: ratings.rating })
        .from(ratings)
        .where(eq(ratings.resourceId, resource.id));

      const avgRating =
        resourceRatings.length > 0
          ? resourceRatings.reduce((sum, r) => sum + r.rating, 0) / resourceRatings.length
          : 0;

      return {
        ...resource,
        avgRating,
        ratingCount: resourceRatings.length,
      };
    })
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="text-xl font-bold text-blue-600">
            ← Antigravity Directory
          </Link>
        </div>
      </header>

      {/* Page Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-4">All Resources</h1>
          <p className="text-gray-600 text-lg">
            Browse {allResources.length} curated Antigravity resources
          </p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search resources..."
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Filter Button */}
            <button className="flex items-center gap-2 px-6 py-3 border rounded-lg hover:bg-gray-50">
              <Filter className="w-5 h-5" />
              Filters
            </button>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resourcesWithRatings.map((resource) => (
            <Link
              key={resource.id}
              href={`/resources/${resource.slug}`}
              className="bg-white rounded-lg border hover:shadow-lg transition p-6"
            >
              {/* Category Badge */}
              <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full mb-4">
                {resource.categoryName}
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold mb-2 line-clamp-2">
                {resource.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 mb-4 line-clamp-3">
                {resource.description}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>{resource.avgRating.toFixed(1)}</span>
                  <span>({resource.ratingCount})</span>
                </div>
                <div>{resource.views} views</div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {allResources.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No resources found.</p>
            <Link
              href="/submit"
              className="inline-block mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Submit First Resource
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
