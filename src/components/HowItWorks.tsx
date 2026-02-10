'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const steps = [
  { 
    title: 'Discover AI Tools', 
    desc: 'Access our massive directory of 2,200+ world-class AI agents, MCP servers, and prompt libraries.', 
    icon: '01',
    label: 'Identify'
  },
  { 
    title: 'Create Your Own', 
    desc: 'Use our developer guides and community resources to build your own high-utility AI products.', 
    icon: '02',
    label: 'Build'
  },
  { 
    title: 'Sell on Antigravity', 
    desc: 'List your tools on our marketplace, tap into our 10k+ monthly traffic, and keep 80% of every sale.', 
    icon: '03',
    label: 'Monetize'
  },
];

export function HowItWorks() {
  return (
    <section className="py-40 border-t border-white/[0.05] relative overflow-hidden bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-24">
            <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-500 mb-6">The Antigravity Loop</h2>
            <h3 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-[0.9]">
                How we power the <br /> 
                next generation of <br />
                AI builders.
            </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24">
          {steps.map((step, i) => (
            <div key={i} className="group flex flex-col items-start relative">
              {/* Step Number Background */}
              <div className="absolute -top-12 -left-6 text-9xl font-black text-white/[0.03] select-none group-hover:text-blue-500/10 transition-colors pointer-events-none">
                {step.icon}
              </div>
              
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500 mb-6 flex items-center gap-4">
                <span className="w-8 h-px bg-blue-500/30" />
                {step.label}
              </div>

              <h4 className="text-2xl font-black text-white uppercase tracking-tight mb-6 group-hover:text-blue-400 transition-colors">
                {step.title}
              </h4>
              <p className="text-gray-500 font-bold text-sm leading-relaxed max-w-[320px] mb-8">
                {step.desc}
              </p>
              
              <div className="mt-auto pt-6 w-full border-t border-white/[0.05] group-hover:border-blue-500/30 transition-colors" />
            </div>
          ))}
        </div>
      </div>

      {/* Background Decorative Text */}
      <div className="absolute bottom-0 right-0 text-[15vw] font-black text-white/[0.01] leading-none uppercase select-none pointer-events-none -mb-10 translate-x-20">
        Build
      </div>
    </section>
  );
}
