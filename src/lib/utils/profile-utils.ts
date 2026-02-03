export interface ProfileData {
  name?: string | null;
  username?: string | null;
  bio?: string | null;
  website?: string | null;
  location?: string | null;
  tagline?: string | null;
  githubUsername?: string | null;
  twitterHandle?: string | null;
  linkedinUrl?: string | null;
  youtubeChannel?: string | null;
  discordUsername?: string | null;
}

export function calculateProfileCompletion(user: ProfileData): number {
  let score = 0;

  // Essential Core (20%)
  if (user.name) score += 10;
  if (user.username) score += 10;

  // Personal Branding (30%)
  if (user.bio) score += 20;
  if (user.tagline) score += 10;

  // External Uplinks (10%)
  if (user.website) score += 10;

  // Sector Metadata (10%)
  if (user.location) score += 10;

  // Social Matrix (30%)
  const socialFields = [
    'githubUsername',
    'twitterHandle',
    'linkedinUrl',
    'youtubeChannel',
    'discordUsername',
  ];
  
  const completedSocial = socialFields.filter(field => (user as any)[field]).length;
  if (completedSocial > 0) {
    // Each of the 5 social fields is worth 6% (Total 30%)
    score += (completedSocial * 6);
  }

  return Math.min(score, 100);
}
