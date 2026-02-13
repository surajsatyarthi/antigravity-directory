'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface PayoutRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableAmount: number;
  onSuccess: () => void;
}

export function PayoutRequestModal({
  isOpen,
  onClose,
  availableAmount,
  onSuccess,
}: PayoutRequestModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [accountDetails, setAccountDetails] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const formatCurrency = (cents: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(cents / 100);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!paymentMethod) {
      toast({
        title: 'Error',
        description: 'Please select a payment method',
        variant: 'destructive',
      });
      return;
    }

    if (accountDetails.length < 5) {
      toast({
        title: 'Error',
        description: 'Please provide valid account details (minimum 5 characters)',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/creator/payout/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: availableAmount,
          paymentMethod,
          accountDetails,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: 'Success!',
          description: data.message || 'Payout request submitted successfully',
        });
        setPaymentMethod('');
        setAccountDetails('');
        onSuccess();
      } else {
        toast({
          title: 'Error',
          description: data.error || 'Failed to submit payout request',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit payout request. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Request Payout</DialogTitle>
          <DialogDescription>
            Submit a payout request for your earnings. We'll review and process within 3-5 business days.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {/* Amount Display */}
            <div className="grid gap-2">
              <Label>Payout Amount</Label>
              <div className="flex h-10 w-full items-center rounded-md border border-input bg-muted px-3 py-2 text-sm">
                <span className="font-bold">{formatCurrency(availableAmount)}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Your total available balance
              </p>
            </div>

            {/* Payment Method */}
            <div className="grid gap-2">
              <Label htmlFor="payment-method">Payment Method</Label>
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger id="payment-method">
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="razorpay">Razorpay (India - UPI/Bank)</SelectItem>
                  <SelectItem value="paypal">PayPal (International)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Account Details */}
            <div className="grid gap-2">
              <Label htmlFor="account-details">
                Account Details
              </Label>
              <Textarea
                id="account-details"
                placeholder={
                  paymentMethod === 'razorpay'
                    ? 'Enter your UPI ID or bank account details'
                    : 'Enter your PayPal email address'
                }
                value={accountDetails}
                onChange={(e) => setAccountDetails(e.target.value)}
                rows={3}
                required
                minLength={5}
              />
              <p className="text-xs text-muted-foreground">
                {paymentMethod === 'razorpay'
                  ? 'Example: yourname@paytm or Account Number + IFSC'
                  : 'Example: your.email@example.com'}
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Request'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
