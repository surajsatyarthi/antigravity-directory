'use client';

import { useState, useTransition } from 'react';
import { Bookmark } from 'lucide-react';
import { toggleBookmark } from '@/lib/actions/bookmark';
import { useRouter } from 'next/navigation';

interface BookmarkButtonProps {
  resourceId: string;
  initialIsBookmarked: boolean;
}

export function BookmarkButton({ resourceId, initialIsBookmarked }: BookmarkButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isBookmarked, setIsBookmarked] = useState(initialIsBookmarked);

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Optimistic UI update
    const prevValue = isBookmarked;
    setIsBookmarked(!isBookmarked);

    startTransition(async () => {
      try {
        await toggleBookmark(resourceId);
        router.refresh();
      } catch (error) {
        // Rollback on error
        setIsBookmarked(prevValue);
        console.error('Failed to toggle bookmark:', error);
      }
    });
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isPending}
      className={`p-2 rounded-lg border transition-all active:scale-95 ${
        isBookmarked
          ? 'bg-blue-600 border-blue-500 text-white shadow-[0_0_15px_rgba(37,99,235,0.3)]'
          : 'bg-transparent border-gray-800 text-gray-500 hover:border-gray-600 hover:text-white'
      }`}
      title={isBookmarked ? 'Remove Bookmark' : 'Add Bookmark'}
    >
      <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-white' : ''} ${isPending ? 'animate-pulse' : ''}`} />
    </button>
  );
}
