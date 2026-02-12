
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";
import { toast } from "sonner";
import { Github, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface ClaimButtonProps {
  resourceId: string;
  initialClaimed?: boolean;
  initialClaimedBy?: {
    username?: string | null;
    name?: string | null;
    image?: string | null;
  } | null;
}

export function ClaimButton({ resourceId, initialClaimed = false, initialClaimedBy = null }: ClaimButtonProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [claimed, setClaimed] = useState(initialClaimed);
  const [claimant, setClaimant] = useState(initialClaimedBy);

  // If we wanted to re-fetch status on mount, we could, but passing initial data is better.
  // However, if the user just logged in via the OAuth flow, we might want to retry the claim automatically?
  // Or just show the button state.

  const handleClaim = async () => {
    if (!session) {
      // Not logged in -> Redirect to GitHub login
      // We explicitly want GitHub login for this action.
      // But `signIn` with specific provider might not link accounts if they are already logged in with Google?
      // NextAuth usually handles account linking if email matches (and trusted), or if we are logged in and trigger verify.
      
      // If not logged in at all:
      signIn("github", { callbackUrl: window.location.href });
      return;
    }

    // Attempt to claim
    setLoading(true);
    try {
      const res = await fetch(`/api/resources/${resourceId}/claim`, {
        method: "POST",
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
            // Check specific error messages
            if (data.error && data.error.includes("sign in with GitHub")) {
                 toast.error("GitHub Account Required", {
                    description: "Please link your GitHub account or sign in with GitHub to claim this resource.",
                    action: {
                        label: "Connect GitHub",
                        onClick: () => signIn("github", { callbackUrl: window.location.href })
                    }
                 });
                 return;
            }
        }
        throw new Error(data.error || "Failed to claim resource");
      }

      toast.success("Resource Claimed!", {
        description: `Successfully verified against GitHub user ${data.username}`,
      });
      setClaimed(true);
      setClaimant({ username: data.username, name: session.user?.name, image: session.user?.image });
      router.refresh();

    } catch (error: any) {
      toast.error("Claim Failed", {
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  if (claimed) {
    if (claimant) {
        // If claimed by current user?
        const isMe = session?.user?.name === claimant.name || session?.user?.email === (claimant as any).email; // approximate check
        
        return (
            <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full border border-border/50">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Claimed by {isMe ? "You" : (claimant.username || claimant.name)}</span>
            </div>
        );
    }
    return null; // Should not happen if correctly configured
  }

  return (
    <Button 
      onClick={handleClaim} 
      variant="outline" 
      size="sm"
      className="gap-2 border-dashed border-border hover:border-primary/50 hover:bg-primary/5 transition-all"
      disabled={loading}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Github className="w-4 h-4" />
      )}
      {loading ? "Verifying..." : "Claim This Tool"}
    </Button>
  );
}
