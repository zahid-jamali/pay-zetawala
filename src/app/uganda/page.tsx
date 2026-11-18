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
    <div>
      <StructuredData
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Uganda', url: '/uganda/' },
        ]}
        faqs={faqs}
      />

      {/* Hero Banner */}
      <section className="border-b border-neutral-200 bg-gradient-to-b from-white to-neutral-50/60 py-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Breadcrumbs items={[{ label: 'Uganda' }]} />
          <div className="mt-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand-soft px-3 py-1 text-xs font-semibold text-brand-strong mb-3">
              <ShieldCheck className="h-3.5 w-3.5 text-brand" />
              <span>Official MTN &amp; Airtel Uganda Tariffs (2026)</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
              Uganda Mobile Money &amp; Tax Calculators 2026
            </h1>
            <p className="mt-3 text-base text-neutral-700 max-w-3xl leading-relaxed">
              Accurate, verified fee calculators for MTN Mobile Money and Airtel Money Uganda. Calculate sending tariffs, agent cash withdrawal fees, cross-network charges, and the statutory 0.5% government excise duty.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {/* Statutory Rates & Limits Table */}
        <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-neutral-200 gap-2">
            <div>
              <h2 className="text-base font-bold text-neutral-900">Official Mobile Money Limits &amp; Tax Guidelines</h2>
              <p className="text-xs text-neutral-600 mt-0.5">Regulated by the Bank of Uganda (BOU) and Uganda Revenue Authority (URA)</p>
            </div>
            <span className="text-xs font-semibold text-neutral-600 bg-neutral-100 px-2.5 py-1 rounded self-start sm:self-auto">
              Verified: {ugRates.verifiedDate}
            </span>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-xs text-neutral-700">
              <thead className="bg-neutral-100 text-neutral-900 uppercase font-bold text-2xs tracking-wider">
                <tr>
                  <th className="py-3 px-3.5 font-bold">Regulatory Parameter</th>
                  <th className="py-3 px-3.5 font-bold">Official Value</th>
                  <th className="py-3 px-3.5 font-bold">Applicability</th>
                  <th className="py-3 px-3.5 font-bold">Governing Agency</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                <tr className="hover:bg-neutral-50/50 transition-colors">
                  <td className="py-3 px-3.5 font-semibold text-neutral-900">Government Cash Withdrawal Tax</td>
                  <td className="py-3 px-3.5 font-bold text-neutral-900 tabular-nums">{(ugRates.withdrawTaxRate * 100).toFixed(1)}% (0.5%)</td>
                  <td className="py-3 px-3.5 text-neutral-700 font-medium">Cash withdrawals at agent only</td>
                  <td className="py-3 px-3.5 text-neutral-600">Uganda Revenue Authority</td>
                </tr>
                <tr className="hover:bg-neutral-50/50 transition-colors">
                  <td className="py-3 px-3.5 font-semibold text-neutral-900">P2P Sending Money Tax</td>
                  <td className="py-3 px-3.5 font-bold text-neutral-900 tabular-nums">0.0% (100% Tax-Free)</td>
                  <td className="py-3 px-3.5 text-neutral-700 font-medium">On-net and cross-net transfers</td>
                  <td className="py-3 px-3.5 text-neutral-600">Excise Duty Act 2018</td>
                </tr>
                <tr className="hover:bg-neutral-50/50 transition-colors">
                  <td className="py-3 px-3.5 font-semibold text-neutral-900">Maximum Single Transaction Cap</td>
                  <td className="py-3 px-3.5 font-bold text-neutral-900 tabular-nums">UGX {ugRates.maxSingleTxn.toLocaleString()}</td>
                  <td className="py-3 px-3.5 text-neutral-700 font-medium">Per single transfer or cashout</td>
                  <td className="py-3 px-3.5 text-neutral-600">Bank of Uganda</td>
                </tr>
                <tr className="hover:bg-neutral-50/50 transition-colors">
                  <td className="py-3 px-3.5 font-semibold text-neutral-900">Maximum Wallet Holding Limit</td>
                  <td className="py-3 px-3.5 font-bold text-neutral-900 tabular-nums">UGX {ugRates.maxBalance.toLocaleString()}</td>
                  <td className="py-3 px-3.5 text-neutral-700 font-medium">Total balance capacity</td>
                  <td className="py-3 px-3.5 text-neutral-600">Bank of Uganda</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Main Tools Grid */}
        <div className="mt-12">
          <h2 className="text-xl font-bold text-neutral-900 mb-6 flex items-center gap-2">
            <Calculator className="h-5 w-5 text-brand" />
            <span>Calculators &amp; Comparison Tools</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
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

        {/* Comprehensive Guides */}
        <div className="mt-14">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-brand" />
              <span>Uganda Mobile Money Guides ({guides.length})</span>
            </h2>
            <Link
              href="/uganda/faq/"
              className="text-xs font-bold text-brand-strong hover:underline flex items-center gap-1"
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
              <span>Questions about tariffs, taxes, or limits in Uganda?</span>
            </div>
            <p className="text-xs text-neutral-700 font-medium">Explore our Uganda FAQ center with 25+ detailed answers on MTN MoMo and Airtel Money.</p>
          </div>
          <Link
            href="/uganda/faq/"
            className="inline-flex items-center gap-1.5 rounded-lg bg-brand hover:bg-brand-hover px-4 py-2 text-xs font-bold text-white shadow-xs transition-colors shrink-0"
          >
            <span>Open Uganda FAQ Hub</span>
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