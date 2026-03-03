'use client';

interface SponsorBadgeProps {
  sponsorName: string;
  sponsorLogoUrl: string;
  sponsorHref: string;
}

export function SponsorBadge({ sponsorName, sponsorLogoUrl, sponsorHref }: SponsorBadgeProps) {
  return (
    <a
      href={sponsorHref}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 z-40 flex flex-col bg-slate-900 rounded-lg p-2.5 shadow-lg
                 animate-[slideUp_0.4s_ease_1s_both]"
    >
      <span className="text-[10px] font-mono text-slate-400 mb-1">Sponsored by</span>
      <img src={sponsorLogoUrl} alt={sponsorName} className="h-[18px] w-auto" />
    </a>
  );
}
