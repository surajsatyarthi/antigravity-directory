import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@/components/Analytics";
import { Footer } from "@/components/Footer";
import { Providers } from "@/components/Providers";
import { Toaster } from "@/components/ui/toaster";
import { SponsorBadge } from '@/components/SponsorBadge';
import { Suspense } from "react";
import { Toaster as SonnerToaster } from "sonner";
import Script from 'next/script';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.googleantigravity.directory'),
  title: {
    template: "%s | Antigravity Directory",
    default: "Antigravity Directory | MCP Servers, Rules & Prompts",
  },
  description: "The #1 free directory for Google Antigravity IDE. Browse 3,116+ MCP servers, skills, rules, prompts and workflows — all free, no login required.",
  keywords: ["google antigravity", "antigravity ide", "mcp servers", "antigravity rules", "gemini 3", "ai coding", "agentic development", "antigravity prompts", "mcp directory"],
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "Antigravity Directory",
    description: "The #1 free directory for Google Antigravity IDE. Browse 3,116+ MCP servers, skills, rules, prompts and workflows — all free, no login required.",
    url: "https://www.googleantigravity.directory",
    siteName: "Google Antigravity Directory",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Antigravity Directory — MCP Servers, Skills, Rules & Prompts",
    description: "The #1 free directory for Google Antigravity IDE. Browse 3,116+ MCP servers, skills, rules, prompts and workflows — all free, no login required.",
    images: ["/twitter-image.png"],
  },
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
      ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
      : {}),
    other: {
      ...(process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
        ? { 'msvalidate.01': process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
        : {}),
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${mono.variable} font-sans antialiased bg-black text-white selection:bg-blue-500/30`}
      >
        <Script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="0eXSlE7Wd9b4bT6lsu8qQg"
          strategy="afterInteractive"
        />
        <Providers>
          <a 
            href="#main-content" 
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-blue-600 focus:text-white focus:font-bold focus:rounded-xl focus:shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition-all"
          >
            Skip to main content
          </a>
          <Suspense fallback={null}>
            <Analytics />
          </Suspense>
          <div id="main-content" tabIndex={-1} className="outline-none">
            {children}
          </div>
          <Footer />
          <Toaster />
          <SonnerToaster position="top-center" richColors />
          <SponsorBadge />
        </Providers>
      </body>
    </html>
  );
}
