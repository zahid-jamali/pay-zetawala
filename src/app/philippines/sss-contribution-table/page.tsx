'use client';

import React, { useState } from 'react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { BracketTable, ColumnDef } from '@/components/BracketTable';
import { FaqAccordion } from '@/components/FaqAccordion';
import { RelatedTools } from '@/components/RelatedTools';
import { SeoArticle, OfficialSourceLink } from '@/components/SeoArticle';
import { StructuredData } from '@/components/StructuredData';
import { getRelatedPages } from '@/config/pages';
import { SSS_EMPLOYED_BRACKETS, SssBracket } from '@/rules/ph/2026';
import { getPhRates } from '@/lib/seo/rules-content';

export default function SssContributionTablePage() {
  const phRates = getPhRates();
  const [userSalary, setUserSalary] = useState<number>(25000);

  const columns: ColumnDef<SssBracket>[] = [
    {
      header: 'Compensation Range',
      accessor: (b) =>
        b.maxComp === Infinity
          ? `₱${b.minComp.toLocaleString()} and above`
          : `₱${b.minComp.toLocaleString()} – ₱${b.maxComp.toLocaleString()}`,
    },
    {
      header: 'Total MSC',
      accessor: (b) => `₱${b.totalMsc.toLocaleString()}`,
      align: 'right',
      className: 'font-semibold',
    },
    {
      header: 'Regular MSC',
      accessor: (b) => `₱${b.regularMsc.toLocaleString()}`,
      align: 'right',
    },
    {
      header: 'WISP MSC',
      accessor: (b) => (b.mpfMsc > 0 ? `₱${b.mpfMsc.toLocaleString()}` : '—'),
      align: 'right',
      className: 'text-neutral-500',
    },
    {
      header: `EE Share (${phRates.sssEeRate}%)`,
      accessor: (b) => `₱${b.eeTotal.toFixed(2)}`,
      align: 'right',
      className: 'font-bold text-neutral-900',
    },
    {
      header: `ER Share (${phRates.sssErRate}%)`,
      accessor: (b) => `₱${(b.erRegularSs + b.erMpf).toFixed(2)}`,
      align: 'right',
    },
    {
      header: 'EC (ER)',
      accessor: (b) => `₱${b.erEc.toFixed(2)}`,
      align: 'right',
    },
    {
      header: 'Total ER',
      accessor: (b) => `₱${b.erTotal.toFixed(2)}`,
      align: 'right',
      className: 'font-semibold',
    },
    {
      header: 'Total Remittance',
      accessor: (b) => `₱${b.totalContribution.toFixed(2)}`,
      align: 'right',
      className: 'font-bold text-brand-strong bg-brand-soft/20',
    },
  ];

  const related = getRelatedPages('ph-sss-table');

  const faqs = [
    {
      question: 'What is the full SSS contribution schedule for 2026?',
      answer:
        'The official schedule under SSS Circular 2024-006 includes Monthly Salary Credits ranging from ₱5,000 to ₱35,000, advancing in ₱500 steps. The contribution rate is 15.0% (5% employee / 10% employer) plus Employees’ Compensation (₱10 or ₱30).',
    },
    {
      question: 'What is the minimum MSC for employed members?',
      answer:
        'The lowest MSC bracket is ₱5,000, which applies to monthly compensation under ₱5,250. The corresponding employee contribution is ₱250.00 and employer contribution is ₱510.00 (including ₱10 EC), for a total of ₱760.00.',
    },
    {
      question: 'What is the highest MSC bracket in the SSS table?',
      answer:
        'The highest bracket is ₱35,000 MSC, which applies to all compensation of ₱34,750 and above. The employee share is ₱1,750.00 and employer share is ₱3,530.00 (including ₱30 EC), for a total remittance of ₱5,280.00.',
    },
    {
      question: 'How do I locate my exact contribution in the table?',
      answer:
        'Find the row where your gross monthly basic salary falls between the Min and Max compensation figures. The EE Share column indicates your monthly payroll deduction.',
    },
    {
      question: 'Why is the SSS contribution table split into Regular SS and WISP?',
      answer:
        'Republic Act 11199 mandates that regular defined-benefit pensions are funded by MSC up to ₱20,000. Contributions on MSC above ₱20,000 up to ₱35,000 fund the Worker’s Investment and Savings Program (WISP), an individual defined-contribution retirement account.',
    },
    {
      question: 'Do self-employed and voluntary members use this same table?',
      answer:
        'Yes. Self-employed and voluntary members use the same MSC brackets and compensation ranges, but they pay the entire 15.0% total contribution rate themselves.',
    },
    {
      question: 'Are employers allowed to deduct the EC share from workers?',
      answer:
        'No. Under Presidential Decree No. 626 and SSS regulations, the Employees’ Compensation contribution is funded 100% by the employer.',
    },
    {
      question: 'How often does SSS update this contribution table?',
      answer:
        'SSS contribution schedules were updated pursuant to the statutory rate increases enacted under RA 11199, reaching the final 15% rate cap.',
    },
  ];

  const officialSources: OfficialSourceLink[] = [
    {
      name: 'Social Security System (SSS)',
      documentTitle: 'Circular No. 2024-006 (Schedule of Social Security Contributions)',
      url: 'https://www.sss.gov.ph',
      verifiedDate: phRates.verifiedDate,
    },
  ];

  const quickAnswerText = `The official 2026 SSS contribution schedule applies a ${phRates.sssTotalRate}% total contribution rate (${phRates.sssEeRate}% employee / ${phRates.sssErRate}% employer) across Monthly Salary Credits from ₱${phRates.sssMinMsc.toLocaleString()} to ₱${phRates.sssMaxTotalMsc.toLocaleString()}. Regular Social Security is capped at ₱${phRates.sssRegularMscCap.toLocaleString()} MSC, while excess MSC up to ₱${phRates.sssMaxTotalMsc.toLocaleString()} is allocated to the Mandatory Provident Fund (WISP).`;

  const tocItems = [
    { id: 'schedule-overview', label: '2026 Schedule Structure & Rates' },
    { id: 'wisp-partition-rules', label: 'Regular MSC vs WISP Partition' },
    { id: 'ec-tier-rules', label: 'Employees’ Compensation EC Tiers' },
    { id: 'payroll-deduction-guidelines', label: 'Payroll Remittance Guidelines' },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <StructuredData
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Philippines', url: '/philippines/' },
          { name: 'SSS Contribution Table 2026', url: '/philippines/sss-contribution-table/' },
        ]}
        dataset={{
          name: 'Official SSS Contribution Schedule 2026',
          description: 'Complete official Social Security System (SSS) contribution schedule for employed members, showing compensation ranges, MSC, WISP, and EC splits.',
          url: '/philippines/sss-contribution-table/',
          temporalCoverage: '2025/2026',
          keywords: ['SSS table', 'Monthly Salary Credit', 'WISP', 'EC', 'Philippines payroll'],
        }}
        faqs={faqs}
      />

      <Breadcrumbs
        items={[
          { label: 'Philippines', href: '/philippines/' },
          { label: 'SSS Contribution Table' },
        ]}
      />

      {/* Page Header */}
      <div className="border-b border-neutral-200 pb-6 pt-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
          Official SSS Contribution Table {phRates.verifiedYear}
        </h1>
        <p className="mt-2 text-sm sm:text-base text-neutral-600 max-w-3xl leading-relaxed">
          The complete, searchable SSS contribution schedule for formally employed members under Circular No. 2024-006. Look up your exact Monthly Salary Credit (MSC), regular social security, WISP, and EC share.
        </p>
      </div>

      {/* Salary Search & Highlight */}
      <div className="mt-8 rounded-xl border border-neutral-200 bg-white p-5 shadow-2xs">
        <div className="max-w-md">
          <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
            Highlight Your Monthly Salary in the Table
          </label>
          <div className="flex gap-3">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 font-medium text-sm">₱</span>
              <input
                type="number"
                value={userSalary || ''}
                onChange={(e) => setUserSalary(parseFloat(e.target.value) || 0)}
                placeholder="Enter salary e.g. 25000"
                className="w-full rounded-lg border border-neutral-300 py-2 pl-7 pr-3 text-sm text-neutral-900 focus:border-brand focus:outline-hidden focus:ring-2 focus:ring-brand/20"
              />
            </div>
            <button
              type="button"
              onClick={() => setUserSalary(30000)}
              className="rounded-lg bg-neutral-100 px-3 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-200"
            >
              Reset (₱30k)
            </button>
          </div>
          <p className="mt-1.5 text-xs text-neutral-500">
            The corresponding bracket is highlighted automatically with an emerald badge in the table below.
          </p>
        </div>
      </div>

      {/* Full Official Bracket Table */}
      <div className="mt-6">
        <BracketTable<SssBracket>
          title="SSS Contribution Table for Employed Members (Circular 2024-006)"
          data={SSS_EMPLOYED_BRACKETS}
          columns={columns}
          isHighlighted={(b) => userSalary >= b.minComp && userSalary <= b.maxComp}
        />
      </div>

      {/* In-Depth Article */}
      <SeoArticle
        quickAnswer={quickAnswerText}
        toc={tocItems}
        sources={officialSources}
        verifiedDate={phRates.verifiedDate}
      >
        <h2 id="schedule-overview">The 2026 SSS Contribution Schedule Structure</h2>
        <p>
          The Social Security System of the Philippines enforces a graduated contribution bracket table. Rather than calculating contributions on variable centavos, employee salaries are grouped into official Monthly Salary Credit (MSC) brackets advancing in uniform increments of ₱500.
        </p>
        <p>
          The table establishes three core financial parameters:
        </p>
        <ul>
          <li><strong>Minimum MSC:</strong> ₱{phRates.sssMinMsc.toLocaleString()} (for compensation below ₱5,250.00).</li>
          <li><strong>Regular MSC Cap:</strong> ₱{phRates.sssRegularMscCap.toLocaleString()} (for compensation between ₱19,750.00 and ₱20,249.99).</li>
          <li><strong>Maximum Total MSC:</strong> ₱{phRates.sssMaxTotalMsc.toLocaleString()} (for compensation of ₱34,750.00 and above).</li>
        </ul>

        <h2 id="wisp-partition-rules">Regular MSC vs WISP Partition Rules</h2>
        <p>
          Under Republic Act No. 11199, regular Social Security benefits (which determine your future retirement, disability, and death pensions) are capped at an MSC of ₱{phRates.sssRegularMscCap.toLocaleString()}. For members earning more than ₱{phRates.sssRegularMscCap.toLocaleString()} per month, the portion of their MSC between ₱{phRates.sssRegularMscCap.toLocaleString()} and ₱{phRates.sssMaxTotalMsc.toLocaleString()} is credited to the Worker’s Investment and Savings Program (WISP).
        </p>
        <p>
          WISP functions as a defined-contribution provident fund. Your contributions accumulate in an individual account that earns tax-free dividends from SSS investments and is returned as an additional annuity upon retirement.
        </p>

        <h2 id="ec-tier-rules">Employees’ Compensation (EC) Contribution Tiers</h2>
        <p>
          The Employees’ Compensation program is a mandatory social insurance scheme funded 100% by the employer. Workers pay ₱0.00 toward EC. The rates are structured into two tiers:
        </p>
        <ul>
          <li><strong>MSC below ₱15,000:</strong> ₱10.00 per month.</li>
          <li><strong>MSC of ₱15,000 and above:</strong> ₱30.00 per month.</li>
        </ul>

        <h2 id="payroll-deduction-guidelines">Payroll Remittance Guidelines for HR &amp; Employers</h2>
        <p>
          Employers must remit SSS contributions monthly via the SSS Electronic Premium Remittance System (EPRS). Remittance schedules are linked to the 10th digit of the employer’s SSS identification number. SSS contributions are due on or before the last day of the month following the applicable payroll month.
        </p>
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
