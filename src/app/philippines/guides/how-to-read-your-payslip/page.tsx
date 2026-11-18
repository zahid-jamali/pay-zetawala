import React from 'react';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SeoArticle, WorkedExampleItem, OfficialSourceLink } from '@/components/SeoArticle';
import { StructuredData } from '@/components/StructuredData';
import { getPhRates } from '@/lib/seo/rules-content';
import { FileText, Calculator, HelpCircle, CheckCircle2 } from 'lucide-react';

export default function GuideHowToReadYourPayslip() {
  const phRates = getPhRates();

  const faqs = [
    {
      question: 'What is the exact mathematical difference between Gross Pay and Basic Pay?',
      answer:
        'Basic Pay is the fixed contracted wage agreed upon in your employment agreement for normal working hours. Gross Pay is the grand total of your basic pay plus all supplemental earnings, including overtime pay, night differential, holiday premiums, performance commissions, and taxable or non-taxable allowances.',
    },
    {
      question: 'What are de minimis benefits on a Philippine payslip?',
      answer:
        'De minimis benefits are facilities or privileges of relatively small value furnished by an employer to promote the health, goodwill, contentment, or efficiency of employees. Common examples include rice subsidy (up to ₱2,000/month), uniform allowance (up to ₱6,000/year), medical cash allowance (up to ₱10,000/year), and laundry allowance (up to ₱300/month). They are 100% exempt from income tax and withholding tax.',
    },
    {
      question: 'In what order are payroll deductions subtracted from salary?',
      answer:
        'Statutory contributions (SSS, PhilHealth, Pag-IBIG) are calculated and subtracted first. The remaining compensation minus non-taxable de minimis benefits constitutes "Taxable Income". BIR withholding tax is calculated on this taxable income. Finally, voluntary deductions (HMO dependents, company loans, union dues) are subtracted to arrive at Net Take-Home Pay.',
    },
    {
      question: 'Why is my semi-monthly payslip different from my full monthly salary?',
      answer:
        'In the Philippines, most employers disburse salaries semi-monthly (15th and 30th of the month). Some companies deduct SSS on the 15th and PhilHealth/Pag-IBIG on the 30th, while others split withholding tax evenly across both payroll cutoffs.',
    },
    {
      question: 'Is an employer legally required to provide a written payslip?',
      answer:
        'Yes. Under the Labor Code of the Philippines and DOLE regulations, employers are legally mandated to issue an itemized pay slip (either physical paper or electronic portal slip) to every worker each payroll period, specifying gross earnings, rates of pay, all deductions made, and net compensation.',
    },
  ];

  const workedExamples: WorkedExampleItem[] = [
    {
      title: 'Entry-Level BPO Specialist (₱22,000 Basic + ₱2,000 Rice Allowance)',
      scenario:
        'A customer care representative earns ₱22,000 basic monthly salary plus a ₱2,000 tax-exempt rice subsidy allowance.',
      inputs: [
        { label: 'Basic Monthly Salary', value: '₱22,000.00' },
        { label: 'De Minimis (Rice Subsidy)', value: '₱2,000.00' },
        { label: 'Total Gross Earnings', value: '₱24,000.00' },
      ],
      steps: [
        { label: 'SSS Employee Share (₱22k MSC bracket)', formula: '5% of regular ₱20k + 5% of ₱2k WISP', value: '₱1,100.00', isDeduction: true },
        { label: 'PhilHealth Employee Share (2.5%)', formula: '₱22,000 × 2.5%', value: '₱550.00', isDeduction: true },
        { label: 'Pag-IBIG Employee Share', formula: 'Statutory maximum cap', value: '₱200.00', isDeduction: true },
        { label: 'Total Non-Taxable Deductions', formula: '₱1,100 + ₱550 + ₱200', value: '₱1,850.00' },
        { label: 'Net Taxable Income', formula: '₱22,000 basic – ₱1,850 statutory', value: '₱20,150.00' },
        { label: 'BIR Withholding Tax (TRAIN Law)', formula: 'Tax-exempt bracket (≤ ₱20,833/mo)', value: '₱0.00 (Zero Tax)' },
      ],
      resultLabel: 'Net Take-Home Pay',
      resultValue: '₱22,150.00 / month',
      notes: 'Gross ₱24,000 – ₱1,850 statutory = ₱22,150 net pay.',
    },
    {
      title: 'Mid-Level Professional (₱65,000 Basic Monthly Salary)',
      scenario:
        'A corporate accounting manager earns ₱65,000 basic monthly salary with standard statutory deductions.',
      inputs: [
        { label: 'Monthly Basic Salary', value: '₱65,000.00' },
        { label: 'Total Gross Income', value: '₱65,000.00' },
      ],
      steps: [
        { label: 'SSS Deduction (Max ₱35k MSC)', formula: '₱1,000 regular + ₱750 WISP', value: '₱1,750.00', isDeduction: true },
        { label: 'PhilHealth Deduction (2.5%)', formula: '₱65,000 × 2.5%', value: '₱1,625.00', isDeduction: true },
        { label: 'Pag-IBIG Deduction', formula: 'Mandatory statutory ceiling', value: '₱200.00', isDeduction: true },
        { label: 'Total Statutory Deductions', formula: '₱1,750 + ₱1,625 + ₱200', value: '₱3,575.00' },
        { label: 'Taxable Income', formula: '₱65,000 – ₱3,575', value: '₱61,425.00' },
        { label: 'BIR Withholding Tax (TRAIN)', formula: '₱2,500 base + 20% of excess over ₱33,333', value: '₱8,118.40', isDeduction: true },
      ],
      resultLabel: 'Net Take-Home Pay',
      resultValue: '₱53,306.60 / month',
      notes: '₱65,000 – ₱3,575 statutory – ₱8,118.40 tax = ₱53,306.60.',
    },
  ];

  const officialSources: OfficialSourceLink[] = [
    {
      name: 'Bureau of Internal Revenue (BIR)',
      documentTitle: 'TRAIN Law Revised Withholding Tax Tables (RR No. 11-2018)',
      url: 'https://www.bir.gov.ph',
      verifiedDate: phRates.verifiedDate,
    },
    {
      name: 'Department of Labor and Employment (DOLE)',
      documentTitle: 'Labor Advisory on Mandatory Issuance of Payslips & Wage Records',
      url: 'https://www.dole.gov.ph',
      verifiedDate: phRates.verifiedDate,
    },
  ];

  const toc = [
    { id: 'gross-vs-basic', label: '1. Basic Pay vs Gross Earnings' },
    { id: 'statutory-deductions', label: '2. Mandatory Statutory Contributions (SSS, PhilHealth, Pag-IBIG)' },
    { id: 'taxable-income', label: '3. Taxable Income & BIR Withholding Tax' },
    { id: 'de-minimis-benefits', label: '4. Non-Taxable De Minimis Allowances' },
    { id: 'voluntary-deductions', label: '5. Voluntary Deductions & Net Take-Home Pay' },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <StructuredData
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Philippines', url: '/philippines/' },
          { name: 'Guides', url: '/philippines/' },
          { name: 'How to Read Your Payslip', url: '/philippines/guides/how-to-read-your-payslip/' },
        ]}
        article={{
          headline: 'How to Read Your Philippine Payslip (2026 Comprehensive Guide)',
          description: 'A line-by-line guide to understanding gross earnings, de minimis benefits, statutory deductions, taxable income, and net take-home pay.',
          url: 'https://pay.zetawala.com/philippines/guides/how-to-read-your-payslip/',
          datePublished: '2026-02-20T08:00:00+08:00',
          dateModified: '2026-11-18T00:00:00+08:00',
        }}
        faqs={faqs}
      />

      <Breadcrumbs
        items={[
          { label: 'Philippines', href: '/philippines/' },
          { label: 'Guides', href: '/philippines/' },
          { label: 'How to Read Your Payslip' },
        ]}
      />

      <header className="border-b border-neutral-200 pb-6 pt-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft px-3 py-1 text-xs font-semibold text-brand-strong mb-2">
          <FileText className="h-3.5 w-3.5 text-brand" />
          <span>Payroll Literacy Guide</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
          How to Read Your Philippine Payslip
        </h1>
        <p className="mt-2 text-sm sm:text-base text-neutral-600 leading-relaxed">
          A line-by-line explanation of gross earnings, de minimis benefits, mandatory SSS, PhilHealth, Pag-IBIG contributions, BIR withholding taxes, and net take-home pay.
        </p>
      </header>

      {/* Tool Shortcut */}
      <div className="mt-6 rounded-xl border border-brand/30 bg-brand-soft/20 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-bold text-neutral-900">Simulate your full payslip breakdown</h2>
          <p className="text-xs text-neutral-600">Enter your gross salary to see all statutory contributions and BIR tax calculated automatically.</p>
        </div>
        <Link
          href="/philippines/salary-calculator/"
          className="inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-brand-strong transition-colors shrink-0"
        >
          <Calculator className="h-4 w-4" />
          <span>Philippine Salary Calculator</span>
        </Link>
      </div>

      <SeoArticle
        quickAnswer="A Philippine payslip has three main sections: (1) Gross Earnings (basic pay + overtime + allowances), (2) Statutory Deductions (mandatory employee shares for SSS, PhilHealth, and Pag-IBIG), and (3) Withholding Tax (calculated on taxable income after deducting non-taxable statutory contributions and de minimis benefits). Subtracting total deductions from gross earnings yields your Net Take-Home Pay."
        toc={toc}
        workedExamples={workedExamples}
        sources={officialSources}
        verifiedDate={phRates.verifiedDate}
      >
        <section id="gross-vs-basic" className="space-y-4">
          <h2>1. Basic Pay vs Gross Earnings</h2>
          <p>
            When examining your payslip, the top section details your compensation structure:
          </p>
          <ul>
            <li><strong>Basic Salary:</strong> Your contracted fixed monthly remuneration for standard 8-hour daily work shifts (exclusive of overtime, commissions, and extra perks).</li>
            <li><strong>Overtime (OT) Pay:</strong> Work rendered beyond 8 hours a day, paid at 125% of your regular hourly rate on ordinary days, and 130% on rest days or special holidays.</li>
            <li><strong>Night Shift Differential (NSD):</strong> A minimum 10% premium added to your hourly rate for work performed between 10:00 PM and 6:00 AM.</li>
            <li><strong>Holiday &amp; Premium Pay:</strong> Additional compensation for working on Regular Holidays (200% daily rate) or Special Non-Working Days (130% daily rate).</li>
            <li><strong>Gross Pay:</strong> The total mathematical sum of basic pay and all additional earned compensation during that specific payroll cutoff.</li>
          </ul>
        </section>

        <section id="statutory-deductions" className="space-y-4">
          <h2>2. Mandatory Statutory Contributions (SSS, PhilHealth, Pag-IBIG)</h2>
          <p>
            Under Philippine labor law, employers are required to automatically withhold employee contributions and remit them to the three primary government welfare agencies:
          </p>
          <div className="overflow-x-auto rounded-lg border border-neutral-200 my-4">
            <table className="w-full text-left text-sm text-neutral-700">
              <thead className="bg-neutral-100 text-xs font-bold uppercase text-neutral-800">
                <tr>
                  <th className="px-4 py-3">Agency</th>
                  <th className="px-4 py-3">Statutory Employee Rate</th>
                  <th className="px-4 py-3">Monthly Employee Cap</th>
                  <th className="px-4 py-3">Primary Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                <tr>
                  <td className="px-4 py-3 font-semibold text-neutral-900">SSS</td>
                  <td className="px-4 py-3">5.0% of Monthly Salary Credit</td>
                  <td className="px-4 py-3 font-bold text-neutral-900">₱1,750.00</td>
                  <td className="px-4 py-3">Retirement pension, maternity, sickness, salary loans</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-neutral-900">PhilHealth</td>
                  <td className="px-4 py-3">2.5% of basic monthly wage</td>
                  <td className="px-4 py-3 font-bold text-neutral-900">₱2,500.00</td>
                  <td className="px-4 py-3">Universal healthcare hospital coverage &amp; medicine subsidies</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-neutral-900">Pag-IBIG (HDMF)</td>
                  <td className="px-4 py-3">2.0% of monthly fund salary</td>
                  <td className="px-4 py-3 font-bold text-neutral-900">₱200.00</td>
                  <td className="px-4 py-3">Housing loans, calamity loans, dividend-earning provident savings</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Crucially, these three employee contributions are <strong>fully non-taxable</strong>. They are subtracted from your gross compensation before your taxable income is computed.
          </p>
        </section>

        <section id="taxable-income" className="space-y-4">
          <h2>3. Taxable Income &amp; BIR Withholding Tax</h2>
          <p>
            Your withholding tax is not computed as a flat percentage of your gross pay. Instead, payroll software applies the standard formula:
          </p>
          <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 font-mono text-sm text-neutral-800">
            <code>Taxable Income = Gross Earnings – Statutory Deductions (SSS + PhilHealth + Pag-IBIG) – Non-Taxable Allowances</code>
          </div>
          <p>
            This net figure is then compared against the official revised graduated withholding tax tables enacted under the TRAIN Law:
          </p>
          <ul>
            <li><strong>Tax-Exempt Floor:</strong> Monthly taxable compensation up to ₱20,833 (₱250,000 annually) has <strong>₱0.00 withholding tax</strong>.</li>
            <li><strong>Tier 2 (₱20,833 to ₱33,333/mo):</strong> 15% on excess over ₱20,833.</li>
            <li><strong>Tier 3 (₱33,333 to ₱66,667/mo):</strong> ₱1,875.00 base + 20% on excess over ₱33,333.</li>
            <li><strong>Tier 4 (₱66,667 to ₱166,667/mo):</strong> ₱8,541.80 base + 25% on excess over ₱66,667.</li>
          </ul>
        </section>

        <section id="de-minimis-benefits" className="space-y-4">
          <h2>4. Non-Taxable De Minimis Allowances</h2>
          <p>
            Under BIR regulations, specific statutory allowances designed to cover everyday subsistence expenses are classified as <strong>De Minimis Benefits</strong>. As long as they stay within official statutory caps, they are 100% tax-free:
          </p>
          <ul>
            <li><strong>Rice Subsidy:</strong> Up to ₱2,000.00 per month (or one 50-kg sack of rice).</li>
            <li><strong>Uniform &amp; Clothing Allowance:</strong> Up to ₱6,000.00 per year.</li>
            <li><strong>Medical Cash Allowance to Dependents:</strong> Up to ₱1,500.00 per semester (₱250/month).</li>
            <li><strong>Actual Medical Assistance:</strong> Up to ₱10,000.00 per year.</li>
            <li><strong>Laundry Allowance:</strong> Up to ₱300.00 per month.</li>
          </ul>
        </section>

        <section id="voluntary-deductions" className="space-y-4">
          <h2>5. Voluntary Deductions &amp; Net Take-Home Pay</h2>
          <p>
            The final line of your payslip shows your <strong>Net Pay</strong>—the actual amount deposited into your payroll ATM card or bank account:
          </p>
          <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 font-mono text-sm text-neutral-800">
            <code>Net Take-Home Pay = Gross Pay – Statutory Contributions – Withholding Tax – Other Company Deductions</code>
          </div>
          <p>
            Other deductions listed in this section may include SSS salary or calamity loan amortizations, Pag-IBIG housing loan payroll deductions, health maintenance organization (HMO) coverage for extended dependents, company cooperative contributions, or employee retirement savings.
          </p>
        </section>
      </SeoArticle>
    </div>
  );
}
