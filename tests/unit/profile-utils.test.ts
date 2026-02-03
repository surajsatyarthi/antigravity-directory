import { describe, it, expect } from 'vitest';
import { calculateProfileCompletion } from '../../src/lib/utils/profile-utils';

describe('calculateProfileCompletion', () => {
  it('should return 0 for an empty user object', () => {
    const score = calculateProfileCompletion({});
    expect(score).toBe(0);
  });

  it('should give 10% for name and 10% for username', () => {
    const score = calculateProfileCompletion({ name: 'Test User', username: 'testuser' });
    expect(score).toBe(20);
  });

  it('should give 20% for bio', () => {
    const score = calculateProfileCompletion({ bio: 'My mission is to build the future.' });
    expect(score).toBe(20);
  });

  it('should give 100% for a fully completed profile', () => {
    const fullUser = {
      name: 'Test User',
      username: 'testuser',
      bio: 'Bio here',
      website: 'https://site.com',
      location: 'Moon Base',
      tagline: 'Building the future',
      githubUsername: 'gh',
      twitterHandle: 'tw',
      linkedinUrl: 'ln',
      youtubeChannel: 'yt',
      discordUsername: 'dc'
    };
    const score = calculateProfileCompletion(fullUser);
    expect(score).toBe(100);
  });
});
