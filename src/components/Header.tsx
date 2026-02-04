import { Suspense } from 'react';
import Link from 'next/link';
import { Zap, User, LogOut } from 'lucide-react';
import { auth } from '@/auth';
import { db } from '@/lib/db';
import { users } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';
import { handleSignIn, handleSignOut } from '@/lib/actions/auth';
import { MobileMenu } from './MobileMenu';

interface HeaderProps {
  currentPage?: 'home' | 'browse' | 'create' | 'jobs' | 'members';
}

export async function Header({ currentPage }: HeaderProps) {
  const session = await auth();
  
  let username = null;
  if (session?.user?.id) {
    const user = (await db.select({ username: users.username }).from(users).where(eq(users.id, session.user.id)).limit(1))[0];
    username = user?.username;
  }

  const navItems = [
    { label: 'Home', href: '/' },
    { label: '✨ Create (Earn 80%)', href: '/submit', primary: true },
    { label: 'Browse Tools', href: '/prompts' },
    { label: 'Jobs for Developers', href: '/jobs' },
    { label: 'Members', href: '/members' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-black/90 backdrop-blur-md border-b border-white/[0.05]">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3.5 group shrink-0 p-1 rounded-sm">
          <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center group-hover:bg-gray-100 transition-all duration-300 relative overflow-hidden">
            <Zap className="w-4.5 h-4.5 text-black fill-black relative z-20" />
          </div>
          <div className="flex flex-col justify-center py-0.5">
            <span className="text-[17px] font-black tracking-[-0.03em] font-mono lowercase text-white leading-[1.1]">
              antigravity
            </span>
            <span className="text-[10px] font-black tracking-[0.3em] font-mono lowercase text-gray-400 leading-none mt-1 pl-0.5 opacity-90">
              directory
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 h-full">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`text-[12px] font-bold uppercase tracking-widest transition-colors ${
                item.primary 
                  ? 'text-blue-400 hover:text-blue-300' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTAs & Auth */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/jobs"
            className="flex items-center justify-center px-4 py-2 border border-white/10 hover:border-white/20 text-white text-[10px] font-bold uppercase tracking-[0.1em] rounded-md transition-all whitespace-nowrap"
          >
            Post a Job
          </Link>

          {session ? (
            <div className="flex items-center gap-4 pl-4 border-l border-white/[0.1]">
              <Link
                href={username ? `/u/${username}` : '/settings'}
                className="group flex items-center"
              >
                {session.user?.image ? (
                  <img
                    src={session.user.image}
                    alt=""
                    className="w-8 h-8 rounded-full border border-white/[0.05] group-hover:border-blue-500 transition-colors"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-950 flex items-center justify-center text-gray-400 border border-white/[0.05]">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </Link>
              <form action={handleSignOut}>
                <button
                  type="submit"
                  className="p-1 hover:text-red-500 transition-colors text-gray-400"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </form>
            </div>
          ) : (
            <form action={handleSignIn}>
              <button
                type="submit"
                className="text-gray-400 hover:text-white transition-colors uppercase tracking-[0.05em] text-[10px] font-bold"
              >
                Sign In
              </button>
            </form>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <MobileMenu session={session} />
      </div>
    </header>
  );
}
