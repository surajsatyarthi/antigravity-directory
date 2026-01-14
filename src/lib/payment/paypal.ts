/**
 * PayPal Payment Integration
 * 
 * Revenue-critical module for processing PayPal payments
 * Handles order creation and payment capture
 */

interface PayPalOrderParams {
  amount: string;
  currency: string;
  description?: string;
}

interface PayPalOrder {
  id: string;
  status: string;
  links: Array<{ rel: string; href: string }>;
}

interface PayPalCaptureResponse {
  id: string;
  status: string;
  purchase_units?: Array<{
    payments: {
      captures: Array<{ status: string }>;
    };
  }>;
}

/**
 * Get PayPal access token for API authentication
 */
async function getPayPalAccessToken(): Promise<string> {
  const clientId = process.env.PAYPAL_CLIENT_ID || process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET || process.env.PAYPAL_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('PayPal credentials not configured');
  }

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  const baseUrl = process.env.PAYPAL_MODE === 'live' || process.env.PAYPAL_ENV === 'live'
    ? 'https://api-m.paypal.com'
    : 'https://api-m.sandbox.paypal.com';

  try {
    const response = await fetch(`${baseUrl}/v1/oauth2/token`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    });

    if (!response.ok) {
      throw new Error('Failed to authenticate with PayPal');
    }

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    if (error instanceof Error && error.message.includes('fetch')) {
      throw new Error('Network error');
    }
    throw error;
  }
}

/**
 * Create a PayPal order for payment
 */
export async function createPayPalOrder(params: PayPalOrderParams): Promise<PayPalOrder> {
  const { amount, currency, description = 'Purchase' } = params;

  // Validate amount
  const amountNum = parseFloat(amount);
  if (isNaN(amountNum) || amountNum <= 0) {
    throw new Error('Invalid amount: must be a positive number');
  }

  try {
    const accessToken = await getPayPalAccessToken();
    const baseUrl = process.env.PAYPAL_MODE === 'live' || process.env.PAYPAL_ENV === 'live'
      ? 'https://api-m.paypal.com'
      : 'https://api-m.sandbox.paypal.com';

    const response = await fetch(`${baseUrl}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: currency,
              value: amount,
            },
            description,
          },
        ],
        application_context: {
          brand_name: 'Antigravity Directory',
          landing_page: 'NO_PREFERENCE',
          user_action: 'PAY_NOW',
          return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/payment/success`,
          cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/payment/cancel`,
        },
      }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(`Failed to create PayPal order`);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error && error.message.includes('Network error')) {
      throw new Error('Failed to create PayPal order');
    }
    throw error;
  }
}

/**
 * Capture payment for an approved PayPal order
 */
export async function capturePayPalPayment(orderId: string): Promise<PayPalCaptureResponse> {
  if (!orderId || typeof orderId !== 'string') {
    throw new Error('Invalid order ID');
  }

  const accessToken = await getPayPalAccessToken();
  const baseUrl = process.env.PAYPAL_MODE === 'live' || process.env.PAYPAL_ENV === 'live'
    ? 'https://api-m.paypal.com'
    : 'https://api-m.sandbox.paypal.com';

  const response = await fetch(`${baseUrl}/v2/checkout/orders/${orderId}/capture`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(`Failed to capture payment`);
  }

  const captureData = await response.json();

  // Verify capture was successful
  if (captureData.status !== 'COMPLETED') {
    throw new Error(`Payment capture failed with status: ${captureData.status}`);
  }

  return captureData;
}
