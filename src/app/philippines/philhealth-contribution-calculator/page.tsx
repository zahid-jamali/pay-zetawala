'use client';

import React, { useState, useMemo } from 'react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { MoneyInput } from '@/components/MoneyInput';
import { ResultPanel, BreakdownRow, CalculationLegalSource } from '@/components/ResultPanel';
import { FaqAccordion } from '@/components/FaqAccordion';
import { RelatedTools } from '@/components/RelatedTools';
import { getRelatedPages } from '@/config/pages';
import { calculatePhilHealth } from '@/lib/ph/salary';
import { ShieldCheck } from 'lucide-react';

export default function PhilHealthContributionCalculator() {
  const [basicSalary, setBasicSalary] = useState<number>(35000);

  const philhealth = useMemo(() => {
    return calculatePhilHealth(basicSalary);
  }, [basicSalary]);

  const rows: BreakdownRow[] = [
    {
      label: 'Monthly Basic Salary Input',
      value: `₱${basicSalary.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
    },
    {
      label: 'Monthly Basic Salary (MBS) Basis',
      value: `₱${philhealth.mbs.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      sublabel: basicSalary < 10000 ? '₱10,000 statutory floor applied' : basicSalary > 100000 ? '₱100,000 statutory ceiling applied' : 'Within standard income range',
    },
    {
      label: 'Total Monthly Premium (5.0%)',
      value: `₱${philhealth.totalPremium.toFixed(2)}`,
      highlight: true,
      sublabel: '5.0% of MBS basis',
    },
    {
      label: 'Employee Share (50% / 2.5%)',
      value: `₱${philhealth.employeeShare.toFixed(2)}`,
      highlight: true,
      sublabel: 'Deducted from employee monthly salary',
    },
    {
      label: 'Employer Share (50% / 2.5%)',
      value: `₱${philhealth.employerShare.toFixed(2)}`,
      sublabel: 'Employer counterpart contribution',
    },
    {
      label: 'Semi-Monthly Cut-off Deduction',
      value: `₱${(philhealth.employeeShare / 2).toFixed(2)}`,
      sublabel: 'Per payroll cut-off for bi-monthly schedules',
    },
    {
      label: 'Annual Employee Contributions',
      value: `₱${(philhealth.employeeShare * 12).toFixed(2)}`,
    },
  ];

  const legalSources: CalculationLegalSource[] = [
    {
      title: 'Philippine Health Insurance Corporation',
      documentNumber: 'PhilHealth Advisory No. 2025-0002',
      summary: 'Maintains the 5.0% premium rate with an income floor of ₱10,000 (₱500 min) and income ceiling of ₱100,000 (₱5,000 max), split 50/50 between employee and employer.',
    },
    {
      title: 'Universal Health Care Act',
      documentNumber: 'Republic Act No. 11223 Section 10',
      summary: 'Statutory mandate for progressive health insurance coverage across direct contributors and formal sector employees.',
    },
  ];

  const copySummaryText = `PhilHealth Contribution Computation (5.0% Rate):
Monthly Basic Salary: ₱${basicSalary.toLocaleString()}
MBS Basis: ₱${philhealth.mbs.toLocaleString()}
Total Premium: ₱${philhealth.totalPremium.toFixed(2)}
- Employee Share (2.5%): ₱${philhealth.employeeShare.toFixed(2)}
- Employer Share (2.5%): ₱${philhealth.employerShare.toFixed(2)}
Semi-monthly cut-off: ₱${(philhealth.employeeShare / 2).toFixed(2)}
Calculated on Pay (https://pay.zetawala.com/philippines/philhealth-contribution-calculator/)`;

  const related = getRelatedPages('ph-philhealth');

  const faqs = [
    {
      question: 'What is the PhilHealth contribution rate in 2026?',
      answer:
        'The PhilHealth premium rate is <strong>5.0%</strong> of the member’s monthly basic salary, shared equally between the employee (2.5%) and the employer (2.5%).',
    },
    {
      question: 'What are the PhilHealth minimum floor and maximum ceiling?',
      answer:
        'The <strong>income floor is ₱10,000</strong> (members earning ₱10,000 or below pay a fixed total premium of ₱500, with ₱250 employee share). The <strong>income ceiling is ₱100,000</strong> (members earning ₱100,000 or more pay a fixed maximum total premium of ₱5,000, with ₱2,500 employee share).',
    },
    {
      question: 'How do self-employed and voluntary members pay PhilHealth?',
      answer:
        'Self-employed professionals, sole proprietors, and voluntary members shoulder the entire 5.0% premium based on their declared monthly income, subject to the same ₱10,000 floor and ₱100,000 ceiling (₱500 to ₱5,000 per month).',
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <Breadcrumbs
        items={[
          { label: 'Philippines', href: '/philippines/' },
          { label: 'PhilHealth Contribution Calculator' },
        ]}
      />

      <div className="border-b border-neutral-200 pb-6 pt-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft px-3 py-1 text-xs font-semibold text-brand-strong mb-2">
          <ShieldCheck className="h-3.5 w-3.5 text-brand" />
          <span>PhilHealth Advisory No. 2025-0002 Compliant</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
          PhilHealth Contribution Calculator 2026
        </h1>
        <p className="mt-2 text-sm sm:text-base text-neutral-600 max-w-3xl leading-relaxed">
          Compute your exact monthly PhilHealth premium contribution, employee deduction, and employer counterpart based on the 5.0% rate, ₱10,000 floor, and ₱100,000 ceiling.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-2xs space-y-5">
            <h2 className="text-base font-bold text-neutral-900 border-b border-neutral-100 pb-3">
              Monthly Basic Salary
            </h2>

            <MoneyInput
              label="Contractual Monthly Basic Salary"
              value={basicSalary}
              onChange={setBasicSalary}
              currencySymbol="₱"
              hint="PhilHealth premium is computed on the basic wage excluding allowances and overtime."
              required
            />

            <div className="rounded-lg bg-neutral-50 p-4 border border-neutral-200 text-xs text-neutral-700 space-y-2">
              <div className="font-bold text-neutral-900">2026 Rate Parameters:</div>
              <ul className="list-disc pl-4 space-y-1">
                <li>Rate: 5.0% of Monthly Basic Salary</li>
                <li>Income Floor: ₱10,000 (Min Employee Share: ₱250.00)</li>
                <li>Income Ceiling: ₱100,000 (Max Employee Share: ₱2,500.00)</li>
                <li>Split: Equal 50% Employee / 50% Employer</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <ResultPanel
            title="PhilHealth Premium Breakdown"
            headlineLabel="Employee Monthly Share (2.5%)"
            headlineValue={`₱${philhealth.employeeShare.toFixed(2)}`}
            subHeadline={`Employer share: ₱${philhealth.employerShare.toFixed(2)} • Total premium: ₱${philhealth.totalPremium.toFixed(2)}`}
            rows={rows}
            sources={legalSources}
            copySummaryText={copySummaryText}
            shareTitle="PhilHealth Contribution Calculation 2026"
          />
        </div>
      </div>

      <RelatedTools tools={related} />
      <FaqAccordion faqs={faqs} />
    </div>
  );
}
