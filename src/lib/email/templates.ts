import { Resend } from 'resend';
import { env } from '@/lib/env';

const resend = new Resend(env.RESEND_API_KEY);

export async function sendPaymentConfirmation({
  userEmail,
  userName,
  resourceTitle,
  amount,
  currency,
  transactionId,
  tier
}: {
  userEmail: string;
  userName: string;
  resourceTitle: string;
  amount: number;
  currency: string;
  transactionId: string;
  tier: 'STANDARD' | 'FEATURED';
}) {
  try {
    await resend.emails.send({
      from: 'Antigravity Directory <noreply@googleantigravity.directory>',
      to: userEmail,
      subject: `Payment Confirmed - ${resourceTitle}`,
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #000;">Payment Confirmed! 🎉</h1>
          <p>Hi ${userName},</p>
          <p>We've received your payment for <strong>${resourceTitle}</strong>.</p>

          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="margin-top: 0;">Order Details</h2>
            <ul style="list-style: none; padding: 0;">
              <li><strong>Tier:</strong> ${tier === 'FEATURED' ? 'Featured ($149)' : 'Standard ($49)'}</li>
              <li><strong>Amount:</strong> ${currency} ${(amount / 100).toFixed(2)}</li>
              <li><strong>Transaction ID:</strong> ${transactionId}</li>
            </ul>
          </div>

          <h2>What's Next?</h2>
          <ol>
            <li><strong>Review (24-48 hours):</strong> Our team will review your submission.</li>
            <li><strong>Approval:</strong> Once approved, your resource will go live.</li>
            <li><strong>Notification:</strong> We'll email you when your listing is live.</li>
          </ol>

          <p>Questions? Reply to this email.</p>
          <p>Thanks for contributing to Antigravity!</p>
        </div>
      `
    });
    console.log(`Payment confirmation email sent to ${userEmail}`);
  } catch (error) {
    console.error('Failed to send payment confirmation email:', error);
    // Don't throw - don't want email failure to break payment flow
  }
}

export async function sendListingLive({
  userEmail,
  userName,
  resourceTitle,
  resourceSlug
}: {
  userEmail: string;
  userName: string;
  resourceTitle: string;
  resourceSlug: string;
}) {
  try {
    await resend.emails.send({
      from: 'Antigravity Directory <noreply@googleantigravity.directory>',
      to: userEmail,
      subject: `Your listing is now LIVE! - ${resourceTitle}`,
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #000;">Your Listing is Live! 🚀</h1>
          <p>Hi ${userName},</p>
          <p>Great news! Your resource <strong>${resourceTitle}</strong> is now live on Antigravity Directory.</p>

          <a href="${env.NEXT_PUBLIC_SITE_URL}/t/${resourceSlug}"
             style="display: inline-block; padding: 12px 24px; background: #000; color: #fff; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 20px 0;">
            View Your Listing
          </a>

          <h2>Track Your Performance</h2>
          <p>Visit your <a href="${env.NEXT_PUBLIC_SITE_URL}/dashboard">dashboard</a> to track:</p>
          <ul>
            <li>Views and click-through rate</li>
            <li>Bookmarks and ratings</li>
            <li>Traffic sources</li>
          </ul>

          <p>Thanks for contributing!</p>
        </div>
      `
    });
    console.log(`Listing live email sent to ${userEmail}`);
  } catch (error) {
    console.error('Failed to send listing live email:', error);
  }
}
