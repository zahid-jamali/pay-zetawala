'use client';

import React, { useState, useMemo } from 'react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { MoneyInput } from '@/components/MoneyInput';
import { ResultPanel, BreakdownRow, CalculationLegalSource } from '@/components/ResultPanel';
import { FaqAccordion } from '@/components/FaqAccordion';
import { RelatedTools } from '@/components/RelatedTools';
import { SeoArticle, WorkedExampleItem, OfficialSourceLink } from '@/components/SeoArticle';
import { StructuredData } from '@/components/StructuredData';
import { getRelatedPages } from '@/config/pages';
import { calculateMshwari } from '@/lib/ke/mshwari';
import { getKeRates } from '@/lib/seo/rules-content';

export default function MshwariLoanCalculator() {
  const keRates = getKeRates();
  const [loanAmount, setLoanAmount] = useState<number>(10000);

  const mshwari = useMemo(() => {
    return calculateMshwari({ loanAmount });
  }, [loanAmount]);

  const rows: BreakdownRow[] = [
    {
      label: 'Requested Loan Principal',
      value: `KES ${loanAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
    },
    {
      label: 'Loan Facilitation Fee (7.5%)',
      value: `KES ${mshwari.facilitationFee.toFixed(2)}`,
      sublabel: 'Standard NCBA / Safaricom loan facility fee',
    },
    {
      label: 'Upfront Excise Duty (1.5%)',
      value: `-KES ${mshwari.exciseDutyAmount.toFixed(2)}`,
      sublabel: '20% tax on fee, deducted upfront from disbursement',
      isDeduction: true,
    },
    {
      label: 'Net Cash Disbursed to M-PESA Wallet',
      value: `KES ${mshwari.netDisbursedAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      highlight: true,
      sublabel: 'Actual cash credited to your M-PESA account',
    },
    {
      label: 'Loan Repayment Term',
      value: `${keRates.mshwariTermDays} Calendar Days`,
    },
    {
      label: 'Total Repayment Due at Day 30',
      value: `KES ${mshwari.repaymentDueDay30.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      highlight: true,
      sublabel: 'Principal + 7.5% Facilitation Fee',
    },
    {
      label: `Total Cost of Credit (${keRates.mshwariFeeRate.toFixed(1)}%)`,
      value: `KES ${mshwari.totalFinanceCost.toFixed(2)}`,
    },
  ];

  const legalSources: CalculationLegalSource[] = [
    {
      title: 'NCBA Bank Kenya PLC & Safaricom',
      documentNumber: 'M-Shwari Product Regulations & Tariff Disclosures',
      summary: `7.5% facility fee plus 20% excise duty on fees (1.5% of principal), totaling ${keRates.mshwariFeeRate.toFixed(1)}% total cost for a ${keRates.mshwariTermDays}-day fixed-term facility.`,
    },
    {
      title: 'Central Bank of Kenya (CBK)',
      documentNumber: 'Banking Act & Consumer Protection Directives',
      summary: 'Regulates digital micro-lending disclosures, APR calculations, and debt collection practices.',
    },
  ];

  const copySummaryText = `NCBA M-Shwari 30-Day Loan Computation (${keRates.verifiedYear}):
Loan Principal: KES ${loanAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
- Upfront Excise (1.5%): KES ${mshwari.exciseDutyAmount.toFixed(2)}
Net Cash Disbursed: KES ${mshwari.netDisbursedAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
Total Repayment (Day 30): KES ${mshwari.repaymentDueDay30.toLocaleString('en-US', { minimumFractionDigits: 2 })}
Total Cost of Credit: KES ${mshwari.totalFinanceCost.toFixed(2)} (9.0%)
Calculated on Pay (https://pay.zetawala.com/kenya/m-shwari-loan-calculator/)`;

  const related = getRelatedPages('ke-mshwari');

  const faqs = [
    {
      question: 'What is the interest rate on an M-Shwari loan in 2026?',
      answer:
        'M-Shwari charges a 7.5% facility fee on the principal amount, plus 20% excise duty on that fee (equal to 1.5% of the principal), making the total cost of credit exactly 9.0% for the 30-day term.',
    },
    {
      question: 'Why is my disbursed M-Shwari amount lower than requested?',
      answer:
        'Under Kenya Revenue Authority (KRA) regulations, the 1.5% excise duty is deducted upfront from your disbursement. For example, on a KES 10,000 loan, KES 150 is deducted, and KES 9,850 is credited to your M-PESA wallet.',
    },
    {
      question: 'How do I repay my M-Shwari loan?',
      answer:
        'Repay anytime within 30 days via M-PESA USSD (*334# or *234#) or the M-PESA App by selecting Loans & Savings > M-Shwari > Pay Loan. Funds in your M-Shwari savings lock account or M-PESA wallet can be used.',
    },
    {
      question: 'What happens if I do not pay my M-Shwari loan on Day 30?',
      answer:
        'If unpaid on Day 30, your loan is automatically rolled over for an additional 30 days, incurring an extra 7.5% rollover fee. If unpaid after 60 days, your credit facility is suspended, funds in M-Shwari savings are frozen, and you are reported to Credit Reference Bureaus (CRB).',
    },
    {
      question: 'What is the minimum and maximum M-Shwari loan amount?',
      answer:
        'The minimum loan amount is KES 100, while the maximum loan limit can reach up to KES 1,000,000 for qualifying enterprise and high-volume individual accounts.',
    },
    {
      question: 'How can I increase my M-Shwari loan limit?',
      answer:
        'You can increase your limit by saving regularly in your M-Shwari deposit account, increasing overall M-PESA voice and data usage, and always repaying previous loans before the 30-day maturity deadline.',
    },
    {
      question: 'Does M-Shwari report borrowers to the Credit Reference Bureau (CRB)?',
      answer:
        'Yes. In accordance with Central Bank of Kenya credit reporting regulations, positive payment histories are reported to improve your credit score, while defaults exceeding 60 days are listed negatively.',
    },
    {
      question: 'Can I repay my M-Shwari loan in installments before 30 days?',
      answer:
        'Yes. You can make multiple partial payments of any amount at any time during the 30-day tenure until the full repayment amount is cleared.',
    },
  ];

  const workedExamples: WorkedExampleItem[] = [
    {
      title: 'Standard Personal Loan of KES 10,000',
      scenario: 'Borrowing KES 10,000 for 30 days for personal cash flow or business inventory.',
      inputs: [
        { label: 'Requested Loan Principal', value: 'KES 10,000.00' },
        { label: 'Tenure', value: '30 Calendar Days' },
      ],
      steps: [
        { label: '7.5% Facilitation Fee', formula: 'KES 10,000 × 7.5%', value: 'KES 750.00' },
        { label: '1.5% Upfront Excise Duty', formula: '20% of KES 750 fee', value: '-KES 150.00', isDeduction: true },
        { label: 'Net Cash Disbursed to Wallet', formula: 'KES 10,000 - KES 150', value: 'KES 9,850.00', highlight: true },
        { label: 'Day 30 Repayment Due', formula: 'KES 10,000 + KES 750', value: 'KES 10,750.00', highlight: true },
      ],
      resultLabel: 'Total Finance Cost',
      resultValue: 'KES 900.00 (9.0%)',
      notes: 'Customer receives KES 9,850 and repays KES 10,750.',
    },
    {
      title: 'Small Emergency Loan of KES 2,000',
      scenario: 'Borrowing KES 2,000 to cover emergency utility bills before salary date.',
      inputs: [
        { label: 'Requested Loan Principal', value: 'KES 2,000.00' },
        { label: 'Tenure', value: '30 Calendar Days' },
      ],
      steps: [
        { label: '7.5% Facilitation Fee', formula: 'KES 2,000 × 7.5%', value: 'KES 150.00' },
        { label: '1.5% Upfront Excise Duty', formula: '20% of KES 150', value: '-KES 30.00', isDeduction: true },
        { label: 'Net Cash Disbursed to Wallet', formula: 'KES 2,000 - KES 30', value: 'KES 1,970.00', highlight: true },
        { label: 'Day 30 Repayment Due', formula: 'KES 2,000 + KES 150', value: 'KES 2,150.00' },
      ],
      resultLabel: 'Total Finance Cost',
      resultValue: 'KES 180.00 (9.0%)',
      notes: 'Total cost of credit is exactly 9.0%.',
    },
  ];

  const officialSources: OfficialSourceLink[] = [
    {
      name: 'NCBA Bank Kenya PLC',
      documentTitle: 'Official M-Shwari Terms, Tariffs & Consumer Disclosures',
      url: 'https://ke.ncbagroup.com/m-shwari',
      verifiedDate: keRates.verifiedDate,
    },
    {
      name: 'Safaricom PLC',
      documentTitle: 'M-PESA Financial Services / M-Shwari Schedule',
      url: 'https://www.safaricom.co.ke/personal/m-pesa/credit-facilities/m-shwari',
      verifiedDate: keRates.verifiedDate,
    },
  ];

  const quickAnswerText = `M-Shwari loans carry a fixed ${keRates.mshwariFeeRate.toFixed(1)}% total finance charge consisting of a 7.5% facility fee plus a 1.5% excise duty (20% on the fee). The 1.5% excise component is deducted upfront from disbursement, while the principal plus 7.5% facility fee is repaid on Day ${keRates.mshwariTermDays}.`;

  const tocItems = [
    { id: 'fee-breakdown', label: 'How M-Shwari Fees Are Calculated' },
    { id: 'upfront-disbursement', label: 'Upfront Excise vs Day 30 Repayment' },
    { id: 'eligibility-and-limits', label: 'Loan Limits & Eligibility Rules' },
    { id: 'rollover-and-defaults', label: 'Late Payment Penalties & Rollover Charges' },
    { id: 'mshwari-vs-alternatives', label: 'M-Shwari vs Fuliza vs KCB M-PESA' },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <StructuredData
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Kenya', url: '/kenya/' },
          { name: 'M-Shwari Loan Calculator 2026', url: '/kenya/m-shwari-loan-calculator/' },
        ]}
        webApp={{
          name: 'M-Shwari Loan Calculator 2026',
          url: '/kenya/m-shwari-loan-calculator/',
          description: 'Calculate total repayment and the 9% one-time facility fee on 30-day NCBA M-Shwari mobile loans.',
          applicationCategory: 'FinanceApplication',
        }}
        faqs={faqs}
      />

      <Breadcrumbs
        items={[
          { label: 'Kenya', href: '/kenya/' },
          { label: 'M-Shwari Loan Calculator' },
        ]}
      />

      {/* Page Header */}
      <div className="border-b border-neutral-200 pb-6 pt-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
          M-Shwari Loan Calculator {keRates.verifiedYear}
        </h1>
        <p className="mt-2 text-sm sm:text-base text-neutral-600 max-w-3xl leading-relaxed">
          Compute net disbursement, 7.5% facility fee, 1.5% excise duty, and total Day 30 repayment on NCBA Safaricom M-Shwari mobile loans.
        </p>
      </div>

      {/* Main Grid: Inputs Left, Result Right */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Inputs Column */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-2xs space-y-6">
            <h2 className="text-base font-bold text-neutral-900 border-b border-neutral-100 pb-3">
              Loan Request
            </h2>

            <MoneyInput
              label="Requested Loan Amount"
              value={loanAmount}
              onChange={setLoanAmount}
              currencySymbol="KES"
              hint="Enter amount from KES 100 up to your approved NCBA M-Shwari limit (max KES 1,000,000)."
              min={100}
              max={1000000}
              required
            />
          </div>
        </div>

        {/* Right Sticky Result Column */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
          <ResultPanel
            title="M-Shwari Loan Breakdown"
            headlineLabel="Net Cash Disbursed"
            headlineValue={`KES ${mshwari.netDisbursedAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            subHeadline={`Repayment due at Day 30: KES ${mshwari.repaymentDueDay30.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
            rows={rows}
            sources={legalSources}
            copySummaryText={copySummaryText}
            shareTitle="M-Shwari Loan Calculation"
          />
        </div>
      </div>

      {/* SEO Article */}
      <SeoArticle
        quickAnswer={quickAnswerText}
        toc={tocItems}
        workedExamples={workedExamples}
        sources={officialSources}
        verifiedDate={keRates.verifiedDate}
      >
        <h2 id="fee-breakdown">How M-Shwari Loan Fees Are Calculated</h2>
        <p>
          M-Shwari is a micro-banking paperless service launched jointly by NCBA Bank Kenya and Safaricom PLC. It provides accessible 30-day term credit directly to active M-PESA subscribers without requiring branch visits or physical collateral.
        </p>
        <p>
          M-Shwari loans do not charge interest in the traditional monthly compounding sense; instead, they levy a one-time fixed <em>Loan Facilitation Fee</em> of 7.5% on the borrowed principal for a 30-day period.
        </p>
        <p>
          Under the Kenya Finance Act, banking facility fees are subject to a 20% Excise Duty on financial service fees. This 20% tax on the 7.5% fee equals 1.5% of the loan principal (7.5% × 20% = 1.5%), bringing the total legal cost of credit to exactly {keRates.mshwariFeeRate.toFixed(1)}%.
        </p>

        <h2 id="upfront-disbursement">Upfront Excise Deduction vs Day 30 Repayment</h2>
        <p>
          A common point of confusion for borrowers is the difference between requested principal and actual received funds:
        </p>
        <ul>
          <li><strong>Disbursement:</strong> When the loan is approved, the 1.5% excise duty is automatically deducted at the source. If you request KES 10,000, KES 150 is deducted, and KES 9,850 is deposited into your M-PESA wallet.</li>
          <li><strong>Repayment on Day 30:</strong> You must repay the original principal (KES 10,000) plus the 7.5% facilitation fee (KES 750), for a total due of KES 10,750.00.</li>
        </ul>

        <h2 id="eligibility-and-limits">Loan Limits and Eligibility Rules</h2>
        <p>
          To qualify for an M-Shwari loan, an applicant must:
        </p>
        <ol>
          <li>Be an active Safaricom M-PESA subscriber for at least six (6) months.</li>
          <li>Save actively in an M-Shwari deposit account.</li>
          <li>Maintain regular voice, SMS, data, and mobile money activity.</li>
          <li>Have no past-due defaults on M-Shwari, KCB M-PESA, or Fuliza.</li>
        </ol>

        <h2 id="rollover-and-defaults">Late Payment Penalties &amp; Rollover Charges</h2>
        <p>
          If you do not repay your loan within 30 days:
        </p>
        <ul>
          <li><strong>Day 31 Rollover:</strong> The loan is extended for another 30 calendar days. An additional 7.5% rollover fee is applied to the outstanding principal.</li>
          <li><strong>Day 60 Freeze:</strong> If the loan remains unpaid after 60 days, your M-Shwari deposit account is frozen, any accumulated savings are used to offset the debt, and your profile is forwarded to Credit Reference Bureaus (CRB).</li>
        </ul>

        <h2 id="mshwari-vs-alternatives">M-Shwari vs Fuliza vs KCB M-PESA</h2>
        <p>
          Comparing Kenya’s primary mobile borrowing products:
        </p>
        <ul>
          <li><strong>M-Shwari:</strong> Fixed 9.0% total cost for a 30-day fixed tenure. Best for planned business restocking or expenses lasting 2 to 4 weeks.</li>
          <li><strong>Fuliza:</strong> Overdraft facility with 1% access fee + daily charges (KES 2.50 to KES 25/day). Best for immediate 1- to 5-day emergencies.</li>
          <li><strong>KCB M-PESA:</strong> Similar 30-day facility with comparable 8.64%–9.0% effective rates and fixed 1-month repayment terms.</li>
        </ul>
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
