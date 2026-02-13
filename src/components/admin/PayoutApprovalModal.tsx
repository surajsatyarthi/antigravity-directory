
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

interface PayoutRequest {
  id: string;
  amount: number;
  currency: string;
  creatorId: string;
  paymentMethod: string;
  accountDetails: string;
}

interface PayoutApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: PayoutRequest;
  initialAction?: 'approve' | 'reject';
  onUpdate: (request: any) => void;
}

export function PayoutApprovalModal({
  isOpen,
  onClose,
  request,
  initialAction = 'approve',
  onUpdate,
}: PayoutApprovalModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [action, setAction] = useState<'approve' | 'reject'>(initialAction);
  const [rejectionReason, setRejectionReason] = useState('');

  const handleSubmit = async () => {
    if (action === 'reject' && !rejectionReason.trim()) {
      toast.error('Rejection reason is required');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/admin/payouts/${request.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action,
          reason: action === 'reject' ? rejectionReason : undefined,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update payout request');
      }

      const data = await response.json();
      toast.success(`Payout request ${action}d successfully`);
      onUpdate(data.payout);
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {action === 'approve' ? 'Approve Payout' : 'Reject Payout'}
          </DialogTitle>
          <DialogDescription>
            {action === 'approve'
              ? `Are you sure you want to approve the payout of $${(
                  request.amount / 100
                ).toFixed(2)} for creator ${request.creatorId}?`
              : `Please provide a reason for rejecting this request.`}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="flex justify-center gap-4">
            <Button
              variant={action === 'approve' ? 'default' : 'outline'}
              onClick={() => setAction('approve')}
            >
              Approve
            </Button>
            <Button
              variant={action === 'reject' ? 'destructive' : 'outline'}
              onClick={() => setAction('reject')}
            >
              Reject
            </Button>
          </div>

          {action === 'reject' && (
            <div className="grid gap-2">
              <label htmlFor="reason" className="text-sm font-medium">
                Rejection Reason
              </label>
              <Textarea
                id="reason"
                placeholder="Enter reason for rejection..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
              />
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
           <Button
            variant={action === 'reject' ? 'destructive' : 'default'}
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading
              ? 'Processing...'
              : action === 'approve'
              ? 'Confirm Approval'
              : 'Reject Request'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
