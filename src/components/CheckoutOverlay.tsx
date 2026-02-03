'use client';

import { useEffect, useState, useRef } from 'react';
import { Check, Zap, Sparkles, X, ShieldCheck } from 'lucide-react';

interface CheckoutOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (paymentData: any) => void;
  submissionTitle: string;
  resourceId: string;
}

const ALL_TIERS = [
  {
    id: 'FREE',
    name: 'Free',
    price: '0',
    desc: 'Basic directory listing with standard review time.',
    features: ['Standard Review (7 days)', 'Basic Search Visibility'],
    color: 'gray'
  },
  {
    id: 'STANDARD',
    name: 'Standard',
    price: '49',
    desc: 'Verified badge and priority review within 24 hours.',
    features: ['Priority Review (24h)', 'Verified Badge', 'Do-Follow Link (Permanent)', 'Early Adopter Badge'],
    color: 'emerald',
    popular: false
  },
  {
    id: 'FEATURED',
    name: 'Sponsored',
    price: '149',
    desc: 'Maximum visibility. Top of category and homepage pulse.',
    features: ['Instant Review', 'Top of Category Placement', 'Homepage Pulse Effect', 'Analytics Dashboard', 'Permanent Do-Follow Link'],
    color: 'blue',
    popular: true
  }
];

const FREE_CATEGORIES = ['Prompts', 'Antigravity Rules', 'System Prompts', 'Context Files', 'Workflows'];

interface CheckoutOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (paymentData: any) => void;
  submissionTitle: string;
  categoryName: string;
  resourceId: string;
}

export function CheckoutOverlay({ isOpen, onClose, onSuccess, submissionTitle, categoryName, resourceId }: CheckoutOverlayProps) {
  const isFreeCategory = FREE_CATEGORIES.includes(categoryName);
  const TIERS = isFreeCategory ? ALL_TIERS.filter(t => t.id === 'FREE') : ALL_TIERS;

  const [selectedTier, setSelectedTier] = useState(TIERS[isFreeCategory ? 0 : 1]); // Default to Free if forced, else Standard
  const [isPaypalReady, setIsPaypalReady] = useState(false);
  const [isRazorpayReady, setIsRazorpayReady] = useState(false);
  const [countryCode, setCountryCode] = useState<string | null>(null);
  const paypalContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Detect Location with Session Caching
    const cachedCountry = typeof window !== 'undefined' ? sessionStorage.getItem('checkout_country_code') : null;
    if (cachedCountry) {
      setCountryCode(cachedCountry);
      return;
    }

    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        setCountryCode(data.country_code);
        sessionStorage.setItem('checkout_country_code', data.country_code);
      })
      .catch(() => setCountryCode('US')); // Fallback to US
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    // Load PayPal Script
    let ppScript = document.querySelector('script.paypal-sdk-script') as HTMLScriptElement;
    if (!ppScript) {
      ppScript = document.createElement('script');
      ppScript.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&currency=USD`;
      ppScript.async = true;
      ppScript.className = 'paypal-sdk-script';
      ppScript.onload = () => setIsPaypalReady(true);
      document.body.appendChild(ppScript);
    } else {
      setIsPaypalReady(true);
    }

    // Load Razorpay Script
    let rzpScript = document.querySelector('script.razorpay-sdk-script') as HTMLScriptElement;
    if (!rzpScript) {
      rzpScript = document.createElement('script');
      rzpScript.src = 'https://checkout.razorpay.com/v1/checkout.js';
      rzpScript.async = true;
      rzpScript.className = 'razorpay-sdk-script';
      rzpScript.onload = () => setIsRazorpayReady(true);
      document.body.appendChild(rzpScript);
    } else {
      setIsRazorpayReady(true);
    }
  }, [isOpen]);

  // Handle PayPal button rendering
  useEffect(() => {
    if (isPaypalReady && selectedTier.price !== '0' && paypalContainerRef.current) {
      paypalContainerRef.current.innerHTML = '';
      
      const renderButtons = async () => {
        if (!(window as any).paypal) {
          setTimeout(renderButtons, 100);
          return;
        }

        try {
          await (window as any).paypal.Buttons({
            style: { layout: 'vertical', color: 'silver', shape: 'rect', label: 'pay' },
            createOrder: async () => {
              const res = await fetch('/api/checkout/create-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                  amount: parseFloat(selectedTier.price), 
                  currency: 'USD',
                  resourceId 
                }),
              });
              const order = await res.json();
              if (order.error) throw new Error(order.error);
              return order.orderId;
            },
            onApprove: async (data: any) => {
              const res = await fetch('/api/checkout/capture-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ orderID: data.orderID }),
              });
              const captureData = await res.json();
              onSuccess({ ...captureData, tier: selectedTier.id, id: data.orderID });
            }
          }).render(paypalContainerRef.current);
        } catch (error) {
          console.error('PayPal Render Error:', error);
        }
      };

      renderButtons();
    }
  }, [isPaypalReady, selectedTier, isOpen]);

  const handleRazorpayPayment = async () => {
    if (!(window as any).Razorpay) return;

    try {
      const res = await fetch('/api/checkout/razorpay/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          amount: parseFloat(selectedTier.price),
          currency: 'USD',
          resourceId
        }),
      });
      const order = await res.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'Antigravity Directory',
        description: `Featured Listing: ${submissionTitle}`,
        order_id: order.id,
        handler: async function (response: any) {
          // Verify signature
          const verifyRes = await fetch('/api/checkout/razorpay/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(response),
          });
          const verifyData = await verifyRes.json();
          
          if (verifyData.status === 'OK') {
            onSuccess({ 
              status: 'COMPLETED', 
              tier: selectedTier.id, 
              id: response.razorpay_payment_id 
            });
          }
        },
        theme: { color: '#000000' }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Razorpay Error:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-[#050505] border border-white/5 w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]">
        
        {/* Left Side: Tier Selection */}
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-black text-white">Upgrade Your Listing</h2>
              <p className="text-gray-500 text-sm mt-1">Boost visibility for "{submissionTitle}"</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-lg transition-colors">
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="space-y-4">
            {TIERS.map((tier) => (
              <button
                key={tier.id}
                onClick={() => setSelectedTier(tier)}
                className={`w-full text-left p-6 rounded-2xl border transition-all duration-300 relative group ${
                  selectedTier.id === tier.id 
                    ? `bg-${tier.color}-500/5 border-${tier.color}-500/50 ring-1 ring-${tier.color}-500/20` 
                    : 'bg-[#080808] border-white/5 hover:border-white/10'
                }`}
              >
                {tier.popular && (
                  <span className="absolute -top-2.5 right-6 bg-blue-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg shadow-blue-500/20">
                    Most Popular
                  </span>
                )}
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-${tier.color}-500/10`}>
                      {tier.id === 'FREE' ? <Check className={`w-5 h-5 text-${tier.color}-500`} /> : 
                       tier.id === 'STANDARD' ? <Zap className={`w-5 h-5 text-${tier.color}-500`} /> : 
                       <Sparkles className={`w-5 h-5 text-${tier.color}-500`} />}
                    </div>
                    <div>
                      <h3 className="font-bold text-white uppercase tracking-wider text-sm">{tier.name}</h3>
                      <p className="text-xs text-gray-500 mt-0.5">{tier.desc}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-white">${tier.price}</span>
                    <span className="text-[10px] text-gray-600 block uppercase font-bold">One-time</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  {tier.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-[11px] text-gray-400 font-medium">
                      <div className={`w-1 h-1 rounded-full bg-${tier.color}-500`} />
                      {feature}
                    </div>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Side: Payment Summary & Buttons */}
        <div className="w-full md:w-[350px] bg-[#080808] border-l border-white/5 p-8 flex flex-col">
          <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-6">Order Summary</h3>
          
          <div className="space-y-4 mb-8">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-400">Selected Plan</span>
              <span className="text-white font-bold">{selectedTier.name}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-400">Total Due</span>
              <span className="text-2xl font-black text-white">${selectedTier.price}</span>
            </div>
          </div>

          <div className="flex-1">
            {selectedTier.id === 'FREE' ? (
              <button 
                onClick={() => onSuccess({ status: 'COMPLETED', tier: 'FREE' })}
                className="w-full py-4 bg-white text-black font-black rounded-xl uppercase tracking-widest text-[10px] hover:bg-gray-100 transition-all"
              >
                Complete Submission
              </button>
            ) : (
                <div className="space-y-4 flex flex-col">
                  {/* Razorpay (Priority for India) */}
                  {countryCode === 'IN' && isRazorpayReady && (
                    <div className="order-first space-y-4">
                      <div className="relative">
                        <button 
                          onClick={handleRazorpayPayment}
                          className="w-full py-4 bg-white text-black border-emerald-500 border-2 font-black rounded-xl uppercase tracking-widest text-[10px] hover:bg-emerald-50 transition-all flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                        >
                          Pay with Cards / Razorpay
                        </button>
                        <span className="absolute -top-2 -right-2 bg-emerald-500 text-white text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest shadow-lg animate-pulse z-10">
                          Priority for India
                        </span>
                      </div>
                      
                      <div className="relative flex items-center gap-4 py-2 opacity-30">
                        <div className="flex-1 h-px bg-white/10" />
                        <span className="text-[9px] font-black text-gray-700 uppercase tracking-widest">Fallback</span>
                        <div className="flex-1 h-px bg-white/10" />
                      </div>
                    </div>
                  )}

                  {/* PayPal Container */}
                  <div className={`relative ${countryCode === 'IN' ? 'order-last opacity-30 grayscale pointer-events-none' : 'order-first'}`}>
                    <div ref={paypalContainerRef} className="min-h-[150px] animate-in fade-in duration-500" />
                    {countryCode === 'IN' && (
                      <div className="absolute inset-x-0 -bottom-6 flex items-center justify-center pointer-events-none">
                        <span className="bg-red-500/10 text-red-500 text-[7px] font-black px-2 py-0.5 rounded border border-red-500/20 uppercase tracking-widest backdrop-blur-sm">
                          Not available for local Indian payments
                        </span>
                      </div>
                    )}
                    {countryCode !== 'IN' && countryCode !== null && (
                      <span className="absolute -top-2 -right-2 bg-emerald-500 text-white text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest shadow-lg animate-pulse z-20">
                        Recommended
                      </span>
                    )}
                  </div>
                
                  {/* Razorpay (Secondary for Global) */}
                  {countryCode !== 'IN' && isRazorpayReady && (
                    <div className="order-last space-y-4">
                      <div className="relative flex items-center gap-4 py-2">
                        <div className="flex-1 h-px bg-white/5" />
                        <span className="text-[9px] font-black text-gray-700 uppercase tracking-widest">OR</span>
                        <div className="flex-1 h-px bg-white/5" />
                      </div>

                      <button 
                        onClick={handleRazorpayPayment}
                        className="w-full py-4 bg-[#121212] border border-white/5 text-white font-black rounded-xl uppercase tracking-widest text-[10px] hover:bg-white inset-0 hover:text-black transition-all flex items-center justify-center gap-2 group"
                      >
                        Pay with Cards / Razorpay
                      </button>
                    </div>
                  )}
              </div>
            )}
          </div>

          <div className="mt-8 pt-8 border-t border-white/5 space-y-3">
            <div className="flex items-center gap-2 text-[10px] text-gray-600 font-bold uppercase tracking-widest">
              <ShieldCheck className="w-3.5 h-3.5" />
              Secure Payment via PayPal
            </div>
            <p className="text-[9px] text-gray-700 leading-relaxed font-medium">
              By completing this purchase, you agree to our Terms of Service. Purchases are final and non-refundable.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
