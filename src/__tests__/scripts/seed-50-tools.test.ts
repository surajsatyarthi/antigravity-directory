import { describe, it, expect, vi } from 'vitest';

// Mock postgres and sql
const { mockSql } = vi.hoisted(() => ({
  mockSql: Object.assign(vi.fn(() => Promise.resolve([] as any[])), {
    begin: vi.fn(async (cb: any) => {
      const tx = vi.fn(() => Promise.resolve([]));
      return await cb(tx);
    }),
    end: vi.fn(() => Promise.resolve()),
  })
}));

vi.mock('postgres', () => {
  const m = vi.fn(() => mockSql);
  // @ts-ignore
  m.default = m;
  return m;
});

// Mock dotenv
vi.mock('dotenv', () => ({
  config: vi.fn()
}));

import { seedTools, validateTool } from '../../../scripts/seed-50-tools';

describe('seed-50-tools', () => {
  describe('validateTool', () => {
    it('should validate a correct tool', () => {
      const tool = { title: 'Test', url: 'https://test.com', category: 'ai' };
      expect(validateTool(tool)).toBe(true);
    });

    it('should throw error for missing title', () => {
      const tool = { url: 'https://test.com', category: 'ai' };
      expect(() => validateTool(tool)).toThrow(/Missing title/);
    });

    it('should throw error for missing url', () => {
      const tool = { title: 'Test', category: 'ai' };
      expect(() => validateTool(tool)).toThrow(/Missing url/);
    });

    it('should throw error for missing category', () => {
      const tool = { title: 'Test', url: 'https://test.com' };
      expect(() => validateTool(tool)).toThrow(/Missing category/);
    });
  });

  describe('seedTools', () => {
    it('should complete seeding successfully', async () => {
      // Setup mock data for categories and admin
      mockSql.mockImplementationOnce(() => Promise.resolve([{ id: 'cat-1', slug: 'ai-coding' }])); // categories
      mockSql.mockImplementationOnce(() => Promise.resolve([{ id: 'admin-1' }])); // admin user
      
      await seedTools(mockSql);
      expect(mockSql).toHaveBeenCalled();
    });

    it('should handle missing admin gracefully', async () => {
      mockSql.mockImplementationOnce(() => Promise.resolve([{ id: 'cat-1', slug: 'ai-coding' }]));
      mockSql.mockImplementationOnce(() => Promise.resolve([])); // no admin
      
      await expect(seedTools(mockSql)).rejects.toThrow('No Admin ID found');
    });
  });
});
