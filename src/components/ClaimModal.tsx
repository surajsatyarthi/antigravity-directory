"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"; // We might need to check if this exists or use a native input
import { Label } from "@/components/ui/label"; // Check if exists
import { Github, AlertTriangle, ShieldCheck, WifiOff, UserX, Lock, Loader2, ExternalLink } from "lucide-react";
import { signIn } from "next-auth/react";

interface ClaimModalProps {
  isOpen: boolean;
  onClose: () => void;
  resourceId: string;
  resourceName: string;
  resourceUrl: string; // GitHub URL
  onClaimSuccess: (data: any) => void;
}

type ErrorType = "auth" | "claimed" | "verification" | "network" | null;

export function ClaimModal({
  isOpen,
  onClose,
  resourceId,
  resourceName,
  resourceUrl,
  onClaimSuccess,
}: ClaimModalProps) {
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorType, setErrorType] = useState<ErrorType>(null);
  const [errorData, setErrorData] = useState<any>(null);

  const handleClaim = async () => {
    setLoading(true);
    setErrorType(null);
    setErrorData(null);

    try {
      const res = await fetch(`/api/resources/${resourceId}/claim`, {
        method: "POST",
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 401) {
            setErrorType("auth");
        } else if (res.status === 403) {
             // Check if already claimed vs verification failed
             if (data.error && data.error.includes("already claimed")) {
                 setErrorType("claimed");
                 setErrorData({
                    username: data.claimedBy?.username || "another user",
                    date: data.claimedAt
                 });
             } else {
                 setErrorType("verification");
             }
        } else {
            setErrorType("network"); // Fallback for 500s
        }
        setLoading(false);
        return;
      }

      // Success
      setLoading(false);
      onClaimSuccess(data);
      onClose();

    } catch (error) {
      console.error("Claim error:", error);
      setErrorType("network");
      setLoading(false);
    }
  };

  const handleReset = () => {
    setErrorType(null);
    setErrorData(null);
    setLoading(false);
  };

  // --- Render Error States ---

  if (errorType === "auth") {
    return (
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto bg-amber-100 p-3 rounded-full mb-2 w-fit">
                <UserX className="h-6 w-6 text-amber-600" />
            </div>
            <DialogTitle className="text-center">Sign In Required</DialogTitle>
          </DialogHeader>
          <div className="text-center text-muted-foreground py-2">
            You must be signed in with GitHub to claim resources.
          </div>
          <DialogFooter className="sm:justify-center">
            <Button onClick={() => signIn("github", { callbackUrl: window.location.href })} className="gap-2">
              <Github className="w-4 h-4" />
              Sign In with GitHub
            </Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  if (errorType === "claimed") {
    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto bg-red-100 p-3 rounded-full mb-2 w-fit">
                <Lock className="h-6 w-6 text-red-600" />
            </div>
            <DialogTitle className="text-center">Already Claimed</DialogTitle>
          </DialogHeader>
          <div className="text-center text-muted-foreground py-2">
            This resource was already claimed by <strong>@{errorData?.username}</strong>.
          </div>
          <DialogFooter className="sm:justify-center">
            <Button onClick={onClose}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  if (errorType === "verification") {
     return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto bg-red-100 p-3 rounded-full mb-2 w-fit">
                <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <DialogTitle className="text-center">Verification Failed</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2 text-sm text-muted-foreground">
            <p className="text-center">We couldn't verify ownership via GitHub. Please ensure:</p>
            <ul className="list-disc pl-8 space-y-1 text-left">
                <li>You are logged in with the GitHub account that owns the repo.</li>
                <li>The resource URL matches your GitHub repository.</li>
                <li>You have granted necessary permissions.</li>
            </ul>
          </div>
          <DialogFooter className="sm:justify-center flex-col sm:flex-row gap-2">
            <Button onClick={handleReset}>Try Again</Button>
            <Button variant="outline" onClick={onClose}>Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
     );
  }

  if (errorType === "network") {
      return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto bg-red-100 p-3 rounded-full mb-2 w-fit">
                <WifiOff className="h-6 w-6 text-red-600" />
            </div>
            <DialogTitle className="text-center">Connection Error</DialogTitle>
          </DialogHeader>
          <div className="text-center text-muted-foreground py-2">
            Could not reach the server. Please check your connection and retry.
          </div>
          <DialogFooter className="sm:justify-center">
            <Button onClick={handleClaim}>Retry</Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      );
  }

  // --- Main Claim Modal ---

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-primary" />
            Claim Resource
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
            
            {/* Resource Preview Card */}
            <div className="flex items-start gap-4 p-4 border rounded-lg bg-muted/30">
                <div className="p-2 bg-background rounded-md border text-muted-foreground">
                    <Github className="w-8 h-8" />
                </div>
                <div className="grid gap-1">
                    <h3 className="font-medium leading-none">{resourceName}</h3>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                         {resourceUrl}
                         <ExternalLink className="w-3 h-3" />
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                            Tool
                        </span>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-lg p-4 text-sm text-amber-800 dark:text-amber-200">
                    <p className="font-medium mb-1">Verify Ownership via GitHub</p>
                    <p className="opacity-90">
                        We'll check if your connected GitHub account has admin rights to this repository.
                    </p>
                </div>

                <div className="flex items-start space-x-2">
                    <Checkbox 
                        id="terms" 
                        checked={agreedToTerms}
                        onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                    />
                    <div className="grid gap-1.5 leading-none">
                        <Label 
                            htmlFor="terms"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            I confirm I am the original creator
                        </Label>
                        <p className="text-xs text-muted-foreground">
                            By claiming this resource, you agree to our Terms of Service and verify you have the right to manage this listing.
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button 
            onClick={handleClaim} 
            disabled={!agreedToTerms || loading}
            className="gap-2"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Github className="w-4 h-4" />}
            {loading ? "Verifying..." : "Verify & Claim"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
