'use client';

import { useEffect, useState } from 'react';

interface Stats {
  totalTools: number;
  totalCreators: number;
  totalEarnings: number;
}

export function StatsBar() {
  const stats = [
    { label: 'Resources', value: '2,200+', icon: '💎' },
    { label: 'Active Creators', value: '500+', icon: '🦊' },
    { label: 'Creator Payouts', value: '$50k+', icon: '💰' },
    { label: 'Monthly Traffic', value: '10k+', icon: '📈' },
  ];

  return (
    <div className="bg-white border-y border-slate-200 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/[0.05] border-x border-slate-200">
          {stats.map((stat, i) => (
            <div key={i} className="py-10 px-6 text-center group transition-all hover:bg-white/[0.02] cursor-default">
              <div className="flex flex-col items-center gap-1">
                <span className="text-4xl font-black text-slate-900 mb-2 tracking-tighter group-hover:scale-110 group-hover:text-blue-500 transition-all duration-300">
                  {stat.value}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 group-hover:text-slate-500 transition-colors">
                    {stat.label}
                  </span>
                  <span className="text-xs grayscale group-hover:grayscale-0 transition-all">{stat.icon}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Confidence Row */}
        <div className="py-8 border-t border-slate-200 flex flex-wrap justify-center gap-12">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.3em]">5000+ Daily Visitors</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.3em]">9.1/10 Satisfaction</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.3em]">80% Commission Payout</p>
          </div>
        </div>
      </div>
    </div>
  );
}
