import React from 'react';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SeoArticle, WorkedExampleItem, OfficialSourceLink } from '@/components/SeoArticle';
import { StructuredData } from '@/components/StructuredData';
import { getPhRates } from '@/lib/seo/rules-content';
import { TrendingUp, Calculator, Table, ShieldCheck } from 'lucide-react';

export default function GuideSssContributionChanges() {
  const phRates = getPhRates();

  const faqs = [
    {
      question: 'What is the current SSS contribution rate in 2026?',
      answer:
        `Under Republic Act No. 11199, the SSS contribution rate is ${(phRates.sssTotalRate * 100).toFixed(0)}%, with ${(phRates.sssEeRate * 100).toFixed(0)}% paid by the employee and ${(phRates.sssErRate * 100).toFixed(0)}% paid by the employer. For self-employed and voluntary members, the member pays the full ${(phRates.sssTotalRate * 100).toFixed(0)}%.`,
    },
    {
      question: 'Will SSS contribution rates increase again after 2025/2026?',
      answer:
        'No further automatic statutory rate hikes are scheduled under Republic Act No. 11199. The 15% rate is the final scheduled tier of the multi-year reform roadmap that started at 12% in 2019. Any future rate changes would require new amendatory legislation passed by Congress.',
    },
    {
      question: 'What is the SSS WISP (Workers’ Investment and Savings Program)?',
      answer:
        'WISP is a mandatory, tax-free provident fund automatically integrated into SSS contributions for members earning above ₱20,000 monthly. Contributions for the Monthly Salary Credit (MSC) portion between ₱20,000 and ₱35,000 are allocated to WISP, earning annual investment dividends that supplement the regular SSS retirement pension.',
    },
    {
      question: 'What is the maximum Monthly Salary Credit (MSC) in 2026?',
      answer:
        `The maximum total Monthly Salary Credit (MSC) is ₱${phRates.sssMaxTotalMsc.toLocaleString()}, which consists of a ₱${phRates.sssRegularMscCap.toLocaleString()} regular social security cap and a ₱${(phRates.sssMaxTotalMsc - phRates.sssRegularMscCap).toLocaleString()} WISP mandatory provident fund allocation.`,
    },
    {
      question: 'Who pays the Employees’ Compensation (EC) contribution?',
      answer:
        'The Employees’ Compensation (EC) contribution is paid 100% by the employer to fund workplace injury and disability benefits. It is ₱10 for Monthly Salary Credits below ₱15,000 and ₱30 for MSCs of ₱15,000 and above. Zero EC is deducted from the employee’s salary.',
    },
  ];

  const workedExamples: WorkedExampleItem[] = [
    {
      title: 'Monthly Salary Below WISP Threshold: ₱18,000 Compensation',
      scenario:
        'A retail supervisor earns ₱18,000 monthly compensation. Their salary falls entirely within the regular Monthly Salary Credit brackets.',
      inputs: [
        { label: 'Monthly Salary', value: '₱18,000.00' },
        { label: 'Assigned MSC Bracket', value: '₱18,000.00' },
        { label: 'Contribution Split', value: '5% Employee / 10% Employer' },
      ],
      steps: [
        { label: 'Regular Employee Share (5%)', formula: '₱18,000 × 5%', value: '₱900.00', highlight: true },
        { label: 'Regular Employer Share (10%)', formula: '₱18,000 × 10%', value: '₱1,800.00' },
        { label: 'WISP Contribution (MSC ≤ ₱20k)', formula: 'No WISP portion applies', value: '₱0.00' },
        { label: 'EC Employer Contribution', formula: 'MSC ≥ ₱15,000 tier', value: '₱30.00' },
      ],
      resultLabel: 'Total Combined SSS Contribution',
      resultValue: '₱2,730.00',
      notes: 'Employee salary deduction: exactly ₱900.00.',
    },
    {
      title: 'Monthly Salary Above WISP Threshold: ₱32,000 Compensation',
      scenario:
        'A software engineer earns ₱32,000 monthly compensation, triggering both regular social security and mandatory WISP allocations.',
      inputs: [
        { label: 'Monthly Salary', value: '₱32,000.00' },
        { label: 'Total Assigned MSC', value: '₱32,000.00' },
        { label: 'Regular MSC vs WISP Split', value: '₱20,000 Regular / ₱12,000 WISP' },
      ],
      steps: [
        { label: 'Regular EE Share (5% of ₱20k)', formula: '₱20,000 × 5%', value: '₱1,000.00' },
        { label: 'WISP EE Share (5% of ₱12k)', formula: '₱12,000 × 5%', value: '₱600.00', highlight: true },
        { label: 'Total Employee Deduction', formula: '₱1,000 + ₱600', value: '₱1,600.00', highlight: true },
        { label: 'Regular ER Share (10% of ₱20k)', formula: '₱20,000 × 10%', value: '₱2,000.00' },
        { label: 'WISP ER Share (10% of ₱12k)', formula: '₱12,000 × 10%', value: '₱1,200.00' },
        { label: 'EC Employer Share', formula: 'Official EC schedule', value: '₱30.00' },
      ],
      resultLabel: 'Total SSS Remittance',
      resultValue: '₱4,830.00',
      notes: 'Employee pays ₱1,600.00; Employer pays ₱3,230.00.',
    },
  ];

  const officialSources: OfficialSourceLink[] = [
    {
      name: 'Social Security System (SSS)',
      documentTitle: 'Republic Act No. 11199 (Social Security Act of 2018) & Circular No. 2024-006',
      url: 'https://www.sss.gov.ph',
      verifiedDate: phRates.verifiedDate,
    },
    {
      name: 'Official Gazette of the Republic of the Philippines',
      documentTitle: 'Implementing Rules and Regulations of the Social Security Act of 2018',
      url: 'https://www.officialgazette.gov.ph',
      verifiedDate: phRates.verifiedDate,
    },
  ];

  const toc = [
    { id: 'reform-roadmap', label: 'The RA 11199 Reform Roadmap (2019–2026)' },
    { id: '15-percent-split', label: 'The 15% Contribution Rate & Split' },
    { id: 'msc-expansion', label: 'Expansion of the Monthly Salary Credit to ₱35,000' },
    { id: 'wisp-explained', label: 'How WISP (Workers’ Investment and Savings Program) Works' },
    { id: 'ec-rules', label: 'Employees’ Compensation (EC) Program Rates' },
    { id: 'self-employed-voluntary', label: 'Impact on Self-Employed, Voluntary & OFW Members' },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <StructuredData
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Philippines', url: '/philippines/' },
          { name: 'Guides', url: '/philippines/' },
          { name: 'SSS Contribution Changes', url: '/philippines/guides/sss-contribution-changes/' },
        ]}
        article={{
          headline: 'SSS Contribution Changes Explained: 15% Rate, MSC & WISP (2026)',
          description: 'A comprehensive review of the RA 11199 roadmap, the 15% contribution rate, the ₱35,000 MSC cap, and mandatory WISP savings in the Philippines.',
          url: 'https://pay.zetawala.com/philippines/guides/sss-contribution-changes/',
          datePublished: '2026-01-10T08:00:00+08:00',
          dateModified: '2026-11-18T00:00:00+08:00',
        }}
        faqs={faqs}
      />

      <Breadcrumbs
        items={[
          { label: 'Philippines', href: '/philippines/' },
          { label: 'Guides', href: '/philippines/' },
          { label: 'SSS Contribution Changes' },
        ]}
      />

      <header className="border-b border-neutral-200 pb-6 pt-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft px-3 py-1 text-xs font-semibold text-brand-strong mb-2">
          <TrendingUp className="h-3.5 w-3.5 text-brand" />
          <span>Statutory Reform Analysis</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
          SSS Contribution Rate Changes Explained
        </h1>
        <p className="mt-2 text-sm sm:text-base text-neutral-600 leading-relaxed">
          The legal background of the {(phRates.sssTotalRate * 100).toFixed(0)}% SSS contribution rate, the ₱{phRates.sssMaxTotalMsc.toLocaleString()} Monthly Salary Credit ceiling, and the Mandatory Provident Fund (WISP) under Republic Act No. 11199.
        </p>
      </header>

      {/* Action Banner */}
      <div className="mt-6 rounded-xl border border-brand/30 bg-brand-soft/20 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-bold text-neutral-900">Look up your exact 2026 SSS deductions</h2>
          <p className="text-xs text-neutral-600">Search the official table or compute your split with our interactive tools.</p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/philippines/sss-contribution-calculator/"
            className="inline-flex items-center gap-1.5 rounded-lg bg-brand px-3.5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-brand-strong transition-colors"
          >
            <Calculator className="h-3.5 w-3.5" />
            <span>SSS Calculator</span>
          </Link>
          <Link
            href="/philippines/sss-contribution-table/"
            className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-300 bg-white px-3.5 py-2 text-xs font-semibold text-neutral-800 shadow-xs hover:bg-neutral-50 transition-colors"
          >
            <Table className="h-3.5 w-3.5 text-neutral-600" />
            <span>Full SSS Table</span>
          </Link>
        </div>
      </div>

      <SeoArticle
        quickAnswer={`Under Republic Act No. 11199, the SSS contribution rate is ${(phRates.sssTotalRate * 100).toFixed(0)}%, split 5% employee and 10% employer. The Monthly Salary Credit (MSC) spans from ₱${phRates.sssMinMsc.toLocaleString()} to ₱${phRates.sssMaxTotalMsc.toLocaleString()}. Monthly compensation above ₱${phRates.sssRegularMscCap.toLocaleString()} is channeled into the Mandatory Provident Fund (WISP), securing higher retirement pensions.`}
        toc={toc}
        workedExamples={workedExamples}
        sources={officialSources}
        verifiedDate={phRates.verifiedDate}
      >
        <section id="reform-roadmap" className="space-y-4">
          <h2>The RA 11199 Reform Roadmap (2019–2026)</h2>
          <p>
            When Congress passed Republic Act No. 11199 (the Social Security Act of 2018), it enacted a multi-year statutory schedule to restore the long-term actuarial solvency of the SSS pension fund. In 2017, the SSS pension fund was projected to deplete by 2032 following an across-the-board ₱1,000 monthly benefit increase granted to pensioners under Executive Order No. 54.
          </p>
          <p>
            To extend the fund&apos;s life past 2050, the law instituted graduated contribution increases and ceiling adjustments every two years:
          </p>
          <div className="overflow-x-auto rounded-lg border border-neutral-200 my-4">
            <table className="w-full text-left text-sm text-neutral-700">
              <thead className="bg-neutral-100 text-xs font-bold uppercase text-neutral-800">
                <tr>
                  <th className="px-4 py-3">Effective Year</th>
                  <th className="px-4 py-3">Total Rate</th>
                  <th className="px-4 py-3">Employee Share</th>
                  <th className="px-4 py-3">Employer Share</th>
                  <th className="px-4 py-3">Max Total MSC</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                <tr>
                  <td className="px-4 py-3 font-medium">2019</td>
                  <td className="px-4 py-3">12.0%</td>
                  <td className="px-4 py-3">4.0%</td>
                  <td className="px-4 py-3">8.0%</td>
                  <td className="px-4 py-3">₱20,000</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">2021</td>
                  <td className="px-4 py-3">13.0%</td>
                  <td className="px-4 py-3">4.5%</td>
                  <td className="px-4 py-3">8.5%</td>
                  <td className="px-4 py-3">₱25,000 (WISP begins)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">2023</td>
                  <td className="px-4 py-3">14.0%</td>
                  <td className="px-4 py-3">4.5%</td>
                  <td className="px-4 py-3">9.5%</td>
                  <td className="px-4 py-3">₱30,000</td>
                </tr>
                <tr className="bg-brand-soft/30 font-semibold text-brand-strong">
                  <td className="px-4 py-3 font-bold">2025 / 2026 (In Force)</td>
                  <td className="px-4 py-3">15.0%</td>
                  <td className="px-4 py-3">5.0%</td>
                  <td className="px-4 py-3">10.0%</td>
                  <td className="px-4 py-3">₱35,000 (Final Tier)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            The 15% rate is the final scheduled increase mandated under RA 11199. There are no additional automatic statutory increases scheduled for subsequent years.
          </p>
        </section>

        <section id="15-percent-split" className="space-y-4">
          <h2>The 15% Contribution Rate &amp; Split</h2>
          <p>
            For private-sector formally employed workers, the 15% contribution is split in a <strong>1:2 ratio</strong>:
          </p>
          <ul>
            <li><strong>Employee Share (5.0%):</strong> Deducted directly from the worker&apos;s semi-monthly or monthly basic wage through automated payroll processing.</li>
            <li><strong>Employer Share (10.0%):</strong> Paid directly by the employing company as part of mandatory statutory labor overhead.</li>
          </ul>
          <p>
            In addition to the 10.0% social security share, employers must remit the mandatory Employees&apos; Compensation (EC) premium (₱10 to ₱30 per employee), which finances medical, disability, and death benefits for job-connected sickness or injuries.
          </p>
        </section>

        <section id="msc-expansion" className="space-y-4">
          <h2>Expansion of the Monthly Salary Credit to ₱35,000</h2>
          <p>
            The Monthly Salary Credit (MSC) is the foundational benchmark for all SSS benefit computations, including retirement pensions, maternity leave benefits, sickness daily allowances, disability benefits, and salary loan ceilings.
          </p>
          <p>
            Historically capped at ₱16,000 prior to RA 11199, the maximum MSC has progressively risen to <strong>₱35,000</strong>. This expansion ensures that middle-class professionals and high-earning corporate employees receive social protection benefits that reflect their actual income levels, rather than being limited by outdated historical caps.
          </p>
        </section>

        <section id="wisp-explained" className="space-y-4">
          <h2>How WISP (Workers’ Investment and Savings Program) Works</h2>
          <p>
            A crucial feature of the expanded SSS schedule is the division between the Regular Social Security Program and the <strong>Workers’ Investment and Savings Program (WISP)</strong>:
          </p>
          <ul>
            <li><strong>Regular SSS (MSC up to ₱20,000):</strong> Contributions on the first ₱20,000 of compensation fund the defined-benefit retirement pension, sickness, maternity, disability, and death benefits.</li>
            <li><strong>WISP Mandatory Provident Fund (MSC between ₱20,001 and ₱35,000):</strong> Contributions above the ₱20,000 cap are placed into an individual defined-contribution retirement account managed by the SSS Investment Management Group.</li>
          </ul>
          <p>
            WISP contributions are invested primarily in government securities, corporate bonds, and blue-chip equities. Earnings generated are credited annually to the member&apos;s account tax-free. Upon retirement, the member receives their accumulated WISP savings and investment returns either as an additional monthly annuity or as a lump-sum payout, paid on top of their regular lifelong SSS pension.
          </p>
        </section>

        <section id="ec-rules" className="space-y-4">
          <h2>Employees’ Compensation (EC) Program Rates</h2>
          <p>
            The State Insurance Fund, administered by the Employees&apos; Compensation Commission (ECC) through the SSS, provides compensation packages for work-contingent physical injuries, occupational illnesses, or demise:
          </p>
          <ul>
            <li>For Monthly Salary Credits below ₱15,000: <strong>₱10.00 per month</strong> (paid entirely by the employer).</li>
            <li>For Monthly Salary Credits of ₱15,000 and above: <strong>₱30.00 per month</strong> (paid entirely by the employer).</li>
          </ul>
          <p>
            Employees never contribute to the EC fund. Any employer attempting to deduct EC premiums from an employee&apos;s paycheck violates Article 170 of the Labor Code.
          </p>
        </section>

        <section id="self-employed-voluntary" className="space-y-4">
          <h2>Impact on Self-Employed, Voluntary &amp; OFW Members</h2>
          <p>
            Self-employed individuals, freelance consultants, voluntary contributors, and Non-Working Spouses do not have an employer to subsidize their contributions. Consequently, they pay the full <strong>15.0% contribution rate</strong> out of pocket.
          </p>
          <p>
            For Overseas Filipino Workers (OFWs), mandatory SSS coverage applies under RA 11199. Land-based OFWs are treated as voluntary/self-employed members with a minimum Monthly Salary Credit of ₱8,000 (equivalent to a minimum monthly contribution of ₱1,200). Sea-based OFWs (seafarers) are classified as formally employed workers whose manning agencies/employers contribute the standard 10% employer share.
          </p>
        </section>
      </SeoArticle>
    </div>
  );
}
