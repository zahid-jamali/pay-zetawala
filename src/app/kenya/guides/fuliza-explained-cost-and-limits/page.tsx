import React from 'react';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SeoArticle, WorkedExampleItem, OfficialSourceLink } from '@/components/SeoArticle';
import { StructuredData } from '@/components/StructuredData';
import { getKeRates } from '@/lib/seo/rules-content';
import { Zap, Calculator, HelpCircle, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function GuideFulizaExplainedCostAndLimits() {
  const keRates = getKeRates();

  const faqs = [
    {
      question: 'What is Fuliza M-PESA and how does it work?',
      answer:
        'Fuliza is a continuous credit overdraft service provided by Safaricom in partnership with NCBA Bank and KCB Bank. It allows M-PESA customers to complete transactions—including sending money, paying Paybill utilities, and buying goods via Till Numbers—even when they have insufficient wallet balance.',
    },
    {
      question: 'How are Fuliza fees calculated?',
      answer:
        'Fuliza charges two fees: (1) an Access Facility Fee of 1.0% charged once upon drawing down the overdraft, and (2) a Daily Maintenance Fee ranging from KES 0.00 up to KES 25.00 charged every midnight that an outstanding balance remains unpaid.',
    },
    {
      question: 'How does the 3-day Fuliza free grace period work?',
      answer:
        'Under Safaricom’s restructured tariffs, overdraft balances between KES 101 and KES 1,000 enjoy a 3-day zero-fee grace period. If you repay the borrowed amount within three days of drawing, zero daily maintenance fees are charged (only the initial 1% facility fee applies).',
    },
    {
      question: 'How is Fuliza automatically repaid?',
      answer:
        'Fuliza operates under automated recovery mechanics. Any money deposited or received into your M-PESA wallet—via P2P transfer, agent cash deposit, bank-to-M-PESA transfer, or salary payment—is immediately intercepted and applied toward your outstanding Fuliza balance until fully cleared.',
    },
    {
      question: 'How can I increase my Fuliza overdraft limit in Kenya?',
      answer:
        'Fuliza limits are reviewed and updated dynamically every 30 to 90 days by NCBA and KCB algorithms. To grow your limit: (1) use M-PESA regularly for daily retail transactions, (2) avoid defaulting on other mobile loans such as M-Shwari or Hustler Fund, and (3) repay Fuliza drawdowns promptly within a few days.',
    },
  ];

  const workedExamples: WorkedExampleItem[] = [
    {
      title: 'Short-Term Overdraft within 3-Day Grace Period (KES 800)',
      scenario:
        'A user needs KES 800 to buy groceries and draws Fuliza for 2 days before receiving salary and repaying in full.',
      inputs: [
        { label: 'Overdraft Amount', value: 'KES 800.00' },
        { label: 'Repayment Timeline', value: '2 days (within 3-day grace period)' },
        { label: 'Applicable Tier', value: 'KES 501–1,000 bracket' },
      ],
      steps: [
        { label: 'Access Facility Fee (1%)', formula: '1.0% × KES 800', value: 'KES 8.00', highlight: true },
        { label: 'Daily Maintenance Fee', formula: 'KES 0.00 during 3-day grace period', value: 'KES 0.00' },
        { label: 'Total Borrowing Cost', formula: 'KES 8.00 facility fee + KES 0.00 daily', value: 'KES 8.00' },
      ],
      resultLabel: 'Total Repayment Required',
      resultValue: 'KES 808.00',
      notes: 'Super-low cost because repaid before the 3-day grace ends.',
    },
    {
      title: 'Higher Overdraft Held for 7 Days (KES 5,000)',
      scenario:
        'A merchant needs KES 5,000 to settle an urgent supplier invoice and repays the Fuliza balance on Day 7.',
      inputs: [
        { label: 'Overdraft Amount', value: 'KES 5,000.00' },
        { label: 'Duration Outstanding', value: '7 calendar days' },
        { label: 'Daily Maintenance Band', value: 'KES 2,501–70,000 band (KES 20.00/day)' },
      ],
      steps: [
        { label: 'Access Facility Fee (1%)', formula: '1.0% × KES 5,000', value: 'KES 50.00' },
        { label: 'Daily Fee (Day 1 to 7)', formula: '7 days × KES 20.00/day', value: 'KES 140.00', highlight: true },
        { label: 'Total Financing Cost', formula: 'KES 50 facility + KES 140 daily fees', value: 'KES 190.00' },
      ],
      resultLabel: 'Total Amount Deducted on Day 7',
      resultValue: 'KES 5,190.00',
      notes: 'Principal KES 5,000 + KES 190 total fees = KES 5,190.',
    },
  ];

  const officialSources: OfficialSourceLink[] = [
    {
      name: 'Safaricom PLC',
      documentTitle: 'Fuliza M-PESA Consumer Terms & Conditions & Tariff Restructure',
      url: 'https://www.safaricom.co.ke/personal/m-pesa/credit-financial-services/fuliza',
      verifiedDate: keRates.verifiedDate,
    },
    {
      name: 'NCBA Bank Kenya PLC',
      documentTitle: 'Digital Financial Services Regulatory Disclosures & Overdraft Tariffs',
      url: 'https://ncbagroup.com',
      verifiedDate: keRates.verifiedDate,
    },
  ];

  const toc = [
    { id: 'how-fuliza-works', label: '1. How Fuliza Overdraft Works' },
    { id: 'daily-fee-bands', label: '2. Daily Maintenance Fee Bands & Restructured Tariffs' },
    { id: 'three-day-grace', label: '3. The 3-Day Zero-Fee Grace Period' },
    { id: 'repayment-mechanics', label: '4. Automated Repayment & Auto-Deductions' },
    { id: 'growing-your-limit', label: '5. How to Increase Your Fuliza Limit' },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <StructuredData
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Kenya', url: '/kenya/' },
          { name: 'Guides', url: '/kenya/' },
          { name: 'Fuliza Explained', url: '/kenya/guides/fuliza-explained-cost-and-limits/' },
        ]}
        article={{
          headline: 'Fuliza Explained: Cost, Daily Fees, Limits & Repayment (2026)',
          description: 'A complete breakdown of Safaricom Fuliza overdraft daily maintenance fees, 1% facility fee, 3-day grace period, and limit growth rules.',
          url: 'https://pay.zetawala.com/kenya/guides/fuliza-explained-cost-and-limits/',
          datePublished: '2026-02-25T08:00:00+03:00',
          dateModified: '2026-11-18T00:00:00+03:00',
        }}
        faqs={faqs}
      />

      <Breadcrumbs
        items={[
          { label: 'Kenya', href: '/kenya/' },
          { label: 'Guides', href: '/kenya/' },
          { label: 'Fuliza Explained' },
        ]}
      />

      <header className="border-b border-neutral-200 pb-6 pt-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft px-3 py-1 text-xs font-semibold text-brand-strong mb-2">
          <Zap className="h-3.5 w-3.5 text-brand" />
          <span>Mobile Credit Analysis</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
          Fuliza Explained: Cost, Daily Fees &amp; Limits
        </h1>
        <p className="mt-2 text-sm sm:text-base text-neutral-600 leading-relaxed">
          How the 1.0% facility fee, daily maintenance tiers, 3-day zero-fee grace period, and auto-repayment rules operate on Safaricom&apos;s continuous mobile overdraft.
        </p>
      </header>

      {/* Tool Shortcut */}
      <div className="mt-6 rounded-xl border border-brand/30 bg-brand-soft/20 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-bold text-neutral-900">Simulate your exact Fuliza costs</h2>
          <p className="text-xs text-neutral-600">Enter your overdraft amount and expected holding days to see total fees.</p>
        </div>
        <Link
          href="/kenya/fuliza-charges-calculator/"
          className="inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-brand-strong transition-colors shrink-0"
        >
          <Calculator className="h-4 w-4" />
          <span>Fuliza Calculator</span>
        </Link>
      </div>

      <SeoArticle
        quickAnswer="Fuliza charges a 1.0% access facility fee upon draw-down plus a daily maintenance fee from KES 0.00 to KES 25.00 charged every midnight that a balance remains unpaid. Overdrafts up to KES 1,000 enjoy a 3-day zero daily fee grace period. Any incoming funds to your M-PESA wallet are automatically deducted to repay the balance."
        toc={toc}
        workedExamples={workedExamples}
        sources={officialSources}
        verifiedDate={keRates.verifiedDate}
      >
        <section id="how-fuliza-works" className="space-y-4">
          <h2>1. How Fuliza Overdraft Works</h2>
          <p>
            Launched by Safaricom in collaboration with NCBA Bank and KCB Bank, <strong>Fuliza M-PESA</strong> is an unsecured continuous overdraft facility. Unlike traditional term loans (such as M-Shwari, which provides cash to your wallet for a fixed 30-day period), Fuliza operates at the point of checkout.
          </p>
          <p>
            When you attempt to complete a transaction (Send Money, Lipa Na M-PESA Buy Goods, or Paybill) that exceeds your current wallet balance, the system prompts you: <em>&quot;Do you wish to Fuliza the deficit balance of KES X?&quot;</em> If accepted, Safaricom finances the shortfall up to your approved credit limit.
          </p>
        </section>

        <section id="daily-fee-bands" className="space-y-4">
          <h2>2. Daily Maintenance Fee Bands &amp; Restructured Tariffs</h2>
          <p>
            Following widespread consumer protection discussions and Central Bank of Kenya pricing interventions, Safaricom restructured Fuliza tariffs to significantly lower borrowing costs for low-to-middle income users.
          </p>
          <div className="overflow-x-auto rounded-lg border border-neutral-200 my-4">
            <table className="w-full text-left text-sm text-neutral-700">
              <thead className="bg-neutral-100 text-xs font-bold uppercase text-neutral-800">
                <tr>
                  <th className="px-4 py-3">Overdraft Tariff Band</th>
                  <th className="px-4 py-3">One-Off Facility Fee</th>
                  <th className="px-4 py-3">Daily Maintenance Fee</th>
                  <th className="px-4 py-3">Special Grace Rules</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                <tr>
                  <td className="px-4 py-3 font-medium">KES 1 – 100</td>
                  <td className="px-4 py-3">1.0%</td>
                  <td className="px-4 py-3 font-bold text-brand">KES 0.00 / day</td>
                  <td className="px-4 py-3">100% Free Daily Fee Forever</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">KES 101 – 500</td>
                  <td className="px-4 py-3">1.0%</td>
                  <td className="px-4 py-3">KES 2.50 / day</td>
                  <td className="px-4 py-3">Free for First 3 Days</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">KES 501 – 1,000</td>
                  <td className="px-4 py-3">1.0%</td>
                  <td className="px-4 py-3">KES 5.00 / day</td>
                  <td className="px-4 py-3">Free for First 3 Days</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">KES 1,001 – 1,500</td>
                  <td className="px-4 py-3">1.0%</td>
                  <td className="px-4 py-3">KES 18.00 / day</td>
                  <td className="px-4 py-3">Standard Daily Fee</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">KES 1,501 – 2,500</td>
                  <td className="px-4 py-3">1.0%</td>
                  <td className="px-4 py-3">KES 18.00 / day</td>
                  <td className="px-4 py-3">Standard Daily Fee</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">KES 2,501 – 70,000</td>
                  <td className="px-4 py-3">1.0%</td>
                  <td className="px-4 py-3">KES 20.00 / day</td>
                  <td className="px-4 py-3">Capped at KES 20–25/day</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section id="three-day-grace" className="space-y-4">
          <h2>3. The 3-Day Zero-Fee Grace Period</h2>
          <p>
            For drawdowns up to KES 1,000, Safaricom provides a <strong>three-day interest-free grace window</strong>. If you draw KES 500 on Monday morning and repay the balance on or before Wednesday midnight:
          </p>
          <ul>
            <li>You pay the one-off 1% access facility fee (KES 5.00).</li>
            <li>You pay <strong>KES 0.00 in daily maintenance fees</strong> for Monday, Tuesday, and Wednesday.</li>
          </ul>
          <p>
            If the balance remains outstanding on Day 4 (Thursday), the daily maintenance fee begins accruing retroactively or from that day forward according to your tier.
          </p>
        </section>

        <section id="repayment-mechanics" className="space-y-4">
          <h2>4. Automated Repayment &amp; Auto-Deductions</h2>
          <p>
            Unlike conventional bank loans that require manual mobile banking deposits, Fuliza enforces <strong>immediate automated recovery</strong>:
          </p>
          <p>
            Whenever funds arrive in your M-PESA wallet—whether an agent cash deposit, P2P transfer received from another user, a Paybill payout, or a transfer from your bank account—Safaricom automatically seizes the incoming amount to pay down your Fuliza debt.
          </p>
          <p>
            If you maintain an unpaid Fuliza balance for more than 120 days, your credit limit is reset to zero, your access to other digital loans (like M-Shwari and KCB M-PESA) is frozen, and negative reporting may be submitted to licensed Credit Reference Bureaus (CRBs) in accordance with CBK regulations.
          </p>
        </section>

        <section id="growing-your-limit" className="space-y-4">
          <h2>5. How to Increase Your Fuliza Limit</h2>
          <p>
            Your Fuliza limit is scored programmatically using automated algorithms from NCBA Bank and KCB Bank. To cultivate limit increases over time:
          </p>
          <ol>
            <li><strong>Keep Your Line Active:</strong> Maintain an active Safaricom SIM card for at least six months with consistent voice, data, and M-PESA usage.</li>
            <li><strong>Frequent Small Transactions:</strong> Regularly use Lipa Na M-PESA Buy Goods and Paybill for everyday purchases rather than using physical cash.</li>
            <li><strong>Rapid Repayment:</strong> Never leave Fuliza overdrafts lingering for more than two weeks. Borrowers who repay within 24 to 72 hours receive higher automated credit scores than those who wait the full month.</li>
          </ol>
        </section>
      </SeoArticle>
    </div>
  );
}
