import { Suspense } from 'react';
import Link from 'next/link';
import { Zap, Plus, Menu, User, LogOut } from 'lucide-react';
import { auth } from '@/auth';
import { SearchInput } from './SearchInput';

export async function MarketplaceHeader() {
  const session = await auth();

  return (
    <header className="sticky top-0 z-50 w-full bg-black/80 backdrop-blur-md border-b border-gray-800">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center group-hover:bg-gray-200 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.3)]">
            <Zap className="w-5 h-5 text-black fill-black animate-shimmer" />
          </div>
          <span className="text-xl font-bold tracking-tighter hidden sm:block font-mono lowercase text-white">
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
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-400">
          <Link href="/resources" className="hover:text-white transition-colors">
            Explore
          </Link>
          
          {session ? (
            <div className="flex items-center gap-6">
              <Link 
                href="/submit" 
                className="flex items-center gap-1.5 px-4 py-2 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-all active:scale-95"
              >
                <Plus className="w-4 h-4" />
                Submit
              </Link>
              
              <div className="flex items-center gap-3 pl-4 border-l border-gray-800">
                {session.user?.image ? (
                  <img src={session.user.image} alt={session.user.name || ''} className="w-8 h-8 rounded-full border border-gray-800" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center text-gray-400">
                    <User className="w-4 h-4" />
                  </div>
                )}
                <form action={async () => {
                  'use server';
                  const { signOut } = await import('@/auth');
                  await signOut();
                }}>
                  <button type="submit" className="p-2 hover:text-red-500 transition-colors" title="Sign Out">
                    <LogOut className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <form action={async () => {
              'use server';
              const { signIn } = await import('@/auth');
              await signIn();
            }}>
              <button type="submit" className="hover:text-white transition-colors">
                Sign In
              </button>
            </form>
          )}
        </nav>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden p-2 text-gray-400">
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
}
