import { describe, it, expect } from 'vitest';
import { getTableConfig } from 'drizzle-orm/pg-core';
import * as schema from '../../src/drizzle/schema';

describe('Database Schema', () => {
  it('should have all required profile fields in the users table', () => {
    const { columns } = getTableConfig(schema.users);
    
    // Map columns to their field names
    const columnNames = columns.map(c => c.name);
    
    const requiredFields = [
      'location',
      'tagline',
      'github_username',
      'twitter_handle',
      'linkedin_url',
      'youtube_channel',
      'discord_username',
      'profile_completion_score',
      'public_profile',
      'followers_count',
      'following_count'
    ];

    requiredFields.forEach(field => {
      expect(columnNames, `Column "${field}" should exist in users table`).toContain(field);
    });
  });

  it('should have the follows table defined', () => {
    expect(schema, 'Follows table should be exported from schema').toHaveProperty('follows');
  });
});
