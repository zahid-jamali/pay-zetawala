import React from 'react';
import Link from 'next/link';
import { getPagesByCountry } from '@/config/pages';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { FaqAccordion } from '@/components/FaqAccordion';
import { StructuredData } from '@/components/StructuredData';
import { getUgRates } from '@/lib/seo/rules-content';
import { ArrowRight, ShieldCheck, Calculator, BookOpen, HelpCircle } from 'lucide-react';

export default function UgandaHubPage() {
  const ugRates = getUgRates();
  const tools = getPagesByCountry('ug').filter((p) => p.type === 'tool');
  const guides = getPagesByCountry('ug').filter((p) => p.type === 'guide');

  const faqs = [
    {
      question: 'What is the Uganda mobile money withdrawal tax rate in 2026?',
      answer:
        `Under the Excise Duty (Amendment) Act 2018, the statutory withdrawal tax rate is ${(ugRates.withdrawTaxRate * 100).toFixed(1)}% (0.5%) applied strictly to cash withdrawals from mobile money accounts at authorized agent locations.`,
    },
    {
      question: 'Does the 0.5% mobile money tax apply when sending money or paying bills?',
      answer:
        'No. The tax applies solely to cash withdrawals (cash-out at agent). Sending money person-to-person (P2P), depositing cash into your wallet, paying utility bills (Umeme Yaka, NWSC), and merchant payments (MoMoPay, Airtel Merchant Pay) are 100% tax-free.',
    },
    {
      question: 'Which is cheaper: MTN Mobile Money or Airtel Money?',
      answer:
        'MTN MoMo and Airtel Money maintain very similar tariffs. Airtel Money is slightly cheaper for select mid-tier agent withdrawals between UGX 50,000 and UGX 250,000 (saving between UGX 100 and UGX 200), while on-net sending tariffs are virtually identical across both networks.',
    },
    {
      question: 'What are the transaction limits for mobile money in Uganda?',
      answer:
        `Under Bank of Uganda guidelines, the maximum single transaction limit is UGX ${ugRates.maxSingleTxn.toLocaleString()} and the maximum wallet balance capacity is UGX ${ugRates.maxBalance.toLocaleString()}.`,
    },
    {
      question: 'How is the 0.5% tax remitted to the Uganda Revenue Authority (URA)?',
      answer:
        'The tax is withheld automatically by the telecom network at the moment of cash withdrawal. The network operator sweeps the collected tax directly to the URA Consolidated Account.',
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <StructuredData
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Uganda', url: '/uganda/' },
        ]}
        faqs={faqs}
      />

      <Breadcrumbs items={[{ label: 'Uganda' }]} />

      <div className="border-b border-neutral-200 pb-8 pt-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft px-3 py-1 text-xs font-semibold text-brand-strong mb-3">
          <ShieldCheck className="h-3.5 w-3.5 text-brand" />
          <span>Official MTN &amp; Airtel Uganda Tariffs (2026)</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
          Uganda Mobile Money &amp; Tax Calculators 2026
        </h1>
        <p className="mt-3 text-base text-neutral-600 max-w-3xl leading-relaxed">
          Accurate, verified fee calculators for MTN Mobile Money and Airtel Money Uganda. Calculate sending tariffs, agent cash withdrawal fees, cross-network charges, and the statutory 0.5% government excise duty.
        </p>
      </div>

      {/* Statutory Rates & Limits Table */}
      <div className="mt-8 rounded-xl border border-neutral-200 bg-white p-6 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-neutral-100 gap-2">
          <div>
            <h2 className="text-base font-bold text-neutral-900">Official Mobile Money Limits &amp; Tax Guidelines</h2>
            <p className="text-xs text-neutral-500">Regulated by the Bank of Uganda (BOU) and Uganda Revenue Authority (URA)</p>
          </div>
          <span className="text-2xs font-semibold text-neutral-400">Verified: {ugRates.verifiedDate}</span>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-xs text-neutral-700">
            <thead className="bg-neutral-50 text-neutral-800 uppercase font-bold text-2xs">
              <tr>
                <th className="py-2.5 px-3">Regulatory Parameter</th>
                <th className="py-2.5 px-3">Official Value</th>
                <th className="py-2.5 px-3">Applicability</th>
                <th className="py-2.5 px-3">Governing Agency</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              <tr>
                <td className="py-2.5 px-3 font-semibold text-neutral-900">Government Cash Withdrawal Tax</td>
                <td className="py-2.5 px-3 font-bold text-brand">{(ugRates.withdrawTaxRate * 100).toFixed(1)}% (0.5%)</td>
                <td className="py-2.5 px-3 text-neutral-600">Cash withdrawals at agent only</td>
                <td className="py-2.5 px-3 text-neutral-500">Uganda Revenue Authority</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-neutral-900">P2P Sending Money Tax</td>
                <td className="py-2.5 px-3 font-bold text-brand">0.0% (100% Tax-Free)</td>
                <td className="py-2.5 px-3 text-neutral-600">On-net and cross-net transfers</td>
                <td className="py-2.5 px-3 text-neutral-500">Excise Duty Act 2018</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-neutral-900">Maximum Single Transaction Cap</td>
                <td className="py-2.5 px-3 font-bold text-brand">UGX {ugRates.maxSingleTxn.toLocaleString()}</td>
                <td className="py-2.5 px-3 text-neutral-600">Per single transfer or cashout</td>
                <td className="py-2.5 px-3 text-neutral-500">Bank of Uganda</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-neutral-900">Maximum Wallet Holding Limit</td>
                <td className="py-2.5 px-3 font-bold text-brand">UGX {ugRates.maxBalance.toLocaleString()}</td>
                <td className="py-2.5 px-3 text-neutral-600">Total balance capacity</td>
                <td className="py-2.5 px-3 text-neutral-500">Bank of Uganda</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Main Tools Grid */}
      <div className="mt-10">
        <h2 className="text-xl font-bold text-neutral-900 mb-6 flex items-center gap-2">
          <Calculator className="h-5 w-5 text-brand" />
          <span>Calculators &amp; Comparison Tools</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {tools.map((tool) => (
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
              <div className="mt-6 flex items-center justify-between border-t border-neutral-100 pt-3">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-strong">
                  <span>Calculate Now</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Comprehensive Guides */}
      <div className="mt-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-brand" />
            <span>Uganda Mobile Money Guides ({guides.length})</span>
          </h2>
          <Link
            href="/uganda/faq/"
            className="text-xs font-semibold text-brand-strong hover:underline flex items-center gap-1"
          >
            <span>View All UG FAQs</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {guides.map((g) => (
            <Link
              key={g.id}
              href={g.path}
              className="group rounded-xl border border-neutral-200 bg-white p-4 shadow-2xs hover:border-brand-strong hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-2xs font-bold uppercase tracking-wider text-neutral-400 block mb-1">
                  Guide
                </span>
                <h3 className="text-sm font-bold text-neutral-900 group-hover:text-brand-strong transition-colors line-clamp-2">
                  {g.shortTitle}
                </h3>
                <p className="mt-1.5 text-2xs text-neutral-600 line-clamp-3 leading-relaxed">
                  {g.description}
                </p>
              </div>
              <span className="mt-3 inline-flex items-center gap-1 text-2xs font-semibold text-brand-strong">
                <span>Read article</span>
                <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* FAQ Hub Link Banner */}
      <div className="mt-12 rounded-xl border border-brand/20 bg-brand-soft/30 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-brand-strong mb-1">
            <HelpCircle className="h-4 w-4 text-brand" />
            <span>Questions about tariffs, taxes, or limits in Uganda?</span>
          </div>
          <p className="text-xs text-neutral-700">Explore our Uganda FAQ center with 25+ detailed answers on MTN MoMo and Airtel Money.</p>
        </div>
        <Link
          href="/uganda/faq/"
          className="inline-flex items-center gap-1.5 rounded-lg bg-brand px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-brand-strong transition-colors shrink-0"
        >
          <span>Open Uganda FAQ Hub</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="mt-10">
        <FaqAccordion faqs={faqs} />
      </div>
    </div>
  );
}
