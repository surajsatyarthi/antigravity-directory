import React from 'react';
import { RefreshCw, BarChart3, Search, ShieldCheck } from 'lucide-react';

export const DirectoryIntelligence = () => {
  return (
    <div className="w-full mb-6">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        {/* USP 1: Live Metrics */}
        <div className="bg-[#050505] border border-white/[0.08] rounded-lg p-3 flex items-start gap-2.5 transition-all">
          <div className="mt-0.5">
            <RefreshCw className="w-3.5 h-3.5 text-emerald-500/90" />
          </div>
          <div>
            <h4 className="text-[10px] font-black text-white uppercase tracking-widest mb-0.5">Live Sync</h4>
            <p className="text-[10px] text-gray-400 leading-tight">
              GitHub metrics synced 24h.
            </p>
          </div>
        </div>

        {/* USP 2: Comparisons */}
        <div className="bg-[#050505] border border-white/[0.08] rounded-lg p-3 flex items-start gap-2.5 transition-all">
          <div className="mt-0.5">
            <BarChart3 className="w-3.5 h-3.5 text-blue-500/90" />
          </div>
          <div>
            <h4 className="text-[10px] font-black text-white uppercase tracking-widest mb-0.5">VS Engine</h4>
            <p className="text-[10px] text-gray-400 leading-tight">
              Head-to-head analysis.
            </p>
          </div>
        </div>

        {/* USP 3: AEO */}
        <div className="bg-[#050505] border border-white/[0.08] rounded-lg p-3 flex items-start gap-2.5 transition-all">
          <div className="mt-0.5">
            <Search className="w-3.5 h-3.5 text-purple-500/90" />
          </div>
          <div>
            <h4 className="text-[10px] font-black text-white uppercase tracking-widest mb-0.5">AEO Focus</h4>
            <p className="text-[10px] text-gray-400 leading-tight">
              Answer Engine optimized.
            </p>
          </div>
        </div>

        {/* Status: Operational */}
        <div className="bg-[#050505] border border-white/[0.08] rounded-lg p-3 flex flex-col justify-center items-center gap-1">
          <div className="text-[8px] font-black text-gray-400 uppercase tracking-[0.2em]">System Status</div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            <span className="text-[10px] font-bold text-white uppercase tracking-widest">Operational</span>
          </div>
        </div>

        {/* Live Data */}
        <div className="bg-[#050505] border border-white/[0.08] rounded-lg p-3 flex flex-col justify-center items-center gap-1">
          <div className="text-[8px] font-black text-gray-400 uppercase tracking-[0.2em]">Data Feed</div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest italic animate-shimmer bg-gradient-to-r from-blue-400 via-white to-blue-400 bg-[length:200%_auto] bg-clip-text text-transparent">Terminal active</span>
          </div>
        </div>
      </div>
    </div>
  );
};
