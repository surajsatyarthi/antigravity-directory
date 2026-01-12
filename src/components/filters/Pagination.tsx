'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  totalCount: number;
  pageSize: number;
}

export function Pagination({ totalCount, pageSize }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const totalPages = Math.ceil(totalCount / pageSize);
  const currentPage = Number(searchParams.get('page')) || 1;

  if (totalPages <= 1) return null;

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    if (page === 1) {
      params.delete('page');
    } else {
      params.set('page', page.toString());
    }
    router.push(`?${params.toString()}`, { scroll: false });
    // Scroll to top of grid
    const grid = document.getElementById('resource-grid');
    if (grid) {
      grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const pages = [];
  const maxVisiblePages = 5;
  
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  
  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <nav 
      className="flex items-center justify-center gap-1.5 mt-8 py-4 border-t border-white/[0.05]"
      aria-label="Pagination"
    >
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-1.5 text-gray-600 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
        aria-label="Previous page"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      <div className="flex items-center gap-1">
        {startPage > 1 && (
          <>
            <button
              onClick={() => handlePageChange(1)}
              className="w-7 h-7 flex items-center justify-center rounded text-[11px] font-bold text-gray-700 hover:text-white hover:bg-white/5 transition-all"
            >
              1
            </button>
            {startPage > 2 && <span className="text-gray-800 mx-1 text-[10px]">...</span>}
          </>
        )}

        {pages.map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`w-7 h-7 flex items-center justify-center rounded text-[11px] font-bold transition-all ${
              currentPage === page
                ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                : 'text-gray-700 hover:text-white hover:bg-white/5'
            }`}
            aria-current={currentPage === page ? 'page' : undefined}
          >
            {page}
          </button>
        ))}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span className="text-gray-800 mx-1 text-[10px]">...</span>}
            <button
              onClick={() => handlePageChange(totalPages)}
              className="w-7 h-7 flex items-center justify-center rounded text-[11px] font-bold text-gray-700 hover:text-white hover:bg-white/5 transition-all"
            >
              {totalPages}
            </button>
          </>
        )}
      </div>

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-1.5 text-gray-600 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
        aria-label="Next page"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </nav>
  );
}
