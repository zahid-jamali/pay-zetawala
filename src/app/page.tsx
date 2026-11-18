import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { PAGES, getPagesByCountry } from '@/config/pages';
import { CountryNav } from '@/components/CountryNav';
import { FaqAccordion } from '@/components/FaqAccordion';
import { ShieldCheck, ArrowRight, Zap, Lock, BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Pay — Free & Accurate Calculators for Philippines, Kenya, Uganda & Nigeria',
  description:
    'Free, verified salary deduction calculators, mobile money tariff finders, and university grade calculators. Up to date for 2026.',
};

export default function HomePage() {
  const phTools = getPagesByCountry('ph').filter(p => p.type === 'tool').slice(0, 4);
  const keTools = getPagesByCountry('ke').filter(p => p.type === 'tool').slice(0, 4);
  const ugTools = getPagesByCountry('ug').filter(p => p.type === 'tool').slice(0, 3);
  const ngTools = getPagesByCountry('ng').filter(p => p.type === 'tool').slice(0, 4);

  const homeFaqs = [
    {
      question: 'Are all calculation rates updated for 2026?',
      answer:
        'Yes. Every calculation rate on Pay is verified against official government circulars and published regulatory schedules in force in 2026. This includes the SSS 15% contribution rate and ₱35k MSC cap, PhilHealth 5% premium, Pag-IBIG ₱200 cap, BIR TRAIN withholding taxes, Safaricom M-PESA 15% excise duty tariffs, Uganda MoMo 0.5% statutory cash-out tax, and NUC/NBTE grading standards.',
    },
    {
      question: 'Is my salary or financial data kept private?',
      answer:
        '100% private. All calculations run client-side directly inside your web browser. No numbers, salaries, or grade entries are ever sent to a server, stored in a database, or tracked with advertising cookies.',
    },
    {
      question: 'Can I print or share my calculation results?',
      answer:
        'Yes. Every calculator includes built-in one-click buttons to copy the formatted text summary to your clipboard, share via WhatsApp or mobile Web Share, or generate a clean print/PDF layout.',
    },
  ];

  return (
    <div>
      <CountryNav />

      {/* Hero Section */}
      <section className="border-b border-neutral-200 bg-linear-to-b from-white to-neutral-50/50 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft px-3 py-1 text-xs font-semibold text-brand-strong mb-4">
              <ShieldCheck className="h-3.5 w-3.5 text-brand" />
              <span>Verified Legal Rates for 2026</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 leading-[1.15]">
              Calm, accurate financial & grading calculators.
            </h1>
            <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed">
              Compute your exact take-home pay, mobile money transfer fees, and university grade points. Free, fast, and verified against official primary sources.
            </p>
          </div>

          {/* Quick Country Grid */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {siteConfig.supportedCountries.map(country => (
              <Link
                key={country.code}
                href={country.path}
                className="group relative flex flex-col justify-between rounded-xl border border-neutral-200 bg-white p-5 shadow-2xs hover:border-brand-strong hover:shadow-md transition-all"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{country.flag}</span>
                    <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
                      {country.currency}
                    </span>
                  </div>
                  <h2 className="mt-3 text-lg font-bold text-neutral-900 group-hover:text-brand-strong transition-colors">
                    {country.name}
                  </h2>
                  <p className="mt-1 text-xs text-neutral-600">
                    {country.code === 'ph' && 'Salary, SSS, PhilHealth, Pag-IBIG & Tax'}
                    {country.code === 'ke' && 'M-PESA tariffs, Fuliza & M-Shwari'}
                    {country.code === 'ug' && 'MTN MoMo, Airtel Money & 0.5% Tax'}
                    {country.code === 'ng' && 'University (5.0) & Poly (4.0) CGPA'}
                  </p>
                </div>
                <div className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-brand-strong">
                  <span>Browse calculators</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Tools By Country */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-16">
          {/* Philippines Section */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">🇵🇭</span>
                <div>
                  <h2 className="text-xl font-bold text-neutral-900">Philippines Payroll & Contributions</h2>
                  <p className="text-xs text-neutral-500">In force 2026: SSS 15% rate, PhilHealth 5%, Pag-IBIG ₱200 cap, TRAIN Law</p>
                </div>
              </div>
              <Link href="/philippines/" className="text-xs font-semibold text-brand-strong hover:underline flex items-center gap-1">
                <span>View all PH tools</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {phTools.map(tool => (
                <Link
                  key={tool.id}
                  href={tool.path}
                  className="rounded-lg border border-neutral-200 bg-white p-4 shadow-2xs hover:border-brand-strong hover:shadow-xs transition-all flex flex-col justify-between"
                >
                  <div>
                    <h3 className="font-bold text-sm text-neutral-900 hover:text-brand-strong">{tool.shortTitle}</h3>
                    <p className="mt-1 text-xs text-neutral-600 line-clamp-2">{tool.description}</p>
                  </div>
                  <div className="mt-3 text-xs font-semibold text-brand-strong">Calculate &rarr;</div>
                </Link>
              ))}
            </div>
          </div>

          {/* Kenya Section */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">🇰🇪</span>
                <div>
                  <h2 className="text-xl font-bold text-neutral-900">Kenya Safaricom M-PESA & Credit</h2>
                  <p className="text-xs text-neutral-500">Official tariffs inclusive of 15% excise duty under Finance Act</p>
                </div>
              </div>
              <Link href="/kenya/" className="text-xs font-semibold text-brand-strong hover:underline flex items-center gap-1">
                <span>View all KE tools</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {keTools.map(tool => (
                <Link
                  key={tool.id}
                  href={tool.path}
                  className="rounded-lg border border-neutral-200 bg-white p-4 shadow-2xs hover:border-brand-strong hover:shadow-xs transition-all flex flex-col justify-between"
                >
                  <div>
                    <h3 className="font-bold text-sm text-neutral-900 hover:text-brand-strong">{tool.shortTitle}</h3>
                    <p className="mt-1 text-xs text-neutral-600 line-clamp-2">{tool.description}</p>
                  </div>
                  <div className="mt-3 text-xs font-semibold text-brand-strong">Calculate &rarr;</div>
                </Link>
              ))}
            </div>
          </div>

          {/* Uganda & Nigeria Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Uganda */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🇺🇬</span>
                  <h2 className="text-lg font-bold text-neutral-900">Uganda Mobile Money</h2>
                </div>
                <Link href="/uganda/" className="text-xs font-semibold text-brand-strong hover:underline">
                  All Uganda tools &rarr;
                </Link>
              </div>
              <div className="space-y-3">
                {ugTools.map(tool => (
                  <Link
                    key={tool.id}
                    href={tool.path}
                    className="block rounded-lg border border-neutral-200 bg-white p-3.5 shadow-2xs hover:border-brand-strong transition-all"
                  >
                    <h3 className="font-bold text-sm text-neutral-900">{tool.shortTitle}</h3>
                    <p className="mt-1 text-xs text-neutral-600">{tool.description}</p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Nigeria */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🇳🇬</span>
                  <h2 className="text-lg font-bold text-neutral-900">Nigeria CGPA Grading</h2>
                </div>
                <Link href="/nigeria/" className="text-xs font-semibold text-brand-strong hover:underline">
                  All Nigeria tools &rarr;
                </Link>
              </div>
              <div className="space-y-3">
                {ngTools.map(tool => (
                  <Link
                    key={tool.id}
                    href={tool.path}
                    className="block rounded-lg border border-neutral-200 bg-white p-3.5 shadow-2xs hover:border-brand-strong transition-all"
                  >
                    <h3 className="font-bold text-sm text-neutral-900">{tool.shortTitle}</h3>
                    <p className="mt-1 text-xs text-neutral-600">{tool.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Value Props & Trust Badges */}
          <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-6 sm:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <ShieldCheck className="h-5 w-5 text-brand shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-neutral-900">Primary Official Sources</h3>
                  <p className="mt-1 text-xs text-neutral-600">
                    No recycled blog numbers. Every rate is transcribed directly from primary agency circulars and audited against test vectors.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Lock className="h-5 w-5 text-brand shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-neutral-900">100% Client-Side Privacy</h3>
                  <p className="mt-1 text-xs text-neutral-600">
                    Calculations run locally in your browser. No personal payroll, loan, or academic records leave your machine.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Zap className="h-5 w-5 text-brand shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-neutral-900">Instant & Offline-Ready</h3>
                  <p className="mt-1 text-xs text-neutral-600">
                    Lightweight static pages optimized for mobile connections. No bloated scripts, no popups, no delay.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <FaqAccordion faqs={homeFaqs} />
        </div>
      </section>
    </div>
  );
}
