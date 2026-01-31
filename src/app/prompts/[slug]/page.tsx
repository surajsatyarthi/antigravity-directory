
import { PROMPTS } from '@/lib/prompts';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { safeJsonLd } from '@/lib/utils/safeJsonLd';
import { PromptDetailView } from '@/components/PromptDetailView';

// Prerender all paths at build time (Checkmate, 404s!)
export async function generateStaticParams() {
  return Object.keys(PROMPTS).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const prompt = PROMPTS[slug as keyof typeof PROMPTS];

  if (!prompt) {
    return {
      title: 'Prompt Not Found | Antigravity Directory',
    };
  }

  return {
    title: prompt.title,
    description: prompt.description,
  };
}

export default async function PromptPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const prompt = PROMPTS[slug as keyof typeof PROMPTS];

  if (!prompt) {
    return notFound();
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLd({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": prompt.title,
            "applicationCategory": "DeveloperApplication",
            "operatingSystem": "Any",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          })
        }}
      />
      <PromptDetailView prompt={prompt} />
    </>
  );
}
