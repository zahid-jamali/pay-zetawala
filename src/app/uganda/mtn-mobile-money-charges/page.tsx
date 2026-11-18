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

export default function MtnMobileMoneyChargesPage() {
  const ugRates = getUgRates();
  const [amount, setAmount] = useState<number>(50000);
  const [transactionType, setTransactionType] = useState<UgandaTransactionType>('withdraw_agent');

  const res = useMemo(() => {
    return calculateUgandaMomo({ amount, network: 'mtn', transactionType });
  }, [amount, transactionType]);

  const rows: BreakdownRow[] = [
    {
      label: 'Transaction Amount',
      value: `UGX ${amount.toLocaleString('en-US')}`,
    },
    {
      label: 'MTN MoMo Operator Fee',
      value: `UGX ${res.operatorFee.toLocaleString('en-US')}`,
      highlight: true,
      sublabel: 'Standard published MTN Uganda band fee',
    },
    {
      label: `0.5% Government Withdrawal Tax`,
      value: res.statutoryTaxAmount > 0 ? `UGX ${res.statutoryTaxAmount.toLocaleString('en-US')}` : 'UGX 0 (Tax-Exempt)',
      isDeduction: res.statutoryTaxAmount > 0,
      sublabel: res.statutoryTaxAmount > 0 ? 'Excise Duty Act 2018 (applies to cash withdrawals only)' : 'P2P transfers are 100% tax-free',
    },
    {
      label: 'Total Transaction Cost',
      value: `UGX ${res.totalFee.toLocaleString('en-US')}`,
      highlight: true,
      sublabel: 'Operator fee + statutory government tax',
    },
    {
      label: 'Total Debited from MTN MoMo Wallet',
      value: `UGX ${res.totalDebitedFromWallet.toLocaleString('en-US')}`,
      highlight: true,
    },
  ];

  const legalSources: CalculationLegalSource[] = [
    {
      title: 'MTN Uganda MoMo Tariffs',
      documentNumber: 'Official Customer Fee Schedule',
      summary: `Regulates sending to MTN/other networks, agent cash-outs, bank transfers, and account limits. Maximum single transaction is UGX ${ugRates.maxSingleTxn.toLocaleString()}.`,
    },
    {
      title: 'Parliament of Uganda & URA',
      documentNumber: 'Excise Duty (Amendment) Act 2018',
      summary: 'Mandates a 0.5% excise duty exclusively on cash withdrawals. Person-to-person sending is 100% exempt from this tax.',
    },
  ];

  const copySummaryText = `MTN Uganda MoMo Charge (${ugRates.verifiedYear}):
Amount: UGX ${amount.toLocaleString()}
Transaction: ${transactionType.replace(/_/g, ' ')}
MTN Operator Fee: UGX ${res.operatorFee.toLocaleString()}
0.5% Government Tax: UGX ${res.statutoryTaxAmount.toLocaleString()}
Total Fee: UGX ${res.totalFee.toLocaleString()}
Total Debited: UGX ${res.totalDebitedFromWallet.toLocaleString()}
Calculated on Pay (https://pay.zetawala.com/uganda/mtn-mobile-money-charges/)`;

  const related = getRelatedPages('ug-mtn');

  const faqs = [
    {
      question: 'How much does MTN Mobile Money charge to withdraw in Uganda?',
      answer:
        'Withdrawing cash from an MTN agent incurs MTN’s tiered operator fee plus a 0.5% government tax. For example, withdrawing UGX 50,000 costs UGX 1,600 (operator fee) + UGX 250 (0.5% tax), totaling UGX 1,850.',
    },
    {
      question: 'Does the 0.5% mobile money tax apply to sending money?',
      answer:
        'No. Under the Excise Duty (Amendment) Act 2018 passed by the Parliament of Uganda, the 0.5% tax applies exclusively to cash withdrawals (cashing out at agents or ATMs). Sending money to another user or paying utilities is 100% exempt from the 0.5% tax.',
    },
    {
      question: 'What is the maximum amount you can send on MTN MoMo in a single transfer?',
      answer:
        'Under Bank of Uganda National Payment Systems regulations, the maximum single transaction limit on MTN MoMo is UGX 5,000,000.',
    },
    {
      question: 'What is the daily transaction limit for MTN MoMo accounts?',
      answer:
        'The maximum daily transaction limit for a registered MTN Mobile Money customer is UGX 10,000,000.',
    },
    {
      question: 'How much does it cost to send money to Airtel Uganda from MTN?',
      answer:
        'Under standardized national interoperability tariffs, sending money to an Airtel Uganda number from your MTN wallet incurs the same standardized transfer fee as sending to an MTN number.',
    },
    {
      question: 'How do I withdraw money from an MTN MoMo agent?',
      answer:
        'Dial *165#, select Withdraw Cash, choose From Agent, and enter the Agent’s 6-digit terminal code and amount. You will receive an authorization prompt to enter your secret PIN.',
    },
    {
      question: 'Are merchant payments (MoMoPay) free for customers in Uganda?',
      answer:
        'Yes. Making retail payments at merchant shops using MTN MoMoPay (*165*3# or merchant QR code) is completely free of charge (UGX 0) to the consumer.',
    },
    {
      question: 'What is the minimum balance required on MTN MoMo?',
      answer:
        'There is no minimum operating balance requirement on MTN Mobile Money. However, your wallet balance must be sufficient to cover both the transfer principal and the combined operator and tax charges.',
    },
  ];

  const workedExamples: WorkedExampleItem[] = [
    {
      title: 'Agent Cash Withdrawal of UGX 50,000',
      scenario: 'Withdrawing physical currency from an authorized MTN MoMo agent.',
      inputs: [
        { label: 'Withdrawal Principal', value: 'UGX 50,000' },
        { label: 'Channel', value: 'MTN Authorized Agent' },
      ],
      steps: [
        { label: 'MTN Operator Fee (UGX 45k–60k band)', formula: 'Tiered tariff schedule', value: 'UGX 1,600' },
        { label: '0.5% Statutory Withdrawal Tax', formula: 'UGX 50,000 × 0.5%', value: 'UGX 250', isDeduction: true },
        { label: 'Total Transaction Charge', formula: 'UGX 1,600 + UGX 250', value: 'UGX 1,850', highlight: true },
        { label: 'Total Wallet Debit', formula: 'UGX 50,000 + UGX 1,850', value: 'UGX 51,850' },
      ],
      resultLabel: 'Total Balance Deducted',
      resultValue: 'UGX 51,850',
      notes: 'Customer receives UGX 50,000 cash from the agent.',
    },
    {
      title: 'Sending UGX 100,000 to Registered User',
      scenario: 'Transferring money directly to a family member or business partner.',
      inputs: [
        { label: 'Transfer Amount', value: 'UGX 100,000' },
        { label: 'Channel', value: 'P2P Mobile Money Transfer' },
      ],
      steps: [
        { label: 'MTN Transfer Fee', formula: 'Published P2P schedule', value: 'UGX 1,000', highlight: true },
        { label: '0.5% Statutory Tax', formula: 'P2P transfer is tax-exempt', value: 'UGX 0 (Tax-Free)' },
        { label: 'Total Wallet Debit', formula: 'UGX 100,000 + UGX 1,000', value: 'UGX 101,000' },
      ],
      resultLabel: 'Total Balance Deducted',
      resultValue: 'UGX 101,000',
      notes: 'Recipient receives the full UGX 100,000.',
    },
  ];

  const officialSources: OfficialSourceLink[] = [
    {
      name: 'MTN Uganda',
      documentTitle: 'Official MoMo Tariffs & Customer Fee Schedule',
      url: 'https://www.mtn.co.ug/personal/momo',
      verifiedDate: ugRates.verifiedDate,
    },
    {
      name: 'Uganda Revenue Authority (URA)',
      documentTitle: 'Excise Duty (Amendment) Act 2018 (0.5% Mobile Money Tax)',
      url: 'https://www.ura.go.ug',
      verifiedDate: ugRates.verifiedDate,
    },
  ];

  const quickAnswerText = `MTN Mobile Money charges in Uganda consist of MTN's tiered operator fee plus the statutory 0.5% government excise tax applied solely to cash withdrawals (Excise Duty Act 2018). P2P sending to MTN and Airtel users is 100% tax-free. Maximum single transaction limit is UGX ${ugRates.maxSingleTxn.toLocaleString()}.`;

  const tocItems = [
    { id: 'tariff-system', label: 'How MTN MoMo Tariffs Work' },
    { id: 'statutory-tax-rules', label: 'The 0.5% Government Withdrawal Tax' },
    { id: 'sending-vs-withdrawing', label: 'Sending to MTN vs Airtel Uganda' },
    { id: 'agent-cashouts', label: 'Agent Withdrawal Tiers & Rules' },
    { id: 'bou-limits', label: 'Bank of Uganda Transaction Limits' },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <StructuredData
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Uganda', url: '/uganda/' },
          { name: 'MTN MoMo Charges 2026', url: '/uganda/mtn-mobile-money-charges/' },
        ]}
        webApp={{
          name: 'MTN Mobile Money Charges Calculator 2026',
          url: '/uganda/mtn-mobile-money-charges/',
          description: 'Calculate official MTN Uganda MoMo sending fees and agent cash-out charges with the mandatory 0.5% government tax included.',
          applicationCategory: 'FinanceApplication',
        }}
        faqs={faqs}
      />

      <Breadcrumbs
        items={[
          { label: 'Uganda', href: '/uganda/' },
          { label: 'MTN Mobile Money Charges' },
        ]}
      />

      {/* Page Header */}
      <div className="border-b border-neutral-200 pb-6 pt-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
          MTN Mobile Money Charges {ugRates.verifiedYear} (Uganda)
        </h1>
        <p className="mt-2 text-sm sm:text-base text-neutral-600 max-w-3xl leading-relaxed">
          Calculate official MTN Uganda MoMo sending and withdrawal charges. Accurately factors in the statutory 0.5% government cash-out tax under the Excise Duty Act.
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
                { label: 'Withdraw Cash at MTN Agent (0.5% Tax Applies)', value: 'withdraw_agent' },
                { label: 'Send Money to Registered User (MTN / Airtel - Tax-Free)', value: 'send_registered' },
                { label: 'Send Money to Bank Account', value: 'send_bank' },
              ]}
            />
          </div>
        </div>

        {/* Right Sticky Result Column */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
          <ResultPanel
            title="MTN MoMo Cost Summary"
            headlineLabel="Total Transaction Fee"
            headlineValue={`UGX ${res.totalFee.toLocaleString('en-US')}`}
            subHeadline={`Total debited from wallet: UGX ${res.totalDebitedFromWallet.toLocaleString('en-US')}`}
            rows={rows}
            sources={legalSources}
            copySummaryText={copySummaryText}
            shareTitle="MTN Uganda MoMo Fee Computation"
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
        <h2 id="tariff-system">How MTN Uganda MoMo Tariffs Work</h2>
        <p>
          MTN Mobile Money (MoMo) is Uganda’s largest cellular financial service platform. Charges for transferring and withdrawing money are governed by tiered tariff bands established by MTN Uganda and regulated by the Bank of Uganda under the National Payment Systems Act.
        </p>
        <p>
          Unlike percentage-based banking charges, MTN MoMo assigns transactions to fixed-fee tiers. For instance, sending between UGX 60,001 and UGX 125,000 incurs a flat operator fee of UGX 1,000, regardless of whether you send UGX 70,000 or UGX 120,000.
        </p>

        <h2 id="statutory-tax-rules">The 0.5% Government Withdrawal Tax Explained</h2>
        <p>
          In 2018, the Parliament of Uganda enacted the Excise Duty (Amendment) Act 2018. Following widespread public consultations, the legislation established a 0.5% statutory tax that applies exclusively to cash withdrawals from mobile money wallets.
        </p>
        <p>
          Key tax parameters:
        </p>
        <ul>
          <li><strong>Cash Withdrawals:</strong> Subject to a 0.5% tax calculated directly on the cash withdrawal principal (e.g., UGX 250 on a UGX 50,000 withdrawal).</li>
          <li><strong>P2P Sending:</strong> Completely exempt from the 0.5% tax (0% tax rate).</li>
          <li><strong>Merchant Payments (MoMoPay):</strong> Completely exempt from the 0.5% tax.</li>
          <li><strong>Utility Bill Payments:</strong> Completely exempt from the 0.5% tax.</li>
        </ul>

        <h2 id="sending-vs-withdrawing">Sending Money to MTN vs Airtel Uganda</h2>
        <p>
          Following Bank of Uganda directives on digital financial interoperability, MTN Uganda and Airtel Uganda maintain reciprocal national transfer tariffs. Transferring funds to another registered mobile money user—whether they are on MTN MoMo or Airtel Money—incurs the same standardized P2P fee schedule.
        </p>

        <h2 id="agent-cashouts">Agent Withdrawal Tiers and Operational Guidelines</h2>
        <p>
          Withdrawing cash requires locating an authorized MTN agent. Under Bank of Uganda KYC guidelines, you must show a valid physical National Identification Card (for Ugandan citizens) or Passport (for foreign residents). The agent initiates the transaction via their terminal, and you confirm the withdrawal with your secret 5-digit PIN. Never disclose your PIN aloud to an agent.
        </p>

        <h2 id="bou-limits">Bank of Uganda Transaction and Balance Limits</h2>
        <p>
          Under the National Payment Systems framework, standard verified personal accounts are subject to:
        </p>
        <ul>
          <li><strong>Single Transaction Limit:</strong> UGX {ugRates.maxSingleTxn.toLocaleString()} maximum per transfer.</li>
          <li><strong>Daily Transaction Limit:</strong> UGX {ugRates.maxDailyLimit.toLocaleString()} cumulative within 24 hours.</li>
          <li><strong>Maximum Account Balance:</strong> UGX {ugRates.maxBalance.toLocaleString()} maximum wallet holding limit.</li>
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
