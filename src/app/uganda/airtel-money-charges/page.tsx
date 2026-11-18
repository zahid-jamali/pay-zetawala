'use client';

import React, { useState, useMemo } from 'react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { MoneyInput } from '@/components/MoneyInput';
import { Select } from '@/components/Select';
import { ResultPanel, BreakdownRow, CalculationLegalSource } from '@/components/ResultPanel';
import { FaqAccordion } from '@/components/FaqAccordion';
import { RelatedTools } from '@/components/RelatedTools';
import { SeoArticle, WorkedExampleItem, OfficialSourceLink } from '@/components/SeoArticle';
import { StructuredData } from '@/components/StructuredData';
import { getRelatedPages } from '@/config/pages';
import { calculateUgandaMomo, UgandaTransactionType } from '@/lib/ug/momo';
import { getUgRates } from '@/lib/seo/rules-content';

export default function AirtelMoneyChargesPage() {
  const ugRates = getUgRates();
  const [amount, setAmount] = useState<number>(50000);
  const [transactionType, setTransactionType] = useState<UgandaTransactionType>('withdraw_agent');

  const res = useMemo(() => {
    return calculateUgandaMomo({ amount, network: 'airtel', transactionType });
  }, [amount, transactionType]);

  const rows: BreakdownRow[] = [
    {
      label: 'Transaction Amount',
      value: `UGX ${amount.toLocaleString('en-US')}`,
    },
    {
      label: 'Airtel Money Operator Fee',
      value: `UGX ${res.operatorFee.toLocaleString('en-US')}`,
      highlight: true,
      sublabel: 'Official Airtel Money Uganda tariff band',
    },
    {
      label: '0.5% Government Statutory Tax',
      value: res.statutoryTaxAmount > 0 ? `UGX ${res.statutoryTaxAmount.toLocaleString('en-US')}` : 'UGX 0 (Tax-Exempt)',
      isDeduction: res.statutoryTaxAmount > 0,
      sublabel: res.statutoryTaxAmount > 0 ? 'Excise Duty Act (cash withdrawals only)' : 'P2P transfers are 100% tax-free',
    },
    {
      label: 'Total Transaction Cost',
      value: `UGX ${res.totalFee.toLocaleString('en-US')}`,
      highlight: true,
      sublabel: 'Operator fee + statutory government tax',
    },
    {
      label: 'Total Debited from Airtel Money Wallet',
      value: `UGX ${res.totalDebitedFromWallet.toLocaleString('en-US')}`,
      highlight: true,
    },
  ];

  const legalSources: CalculationLegalSource[] = [
    {
      title: 'Airtel Money Uganda Tariffs',
      documentNumber: 'Official Customer Tariff Guide',
      summary: `Regulates cash withdrawals, P2P transfers, bank deposits, and transaction ceilings. Maximum single transaction is UGX ${ugRates.maxSingleTxn.toLocaleString()}.`,
    },
    {
      title: 'Uganda Revenue Authority (URA)',
      documentNumber: 'Excise Duty (Amendment) Act 2018',
      summary: '0.5% statutory tax applies to all cash withdrawals across all telecom operators.',
    },
  ];

  const copySummaryText = `Airtel Uganda Mobile Money Charge (${ugRates.verifiedYear}):
Amount: UGX ${amount.toLocaleString()}
Transaction: ${transactionType.replace(/_/g, ' ')}
Airtel Fee: UGX ${res.operatorFee.toLocaleString()}
0.5% Government Tax: UGX ${res.statutoryTaxAmount.toLocaleString()}
Total Fee: UGX ${res.totalFee.toLocaleString()}
Total Debited: UGX ${res.totalDebitedFromWallet.toLocaleString()}
Calculated on Pay (https://pay.zetawala.com/uganda/airtel-money-charges/)`;

  const related = getRelatedPages('ug-airtel');

  const faqs = [
    {
      question: 'How much does Airtel Money charge to withdraw in Uganda in 2026?',
      answer:
        'Withdrawing cash from an Airtel agent incurs Airtel’s tiered operator fee plus the statutory 0.5% government tax. For instance, withdrawing UGX 50,000 costs UGX 1,600 (operator fee) + UGX 250 (0.5% tax), totaling UGX 1,850.',
    },
    {
      question: 'Is sending money from Airtel to MTN free of tax?',
      answer:
        'Yes. Transferring money person-to-person to another mobile money user—whether they are registered on Airtel or MTN—is completely exempt from the 0.5% government withdrawal tax.',
    },
    {
      question: 'What is the maximum amount I can send via Airtel Money in Uganda?',
      answer:
        'Under Bank of Uganda National Payment Systems regulations, the single transaction limit for Airtel Money is UGX 5,000,000, and the daily transaction limit is UGX 10,000,000.',
    },
    {
      question: 'How do I withdraw cash at an Airtel Money agent?',
      answer:
        'Dial *185#, select Withdraw Cash, choose Agent, enter the 6-digit agent merchant code, input the amount, and confirm by entering your secret 4-digit PIN.',
    },
    {
      question: 'Are merchant payments (Airtel Pay) free for customers?',
      answer:
        'Yes. Making payments for fuel, retail goods, or restaurant bills using Airtel Pay merchant till numbers (*185*9# or scanning QR codes) is 100% free of charge for the consumer.',
    },
    {
      question: 'How does Airtel Money compare with MTN MoMo on withdrawal fees?',
      answer:
        'Airtel Money and MTN MoMo share identical tariffs across most major withdrawal and sending bands in Uganda due to national telecommunications harmonization standards.',
    },
    {
      question: 'Can I reverse an erroneous Airtel Money transfer in Uganda?',
      answer:
        'Yes. Dial *185*60# immediately to initiate an automated transaction reversal, or call Airtel customer service at 100. If the recipient has not yet withdrawn the funds, Airtel freezes and returns the money within 24 hours.',
    },
    {
      question: 'What is the maximum wallet balance on Airtel Uganda?',
      answer:
        'Under Bank of Uganda regulations, fully KYC-verified Airtel Money accounts can hold a maximum wallet balance of up to UGX 20,000,000.',
    },
  ];

  const workedExamples: WorkedExampleItem[] = [
    {
      title: 'Agent Cash-Out of UGX 50,000',
      scenario: 'Withdrawing UGX 50,000 cash from an authorized Airtel Money agent.',
      inputs: [
        { label: 'Withdrawal Cash Amount', value: 'UGX 50,000' },
        { label: 'Channel', value: 'Authorized Airtel Agent' },
      ],
      steps: [
        { label: 'Airtel Operator Fee', formula: 'UGX 45k–60k band tariff', value: 'UGX 1,600' },
        { label: '0.5% Government Tax', formula: 'UGX 50,000 × 0.5%', value: 'UGX 250', isDeduction: true },
        { label: 'Total Transaction Charge', formula: 'UGX 1,600 + UGX 250', value: 'UGX 1,850', highlight: true },
        { label: 'Total Wallet Debit', formula: 'UGX 50,000 + UGX 1,850', value: 'UGX 51,850' },
      ],
      resultLabel: 'Total Balance Deducted',
      resultValue: 'UGX 51,850',
      notes: 'Customer receives UGX 50,000 cash in hand.',
    },
    {
      title: 'Sending UGX 30,000 to Registered User',
      scenario: 'Sending money directly to a colleague on Airtel or MTN.',
      inputs: [
        { label: 'Transfer Amount', value: 'UGX 30,000' },
        { label: 'Channel', value: 'P2P Transfer to Registered User' },
      ],
      steps: [
        { label: 'Airtel Transfer Fee', formula: 'Published P2P schedule', value: 'UGX 700', highlight: true },
        { label: '0.5% Statutory Tax', formula: 'Transfers are 100% tax-free', value: 'UGX 0 (Tax-Free)' },
        { label: 'Total Wallet Debit', formula: 'UGX 30,000 + UGX 700', value: 'UGX 30,700' },
      ],
      resultLabel: 'Total Balance Deducted',
      resultValue: 'UGX 30,700',
      notes: 'Recipient receives the full UGX 30,000.',
    },
  ];

  const officialSources: OfficialSourceLink[] = [
    {
      name: 'Airtel Uganda',
      documentTitle: 'Official Airtel Money Tariff Guide & Terms of Service',
      url: 'https://www.airtel.co.ug/airtelmoney',
      verifiedDate: ugRates.verifiedDate,
    },
    {
      name: 'Uganda Revenue Authority (URA)',
      documentTitle: 'Excise Duty (Amendment) Act 2018 Guidelines',
      url: 'https://www.ura.go.ug',
      verifiedDate: ugRates.verifiedDate,
    },
  ];

  const quickAnswerText = `Airtel Money charges in Uganda consist of Airtel's tiered band fees plus the statutory 0.5% government tax applied to cash withdrawals (Excise Duty Act 2018). Transfers to registered Airtel and MTN mobile money users are 100% tax-free. Maximum single transaction limit is UGX ${ugRates.maxSingleTxn.toLocaleString()}.`;

  const tocItems = [
    { id: 'airtel-tariffs', label: 'How Airtel Money Tariffs Work' },
    { id: 'withdrawal-tax', label: 'The 0.5% Government Cash-Out Tax' },
    { id: 'interoperability', label: 'Airtel to Airtel vs Airtel to MTN Rates' },
    { id: 'agent-guidelines', label: 'Agent Cash-Out Guidelines & PIN Security' },
    { id: 'airtel-pay', label: 'Airtel Pay Merchant & Utility Bill Payments' },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <StructuredData
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Uganda', url: '/uganda/' },
          { name: 'Airtel Money Charges 2026', url: '/uganda/airtel-money-charges/' },
        ]}
        webApp={{
          name: 'Airtel Money Charges Calculator 2026',
          url: '/uganda/airtel-money-charges/',
          description: 'Calculate official Airtel Uganda transfer fees, agent cash-out charges, and the statutory 0.5% government tax.',
          applicationCategory: 'FinanceApplication',
        }}
        faqs={faqs}
      />

      <Breadcrumbs
        items={[
          { label: 'Uganda', href: '/uganda/' },
          { label: 'Airtel Money Charges' },
        ]}
      />

      {/* Page Header */}
      <div className="border-b border-neutral-200 pb-6 pt-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
          Airtel Money Charges {ugRates.verifiedYear} (Uganda)
        </h1>
        <p className="mt-2 text-sm sm:text-base text-neutral-600 max-w-3xl leading-relaxed">
          Calculate official Airtel Uganda transfer fees, agent cash-outs, and statutory 0.5% government taxes. Look up exact fees for any amount up to UGX {ugRates.maxSingleTxn.toLocaleString()}.
        </p>
      </div>

      {/* Main Grid: Inputs Left, Result Right */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Inputs Column */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-2xs space-y-6">
            <h2 className="text-base font-bold text-neutral-900 border-b border-neutral-100 pb-3">
              Transaction Details
            </h2>

            <MoneyInput
              label="Transaction Amount"
              value={amount}
              onChange={setAmount}
              currencySymbol="UGX"
              hint={`Enter amount from UGX 500 up to UGX ${ugRates.maxSingleTxn.toLocaleString()} per transfer.`}
              min={500}
              max={ugRates.maxSingleTxn}
              required
            />

            <Select
              label="Transaction Type / Channel"
              value={transactionType}
              onChange={(val) => setTransactionType(val as UgandaTransactionType)}
              options={[
                { label: 'Withdraw Cash at Airtel Agent (0.5% Tax Applies)', value: 'withdraw_agent' },
                { label: 'Send Money to Registered User (Airtel / MTN - Tax-Free)', value: 'send_registered' },
                { label: 'Send Money to Bank Account', value: 'send_bank' },
              ]}
            />
          </div>
        </div>

        {/* Right Sticky Result Column */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
          <ResultPanel
            title="Airtel Money Cost Summary"
            headlineLabel="Total Transaction Fee"
            headlineValue={`UGX ${res.totalFee.toLocaleString('en-US')}`}
            subHeadline={`Total debited from wallet: UGX ${res.totalDebitedFromWallet.toLocaleString('en-US')}`}
            rows={rows}
            sources={legalSources}
            copySummaryText={copySummaryText}
            shareTitle="Airtel Uganda Fee Computation"
            calloutMessage={
              res.statutoryTaxAmount > 0
                ? {
                    type: 'info',
                    text: `0.5% Tax Applied: UGX ${res.statutoryTaxAmount.toLocaleString()} is collected on cash-out and remitted to the Uganda Revenue Authority (URA).`,
                  }
                : {
                    type: 'success',
                    text: 'Tax-Exempt: P2P money transfers are completely exempt from the 0.5% government tax.',
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
        verifiedDate={ugRates.verifiedDate}
      >
        <h2 id="airtel-tariffs">How Airtel Money Tariffs Work in Uganda</h2>
        <p>
          Airtel Money is one of the premier mobile financial platforms operating in Uganda. All transactions—including peer-to-peer sending, bank transfers, and agent cash-outs—follow official tariff bands established by Airtel Uganda and supervised by the Bank of Uganda under the National Payment Systems Act.
        </p>
        <p>
          Airtel’s tariff structure assigns transactions to fixed-fee tiers. For instance, sending amounts between UGX 15,001 and UGX 30,000 incurs a flat operator fee of UGX 700.
        </p>

        <h2 id="withdrawal-tax">The 0.5% Government Cash-Out Tax</h2>
        <p>
          Under the Excise Duty (Amendment) Act 2018 passed by the Parliament of Uganda, all mobile money users in Uganda are subject to a 0.5% statutory tax on cash withdrawals.
        </p>
        <p>
          Key tax parameters:
        </p>
        <ul>
          <li><strong>Agent Cash Withdrawals:</strong> Subject to a 0.5% tax calculated on the withdrawal amount (e.g., UGX 250 on a UGX 50,000 cash-out).</li>
          <li><strong>P2P Sending:</strong> 100% exempt from the 0.5% tax.</li>
          <li><strong>Airtel Pay Merchant Payments:</strong> 100% exempt from the 0.5% tax.</li>
          <li><strong>Utility Bill &amp; School Fee Payments:</strong> 100% exempt from the 0.5% tax.</li>
        </ul>

        <h2 id="interoperability">Airtel to Airtel vs Airtel to MTN Rates</h2>
        <p>
          In accordance with Bank of Uganda telecommunications interoperability mandates, sending money from your Airtel Money wallet to an MTN MoMo subscriber incurs the same standardized transfer fee as sending to another Airtel customer.
        </p>

        <h2 id="agent-guidelines">Agent Cash-Out Guidelines &amp; PIN Security</h2>
        <p>
          When withdrawing funds at an authorized Airtel Money agent, present your valid physical National ID or Passport. The agent keys in the transaction, and your phone displays a prompt showing the agent name and amount. Input your 4-digit PIN in private. Never disclose your secret PIN to an agent or third party.
        </p>

        <h2 id="airtel-pay">Airtel Pay Merchant &amp; Utility Bill Payments</h2>
        <p>
          Purchasing goods at retail shops, petrol stations, and supermarkets using Airtel Pay (*185*9# or scanning merchant QR codes) is completely free of charge (UGX 0.00) to the consumer. Merchants absorb the processing fee.
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
