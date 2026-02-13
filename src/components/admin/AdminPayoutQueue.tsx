
'use client';

import { useState } from 'react';
import { PayoutApprovalModal } from '@/components/admin/PayoutApprovalModal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { format } from 'date-fns';
import { MoreHorizontal, Search } from 'lucide-react';

export interface PayoutRequest {
  id: string;
  creatorId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'approved' | 'rejected' | 'paid';
  createdAt: string | Date;
  processedAt?: string | Date | null;
  paymentMethod: string;
  accountDetails: string;
  rejectionReason?: string | null;
}

interface AdminPayoutQueueProps {
  initialRequests: PayoutRequest[];
}

export function AdminPayoutQueue({ initialRequests }: AdminPayoutQueueProps) {
  const [requests, setRequests] = useState<PayoutRequest[]>(initialRequests);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedRequest, setSelectedRequest] = useState<PayoutRequest | null>(null);
  const [initialAction, setInitialAction] = useState<'approve' | 'reject'>('approve');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter requests
  const filteredRequests = requests.filter((req) => {
    const searchMatch =
      req.id.toLowerCase().includes(search.toLowerCase()) ||
      req.creatorId.toLowerCase().includes(search.toLowerCase()) ||
      req.accountDetails.toLowerCase().includes(search.toLowerCase());
    const statusMatch = statusFilter === 'all' || req.status === statusFilter;
    return searchMatch && statusMatch;
  });

  const handleAction = (request: PayoutRequest, action: 'approve' | 'reject' = 'approve') => {
    setSelectedRequest(request);
    setInitialAction(action);
    setIsModalOpen(true);
  };

  const handleUpdate = (updatedRequest: PayoutRequest) => {
    setRequests((prev) =>
      prev.map((req) => (req.id === updatedRequest.id ? updatedRequest : req))
    );
    setIsModalOpen(false);
    setSelectedRequest(null);
  };

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
    paid: 'bg-blue-100 text-blue-800',
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-sm flex-1">
          <Search className="text-muted-foreground absolute left-2.5 top-2.5 h-4 w-4" />
          <Input
            placeholder="Search by ID, User, or Email..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Request ID</TableHead>
              <TableHead>Creator</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRequests.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No payout requests found.
                </TableCell>
              </TableRow>
            ) : (
              filteredRequests.map((req) => (
                <TableRow key={req.id}>
                  <TableCell className="font-medium">{req.id.slice(0, 8)}...</TableCell>
                  <TableCell>{req.creatorId.slice(0, 8)}...</TableCell>
                  <TableCell>
                    ${(req.amount / 100).toFixed(2)} {req.currency}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="capitalize">{req.paymentMethod}</span>
                      <span className="text-muted-foreground text-xs">{req.accountDetails}</span>
                    </div>
                  </TableCell>
                  <TableCell>{format(new Date(req.createdAt), 'MMM d, yyyy')}</TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={statusColors[req.status as keyof typeof statusColors]}
                    >
                      {req.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {req.status === 'pending' && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleAction(req, 'approve')} title="Review">
                            Review Request
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                    {req.status === 'pending' && (
                         <div className="flex justify-end gap-2">
                            <Button size="sm" variant="outline" onClick={() => handleAction(req, 'approve')} title="Approve">Approve</Button>
                            <Button size="sm" variant="destructive" onClick={() => handleAction(req, 'reject')} title="Reject">Reject</Button>
                         </div>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {selectedRequest && (
        <PayoutApprovalModal
          key={`${selectedRequest.id}-${initialAction}`}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          request={selectedRequest}
          initialAction={initialAction}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
}
