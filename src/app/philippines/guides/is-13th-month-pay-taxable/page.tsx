import React from 'react';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SeoArticle, WorkedExampleItem, OfficialSourceLink } from '@/components/SeoArticle';
import { StructuredData } from '@/components/StructuredData';
import { getPhRates } from '@/lib/seo/rules-content';
import { ShieldCheck, Receipt, Calculator } from 'lucide-react';

export default function GuideIs13thMonthPayTaxable() {
  const phRates = getPhRates();
  const taxCap = phRates.taxExempt13thCeiling; // ₱90,000

  const faqs = [
    {
      question: 'Is 13th month pay completely tax-free in the Philippines?',
      answer:
        `Under the TRAIN Law (Republic Act No. 10963), 13th-month pay and other benefits are tax-exempt up to ₱${taxCap.toLocaleString()}. If the sum of your 13th-month pay, Christmas bonus, and productivity incentives does not exceed ₱${taxCap.toLocaleString()}, zero income tax is withheld.`,
    },
    {
      question: 'What happens if my 13th month pay exceeds ₱90,000?',
      answer:
        `Only the amount in excess of ₱${taxCap.toLocaleString()} is subject to withholding tax. For example, if your total eligible bonuses equal ₱110,000, exactly ₱90,000 remains completely tax-free, and only the ₱20,000 excess is added to your taxable income for regular payroll tax withholding.`,
    },
    {
      question: 'Do performance bonuses and Christmas gifts count toward the ₱90,000 limit?',
      answer:
        'Yes. Section 32(B)(7)(e) of the National Internal Revenue Code combines 13th-month pay, Christmas bonuses, productivity incentives, loyalty awards, and excess de minimis benefits into a single collective "13th Month Pay and Other Benefits" bucket subject to the statutory ceiling.',
    },
    {
      question: 'Is 13th month pay subject to SSS, PhilHealth, and Pag-IBIG deductions?',
      answer:
        'No. Statutory government contributions (SSS, PhilHealth, Pag-IBIG) are computed strictly on regular monthly basic salary. 13th-month pay is completely free from mandatory social insurance premium deductions.',
    },
    {
      question: 'How do employers handle withholding tax on 13th month pay during annualization?',
      answer:
        'In December, employers perform annual payroll tax reconciliation (annualization). If any bonus amounts exceeded the statutory cap, the excess is integrated into your gross annual compensation to ensure exact tax withholding before issuing BIR Form 2316.',
    },
  ];

  const workedExamples: WorkedExampleItem[] = [
    {
      title: 'Full Exemption: ₱60,000 Basic Salary with No Excess Bonus',
      scenario:
        'A marketing specialist earns ₱60,000 monthly basic salary. In December, they receive a standard 13th-month pay of ₱60,000 and a ₱15,000 holiday bonus.',
      inputs: [
        { label: 'Monthly Basic Salary', value: '₱60,000.00' },
        { label: '13th-Month Pay', value: '₱60,000.00' },
        { label: 'Christmas / Other Bonus', value: '₱15,000.00' },
      ],
      steps: [
        { label: 'Total Benefits Received', formula: '₱60,000 + ₱15,000', value: '₱75,000.00' },
        { label: 'TRAIN Statutory Ceiling', formula: 'Section 32(B)(7)(e) NIRC', value: `₱${taxCap.toLocaleString()}.00` },
        { label: 'Taxable Excess Bonus', formula: '₱75,000 – ₱90,000 cap', value: '₱0.00 (Zero Tax)', highlight: true },
        { label: 'Withholding Tax Deducted', formula: 'Zero tax applied', value: '₱0.00' },
      ],
      resultLabel: 'Net Take-Home Bonus',
      resultValue: '₱75,000.00',
      notes: '100% tax-exempt. Employee receives full ₱75,000.',
    },
    {
      title: 'Partial Exemption: ₱120,000 Basic Salary Exceeding the Ceiling',
      scenario:
        'A senior IT architect earns ₱120,000 monthly basic salary and receives a full 13th-month pay of ₱120,000 in December.',
      inputs: [
        { label: 'Monthly Basic Salary', value: '₱120,000.00' },
        { label: '13th-Month Pay Earned', value: '₱120,000.00' },
        { label: 'Statutory Tax Ceiling', value: `₱${taxCap.toLocaleString()}.00` },
      ],
      steps: [
        { label: 'Tax-Exempt Portion', formula: 'Max statutory exemption', value: `₱${taxCap.toLocaleString()}.00` },
        { label: 'Taxable Excess Portion', formula: '₱120,000 – ₱90,000', value: '₱30,000.00', highlight: true },
        { label: 'Marginal Tax Rate Applied', formula: 'BIR Bracket (₱66,667–₱166,666 / mo)', value: '25% on excess' },
        { label: 'Estimated Tax on Excess', formula: '₱30,000 × 25%', value: '₱7,500.00', isDeduction: true },
      ],
      resultLabel: 'Net 13th Month Take-Home',
      resultValue: '₱112,500.00',
      notes: '₱90,000 exempt + (₱30,000 – ₱7,500 tax) = ₱112,500 net.',
    },
  ];

  const officialSources: OfficialSourceLink[] = [
    {
      name: 'Bureau of Internal Revenue (BIR)',
      documentTitle: 'Revenue Regulations No. 11-2018 (TRAIN Law Withholding Guidelines)',
      url: 'https://www.bir.gov.ph',
      verifiedDate: phRates.verifiedDate,
    },
    {
      name: 'Department of Labor and Employment (DOLE)',
      documentTitle: 'Guidelines on the Payment of 13th Month Pay',
      url: 'https://www.dole.gov.ph',
      verifiedDate: phRates.verifiedDate,
    },
  ];

  const toc = [
    { id: 'tax-ceiling', label: 'The ₱90,000 Tax-Exempt Ceiling' },
    { id: 'what-counts', label: 'What Benefits Count Toward the Limit?' },
    { id: 'taxation-of-excess', label: 'How Excess 13th Month Pay Is Taxed' },
    { id: 'social-contributions', label: 'Are Government Deductions (SSS/PhilHealth) Applied?' },
    { id: 'annualization-process', label: 'Year-End Annualization & BIR Form 2316' },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <StructuredData
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Philippines', url: '/philippines/' },
          { name: 'Guides', url: '/philippines/' },
          { name: 'Is 13th Month Pay Taxable', url: '/philippines/guides/is-13th-month-pay-taxable/' },
        ]}
        article={{
          headline: 'Is 13th Month Pay Taxable in the Philippines? (2026 Rules)',
          description: `Everything you need to know about the ₱${taxCap.toLocaleString()} tax-exempt ceiling under the TRAIN Law, what counts toward it, and how excess bonus is taxed.`,
          url: 'https://pay.zetawala.com/philippines/guides/is-13th-month-pay-taxable/',
          datePublished: '2026-01-20T08:00:00+08:00',
          dateModified: '2026-11-18T00:00:00+08:00',
        }}
        faqs={faqs}
      />

      <Breadcrumbs
        items={[
          { label: 'Philippines', href: '/philippines/' },
          { label: 'Guides', href: '/philippines/' },
          { label: 'Is 13th Month Pay Taxable' },
        ]}
      />

      <header className="border-b border-neutral-200 pb-6 pt-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft px-3 py-1 text-xs font-semibold text-brand-strong mb-2">
          <Receipt className="h-3.5 w-3.5 text-brand" />
          <span>BIR Tax Regulations Guide</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
          Is 13th Month Pay Taxable in the Philippines?
        </h1>
        <p className="mt-2 text-sm sm:text-base text-neutral-600 leading-relaxed">
          How the ₱{taxCap.toLocaleString()} statutory tax exemption works under the TRAIN Law, which benefits share the ceiling, and how excess bonus income is taxed.
        </p>
      </header>

      {/* Calculator Banner */}
      <div className="mt-6 rounded-xl border border-brand/30 bg-brand-soft/20 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-bold text-neutral-900">Calculate your net bonus after tax</h2>
          <p className="text-xs text-neutral-600">See exactly how much of your 13th-month pay is tax-exempt and what tax applies to any excess.</p>
        </div>
        <Link
          href="/philippines/13th-month-pay-calculator/"
          className="inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-brand-strong transition-colors shrink-0"
        >
          <Calculator className="h-4 w-4" />
          <span>Calculate 13th Month Pay</span>
        </Link>
      </div>

      <SeoArticle
        quickAnswer={`Under the TRAIN Law (Republic Act No. 10963), 13th-month pay and other benefits are tax-exempt up to ₱${taxCap.toLocaleString()} per calendar year. If your total eligible benefits are at or below ₱${taxCap.toLocaleString()}, zero income tax is withheld. Only the amount exceeding ₱${taxCap.toLocaleString()} is added to your taxable income and taxed at regular withholding rates.`}
        toc={toc}
        workedExamples={workedExamples}
        sources={officialSources}
        verifiedDate={phRates.verifiedDate}
      >
        <section id="tax-ceiling" className="space-y-4">
          <h2>The ₱{taxCap.toLocaleString()} Tax-Exempt Ceiling Under the TRAIN Law</h2>
          <p>
            Under Section 32(B)(7)(e) of the National Internal Revenue Code (NIRC), as amended by Republic Act No. 10963 (the Tax Reform for Acceleration and Inclusion or TRAIN Law), gross benefits received by officials and employees of public and private entities are exempt from income taxation up to a statutory ceiling of <strong>₱{taxCap.toLocaleString()}</strong> per calendar year.
          </p>
          <p>
            Prior to the TRAIN Law, the exemption cap stood at ₱82,000. The current ₱{taxCap.toLocaleString()} ceiling has provided substantial relief for middle-income employees, enabling the vast majority of rank-and-file workers in the Philippines to take home 100% of their 13th-month bonus without a single centavo of withholding tax.
          </p>
        </section>

        <section id="what-counts" className="space-y-4">
          <h2>What Benefits Count Toward the ₱{taxCap.toLocaleString()} Limit?</h2>
          <p>
            A common point of confusion is whether the ₱{taxCap.toLocaleString()} threshold applies exclusively to 13th-month pay. Under Bureau of Internal Revenue (BIR) Revenue Regulations No. 11-2018, this cap is a <strong>cumulative ceiling</strong> shared across several categories of compensation collectively labeled &quot;13th Month Pay and Other Benefits.&quot;
          </p>
          <div className="overflow-x-auto rounded-lg border border-neutral-200 my-4">
            <table className="w-full text-left text-sm text-neutral-700">
              <thead className="bg-neutral-100 text-xs font-bold uppercase text-neutral-800">
                <tr>
                  <th className="px-4 py-3">Benefit Type</th>
                  <th className="px-4 py-3">Counts Toward ₱{taxCap.toLocaleString()} Cap?</th>
                  <th className="px-4 py-3">Notes &amp; Tax Rules</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                <tr>
                  <td className="px-4 py-3 font-medium">Statutory 13th-Month Pay</td>
                  <td className="px-4 py-3 text-brand font-bold">Yes</td>
                  <td className="px-4 py-3">Mandatory rank-and-file benefit under PD 851</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Christmas Bonus</td>
                  <td className="px-4 py-3 text-brand font-bold">Yes</td>
                  <td className="px-4 py-3">Discretionary management or CBA bonus</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Productivity Incentive Bonus</td>
                  <td className="px-4 py-3 text-brand font-bold">Yes</td>
                  <td className="px-4 py-3">Included under &quot;Other Benefits&quot;</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Excess De Minimis Benefits</td>
                  <td className="px-4 py-3 text-brand font-bold">Yes</td>
                  <td className="px-4 py-3">Amounts beyond statutory de minimis ceilings spill over here</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">De Minimis Benefits (within caps)</td>
                  <td className="px-4 py-3 text-neutral-500 font-semibold">No</td>
                  <td className="px-4 py-3">Completely tax-exempt separately (rice subsidy, uniform, etc.)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">14th Month or Mid-Year Bonus</td>
                  <td className="px-4 py-3 text-brand font-bold">Yes</td>
                  <td className="px-4 py-3">Combined with 13th-month pay against the ₱{taxCap.toLocaleString()} limit</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section id="taxation-of-excess" className="space-y-4">
          <h2>How Excess 13th Month Pay Is Taxed</h2>
          <p>
            When the aggregate total of 13th-month pay and other benefits exceeds ₱{taxCap.toLocaleString()}, the excess is not subject to a flat penalty tax. Instead, the excess is treated as <strong>regular compensation income</strong>.
          </p>
          <p>
            The payroll department adds the excess amount to your regular basic salary for the payroll period in which the bonus is released. Your total taxable income for that period is then evaluated against the official revised BIR graduated withholding tax brackets. For example, if you earn ₱120,000 monthly and receive a ₱120,000 13th-month bonus, exactly ₱90,000 is tax-free, and the ₱30,000 balance is taxed at your marginal rate (typically 25% or 30%).
          </p>
          <p>
            You can verify your exact monthly tax brackets using our{' '}
            <Link href="/philippines/withholding-tax-table/" className="text-brand font-semibold hover:underline">
              Official BIR Withholding Tax Table
            </Link>.
          </p>
        </section>

        <section id="social-contributions" className="space-y-4">
          <h2>Are Government Deductions (SSS/PhilHealth) Applied?</h2>
          <p>
            No. A vital distinction in Philippine payroll law is that statutory social insurance deductions—Social Security System (SSS), Philippine Health Insurance Corporation (PhilHealth), and Home Development Mutual Fund (Pag-IBIG)—are levied strictly against regular monthly salary credits.
          </p>
          <p>
            Neither your statutory 13th-month pay nor discretionary Christmas bonuses are subject to SSS contributions, PhilHealth premiums, or Pag-IBIG savings deductions. Even if your 13th-month pay exceeds ₱{taxCap.toLocaleString()}, zero social insurance contributions are deducted from the excess.
          </p>
        </section>

        <section id="annualization-process" className="space-y-4">
          <h2>Year-End Annualization &amp; BIR Form 2316</h2>
          <p>
            In December of each year, employers conduct a mandatory procedure called <strong>year-end tax annualization</strong>. The payroll software sums all compensation earned from January to December, subtracts non-taxable earnings (such as SSS, PhilHealth, Pag-IBIG contributions, de minimis benefits, and up to ₱{taxCap.toLocaleString()} of 13th-month benefits), and calculates the employee&apos;s true annual tax due.
          </p>
          <p>
            If taxes withheld throughout the year exceed the annualized tax liability, the employer refunds the over-withheld tax in the final December paycheck. If taxes were under-withheld (often due to mid-year salary raises or taxable bonus overflow), a small additional deduction is made. All figures are officially documented in your Certificate of Compensation Payment / Tax Withheld (<strong>BIR Form 2316</strong>).
          </p>
        </section>
      </SeoArticle>
    </div>
  );
}
