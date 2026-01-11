import { auth } from '@/auth';
import { db } from '@/lib/db';
import { users } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import { MarketplaceHeader } from '@/components/MarketplaceHeader';
import { Footer } from '@/components/Footer';
import { SettingsForm } from '@/components/SettingsForm';

export default async function SettingsPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect('/auth/signin');
  }

  const user = (
    await db
      .select({
        name: users.name,
        username: users.username,
        bio: users.bio,
        website: users.website,
      })
      .from(users)
      .where(eq(users.id, session.user.id))
      .limit(1)
  )[0];

  if (!user) {
    redirect('/');
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <MarketplaceHeader />

      <main className="container mx-auto px-4 py-12 flex-1">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl font-black tracking-tighter text-white uppercase italic mb-2">
              Sector Settings
            </h1>
            <p className="text-gray-500 font-mono text-sm uppercase tracking-widest">
              Maintain your identity and transmission data.
            </p>
          </div>

          <div className="bg-[#050505] border border-gray-900 rounded-[32px] p-8 md:p-12 shadow-2xl">
            <SettingsForm user={user} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
