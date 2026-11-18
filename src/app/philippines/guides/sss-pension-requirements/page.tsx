import React from 'react';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SeoArticle, WorkedExampleItem, OfficialSourceLink } from '@/components/SeoArticle';
import { StructuredData } from '@/components/StructuredData';
import { getPhRates } from '@/lib/seo/rules-content';
import { Award, Calculator, Clock, HelpCircle, CheckCircle2 } from 'lucide-react';

export default function GuideSssPensionRequirements() {
  const phRates = getPhRates();

  const faqs = [
    {
      question: 'Can I retire at age 60 if I am still actively employed?',
      answer:
        'No. Retirement at age 60 is optional, but it requires that you are separated from employment or have ceased active business operations. If you are still working and receiving a salary, you can only claim your SSS retirement pension upon reaching the mandatory retirement age of 65, at which point employment status no longer matters.',
    },
    {
      question: 'What happens if I reach age 65 with fewer than 120 contributions?',
      answer:
        'If you have paid fewer than 120 monthly contributions, you do not qualify for a lifetime monthly pension. You have two options: (1) claim a one-time lump-sum retirement benefit equal to the total contributions paid by you and your employers plus compounded interest, or (2) continue paying as a voluntary member until you hit exactly 120 contributions to qualify for a lifelong monthly pension.',
    },
    {
      question: 'Do SSS pensioners receive a 13th-month pension?',
      answer:
        'Yes. Every December, all qualified SSS retirement, disability, and survivorship pensioners receive an additional 13th-month pension equal to their basic monthly pension plus the ₱1,000 additional benefit under Executive Order No. 54.',
    },
    {
      question: 'How does the dependent’s pension allowance work?',
      answer:
        'An SSS retirement pensioner is entitled to a dependent’s pension for each qualified dependent minor child (up to five children, starting from the youngest), without substitution. The allowance is equivalent to 10% of the basic monthly pension or ₱250, whichever is higher, per child per month until they reach age 21.',
    },
    {
      question: 'Is SSS retirement pension subject to Philippine income tax?',
      answer:
        'No. Under Section 32(B)(6)(b) of the National Internal Revenue Code, all retirement benefits and pensions received by resident citizens and aliens from the Social Security System are completely exempt from Philippine income tax.',
    },
  ];

  const workedExamples: WorkedExampleItem[] = [
    {
      title: 'Full Monthly Pension: Age 60, 20 CYS with ₱20,000 AMSC',
      scenario:
        'A retiring employee turns 60, separates from work, and has completed 20 Credited Years of Service (240 monthly contributions) with an Average Monthly Salary Credit (AMSC) of ₱20,000.',
      inputs: [
        { label: 'Retirement Age', value: '60 years old (Separated)' },
        { label: 'Credited Years of Service (CYS)', value: '20 years (240 months)' },
        { label: 'Average Monthly Salary Credit (AMSC)', value: '₱20,000.00' },
      ],
      steps: [
        { label: 'Formula 1 (₱300 + 20% AMSC + 2% CYS>10)', formula: '₱300 + ₱4,000 + ₱4,000', value: '₱8,300.00' },
        { label: 'Formula 2 (40% of AMSC)', formula: '40% × ₱20,000', value: '₱8,000.00' },
        { label: 'Formula 3 (Minimum Pension for 20 CYS)', formula: 'Statutory minimum for ≥ 20 CYS', value: '₱2,400.00' },
        { label: 'Selected Basic Pension (Highest)', formula: 'Formula 1 wins', value: '₱8,300.00', highlight: true },
        { label: 'Additional Benefit (EO 54)', formula: 'Mandatory across-the-board add-on', value: '+₱1,000.00' },
      ],
      resultLabel: 'Total Monthly SSS Pension',
      resultValue: '₱9,300.00 / month',
      notes: 'Plus ₱9,300 13th-month pension every December for life.',
    },
    {
      title: 'Lump-Sum Alternative: Age 65 with 84 Contributions',
      scenario:
        'A senior citizen reaches age 65 having contributed for 7 years (84 total monthly contributions) at an average contribution of ₱2,500/month.',
      inputs: [
        { label: 'Member Age', value: '65 years old' },
        { label: 'Total Contributions Paid', value: '84 months (< 120 required)' },
        { label: 'Total Employee + Employer Paid', value: '₱210,000.00' },
      ],
      steps: [
        { label: 'Monthly Pension Eligibility Check', formula: 'Requires ≥ 120 contributions', value: 'Not Qualified (Under 120)' },
        { label: 'Option A: Lump-Sum Payout', formula: 'All contributions paid + interest', value: '₱210,000.00 + Interest', highlight: true },
        { label: 'Option B: Voluntary Continuation', formula: 'Pay remaining 36 months to hit 120', value: 'Gain Lifelong Pension' },
      ],
      resultLabel: 'Immediate Lump-Sum Option',
      resultValue: '₱210,000.00+',
      notes: 'Lump sum extinguishes all future monthly pension rights.',
    },
  ];

  const officialSources: OfficialSourceLink[] = [
    {
      name: 'Social Security System (SSS)',
      documentTitle: 'Retirement Benefit Guidelines & Benefit Primer (RA 11199)',
      url: 'https://www.sss.gov.ph',
      verifiedDate: phRates.verifiedDate,
    },
    {
      name: 'Office of the President of the Philippines',
      documentTitle: 'Executive Order No. 54: Across-the-Board SSS Pension Increase',
      url: 'https://www.officialgazette.gov.ph',
      verifiedDate: phRates.verifiedDate,
    },
  ];

  const toc = [
    { id: 'age-requirements', label: 'Retirement Age Rules: Age 60 vs Age 65' },
    { id: '120-contributions-rule', label: 'The Mandatory 120 Contributions Rule' },
    { id: 'under-120-options', label: 'What Happens If You Have Under 120 Contributions?' },
    { id: 'three-formulas', label: 'The Three Statutory Pension Formulas Explained' },
    { id: 'eo54-and-13th-month', label: 'The ₱1,000 EO 54 Benefit & 13th-Month Pension' },
    { id: 'dependents-allowance', label: 'Dependent’s Pension Allowance Rules' },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <StructuredData
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Philippines', url: '/philippines/' },
          { name: 'Guides', url: '/philippines/' },
          { name: 'SSS Pension Requirements', url: '/philippines/guides/sss-pension-requirements/' },
        ]}
        article={{
          headline: 'SSS Pension Requirements & Eligibility Guide (2026)',
          description: 'A complete breakdown of retirement age rules, the 120 contributions requirement, the 3 statutory pension formulas, and the lump-sum alternative.',
          url: 'https://pay.zetawala.com/philippines/guides/sss-pension-requirements/',
          datePublished: '2026-02-10T08:00:00+08:00',
          dateModified: '2026-11-18T00:00:00+08:00',
        }}
        faqs={faqs}
      />

      <Breadcrumbs
        items={[
          { label: 'Philippines', href: '/philippines/' },
          { label: 'Guides', href: '/philippines/' },
          { label: 'SSS Pension Requirements' },
        ]}
      />

      <header className="border-b border-neutral-200 pb-6 pt-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft px-3 py-1 text-xs font-semibold text-brand-strong mb-2">
          <Award className="h-3.5 w-3.5 text-brand" />
          <span>Retirement Benefits Guide</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
          SSS Pension Requirements &amp; Eligibility Guide
        </h1>
        <p className="mt-2 text-sm sm:text-base text-neutral-600 leading-relaxed">
          The legal qualifications, retirement age conditions, 120-contribution threshold, and official pension computation formulas under Republic Act No. 11199.
        </p>
      </header>

      {/* Calculator Banner */}
      <div className="mt-6 rounded-xl border border-brand/30 bg-brand-soft/20 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-bold text-neutral-900">Estimate your future monthly pension</h2>
          <p className="text-xs text-neutral-600">Simulate your Credited Years of Service (CYS) and Average Monthly Salary Credit to see your payout.</p>
        </div>
        <Link
          href="/philippines/sss-pension-calculator/"
          className="inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-brand-strong transition-colors shrink-0"
        >
          <Calculator className="h-4 w-4" />
          <span>SSS Pension Calculator</span>
        </Link>
      </div>

      <SeoArticle
        quickAnswer="To qualify for a lifetime monthly SSS retirement pension, you must be at least 60 years old (and separated from employment) or 65 years old (even if still working), and have paid at least 120 monthly contributions prior to the semester of retirement. Members with fewer than 120 contributions receive a one-time lump-sum refund of contributions plus interest."
        toc={toc}
        workedExamples={workedExamples}
        sources={officialSources}
        verifiedDate={phRates.verifiedDate}
      >
        <section id="age-requirements" className="space-y-4">
          <h2>Retirement Age Rules: Age 60 vs Age 65</h2>
          <p>
            Under the Social Security Act of 2018 (Republic Act No. 11199), retirement eligibility is divided into two distinct age classifications:
          </p>
          <ul>
            <li>
              <strong>Optional Retirement (Age 60 to 64):</strong> A member may file for retirement benefits upon reaching their 60th birthday, provided they are <strong>separated from employment</strong> or have ceased self-employed business operations. If you continue working, your employer is legally required to keep remitting contributions, and your retirement application will not be approved.
            </li>
            <li>
              <strong>Mandatory Retirement (Age 65 and above):</strong> Upon reaching age 65, retirement is technically deemed mandatory under SSS law. You are entitled to claim your retirement pension regardless of whether you are still employed, consulting, or actively operating a commercial business. SSS contributions cease at age 65.
            </li>
            <li>
              <strong>Underground or Surface Mineworkers:</strong> Under Republic Act No. 10757, mineworkers enjoy an earlier retirement threshold: optional retirement at age 50 and mandatory retirement at age 60, provided they worked underground for at least 5 years.
            </li>
          </ul>
        </section>

        <section id="120-contributions-rule" className="space-y-4">
          <h2>The Mandatory 120 Contributions Rule</h2>
          <p>
            The single most critical threshold in Philippine retirement planning is the <strong>120-month contribution rule</strong> (equivalent to exactly 10 Credited Years of Service).
          </p>
          <p>
            Contributions do not need to be consecutive. An employee who worked for 5 years in their twenties, paused for 10 years, and resumed contributing for 5 years in their fifties accumulates 120 contributions and satisfies the condition.
          </p>
        </section>

        <section id="under-120-options" className="space-y-4">
          <h2>What Happens If You Have Under 120 Contributions?</h2>
          <p>
            If a member reaches age 60 or 65 with only 70, 90, or 110 posted contributions, SSS offers two legal pathways:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
            <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-2xs">
              <h3 className="text-base font-bold text-neutral-900 mb-2">Option 1: Lump-Sum Benefit</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                The member receives a one-time lump-sum payment equal to the total contributions paid by both the employee and employer, plus compounded interest. <strong>Warning:</strong> Accepting the lump-sum extinguishes your membership and permanently forfeits any future lifelong monthly pension and PhilHealth lifetime retiree coverage.
              </p>
            </div>
            <div className="rounded-xl border border-brand/20 bg-brand-soft/40 p-5 shadow-2xs">
              <h3 className="text-base font-bold text-brand-strong mb-2">Option 2: Voluntary Continuation (Recommended)</h3>
              <p className="text-xs text-neutral-700 leading-relaxed">
                Under SSS regulations, a member who has reached age 60 without hitting 120 contributions may continue paying as a <strong>Voluntary Member</strong> until they complete exactly 120 payments. This unlocks a guaranteed lifelong monthly pension that pays back the voluntary investment in just a few years.
              </p>
            </div>
          </div>
        </section>

        <section id="three-formulas" className="space-y-4">
          <h2>The Three Statutory Pension Formulas Explained</h2>
          <p>
            When a member meets all eligibility requirements, the SSS computes their Basic Monthly Pension (BMP) using three statutory formulas established in Section 12 of RA 11199. <strong>The retiree is awarded whichever formula yields the highest monthly amount:</strong>
          </p>
          <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 space-y-3 font-mono text-xs text-neutral-800">
            <div>
              <p className="font-bold text-neutral-900">Formula 1 (Graduated Baseline):</p>
              <p>BMP = ₱300 + (20% × AMSC) + [2% × AMSC × (CYS – 10)]</p>
              <span className="text-2xs font-sans text-neutral-600 block mt-0.5">Most common formula for members with over 15 to 20 years of contributions.</span>
            </div>
            <div className="border-t border-neutral-200 pt-2">
              <p className="font-bold text-neutral-900">Formula 2 (Flat Rate Formula):</p>
              <p>BMP = 40% × AMSC</p>
              <span className="text-2xs font-sans text-neutral-600 block mt-0.5">Applies when Credited Years of Service are closer to the 10-year baseline.</span>
            </div>
            <div className="border-t border-neutral-200 pt-2">
              <p className="font-bold text-neutral-900">Formula 3 (Guaranteed Statutory Minimum):</p>
              <p>₱1,200/mo for 10 to 19 CYS | ₱2,400/mo for ≥ 20 CYS</p>
              <span className="text-2xs font-sans text-neutral-600 block mt-0.5">A statutory floor ensuring no long-term retiree receives below these benchmarks.</span>
            </div>
          </div>
          <p className="text-xs text-neutral-600">
            * <em>AMSC</em> = Average Monthly Salary Credit, which is the higher of: (a) the average of the last 60 monthly salary credits immediately preceding the semester of retirement, or (b) the average of all monthly salary credits from registration up to retirement.
          </p>
        </section>

        <section id="eo54-and-13th-month" className="space-y-4">
          <h2>The ₱1,000 EO 54 Benefit &amp; 13th-Month Pension</h2>
          <p>
            In addition to the Basic Monthly Pension derived from the highest formula above:
          </p>
          <ul>
            <li>
              <strong>₱1,000 Additional Monthly Benefit:</strong> Under Executive Order No. 54, an across-the-board add-on of exactly ₱1,000 is automatically added to every pensioner&apos;s check each month.
            </li>
            <li>
              <strong>13th-Month Pension:</strong> Every December, pensioners receive an extra full month&apos;s pension (inclusive of the ₱1,000 add-on and any dependent allowances) as a holiday benefit.
            </li>
          </ul>
        </section>

        <section id="dependents-allowance" className="space-y-4">
          <h2>Dependent’s Pension Allowance Rules</h2>
          <p>
            If a retiring member has legitimate, legitimated, legally adopted, or acknowledged natural minor children, they receive an extra <strong>Dependent’s Pension</strong>:
          </p>
          <ul>
            <li>The allowance equals <strong>10% of the Basic Monthly Pension</strong> or <strong>₱250.00</strong>, whichever is higher, per dependent child.</li>
            <li>It is paid for a maximum of five (5) minor children, beginning from the youngest, without substitution.</li>
            <li>The child must be unmarried, not gainfully employed, and below 21 years of age (or of any age if permanently incapacitated or disabled from self-support).</li>
          </ul>
        </section>
      </SeoArticle>
    </div>
  );
}
