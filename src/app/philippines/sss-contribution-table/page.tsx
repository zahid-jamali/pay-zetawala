'use client';

import React, { useState } from 'react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { BracketTable, ColumnDef } from '@/components/BracketTable';
import { FaqAccordion } from '@/components/FaqAccordion';
import { RelatedTools } from '@/components/RelatedTools';
import { getRelatedPages } from '@/config/pages';
import { SSS_EMPLOYED_BRACKETS, SssBracket } from '@/rules/ph/2026';
import { ShieldCheck, Info } from 'lucide-react';

export default function SssContributionTablePage() {
  const [userSalary, setUserSalary] = useState<number>(25000);

  const columns: ColumnDef<SssBracket>[] = [
    {
      header: 'Compensation Range',
      accessor: b =>
        b.maxComp === Infinity
          ? `₱${b.minComp.toLocaleString()} and above`
          : `₱${b.minComp.toLocaleString()} – ₱${b.maxComp.toLocaleString()}`,
    },
    {
      header: 'Total MSC',
      accessor: b => `₱${b.totalMsc.toLocaleString()}`,
      align: 'right',
      className: 'font-semibold',
    },
    {
      header: 'Regular MSC',
      accessor: b => `₱${b.regularMsc.toLocaleString()}`,
      align: 'right',
    },
    {
      header: 'WISP MSC',
      accessor: b => (b.mpfMsc > 0 ? `₱${b.mpfMsc.toLocaleString()}` : '—'),
      align: 'right',
      className: 'text-neutral-500',
    },
    {
      header: 'EE Share (5%)',
      accessor: b => `₱${b.eeTotal.toFixed(2)}`,
      align: 'right',
      className: 'font-bold text-neutral-900',
    },
    {
      header: 'ER Share (10%)',
      accessor: b => `₱${(b.erRegularSs + b.erMpf).toFixed(2)}`,
      align: 'right',
    },
    {
      header: 'EC (ER)',
      accessor: b => `₱${b.erEc.toFixed(2)}`,
      align: 'right',
    },
    {
      header: 'Total ER',
      accessor: b => `₱${b.erTotal.toFixed(2)}`,
      align: 'right',
      className: 'font-semibold',
    },
    {
      header: 'Total Remittance',
      accessor: b => `₱${b.totalContribution.toFixed(2)}`,
      align: 'right',
      className: 'font-bold text-brand-strong',
    },
  ];

  const related = getRelatedPages('ph-sss-table');

  const faqs = [
    {
      question: 'Is this the official SSS contribution table currently in force?',
      answer:
        'Yes. This table reflects the official SSS contribution schedule published under <strong>SSS Circular No. 2024-006</strong> in implementation of Republic Act No. 11199 (Social Security Act of 2018), in force for 2026. The total rate is 15.0% with a maximum Monthly Salary Credit (MSC) of ₱35,000.',
    },
    {
      question: 'What is the minimum MSC for Overseas Filipino Workers (OFWs)?',
      answer:
        'Under SSS Circular No. 2024-008, the minimum Monthly Salary Credit for land-based OFW members is <strong>₱10,000</strong> (minimum total contribution of ₱1,500.00 per month).',
    },
    {
      question: 'How do self-employed and voluntary members pay contributions?',
      answer:
        'Self-employed and voluntary members shoulder the entire 15.0% contribution rate on their declared Monthly Salary Credit (from ₱5,000 MSC = ₱750 up to ₱35,000 MSC = ₱5,250), plus voluntary members can also avail of WISP Plus.',
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <Breadcrumbs
        items={[
          { label: 'Philippines', href: '/philippines/' },
          { label: 'SSS Contribution Table' },
        ]}
      />

      <div className="border-b border-neutral-200 pb-6 pt-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft px-3 py-1 text-xs font-semibold text-brand-strong mb-2">
          <ShieldCheck className="h-3.5 w-3.5 text-brand" />
          <span>Official SSS Circular No. 2024-006 Schedule</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
          Official SSS Contribution Table 2026
        </h1>
        <p className="mt-2 text-sm sm:text-base text-neutral-600 max-w-3xl leading-relaxed">
          The complete, official bracket-by-bracket SSS contribution schedule for employed members, employers, and human resource payroll managers. Inclusive of regular Social Security, Mandatory Provident Fund (WISP), and Employees&apos; Compensation (EC).
        </p>

        {/* Quick Search / Highlight Bar */}
        <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-neutral-50 p-4 rounded-xl border border-neutral-200">
          <div className="text-xs font-semibold text-neutral-700">
            Highlight your salary bracket in the table:
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs font-bold text-neutral-500">₱</span>
            <input
              type="number"
              value={userSalary}
              onChange={e => setUserSalary(parseFloat(e.target.value) || 0)}
              step={1000}
              min={0}
              placeholder="e.g. 25000"
              className="rounded-md border border-neutral-300 py-1.5 px-3 text-xs font-medium tabular-nums w-36 focus:outline-none focus:ring-1 focus:ring-brand"
            />
            <span className="text-xs text-neutral-500">monthly basic</span>
          </div>
        </div>
      </div>

      {/* Official Full Bracket Table */}
      <BracketTable<SssBracket>
        title="Employed Members SSS Contribution Schedule (15% Rate)"
        subtitle="Source: Social Security Commission Resolution No. 446-s.2024 / Circular No. 2024-006"
        columns={columns}
        data={SSS_EMPLOYED_BRACKETS}
        highlightRowPredicate={b => userSalary >= b.minComp && userSalary <= b.maxComp}
        searchPredicate={(b, term) => {
          const range = `${b.minComp} ${b.maxComp} ${b.totalMsc} ${b.eeTotal}`;
          return range.includes(term);
        }}
        searchPlaceholder="Filter by MSC or amount..."
      />

      {/* Explanatory notes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8 text-xs text-neutral-700 leading-relaxed">
        <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-2xs space-y-2">
          <h3 className="font-bold text-neutral-900 text-sm flex items-center gap-1.5">
            <Info className="h-4 w-4 text-brand" />
            <span>Regular MSC vs WISP Partitioning</span>
          </h3>
          <p>
            For salaries with an MSC exceeding ₱20,000, regular Social Security benefits (sickness, maternity, disability, retirement) are computed on the <strong>₱20,000 regular MSC cap</strong>.
          </p>
          <p>
            The remaining portion up to ₱35,000 MSC goes to the <strong>Worker’s Investment and Savings Program (WISP)</strong>, which accumulates interest and provides an additional monthly annuity or lump-sum upon retirement.
          </p>
        </div>

        <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-2xs space-y-2">
          <h3 className="font-bold text-neutral-900 text-sm flex items-center gap-1.5">
            <Info className="h-4 w-4 text-brand" />
            <span>Employees’ Compensation (EC) Rule</span>
          </h3>
          <p>
            The Employees’ Compensation program is an employer-funded state insurance fund that covers work-related injury, sickness, disability, or death:
          </p>
          <ul className="list-disc pl-4 space-y-1">
            <li><strong>₱10.00 / month:</strong> For Monthly Salary Credits below ₱15,000.</li>
            <li><strong>₱30.00 / month:</strong> For Monthly Salary Credits of ₱15,000 and above.</li>
            <li>The employee contributes ₱0.00 towards EC.</li>
          </ul>
        </div>
      </div>

      <RelatedTools tools={related} />
      <FaqAccordion faqs={faqs} />
    </div>
  );
}
