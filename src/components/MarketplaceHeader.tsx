import Link from 'next/link';
import { Search, Zap, Plus, Menu } from 'lucide-react';

export function MarketplaceHeader() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center group-hover:bg-blue-700 transition-colors">
            <Zap className="w-5 h-5 text-white fill-white" />
          </div>
          <span className="text-xl font-bold tracking-tight hidden sm:block">
            Antigravity
          </span>
        </Link>

        {/* Search Bar - Center */}
        <div className="flex-1 max-w-2xl relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search prompts, rules, MCPs..."
            className="w-full bg-gray-100 dark:bg-gray-900 border-transparent focus:bg-white dark:focus:bg-black border focus:border-blue-500 rounded-full pl-10 pr-4 py-2 text-sm transition-all focus:ring-4 focus:ring-blue-500/10"
          />
        </div>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600 dark:text-gray-400">
          <Link href="/resources" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Explore
          </Link>
          <Link href="/categories" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Categories
          </Link>
          <Link 
            href="/submit" 
            className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Submit
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden p-2 text-gray-600 dark:text-gray-400">
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
}
