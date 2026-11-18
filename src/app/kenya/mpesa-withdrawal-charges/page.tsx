'use client';

import React, { useState, useMemo } from 'react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { MoneyInput } from '@/components/MoneyInput';
import { SegmentedControl } from '@/components/SegmentedControl';
import { ResultPanel, BreakdownRow, CalculationLegalSource } from '@/components/ResultPanel';
import { FaqAccordion } from '@/components/FaqAccordion';
import { RelatedTools } from '@/components/RelatedTools';
import { SeoArticle, WorkedExampleItem, OfficialSourceLink } from '@/components/SeoArticle';
import { StructuredData } from '@/components/StructuredData';
import { getRelatedPages } from '@/config/pages';
import { calculateMpesaCharge } from '@/lib/ke/mpesa';
import { getKeRates } from '@/lib/seo/rules-content';

export default function MpesaWithdrawalChargesPage() {
  const keRates = getKeRates();
  const [amount, setAmount] = useState<number>(3000);
  const [method, setMethod] = useState<'withdraw_agent' | 'withdraw_atm'>('withdraw_agent');

  const agentRes = useMemo(() => calculateMpesaCharge({ amount, transactionType: 'withdraw_agent' }), [amount]);
  const atmRes = useMemo(() => calculateMpesaCharge({ amount, transactionType: 'withdraw_atm' }), [amount]);

  const activeRes = method === 'withdraw_agent' ? agentRes : atmRes;

  const rows: BreakdownRow[] = [
    {
      label: 'Cash Withdrawal Amount',
      value: `KES ${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
    },
    {
      label: method === 'withdraw_agent' ? 'Agent Cash-Out Fee' : 'ATM Withdrawal Fee',
      value: activeRes.isExceedingLimit ? 'Not Available' : `KES ${activeRes.fee.toFixed(2)}`,
      highlight: true,
      sublabel: `Inclusive of ${keRates.exciseDutyRate}% excise duty (Finance Act 2023)`,
    },
    {
      label: 'Total Deducted from M-PESA Wallet',
      value: activeRes.isExceedingLimit ? '—' : `KES ${activeRes.totalDebitedFromWallet.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      highlight: true,
      sublabel: 'Cash received + withdrawal charge',
    },
    {
      label: 'Comparison: Agent vs ATM',
      value:
        agentRes.fee < atmRes.fee
          ? `Agent is KES ${(atmRes.fee - agentRes.fee).toFixed(2)} cheaper`
          : agentRes.fee > atmRes.fee
          ? `ATM is KES ${(agentRes.fee - atmRes.fee).toFixed(2)} cheaper`
          : 'Both cost the exact same',
      sublabel: `Agent: KES ${agentRes.fee} | ATM: ${atmRes.isExceedingLimit ? 'Limit exceeded' : `KES ${atmRes.fee}`}`,
    },
  ];

  const legalSources: CalculationLegalSource[] = [
    {
      title: 'Safaricom M-PESA Withdrawal Tariff Schedule',
      documentNumber: 'Official Customer Tariff & Cash-Out Rates',
      summary: `Agent cash-out available from KES 50 up to KES ${keRates.mpesaMaxSingleTxn.toLocaleString()}. ATM cash withdrawals available from KES 200 up to KES 20,000.`,
    },
    {
      title: 'Kenya Finance Act 2023',
      documentNumber: 'Excise Duty on Cash-Out Services',
      summary: `15% excise duty applies across all cash withdrawal transactions and is included in published tariff amounts.`,
    },
  ];

  const copySummaryText = `M-PESA Cash Withdrawal Charge (${keRates.verifiedYear}):
Amount: KES ${amount.toLocaleString()}
Method: ${method === 'withdraw_agent' ? 'M-PESA Agent Cash-Out' : 'Cardless ATM Cash-Out'}
Withdrawal Fee: KES ${activeRes.fee.toFixed(2)}
Total Debited: KES ${activeRes.totalDebitedFromWallet.toLocaleString('en-US', { minimumFractionDigits: 2 })}
Calculated on Pay (https://pay.zetawala.com/kenya/mpesa-withdrawal-charges/)`;

  const related = getRelatedPages('ke-withdrawal');

  const faqs = [
    {
      question: 'How much does it cost to withdraw cash from an M-PESA agent in 2026?',
      answer:
        'Agent withdrawal fees are graduated by band: KES 11 (KES 50–100), KES 29 (KES 501–1,000), KES 52 (KES 2,501–3,500), KES 69 (KES 3,501–5,000), KES 115 (KES 7,501–10,000), and KES 309 for KES 150,001–250,000.',
    },
    {
      question: 'Is it cheaper to withdraw M-PESA from an ATM or an agent?',
      answer:
        'For amounts between KES 2,501 and KES 5,000, agent withdrawals are cheaper (KES 52 or KES 69 at an agent vs KES 69 at an ATM). For amounts up to KES 2,500, ATM withdrawals cost KES 35, while agents cost KES 29 to KES 52 depending on the exact tier.',
    },
    {
      question: 'What is the minimum amount you can withdraw from an M-PESA agent?',
      answer:
        'The statutory minimum amount you can withdraw from an authorized Safaricom agent is KES 50. You cannot withdraw amounts below KES 50 at an agent.',
    },
    {
      question: 'What is the maximum amount you can withdraw in a single transaction?',
      answer:
        'The maximum single withdrawal limit at an M-PESA agent is KES 250,000, subject to the agent having adequate physical float.',
    },
    {
      question: 'Do I need my national ID card to withdraw at an M-PESA agent?',
      answer:
        'Yes. Central Bank of Kenya Know-Your-Customer (KYC) regulations require you to present your physical National ID or valid Passport to the agent before any cash-out transaction can be authorized.',
    },
    {
      question: 'How do ATM cardless withdrawals work on M-PESA?',
      answer:
        'Dial *334# or use the M-PESA app, select Withdraw Cash, choose ATM, and enter the ATM Agent number. You will receive a 6-digit one-time authorization code via SMS that remains valid for 4 hours at the ATM terminal.',
    },
    {
      question: 'Can an M-PESA agent charge extra fees for cash withdrawals?',
      answer:
        'No. Authorized Safaricom agents are strictly prohibited from charging additional fees, surcharges, or separate cash payments. All charges are deducted automatically from your M-PESA wallet balance.',
    },
    {
      question: 'What should I do if an agent cash-out fails but funds are debited?',
      answer:
        'Send the M-PESA confirmation SMS to Safaricom customer care on 234 or call 100/200. M-PESA support investigates the float transaction and reverses the debit within minutes if the agent terminal failed.',
    },
  ];

  const workedExamples: WorkedExampleItem[] = [
    {
      title: 'Agent Cash Withdrawal of KES 3,000',
      scenario: 'Withdrawing KES 3,000 in cash from an authorized neighborhood M-PESA agent.',
      inputs: [
        { label: 'Withdrawal Cash Amount', value: 'KES 3,000.00' },
        { label: 'Channel', value: 'M-PESA Agent' },
      ],
      steps: [
        { label: 'Assigned Band', formula: 'KES 2,501 to KES 3,500', value: 'Tariff Band 6' },
        { label: 'Official Agent Fee', formula: 'Published Safaricom charge', value: 'KES 52.00', highlight: true },
        { label: 'ATM Fee Comparison', formula: 'ATM fee for KES 3k', value: 'KES 69.00 (Agent is KES 17 cheaper)' },
        { label: 'Total Wallet Debit', formula: 'KES 3,000.00 + KES 52.00', value: 'KES 3,052.00' },
      ],
      resultLabel: 'Total Balance Required',
      resultValue: 'KES 3,052.00',
      notes: 'Customer receives KES 3,000 cash from agent.',
    },
    {
      title: 'Agent Cash Withdrawal of KES 10,000',
      scenario: 'Withdrawing KES 10,000 cash to pay contractors or merchants.',
      inputs: [
        { label: 'Withdrawal Cash Amount', value: 'KES 10,000.00' },
        { label: 'Channel', value: 'M-PESA Agent' },
      ],
      steps: [
        { label: 'Assigned Band', formula: 'KES 7,501 to KES 10,000', value: 'Tariff Band 9' },
        { label: 'Official Agent Fee', formula: 'Published Safaricom charge', value: 'KES 115.00', highlight: true },
        { label: 'Total Wallet Debit', formula: 'KES 10,000.00 + KES 115.00', value: 'KES 10,115.00' },
      ],
      resultLabel: 'Total Balance Required',
      resultValue: 'KES 10,115.00',
      notes: 'Customer must have KES 10,115 in wallet before initiating.',
    },
  ];

  const officialSources: OfficialSourceLink[] = [
    {
      name: 'Safaricom PLC',
      documentTitle: 'Official M-PESA Tariff Schedule (Withdrawal Band Rates)',
      url: 'https://www.safaricom.co.ke/personal/m-pesa/tariffs',
      verifiedDate: keRates.verifiedDate,
    },
  ];

  const quickAnswerText = `M-PESA agent withdrawal fees in Kenya range from KES 11 (KES 50–100) to KES 309 (KES 150,001–250,000) inclusive of ${keRates.exciseDutyRate}% excise duty. Minimum agent withdrawal is KES 50 and maximum per transaction is KES ${keRates.mpesaMaxSingleTxn.toLocaleString()}. Cardless ATM withdrawals are available from KES 200 to KES 20,000.`;

  const tocItems = [
    { id: 'agent-rates-overview', label: 'Official M-PESA Agent Withdrawal Rates' },
    { id: 'agent-vs-atm', label: 'Agent vs ATM: Cost & Feature Comparison' },
    { id: 'cashout-limits', label: 'Minimum and Maximum Cash-Out Limits' },
    { id: 'reducing-withdrawal-costs', label: 'Strategies to Reduce Withdrawal Fees' },
    { id: 'reversals-and-security', label: 'Transaction Security & Reversal Rules' },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <StructuredData
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Kenya', url: '/kenya/' },
          { name: 'M-PESA Withdrawal Charges 2026', url: '/kenya/mpesa-withdrawal-charges/' },
        ]}
        webApp={{
          name: 'M-PESA Withdrawal Charges Calculator 2026',
          url: '/kenya/mpesa-withdrawal-charges/',
          description: 'Find the exact fee to withdraw cash from a Safaricom M-PESA agent or ATM for any amount up to KES 250,000.',
          applicationCategory: 'FinanceApplication',
        }}
        faqs={faqs}
      />

      <Breadcrumbs
        items={[
          { label: 'Kenya', href: '/kenya/' },
          { label: 'M-PESA Withdrawal Charges' },
        ]}
      />

      {/* Page Header */}
      <div className="border-b border-neutral-200 pb-6 pt-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
          M-PESA Withdrawal Charges {keRates.verifiedYear}
        </h1>
        <p className="mt-2 text-sm sm:text-base text-neutral-600 max-w-3xl leading-relaxed">
          Find the exact fee to withdraw cash from an authorized Safaricom M-PESA agent or cardless ATM. Compare agent vs ATM charges side by side for any amount up to KES {keRates.mpesaMaxSingleTxn.toLocaleString()}.
        </p>
      </div>

      {/* Main Grid: Inputs Left, Result Right */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Inputs Column */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-2xs space-y-6">
            <h2 className="text-base font-bold text-neutral-900 border-b border-neutral-100 pb-3">
              Cash-Out Inputs
            </h2>

            <MoneyInput
              label="Amount to Withdraw"
              value={amount}
              onChange={setAmount}
              currencySymbol="KES"
              hint={`Enter cash amount from KES 50 up to KES ${keRates.mpesaMaxSingleTxn.toLocaleString()}.`}
              min={50}
              max={keRates.mpesaMaxSingleTxn}
              required
            />

            <SegmentedControl<'withdraw_agent' | 'withdraw_atm'>
              label="Withdrawal Channel"
              value={method}
              onChange={setMethod}
              options={[
                { label: 'Authorized M-PESA Agent', value: 'withdraw_agent' },
                { label: 'Cardless Bank ATM (PESAPOINT / KCB)', value: 'withdraw_atm' },
              ]}
            />
          </div>
        </div>

        {/* Right Sticky Result Column */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
          <ResultPanel
            title="Withdrawal Fee Summary"
            headlineLabel={method === 'withdraw_agent' ? 'Agent Cash-Out Fee' : 'ATM Withdrawal Fee'}
            headlineValue={activeRes.isExceedingLimit ? 'Limit Exceeded' : `KES ${activeRes.fee.toFixed(2)}`}
            subHeadline={
              activeRes.isExceedingLimit
                ? 'ATM withdrawals are capped at KES 20,000'
                : `Total balance needed in wallet: KES ${activeRes.totalDebitedFromWallet.toLocaleString('en-US', { minimumFractionDigits: 2 })}`
            }
            rows={rows}
            sources={legalSources}
            copySummaryText={copySummaryText}
            shareTitle="M-PESA Withdrawal Charge"
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
        <h2 id="agent-rates-overview">Official M-PESA Agent Withdrawal Rates</h2>
        <p>
          Withdrawing physical cash from an authorized Safaricom M-PESA agent in Kenya incurs a tiered fee based on the transaction amount. Under the official Safaricom tariff schedule, agent cash-out charges are designed to reflect the liquidity and float costs carried by retail agents across the country.
        </p>
        <p>
          Unlike peer-to-peer transfers, there is no zero-fee withdrawal tier. All cash withdrawals from KES 50 upwards incur a charge, which already includes the 15% statutory Excise Duty under the Kenya Finance Act 2023.
        </p>

        <h2 id="agent-vs-atm">Agent vs ATM: Cost &amp; Feature Comparison</h2>
        <p>
          Safaricom supports two distinct methods for cash withdrawals:
        </p>
        <ul>
          <li><strong>Agent Cash-Out:</strong> Available at over 260,000 retail agents across Kenya. You must provide your National ID or Passport. Fees range from KES 11 up to KES 309. Maximum single transaction is KES {keRates.mpesaMaxSingleTxn.toLocaleString()}.</li>
          <li><strong>Cardless ATM Cash-Out:</strong> Available at participating bank ATMs (PESAPOINT, Equity Bank, KCB, Family Bank, Diamond Trust Bank). No bank card is needed; you generate a 6-digit authorization token via *334# that is valid for 4 hours. Capped at KES 20,000 per transaction.</li>
        </ul>

        <h2 id="cashout-limits">Minimum and Maximum Cash-Out Limits</h2>
        <p>
          Under Central Bank of Kenya prudential guidelines:
        </p>
        <ul>
          <li><strong>Agent Minimum:</strong> KES 50 per withdrawal.</li>
          <li><strong>Agent Maximum:</strong> KES {keRates.mpesaMaxSingleTxn.toLocaleString()} per single transaction.</li>
          <li><strong>ATM Maximum:</strong> KES 20,000 per single ATM transaction.</li>
          <li><strong>Daily Account Limit:</strong> KES {keRates.mpesaMaxDailyLimit.toLocaleString()} cumulative withdrawals across all channels in 24 hours.</li>
        </ul>

        <h2 id="reducing-withdrawal-costs">Strategies to Reduce Withdrawal Fees</h2>
        <p>
          To minimize cash-out fees in daily transactions:
        </p>
        <ul>
          <li><strong>Use Lipa Na M-PESA Buy Goods:</strong> When purchasing fuel, groceries, or dining out, pay directly via Buy Goods till numbers (100% free for customers) rather than withdrawing cash.</li>
          <li><strong>Consolidate Cash-Outs:</strong> Because fees are tiered, withdrawing KES 5,000 once (KES 69 fee) is substantially cheaper than making five separate KES 1,000 withdrawals (5 × KES 29 = KES 145 fee).</li>
          <li><strong>Watch the Band Edges:</strong> Withdrawing KES 2,500 incurs a KES 34 fee, whereas withdrawing KES 2,510 pushes you into the next band (KES 52 fee).</li>
        </ul>

        <h2 id="reversals-and-security">Transaction Security and Reversal Rules</h2>
        <p>
          Never share your M-PESA PIN with any agent. The agent initiates the transaction from their terminal, and you will receive a prompt on your phone screen displaying the agent name and store number. Always verify that the agent name matches the shop signage before inputting your PIN.
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
