'use client';

import React, { useState, useMemo } from 'react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { MoneyInput } from '@/components/MoneyInput';
import { NumberInput } from '@/components/NumberInput';
import { Select } from '@/components/Select';
import { ResultPanel, BreakdownRow, CalculationLegalSource } from '@/components/ResultPanel';
import { FaqAccordion } from '@/components/FaqAccordion';
import { RelatedTools } from '@/components/RelatedTools';
import { getRelatedPages } from '@/config/pages';
import { calculateSssSalaryLoan } from '@/lib/ph/salary-loan';
import { ShieldCheck, Calendar, ChevronDown, ChevronUp } from 'lucide-react';

export default function SssSalaryLoanCalculator() {
  const [averageMsc, setAverageMsc] = useState<number>(20000);
  const [postedContributions, setPostedContributions] = useState<number>(72);
  const [priorCondonation, setPriorCondonation] = useState<boolean>(false);
  const [loanType, setLoanType] = useState<'auto' | 'one_month' | 'two_month'>('auto');
  const [showSchedule, setShowSchedule] = useState<boolean>(false);

  const loanResult = useMemo(() => {
    return calculateSssSalaryLoan({
      averageMsc,
      postedContributions,
      priorCondonation,
      desiredLoanType: loanType,
    });
  }, [averageMsc, postedContributions, priorCondonation, loanType]);

  const rows: BreakdownRow[] = [
    {
      label: 'Loan Type Approved',
      value: loanResult.loanType === 'two_month' ? '2-Month Salary Loan' : '1-Month Salary Loan',
      sublabel: loanResult.loanType === 'two_month' ? 'Qualified by >= 72 contributions' : 'Qualified by >= 36 contributions',
    },
    {
      label: 'Gross Approved Principal',
      value: `₱${loanResult.grossLoanAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      highlight: true,
    },
    {
      label: 'Service Fee (1.0% Upfront)',
      value: `-₱${loanResult.serviceFeeAmount.toFixed(2)}`,
      sublabel: 'Deducted directly from loan proceeds',
      isDeduction: true,
    },
    {
      label: 'Net Cash Proceeds Disbursed',
      value: `₱${loanResult.netLoanProceeds.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      highlight: true,
      sublabel: 'Credited to your UMID-ATM / My.SSS nominated bank account',
    },
    {
      label: 'Annual Interest Rate',
      value: `${loanResult.interestRateAnnual.toFixed(1)}% p.a.`,
      sublabel: priorCondonation ? '10.0% p.a. (due to prior condonation)' : '8.0% p.a. diminishing balance (Standard)',
    },
    {
      label: 'Repayment Term',
      value: '24 Months (2 Years)',
    },
    {
      label: 'Monthly Amortization',
      value: `₱${loanResult.monthlyAmortization.toFixed(2)} / month`,
      highlight: true,
    },
    {
      label: 'Total Interest Paid Over 2 Years',
      value: `₱${loanResult.totalInterest.toFixed(2)}`,
    },
    {
      label: 'Total Repayment Amount',
      value: `₱${loanResult.totalRepayment.toFixed(2)}`,
    },
  ];

  const legalSources: CalculationLegalSource[] = [
    {
      title: 'Social Security System (SSS)',
      documentNumber: 'SSS Circular No. 2025-004 (Salary Loan Guidelines)',
      summary: 'Sets standard interest at 8.0% p.a. on diminishing balance (10% if prior loan penalty condonation within 5 years), 1% service fee, and 24-month term.',
    },
    {
      title: 'Monthly Salary Credit Basis',
      documentNumber: 'Circular No. 2025-004 Section 4',
      summary: 'Maximum regular MSC basis is capped at ₱20,000. Maximum loanable amount is ₱20,000 for a 1-month loan and ₱40,000 for a 2-month loan.',
    },
  ];

  const copySummaryText = `SSS Salary Loan Computation:
Gross Loan: ₱${loanResult.grossLoanAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })} (${loanResult.loanType === 'two_month' ? '2-Month' : '1-Month'})
1% Service Fee: ₱${loanResult.serviceFeeAmount.toFixed(2)}
Net Cash Disbursed: ₱${loanResult.netLoanProceeds.toLocaleString('en-US', { minimumFractionDigits: 2 })}
Interest Rate: ${loanResult.interestRateAnnual.toFixed(1)}% p.a. diminishing balance
Monthly Amortization: ₱${loanResult.monthlyAmortization.toFixed(2)} for 24 months
Total Interest: ₱${loanResult.totalInterest.toFixed(2)}
Total Repayment: ₱${loanResult.totalRepayment.toFixed(2)}
Calculated on Pay (https://pay.zetawala.com/philippines/sss-salary-loan-calculator/)`;

  const related = getRelatedPages('ph-loan');

  const faqs = [
    {
      question: 'Who is eligible to apply for an SSS salary loan?',
      answer:
        'To qualify for a <strong>1-month salary loan</strong>, a member must have at least 36 posted monthly contributions, with at least 6 contributions posted in the last 12 months prior to application. For a <strong>2-month salary loan</strong>, the member must have at least 72 posted monthly contributions (with 6 in the last 12 months).',
    },
    {
      question: 'What is the interest rate on SSS salary loans in 2026?',
      answer:
        'Under SSS Circular No. 2025-004, the standard interest rate is <strong>8.0% per annum on a diminishing principal balance</strong>. However, if the member has availed of a penalty condonation program within the last five (5) years, the interest rate is 10.0% per annum.',
    },
    {
      question: 'How are salary loan amortizations paid?',
      answer:
        'For employed members, the monthly amortization is deducted by the employer from their salary and remitted to SSS monthly. Self-employed, voluntary, and OFW members pay directly through SSS payment partners using a Payment Reference Number (PRN).',
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <Breadcrumbs
        items={[
          { label: 'Philippines', href: '/philippines/' },
          { label: 'SSS Salary Loan Calculator' },
        ]}
      />

      <div className="border-b border-neutral-200 pb-6 pt-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft px-3 py-1 text-xs font-semibold text-brand-strong mb-2">
          <ShieldCheck className="h-3.5 w-3.5 text-brand" />
          <span>Circular No. 2025-004 Compliant (8% Diminishing Balance)</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
          SSS Salary Loan Calculator 2026
        </h1>
        <p className="mt-2 text-sm sm:text-base text-neutral-600 max-w-3xl leading-relaxed">
          Calculate your approved 1-month or 2-month SSS salary loan amount, 1% upfront service fee, net cash proceeds, and 24-month diminishing balance amortization schedule.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-2xs space-y-5">
            <h2 className="text-base font-bold text-neutral-900 border-b border-neutral-100 pb-3">
              Contribution History & Loan Type
            </h2>

            <MoneyInput
              label="Average of Last 12 Monthly Salary Credits (AMSC)"
              value={averageMsc}
              onChange={setAverageMsc}
              currencySymbol="₱"
              hint="Capped at the regular MSC ceiling of ₱20,000."
              min={5000}
              max={20000}
              required
            />

            <NumberInput
              label="Total Posted Monthly Contributions"
              value={postedContributions}
              onChange={setPostedContributions}
              min={36}
              max={400}
              suffix="contributions"
              hint="Need at least 36 contributions for a 1-month loan; 72 for a 2-month loan."
              required
            />

            <Select
              label="Desired Loan Type"
              value={loanType}
              onChange={val => setLoanType(val as any)}
              options={[
                { label: 'Auto (Maximum allowable based on contributions)', value: 'auto' },
                { label: '1-Month Salary Loan (Max ₱20,000)', value: 'one_month' },
                { label: '2-Month Salary Loan (Max ₱40,000)', value: 'two_month' },
              ]}
            />

            <div className="pt-2">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={priorCondonation}
                  onChange={e => setPriorCondonation(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-neutral-300 text-brand focus:ring-brand"
                />
                <div className="text-xs text-neutral-700">
                  <span className="font-semibold text-neutral-900">Member availed of penalty condonation in past 5 years</span>
                  <p className="text-neutral-500 mt-0.5">Increases annual interest rate from 8.0% to 10.0% under Circular 2025-004.</p>
                </div>
              </label>
            </div>
          </div>

          {/* Collapsible 24-Month Amortization Schedule */}
          <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-2xs">
            <button
              type="button"
              onClick={() => setShowSchedule(!showSchedule)}
              className="flex w-full items-center justify-between text-sm font-bold text-neutral-900 focus-visible:outline-brand"
            >
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-brand" />
                <span>View Full 24-Month Amortization Schedule</span>
              </div>
              {showSchedule ? <ChevronUp className="h-4 w-4 text-neutral-500" /> : <ChevronDown className="h-4 w-4 text-neutral-500" />}
            </button>

            {showSchedule && (
              <div className="mt-4 overflow-x-auto max-h-[400px] overflow-y-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="sticky top-0 bg-neutral-100 text-neutral-700 font-semibold border-b border-neutral-200">
                    <tr>
                      <th className="py-2 px-3">Month</th>
                      <th className="py-2 px-3 text-right">Beginning Balance</th>
                      <th className="py-2 px-3 text-right">Monthly Payment</th>
                      <th className="py-2 px-3 text-right">Principal</th>
                      <th className="py-2 px-3 text-right">Interest</th>
                      <th className="py-2 px-3 text-right">Ending Balance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {loanResult.schedule.map(row => (
                      <tr key={row.month} className="hover:bg-neutral-50">
                        <td className="py-2 px-3 font-semibold text-neutral-700">Month {row.month}</td>
                        <td className="py-2 px-3 text-right tabular-nums">₱{row.beginningBalance.toFixed(2)}</td>
                        <td className="py-2 px-3 text-right tabular-nums font-semibold text-neutral-900">₱{row.monthlyPayment.toFixed(2)}</td>
                        <td className="py-2 px-3 text-right tabular-nums">₱{row.principal.toFixed(2)}</td>
                        <td className="py-2 px-3 text-right tabular-nums text-neutral-600">₱{row.interest.toFixed(2)}</td>
                        <td className="py-2 px-3 text-right tabular-nums">₱{row.endingBalance.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <ResultPanel
            title="SSS Salary Loan Terms"
            headlineLabel="Monthly Amortization (24 Months)"
            headlineValue={`₱${loanResult.monthlyAmortization.toFixed(2)}`}
            subHeadline={`Gross loan: ₱${loanResult.grossLoanAmount.toLocaleString()} • Net proceeds: ₱${loanResult.netLoanProceeds.toLocaleString()}`}
            rows={rows}
            sources={legalSources}
            copySummaryText={copySummaryText}
            shareTitle="SSS Salary Loan Calculation"
          />
        </div>
      </div>

      <RelatedTools tools={related} />
      <FaqAccordion faqs={faqs} />
    </div>
  );
}
