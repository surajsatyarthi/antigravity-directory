'use client';

import Link from 'next/link';
import { Zap, Search, Briefcase } from 'lucide-react';

export function CTASection() {
  return (
    <section className="py-24 px-4 bg-black overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="relative max-w-4xl mx-auto text-center z-10">
        <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">Ready to Earn?</h2>
        <div className="h-1.5 w-24 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8" />
        
        <p className="text-xl md:text-2xl text-gray-400 mb-12 font-medium max-w-2xl mx-auto">
          List your tool for free. Reach 5,000+ daily visitors. <br />
          <span className="text-white">Keep 80% of every sale.</span>
        </p>

        <div className="flex flex-wrap items-center justify-center gap-6">
          <Link
            href="/submit"
            className="group flex items-center gap-3 px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-blue-600/20 hover:scale-105"
          >
            <Zap className="w-5 h-5 fill-white group-hover:scale-110 transition-transform" />
            Claim Your Tool
          </Link>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/prompts"
              className="flex items-center gap-2 px-8 py-5 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl border border-white/5 transition-all"
            >
              <Search className="w-4 h-4" />
              Browse Tools
            </Link>
            <Link
              href="/jobs"
              className="flex items-center gap-2 px-8 py-5 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl border border-white/5 transition-all"
            >
              <Briefcase className="w-4 h-4" />
              Post a Job
            </Link>
          </div>
        </div>

        <p className="mt-12 text-gray-500 text-xs font-bold uppercase tracking-[0.2em]">
          Join 500+ creators building the next generation of AI tools
        </p>
      </div>
    </section>
  );
}
