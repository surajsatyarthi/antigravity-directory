#!/usr/bin/env tsx
/**
 * Email Template Testing Script
 * Tests all email templates with Resend production domain
 */

import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), '.env.local') });

import { sendPayoutApprovedEmail, sendPayoutRejectedEmail } from '../src/lib/email';

const TEST_EMAIL = 'suraj@invictusinternational.com'; // Replace with your email

async function testEmailTemplates() {
  console.log('🧪 Testing Email Templates with Resend\n');
  console.log('🔍 Debug: RESEND_API_KEY =', process.env.RESEND_API_KEY ? `${process.env.RESEND_API_KEY.substring(0, 10)}...` : 'NOT FOUND');
  console.log('📧 All test emails will be sent to:', TEST_EMAIL);
  console.log('━'.repeat(60));

  // Test 1: Payout Approved Email
  console.log('\n1️⃣  Testing Payout Approved Template...');
  try {
    await sendPayoutApprovedEmail(TEST_EMAIL, 14000); // $140.00
    console.log('   ✅ Payout Approved email sent successfully');
  } catch (error) {
    console.error('   ❌ Failed:', error);
  }

  // Wait 2 seconds to avoid rate limiting
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Test 2: Payout Rejected Email
  console.log('\n2️⃣  Testing Payout Rejected Template...');
  try {
    await sendPayoutRejectedEmail(
      TEST_EMAIL,
      14000, // $140.00
      'Your PayPal account email does not match the email registered on Antigravity. Please update your payment information in dashboard settings.'
    );
    console.log('   ✅ Payout Rejected email sent successfully');
  } catch (error) {
    console.error('   ❌ Failed:', error);
  }

  console.log('\n' + '━'.repeat(60));
  console.log('✅ Email template testing complete!');
  console.log(`\n📬 Check your inbox at ${TEST_EMAIL}`);
  console.log('   Expected: 2 emails within 5 minutes');
  console.log('   - "✅ Payout Approved - $140.00 is on the way!"');
  console.log('   - "⚠️ Action Required: Payout Request Update ($140.00)"');
}

testEmailTemplates().catch(console.error);
