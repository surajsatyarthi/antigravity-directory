import { NextResponse } from 'next/server';
import { capturePayment } from '@/lib/paypal';

export async function POST(req: Request) {
  try {
    const { orderID } = await req.json();

    if (!orderID) {
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
    }

    const captureData = await capturePayment(orderID);
    
    // TODO: Update database status here (e.g., mark resource as verified/featured)
    
    return NextResponse.json(captureData);
  } catch (error: any) {
    console.error('PayPal Capture Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
