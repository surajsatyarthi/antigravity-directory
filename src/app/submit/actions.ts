'use server';

import { db } from '@/lib/db';
import { submissions, resources, categories, payments } from '@/drizzle/schema';
import { v4 as uuidv4 } from 'uuid';
import { revalidatePath } from 'next/cache';
import { auth } from '@/auth';
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
  const session = await auth();
  
  if (!session?.user?.id) {
    return { error: 'Authentication required. Please sign in to submit a tool.' };
  }
  
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
      userId: session.user.id, 
    });

    // 2. Server-side verification of payment
    let verifiedPaymentStatus = 'NONE';
    let verifiedPaymentType = 'FREE';

    if (rawData.paymentId) {
      const paymentRecord = await db.query.payments.findFirst({
        where: eq(payments.transactionId, rawData.paymentId),
      });

      if (paymentRecord && paymentRecord.status === 'SUCCEEDED') {
        verifiedPaymentStatus = 'PAID';
        verifiedPaymentType = rawData.paymentType === 'FEATURED' ? 'FEATURED' : 'STANDARD';
      }
    }

    // 3. If PAID, insert into resources with VETTING status for immediate visibility
    if (verifiedPaymentStatus === 'PAID') {
      // Find category ID
      const cat = (await db.select({ id: categories.id })
        .from(categories)
        .where(eq(categories.name, validated.data.categoryName || 'General'))
        .limit(1))[0];

      await db.insert(resources).values({
        id: uuidv4(),
        title: validated.data.title,
        slug: `${slug}-${Math.floor(Math.random() * 1000)}`, // Unique slug
        description: validated.data.description,
        url: validated.data.url || null,
        categoryId: cat?.id || '1', // Fallback to general
        status: 'VETTING',
        featured: verifiedPaymentType === 'FEATURED',
        badgeType: verifiedPaymentType === 'FEATURED' ? 'trending' : null,
      });
    }

    // Update submission record with verified status
    await db.update(submissions)
      .set({
        paymentStatus: verifiedPaymentStatus as any,
        paymentType: verifiedPaymentType as any,
      })
      .where(eq(submissions.id, submissionId));

    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Submission error:', error);
    return { error: 'Failed to submit resource. Please try again later.' };
  }
}

