import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

vi.mock('../../../scripts/logger', () => {
    return {
        logger: {
            info: vi.fn(),
            warn: vi.fn(),
            error: vi.fn(),
        }
    };
});

import { logger } from '../../../scripts/logger';
const mockLogger = logger;

import { fetchWithRetry, validateEnvironment } from '../../../scripts/weekly-scraper';

describe('weekly-scraper', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    // Default fetch mock
    global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        headers: new Headers(),
        json: async () => ({})
    });
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  describe('fetchWithRetry', () => {
    it('should return JSON on success', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        headers: new Headers(),
        json: async () => ({ stargazers_count: 100, forks_count: 20 })
      });
      
      const data = await fetchWithRetry('https://api.github.com/repos/test/test', {});
      expect(data.stargazers_count).toBe(100);
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    it('should retry on failure', async () => {
      global.fetch = vi.fn()
        .mockRejectedValueOnce(new Error('Network error'))
        .mockResolvedValueOnce({
          ok: true,
          status: 200,
          headers: new Headers(),
          json: async () => ({ success: true })
        });
        
      const promise = fetchWithRetry('https://api.github.com', {}, 3);
      
      // Fast-forward timers for retry delay
      await vi.advanceTimersByTimeAsync(1000); // 1s wait
      
      const data = await promise;
      expect(data).toEqual({ success: true });
      expect(fetch).toHaveBeenCalledTimes(2);
      expect(mockLogger.warn).not.toHaveBeenCalled(); // fetchWithRetry only logs if it hits 403 or throws in retry loop
    });

    it('should handle rate limits (403/429)', async () => {
      global.fetch = vi.fn()
        .mockResolvedValueOnce({
          ok: false,
          status: 403,
          headers: new Headers({ 'x-ratelimit-reset': String(Math.floor(Date.now() / 1000) + 2) }), // 2s reset
          json: async () => ({})
        })
        .mockResolvedValueOnce({
          ok: true,
          status: 200,
          headers: new Headers(),
          json: async () => ({ success: true })
        });

      const promise = fetchWithRetry('https://api.github.com', {}, 3);
      
      await vi.advanceTimersByTimeAsync(2000); // Wait for rate limit reset
      
      const data = await promise;
      expect(data).toEqual({ success: true });
      expect(fetch).toHaveBeenCalledTimes(2);
      expect(mockLogger.warn).toHaveBeenCalledWith(expect.stringContaining('Rate limited'));
    });
  });

  describe('validateEnvironment', () => {
    const mockSql = Object.assign(vi.fn(), {
      begin: vi.fn(),
      end: vi.fn()
    }) as any;

    it('should return true when all checks pass', async () => {
      mockSql.mockResolvedValueOnce([1]); // Connection check
      mockSql.mockResolvedValueOnce([{ id: 'admin-1' }]); // Admin check
      mockSql.mockResolvedValueOnce([{ count: '10' }]); // Category check - should match categories[0].count

      const result = await validateEnvironment(mockSql);
      expect(result).toBe(true);
      expect(mockLogger.info).toHaveBeenCalledWith(expect.stringContaining('Database connected'));
    });

    it('should return false if admin is missing', async () => {
      mockSql
        .mockResolvedValueOnce([1]) // Connection
        .mockResolvedValueOnce([]); // No admin

      const result = await validateEnvironment(mockSql);
      expect(result).toBe(false);
      expect(mockLogger.warn).toHaveBeenCalledWith(expect.stringContaining('No ADMIN user found'));
    });
  });
});
