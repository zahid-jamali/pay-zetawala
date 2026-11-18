'use client';

import React, { useState, useMemo } from 'react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { MoneyInput } from '@/components/MoneyInput';
import { ResultPanel, BreakdownRow, CalculationLegalSource } from '@/components/ResultPanel';
import { FaqAccordion } from '@/components/FaqAccordion';
import { RelatedTools } from '@/components/RelatedTools';
import { SeoArticle, WorkedExampleItem, OfficialSourceLink } from '@/components/SeoArticle';
import { StructuredData } from '@/components/StructuredData';
import { getRelatedPages } from '@/config/pages';
import { calculatePagIbig } from '@/lib/ph/salary';
import { getPhRates } from '@/lib/seo/rules-content';

export default function PagIbigContributionCalculator() {
  const phRates = getPhRates();
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
      label: 'Monthly Fund Salary (MFS) Basis',
      value: `₱${pagibig.fundSalary.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      sublabel: `Capped at ₱${phRates.pagibigMaxMfs.toLocaleString()} under Circular No. 460`,
    },
    {
      label: `Regular Employee Share (EE ${pagibig.fundSalary <= 1500 ? '1%' : '2%'})`,
      value: `₱${pagibig.employeeShare.toFixed(2)}`,
      highlight: true,
      sublabel: `Mandatory Pag-IBIG 1 savings (max ₱${phRates.pagibigMaxEeContribution.toFixed(2)})`,
    },
    {
      label: 'Employer Counterpart Share (ER 2%)',
      value: `₱${pagibig.employerShare.toFixed(2)}`,
      sublabel: `Mandatory 100% employer match (max ₱${phRates.pagibigMaxErContribution.toFixed(2)})`,
    },
    {
      label: 'Total Mandatory Monthly Remittance',
      value: `₱${pagibig.totalContribution.toFixed(2)}`,
      highlight: true,
      sublabel: 'Combined regular savings credited to member account',
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
      label: 'Semi-Monthly Cut-off Deduction',
      value: `₱${(pagibig.employeeShare / 2).toFixed(2)}`,
      sublabel: 'Per payroll cut-off for bi-monthly schedules',
    },
    {
      label: 'Annual Mandatory Savings (EE + ER)',
      value: `₱${(pagibig.totalContribution * 12).toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
    },
  ];

  const legalSources: CalculationLegalSource[] = [
    {
      title: 'Home Development Mutual Fund (Pag-IBIG)',
      documentNumber: 'Circular No. 460 & DBM Circular Letter 2024-2',
      summary: `Maximum Monthly Fund Salary (MFS) adjusted to ₱${phRates.pagibigMaxMfs.toLocaleString()}. Employee and employer share capped at ₱${phRates.pagibigMaxEeContribution.toFixed(2)} each.`,
    },
    {
      title: 'Republic Act No. 9679',
      documentNumber: 'Home Development Mutual Fund Law of 2009',
      summary: 'Mandates universal national savings and housing loan coverage for Filipino workers.',
    },
  ];

  const copySummaryText = `Philippine Pag-IBIG Contribution (${phRates.verifiedYear}):
Monthly Basic Salary: ₱${basicSalary.toLocaleString('en-US', { minimumFractionDigits: 2 })}
- Employee Share: ₱${pagibig.employeeShare.toFixed(2)}
- Employer Share: ₱${pagibig.employerShare.toFixed(2)}
Total Monthly Remittance: ₱${pagibig.totalContribution.toFixed(2)}
Semi-Monthly Cut-off: ₱${(pagibig.employeeShare / 2).toFixed(2)}
Calculated on Pay (https://pay.zetawala.com/philippines/pag-ibig-contribution-calculator/)`;

  const related = getRelatedPages('ph-pagibig');

  const faqs = [
    {
      question: 'What is the maximum Pag-IBIG contribution in 2026?',
      answer:
        'Under Pag-IBIG Circular No. 460, the maximum fund salary basis is ₱10,000. At the 2% contribution rate, the maximum regular monthly deduction for an employee is exactly ₱200.00, matched by an employer counterpart of ₱200.00, for a total monthly remittance of ₱400.00.',
    },
    {
      question: 'What are the Pag-IBIG contribution rates for low-income earners?',
      answer:
        'For employees earning ₱1,500 or less per month, the employee contribution rate is 1.0%, while the employer contribution rate is 2.0%. For employees earning more than ₱1,500 per month, the rate is 2.0% for both employee and employer.',
    },
    {
      question: 'Can an employee contribute more than ₱200 per month?',
      answer:
        'Yes. An employee may request their employer to deduct an amount higher than ₱200 per month for Pag-IBIG Regular Savings. However, the employer is only legally mandated to match up to the statutory cap of ₱200.00.',
    },
    {
      question: 'What is the Modified Pag-IBIG 2 (MP2) Savings Program?',
      answer:
        'MP2 is a voluntary government savings program for active Pag-IBIG members with a 5-year maturity period. It offers higher tax-free annual dividend yields than regular savings and allows minimum deposits starting at ₱500.',
    },
    {
      question: 'How do self-employed members pay Pag-IBIG?',
      answer:
        'Self-employed individuals, freelancers, and OFWs shoulder both the employee and employer shares, contributing the full 4.0% of their monthly income (capped at ₱400.00 per month).',
    },
    {
      question: 'Are Pag-IBIG savings refundable upon retirement?',
      answer:
        'Yes. All mandatory Pag-IBIG Regular Savings (both employee and employer shares), along with accumulated tax-free annual dividends, are returned 100% to the member upon retirement, membership maturity (20 years / 240 contributions), or permanent departure from the Philippines.',
    },
    {
      question: 'Does paying Pag-IBIG qualify me for a housing loan?',
      answer:
        'Yes. Active Pag-IBIG members who have paid at least 24 monthly contributions qualify to apply for Pag-IBIG housing loans of up to ₱6,000,000 with subsidized interest rates.',
    },
    {
      question: 'Are domestic workers (Kasambahay) covered by Pag-IBIG?',
      answer:
        'Yes. Under RA 10361, household employers must register domestic workers and pay 100% of the Pag-IBIG contribution if the worker earns less than ₱5,000 monthly.',
    },
  ];

  const workedExamples: WorkedExampleItem[] = [
    {
      title: 'Regular Employee (₱30,000 Monthly Salary)',
      scenario: 'A private regular employee earning ₱30,000 basic salary, subject to the statutory fund cap.',
      inputs: [
        { label: 'Monthly Basic Salary', value: '₱30,000.00' },
        { label: 'Maximum Fund Salary (MFS) Cap', value: '₱10,000.00' },
      ],
      steps: [
        { label: 'Monthly Fund Salary Applied', formula: 'Capped at Circular 460 ceiling', value: '₱10,000.00' },
        { label: 'Employee Share (2%)', formula: '₱10,000 × 2.0%', value: '₱200.00', highlight: true },
        { label: 'Employer Counterpart (2%)', formula: '₱10,000 × 2.0%', value: '₱200.00' },
        { label: 'Total Monthly Account Credit', formula: '₱200 + ₱200', value: '₱400.00' },
      ],
      resultLabel: 'Monthly Payroll Deduction',
      resultValue: '₱200.00',
      notes: 'Matches the ₱200 employer counterpart.',
    },
    {
      title: 'Low-Income Worker (₱1,400 Monthly Wage)',
      scenario: 'A part-time employee earning ₱1,400 monthly basic wage, below the ₱1,500 threshold.',
      inputs: [
        { label: 'Monthly Basic Wage', value: '₱1,400.00' },
        { label: 'Statutory Rate Bracket', value: '≤ ₱1,500 (1% EE / 2% ER)' },
      ],
      steps: [
        { label: 'Employee Share (1.0%)', formula: '₱1,400 × 1.0%', value: '₱14.00', highlight: true },
        { label: 'Employer Counterpart (2.0%)', formula: '₱1,400 × 2.0%', value: '₱28.00' },
        { label: 'Total Monthly Remittance', formula: '₱14 + ₱28', value: '₱42.00' },
      ],
      resultLabel: 'Monthly Payroll Deduction',
      resultValue: '₱14.00',
      notes: 'Demonstrates the reduced 1% employee rate for lower wages.',
    },
  ];

  const officialSources: OfficialSourceLink[] = [
    {
      name: 'Home Development Mutual Fund (Pag-IBIG)',
      documentTitle: 'Pag-IBIG Circular No. 460 & DBM Circular Letter 2024-2',
      url: 'https://www.pagibigfund.gov.ph',
      verifiedDate: phRates.verifiedDate,
    },
    {
      name: 'Republic of the Philippines',
      documentTitle: 'Republic Act No. 9679 (Home Development Mutual Fund Law of 2009)',
      url: 'https://www.officialgazette.gov.ph',
      verifiedDate: phRates.verifiedDate,
    },
  ];

  const quickAnswerText = `Under Pag-IBIG Circular No. 460 and DBM Circular Letter 2024-2, the maximum Monthly Fund Salary (MFS) is ₱${phRates.pagibigMaxMfs.toLocaleString()}. At the 2% statutory rate, the employee share is capped at exactly ₱${phRates.pagibigMaxEeContribution.toFixed(2)} per month, matched by an employer counterpart of ₱${phRates.pagibigMaxErContribution.toFixed(2)}, yielding a mandatory total monthly savings of ₱${(phRates.pagibigMaxEeContribution + phRates.pagibigMaxErContribution).toFixed(2)}.`;

  const tocItems = [
    { id: 'contribution-formula', label: 'Pag-IBIG Contribution Rates' },
    { id: 'maximum-fund-salary', label: 'The ₱10,000 Maximum Fund Salary (MFS) Cap' },
    { id: 'mp2-savings', label: 'Modified Pag-IBIG 2 (MP2) Voluntary Savings' },
    { id: 'employer-matching', label: 'Employer Counterpart Obligations' },
    { id: 'maturity-benefits', label: '20-Year Maturity & Retirement Payouts' },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <StructuredData
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Philippines', url: '/philippines/' },
          { name: 'Pag-IBIG Calculator 2026', url: '/philippines/pag-ibig-contribution-calculator/' },
        ]}
        webApp={{
          name: 'Pag-IBIG Contribution Calculator 2026',
          url: '/philippines/pag-ibig-contribution-calculator/',
          description: 'Calculate employee and employer Pag-IBIG contributions under Circular 460 with the ₱200 cap.',
          applicationCategory: 'FinanceApplication',
        }}
        faqs={faqs}
      />

      <Breadcrumbs
        items={[
          { label: 'Philippines', href: '/philippines/' },
          { label: 'Pag-IBIG Contribution Calculator' },
        ]}
      />

      {/* Page Header */}
      <div className="border-b border-neutral-200 pb-6 pt-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
          Pag-IBIG Contribution Calculator {phRates.verifiedYear}
        </h1>
        <p className="mt-2 text-sm sm:text-base text-neutral-600 max-w-3xl leading-relaxed">
          Compute employee and employer HDMF contributions under Pag-IBIG Circular No. 460. Features the ₱{phRates.pagibigMaxMfs.toLocaleString()} maximum fund salary and ₱{phRates.pagibigMaxEeContribution.toFixed(0)} cap.
        </p>
      </div>

      {/* Main Grid: Inputs Left, Result Right */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Inputs Column */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-2xs space-y-6">
            <h2 className="text-base font-bold text-neutral-900 border-b border-neutral-100 pb-3">
              Salary &amp; Savings Parameters
            </h2>

            <MoneyInput
              label="Monthly Basic Salary"
              value={basicSalary}
              onChange={setBasicSalary}
              currencySymbol="₱"
              hint="Your monthly basic pay used to determine your Monthly Fund Salary."
              min={0}
              max={1000000}
              required
            />

            <div className="pt-2 border-t border-neutral-100">
              <MoneyInput
                label="Voluntary MP2 Monthly Savings (Optional)"
                value={voluntaryMp2}
                onChange={setVoluntaryMp2}
                currencySymbol="₱"
                hint="Modified Pag-IBIG 2 voluntary deposits (minimum ₱500/month, 5-year lock-in)."
                min={0}
              />
            </div>
          </div>
        </div>

        {/* Right Sticky Result Column */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
          <ResultPanel
            title="Pag-IBIG Contribution Result"
            headlineLabel="Employee Monthly Share"
            headlineValue={`₱${pagibig.employeeShare.toFixed(2)}`}
            subHeadline={`Matched by ₱${pagibig.employerShare.toFixed(2)} mandatory employer counterpart`}
            rows={rows}
            sources={legalSources}
            copySummaryText={copySummaryText}
            shareTitle="Pag-IBIG Contribution Breakdown"
            calloutMessage={
              basicSalary >= phRates.pagibigMaxMfs
                ? {
                    type: 'info',
                    text: `Statutory Cap Reached: Basic salary of ₱${basicSalary.toLocaleString()} is capped at the ₱${phRates.pagibigMaxMfs.toLocaleString()} MFS limit (₱${phRates.pagibigMaxEeContribution.toFixed(2)} employee / ₱${phRates.pagibigMaxErContribution.toFixed(2)} employer).`,
                  }
                : undefined
            }
          />
        </div>
      </div>

      {/* SEO Article */}
      <SeoArticle
        quickAnswer={quickAnswerText}
        toc={tocItems}
        workedExamples={workedExamples}
        sources={officialSources}
        verifiedDate={phRates.verifiedDate}
      >
        <h2 id="contribution-formula">Pag-IBIG Contribution Rates and Legal Rules</h2>
        <p>
          The Home Development Mutual Fund (HDMF), universally known as Pag-IBIG Fund, is the Philippine national provident savings and housing loan system created under Republic Act No. 9679.
        </p>
        <p>
          Under statutory regulations, contribution rates depend on your monthly compensation:
        </p>
        <ul>
          <li><strong>Monthly Basic Wage ≤ ₱1,500:</strong> The employee contributes 1.0% and the employer contributes 2.0%.</li>
          <li><strong>Monthly Basic Wage &gt; ₱1,500:</strong> The employee contributes 2.0% and the employer contributes 2.0%.</li>
        </ul>

        <h2 id="maximum-fund-salary">The ₱10,000 Maximum Fund Salary (MFS) Cap</h2>
        <p>
          Historically, the Pag-IBIG fund salary basis was capped at ₱5,000 (₱100 employee share). Under Pag-IBIG Circular No. 460 and Department of Budget and Management Circular Letter 2024-2, the Maximum Monthly Fund Salary (MFS) is permanently set at ₱{phRates.pagibigMaxMfs.toLocaleString()}.
        </p>
        <p>
          Consequently, for all Philippine workers earning ₱{phRates.pagibigMaxMfs.toLocaleString()} or more per month:
        </p>
        <div className="not-prose my-4 rounded-lg bg-neutral-900 p-4 font-mono text-sm text-brand-light">
          Employee Share = 2.0% × ₱10,000 = ₱200.00 / month<br />
          Employer Share = 2.0% × ₱10,000 = ₱200.00 / month<br />
          Total Mandatory Monthly Credit = ₱400.00 / month
        </div>

        <h2 id="mp2-savings">Modified Pag-IBIG 2 (MP2) Voluntary Savings</h2>
        <p>
          In addition to mandatory Pag-IBIG 1 contributions, members can open a Modified Pag-IBIG 2 (MP2) account. MP2 is a voluntary government savings program featuring:
        </p>
        <ul>
          <li><strong>5-Year Maturity:</strong> Principal and dividends can be withdrawn in a lump-sum after 5 years, or dividends can be credited annually.</li>
          <li><strong>Tax-Free Yields:</strong> All annual dividends earned by MP2 deposits are 100% tax-free under Philippine law.</li>
          <li><strong>Government Guarantee:</strong> MP2 savings are backed by the sovereign financial guarantee of the Republic of the Philippines.</li>
        </ul>

        <h2 id="employer-matching">Employer Counterpart Obligations</h2>
        <p>
          Private and government employers are legally required to remit a 100% matching contribution for every employee, up to the ₱{phRates.pagibigMaxErContribution.toFixed(2)} monthly ceiling. Employers cannot deduct the employer share from the employee’s salary. Non-compliance subjects employers to monetary penalties and administrative fines.
        </p>

        <h2 id="maturity-benefits">20-Year Maturity and Retirement Refunds</h2>
        <p>
          Unlike health insurance premiums which do not build cash equity, Pag-IBIG contributions represent personal savings. After twenty (20) years of continuous membership (or 240 monthly contributions), or upon reaching statutory retirement age, a member can claim their Total Accumulated Value (TAV), consisting of all employee savings, employer contributions, and compounded tax-free annual dividends.
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
