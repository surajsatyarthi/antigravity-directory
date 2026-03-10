'use client';

import { Search, ChevronDown } from 'lucide-react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useEffect, useState, useTransition, useRef } from 'react';
import { cn } from '@/lib/utils';
import { SEARCH_CATEGORIES } from '@/constants';

interface SearchInputProps {
  variant?: 'default' | 'hero';
  placeholder?: string;
}

export function SearchInput({ variant = 'default', placeholder = "Search resources..." }: SearchInputProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-detect current category from pathname and sync query from URL
  useEffect(() => {
    const match = SEARCH_CATEGORIES.find(cat => pathname === `/${cat.slug}`);
    setSelectedCategory(match ? match.slug : '');
    setQuery(searchParams.get('q') || '');
  }, [pathname, searchParams]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Core search — fires on Enter or button click only
  const handleSearch = () => {
    const trimmed = query.trim();
    if (selectedCategory) {
      const target = trimmed
        ? `/${selectedCategory}?q=${encodeURIComponent(trimmed)}`
        : `/${selectedCategory}`;
      startTransition(() => router.push(target));
    } else {
      const params = new URLSearchParams(searchParams.toString());
      if (trimmed) {
        params.set('q', trimmed);
      } else {
        params.delete('q');
      }
      startTransition(() => router.replace(`${pathname}?${params.toString()}`, { scroll: false }));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch();
  };

  // Selecting a category navigates immediately
  const handleCategorySelect = (slug: string) => {
    setSelectedCategory(slug);
    setIsDropdownOpen(false);
    if (slug) {
      const trimmed = query.trim();
      const target = trimmed ? `/${slug}?q=${encodeURIComponent(trimmed)}` : `/${slug}`;
      startTransition(() => router.push(target));
    }
  };

  const selectedLabel = SEARCH_CATEGORIES.find(c => c.slug === selectedCategory)?.label ?? 'All';

  return (
    <div
      ref={containerRef}
      className={cn(
        'flex-1 relative',
        variant === 'hero' ? 'max-w-2xl mx-auto' : 'max-w-3xl'
      )}
    >
      {/* Unified search container */}
      <div className={cn(
        'flex items-center bg-white/[0.06] border border-white/[0.08] focus-within:border-white/[0.25] transition-all'
      )}>

        {/* Left: Category Dropdown Trigger */}
        <button
          type="button"
          onClick={() => setIsDropdownOpen(prev => !prev)}
          className={cn(
            'flex items-center gap-1 shrink-0 border-r border-white/[0.08] text-slate-400 hover:text-white transition-colors whitespace-nowrap',
            variant === 'hero' ? 'px-5 py-[18px] text-sm' : 'px-3 py-[9px] text-[11px]'
          )}
        >
          <span className={cn('font-medium truncate', variant === 'hero' ? 'max-w-[120px]' : 'max-w-[72px]')}>
            {selectedLabel}
          </span>
          <ChevronDown className={cn(
            'shrink-0 transition-transform duration-200',
            isDropdownOpen ? 'rotate-180' : '',
            variant === 'hero' ? 'w-4 h-4' : 'w-3 h-3'
          )} />
        </button>

        {/* Middle: Text Input */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={cn(
            'flex-1 bg-transparent text-white placeholder:text-gray-500 outline-none',
            variant === 'hero' ? 'px-5 py-[18px] text-lg' : 'px-3 py-[9px] text-[11px]'
          )}
        />

        {/* Right: Search Button */}
        <button
          type="button"
          onClick={handleSearch}
          className={cn(
            'shrink-0 border-l border-white/[0.08] text-slate-400 hover:text-white transition-colors',
            isPending ? 'text-blue-500' : '',
            variant === 'hero' ? 'px-5 py-[18px]' : 'px-3 py-[9px]'
          )}
          aria-label="Search"
        >
          <Search className={cn(
            isPending ? 'animate-pulse text-blue-500' : '',
            variant === 'hero' ? 'w-5 h-5' : 'w-4 h-4'
          )} />
        </button>
      </div>

      {/* Dropdown Panel */}
      {isDropdownOpen && (
        <div className="absolute top-full left-0 z-50 mt-0.5 bg-zinc-950 border border-white/[0.12] min-w-[200px] max-h-[360px] overflow-y-auto shadow-xl">
          <button
            type="button"
            onClick={() => { setSelectedCategory(''); setIsDropdownOpen(false); }}
            className={cn(
              'w-full text-left px-4 py-2.5 text-[12px] font-semibold transition-colors',
              selectedCategory === ''
                ? 'text-white bg-white/[0.08]'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
            )}
          >
            All Categories
          </button>
          {SEARCH_CATEGORIES.map((cat) => (
            <button
              key={cat.slug}
              type="button"
              onClick={() => handleCategorySelect(cat.slug)}
              className={cn(
                'w-full text-left px-4 py-2.5 text-[12px] transition-colors',
                selectedCategory === cat.slug
                  ? 'text-white bg-white/[0.08] font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
