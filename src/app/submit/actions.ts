'use server';

import { db } from '@/lib/db';
import { submissions } from '@/drizzle/schema';
import { v4 as uuidv4 } from 'uuid';
import { revalidatePath } from 'next/cache';

export async function submitResource(formData: FormData) {
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const url = formData.get('url') as string;
  const content = formData.get('content') as string;
  const categoryName = formData.get('categoryName') as string;
  const tags = formData.get('tags') as string;

  if (!title || !description) {
    return { error: 'Title and description are required.' };
  }

  try {
    await db.insert(submissions).values({
      id: uuidv4(),
      title,
      description,
      url: url || null,
      content: content || null,
      categoryName: categoryName || null,
      tags: tags || null,
      status: 'PENDING',
      userId: 'guest-user-id', // Using our pre-seeded guest user
    });

    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Submission error:', error);
    return { error: 'Failed to submit resource. Please try again later.' };
  }
}
