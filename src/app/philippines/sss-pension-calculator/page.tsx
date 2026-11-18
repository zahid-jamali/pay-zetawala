'use client';

import React, { useState, useMemo } from 'react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { MoneyInput } from '@/components/MoneyInput';
import { NumberInput } from '@/components/NumberInput';
import { ResultPanel, BreakdownRow, CalculationLegalSource } from '@/components/ResultPanel';
import { FaqAccordion } from '@/components/FaqAccordion';
import { RelatedTools } from '@/components/RelatedTools';
import { SeoArticle, WorkedExampleItem, OfficialSourceLink } from '@/components/SeoArticle';
import { StructuredData } from '@/components/StructuredData';
import { getRelatedPages } from '@/config/pages';
import { calculateSssPension } from '@/lib/ph/pension';
import { getPhRates } from '@/lib/seo/rules-content';

export default function SssPensionCalculator() {
  const phRates = getPhRates();
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
      label: 'Formula 1 (₱300 + 20% AMSC + 2% per CYS > 10)',
      value: `₱${pension.formula1.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
    },
    {
      label: 'Formula 2 (40% of AMSC)',
      value: `₱${pension.formula2.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
    },
    {
      label: 'Formula 3 (Statutory Guaranteed Minimum)',
      value: `₱${pension.formula3.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      sublabel: cys >= 20 ? '₱2,400 guaranteed for ≥ 20 CYS' : '₱1,200 guaranteed for 10–19 CYS',
    },
    {
      label: 'Basic Monthly Pension (Highest of 3)',
      value: `₱${pension.basicMonthlyPension.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      highlight: true,
    },
    {
      label: 'Additional Benefit (EO 54)',
      value: `+₱${pension.additionalBenefit.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      sublabel: 'Universal benefit added to all pensions since 2017',
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
      label: 'Total Estimated Monthly Pension',
      value: `₱${pension.totalMonthlyPension.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      highlight: true,
    },
    {
      label: '13th Month Pension (Annual December Bonus)',
      value: `₱${pension.thirteenthMonthPension.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
    },
  ];

  const legalSources: CalculationLegalSource[] = [
    {
      title: 'Republic Act No. 11199 (Social Security Act of 2018)',
      documentNumber: 'Section 12 (Monthly Pension Formula)',
      summary: 'Provides that monthly pension is the highest among: (1) ₱300 + 20% AMSC + 2% AMSC for each CYS over 10; (2) 40% of AMSC; (3) statutory minimums.',
    },
    {
      title: 'Executive Order No. 54',
      documentNumber: 'Universal SSS Additional Benefit',
      summary: `Grants an additional ₱${phRates.sssPensionBonus.toLocaleString()} across-the-board monthly benefit to all SSS retirees.`,
    },
  ];

  const copySummaryText = `Philippine SSS Retirement Pension Estimate (${phRates.verifiedYear}):
AMSC: ₱${amsc.toLocaleString()} | Credited Years of Service: ${cys} Years
- Basic Monthly Pension: ₱${pension.basicMonthlyPension.toLocaleString('en-US', { minimumFractionDigits: 2 })}
- EO 54 Additional Benefit: ₱${pension.additionalBenefit.toLocaleString('en-US', { minimumFractionDigits: 2 })}
- Dependent Allowances: ₱${pension.totalDependentAllowance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
Total Estimated Monthly Pension: ₱${pension.totalMonthlyPension.toLocaleString('en-US', { minimumFractionDigits: 2 })}
Annual 13th Month Pension: ₱${pension.thirteenthMonthPension.toLocaleString('en-US', { minimumFractionDigits: 2 })}
Calculated on Pay (https://pay.zetawala.com/philippines/sss-pension-calculator/)`;

  const related = getRelatedPages('ph-pension');

  const faqs = [
    {
      question: 'How is the SSS monthly retirement pension calculated?',
      answer:
        'Under Section 12 of RA 11199, SSS computes three statutory formulas and awards whichever produces the highest benefit. A universal ₱1,000 across-the-board benefit (EO 54) and dependent child allowances (10% of basic pension per child, max 5) are added to the result.',
    },
    {
      question: 'What is AMSC in SSS pension calculations?',
      answer:
        'AMSC stands for Average Monthly Salary Credit. It is the average of the last 60 Monthly Salary Credits immediately preceding the semester of retirement, or the average of all posted MSCs if higher.',
    },
    {
      question: 'What is Credited Years of Service (CYS)?',
      answer:
        'Credited Years of Service represents the total number of calendar years for which you have paid SSS contributions. Every 12 monthly contributions qualify as one Credited Year of Service.',
    },
    {
      question: 'What is the minimum number of contributions to get a monthly pension?',
      answer:
        'To qualify for a lifetime monthly retirement pension, a member must have paid at least 120 monthly contributions prior to the semester of retirement. If you have fewer than 120 contributions, you receive a one-time lump-sum refund.',
    },
    {
      question: 'At what age can an SSS member retire?',
      answer:
        'Optional retirement starts at age 60 (provided the member is unemployed or separated from service). Mandatory retirement is at age 65, at which point an employed member must retire and can claim pension benefits regardless of ongoing employment.',
    },
    {
      question: 'Do SSS pensioners receive a 13th-month pension?',
      answer:
        'Yes. All SSS retirement pensioners receive an additional 13th-month pension disbursement every December, equal to their full monthly pension amount.',
    },
    {
      question: 'What is the dependent children pension allowance?',
      answer:
        'Retirees receive a dependent allowance for each legitimate, legitimated, or legally adopted child (conceived before retirement), up to 5 children. The allowance is 10% of the basic monthly pension or ₱250, whichever is higher, paid until the child turns 21.',
    },
    {
      question: 'Does the SSS WISP provident fund increase my pension?',
      answer:
        'Yes. In addition to the regular SSS pension computed by this statutory formula, any accumulated contributions in your Worker’s Investment and Savings Program (WISP) are paid out as an annuity alongside your monthly retirement pension.',
    },
  ];

  const workedExamples: WorkedExampleItem[] = [
    {
      title: 'Long-Term Contributor (25 CYS, ₱15,000 AMSC)',
      scenario: 'A private sector retiree who paid 25 years (300 months) of SSS contributions with an AMSC of ₱15,000.',
      inputs: [
        { label: 'Average Monthly Salary Credit (AMSC)', value: '₱15,000.00' },
        { label: 'Credited Years of Service (CYS)', value: '25 Years' },
      ],
      steps: [
        { label: 'Formula 1: Base + 20% AMSC', formula: '₱300 + (20% × ₱15,000)', value: '₱3,300.00' },
        { label: 'Formula 1: Years over 10 Increments', formula: '2% × ₱15,000 × (25 - 10)', value: '₱4,500.00' },
        { label: 'Formula 1 Total', formula: '₱3,300 + ₱4,500', value: '₱7,800.00', highlight: true },
        { label: 'Formula 2 (40% AMSC Check)', formula: '40% × ₱15,000', value: '₱6,000.00' },
        { label: 'Formula 3 (Guaranteed Minimum)', formula: 'Minimum for CYS ≥ 20', value: '₱2,400.00' },
        { label: 'Highest Basic Monthly Pension', formula: 'Max(F1, F2, F3)', value: '₱7,800.00' },
        { label: 'EO 54 Additional Benefit', formula: 'Universal government grant', value: '+₱1,000.00' },
      ],
      resultLabel: 'Total Estimated Monthly Pension',
      resultValue: '₱8,800.00',
      notes: 'Includes annual December 13th-month pension of ₱8,800.00.',
    },
    {
      title: 'Minimum Qualifying Retiree (10 CYS, ₱10,000 AMSC)',
      scenario: 'A retiree who met the exact 120-month threshold (10 CYS) with an AMSC of ₱10,000.',
      inputs: [
        { label: 'Average Monthly Salary Credit (AMSC)', value: '₱10,000.00' },
        { label: 'Credited Years of Service (CYS)', value: '10 Years' },
      ],
      steps: [
        { label: 'Formula 1 Total', formula: '₱300 + 20% × ₱10,000 + 0', value: '₱2,300.00' },
        { label: 'Formula 2 Total', formula: '40% × ₱10,000', value: '₱4,000.00', highlight: true },
        { label: 'Formula 3 Minimum', formula: 'Guaranteed floor for 10 CYS', value: '₱1,200.00' },
        { label: 'Selected Basic Pension', formula: 'Highest is Formula 2', value: '₱4,000.00' },
        { label: 'EO 54 Additional Benefit', formula: 'Universal add-on', value: '+₱1,000.00' },
      ],
      resultLabel: 'Total Estimated Monthly Pension',
      resultValue: '₱5,000.00',
      notes: 'Demonstrates how Formula 2 protects members with fewer credited years.',
    },
  ];

  const officialSources: OfficialSourceLink[] = [
    {
      name: 'Social Security System (SSS)',
      documentTitle: 'Republic Act No. 11199 (Social Security Act of 2018) Section 12',
      url: 'https://www.sss.gov.ph',
      verifiedDate: phRates.verifiedDate,
    },
    {
      name: 'Office of the President of the Philippines',
      documentTitle: 'Executive Order No. 54 (₱1,000 Additional SSS Pension)',
      url: 'https://www.officialgazette.gov.ph',
      verifiedDate: phRates.verifiedDate,
    },
  ];

  const quickAnswerText = `Under Section 12 of RA 11199, your monthly SSS pension is the highest of three statutory formulas based on your Average Monthly Salary Credit (AMSC) and Credited Years of Service (CYS), plus the ₱${phRates.sssPensionBonus.toLocaleString()} EO 54 benefit and 10% dependent child allowances. Qualified retirees receive 13 monthly pension disbursements per year.`;

  const tocItems = [
    { id: 'three-formulas', label: 'The Three Statutory Pension Formulas' },
    { id: 'amsc-cys-rules', label: 'Understanding AMSC & CYS' },
    { id: 'additional-allowances', label: 'EO 54 Benefit & Dependent Child Allowances' },
    { id: 'eligibility-requirements', label: '120-Contribution Rule & Retirement Ages' },
    { id: 'lump-sum-comparison', label: 'Lump-Sum vs Lifetime Monthly Pension' },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <StructuredData
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Philippines', url: '/philippines/' },
          { name: 'SSS Pension Calculator 2026', url: '/philippines/sss-pension-calculator/' },
        ]}
        webApp={{
          name: 'SSS Pension Calculator 2026',
          url: '/philippines/sss-pension-calculator/',
          description: 'Estimate your monthly SSS retirement pension using the three statutory formulas under RA 11199 and EO 54.',
          applicationCategory: 'FinanceApplication',
        }}
        faqs={faqs}
      />

      <Breadcrumbs
        items={[
          { label: 'Philippines', href: '/philippines/' },
          { label: 'SSS Pension Calculator' },
        ]}
      />

      {/* Page Header */}
      <div className="border-b border-neutral-200 pb-6 pt-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
          SSS Pension Calculator {phRates.verifiedYear}
        </h1>
        <p className="mt-2 text-sm sm:text-base text-neutral-600 max-w-3xl leading-relaxed">
          Estimate your monthly SSS retirement pension under Republic Act No. 11199. Computes all three statutory formulas, the ₱{phRates.sssPensionBonus.toLocaleString()} EO 54 benefit, and dependent child allowances.
        </p>
      </div>

      {/* Main Grid: Inputs Left, Result Right */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Inputs Column */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-2xs space-y-6">
            <h2 className="text-base font-bold text-neutral-900 border-b border-neutral-100 pb-3">
              Retirement Contribution Parameters
            </h2>

            <MoneyInput
              label="Average Monthly Salary Credit (AMSC)"
              value={amsc}
              onChange={setAmsc}
              currencySymbol="₱"
              hint="The average of your last 60 regular MSCs prior to retirement (max ₱20,000 for regular SS formula)."
              min={1000}
              max={20000}
              required
            />

            <NumberInput
              label="Credited Years of Service (CYS)"
              value={cys}
              onChange={setCys}
              min={10}
              max={50}
              hint="Total years of SSS contributions. Minimum 10 years (120 contributions) required for a monthly pension."
              required
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <NumberInput
                label="Retirement Age"
                value={age}
                onChange={setAge}
                min={60}
                max={75}
                hint="60 for optional retirement, 65 for mandatory."
              />
              <NumberInput
                label="Qualified Minor Dependents"
                value={numDependents}
                onChange={setNumDependents}
                min={0}
                max={5}
                hint="Children under 21 (max 5) receive 10% allowance."
              />
            </div>
          </div>
        </div>

        {/* Right Sticky Result Column */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
          <ResultPanel
            title="Estimated SSS Pension"
            headlineLabel="Total Monthly Pension"
            headlineValue={`₱${pension.totalMonthlyPension.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            subHeadline={`Based on highest statutory formula + ₱${pension.additionalBenefit.toLocaleString()} EO 54`}
            rows={rows}
            sources={legalSources}
            copySummaryText={copySummaryText}
            shareTitle="SSS Pension Estimate"
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
        <h2 id="three-formulas">The Three Statutory Pension Formulas</h2>
        <p>
          Section 12 of Republic Act No. 11199 mandates that the basic monthly pension (BMP) for a qualified SSS retiree is whichever yields the highest amount among three statutory formulas:
        </p>
        <div className="not-prose my-4 space-y-3 rounded-xl bg-neutral-900 p-5 font-mono text-xs sm:text-sm text-neutral-200">
          <div>
            <strong className="text-brand-light">Formula 1:</strong> ₱300 + (20% of AMSC) + [2% of AMSC × (CYS - 10)]
          </div>
          <div>
            <strong className="text-brand-light">Formula 2:</strong> 40% of AMSC
          </div>
          <div>
            <strong className="text-brand-light">Formula 3:</strong> Guaranteed Minimum (₱1,200 for 10–19 CYS; ₱2,400 for 20+ CYS)
          </div>
        </div>
        <p>
          For members with lengthy contribution records (e.g. 20 to 35 years), Formula 1 almost always produces the largest payout because of the 2% annual increment for every year of service beyond the tenth year. For members who qualify with close to 10 years of service, Formula 2 often produces a higher baseline.
        </p>

        <h2 id="amsc-cys-rules">Understanding AMSC and Credited Years of Service</h2>
        <p>
          Two primary variables drive your SSS retirement calculation:
        </p>
        <ul>
          <li><strong>Average Monthly Salary Credit (AMSC):</strong> This is the arithmetic mean of the last 60 Monthly Salary Credits immediately preceding the semester of contingency (retirement), or the average of all posted MSCs in your entire membership history, whichever is higher. Under current rules, regular Social Security AMSC is capped at ₱{phRates.sssRegularMscCap.toLocaleString()}.</li>
          <li><strong>Credited Years of Service (CYS):</strong> This represents your total contribution history. Each calendar year with at least three (3) monthly contributions provides one CYS, or total posted contributions divided by 12.</li>
        </ul>

        <h2 id="additional-allowances">The EO 54 Benefit and Dependent Child Allowances</h2>
        <p>
          Once the Basic Monthly Pension is selected, two statutory enhancements are added to reach your total monthly pension:
        </p>
        <ul>
          <li><strong>Executive Order No. 54 Benefit:</strong> A permanent across-the-board increase of ₱{phRates.sssPensionBonus.toLocaleString()} is added to every pensioner’s check. This benefit was enacted in 2017 to protect senior citizens against inflation.</li>
          <li><strong>Dependent Children Allowance:</strong> For each qualified minor child under 21 years of age (up to a maximum of 5 children), the pensioner receives an additional dependent allowance equal to 10% of the basic monthly pension or ₱250.00, whichever is higher.</li>
        </ul>

        <h2 id="eligibility-requirements">Eligibility Requirements: The 120-Contribution Rule</h2>
        <p>
          To receive a lifetime monthly retirement pension, an SSS member must meet two conditions:
        </p>
        <ol>
          <li>Be at least 60 years old and separated from employment, or at least 65 years old (mandatory retirement); and</li>
          <li>Have remitted at least one hundred twenty (120) monthly contributions prior to the semester of retirement.</li>
        </ol>

        <h2 id="lump-sum-comparison">Lump-Sum Refund vs Lifetime Monthly Pension</h2>
        <p>
          If an SSS member reaches the age of 60 or 65 but has paid fewer than 120 monthly contributions, they are not eligible for a lifetime monthly pension. In such cases, the member receives a one-time lump-sum retirement settlement representing the total contributions paid by both the member and the employer, plus statutory interest. Members close to the 120-contribution mark are often advised to continue paying as voluntary members until reaching 120 months to secure lifetime pension rights.
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
