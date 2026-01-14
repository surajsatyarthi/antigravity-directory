const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
const PAYPAL_ENV = process.env.PAYPAL_ENV || 'sandbox'; // 'sandbox' or 'live'

const PAYPAL_API_BASE = PAYPAL_ENV === 'live' 
  ? 'https://api-m.paypal.com' 
  : 'https://api-m.sandbox.paypal.com';


/**
 * Generates an access token for the PayPal API using client credentials.
 */
async function generateAccessToken() {
  if (!PAYPAL_CLIENT_ID || !PAYPAL_SECRET) {
    throw new Error('Missing PayPal credentials in environment.');
  }

  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`).toString('base64');
  const response = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
    method: 'POST',
    body: 'grant_type=client_credentials',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  const data = await response.json();
  return data.access_token;
}

/**
 * Creates a PayPal order for a specific amount.
 * @param amount The listing fee ($99 or $299)
 */
export async function createOrder(amount: string) {
  const accessToken = await generateAccessToken();
  const url = `${PAYPAL_API_BASE}/v2/checkout/orders`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: amount,
          },
        },
      ],
    }),
  });

  return await response.json();
}

/**
 * Captures the payment for an existing PayPal order.
 * @param orderID The ID of the order returned by createOrder
 */
export async function capturePayment(orderID: string) {
  const accessToken = await generateAccessToken();
  const url = `${PAYPAL_API_BASE}/v2/checkout/orders/${orderID}/capture`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return await response.json();
}
