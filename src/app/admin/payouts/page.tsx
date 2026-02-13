
import { auth } from '@/auth';
import { AdminPayoutQueue, PayoutRequest } from '@/components/admin/AdminPayoutQueue';
import { db } from '@/lib/db';
import { payoutRequests } from '@/drizzle/schema';
import { desc } from 'drizzle-orm';
import { redirect } from 'next/navigation';

export default async function AdminPayoutsPage() {
  const session = await auth();

  // Redundant check (middleware handles it), but good for double safety
  // @ts-ignore
  if (!session || session.user.role !== 'ADMIN') {
    redirect('/404');
  }

  const requests = await db.query.payoutRequests.findMany({
    orderBy: [desc(payoutRequests.createdAt)],
  });

  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-8 text-3xl font-bold">Payout Requests</h1>
      <AdminPayoutQueue initialRequests={requests as unknown as PayoutRequest[]} />
    </div>
  );
}
