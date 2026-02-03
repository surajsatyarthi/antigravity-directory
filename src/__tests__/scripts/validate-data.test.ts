import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import * as fs from 'fs';

// Mock logger
vi.mock('../../../scripts/logger', () => {
  return {
    logger: {
      info: vi.fn(),
      error: vi.fn(),
      warn: vi.fn(),
    }
  };
});

import { logger } from '../../../scripts/logger';
import { validateData } from '../../../scripts/validate-data';

vi.mock('fs', async (importOriginal) => {
  const actual = await importOriginal<typeof import('fs')>();
  const mockFs = {
    ...actual,
    readFileSync: vi.fn(),
    existsSync: vi.fn(),
  };
  return {
    ...mockFs,
    default: mockFs
  };
});

describe('validateData', () => {
  // Manual mock of process.exit
  // We need to store the original implementation to restore it later
  // but since we are in a test file, module scope variables might persist.
  // Using verify safe approach.
  let originalExit: any;
  let mockExit: any;

  beforeEach(() => {
    vi.clearAllMocks();
    originalExit = process.exit;
    mockExit = vi.fn((code) => {
      // throw new Error(`Process.exit(${code})`);
      // Don't throw, just return. The script has 'return' after exit.
      return undefined as never;
    });
    // @ts-ignore
    process.exit = mockExit;
  });

  afterEach(() => {
    process.exit = originalExit;
    vi.restoreAllMocks();
  });

  it('should exit with error if file not found', () => {
    vi.mocked(fs.existsSync).mockReturnValue(false);
    
    validateData();
    
    expect(logger.error).toHaveBeenCalledWith(expect.stringContaining('File not found'));
    expect(mockExit).toHaveBeenCalledWith(1);
  });

  it('should exit with error if JSON is invalid', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true);
    vi.mocked(fs.readFileSync).mockReturnValue('{ invalid json }');
    
    validateData();
    
    expect(logger.error).toHaveBeenCalledWith(expect.stringContaining('Failed to parse JSON'));
    expect(mockExit).toHaveBeenCalledWith(1);
  });

  it('should pass with valid data', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true);
    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify([
      { title: 'T1', description: 'D1', url: 'https://example.com/1', category: 'cat1' }
    ]));
    
    validateData();
    
    expect(logger.info).toHaveBeenCalledWith(expect.stringContaining('Validation PASSED'));
    expect(mockExit).toHaveBeenCalledWith(0);
  });

  it('should fail on missing fields', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true);
    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify([
      { description: 'D1', url: 'https://example.com/1', category: 'cat1' } // Missing title
    ]));
    
    validateData();
    
    expect(logger.error).toHaveBeenCalledWith(expect.stringContaining('Validation failed'));
    expect(logger.error).toHaveBeenCalledWith(expect.stringContaining("Missing 'title'"));
    expect(mockExit).toHaveBeenCalledWith(1);
  });

  it('should fail on duplicate URLs', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true);
    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify([
      { title: 'T1', description: 'D1', url: 'https://example.com/1', category: 'cat1' },
      { title: 'T2', description: 'D2', url: 'https://example.com/1', category: 'cat2' } // Duplicate URL
    ]));
    
    validateData();
    
    expect(logger.error).toHaveBeenCalledWith(expect.stringContaining('Validation failed'));
    expect(logger.error).toHaveBeenCalledWith(expect.stringContaining('Duplicate URL'));
    expect(mockExit).toHaveBeenCalledWith(1);
  });

  it('should fail on invalid URL format', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true);
    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify([
      { title: 'T1', description: 'D1', url: 'not-a-url', category: 'cat1' }
    ]));
    
    validateData();
    
    expect(logger.error).toHaveBeenCalledWith(expect.stringContaining('Validation failed'));
    expect(logger.error).toHaveBeenCalledWith(expect.stringContaining('Invalid URL'));
    expect(mockExit).toHaveBeenCalledWith(1);
  });
});
