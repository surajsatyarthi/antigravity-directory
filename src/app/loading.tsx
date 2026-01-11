export default function Loading() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-[1920px] mx-auto px-6 py-8">
        <div className="flex gap-6">
          {/* Sidebar Skeleton */}
          <div className="w-[280px]">
            <div className="bg-gray-950 border border-gray-800 rounded-lg p-4 animate-pulse">
              <div className="h-6 bg-gray-900 rounded mb-4"></div>
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-4 bg-gray-900 rounded"></div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Main Content Skeleton */}
          <div className="flex-1">
            {/* Top Bar Skeleton */}
            <div className="mb-6 space-y-4">
              <div className="flex gap-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-10 w-32 bg-gray-900 rounded-full animate-pulse"></div>
                ))}
              </div>
              <div className="h-12 bg-gray-900 rounded-lg animate-pulse"></div>
            </div>
            
            {/* Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="h-64 bg-gray-950 border border-gray-800 rounded-lg animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
