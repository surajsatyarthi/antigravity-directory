'use server';

import { auth } from '@/auth';
import { db } from '@/lib/db';
import { bookmarks } from '@/drizzle/schema';
import { eq, and } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function toggleBookmark(resourceId: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error('Unauthorized');

  const userId = session.user.id;

  // Attempt to delete first
  const deleted = await db
    .delete(bookmarks)
    .where(
      and(
        eq(bookmarks.userId, userId),
        eq(bookmarks.resourceId, resourceId)
      )
    )
    .returning();

  // If nothing was deleted, it means we should insert
  if (deleted.length === 0) {
    await db
      .insert(bookmarks)
      .values({ userId, resourceId })
      .onConflictDoNothing();
  }

  revalidatePath('/');
  revalidatePath('/dashboard');
  
  return { success: true };
}
