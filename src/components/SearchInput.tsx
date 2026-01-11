'use client';

import { Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';

export function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState(searchParams.get('q') || '');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (query) {
        params.set('q', query);
      } else {
        params.delete('q');
      }

      startTransition(() => {
        router.replace(`/?${params.toString()}`, { scroll: false });
      });
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query, router, searchParams]);

  return (
    <div className="flex-1 max-w-2xl relative">
      <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isPending ? 'text-blue-500 animate-pulse' : 'text-gray-500'}`} />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search prompts, rules, MCPs..."
        className="w-full bg-[#0A0A0A] border border-gray-800 focus:border-white rounded-full pl-10 pr-4 py-2 text-sm transition-all text-white placeholder:text-gray-600 outline-none"
      />
    </div>
  );
}
