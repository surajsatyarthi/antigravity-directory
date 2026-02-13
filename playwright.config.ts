import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// Read from .env.test.local
dotenv.config({ path: path.resolve(__dirname, '.env.test.local') });

export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.ts',
  timeout: 60 * 1000,
  expect: {
    timeout: 10 * 1000,
  },
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: 1, // Force serial execution to prevent DB race conditions
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3001',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    // WebKit disabled due to platform-specific browser crash issues
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],

  webServer: {
    command: 'NEXT_PUBLIC_IS_E2E=true AUTH_URL=http://localhost:3001 DATABASE_URL="postgresql://postgres:postgres@localhost:54322/postgres" PORT=3001 npx next dev',
    url: 'http://localhost:3001',
    reuseExistingServer: false, // Force fresh server for environment variables
    timeout: 120 * 1000,
  },
});
