'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { Analytics as VercelAnalytics } from '@vercel/analytics/react';

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

    if (isAIReferral && typeof window.gtag === 'function') {
      window.gtag('event', 'ai_citation_visit', {
        referrer_domain: referrer,
        target_path: pathname,
        is_aeo_optimized: true
      });
      console.log(`[AEO] AI Citation detected from: ${referrer}`);
    }

    // 2. Standard Pageview tracking for GA4
    if (typeof window.gtag === 'function' && process.env.NEXT_PUBLIC_GA_ID) {
      window.gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
        page_path: pathname + searchParams.toString(),
      });
    }
  }, [pathname, searchParams]);

  return (
    <>
      {/* Vercel Analytics */}
      <VercelAnalytics />

      {/* Google Analytics 4 */}
      {process.env.NEXT_PUBLIC_GA_ID && (
        <>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
        </>
      )}
    </>
  );
}

// Global declaration for TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}
