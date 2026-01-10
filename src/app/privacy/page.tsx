'use client';

import Link from 'next/link';
import { Zap, ArrowLeft } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black flex flex-col selection:bg-white/10">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <Link href="/" className="inline-flex items-center gap-3 mb-12 group">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center group-hover:bg-gray-200 transition-all">
            <Zap className="w-6 h-6 text-black fill-black" />
          </div>
          <h1 className="text-xl font-black tracking-tighter text-white lowercase font-mono">
            antigravity
          </h1>
        </Link>

        {/* Content */}
        <div className="bg-[#0A0A0A] border border-gray-900 rounded-[32px] p-8 md:p-12">
          <h1 className="text-4xl font-black tracking-tighter text-white mb-2">Privacy Policy</h1>
          <p className="text-gray-500 text-sm font-mono mb-12">Last updated: January 10, 2026</p>

          <div className="prose prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Introduction</h2>
              <p className="text-gray-400 leading-relaxed">
                Antigravity Directory ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our directory service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Information We Collect</h2>
              <h3 className="text-xl font-semibold text-white mb-3">Account Information</h3>
              <p className="text-gray-400 leading-relaxed mb-4">
                When you sign in with Google, we collect:
              </p>
              <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
                <li>Your Google account email address</li>
                <li>Your name (as provided by Google)</li>
                <li>Your profile picture (if available)</li>
              </ul>
              
              <h3 className="text-xl font-semibold text-white mb-3 mt-6">Usage Data</h3>
              <p className="text-gray-400 leading-relaxed">
                We automatically collect certain information when you visit our directory, including:
              </p>
              <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
                <li>IP address</li>
                <li>Browser type and version</li>
                <li>Pages visited and time spent</li>
                <li>Referring site</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">How We Use Your Information</h2>
              <p className="text-gray-400 leading-relaxed mb-4">We use the collected information to:</p>
              <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
                <li>Provide and maintain our directory service</li>
                <li>Authenticate your account</li>
                <li>Send you important updates about the service</li>
                <li>Improve and personalize your experience</li>
                <li>Analyze usage patterns to enhance our directory</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Data Sharing</h2>
              <p className="text-gray-400 leading-relaxed">
                We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
              </p>
              <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
                <li>With your explicit consent</li>
                <li>To comply with legal obligations</li>
                <li>To protect our rights and prevent fraud</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Data Security</h2>
              <p className="text-gray-400 leading-relaxed">
                We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Your Rights</h2>
              <p className="text-gray-400 leading-relaxed">You have the right to:</p>
              <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
                <li>Access your personal data</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Cookies</h2>
              <p className="text-gray-400 leading-relaxed">
                We use essential cookies to maintain your session and ensure the directory functions properly. These cookies are necessary for authentication and cannot be disabled.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
              <p className="text-gray-400 leading-relaxed">
                If you have questions about this Privacy Policy, please contact us at:{' '}
                <a href="mailto:privacy@googleantigravity.directory" className="text-blue-500 hover:text-blue-400 transition-colors">
                  privacy@googleantigravity.directory
                </a>
              </p>
            </section>
          </div>
        </div>

        {/* Back Link */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 mt-8 text-gray-600 hover:text-white transition-colors text-sm font-mono"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Directory
        </Link>
      </div>
    </div>
  );
}
