'use client';

import { Search } from 'lucide-react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useEffect, useState, useTransition, useRef } from 'react';
import { cn } from '@/lib/utils';

/**
 * SearchInput for the Header.
 * Uses an interaction-based sync to avoid clobbering unrelated URL params.
 */
interface SearchInputProps {
  variant?: 'default' | 'hero';
  placeholder?: string;
}

export function SearchInput({ variant = 'default', placeholder = "Search prompts, rules, MCPs..." }: SearchInputProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  
  const [isInteracted, setIsInteracted] = useState(false);
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const lastSyncQuery = useRef(query);

  useEffect(() => {
    const urlQuery = searchParams.get('q') || '';
    if (urlQuery !== query) {
      setQuery(urlQuery);
      lastSyncQuery.current = urlQuery;
    }
  }, [searchParams]);

  useEffect(() => {
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
      
      lastSyncQuery.current = query;
      startTransition(() => {
        router.replace(target, { scroll: false });
      });
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [query, isInteracted, pathname, router, searchParams]);

  return (
    <div className={cn("flex-1 relative", variant === 'hero' ? "max-w-2xl mx-auto" : "max-w-3xl")}>
      <Search className={cn(
        "absolute top-1/2 -translate-y-1/2",
        variant === 'hero' ? "left-5 w-5 h-5" : "left-3 w-4 h-4",
        isPending ? 'text-blue-500 animate-pulse' : 'text-gray-500'
      )} />
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setIsInteracted(true);
          setQuery(e.target.value);
        }}
        placeholder={placeholder}
        className={cn(
          "w-full bg-[#050505] border border-white/[0.05] focus:border-white transition-all text-white placeholder:text-gray-600 outline-none",
          variant === 'hero' 
            ? "pl-14 pr-6 py-5 text-lg rounded-2xl shadow-2xl shadow-blue-500/5" 
            : "pl-10 pr-4 py-2.5 text-[11px] rounded-full"
        )}
      />
    </div>
  );
}
