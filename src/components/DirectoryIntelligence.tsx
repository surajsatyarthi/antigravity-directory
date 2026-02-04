import { RefreshCw, BarChart3, Search, ShieldCheck, Zap, Bot, Package } from 'lucide-react';
import Link from 'next/link';

export const DirectoryIntelligence = () => {
  return (
    <div className="w-full mb-6">
      {/* Hero Section */}
      <div className="relative py-16 px-6 md:px-12 mb-8 bg-gradient-to-b from-black to-gray-950 rounded-3xl border border-white/10 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">

          {/* Badge Removed */}

          
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-4">
            Antigravity <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Directory</span>
          </h1>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed">
            The Complete Resource Hub for Agentic Development. 
            Discover rules, MCP servers, and prompts.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10">
              <Bot className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-bold text-gray-200">Agentic First</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10">
              <Package className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-bold text-gray-200">500+ Resources</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10">
              <Zap className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-bold text-gray-200">Updated Daily</span>
            </div>
          </div>

        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {/* USP 1: Live Metrics */}
        <div className="bg-[#050505] border border-white/10 rounded-lg p-4 md:p-3.5 flex items-start gap-2.5 transition-all hover:border-white/20">
          <div className="mt-0.5">
            <RefreshCw className="w-5 h-5 md:w-4 md:h-4 text-emerald-500" />
          </div>
          <div>
            <h4 className="text-xs font-black text-white uppercase tracking-widest mb-0.5">Live Sync</h4>
            <p className="text-xs text-gray-300 leading-tight">
              GitHub Stats: Real-time
            </p>
          </div>
        </div>

        {/* USP 2: Comparisons */}
        <div className="bg-[#050505] border border-white/10 rounded-lg p-4 md:p-3.5 flex items-start gap-2.5 transition-all hover:border-white/20">
          <div className="mt-0.5">
            <BarChart3 className="w-5 h-5 md:w-4 md:h-4 text-blue-500" />
          </div>
          <div>
            <h4 className="text-xs font-black text-white uppercase tracking-widest mb-0.5">VS Engine</h4>
            <p className="text-xs text-gray-300 leading-tight">
              Head-to-head analysis.
            </p>
          </div>
        </div>

        {/* USP 3: AEO */}
        <div className="bg-[#050505] border border-white/10 rounded-lg p-4 md:p-3.5 flex items-start gap-2.5 transition-all hover:border-white/20">
          <div className="mt-0.5">
            <Search className="w-5 h-5 md:w-4 md:h-4 text-purple-500" />
          </div>
          <div>
            <h4 className="text-xs font-black text-white uppercase tracking-widest mb-0.5">AEO Focus</h4>
            <p className="text-xs text-gray-300 leading-tight">
              Answer Engine optimized.
            </p>
          </div>
        </div>

        {/* Status: Operational */}
        <div className="bg-[#050505] border border-white/10 rounded-lg p-4 md:p-3.5 flex flex-col justify-center items-center gap-1 hover:border-white/20 transition-all">
          <div className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">Authority</div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            <span className="text-xs font-bold text-white uppercase tracking-widest leading-none">Do-Follow Active</span>
          </div>
        </div>

        {/* Live Data */}
        <div className="bg-[#050505] border border-white/10 rounded-lg p-4 md:p-3.5 flex flex-col justify-center items-center gap-1 group relative overflow-hidden hover:border-white/20 transition-all">
          <div className="absolute inset-0 bg-emerald-500/5 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          <div className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">Limited Offer</div>
          <Link href="/submit" className="flex items-center gap-2">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest italic animate-shimmer bg-gradient-to-r from-emerald-400 via-white to-emerald-400 bg-[length:200%_auto] bg-clip-text text-transparent">Early Adopter Pricing</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
