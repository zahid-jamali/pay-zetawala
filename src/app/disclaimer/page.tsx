import React from 'react';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { StructuredData } from '@/components/StructuredData';
import { AlertTriangle, ShieldCheck, Scale, Landmark, GraduationCap } from 'lucide-react';
import { siteConfig } from '@/config/site';

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <Breadcrumbs items={[{ label: 'Disclaimer' }]} />
      <StructuredData
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Disclaimer', url: '/disclaimer/' },
        ]}
      />

      <div className="border-b border-neutral-200 pb-8 pt-2">
        <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800 mb-3 border border-amber-200">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <span>Informational Notice</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
          Financial, Legal &amp; Academic Disclaimer
        </h1>
        <p className="mt-2 text-xs text-neutral-500">Last updated: November 18, 2026</p>
      </div>

      <div className="mt-8 space-y-8 text-sm text-neutral-700 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
            <Scale className="h-5 w-5 text-brand" />
            <span>1. Informational &amp; Estimation Scope</span>
          </h2>
          <p>
            The tools, calculators, schedules, tables, articles, and frequently asked questions provided on <strong>{siteConfig.brandName}</strong> (accessible at <code>https://pay.zetawala.com</code>) are designed and published strictly for general educational, personal estimation, and financial planning purposes.
          </p>
          <p>
            Nothing contained on this website constitutes legal, certified public accounting (CPA), financial, taxation, investment, or academic advisory services. You should not rely on calculations provided by this site as an official substitute for certified enterprise payroll software, professional legal counsel, or formal academic consultation.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
            <Landmark className="h-5 w-5 text-brand" />
            <span>2. Payroll, Taxation &amp; Regulatory Filings (Philippines)</span>
          </h2>
          <p>
            While our Philippine calculators implement the official statutory contribution rates and brackets for the Social Security System (SSS), Philippine Health Insurance Corporation (PhilHealth), Home Development Mutual Fund (Pag-IBIG), and Bureau of Internal Revenue (BIR TRAIN Law):
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-neutral-600">
            <li>Actual net pay may be affected by specific company policies, de minimis allowance thresholds, taxable fringe benefits, tardiness deductions, or collective bargaining agreements.</li>
            <li>Employer payroll disbursements, Remittance Returns (BIR Form 1601-C), and statutory reports must be prepared in accordance with official portals (My.SSS, PhilHealth Electronic Premium Remittance System, Pag-IBIG Electronic Submission, BIR eFPS).</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-brand" />
            <span>3. Mobile Money &amp; Digital Credit (Kenya &amp; Uganda)</span>
          </h2>
          <p>
            Mobile money fees, agent withdrawal tariffs, Fuliza overdraft maintenance charges, and M-Shwari loan terms are calculated from published consumer schedules (Safaricom PLC, NCBA Bank Kenya, MTN Uganda, Airtel Uganda) and applicable tax legislation (Kenya Finance Act, Uganda Excise Duty Act):
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-neutral-600">
            <li>Telecom operators and banking partners reserve the legal right to revise transaction tariffs, access fees, or credit limits at any time under regulatory guidelines.</li>
            <li>For real-time account balances, credit limits, reversal requests, or tariff disputes, users must rely on operator USSD menus (*334#, *165#, *185#), official mobile applications, or authorized customer care desks.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-brand" />
            <span>4. Academic Records &amp; Degree Classification (Nigeria)</span>
          </h2>
          <p>
            The CGPA, GPA, and degree classification tools follow the standard Benchmark Minimum Academic Standards set by the National Universities Commission (NUC 5.0 scale) and the National Board for Technical Education (NBTE 4.0 scale):
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-neutral-600">
            <li>Individual universities, polytechnics, and faculties maintain their own academic regulations regarding carryover scoring, grade replacement, probation thresholds, and credit unit ceilings.</li>
            <li>Your official academic standing is determined exclusively by your institution’s Senate and Registrar. The results generated by our calculators do not constitute an official transcript or statement of results.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-neutral-900">5. Independent Operation &amp; Non-Affiliation</h2>
          <p>
            <strong>{siteConfig.brandName}</strong> is an independent digital publication developed and maintained by the Zetawala network. {siteConfig.brandName} is not affiliated with, authorized by, sponsored by, or endorsed by any government department, public revenue authority, central bank, telecommunications provider, or university mentioned on the site. All registered trademarks, logos, brand names, and statutory titles remain the exclusive property of their respective legal owners.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-neutral-900">6. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by applicable law, {siteConfig.brandName}, its maintainers, and parent network Zetawala disclaim all warranties, express or implied, regarding the accuracy, completeness, or fitness for a particular purpose of the information provided. Under no circumstances shall {siteConfig.brandName} be liable for any direct, indirect, incidental, or consequential loss arising from the use of, or inability to use, our calculations or content.
          </p>
          <p>
            For questions, rate corrections, or further clarification on our calculation models, please visit our <Link href="/methodology/" className="text-brand-strong underline hover:text-brand">Calculation Methodology</Link> or reach out via our <Link href="/contact/" className="text-brand-strong underline hover:text-brand">Contact Page</Link>.
          </p>
        </section>
      </div>
    </div>
  );
}
