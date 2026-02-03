'use client';

import { useState } from 'react';
import { updateProfile } from '@/lib/actions/profile';
import { useRouter } from 'next/navigation';
import { 
  User, Globe, FileText, Check, AlertCircle, MapPin, 
  Terminal, Github, Twitter, Linkedin, Youtube, MessageSquare,
  Zap
} from 'lucide-react';

interface SettingsFormProps {
  user: {
    name: string | null;
    username: string | null;
    bio: string | null;
    website: string | null;
    location: string | null;
    tagline: string | null;
    githubUsername: string | null;
    twitterHandle: string | null;
    linkedinUrl: string | null;
    youtubeChannel: string | null;
    discordUsername: string | null;
    profileCompletionScore: number | null;
  };
}

export function SettingsForm({ user }: SettingsFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    
    try {
      const result = await updateProfile(formData);
      if (result?.error) {
        setError(result.error);
      } else {
        setSuccess(true);
        router.refresh();
        // Hide success message after 5 seconds
        setTimeout(() => setSuccess(false), 5000);
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  }

  const completionScore = user.profileCompletionScore || 0;

  return (
    <form onSubmit={handleSubmit} className="space-y-12">
      {/* Profile Completion Header */}
      <div className="bg-[#0A0A0A] border border-gray-900 rounded-3xl p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-500/10 rounded-lg">
              <Zap className="w-5 h-5 text-yellow-500" />
            </div>
            <div>
              <h3 className="text-white font-black uppercase italic tracking-tighter">Sector Integrity</h3>
              <p className="text-[10px] text-gray-500 font-mono uppercase">Profile Completion Multiplier</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-2xl font-black text-white italic">{completionScore}%</span>
          </div>
        </div>
        <div className="w-full bg-gray-900 h-2 rounded-full overflow-hidden">
          <div 
            className="bg-gradient-to-r from-yellow-500 to-orange-500 h-full transition-all duration-1000 ease-out"
            style={{ width: `${completionScore}%` }}
          />
        </div>
        {completionScore < 100 && (
          <p className="text-[9px] text-gray-600 mt-3 font-mono uppercase tracking-widest italic">
            Complete your transmission fields to increase sector authority.
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Core Identity Section */}
        <div className="space-y-6">
          <h2 className="text-xs font-black text-white uppercase tracking-[4px] border-b border-gray-900 pb-2 mb-4">Core Identity</h2>
          
          <div className="space-y-2">
            <label htmlFor="name" className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
              <User className="w-3 h-3" />
              Display Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              defaultValue={user.name || ''}
              required
              className="w-full bg-black border border-gray-900 focus:border-white rounded-xl px-4 py-3 text-sm transition-all text-white placeholder:text-gray-800 outline-none"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="username" className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
              <span className="text-blue-500">@</span>
              Identity Slug
            </label>
            <input
              id="username"
              name="username"
              type="text"
              defaultValue={user.username || ''}
              required
              className="w-full bg-black border border-gray-900 focus:border-blue-500 rounded-xl px-4 py-3 text-sm transition-all text-white placeholder:text-gray-800 outline-none font-mono"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="tagline" className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
              <Terminal className="w-3 h-3" />
              Pulse Tagline
            </label>
            <input
              id="tagline"
              name="tagline"
              type="text"
              defaultValue={user.tagline || ''}
              placeholder="e.g. MCP Architect | Protocol Specialist"
              className="w-full bg-black border border-gray-900 focus:border-white rounded-xl px-4 py-3 text-sm transition-all text-white placeholder:text-gray-800 outline-none"
            />
          </div>
        </div>

        {/* Location & Links Section */}
        <div className="space-y-6">
          <h2 className="text-xs font-black text-white uppercase tracking-[4px] border-b border-gray-900 pb-2 mb-4">Metadata & Links</h2>
          
          <div className="space-y-2">
            <label htmlFor="location" className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
              <MapPin className="w-3 h-3" />
              Sector Location
            </label>
            <input
              id="location"
              name="location"
              type="text"
              defaultValue={user.location || ''}
              placeholder="e.g. Neo Tokyo, Digital Grid"
              className="w-full bg-black border border-gray-900 focus:border-white rounded-xl px-4 py-3 text-sm transition-all text-white placeholder:text-gray-800 outline-none"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="website" className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
              <Globe className="w-3 h-3" />
              External Uplink
            </label>
            <input
              id="website"
              name="website"
              type="url"
              defaultValue={user.website || ''}
              placeholder="https://your-sector.io"
              className="w-full bg-black border border-gray-900 focus:border-white rounded-xl px-4 py-3 text-sm transition-all text-white placeholder:text-gray-800 outline-none font-mono"
            />
          </div>
        </div>
      </div>

      {/* Bio / Mission */}
      <div className="space-y-2">
        <label htmlFor="bio" className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
          <FileText className="w-3 h-3" />
          Mission Bio
        </label>
        <textarea
          id="bio"
          name="bio"
          rows={3}
          defaultValue={user.bio || ''}
          maxLength={160}
          className="w-full bg-black border border-gray-900 focus:border-white rounded-xl px-4 py-3 text-sm transition-all text-white placeholder:text-gray-800 outline-none resize-none"
          placeholder="Describe your primary objective in the Antigravity system..."
        />
      </div>

      {/* Social Matrix */}
      <div className="space-y-6">
        <h2 className="text-xs font-black text-white uppercase tracking-[4px] border-b border-gray-900 pb-2">Social Matrix</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label htmlFor="githubUsername" className="text-[9px] font-bold text-gray-600 uppercase tracking-widest flex items-center gap-2">
              <Github className="w-3 h-3" /> Github
            </label>
            <input
              id="githubUsername"
              name="githubUsername"
              type="text"
              defaultValue={user.githubUsername || ''}
              className="w-full bg-[#050505] border border-gray-900 focus:border-white rounded-lg px-3 py-2 text-xs text-white outline-none"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="twitterHandle" className="text-[9px] font-bold text-gray-600 uppercase tracking-widest flex items-center gap-2">
              <Twitter className="w-3 h-3" /> Twitter
            </label>
            <input
              id="twitterHandle"
              name="twitterHandle"
              type="text"
              defaultValue={user.twitterHandle || ''}
              className="w-full bg-[#050505] border border-gray-900 focus:border-white rounded-lg px-3 py-2 text-xs text-white outline-none"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="discordUsername" className="text-[9px] font-bold text-gray-600 uppercase tracking-widest flex items-center gap-2">
              <MessageSquare className="w-3 h-3" /> Discord
            </label>
            <input
              id="discordUsername"
              name="discordUsername"
              type="text"
              defaultValue={user.discordUsername || ''}
              className="w-full bg-[#050505] border border-gray-900 focus:border-white rounded-lg px-3 py-2 text-xs text-white outline-none"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="linkedinUrl" className="text-[9px] font-bold text-gray-600 uppercase tracking-widest flex items-center gap-2">
              <Linkedin className="w-3 h-3" /> LinkedIn
            </label>
            <input
              id="linkedinUrl"
              name="linkedinUrl"
              type="url"
              defaultValue={user.linkedinUrl || ''}
              className="w-full bg-[#050505] border border-gray-900 focus:border-white rounded-lg px-3 py-2 text-xs text-white outline-none"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="youtubeChannel" className="text-[9px] font-bold text-gray-600 uppercase tracking-widest flex items-center gap-2">
              <Youtube className="w-3 h-3" /> YouTube
            </label>
            <input
              id="youtubeChannel"
              name="youtubeChannel"
              type="text"
              defaultValue={user.youtubeChannel || ''}
              className="w-full bg-[#050505] border border-gray-900 focus:border-white rounded-lg px-3 py-2 text-xs text-white outline-none"
            />
          </div>
        </div>
      </div>

      {/* Feedback Messages */}
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-500 text-sm font-medium animate-in fade-in slide-in-from-top-1">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {error}
        </div>
      )}

      {success && (
        <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center gap-3 text-green-500 text-sm font-medium animate-in fade-in slide-in-from-top-1">
          <Check className="w-4 h-4 shrink-0" />
          Sector profile updated successfully. Transmission synced.
        </div>
      )}

      {/* Submit Button */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={loading}
          className="w-full md:w-auto px-12 py-4 bg-white text-black font-black rounded-2xl hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all uppercase tracking-[3px] text-xs active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.1)]"
        >
          {loading ? 'Syncing Network...' : 'Commit Changes'}
        </button>
      </div>
    </form>
  );
}
