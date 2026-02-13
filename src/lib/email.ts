import { Resend } from 'resend';

// Initialize Resend with API key from environment variables
// Default to a mock if key is missing/invalid to prevent crashes in dev
const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey && resendApiKey.startsWith('re_') 
  ? new Resend(resendApiKey) 
  : null;

const FROM_EMAIL = 'payouts@googleantigravity.directory';

/**
 * Send an email notification when a payout is approved
 */
export async function sendPayoutApprovedEmail(to: string, amountCents: number) {
  if (!resend) {
    console.warn('Resend API key missing or invalid. Skipping email send.');
    return;
  }

  const amount = (amountCents / 100).toFixed(2);

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: `✅ Payout Approved - $${amount} is on the way!`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Payout Approved!</h2>
          <p>Great news! Your payout request for <strong>$${amount}</strong> has been approved.</p>
          <p>The funds should arrive in your account within 3-5 business days, depending on your payment method.</p>
          <hr />
          <p style="color: #666; font-size: 12px;">Google Antigravity Directory</p>
        </div>
      `,
    });
    console.log(`Payout approved email sent to ${to}`);
  } catch (error) {
    console.error('Failed to send payout approved email:', error);
    // Don't throw error to prevent blocking the admin action
  }
}

/**
 * Send an email notification when a payout is rejected
 */
export async function sendPayoutRejectedEmail(to: string, amountCents: number, reason: string) {
  if (!resend) {
    console.warn('Resend API key missing or invalid. Skipping email send.');
    return;
  }

  const amount = (amountCents / 100).toFixed(2);

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: `⚠️ Action Required: Payout Request Update`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Payout Request Update</h2>
          <p>Your payout request for <strong>$${amount}</strong> could not be processed at this time.</p>
          <p><strong>Reason:</strong> ${reason}</p>
          <p>Please address the issue and submit a new request, or reply to this email for support.</p>
          <hr />
          <p style="color: #666; font-size: 12px;">Google Antigravity Directory</p>
        </div>
      `,
    });
    console.log(`Payout rejected email sent to ${to}`);
  } catch (error) {
    console.error('Failed to send payout rejected email:', error);
  }
}
