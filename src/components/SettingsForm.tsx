'use client';

import { useState } from 'react';
import { updateProfile } from '@/lib/actions/profile';
import { useRouter } from 'next/navigation';
import { User, Globe, FileText, Check, AlertCircle } from 'lucide-react';

interface SettingsFormProps {
  user: {
    name: string | null;
    username: string | null;
    bio: string | null;
    website: string | null;
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
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl">
      {/* Name */}
      <div className="space-y-2">
        <label htmlFor="name" className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
          <User className="w-3.5 h-3.5" />
          Display Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          defaultValue={user.name || ''}
          required
          className="w-full bg-[#0A0A0A] border border-gray-800 focus:border-white rounded-xl px-4 py-3 text-sm transition-all text-white placeholder:text-gray-600 outline-none shadow-inner"
        />
      </div>

      {/* Username */}
      <div className="space-y-2">
        <label htmlFor="username" className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
          <span className="text-blue-500">@</span>
          Sector Identity (Username)
        </label>
        <input
          id="username"
          name="username"
          type="text"
          defaultValue={user.username || ''}
          required
          className="w-full bg-[#0A0A0A] border border-gray-800 focus:border-blue-500 rounded-xl px-4 py-3 text-sm transition-all text-white placeholder:text-gray-600 outline-none shadow-inner font-mono"
        />
        <p className="text-[10px] text-gray-600 font-mono uppercase tracking-tighter">
          Numbers, lowercase letters, and underscores only. This affects your profile URL.
        </p>
      </div>

      {/* Bio */}
      <div className="space-y-2">
        <label htmlFor="bio" className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
          <FileText className="w-3.5 h-3.5" />
          Sector Bio
        </label>
        <textarea
          id="bio"
          name="bio"
          rows={4}
          defaultValue={user.bio || ''}
          maxLength={160}
          className="w-full bg-[#0A0A0A] border border-gray-800 focus:border-white rounded-xl px-4 py-3 text-sm transition-all text-white placeholder:text-gray-600 outline-none shadow-inner resize-none"
          placeholder="Briefly describe your mission in the Antigravity sector..."
        />
        <div className="flex justify-end">
          <span className="text-[10px] text-gray-700 font-mono italic">Max 160 characters</span>
        </div>
      </div>

      {/* Website */}
      <div className="space-y-2">
        <label htmlFor="website" className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
          <Globe className="w-3.5 h-3.5" />
          External Uplink (Website)
        </label>
        <input
          id="website"
          name="website"
          type="url"
          defaultValue={user.website || ''}
          placeholder="https://your-sector.com"
          className="w-full bg-[#0A0A0A] border border-gray-800 focus:border-white rounded-xl px-4 py-3 text-sm transition-all text-white placeholder:text-gray-600 outline-none shadow-inner font-mono"
        />
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
