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
        <h3 className="text-3xl font-black text-emerald-900 mb-2 tracking-tighter uppercase italic">Access Granted</h3>
        <p className="text-emerald-700 font-mono text-xs uppercase tracking-widest">{message}</p>
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-5 relative overflow-hidden group hover:shadow-md transition-shadow">
        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
          <Zap className="w-12 h-12 text-slate-900" />
        </div>
        <h4 className="text-xs font-black text-slate-900 mb-1 uppercase tracking-tight">Weekly Newsletter</h4>
        <p className="text-[10px] text-slate-500 mb-4 leading-relaxed uppercase tracking-widest font-mono">Get the latest tools weekly.</p>

        <form onSubmit={handleSubmit} className="relative">
          <input type="hidden" name="source" value={source} />
          <input
            type="email"
            name="email"
            placeholder="dev@work.com"
            required
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-400 transition-all mb-2"
          />
          <button
            disabled={status === 'loading'}
            className="w-full bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white text-[10px] font-black uppercase tracking-[0.2em] py-2.5 rounded-lg transition-all flex items-center justify-center gap-2"
          >
            {status === 'loading' ? <Loader2 className="w-3 h-3 animate-spin" /> : 'Subscribe →'}
          </button>
        </form>
      </div>
    );
  }

  return (
    <section className="relative overflow-hidden py-16 rounded-2xl bg-white border border-slate-200 shadow-sm">
      {/* Background Effects */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-100 blur-[120px] rounded-full" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-100 blur-[120px] rounded-full" />

      <div className="relative max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[10px] font-black uppercase tracking-[0.15em] text-blue-600 mb-4">
            <Zap className="w-3 h-3" /> Newsletter Signup
        </div>

        <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-4 tracking-tight uppercase">
          Weekly <span className="text-blue-600">Developer</span> Newsletter
        </h2>

        <p className="text-slate-500 text-sm leading-relaxed max-w-2xl mx-auto mb-8">
          Get the latest AI tools and resources delivered to your inbox. Unsubscribe anytime.
        </p>

        <form onSubmit={handleSubmit} className="relative max-w-lg mx-auto">
          <input type="hidden" name="source" value={source} />
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="email"
                name="email"
                placeholder="Enter your work email"
                required
                className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-4 py-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all font-mono text-sm shadow-sm"
              />
            </div>
            <button
              disabled={status === 'loading'}
              className="px-8 py-4 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 disabled:opacity-50 transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-2 shadow-sm"
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

        <p className="mt-8 text-[10px] text-slate-400 font-mono uppercase tracking-[0.2em]">
          Get weekly updates. No spam.
        </p>
      </div>
    </section>
  );
}
