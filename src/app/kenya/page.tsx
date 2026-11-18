import React from 'react';
import Link from 'next/link';
import { getPagesByCountry } from '@/config/pages';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { FaqAccordion } from '@/components/FaqAccordion';
import { StructuredData } from '@/components/StructuredData';
import { getKeRates } from '@/lib/seo/rules-content';
import { ArrowRight, ShieldCheck, FileText, Calculator, BookOpen, HelpCircle } from 'lucide-react';

export default function KenyaHubPage() {
  const keRates = getKeRates();
  const tools = getPagesByCountry('ke').filter((p) => p.type === 'tool');
  const infoPages = getPagesByCountry('ke').filter((p) => p.type === 'info');
  const guides = getPagesByCountry('ke').filter((p) => p.type === 'guide');

  const faqs = [
    {
      question: 'Do published Safaricom M-PESA tariffs include excise duty in 2026?',
      answer:
        `Yes. All published Safaricom M-PESA customer tariffs already include the mandatory ${keRates.exciseDutyRate}% excise duty on mobile money transfer services pursuant to the Kenya Finance Act. You do not need to add any additional tax to the displayed charges.`,
    },
    {
      question: 'Are transfers from M-PESA to Airtel Money or Telkom charged extra?',
      answer:
        'Safaricom maintains an official interoperability tariff band for sending to other mobile networks (Airtel Money and Telkom T-Kash). While transfers under KES 100 remain low or zero-rated, transfers above KES 100 carry separate published tariffs that are fully calculated by our tools.',
    },
    {
      question: 'How do Fuliza daily maintenance fees work in 2026?',
      answer:
        'Fuliza charges an upfront access fee of 1.0% on the overdraft amount. For overdraft balances between KES 101 and KES 1,000, Safaricom provides a 100% free 3-day grace period with KES 0 daily maintenance fee if repaid within 3 days. Balances above KES 1,000 accrue standard daily maintenance fees up to KES 25.00/day.',
    },
    {
      question: 'What are the single transaction and daily limits on M-PESA?',
      answer:
        `Under Central Bank of Kenya directives, the maximum single transaction limit is KES ${keRates.mpesaMaxSingleTxn.toLocaleString()}, and the maximum daily transaction limit and wallet holding ceiling is KES ${keRates.mpesaMaxDailyLimit.toLocaleString()}.`,
    },
    {
      question: 'Is it cheaper to pay via Lipa Na M-PESA Buy Goods or Paybill?',
      answer:
        'Lipa Na M-PESA Buy Goods (Till Numbers) is 100% free of charge for the retail customer (KES 0.00 fee). Paybill utility payments depend on merchant configuration: business-paid paybills are free for customers, while customer-paid paybills carry a graduated tariff.',
    },
    {
      question: 'How does an M-Shwari loan compare to a Fuliza overdraft?',
      answer:
        'M-Shwari is a 30-day fixed-term loan charging a flat 9% facility fee that deposits cash into your wallet. Fuliza is an automated checkout overdraft charging 1% plus daily fees. For borrowing under 7 days, Fuliza is cheaper; for borrowing over 2 to 4 weeks, M-Shwari is more cost-effective.',
    },
  ];

  return (
    <div>
      <StructuredData
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Kenya', url: '/kenya/' },
        ]}
        faqs={faqs}
      />

      {/* Hero Banner */}
      <section className="border-b border-neutral-200 bg-gradient-to-b from-white to-neutral-50/60 py-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Breadcrumbs items={[{ label: 'Kenya' }]} />
          <div className="mt-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand-soft px-3 py-1 text-xs font-semibold text-brand-strong mb-3">
              <ShieldCheck className="h-3.5 w-3.5 text-brand" />
              <span>Official Safaricom PLC Tariffs Verified for 2026</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
              Kenya M-PESA &amp; Mobile Financial Calculators 2026
            </h1>
            <p className="mt-3 text-base text-neutral-700 max-w-3xl leading-relaxed">
              Accurate calculations for sending money, agent and ATM cash withdrawals, Paybill merchant transfers, Fuliza daily overdraft costs, and NCBA M-Shwari loans. All rates incorporate the statutory 15% excise duty.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {/* Statutory Limits & Tariff Overview */}
        <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-neutral-200 gap-2">
            <div>
              <h2 className="text-base font-bold text-neutral-900">Official Mobile Money Limits &amp; Baseline Rates</h2>
              <p className="text-xs text-neutral-600 mt-0.5">Regulated by the Central Bank of Kenya (CBK) and Safaricom PLC</p>
            </div>
            <span className="text-xs font-semibold text-neutral-600 bg-neutral-100 px-2.5 py-1 rounded self-start sm:self-auto">
              Verified: {keRates.verifiedDate}
            </span>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-xs text-neutral-700">
              <thead className="bg-neutral-100 text-neutral-900 uppercase font-bold text-2xs tracking-wider">
                <tr>
                  <th className="py-3 px-3.5 font-bold">Parameter / Channel</th>
                  <th className="py-3 px-3.5 font-bold">Regulatory Limit / Tariff</th>
                  <th className="py-3 px-3.5 font-bold">Excise Duty Status</th>
                  <th className="py-3 px-3.5 font-bold">Governing Authority</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                <tr className="hover:bg-neutral-50/50 transition-colors">
                  <td className="py-3 px-3.5 font-semibold text-neutral-900">Maximum Single Transaction Limit</td>
                  <td className="py-3 px-3.5 font-bold text-neutral-900 tabular-nums">KES {keRates.mpesaMaxSingleTxn.toLocaleString()}</td>
                  <td className="py-3 px-3.5 text-neutral-700 font-medium">N/A</td>
                  <td className="py-3 px-3.5 text-neutral-600">Central Bank of Kenya</td>
                </tr>
                <tr className="hover:bg-neutral-50/50 transition-colors">
                  <td className="py-3 px-3.5 font-semibold text-neutral-900">Maximum Daily Turnover Ceiling</td>
                  <td className="py-3 px-3.5 font-bold text-neutral-900 tabular-nums">KES {keRates.mpesaMaxDailyLimit.toLocaleString()} / 24 hours</td>
                  <td className="py-3 px-3.5 text-neutral-700 font-medium">N/A</td>
                  <td className="py-3 px-3.5 text-neutral-600">Central Bank of Kenya</td>
                </tr>
                <tr className="hover:bg-neutral-50/50 transition-colors">
                  <td className="py-3 px-3.5 font-semibold text-neutral-900">Maximum Wallet Holding Balance</td>
                  <td className="py-3 px-3.5 font-bold text-neutral-900 tabular-nums">KES {keRates.mpesaMaxBalance.toLocaleString()} maximum</td>
                  <td className="py-3 px-3.5 text-neutral-700 font-medium">N/A</td>
                  <td className="py-3 px-3.5 text-neutral-600">Central Bank of Kenya</td>
                </tr>
                <tr className="hover:bg-neutral-50/50 transition-colors">
                  <td className="py-3 px-3.5 font-semibold text-neutral-900">M-PESA P2P Under KES 100</td>
                  <td className="py-3 px-3.5 font-bold text-neutral-900 tabular-nums">KES 0.00 (100% Free)</td>
                  <td className="py-3 px-3.5 text-neutral-700 font-medium">Zero-rated</td>
                  <td className="py-3 px-3.5 text-neutral-600">Safaricom PLC</td>
                </tr>
                <tr className="hover:bg-neutral-50/50 transition-colors">
                  <td className="py-3 px-3.5 font-semibold text-neutral-900">Buy Goods Till (Customer Fee)</td>
                  <td className="py-3 px-3.5 font-bold text-neutral-900 tabular-nums">KES 0.00 (Customer pays ₱0)</td>
                  <td className="py-3 px-3.5 text-neutral-700 font-medium">Merchant absorbs fee</td>
                  <td className="py-3 px-3.5 text-neutral-600">Lipa Na M-PESA</td>
                </tr>
                <tr className="hover:bg-neutral-50/50 transition-colors">
                  <td className="py-3 px-3.5 font-semibold text-neutral-900">M-Shwari 30-Day Facility Fee</td>
                  <td className="py-3 px-3.5 font-bold text-neutral-900 tabular-nums">9.0% total (7.5% base + 15% duty)</td>
                  <td className="py-3 px-3.5 text-neutral-700 font-medium">15% excise duty included</td>
                  <td className="py-3 px-3.5 text-neutral-600">NCBA Bank Kenya</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Main Tools Grid */}
        <div className="mt-12">
          <h2 className="text-xl font-bold text-neutral-900 mb-6 flex items-center gap-2">
            <Calculator className="h-5 w-5 text-brand" />
            <span>Calculators &amp; Interactive Tools</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {tools.map((tool) => (
              <Link
                key={tool.id}
                href={tool.path}
                className="group flex flex-col justify-between rounded-xl border border-neutral-200 bg-white p-6 shadow-2xs hover:border-brand hover:shadow-md transition-all"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold text-neutral-600 mb-2">
                    <span>{tool.category}</span>
                    <span className="text-brand-strong font-bold bg-brand-soft px-2 py-0.5 rounded">2026</span>
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 group-hover:text-brand-strong transition-colors">
                    {tool.shortTitle}
                  </h3>
                  <p className="mt-2 text-xs text-neutral-600 leading-relaxed">
                    {tool.description}
                  </p>
                </div>
                <div className="mt-6 flex items-center justify-between border-t border-neutral-100 pt-3">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-strong">
                    <span>Calculate Now</span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Official Tables */}
        <div className="mt-14">
          <h2 className="text-xl font-bold text-neutral-900 mb-6 flex items-center gap-2">
            <FileText className="h-5 w-5 text-brand" />
            <span>Official Tariff Schedules</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {infoPages.map((page) => (
              <Link
                key={page.id}
                href={page.path}
                className="group flex items-start gap-4 rounded-xl border border-neutral-200 bg-white p-5 shadow-2xs hover:border-brand hover:shadow-sm transition-all"
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
                  <div className="mt-3 flex items-center gap-1 text-xs font-bold text-brand-strong">
                    <span>View full tariff schedule</span>
                    <ArrowRight className="h-3 w-3" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Comprehensive Guides */}
        <div className="mt-14">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-brand" />
              <span>Kenya Financial &amp; Mobile Money Guides ({guides.length})</span>
            </h2>
            <Link
              href="/kenya/faq/"
              className="text-xs font-bold text-brand-strong hover:underline flex items-center gap-1"
            >
              <span>View All KE FAQs</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {guides.map((g) => (
              <Link
                key={g.id}
                href={g.path}
                className="group rounded-xl border border-neutral-200 bg-white p-4 shadow-2xs hover:border-brand hover:shadow-xs transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-2xs font-bold uppercase tracking-wider text-neutral-500 block mb-1">
                    Guide
                  </span>
                  <h3 className="text-sm font-bold text-neutral-900 group-hover:text-brand-strong transition-colors line-clamp-2">
                    {g.shortTitle}
                  </h3>
                  <p className="mt-1.5 text-2xs text-neutral-600 line-clamp-3 leading-relaxed">
                    {g.description}
                  </p>
                </div>
                <span className="mt-3 inline-flex items-center gap-1 text-2xs font-bold text-brand-strong">
                  <span>Read article</span>
                  <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* FAQ Hub Link Banner */}
        <div className="mt-14 rounded-xl border border-brand/30 bg-brand-soft p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-brand-strong mb-1">
              <HelpCircle className="h-4 w-4 text-brand" />
              <span>Have a specific M-PESA, Fuliza, or M-Shwari question?</span>
            </div>
            <p className="text-xs text-neutral-700 font-medium">Explore our comprehensive Kenya FAQ center answering 25+ questions on tariffs, limits, and credit facilities.</p>
          </div>
          <Link
            href="/kenya/faq/"
            className="inline-flex items-center gap-1.5 rounded-lg bg-brand hover:bg-brand-hover px-4 py-2 text-xs font-bold text-white shadow-xs transition-colors shrink-0"
          >
            <span>Open Kenya FAQ Hub</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="mt-12">
          <FaqAccordion faqs={faqs} />
        </div>
      </div>
    </div>
  );
}