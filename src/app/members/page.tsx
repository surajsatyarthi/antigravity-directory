import { db } from '@/lib/db';
import { users, follows } from '@/drizzle/schema';
import { eq, and, or, ilike, desc, sql } from 'drizzle-orm';
import { auth } from '@/auth';
import { MemberCard } from '@/components/MemberCard';
import { MemberFilters } from '@/components/MemberFilters';
import { MarketplaceHeader } from '@/components/MarketplaceHeader';
import { Footer } from '@/components/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Network Directory - Antigravity',
  description: 'Connect with the elite AI engineers, prompt designers, and developers in the Antigravity sector.',
};

export default async function MembersPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; location?: string }>;
}) {
  const { q: query, location } = await searchParams;
  const session = await auth();
  const viewerId = session?.user?.id;

  // Build Filter
  const conditions = [eq(users.publicProfile, true)];
  
  if (query) {
    conditions.push(
      or(
        ilike(users.name, `%${query}%`),
        ilike(users.username, `%${query}%`),
        ilike(users.tagline, `%${query}%`),
        ilike(users.bio, `%${query}%`)
      )!
    );
  }

  if (location) {
    conditions.push(ilike(users.location, `%${location}%`));
  }

  const allMembers = await db
    .select({
      id: users.id,
      name: users.name,
      username: users.username,
      image: users.image,
      tagline: users.tagline,
      location: users.location,
      profileCompletionScore: users.profileCompletionScore,
      githubUsername: users.githubUsername,
      twitterHandle: users.twitterHandle,
      linkedinUrl: users.linkedinUrl,
      youtubeChannel: users.youtubeChannel,
      discordUsername: users.discordUsername,
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
    .where(and(...conditions))
    .orderBy(desc(users.profileCompletionScore), desc(users.createdAt));

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <MarketplaceHeader />

      <main className="container mx-auto px-4 py-16 flex-1">
        <header className="mb-20 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-500 font-mono text-[10px] uppercase tracking-widest mb-6">
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
            Global Network Sync
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white uppercase italic leading-none mb-6">
            COMMUNITY <span className="text-blue-600 whitespace-nowrap">DIRECTORY</span>
          </h1>
          <p className="text-gray-400 text-lg font-medium tracking-tight">
            Discover the architects of the next intelligence layer. Filter by sector, skill, or integrity score.
          </p>
        </header>

        <MemberFilters />

        {allMembers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {allMembers.map((member) => (
              <MemberCard 
                key={member.id} 
                member={member} 
                initialIsFollowing={member.isFollowing}
                viewerId={viewerId}
              />
            ))}
          </div>
        ) : (
          <div className="py-24 bg-[#050505] border border-gray-900 rounded-[48px] text-center max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-gray-950 border border-gray-900 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="text-gray-700 text-2xl font-black">?</span>
            </div>
            <h3 className="text-white font-black uppercase italic tracking-widest mb-2">No Matches Found</h3>
            <p className="text-gray-600 font-mono text-xs uppercase tracking-tighter">
              The transmission query returned zero results in this sector.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
