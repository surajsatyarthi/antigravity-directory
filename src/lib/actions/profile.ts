'use server';

import { auth } from '@/auth';
import { db } from '@/lib/db';
import { users } from '@/drizzle/schema';
import { eq, and, ne } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import { calculateProfileCompletion } from '@/lib/utils/profile-utils';

const profileSchema = z.object({
  name: z.string().min(2).max(50),
  username: z.string().min(3).max(30).regex(/^[a-z0-9_]+$/, 'Username can only contain lowercase letters, numbers, and underscores'),
  bio: z.string().max(160).optional().or(z.literal('')),
  website: z.string().url().or(z.literal('')).optional(),
  location: z.string().max(50).optional().or(z.literal('')),
  tagline: z.string().max(100).optional().or(z.literal('')),
  githubUsername: z.string().max(50).optional().or(z.literal('')),
  twitterHandle: z.string().max(50).optional().or(z.literal('')),
  linkedinUrl: z.string().url().or(z.literal('')).optional(),
  youtubeChannel: z.string().max(100).optional().or(z.literal('')),
  discordUsername: z.string().max(50).optional().or(z.literal('')),
});

export async function updateProfile(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error('Unauthorized');

  const rawData = {
    name: formData.get('name'),
    username: formData.get('username'),
    bio: formData.get('bio'),
    website: formData.get('website'),
    location: formData.get('location'),
    tagline: formData.get('tagline'),
    githubUsername: formData.get('githubUsername'),
    twitterHandle: formData.get('twitterHandle'),
    linkedinUrl: formData.get('linkedinUrl'),
    youtubeChannel: formData.get('youtubeChannel'),
    discordUsername: formData.get('discordUsername'),
  };

  const validated = profileSchema.safeParse(rawData);

  if (!validated.success) {
    return { 
      error: 'Validation failed', 
      fieldErrors: validated.error.flatten().fieldErrors 
    };
  }

  const data = validated.data;

  // Check if username is already taken by someone else
  const existing = await db
    .select()
    .from(users)
    .where(
      and(
        eq(users.username, data.username),
        ne(users.id, session.user.id)
      )
    )
    .limit(1);

  if (existing.length > 0) {
    return { error: 'Username is already taken' };
  }

  // Calculate completion score
  const profileCompletionScore = calculateProfileCompletion(data);

  await db
    .update(users)
    .set({
      name: data.name,
      username: data.username,
      bio: data.bio || null,
      website: data.website || null,
      location: data.location || null,
      tagline: data.tagline || null,
      githubUsername: data.githubUsername || null,
      twitterHandle: data.twitterHandle || null,
      linkedinUrl: data.linkedinUrl || null,
      youtubeChannel: data.youtubeChannel || null,
      discordUsername: data.discordUsername || null,
      profileCompletionScore,
      updatedAt: new Date(),
    })
    .where(eq(users.id, session.user.id));

  revalidatePath('/settings');
  revalidatePath(`/u/${data.username}`);
  
  return { success: true };
}
