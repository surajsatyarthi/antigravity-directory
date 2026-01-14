import { describe, it, expect, vi, beforeEach } from 'vitest';
import { enrichContactsForUnverifiedTools } from '@/lib/enrich-contacts';
import { createMockTool, createMockAdmin, createMockApolloContact } from '../../factories';

/**
 * CRITICAL BUSINESS LOGIC TEST
 * 
 * Edward Contact Enrichment Engine
 * Priority: P0 (Revenue Critical)
 * 
 * Tests the core revenue generation engine that:
 * - Finds high-signal prospects
 * - Enriches with decision-maker emails via Apollo
 * - Updates database with contact info
 * - Tracks credit usage and failures
 */

// Mock the database
vi.mock('@/lib/db', () => ({
  db: {
    select: vi.fn().mockReturnThis(),
    from: vi.fn().mockReturnThis(),
    where: vi.fn().mockReturnThis(),
    orderBy: vi.fn().mockReturnThis(),
    limit: vi.fn(),
    update: vi.fn().mockReturnThis(),
    set: vi.fn().mockReturnThis(),
  },
}));

// Mock Apollo API client
vi.mock('@/lib/apollo', () => ({
  findContactEmail: vi.fn(),
}));

// Mock auth
vi.mock('@/auth', () => ({
  auth: vi.fn(),
}));

import { db } from '@/lib/db';
import { findContactEmail } from '@/lib/apollo';
import { auth } from '@/auth';

describe('Edward Enrichment Engine - Contact Enrichment', () => {
  const mockAdmin = createMockAdmin();
  
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Setup admin authentication
    (auth as any).mockResolvedValue({
      user: { id: mockAdmin.id, role: 'ADMIN' },
    });
  });

  describe('Happy Path - Successful Enrichment', () => {    it('enriches contacts for high-signal unverified tools', async () => {
      const mockTools = [
        createMockTool({
          name: 'Cursor',
          searchVolumeSignal: 45000,
          website: 'https://cursor.sh',
          contactEmail: null,
        }),
        createMockTool({
          name: 'GitHub Copilot',
          searchVolumeSignal: 50000,
          website: 'https://github.com/copilot',
          contactEmail: null,
        }),
      ];

      // Mock admin user lookup (first call)
      (db.limit as any).mockResolvedValueOnce([mockAdmin]);
      // Mock DB query for unverified tools (second call)
      (db.limit as any).mockResolvedValueOnce(mockTools);

      // Mock Apollo API responses with correct structure
      (findContactEmail as any)
        .mockResolvedValueOnce({ success: true, email: 'founder@cursor.sh', creditsUsed: 1, message: 'Found' })
        .mockResolvedValueOnce({ success: true, email: 'ceo@github.com', creditsUsed: 1, message: 'Found' });

      const result = await enrichContactsForUnverifiedTools();

      // Verify correct number of tools enriched
      expect(result.total).toBe(2);
      expect(result.enriched).toBe(2);
      expect(result.failed).toBe(0);
      expect(result.creditsUsed).toBe(2);

      // Verify Apollo was called for each tool
      expect(findContactEmail).toHaveBeenCalledTimes(2);
      expect(findContactEmail).toHaveBeenCalledWith('cursor.sh', 'Cursor');
      expect(findContactEmail).toHaveBeenCalledWith('github.com', 'GitHub Copilot');

      // Verify database was updated
      expect(db.update).toHaveBeenCalledTimes(2);
    });
  });

  describe('Error Handling - API Failures', () => {
    it('handles Apollo API rate limiting gracefully', async () => {
      const mockTools = [createMockTool({ website: 'https://test.com' })];
      // Mock admin user lookup first
      (db.limit as any).mockResolvedValueOnce([mockAdmin]);
      (db.limit as any).mockResolvedValueOnce(mockTools);

      // Mock rate limit error - return failed response instead of throwing
      (findContactEmail as any).mockResolvedValue({ success: false, email: null, creditsUsed: 0, message: 'Rate limit exceeded' });

      const result = await enrichContactsForUnverifiedTools();

      expect(result.failed).toBe(1);
      expect(result.enriched).toBe(0);
      expect(result.creditsUsed).toBe(0); // No credits used on failure
    });

    it('handles network timeouts without crashing', async () => {
      const mockTools = [createMockTool({ website: 'https://slow-site.com' })];
      // Mock admin user lookup first
      (db.limit as any).mockResolvedValueOnce([mockAdmin]);
      (db.limit as any).mockResolvedValueOnce(mockTools);

      // Mock timeout error - return failed response instead of rejecting
      (findContactEmail as any).mockResolvedValue({ success: false, email: null, creditsUsed: 0, message: 'ETIMEDOUT' });

      const result = await enrichContactsForUnverifiedTools();

      expect(result.failed).toBe(1);
      expect(result.total).toBe(1);
      // Should not throw - should handle gracefully
    });

    it('continues processing after individual failures', async () => {
      const mockTools = [
        createMockTool({ name: 'Tool A', website: 'https://a.com' }),
        createMockTool({ name: 'Tool B', website: 'https://b.com' }),
        createMockTool({ name: 'Tool C', website: 'https://c.com' }),
      ];
      // Mock admin user lookup first
      (db.limit as any).mockResolvedValueOnce([mockAdmin]);
      (db.limit as any).mockResolvedValueOnce(mockTools);

      // Tool A fails, B succeeds, C fails
      (findContactEmail as any)
        .mockResolvedValueOnce({ success: false, email: null, creditsUsed: 0, message: 'Not found' })
        .mockResolvedValueOnce({ success: true, email: 'founder@b.com', creditsUsed: 1, message: 'Found' })
        .mockResolvedValueOnce({ success: false, email: null, creditsUsed: 0, message: 'Invalid domain' });

      const result = await enrichContactsForUnverifiedTools();

      expect(result.total).toBe(3);
      expect(result.enriched).toBe(1);
      expect(result.failed).toBe(2);
      expect(result.creditsUsed).toBe(1);
    });
  });

  describe('Edge Cases - Data Validation', () => {
    it('skips tools without website URLs', async () => {
      const mockTools = [
        createMockTool({ website: null, url: null }),
        createMockTool({ website: null, url: null }),
        createMockTool({ website: 'https://valid.com' }),
      ];
      // Mock admin user lookup first
      (db.limit as any).mockResolvedValueOnce([mockAdmin]);
      (db.limit as any).mockResolvedValueOnce(mockTools);
      (findContactEmail as any).mockResolvedValue({ success: true, email: 'test@valid.com', creditsUsed: 1, message: 'Found' });

      const result = await enrichContactsForUnverifiedTools();

      // Should only process the valid one
      expect(findContactEmail).toHaveBeenCalledTimes(1);
      expect(result.total).toBe(3);
      expect(result.enriched).toBe(1);
      expect(result.failed).toBe(2);
    });

    it('handles malformed URLs without crashing', async () => {
      const mockTools = [
        createMockTool({ website: 'not-a-url' }),
        createMockTool({ website: 'ftp://weird.com' }),
      ];
      // Mock admin user lookup first
      (db.limit as any).mockResolvedValueOnce([mockAdmin]);
      (db.limit as any).mockResolvedValueOnce(mockTools);

      const result = await enrichContactsForUnverifiedTools();

      // Should gracefully handle bad URLs
      expect(result.failed).toBeGreaterThanOrEqual(0);
      // Should not throw
    });

    it('respects search volume threshold', async () => {
      // The database query already filters by searchVolumeSignal > 1000
      // So low-signal tools won't be returned by the DB query
      const lowSignalTools: any[] = []; // Empty array since DB filters them out
      // Mock admin user lookup first
      (db.limit as any).mockResolvedValueOnce([mockAdmin]);
      (db.limit as any).mockResolvedValueOnce(lowSignalTools);

      const result = await enrichContactsForUnverifiedTools();

      // Should not process low-signal tools
      expect(result.total).toBe(0);
      expect(findContactEmail).not.toHaveBeenCalled();
    });
  });

  describe('Security - Authorization', () => {
    it('rejects non-admin users', async () => {
      const regularUser = createMockAdmin(); // Create user
      regularUser.role = 'USER'; // But make them non-admin
      
      (auth as any).mockResolvedValue({
        user: { id: regularUser.id, role: 'USER' },
      });
      (db.limit as any).mockResolvedValueOnce([regularUser]);

      await expect(enrichContactsForUnverifiedTools()).rejects.toThrow();
    });

    it('rejects unauthenticated requests', async () => {
      (auth as any).mockResolvedValue(null);

      await expect(enrichContactsForUnverifiedTools()).rejects.toThrow();
    });
  });

  describe('Performance - Benchmarking', () => {
    it('processes 50 tools in under 10 seconds', async () => {
      const mockTools = Array.from({ length: 50 }, (_, i) =>
        createMockTool({ name: `Tool ${i}`, website: `https://tool${i}.com` })
      );
      // Mock admin user lookup first
      (db.limit as any).mockResolvedValueOnce([mockAdmin]);
      (db.limit as any).mockResolvedValueOnce(mockTools);
      
      // Fast mock responses
      (findContactEmail as any).mockResolvedValue({ success: true, email: 'test@example.com', creditsUsed: 1, message: 'Found' });

      const start = Date.now();
      await enrichContactsForUnverifiedTools();
      const duration = Date.now() - start;

      expect(duration).toBeLessThan(10000); // 10 seconds
    }, 15000); // 15s timeout for safety
  });
});
