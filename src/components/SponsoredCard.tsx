'use client';

interface SponsoredCardProps {
  position: number;
}

export function SponsoredCard({ position }: SponsoredCardProps) {
  return (
    <div className="group relative flex flex-col sm:flex-row items-start sm:items-center bg-[#050505] border border-dashed border-white/10 rounded-lg overflow-hidden hover:border-blue-500/30 transition-all duration-300 min-h-[140px]">
      
      {/* Sponsored Badge (Top Right) */}
      <div className="absolute top-0 right-0 z-30 flex items-center gap-1.5 px-2 py-1 bg-white/5 border-b border-l border-white/10 rounded-bl-lg backdrop-blur-sm">
        <span className="text-[7px] font-black text-gray-400 uppercase tracking-[0.2em]">Ad • Slot #{position}</span>
      </div>

      {/* Content Container (Matches ResourceCard padding) */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full p-5 sm:p-4 relative z-10 opacity-75 group-hover:opacity-100 transition-opacity">
        
        {/* Left: Icon Placeholder */}
        <div className="flex items-center justify-center w-full sm:w-auto shrink-0">
           <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg bg-white/5 flex items-center justify-center">
             <span className="font-mono text-xs text-white/20">AD</span>
           </div>
        </div>

        {/* Middle: Text */}
        <div className="flex-1 min-w-0 w-full">
            <h3 className="text-base font-bold text-white/50 group-hover:text-blue-400/80 transition-colors mb-1 tracking-tight leading-tight">
              Apply for Sponsorship
            </h3>
            <p className="text-sm text-gray-600 font-medium">
              Promote your AI tool in this slot. Reach thousands of agentic developers.
            </p>
        </div>

        {/* Right: CTA */}
        <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 w-full sm:w-auto mt-2 sm:mt-0 pt-2 sm:pt-0 border-t border-white/5 sm:border-0 border-dashed">
            <button className="text-[10px] uppercase tracking-widest font-bold text-blue-400/50 hover:text-blue-400 transition-colors">
                Contact Sales
            </button>
        </div>
      </div>
    </div>
  );
}
