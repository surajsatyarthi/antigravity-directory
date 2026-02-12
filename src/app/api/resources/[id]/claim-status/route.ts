
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { resources } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const resource = await db.query.resources.findFirst({
        where: eq(resources.id, id),
        with: {
            author: true
        }
    });

    if (!resource) {
      return NextResponse.json({ error: "Resource not found" }, { status: 404 });
    }

    if (resource.authorId && resource.author) {
        // Find claim details if needed, but author info is sufficient for badge
        return NextResponse.json({
            claimed: true,
            claimedBy: {
                name: resource.author.name,
                username: resource.author.username, // Fallback
                image: resource.author.image,
                // We could fetch githubUsername from resource_claims if we wanted to be precise about WHICH connection claimed it
                // but linking to the profile is likely what we want.
            },
            claimedAt: resource.claimedAt
        });
    }

    return NextResponse.json({ claimed: false });

  } catch (error) {
    console.error("Claim status error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
