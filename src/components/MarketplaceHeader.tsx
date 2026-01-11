import { Suspense } from 'react';
import Link from 'next/link';
import { Zap, Plus, Menu, User, LogOut, LayoutDashboard } from 'lucide-react';
import { auth } from '@/auth';
import { db } from '@/lib/db';
import { users } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';
import { SearchInput } from './SearchInput';
import { NavLinks } from './NavLinks';
import { handleSignIn, handleSignOut } from '@/lib/actions/auth';

export async function MarketplaceHeader() {
  const session = await auth();
  
  let username = null;
  if (session?.user?.id) {
    const user = (await db.select({ username: users.username }).from(users).where(eq(users.id, session.user.id)).limit(1))[0];
    username = user?.username;
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-black/80 backdrop-blur-md border-b border-gray-800">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center group-hover:bg-gray-200 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.3)]">
            <Zap className="w-5 h-5 text-black fill-black animate-shimmer" />
          </div>
          <span className="text-xl font-bold tracking-tighter hidden md:block font-mono lowercase text-white">
            antigravity
          </span>
        </Link>

        {/* Search Bar - Center (Cursor / Amazon Style) */}
        <Suspense fallback={
          <div className="flex-1 max-w-2xl relative">
            <div className="w-full bg-[#0A0A0A] border border-gray-800 rounded-full h-9" />
          </div>
        }>
          <SearchInput />
        </Suspense>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-6">
          <NavLinks session={session} username={username} />

          {session && (
            <div className="flex items-center gap-3 pl-4 border-l border-gray-800">
              <Link href={username ? `/u/${username}` : '/settings'} className="group" aria-label={`View profile for ${session.user?.name || 'user'}`}>
                {session.user?.image ? (
                  <img 
                    src={session.user.image} 
                    alt="" 
                    className="w-8 h-8 rounded-full border border-gray-800 group-hover:border-blue-500 transition-colors" 
                    role="presentation"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center text-gray-400 group-hover:bg-gray-800 transition-colors">
                    <User className="w-4 h-4" aria-hidden="true" />
                  </div>
                )}
              </Link>
              <form action={handleSignOut}>
                <button type="submit" className="p-2 hover:text-red-500 transition-colors focus:outline-none focus:text-red-500" title="Sign Out" aria-label="Sign Out">
                  <LogOut className="w-4 h-4" aria-hidden="true" />
                </button>
              </form>
            </div>
          )}

          {!session && (
            <form action={handleSignIn}>
              <button type="submit" className="text-gray-500 hover:text-white transition-colors text-[11px] font-bold uppercase tracking-widest px-2 focus:outline-none focus:text-blue-500">
                Sign In
              </button>
            </form>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 text-gray-400 hover:text-white focus:outline-none focus:text-blue-500"
          aria-label="Open mobile menu"
        >
          <Menu className="w-6 h-6" aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
