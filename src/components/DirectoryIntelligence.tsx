import React from 'react';
import Link from 'next/link';
import { RefreshCw, BarChart3, Search, ShieldCheck } from 'lucide-react';

export const DirectoryIntelligence = () => {
  return (
    <div className="w-full mb-6">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        {/* USP 1: Live Metrics */}
        <div className="bg-[#050505] border border-white/10 rounded-lg p-3.5 flex items-start gap-2.5 transition-all hover:border-white/20">
          <div className="mt-0.5">
            <RefreshCw className="w-4 h-4 text-emerald-500" />
          </div>
          <div>
            <h4 className="text-xs font-black text-white uppercase tracking-widest mb-0.5">Live Sync</h4>
            <p className="text-xs text-gray-300 leading-tight">
              GitHub metrics synced 24h.
            </p>
          </div>
        </div>

        {/* USP 2: Comparisons */}
        <div className="bg-[#050505] border border-white/10 rounded-lg p-3.5 flex items-start gap-2.5 transition-all hover:border-white/20">
          <div className="mt-0.5">
            <BarChart3 className="w-4 h-4 text-blue-500" />
          </div>
          <div>
            <h4 className="text-xs font-black text-white uppercase tracking-widest mb-0.5">VS Engine</h4>
            <p className="text-xs text-gray-300 leading-tight">
              Head-to-head analysis.
            </p>
          </div>
        </div>

        {/* USP 3: AEO */}
        <div className="bg-[#050505] border border-white/10 rounded-lg p-3.5 flex items-start gap-2.5 transition-all hover:border-white/20">
          <div className="mt-0.5">
            <Search className="w-4 h-4 text-purple-500" />
          </div>
          <div>
            <h4 className="text-xs font-black text-white uppercase tracking-widest mb-0.5">AEO Focus</h4>
            <p className="text-xs text-gray-300 leading-tight">
              Answer Engine optimized.
            </p>
          </div>
        </div>

        {/* Status: Operational */}
        <div className="bg-[#050505] border border-white/10 rounded-lg p-3.5 flex flex-col justify-center items-center gap-1 hover:border-white/20 transition-all">
          <div className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">Authority</div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            <span className="text-xs font-bold text-white uppercase tracking-widest leading-none">Do-Follow Active</span>
          </div>
        </div>

        {/* Live Data */}
        <div className="bg-[#050505] border border-white/10 rounded-lg p-3.5 flex flex-col justify-center items-center gap-1 group relative overflow-hidden hover:border-white/20 transition-all">
          <div className="absolute inset-0 bg-emerald-500/5 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          <div className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">Limited Offer</div>
          <Link href="/submit" className="flex items-center gap-2">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest italic animate-shimmer bg-gradient-to-r from-emerald-400 via-white to-emerald-400 bg-[length:200%_auto] bg-clip-text text-transparent">Join Founding 50</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
