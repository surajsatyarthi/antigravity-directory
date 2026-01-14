import { NextResponse } from 'next/server';
import { createOrder } from '@/lib/paypal';

export async function POST(req: Request) {
  try {
    const { amount } = await req.json();

    if (!amount) {
      return NextResponse.json({ error: 'Amount is required' }, { status: 400 });
    }

    const order = await createOrder(amount);
    return NextResponse.json(order);
  } catch (error: any) {
    console.error('PayPal Order Creation Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
