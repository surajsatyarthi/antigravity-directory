'use server';

import { db } from '@/lib/db';
import { submissions, resources, categories, users } from '@/drizzle/schema';
import { eq, and } from 'drizzle-orm';
import { auth } from '@/auth';
import { sendListingLive } from '@/lib/email/templates';
import { revalidatePath } from 'next/cache';

// Helper to verify admin role
async function verifyAdmin() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error('Unauthorized: User not authenticated');
  }

  const user = await db.query.users.findFirst({
    where: eq(users.id, session.user.id),
  });

  if (user?.role !== 'ADMIN') {
    throw new Error('Unauthorized: Admin access required');
  }

  return session.user.id;
}

export async function approveSubmission(submissionId: string) {
  try {
    await verifyAdmin();

    // Get submission
    const submission = await db.query.submissions.findFirst({
      where: eq(submissions.id, submissionId),
    });

    if (!submission) {
      return { error: 'Submission not found' };
    }

    if (submission.status === 'APPROVED') {
      return { error: 'Submission already approved' };
    }

    // Update submission status
    await db.update(submissions)
      .set({ status: 'APPROVED', updatedAt: new Date() })
      .where(eq(submissions.id, submissionId));

    // If there's a corresponding resource (paid submission), mark it as LIVE
    if (submission.paymentStatus === 'PAID') {
      // Find the resource created from this submission
      const resource = await db.query.resources.findFirst({
        where: and(
          eq(resources.title, submission.title),
          eq(resources.status, 'VETTING')
        ),
      });

      if (resource) {
        await db.update(resources)
          .set({ status: 'LIVE', updatedAt: new Date() })
          .where(eq(resources.id, resource.id));

        // Send email to user
        try {
          const submissionUser = await db.query.users.findFirst({
            where: eq(users.id, submission.userId),
          });

          if (submissionUser) {
            await sendListingLive({
              userEmail: submissionUser.email,
              userName: submissionUser.name || 'there',
              resourceTitle: submission.title,
              resourceSlug: resource.slug,
            });
          }
        } catch (emailError) {
          console.error('Failed to send listing live email:', emailError);
          // Don't fail the approval if email fails
        }
      }
    }

    revalidatePath('/');
    revalidatePath('/admin/submissions');
    return { success: true };
  } catch (error) {
    console.error('Approval error:', error);
    return { error: (error as Error).message };
  }
}

export async function rejectSubmission(submissionId: string, reason?: string) {
  try {
    await verifyAdmin();

    const submission = await db.query.submissions.findFirst({
      where: eq(submissions.id, submissionId),
    });

    if (!submission) {
      return { error: 'Submission not found' };
    }

    if (submission.status === 'REJECTED') {
      return { error: 'Submission already rejected' };
    }

    // Update submission status
    await db.update(submissions)
      .set({
        status: 'REJECTED',
        updatedAt: new Date(),
      })
      .where(eq(submissions.id, submissionId));

    // If there's a corresponding resource in VETTING, also mark as rejected
    if (submission.paymentStatus === 'PAID') {
      const resource = await db.query.resources.findFirst({
        where: and(
          eq(resources.title, submission.title),
          eq(resources.status, 'VETTING')
        ),
      });

      if (resource) {
        // Delete the VETTING resource if submission is rejected
        await db.delete(resources).where(eq(resources.id, resource.id));
      }
    }

    revalidatePath('/');
    revalidatePath('/admin/submissions');
    return { success: true };
  } catch (error) {
    console.error('Rejection error:', error);
    return { error: (error as Error).message };
  }
}

export async function getSubmissionsQueue(status?: 'PENDING' | 'APPROVED' | 'REJECTED') {
  try {
    await verifyAdmin();

    let query = db.query.submissions.findMany();

    if (status) {
      query = db.query.submissions.findMany({
        where: eq(submissions.status, status),
      });
    }

    const submissionsList = await query;

    // Enrich with user data
    const enriched = await Promise.all(
      submissionsList.map(async (sub) => {
        const user = await db.query.users.findFirst({
          where: eq(users.id, sub.userId),
        });
        return {
          ...sub,
          userEmail: user?.email,
          userName: user?.name,
        };
      })
    );

    return { data: enriched };
  } catch (error) {
    console.error('Queue fetch error:', error);
    return { error: (error as Error).message };
  }
}
