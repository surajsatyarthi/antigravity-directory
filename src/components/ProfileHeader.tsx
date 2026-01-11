import { User, Link as LinkIcon, Calendar } from 'lucide-react';
import Image from 'next/image';

interface ProfileHeaderProps {
  user: {
    name: string | null;
    username: string | null;
    image: string | null;
    bio: string | null;
    website: string | null;
    createdAt: Date;
  };
  isOwnProfile?: boolean;
}

export function ProfileHeader({ user, isOwnProfile }: ProfileHeaderProps) {
  return (
    <div className="relative mb-12">
      {/* Cover Gradient / Pattern */}
      <div className="h-48 w-full bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-blue-600/20 rounded-[32px] border border-gray-900 overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] opacity-50" />
      </div>

      <div className="px-8 -mt-16 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col md:flex-row md:items-end gap-6">
            {/* Avatar */}
            <div className="relative group">
              <div className="w-32 h-32 rounded-3xl bg-[#0A0A0A] border-4 border-black overflow-hidden shadow-2xl transition-transform group-hover:scale-[1.02]">
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name || 'User avatar'}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-900">
                    <User className="w-12 h-12 text-gray-700" />
                  </div>
                )}
              </div>
            </div>

            {/* User Info */}
            <div className="mb-2">
              <h1 className="text-4xl font-black tracking-tighter text-white uppercase italic">
                {user.name || 'Anonymous User'}
              </h1>
              <p className="text-blue-500 font-mono text-sm uppercase tracking-widest mt-1">
                @{user.username || 'unidentified'}
              </p>
            </div>
          </div>

          {/* Actions */}
          {isOwnProfile && (
            <div className="mb-4">
              <a
                href="/settings"
                className="inline-flex px-8 py-3 bg-white text-black font-black rounded-xl hover:bg-gray-200 transition-all uppercase tracking-widest text-xs active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
              >
                Edit Sector Profile
              </a>
            </div>
          )}
        </div>

        {/* Bio & Links */}
        <div className="mt-8 max-w-2xl">
          {user.bio ? (
            <p className="text-gray-400 text-lg leading-relaxed font-medium mb-6">
              {user.bio}
            </p>
          ) : (
            <p className="text-gray-600 italic mb-6 font-mono text-sm tracking-tighter">
              No transmission data available in this sector bio.
            </p>
          )}

          <div className="flex flex-wrap items-center gap-6 text-xs font-mono uppercase tracking-widest text-gray-500">
            {user.website && (
              <a
                href={user.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-500 hover:text-white transition-colors"
              >
                <LinkIcon className="w-3.5 h-3.5" />
                {user.website.replace(/^https?:\/\//, '')}
              </a>
            )}
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5" />
              Joined {user.createdAt.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
