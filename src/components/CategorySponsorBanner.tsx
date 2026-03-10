'use client';

import Link from 'next/link';
import { SPONSOR } from '@/config/sponsor';

export function CategorySponsorBanner() {
  if (!SPONSOR.active) {
    return (
      <Link
        href="/advertise"
        className="group flex items-center gap-4 w-full bg-white/[0.02] border border-dashed border-white/[0.06] hover:border-white/[0.15] transition-all duration-200 px-5 py-3 mb-6"
      >
        <span className="text-[9px] font-black text-gray-700 uppercase tracking-[0.2em] shrink-0">Sponsored</span>
        <div className="w-px h-4 bg-white/[0.06] shrink-0" />
        <span className="text-sm text-gray-700 group-hover:text-gray-500 transition-colors font-medium truncate">
          Your tool here — reach developers building with Google Antigravity IDE
        </span>
        <span className="ml-auto text-[10px] uppercase tracking-widest font-bold text-blue-400/40 group-hover:text-blue-400 transition-colors shrink-0">
          Advertise →
        </span>
      </Link>
    );
  }

  return (
    <a
      href={SPONSOR.href}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className="group flex items-center gap-4 w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-5 py-3 mb-6 hover:border-white/20 transition-all duration-200"
    >
      <span className="text-[9px] font-black text-gray-600 uppercase tracking-[0.2em] shrink-0">Sponsored</span>

      <div className="w-px h-4 bg-white/[0.08] shrink-0" />

      {SPONSOR.logoUrl && (
        <img
          src={SPONSOR.logoUrl}
          alt={SPONSOR.name}
          className="h-5 w-auto object-contain shrink-0"
        />
      )}

      <span className="text-sm text-gray-400 font-medium truncate">
        {SPONSOR.tagline || SPONSOR.description}
      </span>

      <span className="ml-auto text-[10px] uppercase tracking-widest font-bold text-blue-400/60 group-hover:text-blue-400 transition-colors shrink-0">
        Learn more →
      </span>
    </a>
  );
}
