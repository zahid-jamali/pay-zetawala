'use client';

import React, { useState, useMemo } from 'react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { MoneyInput } from '@/components/MoneyInput';
import { Select } from '@/components/Select';
import { ResultPanel, BreakdownRow, CalculationLegalSource } from '@/components/ResultPanel';
import { FaqAccordion } from '@/components/FaqAccordion';
import { RelatedTools } from '@/components/RelatedTools';
import { getRelatedPages } from '@/config/pages';
import { calculateSss, EmploymentType } from '@/lib/ph/salary';
import { ShieldCheck, Info } from 'lucide-react';

export default function SssContributionCalculator() {
  const [basicSalary, setBasicSalary] = useState<number>(30000);
  const [employmentType, setEmploymentType] = useState<EmploymentType>('employed');

  const sssResult = useMemo(() => {
    return calculateSss(basicSalary, employmentType);
  }, [basicSalary, employmentType]);

  const rows: BreakdownRow[] = [
    {
      label: 'Monthly Salary Credit (Total MSC)',
      value: `₱${sssResult.totalMsc.toLocaleString()}`,
      sublabel: `Regular MSC: ₱${sssResult.regularMsc.toLocaleString()} | WISP MSC: ₱${sssResult.mpfMsc.toLocaleString()}`,
      highlight: true,
    },
    {
      label: 'Employee Share (EE 5%)',
      value: `₱${sssResult.eeTotal.toFixed(2)}`,
      sublabel: sssResult.eeMpf > 0 ? `Regular: ₱${sssResult.eeRegularSs.toFixed(2)} + WISP: ₱${sssResult.eeMpf.toFixed(2)}` : 'Deducted from monthly payroll',
      highlight: true,
    },
    {
      label: 'Employer Share (ER 10%)',
      value: `₱${(sssResult.erRegularSs + sssResult.erMpf).toFixed(2)}`,
      sublabel: `Regular: ₱${sssResult.erRegularSs.toFixed(2)} + WISP: ₱${sssResult.erMpf.toFixed(2)}`,
    },
    {
      label: "Employees' Compensation (EC)",
      value: `₱${sssResult.erEc.toFixed(2)}`,
      sublabel: sssResult.totalMsc < 15000 ? '₱10 for MSC below ₱15,000' : '₱30 for MSC ₱15,000 and above',
    },
    {
      label: 'Total Employer Share',
      value: `₱${sssResult.erTotal.toFixed(2)}`,
    },
    {
      label: 'Total Combined SSS Contribution',
      value: `₱${sssResult.totalContribution.toFixed(2)}`,
      highlight: true,
      sublabel: 'Total remitted to SSS (15% rate + EC)',
    },
  ];

  const legalSources: CalculationLegalSource[] = [
    {
      title: 'Social Security System (SSS)',
      documentNumber: 'SSS Circular No. 2024-006 / RA 11199',
      summary: 'Mandates the 15% contribution rate effective January 1, 2025. Sets the maximum Monthly Salary Credit (MSC) to ₱35,000 and regular MSC cap at ₱20,000.',
    },
    {
      title: 'Mandatory Provident Fund (WISP)',
      documentNumber: 'SSS Circular No. 2024-006 Section 2',
      summary: 'Contributions corresponding to MSC in excess of ₱20,000 up to ₱35,000 are allocated to the Worker’s Investment and Savings Program (WISP).',
    },
    {
      title: 'Employees’ Compensation Commission (ECC)',
      documentNumber: 'State Insurance Fund Guidelines',
      summary: 'Employer EC contribution is ₱10.00 for MSC below ₱15,000 and ₱30.00 for MSC ₱15,000 and higher. Zero employee deduction.',
    },
  ];

  const copySummaryText = `SSS Contribution Computation (2026 Rate: 15%):
Monthly Compensation: ₱${basicSalary.toLocaleString()}
Total MSC: ₱${sssResult.totalMsc.toLocaleString()}
- Employee Share (5%): ₱${sssResult.eeTotal.toFixed(2)} (Regular: ₱${sssResult.eeRegularSs.toFixed(2)}, WISP: ₱${sssResult.eeMpf.toFixed(2)})
- Employer Share (10% + EC): ₱${sssResult.erTotal.toFixed(2)} (Regular: ₱${sssResult.erRegularSs.toFixed(2)}, WISP: ₱${sssResult.erMpf.toFixed(2)}, EC: ₱${sssResult.erEc.toFixed(2)})
Total Remittance: ₱${sssResult.totalContribution.toFixed(2)}
Calculated on Pay (https://pay.zetawala.com/philippines/sss-contribution-calculator/)`;

  const related = getRelatedPages('ph-sss');

  const faqs = [
    {
      question: 'What is the SSS contribution rate for 2026?',
      answer:
        'The total SSS contribution rate is <strong>15.0%</strong> of the Monthly Salary Credit (MSC), split as 10.0% employer share and 5.0% employee share. This 15% rate is the final scheduled increase mandated by Republic Act No. 11199 (Social Security Act of 2018), taking effect from January 2025 onwards.',
    },
    {
      question: 'What is the minimum and maximum SSS salary credit (MSC)?',
      answer:
        'The minimum Monthly Salary Credit is <strong>₱5,000</strong> (for compensation below ₱5,250) with an employee share of ₱250 and employer share of ₱510. The maximum MSC is <strong>₱35,000</strong> (for compensation of ₱34,750 and above) with an employee share of ₱1,750 and employer share of ₱3,530.',
    },
    {
      question: 'How does the WISP portion work?',
      answer:
        'For salaries with an MSC above ₱20,000, the first ₱20,000 is credited to the Regular Social Security Program, while the remaining portion (up to ₱15,000) goes to the <strong>Worker’s Investment and Savings Program (WISP)</strong>. WISP funds are invested in government bonds and blue-chip equities to provide tax-free additional retirement pensions upon maturity.',
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <Breadcrumbs
        items={[
          { label: 'Philippines', href: '/philippines/' },
          { label: 'SSS Contribution Calculator' },
        ]}
      />

      <div className="border-b border-neutral-200 pb-6 pt-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft px-3 py-1 text-xs font-semibold text-brand-strong mb-2">
          <ShieldCheck className="h-3.5 w-3.5 text-brand" />
          <span>Circular No. 2024-006 Compliant (15% Total Rate)</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
          SSS Contribution Calculator 2026
        </h1>
        <p className="mt-2 text-sm sm:text-base text-neutral-600 max-w-3xl leading-relaxed">
          Compute your exact monthly SSS contribution, employee deduction, employer share, and Mandatory Provident Fund (WISP) allocation based on official 2026 bracket schedules.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-2xs space-y-5">
            <h2 className="text-base font-bold text-neutral-900 border-b border-neutral-100 pb-3">
              Salary & Membership Details
            </h2>

            <MoneyInput
              label="Monthly Basic Salary / Compensation"
              value={basicSalary}
              onChange={setBasicSalary}
              currencySymbol="₱"
              hint="Your gross monthly basic compensation subject to SSS deductions."
              required
            />

            <Select
              label="Membership Type"
              value={employmentType}
              onChange={val => setEmploymentType(val as EmploymentType)}
              options={[
                { label: 'Employed (Private Sector)', value: 'employed' },
                { label: 'Kasambahay (Domestic Worker)', value: 'kasambahay' },
                { label: 'Self-Employed / Professional', value: 'self_employed' },
                { label: 'Voluntary Member', value: 'voluntary' },
                { label: 'Non-Working Spouse', value: 'employed' },
              ]}
              hint="Self-employed and voluntary members pay the full 15% contribution rate on their declared MSC."
            />

            {/* WISP Explanation Callout */}
            {sssResult.mpfMsc > 0 && (
              <div className="rounded-lg bg-brand-soft/40 p-4 border border-brand/20 text-xs text-neutral-700 leading-relaxed">
                <div className="flex items-center gap-1.5 font-bold text-brand-strong mb-1">
                  <Info className="h-4 w-4" />
                  <span>WISP Mandatory Provident Fund Active</span>
                </div>
                Because your salary exceeds ₱20,000, <strong>₱{sssResult.eeMpf.toFixed(2)}</strong> of your employee share and <strong>₱{sssResult.erMpf.toFixed(2)}</strong> of your employer share are deposited into your tax-free WISP retirement account.
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <ResultPanel
            title="SSS Contribution Breakdown"
            headlineLabel="Employee Monthly Deduction"
            headlineValue={`₱${sssResult.eeTotal.toFixed(2)}`}
            subHeadline={`Employer share: ₱${sssResult.erTotal.toFixed(2)} • Total remittance: ₱${sssResult.totalContribution.toFixed(2)}`}
            rows={rows}
            sources={legalSources}
            copySummaryText={copySummaryText}
            shareTitle="SSS Contribution Breakdown 2026"
          />
        </div>
      </div>

      <RelatedTools tools={related} />
      <FaqAccordion faqs={faqs} />
    </div>
  );
}
