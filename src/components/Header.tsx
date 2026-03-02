import { Suspense } from 'react';
import Link from 'next/link';
import { Zap, User, LogOut } from 'lucide-react';
import { auth } from '@/auth';
import { db } from '@/lib/db';
import { users } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';
import { handleSignIn, handleSignOut } from '@/lib/actions/auth';
import { MobileMenu } from './MobileMenu';
import { SearchInput } from './SearchInput';
import { NavLinks } from './NavLinks';

export async function Header() {
  const session = await auth();
  
  let username = null;
  if (session?.user?.id) {
    const user = (await db.select({ username: users.username }).from(users).where(eq(users.id, session.user.id)).limit(1))[0];
    username = user?.username;
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3.5 group shrink-0 p-1 rounded-sm">
          <div className="w-9 h-9 bg-slate-900 rounded-lg flex items-center justify-center group-hover:bg-slate-700 transition-all duration-300 relative overflow-hidden animate-logo-shine">
            <Zap className="w-4.5 h-4.5 text-white fill-white relative z-20" />
          </div>
          <div className="flex flex-col justify-center py-0.5">
            <span className="text-[17px] font-black tracking-[-0.03em] font-mono lowercase text-slate-900 leading-[1.1]">
              antigravity
            </span>
            <span className="text-[10px] font-black tracking-[0.3em] font-mono lowercase text-slate-400 leading-none mt-1 pl-0.5 opacity-90">
              directory
            </span>
          </div>
        </Link>

        {/* Center Section: Search Bar */}
        <div className="hidden md:flex w-[240px] lg:w-[320px] items-center">
          <Suspense fallback={
            <div className="w-full bg-slate-100 border border-slate-200 rounded-full h-9" />
          }>
            <SearchInput />
          </Suspense>
        </div>

        {/* Right Section: NavLinks + SUBMIT + Auth */}
        <div className="hidden md:flex items-center gap-6 h-full">
          <div className="flex items-center h-full">
            <NavLinks session={session} username={username} />
          </div>

          <div className="flex items-center gap-4 pl-4 border-l border-slate-200 h-6">
            <Link
              href="/submit"
              className="flex items-center justify-center px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-semibold tracking-wide rounded-md transition-all whitespace-nowrap"
            >
              <Zap className="w-2.5 h-2.5 mr-1.5" />
              <span>SUBMIT</span>
            </Link>

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
                      className="w-7 h-7 rounded-full border border-slate-200 group-hover:border-blue-500 transition-colors"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-slate-200 transition-colors border border-slate-200">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </Link>
                <form action={handleSignOut} className="flex items-center">
                  <button
                    type="submit"
                    className="p-1 hover:text-red-500 transition-colors text-gray-400 flex items-center"
                    title="Sign Out"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            ) : (
              <form action={handleSignIn} className="flex items-center">
                <button
                  type="submit"
                  className="text-slate-500 hover:text-slate-900 transition-colors text-[11px] font-semibold tracking-wide whitespace-nowrap"
                >
                  SIGN IN
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <MobileMenu session={session} />
      </div>
    </header>
  );
}
