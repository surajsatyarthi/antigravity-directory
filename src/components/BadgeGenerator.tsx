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
  const profileUrl = `${siteUrl}/resources/${slug}`;
  
  const embedCode = `<a href="${profileUrl}" target="_blank"><img src="${badgeUrl}" alt="Featured on Antigravity: ${title}" width="150" height="auto" /></a>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-20 p-8 bg-[#0A0A0A] border border-dashed border-gray-800 rounded-[32px] text-center">
      <div className="inline-flex items-center justify-center w-12 h-12 bg-white/5 rounded-2xl mb-6">
        <Zap className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-xl font-bold text-white mb-3 tracking-tight lowercase font-mono italic">
        The Backlink Flywheel
      </h3>
      <p className="text-sm text-gray-500 max-w-md mx-auto mb-8 leading-relaxed">
        Are you the author of <strong>{title}</strong>? Embed this certified badge on your site to drive traffic and signal trust.
      </p>

      {/* Badge Preview */}
      <div className="flex justify-center mb-8">
        <div className="px-6 py-3 bg-black border border-gray-800 rounded-xl flex items-center gap-3 shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:scale-105 transition-transform cursor-pointer group">
          <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
            <Zap className="w-4 h-4 text-black fill-black" />
          </div>
          <div className="text-left">
            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest leading-none">Featured on</div>
            <div className="text-xs font-bold text-white font-mono lowercase tracking-tight">Antigravity</div>
          </div>
        </div>
      </div>

      {/* Embed Code Section */}
      <div className="max-w-xl mx-auto">
        <div className="relative group">
          <div className="absolute inset-0 bg-blue-500/5 blur-xl group-hover:bg-blue-500/10 transition-all opacity-0 group-hover:opacity-100" />
          <div className="relative flex items-center gap-3 bg-black p-4 rounded-2xl border border-gray-900 overflow-hidden">
            <code className="flex-1 text-[10px] text-gray-500 font-mono text-left truncate pr-10">
              {embedCode}
            </code>
            <button
              onClick={handleCopy}
              className="shrink-0 p-2 bg-white/5 hover:bg-white/10 text-white rounded-lg border border-white/10 transition-all active:scale-95"
              title="Copy embed code"
            >
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>
        <p className="mt-4 text-[10px] text-gray-700 font-mono uppercase tracking-widest">
          Copy-paste this snippet into your HTML to initialize the link.
        </p>
      </div>
    </div>
  );
}
