'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface Sale {
  id: string;
  resourceName: string;
  resourceSlug: string;
  saleDate: string;
  price: number;
  buyerUsername: string | null;
  buyerName: string | null;
  commissionPercent: number;
  creatorEarnings: number;
  currency: string;
}

interface SalesData {
  sales: Sale[];
  totalCount: number;
  page: number;
  limit: number;
  totalPages: number;
}

export function SalesHistory() {
  const [salesData, setSalesData] = useState<SalesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchSales(currentPage);
  }, [currentPage]);

  const fetchSales = async (page: number) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/creator/sales?page=${page}&limit=50`);
      if (response.ok) {
        const data = await response.json();
        setSalesData(data);
      }
    } catch (error) {
      console.error('Failed to fetch sales:', error);
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  if (loading && !salesData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Sales History</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Loading sales history...</p>
        </CardContent>
      </Card>
    );
  }

  if (!salesData || salesData.sales.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Sales History</CardTitle>
          <CardDescription>Track all your sales and earnings</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No sales yet. Start selling your resources!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales History</CardTitle>
        <CardDescription>
          {salesData.totalCount} total {salesData.totalCount === 1 ? 'sale' : 'sales'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Resource</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Buyer</TableHead>
                <TableHead>Commission</TableHead>
                <TableHead className="text-right">Your Earnings</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {salesData.sales.map((sale) => (
                <TableRow key={sale.id}>
                  <TableCell>
                    <Link
                      href={`/t/${sale.resourceSlug}`}
                      className="font-medium hover:underline"
                    >
                      {sale.resourceName}
                    </Link>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDate(sale.saleDate)}
                  </TableCell>
                  <TableCell>{formatCurrency(sale.price)}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {sale.buyerUsername || sale.buyerName || 'Anonymous'}
                  </TableCell>
                  <TableCell>
                    <Badge variant={sale.commissionPercent === 100 ? 'default' : 'secondary'}>
                      {sale.commissionPercent}%
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {formatCurrency(sale.creatorEarnings)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {salesData.totalPages > 1 && (
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-muted-foreground">
              Page {salesData.page} of {salesData.totalPages}
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={salesData.page === 1 || loading}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(p => Math.min(salesData.totalPages, p + 1))}
                disabled={salesData.page === salesData.totalPages || loading}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
