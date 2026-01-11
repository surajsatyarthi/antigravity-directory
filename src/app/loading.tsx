export default function Loading() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* Left Rail Skeleton */}
          <aside className="lg:w-[300px] shrink-0">
            <div className="bg-[#0A0A0A] border border-gray-900 rounded-3xl p-6 animate-pulse">
              <div className="h-6 w-32 bg-gray-900 rounded-lg mb-8" />
              <div className="space-y-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="space-y-3">
                    <div className="h-4 w-24 bg-gray-900 rounded" />
                    <div className="h-10 w-full bg-gray-900/50 rounded-xl" />
                  </div>
                ))}
              </div>
            </div>
          </aside>
          
          {/* Center Rail Skeleton */}
          <div className="flex-1 min-w-0">
            {/* Top Bar Skeleton */}
            <div className="mb-8 space-y-4 animate-pulse">
              <div className="flex gap-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-10 w-28 bg-gray-900 rounded-full" />
                ))}
              </div>
              <div className="h-14 w-full bg-gray-900 rounded-2xl" />
            </div>
            
            {/* Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-[320px] bg-[#0A0A0A] border border-gray-900 rounded-2xl animate-pulse relative overflow-hidden">
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between">
                      <div className="h-6 w-24 bg-gray-900 rounded-md" />
                      <div className="h-6 w-6 bg-gray-900 rounded-full" />
                    </div>
                    <div className="h-8 w-3/4 bg-gray-900 rounded-lg" />
                    <div className="space-y-2">
                      <div className="h-4 w-full bg-gray-900/50 rounded" />
                      <div className="h-4 w-5/6 bg-gray-900/50 rounded" />
                    </div>
                    <div className="pt-4 border-t border-gray-900 mt-auto flex justify-between">
                      <div className="h-6 w-20 bg-gray-900 rounded" />
                      <div className="h-6 w-16 bg-gray-900 rounded" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Rail Skeleton (Desktop Only) */}
          <aside className="hidden 2xl:block w-[320px] shrink-0">
            <div className="space-y-6 animate-pulse">
              <div className="h-[280px] bg-gray-900 rounded-3xl" />
              <div className="h-[400px] bg-gray-900/30 border border-gray-900 rounded-3xl" />
            </div>
          </aside>
          
        </div>
      </div>
    </div>
  );
}
