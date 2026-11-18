import type { Metadata } from 'next';
import { IBM_Plex_Sans } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const ibmPlexSans = IBM_Plex_Sans({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-ibm-plex-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://pay.zetawala.com'),
  title: {
    template: '%s | Pay',
    default: 'Pay — Free & Accurate Calculators for Philippines, Kenya, Uganda & Nigeria',
  },
  description:
    'Free, verified salary deduction calculators, mobile money tariff finders, and university grade calculators. Official legal rates in force for 2026.',
  icons: {
    icon: '/images/pay-logo.png',
    apple: '/images/pay-logo.png',
  },
};

const siteWideSchema = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Pay',
    url: 'https://pay.zetawala.com',
    description: 'Free, verified financial and academic calculators for the Philippines, Kenya, Uganda, and Nigeria.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://pay.zetawala.com/sitemap/',
      'query-input': 'required name=search_term_string',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Pay',
    url: 'https://pay.zetawala.com',
    logo: 'https://pay.zetawala.com/images/pay-logo.png',
    parentOrganization: {
      '@type': 'Organization',
      name: 'Zetawala',
      url: 'https://zetawala.com',
    },
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cfAnalyticsToken = process.env.NEXT_PUBLIC_CF_ANALYTICS_TOKEN;

  return (
    <html lang="en" className={ibmPlexSans.variable}>
      <head>
        {siteWideSchema.map((schema, idx) => (
          <script
            key={idx}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
        {cfAnalyticsToken && (
          <Script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={JSON.stringify({ token: cfAnalyticsToken })}
            strategy="afterInteractive"
          />
        )}
      </head>
      <body className="min-h-screen flex flex-col bg-surface-page text-content-primary antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
