import Link from 'next/link';
import { Search, Zap, Plus, Menu } from 'lucide-react';

export function MarketplaceHeader() {
  return (
    <header className="sticky top-0 z-50 w-full bg-black/80 backdrop-blur-md border-b border-gray-800">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center group-hover:bg-gray-200 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.3)]">
            <Zap className="w-5 h-5 text-black fill-black animate-shimmer" />
          </div>
          <span className="text-xl font-bold tracking-tighter hidden sm:block font-mono lowercase">
            antigravity
          </span>
        </Link>

        {/* Search Bar - Center (Cursor / Amazon Style) */}
        <div className="flex-1 max-w-2xl relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search prompts, rules, MCPs..."
            className="w-full bg-[#0A0A0A] border border-gray-800 focus:border-white rounded-full pl-10 pr-4 py-2 text-sm transition-all text-white placeholder:text-gray-600 outline-none"
          />
        </div>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-400">
          <Link href="/resources" className="hover:text-white transition-colors">
            Explore
          </Link>
          <Link href="/categories" className="hover:text-white transition-colors">
            Categories
          </Link>
          <Link 
            href="/submit" 
            className="flex items-center gap-1.5 px-4 py-2 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            Submit
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden p-2 text-gray-400">
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
}
