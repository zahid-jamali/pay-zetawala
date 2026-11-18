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
import { calculateMpesaCharge, MpesaTransactionType } from '@/lib/ke/mpesa';
import { getKeRates } from '@/lib/seo/rules-content';

export default function MpesaChargesCalculator() {
  const keRates = getKeRates();
  const [amount, setAmount] = useState<number>(2500);
  const [transactionType, setTransactionType] = useState<MpesaTransactionType>('transfer_mpesa');

  const mpesaResult = useMemo(() => {
    return calculateMpesaCharge({ amount, transactionType });
  }, [amount, transactionType]);

  const rows: BreakdownRow[] = [
    {
      label: 'Transaction Amount',
      value: `KES ${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
    },
    {
      label: 'Safaricom M-PESA Fee',
      value: mpesaResult.fee === 0 ? 'KES 0.00 (FREE)' : `KES ${mpesaResult.fee.toFixed(2)}`,
      highlight: true,
      sublabel: `Inclusive of ${keRates.exciseDutyRate}% excise duty (Finance Act 2023)`,
    },
    {
      label: 'Total Debited from M-PESA Wallet',
      value: `KES ${mpesaResult.totalDebitedFromWallet.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      highlight: true,
      sublabel: 'Transaction principal + service charge',
    },
    ...(mpesaResult.band && 'min' in mpesaResult.band
      ? [
          {
            label: 'Tariff Band Range',
            value: `KES ${mpesaResult.band.min.toLocaleString()} – KES ${mpesaResult.band.max.toLocaleString()}`,
            sublabel: 'Official published Safaricom band',
          },
        ]
      : []),
  ];

  const legalSources: CalculationLegalSource[] = [
    {
      title: 'Safaricom PLC M-PESA Tariff Schedule',
      documentNumber: 'Official Customer Charges & Limits Schedule',
      summary: `Published tariff bands for P2P transfers, agent cash-outs, ATM withdrawals, and Paybill merchant charges. Single transaction cap KES ${keRates.mpesaMaxSingleTxn.toLocaleString()}, daily limit KES ${keRates.mpesaMaxDailyLimit.toLocaleString()}.`,
    },
    {
      title: 'Kenya Finance Act 2023',
      documentNumber: 'Excise Duty Act (Money Transfer Services)',
      summary: `${keRates.exciseDutyRate}% excise duty applies to all cellular money transfer fees. All Safaricom published charges are inclusive of this tax.`,
    },
  ];

  const copySummaryText = `Kenya M-PESA Transaction Fee (${keRates.verifiedYear}):
Amount: KES ${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
Transaction Type: ${transactionType.replace(/_/g, ' ')}
Safaricom Fee: KES ${mpesaResult.fee.toFixed(2)}
Total Debited: KES ${mpesaResult.totalDebitedFromWallet.toLocaleString('en-US', { minimumFractionDigits: 2 })}
Calculated on Pay (https://pay.zetawala.com/kenya/mpesa-charges-calculator/)`;

  const related = getRelatedPages('ke-mpesa');

  const faqs = [
    {
      question: 'How much does it cost to send money on M-PESA in 2026?',
      answer:
        'Sending amounts between KES 1 and KES 100 to another registered M-PESA user is completely free (KES 0.00). For amounts between KES 101 and KES 500, the fee is KES 7. Fees increase by graduated bands up to KES 108 for transactions between KES 150,001 and KES 250,000.',
    },
    {
      question: 'What is the maximum amount you can send on M-PESA in a single transaction?',
      answer:
        'The maximum single transaction limit on M-PESA is KES 250,000. You cannot send more than KES 250,000 in one transfer.',
    },
    {
      question: 'What is the daily transaction limit on M-PESA?',
      answer:
        'The daily transaction limit for an M-PESA account is KES 500,000. You can perform multiple transactions throughout the day as long as the cumulative total does not exceed KES 500,000.',
    },
    {
      question: 'What is the maximum balance you can hold in an M-PESA wallet?',
      answer:
        'Under Central Bank of Kenya (CBK) guidelines, the maximum holding balance in a customer M-PESA wallet is KES 500,000.',
    },
    {
      question: 'Do M-PESA charges include government excise duty?',
      answer:
        'Yes. All published Safaricom M-PESA transaction fees are statutory-inclusive of the 15% Excise Duty on money transfer services established by the Finance Act 2023.',
    },
    {
      question: 'Is Lipa Na M-PESA (Buy Goods) free for customers?',
      answer:
        'Yes. Making payments for consumer purchases through Lipa Na M-PESA Buy Goods Till numbers is 100% free of charge to the customer. The merchant pays the transaction fee.',
    },
    {
      question: 'What is the fee to withdraw cash from an M-PESA agent?',
      answer:
        'Agent withdrawal fees start at KES 11 for amounts between KES 50 and KES 100, KES 29 for KES 501–1,000, KES 69 for KES 3,501–5,000, and cap at KES 309 for withdrawals between KES 150,001 and KES 250,000.',
    },
    {
      question: 'How can I save money on M-PESA charges?',
      answer:
        'Keep transfers to other users under KES 100 whenever feasible to pay zero fees, utilize Lipa Na M-PESA Buy Goods tills instead of withdrawing cash, and avoid breaking large transfers into small pieces that fall into multiple high-percentage bands.',
    },
  ];

  const workedExamples: WorkedExampleItem[] = [
    {
      title: 'Sending KES 2,500 to Registered M-PESA User',
      scenario: 'Sending money directly to a friend or merchant registered on Safaricom M-PESA.',
      inputs: [
        { label: 'Transfer Amount', value: 'KES 2,500.00' },
        { label: 'Transaction Type', value: 'Send Money to M-PESA User' },
      ],
      steps: [
        { label: 'Applicable Tariff Band', formula: 'KES 1,501 to KES 2,500 bracket', value: 'Tariff Band 5' },
        { label: 'Safaricom Transfer Charge', formula: 'Statutory published fee', value: 'KES 34.00', highlight: true },
        { label: 'Excise Duty Component', formula: '15% excise duty (included)', value: 'KES 4.43 incl.' },
        { label: 'Total Deducted from Wallet', formula: 'KES 2,500.00 + KES 34.00', value: 'KES 2,534.00' },
      ],
      resultLabel: 'Total Wallet Debit',
      resultValue: 'KES 2,534.00',
      notes: 'The recipient receives the full KES 2,500.00.',
    },
    {
      title: 'Agent Cash Withdrawal of KES 5,000',
      scenario: 'Withdrawing physical cash from an authorized Safaricom M-PESA agent.',
      inputs: [
        { label: 'Withdrawal Principal', value: 'KES 5,000.00' },
        { label: 'Transaction Channel', value: 'Authorized Agent Cash-Out' },
      ],
      steps: [
        { label: 'Applicable Tariff Band', formula: 'KES 3,501 to KES 5,000 bracket', value: 'Tariff Band 7' },
        { label: 'Agent Withdrawal Fee', formula: 'Official Safaricom agent fee', value: 'KES 69.00', highlight: true },
        { label: 'Total Wallet Balance Required', formula: 'KES 5,000.00 + KES 69.00', value: 'KES 5,069.00' },
      ],
      resultLabel: 'Total Balance Deducted',
      resultValue: 'KES 5,069.00',
      notes: 'Customer receives KES 5,000 cash in hand from agent.',
    },
  ];

  const officialSources: OfficialSourceLink[] = [
    {
      name: 'Safaricom PLC',
      documentTitle: 'Official M-PESA Tariff Schedule & Transaction Limits',
      url: 'https://www.safaricom.co.ke/personal/m-pesa/tariffs',
      verifiedDate: keRates.verifiedDate,
    },
    {
      name: 'Central Bank of Kenya (CBK)',
      documentTitle: 'National Payment System Regulations & Account Limits',
      url: 'https://www.centralbank.go.ke',
      verifiedDate: keRates.verifiedDate,
    },
  ];

  const quickAnswerText = `Safaricom M-PESA transaction charges are determined by official graduated tariff bands inclusive of ${keRates.exciseDutyRate}% excise duty. Transfers between KES 1 and KES 100 to M-PESA users are completely free (KES 0). The maximum single transaction limit is KES ${keRates.mpesaMaxSingleTxn.toLocaleString()} and the daily wallet limit is KES ${keRates.mpesaMaxDailyLimit.toLocaleString()}.`;

  const tocItems = [
    { id: 'tariff-system', label: 'How M-PESA Tariffs Are Structured' },
    { id: 'transfer-types', label: 'M-PESA to M-PESA vs Other Networks' },
    { id: 'agent-atm-cashouts', label: 'Agent Cash-Out vs ATM Withdrawals' },
    { id: 'paybill-and-buygoods', label: 'Paybill & Lipa Na M-PESA Rules' },
    { id: 'limits-and-ceilings', label: 'Daily & Per-Transaction Limits' },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <StructuredData
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Kenya', url: '/kenya/' },
          { name: 'M-PESA Charges Calculator 2026', url: '/kenya/mpesa-charges-calculator/' },
        ]}
        webApp={{
          name: 'M-PESA Charges Calculator 2026',
          url: '/kenya/mpesa-charges-calculator/',
          description: 'Calculate exact fees for sending money, agent withdrawals, and ATM cashouts on Safaricom M-PESA.',
          applicationCategory: 'FinanceApplication',
        }}
        faqs={faqs}
      />

      <Breadcrumbs
        items={[
          { label: 'Kenya', href: '/kenya/' },
          { label: 'M-PESA Charges Calculator' },
        ]}
      />

      {/* Page Header */}
      <div className="border-b border-neutral-200 pb-6 pt-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
          M-PESA Charges Calculator {keRates.verifiedYear}
        </h1>
        <p className="mt-2 text-sm sm:text-base text-neutral-600 max-w-3xl leading-relaxed">
          See the exact fee for any amount from the latest official Safaricom tariff schedule. Computes P2P transfers, agent withdrawals, ATM cashouts, and Paybill transactions with 15% excise duty included.
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
              currencySymbol="KES"
              hint={`Enter amount from KES 1 up to KES ${keRates.mpesaMaxSingleTxn.toLocaleString()} per transaction.`}
              min={1}
              max={keRates.mpesaMaxSingleTxn}
              required
            />

            <Select
              label="Transaction Type / Channel"
              value={transactionType}
              onChange={(val) => setTransactionType(val as MpesaTransactionType)}
              options={[
                { label: 'Send Money to Registered M-PESA User', value: 'transfer_mpesa' },
                { label: 'Withdraw Cash at M-PESA Agent', value: 'withdraw_agent' },
                { label: 'Transfer to Other Mobile Networks (Airtel / Telkom)', value: 'transfer_other' },
                { label: 'Withdraw Cash from ATM (PESAPOINT / KCB / Equity)', value: 'withdraw_atm' },
                { label: 'Paybill Business Payment (Customer-Paid)', value: 'paybill' },
                { label: 'Buy Goods and Services (Lipa Na M-PESA)', value: 'buy_goods' },
              ]}
            />
          </div>
        </div>

        {/* Right Sticky Result Column */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
          <ResultPanel
            title="M-PESA Cost Summary"
            headlineLabel="Safaricom Transaction Fee"
            headlineValue={mpesaResult.fee === 0 ? 'KES 0.00 (FREE)' : `KES ${mpesaResult.fee.toFixed(2)}`}
            subHeadline={`Total debited from wallet: KES ${mpesaResult.totalDebitedFromWallet.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
            rows={rows}
            sources={legalSources}
            copySummaryText={copySummaryText}
            shareTitle="M-PESA Fee Calculation"
            calloutMessage={
              mpesaResult.fee === 0
                ? {
                    type: 'success',
                    text: 'Free Transaction: Transfers of KES 100 or less between registered M-PESA users are 100% free.',
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
        <h2 id="tariff-system">How Safaricom M-PESA Tariffs Are Structured</h2>
        <p>
          M-PESA fees in Kenya are calculated using official graduated tariff bands published by Safaricom PLC. Rather than applying a single percentage to your transfer amount, transactions are placed into tiered bands spanning from KES 1 up to the statutory limit of KES {keRates.mpesaMaxSingleTxn.toLocaleString()}.
        </p>
        <p>
          Pursuant to the Kenya Finance Act 2023, a 15% Excise Duty is levied on all mobile phone money transfer services. All tariffs published by Safaricom and displayed on this calculator are already inclusive of this statutory tax.
        </p>

        <h2 id="transfer-types">Sending Money: M-PESA vs Other Networks</h2>
        <p>
          When transferring money person-to-person (P2P), transaction fees vary depending on the destination mobile network:
        </p>
        <ul>
          <li><strong>Registered M-PESA to M-PESA:</strong> Transfers from KES 1 to KES 100 are completely free (KES 0.00). Transactions above KES 100 incur fees starting at KES 7 (for KES 101–500) and reaching KES 108 for transfers between KES 150,001 and KES 250,000.</li>
          <li><strong>Transfers to Other Networks (Airtel, Telkom):</strong> Safaricom allows direct mobile money interoperability. Sending money to an Airtel Money or Telkom T-Kash account incurs slightly different band fees (for example, KES 13 for KES 101–500).</li>
        </ul>

        <h2 id="agent-atm-cashouts">Agent Cash-Out vs ATM Withdrawals</h2>
        <p>
          Withdrawing cash from your M-PESA wallet requires a separate cash-out fee:
        </p>
        <ul>
          <li><strong>Agent Withdrawals:</strong> You can withdraw amounts from KES 50 to KES 250,000 at any authorized Safaricom agent. Fees begin at KES 11 (KES 50–100), KES 29 (KES 501–1,000), KES 69 (KES 3,501–5,000), and max out at KES 309 for KES 150,001–250,000.</li>
          <li><strong>ATM Withdrawals:</strong> Cardless ATM cash withdrawals (available at participating banks such as KCB, Equity Bank, and Pesapoint ATMs) start at KES 35 for KES 200–2,500 and cap at KES 203 for withdrawals up to KES 20,000.</li>
        </ul>

        <h2 id="paybill-and-buygoods">Paybill and Lipa Na M-PESA Buy Goods Tariffs</h2>
        <p>
          Merchant payment systems operate under two distinct tariff models:
        </p>
        <ul>
          <li><strong>Lipa Na M-PESA Buy Goods (Till Numbers):</strong> Completely free of charge for the retail customer (KES 0.00). The merchant absorbs the processing fee.</li>
          <li><strong>Business Paybill:</strong> Depends on whether the business owner has configured customer-paid or business-paid tariffs. In standard customer-paid utility paybills, users pay graduated fees ranging from KES 5 to KES 110.</li>
        </ul>

        <h2 id="limits-and-ceilings">M-PESA Daily and Per-Transaction Limits</h2>
        <p>
          The Central Bank of Kenya establishes strict limits on mobile wallets to maintain financial security:
        </p>
        <ul>
          <li><strong>Single Transaction Limit:</strong> KES {keRates.mpesaMaxSingleTxn.toLocaleString()} maximum per transfer.</li>
          <li><strong>Daily Transaction Limit:</strong> KES {keRates.mpesaMaxDailyLimit.toLocaleString()} cumulative limit per 24-hour cycle.</li>
          <li><strong>Maximum Account Balance:</strong> KES {keRates.mpesaMaxBalance.toLocaleString()} maximum wallet holding capacity.</li>
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
