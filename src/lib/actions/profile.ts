'use server';

import { auth } from '@/auth';
import { db } from '@/lib/db';
import { users } from '@/drizzle/schema';
import { eq, and, ne } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const profileSchema = z.object({
  name: z.string().min(2).max(50),
  username: z.string().min(3).max(30).regex(/^[a-z0-9_]+$/, 'Username can only contain lowercase letters, numbers, and underscores'),
  bio: z.string().max(160).optional(),
  website: z.string().url().or(z.literal('')).optional(),
});

export async function updateProfile(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error('Unauthorized');

  const rawData = {
    name: formData.get('name'),
    username: formData.get('username'),
    bio: formData.get('bio'),
    website: formData.get('website'),
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

  await db
    .update(users)
    .set({
      name: data.name,
      username: data.username,
      bio: data.bio,
      website: data.website || null,
      updatedAt: new Date(),
    })
    .where(eq(users.id, session.user.id));

  revalidatePath('/settings');
  revalidatePath(`/u/${data.username}`);
  
  return { success: true };
}
