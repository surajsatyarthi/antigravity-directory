'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DollarSign, TrendingUp, Wallet } from 'lucide-react';
import { PayoutRequestModal } from './PayoutRequestModal';

interface EarningsData {
  totalEarnings: number;
  firstTwoEarnings: number;
  subsequentEarnings: number;
  salesCount: number;
  firstTwoSalesCount: number;
  pendingPayout: number;
  currency: string;
}

export function EarningsOverview() {
  const [earnings, setEarnings] = useState<EarningsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showPayoutModal, setShowPayoutModal] = useState(false);

  useEffect(() => {
    fetchEarnings();
  }, []);

  const fetchEarnings = async () => {
    try {
      const response = await fetch('/api/creator/earnings');
      if (response.ok) {
        const data = await response.json();
        setEarnings(data);
      }
    } catch (error) {
      console.error('Failed to fetch earnings:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (cents: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(cents / 100);
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Earnings</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Loading earnings...</p>
        </CardContent>
      </Card>
    );
  }

  if (!earnings) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Earnings</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No earnings data available</p>
        </CardContent>
      </Card>
    );
  }

  const canRequestPayout = earnings.pendingPayout >= 1000; // $10 minimum

  return (
    <>
      <div className="grid gap-4 md:grid-cols-3">
        {/* Total Earnings Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(earnings.totalEarnings)}</div>
            <p className="text-xs text-muted-foreground">
              {earnings.salesCount} total {earnings.salesCount === 1 ? 'sale' : 'sales'}
            </p>
          </CardContent>
        </Card>

        {/* Earnings Breakdown Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Commission Breakdown</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">First 2 sales (100%):</span>
                <span className="font-medium">{formatCurrency(earnings.firstTwoEarnings)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Sales 3+ (80%):</span>
                <span className="font-medium">{formatCurrency(earnings.subsequentEarnings)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pending Payout Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payout</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(earnings.pendingPayout)}</div>
            <Button
              className="mt-3 w-full"
              disabled={!canRequestPayout}
              onClick={() => setShowPayoutModal(true)}
            >
              {canRequestPayout ? 'Request Payout' : 'Minimum $10 required'}
            </Button>
          </CardContent>
        </Card>
      </div>

      <PayoutRequestModal
        isOpen={showPayoutModal}
        onClose={() => setShowPayoutModal(false)}
        availableAmount={earnings.pendingPayout}
        onSuccess={() => {
          setShowPayoutModal(false);
          fetchEarnings(); // Refresh earnings after successful payout request
        }}
      />
    </>
  );
}
