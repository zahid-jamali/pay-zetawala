import React from 'react';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SeoArticle, WorkedExampleItem, OfficialSourceLink } from '@/components/SeoArticle';
import { StructuredData } from '@/components/StructuredData';
import { getPhRates } from '@/lib/seo/rules-content';
import { Calendar, AlertCircle, Calculator, CheckCircle2 } from 'lucide-react';

export default function GuideWhenIs13thMonthPayGiven() {
  const phRates = getPhRates();

  const faqs = [
    {
      question: 'Is an employer allowed to delay 13th month payment until January?',
      answer:
        'No. Presidential Decree No. 851 strictly mandates that 13th-month pay must be disbursed on or before December 24. Employers cannot request exemptions or deferrals, and financial distress is not an accepted legal defense under Department of Labor and Employment (DOLE) rules.',
    },
    {
      question: 'Can 13th month pay be given in two installments?',
      answer:
        'Yes. An employer may split the payment into two tranches: typically one half before the opening of the school year (May or June) and the remaining half on or before December 24.',
    },
    {
      question: 'Are probationary, contractual, and project employees entitled to 13th month pay?',
      answer:
        'Yes. All rank-and-file employees in the private sector who have rendered at least one month of service during the calendar year are entitled to 13th-month pay, regardless of whether their employment status is regular, probationary, casual, seasonal, or project-based.',
    },
    {
      question: 'Can an employer substitute Christmas baskets or gift vouchers for 13th month pay?',
      answer:
        'No. The law requires 13th-month pay to be paid in legal Philippine currency (cash, bank credit, or check). Christmas hams, grocery baskets, performance bonuses, or gift certificates cannot be credited as compliance with statutory 13th-month pay.',
    },
    {
      question: 'What legal recourse does an employee have if 13th month pay is not paid by December 24?',
      answer:
        'Employees can file a request for assistance (RFA) under the Single Entry Approach (SEnA) program through the nearest DOLE Regional, Provincial, or Field Office. DOLE requires employers to submit an annual compliance report by January 15.',
    },
  ];

  const workedExamples: WorkedExampleItem[] = [
    {
      title: 'Mid-Year Hire (6 Months Service at ₱30,000 Basic Salary)',
      scenario:
        'An engineer was hired on July 1 with a regular basic monthly salary of ₱30,000. By December 31, they completed exactly 6 calendar months of service.',
      inputs: [
        { label: 'Date of Hire', value: 'July 1' },
        { label: 'Monthly Basic Salary', value: '₱30,000.00' },
        { label: 'Months Rendered in Calendar Year', value: '6 months' },
      ],
      steps: [
        { label: 'Total Basic Salary Earned', formula: '₱30,000 × 6 months', value: '₱180,000.00' },
        { label: 'Statutory 13th Month Formula', formula: 'Total Basic Earned ÷ 12', value: '₱180,000 ÷ 12', highlight: true },
        { label: 'Tax-Exempt Status Check', formula: 'Below ₱90,000 TRAIN cap', value: 'Tax-Exempt' },
      ],
      resultLabel: 'Net 13th Month Payable',
      resultValue: '₱15,000.00',
      notes: 'Must be paid on or before December 24.',
    },
    {
      title: 'Kasambahay (Domestic Worker with ₱6,000 Basic Monthly Wage)',
      scenario:
        'A full-time domestic helper in Metro Manila has worked continuously for the same household employer throughout the full calendar year.',
      inputs: [
        { label: 'Employment Classification', value: 'Kasambahay (RA 10361)' },
        { label: 'Monthly Cash Wage', value: '₱6,000.00' },
        { label: 'Months Rendered', value: '12 months' },
      ],
      steps: [
        { label: 'Total Annual Cash Wage', formula: '₱6,000 × 12 months', value: '₱72,000.00' },
        { label: 'Statutory 13th Month Formula', formula: '₱72,000 ÷ 12', value: '₱6,000.00', highlight: true },
        { label: 'Free Board & Lodging Value', formula: 'Excluded by law from computation', value: '₱0.00 deduction' },
      ],
      resultLabel: 'Mandatory 13th Month Pay',
      resultValue: '₱6,000.00',
      notes: 'Due on or before December 24, paid in cash.',
    },
  ];

  const officialSources: OfficialSourceLink[] = [
    {
      name: 'Department of Labor and Employment (DOLE)',
      documentTitle: 'Presidential Decree No. 851 & Revised Implementing Rules',
      url: 'https://www.dole.gov.ph',
      verifiedDate: phRates.verifiedDate,
    },
    {
      name: 'Official Gazette of the Republic of the Philippines',
      documentTitle: 'Republic Act No. 10361 (Domestic Workers Act / Batas Kasambahay)',
      url: 'https://www.officialgazette.gov.ph',
      verifiedDate: phRates.verifiedDate,
    },
  ];

  const toc = [
    { id: 'statutory-deadline', label: 'The December 24 Mandatory Deadline' },
    { id: 'who-qualifies', label: 'Who Is Entitled to 13th Month Pay?' },
    { id: 'kasambahay-rules', label: 'Rules for Domestic Workers (Kasambahay)' },
    { id: 'prorated-computation', label: 'Prorating for New Hires & Mid-Year Starters' },
    { id: 'resigned-employees', label: 'Entitlement for Resigned or Separated Staff' },
    { id: 'employer-compliance', label: 'Employer Reporting & Non-Compliance Penalties' },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <StructuredData
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Philippines', url: '/philippines/' },
          { name: 'Guides', url: '/philippines/' },
          { name: 'When Is 13th Month Pay Given', url: '/philippines/guides/when-is-13th-month-pay-given/' },
        ]}
        article={{
          headline: 'When Is 13th Month Pay Given in Philippines? (2026 DOLE Rules)',
          description: 'Official rules on the December 24 deadline, who qualifies, kasambahay rules, and prorating for new hires.',
          url: 'https://pay.zetawala.com/philippines/guides/when-is-13th-month-pay-given/',
          datePublished: '2026-01-15T08:00:00+08:00',
          dateModified: '2026-11-18T00:00:00+08:00',
        }}
        faqs={faqs}
      />

      <Breadcrumbs
        items={[
          { label: 'Philippines', href: '/philippines/' },
          { label: 'Guides', href: '/philippines/' },
          { label: 'When Is 13th Month Pay Given' },
        ]}
      />

      <header className="border-b border-neutral-200 pb-6 pt-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft px-3 py-1 text-xs font-semibold text-brand-strong mb-2">
          <Calendar className="h-3.5 w-3.5 text-brand" />
          <span>DOLE Labor Standards Guide</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
          When Is 13th Month Pay Given in the Philippines?
        </h1>
        <p className="mt-2 text-sm sm:text-base text-neutral-600 leading-relaxed">
          The legal deadline, coverage criteria, mid-year prorating formulas, and employer reporting guidelines under Presidential Decree No. 851.
        </p>
      </header>

      {/* Quick Calculator Action Banner */}
      <div className="mt-6 rounded-xl border border-brand/30 bg-brand-soft/20 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-bold text-neutral-900">Need to calculate your exact payout?</h2>
          <p className="text-xs text-neutral-600">Enter your basic salary and months worked to see your net 13th month pay instantly.</p>
        </div>
        <Link
          href="/philippines/13th-month-pay-calculator/"
          className="inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-brand-strong transition-colors shrink-0"
        >
          <Calculator className="h-4 w-4" />
          <span>Open 13th Month Calculator</span>
        </Link>
      </div>

      <SeoArticle
        quickAnswer="Under Presidential Decree No. 851 and DOLE guidelines, employers must pay the mandatory 13th-month pay to all eligible rank-and-file employees on or before December 24 of each year. Employers may pay half in May or June, but the balance must be settled no later than December 24."
        toc={toc}
        workedExamples={workedExamples}
        sources={officialSources}
        verifiedDate={phRates.verifiedDate}
      >
        <section id="statutory-deadline" className="space-y-4">
          <h2>The Statutory Deadline: The December 24 Cutoff</h2>
          <p>
            In the Philippines, the payment of 13th-month pay is governed by Presidential Decree No. 851, enacted to protect the purchasing power of Filipino workers and ensure they have adequate resources for the Christmas holidays. Every year, the Department of Labor and Employment (DOLE) releases a Labor Advisory reiterating the single most important rule: <strong>13th-month pay must be paid on or before December 24</strong>.
          </p>
          <p>
            This date is a hard statutory deadline. Employers cannot ask for an extension, and DOLE rules strictly prohibit any application for exemption. Even if a business experienced operational losses or cash flow constraints, payment cannot be deferred to January or offset against future payroll without violating labor standards.
          </p>
          <p>
            Many employers choose to disburse 13th-month pay in two installments: the first half in May or June (to help employees cover school enrollment expenses for dependents) and the remaining half in the first or second week of December. This practice is entirely legal, provided that the full remaining balance reaches employees by December 24.
          </p>
        </section>

        <section id="who-qualifies" className="space-y-4">
          <h2>Who Is Entitled to 13th Month Pay?</h2>
          <p>
            Entitlement to 13th-month pay does not depend on job title, contract type, or method of salary disbursement. Under DOLE rules, an employee qualifies if they meet two straightforward conditions:
          </p>
          <ol>
            <li>They are a <strong>rank-and-file employee</strong> in the private sector.</li>
            <li>They have rendered at least <strong>one (1) month of service</strong> during the calendar year.</li>
          </ol>
          <p>
            Rank-and-file employees include regular, probationary, casual, seasonal, and project-based staff. Whether an employee is paid monthly, semi-monthly, daily, or on piece-rate basis (such as pakyaw workers), they are entitled to 13th-month pay.
          </p>
          <div className="overflow-x-auto rounded-lg border border-neutral-200 my-4">
            <table className="w-full text-left text-sm text-neutral-700">
              <thead className="bg-neutral-100 text-xs font-bold uppercase text-neutral-800">
                <tr>
                  <th className="px-4 py-3">Employment Classification</th>
                  <th className="px-4 py-3">Entitled to 13th Month Pay?</th>
                  <th className="px-4 py-3">Governing Rule / Legal Basis</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                <tr>
                  <td className="px-4 py-3 font-medium">Regular Rank-and-File</td>
                  <td className="px-4 py-3 text-brand font-bold">Yes</td>
                  <td className="px-4 py-3">PD 851 Mandatory Coverage</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Probationary Employees</td>
                  <td className="px-4 py-3 text-brand font-bold">Yes</td>
                  <td className="px-4 py-3">Covered after 1 month of service</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Project &amp; Seasonal Workers</td>
                  <td className="px-4 py-3 text-brand font-bold">Yes</td>
                  <td className="px-4 py-3">Prorated to actual months worked</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Kasambahay (Domestic Workers)</td>
                  <td className="px-4 py-3 text-brand font-bold">Yes</td>
                  <td className="px-4 py-3">Republic Act No. 10361</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Managerial Employees</td>
                  <td className="px-4 py-3 text-neutral-500 font-semibold">Exempt by Law</td>
                  <td className="px-4 py-3">Exempt under PD 851 (company discretion)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Independent Contractors / Freelancers</td>
                  <td className="px-4 py-3 text-neutral-500 font-semibold">No</td>
                  <td className="px-4 py-3">No employer-employee relationship</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section id="kasambahay-rules" className="space-y-4">
          <h2>Rules for Domestic Workers (Kasambahay)</h2>
          <p>
            Under Republic Act No. 10361 (the <em>Batas Kasambahay</em>), domestic workers—including housemaids, family drivers, cooks, gardeners, and nannies (yayas)—are legally entitled to 13th-month pay on or before December 24.
          </p>
          <p>
            The computation is based strictly on the kasambahay&apos;s agreed cash wage. Household employers cannot deduct the value of food, housing, electricity, water, or medical care provided to the domestic helper. For instance, if a housemaid receives a monthly cash salary of ₱6,000 and works the full calendar year, she is entitled to an exact cash 13th-month bonus of ₱6,000, irrespective of household living costs.
          </p>
        </section>

        <section id="prorated-computation" className="space-y-4">
          <h2>Prorating for New Hires &amp; Mid-Year Starters</h2>
          <p>
            Employees who join a company mid-year do not receive a full 12-month bonus. Instead, DOLE prescribes the standard prorated formula:
          </p>
          <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 font-mono text-sm text-neutral-800">
            <code>13th-Month Pay = Total Basic Salary Earned During the Year ÷ 12</code>
          </div>
          <p>
            Only &quot;basic salary&quot; is included in the numerator. Under DOLE guidelines, basic salary encompasses all remunerations or earnings paid by an employer for services rendered, but <strong>excludes</strong> allowances and monetary benefits which are not integrated as part of the regular wage. Overtime pay, night shift differential, holiday pay, unused leave encashments, and reimbursement allowances (such as transportation and mobile allowances) are excluded.
          </p>
          <p>
            You can verify your prorated take-home figure using our dedicated{' '}
            <Link href="/philippines/13th-month-pay-calculator/" className="text-brand font-semibold hover:underline">
              13th-Month Pay Calculator
            </Link>{' '}
            or review overall net income with our{' '}
            <Link href="/philippines/salary-calculator/" className="text-brand font-semibold hover:underline">
              Philippine Salary Calculator
            </Link>.
          </p>
        </section>

        <section id="resigned-employees" className="space-y-4">
          <h2>Entitlement for Resigned or Separated Staff</h2>
          <p>
            An employee who resigns or is terminated before December 24 does not forfeit their 13th-month pay. DOLE rules state that an employee whose employment is severed at any time before December is entitled to a prorated 13th-month pay proportional to the time they worked during that calendar year.
          </p>
          <p>
            Under DOLE Labor Advisory No. 06, Series of 2020, final pay (or &quot;back-pay&quot;), which includes the prorated 13th-month pay and unpaid salaries, must be released to the separated worker within <strong>thirty (30) days</strong> from the date of separation or completion of the clearance process.
          </p>
        </section>

        <section id="employer-compliance" className="space-y-4">
          <h2>Employer Reporting &amp; Non-Compliance Penalties</h2>
          <p>
            Every private-sector employer is legally required to submit formal proof of 13th-month pay compliance to the DOLE Regional Office no later than <strong>January 15</strong> of the following year. This report must be filed electronically through DOLE&apos;s Establishment Report System and must state total workforce counts, total amount disbursed, and payment dates.
          </p>
          <p>
            Failure to pay 13th-month pay by December 24 is treated as a money claim violation under the Labor Code of the Philippines. Employers found non-compliant are subject to administrative fines, interest charges on unpaid amounts, and inspection orders by DOLE labor inspectors.
          </p>
        </section>
      </SeoArticle>
    </div>
  );
}
