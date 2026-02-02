import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

/**
 * RALPH PROTOCOL v5.0 - SECURITY SCANNER
 * 
 * Scans codebase for P0 issues identified in FAANG Audit.
 * This script is run automatically at Gate 3.
 */

// Define P0 Issues to check
const CHECKS = [
  {
    id: 'SEC-001',
    name: 'Payment Replay Attack Vulnerability',
    severity: 'P0',
    description: 'Payment verification must use database state, NOT in-memory Sets/Maps which fail in serverless.',
    pattern: '**src/**/payment/**/*.ts',
    validate: (content: string) => {
      // Fail if we find in-memory verification logic
      const hasInProgressSet = content.includes('new Set<string>()') || content.includes('new Set()');
      const hasVerifiedPaymentsVar = content.includes('verifiedPayments');
      return !(hasInProgressSet && hasVerifiedPaymentsVar);
    },
    fix: 'Use database lookup (e.g., db.query.payments.findFirst) to verify transaction status.'
  },
  {
    id: 'SEC-002',
    name: 'Production Mock Data Fallback',
    severity: 'P0',
    description: 'Production code must NEVER fallback to mock data on DB failure. Fail loud.',
    pattern: 'src/lib/queries.ts',
    validate: (content: string) => {
      // Fail if catch block returns mock data
      const hasMockFallback = /catch.*mock/i.test(content) || /return.*mock/i.test(content);
      return !hasMockFallback;
    },
    fix: 'Remove try/catch that returns mock data. Allow error to bubble up to error boundaries.'
  },
  {
    id: 'SEC-003',
    name: 'Environment Variable Validation',
    severity: 'P0',
    description: 'Application must validate all required env vars at startup using Zod.',
    pattern: 'src/lib/env.ts',
    checkFileExists: true,
    validate: (content: string) => {
      return content.includes('z.object') && content.includes('export const env');
    },
    fix: 'Create src/lib/env.ts with Zod schema validation.'
  },
  {
    id: 'SEC-006',
    name: 'Rate Limiting on POST Routes',
    severity: 'P1',
    description: 'All POST endpoints must have rate limiting protection.',
    pattern: 'src/app/api/**/route.ts',
    validate: (content: string) => {
      if (!content.includes('export async function POST')) return true; // Skip non-POST
      return content.includes('checkRateLimit') || content.includes('ratelimit');
    },
    fix: 'Add sensitive rate limiting to the POST handler.'
  }
];

async function scan() {
  console.log('🦅 Ralph Protocol v5.0: Security Scanner Initiated...');
  let hasErrors = false;
  let totalChecks = 0;
  let passedChecks = 0;

  for (const check of CHECKS) {
    totalChecks++;
    console.log(`\nTesting ${check.id}: ${check.name}...`);

    if (check.checkFileExists) {
      const exists = fs.existsSync(check.pattern);
      if (!exists) {
        console.error(`❌ FAILED: File ${check.pattern} missing.`);
        hasErrors = true;
        continue;
      }
    }

    const files = await glob(check.pattern, { ignore: ['**/*.test.ts', '**/__tests__/**'] });
    
    if (files.length === 0 && !check.checkFileExists) {
       console.log(`ℹ️  No files match pattern ${check.pattern}, skipping.`);
       continue;
    }

    let checkPassed = true;

    for (const file of files) {
      const content = fs.readFileSync(file, 'utf-8');
      if (!check.validate(content)) {
        console.error(`❌ FAILED: ${file}`);
        console.error(`   Reason: ${check.description}`);
        console.error(`   Fix: ${check.fix}`);
        checkPassed = false;
        hasErrors = true;
      }
    }

    if (checkPassed) {
      console.log(`✅ PASSED`);
      passedChecks++;
    }
  }

  console.log('\n----------------------------------------');
  console.log(`Security Scan Complete: ${passedChecks}/${totalChecks} Passed`);
  
  if (hasErrors) {
    console.error('🚨 CRITICAL P0 ISSUES FOUND. BLOCKING COMMIT/DEPLOY.');
    process.exit(1);
  } else {
    console.log('🛡️  System Secured. No P0 issues detected.');
    process.exit(0);
  }
}

scan().catch(err => {
  console.error('Scanner crash:', err);
  process.exit(1);
});
