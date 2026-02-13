"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { CheckCircle, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { ClaimModal } from "./ClaimModal";
import { cn } from "@/lib/utils";

interface ClaimButtonProps {
  resourceId: string;
  resourceName: string; 
  resourceUrl: string;
  initialClaimed?: boolean;
  initialClaimedBy?: {
    username?: string | null;
    name?: string | null;
    image?: string | null;
  } | null;
  className?: string;
}

export function ClaimButton({ 
  resourceId, 
  resourceName,
  resourceUrl,
  initialClaimed = false, 
  initialClaimedBy = null,
  className
}: ClaimButtonProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [claimed, setClaimed] = useState(initialClaimed);
  const [claimant, setClaimant] = useState(initialClaimedBy);

  const handleClaimSuccess = (data: any) => {
    setClaimed(true);
    setClaimant({ 
        username: data.username, 
        name: session?.user?.name, 
        image: session?.user?.image 
    });
    
    // Show success toast with action
    toast.success("Resource Claimed Successfully!", {
      description: "You can now set a price and start earning.",
      action: {
        label: "Set Price Now",
        onClick: () => router.push(`/dashboard/resources/${resourceId}/pricing`)
      },
      duration: 8000, 
    });

    router.refresh();
  };

  if (claimed) {
    if (claimant) {
        // If claimed by current user?
        const isMe = session?.user?.name === claimant.name || session?.user?.email === (claimant as any).email; 
        
        return (
            <div className={cn("flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full border border-border/50", className)}>
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Claimed by {isMe ? "You" : (claimant.username || claimant.name)}</span>
            </div>
        );
    }
    return null; 
  }

  return (
    <>
      <div className={cn("w-full md:w-auto", className)}>
         {/* Desktop button */}
         <Button 
            onClick={() => setModalOpen(true)} 
            size="sm"
            className="hidden md:flex gap-2 w-full md:w-auto shadow-sm hover:shadow transition-all hover:scale-[1.02]"
          >
            <ShieldCheck className="w-4 h-4" />
            Claim This Tool
          </Button>

          {/* Mobile sticky button handled by parent layout padding usually, 
              but requested requirement says "Mobile sticky bottom bar" 
              We can render it here or assume parent handles position. 
              The requirement: "Mobile: Sticky bottom bar ... <div className='md:hidden fixed...'>" 
          */}
          <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-md border-t z-50 pb-8 flex items-center justify-between shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] animate-in slide-in-from-bottom-full duration-500">
             <div className="text-sm font-medium">
                Manage this tool?
             </div>
             <Button 
                onClick={() => setModalOpen(true)} 
                size="sm"
                className="gap-2 shadow-sm"
              >
                <ShieldCheck className="w-4 h-4" />
                Claim Page
              </Button>
          </div>
      </div>

      <ClaimModal 
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        resourceId={resourceId}
        resourceName={resourceName}
        resourceUrl={resourceUrl}
        onClaimSuccess={handleClaimSuccess}
      />
    </>
  );
}

