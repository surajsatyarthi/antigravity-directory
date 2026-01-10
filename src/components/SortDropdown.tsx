'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';
import { ChevronDown } from 'lucide-react';

export function SortDropdown() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  
  const currentSort = searchParams.get('sort') || 'latest';

  const sortOptions = [
    { label: 'Latest', value: 'latest' },
    { label: 'Most Viewed', value: 'views' },
    { label: 'Top Rated', value: 'rating' },
  ];

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', value);
    
    startTransition(() => {
      router.push(`/?${params.toString()}`);
    });
  };

  return (
    <div className="relative inline-block text-left">
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Sort by</span>
        <select
          value={currentSort}
          onChange={(e) => handleSortChange(e.target.value)}
          disabled={isPending}
          className="appearance-none bg-transparent text-xs font-bold text-white uppercase tracking-widest outline-none pr-6 cursor-pointer hover:text-blue-500 transition-colors"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value} className="bg-black text-white">
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-0 w-3 h-3 text-gray-500 pointer-events-none" />
      </div>
      {isPending && (
        <div className="absolute -bottom-1 left-0 w-full h-[1px] bg-blue-500 animate-pulse" />
      )}
    </div>
  );
}
