'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { FILTERS } from '@/constants';

export function SortBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get('sort') || FILTERS.DEFAULT_SORT;

  const setSort = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', value);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex items-center gap-1 mb-6">
      {FILTERS.SORT_OPTIONS.map((option) => {
        const isActive = currentSort === option.value;
        return (
          <button
            key={option.value}
            onClick={() => setSort(option.value)}
            className={`px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide transition-colors ${
              isActive
                ? 'text-white bg-white/[0.08] border border-white/[0.12]'
                : 'text-slate-400 hover:text-white border border-transparent hover:border-white/[0.06]'
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
