'use client';

import { useState } from 'react';
import { Copy, Check, Zap } from 'lucide-react';

interface BadgeGeneratorProps {
  slug: string;
  title: string;
}

export function BadgeGenerator({ slug, title }: BadgeGeneratorProps) {
  const [copied, setCopied] = useState(false);
  
  // Use a relative path for the image for now, or a public CDN if we had one
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://googleantigravity.directory';
  const badgeUrl = `${siteUrl}/api/badges/${slug}`;
  const profileUrl = `${siteUrl}/t/${slug}`;
  
  const embedCode = `<a href="${profileUrl}" target="_blank"><img src="${badgeUrl}" alt="Featured on Antigravity: ${title}" width="200" height="50" /></a>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-20 p-8 bg-slate-50 border border-dashed border-slate-200 rounded-[32px] text-center shadow-sm">
      <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-2xl mb-6 shadow-sm border border-slate-100">
        <Zap className="w-6 h-6 text-amber-500" />
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight lowercase font-mono italic">
        The Backlink Flywheel
      </h3>
      <p className="text-sm text-slate-500 max-w-md mx-auto mb-8 leading-relaxed">
        Are you the author of <strong>{title}</strong>? Embed this certified badge on your site to drive traffic and signal trust.
      </p>

      {/* Badge Preview */}
      <div className="flex justify-center mb-8">
        <div className="w-[200px] h-[58px] relative rounded-xl overflow-hidden group shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:scale-[1.02] transition-all cursor-pointer border border-slate-100">
          {/* Subtle Glassmorphism / Gradient Background */}
          <div className="absolute inset-0 bg-white" />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-slate-50 opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <div className="relative h-full flex items-center px-4 gap-3.5">
             {/* Dynamic Icon with Glow */}
             <div className="shrink-0 relative">
                <div className="absolute inset-0 bg-blue-500/20 blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative w-9 h-9 flex items-center justify-center bg-slate-900 rounded-lg shadow-lg group-hover:bg-blue-600 transition-colors">
                  <Zap className="w-4.5 h-4.5 text-white fill-white/20" />
                </div>
             </div>
             
             <div className="flex flex-col justify-center text-left">
                <div className="flex items-center gap-1 mb-0.5">
                  <span className="text-[8px] font-black text-slate-400 uppercase tracking-[0.15em] leading-none">Featured on</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[12px] font-black text-slate-900 tracking-tight flex items-center gap-1">
                    Antigravity
                    <svg viewBox="0 0 24 24" className="w-3 h-3 text-blue-500 fill-current" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center gap-1 text-[9px] font-bold text-slate-500">
                    <span className="w-1 h-1 bg-slate-300 rounded-full" />
                    <span>1.2k views</span>
                  </div>
                  <div className="flex items-center gap-1 text-[9px] font-bold text-slate-500">
                    <span className="w-1 h-1 bg-slate-300 rounded-full" />
                    <span>4.9 ★</span>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Embed Code Section */}
      <div className="max-w-xl mx-auto">
        <div className="relative group">
          <div className="absolute inset-0 bg-blue-500/5 blur-xl group-hover:bg-blue-500/10 transition-all opacity-0 group-hover:opacity-100" />
          <div className="relative flex items-center gap-3 bg-white p-4 rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <code className="flex-1 text-[10px] text-slate-500 font-mono text-left truncate pr-10">
              {embedCode}
            </code>
            <button
              onClick={handleCopy}
              className="shrink-0 p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg border border-slate-200 transition-all active:scale-95"
              title="Copy embed code"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>
        <p className="mt-4 text-[10px] text-slate-500 font-mono uppercase tracking-widest">
          Copy-paste this snippet into your HTML to initialize the link.
        </p>
      </div>
    </div>
  );
}
