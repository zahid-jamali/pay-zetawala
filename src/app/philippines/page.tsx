import React from 'react';
import Link from 'next/link';
import { getPagesByCountry } from '@/config/pages';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { FaqAccordion } from '@/components/FaqAccordion';
import { StructuredData } from '@/components/StructuredData';
import { getPhRates } from '@/lib/seo/rules-content';
import { ArrowRight, ShieldCheck, FileText, CheckCircle2, Calculator, BookOpen, HelpCircle } from 'lucide-react';

export default function PhilippinesHubPage() {
  const phRates = getPhRates();
  const tools = getPagesByCountry('ph').filter((p) => p.type === 'tool');
  const infoPages = getPagesByCountry('ph').filter((p) => p.type === 'info');
  const guides = getPagesByCountry('ph').filter((p) => p.type === 'guide');

  const faqs = [
    {
      question: 'What is the SSS contribution rate in 2026?',
      answer:
        `The total SSS contribution rate is ${(phRates.sssTotalRate * 100).toFixed(1)}% (${(phRates.sssErRate * 100).toFixed(1)}% employer share, ${(phRates.sssEeRate * 100).toFixed(1)}% employee share) pursuant to the Social Security Act of 2018 (RA 11199). The Monthly Salary Credit (MSC) ceiling is ₱${phRates.sssMaxTotalMsc.toLocaleString()}, with regular social security capped at ₱${phRates.sssRegularMscCap.toLocaleString()} and the excess credited to the Mandatory Provident Fund (WISP).`,
    },
    {
      question: 'What is the PhilHealth premium rate in 2026?',
      answer:
        `The PhilHealth premium rate is ${(phRates.philhealthTotalRate * 100).toFixed(1)}% of monthly basic salary, split equally (${(phRates.philhealthEeRate * 100).toFixed(1)}% employee, ${(phRates.philhealthErRate * 100).toFixed(1)}% employer). The monthly income floor is ₱${phRates.philhealthFloor.toLocaleString()} (₱500 min premium) and the ceiling is ₱${phRates.philhealthCeiling.toLocaleString()} (₱5,000 max premium).`,
    },
    {
      question: 'What is the Pag-IBIG monthly savings rate?',
      answer:
        `Under Pag-IBIG Circular No. 460, the maximum fund salary used for calculation is ₱${phRates.pagibigMaxMfs.toLocaleString()}, resulting in a maximum monthly mandatory contribution of ₱${phRates.pagibigMaxEeContribution.toFixed(2)} for the employee and ₱${phRates.pagibigMaxErContribution.toFixed(2)} for the employer (total ₱400.00).`,
    },
    {
      question: 'How does the TRAIN Law withholding tax work?',
      answer:
        `Under the TRAIN Law (RA 10963), individual compensation earners with monthly taxable income of ₱${phRates.taxExemptMonthly.toLocaleString()} or less (₱${phRates.taxExemptAnnual.toLocaleString()} annually) pay ₱0 withholding tax. Mandatory SSS, PhilHealth, Pag-IBIG contributions, and the ₱${phRates.taxExempt13thCeiling.toLocaleString()} 13th-month pay ceiling are fully deducted before tax.`,
    },
    {
      question: 'When must Philippine employers pay 13th-month pay?',
      answer:
        'Under Presidential Decree No. 851, employers must disburse the mandatory 13th-month pay to all eligible rank-and-file employees on or before December 24. No exemptions or deferrals are permitted under DOLE regulations.',
    },
    {
      question: 'Can household employers use these calculators for Kasambahay payroll?',
      answer:
        'Yes. Domestic workers (Kasambahay) are covered by SSS, PhilHealth, Pag-IBIG, and 13th-month pay under Republic Act No. 10361. If their monthly wage is below ₱5,000, the household employer pays 100% of PhilHealth premiums.',
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <StructuredData
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Philippines', url: '/philippines/' },
        ]}
        faqs={faqs}
      />

      <Breadcrumbs items={[{ label: 'Philippines' }]} />

      <div className="border-b border-neutral-200 pb-8 pt-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft px-3 py-1 text-xs font-semibold text-brand-strong mb-3">
          <ShieldCheck className="h-3.5 w-3.5 text-brand" />
          <span>Statutory Rates Verified for 2026</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
          Philippines Payroll &amp; Tax Calculators 2026
        </h1>
        <p className="mt-3 text-base text-neutral-600 max-w-3xl leading-relaxed">
          Accurate, verified computational tools for Philippine employees, HR payroll professionals, self-employed freelancers, OFWs, and household employers. Fully compliant with RA 11199, PhilHealth advisories, Pag-IBIG Circular 460, and the BIR TRAIN Law.
        </p>
      </div>

      {/* Statutory Rates Summary Table */}
      <div className="mt-8 rounded-xl border border-neutral-200 bg-white p-6 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-neutral-100 gap-2">
          <div>
            <h2 className="text-base font-bold text-neutral-900">Current Philippines Statutory Rates in Force</h2>
            <p className="text-xs text-neutral-500">Official figures from SSS, PhilHealth, Pag-IBIG Fund, and BIR</p>
          </div>
          <span className="text-2xs font-semibold text-neutral-400">Verified: {phRates.verifiedDate}</span>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-xs text-neutral-700">
            <thead className="bg-neutral-50 text-neutral-800 uppercase font-bold text-2xs">
              <tr>
                <th className="py-2.5 px-3">Statutory Program</th>
                <th className="py-2.5 px-3">Employee Share</th>
                <th className="py-2.5 px-3">Employer Share</th>
                <th className="py-2.5 px-3">Total Rate / Cap</th>
                <th className="py-2.5 px-3">Governing Law</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              <tr>
                <td className="py-2.5 px-3 font-semibold text-neutral-900">Social Security System (SSS)</td>
                <td className="py-2.5 px-3">{(phRates.sssEeRate * 100).toFixed(1)}% (max ₱1,750)</td>
                <td className="py-2.5 px-3">{(phRates.sssErRate * 100).toFixed(1)}% + ₱10–30 EC</td>
                <td className="py-2.5 px-3 font-bold text-brand">{(phRates.sssTotalRate * 100).toFixed(1)}% (₱35k MSC cap)</td>
                <td className="py-2.5 px-3 text-neutral-500">RA 11199</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-neutral-900">PhilHealth</td>
                <td className="py-2.5 px-3">{(phRates.philhealthEeRate * 100).toFixed(1)}% (max ₱2,500)</td>
                <td className="py-2.5 px-3">{(phRates.philhealthErRate * 100).toFixed(1)}% (max ₱2,500)</td>
                <td className="py-2.5 px-3 font-bold text-brand">{(phRates.philhealthTotalRate * 100).toFixed(1)}% (₱10k flr / ₱100k clg)</td>
                <td className="py-2.5 px-3 text-neutral-500">RA 11223 (UHC Act)</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-neutral-900">Pag-IBIG Fund (HDMF)</td>
                <td className="py-2.5 px-3">2.0% (max ₱200.00)</td>
                <td className="py-2.5 px-3">2.0% (max ₱200.00)</td>
                <td className="py-2.5 px-3 font-bold text-brand">₱400.00 total monthly cap</td>
                <td className="py-2.5 px-3 text-neutral-500">Circular No. 460</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-neutral-900">BIR Income Tax (TRAIN)</td>
                <td className="py-2.5 px-3">0% up to ₱20,833/mo</td>
                <td className="py-2.5 px-3">N/A (Employee withholding)</td>
                <td className="py-2.5 px-3 font-bold text-brand">₱250,000 annual exemption</td>
                <td className="py-2.5 px-3 text-neutral-500">RA 10963</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-neutral-900">13th Month Tax Ceiling</td>
                <td className="py-2.5 px-3">100% tax-free up to cap</td>
                <td className="py-2.5 px-3">Mandatory rank-and-file</td>
                <td className="py-2.5 px-3 font-bold text-brand">₱{phRates.taxExempt13thCeiling.toLocaleString()} tax-exempt ceiling</td>
                <td className="py-2.5 px-3 text-neutral-500">PD 851 &amp; NIRC Sec 32</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Main Tools Grid */}
      <div className="mt-10">
        <h2 className="text-xl font-bold text-neutral-900 mb-6 flex items-center gap-2">
          <Calculator className="h-5 w-5 text-brand" />
          <span>Calculators &amp; Interactive Tools</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {tools.map((tool) => (
            <Link
              key={tool.id}
              href={tool.path}
              className="group flex flex-col justify-between rounded-xl border border-neutral-200 bg-white p-6 shadow-2xs hover:border-brand-strong hover:shadow-md transition-all"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-neutral-500 mb-2">
                  <span>{tool.category}</span>
                  <span className="text-brand-strong font-bold">2026</span>
                </div>
                <h3 className="text-lg font-bold text-neutral-900 group-hover:text-brand-strong transition-colors">
                  {tool.shortTitle}
                </h3>
                <p className="mt-2 text-xs text-neutral-600 leading-relaxed">
                  {tool.description}
                </p>
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-neutral-100 pt-3">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-strong">
                  <span>Calculate Now</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Official Tables & Reference Guides */}
      <div className="mt-12">
        <h2 className="text-xl font-bold text-neutral-900 mb-6 flex items-center gap-2">
          <FileText className="h-5 w-5 text-brand" />
          <span>Official Reference Tables</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {infoPages.map((page) => (
            <Link
              key={page.id}
              href={page.path}
              className="group flex items-start gap-4 rounded-xl border border-neutral-200 bg-white p-5 shadow-2xs hover:border-brand-strong hover:shadow-sm transition-all"
            >
              <div className="rounded-lg bg-neutral-100 p-3 text-neutral-700 group-hover:bg-brand-soft group-hover:text-brand-strong transition-colors shrink-0">
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-neutral-900 group-hover:text-brand-strong transition-colors">
                  {page.shortTitle}
                </h3>
                <p className="mt-1 text-xs text-neutral-600 leading-relaxed">
                  {page.description}
                </p>
                <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-brand-strong">
                  <span>View full official table</span>
                  <ArrowRight className="h-3 w-3" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Comprehensive Guides */}
      <div className="mt-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-brand" />
            <span>In-Depth Statutory &amp; Payroll Guides ({guides.length})</span>
          </h2>
          <Link
            href="/philippines/faq/"
            className="text-xs font-semibold text-brand-strong hover:underline flex items-center gap-1"
          >
            <span>View All PH FAQs</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {guides.map((g) => (
            <Link
              key={g.id}
              href={g.path}
              className="group rounded-xl border border-neutral-200 bg-white p-4 shadow-2xs hover:border-brand-strong hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-2xs font-bold uppercase tracking-wider text-neutral-400 block mb-1">
                  Guide
                </span>
                <h3 className="text-sm font-bold text-neutral-900 group-hover:text-brand-strong transition-colors line-clamp-2">
                  {g.shortTitle}
                </h3>
                <p className="mt-1.5 text-2xs text-neutral-600 line-clamp-3 leading-relaxed">
                  {g.description}
                </p>
              </div>
              <span className="mt-3 inline-flex items-center gap-1 text-2xs font-semibold text-brand-strong">
                <span>Read article</span>
                <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* FAQ Hub Link Banner */}
      <div className="mt-12 rounded-xl border border-brand/20 bg-brand-soft/30 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-brand-strong mb-1">
            <HelpCircle className="h-4 w-4 text-brand" />
            <span>Have a specific payroll or contribution question?</span>
          </div>
          <p className="text-xs text-neutral-700">Browse our 30+ categorized FAQs covering SSS, PhilHealth, Pag-IBIG, withholding tax, and 13th month pay.</p>
        </div>
        <Link
          href="/philippines/faq/"
          className="inline-flex items-center gap-1.5 rounded-lg bg-brand px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-brand-strong transition-colors shrink-0"
        >
          <span>Open Philippines FAQ Hub</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="mt-10">
        <FaqAccordion faqs={faqs} />
      </div>
    </div>
  );
}
