'use client';

import React, { useState } from 'react';
import { Mail, Zap, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';
import { subscribeToNewsletter } from '@/app/newsletter/actions';

interface NewsletterCaptureProps {
  source?: string;
  variant?: 'inline' | 'full';
}

export function NewsletterCapture({ source = 'homepage', variant = 'full' }: NewsletterCaptureProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    
    const formData = new FormData(e.currentTarget);
    const result = await subscribeToNewsletter(formData);
    
    if (result.success) {
      setStatus('success');
      setMessage(result.message);
    } else {
      setStatus('error');
      setMessage(result.message);
      setTimeout(() => setStatus('idle'), 3000);
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-[2rem] p-12 text-center animate-in zoom-in duration-500">
        <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/20">
          <CheckCircle2 className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-3xl font-black text-white mb-2 tracking-tighter uppercase italic">Access Granted</h3>
        <p className="text-emerald-400 font-mono text-xs uppercase tracking-widest">{message}</p>
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <div className="bg-[#050505] border border-white/5 rounded-xl p-5 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
          <Zap className="w-12 h-12 text-gray-700" />
        </div>
        <h4 className="text-xs font-black text-gray-400 mb-1 uppercase tracking-tight">Weekly Newsletter</h4>
        <p className="text-[10px] text-gray-600 mb-4 leading-relaxed uppercase tracking-widest font-mono">Get the latest tools weekly.</p>

        <form onSubmit={handleSubmit} className="relative">
          <input type="hidden" name="source" value={source} />
          <input
            type="email"
            name="email"
            placeholder="dev@work.com"
            required
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white placeholder:text-gray-700 focus:outline-none focus:border-gray-500/50 transition-all mb-2"
          />
          <button
            disabled={status === 'loading'}
            className="w-full bg-gray-800 hover:bg-gray-700 disabled:opacity-50 text-gray-300 text-[10px] font-black uppercase tracking-[0.2em] py-2.5 rounded-lg transition-all flex items-center justify-center gap-2"
          >
            {status === 'loading' ? <Loader2 className="w-3 h-3 animate-spin" /> : 'Subscribe →'}
          </button>
        </form>
      </div>
    );
  }

  return (
    <section className="relative overflow-hidden py-16 rounded-2xl">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[#050505] border border-white/5" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/5 blur-[120px] rounded-full" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-600/5 blur-[120px] rounded-full" />

      <div className="relative max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-600/10 border border-blue-600/20 text-[10px] font-black uppercase tracking-[0.15em] text-blue-400 mb-4">
            <Zap className="w-3 h-3" /> Newsletter Signup
        </div>

        <h2 className="text-2xl md:text-3xl font-black text-gray-300 mb-4 tracking-tight uppercase">
          Weekly <span className="text-gray-400">Developer</span> Newsletter
        </h2>

        <p className="text-gray-500 text-sm leading-relaxed max-w-2xl mx-auto mb-8">
          Get the latest AI tools and resources delivered to your inbox. Unsubscribe anytime.
        </p>

        <form onSubmit={handleSubmit} className="relative max-w-lg mx-auto">
          <input type="hidden" name="source" value={source} />
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
              <input
                type="email"
                name="email"
                placeholder="Enter your work email"
                required
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white placeholder:text-gray-700 focus:outline-none focus:border-blue-500/50 transition-all font-mono text-sm"
              />
            </div>
            <button
              disabled={status === 'loading'}
              className="px-8 py-4 bg-white text-black font-black rounded-2xl hover:bg-gray-200 disabled:opacity-50 transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-2 shadow-xl shadow-white/5"
            >
              {status === 'loading' ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>Subscribe <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </div>
          {status === 'error' && (
            <p className="absolute top-full left-0 mt-2 text-red-500 text-[10px] font-mono uppercase tracking-widest">
              {message}
            </p>
          )}
        </form>

        <p className="mt-8 text-[10px] text-gray-600 font-mono uppercase tracking-[0.2em]">
          Get weekly updates. No spam.
        </p>
      </div>
    </section>
  );
}
