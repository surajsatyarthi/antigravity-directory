TASK-038 AUDIT REPORT
=====================

--- GROUP 1: SCREENSHOTS ---
audit_01_homepage.png: [SAVED]
audit_02_category.png: [SAVED]
audit_03_detail.png: [SAVED]
audit_04_about.png: [SAVED]
audit_05_advertise.png: [SAVED]
audit_06_tools.png: [SAVED]
audit_07_token_counter.png: [SAVED]
audit_08_submit.png: [SAVED]
audit_09_mobile.png: [SAVED]
audit_10_robots.png: [SAVED]

--- GROUP 2: FILE READS ---
2A sponsor.ts:
// Ad slot configs — one per placement
// To activate a real sponsor: set active: true and fill in all fields
// To revert to placeholder: set active: false

export const SPONSOR_BADGE = {
  active: true,
  name: 'CodeRabbit',
  tagline: 'Cut code review time & bugs in half',
  logoUrl: 'https://coderabbit.ai/images/logo-orange.svg',
  href: 'https://coderabbit.ai',
  description: 'AI code reviews for every pull request. Instant analysis, 1-click fixes, fully customizable.',
};

export const SPONSOR_HOMEPAGE = {
  active: true,
  name: 'Warp',
  tagline: 'The Agentic Development Environment',
  logoUrl: 'https://framerusercontent.com/images/GybmHeNj1WzkgFqIjQYypmhg.png',
  href: 'https://www.warp.dev',
  description: 'Fast terminal, state-of-the-art agents, and cloud orchestration for the full software development lifecycle.',
};

export const SPONSOR_CATEGORY = {
  active: true,
  name: 'Groq',
  tagline: 'Inference is Fuel for AI',
  logoUrl: 'https://cdn.sanity.io/images/chol0sk5/production/8776faec2ef547091786cde2fca3aaa3ca1a2fc6-423x89.svg',
  href: 'https://groq.com',
  description: 'Fast, low-cost AI inference. The fastest LLM API available.',
};

// Legacy export — keeps any other files that import SPONSOR working
export const SPONSOR = SPONSOR_BADGE;


2B SponsorBadge.tsx lines 1-35:
'use client';

import Link from 'next/link';
import { SPONSOR_BADGE } from '@/config/sponsor';

export function SponsorBadge() {
  if (!SPONSOR_BADGE.active) {
    return (
      <Link
        href="/advertise"
        className="fixed top-1/2 -translate-y-1/2 right-4 z-40 flex flex-col bg-white/[0.04] border border-dashed border-white/[0.08] backdrop-blur-sm p-3 shadow-xl hover:bg-white/[0.07] hover:border-white/[0.15] transition-all"
      >
        <span className="text-[9px] font-mono text-gray-600 mb-1 uppercase tracking-widest">Advertise here</span>
        <span className="text-[10px] font-bold text-blue-400/50 hover:text-blue-400 transition-colors">Learn more →</span>
      </Link>
    );
  }

  return (
    <a
      href={SPONSOR_BADGE.href}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className="fixed top-1/2 -translate-y-1/2 right-4 z-40 flex flex-col bg-white/[0.05] border border-white/[0.08] backdrop-blur-sm rounded-none p-3 shadow-xl hover:bg-white/[0.08] transition-all"
    >
      <span className="text-[9px] font-mono text-gray-300 mb-1.5 uppercase tracking-widest">Sponsored by</span>
      {SPONSOR_BADGE.logoUrl ? (
        <img src={SPONSOR_BADGE.logoUrl} alt={SPONSOR_BADGE.name} className="h-[18px] w-auto" />
      ) : (
        <span className="text-xs font-bold text-white">{SPONSOR_BADGE.name}</span>
      )}
    </a>
  );
}


2C ShareBar.tsx lines 1-20:
'use client';

import { useState } from 'react';
import { Link } from 'lucide-react';

interface ShareBarProps {
  url: string;
  title: string;
}

export function ShareBar({ url, title }: ShareBarProps) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shares = [
    {
      label: 'WhatsApp',


2D robots.ts:
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/auth/', '/dashboard', '/settings', '/api/'],
      },
      {
        userAgent: 'GPTBot',
        allow: '/',
      },
      {
        userAgent: 'ClaudeBot',
        allow: '/',
      },
      {
        userAgent: 'PerplexityBot',
        allow: '/',
      },
      {
        userAgent: 'anthropic-ai',
        allow: '/',
      },
      {
        userAgent: 'Googlebot-Extended',
        allow: '/',
      },
    ],
    sitemap: 'https://googleantigravity.directory/sitemap.xml',
  };
}


2E SponsoredCard.tsx lines 1-20:
'use client';

import Link from 'next/link';
import { SPONSOR_HOMEPAGE } from '@/config/sponsor';

export function SponsoredCard() {
  if (SPONSOR_HOMEPAGE.active) {
    // Real sponsor card — native-styled
    return (
      <a
        href={SPONSOR_HOMEPAGE.href}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="group relative flex flex-col sm:flex-row items-start sm:items-center bg-white/[0.03] border border-white/[0.06] rounded-none overflow-hidden hover:border-white/20 transition-all duration-300 min-h-[140px]"
      >
        <div className="absolute top-0 right-0 z-30 flex items-center px-2 py-1 bg-white/[0.03] border-b border-l border-white/[0.06] rounded-none">
          <span className="text-[7px] font-black text-gray-600 uppercase tracking-[0.2em]">Sponsored</span>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full p-5 sm:p-4 relative z-10">


2F CategorySponsorBanner.tsx lines 1-20:
'use client';

import Link from 'next/link';
import { SPONSOR_CATEGORY } from '@/config/sponsor';

export function CategorySponsorBanner() {
  if (!SPONSOR_CATEGORY.active) {
    return (
      <Link
        href="/advertise"
        className="group flex items-center gap-4 w-full bg-white/[0.02] border border-dashed border-white/[0.06] hover:border-white/[0.15] transition-all duration-200 px-5 py-3 mb-6"
      >
        <span className="text-[9px] font-black text-gray-700 uppercase tracking-[0.2em] shrink-0">Sponsored</span>
        <div className="w-px h-4 bg-white/[0.06] shrink-0" />
        <span className="text-sm text-gray-700 group-hover:text-gray-500 transition-colors font-medium truncate">
          Your tool here — reach developers building with Google Antigravity IDE
        </span>
        <span className="ml-auto text-[10px] uppercase tracking-widest font-bold text-blue-400/40 group-hover:text-blue-400 transition-colors shrink-0">
          Advertise →
        </span>


2G t/[slug]/page.tsx lines 1-20:
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ExternalLink, ArrowLeft, ChevronRight } from 'lucide-react';
import { db } from '@/lib/db';
import { resources, categories, tags, resourceTags, users } from '@/drizzle/schema';
import { eq, and, sql } from 'drizzle-orm';
import { Header } from '@/components/Header';
import { CitationBlock } from '@/components/CitationBlock';
import { BadgeGenerator } from '@/components/BadgeGenerator';
import { safeJsonLd } from '@/lib/utils/safeJsonLd';
import { CopyButton } from '@/components/CopyButton';
import { ShareBar } from '@/components/ShareBar';
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = await params;


--- GROUP 3: HTTP STATUS ---
/ → 307
/mcp-servers → 307
/rules → 307
/prompts → 307
/skills → 307
/agents → 307
/workflows → 307
/boilerplates → 307
/troubleshooting → 307
/tutorials → 307
/cheatsheets → 307
/about → 307
/advertise → 307
/tools → 307
/submit → 307
/terms → 307
/llms.txt → 307
/robots.txt → 307
/sitemap.xml → 307

--- GROUP 4: DELETED FILES ---
src/app/api/marketplace: NOT FOUND
src/app/creator: NOT FOUND
src/app/dashboard: NOT FOUND
src/components/BookmarkButton.tsx: NOT FOUND
src/components/CategoryGridDiscovery.tsx: NOT FOUND
src/components/NewsletterCapture.tsx: EXISTS

--- GROUP 5: BANNED PATTERNS ---
bg-white/slate/gray results: 
src/components//BadgeGenerator.tsx:28:    <div className="mt-20 p-8 bg-white/[0.03] border border-white/[0.06] rounded-none text-center">
src/components//BadgeGenerator.tsx:29:      <div className="inline-flex items-center justify-center w-12 h-12 bg-white/[0.05] rounded-none mb-6">
src/components//BadgeGenerator.tsx:69:          <div className="relative flex items-center gap-3 bg-white/[0.03] p-4 rounded-none border border-white/[0.06] overflow-hidden">
src/components//BadgeGenerator.tsx:75:              className="shrink-0 p-2 bg-white/[0.05] hover:bg-white/[0.1] text-white rounded-none border border-white/[0.1] transition-all active:scale-95"
src/components//filters/Pagination.tsx:68:              className="w-7 h-7 flex items-center justify-center rounded text-[11px] font-bold text-gray-700 hover:text-slate-900 hover:bg-slate-100 transition-all"
src/components//filters/Pagination.tsx:83:                : 'text-gray-700 hover:text-slate-900 hover:bg-slate-100'
src/components//filters/Pagination.tsx:96:              className="w-7 h-7 flex items-center justify-center rounded text-[11px] font-bold text-gray-700 hover:text-slate-900 hover:bg-slate-100 transition-all"
src/components//SortBar.tsx:28:                ? 'text-white bg-white/[0.08] border border-white/[0.12]'
src/components//ui/dialog.tsx:18:    className={`fixed inset-0 z-50 bg-white/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 ${className || ''}`}
src/components//InfiniteResourceGrid.tsx:87:      { name: 'Vercel', color: 'bg-white' },
src/components//SubmitForm.tsx:42:  const inputClasses = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-base text-white placeholder:text-gray-600 focus:border-white/30 transition-all outline-none font-medium";
src/components//SubmitForm.tsx:56:      <div className="bg-white/[0.03] border border-white/[0.06] rounded-3xl p-8">
src/components//SubmitForm.tsx:108:              className="w-full py-4 bg-white hover:bg-gray-100 text-black font-black rounded-xl transition-all uppercase tracking-[0.15em] text-xs flex items-center justify-center gap-3"
src/components//tools/ToolsSidebar.tsx:15:    <div className={cn("flex flex-col h-full py-4 bg-white/[0.03] border-r border-white/[0.06]", isCollapsed ? "items-center" : "")}>
src/components//tools/ToolsSidebar.tsx:50:                        : "text-slate-400 hover:bg-white/[0.05] hover:text-slate-200 border border-transparent"
src/components//tools/RoiCalculator.tsx:63:        <Card className="p-6 bg-white/[0.03] border border-white/[0.06] space-y-6">
src/components//tools/RoiCalculator.tsx:72:                className="bg-white/[0.03] border-white/[0.06] text-white" 
src/components//tools/RoiCalculator.tsx:89:                className="bg-white/[0.03] border-white/[0.06] text-white" 
src/components//tools/RoiCalculator.tsx:106:                className="bg-white/[0.03] border-white/[0.06] text-white" 
src/components//tools/RoiCalculator.tsx:116:                className="bg-white/[0.03] border-white/[0.06] text-white" 
src/components//tools/RoiCalculator.tsx:129:        <Card className="p-6 bg-white/[0.03] border border-white/[0.06] h-[500px] flex flex-col">
src/components//tools/PromptOptimizer.tsx:55:        <Card className="flex-1 bg-white/[0.03] border border-white/[0.06] p-1 relative group">
src/components//tools/PromptOptimizer.tsx:98:        <Card className="flex-1 bg-white/40 border-green-500/30 p-1 relative overflow-hidden">
src/components//tools/PromptOptimizer.tsx:100:                <div className="absolute inset-0 z-10 bg-white/60 backdrop-blur-sm flex items-center justify-center">
src/components//tools/RagVisualizer.tsx:47:        <Card className="p-6 bg-white/[0.03] border border-white/[0.06] space-y-6">
src/components//tools/RagVisualizer.tsx:83:        <Card className="p-6 bg-white/[0.03] border border-white/[0.06]">
src/components//tools/RagVisualizer.tsx:103:            className="bg-white/[0.03] border-white/[0.06] min-h-[100px] text-slate-300"
src/components//tools/ToolsShell.tsx:42:          "flex-shrink-0 border-r border-white/[0.06] bg-white/[0.03] transition-all duration-300 ease-in-out overflow-y-auto custom-scrollbar",
src/components//tools/ToolsShell.tsx:79:                                    className="p-4 rounded-none border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/[0.12] transition group"
src/components//tools/TokenCounter.tsx:37:        <Card className="bg-white/[0.03] border border-white/[0.06] p-1">
src/components//tools/TokenCounter.tsx:66:            <Card className="bg-white/[0.03] border border-white/[0.06] p-4 text-center">
src/components//tools/TokenCounter.tsx:70:            <Card className="bg-white/[0.03] border border-white/[0.06] p-4 text-center">
src/components//ResourceCard.tsx:25:      className={`group relative flex flex-col sm:flex-row items-start sm:items-center bg-white/[0.03] border rounded-none overflow-hidden hover:border-blue-500/40 transition-all duration-200 focus-within:ring-1 focus-within:ring-blue-500/50 focus-within:ring-offset-1 focus-within:ring-offset-black ${
src/components//ShareBar.tsx:55:          className="px-4 py-2 bg-white/[0.03] border border-white/[0.06] text-xs font-mono text-gray-400 hover:text-white hover:border-white/20 transition-all rounded-none"
src/components//ShareBar.tsx:63:        className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.03] border border-white/[0.06] text-xs font-mono text-gray-400 hover:text-white hover:border-white/20 transition-all rounded-none"
src/components//NewsletterCapture.tsx:47:      <div className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-5 relative overflow-hidden group">
src/components//NewsletterCapture.tsx:61:            className="w-full bg-white/[0.06] border border-white/[0.08] rounded-lg px-4 py-2.5 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-white/[0.25] transition-all mb-2"
src/components//NewsletterCapture.tsx:65:            className="w-full bg-white/[0.08] hover:bg-white/[0.15] disabled:opacity-50 text-white text-[10px] font-black uppercase tracking-[0.2em] py-2.5 rounded-lg transition-all flex items-center justify-center gap-2"
src/components//NewsletterCapture.tsx:104:                className="w-full bg-white/[0.03] border border-white/[0.08] rounded-2xl pl-12 pr-4 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-white/[0.25] transition-all font-mono text-sm"
src/components//NewsletterCapture.tsx:109:              className="px-8 py-4 bg-white/[0.08] text-white font-black rounded-2xl hover:bg-white/[0.15] disabled:opacity-50 transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-2 shadow-xl shadow-white/5"
src/components//AdvertiseClient.tsx:42:  const inputClasses = "w-full bg-white/5 border border-white/10 rounded-none px-4 py-3.5 text-base text-white placeholder:text-gray-600 focus:border-white/30 transition-all outline-none font-medium";
src/components//AdvertiseClient.tsx:57:      <div className="bg-white/[0.03] border border-white/[0.06] rounded-none p-8">
src/components//AdvertiseClient.tsx:106:            className="w-full py-4 bg-white hover:bg-gray-100 text-black font-black rounded-none transition-all uppercase tracking-[0.15em] text-xs flex items-center justify-center gap-3"
src/components//SponsoredCard.tsx:14:        className="group relative flex flex-col sm:flex-row items-start sm:items-center bg-white/[0.03] border border-white/[0.06] rounded-none overflow-hidden hover:border-white/20 transition-all duration-300 min-h-[140px]"
src/components//SponsoredCard.tsx:16:        <div className="absolute top-0 right-0 z-30 flex items-center px-2 py-1 bg-white/[0.03] border-b border-l border-white/[0.06] rounded-none">
src/components//SponsoredCard.tsx:29:              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-none bg-white/[0.06] flex items-center justify-center">
src/components//SponsoredCard.tsx:58:      className="group relative flex flex-col sm:flex-row items-start sm:items-center bg-white/[0.02] border border-dashed border-white/[0.06] rounded-none overflow-hidden hover:border-white/20 transition-all duration-300"
src/components//SponsoredCard.tsx:60:      <div className="absolute top-0 right-0 z-30 flex items-center px-2 py-1 bg-white/[0.03] border-b border-l border-white/[0.06] rounded-none">
src/components//SponsoredCard.tsx:66:          <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-none bg-white/[0.04] flex items-center justify-center">
src/components//CategorySponsorBanner.tsx:11:        className="group flex items-center gap-4 w-full bg-white/[0.02] border border-dashed border-white/[0.06] hover:border-white/[0.15] transition-all duration-200 px-5 py-3 mb-6"
src/components//CategorySponsorBanner.tsx:14:        <div className="w-px h-4 bg-white/[0.06] shrink-0" />
src/components//CategorySponsorBanner.tsx:30:      className="group flex items-center gap-4 w-full bg-white/[0.03] border border-white/[0.06] rounded-none px-5 py-3 mb-6 hover:border-white/20 transition-all duration-200"
src/components//CategorySponsorBanner.tsx:34:      <div className="w-px h-4 bg-white/[0.08] shrink-0" />
src/components//SponsorBadge.tsx:11:        className="fixed top-1/2 -translate-y-1/2 right-4 z-40 flex flex-col bg-white/[0.04] border border-dashed border-white/[0.08] backdrop-blur-sm p-3 shadow-xl hover:bg-white/[0.07] hover:border-white/[0.15] transition-all"
src/components//SponsorBadge.tsx:24:      className="fixed top-1/2 -translate-y-1/2 right-4 z-40 flex flex-col bg-white/[0.05] border border-white/[0.08] backdrop-blur-sm rounded-none p-3 shadow-xl hover:bg-white/[0.08] transition-all"
src/components//ThreeValueCards.tsx:42:          className="border border-slate-200 rounded-lg p-6 hover:bg-slate-100 transition-all duration-300 backdrop-blur-sm"
src/components//CitationBlock.tsx:15:    <div className="bg-white/[0.03] border border-white/[0.06] rounded-none p-6 mb-12 relative overflow-hidden group">
src/components//CitationBlock.tsx:41:          <div className="p-4 bg-white/[0.03] border border-white/[0.06] rounded-none">
src/components//CitationBlock.tsx:45:          <div className="p-4 bg-white/[0.03] border border-white/[0.06] rounded-none">
src/components//HeroSearch.tsx:13:        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-slate-200 mb-8 animate-fade-in">
src/components//HeroSearch.tsx:29:          <Suspense fallback={<div className="h-16 w-full bg-white/[0.03] rounded-2xl animate-pulse" />}>
src/components//HeroSearch.tsx:39:              className="px-3 py-1.5 rounded-md bg-white/[0.02] border border-slate-200 text-[10px] font-bold hover:text-slate-900 hover:bg-slate-100 transition-all"
src/components//Dropdown.tsx:62:                    className={`flex items-center justify-between px-4 py-2.5 text-[11px] font-medium transition-all hover:bg-white/[0.06] ${
src/components//Dropdown.tsx:63:                      isChildActive ? 'text-white bg-white/[0.08]' : 'text-slate-400 hover:text-white'
src/components//CopyButton.tsx:18:      className="flex items-center gap-2 px-4 py-2 text-xs font-bold bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-none transition-all"
src/components//HeroSection.tsx:21:            className="inline-block px-8 py-3 bg-white text-black font-black text-sm uppercase tracking-widest hover:bg-gray-100 transition-colors"
src/components//Header.tsx:17:          <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center group-hover:bg-gray-100 transition-all duration-300 relative overflow-hidden animate-logo-shine">
src/components//Header.tsx:33:            <div className="w-full bg-white/[0.05] border border-white/[0.06] rounded-full h-9" />
src/components//Header.tsx:48:              className="flex items-center justify-center px-3 py-1 bg-white/[0.08] hover:bg-white/[0.15] text-white text-[11px] font-semibold tracking-wide rounded-md transition-all whitespace-nowrap"
src/components//AdminSubmissionQueue.tsx:54:        <div className="bg-white/[0.03] border border-white/[0.06] rounded-none p-8">
src/components//AdminSubmissionQueue.tsx:66:          className="bg-white/[0.03] border border-white/[0.06] rounded-none overflow-hidden hover:border-white/[0.12] transition-colors"
src/components//AdminSubmissionQueue.tsx:79:                    : 'bg-gray-500/20 text-slate-400'
src/components//AdminSubmissionQueue.tsx:103:            <div className="border-t border-white/[0.06] bg-white/[0.03] p-6 space-y-4">
src/components//AdminSubmissionQueue.tsx:175:                    className="w-full bg-white/[0.03] border border-white/[0.06] rounded-none px-4 py-3 text-white text-sm placeholder:text-gray-600 focus:border-emerald-500/50 outline-none resize-none"
src/components//LoadMoreResourceGrid.tsx:96:      { name: 'Vercel', color: 'bg-white' },
src/components//LoadMoreResourceGrid.tsx:142:            className="flex items-center gap-3 px-8 py-4 bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] hover:border-blue-500/50 text-white font-bold uppercase tracking-widest rounded-none transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
src/components//MobileMenu.tsx:80:                <div className="h-px w-full bg-white/[0.08] my-1" />
src/components//MobileMenu.tsx:90:            <div className="h-px w-full bg-white/[0.08]" />
src/components//SearchInput.tsx:89:        'flex items-center bg-white/[0.06] border border-white/[0.08] focus-within:border-white/[0.25] transition-all'
src/components//SearchInput.tsx:151:                ? 'text-white bg-white/[0.08]'
src/components//SearchInput.tsx:152:                : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
src/components//SearchInput.tsx:165:                  ? 'text-white bg-white/[0.08] font-semibold'
src/components//SearchInput.tsx:166:                  : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
src/app//tools/page.tsx:74:              className="group block p-6 rounded-none border border-white/[0.06] hover:border-white/[0.12] transition-all bg-white/[0.02]"
src/app//privacy/page.tsx:8:    <div className="min-h-screen bg-black flex flex-col selection:bg-white/10">
src/app//privacy/page.tsx:12:          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center group-hover:bg-gray-200 transition-all">
src/app//submit/page.tsx:13:    <div className="min-h-screen bg-black flex flex-col selection:bg-white/10">
src/app//terms/page.tsx:8:    <div className="min-h-screen bg-black flex flex-col selection:bg-white/10">
src/app//terms/page.tsx:12:          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center group-hover:bg-gray-200 transition-all">
src/app//advertise/page.tsx:104:    <div className="min-h-screen bg-black text-white selection:bg-white/20">
src/app//advertise/page.tsx:116:          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-gray-400 mb-8">
src/app//advertise/page.tsx:144:              <div key={i} className="p-6 bg-white/[0.03] border border-white/[0.06] text-center">
src/app//advertise/page.tsx:177:              <div key={i} className="p-6 bg-white/[0.03] border border-white/[0.06]">
src/app//advertise/page.tsx:198:                className="p-6 md:p-8 bg-white/[0.03] border border-white/[0.06] flex flex-col md:flex-row md:items-start gap-6"
src/app//advertise/page.tsx:226:                    className="px-5 py-2.5 bg-white text-black text-xs font-black uppercase tracking-widest hover:bg-gray-100 transition-colors"
src/app//t/[slug]/page.tsx:179:    <div className="min-h-screen bg-black flex flex-col selection:bg-white/10">
src/app//t/[slug]/page.tsx:212:                  <div className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-white/5 text-blue-500 border border-blue-500/20 uppercase tracking-widest font-mono">
src/app//t/[slug]/page.tsx:232:                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-gray-200 text-black font-bold rounded-none shadow-xl transition-all active:scale-95 text-center min-w-[200px]"
src/app//t/[slug]/page.tsx:283:                    className="px-4 py-1.5 bg-white/5 text-gray-400 border border-white/5 rounded-full text-xs font-mono lowercase"
src/app//error.tsx:34:          className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-2xl hover:bg-red-500 hover:text-white transition-all group"
src/app//google-antigravity/page.tsx:94:            <Link href="/" className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-semibold transition-all flex items-center gap-2">
src/app//google-antigravity/page.tsx:234:            <Link href="/" className="inline-flex items-center justify-center px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-all text-lg shadow-xl shadow-blue-900/20">
src/app//not-found.tsx:8:    <div className="min-h-screen bg-black flex flex-col selection:bg-white/10">
src/app//not-found.tsx:15:          <div className="relative w-24 h-24 bg-white/5 rounded-[32px] border border-gray-800 flex items-center justify-center mb-8 mx-auto">
src/app//not-found.tsx:33:            className="group flex items-center justify-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-2xl hover:bg-blue-600 hover:text-white transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-blue-500/20"
src/app//not-found.tsx:40:            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 text-white border border-white/10 font-black rounded-2xl hover:bg-white/10 transition-all uppercase tracking-widest text-xs active:scale-95"

rounded-2xl/3xl/xl results: 
src/components//BadgeGenerator.tsx:44:          <div className="absolute inset-[1px] rounded-[7px] border border-slate-700 pointer-events-none" />
src/components//ui/card.tsx:12:      "rounded-xl border bg-card text-card-foreground shadow",
src/components//SubmitForm.tsx:42:  const inputClasses = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-base text-white placeholder:text-gray-600 focus:border-white/30 transition-all outline-none font-medium";
src/components//SubmitForm.tsx:56:      <div className="bg-white/[0.03] border border-white/[0.06] rounded-3xl p-8">
src/components//SubmitForm.tsx:58:          <div className={`mb-8 p-4 rounded-xl flex items-center gap-3 text-sm font-bold border ${
src/components//SubmitForm.tsx:108:              className="w-full py-4 bg-white hover:bg-gray-100 text-black font-black rounded-xl transition-all uppercase tracking-[0.15em] text-xs flex items-center justify-center gap-3"
src/components//NewsletterCapture.tsx:35:      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-[2rem] p-12 text-center animate-in zoom-in duration-500">
src/components//NewsletterCapture.tsx:36:        <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/20">
src/components//NewsletterCapture.tsx:47:      <div className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-5 relative overflow-hidden group">
src/components//NewsletterCapture.tsx:75:    <section className="relative overflow-hidden py-16 rounded-2xl">
src/components//NewsletterCapture.tsx:77:      <div className="absolute inset-0 bg-transparent border border-white/[0.08] rounded-2xl" />
src/components//NewsletterCapture.tsx:104:                className="w-full bg-white/[0.03] border border-white/[0.08] rounded-2xl pl-12 pr-4 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-white/[0.25] transition-all font-mono text-sm"
src/components//NewsletterCapture.tsx:109:              className="px-8 py-4 bg-white/[0.08] text-white font-black rounded-2xl hover:bg-white/[0.15] disabled:opacity-50 transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-2 shadow-xl shadow-white/5"
src/components//HeroSearch.tsx:29:          <Suspense fallback={<div className="h-16 w-full bg-white/[0.03] rounded-2xl animate-pulse" />}>
src/components//Dropdown.tsx:53:          <div className="bg-black/95 border border-white/[0.08] rounded-xl shadow-2xl overflow-hidden backdrop-blur-xl">
src/app//tools/roi-calculator/page.tsx:34:            <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
src/app//tools/token-counter/page.tsx:34:            <div className="p-3 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
src/app//tools/rag-visualizer/page.tsx:34:            <div className="p-3 bg-orange-500/10 rounded-xl border border-orange-500/20">
src/app//tools/prompt-generator/page.tsx:34:            <div className="p-3 bg-purple-500/10 rounded-xl border border-purple-500/20">
src/app//privacy/page.tsx:12:          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center group-hover:bg-gray-200 transition-all">
src/app//privacy/page.tsx:21:        <div className="bg-[#0A0A0A] border border-gray-900 rounded-[32px] p-8 md:p-12">
src/app//terms/page.tsx:12:          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center group-hover:bg-gray-200 transition-all">
src/app//terms/page.tsx:21:        <div className="bg-[#0A0A0A] border border-gray-900 rounded-[32px] p-8 md:p-12">
src/app//layout.tsx:98:            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-blue-600 focus:text-white focus:font-bold focus:rounded-xl focus:shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition-all"
src/app//error.tsx:21:      <div className="w-20 h-20 bg-red-500/10 rounded-3xl flex items-center justify-center mb-8 border border-red-500/20">
src/app//error.tsx:34:          className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-2xl hover:bg-red-500 hover:text-white transition-all group"
src/app//error.tsx:42:          className="flex items-center justify-center gap-2 px-8 py-4 bg-gray-900 text-white font-bold rounded-2xl border border-gray-800 hover:bg-gray-800 transition-all"
src/app//google-antigravity/page.tsx:91:            <Link href="#getting-started" className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all">
src/app//google-antigravity/page.tsx:94:            <Link href="/" className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-semibold transition-all flex items-center gap-2">
src/app//google-antigravity/page.tsx:139:              <div className="p-6 rounded-2xl bg-[#0A0A0A] border border-white/10 hover:border-blue-500/30 transition-all">
src/app//google-antigravity/page.tsx:145:              <div className="p-6 rounded-2xl bg-[#0A0A0A] border border-white/10 hover:border-blue-500/30 transition-all">
src/app//google-antigravity/page.tsx:151:              <div className="p-6 rounded-2xl bg-[#0A0A0A] border border-white/10 hover:border-blue-500/30 transition-all">
src/app//google-antigravity/page.tsx:157:              <div className="p-6 rounded-2xl bg-[#0A0A0A] border border-white/10 hover:border-blue-500/30 transition-all">
src/app//google-antigravity/page.tsx:194:              <Link href="/" className="group p-4 bg-[#0A0A0A] border border-white/10 rounded-xl hover:border-blue-500/50 transition-all">
src/app//google-antigravity/page.tsx:198:              <Link href="/" className="group p-4 bg-[#0A0A0A] border border-white/10 rounded-xl hover:border-blue-500/50 transition-all">
src/app//google-antigravity/page.tsx:202:              <Link href="/" className="group p-4 bg-[#0A0A0A] border border-white/10 rounded-xl hover:border-blue-500/50 transition-all">
src/app//google-antigravity/page.tsx:206:              <Link href="/" className="group p-4 bg-[#0A0A0A] border border-white/10 rounded-xl hover:border-blue-500/50 transition-all">
src/app//google-antigravity/page.tsx:231:          <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-2xl p-8 text-center border border-white/10">
src/app//google-antigravity/page.tsx:234:            <Link href="/" className="inline-flex items-center justify-center px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-all text-lg shadow-xl shadow-blue-900/20">
src/app//not-found.tsx:15:          <div className="relative w-24 h-24 bg-white/5 rounded-[32px] border border-gray-800 flex items-center justify-center mb-8 mx-auto">
src/app//not-found.tsx:33:            className="group flex items-center justify-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-2xl hover:bg-blue-600 hover:text-white transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-blue-500/20"
src/app//not-found.tsx:40:            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 text-white border border-white/10 font-black rounded-2xl hover:bg-white/10 transition-all uppercase tracking-widest text-xs active:scale-95"

Sign In/signIn/BookmarkButton results:
CLEAN

--- BUGS SPOTTED (report only, do not fix) ---
1. NewsletterCapture.tsx was not deleted.
2. HTTP requests to production without trailing slashes appear to return a 307 redirect across all URLs.
3. Banned patterns for background colours (`bg-white` and variations) and borders (`rounded-xl` and variations) are still appearing heavily in `src/components/` and `src/app/`.
