import { 
  User, Link as LinkIcon, Calendar, MapPin, 
  Github, Twitter, Linkedin, Youtube, MessageSquare,
  Users
} from 'lucide-react';
import Image from 'next/image';
import { FollowButton } from './FollowButton';

interface ProfileHeaderProps {
  user: {
    id: string;
    name: string | null;
    username: string | null;
    image: string | null;
    bio: string | null;
    website: string | null;
    location: string | null;
    tagline: string | null;
    githubUsername: string | null;
    twitterHandle: string | null;
    linkedinUrl: string | null;
    youtubeChannel: string | null;
    discordUsername: string | null;
    followersCount: number | null;
    followingCount: number | null;
    createdAt: Date;
  };
  isOwnProfile?: boolean;
  initialIsFollowing?: boolean;
}

export function ProfileHeader({ user, isOwnProfile, initialIsFollowing }: ProfileHeaderProps) {
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
              {user.tagline && (
                <p className="text-gray-400 font-medium italic text-sm mt-0.5 tracking-tight">
                  {user.tagline}
                </p>
              )}
              <div className="flex flex-wrap items-center gap-4 mt-2">
                <p className="text-blue-500 font-mono text-sm uppercase tracking-widest leading-none">
                  @{user.username || 'unidentified'}
                </p>
                <div className="flex items-center gap-4 text-gray-500 font-mono text-[10px] uppercase tracking-widest bg-white/5 px-3 py-1.5 rounded-2xl border border-white/5 shadow-inner">
                  <div className="flex items-center gap-1.5">
                    <span className="text-white font-black">{user.followersCount || 0}</span>
                    <span className="text-[8px] opacity-60">Followers</span>
                  </div>
                  <div className="w-px h-2.5 bg-gray-800" />
                  <div className="flex items-center gap-1.5">
                    <span className="text-white font-black">{user.followingCount || 0}</span>
                    <span className="text-[8px] opacity-60">Following</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mb-4 flex gap-4">
            {!isOwnProfile && (
              <FollowButton 
                targetUserId={user.id} 
                initialIsFollowing={!!initialIsFollowing} 
              />
            )}
            {isOwnProfile && (
              <a
                href="/settings"
                className="inline-flex px-8 py-3 bg-white text-black font-black rounded-xl hover:bg-gray-200 transition-all uppercase tracking-widest text-xs active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
              >
                Edit Sector Profile
              </a>
            )}
          </div>
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
            {user.location && (
              <div className="flex items-center gap-2 text-gray-400">
                <MapPin className="w-3.5 h-3.5" />
                {user.location}
              </div>
            )}
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5" />
              Joined {user.createdAt.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </div>
          </div>

          {/* Social Matrix */}
          <div className="flex flex-wrap items-center gap-4 mt-8">
            {user.githubUsername && (
              <a 
                href={`https://github.com/${user.githubUsername}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-gray-400 hover:text-white transition-all group"
                title="GitHub Profile"
              >
                <Github className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>
            )}
            {user.twitterHandle && (
              <a 
                href={`https://twitter.com/${user.twitterHandle}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-gray-400 hover:text-[#1d9bf0] transition-all group"
                title="Twitter Profile"
              >
                <Twitter className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>
            )}
            {user.linkedinUrl && (
              <a 
                href={user.linkedinUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-gray-400 hover:text-[#0a66c2] transition-all group"
                title="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>
            )}
            {user.discordUsername && (
              <div 
                className="p-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-gray-400 hover:text-[#5865f2] transition-all group cursor-help"
                title={`Discord: ${user.discordUsername}`}
              >
                <MessageSquare className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </div>
            )}
            {user.youtubeChannel && (
              <a 
                href={user.youtubeChannel.startsWith('http') ? user.youtubeChannel : `https://youtube.com/@${user.youtubeChannel}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-gray-400 hover:text-[#ff0000] transition-all group"
                title="YouTube Channel"
              >
                <Youtube className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
