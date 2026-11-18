'use client';

import React, { useState } from 'react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SegmentedControl } from '@/components/SegmentedControl';
import { BracketTable, ColumnDef } from '@/components/BracketTable';
import { FaqAccordion } from '@/components/FaqAccordion';
import { RelatedTools } from '@/components/RelatedTools';
import { SeoArticle, WorkedExampleItem, OfficialSourceLink } from '@/components/SeoArticle';
import { StructuredData } from '@/components/StructuredData';
import { getRelatedPages } from '@/config/pages';
import {
  BIR_MONTHLY_TAX_BRACKETS,
  BIR_SEMI_MONTHLY_TAX_BRACKETS,
  BirTaxBracket,
} from '@/rules/ph/2026';
import { getPhRates } from '@/lib/seo/rules-content';

export default function WithholdingTaxTablePage() {
  const phRates = getPhRates();
  const [tableFrequency, setTableFrequency] = useState<'monthly' | 'semi-monthly'>('monthly');
  const [exampleIncome, setExampleIncome] = useState<number>(46800);

  const activeBrackets = tableFrequency === 'monthly' ? BIR_MONTHLY_TAX_BRACKETS : BIR_SEMI_MONTHLY_TAX_BRACKETS;

  const columns: ColumnDef<BirTaxBracket>[] = [
    {
      header: 'Bracket',
      accessor: (b) => `Bracket ${b.bracket}`,
      className: 'font-bold text-neutral-900',
    },
    {
      header: tableFrequency === 'monthly' ? 'Monthly Taxable Compensation' : 'Semi-Monthly Taxable Compensation',
      accessor: (b) =>
        b.maxComp === Infinity
          ? `₱${b.minComp.toLocaleString('en-US', { minimumFractionDigits: 2 })} and above`
          : `₱${b.minComp.toLocaleString('en-US', { minimumFractionDigits: 2 })} – ₱${b.maxComp.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
    },
    {
      header: 'Prescribed Withholding Tax',
      accessor: (b) => {
        if (b.bracket === 1) return '₱0.00 (Tax Exempt)';
        const base = b.baseTax > 0 ? `₱${b.baseTax.toLocaleString('en-US', { minimumFractionDigits: 2 })} + ` : '';
        const pct = `${(b.marginalRate * 100).toFixed(0)}%`;
        const excess = ` over ₱${b.excessOver.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
        return `${base}${pct}${excess}`;
      },
      className: 'font-semibold text-brand-strong',
    },
  ];

  // Calculate live interactive sample
  const matchedBracket =
    activeBrackets.find((b) => exampleIncome >= b.minComp && exampleIncome <= b.maxComp) || activeBrackets[0];
  const excessAmount = Math.max(0, exampleIncome - matchedBracket.excessOver);
  const marginalTax = Math.round(excessAmount * matchedBracket.marginalRate * 100) / 100;
  const totalTax = Math.round((matchedBracket.baseTax + marginalTax) * 100) / 100;

  const related = getRelatedPages('ph-tax-table');

  const faqs = [
    {
      question: 'Which deductions are subtracted before computing withholding tax?',
      answer:
        'Under the Tax Code and TRAIN Law, mandatory employee contributions to SSS, PhilHealth, and Pag-IBIG are non-taxable and must be deducted from your gross compensation first. De minimis benefits within statutory limits and the ₱90,000 tax-exempt bonus ceiling are also excluded.',
    },
    {
      question: 'What is the tax-exempt threshold for individual compensation in 2026?',
      answer:
        'Employees with taxable compensation of ₱250,000 or less per year (equivalent to ₱20,833.33 per month or ₱10,416.67 semi-monthly) owe ₱0.00 in income tax under TRAIN Law Bracket 1.',
    },
    {
      question: 'How do semi-monthly withholding tax tables work?',
      answer:
        'The BIR provides an official semi-monthly withholding tax table where compensation thresholds and base taxes are exactly half of the monthly figures. Employers calculate tax per cut-off on the 15th and 30th to avoid large year-end adjustments.',
    },
    {
      question: 'Are minimum wage earners subject to withholding tax?',
      answer:
        'No. Under Republic Act No. 9504 and the NIRC, statutory minimum wage earners (SMWEs) in the private and public sectors are 100% exempt from income tax on their basic minimum wage, holiday pay, overtime pay, night shift differential, and hazard pay.',
    },
    {
      question: 'What is year-end tax annualization?',
      answer:
        'In December, Philippine employers perform tax annualization to compute your actual annual income tax against total taxes withheld during the preceding 11 months. Any excess tax withheld is refunded to the employee in their December paycheck.',
    },
    {
      question: 'What are the marginal tax rates in the Philippines?',
      answer:
        'The marginal tax rates on taxable income are: 0% (up to ₱250k), 15% (₱250k to ₱400k), 20% (₱400k to ₱800k), 25% (₱800k to ₱2M), 30% (₱2M to ₱8M), and 35% (over ₱8M).',
    },
    {
      question: 'Are allowances and 13th-month pay taxed under this table?',
      answer:
        '13th-month pay and productivity bonuses up to ₱90,000 per year are completely tax-exempt. Only bonuses in excess of ₱90,000 are added to your taxable income and taxed under these brackets.',
    },
    {
      question: 'What is BIR Form 2316?',
      answer:
        'BIR Form 2316 is the Certificate of Compensation Payment/Tax Withheld given to employees annually by January 31, proving all gross earnings, non-taxable deductions, and taxes remitted to the government.',
    },
  ];

  const workedExamples: WorkedExampleItem[] = [
    {
      title: 'Monthly Taxable Income of ₱46,800 (Bracket 3)',
      scenario: 'An employee with ₱46,800 taxable compensation after subtracting SSS, PhilHealth, and Pag-IBIG.',
      inputs: [
        { label: 'Monthly Taxable Income', value: '₱46,800.00' },
        { label: 'Matching Bracket', value: 'Bracket 3 (₱33,333 to ₱66,666)' },
      ],
      steps: [
        { label: 'Base Tax for Bracket 3', formula: 'Statutory fixed base', value: '₱1,875.00' },
        { label: 'Excess Over Bracket Floor', formula: '₱46,800 - ₱33,333', value: '₱13,467.00' },
        { label: '20% Marginal Tax on Excess', formula: '₱13,467 × 20%', value: '₱2,693.40' },
        { label: 'Total Monthly Withholding Tax', formula: '₱1,875.00 + ₱2,693.40', value: '₱4,568.40', highlight: true },
      ],
      resultLabel: 'Monthly BIR Tax Withheld',
      resultValue: '₱4,568.40',
      notes: 'Matches the exact BIR Annex E formula.',
    },
    {
      title: 'Tax-Exempt Compensation (₱20,000 Taxable Pay)',
      scenario: 'An entry-level employee whose taxable pay after statutory deductions is ₱20,000.',
      inputs: [
        { label: 'Monthly Taxable Income', value: '₱20,000.00' },
        { label: 'Matching Bracket', value: 'Bracket 1 (≤ ₱20,833.33)' },
      ],
      steps: [
        { label: 'Tax-Exempt Threshold Check', formula: '₱20,000 ≤ ₱20,833.33 limit', value: 'Eligible for 0% Rate' },
        { label: 'Withholding Tax Due', formula: '0% tax bracket', value: '₱0.00 (Exempt)', highlight: true },
      ],
      resultLabel: 'Monthly BIR Tax Withheld',
      resultValue: '₱0.00',
      notes: '100% tax-exempt under TRAIN Law.',
    },
  ];

  const officialSources: OfficialSourceLink[] = [
    {
      name: 'Bureau of Internal Revenue (BIR)',
      documentTitle: 'Revenue Regulations No. 11-2018 (Revised Withholding Tax Table Annex E)',
      url: 'https://www.bir.gov.ph',
      verifiedDate: phRates.verifiedDate,
    },
    {
      name: 'National Internal Revenue Code (NIRC)',
      documentTitle: 'Republic Act No. 10963 (TRAIN Law) Section 24(A)(2)(a)',
      url: 'https://www.officialgazette.gov.ph',
      verifiedDate: phRates.verifiedDate,
    },
  ];

  const quickAnswerText = `Under the BIR revised withholding tax table (Annex E, RR 11-2018), employees earning taxable compensation of ₱${phRates.taxExemptMonthly.toLocaleString()} per month or less (₱${phRates.taxExemptAnnual.toLocaleString()} annually) pay 0% income tax. Taxable income above ₱${phRates.taxExemptMonthly.toLocaleString()} is taxed graduated from 15% to 35% on excess brackets.`;

  const tocItems = [
    { id: 'tax-brackets-explained', label: 'BIR Tax Brackets & Marginal Rates' },
    { id: 'monthly-vs-semimonthly', label: 'Monthly vs Semi-Monthly Tables' },
    { id: 'taxable-income-formula', label: 'Computing Taxable Compensation' },
    { id: 'smwe-exemption', label: 'Statutory Minimum Wage Earner Protections' },
    { id: 'tax-annualization', label: 'Year-End Annualization & Form 2316' },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <StructuredData
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Philippines', url: '/philippines/' },
          { name: 'BIR Withholding Tax Table 2026', url: '/philippines/withholding-tax-table/' },
        ]}
        dataset={{
          name: 'Official BIR Withholding Tax Table 2026 (TRAIN Law)',
          description: 'Official Bureau of Internal Revenue (BIR) monthly and semi-monthly withholding tax table under Revenue Regulations No. 11-2018.',
          url: '/philippines/withholding-tax-table/',
          temporalCoverage: '2023/2026',
          keywords: ['BIR tax table', 'TRAIN Law', 'withholding tax', 'compensation income tax', 'Philippines tax brackets'],
        }}
        faqs={faqs}
      />

      <Breadcrumbs
        items={[
          { label: 'Philippines', href: '/philippines/' },
          { label: 'BIR Withholding Tax Table' },
        ]}
      />

      {/* Page Header */}
      <div className="border-b border-neutral-200 pb-6 pt-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
          BIR Withholding Tax Table {phRates.verifiedYear} (TRAIN Law)
        </h1>
        <p className="mt-2 text-sm sm:text-base text-neutral-600 max-w-3xl leading-relaxed">
          The official revised BIR withholding tax schedule under Revenue Regulations No. 11-2018 (TRAIN Law). Check monthly and semi-monthly personal income tax brackets and formulas.
        </p>

        {/* Frequency Toggle */}
        <div className="mt-6 max-w-xs">
          <SegmentedControl<'monthly' | 'semi-monthly'>
            label="Payroll Frequency Schedule"
            value={tableFrequency}
            onChange={setTableFrequency}
            options={[
              { label: 'Monthly Table', value: 'monthly' },
              { label: 'Semi-Monthly Table', value: 'semi-monthly' },
            ]}
          />
        </div>
      </div>

      {/* Interactive Tax Tester */}
      <div className="mt-8 rounded-xl border border-neutral-200 bg-white p-5 shadow-2xs">
        <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-700 mb-2">
          Test Your {tableFrequency === 'monthly' ? 'Monthly' : 'Semi-Monthly'} Taxable Income
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
          <div className="sm:col-span-5 relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 font-medium text-sm">₱</span>
            <input
              type="number"
              value={exampleIncome || ''}
              onChange={(e) => setExampleIncome(parseFloat(e.target.value) || 0)}
              className="w-full rounded-lg border border-neutral-300 py-2 pl-7 pr-3 text-sm text-neutral-900 focus:border-brand focus:outline-hidden focus:ring-2 focus:ring-brand/20"
              placeholder="e.g. 46800"
            />
          </div>
          <div className="sm:col-span-7 flex flex-wrap items-center gap-3 text-xs">
            <span className="rounded-md bg-neutral-100 px-2.5 py-1 font-semibold text-neutral-800">
              Bracket {matchedBracket.bracket}
            </span>
            <span className="text-neutral-600">
              Tax: <strong className="text-neutral-900 font-mono text-sm">₱{totalTax.toFixed(2)}</strong>
            </span>
            <span className="text-neutral-400">|</span>
            <span className="text-neutral-500">
              Formula: {matchedBracket.baseTax > 0 ? `₱${matchedBracket.baseTax.toLocaleString()} + ` : ''}
              {(matchedBracket.marginalRate * 100).toFixed(0)}% of excess over ₱{matchedBracket.excessOver.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Bracket Table */}
      <div className="mt-6">
        <BracketTable<BirTaxBracket>
          title={`BIR ${tableFrequency === 'monthly' ? 'Monthly' : 'Semi-Monthly'} Tax Table (Annex E, RR 11-2018)`}
          data={activeBrackets}
          columns={columns}
          isHighlighted={(b) => exampleIncome >= b.minComp && exampleIncome <= b.maxComp}
        />
      </div>

      {/* SEO Article */}
      <SeoArticle
        quickAnswer={quickAnswerText}
        toc={tocItems}
        workedExamples={workedExamples}
        sources={officialSources}
        verifiedDate={phRates.verifiedDate}
      >
        <h2 id="tax-brackets-explained">How the BIR Revised Withholding Tax Table Works</h2>
        <p>
          The Bureau of Internal Revenue (BIR) calculates compensation withholding taxes through graduated tax brackets enacted under the Tax Reform for Acceleration and Inclusion (TRAIN) Law (Republic Act No. 10963).
        </p>
        <p>
          The tax schedule ensures lower- and middle-income wage earners keep a larger portion of their earnings. Individual taxpayers earning up to ₱{phRates.taxExemptAnnual.toLocaleString()} per year pay ₱0.00 in income taxes. On a monthly basis, this translates to an exemption threshold of ₱{phRates.taxExemptMonthly.toLocaleString()} in net taxable income.
        </p>

        <h2 id="monthly-vs-semimonthly">Monthly vs Semi-Monthly Tax Tables</h2>
        <p>
          Most companies in the Philippines compensate employees on a semi-monthly schedule (typically the 15th and 30th). To assist payroll officers, the BIR publishes two parallel schedules:
        </p>
        <ul>
          <li><strong>Monthly Table:</strong> Designed for companies paying salaries once per month. Taxable threshold is ₱{phRates.taxExemptMonthly.toLocaleString()}.</li>
          <li><strong>Semi-Monthly Table:</strong> Designed for bi-monthly cut-offs. Every compensation range, bracket threshold, and base tax is divided by exactly two. The tax-exempt boundary is ₱10,416.67 per cut-off.</li>
        </ul>

        <h2 id="taxable-income-formula">How to Compute Taxable Compensation Income</h2>
        <p>
          Income tax is never calculated directly on your gross pay. Employers follow a legally defined deduction order:
        </p>
        <div className="not-prose my-4 rounded-lg bg-neutral-900 p-4 font-mono text-sm text-brand-light">
          Taxable Income = Gross Basic Salary - Non-Taxable SSS Share - Non-Taxable PhilHealth Share - Non-Taxable Pag-IBIG Share - De Minimis Benefits
        </div>
        <p>
          Because statutory contributions are 100% tax-exempt, an employee earning a basic salary of ₱22,000 often has a taxable income of under ₱20,000 after SSS, PhilHealth, and Pag-IBIG are subtracted. As a result, the employee falls into Bracket 1 and pays ₱0.00 in withholding tax.
        </p>

        <h2 id="smwe-exemption">Statutory Minimum Wage Earner Protections</h2>
        <p>
          Under Republic Act No. 9504 and Section 22(HH) of the NIRC, Statutory Minimum Wage Earners (SMWEs) are completely exempt from income tax on their basic minimum wage. Furthermore, their overtime pay, night shift differential, hazard pay, and holiday pay are also 100% tax-free.
        </p>

        <h2 id="tax-annualization">Year-End Tax Annualization and BIR Form 2316</h2>
        <p>
          During the final payroll run in December, employers perform a mandatory process called <em>tax annualization</em>. The employer aggregates all taxable income earned throughout the entire calendar year and computes the precise annual tax liability against the annual tax table.
        </p>
        <p>
          If total monthly withholdings exceeded the annual tax due, the difference is refunded to the employee in their December payout. The finalized figures are documented on BIR Form 2316, which employers must issue to all employees by January 31.
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
