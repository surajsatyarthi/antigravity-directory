'use client';

import { Search, MapPin, X } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition, useEffect, useState } from 'react';

export function MemberFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [searchValue, setSearchValue] = useState(searchParams.get('q') || '');

  // Debounced search update
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      if (searchValue) {
        params.set('q', searchValue);
      } else {
        params.delete('q');
      }
      
      startTransition(() => {
        router.push(`/members?${params.toString()}`);
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [searchValue, router, searchParams]);

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-12">
      <div className="relative flex-1 group">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-blue-500 transition-colors" />
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search by name, tagline, or sector..."
          className="w-full bg-[#050505] border border-gray-900 rounded-2xl py-4 pl-14 pr-12 text-white font-medium placeholder:text-gray-700 outline-none focus:border-blue-500/50 transition-all text-sm shadow-inner"
        />
        {searchValue && (
          <button
            onClick={() => setSearchValue('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-900 rounded-lg text-gray-600 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="relative md:w-64 group">
        <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-blue-500 transition-colors" />
        <select 
          onChange={(e) => {
            const params = new URLSearchParams(searchParams);
            if (e.target.value) {
              params.set('location', e.target.value);
            } else {
              params.delete('location');
            }
            startTransition(() => {
              router.push(`/members?${params.toString()}`);
            });
          }}
          className="w-full bg-[#050505] border border-gray-900 rounded-2xl py-4 pl-14 pr-6 text-white font-medium outline-none focus:border-blue-500/50 transition-all text-sm appearance-none cursor-pointer"
        >
          <option value="">All Locations</option>
          <option value="remote">Remote Sector</option>
          <option value="san francisco">San Francisco</option>
          <option value="london">London</option>
          <option value="berlin">Berlin</option>
          <option value="austin">Austin</option>
          <option value="bengaluru">Bengaluru</option>
        </select>
        {isPending && (
          <div className="absolute right-12 top-1/2 -translate-y-1/2">
            <div className="w-3 h-3 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-700">
           <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
             <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
           </svg>
        </div>
      </div>
    </div>
  );
}
