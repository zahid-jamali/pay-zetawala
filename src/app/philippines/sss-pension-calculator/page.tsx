'use client';

import React, { useState, useMemo } from 'react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { MoneyInput } from '@/components/MoneyInput';
import { NumberInput } from '@/components/NumberInput';
import { ResultPanel, BreakdownRow, CalculationLegalSource } from '@/components/ResultPanel';
import { FaqAccordion } from '@/components/FaqAccordion';
import { RelatedTools } from '@/components/RelatedTools';
import { getRelatedPages } from '@/config/pages';
import { calculateSssPension } from '@/lib/ph/pension';
import { ShieldCheck, Info } from 'lucide-react';

export default function SssPensionCalculator() {
  const [amsc, setAmsc] = useState<number>(15000);
  const [cys, setCys] = useState<number>(25);
  const [numDependents, setNumDependents] = useState<number>(0);
  const [age, setAge] = useState<number>(60);

  const pension = useMemo(() => {
    return calculateSssPension({
      amsc,
      cys,
      numDependents,
      age,
    });
  }, [amsc, cys, numDependents, age]);

  const rows: BreakdownRow[] = [
    {
      label: 'Formula 1 (300 + 20% AMSC + 2% per year > 10)',
      value: `₱${pension.formula1.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
    },
    {
      label: 'Formula 2 (40% of AMSC)',
      value: `₱${pension.formula2.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
    },
    {
      label: 'Formula 3 (Statutory Minimum Guaranteed)',
      value: `₱${pension.formula3.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      sublabel: cys >= 20 ? '₱2,400 guaranteed for >= 20 CYS' : '₱1,200 guaranteed for 10-19 CYS',
    },
    {
      label: 'Basic Monthly Pension (Highest of 3 Formulas)',
      value: `₱${pension.basicMonthlyPension.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      highlight: true,
    },
    {
      label: 'Additional Benefit (EO 54)',
      value: `+₱${pension.additionalBenefit.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      sublabel: 'Universal across all SSS pensioners since 2017',
    },
    ...(pension.totalDependentAllowance > 0
      ? [
          {
            label: `Dependent Child Allowance (${pension.numDependents} ${pension.numDependents === 1 ? 'child' : 'children'})`,
            value: `+₱${pension.totalDependentAllowance.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
            sublabel: `₱${pension.dependentAllowancePerChild.toFixed(2)} per qualified minor child (max 5)`,
          },
        ]
      : []),
    {
      label: 'Total Monthly Pension Payout',
      value: `₱${pension.totalMonthlyPension.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      highlight: true,
    },
    {
      label: 'December 13th-Month Pension',
      value: `₱${pension.thirteenthMonthPension.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      sublabel: 'Basic Monthly Pension + ₱1,000 Additional Benefit',
    },
    {
      label: 'Estimated Annual Cash Payout',
      value: `₱${pension.annualPayout.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      highlight: true,
      sublabel: '12 monthly pensions + December 13th-month bonus',
    },
  ];

  const legalSources: CalculationLegalSource[] = [
    {
      title: 'Republic Act No. 11199',
      documentNumber: 'Social Security Act of 2018 Section 12',
      summary: 'Establishes the three statutory formulas for monthly pension. The member is entitled to whichever formula yields the highest benefit.',
    },
    {
      title: 'Executive Order No. 54',
      documentNumber: 'Office of the President / SSS Guidelines',
      summary: 'Provides an across-the-board ₱1,000 monthly additional pension benefit to all qualified SSS retirees and disability pensioners.',
    },
    {
      title: 'RA 11199 Section 12-A',
      documentNumber: 'Dependent’s Pension Rules',
      summary: 'Provides 10% of basic monthly pension or ₱250 (whichever is higher) for each of up to 5 legitimate, legitimated, or legally adopted minor children.',
    },
  ];

  const copySummaryText = `SSS Retirement Pension Estimate:
Average Monthly Salary Credit (AMSC): ₱${amsc.toLocaleString()}
Credited Years of Service (CYS): ${cys} years
Basic Monthly Pension: ₱${pension.basicMonthlyPension.toLocaleString('en-US', { minimumFractionDigits: 2 })}
Additional Benefit (EO 54): ₱1,000.00
Total Monthly Pension: ₱${pension.totalMonthlyPension.toLocaleString('en-US', { minimumFractionDigits: 2 })}
13th Month Pension (Dec): ₱${pension.thirteenthMonthPension.toLocaleString('en-US', { minimumFractionDigits: 2 })}
Total Annual Payout: ₱${pension.annualPayout.toLocaleString('en-US', { minimumFractionDigits: 2 })}
Calculated on Pay (https://pay.zetawala.com/philippines/sss-pension-calculator/)`;

  const related = getRelatedPages('ph-pension');

  const faqs = [
    {
      question: 'Who is eligible for an SSS monthly retirement pension?',
      answer:
        'A member is eligible for a lifetime monthly pension if they have paid at least <strong>120 monthly contributions</strong> (10 Credited Years of Service) prior to retirement and are: (a) at least 60 years old and separated from employment or ceased self-employment (optional retirement), or (b) at least 65 years old, whether employed or not (mandatory retirement).',
    },
    {
      question: 'What if I have less than 120 monthly contributions?',
      answer:
        'Members who reach age 60 or 65 with fewer than 120 contributions are entitled to a <strong>lump-sum retirement benefit</strong> equal to the total contributions paid by the member and employer, plus interest.',
    },
    {
      question: 'What is the Average Monthly Salary Credit (AMSC)?',
      answer:
        'The AMSC is the higher of: (1) the sum of the last 60 Monthly Salary Credits immediately preceding the semester of retirement divided by 60, or (2) the sum of all MSCs from the month of first contribution up to the semester prior to retirement divided by the total number of monthly contributions paid. Regular SS AMSC is capped at ₱20,000.',
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <Breadcrumbs
        items={[
          { label: 'Philippines', href: '/philippines/' },
          { label: 'SSS Pension Calculator' },
        ]}
      />

      <div className="border-b border-neutral-200 pb-6 pt-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft px-3 py-1 text-xs font-semibold text-brand-strong mb-2">
          <ShieldCheck className="h-3.5 w-3.5 text-brand" />
          <span>Statutory RA 11199 & EO 54 Pension Formulas</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
          SSS Pension Calculator 2026
        </h1>
        <p className="mt-2 text-sm sm:text-base text-neutral-600 max-w-3xl leading-relaxed">
          Estimate your lifetime monthly SSS retirement pension using the three statutory formulas under RA 11199, the universal ₱1,000 EO 54 benefit, dependent child allowances, and 13th-month pension.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-2xs space-y-5">
            <h2 className="text-base font-bold text-neutral-900 border-b border-neutral-100 pb-3">
              Retirement Profile & Contribution History
            </h2>

            <MoneyInput
              label="Average Monthly Salary Credit (AMSC)"
              value={amsc}
              onChange={setAmsc}
              currencySymbol="₱"
              hint="Average of your last 60 regular MSCs. Regular SS MSC is capped at ₱20,000."
              min={5000}
              max={20000}
              required
            />

            <NumberInput
              label="Credited Years of Service (CYS)"
              value={cys}
              onChange={setCys}
              min={10}
              max={50}
              suffix="years"
              hint="Minimum 10 years (120 monthly contributions) are required for a lifetime pension."
              required
            />

            <NumberInput
              label="Number of Dependent Minor Children"
              value={numDependents}
              onChange={setNumDependents}
              min={0}
              max={5}
              hint="Unmarried, unemployed minor children under 21 years old (maximum 5 dependents)."
            />

            <NumberInput
              label="Retirement Age"
              value={age}
              onChange={setAge}
              min={60}
              max={85}
              suffix="years old"
              hint="Age 60 for optional retirement (must be separated from work); age 65 for mandatory."
            />

            <div className="flex items-start gap-2.5 rounded-lg bg-neutral-50 p-3.5 border border-neutral-200 text-xs text-neutral-700">
              <Info className="h-4 w-4 text-neutral-500 shrink-0 mt-0.5" />
              <div>
                <strong>Three-Formula Rule:</strong> The SSS automatically awards whichever formula yields the highest pension amount. In your computation,{' '}
                <strong>
                  {pension.formula1 >= pension.formula2 && pension.formula1 >= pension.formula3
                    ? 'Formula 1'
                    : pension.formula2 >= pension.formula3
                    ? 'Formula 2'
                    : 'Formula 3'}
                </strong>{' '}
                produced the highest basic benefit.
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <ResultPanel
            title="Estimated SSS Pension"
            headlineLabel="Estimated Monthly Pension"
            headlineValue={`₱${pension.totalMonthlyPension.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            subHeadline={`Basic pension: ₱${pension.basicMonthlyPension.toLocaleString()} + ₱1,000 EO 54 benefit`}
            rows={rows}
            sources={legalSources}
            copySummaryText={copySummaryText}
            shareTitle="SSS Retirement Pension Estimate"
          />
        </div>
      </div>

      <RelatedTools tools={related} />
      <FaqAccordion faqs={faqs} />
    </div>
  );
}
