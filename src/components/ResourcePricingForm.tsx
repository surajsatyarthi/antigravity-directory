'use client';

import { useState } from 'react';
import { Loader2, DollarSign, Info } from 'lucide-react';
import { toast } from 'sonner';

interface ResourcePricingFormProps {
  resourceId: string;
  initialPrice?: number; // Price in cents
  initialCurrency?: string;
  claimedAt: Date | null;
}

export function ResourcePricingForm({
  resourceId,
  initialPrice = 0,
  initialCurrency = 'USD',
  claimedAt,
}: ResourcePricingFormProps) {
  const [isPaid, setIsPaid] = useState(initialPrice > 0);
  const [price, setPrice] = useState(initialPrice > 0 ? initialPrice / 100 : 0);
  const [currency, setCurrency] = useState(initialCurrency);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Only show if resource is claimed
  if (!claimedAt) {
    return null;
  }


  const handlePriceChange = (value: string) => {
    const numValue = parseFloat(value);
    
    if (isNaN(numValue) || numValue < 0) {
      setError('Price must be a valid number');
      setPrice(0);
      return;
    }
    
    if (numValue > 999) {
      setError('Price cannot exceed $999');
      return;
    }
    
    setError('');
    setPrice(numValue);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isPaid) {
      // Setting to free
      await updatePrice(0, currency);
      return;
    }
    
    if (price <= 0) {
      setError('Price must be greater than $0');
      return;
    }
    
    if (price > 999) {
      setError('Price cannot exceed $999');
      return;
    }
    
    await updatePrice(Math.round(price * 100), currency);
  };

  const updatePrice = async (priceInCents: number, curr: string) => {
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`/api/resources/${resourceId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          price: priceInCents,
          currency: curr,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to update price');
      }

      toast.success(priceInCents === 0 ? 'Resource set to free' : 'Price updated successfully');
      
      // Reload to show updated price
      setTimeout(() => window.location.reload(), 1000);
    } catch (err) {
      console.error('Price update error:', err);
      setError(err instanceof Error ? err.message : 'Failed to update price');
      toast.error('Failed to update price');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-6 mt-6">
      <div className="flex items-start gap-3 mb-4">
        <DollarSign className="w-5 h-5 text-green-400 mt-0.5" />
        <div className="flex-1">
          <h3 className="text-lg font-bold text-white mb-1">Resource Pricing</h3>
          <p className="text-sm text-gray-400">
            Set a price for this resource or keep it free
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Enable Paid Toggle */}
        <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5">
          <label htmlFor="paid-toggle" className="text-sm font-medium text-white cursor-pointer">
            Enable Paid Access
          </label>
          <button
            type="button"
            id="paid-toggle"
            role="switch"
            aria-checked={isPaid}
            onClick={() => setIsPaid(!isPaid)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              isPaid ? 'bg-green-500' : 'bg-gray-600'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                isPaid ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* Price Input - Only show if paid is enabled */}
        {isPaid && (
          <>
            <div className="space-y-2">
              <label htmlFor="price-input" className="text-sm font-medium text-gray-300">
                Price
              </label>
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                    {currency === 'USD' ? '$' : '₹'}
                  </span>
                  <input
                    type="number"
                    id="price-input"
                    value={price || ''}
                    onChange={(e) => handlePriceChange(e.target.value)}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    max="999"
                    className="w-full pl-8 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  aria-label="Currency"
                >
                  <option value="USD">USD</option>
                  <option value="INR">INR</option>
                </select>
              </div>
              
              {error && (
                <p className="text-sm text-red-400 mt-1">{error}</p>
              )}
            </div>

            {/* Commission Preview */}
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 flex gap-2">
              <Info className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
              <div className="text-xs text-blue-200">
                <span className="font-semibold">Commission:</span> First 2 sales: 100% • Sales 3+: 80%
              </div>
            </div>
          </>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || (isPaid && !!error)}
          className="w-full py-2.5 px-4 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Updating...
            </>
          ) : (
            'Save Pricing'
          )}
        </button>
      </form>
    </div>
  );
}
