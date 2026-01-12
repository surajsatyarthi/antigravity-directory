import { auth } from '@/auth';
import { db } from '@/lib/db';
import { resources, categories, ratings, bookmarks, users } from '@/drizzle/schema';
import { eq, sql, desc, and } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import { MarketplaceHeader } from '@/components/MarketplaceHeader';
import { Footer } from '@/components/Footer';
import { ResourceCard } from '@/components/ResourceCard';
import { Bookmark, Package, Layout } from 'lucide-react';

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect('/auth/signin');
  }

  const userId = session.user.id;

  // 0. Fetch User Info
  const user = (
    await db
      .select({ username: users.username })
      .from(users)
      .where(eq(users.id, userId))
      .limit(1)
  )[0];

  // 1. Fetch Authored Resources
  const authoredTools = await db
    .select({
      id: resources.id,
      title: resources.title,
      slug: resources.slug,
      description: resources.description,
      views: resources.views,
      categoryName: categories.name,
      publishedAt: resources.publishedAt,
      featured: resources.featured,
      badgeType: resources.badgeType,
      avgRating: sql<number>`coalesce(avg(${ratings.rating}), 0)`,
      ratingCount: sql<number>`count(${ratings.id})`,
      isBookmarked: sql<boolean>`count(${bookmarks.userId}) > 0`,
    })
    .from(resources)
    .leftJoin(categories, eq(resources.categoryId, categories.id))
    .leftJoin(ratings, eq(resources.id, ratings.resourceId))
    .leftJoin(
      bookmarks,
      and(eq(bookmarks.resourceId, resources.id), eq(bookmarks.userId, userId))
    )
    .where(eq(resources.authorId, userId))
    .groupBy(resources.id, categories.id, categories.name)
    .orderBy(desc(resources.publishedAt));

  // 2. Fetch Bookmarked Resources
  const bookmarkedTools = await db
    .select({
      id: resources.id,
      title: resources.title,
      slug: resources.slug,
      description: resources.description,
      views: resources.views,
      categoryName: categories.name,
      publishedAt: resources.publishedAt,
      featured: resources.featured,
      badgeType: resources.badgeType,
      avgRating: sql<number>`coalesce(avg(${ratings.rating}), 0)`,
      ratingCount: sql<number>`count(${ratings.id})`,
      isBookmarked: sql<boolean>`true`,
    })
    .from(bookmarks)
    .innerJoin(resources, eq(bookmarks.resourceId, resources.id))
    .leftJoin(categories, eq(resources.categoryId, categories.id))
    .leftJoin(ratings, eq(resources.id, ratings.resourceId))
    .where(eq(bookmarks.userId, userId))
    .groupBy(resources.id, categories.id, categories.name, bookmarks.createdAt)
    .orderBy(desc(bookmarks.createdAt));

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <MarketplaceHeader />

      <main className="container mx-auto px-4 py-12 flex-1">
        <div className="mb-12">
          <h1 className="text-4xl font-black tracking-tighter text-white uppercase italic mb-2">
            Sector Dashboard
          </h1>
          <p className="text-gray-500 font-mono text-sm uppercase tracking-widest">
            Command center for your discoveries and contributions.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-[#050505] border border-gray-900 rounded-3xl p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-500">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Authored</p>
              <p className="text-2xl font-black text-white">{authoredTools.length}</p>
            </div>
          </div>
          <div className="bg-[#050505] border border-gray-900 rounded-3xl p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-600/10 rounded-2xl flex items-center justify-center text-purple-500">
              <Bookmark className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Saved</p>
              <p className="text-2xl font-black text-white">{bookmarkedTools.length}</p>
            </div>
          </div>
          <div className="bg-[#050505] border border-gray-900 rounded-3xl p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-green-600/10 rounded-2xl flex items-center justify-center text-green-500">
              <Layout className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Identity</p>
              <p className="text-sm font-black text-white truncate max-w-[120px]">@{user?.username || 'uninitialized'}</p>
            </div>
          </div>
        </div>

        {/* Bookmarked Section */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-1.5 h-6 bg-purple-600 rounded-full" />
            <h2 className="text-2xl font-black tracking-tighter text-white uppercase italic">Saved Discoveries</h2>
          </div>
          {bookmarkedTools.length > 0 ? (
            <div className="marketplace-list">
              {bookmarkedTools.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          ) : (
            <div className="py-20 bg-[#050505] border border-gray-900 border-dashed rounded-[32px] text-center">
              <p className="text-gray-600 font-mono text-xs uppercase tracking-widest mb-6">No discoveries saved in this sector.</p>
              <a href="/" className="inline-flex px-8 py-3 bg-white/5 text-white border border-white/10 font-bold rounded-xl hover:bg-white/10 transition-all uppercase tracking-widest text-[10px]">
                Explore Marketplace
              </a>
            </div>
          )}
        </section>

        {/* Authored Section */}
        <section>
          <div className="flex items-center gap-3 mb-10">
            <div className="w-1.5 h-6 bg-blue-600 rounded-full" />
            <h2 className="text-2xl font-black tracking-tighter text-white uppercase italic">Authored Tools</h2>
          </div>
          {authoredTools.length > 0 ? (
            <div className="marketplace-list">
              {authoredTools.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          ) : (
            <div className="py-20 bg-[#050505] border border-gray-900 border-dashed rounded-[32px] text-center">
              <p className="text-gray-600 font-mono text-xs uppercase tracking-widest mb-6">No tools authored by your identity.</p>
              <a href="/submit" className="inline-flex px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-500 transition-all uppercase tracking-widest text-[10px]">
                Submit First Tool
              </a>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
