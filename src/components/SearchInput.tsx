'use client';

import { Search } from 'lucide-react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useEffect, useState, useTransition, useRef } from 'react';

/**
 * SearchInput for the Header.
 * Uses an interaction-based sync to avoid clobbering unrelated URL params.
 */
export function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  
  // Track if the user has actually typed in THIS component
  const [isInteracted, setIsInteracted] = useState(false);
  // Initialize empty to prevent hydration mismatch and server de-opt
  const [query, setQuery] = useState('');
  const lastSyncQuery = useRef('');

  // 1. URL -> State (One-way downstream)
  // Ensures header search matches sidebar search
  useEffect(() => {
    const urlQuery = searchParams.get('q') || '';
    if (urlQuery !== query) {
      setQuery(urlQuery);
      lastSyncQuery.current = urlQuery; // Don't trigger an upstream sync on downstream update
    }
  }, [searchParams]);

  // 2. State -> URL (One-way upstream) with Debounce
  useEffect(() => {
    // ONLY sync upwards if the user actually typed something
    if (!isInteracted) return;
    if (query === lastSyncQuery.current) return;

    const delayDebounceFn = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      const trimmed = query.trim();
      
      if (trimmed) {
        params.set('q', trimmed);
      } else {
        params.delete('q');
      }

      const target = `${pathname}?${params.toString()}`;
      console.log('[SearchInput] User-initiated URL update:', target);
      
      lastSyncQuery.current = query;
      startTransition(() => {
        router.replace(target, { scroll: false });
      });
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [query, isInteracted, pathname, router, searchParams]);

  // 3. Cmd+K / Ctrl+K Global Shortcut
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="flex-1 max-w-2xl relative">
      <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isPending ? 'text-blue-500 animate-pulse' : 'text-gray-500'}`} />
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => {
          setIsInteracted(true);
          setQuery(e.target.value);
        }}
        placeholder="Search prompts, rules, MCPs..."
        className="w-full bg-[#0A0A0A] border border-gray-800 focus:border-white rounded-full pl-10 pr-4 py-2 text-sm transition-all text-white placeholder:text-gray-600 outline-none"
      />
    </div>
  );
}
