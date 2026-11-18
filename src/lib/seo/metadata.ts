import type { Metadata } from 'next';
import { getPageById } from '@/config/pages';

export function getPageMetadata(pageId: string): Metadata {
  const page = getPageById(pageId);
  if (!page) {
    return {
      title: 'Pay — Accurate Calculators',
      description: 'Free, verified salary deduction and mobile money calculators.',
    };
  }

  const canonicalUrl = `https://pay.zetawala.com${page.path}`;
  const ogImageUrl = `https://pay.zetawala.com/og/${page.id}.png`;

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url: canonicalUrl,
      siteName: 'Pay',
      locale: 'en_US',
      type: page.type === 'guide' ? 'article' : 'website',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: page.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.description,
      images: [ogImageUrl],
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
  };
}
