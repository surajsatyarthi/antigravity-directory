'use client';

import { useEffect, useState, useRef } from 'react';
import { CreditCard, Lock, ShieldCheck, X, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface BuyButtonProps {
  price: number; // Price in cents
  currency: string;
  resourceId: string;
  resourceName: string;
}

export function BuyButton({ price, currency, resourceId, resourceName }: BuyButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isRazorpayReady, setIsRazorpayReady] = useState(false);
  const [isPaypalReady, setIsPaypalReady] = useState(false);
  const [countryCode, setCountryCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const paypalContainerRef = useRef<HTMLDivElement>(null);

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(price / 100);

  useEffect(() => {
    // Detect Location
    const cachedCountry = typeof window !== 'undefined' ? sessionStorage.getItem('checkout_country_code') : null;
    if (cachedCountry) {
      setCountryCode(cachedCountry);
    } else {
      fetch('https://ipapi.co/json/')
        .then(res => res.json())
        .then(data => {
          setCountryCode(data.country_code);
          sessionStorage.setItem('checkout_country_code', data.country_code);
        })
        .catch(() => setCountryCode('US'));
    }
  }, []);

  useEffect(() => {
    if (!isOpen) return;

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

    // Load PayPal Script
    let ppScript = document.querySelector('script.paypal-sdk-script') as HTMLScriptElement;
    if (!ppScript) {
      ppScript = document.createElement('script');
      ppScript.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&currency=${currency}`;
      ppScript.async = true;
      ppScript.className = 'paypal-sdk-script';
      ppScript.onload = () => setIsPaypalReady(true);
      document.body.appendChild(ppScript);
    } else {
      setIsPaypalReady(true);
    }
  }, [isOpen, currency]);

  // Handle PayPal Render
  useEffect(() => {
    if (isPaypalReady && isOpen && paypalContainerRef.current) {
      paypalContainerRef.current.innerHTML = '';
      
      const renderButtons = async () => {
        if (!(window as any).paypal) return;

        try {
          await (window as any).paypal.Buttons({
            style: { layout: 'vertical', color: 'gold', shape: 'rect', label: 'pay' },
            createOrder: async () => {
              try {
                const res = await fetch(`/api/resources/${resourceId}/purchase/paypal`, {
                  method: 'POST',
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || 'Failed to create order');
                return data.orderId;
              } catch (err) {
                toast.error('Failed to initialize PayPal');
                console.error(err);
                throw err;
              }
            },
            onApprove: async (data: any) => {
              try {
                setLoading(true);
                const res = await fetch(`/api/resources/${resourceId}/purchase/paypal/capture`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ orderId: data.orderID }),
                });
                const captureData = await res.json();
                if (!res.ok) throw new Error(captureData.error || 'Payment capture failed');
                
                toast.success('Purchase successful! You now have access.');
                setIsOpen(false);
                window.location.reload(); // Reload to update access state
              } catch (err) {
                toast.error('Payment failed. Please try again.');
                console.error(err);
              } finally {
                setLoading(false);
              }
            },
            onError: (err: any) => {
              console.error('PayPal Error:', err);
              toast.error('PayPal encounter an error');
            }
          }).render(paypalContainerRef.current);
        } catch (error) {
          console.error('PayPal Render Error:', error);
        }
      };

      renderButtons();
    }
  }, [isPaypalReady, isOpen, resourceId]);

  const handleRazorpayPayment = async () => {
    if (!(window as any).Razorpay) return;
    setLoading(true);

    try {
      const res = await fetch(`/api/resources/${resourceId}/purchase/razorpay`, {
        method: 'POST',
      });
      const order = await res.json();
      if (!res.ok) throw new Error(order.error || 'Failed to create order');

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'Antigravity Directory',
        description: `Purchase: ${resourceName}`,
        order_id: order.orderId,
        handler: async function (response: any) {
             // In webhook implementation, verification happens via webhook.
             // But we can also call a verification endpoint for immediate UI feedback if we wanted.
             // For now, reliance on webhook or subsequent polling is robust, but for UI UX:
             // We'll trust the callback for UI success (optimistic) or verify.
             // PRD says "Verify payment signature on webhook".
             // But UI needs to know success.
             // Let's rely on the handler success.
             toast.success('Payment successful! Processing access...');
             setIsOpen(false);
             // Optionally poll for access or reload
             setTimeout(() => window.location.reload(), 2000);
        },
        theme: { color: '#000000' }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on('payment.failed', function (response: any){
        toast.error('Payment failed: ' + response.error.description);
      });
      rzp.open();
    } catch (error) {
      console.error('Razorpay Error:', error);
      toast.error('Failed to initialize Payment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full py-3 px-4 bg-white text-black font-bold rounded-xl hover:bg-gray-100 transition-all flex items-center justify-center gap-2"
      >
        <CreditCard className="w-4 h-4" />
        Buy for {formattedPrice}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div role="dialog" aria-modal="true" className="bg-[#09090b] border border-white/10 w-full max-w-md rounded-2xl overflow-hidden shadow-2xl relative">
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 hover:bg-white/5 rounded-full text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6">
              <h2 className="text-xl font-bold text-white mb-1">Purchase Resource</h2>
              <p className="text-sm text-gray-400 mb-6">{resourceName}</p>

              <div className="bg-white/5 rounded-xl p-4 mb-6 flex justify-between items-center border border-white/5">
                <span className="text-gray-300 font-medium">Total</span>
                <span className="text-2xl font-black text-white">{formattedPrice}</span>
              </div>

              <div className="space-y-3">
                {/* India: Razorpay Primary */}
                {countryCode === 'IN' && (
                  <>
                    <button
                      onClick={handleRazorpayPayment}
                      disabled={!isRazorpayReady || loading}
                      className="w-full py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Pay with Razorpay'}
                    </button>
                    <div className="relative flex items-center gap-4 py-2">
                         <div className="flex-1 h-px bg-white/5" />
                         <span className="text-[10px] text-gray-500 uppercase">OR</span>
                         <div className="flex-1 h-px bg-white/5" />
                    </div>
                  </>
                )}

                {/* International: PayPal Primary, Razorpay Secondary */}
                 <div className="relative min-h-[50px]">
                     {!isPaypalReady && <div className="absolute inset-0 flex items-center justify-center"><Loader2 className="w-5 h-5 text-gray-500 animate-spin" /></div>}
                     <div ref={paypalContainerRef} className={!isPaypalReady ? 'opacity-0' : ''} />
                 </div>
                 
                 {countryCode !== 'IN' && (
                    <button
                      onClick={handleRazorpayPayment}
                      disabled={!isRazorpayReady || loading}
                      className="w-full py-3 bg-[#18181b] border border-white/10 text-white font-bold rounded-lg hover:bg-[#27272a] transition-colors flex items-center justify-center gap-2 mt-3 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Pay with Card'}
                    </button>
                 )}
              </div>

              <div className="mt-6 flex items-center justify-center gap-2 text-[10px] text-gray-500">
                <ShieldCheck className="w-3 h-3" />
                <span className="font-medium">Secure Payment</span>
                <span className="w-1 h-1 bg-gray-700 rounded-full" />
                <span>Instant Access</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
