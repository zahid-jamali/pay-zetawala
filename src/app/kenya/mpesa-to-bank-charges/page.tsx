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
import { calculateMpesaCharge } from '@/lib/ke/mpesa';
import { getKeRates } from '@/lib/seo/rules-content';

export default function MpesaToBankChargesPage() {
  const keRates = getKeRates();
  const [amount, setAmount] = useState<number>(5000);

  const paybillRes = useMemo(() => calculateMpesaCharge({ amount, transactionType: 'paybill' }), [amount]);

  const rows: BreakdownRow[] = [
    {
      label: 'Transfer to Bank Amount',
      value: `KES ${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
    },
    {
      label: 'Safaricom Paybill Fee',
      value: paybillRes.fee === 0 ? 'KES 0.00 (FREE)' : `KES ${paybillRes.fee.toFixed(2)}`,
      highlight: true,
      sublabel: `Inclusive of ${keRates.exciseDutyRate}% excise duty (Finance Act 2023)`,
    },
    {
      label: 'Total Deducted from M-PESA Wallet',
      value: `KES ${paybillRes.totalDebitedFromWallet.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      highlight: true,
      sublabel: 'Transfer amount + bank deposit tariff',
    },
    ...(paybillRes.band && 'min' in paybillRes.band
      ? [
          {
            label: 'Paybill Tariff Tier',
            value: `KES ${paybillRes.band.min.toLocaleString()} – KES ${paybillRes.band.max.toLocaleString()}`,
          },
        ]
      : []),
  ];

  const legalSources: CalculationLegalSource[] = [
    {
      title: 'Safaricom M-PESA Pay to Paybill Schedule',
      documentNumber: 'Customer Tariff Table 6 (Other Business Paybill)',
      summary: `Regulates consumer charges when transferring funds to bank accounts via commercial bank Paybill business numbers. Single transaction limit KES ${keRates.mpesaMaxSingleTxn.toLocaleString()}.`,
    },
    {
      title: 'Central Bank of Kenya (CBK)',
      documentNumber: 'National Payment System Regulations',
      summary: 'Re-introduced inter-bank and mobile wallet transfer fee schedules following regulatory gazettement.',
    },
  ];

  const copySummaryText = `M-PESA to Bank Transfer Charge (${keRates.verifiedYear}):
Amount: KES ${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
Paybill Fee: KES ${paybillRes.fee.toFixed(2)}
Total Debited: KES ${paybillRes.totalDebitedFromWallet.toLocaleString('en-US', { minimumFractionDigits: 2 })}
Calculated on Pay (https://pay.zetawala.com/kenya/mpesa-to-bank-charges/)`;

  const related = getRelatedPages('ke-bank');

  const faqs = [
    {
      question: 'How much does it cost to transfer money from M-PESA to a bank account in 2026?',
      answer:
        'Transferring money to a commercial bank Paybill number follows the Safaricom Paybill tariff. Transfers under KES 100 are free (KES 0.00). Fees range from KES 7 for KES 101–500, KES 34 for KES 2,501–5,000, KES 62 for KES 15,001–20,000, up to KES 108 for transfers between KES 150,001 and KES 250,000.',
    },
    {
      question: 'What is the Paybill number for major Kenyan banks?',
      answer:
        'Popular bank Paybill numbers include: Equity Bank (247247), KCB Bank (522522), Co-operative Bank (400200), NCBA Bank (888888), Absa Bank (303030), and Stanbic Bank (600100). The account number is always your full bank account number.',
    },
    {
      question: 'Are bank-to-M-PESA transfers subject to the same fees?',
      answer:
        'No. When transferring money from your bank account into M-PESA, charges are determined by your individual bank’s mobile banking tariff (typically ranging from KES 15 to KES 75 depending on bank tier), regulated under CBK guidelines.',
    },
    {
      question: 'What is the maximum amount you can transfer from M-PESA to a bank in one transaction?',
      answer:
        'The maximum single transfer limit from an M-PESA wallet to a bank account is KES 250,000 per transaction, subject to the overall KES 500,000 daily transaction ceiling.',
    },
    {
      question: 'How long does an M-PESA to bank transfer take to reflect?',
      answer:
        'Transfers via direct bank Paybill integration reflect in your commercial bank account balance instantly, typically within 5 to 60 seconds of receiving the M-PESA confirmation SMS.',
    },
    {
      question: 'What happens if I enter the wrong bank account number in the Paybill prompt?',
      answer:
        'Most integrated bank Paybills perform real-time name validation, displaying the account holder’s name before you enter your PIN. If an erroneous transaction completes, immediately call Safaricom (234) and contact your bank’s support desk to freeze the transfer before it is withdrawn.',
    },
    {
      question: 'Does the 15% excise duty apply to M-PESA to bank transfers?',
      answer:
        'Yes. All published Safaricom Paybill charges are legally inclusive of the 15% Excise Duty mandated by the Kenya Finance Act 2023 on mobile money transfer services.',
    },
    {
      question: 'Can I send money from M-PESA to another person’s bank account?',
      answer:
        'Yes. You can deposit funds into any third-party Kenyan bank account by entering the bank’s official Paybill number and the recipient’s bank account number as the account reference.',
    },
  ];

  const workedExamples: WorkedExampleItem[] = [
    {
      title: 'Deposit KES 5,000 into Equity Bank (Paybill 247247)',
      scenario: 'Transferring KES 5,000 from an M-PESA wallet into an Equity Bank personal checking account.',
      inputs: [
        { label: 'Deposit Amount', value: 'KES 5,000.00' },
        { label: 'Destination Bank', value: 'Equity Bank (Paybill 247247)' },
      ],
      steps: [
        { label: 'Paybill Tariff Tier', formula: 'KES 2,501 to KES 5,000 band', value: 'Band 6' },
        { label: 'Safaricom Paybill Fee', formula: 'Statutory customer charge', value: 'KES 34.00', highlight: true },
        { label: 'Total Deducted from M-PESA', formula: 'KES 5,000.00 + KES 34.00', value: 'KES 5,034.00' },
      ],
      resultLabel: 'Amount Credited to Bank Account',
      resultValue: 'KES 5,000.00',
      notes: 'Reflects immediately in Equity Mobile.',
    },
    {
      title: 'Deposit KES 20,000 into KCB Bank (Paybill 522522)',
      scenario: 'Transferring KES 20,000 from M-PESA to a KCB commercial account for loan repayment or savings.',
      inputs: [
        { label: 'Deposit Amount', value: 'KES 20,000.00' },
        { label: 'Destination Bank', value: 'KCB Bank (Paybill 522522)' },
      ],
      steps: [
        { label: 'Paybill Tariff Tier', formula: 'KES 15,001 to KES 20,000 band', value: 'Band 9' },
        { label: 'Safaricom Paybill Fee', formula: 'Statutory customer charge', value: 'KES 62.00', highlight: true },
        { label: 'Total Deducted from M-PESA', formula: 'KES 20,000.00 + KES 62.00', value: 'KES 20,062.00' },
      ],
      resultLabel: 'Amount Credited to Bank Account',
      resultValue: 'KES 20,000.00',
      notes: 'Customer wallet debited KES 20,062.00 total.',
    },
  ];

  const officialSources: OfficialSourceLink[] = [
    {
      name: 'Safaricom PLC',
      documentTitle: 'Official M-PESA Tariff Schedule (Paybill & Merchant Charges)',
      url: 'https://www.safaricom.co.ke/personal/m-pesa/tariffs',
      verifiedDate: keRates.verifiedDate,
    },
    {
      name: 'Central Bank of Kenya (CBK)',
      documentTitle: 'National Payment System Regulations & Inter-bank Tariffs',
      url: 'https://www.centralbank.go.ke',
      verifiedDate: keRates.verifiedDate,
    },
  ];

  const quickAnswerText = `Transferring funds from M-PESA to a Kenyan bank account via Paybill is regulated under Safaricom Pay to Paybill tariff bands. Fees range from KES 0 for amounts under KES 100, up to KES 108 for transfers between KES 150,001 and KES 250,000, inclusive of ${keRates.exciseDutyRate}% excise duty.`;

  const tocItems = [
    { id: 'paybill-tariff-rules', label: 'How M-PESA to Bank Paybill Charges Work' },
    { id: 'bank-paybill-directory', label: 'Major Kenyan Bank Paybill Directory' },
    { id: 'bank-to-mpesa-difference', label: 'M-PESA to Bank vs Bank to M-PESA' },
    { id: 'daily-transfer-limits', label: 'Transaction & Daily Transfer Caps' },
    { id: 'reversal-procedures', label: 'Reversing an Erroneous Bank Deposit' },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <StructuredData
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Kenya', url: '/kenya/' },
          { name: 'M-PESA to Bank Charges 2026', url: '/kenya/mpesa-to-bank-charges/' },
        ]}
        webApp={{
          name: 'M-PESA to Bank Charges Calculator 2026',
          url: '/kenya/mpesa-to-bank-charges/',
          description: 'Calculate exact Paybill and business transfer fees when moving funds from your M-PESA wallet into a Kenyan bank account.',
          applicationCategory: 'FinanceApplication',
        }}
        faqs={faqs}
      />

      <Breadcrumbs
        items={[
          { label: 'Kenya', href: '/kenya/' },
          { label: 'M-PESA to Bank Charges' },
        ]}
      />

      {/* Page Header */}
      <div className="border-b border-neutral-200 pb-6 pt-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
          M-PESA to Bank Charges Calculator {keRates.verifiedYear}
        </h1>
        <p className="mt-2 text-sm sm:text-base text-neutral-600 max-w-3xl leading-relaxed">
          Compute exact fees when transferring funds from Safaricom M-PESA to any Kenyan commercial bank account via Paybill. Supports Equity, KCB, Co-op, NCBA, Absa, and DTB.
        </p>
      </div>

      {/* Main Grid: Inputs Left, Result Right */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Inputs Column */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-2xs space-y-6">
            <h2 className="text-base font-bold text-neutral-900 border-b border-neutral-100 pb-3">
              Transfer to Bank Details
            </h2>

            <MoneyInput
              label="Amount to Transfer to Bank"
              value={amount}
              onChange={setAmount}
              currencySymbol="KES"
              hint={`Enter amount from KES 1 up to KES ${keRates.mpesaMaxSingleTxn.toLocaleString()} per transaction.`}
              min={1}
              max={keRates.mpesaMaxSingleTxn}
              required
            />
          </div>
        </div>

        {/* Right Sticky Result Column */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
          <ResultPanel
            title="Bank Transfer Summary"
            headlineLabel="Safaricom Paybill Fee"
            headlineValue={paybillRes.fee === 0 ? 'KES 0.00 (FREE)' : `KES ${paybillRes.fee.toFixed(2)}`}
            subHeadline={`Total debited from wallet: KES ${paybillRes.totalDebitedFromWallet.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
            rows={rows}
            sources={legalSources}
            copySummaryText={copySummaryText}
            shareTitle="M-PESA to Bank Fee Computation"
            calloutMessage={
              amount <= 100
                ? {
                    type: 'success',
                    text: 'Zero Fee: Transfers of KES 100 or less to bank Paybill numbers incur zero charges.',
                  }
                : undefined
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
        verifiedDate={keRates.verifiedDate}
      >
        <h2 id="paybill-tariff-rules">How M-PESA to Bank Paybill Charges Work</h2>
        <p>
          Moving money from your Safaricom M-PESA wallet into a commercial bank account in Kenya is executed using the recipient bank’s designated Paybill business number. The fee for this transaction is governed by Safaricom’s official <em>Pay to Paybill (Customer-Paid)</em> tariff schedule.
        </p>
        <p>
          Following the Central Bank of Kenya’s regulatory framework and the Kenya Finance Act 2023, transfers below KES 100 are completely free (KES 0.00). Transactions above KES 100 are subject to graduated band fees that already include the 15% statutory excise duty.
        </p>

        <h2 id="bank-paybill-directory">Major Kenyan Bank Paybill Directory</h2>
        <p>
          To complete an M-PESA to bank deposit, navigate to <strong>Lipa Na M-PESA &gt; Paybill</strong>, enter the relevant business number, and provide your full bank account number:
        </p>

        <div className="not-prose my-6 overflow-x-auto rounded-xl border border-neutral-200">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-100 text-neutral-800 uppercase font-bold">
              <tr>
                <th className="p-3">Commercial Bank</th>
                <th className="p-3">Official Paybill Number</th>
                <th className="p-3">Account Number Format</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 text-neutral-700">
              <tr>
                <td className="p-3 font-semibold text-neutral-900">Equity Bank</td>
                <td className="p-3 font-mono font-bold text-brand-strong">247247</td>
                <td className="p-3">Full Equity Bank Account Number</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-neutral-900">KCB Bank Kenya</td>
                <td className="p-3 font-mono font-bold text-brand-strong">522522</td>
                <td className="p-3">Full KCB Account Number</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-neutral-900">Co-operative Bank</td>
                <td className="p-3 font-mono font-bold text-brand-strong">400200</td>
                <td className="p-3">Full Co-op Bank Account Number</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-neutral-900">NCBA Bank</td>
                <td className="p-3 font-mono font-bold text-brand-strong">888888</td>
                <td className="p-3">Full NCBA Account Number</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-neutral-900">Absa Bank Kenya</td>
                <td className="p-3 font-mono font-bold text-brand-strong">303030</td>
                <td className="p-3">Full Absa Account Number</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-neutral-900">Stanbic Bank</td>
                <td className="p-3 font-mono font-bold text-brand-strong">600100</td>
                <td className="p-3">Full Stanbic Account Number</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 id="bank-to-mpesa-difference">M-PESA to Bank vs Bank to M-PESA</h2>
        <p>
          It is vital to distinguish between outgoing and incoming transfers:
        </p>
        <ul>
          <li><strong>M-PESA to Bank:</strong> Governed by the Safaricom Paybill tariff shown on this page. Fees are deducted directly from your M-PESA balance.</li>
          <li><strong>Bank to M-PESA:</strong> Initiated via your bank’s USSD or mobile banking application. Charges are set independently by your bank and deducted from your bank balance.</li>
        </ul>

        <h2 id="daily-transfer-limits">Transaction &amp; Daily Transfer Caps</h2>
        <p>
          Under Central Bank of Kenya directives, you can transfer up to KES {keRates.mpesaMaxSingleTxn.toLocaleString()} in a single M-PESA transaction to a bank Paybill number, subject to your overall daily wallet limit of KES {keRates.mpesaMaxDailyLimit.toLocaleString()}.
        </p>

        <h2 id="reversal-procedures">Reversing an Erroneous Bank Deposit</h2>
        <p>
          Because bank Paybills link to institutional accounts, Safaricom cannot automatically reverse an erroneous transaction without the bank’s authorization. If you deposit funds into the wrong bank account number, immediately copy the M-PESA transaction code and contact both Safaricom customer care (234) and the destination bank’s fraud and support desk with the deposit reference.
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
