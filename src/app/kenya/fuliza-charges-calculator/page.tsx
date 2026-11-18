'use client';

import React, { useState, useMemo } from 'react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { MoneyInput } from '@/components/MoneyInput';
import { NumberInput } from '@/components/NumberInput';
import { ResultPanel, BreakdownRow, CalculationLegalSource } from '@/components/ResultPanel';
import { FaqAccordion } from '@/components/FaqAccordion';
import { RelatedTools } from '@/components/RelatedTools';
import { getRelatedPages } from '@/config/pages';
import { calculateFuliza } from '@/lib/ke/fuliza';
import { ShieldCheck, Clock, Zap } from 'lucide-react';

export default function FulizaChargesCalculator() {
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
      sublabel: `Base fee: KES ${fuliza.dailyBaseFee.toFixed(2)} + 20% Excise: KES ${fuliza.dailyExciseDuty.toFixed(2)}`,
    },
    {
      label: 'Grace Period Window',
      value: fuliza.freeGraceDays > 0 ? `${fuliza.freeGraceDays} Days Free` : 'No Grace Window',
      sublabel: fuliza.freeGraceDays > 0 ? 'Zero daily maintenance fee if repaid in 3 days' : 'Applies to overdrafts above KES 1,000',
    },
    {
      label: `Total Maintenance Fees (${fuliza.chargeableDays} chargeable ${fuliza.chargeableDays === 1 ? 'day' : 'days'})`,
      value: `KES ${fuliza.totalMaintenanceFees.toFixed(2)}`,
      highlight: true,
    },
    {
      label: 'Total Finance Cost',
      value: `KES ${fuliza.totalFinanceCost.toFixed(2)}`,
      sublabel: `Effective cost: ${fuliza.effectivePercentageCost}% of borrowed amount`,
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
      title: 'Safaricom PLC & NCBA / KCB',
      documentNumber: 'Fuliza M-PESA Terms and Conditions',
      summary: '1% access fee and tiered daily maintenance fee bands. Overdraft facility limit is capped at KES 70,000.',
    },
    {
      title: 'Safaricom Restructured Fuliza Pricing',
      documentNumber: 'Pricing Restructure (effective October 2022)',
      summary: 'Introduced 3-day free grace period for balances KES 101 – 1,000 and reduced daily maintenance rates.',
    },
  ];

  const copySummaryText = `Safaricom Fuliza M-PESA Overdraft Calculation:
Overdraft Amount: KES ${amount.toLocaleString()}
Duration: ${days} days
- 1% Upfront Access Fee: KES ${fuliza.accessFee.toFixed(2)}
- Daily Rate: KES ${fuliza.dailyTotalFee.toFixed(2)} / day
- Total Maintenance Fees: KES ${fuliza.totalMaintenanceFees.toFixed(2)} (${fuliza.chargeableDays} days charged)
Total Finance Cost: KES ${fuliza.totalFinanceCost.toFixed(2)} (${fuliza.effectivePercentageCost}%)
Total Settlement: KES ${fuliza.totalSettlementAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
Calculated on Pay (https://pay.zetawala.com/kenya/fuliza-charges-calculator/)`;

  const related = getRelatedPages('ke-fuliza');

  const faqs = [
    {
      question: 'How is Fuliza charged by Safaricom?',
      answer:
        'Fuliza charges two fees:<br/><br/>1. <strong>Access Fee:</strong> A one-off charge of 1.0% of the overdraft amount.<br/>2. <strong>Daily Maintenance Fee:</strong> A daily charge applied starting at midnight for every day the facility remains unsettled, based on the overdraft tier.',
    },
    {
      question: 'Which Fuliza balances qualify for the 3-day free grace period?',
      answer:
        'Overdrafts between <strong>KES 101 and KES 1,000</strong> have a 3-day grace period. If you repay the full balance within the first 3 days, the daily maintenance fee is KES 0.00 (you only pay the 1% access fee). If not repaid within 3 days, daily maintenance fees begin from day 4.',
    },
    {
      question: 'How is Fuliza repaid?',
      answer:
        'Any incoming funds to your M-PESA wallet (transfers received, bank withdrawals, agent cash-ins) are <strong>automatically applied</strong> towards settling your outstanding Fuliza balance until the principal and accumulated fees are cleared.',
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <Breadcrumbs
        items={[
          { label: 'Kenya', href: '/kenya/' },
          { label: 'Fuliza Charges Calculator' },
        ]}
      />

      <div className="border-b border-neutral-200 pb-6 pt-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft px-3 py-1 text-xs font-semibold text-brand-strong mb-2">
          <ShieldCheck className="h-3.5 w-3.5 text-brand" />
          <span>Official Safaricom Fuliza Terms Compliant</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
          Fuliza Charges Calculator 2026
        </h1>
        <p className="mt-2 text-sm sm:text-base text-neutral-600 max-w-3xl leading-relaxed">
          Calculate the total cost of borrowing on Safaricom Fuliza M-PESA: 1% upfront access fee, tiered daily maintenance charges, and 3-day grace periods.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-2xs space-y-5">
            <h2 className="text-base font-bold text-neutral-900 border-b border-neutral-100 pb-3">
              Overdraft Facility Inputs
            </h2>

            <MoneyInput
              label="Fuliza Overdraft Amount"
              value={amount}
              onChange={setAmount}
              currencySymbol="KES"
              hint="Maximum allowable Fuliza facility limit is KES 70,000."
              min={1}
              max={70000}
              required
            />

            <NumberInput
              label="Expected Repayment Duration (Days)"
              value={days}
              onChange={setDays}
              min={1}
              max={30}
              suffix="days"
              hint="Fuliza facility has a maximum term of 30 days."
              required
            />

            {/* Grace period badge */}
            {amount <= 1000 && amount > 100 && (
              <div className="rounded-lg bg-emerald-50 p-4 border border-emerald-200 text-xs text-emerald-900 space-y-1">
                <div className="flex items-center gap-1.5 font-bold">
                  <Zap className="h-4 w-4 text-emerald-600" />
                  <span>3-Day Free Grace Period Active</span>
                </div>
                <p>
                  Because your overdraft is between KES 101 and KES 1,000, daily maintenance fees are <strong>KES 0.00</strong> if repaid on or before Day 3!
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <ResultPanel
            title="Fuliza Total Borrowing Cost"
            headlineLabel="Total Settlement Due"
            headlineValue={`KES ${fuliza.totalSettlementAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            subHeadline={`Borrow KES ${amount.toLocaleString()} • Total finance cost: KES ${fuliza.totalFinanceCost.toFixed(2)} (${fuliza.effectivePercentageCost}%)`}
            rows={rows}
            sources={legalSources}
            copySummaryText={copySummaryText}
            shareTitle="Safaricom Fuliza Overdraft Cost Calculation"
            calloutMessage={
              fuliza.freeGraceDays > 0 && days <= fuliza.freeGraceDays
                ? {
                    type: 'success',
                    text: 'Free Daily Fees: Repaying within 3 days saves 100% of daily maintenance fees.',
                  }
                : undefined
            }
          />
        </div>
      </div>

      <RelatedTools tools={related} />
      <FaqAccordion faqs={faqs} />
    </div>
  );
}
