import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock environment variables
process.env.NEXT_PUBLIC_SITE_URL = 'https://test.example.com';
process.env.APOLLO_API_KEY = 'test-apollo-key';
process.env.RESEND_API_KEY = 'test-resend-key';
