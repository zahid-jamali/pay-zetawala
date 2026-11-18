import React from 'react';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SeoArticle, WorkedExampleItem, OfficialSourceLink } from '@/components/SeoArticle';
import { StructuredData } from '@/components/StructuredData';
import { getPhRates } from '@/lib/seo/rules-content';
import { HeartPulse, Calculator, ShieldCheck, DollarSign } from 'lucide-react';

export default function GuidePhilhealthContributionExplained() {
  const phRates = getPhRates();
  const ratePct = (phRates.philhealthTotalRate * 100).toFixed(1); // 5.0%
  const eePct = (phRates.philhealthEeRate * 100).toFixed(1); // 2.5%

  const faqs = [
    {
      question: 'What is the current PhilHealth contribution rate in 2026?',
      answer:
        `Under the Universal Health Care (UHC) Act (Republic Act No. 11223), the PhilHealth premium rate is ${ratePct}%. For formally employed workers, this is split equally between the employee (${eePct}%) and the employer (${eePct}%).`,
    },
    {
      question: 'What is the PhilHealth income floor and income ceiling?',
      answer:
        `The statutory income floor is ₱${phRates.philhealthFloor.toLocaleString()} per month (minimum premium of ₱500, or ₱250 each for employee and employer). The statutory income ceiling is ₱${phRates.philhealthCeiling.toLocaleString()} per month (maximum premium of ₱5,000, or ₱2,500 each for employee and employer).`,
    },
    {
      question: 'If my basic salary is ₱150,000, how much PhilHealth is deducted from my pay?',
      answer:
        `Because your basic salary exceeds the ₱${phRates.philhealthCeiling.toLocaleString()} income ceiling, your deduction is capped at the maximum employee share of exactly ₱2,500.00. Your employer matches this with ₱2,500.00. Any salary above ₱100,000 incurs zero additional PhilHealth deduction.`,
    },
    {
      question: 'How do self-employed, freelance, and voluntary members pay PhilHealth?',
      answer:
        `Self-employed and voluntary members are classified as Direct Contributors and must pay the full ${ratePct}% premium based on their declared monthly income, subject to the same ₱${phRates.philhealthFloor.toLocaleString()} floor (₱500/month) and ₱${phRates.philhealthCeiling.toLocaleString()} ceiling (₱5,000/month).`,
    },
    {
      question: 'Who pays the PhilHealth contribution for a Kasambahay (domestic worker)?',
      answer:
        'Under Republic Act No. 10361 (Batas Kasambahay), if the domestic worker’s monthly wage is below ₱5,000, the household employer must pay 100% of the PhilHealth premium. If the wage is ₱5,000 or above, the standard 50-50 sharing applies.',
    },
  ];

  const workedExamples: WorkedExampleItem[] = [
    {
      title: 'Standard Salary: ₱25,000 Basic Monthly Wage',
      scenario:
        'A junior marketing officer earns a basic monthly wage of ₱25,000 in a private-sector enterprise.',
      inputs: [
        { label: 'Monthly Basic Salary', value: '₱25,000.00' },
        { label: 'UHC Statutory Premium Rate', value: `${ratePct}%` },
        { label: 'Cost Sharing Ratio', value: '50% Employee / 50% Employer' },
      ],
      steps: [
        { label: 'Total Monthly Premium', formula: '₱25,000 × 5.0%', value: '₱1,250.00' },
        { label: 'Employee Share (2.5%)', formula: '₱1,250 ÷ 2', value: '₱625.00', highlight: true },
        { label: 'Employer Share (2.5%)', formula: '₱1,250 ÷ 2', value: '₱625.00' },
      ],
      resultLabel: 'Employee Payroll Deduction',
      resultValue: '₱625.00 / month',
      notes: 'Matched by ₱625 employer contribution.',
    },
    {
      title: 'High Earner Capped at Income Ceiling: ₱120,000 Basic Salary',
      scenario:
        'A corporate department director earns ₱120,000 monthly basic salary, which exceeds the statutory ceiling.',
      inputs: [
        { label: 'Monthly Basic Salary', value: '₱120,000.00' },
        { label: 'Statutory Income Ceiling', value: `₱${phRates.philhealthCeiling.toLocaleString()}.00` },
        { label: 'Effective Basis for Premium', value: '₱100,000.00 (Capped)' },
      ],
      steps: [
        { label: 'Maximum Monthly Premium', formula: '₱100,000 × 5.0%', value: '₱5,000.00' },
        { label: 'Employee Share (Max Cap)', formula: '₱5,000 ÷ 2', value: '₱2,500.00', highlight: true },
        { label: 'Employer Share (Max Cap)', formula: '₱5,000 ÷ 2', value: '₱2,500.00' },
      ],
      resultLabel: 'Capped Employee Deduction',
      resultValue: '₱2,500.00 / month',
      notes: 'No deduction on the ₱20,000 excess salary above ₱100k.',
    },
  ];

  const officialSources: OfficialSourceLink[] = [
    {
      name: 'Philippine Health Insurance Corporation (PhilHealth)',
      documentTitle: 'Republic Act No. 11223 (Universal Health Care Act) & Circular No. 2024-001',
      url: 'https://www.philhealth.gov.ph',
      verifiedDate: phRates.verifiedDate,
    },
    {
      name: 'Department of Health (DOH)',
      documentTitle: 'Implementing Rules and Regulations of the Universal Health Care Act',
      url: 'https://doh.gov.ph',
      verifiedDate: phRates.verifiedDate,
    },
  ];

  const toc = [
    { id: 'uhc-act-background', label: 'The Universal Health Care (UHC) Act Mandate' },
    { id: 'rate-and-split', label: 'The 5.0% Premium Rate & 50-50 Split' },
    { id: 'floor-and-ceiling', label: 'Income Floor (₱10k) and Ceiling (₱100k)' },
    { id: 'direct-vs-indirect', label: 'Direct vs Indirect Contributors' },
    { id: 'kasambahay-special-rule', label: 'Special Rule for Domestic Workers (Kasambahay)' },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <StructuredData
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Philippines', url: '/philippines/' },
          { name: 'Guides', url: '/philippines/' },
          { name: 'PhilHealth Contribution Explained', url: '/philippines/guides/philhealth-contribution-explained/' },
        ]}
        article={{
          headline: 'PhilHealth Contribution 5% Rate Explained: Split, Floor & Ceiling (2026)',
          description: `Everything you need to know about the ${ratePct}% PhilHealth premium rate, the ₱${phRates.philhealthFloor.toLocaleString()} floor, the ₱${phRates.philhealthCeiling.toLocaleString()} ceiling, and employer cost sharing.`,
          url: 'https://pay.zetawala.com/philippines/guides/philhealth-contribution-explained/',
          datePublished: '2026-02-15T08:00:00+08:00',
          dateModified: '2026-11-18T00:00:00+08:00',
        }}
        faqs={faqs}
      />

      <Breadcrumbs
        items={[
          { label: 'Philippines', href: '/philippines/' },
          { label: 'Guides', href: '/philippines/' },
          { label: 'PhilHealth Contribution Explained' },
        ]}
      />

      <header className="border-b border-neutral-200 pb-6 pt-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft px-3 py-1 text-xs font-semibold text-brand-strong mb-2">
          <HeartPulse className="h-3.5 w-3.5 text-brand" />
          <span>Universal Health Care Guide</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
          PhilHealth Contribution 5% Rate Explained
        </h1>
        <p className="mt-2 text-sm sm:text-base text-neutral-600 leading-relaxed">
          How the {ratePct}% premium rate is calculated, the 50-50 employer-employee split, the ₱{phRates.philhealthFloor.toLocaleString()} floor, and the ₱{phRates.philhealthCeiling.toLocaleString()} statutory ceiling under Republic Act No. 11223.
        </p>
      </header>

      {/* Tool Shortcut */}
      <div className="mt-6 rounded-xl border border-brand/30 bg-brand-soft/20 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-bold text-neutral-900">Calculate your exact PhilHealth deduction</h2>
          <p className="text-xs text-neutral-600">Enter your basic wage to see your employee share, employer share, and total monthly premium.</p>
        </div>
        <Link
          href="/philippines/philhealth-contribution-calculator/"
          className="inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-brand-strong transition-colors shrink-0"
        >
          <Calculator className="h-4 w-4" />
          <span>PhilHealth Calculator</span>
        </Link>
      </div>

      <SeoArticle
        quickAnswer={`Under the Universal Health Care Act (RA 11223), the PhilHealth premium rate is ${ratePct}%, split equally between employee (${eePct}%) and employer (${eePct}%). The monthly income floor is ₱${phRates.philhealthFloor.toLocaleString()} (₱500 minimum premium) and the ceiling is ₱${phRates.philhealthCeiling.toLocaleString()} (₱5,000 maximum premium, or ₱2,500 maximum employee share).`}
        toc={toc}
        workedExamples={workedExamples}
        sources={officialSources}
        verifiedDate={phRates.verifiedDate}
      >
        <section id="uhc-act-background" className="space-y-4">
          <h2>The Universal Health Care (UHC) Act Mandate</h2>
          <p>
            Signed into law in February 2019, Republic Act No. 11223, commonly known as the <strong>Universal Health Care (UHC) Act</strong>, automatically enrolled all Filipino citizens in the National Health Insurance Program (NHIP).
          </p>
          <p>
            To sustainably fund comprehensive outpatient drug benefits, free emergency room access, catastrophic hospital inpatient packages, and expanded primary care (Konsulta) consultations, the law instituted a predictable, progressive premium adjustment schedule:
          </p>
          <div className="overflow-x-auto rounded-lg border border-neutral-200 my-4">
            <table className="w-full text-left text-sm text-neutral-700">
              <thead className="bg-neutral-100 text-xs font-bold uppercase text-neutral-800">
                <tr>
                  <th className="px-4 py-3">Statutory Year</th>
                  <th className="px-4 py-3">Premium Rate</th>
                  <th className="px-4 py-3">Income Floor</th>
                  <th className="px-4 py-3">Income Ceiling</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                <tr>
                  <td className="px-4 py-3 font-medium">2019</td>
                  <td className="px-4 py-3">2.75%</td>
                  <td className="px-4 py-3">₱10,000</td>
                  <td className="px-4 py-3">₱50,000</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">2020</td>
                  <td className="px-4 py-3">3.00%</td>
                  <td className="px-4 py-3">₱10,000</td>
                  <td className="px-4 py-3">₱60,000</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">2021 – 2023</td>
                  <td className="px-4 py-3">3.50% – 4.00%</td>
                  <td className="px-4 py-3">₱10,000</td>
                  <td className="px-4 py-3">₱70,000 – ₱80,000</td>
                </tr>
                <tr className="bg-brand-soft/30 font-semibold text-brand-strong">
                  <td className="px-4 py-3 font-bold">2024 / 2026 (In Force)</td>
                  <td className="px-4 py-3">5.00% (Final Tier)</td>
                  <td className="px-4 py-3">₱10,000</td>
                  <td className="px-4 py-3">₱100,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section id="rate-and-split" className="space-y-4">
          <h2>The 5.0% Premium Rate &amp; 50-50 Split</h2>
          <p>
            For formally employed workers in the formal economy, the 5.0% premium is shared <strong>equally (50-50)</strong> between the worker and the employing company:
          </p>
          <ul>
            <li><strong>Employee Share:</strong> 2.5% of regular monthly basic salary, deducted via automated payroll.</li>
            <li><strong>Employer Share:</strong> 2.5% of regular monthly basic salary, remitted directly by the employer.</li>
          </ul>
          <p>
            Unlike the SSS system, which uses bracket ranges, PhilHealth computes the premium as an exact direct mathematical percentage of the employee&apos;s basic monthly wage, bounded only by the statutory floor and ceiling.
          </p>
        </section>

        <section id="floor-and-ceiling" className="space-y-4">
          <h2>Income Floor (₱10k) and Ceiling (₱100k)</h2>
          <p>
            To prevent extreme financial burdens on low-wage workers while capping liabilities for high-income executives, the law enforces two boundaries:
          </p>
          <ul>
            <li>
              <strong>Income Floor (₱10,000):</strong> For employees earning ₱10,000 or below, the premium is fixed at ₱500.00 per month (₱250 employee share and ₱250 employer share).
            </li>
            <li>
              <strong>Income Ceiling (₱100,000):</strong> For employees earning ₱100,000 or above, the premium is capped at ₱5,000.00 per month (₱2,500 employee share and ₱2,500 employer share). Even if an executive earns ₱300,000 or ₱500,000 monthly, their employee deduction will never exceed ₱2,500.00.
            </li>
          </ul>
        </section>

        <section id="direct-vs-indirect" className="space-y-4">
          <h2>Direct vs Indirect Contributors</h2>
          <p>
            The Universal Health Care Act classifies all Filipinos into two membership groups:
          </p>
          <ul>
            <li>
              <strong>Direct Contributors:</strong> Those who have the capacity to pay premiums, including formally employed workers, self-employed professionals, sole proprietors, migrant workers (OFWs), and voluntary individuals.
            </li>
            <li>
              <strong>Indirect Contributors:</strong> Those whose premiums are subsidized 100% by the National Government through annual appropriations, including indigent families identified by the DSWD Listahanan, senior citizens (RA 10645), persons with disabilities (PWDs), and 4Ps beneficiaries.
            </li>
          </ul>
        </section>

        <section id="kasambahay-special-rule" className="space-y-4">
          <h2>Special Rule for Domestic Workers (Kasambahay)</h2>
          <p>
            Under Section 30 of Republic Act No. 10361 (Batas Kasambahay):
          </p>
          <ul>
            <li>If a Kasambahay receives a monthly cash wage of <strong>less than ₱5,000</strong>, the household employer is legally obligated to pay 100% of the PhilHealth premium (zero deduction from the domestic worker&apos;s wage).</li>
            <li>If the domestic worker&apos;s wage is <strong>₱5,000 or more per month</strong>, the premium is split equally (50-50) between the employer and the kasambahay, subject to the standard ₱10,000 floor.</li>
          </ul>
        </section>
      </SeoArticle>
    </div>
  );
}
