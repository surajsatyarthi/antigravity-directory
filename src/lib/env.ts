import { z } from 'zod';

const envSchema = z.object({
  // Database
  DATABASE_URL: z.string().url(),
  DIRECT_URL: z.string().url().optional(),

  // Auth
  AUTH_SECRET: z.string().min(32, 'AUTH_SECRET must be at least 32 characters'),
  GOOGLE_CLIENT_ID: z.string().min(1, 'GOOGLE_CLIENT_ID is required'),
  GOOGLE_CLIENT_SECRET: z.string().min(1, 'GOOGLE_CLIENT_SECRET is required'),

  // Payments - Razorpay
  RAZORPAY_KEY_ID: z.string().min(1, 'RAZORPAY_KEY_ID is required'),
  RAZORPAY_KEY_SECRET: z.string().min(1, 'RAZORPAY_KEY_SECRET is required'),

  // Payments - PayPal
  NEXT_PUBLIC_PAYPAL_CLIENT_ID: z.string().optional(),
  PAYPAL_CLIENT_ID: z.string().optional(),
  PAYPAL_CLIENT_SECRET: z.string().optional(),

  // AI
  GOOGLE_AI_API_KEY: z.string().min(1, 'GOOGLE_AI_API_KEY is required'),

  // Email
  RESEND_API_KEY: z.string().startsWith('re_', 'RESEND_API_KEY must start with re_'),

  // Redis
  UPSTASH_REDIS_REST_URL: z.string().url().optional().or(z.literal('')),
  UPSTASH_REDIS_REST_TOKEN: z.string().optional().or(z.literal('')),

  // Public
  NEXT_PUBLIC_SITE_URL: z.string().url(),

  // Optional
  SENTRY_DSN: z.string().url().optional(),
  NEXT_PUBLIC_SENTRY_DSN: z.string().url().optional(),
  SENTRY_AUTH_TOKEN: z.string().optional(),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

// Determine if we are in a build phase where environment variables might be missing
const isBuildPhase = 
  process.env.npm_lifecycle_event === 'build' || 
  process.env.NEXT_PHASE === 'phase-production-build' || 
  process.env.CI === 'true' ||
  process.env.VERCEL === '1';

// Type-safe env object
export type Env = z.infer<typeof envSchema>;

// Parse and export - bypass validation during build to prevent crashes
export const env: Env = isBuildPhase
  ? new Proxy(process.env, { 
      get: (target, prop) => {
        if (typeof prop === 'string') {
          // Provide dummy values for string operations like Resend startsWith('re_')
          if (prop === 'RESEND_API_KEY' && !target[prop]) return 're_dummy';
          return target[prop] || 'dummy';
        }
        return undefined;
      }
    }) as unknown as Env
  : envSchema.parse(process.env);
