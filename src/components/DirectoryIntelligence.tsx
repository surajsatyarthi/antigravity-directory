import React from 'react';
import { RefreshCw, BarChart3, Search, ShieldCheck } from 'lucide-react';

export const DirectoryIntelligence = () => {
  return (
    <div className="w-full mb-8">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* USP 1: Live Metrics */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4 flex items-start gap-3 hover:border-emerald-500/30 transition-all group">
          <div className="mt-0.5">
            <RefreshCw className="w-4 h-4 text-emerald-400 animate-spin-slow" />
          </div>
          <div>
            <h4 className="text-[11px] font-black text-white uppercase tracking-wider mb-1">Live Sync</h4>
            <p className="text-[10px] text-gray-500 leading-tight">
              GitHub stars & forks synced every 24h.
            </p>
          </div>
        </div>

        {/* USP 2: Comparisons */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4 flex items-start gap-3 hover:border-blue-500/30 transition-all group">
          <div className="mt-0.5">
            <BarChart3 className="w-4 h-4 text-blue-400" />
          </div>
          <div>
            <h4 className="text-[11px] font-black text-white uppercase tracking-wider mb-1">VS Engine</h4>
            <p className="text-[10px] text-gray-500 leading-tight">
              Head-to-head technical analysis.
            </p>
          </div>
        </div>

        {/* USP 3: AEO */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4 flex items-start gap-3 hover:border-purple-500/30 transition-all group">
          <div className="mt-0.5">
            <Search className="w-4 h-4 text-purple-400" />
          </div>
          <div>
            <h4 className="text-[11px] font-black text-white uppercase tracking-wider mb-1">AEO Focus</h4>
            <p className="text-[10px] text-gray-500 leading-tight">
              Citable by SearchGPT & Gemini.
            </p>
          </div>
        </div>

        {/* Status: Operational */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4 flex flex-col justify-center items-center gap-1 group">
          <div className="text-[9px] font-black text-gray-600 uppercase tracking-[0.2em]">System Status</div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-bold text-white uppercase tracking-widest">Operational</span>
          </div>
        </div>

        {/* Live Data */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4 flex flex-col justify-center items-center gap-1 group">
          <div className="text-[9px] font-black text-gray-600 uppercase tracking-[0.2em]">Data Feed</div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-blue-500 uppercase tracking-widest italic">Live Terminal</span>
          </div>
        </div>
      </div>
    </div>
  );
};
