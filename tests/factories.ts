import { randomUUID } from 'crypto';

/**
 * Test Data Factories
 * 
 * Create consistent, reusable mock data for tests
 * Based on critical analysis recommendation #5
 */

export const createMockTool = (overrides: Partial<any> = {}) => {
  const tool = {
    id: randomUUID(),
    name: 'Test AI Tool',
    slug: 'test-ai-tool',
    description: 'A powerful AI tool for testing',
    category: 'generator',
    isVerified: false,
    searchVolumeSignal: 5000,
    website: 'https://test-tool.com',
    url: 'https://test-tool.com',
    contactEmail: null,
    lastOutreachAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  };
  // If website was overridden but url wasn't, sync them
  if (overrides.website && !overrides.url) {
    tool.url = overrides.website;
  }
  return tool;
};

export const createMockUser = (overrides: Partial<any> = {}) => ({
  id: randomUUID(),
  email: 'test@example.com',
  name: 'Test User',
  role: 'USER',
  username: 'testuser',
  bio: null,
  website: null,
  image: null,
  emailVerified: null,
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides,
});

export const createMockAdmin = () => createMockUser({
  email: 'admin@example.com',
  role: 'ADMIN',
  username: 'admin',
});

export const createMockResource = (overrides: Partial<any> = {}) => ({
  id: randomUUID(),
  title: 'Test Resource',
  slug: 'test-resource',
  description: 'A test resource for testing',
  categoryId: randomUUID(),
  views: 100,
  featured: false,
  badgeType: null,
  publishedAt: new Date(),
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides,
});

export const createMockCategory = (overrides: Partial<any> = {}) => ({
  id: randomUUID(),
  name: 'Test Category',
  slug: 'test-category',
  description: 'A category for testing',
  order: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides,
});

export const createMockEnrichmentResult = (overrides: Partial<any> = {}) => ({
  total: 50,
  enriched: 30,
  failed: 20,
  creditsUsed: 30,
  ...overrides,
});

export const createMockPayPalOrder = (overrides: Partial<any> = {}) => ({
  id: 'PAYPAL-' + randomUUID(),
  status: 'CREATED',
  links: [
    {
      rel: 'approve',
      href: 'https://paypal.com/approve/test',
    },
  ],
  ...overrides,
});

export const createMockApolloContact = (overrides: Partial<any> = {}) => ({
  email: 'founder@test-company.com',
  first_name: 'John',
  last_name: 'Doe',
  title: 'CEO',
  organization_name: 'Test Company',
  ...overrides,
});
