import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@/components/Analytics";
import { Footer } from "@/components/Footer";
import { Providers } from "@/components/Providers";
import { Suspense } from "react";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://googleantigravity.directory'),
  title: {
    template: "%s | Antigravity Directory",
    default: "Antigravity Directory | MCP Servers, Rules & Prompts",
  },
  description: "The complete resource hub for Google Antigravity IDE. Discover 500+ curated MCP servers, coding rules, and prompts for Gemini 3-powered agentic development.",
  keywords: ["google antigravity", "antigravity ide", "mcp servers", "antigravity rules", "gemini 3", "ai coding", "agentic development", "antigravity prompts", "mcp directory"],
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "Antigravity Directory",
    description: "The complete resource hub for Google Antigravity IDE. Discover 500+ curated MCP servers, coding rules, and prompts for Gemini 3-powered agentic development.",
    url: "https://googleantigravity.directory",
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
    title: "Antigravity Directory | AI Intelligence Hub",
    description: "The complete resource hub for Google Antigravity IDE. Discover 500+ curated MCP servers, coding rules, and prompts for Gemini 3-powered agentic development.",
    images: ["/twitter-image.png"],
  },
  alternates: {
    canonical: '/',
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
          <div data-ralph-trace="global-root">
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
