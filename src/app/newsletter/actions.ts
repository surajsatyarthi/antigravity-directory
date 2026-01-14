'use server';

import { db } from '@/lib/db';
import { subscribers } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';

const SubscribeSchema = z.object({
  email: z.string().email('Please provide a valid developer email.'),
  source: z.string().optional().default('homepage'),
});

export type SubscribeResult = {
  success: boolean;
  message: string;
};

export async function subscribeToNewsletter(formData: FormData): Promise<SubscribeResult> {
  try {
    const rawData = {
      email: formData.get('email'),
      source: formData.get('source') || 'homepage',
    };

    const validatedData = SubscribeSchema.parse(rawData);

    // Check if already subscribed
    const existing = (
      await db
        .select()
        .from(subscribers)
        .where(eq(subscribers.email, validatedData.email))
        .limit(1)
    )[0];

    if (existing) {
      if (existing.status === 'ACTIVE') {
        return { success: true, message: 'Identity already verified in our network.' };
      }
      
      // Reactivate if unsubscribed
      await db
        .update(subscribers)
        .set({ status: 'ACTIVE', updatedAt: new Date() })
        .where(eq(subscribers.id, existing.id));
        
      return { success: true, message: 'Identity reactivated. Welcome back.' };
    }

    // New subscription
    await db.insert(subscribers).values({
      id: uuidv4(),
      email: validatedData.email,
      source: validatedData.source as any,
      status: 'ACTIVE',
    });

    return { success: true, message: 'Subscribed successfully!' };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, message: error.issues[0].message };
    }
    console.error('Newsletter Error:', error);
    return { success: false, message: 'System failure. Please try again later.' };
  }
}
