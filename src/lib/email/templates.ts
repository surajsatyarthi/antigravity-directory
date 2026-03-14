import { Resend } from 'resend';
import { env } from '@/lib/env';

const resend = new Resend(env.RESEND_API_KEY);


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
