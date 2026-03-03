'use client';

import { useState, useTransition } from 'react';
import { UserPlus, UserMinus, UserCheck, Loader2 } from 'lucide-react';
import { followUser, unfollowUser } from '@/lib/actions/follow';
import { toast } from 'sonner';

interface FollowButtonProps {
  targetUserId: string;
  initialIsFollowing: boolean;
  variant?: 'primary' | 'mini';
}

export function FollowButton({ 
  targetUserId, 
  initialIsFollowing, 
  variant = 'primary' 
}: FollowButtonProps) {
  const [following, setFollowing] = useState(initialIsFollowing);
  const [isPending, startTransition] = useTransition();

  const handleToggleFollow = async () => {
    startTransition(async () => {
      // Optimistic Update
      const previousState = following;
      setFollowing(!previousState);

      const action = previousState ? unfollowUser : followUser;
      const result = await action(targetUserId);

      if (result.error) {
        setFollowing(previousState);
        toast.error(result.error);
      } else {
        toast.success(previousState ? 'Unfollowed successfully' : 'Following user');
      }
    });
  };

  if (variant === 'mini') {
    return (
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleToggleFollow();
        }}
        disabled={isPending}
        className={`p-2 rounded-xl border transition-all ${
          following 
            ? 'bg-blue-500/10 border-blue-500/20 text-blue-500' 
            : 'bg-slate-100 border-slate-200 text-slate-400 hover:text-slate-900 hover:bg-slate-100'
        }`}
      >
        {isPending ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : following ? (
          <UserCheck className="w-4 h-4" />
        ) : (
          <UserPlus className="w-4 h-4" />
        )}
      </button>
    );
  }

  return (
    <button
      onClick={handleToggleFollow}
      disabled={isPending}
      className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black uppercase italic tracking-tighter transition-all ${
        following
          ? 'bg-[#151515] border border-gray-800 text-slate-400 hover:border-red-500/50 hover:text-red-500 group'
          : 'bg-blue-600 border border-blue-500 text-slate-900 hover:bg-blue-700 shadow-[0_0_20px_rgba(37,99,235,0.3)]'
      }`}
    >
      {isPending ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : following ? (
        <>
          <UserCheck className="w-4 h-4 group-hover:hidden" />
          <UserMinus className="w-4 h-4 hidden group-hover:block" />
          <span className="group-hover:hidden">Following</span>
          <span className="hidden group-hover:block">Unfollow</span>
        </>
      ) : (
        <>
          <UserPlus className="w-4 h-4" />
          <span>Follow User</span>
        </>
      )}
    </button>
  );
}
