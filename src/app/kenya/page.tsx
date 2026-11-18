import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { getPagesByCountry } from '@/config/pages';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { FaqAccordion } from '@/components/FaqAccordion';
import { ArrowRight, ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Kenya M-PESA Charges, Fuliza & Loan Calculators 2026 | Pay',
  description:
    'Free Kenya calculators for Safaricom M-PESA transfer fees, agent & ATM withdrawals, Paybill, Fuliza overdraft costs, and M-Shwari loans. 2026 tariffs.',
};

export default function KenyaHubPage() {
  const tools = getPagesByCountry('ke').filter(p => p.type === 'tool');
  const infoPages = getPagesByCountry('ke').filter(p => p.type === 'info');

  const faqs = [
    {
      question: 'Do published Safaricom M-PESA tariffs include excise duty?',
      answer:
        'Yes. All published Safaricom M-PESA customer tariffs <strong>already include the mandatory 15% excise duty</strong> on money transfer services pursuant to the Finance Act 2023. You do not need to add any additional taxes to the displayed charges.',
    },
    {
      question: 'Are transfers from M-PESA to Airtel Money charged extra?',
      answer:
        'No. Under Safaricom’s current interoperability tariff schedule, transfers to other mobile network users (such as Airtel Money Kenya) are <strong>harmonized at the exact same rates</strong> as sending to other registered M-PESA users.',
    },
    {
      question: 'How do Fuliza daily maintenance fees work in 2026?',
      answer:
        'Fuliza charges an upfront access fee of 1.0% on the overdraft amount. For overdraft balances between KES 101 and KES 1,000, Safaricom provides a <strong>100% free 3-day grace period</strong> with KES 0 daily maintenance fee if repaid within 3 days. Balances above KES 1,000 are charged standard daily maintenance fees ranging from KES 21.60 to KES 30.00/day.',
    },
    {
      question: 'What are the single transaction and daily limits on M-PESA?',
      answer:
        'The maximum allowed per single transaction is <strong>KES 250,000</strong>. The maximum daily transaction limit and account balance ceiling is <strong>KES 500,000</strong>.',
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <Breadcrumbs items={[{ label: 'Kenya' }]} />

      <div className="border-b border-neutral-200 pb-8 pt-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft px-3 py-1 text-xs font-semibold text-brand-strong mb-3">
          <ShieldCheck className="h-3.5 w-3.5 text-brand" />
          <span>Official 2026 Safaricom PLC Tariffs</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
          Kenya M-PESA Charges & Mobile Credit Calculators
        </h1>
        <p className="mt-3 text-base text-neutral-600 max-w-3xl leading-relaxed">
          Look up exact fees for sending money, agent and ATM withdrawals, Paybill merchant payments, Fuliza overdrafts, and M-Shwari loans. All tariffs are verified directly against Safaricom PLC official fee schedules and include 15% excise duty.
        </p>
      </div>

      {/* Main Tools Grid */}
      <div className="mt-10">
        <h2 className="text-xl font-bold text-neutral-900 mb-6">
          Calculators & Interactive Tools
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {tools.map(tool => (
            <Link
              key={tool.id}
              href={tool.path}
              className="group flex flex-col justify-between rounded-xl border border-neutral-200 bg-white p-6 shadow-2xs hover:border-brand-strong hover:shadow-md transition-all"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-neutral-500 mb-2">
                  <span>{tool.category}</span>
                  <span className="text-brand-strong font-bold">2026</span>
                </div>
                <h3 className="text-lg font-bold text-neutral-900 group-hover:text-brand-strong transition-colors">
                  {tool.shortTitle}
                </h3>
                <p className="mt-2 text-xs text-neutral-600 leading-relaxed">
                  {tool.description}
                </p>
              </div>
              <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-brand-strong">
                <span>Open calculator</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Official Tariff Tables */}
      <div className="mt-12">
        <h2 className="text-xl font-bold text-neutral-900 mb-6">
          Official Tariff Schedules
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {infoPages.map(page => (
            <Link
              key={page.id}
              href={page.path}
              className="group flex items-start gap-4 rounded-xl border border-neutral-200 bg-white p-5 shadow-2xs hover:border-brand-strong hover:shadow-sm transition-all"
            >
              <div className="rounded-lg bg-neutral-100 p-3 text-neutral-700 group-hover:bg-brand-soft group-hover:text-brand-strong transition-colors shrink-0">
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-neutral-900 group-hover:text-brand-strong transition-colors">
                  {page.shortTitle}
                </h3>
                <p className="mt-1 text-xs text-neutral-600 leading-relaxed">
                  {page.description}
                </p>
                <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-brand-strong">
                  <span>View full official table</span>
                  <ArrowRight className="h-3 w-3" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Primary Rules Highlights */}
      <div className="mt-12 rounded-xl border border-neutral-200 bg-neutral-50 p-6 sm:p-8">
        <h2 className="text-lg font-bold text-neutral-900 mb-4">
          Key Kenya Mobile Money Rules (2026)
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-neutral-700 leading-relaxed">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-brand shrink-0 mt-0.5" />
            <div>
              <strong>Free Send Tier:</strong> Transfers of KES 1 to KES 49 to any mobile network are 100% free of charge.
            </div>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-brand shrink-0 mt-0.5" />
            <div>
              <strong>Buy Goods is Free:</strong> Customer payments made to Buy Goods Till numbers are 100% free to the consumer.
            </div>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-brand shrink-0 mt-0.5" />
            <div>
              <strong>Fuliza 3-Day Grace Window:</strong> Overdraft amounts between KES 101 and KES 1,000 carry zero daily fees for the first 3 days.
            </div>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-brand shrink-0 mt-0.5" />
            <div>
              <strong>M-Shwari 30-Day Term:</strong> 7.5% facilitation fee + 1.5% excise duty deducted upfront from loan disbursement.
            </div>
          </div>
        </div>
      </div>

      <FaqAccordion faqs={faqs} />
    </div>
  );
}
