import React from 'react';
import { RefreshCw, BarChart3, Search, ShieldCheck } from 'lucide-react';

export const DirectoryIntelligence = () => {
  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 mb-8">
      <h3 className="text-xs font-black text-blue-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
        <ShieldCheck className="w-4 h-4" /> Directory Intelligence
      </h3>
      
      <div className="space-y-6">
        <div className="flex gap-4">
          <div className="mt-1">
            <RefreshCw className="w-5 h-5 text-emerald-400 animate-spin-slow" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white mb-0.5">Live Metrics Sync</h4>
            <p className="text-[11px] text-gray-500 leading-relaxed">
              Real-time GitHub stars and forks synchronization every 24 hours.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="mt-1">
            <BarChart3 className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white mb-0.5">Comparison Engine</h4>
            <p className="text-[11px] text-gray-500 leading-relaxed">
              Programmatic head-to-head analysis for data-driven tool selection.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="mt-1">
            <Search className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white mb-0.5">AEO Optimized</h4>
            <p className="text-[11px] text-gray-500 leading-relaxed">
              High-fidelity structured data for direct citation in AI Search Engines.
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-6 pt-6 border-t border-white/5">
        <div className="flex items-center justify-between text-[10px] font-mono text-gray-600">
          <span>STATUS: OPERATIONAL</span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            LIVE DATA
          </span>
        </div>
      </div>
    </div>
  );
};
