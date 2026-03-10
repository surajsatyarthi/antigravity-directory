'use client';

import Link from 'next/link';
import { SPONSOR } from '@/config/sponsor';

export function SponsorBadge() {
  if (!SPONSOR.active) {
    return (
      <Link
        href="/advertise"
        className="fixed bottom-4 right-4 z-40 flex flex-col bg-white/[0.04] border border-dashed border-white/[0.08] backdrop-blur-sm p-3 shadow-xl hover:bg-white/[0.07] hover:border-white/[0.15] transition-all"
      >
        <span className="text-[9px] font-mono text-gray-600 mb-1 uppercase tracking-widest">Advertise here</span>
        <span className="text-[10px] font-bold text-blue-400/50 hover:text-blue-400 transition-colors">Learn more →</span>
      </Link>
    );
  }

  return (
    <a
      href={SPONSOR.href}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className="fixed bottom-4 right-4 z-40 flex flex-col bg-white/[0.05] border border-white/[0.08] backdrop-blur-sm rounded-xl p-3 shadow-xl hover:bg-white/[0.08] transition-all"
    >
      <span className="text-[9px] font-mono text-gray-500 mb-1.5 uppercase tracking-widest">Sponsored by</span>
      {SPONSOR.logoUrl ? (
        <img src={SPONSOR.logoUrl} alt={SPONSOR.name} className="h-[18px] w-auto" />
      ) : (
        <span className="text-xs font-bold text-white">{SPONSOR.name}</span>
      )}
    </a>
  );
}
