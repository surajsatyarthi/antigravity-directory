import { NextResponse } from 'next/server';
import { verifySignature } from '@/lib/razorpay';

export async function POST(req: Request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();

    const isValid = verifySignature(razorpay_order_id, razorpay_payment_id, razorpay_signature);

    if (isValid) {
      return NextResponse.json({ status: 'OK' });
    } else {
      return NextResponse.json({ status: 'FAILED' }, { status: 400 });
    }
  } catch (error: any) {
    console.error('Razorpay Verification API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
