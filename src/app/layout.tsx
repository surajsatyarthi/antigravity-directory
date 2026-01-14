import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@/components/Analytics";
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
    default: "Antigravity Directory",
  },
  description: "The primary source for AI coding rules, MCP servers, and developer workflows.",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Antigravity Directory",
    description: "The primary source for AI coding rules, MCP servers, and developer workflows.",
    url: "https://googleantigravity.directory",
    siteName: "Antigravity Directory",
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
    title: "Antigravity Directory | Google's AI Intelligence Hub",
    description: "The primary source for AI coding rules, MCP servers, and developer workflows.",
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
      </body>
    </html>
  );
}
