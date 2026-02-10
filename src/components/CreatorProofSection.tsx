'use client';

import React from 'react';

const creators = [
  { 
    name: 'Alex River', 
    role: 'Prompt Engineer', 
    icon: '⚡', 
    earn: '$12,400', 
    bio: 'Specializing in high-density prompt chains for software engineering teams.',
    specialty: 'LLM Architect'
  },
  { 
    name: 'Sarah Chen', 
    role: 'Workflow Architect', 
    icon: '🛠️', 
    earn: '$9,150', 
    bio: 'Creating cross-platform automation tools for rapid startup scaling.',
    specialty: 'Automation Pro'
  },
  { 
    name: 'Marcus Bell', 
    role: 'MCP Developer', 
    icon: '💼', 
    earn: '$18,800', 
    bio: 'Top contributor to the MCP ecosystem with 50+ enterprise integrations.',
    specialty: 'Integration Lead'
  },
];

export function CreatorProofSection() {
  return (
    <section className="py-32 relative overflow-hidden bg-white/[0.01]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-left mb-20 max-w-2xl">
          <div className="inline-block w-12 h-1 bg-blue-500 mb-6" />
          <h2 className="text-sm font-black uppercase tracking-[0.4em] text-blue-500 mb-4">Creator Spotlight</h2>
          <h3 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-6">
            Join the World's <br />
            Most Profitable <br />
            AI Creators.
          </h3>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-[11px] leading-relaxed">
            Antigravity is the home for the next wave of developer-entrepreneurs. 
            Build once, list here, and earn for life.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.05] border border-white/[0.05]">
          {creators.map((c, i) => (
            <div key={i} className="group relative bg-black p-10 transition-all duration-500 hover:bg-white/[0.02]">
              <div className="flex items-center justify-between mb-10">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-white/10 flex items-center justify-center text-3xl">
                  {c.icon}
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 mb-1">Status</div>
                  <div className="text-[11px] font-black text-blue-500 uppercase tracking-widest flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                    Verified Creator
                  </div>
                </div>
              </div>

              <h4 className="text-2xl font-black text-white mb-1 uppercase tracking-tight group-hover:text-blue-400 transition-colors">
                {c.name}
              </h4>
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500/50 mb-6">
                {c.specialty}
              </div>
              
              <p className="text-gray-400 text-sm mb-10 font-medium leading-relaxed min-h-[4rem]">
                "{c.bio}"
              </p>
              
              <div className="pt-8 border-t border-white/[0.05]">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600">Total Lifetime Earnings</span>
                  <span className="text-white font-black text-2xl tracking-tighter group-hover:text-blue-500 transition-colors">
                    {c.earn}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
            <button className="text-[11px] font-black uppercase tracking-[0.4em] text-white hover:text-blue-500 transition-colors flex items-center gap-3 mx-auto group">
                View All Creator Stories
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
            </button>
        </div>
      </div>
    </section>
  );
}
