'use server';

import { db } from '@/lib/db';
import { submissions, resources, categories, payments } from '@/drizzle/schema';
import { v4 as uuidv4 } from 'uuid';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { eq } from 'drizzle-orm';

const submissionSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  url: z.string().url('Invalid URL').optional().or(z.literal('')),
  content: z.string().optional(),
  categoryName: z.string().optional(),
  tags: z.string().optional(),
});

export async function submitResource(formData: FormData) {

  
  const rawData = {
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    url: formData.get('url') as string,
    content: formData.get('content') as string,
    categoryName: formData.get('categoryName') as string,
    tags: formData.get('tags') as string,
    paymentStatus: (formData.get('paymentStatus') as string) || 'NONE',
    paymentType: (formData.get('paymentType') as string) || 'FREE',
    paymentId: formData.get('paymentId') as string || null,
  };

  const validated = submissionSchema.safeParse(rawData);

  if (!validated.success) {
    const firstErrorMessage = validated.error.issues[0]?.message || 'Invalid input data.';
    return { error: firstErrorMessage };
  }

  try {
    const submissionId = uuidv4();
    const slug = validated.data.title.toLowerCase().trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');

    // 1. Insert into submissions (Source of Truth for Admin)
    await db.insert(submissions).values({
      id: submissionId,
      title: validated.data.title,
      description: validated.data.description,
      url: validated.data.url || null,
      content: validated.data.content || null,
      categoryName: validated.data.categoryName || null,
      tags: validated.data.tags || null,
      status: 'PENDING',
      paymentStatus: rawData.paymentStatus as any,
      paymentType: rawData.paymentType as any,
      paymentId: rawData.paymentId,
      userId: null, 
    });



    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Submission error:', error);
    return { error: 'Failed to submit resource. Please try again later.' };
  }
}

