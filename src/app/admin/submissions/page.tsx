import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { db } from '@/lib/db';
import { users, submissions } from '@/drizzle/schema';
import { eq, or } from 'drizzle-orm';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { AdminSubmissionQueue } from '@/components/AdminSubmissionQueue';

export default async function AdminSubmissionsPage() {
  const session = await auth();

  // Check if user is authenticated and is admin
  if (!session?.user?.id) {
    redirect('/auth/signin');
  }

  const user = await db.query.users.findFirst({
    where: eq(users.id, session.user.id),
  });

  if (user?.role !== 'ADMIN') {
    redirect('/');
  }

  // Fetch pending submissions
  const pendingSubmissions = await db.query.submissions.findMany({
    where: eq(submissions.status, 'PENDING'),
  });

  // Enrich with user data
  const enrichedSubmissions = await Promise.all(
    pendingSubmissions.map(async (sub) => {
      const subUser = await db.query.users.findFirst({
        where: eq(users.id, sub.userId),
      });
      return {
        ...sub,
        userEmail: subUser?.email,
        userName: subUser?.name,
      };
    })
  );

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs text-gray-500 hover:text-white mb-8 transition-colors font-mono uppercase tracking-widest"
        >
          <ArrowLeft className="w-3 h-3" />
          Back to Directory
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Submission Queue</h1>
          <p className="text-gray-400">
            {enrichedSubmissions.length} pending submission{enrichedSubmissions.length !== 1 ? 's' : ''}
          </p>
        </div>

        <AdminSubmissionQueue submissions={enrichedSubmissions} />
      </div>
    </div>
  );
}
