import Link from 'next/link';
import { Home, Search, Eye, Sparkles, Zap } from 'lucide-react';
import { MarketplaceHeader } from '@/components/MarketplaceHeader';


export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex flex-col selection:bg-white/10">
      <MarketplaceHeader />
      
      <main className="flex-1 flex flex-col items-center justify-center p-4 text-center">
        <div className="relative mb-12">
          {/* Decorative Glitch Effect */}
          <div className="absolute inset-0 bg-blue-600 blur-[100px] opacity-20 animate-pulse" />
          <div className="relative w-24 h-24 bg-white/5 rounded-[32px] border border-gray-800 flex items-center justify-center mb-8 mx-auto">
            <Zap className="w-12 h-12 text-white/50" />
            <div className="absolute -top-2 -right-2 bg-red-600 text-[10px] font-black px-2 py-1 rounded-lg animate-bounce font-mono">
              404
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white uppercase italic leading-none mb-4">
            Page Not Found
          </h1>
          <p className="text-gray-500 font-mono text-sm uppercase tracking-widest max-w-md mx-auto">
            Sorry, the page you are looking for doesn't exist.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link 
            href="/" 
            className="group flex items-center justify-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-2xl hover:bg-blue-600 hover:text-white transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-blue-500/20"
          >
            <Home className="w-5 h-5" />
            Go Home
          </Link>
          <Link 
            href="/resources" 
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 text-white border border-white/10 font-black rounded-2xl hover:bg-white/10 transition-all uppercase tracking-widest text-xs active:scale-95"
          >
            <Search className="w-4 h-4" />
            Browse Resources
          </Link>
        </div>

        {/* End of content */}
      </main>


    </div>
  );
}
