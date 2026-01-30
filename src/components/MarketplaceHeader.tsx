import { Suspense } from 'react';
import Link from 'next/link';
import { Zap, Menu, User, LogOut } from 'lucide-react';
import { auth } from '@/auth';
import { MobileMenu } from './MobileMenu';
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
        <Link href="/" className="flex items-center gap-3.5 group shrink-0 p-1 rounded-sm">
          <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center group-hover:bg-gray-100 transition-all duration-300 relative overflow-hidden animate-logo-shine">
            <Zap className="w-4.5 h-4.5 text-black fill-black relative z-20" />
          </div>
          <div className="flex flex-col justify-center py-0.5">
            <span className="text-[17px] font-black tracking-[-0.03em] font-mono lowercase text-white leading-[1.1] premium-text-glow">
              antigravity
            </span>
            <span className="text-[10px] font-black tracking-[0.3em] font-mono lowercase text-gray-400 leading-none mt-1 pl-0.5 opacity-90">
              directory
            </span>
          </div>
        </Link>

        {/* Search Bar - Center */}
        <div className="hidden md:flex flex-1 max-w-xl items-center">
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
            {/* Submit Button - STAND OUT */}
            <Link 
              href="/submit"
              className="group relative flex items-center justify-center px-4 py-1.5 bg-white hover:bg-emerald-50 text-black text-[10px] font-black uppercase tracking-[0.15em] rounded-md transition-all active:scale-[0.98] shadow-[0_0_20px_rgba(255,255,255,0.1)] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/10 to-emerald-500/0 -translate-x-full group-hover:translate-x-full duration-1000 transition-transform" />
              <Zap className="w-3 h-3 mr-2 animate-pulse" />
              <span className="relative">Submit Resource</span>
            </Link>

            {session ? (
              <div className="flex items-center gap-3">
                <Link 
                  href={username ? `/u/${username}` : '/settings'} 
                  className="group flex items-center ml-2" 
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
        <MobileMenu session={session} username={username} />
      </div>
    </header>
  );
}
