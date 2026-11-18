'use client';

import React, { useState, useMemo } from 'react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { MoneyInput } from '@/components/MoneyInput';
import { NumberInput } from '@/components/NumberInput';
import { SegmentedControl } from '@/components/SegmentedControl';
import { ResultPanel, BreakdownRow, CalculationLegalSource } from '@/components/ResultPanel';
import { FaqAccordion } from '@/components/FaqAccordion';
import { RelatedTools } from '@/components/RelatedTools';
import { SeoArticle, WorkedExampleItem, OfficialSourceLink } from '@/components/SeoArticle';
import { StructuredData } from '@/components/StructuredData';
import { getRelatedPages } from '@/config/pages';
import {
  calculateThirteenthMonthStandard,
  calculateThirteenthMonthMonthly,
} from '@/lib/ph/thirteenth-month';
import { getPhRates } from '@/lib/seo/rules-content';
import { Calendar, Info } from 'lucide-react';

export default function ThirteenthMonthPayCalculator() {
  const phRates = getPhRates();
  const [calcMode, setCalcMode] = useState<'standard' | 'monthly'>('standard');
  const [monthlyBasic, setMonthlyBasic] = useState<number>(30000);
  const [monthsWorked, setMonthsWorked] = useState<number>(12);
  const [otherBenefits, setOtherBenefits] = useState<number>(0);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  const [monthlyEarnings, setMonthlyEarnings] = useState<number[]>([
    30000, 30000, 30000, 30000, 30000, 30000,
    30000, 30000, 30000, 30000, 30000, 30000,
  ]);

  const handleMonthChange = (index: number, val: number) => {
    const updated = [...monthlyEarnings];
    updated[index] = val;
    setMonthlyEarnings(updated);
  };

  const result = useMemo(() => {
    if (calcMode === 'standard') {
      return calculateThirteenthMonthStandard({
        monthlyBasic,
        monthsWorked,
        otherBenefits,
      });
    } else {
      return calculateThirteenthMonthMonthly({
        monthlyEarnings,
        otherBenefits,
      });
    }
  }, [calcMode, monthlyBasic, monthsWorked, otherBenefits, monthlyEarnings]);

  const rows: BreakdownRow[] = [
    {
      label: 'Total Basic Salary Earned',
      value: `₱${result.totalBasicSalaryEarned.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      sublabel: 'Sum of contractual basic earnings in the calendar year',
    },
    {
      label: '13th Month Pay (Total / 12)',
      value: `₱${result.thirteenthMonthPay.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      highlight: true,
    },
    ...(otherBenefits > 0
      ? [
          {
            label: 'Other Bonuses & 14th Month',
            value: `₱${otherBenefits.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
          },
          {
            label: 'Total Combined Benefits',
            value: `₱${result.totalBenefits.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
          },
        ]
      : []),
    {
      label: 'Tax-Exempt Portion',
      value: `₱${result.exemptPortion.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      sublabel: `Protected by ₱${phRates.thirteenthMonthTaxExemptLimit.toLocaleString()} statutory tax ceiling`,
    },
    {
      label: 'Taxable Excess Over ₱90k',
      value:
        result.taxableExcess > 0
          ? `₱${result.taxableExcess.toLocaleString('en-US', { minimumFractionDigits: 2 })}`
          : '₱0.00 (100% Tax-Free)',
      isDeduction: result.taxableExcess > 0,
      sublabel: result.taxableExcess > 0 ? 'Subject to regular BIR withholding tax in December' : undefined,
    },
    {
      label: 'Mandatory Payment Deadline',
      value: result.paymentDeadline,
      highlight: true,
    },
  ];

  const legalSources: CalculationLegalSource[] = [
    {
      title: 'Presidential Decree No. 851',
      documentNumber: 'PD 851 Implementing Rules and Regulations',
      summary: 'Mandates all employers to pay rank-and-file employees 13th month pay not later than December 24 of every year.',
    },
    {
      title: 'DOLE Labor Advisory No. 25, Series of 2023',
      documentNumber: 'Payment of 13th Month Pay',
      summary: 'Reiterates that 13th month pay is mandatory and non-negotiable. No request for exemption or deferment is permitted.',
    },
    {
      title: 'Tax Reform for Acceleration and Inclusion (TRAIN Law)',
      documentNumber: 'Republic Act No. 10963 / NIRC Sec. 32(B)(7)(e)',
      summary: `Gross benefits received by officials and employees up to ₱${phRates.thirteenthMonthTaxExemptLimit.toLocaleString()} are completely exempt from taxation.`,
    },
  ];

  const copySummaryText = `Philippine 13th Month Pay Calculation (${phRates.verifiedYear}):
Total Basic Salary Earned: ₱${result.totalBasicSalaryEarned.toLocaleString('en-US', { minimumFractionDigits: 2 })}
13th Month Pay Amount: ₱${result.thirteenthMonthPay.toLocaleString('en-US', { minimumFractionDigits: 2 })}
Tax-Exempt Portion: ₱${result.exemptPortion.toLocaleString('en-US', { minimumFractionDigits: 2 })}
Taxable Excess: ₱${result.taxableExcess.toLocaleString('en-US', { minimumFractionDigits: 2 })}
Payment Deadline: On or before December 24, ${phRates.verifiedYear}
Calculated on Pay (https://pay.zetawala.com/philippines/13th-month-pay-calculator/)`;

  const related = getRelatedPages('ph-13th');

  const faqs = [
    {
      question: 'What is the official 13th month pay formula in the Philippines?',
      answer:
        'Under Presidential Decree No. 851, the official formula is: <code>Total Basic Salary Earned within Calendar Year ÷ 12</code>. It represents one-twelfth of an employee\'s total basic pay earned across the year.',
    },
    {
      question: 'When is the mandatory deadline for 13th month pay in 2026?',
      answer:
        'Philippine labor law strictly requires employers to release 13th month pay on or before December 24 of every year. Employers may pay half in mid-year (May or June) and the remainder before December 24.',
    },
    {
      question: 'Are allowances and overtime included in 13th month pay?',
      answer:
        'No. Basic salary does not include allowances, overtime pay, night shift differential, holiday premiums, commissions, or unused leave cash conversions, unless these are integrated into the basic salary by contract or company practice.',
    },
    {
      question: 'What is the tax exemption ceiling for 13th month pay in 2026?',
      answer:
        'Under Republic Act 10963 (TRAIN Law), 13th month pay and other productivity bonuses up to ₱90,000 per calendar year are completely exempt from personal income tax. Any amount exceeding ₱90,000 is added to taxable compensation.',
    },
    {
      question: 'Are resigned or terminated employees entitled to 13th month pay?',
      answer:
        'Yes. An employee who resigned or was separated from service before December 24 is entitled to a pro-rated 13th month pay, calculated from their first month of service up to the time of resignation.',
    },
    {
      question: 'Who is eligible to receive 13th month pay?',
      answer:
        'All rank-and-file employees in the private sector who have worked for at least one (1) month during the calendar year are legally entitled to receive 13th month pay, regardless of employment status or payment arrangement.',
    },
    {
      question: 'Can an employer be exempted from paying 13th month pay?',
      answer:
        'No. Under DOLE guidelines, 13th month pay is mandatory. Distressed employers, non-profit institutions, and small businesses are not exempt and cannot apply for deferment under Philippine labor standards.',
    },
    {
      question: 'How is 13th month pay calculated for employees with salary increases?',
      answer:
        'When an employee receives a salary increase mid-year, 13th month pay is calculated by summing the actual basic salaries received during each individual month and dividing the total sum by 12.',
    },
  ];

  const workedExamples: WorkedExampleItem[] = [
    {
      title: 'Full-Year Employee with Uniform Basic Pay',
      scenario: 'A regular employee earning ₱30,000 monthly basic pay who worked all 12 months without salary change.',
      inputs: [
        { label: 'Monthly Basic Pay', value: '₱30,000.00' },
        { label: 'Months Worked', value: '12 Months' },
      ],
      steps: [
        { label: 'Total Annual Basic Earned', formula: '₱30,000 × 12 months', value: '₱360,000.00' },
        { label: '13th Month Pay Computation', formula: '₱360,000 ÷ 12', value: '₱30,000.00', highlight: true },
        { label: 'Tax-Exempt Ceiling Check', formula: 'Protected up to ₱90,000 limit', value: '₱30,000.00 (Exempt)' },
        { label: 'Taxable Excess Over ₱90,000', formula: '₱30,000 ≤ ₱90,000', value: '₱0.00' },
      ],
      resultLabel: 'Net 13th Month Pay Received',
      resultValue: '₱30,000.00',
      notes: '100% tax-free. Must be disbursed on or before December 24.',
    },
    {
      title: 'Resigned Employee (Pro-Rated 7 Months)',
      scenario: 'An employee earning ₱40,000 monthly basic pay who resigned on July 31 after completing 7 months of service.',
      inputs: [
        { label: 'Monthly Basic Pay', value: '₱40,000.00' },
        { label: 'Months Completed', value: '7 Months (Jan–Jul)' },
      ],
      steps: [
        { label: 'Total Basic Earned in Year', formula: '₱40,000 × 7 months', value: '₱280,000.00' },
        { label: 'Pro-Rated 13th Month Computation', formula: '₱280,000 ÷ 12', value: '₱23,333.33', highlight: true },
        { label: 'Tax-Exempt Status', formula: 'Well below ₱90,000 ceiling', value: '100% Tax-Exempt' },
      ],
      resultLabel: 'Pro-Rated Final Pay Payout',
      resultValue: '₱23,333.33',
      notes: 'Included in the employee\'s final back-pay settlement.',
    },
  ];

  const officialSources: OfficialSourceLink[] = [
    {
      name: 'Department of Labor and Employment (DOLE)',
      documentTitle: 'Presidential Decree No. 851 & Labor Advisory No. 25-2023',
      url: 'https://www.dole.gov.ph',
      verifiedDate: phRates.verifiedDate,
    },
    {
      name: 'Bureau of Internal Revenue (BIR)',
      documentTitle: 'Republic Act No. 10963 (TRAIN Law) Sec. 32(B)(7)(e)',
      url: 'https://www.bir.gov.ph',
      verifiedDate: phRates.verifiedDate,
    },
  ];

  const quickAnswerText = `13th month pay in the Philippines equals total basic salary earned during the calendar year divided by 12. Mandated under Presidential Decree No. 851, it must be paid on or before December 24. Under the TRAIN Law, 13th month pay and productivity bonuses up to ₱${phRates.thirteenthMonthTaxExemptLimit.toLocaleString()} per year are completely tax-exempt.`;

  const tocItems = [
    { id: 'formula-definition', label: 'Official 13th Month Pay Formula' },
    { id: 'basic-salary-inclusions', label: 'Basic Salary Inclusions vs Exclusions' },
    { id: 'tax-rules', label: '₱90,000 Tax Exemption Threshold' },
    { id: 'resigned-employees', label: 'Rules for Resigned & Terminated Staff' },
    { id: 'employer-compliance', label: 'DOLE Deadlines & Penalties' },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <StructuredData
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Philippines', url: '/philippines/' },
          { name: '13th Month Pay Calculator 2026', url: '/philippines/13th-month-pay-calculator/' },
        ]}
        webApp={{
          name: '13th Month Pay Calculator 2026',
          url: '/philippines/13th-month-pay-calculator/',
          description: 'Calculate your pro-rated or full Philippine 13th-month pay based on total basic salary under DOLE rules.',
          applicationCategory: 'FinanceApplication',
        }}
        faqs={faqs}
      />

      <Breadcrumbs
        items={[
          { label: 'Philippines', href: '/philippines/' },
          { label: '13th Month Pay Calculator' },
        ]}
      />

      {/* Page Header */}
      <div className="border-b border-neutral-200 pb-6 pt-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
          13th Month Pay Calculator {phRates.verifiedYear}
        </h1>
        <p className="mt-2 text-sm sm:text-base text-neutral-600 max-w-3xl leading-relaxed">
          Compute your full-year or pro-rated 13th month pay under Presidential Decree No. 851 and DOLE guidelines. Checks the ₱{phRates.thirteenthMonthTaxExemptLimit.toLocaleString()} TRAIN tax-exempt ceiling.
        </p>
      </div>

      {/* Main Grid: Inputs Left, Result Right */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Inputs Column */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-2xs space-y-6">
            <SegmentedControl<'standard' | 'monthly'>
              label="Calculation Method"
              value={calcMode}
              onChange={setCalcMode}
              options={[
                { label: 'Fixed Monthly Salary', value: 'standard' },
                { label: 'Variable / Mid-Year Changes', value: 'monthly' },
              ]}
            />

            {calcMode === 'standard' ? (
              <div className="space-y-4">
                <MoneyInput
                  label="Monthly Basic Salary"
                  value={monthlyBasic}
                  onChange={setMonthlyBasic}
                  currencySymbol="₱"
                  hint="Your regular monthly base salary (excluding allowances and overtime)."
                  min={0}
                  max={1000000}
                  required
                />
                <NumberInput
                  label="Total Months Worked in 2026"
                  value={monthsWorked}
                  onChange={setMonthsWorked}
                  min={1}
                  max={12}
                  step={0.5}
                  hint="Enter 12 for full year, or months worked if hired or resigned mid-year."
                  required
                />
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-xs text-neutral-600">
                  Enter the actual basic salary earned in each month (enter 0 for unpaid leaves or months not yet employed):
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {monthNames.map((name, idx) => (
                    <div key={idx}>
                      <MoneyInput
                        label={name}
                        value={monthlyEarnings[idx]}
                        onChange={(v) => handleMonthChange(idx, v)}
                        currencySymbol="₱"
                        min={0}
                        max={1000000}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-neutral-100">
              <MoneyInput
                label="Other Bonuses & 14th Month Pay (Optional)"
                value={otherBenefits}
                onChange={setOtherBenefits}
                currencySymbol="₱"
                hint={`Included in the ₱${phRates.thirteenthMonthTaxExemptLimit.toLocaleString()} combined annual tax-exemption limit.`}
                min={0}
              />
            </div>
          </div>
        </div>

        {/* Right Sticky Result Column */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
          <ResultPanel
            title="13th Month Pay Summary"
            headlineLabel="Total 13th Month Pay"
            headlineValue={`₱${result.thirteenthMonthPay.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            subHeadline={`Mandatory payout deadline: On or before ${result.paymentDeadline}`}
            rows={rows}
            sources={legalSources}
            copySummaryText={copySummaryText}
            shareTitle="13th Month Pay Computation"
            calloutMessage={
              result.taxableExcess === 0
                ? {
                    type: 'success',
                    text: `100% Tax-Exempt: Your total bonus falls within the ₱${phRates.thirteenthMonthTaxExemptLimit.toLocaleString()} statutory tax ceiling.`,
                  }
                : {
                    type: 'info',
                    text: `₱${result.taxableExcess.toLocaleString()} is subject to withholding tax as compensation in excess of the ₱${phRates.thirteenthMonthTaxExemptLimit.toLocaleString()} ceiling.`,
                  }
            }
          />
        </div>
      </div>

      {/* SEO Article */}
      <SeoArticle
        quickAnswer={quickAnswerText}
        toc={tocItems}
        workedExamples={workedExamples}
        sources={officialSources}
        verifiedDate={phRates.verifiedDate}
      >
        <h2 id="formula-definition">The Official 13th Month Pay Formula</h2>
        <p>
          In the Philippines, 13th month pay is a mandatory employee benefit established under Presidential Decree No. 851. Unlike discretionary Christmas bonuses, 13th month pay is an enforceable statutory right for all rank-and-file workers in the private sector.
        </p>
        <p>
          The governing formula codified by the Department of Labor and Employment (DOLE) is:
        </p>
        <div className="not-prose my-4 rounded-lg bg-neutral-900 p-4 font-mono text-sm text-brand-light">
          13th Month Pay = Total Basic Salary Earned within Calendar Year ÷ 12
        </div>
        <p>
          If an employee worked the entire 12 months with a constant basic monthly wage of ₱30,000, their total basic pay is ₱360,000, resulting in exactly one month’s salary (₱30,000). If the employee was hired midway through the year or took unpaid absences, their payout is pro-rated according to their total basic earnings.
        </p>

        <h2 id="basic-salary-inclusions">What Counts as Basic Salary?</h2>
        <p>
          DOLE guidelines strictly differentiate between <em>basic salary</em> and auxiliary compensation. Basic salary includes all regular cash remuneration paid by an employer for services rendered, but excludes discretionary payments and variable allowances.
        </p>

        <div className="not-prose my-6 overflow-x-auto rounded-xl border border-neutral-200">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-100 text-neutral-800 uppercase font-bold">
              <tr>
                <th className="p-3">Included in 13th Month Calculation</th>
                <th className="p-3">Excluded from 13th Month Calculation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 text-neutral-700">
              <tr>
                <td className="p-3 font-medium text-neutral-900">Contractual Monthly Basic Pay</td>
                <td className="p-3">Overtime and Holiday Premiums</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-neutral-900">Paid Sick and Vacation Leaves</td>
                <td className="p-3">Night Shift Differential (NSD)</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-neutral-900">Paid Maternity and Paternity Leaves (basic component)</td>
                <td className="p-3">Cost of Living Allowances (COLA)</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-neutral-900">Commissions (if contractually integrated into basic)</td>
                <td className="p-3">Cash Conversion of Unused Leave Credits</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-neutral-900">Salary increases earned during active months</td>
                <td className="p-3">Discretionary Christmas or Performance Bonuses</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 id="tax-rules">The ₱90,000 Tax Exemption Ceiling</h2>
        <p>
          Under Republic Act No. 10963 (the TRAIN Law) amending Section 32(B)(7)(e) of the Tax Code, gross benefits received by officials and employees up to a statutory ceiling of ₱{phRates.thirteenthMonthTaxExemptLimit.toLocaleString()} are completely tax-exempt.
        </p>
        <p>
          This ₱{phRates.thirteenthMonthTaxExemptLimit.toLocaleString()} ceiling covers cumulative benefits received within one calendar year, including:
        </p>
        <ul>
          <li>The statutory 13th month pay;</li>
          <li>Discretionary 14th month or 15th month pay;</li>
          <li>Productivity incentives and performance bonuses;</li>
          <li>Christmas bonuses granted by the company.</li>
        </ul>
        <p>
          If the sum of these benefits remains at or below ₱{phRates.thirteenthMonthTaxExemptLimit.toLocaleString()}, no withholding tax is deducted. Any amount in excess of ₱{phRates.thirteenthMonthTaxExemptLimit.toLocaleString()} is treated as taxable compensation income and added to your December payroll tax base.
        </p>

        <h2 id="resigned-employees">Rules for Resigned and Terminated Employees</h2>
        <p>
          Employees who resign, retire, or are separated from their employer prior to December 24 do not forfeit their 13th month pay. By law, an employee who has worked at least one (1) full month is entitled to a pro-rated benefit.
        </p>
        <p>
          The pro-rated calculation divides their cumulative basic pay earned from January 1 up to their separation date by 12. Under DOLE Labor Advisory rules, this pro-rated 13th month pay must be released as part of the employee’s final back-pay settlement within 30 calendar days from the date of separation.
        </p>

        <h2 id="employer-compliance">DOLE Compliance Deadlines and Penalties</h2>
        <p>
          Employers are legally mandated to disburse 13th month pay on or before December 24 of every year. Employers must submit an official compliance report to the nearest DOLE Regional Office via the DOLE Establishment Report System (ERS) no later than January 15 of the following year.
        </p>
        <p>
          Failure to pay 13th month pay constitutes a labor standards violation. Non-compliant employers face money claims, formal DOLE inspections, and mandatory interest awards payable to affected staff.
        </p>
      </SeoArticle>

      {/* Related Tools */}
      <div className="mt-12">
        <RelatedTools tools={related} />
      </div>

      {/* FAQs */}
      <div className="mt-10">
        <FaqAccordion faqs={faqs} />
      </div>
    </div>
  );
}
