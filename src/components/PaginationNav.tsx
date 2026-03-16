import Link from 'next/link';

interface PaginationNavProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export function PaginationNav({ currentPage, totalPages, basePath }: PaginationNavProps) {
  if (totalPages <= 1) return null;

  // Helper to generate page URL
  const getPageUrl = (page: number) => {
    if (page === 1) return basePath;
    return `${basePath}/page/${page}`;
  };

  // Calculate visible page numbers (show up to 5 around current)
  const maxVisiblePages = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = startPage + maxVisiblePages - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center items-center space-x-2 mt-12 py-8 border-t border-gray-800">
      {/* Previous Button */}
      {currentPage > 1 ? (
        <Link
          href={getPageUrl(currentPage - 1)}
          className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-900 border border-gray-800 rounded-md hover:bg-gray-800 hover:text-white transition-colors"
          rel="prev"
        >
          Previous
        </Link>
      ) : null}

      {/* Page Numbers */}
      <div className="hidden sm:flex items-center space-x-2">
        {startPage > 1 ? (
          <>
            <Link
              href={getPageUrl(1)}
              className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
            >
              1
            </Link>
            {startPage > 2 ? <span className="px-2 py-2 text-gray-600">...</span> : null}
          </>
        ) : null}

        {pages.map(page => (
          <Link
            key={page}
            href={getPageUrl(page)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              currentPage === page
                ? 'bg-[#E3FB54] text-black'
                : 'text-gray-400 hover:bg-gray-800 hover:text-white'
            }`}
            aria-current={currentPage === page ? 'page' : undefined}
          >
            {page}
          </Link>
        ))}

        {endPage < totalPages ? (
          <>
            {endPage < totalPages - 1 ? <span className="px-2 py-2 text-gray-600">...</span> : null}
            <Link
              href={getPageUrl(totalPages)}
              className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
            >
              {totalPages}
            </Link>
          </>
        ) : null}
      </div>

      {/* Mobile Page Indicator */}
      <span className="sm:hidden px-4 py-2 text-sm text-gray-400">
        Page {currentPage} of {totalPages}
      </span>

      {/* Next Button */}
      {currentPage < totalPages ? (
        <Link
          href={getPageUrl(currentPage + 1)}
          className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-900 border border-gray-800 rounded-md hover:bg-gray-800 hover:text-white transition-colors"
          rel="next"
        >
          Next
        </Link>
      ) : null}
    </div>
  );
}
