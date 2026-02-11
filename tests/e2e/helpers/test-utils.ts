import { test as base } from '@playwright/test';

// Define custom test fixtures if needed later
export const test = base.extend({});

export const expect = base.expect;

// Helper to clean up test data (placeholder for now)
export async function cleanupTestData() {
  console.log('Cleaning up test data...');
  // TODO: Implement DB cleanup logic once schema is final
}
