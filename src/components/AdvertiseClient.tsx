'use client';

import { useState } from 'react';
import { CheckCircle2, AlertCircle, Send } from 'lucide-react';

export function AdvertiseClient() {
  const [isPending, setIsPending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPending(true);
    setError('');
    const form = e.currentTarget;
    const data = {
      company: (form.elements.namedItem('company') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    };
    try {
      const res = await fetch('/api/contact/sponsor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setError('Something went wrong. Email us directly at hello@googleantigravity.directory');
      }
    } catch {
      setError('Something went wrong. Email us directly at hello@googleantigravity.directory');
    } finally {
      setIsPending(false);
    }
  }

  const inputClasses = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-base text-white placeholder:text-gray-600 focus:border-white/30 transition-all outline-none font-medium";
  const labelClasses = "block text-xs uppercase tracking-[0.15em] font-black text-gray-500 mb-2";

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto px-4 text-center py-16">
        <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-6" />
        <h3 className="text-2xl font-black text-white mb-3">We'll be in touch.</h3>
        <p className="text-gray-500">We review all sponsorship enquiries within 24 hours.</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4">
      <div className="bg-white/[0.03] border border-white/[0.06] rounded-3xl p-8">
        <h2 className="text-2xl font-black text-white mb-2">Get in touch</h2>
        <p className="text-gray-500 text-sm mb-8">
          Tell us about your product. We'll reply within 24 hours with availability and pricing.
        </p>

        {error && (
          <div className="mb-6 p-4 rounded-xl flex items-center gap-3 text-sm font-bold bg-red-500/5 text-red-400 border border-red-500/20">
            <AlertCircle className="w-5 h-5 shrink-0" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className={labelClasses}>Company / Product Name</label>
            <input type="text" name="company" required placeholder="Acme AI" className={inputClasses} />
          </div>
          <div>
            <label className={labelClasses}>Your Email</label>
            <input type="email" name="email" required placeholder="you@company.com" className={inputClasses} />
          </div>
          <div>
            <label className={labelClasses}>What are you promoting?</label>
            <textarea name="message" required rows={4} placeholder="Brief description of your tool and what you're looking for..." className={`${inputClasses} resize-none`} />
          </div>
          <button
            type="submit"
            disabled={isPending}
            className="w-full py-4 bg-white hover:bg-gray-100 text-black font-black rounded-xl transition-all uppercase tracking-[0.15em] text-xs flex items-center justify-center gap-3"
          >
            {isPending ? (
              <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            Send Enquiry
          </button>
        </form>
      </div>
    </div>
  );
}
