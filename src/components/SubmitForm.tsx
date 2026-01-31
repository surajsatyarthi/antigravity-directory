'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { 
  Send, CheckCircle2, AlertCircle, Sparkles, Zap, 
  ArrowLeft, Search, BarChart3, Globe2, ShieldCheck,
  ChevronDown, ChevronUp, Star, Rocket
} from 'lucide-react';
import { submitResource } from '@/app/submit/actions';
import { CheckoutOverlay } from './CheckoutOverlay';
import { safeHtml } from '@/lib/utils/safeHtml';

interface SubmitFormProps {
  categories: { id: string; name: string }[];
}

const FAQS = [
  {
    q: "What are the benefits of listing with Antigravity?",
    a: "✨ <strong>Massive Exposure</strong>: Access thousands of AI developers. 🔍 <strong>SEO Boost</strong>: Gain a valuable <strong>Do-Follow link</strong> from our high-authority domain. 🎯 <strong>Qualified Leads</strong>: Connect with users actively building agentic systems."
  },
  {
    q: "How quickly will my tool be listed?",
    a: "Launch Promo listings (Standard/Featured) go live within <strong>24-48 hours</strong> after manual vetting. Free listings undergo a standard review period of 7-14 days."
  },
  {
    q: "How long does my listing remain active?",
    a: "Your listing is <strong>permanent</strong>. One payment secures your spot in our directory indefinitely, with no recurring fees or expiration dates."
  },
  {
    q: "Will my tool be removed from the directory?",
    a: "We never remove tools unless requested by the owner or if the tool violates our quality standards. Our 'Verified' status is a permanent trust signal."
  },
  {
    q: "Why do you charge for listings?",
    a: "Our fees cover manual vetting, maintaining high-authority SEO, and funding our discovery engine that drives qualified developer traffic to your tool."
  }
];

export function SubmitForm({ categories }: SubmitFormProps) {
  const [isPending, setIsPending] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [resourceId, setResourceId] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  async function handleShowCheckout(e: React.FormEvent) {
    e.preventDefault();
    const formData = new FormData(formRef.current!);
    if (!formData.get('title') || !formData.get('description')) {
      setMessage({ type: 'error', text: 'Please provide at least a Title and Description.' });
      return;
    }
    // Generate the ID that will be used for both payment and submission
    const newId = `res_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    setResourceId(newId);
    setIsCheckoutOpen(true);
  }

  async function onPaymentSuccess(paymentData: any) {
    setIsCheckoutOpen(false);
    setIsPending(true);
    try {
      const formData = new FormData(formRef.current!);
      formData.set('id', resourceId); // Pass the same ID
      formData.set('paymentStatus', paymentData.status === 'COMPLETED' ? 'PAID' : 'NONE');
      formData.set('paymentType', paymentData.tier || 'FREE');
      formData.set('paymentId', paymentData.id || '');
      const result = await submitResource(formData);
      if (result?.error) setMessage({ type: 'error', text: result.error });
      else {
        setMessage({ type: 'success', text: 'Success! Your tool is being manually vetted and will be live shortly.' });
        formRef.current?.reset();
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Submission error. Please contact support.' });
    } finally {
      setIsPending(false);
    }
  }

  const inputClasses = "w-full bg-[#0A0A0A] border border-white/5 rounded-xl px-4 py-3.5 text-base text-white placeholder:text-gray-600 focus:border-emerald-500/50 transition-all outline-none font-medium";
  const labelClasses = "block text-xs uppercase tracking-[0.15em] font-black text-gray-500 mb-2 ml-1";

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 py-12 animate-in fade-in duration-1000">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-black text-emerald-500 uppercase tracking-widest leading-none">
              Launch Pricing - Early Adopter Rate
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4">
            Submit Your Tool to <span className="text-emerald-500">Antigravity</span>
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Join the most authoritative hub for agentic development. Reach high-intent users and secure 
            your permanent SEO footprint.
          </p>
        </div>

        {/* Benefits & Value Prop - Moved to top */}
        <div className="space-y-8 max-w-3xl mx-auto mb-16">
          <div className="bg-[#050505] border border-white/5 rounded-3xl p-8 space-y-10 border-l-emerald-500/20 border-l-2">
            <h3 className="text-sm font-black text-gray-500 uppercase tracking-widest border-b border-white/5 pb-4">
              Why Top Tools Launch Here
            </h3>

            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                  <Globe2 className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <h4 className="text-base font-black text-white uppercase tracking-wider mb-2">Massive Exposure</h4>
                  <p className="text-sm text-gray-500 leading-relaxed font-medium">Reach 2M+ active AI seekers every month looking for tools like yours.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
                  <Search className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <h4 className="text-base font-black text-white uppercase tracking-wider mb-2">SEO Benchmark (Do-Follow)</h4>
                  <p className="text-sm text-gray-500 leading-relaxed font-medium">Boost your domain authority with a high-quality, permanent do-follow backlink.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                  <h4 className="text-base font-black text-white uppercase tracking-wider mb-2">Lifetime Value</h4>
                  <p className="text-sm text-gray-500 leading-relaxed font-medium">One-time payment. Forever visibility. We never remove vetted tools.</p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/5">
              <div className="bg-[#080808] rounded-2xl p-6 border border-emerald-500/10">
                <div className="flex items-center gap-3 mb-3">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-xs font-black text-white uppercase tracking-widest">Growth Guarantee</span>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed italic mb-0">
                  "Since listing on Antigravity, we've seen a 30% increase in high-intent developer trials. The SEO boost alone was worth the entry fee."
                </p>
              </div>
            </div>
          </div>

          <div className="p-8 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 rounded-3xl border border-white/5">
            <h4 className="text-white font-black uppercase text-sm tracking-widest mb-6">Current Launch Promo</h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-base">Standard Review</span>
                <span className="text-white font-bold text-xl">$49 <span className="text-gray-600 line-through text-base ml-2">$99</span></span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-base">Featured Placement</span>
                <span className="text-emerald-400 font-bold text-xl">$149 <span className="text-gray-600 line-through text-base ml-2">$299</span></span>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-white/5">
              <p className="text-xs text-gray-500 leading-relaxed">
                Join 10k+ tools already growing. By submitting, you agree to our editorial standards.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto space-y-8">

          {/* Form Section */}
          <div className="space-y-8">
            <div className="bg-[#050505] border border-white/5 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
              
              {message && (
                <div className={`mb-8 p-4 rounded-xl flex items-center gap-3 text-sm font-bold border backdrop-blur-xl ${
                  message.type === 'success'
                    ? 'bg-emerald-500/5 text-emerald-400 border-emerald-500/20'
                    : 'bg-red-500/5 text-red-400 border-red-500/20'
                }`}>
                  {message.type === 'success' ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
                  {message.text}
                </div>
              )}

              <form ref={formRef} onSubmit={handleShowCheckout} className="space-y-6 relative">
                
                {/* Category Selection - First as requested */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label htmlFor="categoryName" className={labelClasses}>Category (Select First)</label>
                    {selectedCategory && (
                      <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${
                        ['Prompts', 'Cursor Rules', 'System Prompts', 'Context Files', 'Workflows'].includes(selectedCategory)
                          ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                          : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      }`}>
                        {['Prompts', 'Cursor Rules', 'System Prompts', 'Context Files', 'Workflows'].includes(selectedCategory) 
                          ? '✨ Free Listing' 
                          : '💎 Paid Listing'}
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <select 
                      id="categoryName" 
                      name="categoryName" 
                      required 
                      className={`${inputClasses} appearance-none cursor-pointer`}
                      onChange={(e) => {
                        setSelectedCategory(e.target.value);
                        setResourceId(e.target.value); 
                      }}
                    >
                      <option value="">Select Segment...</option>
                      {categories.map((cat) => {
                        const isFree = ['Prompts', 'Cursor Rules', 'System Prompts', 'Context Files', 'Workflows'].includes(cat.name);
                        return (
                          <option key={cat.id} value={cat.name}>
                            {cat.name} {isFree ? '- FREE' : '- PAID'}
                          </option>
                        );
                      })}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none" />
                  </div>
                  <p className="text-[10px] text-gray-500 mt-2 font-medium">
                    * Prompts, Rules, and Workflows are <span className="text-blue-400 font-bold">FREE</span> to list. Tools & Agents require a one-time fee.
                  </p>
                </div>

                <div className="group">
                  <label htmlFor="title" className={labelClasses}>Resource Name</label>
                  <input type="text" id="title" name="title" required placeholder="Name of your tool or prompt..." className={inputClasses} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="url" className={labelClasses}>Website / Link</label>
                    <input type="url" id="url" name="url" required placeholder="https://..." className={inputClasses} />
                  </div>
                  <div>
                    {/* Placeholder for future field if needed */}
                  </div>
                </div>

                <div>
                  <label htmlFor="description" className={labelClasses}>Short Description</label>
                  <textarea id="description" name="description" required rows={2} placeholder="What does it do? (Max 200 chars)" className={`${inputClasses} resize-none`} />
                </div>

                <div className="pt-4">
                  <button type="submit" disabled={isPending} className="group w-full py-5 bg-white hover:bg-emerald-50 text-black font-black rounded-xl transition-all active:scale-[0.98] uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 shadow-xl shadow-white/5">
                    {isPending ? <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" /> : <Zap className="w-4 h-4" />}
                    <span>
                       {/* Use state instead of document.getElementById which fails on server */
                        (() => {
                           return ['Prompts', 'Cursor Rules', 'System Prompts', 'Context Files', 'Workflows'].includes(selectedCategory) 
                            ? 'Submit for Free' 
                            : 'Proceed to Payment';
                        })()
                       }
                    </span>
                  </button>
                  <p className="mt-4 text-center text-xs text-gray-700 font-bold uppercase tracking-widest">
                    Subject to manual review • Refund guaranteed if rejected
                  </p>
                </div>
              </form>
            </div>

            {/* FAQs Section */}
            <div className="space-y-4">
              <h3 className="text-base font-black text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-emerald-500" />
                Frequently Asked Questions
              </h3>
              <div className="space-y-2">
                {FAQS.map((faq, idx) => (
                  <div key={idx} className="bg-[#050505] border border-white/5 rounded-2xl overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition-colors"
                    >
                      <span className="text-sm font-bold text-gray-300 leading-relaxed">{faq.q}</span>
                      {openFaq === idx ? <ChevronUp className="w-5 h-5 text-gray-600" /> : <ChevronDown className="w-5 h-5 text-gray-600" />}
                    </button>
                    {openFaq === idx && (
                      <div className="px-5 pb-5 animate-in slide-in-from-top-2 duration-300">
                        <p className="text-sm leading-relaxed text-gray-500 font-medium" dangerouslySetInnerHTML={{ __html: safeHtml(faq.a) }} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      <CheckoutOverlay 
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onSuccess={onPaymentSuccess}
        submissionTitle={(formRef.current?.elements.namedItem('title') as HTMLInputElement)?.value || 'Your Resource'}
        categoryName={(formRef.current?.elements.namedItem('categoryName') as HTMLSelectElement)?.value || ''}
        resourceId={resourceId}
      />
    </>
  );
}

