'use client';

import { useEffect, useState } from 'react';

interface Stats {
  totalTools: number;
  totalCreators: number;
  totalEarnings: number;
}

export function StatsBar() {
  const [stats, setStats] = useState<Stats>({
    totalTools: 2200,
    totalCreators: 500,
    totalEarnings: 100000,
  });

  useEffect(() => {
    // In a real app, fetch from database
    // For now using mock stats
  }, []);

  return (
    <section className="bg-black py-12 px-4 border-y border-white/[0.05]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 items-center">
          <div className="text-center lg:text-left">
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] mb-2">Platform Metrics</p>
            <h2 className="text-xl font-black text-white tracking-tight uppercase">Live Stats</h2>
          </div>
          
          <div className="h-10 w-px bg-white/10 hidden lg:block mx-auto" />

          <div className="text-center">
            <p className="text-3xl font-black text-white mb-1">{stats.totalTools.toLocaleString()}+</p>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Tools Listed</p>
          </div>

          <div className="text-center">
            <p className="text-3xl font-black text-emerald-400 mb-1">{stats.totalCreators.toLocaleString()}+</p>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Creators Earning</p>
          </div>

          <div className="text-center">
            <p className="text-3xl font-black text-blue-400 mb-1">${(stats.totalEarnings / 1000).toFixed(0)}k+</p>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Creator Revenue</p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/[0.05] flex flex-wrap justify-center gap-12">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">5000+ Daily Visitors</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">9.8/10 Satisfaction</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">80% Commission Payout</p>
          </div>
        </div>
      </div>
    </section>
  );
}
