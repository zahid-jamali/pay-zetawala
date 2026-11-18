'use client';

import React, { useState, useMemo } from 'react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { MoneyInput } from '@/components/MoneyInput';
import { NumberInput } from '@/components/NumberInput';
import { SegmentedControl } from '@/components/SegmentedControl';
import { ResultPanel, BreakdownRow, CalculationLegalSource } from '@/components/ResultPanel';
import { FaqAccordion } from '@/components/FaqAccordion';
import { RelatedTools } from '@/components/RelatedTools';
import { getRelatedPages } from '@/config/pages';
import {
  calculateThirteenthMonthStandard,
  calculateThirteenthMonthMonthly,
} from '@/lib/ph/thirteenth-month';
import { ShieldCheck, Calendar, Info } from 'lucide-react';

export default function ThirteenthMonthPayCalculator() {
  const [calcMode, setCalcMode] = useState<'standard' | 'monthly'>('standard');
  const [monthlyBasic, setMonthlyBasic] = useState<number>(30000);
  const [monthsWorked, setMonthsWorked] = useState<number>(12);
  const [otherBenefits, setOtherBenefits] = useState<number>(0);

  // Month-by-month state for variable earnings
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  const [monthlyEarnings, setMonthlyEarnings] = useState<number[]>([
    30000, 30000, 30000, 30000, 30000, 30000,
    30000, 30000, 30000, 30000, 30000, 30000,
  ]);

  const handleMonthChange = (index: number, val: number) => {
    const updated = [...monthlyEarnings];
    updated[index] = val;
    setMonthlyEarnings(updated);
  };

  const result = useMemo(() => {
    if (calcMode === 'standard') {
      return calculateThirteenthMonthStandard({
        monthlyBasic,
        monthsWorked,
        otherBenefits,
      });
    } else {
      return calculateThirteenthMonthMonthly({
        monthlyEarnings,
        otherBenefits,
      });
    }
  }, [calcMode, monthlyBasic, monthsWorked, otherBenefits, monthlyEarnings]);

  const rows: BreakdownRow[] = [
    {
      label: 'Total Basic Salary Earned',
      value: `₱${result.totalBasicSalaryEarned.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      sublabel: 'Sum of basic salary earned in the calendar year',
    },
    {
      label: '13th Month Pay (Total / 12)',
      value: `₱${result.thirteenthMonthPay.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      highlight: true,
    },
    ...(otherBenefits > 0
      ? [
          {
            label: 'Other 14th Month & Bonuses',
            value: `₱${otherBenefits.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
          },
          {
            label: 'Total Combined Benefits',
            value: `₱${result.totalBenefits.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
          },
        ]
      : []),
    {
      label: 'Tax-Exempt Portion',
      value: `₱${result.exemptPortion.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      sublabel: 'Protected by ₱90,000 statutory tax exemption ceiling',
    },
    {
      label: 'Taxable Excess Over ₱90k',
      value: result.taxableExcess > 0 ? `₱${result.taxableExcess.toLocaleString('en-US', { minimumFractionDigits: 2 })}` : '₱0.00 (100% Tax-Free)',
      isDeduction: result.taxableExcess > 0,
      sublabel: result.taxableExcess > 0 ? 'Added to December taxable compensation income' : undefined,
    },
    {
      label: 'Mandatory Payment Deadline',
      value: result.paymentDeadline,
      highlight: true,
    },
  ];

  const legalSources: CalculationLegalSource[] = [
    {
      title: 'Presidential Decree No. 851',
      documentNumber: 'PD 851 Implementing Rules and Regulations',
      summary: 'Mandates all employers to pay their rank-and-file employees 13th month pay not later than December 24 of every year.',
    },
    {
      title: 'Department of Labor and Employment (DOLE)',
      documentNumber: 'Labor Advisory No. 25-2023 / DOLE Standard Guidelines',
      summary: 'Formula: Total basic salary earned within a calendar year divided by 12 months. Resigned or terminated employees receive pro-rated share in final pay.',
    },
    {
      title: 'National Internal Revenue Code (NIRC) Sec. 32(B)(7)(e)',
      documentNumber: 'RA 10963 (TRAIN Law) & BIR RR 11-2018',
      summary: 'Gross benefits received by officials and employees of public and private entities up to ₱90,000 are completely exempt from income tax.',
    },
  ];

  const copySummaryText = `Philippine 13th Month Pay Computation:
Total Basic Salary Earned in Year: ₱${result.totalBasicSalaryEarned.toLocaleString('en-US', { minimumFractionDigits: 2 })}
13th Month Pay Amount: ₱${result.thirteenthMonthPay.toLocaleString('en-US', { minimumFractionDigits: 2 })}
Tax Status: ${result.taxableExcess === 0 ? '100% Tax-Exempt (under ₱90,000)' : `₱${result.exemptPortion.toLocaleString()} exempt, ₱${result.taxableExcess.toLocaleString()} taxable`}
Payment Deadline: ${result.paymentDeadline}
Calculated at Pay (https://pay.zetawala.com/philippines/13th-month-pay-calculator/)`;

  const related = getRelatedPages('ph-13th');

  const faqs = [
    {
      question: 'Who is entitled to 13th month pay in the Philippines?',
      answer:
        'Under Presidential Decree No. 851 and DOLE guidelines, all rank-and-file employees in the private sector who have worked for <strong>at least one (1) month</strong> during a calendar year are legally entitled to receive 13th month pay, regardless of their employment status (regular, probationary, casual, contractual, or project-based).',
    },
    {
      question: 'What is included and excluded in the "Basic Salary"?',
      answer:
        '<strong>Included:</strong> All remunerations or earnings paid by the employer for services rendered during regular working hours (basic daily/monthly wage).<br/><br/><strong>Excluded:</strong> Overtime pay, night shift differential, holiday pay, premium pay, cash equivalent of unused leaves, and cost-of-living allowance (COLA), unless integrated into the basic wage by agreement.',
    },
    {
      question: 'How is 13th month pay computed for resigned or terminated employees?',
      answer:
        'An employee who resigned or was separated before the time of payment is entitled to a <strong>pro-rated 13th month pay</strong> in proportion to the length of time worked during the calendar year (from January 1 up to the last day of service). The payment must be included in the employee’s final pay, typically released within 30 days from separation.',
    },
    {
      question: 'Is 13th month pay taxable?',
      answer:
        'Under the TRAIN Law (RA 10963), the 13th month pay and other benefits (such as 14th month pay, Christmas bonus, and productivity bonuses) are <strong>tax-exempt up to ₱90,000</strong>. Any excess over ₱90,000 is included in your gross taxable compensation in December and subject to regular withholding tax.',
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <Breadcrumbs
        items={[
          { label: 'Philippines', href: '/philippines/' },
          { label: '13th Month Pay Calculator' },
        ]}
      />

      <div className="border-b border-neutral-200 pb-6 pt-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft px-3 py-1 text-xs font-semibold text-brand-strong mb-2">
          <ShieldCheck className="h-3.5 w-3.5 text-brand" />
          <span>PD 851 & DOLE Labor Standards Compliant</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
          Philippines 13th Month Pay Calculator 2026
        </h1>
        <p className="mt-2 text-sm sm:text-base text-neutral-600 max-w-3xl leading-relaxed">
          Compute your statutory 13th month pay under Presidential Decree No. 851 and DOLE guidelines. Supports regular full-year staff, mid-year salary increases, unpaid leaves, and pro-rated computation for resigned employees.
        </p>

        {/* Mode Selector */}
        <div className="mt-6">
          <SegmentedControl<'standard' | 'monthly'>
            value={calcMode}
            onChange={setCalcMode}
            options={[
              { label: 'Standard Mode (Fixed Basic Salary)', value: 'standard' },
              { label: 'Month-by-Month (Variable Earnings / Raises / Leaves)', value: 'monthly' },
            ]}
          />
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Inputs */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-2xs space-y-5">
            <h2 className="text-base font-bold text-neutral-900 border-b border-neutral-100 pb-3">
              {calcMode === 'standard' ? 'Compensation & Service Duration' : 'Monthly Basic Salary Breakdown'}
            </h2>

            {calcMode === 'standard' ? (
              <div className="space-y-4">
                <MoneyInput
                  label="Monthly Basic Salary"
                  value={monthlyBasic}
                  onChange={setMonthlyBasic}
                  currencySymbol="₱"
                  hint="Basic pay excluding overtime, night differential, and allowances."
                  required
                />
                <NumberInput
                  label="Number of Months Worked in 2026"
                  value={monthsWorked}
                  onChange={setMonthsWorked}
                  min={1}
                  max={12}
                  step={0.5}
                  suffix="months"
                  hint="Enter 12 for full year, or months worked if you joined or resigned mid-year."
                  required
                />
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-xs text-neutral-600 mb-2">
                  Enter the actual basic salary earned for each month. Leave as 0 for months not worked or on unpaid leave.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[360px] overflow-y-auto pr-1">
                  {monthNames.map((name, i) => (
                    <div key={i}>
                      <MoneyInput
                        label={name}
                        value={monthlyEarnings[i]}
                        onChange={v => handleMonthChange(i, v)}
                        currencySymbol="₱"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Other bonuses for tax ceiling */}
            <div className="pt-3 border-t border-neutral-100">
              <MoneyInput
                label="Other Bonuses & Benefits (Optional)"
                value={otherBenefits}
                onChange={setOtherBenefits}
                currencySymbol="₱"
                hint="14th month pay, Christmas bonus, or cash gifts that share the ₱90,000 tax exemption ceiling."
              />
            </div>

            {/* Legal Notice Callout */}
            <div className="flex items-start gap-2.5 rounded-lg bg-neutral-50 p-3.5 border border-neutral-200 text-xs text-neutral-700">
              <Info className="h-4 w-4 text-neutral-500 shrink-0 mt-0.5" />
              <div>
                <strong>Legal Rule:</strong> DOLE prohibits employers from deducting absences or tardiness from 13th month pay except to the extent that basic salary was not earned on unpaid days.
              </div>
            </div>
          </div>
        </div>

        {/* Right Sticky Result Column */}
        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <ResultPanel
            title="13th Month Pay Computation"
            headlineLabel="Estimated 13th Month Pay"
            headlineValue={`₱${result.thirteenthMonthPay.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            subHeadline={`Tax status: ${result.taxableExcess === 0 ? '100% Tax-Exempt' : `₱${result.taxableExcess.toLocaleString()} taxable excess over ₱90k`}`}
            rows={rows}
            sources={legalSources}
            copySummaryText={copySummaryText}
            shareTitle="Philippine 13th Month Pay Calculation"
            calloutMessage={{
              type: result.taxableExcess === 0 ? 'success' : 'warning',
              text:
                result.taxableExcess === 0
                  ? 'Tax-Exempt: Total benefits are within the ₱90,000 ceiling. Zero withholding tax applies to this payout.'
                  : `Taxable Excess: ₱${result.taxableExcess.toLocaleString()} exceeds the ₱90,000 ceiling and is taxable in December.`,
            }}
          />
        </div>
      </div>

      <RelatedTools tools={related} />
      <FaqAccordion faqs={faqs} />
    </div>
  );
}
