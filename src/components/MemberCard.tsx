import { User, MapPin, Github, Twitter, Linkedin, Youtube, MessageSquare, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { FollowButton } from './FollowButton';

interface MemberCardProps {
  member: {
    id: string;
    name: string | null;
    username: string | null;
    image: string | null;
    tagline: string | null;
    location: string | null;
    profileCompletionScore: number | null;
    githubUsername: string | null;
    twitterHandle: string | null;
    linkedinUrl: string | null;
    youtubeChannel: string | null;
    discordUsername: string | null;
  };
  initialIsFollowing?: boolean;
  viewerId?: string;
}

export function MemberCard({ member, initialIsFollowing, viewerId }: MemberCardProps) {
  const isHighPerformer = (member.profileCompletionScore || 0) >= 90;

  return (
    <Link 
      href={`/u/${member.username}`}
      className="group relative bg-[#0A0A0A] border border-gray-900 rounded-[32px] p-6 hover:border-blue-500/50 transition-all hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] flex flex-col items-center text-center overflow-hidden"
    >
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-[60px] rounded-full -mr-16 -mt-16 group-hover:bg-blue-600/10 transition-colors" />
      
      {/* Completion Badge */}
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        {isHighPerformer && (
          <div title="High Integrity Profile">
            <ShieldCheck className="w-5 h-5 text-blue-500 fill-blue-500/20" />
          </div>
        )}
        {viewerId && viewerId !== member.id && (
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <FollowButton 
              targetUserId={member.id} 
              initialIsFollowing={!!initialIsFollowing} 
              variant="mini" 
            />
          </div>
        )}
      </div>

      {/* Avatar Container */}
      <div className="relative mb-6">
        <div className="w-24 h-24 rounded-[32px] border-4 border-black overflow-hidden shadow-2xl relative">
          {member.image ? (
            <Image
              src={member.image}
              alt={member.name || 'Member'}
              width={96}
              height={96}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-900">
              <User className="w-10 h-10 text-gray-700" />
            </div>
          )}
        </div>
        {/* Progress Bar (Mini) */}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-16 h-1 bg-gray-950 rounded-full overflow-hidden border border-black">
          <div 
            className="h-full bg-blue-600 rounded-full" 
            style={{ width: `${member.profileCompletionScore || 0}%` }}
          />
        </div>
      </div>

      {/* Info */}
      <div className="flex-1 w-full space-y-1">
        <h3 className="text-xl font-black text-white uppercase italic tracking-tighter group-hover:text-blue-400 transition-colors">
          {member.name || (member.username ? `@${member.username}` : 'Identified User')}
        </h3>
        {member.tagline ? (
          <p className="text-gray-400 text-xs font-medium italic line-clamp-1 h-4">
            {member.tagline}
          </p>
        ) : (
          <div className="h-4" />
        )}
        
        <p className="text-blue-500 font-mono text-[10px] uppercase tracking-[0.2em] pt-1">
          @{member.username || 'unidentified'}
        </p>

        {member.location && (
          <p className="flex items-center justify-center gap-1.5 text-gray-600 font-mono text-[10px] uppercase tracking-wider mt-3">
            <MapPin className="w-3 h-3" />
            {member.location}
          </p>
        )}
      </div>

      {/* Social Icons (Mini Presence) */}
      <div className="mt-6 flex flex-wrap justify-center gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
        {member.githubUsername && <Github className="w-3.5 h-3.5 text-gray-500" />}
        {member.twitterHandle && <Twitter className="w-3.5 h-3.5 text-gray-500" />}
        {member.linkedinUrl && <Linkedin className="w-3.5 h-3.5 text-gray-500" />}
        {member.youtubeChannel && <Youtube className="w-3.5 h-3.5 text-gray-500" />}
        {member.discordUsername && <MessageSquare className="w-3.5 h-3.5 text-gray-500" />}
      </div>
    </Link>
  );
}
