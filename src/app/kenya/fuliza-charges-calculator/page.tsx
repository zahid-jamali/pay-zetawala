'use client';

import React, { useState, useMemo } from 'react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { MoneyInput } from '@/components/MoneyInput';
import { NumberInput } from '@/components/NumberInput';
import { ResultPanel, BreakdownRow, CalculationLegalSource } from '@/components/ResultPanel';
import { FaqAccordion } from '@/components/FaqAccordion';
import { RelatedTools } from '@/components/RelatedTools';
import { SeoArticle, WorkedExampleItem, OfficialSourceLink } from '@/components/SeoArticle';
import { StructuredData } from '@/components/StructuredData';
import { getRelatedPages } from '@/config/pages';
import { calculateFuliza } from '@/lib/ke/fuliza';
import { getKeRates } from '@/lib/seo/rules-content';

export default function FulizaChargesCalculator() {
  const keRates = getKeRates();
  const [amount, setAmount] = useState<number>(5000);
  const [days, setDays] = useState<number>(10);

  const fuliza = useMemo(() => {
    return calculateFuliza({ amount, days });
  }, [amount, days]);

  const rows: BreakdownRow[] = [
    {
      label: 'Fuliza Overdraft Principal',
      value: `KES ${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
    },
    {
      label: 'Upfront Access Fee (1.0%)',
      value: `KES ${fuliza.accessFee.toFixed(2)}`,
      sublabel: 'Charged immediately upon facility drawdown',
    },
    {
      label: 'Daily Maintenance Rate',
      value: `KES ${fuliza.dailyTotalFee.toFixed(2)} / day`,
      sublabel: `Base fee: KES ${fuliza.dailyBaseFee.toFixed(2)} + 20% excise component`,
    },
    {
      label: 'Grace Period Window',
      value: fuliza.freeGraceDays > 0 ? `${fuliza.freeGraceDays} Days Free` : 'No Grace Window',
      sublabel: fuliza.freeGraceDays > 0 ? 'Zero maintenance fee if settled within 3 days' : 'Applies to overdrafts above KES 1,000',
    },
    {
      label: `Total Maintenance Fees (${fuliza.chargeableDays} chargeable ${fuliza.chargeableDays === 1 ? 'day' : 'days'})`,
      value: `KES ${fuliza.totalMaintenanceFees.toFixed(2)}`,
      highlight: true,
    },
    {
      label: 'Total Finance Cost',
      value: `KES ${fuliza.totalFinanceCost.toFixed(2)}`,
      sublabel: `Effective cost: ${fuliza.effectivePercentageCost}% of borrowed principal`,
      highlight: true,
    },
    {
      label: 'Total Auto-Settlement Amount',
      value: `KES ${fuliza.totalSettlementAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      highlight: true,
      sublabel: 'Automatically deducted from incoming M-PESA deposits',
    },
  ];

  const legalSources: CalculationLegalSource[] = [
    {
      title: 'NCBA Bank Kenya PLC & Safaricom PLC',
      documentNumber: 'Fuliza Consumer Terms & Tariff Revision',
      summary: '1.0% access fee, tiered daily maintenance charges, and 3-day zero-maintenance-fee grace period for balances up to KES 1,000.',
    },
    {
      title: 'Central Bank of Kenya (CBK)',
      documentNumber: 'Digital Credit Providers Regulations',
      summary: 'Mandates clear total cost disclosures and regulates auto-recovery practices for mobile credit lines.',
    },
  ];

  const copySummaryText = `Safaricom Fuliza Overdraft Cost (${keRates.verifiedYear}):
Borrowed Amount: KES ${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
Holding Period: ${days} Days
- 1% Access Fee: KES ${fuliza.accessFee.toFixed(2)}
- Daily Maintenance Fees: KES ${fuliza.totalMaintenanceFees.toFixed(2)}
Total Finance Cost: KES ${fuliza.totalFinanceCost.toFixed(2)}
Total Amount to Repay: KES ${fuliza.totalSettlementAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
Calculated on Pay (https://pay.zetawala.com/kenya/fuliza-charges-calculator/)`;

  const related = getRelatedPages('ke-fuliza');

  const faqs = [
    {
      question: 'How do Safaricom Fuliza charges work in 2026?',
      answer:
        'Fuliza applies a 1.0% upfront access fee upon borrowing, plus a tiered daily maintenance fee for each day the overdraft remains unsettled (up to a 30-day maximum term). Overdrafts of KES 1,000 or less have a 3-day grace period where no daily fee is charged.',
    },
    {
      question: 'What is the daily maintenance fee for Fuliza?',
      answer:
        'Daily fees depend on your overdraft band: KES 101–500 (KES 2.50/day), KES 501–1,000 (KES 6.00/day), KES 1,001–1,500 (KES 18.00/day), KES 1,501–2,500 (KES 20.00/day), KES 2,501–70,000 (KES 25.00/day).',
    },
    {
      question: 'How does the 3-day Fuliza grace period work?',
      answer:
        'For overdrafts of KES 1,000 and below, Safaricom grants a 3-day (72-hour) grace window. If you repay the balance within 3 days, daily maintenance fees are waived (you pay only the 1% access fee). Daily charges start on Day 4 if unpaid.',
    },
    {
      question: 'How does Fuliza auto-recovery work?',
      answer:
        'Fuliza is an auto-recovery continuous overdraft facility. Whenever funds are deposited into your M-PESA wallet (via send money, bank transfer, or agent deposit), the system immediately intercepts and deducts the funds to settle your outstanding Fuliza balance.',
    },
    {
      question: 'What is the maximum term for a Fuliza overdraft?',
      answer:
        'The maximum loan term is 30 calendar days. If an overdraft remains unpaid after 30 days, your Fuliza facility is frozen, you cannot access your M-PESA wallet for outgoing transactions, and negative data is reported to Credit Reference Bureaus (CRB).',
    },
    {
      question: 'Can I withdraw cash from Fuliza at an agent?',
      answer:
        'Yes. Safaricom allows customers to withdraw cash at M-PESA agents using Fuliza overdraft limits. Standard agent withdrawal fees apply in addition to Fuliza financing fees.',
    },
    {
      question: 'How is my Fuliza limit determined?',
      answer:
        'Your limit is assigned by NCBA Bank and Safaricom based on your historical M-PESA line activity, regular transaction volume, airtime recharges, and timely repayment of previous mobile credit lines.',
    },
    {
      question: 'Is Fuliza cheaper than M-Shwari?',
      answer:
        'For short-term borrowing of 1 to 5 days, Fuliza is generally cheaper due to small daily fees. For holding periods longer than 15 to 20 days, M-Shwari’s fixed 9% 30-day fee is often more economical than accumulating 30 days of Fuliza maintenance charges.',
    },
  ];

  const workedExamples: WorkedExampleItem[] = [
    {
      title: 'Mid-Tier Overdraft (KES 5,000 for 10 Days)',
      scenario: 'Completing a bill payment when wallet balance is insufficient, holding for 10 days until payday.',
      inputs: [
        { label: 'Overdraft Principal', value: 'KES 5,000.00' },
        { label: 'Holding Duration', value: '10 Days' },
        { label: 'Applicable Tier', value: 'Tier 5 (KES 2,501–70,000)' },
      ],
      steps: [
        { label: '1.0% Upfront Access Fee', formula: 'KES 5,000 × 1.0%', value: 'KES 50.00' },
        { label: 'Daily Maintenance Rate', formula: 'Fixed band rate', value: 'KES 25.00 / day' },
        { label: '10 Days Total Maintenance', formula: '10 days × KES 25.00', value: 'KES 250.00' },
        { label: 'Total Financing Cost', formula: 'KES 50 access + KES 250 daily', value: 'KES 300.00', highlight: true },
      ],
      resultLabel: 'Total Auto-Settlement Amount',
      resultValue: 'KES 5,300.00',
      notes: 'Automatically deducted when funds are received.',
    },
    {
      title: 'Small Emergency (KES 800 for 2 Days - Grace Period)',
      scenario: 'Borrowing KES 800 to buy groceries, repaid within 48 hours.',
      inputs: [
        { label: 'Overdraft Principal', value: 'KES 800.00' },
        { label: 'Holding Duration', value: '2 Days (Under 3-day grace limit)' },
      ],
      steps: [
        { label: '1.0% Upfront Access Fee', formula: 'KES 800 × 1.0%', value: 'KES 8.00' },
        { label: 'Daily Maintenance Fee', formula: 'Waived within 3-day window', value: 'KES 0.00 (FREE)', highlight: true },
        { label: 'Total Financing Cost', formula: 'KES 8 access fee only', value: 'KES 8.00' },
      ],
      resultLabel: 'Total Auto-Settlement Amount',
      resultValue: 'KES 808.00',
      notes: 'Demonstrates the 72-hour zero-fee grace benefit.',
    },
  ];

  const officialSources: OfficialSourceLink[] = [
    {
      name: 'Safaricom PLC & NCBA Bank Kenya',
      documentTitle: 'Official Fuliza Terms & Daily Tariff Bands',
      url: 'https://www.safaricom.co.ke/personal/m-pesa/credit-facilities/fuliza',
      verifiedDate: keRates.verifiedDate,
    },
    {
      name: 'Central Bank of Kenya (CBK)',
      documentTitle: 'Digital Credit and Micro-Lending Guidelines',
      url: 'https://www.centralbank.go.ke',
      verifiedDate: keRates.verifiedDate,
    },
  ];

  const quickAnswerText = `Safaricom Fuliza charges include a 1.0% upfront access fee plus a daily maintenance fee determined by your overdraft tier. Overdrafts up to KES 1,000 enjoy a 3-day (${keRates.fulizaFreeHours}-hour) zero-fee grace period. Any funds deposited into your M-PESA wallet are automatically deducted to settle the outstanding balance.`;

  const tocItems = [
    { id: 'fee-structure', label: '1% Access Fee & Daily Maintenance Tiers' },
    { id: 'grace-period-rules', label: 'The 3-Day Grace Period for Under KES 1,000' },
    { id: 'daily-rates-schedule', label: 'Official Daily Maintenance Fee Table' },
    { id: 'auto-recovery-rules', label: 'Auto-Deductions & Wallet Holding Rules' },
    { id: 'fuliza-vs-mshwari', label: 'Fuliza vs M-Shwari: Cost Comparison' },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <StructuredData
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Kenya', url: '/kenya/' },
          { name: 'Fuliza Charges Calculator 2026', url: '/kenya/fuliza-charges-calculator/' },
        ]}
        webApp={{
          name: 'Fuliza Charges Calculator 2026',
          url: '/kenya/fuliza-charges-calculator/',
          description: 'Calculate daily maintenance fees and total cost for any Safaricom Fuliza overdraft with the 3-day grace window.',
          applicationCategory: 'FinanceApplication',
        }}
        faqs={faqs}
      />

      <Breadcrumbs
        items={[
          { label: 'Kenya', href: '/kenya/' },
          { label: 'Fuliza Charges Calculator' },
        ]}
      />

      {/* Page Header */}
      <div className="border-b border-neutral-200 pb-6 pt-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
          Fuliza Charges Calculator {keRates.verifiedYear}
        </h1>
        <p className="mt-2 text-sm sm:text-base text-neutral-600 max-w-3xl leading-relaxed">
          Compute daily maintenance charges, the 1.0% access fee, and total auto-recovery costs for Safaricom Fuliza overdrafts. Features the official 3-day zero-maintenance-fee grace period.
        </p>
      </div>

      {/* Main Grid: Inputs Left, Result Right */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Inputs Column */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-2xs space-y-6">
            <h2 className="text-base font-bold text-neutral-900 border-b border-neutral-100 pb-3">
              Overdraft Parameters
            </h2>

            <MoneyInput
              label="Fuliza Overdraft Amount"
              value={amount}
              onChange={setAmount}
              currencySymbol="KES"
              hint="Enter amount borrowed (up to your approved Safaricom Fuliza limit, max KES 70,000)."
              min={1}
              max={70000}
              required
            />

            <NumberInput
              label="Expected Holding Duration (Days)"
              value={days}
              onChange={setDays}
              min={1}
              max={30}
              hint="Days before you deposit funds into your M-PESA wallet to settle the balance (max 30 days)."
              required
            />
          </div>
        </div>

        {/* Right Sticky Result Column */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
          <ResultPanel
            title="Fuliza Overdraft Cost"
            headlineLabel="Total Financing Cost"
            headlineValue={`KES ${fuliza.totalFinanceCost.toFixed(2)}`}
            subHeadline={`Total auto-recovery amount: KES ${fuliza.totalSettlementAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
            rows={rows}
            sources={legalSources}
            copySummaryText={copySummaryText}
            shareTitle="Fuliza Overdraft Calculation"
            calloutMessage={
              fuliza.freeGraceDays > 0 && days <= fuliza.freeGraceDays
                ? {
                    type: 'success',
                    text: '3-Day Grace Period Active: Zero daily maintenance fees charged because overdraft is under KES 1,000 and repaid within 3 days.',
                  }
                : undefined
            }
          />
        </div>
      </div>

      {/* SEO Article */}
      <SeoArticle
        quickAnswer={quickAnswerText}
        toc={tocItems}
        workedExamples={workedExamples}
        sources={officialSources}
        verifiedDate={keRates.verifiedDate}
      >
        <h2 id="fee-structure">The 1% Access Fee and Daily Maintenance Tiers</h2>
        <p>
          Fuliza is an unsecured continuous overdraft facility provided by Safaricom PLC in partnership with NCBA Bank Kenya and KCB Bank. It allows M-PESA customers to complete transactions (Send Money, Lipa Na M-PESA, or Paybill) when their wallet balance is insufficient.
        </p>
        <p>
          Fuliza charges two distinct fee components:
        </p>
        <ul>
          <li><strong>1.0% Upfront Access Fee:</strong> Charged once upon drawing down the facility. For example, borrowing KES 5,000 incurs an immediate KES 50 access fee.</li>
          <li><strong>Tiered Daily Maintenance Fee:</strong> Accrues every 24 hours until the outstanding principal is settled by an incoming wallet deposit.</li>
        </ul>

        <h2 id="grace-period-rules">The 3-Day Zero-Fee Grace Period</h2>
        <p>
          To protect consumers borrowing small emergency amounts, Safaricom provides a 3-day ({keRates.fulizaFreeHours}-hour) zero-maintenance-fee grace period for overdrafts of KES 1,000 and below.
        </p>
        <p>
          If you borrow KES 500 or KES 1,000 and deposit funds to clear the balance within 3 days, all daily maintenance fees are waived. You pay only the 1% access fee. Daily fees start accruing only on Day 4 if the balance remains unsettled.
        </p>

        <h2 id="daily-rates-schedule">Official Daily Maintenance Fee Table</h2>
        <div className="not-prose my-6 overflow-x-auto rounded-xl border border-neutral-200">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-100 text-neutral-800 uppercase font-bold">
              <tr>
                <th className="p-3">Overdraft Tariff Band</th>
                <th className="p-3">Daily Maintenance Fee</th>
                <th className="p-3">Grace Window</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 text-neutral-700">
              <tr>
                <td className="p-3 font-medium text-neutral-900">KES 1 – KES 100</td>
                <td className="p-3 font-semibold text-brand-strong">KES 0.00 / day</td>
                <td className="p-3">Always Free</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-neutral-900">KES 101 – KES 500</td>
                <td className="p-3">KES 2.50 / day</td>
                <td className="p-3">3 Days Free</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-neutral-900">KES 501 – KES 1,000</td>
                <td className="p-3">KES 6.00 / day</td>
                <td className="p-3">3 Days Free</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-neutral-900">KES 1,001 – KES 1,500</td>
                <td className="p-3">KES 18.00 / day</td>
                <td className="p-3">No Grace Period</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-neutral-900">KES 1,501 – KES 2,500</td>
                <td className="p-3">KES 20.00 / day</td>
                <td className="p-3">No Grace Period</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-neutral-900">KES 2,501 – KES 70,000</td>
                <td className="p-3 font-semibold">KES 25.00 / day</td>
                <td className="p-3">No Grace Period</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 id="auto-recovery-rules">Auto-Deductions and Wallet Freezing Rules</h2>
        <p>
          Fuliza functions through an automatic debit mechanism. Any incoming funds received into your M-PESA line—including P2P transfers, bank withdrawals, or agent deposits—are automatically seized to offset your outstanding principal and accumulated fees.
        </p>
        <p>
          If an overdraft remains unpaid beyond the 30-day term, Safaricom freezes your facility, blocks further outgoing transactions, and reports your default status to licensed Credit Reference Bureaus (CRB).
        </p>

        <h2 id="fuliza-vs-mshwari">Fuliza vs M-Shwari: Cost Comparison</h2>
        <p>
          Choosing between Fuliza and M-Shwari depends on your expected holding period:
        </p>
        <ul>
          <li><strong>Short Term (1–7 Days):</strong> Fuliza is significantly cheaper. For KES 5,000 held for 3 days, Fuliza costs KES 125 total, compared to M-Shwari’s fixed KES 450 facility fee.</li>
          <li><strong>Full Month (15–30 Days):</strong> M-Shwari is cheaper. For KES 5,000 held for 30 days, Fuliza costs KES 800 in daily charges, whereas M-Shwari costs a fixed KES 450 (9.0% total fee).</li>
        </ul>
      </SeoArticle>

      {/* Related Tools */}
      <div className="mt-12">
        <RelatedTools tools={related} />
      </div>

      {/* FAQs */}
      <div className="mt-10">
        <FaqAccordion faqs={faqs} />
      </div>
    </div>
  );
}
