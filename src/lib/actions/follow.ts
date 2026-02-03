'use server';

import { auth } from '@/auth';
import { db } from '@/lib/db';
import { follows, users } from '@/drizzle/schema';
import { eq, and, sql } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function followUser(targetUserId: string) {
  const session = await auth();
  const followerId = session?.user?.id;

  if (!followerId) {
    return { error: 'Authentication required' };
  }

  if (followerId === targetUserId) {
    return { error: 'You cannot follow yourself' };
  }

  try {
    await db.transaction(async (tx) => {
      // 1. Create Follow Record
      await tx.insert(follows).values({
        followerId,
        followingId: targetUserId,
      });

      // 2. Increment Following Count for User A
      await tx
        .update(users)
        .set({
          followingCount: sql`${users.followingCount} + 1`,
        })
        .where(eq(users.id, followerId));

      // 3. Increment Followers Count for User B
      await tx
        .update(users)
        .set({
          followersCount: sql`${users.followersCount} + 1`,
        })
        .where(eq(users.id, targetUserId));
    });

    revalidatePath(`/u/${targetUserId}`);
    revalidatePath('/members');
    return { success: true };
  } catch (error) {
    console.error('Follow failed:', error);
    return { error: 'Failed to follow user. Are you already following them?' };
  }
}

export async function unfollowUser(targetUserId: string) {
  const session = await auth();
  const followerId = session?.user?.id;

  if (!followerId) {
    return { error: 'Authentication required' };
  }

  try {
    await db.transaction(async (tx) => {
      // 1. Delete Follow Record
      const result = await tx
        .delete(follows)
        .where(
          and(
            eq(follows.followerId, followerId),
            eq(follows.followingId, targetUserId)
          )
        ).returning();

      if (result.length === 0) {
        throw new Error('Not following user');
      }

      // 2. Decrement Following Count for User A
      await tx
        .update(users)
        .set({
          followingCount: sql`GREATEST(0, ${users.followingCount} - 1)`,
        })
        .where(eq(users.id, followerId));

      // 3. Decrement Followers Count for User B
      await tx
        .update(users)
        .set({
          followersCount: sql`GREATEST(0, ${users.followersCount} - 1)`,
        })
        .where(eq(users.id, targetUserId));
    });

    revalidatePath(`/u/${targetUserId}`);
    revalidatePath('/members');
    return { success: true };
  } catch (error) {
    console.error('Unfollow failed:', error);
    return { error: 'Failed to unfollow user' };
  }
}

export async function isFollowing(targetUserId: string) {
  const session = await auth();
  const followerId = session?.user?.id;

  if (!followerId) return false;

  const [follow] = await db
    .select()
    .from(follows)
    .where(
      and(
        eq(follows.followerId, followerId),
        eq(follows.followingId, targetUserId)
      )
    )
    .limit(1);

  return !!follow;
}
