'use client';

import { useState } from 'react';
import { CheckoutOverlay } from '@/components/CheckoutOverlay';
import { Sparkles, Zap, Check } from 'lucide-react';

export function AdvertiseClient() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState<string>('STANDARD');

  const openCheckout = (tier: string) => {
    setSelectedTier(tier);
    setIsCheckoutOpen(true);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
        {/* Free Tier */}
        <div className="rounded-3xl border border-white/10 bg-[#0A0A0A] p-8 flex flex-col relative group hover:border-white/20 transition-all">
          <div className="mb-8">
            <h3 className="text-xl font-bold text-white mb-2">Free Listing</h3>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-black text-white">$0</span>
              <span className="text-sm text-gray-500 font-medium">/ forever</span>
            </div>
            <p className="text-gray-400 text-sm mt-4 leading-relaxed">
              Get discovered in the directory with a standard listing. Perfect for new tools just starting out.
            </p>
          </div>
          
          <ul className="space-y-4 mb-8 flex-1">
            <li className="flex items-center gap-3 text-sm text-gray-300">
              <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 text-white" />
              </div>
              Standard Review (7 days)
            </li>
            <li className="flex items-center gap-3 text-sm text-gray-300">
              <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 text-white" />
              </div>
              Basic Search Visibility
            </li>
            <li className="flex items-center gap-3 text-sm text-gray-300">
              <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 text-white" />
              </div>
              Community Support
            </li>
          </ul>

          <button 
            onClick={() => openCheckout('FREE')}
            className="w-full py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl transition-all border border-white/5"
          >
            Submit for Free
          </button>
        </div>

        {/* Standard Tier */}
        <div className="rounded-3xl border border-emerald-500/20 bg-[#0A0A0A] p-8 flex flex-col relative group hover:border-emerald-500/40 transition-all overflow-hidden">
          <div className="absolute top-0 right-0 bg-emerald-500/10 px-4 py-1 rounded-bl-xl border-l border-b border-emerald-500/20">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Fast Track</span>
          </div>
          
          <div className="mb-8 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 border border-emerald-500/20">
              <Zap className="w-6 h-6 text-emerald-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Standard Boost</h3>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-black text-white">$49</span>
              <span className="text-sm text-gray-500 font-medium">/ one-time</span>
            </div>
            <p className="text-gray-400 text-sm mt-4 leading-relaxed">
              Skip the queue and get verified. Ideal for serious tools wanting immediate trust and visibility.
            </p>
          </div>
          
          <ul className="space-y-4 mb-8 flex-1 relative z-10">
            <li className="flex items-center gap-3 text-sm text-white font-medium">
              <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 text-emerald-400" />
              </div>
              Priority Review (&lt;24 hours)
            </li>
            <li className="flex items-center gap-3 text-sm text-white font-medium">
              <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 text-emerald-400" />
              </div>
              Verified Blue Checkmark
            </li>
            <li className="flex items-center gap-3 text-sm text-white font-medium">
              <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 text-emerald-400" />
              </div>
              Do-Follow Backlink
            </li>
            <li className="flex items-center gap-3 text-sm text-white font-medium">
              <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 text-emerald-400" />
              </div>
              Early Adopter Badge
            </li>
          </ul>

          <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <button 
            onClick={() => openCheckout('STANDARD')}
            className="relative z-10 w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-black rounded-xl transition-all shadow-lg shadow-emerald-500/20"
          >
            Get Verified
          </button>
        </div>

        {/* Featured Tier */}
        <div className="rounded-3xl border border-blue-500/50 bg-[#0A0A0A] p-8 flex flex-col relative group hover:border-blue-500/80 transition-all overflow-hidden transform hover:-translate-y-1">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-400 via-indigo-500 to-blue-400" />
          <div className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-1 rounded-bl-xl shadow-lg">
            <span className="text-xs font-bold uppercase tracking-wider">Most Popular</span>
          </div>
          
          <div className="mb-8 relative z-10">
             <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 border border-blue-500/20">
              <Sparkles className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Featured Sponsor</h3>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-black text-white">$149</span>
              <span className="text-sm text-gray-500 font-medium">/ one-time</span>
            </div>
            <p className="text-gray-400 text-sm mt-4 leading-relaxed">
              Dominate the homepage and category results. Maximum exposure for high-growth tools.
            </p>
          </div>
          
          <ul className="space-y-4 mb-8 flex-1 relative z-10">
            <li className="flex items-center gap-3 text-sm text-white font-medium">
              <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 text-blue-400" />
              </div>
              **Top of Category** Placement
            </li>
            <li className="flex items-center gap-3 text-sm text-white font-medium">
              <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 text-blue-400" />
              </div>
              Homepage **Pulse Effect**
            </li>
            <li className="flex items-center gap-3 text-sm text-white font-medium">
              <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 text-blue-400" />
              </div>
              Instant Review (Skip Queue)
            </li>
            <li className="flex items-center gap-3 text-sm text-white font-medium">
              <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 text-blue-400" />
              </div>
              Dedicated Analytics Dashboard
            </li>
            <li className="flex items-center gap-3 text-sm text-white font-medium">
              <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 text-blue-400" />
              </div>
              Permanent Do-Follow Link
            </li>
          </ul>

          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <button 
            onClick={() => openCheckout('FEATURED')}
            className="relative z-10 w-full py-4 bg-white text-black font-black rounded-xl transition-all hover:bg-gray-100 shadow-lg shadow-white/10"
          >
            Become a Sponsor
          </button>
        </div>
      </div>

      <CheckoutOverlay
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onSuccess={(data) => {
          console.log('Success:', data);
          setIsCheckoutOpen(false);
          // Redirect to submission or success page
           window.location.href = '/submit?tier=' + data.tier;
        }}
        submissionTitle="New Sponsorship"
        resourceId="new-sponsor"
        categoryName="General"
      />
    </>
  );
}
