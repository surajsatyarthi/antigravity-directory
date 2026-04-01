'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export function CopyButton({
  content,
  label = 'Copy',
  iconOnly = false,
}: {
  content: string;
  label?: string;
  iconOnly?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (iconOnly) {
    return (
      <button
        onClick={handleCopy}
        title={copied ? 'Copied!' : 'Copy content'}
        className="flex items-center justify-center w-11 h-11 sm:w-7 sm:h-7 rounded-full bg-gray-950 border border-gray-900 text-slate-400 hover:bg-blue-600/20 hover:border-blue-500/30 hover:text-blue-400 transition-all"
        aria-label={copied ? 'Copied!' : 'Copy content'}
      >
        {copied
          ? <Check className="w-4 h-4 sm:w-3.5 sm:h-3.5 text-green-400" />
          : <Copy className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
        }
      </button>
    );
  }

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-2 px-4 py-2 text-xs font-bold bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-none transition-all"
    >
      {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
      {copied ? 'Copied ✓' : label}
    </button>
  );
}
