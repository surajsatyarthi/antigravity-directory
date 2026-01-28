import { NextRequest, NextResponse } from 'next/server';
import { createPayPalOrder } from '@/lib/payment/paypal';
import { db } from '@/lib/db';
import { payments } from '@/drizzle/schema';
import { auth } from '@/auth';

import { checkRateLimit as rateLimit } from '@/lib/ratelimit';

interface CreatePayPalOrderRequest {
  amount: number;
  currency: string;
  resourceId: string;
}

const VALID_CURRENCIES = ['USD', 'EUR', 'GBP', 'AUD', 'CAD'];
const MIN_AMOUNT = 0;
const MAX_AMOUNT = 10000;

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

    // Parse request body
    const body: CreatePayPalOrderRequest = await request.json();
    const { amount, currency, resourceId } = body;

    // Validate required fields
    if (amount === undefined || amount === null) {
      return NextResponse.json(
        { error: 'Missing required field: amount' },
        { status: 400 }
      );
    }

    if (!currency) {
      return NextResponse.json(
        { error: 'Missing required field: currency' },
        { status: 400 }
      );
    }

    if (!resourceId) {
      return NextResponse.json(
        { error: 'Missing required field: resourceId' },
        { status: 400 }
      );
    }

    // Validate amount is a number
    if (typeof amount !== 'number' || isNaN(amount)) {
      return NextResponse.json(
        { error: 'Invalid amount: must be a valid number' },
        { status: 400 }
      );
    }

    // Validate amount range
    if (amount <= MIN_AMOUNT) {
      return NextResponse.json(
        { error: `Invalid amount: must be greater than ${MIN_AMOUNT}` },
        { status: 400 }
      );
    }

    if (amount > MAX_AMOUNT) {
      return NextResponse.json(
        { error: `Invalid amount: must not exceed ${MAX_AMOUNT}` },
        { status: 400 }
      );
    }

    // Validate currency
    if (!VALID_CURRENCIES.includes(currency)) {
      return NextResponse.json(
        { error: `Invalid currency: must be one of ${VALID_CURRENCIES.join(', ')}` },
        { status: 400 }
      );
    }

    // Create PayPal order
    const paypalOrder = await createPayPalOrder({
      amount: amount.toString(),
      currency,
      description: `Featured listing for resource ${resourceId}`
    });

    // Extract approval URL from PayPal response
    const approvalLink = paypalOrder.links.find(link => link.rel === 'approve');
    if (!approvalLink) {
      throw new Error('PayPal order created but approval URL not found');
    }

    const session = await auth();

    // Store payment record in database with PENDING status
    await db.insert(payments).values({
      id: `payment-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      userId: session?.user?.id || 'anonymous',
      resourceId,
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      paymentMethod: 'paypal',
      transactionId: paypalOrder.id,
      status: 'PENDING',
    });

    // Return success response
    return NextResponse.json({
      orderId: paypalOrder.id,
      approvalURL: approvalLink.href
    }, { status: 200 });

  } catch (error) {
    console.error('PayPal order creation error:', error);
    
    // Return user-friendly error message
    return NextResponse.json(
      { error: 'Failed to create payment order. Please try again.' },
      { status: 500 }
    );
  }
}
