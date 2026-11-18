import React from 'react';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SeoArticle, WorkedExampleItem, OfficialSourceLink } from '@/components/SeoArticle';
import { StructuredData } from '@/components/StructuredData';
import { getPhRates } from '@/lib/seo/rules-content';
import { UserMinus, Calculator, Clock, CheckCircle2 } from 'lucide-react';

export default function Guide13thMonthPayForResignedEmployees() {
  const phRates = getPhRates();

  const faqs = [
    {
      question: 'Does an employee who resigns before December lose their 13th month pay?',
      answer:
        'No. Under Section 6 of the Revised Implementing Rules of Presidential Decree No. 851, an employee who resigns or is terminated at any time before the time of payment is entitled to prorated 13th-month pay proportional to the time they worked during that calendar year.',
    },
    {
      question: 'When must an employer release the prorated 13th month pay to a resigned worker?',
      answer:
        'Pursuant to DOLE Labor Advisory No. 06, Series of 2020, final pay (which includes prorated 13th-month pay, unpaid salary, and leave encashments) must be released within thirty (30) days from the date of separation, unless a collective bargaining agreement or company policy stipulates a shorter timeline.',
    },
    {
      question: 'Is an employee terminated for cause (or AWOL) still entitled to 13th month pay?',
      answer:
        'Yes. 13th-month pay is an earned statutory monetary benefit for labor already rendered. Even if an employee is dismissed for just cause or went Absence Without Official Leave (AWOL), they remain legally entitled to their accrued 13th-month pay up to their last day of actual service.',
    },
    {
      question: 'Can company property accountabilities or loans be deducted from the final 13th month pay?',
      answer:
        'Yes. An employer may deduct authorized debts, such as unpaid company equipment, emergency loans, or advance payments, provided there is a written authorization or standard clearance offset provision signed by the employee.',
    },
    {
      question: 'How do you compute prorated 13th month pay if resignation is mid-month?',
      answer:
        'The formula uses the total basic salary actually earned during the year. For a mid-month exit (such as September 15), sum your exact basic pay received from January 1 through September 15, then divide by 12.',
    },
  ];

  const workedExamples: WorkedExampleItem[] = [
    {
      title: 'Resignation on April 30 (4 Full Months of Service)',
      scenario:
        'An accountant with a basic monthly salary of ₱25,000 resigned and rendered service from January 1 to April 30 before leaving the firm.',
      inputs: [
        { label: 'Monthly Basic Salary', value: '₱25,000.00' },
        { label: 'Separation Date', value: 'April 30' },
        { label: 'Completed Months of Service', value: '4 months' },
      ],
      steps: [
        { label: 'Total Basic Salary Earned', formula: '₱25,000 × 4 months', value: '₱100,000.00' },
        { label: 'Statutory Divisor', formula: 'DOLE standard 12-month divisor', value: '÷ 12' },
        { label: 'Prorated 13th Month Pay', formula: '₱100,000 ÷ 12', value: '₱8,333.33', highlight: true },
        { label: 'Withholding Tax (Below ₱90k cap)', formula: 'TRAIN Law exemption', value: '₱0.00' },
      ],
      resultLabel: 'Net Prorated 13th Month',
      resultValue: '₱8,333.33',
      notes: 'Included in final pay released within 30 days of clearance.',
    },
    {
      title: 'Mid-Month Separation on September 15 (8.5 Months)',
      scenario:
        'A customer service supervisor earning ₱40,000 basic salary separated on September 15. They completed 8 full months plus one half-month payroll period.',
      inputs: [
        { label: 'Monthly Basic Salary', value: '₱40,000.00' },
        { label: 'Last Working Day', value: 'September 15' },
        { label: 'Duration Worked in Year', value: '8.5 months' },
      ],
      steps: [
        { label: 'Earnings (Jan 1 to Aug 31)', formula: '₱40,000 × 8 months', value: '₱320,000.00' },
        { label: 'Earnings (Sept 1 to Sept 15)', formula: 'Half-month basic wage', value: '₱20,000.00' },
        { label: 'Total Calendar Year Basic Pay', formula: '₱320,000 + ₱20,000', value: '₱340,000.00' },
        { label: 'Prorated 13th Month Formula', formula: '₱340,000 ÷ 12', value: '₱28,333.33', highlight: true },
      ],
      resultLabel: 'Net Prorated 13th Month',
      resultValue: '₱28,333.33',
      notes: 'Tax-exempt under the ₱90,000 statutory cap.',
    },
  ];

  const officialSources: OfficialSourceLink[] = [
    {
      name: 'Department of Labor and Employment (DOLE)',
      documentTitle: 'Labor Advisory No. 06-2020: Guidelines on the Payment of Final Pay',
      url: 'https://www.dole.gov.ph',
      verifiedDate: phRates.verifiedDate,
    },
    {
      name: 'National Wages and Productivity Commission (NWPC)',
      documentTitle: 'Revised Implementing Rules and Regulations of PD No. 851',
      url: 'https://nwpc.dole.gov.ph',
      verifiedDate: phRates.verifiedDate,
    },
  ];

  const toc = [
    { id: 'legal-right-to-13th', label: 'The Legal Right of Separated Employees' },
    { id: 'prorated-formula', label: 'The Official Prorated 13th Month Formula' },
    { id: '30-day-clearance', label: 'The 30-Day Final Pay Release Rule (LA 06-2020)' },
    { id: 'dismissal-and-awol', label: 'What About Terminated Staff & AWOL Cases?' },
    { id: 'tax-treatment-final-pay', label: 'Tax Treatment & BIR Form 2316 Issuance' },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <StructuredData
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Philippines', url: '/philippines/' },
          { name: 'Guides', url: '/philippines/' },
          { name: '13th Month Pay for Resigned Employees', url: '/philippines/guides/13th-month-pay-for-resigned-employees/' },
        ]}
        article={{
          headline: '13th Month Pay for Resigned Employees in Philippines (2026)',
          description: 'How prorated 13th month pay is computed, clearance process rules, and the 30-day final pay release timeline under DOLE Labor Advisory 06-2020.',
          url: 'https://pay.zetawala.com/philippines/guides/13th-month-pay-for-resigned-employees/',
          datePublished: '2026-02-01T08:00:00+08:00',
          dateModified: '2026-11-18T00:00:00+08:00',
        }}
        faqs={faqs}
      />

      <Breadcrumbs
        items={[
          { label: 'Philippines', href: '/philippines/' },
          { label: 'Guides', href: '/philippines/' },
          { label: '13th Month for Resigned Staff' },
        ]}
      />

      <header className="border-b border-neutral-200 pb-6 pt-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft px-3 py-1 text-xs font-semibold text-brand-strong mb-2">
          <UserMinus className="h-3.5 w-3.5 text-brand" />
          <span>DOLE Final Pay Standards</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
          13th Month Pay for Resigned Employees in the Philippines
        </h1>
        <p className="mt-2 text-sm sm:text-base text-neutral-600 leading-relaxed">
          How to compute your prorated 13th-month pay upon resigning, how final pay clearance works, and the mandatory 30-day settlement deadline under DOLE Labor Advisory No. 06-2020.
        </p>
      </header>

      {/* Tool Callout */}
      <div className="mt-6 rounded-xl border border-brand/30 bg-brand-soft/20 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-bold text-neutral-900">Calculate your exact back-pay entitlement</h2>
          <p className="text-xs text-neutral-600">Enter your basic wage and months worked to see your prorated 13th month pay instantly.</p>
        </div>
        <Link
          href="/philippines/13th-month-pay-calculator/"
          className="inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-brand-strong transition-colors shrink-0"
        >
          <Calculator className="h-4 w-4" />
          <span>Prorated 13th Month Calculator</span>
        </Link>
      </div>

      <SeoArticle
        quickAnswer="An employee who resigns or is separated at any time before December is legally entitled to prorated 13th-month pay. The formula is total basic salary earned during the calendar year divided by 12. Under DOLE Labor Advisory No. 06-2020, this must be paid within 30 calendar days from the date of separation."
        toc={toc}
        workedExamples={workedExamples}
        sources={officialSources}
        verifiedDate={phRates.verifiedDate}
      >
        <section id="legal-right-to-13th" className="space-y-4">
          <h2>The Legal Right of Separated Employees</h2>
          <p>
            A widespread myth among Filipino workers is that you must be actively employed on December 24 to receive 13th-month pay. Under Section 6 of the Revised Implementing Rules and Regulations of Presidential Decree No. 851, this is unequivocally false.
          </p>
          <p>
            The law establishes that 13th-month pay is an earned monetary entitlement. If an employee has rendered at least one (1) month of service within the calendar year, their right to a proportional fraction of that year&apos;s 13th-month pay is vested. Whether you resign in February, June, or October, your employer is legally bound to compute and release your prorated benefit as part of your final pay (commonly called &quot;back-pay&quot;).
          </p>
        </section>

        <section id="prorated-formula" className="space-y-4">
          <h2>The Official Prorated 13th Month Formula</h2>
          <p>
            The Department of Labor and Employment prescribes a simple mathematical formula to calculate the prorated amount for resigning workers:
          </p>
          <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 font-mono text-sm text-neutral-800">
            <code>Prorated 13th-Month Pay = Total Basic Salary Earned in the Calendar Year ÷ 12</code>
          </div>
          <p>
            Key components to keep in mind:
          </p>
          <ul>
            <li><strong>Calendar Year Basis:</strong> The calculation considers only earnings from January 1 of the separation year up to the employee&apos;s last working day. Any work rendered in previous years was already accounted for in prior December payouts.</li>
            <li><strong>Basic Salary Only:</strong> Overtime pay, night shift differential, holiday pay, premium pay, transportation allowances, meal allowances, and unused leave encashments are not part of the basic salary and must be excluded from the numerator.</li>
            <li><strong>Unpaid Absences &amp; Tardiness:</strong> Because the numerator is the total basic salary <em>actually earned</em>, salary deductions due to absences without pay, tardiness, or undertime naturally reduce the total basic salary, yielding an accurately adjusted prorated figure.</li>
          </ul>
        </section>

        <section id="30-day-clearance" className="space-y-4">
          <h2>The 30-Day Final Pay Release Rule (DOLE Labor Advisory No. 06-2020)</h2>
          <p>
            Historically, many employers in the Philippines delayed the release of final pay for three to six months following an employee&apos;s resignation. To eliminate this unfair labor practice, DOLE issued <strong>Labor Advisory No. 06, Series of 2020</strong>.
          </p>
          <p>
            Under this advisory, employers must release the complete final pay package—including the prorated 13th-month pay, unpaid last salary, encashment of accrued service incentive leaves (SIL), and tax refunds—within <strong>thirty (30) calendar days</strong> from the official date of separation, unless a more favorable company policy or collective bargaining agreement provides an earlier payout.
          </p>
          <p>
            The issuance of an employee&apos;s Certificate of Employment (COE) must also be fulfilled within three (3) days from request. Employers cannot condition the release of final pay on unnecessary bureaucratic delays once the standard turnover of equipment, documents, and clearance accountabilities has concluded.
          </p>
        </section>

        <section id="dismissal-and-awol" className="space-y-4">
          <h2>What About Terminated Staff &amp; AWOL Cases?</h2>
          <p>
            Does an employee terminated for serious misconduct, gross negligence, or unexcused abandonment of post (AWOL) forfeit their 13th-month pay? The Supreme Court and DOLE have repeatedly answered in the negative.
          </p>
          <p>
            13th-month pay corresponds to labor already completed before the termination occurred. While an employer may legally offset proven, documented financial damages or unreturned property against the employee&apos;s back-pay, the employer cannot unilaterally cancel the accrued 13th-month compensation as a punitive disciplinary measure.
          </p>
        </section>

        <section id="tax-treatment-final-pay" className="space-y-4">
          <h2>Tax Treatment &amp; BIR Form 2316 Issuance</h2>
          <p>
            Prorated 13th-month pay paid to resigned employees enjoys the exact same tax protection as regular December payouts: it is completely tax-exempt up to the statutory <strong>₱{phRates.taxExempt13thCeiling.toLocaleString()}</strong> ceiling under the TRAIN Law.
          </p>
          <p>
            When processing your final clearance, the payroll team must perform a mid-year tax annualization. If you paid excess withholding taxes during your months of service, the overpayment will be refunded in your final pay. Alongside your back-pay check or bank transfer, your former employer is required to give you a signed <strong>BIR Form 2316</strong> reflecting your gross compensation, tax-exempt 13th-month pay, and taxes withheld, which you will need to submit to your next employer for consolidated year-end filing.
          </p>
        </section>
      </SeoArticle>
    </div>
  );
}
