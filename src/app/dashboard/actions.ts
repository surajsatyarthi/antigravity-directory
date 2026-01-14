'use server';

import { auth } from '@/auth';
import { db } from '@/lib/db';
import { users } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';
import { sendEdwardOutreach } from '@/lib/edward';
import { revalidatePath } from 'next/cache';

export async function triggerEdwardOutreach(targetId: string) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      throw new Error('Authentication required.');
    }

    const user = (await db.select().from(users).where(eq(users.id, session.user.id)).limit(1))[0];
    if (user?.role !== 'ADMIN') {
      throw new Error('Administrative clearance required.');
    }

    const result = await sendEdwardOutreach(targetId);
    
    // Revalidate the dashboard to show updated outreach counts and status
    revalidatePath('/dashboard');
    
    return result;
  } catch (error: any) {
    console.error('Dashboard Action Error:', error);
    return { success: false, message: error.message || 'System failure in command execution.' };
  }
}
