import React from 'react';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SeoArticle, WorkedExampleItem, OfficialSourceLink } from '@/components/SeoArticle';
import { StructuredData } from '@/components/StructuredData';
import { getUgRates } from '@/lib/seo/rules-content';
import { ArrowLeftRight, Calculator, CheckCircle2, Table, HelpCircle } from 'lucide-react';

export default function GuideMtnVsAirtelMoneyWhichIsCheaper() {
  const ugRates = getUgRates();

  const faqs = [
    {
      question: 'Which is cheaper overall in Uganda: MTN MoMo or Airtel Money?',
      answer:
        'MTN Mobile Money and Airtel Money operate fiercely competitive tariff schedules that are largely neck-and-neck across standard amounts. Airtel Money often has a slight edge on certain cross-network transfers and specific mid-tier cash withdrawals, while MTN MoMo offers wider rural agent availability and deeper banking integration.',
    },
    {
      question: 'Do both MTN and Airtel charge the same 0.5% government withdrawal tax?',
      answer:
        'Yes. The 0.5% mobile money cash withdrawal tax is a statutory levy enacted by the Parliament of Uganda under the Excise Duty (Amendment) Act 2018. Both MTN and Airtel apply the exact same 0.5% calculation on cash withdrawals, with 100% of the proceeds remitted to the Uganda Revenue Authority.',
    },
    {
      question: 'Is sending money from MTN to Airtel (cross-network) expensive?',
      answer:
        'Sending money across networks incurs higher tariff rates than on-net transfers. Both operators maintain a separate "Send to Other Networks" tariff band that charges between UGX 500 and UGX 3,000 more than on-net transfers depending on the bracket.',
    },
    {
      question: 'What is the maximum amount you can send or withdraw in Uganda?',
      answer:
        `Under Bank of Uganda regulatory guidelines, the maximum single transaction limit on mobile money is UGX ${ugRates.momoMaxSingleTxn.toLocaleString()} and the maximum wallet holding balance is UGX ${ugRates.momoMaxBalance.toLocaleString()}.`,
    },
    {
      question: 'Are merchant payments (MoMoPay vs Airtel Pay) free for customers?',
      answer:
        'Yes. Paying for goods and services at merchant locations using MTN MoMoPay or Airtel Merchant Pay is completely free of charge for the retail customer (UGX 0.00 fee and 0% tax). The merchant absorbs the commercial processing charge.',
    },
  ];

  const workedExamples: WorkedExampleItem[] = [
    {
      title: 'Withdrawing UGX 100,000 at an Agent: MTN vs Airtel',
      scenario:
        'A customer in Jinja needs to withdraw UGX 100,000 in cash from their mobile money wallet and compares the total cost between MTN MoMo and Airtel Money.',
      inputs: [
        { label: 'Withdrawal Amount', value: 'UGX 100,000' },
        { label: 'Tariff Band', value: 'UGX 60,001 to UGX 125,000 tier' },
        { label: 'Government Tax (0.5%)', value: 'UGX 500 on both networks' },
      ],
      steps: [
        { label: 'MTN Agent Fee + Tax', formula: 'UGX 2,400 operator fee + UGX 500 tax', value: 'UGX 2,900' },
        { label: 'Airtel Agent Fee + Tax', formula: 'UGX 2,300 operator fee + UGX 500 tax', value: 'UGX 2,800', highlight: true },
        { label: 'Cost Difference', formula: 'UGX 2,900 – UGX 2,800', value: 'Airtel is UGX 100 cheaper' },
      ],
      resultLabel: 'Lowest Cash-Out Cost',
      resultValue: 'Airtel (UGX 2,800)',
      notes: 'Customer receives full UGX 100,000 cash in hand.',
    },
    {
      title: 'High-Value Transfer of UGX 1,000,000: MTN vs Airtel',
      scenario:
        'A contractor sends UGX 1,000,000 to a building materials supplier on the same network.',
      inputs: [
        { label: 'Transfer Amount', value: 'UGX 1,000,000' },
        { label: 'Transfer Type', value: 'Registered P2P On-Net' },
        { label: 'Government Tax', value: 'UGX 0.00 (Exempt on P2P)' },
      ],
      steps: [
        { label: 'MTN MoMo Transfer Fee', formula: 'UGX 1,000,000 on-net tariff', value: 'UGX 2,000', highlight: true },
        { label: 'Airtel Money Transfer Fee', formula: 'UGX 1,000,000 on-net tariff', value: 'UGX 2,000', highlight: true },
        { label: 'Government Tax Applied', formula: 'P2P transfers are 100% tax-free', value: 'UGX 0.00' },
      ],
      resultLabel: 'Transfer Fee Comparison',
      resultValue: 'Identical (UGX 2,000)',
      notes: 'Both networks charge identical fees for high-value on-net sending.',
    },
  ];

  const officialSources: OfficialSourceLink[] = [
    {
      name: 'MTN Uganda',
      documentTitle: 'Official MTN Mobile Money Consumer Tariff Schedule',
      url: 'https://www.mtn.co.ug/momo/tariffs',
      verifiedDate: ugRates.verifiedDate,
    },
    {
      name: 'Airtel Uganda',
      documentTitle: 'Official Airtel Money Tariff Guide & Merchant Rates',
      url: 'https://www.airtel.co.ug/airtel_money',
      verifiedDate: ugRates.verifiedDate,
    },
  ];

  const toc = [
    { id: 'tariff-overview', label: '1. Overview of Uganda’s Mobile Money Duopoly' },
    { id: 'sending-money-tariffs', label: '2. Sending Money: MTN vs Airtel On-Net & Cross-Net' },
    { id: 'withdrawal-charges', label: '3. Agent Cash-Out Charges Compared' },
    { id: 'the-05-tax', label: '4. Government 0.5% Tax on Both Networks' },
    { id: 'final-verdict', label: '5. Final Verdict: Which Telecom Should You Use?' },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <StructuredData
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Uganda', url: '/uganda/' },
          { name: 'Guides', url: '/uganda/' },
          { name: 'MTN vs Airtel Money Which Is Cheaper', url: '/uganda/guides/mtn-vs-airtel-money-which-is-cheaper/' },
        ]}
        article={{
          headline: 'MTN vs Airtel Money: Which Is Cheaper in Uganda? (2026)',
          description: 'A detailed tariff-by-tariff comparison between MTN Uganda MoMo and Airtel Money for sending, agent cash withdrawals, and cross-network transfers.',
          url: 'https://pay.zetawala.com/uganda/guides/mtn-vs-airtel-money-which-is-cheaper/',
          datePublished: '2026-03-15T08:00:00+03:00',
          dateModified: '2026-11-18T00:00:00+03:00',
        }}
        faqs={faqs}
      />

      <Breadcrumbs
        items={[
          { label: 'Uganda', href: '/uganda/' },
          { label: 'Guides', href: '/uganda/' },
          { label: 'MTN vs Airtel Money' },
        ]}
      />

      <header className="border-b border-neutral-200 pb-6 pt-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft px-3 py-1 text-xs font-semibold text-brand-strong mb-2">
          <ArrowLeftRight className="h-3.5 w-3.5 text-brand" />
          <span>Telecom Pricing Comparison</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
          MTN vs Airtel Money: Which Is Cheaper in 2026?
        </h1>
        <p className="mt-2 text-sm sm:text-base text-neutral-600 leading-relaxed">
          A band-by-band comparison of sending fees, agent cash-out charges, cross-network transfers, and the statutory 0.5% government tax between MTN Uganda and Airtel Uganda.
        </p>
      </header>

      {/* Tool Shortcut */}
      <div className="mt-6 rounded-xl border border-brand/30 bg-brand-soft/20 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-bold text-neutral-900">Compare exact fees side-by-side</h2>
          <p className="text-xs text-neutral-600">Enter your transfer or withdrawal amount to see who wins in real-time.</p>
        </div>
        <Link
          href="/uganda/mobile-money-charges-comparison/"
          className="inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-brand-strong transition-colors shrink-0"
        >
          <Calculator className="h-4 w-4" />
          <span>Side-by-Side Comparison Tool</span>
        </Link>
      </div>

      <SeoArticle
        quickAnswer="Airtel Money is slightly cheaper for select mid-tier agent cash withdrawals (saving between UGX 100 and UGX 300 on amounts between UGX 50,000 and UGX 250,000). For sending money on-net, tariffs are virtually identical. Both networks apply the exact same 0.5% statutory government withdrawal tax required by URA."
        toc={toc}
        workedExamples={workedExamples}
        sources={officialSources}
        verifiedDate={ugRates.verifiedDate}
      >
        <section id="tariff-overview" className="space-y-4">
          <h2>1. Overview of Uganda’s Mobile Money Duopoly</h2>
          <p>
            Uganda&apos;s digital payment landscape is dominated by two primary telecommunications operators: <strong>MTN Uganda (MTN MoMo)</strong> and <strong>Airtel Uganda (Airtel Money)</strong>. Together, they account for over 98% of all digital retail financial flows in the country under Bank of Uganda supervision.
          </p>
          <p>
            Because both networks compete intensely for market share, their pricing models mirror each other closely. However, critical differences emerge when you examine specific transaction bands and cross-network interoperability fees.
          </p>
        </section>

        <section id="sending-money-tariffs" className="space-y-4">
          <h2>2. Sending Money: MTN vs Airtel On-Net &amp; Cross-Net</h2>
          <p>
            When transferring money person-to-person (P2P), transaction costs depend on whether the recipient is on the same telecom network:
          </p>
          <div className="overflow-x-auto rounded-lg border border-neutral-200 my-4">
            <table className="w-full text-left text-sm text-neutral-700">
              <thead className="bg-neutral-100 text-xs font-bold uppercase text-neutral-800">
                <tr>
                  <th className="px-4 py-3">Transfer Amount Bracket</th>
                  <th className="px-4 py-3">MTN On-Net Fee</th>
                  <th className="px-4 py-3">Airtel On-Net Fee</th>
                  <th className="px-4 py-3">Cross-Net Fee (Interoperable)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                <tr>
                  <td className="px-4 py-3 font-medium">UGX 500 – 2,500</td>
                  <td className="px-4 py-3">UGX 100</td>
                  <td className="px-4 py-3">UGX 100</td>
                  <td className="px-4 py-3">UGX 500 – 1,000</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">UGX 5,001 – 15,000</td>
                  <td className="px-4 py-3">UGX 500</td>
                  <td className="px-4 py-3">UGX 450</td>
                  <td className="px-4 py-3">UGX 1,500</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">UGX 30,001 – 45,000</td>
                  <td className="px-4 py-3">UGX 850</td>
                  <td className="px-4 py-3">UGX 850</td>
                  <td className="px-4 py-3">UGX 2,100</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">UGX 60,001 – 125,000</td>
                  <td className="px-4 py-3">UGX 1,100</td>
                  <td className="px-4 py-3">UGX 1,000</td>
                  <td className="px-4 py-3">UGX 2,600</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">UGX 500,001 – 1,000,000</td>
                  <td className="px-4 py-3">UGX 2,000</td>
                  <td className="px-4 py-3">UGX 2,000</td>
                  <td className="px-4 py-3">UGX 4,500</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            For registered on-net transfers, Airtel has minor advantages in the 5,000 to 15,000 and 60,000 to 125,000 brackets (saving between UGX 50 and UGX 100 per transfer). In the upper tiers, both networks charge identical rates.
          </p>
        </section>

        <section id="withdrawal-charges" className="space-y-4">
          <h2>3. Agent Cash-Out Charges Compared</h2>
          <p>
            When converting mobile money into cash at an agent, the total fee is composed of two items: the telecom&apos;s own agent tariff plus the 0.5% government tax:
          </p>
          <ul>
            <li><strong>Low Tiers (UGX 5,000 to 30,000):</strong> MTN and Airtel charges are virtually identical, with total costs (including tax) ranging from UGX 725 to UGX 1,150.</li>
            <li><strong>Middle Tiers (UGX 60,000 to 250,000):</strong> Airtel Money is consistently cheaper by UGX 100 to UGX 200 per cash-out.</li>
            <li><strong>High Tiers (UGX 1,000,000 to 5,000,000):</strong> Both networks charge similar fees, reaching approximately UGX 12,500 to UGX 15,000 plus the mandatory 0.5% tax.</li>
          </ul>
        </section>

        <section id="the-05-tax" className="space-y-4">
          <h2>4. Government 0.5% Tax on Both Networks</h2>
          <p>
            Under the Excise Duty (Amendment) Act 2018, neither telecom has discretion over the 0.5% cash-out levy. Both MTN and Airtel compute:
          </p>
          <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 font-mono text-sm text-neutral-800">
            <code>URA Excise Tax = 0.005 × Withdrawal Principal Amount</code>
          </div>
          <p>
            Whether you withdraw UGX 200,000 from an MTN agent or an Airtel agent, you pay exactly UGX 1,000 in government excise tax in both cases.
          </p>
        </section>

        <section id="final-verdict" className="space-y-4">
          <h2>5. Final Verdict: Which Telecom Should You Use?</h2>
          <p>
            Your choice between MTN MoMo and Airtel Money should depend on your specific transaction habits:
          </p>
          <ul>
            <li><strong>Choose Airtel Money if:</strong> You frequently withdraw mid-sized cash sums (UGX 50,000 to UGX 250,000) or send frequent small-to-mid on-net amounts, giving you subtle cumulative tariff savings over the month.</li>
            <li><strong>Choose MTN MoMo if:</strong> You value universal coverage and deep ubiquity across rural trading centers, extensive commercial bank ATM integration, and wider adoption among corporate suppliers and merchants.</li>
          </ul>
        </section>
      </SeoArticle>
    </div>
  );
}
