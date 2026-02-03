import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import { users, resources, categories, ratings, bookmarks, follows } from '@/drizzle/schema';
import { eq, sql, desc, and } from 'drizzle-orm';
import { auth } from '@/auth';
import { ProfileHeader } from '@/components/ProfileHeader';
import { ResourceCard } from '@/components/ResourceCard';
import { MarketplaceHeader } from '@/components/MarketplaceHeader';
import { Footer } from '@/components/Footer';
import { safeJsonLd } from '@/lib/utils/safeJsonLd';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string }>;
}): Promise<Metadata> {
  const { username } = await params;
  const [user] = await db
    .select({ name: users.name, bio: users.bio })
    .from(users)
    .where(eq(users.username, username))
    .limit(1);

  if (!user) return { title: 'User Not Found' };

  return {
    title: `${user.name || username}`,
    description: user.bio || `Explore AI tools and resources created by ${user.name || username}.`,
    alternates: {
      canonical: `/u/${username}`,
    },
  };
}

export default async function PublicProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const session = await auth();
  const viewerId = session?.user?.id;

  // 1. Fetch User
  const user = (
    await db
      .select({
        id: users.id,
        name: users.name,
        username: users.username,
        image: users.image,
        bio: users.bio,
        website: users.website,
        tagline: users.tagline,
        location: users.location,
        githubUsername: users.githubUsername,
        twitterHandle: users.twitterHandle,
        linkedinUrl: users.linkedinUrl,
        youtubeChannel: users.youtubeChannel,
        discordUsername: users.discordUsername,
        followersCount: users.followersCount,
        followingCount: users.followingCount,
        createdAt: users.createdAt,
        isFollowing: sql<boolean>`CASE WHEN ${follows.followerId} IS NOT NULL THEN true ELSE false END`,
      })
      .from(users)
      .leftJoin(
        follows,
        and(
          eq(follows.followingId, users.id),
          eq(follows.followerId, viewerId || '00000000-0000-0000-0000-000000000000')
        )
      )
      .where(eq(users.username, username))
      .limit(1)
  )[0];

  if (!user) {
    notFound();
  }

  // 2. Fetch Authored Resources
  const authoredResources = await db
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
      and(eq(bookmarks.resourceId, resources.id), eq(bookmarks.userId, viewerId ?? ''))
    )
    .where(eq(resources.authorId, user.id))
    .groupBy(resources.id, categories.id, categories.name)
    .orderBy(desc(resources.publishedAt));

  const socialLinks = [
    user.githubUsername ? `https://github.com/${user.githubUsername}` : null,
    user.twitterHandle ? `https://twitter.com/${user.twitterHandle}` : null,
    user.linkedinUrl,
    user.youtubeChannel ? (user.youtubeChannel.startsWith('http') ? user.youtubeChannel : `https://youtube.com/@${user.youtubeChannel}`) : null,
  ].filter(Boolean) as string[];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "mainEntity": {
      "@type": "Person",
      "name": user.name || username,
      "description": user.tagline || user.bio || '',
      "image": user.image,
      "url": `/u/${username}`,
      "homeLocation": user.location ? {
        "@type": "Place",
        "name": user.location
      } : undefined,
      "sameAs": socialLinks.length > 0 ? socialLinks : undefined
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
      />
      <MarketplaceHeader />

      <main className="container mx-auto px-4 py-12 flex-1">
        <ProfileHeader 
          user={user} 
          isOwnProfile={viewerId === user.id} 
          initialIsFollowing={user.isFollowing}
        />

        <div className="mt-20">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-1.5 h-6 bg-blue-600 rounded-full" />
            <h2 className="text-2xl font-black tracking-tighter text-white uppercase italic">
              Authored Tools
            </h2>
            <span className="text-gray-700 font-mono text-sm ml-2">[{authoredResources.length}]</span>
          </div>

          {authoredResources.length > 0 ? (
            <div className="marketplace-list">
              {authoredResources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          ) : (
            <div className="py-20 bg-[#050505] border border-gray-900 rounded-[32px] text-center">
              <p className="text-gray-600 font-mono text-xs uppercase tracking-widest">
                No tools transmitted by this user in the current sector.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
