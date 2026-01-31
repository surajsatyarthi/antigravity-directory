'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { Analytics as VercelAnalytics } from '@vercel/analytics/react';
import { GoogleAnalytics, sendGAEvent } from '@next/third-parties/google';

export function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // 1. Detect AI Referrers (2026 AEO Standard)
    const referrer = document.referrer;
    const aiAgents = [
      'perplexity.ai',
      'chatgpt.com',
      'openai.com',
      'gemini.google.com',
      'claude.ai',
      'v0.dev',
      'relume.io'
    ];

    const isAIReferral = aiAgents.some(agent => referrer.includes(agent));

    if (isAIReferral) {
      sendGAEvent('event', 'ai_citation_visit', {
        referrer_domain: referrer,
        target_path: pathname,
        is_aeo_optimized: true
      });
      console.log(`[AEO] AI Citation detected from: ${referrer}`);
    }

    // 2. Standard Pageview tracking for GA4
    // NOTE: @next/third-parties/google handles pageviews automatically on route changes.
    // Explicit tracking removed to prevent double counting.
  }, [pathname, searchParams]);

  return (
    <>
      {/* Vercel Analytics */}
      <VercelAnalytics />

      {/* Google Analytics 4 */}
      {process.env.NEXT_PUBLIC_GA_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      )}
    </>
  );
}


