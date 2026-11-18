'use client';

import React, { useState, useMemo } from 'react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { MoneyInput } from '@/components/MoneyInput';
import { NumberInput } from '@/components/NumberInput';
import { Select } from '@/components/Select';
import { ResultPanel, BreakdownRow, CalculationLegalSource } from '@/components/ResultPanel';
import { FaqAccordion } from '@/components/FaqAccordion';
import { RelatedTools } from '@/components/RelatedTools';
import { SeoArticle, WorkedExampleItem, OfficialSourceLink } from '@/components/SeoArticle';
import { StructuredData } from '@/components/StructuredData';
import { getRelatedPages } from '@/config/pages';
import { calculateSssSalaryLoan } from '@/lib/ph/salary-loan';
import { getPhRates } from '@/lib/seo/rules-content';
import { Calendar, ChevronDown, ChevronUp } from 'lucide-react';

export default function SssSalaryLoanCalculator() {
  const phRates = getPhRates();
  const [averageMsc, setAverageMsc] = useState<number>(20000);
  const [postedContributions, setPostedContributions] = useState<number>(72);
  const [priorCondonation, setPriorCondonation] = useState<boolean>(false);
  const [loanType, setLoanType] = useState<'auto' | 'one_month' | 'two_month'>('auto');
  const [showSchedule, setShowSchedule] = useState<boolean>(false);

  const loanResult = useMemo(() => {
    return calculateSssSalaryLoan({
      averageMsc,
      postedContributions,
      priorCondonation,
      desiredLoanType: loanType,
    });
  }, [averageMsc, postedContributions, priorCondonation, loanType]);

  const rows: BreakdownRow[] = [
    {
      label: 'Loan Type Approved',
      value: loanResult.loanType === 'two_month' ? '2-Month Salary Loan' : '1-Month Salary Loan',
      sublabel: loanResult.loanType === 'two_month' ? 'Qualified by ≥ 72 posted contributions' : 'Qualified by ≥ 36 posted contributions',
    },
    {
      label: 'Gross Loan Principal',
      value: `₱${loanResult.grossLoanAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      highlight: true,
    },
    {
      label: 'Service Fee (1.0% Upfront)',
      value: `-₱${loanResult.serviceFeeAmount.toFixed(2)}`,
      sublabel: 'Deducted directly from loan proceeds',
      isDeduction: true,
    },
    {
      label: 'Net Cash Proceeds Disbursed',
      value: `₱${loanResult.netLoanProceeds.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      highlight: true,
      sublabel: 'Credited to your nominated bank account via PESONet',
    },
    {
      label: 'Annual Interest Rate',
      value: `${loanResult.interestRateAnnual.toFixed(1)}% p.a.`,
      sublabel: priorCondonation ? '10.0% p.a. (due to prior condonation)' : '8.0% p.a. diminishing balance (Circular 2025-004)',
    },
    {
      label: 'Repayment Period',
      value: `${loanResult.termMonths} Months (2 Years)`,
    },
    {
      label: 'Monthly Amortization',
      value: `₱${loanResult.monthlyAmortization.toFixed(2)}`,
      highlight: true,
      sublabel: 'Payroll deduction starts on second month following loan date',
    },
    {
      label: 'Total Interest Over 24 Months',
      value: `₱${loanResult.totalInterest.toFixed(2)}`,
    },
    {
      label: 'Total Amount Repayable',
      value: `₱${loanResult.totalRepayment.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
    },
  ];

  const legalSources: CalculationLegalSource[] = [
    {
      title: 'Social Security System (SSS)',
      documentNumber: 'SSS Circular No. 2025-004',
      summary: 'Restructured interest rate to 8.0% per annum on a diminishing balance basis for standard salary loans (10.0% for members with prior loan condonations).',
    },
    {
      title: 'Social Security Commission Resolution',
      documentNumber: 'Salary Loan Guidelines & Terms',
      summary: '1% service fee deducted from proceeds, 24-month term, maximum MSC basis of ₱20,000 for salary loans.',
    },
  ];

  const copySummaryText = `Philippine SSS Salary Loan Computation (${phRates.verifiedYear}):
Loan Type: ${loanResult.loanType === 'two_month' ? '2-Month Loan' : '1-Month Loan'}
Gross Principal: ₱${loanResult.grossLoanAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
- 1% Service Fee: ₱${loanResult.serviceFeeAmount.toFixed(2)}
Net Cash Disbursed: ₱${loanResult.netLoanProceeds.toLocaleString('en-US', { minimumFractionDigits: 2 })}
Monthly Amortization: ₱${loanResult.monthlyAmortization.toFixed(2)} / month (24 months)
Interest Rate: ${loanResult.interestRateAnnual.toFixed(1)}% p.a. diminishing balance
Calculated on Pay (https://pay.zetawala.com/philippines/sss-salary-loan-calculator/)`;

  const related = getRelatedPages('ph-loan');

  const faqs = [
    {
      question: 'How much can I borrow in an SSS Salary Loan in 2026?',
      answer:
        'Members with at least 36 posted contributions qualify for a 1-month salary loan, which equals the average of their last 12 Monthly Salary Credits (max ₱20,000). Members with at least 72 posted contributions qualify for a 2-month salary loan (max ₱40,000).',
    },
    {
      question: 'What is the current interest rate for SSS salary loans?',
      answer:
        'Under SSS Circular No. 2025-004, the standard interest rate is 8.0% per annum computed on a diminishing principal balance. For members who previously availed of a loan penalty condonation program, the rate is 10.0% per annum.',
    },
    {
      question: 'What is the service fee for an SSS salary loan?',
      answer:
        'SSS charges a 1.0% service fee based on the approved gross loan amount. This fee is automatically deducted from your loan proceeds upon release, so you pay no upfront cash.',
    },
    {
      question: 'How is the SSS salary loan repaid?',
      answer:
        'The loan is repaid over 24 equal monthly installments. Repayment begins on the second month following the approval date. For employed members, payments are deducted through employer monthly payroll remittances.',
    },
    {
      question: 'What are the eligibility requirements to apply for an SSS loan?',
      answer:
        'You must be an active SSS member under age 65, have at least 36 or 72 posted monthly contributions (with at least 6 posted contributions within the last 12 months), and have no outstanding delinquent SSS loan.',
    },
    {
      question: 'Can self-employed and voluntary members apply for a salary loan?',
      answer:
        'Yes. Self-employed, voluntary, and OFW members can apply online via the My.SSS portal, provided they satisfy the posted contribution requirements and maintain an active disbursement account.',
    },
    {
      question: 'How are loan proceeds released to the borrower?',
      answer:
        'SSS releases funds electronically via PESONet to the member’s registered bank account, UMID-ATM card, or UnionBank/Philippine bank account enrolled in the SSS Disbursement Account Enrollment Module (DAEM).',
    },
    {
      question: 'What happens if an employee fails to pay their SSS salary loan?',
      answer:
        'Unpaid salary loans accrue a penalty of 1% per month on the overdue amount. Any outstanding principal, interest, and penalties will be automatically deducted from future SSS benefit claims (sickness, disability, or retirement pension).',
    },
  ];

  const workedExamples: WorkedExampleItem[] = [
    {
      title: '2-Month Salary Loan (72+ Contributions, ₱20,000 AMSC)',
      scenario: 'A member with 72 posted contributions and an average MSC of ₱20,000 applying for a full 2-month loan.',
      inputs: [
        { label: 'Average Monthly Salary Credit', value: '₱20,000.00' },
        { label: 'Posted Contributions', value: '72 Months (Qualified for 2-Month Loan)' },
        { label: 'Interest Rate Basis', value: '8.0% p.a. (Standard)' },
      ],
      steps: [
        { label: 'Gross Principal Approved', formula: '₱20,000 × 2 months', value: '₱40,000.00', highlight: true },
        { label: '1% Upfront Service Fee', formula: '₱40,000 × 1.0%', value: '-₱400.00', isDeduction: true },
        { label: 'Net Disbursed Cash', formula: '₱40,000 - ₱400', value: '₱39,600.00', highlight: true },
        { label: 'Monthly Repayment (24 Mos)', formula: 'Equal monthly amortization', value: '₱1,809.11 / mo' },
        { label: 'Total Interest Paid', formula: 'Total interest over 2 years', value: '₱3,418.64' },
      ],
      resultLabel: 'Net Cash Received in Bank',
      resultValue: '₱39,600.00',
      notes: 'Monthly payroll deduction: ₱1,809.11 for 24 months.',
    },
    {
      title: '1-Month Salary Loan (36 Contributions, ₱15,000 AMSC)',
      scenario: 'A member with 40 posted contributions and an average MSC of ₱15,000 applying for a 1-month loan.',
      inputs: [
        { label: 'Average Monthly Salary Credit', value: '₱15,000.00' },
        { label: 'Posted Contributions', value: '40 Months (Qualified for 1-Month Loan)' },
      ],
      steps: [
        { label: 'Gross Principal Approved', formula: '1 × ₱15,000 AMSC', value: '₱15,000.00', highlight: true },
        { label: '1% Service Fee Deduction', formula: '₱15,000 × 1.0%', value: '-₱150.00', isDeduction: true },
        { label: 'Net Disbursed Cash', formula: '₱15,000 - ₱150', value: '₱14,850.00', highlight: true },
        { label: 'Monthly Amortization (24 Mos)', formula: 'Equal monthly payment', value: '₱678.42 / mo' },
      ],
      resultLabel: 'Net Cash Received in Bank',
      resultValue: '₱14,850.00',
      notes: 'Monthly payroll deduction: ₱678.42 for 24 months.',
    },
  ];

  const officialSources: OfficialSourceLink[] = [
    {
      name: 'Social Security System (SSS)',
      documentTitle: 'SSS Circular No. 2025-004 (Salary Loan Restructuring & Terms)',
      url: 'https://www.sss.gov.ph',
      verifiedDate: phRates.verifiedDate,
    },
    {
      name: 'SSS Portal Services',
      documentTitle: 'Disbursement Account Enrollment Module (DAEM) Terms',
      url: 'https://member.sss.gov.ph',
      verifiedDate: phRates.verifiedDate,
    },
  ];

  const quickAnswerText = `The SSS salary loan provides up to a 1-month loan (min. 36 contributions) or 2-month loan (min. 72 contributions) based on your average Monthly Salary Credit (max ₱20,000 basis). Under Circular 2025-004, loans carry an 8.0% annual diminishing interest rate, a 1% service fee, and a 24-month repayment period.`;

  const tocItems = [
    { id: 'loan-amounts-msc', label: 'Loanable Amounts & MSC Caps' },
    { id: 'interest-and-fees', label: '8% Interest Rate & 1% Service Fee' },
    { id: 'amortization-schedule', label: '24-Month Amortization Details' },
    { id: 'eligibility-checklist', label: 'Eligibility Requirements' },
    { id: 'default-consequences', label: 'Default Penalties & Pension Offset' },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <StructuredData
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Philippines', url: '/philippines/' },
          { name: 'SSS Salary Loan Calculator 2026', url: '/philippines/sss-salary-loan-calculator/' },
        ]}
        webApp={{
          name: 'SSS Salary Loan Calculator 2026',
          url: '/philippines/sss-salary-loan-calculator/',
          description: 'Compute 1-month or 2-month SSS salary loan proceeds, 8% annual diminishing interest, and 24-month amortization.',
          applicationCategory: 'FinanceApplication',
        }}
        faqs={faqs}
      />

      <Breadcrumbs
        items={[
          { label: 'Philippines', href: '/philippines/' },
          { label: 'SSS Salary Loan Calculator' },
        ]}
      />

      {/* Page Header */}
      <div className="border-b border-neutral-200 pb-6 pt-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
          SSS Salary Loan Calculator {phRates.verifiedYear}
        </h1>
        <p className="mt-2 text-sm sm:text-base text-neutral-600 max-w-3xl leading-relaxed">
          Compute net loan proceeds, 8.0% diminishing interest, and monthly amortization under SSS Circular No. 2025-004. Supports both 1-month and 2-month salary loans.
        </p>
      </div>

      {/* Main Grid: Inputs Left, Result Right */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Inputs Column */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-2xs space-y-6">
            <h2 className="text-base font-bold text-neutral-900 border-b border-neutral-100 pb-3">
              Salary Loan Parameters
            </h2>

            <MoneyInput
              label="Average Monthly Salary Credit (AMSC)"
              value={averageMsc}
              onChange={setAverageMsc}
              currencySymbol="₱"
              hint="Average of your last 12 regular MSCs (capped at ₱20,000 for salary loans)."
              min={1000}
              max={20000}
              required
            />

            <NumberInput
              label="Total Posted Monthly Contributions"
              value={postedContributions}
              onChange={setPostedContributions}
              min={36}
              max={500}
              hint="Minimum 36 contributions for 1-month loan; 72 contributions for 2-month loan."
              required
            />

            <Select
              label="Loan Type Preference"
              value={loanType}
              onChange={(val) => setLoanType(val as 'auto' | 'one_month' | 'two_month')}
              options={[
                { label: 'Automatic (Max Qualified by Contributions)', value: 'auto' },
                { label: '1-Month Salary Loan (Requires ≥ 36 contributions)', value: 'one_month' },
                { label: '2-Month Salary Loan (Requires ≥ 72 contributions)', value: 'two_month' },
              ]}
            />

            <div className="rounded-lg bg-neutral-50 p-4 border border-neutral-200 space-y-2">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-neutral-800">
                <input
                  type="checkbox"
                  checked={priorCondonation}
                  onChange={(e) => setPriorCondonation(e.target.checked)}
                  className="rounded border-neutral-300 text-brand focus:ring-brand"
                />
                <span>I previously availed of an SSS Loan Penalty Condonation Program</span>
              </label>
              <p className="text-2xs text-neutral-500 pl-6">
                Under Circular 2025-004, members with prior loan condonation pay a 10.0% p.a. interest rate instead of the standard 8.0%.
              </p>
            </div>
          </div>
        </div>

        {/* Right Sticky Result Column */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
          <ResultPanel
            title="Loan Summary & Amortization"
            headlineLabel="Net Loan Proceeds"
            headlineValue={`₱${loanResult.netLoanProceeds.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            subHeadline={`Monthly amortization: ₱${loanResult.monthlyAmortization.toFixed(2)} for 24 months`}
            rows={rows}
            sources={legalSources}
            copySummaryText={copySummaryText}
            shareTitle="SSS Salary Loan Computation"
          />

          {/* Schedule toggle */}
          <button
            type="button"
            onClick={() => setShowSchedule(!showSchedule)}
            className="w-full flex items-center justify-between rounded-lg border border-neutral-200 bg-white p-3.5 text-xs font-bold text-neutral-800 shadow-2xs hover:bg-neutral-50"
          >
            <span>{showSchedule ? 'Hide 24-Month Repayment Schedule' : 'View Full 24-Month Amortization Schedule'}</span>
            {showSchedule ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>

          {showSchedule && (
            <div className="max-h-72 overflow-y-auto rounded-lg border border-neutral-200 bg-white p-3 shadow-2xs text-xs">
              <table className="w-full text-left">
                <thead className="bg-neutral-100 text-neutral-700 uppercase font-bold text-2xs sticky top-0">
                  <tr>
                    <th className="p-2">Mo</th>
                    <th className="p-2">Principal</th>
                    <th className="p-2">Interest</th>
                    <th className="p-2">Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 font-mono text-2xs">
                  {loanResult.schedule.map((item) => (
                    <tr key={item.month}>
                      <td className="p-1.5">{item.month}</td>
                      <td className="p-1.5">₱{item.principal.toFixed(2)}</td>
                      <td className="p-1.5">₱{item.interest.toFixed(2)}</td>
                      <td className="p-1.5 font-semibold">₱{item.endingBalance.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
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
        <h2 id="loan-amounts-msc">Loanable Amounts and the ₱20,000 MSC Ceiling</h2>
        <p>
          The SSS Salary Loan is a short-term credit facility designed to assist formally employed, self-employed, voluntary, and OFW members. The amount you can borrow depends directly on your posted contributions:
        </p>
        <ul>
          <li><strong>One-Month Salary Loan:</strong> Available to members with at least 36 posted monthly contributions. The loanable amount is equal to the average of your last 12 Monthly Salary Credits (AMSC).</li>
          <li><strong>Two-Month Salary Loan:</strong> Available to members with at least 72 posted monthly contributions. The loanable amount is equal to twice your average Monthly Salary Credit.</li>
        </ul>
        <p>
          Crucially, for the purposes of the salary loan computation, the Maximum Monthly Salary Credit basis is capped at ₱{phRates.sssRegularMscCap.toLocaleString()}, even though the total SSS contribution ceiling extends up to ₱{phRates.sssMaxTotalMsc.toLocaleString()}. Consequently, the maximum principal for a 1-month salary loan is ₱20,000.00, and for a 2-month salary loan is ₱40,000.00.
        </p>

        <h2 id="interest-and-fees">The 8.0% Interest Rate and 1% Service Fee</h2>
        <p>
          Under SSS Circular No. 2025-004, the interest rate on salary loans is fixed at 8.0% per annum computed on a diminishing principal balance. This is a substantial improvement over older fixed-interest schemes, as interest is charged only on the remaining unpaid principal each month.
        </p>
        <p>
          Key loan costs include:
        </p>
        <ul>
          <li><strong>1.0% Service Fee:</strong> Deducted upfront from the gross loan amount (e.g., ₱400 fee on a ₱40,000 loan). You do not pay this out of pocket.</li>
          <li><strong>Standard 8.0% p.a. Interest:</strong> Applied to the diminishing balance across the 24-month term.</li>
          <li><strong>10.0% p.a. Rate for Prior Condonation:</strong> Members who availed of previous penalty condonation amnesties are subject to a slightly higher 10.0% annual rate.</li>
        </ul>

        <h2 id="amortization-schedule">The 24-Month Amortization Schedule</h2>
        <p>
          All SSS salary loans have a uniform repayment term of 24 months (two years). Monthly payments begin on the second calendar month following the date of loan approval. For example, if your loan is approved in March, your first monthly payment is due in May.
        </p>
        <p>
          Because payments are amortized on a diminishing balance basis, each monthly payment consists of a principal portion and an interest portion. Over the 24 months, the interest component decreases while the principal component increases.
        </p>

        <h2 id="eligibility-checklist">Complete Eligibility Checklist</h2>
        <p>
          To ensure your loan application is approved by SSS, verify that you satisfy all of the following statutory requirements:
        </p>
        <ol>
          <li>You are an active member under 65 years of age.</li>
          <li>You have paid at least 36 monthly contributions for a 1-month loan, or 72 contributions for a 2-month loan.</li>
          <li>You have at least six (6) posted contributions in the twelve (12) months immediately preceding your loan application.</li>
          <li>You have not been disqualified by fraud or misrepresentation.</li>
          <li>You have an active bank account enrolled in the SSS Disbursement Account Enrollment Module (DAEM).</li>
        </ol>

        <h2 id="default-consequences">Default Consequences and Pension Offset</h2>
        <p>
          Failure to pay your monthly loan amortization results in a penalty of 1.0% per month on the overdue amount. SSS does not employ third-party debt collection agencies; instead, any outstanding loan principal, accumulated interest, and late penalties are automatically deducted from any future SSS benefit claims. If a member reaches retirement with an unsettled salary loan, SSS subtracts the balance from their retirement pension settlement.
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
