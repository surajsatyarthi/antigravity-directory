import { Suspense } from 'react';
import Link from 'next/link';
import { Zap, Menu, User, LogOut } from 'lucide-react';
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
    <header className="sticky top-0 z-50 w-full bg-black/90 backdrop-blur-md border-b border-white/[0.05]">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <div className="w-7 h-7 bg-white rounded flex items-center justify-center group-hover:bg-gray-200 transition-colors">
            <Zap className="w-4 h-4 text-black fill-black" />
          </div>
          <span className="text-lg font-bold tracking-tighter hidden md:block font-mono lowercase text-white">
            antigravity
          </span>
        </Link>

        {/* Search Bar - Center */}
        <div className="flex-1 max-w-xl flex items-center">
          <Suspense fallback={
            <div className="w-full bg-[#050505] border border-white/[0.05] rounded-full h-9" />
          }>
            <SearchInput />
          </Suspense>
        </div>

        {/* Nav Links & Auth - Consolidated & Aligned */}
        <div className="hidden md:flex items-center gap-6 h-full">
          <div className="flex items-center h-full">
            <NavLinks session={session} username={username} />
          </div>

          <div className="flex items-center gap-4 pl-6 border-l border-white/[0.05] h-6">
            {session ? (
              <div className="flex items-center gap-3">
                <Link 
                  href={username ? `/u/${username}` : '/settings'} 
                  className="group flex items-center" 
                  aria-label={`View profile for ${session.user?.name || 'user'}`}
                >
                  {session.user?.image ? (
                    <img 
                      src={session.user.image} 
                      alt="" 
                      className="w-7 h-7 rounded-full border border-white/[0.05] group-hover:border-blue-500 transition-colors" 
                      role="presentation"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-gray-950 flex items-center justify-center text-gray-400 group-hover:bg-gray-900 transition-colors border border-white/[0.05]">
                      <User className="w-3.5 h-3.5" aria-hidden="true" />
                    </div>
                  )}
                </Link>
                <form action={handleSignOut} className="flex items-center">
                  <button 
                    type="submit" 
                    className="p-1 hover:text-red-500 transition-colors focus:outline-none focus:text-red-500 text-gray-400 flex items-center" 
                    title="Sign Out" 
                    aria-label="Sign Out"
                  >
                    <LogOut className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </form>
              </div>
            ) : (
              <form action={handleSignIn} className="flex items-center">
                <button 
                  type="submit" 
                  className="text-gray-400 hover:text-white transition-colors uppercase tracking-widest text-[10px] font-bold h-full flex items-center"
                >
                  Sign In
                </button>
              </form>
            )}
          </div>
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
