import { Resend } from 'resend';

// Initialize Resend with API key from environment variables
// Default to a mock if key is missing/invalid to prevent crashes in dev
const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey && resendApiKey.startsWith('re_') 
  ? new Resend(resendApiKey) 
  : null;

// NOTE: Using onboarding@resend.dev until googleantigravity.directory DNS verification completes
// TODO: Switch to 'Antigravity Directory <payouts@googleantigravity.directory>' after domain verification
const FROM_EMAIL = 'Antigravity Directory <onboarding@resend.dev>';
const SUPPORT_EMAIL = 'support@googleantigravity.directory';
const DASHBOARD_URL = 'https://www.googleantigravity.directory/dashboard';

/**
 * Professional email template wrapper with consistent branding
 */
function getEmailTemplate(content: string): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Antigravity Directory</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); overflow: hidden;">
              <!-- Header -->
              <tr>
                <td style="background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%); padding: 32px; text-align: center;">
                  <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600; letter-spacing: -0.5px;">
                    🚀 Antigravity Directory
                  </h1>
                  <p style="margin: 8px 0 0 0; color: #a0a0a0; font-size: 14px;">
                    Creator Payout System
                  </p>
                </td>
              </tr>
              
              <!-- Content -->
              <tr>
                <td style="padding: 40px 32px;">
                  ${content}
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td style="background-color: #f9f9f9; padding: 24px 32px; border-top: 1px solid #e5e5e5;">
                  <p style="margin: 0 0 12px 0; color: #666666; font-size: 13px; line-height: 1.6;">
                    Questions? Contact us at <a href="mailto:${SUPPORT_EMAIL}" style="color: #000000; text-decoration: none; font-weight: 500;">${SUPPORT_EMAIL}</a>
                  </p>
                  <p style="margin: 0 0 8px 0; color: #999999; font-size: 12px; line-height: 1.6;">
                    © ${new Date().getFullYear()} Antigravity Directory. All rights reserved.<br>
                    This is an automated message. Please do not reply directly to this email.
                  </p>
                  <p style="margin: 0; color: #b3b3b3; font-size: 10px; text-align: center; line-height: 1.4;">
                    A product of INVICTUS INTERNATIONAL CONSULTING
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}

/**
 * Send an email notification when a payout is approved
 */
export async function sendPayoutApprovedEmail(to: string, amountCents: number) {
  if (!resend) {
    console.warn('Resend API key missing or invalid. Skipping email send.');
    return;
  }

  const amount = (amountCents / 100).toFixed(2);

  const content = `
    <div style="text-align: center; margin-bottom: 32px;">
      <div style="background-color: #f0fdf4; border-radius: 50%; width: 64px; height: 64px; margin: 0 auto 16px; display: flex; align-items: center; justify-content: center; font-size: 32px;">
        ✅
      </div>
      <h2 style="margin: 0 0 8px 0; color: #000000; font-size: 28px; font-weight: 700;">
        Payout Approved!
      </h2>
      <p style="margin: 0; color: #666666; font-size: 16px;">
        Your payment is on the way
      </p>
    </div>

    <div style="background-color: #f9f9f9; border-radius: 8px; padding: 24px; margin-bottom: 32px; border-left: 4px solid #22c55e;">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="padding: 8px 0; color: #666666; font-size: 14px;">Amount:</td>
          <td style="padding: 8px 0; color: #000000; font-size: 20px; font-weight: 700; text-align: right;">
            $${amount} USD
          </td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #666666; font-size: 14px;">Status:</td>
          <td style="padding: 8px 0; text-align: right;">
            <span style="background-color: #22c55e; color: #ffffff; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 600;">
              APPROVED
            </span>
          </td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #666666; font-size: 14px;">Processing Time:</td>
          <td style="padding: 8px 0; color: #000000; font-size: 14px; text-align: right;">
            3-5 business days
          </td>
        </tr>
      </table>
    </div>

    <div style="background-color: #f0f9ff; border-radius: 8px; padding: 20px; margin-bottom: 32px;">
      <h3 style="margin: 0 0 12px 0; color: #0369a1; font-size: 16px; font-weight: 600;">
        📋 What happens next?
      </h3>
      <ol style="margin: 0; padding-left: 20px; color: #475569; font-size: 14px; line-height: 1.8;">
        <li>Your payout will be processed within the next 24 hours</li>
        <li>Funds will be transferred to your registered payment method</li>
        <li>You'll receive a confirmation once the transfer is complete</li>
        <li>Expected arrival: 3-5 business days</li>
      </ol>
    </div>

    <div style="text-align: center; margin-top: 32px;">
      <a href="${DASHBOARD_URL}" style="display: inline-block; background-color: #000000; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 15px; transition: background-color 0.2s;">
        View Dashboard →
      </a>
    </div>

    <p style="margin: 32px 0 0 0; color: #999999; font-size: 13px; text-align: center; line-height: 1.6;">
      Thank you for being a valued creator on Antigravity Directory! 🎉
    </p>
  `;

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: `✅ Payout Approved - $${amount} is on the way!`,
      html: getEmailTemplate(content),
    });
    console.log(`✅ Payout approved email sent to ${to} for $${amount}`);
  } catch (error) {
    console.error('❌ Failed to send payout approved email:', error);
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

  const content = `
    <div style="text-align: center; margin-bottom: 32px;">
      <div style="background-color: #fef2f2; border-radius: 50%; width: 64px; height: 64px; margin: 0 auto 16px; display: flex; align-items: center; justify-content: center; font-size: 32px;">
        ⚠️
      </div>
      <h2 style="margin: 0 0 8px 0; color: #000000; font-size: 28px; font-weight: 700;">
        Action Required
      </h2>
      <p style="margin: 0; color: #666666; font-size: 16px;">
        Your payout request needs attention
      </p>
    </div>

    <div style="background-color: #f9f9f9; border-radius: 8px; padding: 24px; margin-bottom: 32px; border-left: 4px solid #f59e0b;">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="padding: 8px 0; color: #666666; font-size: 14px;">Amount:</td>
          <td style="padding: 8px 0; color: #000000; font-size: 20px; font-weight: 700; text-align: right;">
            $${amount} USD
          </td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #666666; font-size: 14px;">Status:</td>
          <td style="padding: 8px 0; text-align: right;">
            <span style="background-color: #ef4444; color: #ffffff; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 600;">
              REQUIRES ATTENTION
            </span>
          </td>
        </tr>
      </table>
    </div>

    <div style="background-color: #fef2f2; border-radius: 8px; padding: 20px; margin-bottom: 32px; border: 1px solid #fee2e2;">
      <h3 style="margin: 0 0 12px 0; color: #dc2626; font-size: 16px; font-weight: 600;">
        📝 Reason for Review:
      </h3>
      <p style="margin: 0; color: #475569; font-size: 15px; line-height: 1.6; background-color: #ffffff; padding: 16px; border-radius: 6px;">
        ${reason}
      </p>
    </div>

    <div style="background-color: #f0f9ff; border-radius: 8px; padding: 20px; margin-bottom: 32px;">
      <h3 style="margin: 0 0 12px 0; color: #0369a1; font-size: 16px; font-weight: 600;">
        🔧 How to resolve this:
      </h3>
      <ol style="margin: 0; padding-left: 20px; color: #475569; font-size: 14px; line-height: 1.8;">
        <li>Review the reason provided above</li>
        <li>Update your payment information if needed</li>
        <li>Verify that all requirements are met</li>
        <li>Submit a new payout request</li>
      </ol>
    </div>

    <div style="text-align: center; margin-top: 32px;">
      <a href="${DASHBOARD_URL}" style="display: inline-block; background-color: #000000; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 15px; margin-right: 12px;">
        Go to Dashboard →
      </a>
      <a href="mailto:${SUPPORT_EMAIL}" style="display: inline-block; background-color: #f5f5f5; color: #000000; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 15px; border: 1px solid #e5e5e5;">
        Contact Support
      </a>
    </div>

    <p style="margin: 32px 0 0 0; color: #999999; font-size: 13px; text-align: center; line-height: 1.6;">
      We're here to help! If you have questions, please don't hesitate to reach out to our support team.
    </p>
  `;

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: `⚠️ Action Required: Payout Request Update ($${amount})`,
      html: getEmailTemplate(content),
    });
    console.log(`⚠️ Payout rejection email sent to ${to} for $${amount}`);
  } catch (error) {
    console.error('❌ Failed to send payout rejection email:', error);
    // Don't throw error to prevent blocking the admin action
  }
}
