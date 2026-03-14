'use client';

import { useState } from 'react';
import { Link } from 'lucide-react';

interface ShareBarProps {
  url: string;
  title: string;
}

export function ShareBar({ url, title }: ShareBarProps) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shares = [
    {
      label: 'WhatsApp',
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    },
    {
      label: 'X',
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    },
    {
      label: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      label: 'Email',
      href: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
    },
  ];

  function handleCopy() {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="flex items-center gap-3 mt-8">
      <span className="text-[10px] font-mono text-gray-600 uppercase tracking-widest mr-2 shrink-0">
        Share
      </span>

      {shares.map(({ label, href }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-white/[0.03] border border-white/[0.06] text-xs font-mono text-gray-400 hover:text-white hover:border-white/20 transition-all rounded-none shrink-0"
        >
          {label}
        </a>
      ))}

      <button
        onClick={handleCopy}
        className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.03] border border-white/[0.06] text-xs font-mono text-gray-400 hover:text-white hover:border-white/20 transition-all rounded-none shrink-0"
      >
        <Link className="w-3 h-3" />
        {copied ? 'Copied!' : 'Copy Link'}
      </button>
    </div>
  );
}
