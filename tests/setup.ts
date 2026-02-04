import { config } from 'dotenv';
import { resolve } from 'path';
import { vi, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

// Load test environment variables
config({ path: resolve(process.cwd(), '.env.test') });

// Mock environment variables for tests
process.env.DATABASE_URL = process.env.DATABASE_URL || 'postgresql://test:test@localhost:5432/test';
process.env.AUTH_SECRET = process.env.AUTH_SECRET || 'test-secret-key-that-is-at-least-32-characters-long';
process.env.NEXTAUTH_URL = process.env.NEXTAUTH_URL || 'http://localhost:3000';
process.env.NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET || 'test-nextauth-secret';
process.env.GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || 'test-google-id';
process.env.GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || 'test-google-secret';
process.env.PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID || 'test-paypal-id';
process.env.PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET || 'test-paypal-secret';
process.env.RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID || 'test-razorpay-id';
process.env.RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || 'test-razorpay-secret';
process.env.GOOGLE_AI_API_KEY = process.env.GOOGLE_AI_API_KEY || 'test-ai-key';
process.env.RESEND_API_KEY = process.env.RESEND_API_KEY || 're_test_key';
process.env.UPSTASH_REDIS_REST_URL = process.env.UPSTASH_REDIS_REST_URL || 'https://test-redis.upstash.io';
process.env.UPSTASH_REDIS_REST_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN || 'test-redis-token';
process.env.NEXT_PUBLIC_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

/*
// Suppress console output during tests
global.console = {
  ...console,
  log: vi.fn(),
  debug: vi.fn(),
  info: vi.fn(),
  warn: vi.fn(),
  error: vi.fn(),
} as any;
*/

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Proper mock of next/server
vi.mock('next/server', () => {
  const NextRequestMock = class {
    public json: any;
    public text: any;
    public clone: any;
    public headers: Headers;
    constructor(public url: string, public options?: any) {
      this.json = vi.fn().mockResolvedValue(options?.body ? (typeof options.body === 'string' ? JSON.parse(options.body) : options.body) : {});
      this.text = vi.fn().mockResolvedValue(options?.body || '');
      this.clone = vi.fn(() => new NextRequestMock(url, options));
      this.headers = new Headers(options?.headers || {});
    }
  };

  return {
    NextRequest: NextRequestMock,
    NextResponse: {
      json: vi.fn((data: any, init?: any) => new Response(JSON.stringify(data), {
        ...init,
        headers: {
          ...init?.headers,
          'Content-Type': 'application/json',
        }
      })),
      redirect: vi.fn((url: string, init?: any) => new Response(null, {
        ...init,
        status: 302,
        headers: {
          ...init?.headers,
          location: url,
        }
      })),
    },
  };
});

// Mock canvas for jsdom
vi.mock('canvas', () => ({
  default: vi.fn(),
  createCanvas: vi.fn(() => ({
    getContext: vi.fn(() => ({
      fillRect: vi.fn(),
      clearRect: vi.fn(),
      getImageData: vi.fn(),
      putImageData: vi.fn(),
      createImageData: vi.fn(),
      setTransform: vi.fn(),
      drawImage: vi.fn(),
      save: vi.fn(),
      fillText: vi.fn(),
      restore: vi.fn(),
      beginPath: vi.fn(),
      moveTo: vi.fn(),
      lineTo: vi.fn(),
      closePath: vi.fn(),
      stroke: vi.fn(),
      translate: vi.fn(),
      scale: vi.fn(),
      rotate: vi.fn(),
      arc: vi.fn(),
      fill: vi.fn(),
    })),
    toDataURL: vi.fn(),
  })),
}));

// Proper mock of next-auth
vi.mock('next-auth', () => ({
  default: () => ({
    auth: vi.fn(),
    handlers: { GET: vi.fn(), POST: vi.fn() },
    signIn: vi.fn(),
    signOut: vi.fn(),
  }),
}));
