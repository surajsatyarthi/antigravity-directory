import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { payoutRequests, users } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { sendPayoutApprovedEmail, sendPayoutRejectedEmail } from "@/lib/email";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    
    // 1. Validate Admin Session
    // @ts-ignore - role added in auth options
    if (!session || session.user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    const { action, reason } = body;

    if (!["approve", "reject"].includes(action)) {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    if (action === "reject" && !reason) {
      return NextResponse.json(
        { error: "Rejection reason is required" },
        { status: 400 }
      );
    }

    // 2. Find Payout Request
    const payout = await db.query.payoutRequests.findFirst({
      where: eq(payoutRequests.id, id),
      with: {
        creator: true,
      },
    });

    if (!payout) {
      return NextResponse.json({ error: "Payout request not found" }, { status: 404 });
    }

    if (payout.status !== "pending") {
      return NextResponse.json(
        { error: `Payout is already ${payout.status}` },
        { status: 400 }
      );
    }

    // 3. Update Database
    const updateData: any = {
      status: action === "approve" ? "approved" : "rejected",
      processedAt: new Date(),
      adminId: session.user.id,
    };

    if (action === "reject") {
      updateData.rejectionReason = reason;
    }

    const [updatedPayout] = await db
      .update(payoutRequests)
      .set(updateData)
      .where(eq(payoutRequests.id, id))
      .returning();

    // 4. Send Email Notification (Non-blocking)
    if (payout.creator?.email) {
      const emailPromise = action === "approve"
        ? sendPayoutApprovedEmail(payout.creator.email, payout.amount)
        : sendPayoutRejectedEmail(payout.creator.email, payout.amount, reason);
      
      // Log error but don't fail request if email fails
      emailPromise.catch(console.error);
    }

    return NextResponse.json({ success: true, payout: updatedPayout });
  } catch (error) {
    console.error("Error processing payout:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
