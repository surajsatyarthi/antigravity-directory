
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { resources, resourceClaims, accounts } from "@/drizzle/schema"; // Added accounts
import { eq, and } from "drizzle-orm"; // Added and

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> } // Correct type for params
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const userId = session.user.id; // Capture for use in transaction closure
    
    // Fetch resource
    const resource = await db.query.resources.findFirst({
      where: eq(resources.id, id),
    });

    if (!resource) {
      return NextResponse.json({ error: "Resource not found" }, { status: 404 });
    }

    if (resource.authorId) {
      return NextResponse.json({ error: "Resource already claimed" }, { status: 400 });
    }

    if (!resource.url) {
       return NextResponse.json({ error: "Resource has no URL to verify" }, { status: 400 });
    }

    // Extract owner/repo from URL
    const githubUrlPattern = /github\.com\/([^\/]+)\/([^\/]+)/;
    const match = resource.url.match(githubUrlPattern);

    if (!match) {
        return NextResponse.json({ error: "Invalid GitHub URL in resource" }, { status: 400 });
    }

    const [_, owner, repo] = match;
    const cleanRepo = repo.replace(/\.git$/, '').replace(/\/$/, '');

    // Check for linked GitHub account
    const userAccount = await db.query.accounts.findFirst({
      where: and(
        eq(accounts.userId, session.user.id),
        eq(accounts.provider, "github")
      ),
    });

    if (!userAccount) {
         return NextResponse.json({ error: "Please sign in with GitHub to claim this resource. Link your account in settings or sign out and sign in via GitHub." }, { status: 403 });
    }
    
    // Optimistic: If we don't have access_token, we can't verify PRIVATE repos or user identity fully if purely relying on API matching.
    // However, for public repos, we can check if the user is a contributor using their GitHub username (which we need to know).
    // The `accounts` table `providerAccountId` is the GitHub User ID (integer), not username.
    // We need to fetch the username from GitHub using the token, OR if we saved it in `users` table.
    // `users` table has `githubUsername`. Let's see if it's populated.
    
    // Ideally we use the access token to get the currently authenticated github user details to be sure.
    
    if (!userAccount.access_token) {
        // Fallback or Error? 
        // If we implemented the auth provider correctly, we should have the access token. 
        // But NextAuth doesn't always persist access tokens to DB unless explicitly configured in callbacks.
        // Drizzle adapter usually handles this if `accounts` table has the columns.
        
        // Let's assume we might fail here and return a helpful error.
        return NextResponse.json({ error: "GitHub access token missing. Please sign out and sign in again with GitHub to refresh permissions." }, { status: 403 });
    }

    const accessToken = userAccount.access_token;

    // Verify against GitHub API
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Antigravity-Directory-Claim-System'
    };

    // 1. Get authenticated GitHub user details
    const userRes = await fetch('https://api.github.com/user', { headers });
    
    if (!userRes.ok) {
        console.error("GitHub User Fetch Error", await userRes.text());
        return NextResponse.json({ error: "Failed to verify GitHub identity. Token may be expired." }, { status: 401 });
    }
    
    const githubUser = await userRes.json();
    const githubUsername = githubUser.login;

    // 2. Check ownership/collaboration
    // Strategy: Check if user is a collaborator on the repo. 
    // This covers both owners and invited collaborators.
    // Endpoint: /repos/{owner}/{repo}/collaborators/{username}
    // Note: This endpoint requires push access to view collaborators usually, OR if the user IS a collaborator they can see themselves?
    // Actually, simply checking /user/repos might be too large.
    
    // Better check: are we the owner?
    const isOwner = owner.toLowerCase() === githubUsername.toLowerCase();
    
    let isVerified = isOwner;

    if (!isVerified) {
        // Check if contributor (for public repos this works)
        // For private, we need to check permissions.
        // Let's try fetching the repo details with the user's token.
        const repoRes = await fetch(`https://api.github.com/repos/${owner}/${cleanRepo}`, { headers });
        
        if (repoRes.ok) {
            const repoData = await repoRes.json();
            // permissions: { admin: true, push: true, pull: true }
            if (repoData.permissions && (repoData.permissions.admin || repoData.permissions.push)) {
                isVerified = true;
            }
        } else {
             // Repo might not exist or user has no access
             // If resource URL is public but user has no access, maybe they are just a contributor?
             // Let's check contributors list for public repos
            const contribRes = await fetch(`https://api.github.com/repos/${owner}/${cleanRepo}/contributors?per_page=100`, { headers });
            if (contribRes.ok) {
                const contributors = await contribRes.json();
                 if (Array.isArray(contributors)) {
                    isVerified = contributors.some((c: any) => c.login.toLowerCase() === githubUsername.toLowerCase());
                 }
            }
        }
    }

    if (!isVerified) {
        return NextResponse.json({ error: `Verification failed. You must be the owner or a contributor of ${owner}/${cleanRepo} on GitHub.` }, { status: 403 });
    }

    // Success - Update DB
    await db.transaction(async (tx) => {
        await tx.update(resources)
            .set({ 
                authorId: userId,
                claimedAt: new Date(),
                claimedVia: 'github_oauth'
            })
            .where(eq(resources.id, id));

        await tx.insert(resourceClaims).values({
            id: crypto.randomUUID(),
            resourceId: id,
            userId: userId!, // safe because we checked session.user.id earlier
            githubUsername: githubUsername,
            githubRepoUrl: resource.url!,
            verificationMethod: 'github_oauth',
            claimedAt: new Date()
        });
    });

    return NextResponse.json({ success: true, username: githubUsername });

  } catch (error) {
    console.error("Claim error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
