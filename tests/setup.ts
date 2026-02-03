import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock environment variables
process.env.NEXT_PUBLIC_SITE_URL = 'https://test.example.com';
process.env.APOLLO_API_KEY = 'test-apollo-key';
process.env.RESEND_API_KEY = 'test-resend-key';

// Mock next/server
vi.mock('next/server', () => ({
  NextResponse: {
    json: vi.fn((data: any) => ({ json: () => data })),
  },
}));

// Mock next-auth
vi.mock('next-auth', () => ({
  default: () => ({
    auth: vi.fn(),
    handlers: { GET: vi.fn(), POST: vi.fn() },
    signIn: vi.fn(),
    signOut: vi.fn(),
  }),
}));
