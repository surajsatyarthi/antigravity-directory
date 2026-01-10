'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { Zap, Mail, Chrome, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [isEmailLoading, setIsEmailLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsEmailLoading(true);
    try {
      await signIn('email', { email, callbackUrl: '/' });
    } catch (error) {
      console.error(error);
    } finally {
      setIsEmailLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      await signIn('google', { callbackUrl: '/' });
    } catch (error) {
      console.error(error);
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 selection:bg-white/10">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="flex flex-col items-center gap-4 mb-12 group">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center group-hover:bg-gray-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)]">
            <Zap className="w-8 h-8 text-black fill-black" />
          </div>
          <h1 className="text-2xl font-black tracking-tighter text-white lowercase font-mono">
            antigravity
          </h1>
        </Link>

        <div className="bg-[#0A0A0A] border border-gray-900 rounded-[32px] p-8 md:p-10 shadow-2xl relative overflow-hidden">
          {/* Ambient Light */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
          
          <div className="mb-10 text-center">
            <h2 className="text-xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-gray-500 text-sm font-medium">Continue to the neural marketplace</p>
          </div>

          <div className="space-y-4">
            {/* Google Sign In */}
            <button
              onClick={handleGoogleSignIn}
              disabled={isGoogleLoading || isEmailLoading}
              className="w-full flex items-center justify-between px-6 py-4 bg-white hover:bg-gray-200 text-black font-bold rounded-2xl transition-all active:scale-[0.98] disabled:opacity-50 group"
            >
              <div className="flex items-center gap-3">
                {isGoogleLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Chrome className="w-5 h-5" />
                )}
                <span className="text-sm uppercase tracking-widest font-mono font-black">Continue with Google</span>
              </div>
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
            </button>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-900"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-[#0A0A0A] px-4 text-[10px] font-mono font-bold text-gray-700 uppercase tracking-widest">or email magic link</span>
              </div>
            </div>

            {/* Email Sign In */}
            <form onSubmit={handleEmailSignIn} className="space-y-4">
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-700 group-focus-within:text-white transition-colors" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full bg-black border border-gray-900 rounded-2xl pl-12 pr-4 py-4 text-sm text-white focus:border-white transition-all outline-none placeholder:text-gray-700 font-medium"
                />
              </div>
              <button
                type="submit"
                disabled={isEmailLoading || isGoogleLoading}
                className="w-full flex items-center justify-center gap-2 py-4 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-2xl transition-all active:scale-[0.98] disabled:opacity-50 text-sm uppercase tracking-widest font-mono"
              >
                {isEmailLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  'Send Magic Link'
                )}
              </button>
            </form>
          </div>

          <p className="mt-8 text-center text-[10px] text-gray-600 font-mono uppercase tracking-[0.2em] leading-relaxed">
            By continuing, you agree to our <br />
            <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link> & <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
          </p>
        </div>

        {/* Back Link */}
        <Link 
          href="/" 
          className="flex items-center justify-center gap-2 mt-8 text-gray-600 hover:text-white transition-colors text-[10px] font-mono uppercase tracking-widest"
        >
          <ArrowRight className="w-3 h-3 rotate-180" />
          Back to Directory
        </Link>
      </div>
    </div>
  );
}
