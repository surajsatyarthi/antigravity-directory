'use client';

import Link from 'next/link';
import { Zap, ArrowLeft } from 'lucide-react';

export default function TermsPage() {
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
          <h1 className="text-4xl font-black tracking-tighter text-white mb-2">Terms of Service</h1>
          <p className="text-gray-500 text-sm font-mono mb-12">Last updated: January 10, 2026</p>

          <div className="prose prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Acceptance of Terms</h2>
              <p className="text-white leading-relaxed">
                By accessing and using Antigravity Directory ("the Service"), you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Description of Service</h2>
              <p className="text-white leading-relaxed">
                Antigravity Directory is a curated directory of AI tools, prompts, and resources for Google's AI ecosystem. We provide a platform for users to discover, submit, and rate AI-related content.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">User Accounts</h2>
              <h3 className="text-xl font-semibold text-white mb-3">Account Creation</h3>
              <p className="text-white leading-relaxed mb-4">
                You may sign in using your Google account. By creating an account, you agree to:
              </p>
              <ul className="list-disc list-inside text-white space-y-2 ml-4">
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your account</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Notify us immediately of any unauthorized access</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Acceptable Use</h2>
              <p className="text-white leading-relaxed mb-4">You agree NOT to:</p>
              <ul className="list-disc list-inside text-white space-y-2 ml-4">
                <li>Submit false, misleading, or inappropriate content</li>
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe on intellectual property rights of others</li>
                <li>Harass, abuse, or harm other users</li>
                <li>Attempt to breach security or authentication measures</li>
                <li>Use automated tools to scrape or download content</li>
                <li>Upload malicious code or viruses</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Content Submission</h2>
              <p className="text-white leading-relaxed mb-4">
                When you submit content to Antigravity Directory:
              </p>
              <ul className="list-disc list-inside text-white space-y-2 ml-4">
                <li>You retain ownership of your content</li>
                <li>You grant us a non-exclusive license to display and distribute your submissions</li>
                <li>You confirm you have the right to submit the content</li>
                <li>You agree that we may moderate or remove content at our discretion</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Intellectual Property</h2>
              <p className="text-white leading-relaxed">
                The Service and its original content (excluding user submissions) are protected by copyright, trademark, and other laws. Our trademarks may not be used without prior written permission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Disclaimer of Warranties</h2>
              <p className="text-white leading-relaxed">
                The Service is provided "AS IS" and "AS AVAILABLE" without warranties of any kind. We do not guarantee:
              </p>
              <ul className="list-disc list-inside text-white space-y-2 ml-4">
                <li>Uninterrupted or error-free operation</li>
                <li>Accuracy or reliability of content</li>
                <li>That defects will be corrected</li>
                <li>Freedom from viruses or harmful components</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Limitation of Liability</h2>
              <p className="text-white leading-relaxed">
                To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Termination</h2>
              <p className="text-white leading-relaxed">
                We reserve the right to suspend or terminate your account at our discretion, with or without notice, for violations of these Terms or for any other reason.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Changes to Terms</h2>
              <p className="text-white leading-relaxed">
                We may modify these Terms at any time. Continued use of the Service after changes constitutes acceptance of the modified Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Contact</h2>
              <p className="text-white leading-relaxed">
                For questions about these Terms, contact us at:{' '}
                <a href="mailto:legal@googleantigravity.directory" className="text-blue-500 hover:text-blue-400 transition-colors">
                  legal@googleantigravity.directory
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
