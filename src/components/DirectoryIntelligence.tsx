import React from 'react';
import { RefreshCw, BarChart3, Search, ShieldCheck } from 'lucide-react';

export const DirectoryIntelligence = () => {
  return (
    <div className="w-full mb-6">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        {/* USP 1: Live Metrics */}
        <div className="bg-[#050505] border border-white/[0.05] rounded-lg p-3 flex items-start gap-2.5 hover:border-white/20 transition-all group">
          <div className="mt-0.5">
            <RefreshCw className="w-3.5 h-3.5 text-gray-400 group-hover:text-emerald-500/80 transition-colors" />
          </div>
          <div>
            <h4 className="text-[10px] font-black text-white/90 uppercase tracking-widest mb-0.5">Live Sync</h4>
            <p className="text-[10px] text-gray-500 leading-tight">
              GitHub metrics synced 24h.
            </p>
          </div>
        </div>

        {/* USP 2: Comparisons */}
        <div className="bg-[#050505] border border-white/[0.05] rounded-lg p-3 flex items-start gap-2.5 hover:border-white/20 transition-all group">
          <div className="mt-0.5">
            <BarChart3 className="w-3.5 h-3.5 text-gray-400 group-hover:text-blue-500/80 transition-colors" />
          </div>
          <div>
            <h4 className="text-[10px] font-black text-white/90 uppercase tracking-widest mb-0.5">VS Engine</h4>
            <p className="text-[10px] text-gray-500 leading-tight">
              Head-to-head analysis.
            </p>
          </div>
        </div>

        {/* USP 3: AEO */}
        <div className="bg-[#050505] border border-white/[0.05] rounded-lg p-3 flex items-start gap-2.5 hover:border-white/20 transition-all group">
          <div className="mt-0.5">
            <Search className="w-3.5 h-3.5 text-gray-400 group-hover:text-purple-500/80 transition-colors" />
          </div>
          <div>
            <h4 className="text-[10px] font-black text-white/90 uppercase tracking-widest mb-0.5">AEO Focus</h4>
            <p className="text-[10px] text-gray-500 leading-tight">
              Answer Engine optimized.
            </p>
          </div>
        </div>

        {/* Status: Operational */}
        <div className="bg-[#050505] border border-white/[0.05] rounded-lg p-3 flex flex-col justify-center items-center gap-1 group">
          <div className="text-[8px] font-black text-gray-600 uppercase tracking-[0.2em]">System Status</div>
          <div className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-emerald-500/60" />
            <span className="text-[10px] font-bold text-white/80 uppercase tracking-widest">Operational</span>
          </div>
        </div>

        {/* Live Data */}
        <div className="bg-[#050505] border border-white/[0.05] rounded-lg p-3 flex flex-col justify-center items-center gap-1 group">
          <div className="text-[8px] font-black text-gray-600 uppercase tracking-[0.2em]">Data Feed</div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest italic group-hover:text-blue-400/80 transition-colors">Terminal active</span>
          </div>
        </div>
      </div>
    </div>
  );
};
