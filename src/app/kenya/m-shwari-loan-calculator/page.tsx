'use client';

import React, { useState, useMemo } from 'react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { MoneyInput } from '@/components/MoneyInput';
import { ResultPanel, BreakdownRow, CalculationLegalSource } from '@/components/ResultPanel';
import { FaqAccordion } from '@/components/FaqAccordion';
import { RelatedTools } from '@/components/RelatedTools';
import { getRelatedPages } from '@/config/pages';
import { calculateMshwari } from '@/lib/ke/mshwari';
import { ShieldCheck, Info } from 'lucide-react';

export default function MshwariLoanCalculator() {
  const [loanAmount, setLoanAmount] = useState<number>(10000);

  const mshwari = useMemo(() => {
    return calculateMshwari({ loanAmount });
  }, [loanAmount]);

  const rows: BreakdownRow[] = [
    {
      label: 'Requested Loan Principal',
      value: `KES ${loanAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
    },
    {
      label: 'Loan Facilitation Fee (7.5%)',
      value: `KES ${mshwari.facilitationFee.toFixed(2)}`,
      sublabel: 'Standard NCBA / Safaricom loan facility fee',
    },
    {
      label: 'Upfront Excise Duty (1.5%)',
      value: `-KES ${mshwari.exciseDutyAmount.toFixed(2)}`,
      sublabel: '20% tax on facilitation fee, deducted upfront from disbursement',
      isDeduction: true,
    },
    {
      label: 'Net Cash Disbursed to M-PESA Wallet',
      value: `KES ${mshwari.netDisbursedAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      highlight: true,
      sublabel: 'Actual cash credited to your M-PESA account',
    },
    {
      label: 'Loan Repayment Term',
      value: '30 Days',
    },
    {
      label: 'Total Repayment Due at Day 30',
      value: `KES ${mshwari.repaymentDueDay30.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      highlight: true,
      sublabel: 'Principal + 7.5% Facilitation Fee',
    },
    {
      label: 'Total Cost of Credit (9.0%)',
      value: `KES ${mshwari.totalFinanceCost.toFixed(2)}`,
    },
  ];

  const legalSources: CalculationLegalSource[] = [
    {
      title: 'NCBA Bank Kenya PLC & Safaricom',
      documentNumber: 'M-Shwari Terms and Conditions',
      summary: '30-day fixed term loan facility. 7.5% facilitation fee and 20% excise duty on fees (total 9.0% cost).',
    },
  ];

  const copySummaryText = `M-Shwari 30-Day Loan Computation:
Requested Loan: KES ${loanAmount.toLocaleString()}
- Upfront Excise Duty: KES ${mshwari.exciseDutyAmount.toFixed(2)}
Net Cash Disbursed: KES ${mshwari.netDisbursedAmount.toLocaleString()}
Due at Day 30: KES ${mshwari.repaymentDueDay30.toLocaleString()}
Total Cost: KES ${mshwari.totalFinanceCost.toFixed(2)} (9.0%)
Calculated on Pay (https://pay.zetawala.com/kenya/m-shwari-loan-calculator/)`;

  const related = getRelatedPages('ke-mshwari');

  const faqs = [
    {
      question: 'How is an M-Shwari loan disbursed and repaid?',
      answer:
        'When an M-Shwari loan is approved, the <strong>1.5% excise duty is deducted upfront</strong> from the requested principal, and the net proceeds are disbursed directly to your M-PESA wallet. At the end of the 30-day term, you repay the original Principal + the 7.5% Facilitation Fee.',
    },
    {
      question: 'What happens if I cannot repay M-Shwari within 30 days?',
      answer:
        'If an M-Shwari loan is not repaid by day 30, the loan period is rolled over for an additional 30 days, and an additional <strong>7.5% facilitation fee</strong> is charged on the outstanding balance.',
    },
    {
      question: 'What is the minimum and maximum M-Shwari loan amount?',
      answer:
        'The minimum loan is <strong>KES 1,000</strong>, and the maximum loan limit can reach up to <strong>KES 1,000,000</strong> depending on your M-PESA transaction history and M-Shwari savings balance.',
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <Breadcrumbs
        items={[
          { label: 'Kenya', href: '/kenya/' },
          { label: 'M-Shwari Loan Calculator' },
        ]}
      />

      <div className="border-b border-neutral-200 pb-6 pt-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft px-3 py-1 text-xs font-semibold text-brand-strong mb-2">
          <ShieldCheck className="h-3.5 w-3.5 text-brand" />
          <span>Safaricom & NCBA Bank Official Terms</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
          M-Shwari Loan Calculator 2026
        </h1>
        <p className="mt-2 text-sm sm:text-base text-neutral-600 max-w-3xl leading-relaxed">
          Calculate 30-day M-Shwari loan fees: 7.5% facilitation fee, 1.5% upfront excise duty deduction, net cash in your wallet, and day 30 repayment amount.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-2xs space-y-5">
            <h2 className="text-base font-bold text-neutral-900 border-b border-neutral-100 pb-3">
              M-Shwari Loan Request
            </h2>

            <MoneyInput
              label="Requested Loan Amount"
              value={loanAmount}
              onChange={setLoanAmount}
              currencySymbol="KES"
              hint="Minimum loan is KES 1,000; maximum credit limit is KES 1,000,000."
              min={1000}
              max={1000000}
              required
            />

            <div className="flex items-start gap-2.5 rounded-lg bg-neutral-50 p-3.5 border border-neutral-200 text-xs text-neutral-700">
              <Info className="h-4 w-4 text-neutral-500 shrink-0 mt-0.5" />
              <div>
                <strong>Upfront Deduction Rule:</strong> Under Safaricom & NCBA regulations, the 1.5% excise duty (KES {mshwari.exciseDutyAmount.toFixed(2)}) is deducted immediately upon loan release, so you receive KES {mshwari.netDisbursedAmount.toLocaleString()} in cash.
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <ResultPanel
            title="M-Shwari Loan Summary"
            headlineLabel="Net Cash Disbursed to Wallet"
            headlineValue={`KES ${mshwari.netDisbursedAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            subHeadline={`Due at Day 30: KES ${mshwari.repaymentDueDay30.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
            rows={rows}
            sources={legalSources}
            copySummaryText={copySummaryText}
            shareTitle="M-Shwari Loan Calculation"
          />
        </div>
      </div>

      <RelatedTools tools={related} />
      <FaqAccordion faqs={faqs} />
    </div>
  );
}
