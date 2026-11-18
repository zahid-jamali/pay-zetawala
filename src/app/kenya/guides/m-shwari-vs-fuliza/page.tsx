import React from 'react';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SeoArticle, WorkedExampleItem, OfficialSourceLink } from '@/components/SeoArticle';
import { StructuredData } from '@/components/StructuredData';
import { getKeRates } from '@/lib/seo/rules-content';
import { Scale, Calculator, ArrowRightLeft, ShieldCheck, Clock } from 'lucide-react';

export default function GuideMshwariVsFuliza() {
  const keRates = getKeRates();

  const faqs = [
    {
      question: 'What is the fundamental difference between M-Shwari and Fuliza?',
      answer:
        'M-Shwari is a 30-day fixed-term mobile loan provided by NCBA Bank that deposits cash directly into your M-PESA wallet with a one-time 9% facility fee. Fuliza is an automated point-of-sale overdraft that covers transaction shortfalls with a 1% facility fee plus a daily maintenance fee charged every midnight.',
    },
    {
      question: 'When is Fuliza cheaper than M-Shwari?',
      answer:
        'Fuliza is significantly cheaper if you need money for a very short duration (between 1 and 7 days). Because you only pay daily maintenance fees for the exact days you use the overdraft, repaying within a few days costs a fraction of M-Shwari’s fixed 30-day fee.',
    },
    {
      question: 'When is M-Shwari cheaper than Fuliza?',
      answer:
        'M-Shwari is cheaper when you need to borrow funds for longer than two to three weeks. Because M-Shwari charges a flat one-time 9% fee regardless of whether you repay on Day 10 or Day 30, whereas Fuliza charges continuous daily fees that accumulate each day the balance remains open.',
    },
    {
      question: 'Can I withdraw cash from Fuliza directly like an M-Shwari loan?',
      answer:
        'No. Fuliza is an overdraft that can only be used at checkout to complete a payment (Send Money, Buy Goods Till, or Paybill). You cannot withdraw cash directly from an agent using Fuliza, whereas M-Shwari deposits funds into your wallet that you can withdraw as cash at any time.',
    },
    {
      question: 'Do M-Shwari or Fuliza report defaults to Credit Reference Bureaus (CRBs)?',
      answer:
        'Yes. Both products are regulated digital banking facilities administered by NCBA Bank. Unpaid balances lingering beyond 60 to 90 days lead to credit facility suspension and negative listing with licensed CRBs (such as Metropol, Creditinfo, and TransUnion).',
    },
  ];

  const workedExamples: WorkedExampleItem[] = [
    {
      title: 'Ultra Short-Term Borrowing for 3 Days (KES 5,000)',
      scenario:
        'A user needs KES 5,000 on Tuesday to settle an emergency bill and knows they will receive funds to repay on Friday (3 days duration).',
      inputs: [
        { label: 'Borrowing Principal', value: 'KES 5,000.00' },
        { label: 'Planned Duration', value: '3 calendar days' },
        { label: 'Product Options', value: 'Fuliza Overdraft vs M-Shwari 30-Day Loan' },
      ],
      steps: [
        { label: 'Fuliza Cost (1% + 3 days × KES 20)', formula: 'KES 50 facility + KES 60 daily fee', value: 'KES 110.00', highlight: true },
        { label: 'M-Shwari Cost (9% flat 30-day fee)', formula: '9.0% × KES 5,000', value: 'KES 450.00' },
        { label: 'Cost Difference / Savings', formula: 'KES 450 – KES 110', value: 'Save KES 340.00 with Fuliza' },
      ],
      resultLabel: 'Recommended Choice',
      resultValue: 'Fuliza (Save KES 340)',
      notes: 'For under 7 days, Fuliza is 75% cheaper than M-Shwari.',
    },
    {
      title: 'Long-Term 28-Day Financing (KES 10,000)',
      scenario:
        'A small shopkeeper needs KES 10,000 in working capital to purchase wholesale inventory and will repay when inventory sells at month-end (28 days).',
      inputs: [
        { label: 'Loan Principal', value: 'KES 10,000.00' },
        { label: 'Borrowing Horizon', value: '28 calendar days' },
        { label: 'Comparison Products', value: 'M-Shwari vs Fuliza Overdraft' },
      ],
      steps: [
        { label: 'M-Shwari Fixed Fee (9%)', formula: '9.0% × KES 10,000', value: 'KES 900.00', highlight: true },
        { label: 'Fuliza Cost (1% + 28 days × KES 25)', formula: 'KES 100 facility + (28 × KES 25)', value: 'KES 800.00' },
        { label: 'Cash Flexibility Factor', formula: 'M-Shwari allows cash withdrawal', value: 'M-Shwari Cash Advantage' },
      ],
      resultLabel: 'M-Shwari Total Cost',
      resultValue: 'KES 900.00 Flat',
      notes: 'M-Shwari deposits liquid cash in wallet with zero auto-interception.',
    },
  ];

  const officialSources: OfficialSourceLink[] = [
    {
      name: 'NCBA Bank Kenya PLC',
      documentTitle: 'M-Shwari & Fuliza Digital Credit Disclosures & Loan Agreements',
      url: 'https://ncbagroup.com',
      verifiedDate: keRates.verifiedDate,
    },
    {
      name: 'Safaricom PLC',
      documentTitle: 'Credit and Financial Services Comparison Primer',
      url: 'https://www.safaricom.co.ke/personal/m-pesa/credit-financial-services',
      verifiedDate: keRates.verifiedDate,
    },
  ];

  const toc = [
    { id: 'fundamental-differences', label: '1. Term Loan (M-Shwari) vs Overdraft (Fuliza)' },
    { id: 'fee-structures-compared', label: '2. Detailed Fee Structures Compared' },
    { id: 'breakeven-timeline', label: '3. The Breakeven Curve: Days 1 to 30' },
    { id: 'cash-availability-rules', label: '4. Cash Availability & Wallet Interception' },
    { id: 'credit-score-impact', label: '5. Impact on Credit Score & CRB Reporting' },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <StructuredData
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Kenya', url: '/kenya/' },
          { name: 'Guides', url: '/kenya/' },
          { name: 'M-Shwari vs Fuliza', url: '/kenya/guides/m-shwari-vs-fuliza/' },
        ]}
        article={{
          headline: 'M-Shwari vs Fuliza: Which Is Cheaper in Kenya? (2026 Comparison)',
          description: 'A mathematical comparison between NCBA M-Shwari 30-day fixed fee loans and Safaricom Fuliza daily overdraft rates across 1 to 30 days.',
          url: 'https://pay.zetawala.com/kenya/guides/m-shwari-vs-fuliza/',
          datePublished: '2026-03-05T08:00:00+03:00',
          dateModified: '2026-11-18T00:00:00+03:00',
        }}
        faqs={faqs}
      />

      <Breadcrumbs
        items={[
          { label: 'Kenya', href: '/kenya/' },
          { label: 'Guides', href: '/kenya/' },
          { label: 'M-Shwari vs Fuliza' },
        ]}
      />

      <header className="border-b border-neutral-200 pb-6 pt-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft px-3 py-1 text-xs font-semibold text-brand-strong mb-2">
          <ArrowRightLeft className="h-3.5 w-3.5 text-brand" />
          <span>Financial Product Comparison</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
          M-Shwari vs Fuliza: Which Is Cheaper in 2026?
        </h1>
        <p className="mt-2 text-sm sm:text-base text-neutral-600 leading-relaxed">
          Comparing NCBA M-Shwari&apos;s 9% fixed 30-day facility fee against Safaricom Fuliza&apos;s 1% access fee and daily maintenance tiers to find the exact breakeven day.
        </p>
      </header>

      {/* Tool Shortcut */}
      <div className="mt-6 rounded-xl border border-brand/30 bg-brand-soft/20 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-bold text-neutral-900">Calculate exact borrowing charges</h2>
          <p className="text-xs text-neutral-600">Simulate both loan types side-by-side with our dedicated tools.</p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/kenya/fuliza-charges-calculator/"
            className="inline-flex items-center gap-1.5 rounded-lg bg-brand px-3.5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-brand-strong transition-colors"
          >
            <Calculator className="h-3.5 w-3.5" />
            <span>Fuliza Tool</span>
          </Link>
          <Link
            href="/kenya/m-shwari-loan-calculator/"
            className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-300 bg-white px-3.5 py-2 text-xs font-semibold text-neutral-800 shadow-xs hover:bg-neutral-50 transition-colors"
          >
            <Calculator className="h-3.5 w-3.5 text-neutral-600" />
            <span>M-Shwari Tool</span>
          </Link>
        </div>
      </div>

      <SeoArticle
        quickAnswer="Fuliza is substantially cheaper for short-term borrowing between 1 and 7 days because you only pay a 1% facility fee plus daily maintenance fees for days used. M-Shwari is cheaper and more practical for durations over 2 to 4 weeks because its 9% facility fee is fixed for a full 30-day term and deposits liquid cash directly into your wallet."
        toc={toc}
        workedExamples={workedExamples}
        sources={officialSources}
        verifiedDate={keRates.verifiedDate}
      >
        <section id="fundamental-differences" className="space-y-4">
          <h2>1. Term Loan (M-Shwari) vs Overdraft (Fuliza)</h2>
          <p>
            While both credit facilities are powered by NCBA Bank Kenya PLC through Safaricom&apos;s M-PESA architecture, they serve fundamentally different consumer financial needs:
          </p>
          <div className="overflow-x-auto rounded-lg border border-neutral-200 my-4">
            <table className="w-full text-left text-sm text-neutral-700">
              <thead className="bg-neutral-100 text-xs font-bold uppercase text-neutral-800">
                <tr>
                  <th className="px-4 py-3">Feature</th>
                  <th className="px-4 py-3">NCBA M-Shwari</th>
                  <th className="px-4 py-3">Safaricom Fuliza</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                <tr>
                  <td className="px-4 py-3 font-semibold text-neutral-900">Credit Mechanism</td>
                  <td className="px-4 py-3">30-Day Term Loan</td>
                  <td className="px-4 py-3">Point-of-Sale Overdraft</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-neutral-900">Fund Disbursement</td>
                  <td className="px-4 py-3">Deposits cash into M-PESA wallet</td>
                  <td className="px-4 py-3">Finances transaction deficit directly</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-neutral-900">Cash Withdrawal</td>
                  <td className="px-4 py-3 text-brand font-bold">Yes (Withdraw at agent/ATM)</td>
                  <td className="px-4 py-3 text-neutral-500 font-semibold">No (Transactions only)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-neutral-900">Repayment Period</td>
                  <td className="px-4 py-3">Fixed 30-day window</td>
                  <td className="px-4 py-3">Continuous daily compounding</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-neutral-900">Incoming Wallet Interception</td>
                  <td className="px-4 py-3">Only on Day 31 if defaulted</td>
                  <td className="px-4 py-3 text-danger font-semibold">Immediate on every incoming shilling</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section id="fee-structures-compared" className="space-y-4">
          <h2>2. Detailed Fee Structures Compared</h2>
          <p>
            Understanding how each product levies charges is vital to avoiding unexpected financing costs:
          </p>
          <ul>
            <li>
              <strong>M-Shwari Loan Fee:</strong> Charges a one-off <strong>7.5% loan facility fee</strong>. Under the Finance Act, a 15% excise duty applies to loan fees (7.5% × 1.15 = <strong>8.625% ~ 9.0% effective charge</strong>). If you borrow KES 10,000, you pay exactly KES 900 in total fees regardless of whether you repay in 3 days or 30 days.
            </li>
            <li>
              <strong>Fuliza Overdraft Fee:</strong> Charges a <strong>1.0% access facility fee</strong> upon draw-down plus a <strong>daily maintenance fee</strong> (from KES 0.00 to KES 25.00/day) accrued every midnight until cleared.
            </li>
          </ul>
        </section>

        <section id="breakeven-timeline" className="space-y-4">
          <h2>3. The Breakeven Curve: Days 1 to 30</h2>
          <p>
            Because Fuliza charges daily while M-Shwari charges a flat 30-day fee, there is an exact breakeven day where Fuliza ceases to be the cheaper alternative:
          </p>
          <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4">
            <h3 className="font-semibold text-neutral-900 mb-2">Rule of Thumb:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-neutral-700">
              <li><strong>Days 1 to 7:</strong> Fuliza is overwhelmingly cheaper. For a KES 5,000 overdraft repaid in 3 days, Fuliza costs KES 110 versus M-Shwari&apos;s KES 450.</li>
              <li><strong>Days 8 to 15:</strong> The gap closes rapidly as Fuliza daily maintenance fees stack up.</li>
              <li><strong>Days 16 to 30:</strong> M-Shwari becomes more cost-effective. Furthermore, M-Shwari provides payment peace of mind without worrying about incoming mobile wallet funds being seized instantly.</li>
            </ul>
          </div>
        </section>

        <section id="cash-availability-rules" className="space-y-4">
          <h2>4. Cash Availability &amp; Wallet Interception</h2>
          <p>
            A decisive practical factor between the two products is how they handle liquidity:
          </p>
          <p>
            If you need physical cash to pay a school fee that does not accept mobile money or to pay a laborer who demands cash notes, Fuliza cannot help you—it strictly disables cash withdrawals at M-PESA agents. M-Shwari, by contrast, credits your liquid wallet balance, allowing you to walk to an agent or ATM and withdraw physical currency immediately.
          </p>
          <p>
            Furthermore, having an active Fuliza balance means your wallet is &quot;frozen&quot; from receiving funds—every shilling sent to you by family, employers, or clients is swallowed by Safaricom until the debt is cleared. With M-Shwari, your wallet continues operating normally until the 30-day term lapses.
          </p>
        </section>

        <section id="credit-score-impact" className="space-y-4">
          <h2>5. Impact on Credit Score &amp; CRB Reporting</h2>
          <p>
            Both M-Shwari and Fuliza are underwritten by commercial bank balance sheets. When you borrow and repay either facility on time, positive payment milestones are logged with licensed Credit Reference Bureaus (CRBs), establishing a solid mobile credit history that unlocks higher loan limits, Hustler Fund tiers, and bank mortgage products.
          </p>
          <p>
            Conversely, rolling over Fuliza beyond 120 days or leaving an M-Shwari loan unpaid past 60 days triggers negative adverse listing, freezing your eligibility for digital loans across all Kenyan commercial lending apps.
          </p>
        </section>
      </SeoArticle>
    </div>
  );
}
