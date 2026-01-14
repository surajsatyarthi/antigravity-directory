import { NextResponse } from 'next/server';
import { createRazorpayOrder } from '@/lib/razorpay';

export async function POST(req: Request) {
  try {
    const { amount } = await req.json();

    if (!amount) {
      return NextResponse.json({ error: 'Amount is required' }, { status: 400 });
    }

    const order = await createRazorpayOrder(Number(amount));
    return NextResponse.json(order);
  } catch (error: any) {
    console.error('Razorpay Order API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
