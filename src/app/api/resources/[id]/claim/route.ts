
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { resources, resourceClaims, accounts } from "@/drizzle/schema";
import { eq, and } from "drizzle-orm";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const isTestEnv = process.env.NODE_ENV === 'test' || process.env.NEXT_PUBLIC_IS_E2E === 'true';
    const testUserId = req.headers.get('x-e2e-tests-user-id');
    const bypassVerification = req.headers.get('x-e2e-tests-bypass-verification') === 'true';
    const forceFail = req.headers.get('x-e2e-tests-force-fail') === 'true';

    let session = await auth();
    let userId = session?.user?.id;
    let githubUsername = '';
    let isVerified = false;

    // Allow test user override if configured
    if (isTestEnv && testUserId) {
         userId = testUserId;
    } else if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    
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

    // CHECK TEST ENV BYPASS
    if (isTestEnv && bypassVerification) {
        if (forceFail) {
             return NextResponse.json({ error: `Verification failed via Test Mode` }, { status: 403 });
        }
        // Mock verification
        isVerified = true;
        githubUsername = 'e2e-test-user'; 
    } else {
        // Standard GitHub verification
        const userAccount = await db.query.accounts.findFirst({
            where: and(
                eq(accounts.userId, userId!),
                eq(accounts.provider, "github")
            ),
        });

        if (!userAccount) {
            return NextResponse.json({ error: "Please sign in with GitHub to claim this resource." }, { status: 403 });
        }
        
        if (!userAccount.access_token) {
            return NextResponse.json({ error: "GitHub access token missing. Please sign out and sign in again." }, { status: 403 });
        }

        const accessToken = userAccount.access_token;
        const headers = {
            'Authorization': `Bearer ${accessToken}`,
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'Antigravity-Directory-Claim-System'
        };

        // 1. Get authenticated GitHub user details
        const userRes = await fetch('https://api.github.com/user', { headers });
        
        if (!userRes.ok) {
            return NextResponse.json({ error: "Failed to verify GitHub identity." }, { status: 401 });
        }
        
        const githubUser = await userRes.json();
        githubUsername = githubUser.login;

        // 2. Check ownership/collaboration
        const isOwner = owner.toLowerCase() === githubUsername.toLowerCase();
        isVerified = isOwner;

        if (!isVerified) {
            // Check if contributor
            const repoRes = await fetch(`https://api.github.com/repos/${owner}/${cleanRepo}`, { headers });
            
            if (repoRes.ok) {
                const repoData = await repoRes.json();
                if (repoData.permissions && (repoData.permissions.admin || repoData.permissions.push)) {
                    isVerified = true;
                }
            } else {
                const contribRes = await fetch(`https://api.github.com/repos/${owner}/${cleanRepo}/contributors?per_page=100`, { headers });
                if (contribRes.ok) {
                    const contributors = await contribRes.json();
                    if (Array.isArray(contributors)) {
                        isVerified = contributors.some((c: any) => c.login.toLowerCase() === githubUsername.toLowerCase());
                    }
                }
            }
        }
    }

    if (!isVerified) {
         return NextResponse.json({ error: "Verification failed. You must own or contribute to the repo." }, { status: 403 });
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
            userId: userId!,
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
