import type { Metadata } from 'next';
import { IBM_Plex_Sans } from 'next/font/google';
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
    default: 'Pay — Accurate Salary, Mobile Money & Student Calculators',
  },
  description:
    'Free, verified financial and academic calculators for the Philippines, Kenya, Uganda, and Nigeria. Official rates and fee schedules in force for 2026.',
  icons: {
    icon: '/images/pay-logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={ibmPlexSans.variable}>
      <body className="min-h-screen flex flex-col bg-surface-page text-content-primary antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
