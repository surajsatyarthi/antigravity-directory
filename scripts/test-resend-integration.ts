import { Resend } from 'resend';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const resend = new Resend(process.env.RESEND_API_KEY);

async function testResendIntegration() {
  console.log('🔍 Testing Resend API integration...\n');

  if (!process.env.RESEND_API_KEY) {
    console.error('❌ RESEND_API_KEY not found in .env.local');
    process.exit(1);
  }

  if (!process.env.RESEND_API_KEY.startsWith('re_')) {
    console.error('❌ Invalid RESEND_API_KEY format (must start with "re_")');
    process.exit(1);
  }

  console.log('✅ API key found:', process.env.RESEND_API_KEY.substring(0, 10) + '...');

  try {
    console.log('\n📧 Sending test email...');
    
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'directoryantigravity@gmail.com',
      subject: '[TEST] Resend Integration - Hello World',
      html: '<p>Congrats on sending your <strong>first email</strong>!</p><p>This confirms your Resend API key is working correctly.</p>'
    });

    if (error) {
      console.error('❌ Error sending email:', error);
      process.exit(1);
    }

    console.log('✅ Email sent successfully!');
    console.log('📬 Email ID:', data?.id);
    console.log('\n✨ Resend integration is fully operational!');
    
  } catch (error) {
    console.error('❌ Failed to send email:', error);
    process.exit(1);
  }
}

testResendIntegration();
