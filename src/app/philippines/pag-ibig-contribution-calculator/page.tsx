'use client';

import React, { useState, useMemo } from 'react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { MoneyInput } from '@/components/MoneyInput';
import { ResultPanel, BreakdownRow, CalculationLegalSource } from '@/components/ResultPanel';
import { FaqAccordion } from '@/components/FaqAccordion';
import { RelatedTools } from '@/components/RelatedTools';
import { getRelatedPages } from '@/config/pages';
import { calculatePagIbig } from '@/lib/ph/salary';
import { ShieldCheck, PiggyBank } from 'lucide-react';

export default function PagIbigContributionCalculator() {
  const [basicSalary, setBasicSalary] = useState<number>(30000);
  const [voluntaryMp2, setVoluntaryMp2] = useState<number>(0);

  const pagibig = useMemo(() => {
    return calculatePagIbig(basicSalary);
  }, [basicSalary]);

  const rows: BreakdownRow[] = [
    {
      label: 'Monthly Basic Salary',
      value: `₱${basicSalary.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
    },
    {
      label: 'Maximum Fund Salary (MFS) Basis',
      value: `₱${pagibig.fundSalary.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      sublabel: 'Capped at ₱10,000 under Circular 460',
    },
    {
      label: 'Regular Employee Share (EE 2%)',
      value: `₱${pagibig.employeeShare.toFixed(2)}`,
      highlight: true,
      sublabel: 'Mandatory Pag-IBIG 1 savings (max ₱200)',
    },
    {
      label: 'Employer Counterpart Share (ER 2%)',
      value: `₱${pagibig.employerShare.toFixed(2)}`,
      sublabel: 'Mandatory 100% employer match (max ₱200)',
    },
    {
      label: 'Total Mandatory Monthly Remittance',
      value: `₱${pagibig.totalContribution.toFixed(2)}`,
      highlight: true,
      sublabel: 'Combined employee + employer savings',
    },
    ...(voluntaryMp2 > 0
      ? [
          {
            label: 'Voluntary Modified Pag-IBIG 2 (MP2)',
            value: `₱${voluntaryMp2.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
            sublabel: 'High-yield tax-free voluntary savings',
          },
          {
            label: 'Total Monthly Employee Savings',
            value: `₱${(pagibig.employeeShare + voluntaryMp2).toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
            highlight: true,
          },
        ]
      : []),
    {
      label: 'Annual Guaranteed Savings (Mandatory)',
      value: `₱${(pagibig.totalContribution * 12).toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      sublabel: 'Earns annual tax-free dividends from HDMF',
    },
  ];

  const legalSources: CalculationLegalSource[] = [
    {
      title: 'Home Development Mutual Fund (Pag-IBIG Fund)',
      documentNumber: 'Pag-IBIG Circular No. 460',
      summary: 'Increased the maximum monthly fund salary (MFS) to ₱10,000 effective February 2024, setting the mandatory contribution cap to ₱200 employee and ₱200 employer.',
    },
    {
      title: 'Department of Budget and Management (DBM)',
      documentNumber: 'DBM Circular Letter No. 2024-2',
      summary: 'Reiterates government and private sector compliance with the ₱200 employee and employer mandatory Pag-IBIG contribution ceiling.',
    },
  ];

  const copySummaryText = `Pag-IBIG Contribution Computation:
Monthly Basic Salary: ₱${basicSalary.toLocaleString()}
Fund Salary Basis: ₱${pagibig.fundSalary.toLocaleString()} (Capped at ₱10,000)
- Employee Mandatory Share: ₱${pagibig.employeeShare.toFixed(2)}
- Employer Counterpart Share: ₱${pagibig.employerShare.toFixed(2)}
Total Monthly Savings: ₱${pagibig.totalContribution.toFixed(2)}
Calculated on Pay (https://pay.zetawala.com/philippines/pag-ibig-contribution-calculator/)`;

  const related = getRelatedPages('ph-pagibig');

  const faqs = [
    {
      question: 'What is the mandatory Pag-IBIG contribution rate in 2026?',
      answer:
        'The mandatory Pag-IBIG contribution rate is <strong>2% of the Monthly Fund Salary</strong> for both the employee and employer (or 1% for employees earning ₱1,500 or below). However, under Circular No. 460, the Maximum Fund Salary is capped at ₱10,000, which means the maximum monthly mandatory deduction is <strong>₱200.00 for the employee</strong> and ₱200.00 for the employer (₱400 total).',
    },
    {
      question: 'Can I contribute more than ₱200 per month to Pag-IBIG?',
      answer:
        'Yes. An employee may request their employer to deduct a higher voluntary contribution to the regular Pag-IBIG (Fund 1) savings program. Alternatively, members can open a <strong>Modified Pag-IBIG 2 (MP2)</strong> account, which offers higher tax-free annual dividends (typically 6%–7% p.a.) with a 5-year maturity period.',
    },
    {
      question: 'Are Pag-IBIG savings withdrawable?',
      answer:
        'Yes. Regular Pag-IBIG savings mature after <strong>20 years of membership (240 monthly contributions)</strong>, or upon reaching age 60/65 retirement, permanent disability, or permanent departure from the Philippines. MP2 savings mature in 5 years.',
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <Breadcrumbs
        items={[
          { label: 'Philippines', href: '/philippines/' },
          { label: 'Pag-IBIG Contribution Calculator' },
        ]}
      />

      <div className="border-b border-neutral-200 pb-6 pt-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft px-3 py-1 text-xs font-semibold text-brand-strong mb-2">
          <ShieldCheck className="h-3.5 w-3.5 text-brand" />
          <span>Circular No. 460 & DBM CL 2024-2 Compliant (₱200 Cap)</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
          Pag-IBIG Contribution Calculator 2026
        </h1>
        <p className="mt-2 text-sm sm:text-base text-neutral-600 max-w-3xl leading-relaxed">
          Compute your mandatory Pag-IBIG Fund (HDMF) monthly savings, employer counterpart match, and optional MP2 voluntary savings based on official statutory caps.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-2xs space-y-5">
            <h2 className="text-base font-bold text-neutral-900 border-b border-neutral-100 pb-3">
              Salary & Savings Details
            </h2>

            <MoneyInput
              label="Monthly Basic Salary"
              value={basicSalary}
              onChange={setBasicSalary}
              currencySymbol="₱"
              hint="Salaries above ₱10,000 are capped at ₱10,000 for mandatory Pag-IBIG deduction."
              required
            />

            <MoneyInput
              label="Voluntary MP2 Monthly Savings (Optional)"
              value={voluntaryMp2}
              onChange={setVoluntaryMp2}
              currencySymbol="₱"
              hint="Modified Pag-IBIG 2 (MP2) high-yield tax-free savings (minimum ₱500/month)."
            />

            <div className="flex items-start gap-3 rounded-lg bg-brand-soft/40 p-4 border border-brand/20 text-xs text-neutral-700">
              <PiggyBank className="h-5 w-5 text-brand shrink-0 mt-0.5" />
              <div>
                <strong>Guaranteed Savings:</strong> Pag-IBIG regular and MP2 contributions are 100% government-guaranteed and earn tax-free annual dividends credited directly to your total accumulated value (TAV).
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <ResultPanel
            title="Pag-IBIG Savings Breakdown"
            headlineLabel="Employee Mandatory Share (2%)"
            headlineValue={`₱${pagibig.employeeShare.toFixed(2)}`}
            subHeadline={`Employer match: ₱${pagibig.employerShare.toFixed(2)} • Total monthly savings: ₱${pagibig.totalContribution.toFixed(2)}`}
            rows={rows}
            sources={legalSources}
            copySummaryText={copySummaryText}
            shareTitle="Pag-IBIG Contribution Calculation 2026"
          />
        </div>
      </div>

      <RelatedTools tools={related} />
      <FaqAccordion faqs={faqs} />
    </div>
  );
}
