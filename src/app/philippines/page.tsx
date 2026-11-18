import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { getPagesByCountry } from '@/config/pages';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { FaqAccordion } from '@/components/FaqAccordion';
import { ArrowRight, ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Philippines Payroll & Contribution Calculators 2026 | Pay',
  description:
    'Free Philippines calculators for Salary Net Pay, SSS 15% rate, PhilHealth 5%, Pag-IBIG ₱200 cap, BIR TRAIN withholding tax, and 13th month pay.',
};

export default function PhilippinesHubPage() {
  const tools = getPagesByCountry('ph').filter(p => p.type === 'tool');
  const infoPages = getPagesByCountry('ph').filter(p => p.type === 'info');

  const faqs = [
    {
      question: 'What is the SSS contribution rate in 2026?',
      answer:
        'The total SSS contribution rate is <strong>15.0%</strong> (10% employer share, 5% employee share), which took effect on January 1, 2025 pursuant to the Social Security Act of 2018 (RA 11199). The Monthly Salary Credit (MSC) ceiling is ₱35,000, with regular social security capped at ₱20,000 and the excess (₱20,001 to ₱35,000) credited to the Mandatory Provident Fund (WISP).',
    },
    {
      question: 'What is the PhilHealth premium rate in 2026?',
      answer:
        'The PhilHealth premium rate is <strong>5.0%</strong> of the monthly basic salary, split equally (2.5% employee, 2.5% employer) under PhilHealth Advisory No. 2025-0002. The income floor is ₱10,000 (minimum premium of ₱500) and the monthly income ceiling is ₱100,000 (maximum premium of ₱5,000).',
    },
    {
      question: 'What is the Pag-IBIG monthly savings rate?',
      answer:
        'Under Pag-IBIG Circular No. 460, the maximum fund salary used for calculation is ₱10,000, resulting in a maximum monthly mandatory contribution of <strong>₱200 for the employee</strong> and ₱200 for the employer (total ₱400).',
    },
    {
      question: 'How does the TRAIN Law withholding tax work?',
      answer:
        'Under Republic Act No. 10963 (TRAIN Law) as revised by BIR Revenue Regulations No. 11-2018, individual compensation earners with taxable income of ₱20,833.33 or less per month (₱250,000 annually) pay <strong>₱0 withholding tax</strong>. Mandatory SSS, PhilHealth, Pag-IBIG contributions, and the ₱90,000 13th-month pay ceiling are fully deducted before tax.',
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <Breadcrumbs items={[{ label: 'Philippines' }]} />

      <div className="border-b border-neutral-200 pb-8 pt-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft px-3 py-1 text-xs font-semibold text-brand-strong mb-3">
          <ShieldCheck className="h-3.5 w-3.5 text-brand" />
          <span>Updated for 2026 Statutory Schedules</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
          Philippines Payroll & Mandatory Contribution Calculators
        </h1>
        <p className="mt-3 text-base text-neutral-600 max-w-3xl leading-relaxed">
          Accurate, verified computational tools for Philippine employees, HR payroll professionals, self-employed freelancers, OFWs, and household employers. Fully compliant with RA 11199, PhilHealth 2025/2026 advisories, Pag-IBIG Circular 460, and BIR TRAIN Law.
        </p>
      </div>

      {/* Main Tools Grid */}
      <div className="mt-10">
        <h2 className="text-xl font-bold text-neutral-900 mb-6">
          Calculators & Interactive Tools
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {tools.map(tool => (
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
              <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-brand-strong">
                <span>Open calculator</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Official Tables & Reference Guides */}
      <div className="mt-12">
        <h2 className="text-xl font-bold text-neutral-900 mb-6">
          Official Reference Tables & Gazettes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {infoPages.map(page => (
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

      {/* Primary Law Highlights */}
      <div className="mt-12 rounded-xl border border-neutral-200 bg-neutral-50 p-6 sm:p-8">
        <h2 className="text-lg font-bold text-neutral-900 mb-4">
          Key Philippines Statutory Rules in Force (2026)
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-neutral-700 leading-relaxed">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-brand shrink-0 mt-0.5" />
            <div>
              <strong>SSS RA 11199:</strong> 15% contribution rate applies. The ₱35,000 MSC maximum is partitioned into ₱20,000 Regular Social Security and ₱15,000 Mandatory Provident Fund (WISP).
            </div>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-brand shrink-0 mt-0.5" />
            <div>
              <strong>PhilHealth 5.0%:</strong> 50/50 employer-employee split. ₱10,000 floor (₱500 min) and ₱100,000 ceiling (₱5,000 max).
            </div>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-brand shrink-0 mt-0.5" />
            <div>
              <strong>Pag-IBIG Fund:</strong> Maximum monthly fund salary of ₱10,000 caps employee and employer contributions at ₱200.00 each.
            </div>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-brand shrink-0 mt-0.5" />
            <div>
              <strong>13th Month Pay (PD 851):</strong> Payable on or before December 24. First ₱90,000 of 13th month and other benefits is 100% tax-exempt.
            </div>
          </div>
        </div>
      </div>

      <FaqAccordion faqs={faqs} />
    </div>
  );
}
