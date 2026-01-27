'use client';

interface SponsoredCardProps {
  position: number;
}

export function SponsoredCard({ position }: SponsoredCardProps) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-dashed border-white/10 bg-[#0A0A0A]/50 transition-all hover:border-blue-500/30">
      {/* Placeholder Content */}
      <div className="flex h-full min-h-[400px] flex-col items-center justify-center p-8 text-center">
        {/* Icon */}
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-white/5">
          <svg
            className="h-8 w-8 text-white/20"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>

        {/* Text */}
        <p className="mb-2 font-mono text-[10px] font-black uppercase tracking-[0.3em] text-white/30">
          Ad Slot #{position}
        </p>
        <p className="font-mono text-[9px] uppercase tracking-widest text-white/20">
          Sponsored Content
        </p>

        {/* Dimensions Info */}
        <div className="mt-6 rounded-lg border border-white/5 bg-white/5 px-4 py-2">
          <p className="font-mono text-[8px] uppercase tracking-wider text-white/40">
            Match Resource Card Size
          </p>
        </div>
      </div>

      {/* Corner Badge */}
      <span className="absolute right-3 top-3 rounded-full bg-blue-500/10 px-2 py-1 font-mono text-[8px] font-black uppercase tracking-widest text-blue-400/50">
        Placeholder
      </span>
    </div>
  );
}
