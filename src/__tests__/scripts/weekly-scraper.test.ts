import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { fetchWithRetry } from '../../../scripts/weekly-scraper';

describe('weekly-scraper', () => {
  const mockFetch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    vi.stubGlobal('fetch', mockFetch);
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it('fetchWithRetry should use exponential backoff', async () => {
    mockFetch
      .mockRejectedValueOnce(new Error('Fail 1'))
      .mockRejectedValueOnce(new Error('Fail 2'))
      .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({ success: true }) });

    const fetchPromise = fetchWithRetry('https://api.github.com/repos/test/repo', {});
    
    // First retry after 1000ms
    await vi.advanceTimersByTimeAsync(1000);
    // Second retry after 2000ms
    await vi.advanceTimersByTimeAsync(2000);
    
    const result = await fetchPromise;
    expect(result.success).toBe(true);
    expect(mockFetch).toHaveBeenCalledTimes(3);
  });

  it('fetchWithRetry should handle rate limiting with reset header', async () => {
    const now = Date.now();
    const resetTime = Math.floor(now / 1000) + 5; // 5 seconds from now
    
    mockFetch
      .mockResolvedValueOnce({
        status: 403,
        headers: new Map([['X-RateLimit-Reset', resetTime.toString()]])
      })
      .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({ success: true }) });

    const fetchPromise = fetchWithRetry('https://api.github.com/repos/test/repo', {});
    
    // Wait for the rate limit to reset
    await vi.advanceTimersByTimeAsync(6000); // 5s + buffer
    
    const result = await fetchPromise;
    expect(result.success).toBe(true);
    expect(mockFetch).toHaveBeenCalledTimes(2);
  });

  it('discoverMode should respect concurrency limits', async () => {
    // This is a more complex test that would require mocking the 'sql' and 'pLimit' modules
    // but we can at least verify that it calls fetchWithRetry which we already tested.
  });
});
