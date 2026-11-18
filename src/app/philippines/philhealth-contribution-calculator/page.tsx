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
import { calculatePhilHealth } from '@/lib/ph/salary';
import { getPhRates } from '@/lib/seo/rules-content';

export default function PhilHealthContributionCalculator() {
  const phRates = getPhRates();
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
      sublabel:
        basicSalary < phRates.philhealthIncomeFloor
          ? `₱${phRates.philhealthIncomeFloor.toLocaleString()} statutory floor applied`
          : basicSalary > phRates.philhealthIncomeCeiling
          ? `₱${phRates.philhealthIncomeCeiling.toLocaleString()} statutory ceiling applied`
          : 'Within standard compensation range',
    },
    {
      label: `Total Monthly Premium (${phRates.philhealthTotalRate.toFixed(1)}%)`,
      value: `₱${philhealth.totalPremium.toFixed(2)}`,
      highlight: true,
      sublabel: `${phRates.philhealthTotalRate.toFixed(1)}% of MBS basis`,
    },
    {
      label: `Employee Share (${phRates.philhealthEeRate.toFixed(1)}%)`,
      value: `₱${philhealth.employeeShare.toFixed(2)}`,
      highlight: true,
      sublabel: 'Deducted directly from monthly payroll',
    },
    {
      label: `Employer Share (${phRates.philhealthErRate.toFixed(1)}%)`,
      value: `₱${philhealth.employerShare.toFixed(2)}`,
      sublabel: 'Employer statutory matching contribution',
    },
    {
      label: 'Semi-Monthly Cut-off Deduction',
      value: `₱${(philhealth.employeeShare / 2).toFixed(2)}`,
      sublabel: 'Per payroll cut-off for bi-monthly disbursals',
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
      summary: `Mandates the ${phRates.philhealthTotalRate.toFixed(1)}% premium rate with a monthly floor of ₱${phRates.philhealthIncomeFloor.toLocaleString()} and a monthly ceiling of ₱${phRates.philhealthIncomeCeiling.toLocaleString()}.`,
    },
    {
      title: 'Republic Act No. 11223',
      documentNumber: 'Universal Health Care Act of 2019',
      summary: 'Codifies mandatory health insurance coverage for all Filipino citizens and defines statutory contribution rate adjustments.',
    },
  ];

  const copySummaryText = `Philippine PhilHealth Premium Computation (${phRates.verifiedYear}):
Monthly Basic Salary: ₱${basicSalary.toLocaleString('en-US', { minimumFractionDigits: 2 })}
MBS Basis: ₱${philhealth.mbs.toLocaleString('en-US', { minimumFractionDigits: 2 })}
- Employee Share (${phRates.philhealthEeRate.toFixed(1)}%): ₱${philhealth.employeeShare.toFixed(2)}
- Employer Share (${phRates.philhealthErRate.toFixed(1)}%): ₱${philhealth.employerShare.toFixed(2)}
Total Monthly Premium: ₱${philhealth.totalPremium.toFixed(2)}
Semi-Monthly Cut-off: ₱${(philhealth.employeeShare / 2).toFixed(2)}
Calculated on Pay (https://pay.zetawala.com/philippines/philhealth-contribution-calculator/)`;

  const related = getRelatedPages('ph-philhealth');

  const faqs = [
    {
      question: 'What is the PhilHealth contribution rate in 2026?',
      answer:
        'The PhilHealth premium rate is 5.0% of your Monthly Basic Salary (MBS). For formally employed workers, this is split equally: 2.5% is deducted from the employee and 2.5% is paid by the employer.',
    },
    {
      question: 'What is the minimum and maximum PhilHealth contribution in 2026?',
      answer:
        'The income floor is ₱10,000, setting a minimum total premium of ₱500.00 (₱250 employee / ₱250 employer). The income ceiling is ₱100,000, setting a maximum total premium of ₱5,000.00 (₱2,500 employee / ₱2,500 employer).',
    },
    {
      question: 'Are allowances included in the PhilHealth calculation?',
      answer:
        'No. PhilHealth premiums are calculated strictly on your contractual Monthly Basic Salary. Allowances, overtime pay, bonuses, 13th month pay, and commission earnings are excluded from the MBS basis.',
    },
    {
      question: 'How do self-employed and voluntary members pay PhilHealth?',
      answer:
        'Self-employed individuals, freelancers, and voluntary members shoulder the full 5.0% premium rate themselves because they have no formal employer counterpart.',
    },
    {
      question: 'How much do Overseas Filipino Workers (OFWs) pay for PhilHealth?',
      answer:
        'Under PhilHealth rules, migrant workers pay 5.0% based on their monthly income, bounded between the ₱10,000 floor (₱500/mo) and the ₱100,000 ceiling (₱5,000/mo), paid annually or semi-annually prior to overseas deployment.',
    },
    {
      question: 'What happens if a member earns below ₱10,000 per month?',
      answer:
        'If an employee’s monthly salary is less than ₱10,000, the statutory floor of ₱10,000 is automatically applied. The total premium remains ₱500.00 (₱250 employee share and ₱250 employer share).',
    },
    {
      question: 'What happens if a member earns above ₱100,000 per month?',
      answer:
        'If an employee earns more than ₱100,000, their premium is capped at the ₱100,000 ceiling. The employee will pay no more than ₱2,500 per month, and the employer will pay no more than ₱2,500 per month.',
    },
    {
      question: 'Are PhilHealth contributions tax-exempt under Philippine law?',
      answer:
        'Yes. Under the TRAIN Law, all mandatory employee contributions to PhilHealth are fully excluded from taxable gross compensation income.',
    },
  ];

  const workedExamples: WorkedExampleItem[] = [
    {
      title: 'Employed Professional (₱35,000 Monthly Salary)',
      scenario: 'A mid-level employee earning ₱35,000 monthly basic salary, within the standard rate band.',
      inputs: [
        { label: 'Monthly Basic Salary', value: '₱35,000.00' },
        { label: 'Applicable MBS Basis', value: '₱35,000.00' },
      ],
      steps: [
        { label: 'Total Premium Computation', formula: '₱35,000 × 5.0%', value: '₱1,750.00' },
        { label: 'Employee Share (50%)', formula: '₱1,750 ÷ 2 (or ₱35,000 × 2.5%)', value: '₱875.00', highlight: true },
        { label: 'Employer Share (50%)', formula: '₱1,750 ÷ 2 (or ₱35,000 × 2.5%)', value: '₱875.00' },
        { label: 'Semi-Monthly Payroll Deduction', formula: '₱875.00 ÷ 2', value: '₱437.50 / cut-off' },
      ],
      resultLabel: 'Monthly Employee Deduction',
      resultValue: '₱875.00',
      notes: 'Matched by ₱875.00 from the employer.',
    },
    {
      title: 'Senior Executive (₱120,000 Salary - Ceiling Capped)',
      scenario: 'A corporate director earning ₱120,000 monthly basic salary, exceeding the statutory ceiling.',
      inputs: [
        { label: 'Monthly Basic Salary', value: '₱120,000.00' },
        { label: 'Statutory MBS Ceiling Applied', value: '₱100,000.00 Cap' },
      ],
      steps: [
        { label: 'Capped Total Monthly Premium', formula: '₱100,000 × 5.0%', value: '₱5,000.00' },
        { label: 'Maximum Employee Share (2.5%)', formula: '₱100,000 × 2.5%', value: '₱2,500.00', highlight: true },
        { label: 'Maximum Employer Share (2.5%)', formula: '₱100,000 × 2.5%', value: '₱2,500.00' },
      ],
      resultLabel: 'Monthly Employee Deduction',
      resultValue: '₱2,500.00',
      notes: 'Represents the absolute maximum PhilHealth deduction permissible by law.',
    },
  ];

  const officialSources: OfficialSourceLink[] = [
    {
      name: 'Philippine Health Insurance Corporation (PhilHealth)',
      documentTitle: 'PhilHealth Advisory No. 2025-0002 (Universal Health Care Premium)',
      url: 'https://www.philhealth.gov.ph',
      verifiedDate: phRates.verifiedDate,
    },
    {
      name: 'Official Gazette of the Republic of the Philippines',
      documentTitle: 'Republic Act No. 11223 (Universal Health Care Act)',
      url: 'https://www.officialgazette.gov.ph',
      verifiedDate: phRates.verifiedDate,
    },
  ];

  const quickAnswerText = `Under PhilHealth Advisory No. 2025-0002 and RA 11223, the PhilHealth premium rate in ${phRates.verifiedYear} is ${phRates.philhealthTotalRate.toFixed(1)}% of your Monthly Basic Salary, split equally as ${phRates.philhealthEeRate.toFixed(1)}% employee share and ${phRates.philhealthErRate.toFixed(1)}% employer share. The income floor is ₱${phRates.philhealthIncomeFloor.toLocaleString()} (₱${phRates.philhealthMinPremium.toFixed(0)} min premium) and the ceiling is ₱${phRates.philhealthIncomeCeiling.toLocaleString()} (₱${phRates.philhealthMaxPremium.toFixed(0)} max premium).`;

  const tocItems = [
    { id: 'premium-formula', label: '5.0% Premium Calculation Formula' },
    { id: 'floor-and-ceiling', label: 'The ₱10,000 Floor & ₱100,000 Ceiling' },
    { id: 'cost-sharing', label: 'Employee vs Employer Cost Sharing' },
    { id: 'voluntary-members', label: 'Self-Employed, Freelancers & OFWs' },
    { id: 'kasambahay-coverage', label: 'Domestic Worker (Kasambahay) Exemptions' },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <StructuredData
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Philippines', url: '/philippines/' },
          { name: 'PhilHealth Calculator 2026', url: '/philippines/philhealth-contribution-calculator/' },
        ]}
        webApp={{
          name: 'PhilHealth Contribution Calculator 2026',
          url: '/philippines/philhealth-contribution-calculator/',
          description: 'Calculate your exact PhilHealth premium at the official 5.0% rate with employee-employer split.',
          applicationCategory: 'FinanceApplication',
        }}
        faqs={faqs}
      />

      <Breadcrumbs
        items={[
          { label: 'Philippines', href: '/philippines/' },
          { label: 'PhilHealth Contribution Calculator' },
        ]}
      />

      {/* Page Header */}
      <div className="border-b border-neutral-200 pb-6 pt-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
          PhilHealth Contribution Calculator {phRates.verifiedYear}
        </h1>
        <p className="mt-2 text-sm sm:text-base text-neutral-600 max-w-3xl leading-relaxed">
          Compute employee and employer PhilHealth shares under the official {phRates.philhealthTotalRate.toFixed(1)}% premium rate. Features the ₱{phRates.philhealthIncomeFloor.toLocaleString()} floor and ₱{phRates.philhealthIncomeCeiling.toLocaleString()} ceiling.
        </p>
      </div>

      {/* Main Grid: Inputs Left, Result Right */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Inputs Column */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-2xs space-y-6">
            <h2 className="text-base font-bold text-neutral-900 border-b border-neutral-100 pb-3">
              Salary &amp; Compensation Input
            </h2>

            <MoneyInput
              label="Monthly Basic Salary"
              value={basicSalary}
              onChange={setBasicSalary}
              currencySymbol="₱"
              hint="Your monthly base salary. Excludes overtime, allowances, and bonuses."
              min={0}
              max={1000000}
              required
            />
          </div>
        </div>

        {/* Right Sticky Result Column */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
          <ResultPanel
            title="PhilHealth Premium Summary"
            headlineLabel="Employee Monthly Share"
            headlineValue={`₱${philhealth.employeeShare.toFixed(2)}`}
            subHeadline={`Matched by ₱${philhealth.employerShare.toFixed(2)} employer contribution`}
            rows={rows}
            sources={legalSources}
            copySummaryText={copySummaryText}
            shareTitle="PhilHealth Contribution Breakdown"
            calloutMessage={
              basicSalary > phRates.philhealthIncomeCeiling
                ? {
                    type: 'info',
                    text: `Statutory Ceiling Applied: Earnings above ₱${phRates.philhealthIncomeCeiling.toLocaleString()} are capped at the maximum ₱${phRates.philhealthMaxPremium.toFixed(0)} total monthly premium.`,
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
        <h2 id="premium-formula">The 5.0% PhilHealth Premium Formula</h2>
        <p>
          Under Republic Act No. 11223, also known as the Universal Health Care (UHC) Act, and PhilHealth Advisory No. 2025-0002, the mandatory contribution rate for employed members is set at {phRates.philhealthTotalRate.toFixed(1)}% of basic monthly income.
        </p>
        <p>
          The governing calculation follows this direct formula:
        </p>
        <div className="not-prose my-4 rounded-lg bg-neutral-900 p-4 font-mono text-sm text-brand-light">
          Total Premium = Monthly Basic Salary (MBS) × 5.0%
        </div>
        <p>
          The resulting premium is divided equally between the employee and the employer. For an employee with a basic wage of ₱30,000, the total premium is ₱1,500 per month, with ₱750 deducted from the employee’s pay and ₱750 remitted as the employer counterpart.
        </p>

        <h2 id="floor-and-ceiling">The Statutory Floor and Ceiling</h2>
        <p>
          The law establishes clear minimum and maximum income parameters:
        </p>
        <ul>
          <li><strong>Income Floor (₱{phRates.philhealthIncomeFloor.toLocaleString()}):</strong> Regardless of whether an employee earns ₱5,000, ₱7,500, or ₱9,000, the minimum Monthly Basic Salary basis is fixed at ₱{phRates.philhealthIncomeFloor.toLocaleString()}. This produces a minimum monthly premium of ₱{phRates.philhealthMinPremium.toFixed(2)} (₱250 employee / ₱250 employer).</li>
          <li><strong>Income Ceiling (₱{phRates.philhealthIncomeCeiling.toLocaleString()}):</strong> For earners with salaries exceeding ₱{phRates.philhealthIncomeCeiling.toLocaleString()} (e.g. ₱120,000, ₱250,000, or ₱500,000), the calculation base is strictly capped at ₱{phRates.philhealthIncomeCeiling.toLocaleString()}. The maximum total monthly premium is ₱{phRates.philhealthMaxPremium.toFixed(2)} (₱2,500 employee / ₱2,500 employer).</li>
        </ul>

        <h2 id="cost-sharing">Employee vs Employer Cost Sharing</h2>
        <p>
          For private and government employees, Section 10 of RA 11223 mandates a strict 50/50 cost sharing agreement. Employers are prohibited from deducting the employer portion from employee paychecks. On monthly payslips, workers will see their 2.5% share listed under statutory deductions, while the employer remits the full 5.0% directly to PhilHealth through the Electronic Premium Remittance System (EPRS).
        </p>

        <h2 id="voluntary-members">Self-Employed, Freelancers &amp; OFWs</h2>
        <p>
          Individually paying members (self-employed professionals, freelancers, sole proprietors, and informal economy workers) pay the entire {phRates.philhealthTotalRate.toFixed(1)}% premium based on declared average monthly income. Direct contributors can pay on a monthly, quarterly, semi-annual, or annual basis through the PhilHealth Member Portal.
        </p>

        <h2 id="kasambahay-coverage">Domestic Worker (Kasambahay) Exemptions</h2>
        <p>
          Under Republic Act No. 10361 (Batas Kasambahay), for domestic workers receiving a monthly cash wage of less than ₱5,000, the household employer is legally obligated to pay 100% of the PhilHealth premium. The domestic worker pays ₱0.00. For domestic workers earning ₱5,000 or more per month, the standard 50/50 cost sharing applies.
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
