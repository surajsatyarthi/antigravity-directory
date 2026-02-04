'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      number: "1️⃣",
      title: "Claim Your Tool",
      description: "GitHub login - 2 minutes setup. Zero friction onboarding.",
    },
    {
      number: "2️⃣",
      title: "Set Your Price",
      description: "$9, $29, $99, or custom. Flexible pricing control.",
    },
    {
      number: "3️⃣",
      title: "Start Earning",
      description: "Direct payouts. We handle processing. You keep 80%.",
    },
  ];

  return (
    <section className="py-24 px-4 bg-[#050505] border-y border-white/[0.05]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">How It Works</h2>
          <div className="h-1 w-20 bg-emerald-500 mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 px-4">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              <div className="text-4xl mb-6 grayscale group-hover:grayscale-0 transition-all">{step.number}</div>
              <h3 className="text-xl font-black text-white mb-3 tracking-tight">{step.title}</h3>
              <p className="text-gray-400 leading-relaxed font-medium">{step.description}</p>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-6 right-[-2.5rem] text-white/10 group-hover:text-white/20 transition-colors">
                  <ArrowRight className="w-8 h-8" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          <Link
            href="/submit"
            className="flex items-center gap-2 group px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-900/20"
          >
            Get Started 
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/members"
            className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl border border-white/5 transition-all text-center"
          >
            Browse Successful Creators
          </Link>
        </div>
      </div>
    </section>
  );
}
