'use client';

import React, { useState, useMemo } from 'react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { MoneyInput } from '@/components/MoneyInput';
import { Select } from '@/components/Select';
import { ResultPanel, BreakdownRow, CalculationLegalSource } from '@/components/ResultPanel';
import { FaqAccordion } from '@/components/FaqAccordion';
import { RelatedTools } from '@/components/RelatedTools';
import { SeoArticle, WorkedExampleItem, OfficialSourceLink } from '@/components/SeoArticle';
import { StructuredData } from '@/components/StructuredData';
import { getRelatedPages } from '@/config/pages';
import { calculateSss, EmploymentType } from '@/lib/ph/salary';
import { getPhRates } from '@/lib/seo/rules-content';

export default function SssContributionCalculator() {
  const phRates = getPhRates();
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
      label: `Employee Share (EE ${phRates.sssEeRate}%)`,
      value: `₱${sssResult.eeTotal.toFixed(2)}`,
      sublabel:
        sssResult.eeMpf > 0
          ? `Regular: ₱${sssResult.eeRegularSs.toFixed(2)} + WISP: ₱${sssResult.eeMpf.toFixed(2)}`
          : 'Deducted directly from monthly salary',
      highlight: true,
    },
    {
      label: `Employer Share (ER ${phRates.sssErRate}%)`,
      value: `₱${(sssResult.erRegularSs + sssResult.erMpf).toFixed(2)}`,
      sublabel: `Regular: ₱${sssResult.erRegularSs.toFixed(2)} + WISP: ₱${sssResult.erMpf.toFixed(2)}`,
    },
    {
      label: "Employees' Compensation (EC)",
      value: `₱${sssResult.erEc.toFixed(2)}`,
      sublabel: sssResult.totalMsc < 15000 ? '₱10 for MSC below ₱15,000' : '₱30 for MSC ₱15,000 and above',
    },
    {
      label: 'Total Employer Contribution',
      value: `₱${sssResult.erTotal.toFixed(2)}`,
    },
    {
      label: 'Total Monthly SSS Remittance',
      value: `₱${sssResult.totalContribution.toFixed(2)}`,
      highlight: true,
      sublabel: `${phRates.sssTotalRate}% contribution rate + EC state fund`,
    },
  ];

  const legalSources: CalculationLegalSource[] = [
    {
      title: 'Social Security System (SSS)',
      documentNumber: 'SSS Circular No. 2024-006 / RA 11199',
      summary: `Statutory ${phRates.sssTotalRate}% contribution schedule in effect. Regular Social Security MSC capped at ₱${phRates.sssRegularMscCap.toLocaleString()}, total MSC ceiling at ₱${phRates.sssMaxTotalMsc.toLocaleString()}.`,
    },
    {
      title: 'Republic Act No. 11199 (Social Security Act of 2018)',
      documentNumber: 'Mandatory Provident Fund (WISP) Charter',
      summary: 'Mandates automatic allocation of MSC above ₱20,000 into the individual retirement savings program.',
    },
  ];

  const copySummaryText = `Philippine SSS Contribution (${phRates.verifiedYear} Rates):
Monthly Salary: ₱${basicSalary.toLocaleString()}
Total MSC: ₱${sssResult.totalMsc.toLocaleString()}
- Employee Share (${phRates.sssEeRate}%): ₱${sssResult.eeTotal.toFixed(2)}
- Employer Share (${phRates.sssErRate}% + EC): ₱${sssResult.erTotal.toFixed(2)}
Total Combined Remittance: ₱${sssResult.totalContribution.toFixed(2)}
Calculated on Pay (https://pay.zetawala.com/philippines/sss-contribution-calculator/)`;

  const related = getRelatedPages('ph-sss');

  const faqs = [
    {
      question: 'What is the SSS contribution rate in 2026?',
      answer:
        'Under Republic Act 11199 and SSS Circular 2024-006, the total contribution rate is 15.0%. For formally employed workers, this is split as 5.0% for the employee and 10.0% for the employer.',
    },
    {
      question: 'What is the maximum SSS contribution in 2026?',
      answer:
        'The maximum Monthly Salary Credit is ₱35,000. For an MSC of ₱35,000, the employee share is ₱1,750.00 and the employer share is ₱3,530.00 (including ₱30.00 EC), making the maximum monthly remittance ₱5,280.00.',
    },
    {
      question: 'What is the difference between regular SSS and WISP?',
      answer:
        'Regular SSS covers compensation up to ₱20,000 MSC and funds core benefits like retirement, disability, death, maternity, and sickness. WISP covers the portion between ₱20,000 and ₱35,000 MSC, operating as a distinct provident fund that pays an annuity on top of your regular pension.',
    },
    {
      question: 'Who pays the Employees’ Compensation (EC) contribution?',
      answer:
        'The Employees’ Compensation contribution is funded 100% by the employer. Employees contribute zero toward EC. The fee is ₱10 for MSCs below ₱15,000 and ₱30 for MSCs of ₱15,000 and above.',
    },
    {
      question: 'How do self-employed and voluntary members pay SSS?',
      answer:
        'Self-employed and voluntary members shoulder the full 15.0% contribution rate themselves because there is no employer to provide the 10.0% match.',
    },
    {
      question: 'What is the minimum MSC for Overseas Filipino Workers (OFWs)?',
      answer:
        'Under SSS Circular 2024-008, land-based OFW members have a minimum Monthly Salary Credit of ₱8,000 (total contribution of ₱1,200), reflecting typical overseas employment wage thresholds.',
    },
    {
      question: 'How do I know which MSC bracket my salary falls into?',
      answer:
        'SSS brackets advance in increments of ₱500. Your monthly compensation is matched against official compensation ranges. For instance, compensation between ₱29,750 and ₱30,249.99 corresponds to an MSC of ₱30,000.',
    },
    {
      question: 'Are SSS contributions tax-deductible in the Philippines?',
      answer:
        'Yes. Under the TRAIN Law, all mandatory employee contributions to SSS, including the WISP portion, are completely non-taxable and deducted from gross income before calculating withholding tax.',
    },
  ];

  const workedExamples: WorkedExampleItem[] = [
    {
      title: 'Employed Member at ₱30,000 Gross Salary',
      scenario: 'A private employee earning ₱30,000 per month, falling within the WISP provident tier.',
      inputs: [
        { label: 'Monthly Basic Pay', value: '₱30,000.00' },
        { label: 'Assigned MSC Bracket', value: '₱30,000 MSC' },
      ],
      steps: [
        { label: 'Regular MSC Allocation (Cap)', formula: 'Maximum regular limit', value: '₱20,000 MSC' },
        { label: 'WISP MSC Allocation (Excess)', formula: '₱30,000 - ₱20,000', value: '₱10,000 MSC' },
        { label: 'Employee Regular SS Share (5%)', formula: '₱20,000 × 5%', value: '₱1,000.00' },
        { label: 'Employee WISP Share (5%)', formula: '₱10,000 × 5%', value: '₱500.00' },
        { label: 'Total Employee Deduction', formula: '₱1,000 + ₱500', value: '₱1,500.00', highlight: true },
        { label: 'Employer Share (10% + ₱30 EC)', formula: '₱3,000 + ₱30 EC', value: '₱3,030.00' },
      ],
      resultLabel: 'Total SSS Monthly Remittance',
      resultValue: '₱4,530.00',
      notes: 'Employee share is ₱1,500; employer remits ₱3,030.',
    },
    {
      title: 'Employed Member at ₱12,000 Gross Salary',
      scenario: 'An entry-level employee earning ₱12,000 monthly, below the WISP threshold.',
      inputs: [
        { label: 'Monthly Basic Pay', value: '₱12,000.00' },
        { label: 'Assigned MSC Bracket', value: '₱12,000 MSC' },
      ],
      steps: [
        { label: 'Regular MSC Allocation', formula: '100% regular SS', value: '₱12,000 MSC' },
        { label: 'WISP Allocation', formula: 'Zero excess over ₱20k', value: '₱0 MSC' },
        { label: 'Employee Share (5%)', formula: '₱12,000 × 5%', value: '₱600.00', highlight: true },
        { label: 'Employer Share (10% + ₱10 EC)', formula: '₱1,200 + ₱10 EC', value: '₱1,210.00' },
      ],
      resultLabel: 'Total SSS Monthly Remittance',
      resultValue: '₱1,810.00',
      notes: 'EC rate is ₱10 for MSC below ₱15,000.',
    },
  ];

  const officialSources: OfficialSourceLink[] = [
    {
      name: 'Social Security System (SSS)',
      documentTitle: 'SSS Circular No. 2024-006 (Contribution Schedule)',
      url: 'https://www.sss.gov.ph',
      verifiedDate: phRates.verifiedDate,
    },
    {
      name: 'Social Security Commission',
      documentTitle: 'Republic Act No. 11199 (Social Security Act of 2018)',
      url: 'https://www.officialgazette.gov.ph',
      verifiedDate: phRates.verifiedDate,
    },
  ];

  const quickAnswerText = `Under SSS Circular No. 2024-006, the Philippine SSS contribution rate is ${phRates.sssTotalRate}%, split into ${phRates.sssEeRate}% employee share and ${phRates.sssErRate}% employer share. The Monthly Salary Credit (MSC) ranges from ₱${phRates.sssMinMsc.toLocaleString()} to ₱${phRates.sssMaxTotalMsc.toLocaleString()}. For compensation above ₱${phRates.sssRegularMscCap.toLocaleString()}, contributions are automatically partitioned into regular Social Security and the Mandatory Provident Fund (WISP).`;

  const tocItems = [
    { id: 'rate-breakdown', label: '15% Contribution Rate & MSC Brackets' },
    { id: 'wisp-explained', label: 'Regular MSC vs Mandatory Provident Fund (WISP)' },
    { id: 'ec-program', label: 'Employees’ Compensation (EC) Guidelines' },
    { id: 'self-employed-voluntary', label: 'Self-Employed, Voluntary & OFW Rules' },
    { id: 'kasambahay-schedule', label: 'Domestic Worker (Kasambahay) Protection' },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <StructuredData
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Philippines', url: '/philippines/' },
          { name: 'SSS Contribution Calculator 2026', url: '/philippines/sss-contribution-calculator/' },
        ]}
        webApp={{
          name: 'SSS Contribution Calculator 2026',
          url: '/philippines/sss-contribution-calculator/',
          description: 'Compute your exact SSS employee and employer share under the 15% rate with WISP and EC breakdown.',
          applicationCategory: 'FinanceApplication',
        }}
        faqs={faqs}
      />

      <Breadcrumbs
        items={[
          { label: 'Philippines', href: '/philippines/' },
          { label: 'SSS Contribution Calculator' },
        ]}
      />

      {/* Page Header */}
      <div className="border-b border-neutral-200 pb-6 pt-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
          SSS Contribution Calculator {phRates.verifiedYear}
        </h1>
        <p className="mt-2 text-sm sm:text-base text-neutral-600 max-w-3xl leading-relaxed">
          Compute employee and employer SSS shares under the official {phRates.sssTotalRate}% contribution rate. Accurately splits regular Social Security, Mandatory Provident Fund (WISP), and EC.
        </p>
      </div>

      {/* Main Grid: Inputs Left, Result Right */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Inputs Column */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-2xs space-y-6">
            <h2 className="text-base font-bold text-neutral-900 border-b border-neutral-100 pb-3">
              Monthly Earnings &amp; Membership
            </h2>

            <MoneyInput
              label="Monthly Basic Salary / Compensation"
              value={basicSalary}
              onChange={setBasicSalary}
              currencySymbol="₱"
              hint="Your gross monthly basic salary used to determine your official MSC bracket."
              min={0}
              max={1000000}
              required
            />

            <Select
              label="Membership Type"
              value={employmentType}
              onChange={(val) => setEmploymentType(val as EmploymentType)}
              options={[
                { label: 'Private Sector Employee (Regular)', value: 'employed' },
                { label: 'Self-Employed / Freelancer (15% Full Rate)', value: 'self_employed' },
                { label: 'Voluntary Member (15% Full Rate)', value: 'voluntary' },
                { label: 'Overseas Filipino Worker (OFW - ₱8k Min MSC)', value: 'ofw' },
                { label: 'Domestic Worker (Kasambahay)', value: 'kasambahay' },
              ]}
              hint="Self-employed and voluntary members pay the combined 15% rate."
            />
          </div>
        </div>

        {/* Right Sticky Result Column */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
          <ResultPanel
            title="SSS Contribution Result"
            headlineLabel="Employee Monthly Share"
            headlineValue={`₱${sssResult.eeTotal.toFixed(2)}`}
            subHeadline={`Assigned to ₱${sssResult.totalMsc.toLocaleString()} Total MSC bracket`}
            rows={rows}
            sources={legalSources}
            copySummaryText={copySummaryText}
            shareTitle="SSS Contribution Breakdown"
            calloutMessage={
              sssResult.eeMpf > 0
                ? {
                    type: 'info',
                    text: `WISP Active: ₱${sssResult.eeMpf.toFixed(2)} is allocated to your Worker's Investment and Savings Program (WISP) retirement fund.`,
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
        <h2 id="rate-breakdown">The 15% SSS Contribution Rate &amp; MSC Structure</h2>
        <p>
          The Social Security System (SSS) operates on a graduated schedule of Monthly Salary Credits (MSCs). In 2026, the SSS contribution rate is {phRates.sssTotalRate}%, as established under Republic Act No. 11199 (The Social Security Act of 2018).
        </p>
        <p>
          For employed members in the private sector, the {phRates.sssTotalRate}% contribution is distributed between the employer and the employee:
        </p>
        <ul>
          <li><strong>Employee Share:</strong> {phRates.sssEeRate}% of your assigned Monthly Salary Credit.</li>
          <li><strong>Employer Share:</strong> {phRates.sssErRate}% of your assigned Monthly Salary Credit.</li>
          <li><strong>Employees’ Compensation (EC):</strong> ₱10.00 to ₱30.00 paid solely by the employer.</li>
        </ul>
        <p>
          The official schedule contains brackets spanning from a minimum MSC of ₱{phRates.sssMinMsc.toLocaleString()} to a maximum MSC of ₱{phRates.sssMaxTotalMsc.toLocaleString()}. Each bracket spans a ₱500 compensation interval. Regardless of whether you earn ₱35,000, ₱60,000, or ₱100,000 monthly, your SSS contribution is capped at the maximum MSC bracket of ₱{phRates.sssMaxTotalMsc.toLocaleString()}.
        </p>

        <h2 id="wisp-explained">Regular MSC vs Mandatory Provident Fund (WISP)</h2>
        <p>
          One of the most important structural changes enacted by RA 11199 is the bifurcation of contributions into regular Social Security and the Mandatory Provident Fund (WISP).
        </p>
        <p>
          Regular Social Security benefits (which determine your future retirement, disability, and death pension formulas) are capped at an MSC of ₱{phRates.sssRegularMscCap.toLocaleString()}. For members earning more than ₱{phRates.sssRegularMscCap.toLocaleString()} per month, the portion of their MSC between ₱{phRates.sssRegularMscCap.toLocaleString()} and ₱{phRates.sssMaxTotalMsc.toLocaleString()} is assigned to WISP.
        </p>
        <p>
          WISP functions as a defined-contribution pension fund. Contributions accumulate in your individual account, earn tax-free dividends from SSS investments, and are returned to you as an additional monthly annuity or lump-sum benefit upon retirement.
        </p>

        <h2 id="ec-program">Employees’ Compensation (EC) Program Guidelines</h2>
        <p>
          The State Insurance Fund, known as the Employees’ Compensation (EC) program, provides medical benefits, disability allowances, and rehabilitation services for work-connected injuries and illnesses.
        </p>
        <p>
          EC is funded entirely by employers. By law, zero deductions for EC are made from an employee’s salary. The rates are fixed:
        </p>
        <ul>
          <li><strong>MSC below ₱15,000:</strong> ₱10.00 per month.</li>
          <li><strong>MSC of ₱15,000 and above:</strong> ₱30.00 per month.</li>
        </ul>

        <h2 id="self-employed-voluntary">Self-Employed, Voluntary &amp; OFW Members</h2>
        <p>
          Non-formally employed members manage their SSS coverage under distinct guidelines:
        </p>
        <ul>
          <li><strong>Self-Employed &amp; Freelancers:</strong> Pay the entire {phRates.sssTotalRate}% contribution based on declared monthly net earnings, plus the corresponding EC contribution (₱10 or ₱30).</li>
          <li><strong>Voluntary Members:</strong> Pay the full {phRates.sssTotalRate}% contribution. EC coverage is not applicable to voluntary members.</li>
          <li><strong>Overseas Filipino Workers (OFWs):</strong> Have a statutory minimum MSC of ₱8,000. Under SSS Circular 2024-008, an OFW cannot contribute below this threshold, ensuring a guaranteed baseline pension upon repatriation.</li>
        </ul>

        <h2 id="kasambahay-schedule">Domestic Worker (Kasambahay) Safeguards</h2>
        <p>
          Under Republic Act No. 10361 (Batas Kasambahay) and SSS Circular No. 2024-007, household employers must pay 100% of the SSS contribution if the domestic worker’s monthly cash wage is under ₱5,000. Household staff earning ₱5,000 or more per month transition to standard employee-employer cost sharing.
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
