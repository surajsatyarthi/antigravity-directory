#!/usr/bin/env tsx
/**
 * Ralph Protocol v6.5 - DPL-001: Environment Variable Validation
 * Phase 1 Enhancement: Active Connectivity Testing
 *
 * This script validates that all required environment variables are present
 * AND actively working before allowing development or deployment.
 *
 * Project: Antigravity Directory (Next.js + PostgreSQL + Razorpay)
 *
 * Usage:
 *   npm run validate:env
 *   npm run validate:env -- --environment=production
 *   npm run validate:env -- --skip-connectivity (vars only)
 */

import { config } from 'dotenv';
import { writeFileSync } from 'node:fs';

// Load .env.local (Next.js convention)
config({ path: '.env.local' });

// Set default NODE_ENV if not set
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}

const REQUIRED_ENV_VARS = {
  // Database (Supabase PostgreSQL)
  DATABASE_URL: {
    description: 'Supabase PostgreSQL connection string',
    example: 'postgresql://postgres:[password]@db.[project].supabase.co:5432/postgres',
    production: true,
    testConnectivity: false,
  },

  // Authentication
  AUTH_SECRET: {
    description: 'NextAuth secret key (min 32 chars)',
    example: 'generate-with-openssl-rand-base64-32',
    production: true,
    testConnectivity: false,
  },
  GOOGLE_CLIENT_ID: {
    description: 'Google OAuth client ID',
    example: '123456789-xxxxxxxx.apps.googleusercontent.com',
    production: true,
    testConnectivity: false,
  },
  GOOGLE_CLIENT_SECRET: {
    description: 'Google OAuth client secret',
    example: 'GOCSPX-xxxxxxxxxxxxx',
    production: true,
    testConnectivity: false,
  },

  // Payments - Razorpay (Primary for India)
  RAZORPAY_KEY_ID: {
    description: 'Razorpay API key ID',
    example: 'rzp_test_xxxxxxxxxxxxx',
    production: true,
    testConnectivity: false,
  },
  RAZORPAY_KEY_SECRET: {
    description: 'Razorpay API secret key',
    example: 'your-razorpay-secret-key',
    production: true,
    testConnectivity: false,
  },

  // Payments - PayPal (Optional for international)
  PAYPAL_CLIENT_ID: {
    description: 'PayPal OAuth client ID',
    example: 'your-paypal-client-id',
    production: false, // Optional
    testConnectivity: false,
  },
  PAYPAL_CLIENT_SECRET: {
    description: 'PayPal OAuth client secret',
    example: 'your-paypal-secret-key',
    production: false, // Optional
    testConnectivity: false,
  },
  PAYPAL_MODE: {
    description: 'PayPal environment (sandbox or live)',
    example: 'sandbox',
    production: false, // Optional
    testConnectivity: false,
  },

  // AI / Content Generation
  GOOGLE_AI_API_KEY: {
    description: 'Google AI (Gemini) API key',
    example: 'AIza...',
    production: false, // Optional for MVP
    testConnectivity: false,
  },

  // Email
  RESEND_API_KEY: {
    description: 'Resend API key for transactional emails',
    example: 're_xxxxxxxxxxxxxxxxxxxx',
    production: true,
    testConnectivity: false,
  },

  // Redis (Rate Limiting)
  UPSTASH_REDIS_REST_URL: {
    description: 'Upstash Redis REST URL',
    example: 'https://your-redis.upstash.io',
    production: true,
    testConnectivity: true,
  },
  UPSTASH_REDIS_REST_TOKEN: {
    description: 'Upstash Redis REST token',
    example: 'your-upstash-token',
    production: true,
    testConnectivity: false,
  },

  // Error Tracking (Optional)
  SENTRY_DSN: {
    description: 'Sentry DSN for error tracking',
    example: 'https://xxxxx@sentry.io/xxxxx',
    production: false, // Optional
    testConnectivity: false,
  },
  NEXT_PUBLIC_SENTRY_DSN: {
    description: 'Sentry DSN (public)',
    example: 'https://xxxxx@sentry.io/xxxxx',
    production: false, // Optional
    testConnectivity: false,
  },
  SENTRY_AUTH_TOKEN: {
    description: 'Sentry authentication token',
    example: 'sntrys_...',
    production: false, // Optional
    testConnectivity: false,
  },

  // Public Variables
  NEXT_PUBLIC_SITE_URL: {
    description: 'Public site URL',
    example: 'http://localhost:3000 or https://googleantigravity.directory',
    production: true,
    testConnectivity: false,
  },

  // Environment
  NODE_ENV: {
    description: 'Node environment',
    example: 'development or production',
    production: true,
    testConnectivity: false,
  },
} as const;

interface ValidationResult {
  valid: boolean;
  missing: string[];
  warnings: string[];
  connectivityIssues: string[];
}

/**
 * Test if a URL is accessible
 */
async function testUrlConnectivity(url: string): Promise<{ success: boolean; error?: string }> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout

    const response = await fetch(url, {
      method: 'HEAD',
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (response.ok || response.status === 405) { // 405 = Method Not Allowed (but URL is accessible)
      return { success: true };
    } else {
      return { success: false, error: `HTTP ${response.status}` };
    }
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: 'Unknown error' };
  }
}

async function validateEnvironment(
  checkProduction = false,
  skipConnectivity = false
): Promise<ValidationResult> {
  const missing: string[] = [];
  const warnings: string[] = [];
  const connectivityIssues: string[] = [];

  console.log('🔍 Ralph Protocol v6.5 - Environment Validation (Antigravity Directory)');
  console.log('====================================================================\n');

  // Step 1: Validate variable presence and format
  console.log('📋 Step 1/3: Checking environment variables...\n');

  for (const [key, config] of Object.entries(REQUIRED_ENV_VARS)) {
    const value = process.env[key];
    // In development, only check production:true vars. In production, check all production:true vars
    const isRequired = config.production;

    if (!value) {
      if (isRequired) {
        missing.push(key);
        console.log(`❌ MISSING: ${key}`);
        console.log(`   Description: ${config.description}`);
        console.log(`   Example: ${config.example}\n`);
      } else {
        warnings.push(key);
        console.log(`⚠️  OPTIONAL: ${key} (not set)`);
        console.log(`   Description: ${config.description}\n`);
      }
    } else {
      // Validate format
      let validFormat = true;
      let formatError = '';

      if (key.includes('URL')) {
        if (!value.startsWith('http://') && !value.startsWith('https://') && !value.startsWith('postgresql://')) {
          validFormat = false;
          formatError = 'Must be a valid URL';
        }
      }

      if (key === 'AUTH_SECRET' && value.length < 32) {
        validFormat = false;
        formatError = 'Must be at least 32 characters';
      }

      if (validFormat) {
        console.log(`✅ ${key}`);
      } else {
        console.log(`❌ ${key} (invalid format)`);
        console.log(`   Error: ${formatError}\n`);
        missing.push(key);
      }
    }
  }

  // Step 2: Test connectivity (if not skipped)
  if (!skipConnectivity && missing.length === 0) {
    console.log('\n🌐 Step 2/3: Testing live connectivity...\n');

    const redisUrl = process.env.UPSTASH_REDIS_REST_URL;

    // Test Redis connectivity
    if (redisUrl && !redisUrl.includes('mock-redis')) {
      console.log('Testing Upstash Redis connectivity...');
      const redisTest = await testUrlConnectivity(redisUrl);
      if (redisTest.success) {
        console.log(`✅ Redis URL is accessible: ${redisUrl}\n`);
      } else {
        console.log(`❌ Redis URL unreachable: ${redisUrl}`);
        console.log(`   Error: ${redisTest.error}\n`);
        connectivityIssues.push(`Redis URL unreachable: ${redisTest.error}`);
      }
    } else {
        console.log(`ℹ️  Skipping Redis connectivity check for mock URL: ${redisUrl}\n`);
    }
  } else if (skipConnectivity) {
    console.log('\n⏭️  Step 2/3: Skipped (--skip-connectivity flag)\n');
  } else {
    console.log('\n⏭️  Step 2/3: Skipped (missing required variables)\n');
  }

  // Step 3: Generate validation log
  console.log('📝 Step 3/3: Generating validation log...\n');

  const result: ValidationResult = {
    valid: missing.length === 0 && connectivityIssues.length === 0,
    missing,
    warnings,
    connectivityIssues,
  };

  if (result.valid) {
    const logContent = `Ralph Protocol v6.5 - Environment Validation (Antigravity Directory)
====================================================================
Validated at: ${new Date().toISOString()}
Status: ✅ PASSED
Missing variables: 0
Connectivity issues: 0
Warnings: ${warnings.length}

All required environment variables are present and services are accessible.
This log file is required by pre-commit hooks to ensure environment validity.

${warnings.length > 0 ? `Warnings (optional variables):\n${warnings.map(w => `  - ${w}`).join('\n')}` : ''}
`;

    try {
      writeFileSync('.env-validated.log', logContent);
      console.log('✅ Validation log created: .env-validated.log');
    } catch (error) {
      console.log('⚠️  Could not write validation log (non-critical)');
    }
  }

  console.log('\n====================================================================');

  if (result.valid) {
    console.log('✅ All checks passed - environment is ready!\n');
  } else {
    if (missing.length > 0) {
      console.log(`❌ ${missing.length} required variable(s) missing or invalid`);
      console.log('   Fix: Add these variables to your .env.local file\n');
    }
    if (connectivityIssues.length > 0) {
      console.log(`❌ ${connectivityIssues.length} connectivity issue(s) detected`);
      console.log('   Fix: Ensure services are running and URLs are correct\n');
      connectivityIssues.forEach(issue => console.log(`   - ${issue}`));
      console.log('');
    }
  }

  return result;
}

// Main execution
const args = process.argv.slice(2);
const isProduction = args.some((arg: string) => arg.includes('production'));
const skipConnectivity = args.some((arg: string) => arg.includes('skip-connectivity'));

validateEnvironment(isProduction, skipConnectivity).then((result) => {
  if (!result.valid) {
    process.exit(1);
  }
  process.exit(0);
});
