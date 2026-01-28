import { NextRequest, NextResponse } from 'next/server';
import { createRazorpayOrder } from '@/lib/payment/razorpay';
import { db } from '@/lib/db';
import { payments } from '@/drizzle/schema';
import { auth } from '@/auth';

import { checkRateLimit as rateLimit } from '@/lib/ratelimit';

interface CreateRazorpayOrderRequest {
  amount: number;
  currency: string;
  resourceId: string;
}

const SUPPORTED_CURRENCIES = ['INR', 'USD'];
const MIN_AMOUNT = 0;

export async function POST(request: NextRequest) {
  try {
    // Rate Limit: 5 requests per minute for order creation
    const rateLimitResult = await rateLimit(request, 5, 60000);
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429, headers: { "Retry-After": Math.ceil((rateLimitResult.reset - Date.now()) / 1000).toString() } }
      );
    }

    const body: CreateRazorpayOrderRequest = await request.json();
    const { amount, currency, resourceId } = body;

    // Validation
    if (!amount || amount <= MIN_AMOUNT) {
      return NextResponse.json(
        { error: 'Invalid amount: must be greater than zero' },
        { status: 400 }
      );
    }

    if (!currency || !SUPPORTED_CURRENCIES.includes(currency)) {
      return NextResponse.json(
        { error: `Invalid currency. Supported: ${SUPPORTED_CURRENCIES.join(', ')}` },
        { status: 400 }
      );
    }

    if (!resourceId) {
      return NextResponse.json(
        { error: 'Missing required field: resourceId' },
        { status: 400 }
      );
    }

    try {
      // Create Razorpay order (amounts are in smallest unit i.e. paise/cents)
      const rzpOrder = await createRazorpayOrder({
        amount,
        currency,
        notes: {
          resourceId,
          type: 'featured_listing'
        }
      });

      const session = await auth();

      // Store in DB
      await db.insert(payments).values({
        id: `pay_rzp_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
        userId: session?.user?.id || 'anonymous',
        resourceId,
        amount: rzpOrder.amount, // already in smallest unit
        currency,
        paymentMethod: 'razorpay',
        transactionId: rzpOrder.id,
        status: 'PENDING',
      });

      return NextResponse.json({
        orderId: rzpOrder.id,
        amount: rzpOrder.amount,
        currency: rzpOrder.currency
      }, { status: 200 });

    } catch (rzpError: any) {
      console.error('Razorpay order creation error:', rzpError);
      return NextResponse.json(
        { error: 'Razorpay order creation failed. Please try again.' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Razorpay API route error:', error);
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    );
  }
}
