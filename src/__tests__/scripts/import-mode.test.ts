import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import * as fs from 'fs';

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

// Must mock fs before importing the module under test
// Mock fs
vi.mock('fs', async (importOriginal) => {
  const actual = await importOriginal<typeof import('fs')>();
  const mockFs = {
    ...actual,
    existsSync: vi.fn(),
    readFileSync: vi.fn(),
    writeFileSync: vi.fn(),
  };
  return {
    ...mockFs,
    default: mockFs
  };
});

import { importMode } from '../../../scripts/weekly-scraper';

describe('importMode', () => {
  let mockSql: any;

  beforeEach(() => {
    vi.clearAllMocks();
    
    // Create fresh mockSql for each test
    mockSql = Object.assign(vi.fn(), {
      begin: vi.fn(async (cb) => await cb(mockSql)),
      end: vi.fn()
    });
    
    // Default mocks for importMode
    // 1. categoriesList = await dbConn`SELECT id, slug FROM categories`
    // 2. admin = await dbConn`SELECT id FROM users WHERE role = 'ADMIN' LIMIT 1`
    mockSql
      .mockResolvedValueOnce([
          { id: 'cat-1', slug: 'mcp-servers' },
          { id: 'cat-2', slug: 'boilerplates' }
      ]) // categoriesList
      .mockResolvedValueOnce([{ id: 'admin-1' }]); // admin
    
    vi.mocked(fs.readFileSync).mockReturnValue('[]');
    vi.mocked(fs.existsSync).mockReturnValue(true);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('should exit if pending file does not exist', async () => {
    vi.mocked(fs.existsSync).mockReturnValue(false);
    
    // Pass mockSql (db) to avoid process.exit(1)
    await importMode(mockSql);
    
    expect(logger.error).toHaveBeenCalledWith(expect.stringContaining('No pending-resources.json found'));
  });

  it('should exit if no approved resources', async () => {
    vi.mocked(fs.existsSync).mockReturnValue(true);
    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify([
        { title: 'Foo', approved: false }
    ]));

    await importMode(mockSql);
    
    expect(logger.warn).toHaveBeenCalledWith(expect.stringContaining('No approved resources found'));
  });

  it('should process valid resource in dry-run mode without DB insert', async () => {
    vi.mocked(fs.existsSync).mockReturnValue(true);
    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify([
      { 
        title: 'New MCP', 
        description: 'Desc', 
        url: 'https://github.com/foo/bar', 
        category: 'mcp-servers', 
        approved: true 
      }
    ]));

    // Simulate --dry-run
    const originalArgv = process.argv;
    process.argv = [...process.argv, '--dry-run'];

    // importMode calls categoriesList and adminId check
    // We already have 2 mockResolvedValueOnce in beforeEach.
    
    await importMode(mockSql);

    expect(logger.info).toHaveBeenCalledWith(expect.stringContaining('[DRY-RUN] Would import: "New MCP"'));
    expect(mockSql.begin).not.toHaveBeenCalled();

    process.argv = originalArgv;
  });

  it('should fail on invalid URL', async () => {
    vi.mocked(fs.existsSync).mockReturnValue(true);
    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify([
      { 
        title: 'Bad URL', 
        description: 'Desc', 
        url: 'not-a-url', 
        category: 'mcp-servers', 
        approved: true 
      }
    ]));

    // Run in dry-run to bypass transaction mock issues
    const originalArgv = process.argv;
    process.argv = [...process.argv, '--dry-run'];
    
    await importMode(mockSql);
    
    process.argv = originalArgv;

    expect(logger.warn).toHaveBeenCalledWith(expect.stringContaining('Invalid URL'));
  });

  it('should fail on missing category', async () => {
    vi.mocked(fs.existsSync).mockReturnValue(true);
    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify([
      { 
        title: 'Unknown Cat', 
        description: 'Desc', 
        url: 'https://foo.com', 
        category: 'unknown-cat', 
        approved: true 
      }
    ]));

    // Run in dry-run
    const originalArgv = process.argv;
    process.argv = [...process.argv, '--dry-run'];

    await importMode(mockSql);
    
    process.argv = originalArgv;

    expect(logger.warn).toHaveBeenCalledWith(expect.stringContaining('Category "unknown-cat" not found'));
  });
});
