'use client';

import React, { useState, useMemo } from 'react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { MoneyInput } from '@/components/MoneyInput';
import { Select } from '@/components/Select';
import { ResultPanel, BreakdownRow, CalculationLegalSource } from '@/components/ResultPanel';
import { FaqAccordion } from '@/components/FaqAccordion';
import { RelatedTools } from '@/components/RelatedTools';
import { getRelatedPages } from '@/config/pages';
import { calculateMpesaCharge, MpesaTransactionType } from '@/lib/ke/mpesa';
import { ShieldCheck, Lightbulb, AlertTriangle } from 'lucide-react';

export default function MpesaChargesCalculator() {
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
      sublabel: 'Inclusive of 15% excise duty (Finance Act 2023)',
    },
    {
      label: 'Total Debited from M-PESA Wallet',
      value: `KES ${mpesaResult.totalDebitedFromWallet.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      highlight: true,
      sublabel: 'Amount sent/withdrawn + transaction fee',
    },
    ...(mpesaResult.band && 'min' in mpesaResult.band
      ? [
          {
            label: 'Active Tariff Band',
            value: `KES ${mpesaResult.band.min.toLocaleString()} – KES ${mpesaResult.band.max.toLocaleString()}`,
            sublabel: 'Official Safaricom published bracket',
          },
        ]
      : []),
  ];

  const legalSources: CalculationLegalSource[] = [
    {
      title: 'Safaricom PLC M-PESA Tariff Schedule',
      documentNumber: 'Official Customer Charges & Limits Schedule',
      summary: 'Published tariff bands for P2P transfers, agent cash-outs, ATM withdrawals, and Paybill merchant charges.',
    },
    {
      title: 'Kenya Finance Act 2023',
      documentNumber: 'Excise Duty Act (Money Transfer Services)',
      summary: '15% excise duty applies to all cellular money transfer fees. All Safaricom published charges are already net of this tax.',
    },
  ];

  const copySummaryText = `M-PESA Transaction Charge (2026 Official Tariff):
Transaction Type: ${
    transactionType === 'transfer_mpesa'
      ? 'Transfer to M-PESA User'
      : transactionType === 'transfer_other'
      ? 'Transfer to Other Network (Airtel)'
      : transactionType === 'withdraw_agent'
      ? 'Agent Cash Withdrawal'
      : transactionType === 'withdraw_atm'
      ? 'ATM Cash Withdrawal'
      : transactionType === 'paybill'
      ? 'Pay to Paybill'
      : 'Buy Goods (Till Number)'
  }
Amount: KES ${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
M-PESA Fee: KES ${mpesaResult.fee.toFixed(2)} (Incl. 15% Excise Duty)
Total Debited: KES ${mpesaResult.totalDebitedFromWallet.toLocaleString('en-US', { minimumFractionDigits: 2 })}
Calculated on Pay (https://pay.zetawala.com/kenya/mpesa-charges-calculator/)`;

  const related = getRelatedPages('ke-mpesa');

  const faqs = [
    {
      question: 'How much does it cost to send money on M-PESA in 2026?',
      answer:
        'Sending between <strong>KES 1 and KES 49 is FREE</strong>. For transfers between KES 50 and KES 100, the fee is also KES 0. For KES 101 – 500, the charge is KES 7; KES 501 – 1,000 costs KES 13; KES 1,001 – 1,500 costs KES 23; and sending the maximum KES 250,000 costs KES 108.',
    },
    {
      question: 'What is the cheapest way to send money or pay merchants?',
      answer:
        'Paying via <strong>Buy Goods and Services (Till Number) is always 100% free</strong> for the customer. For Paybill transactions, payments up to KES 100 are free.',
    },
    {
      question: 'What happens if I try to send more than KES 250,000?',
      answer:
        'Safaricom enforces a strict single-transaction limit of KES 250,000. If you need to send a higher amount (up to the daily ceiling of KES 500,000), you must execute two or more separate transactions.',
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <Breadcrumbs
        items={[
          { label: 'Kenya', href: '/kenya/' },
          { label: 'M-PESA Charges Calculator' },
        ]}
      />

      <div className="border-b border-neutral-200 pb-6 pt-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft px-3 py-1 text-xs font-semibold text-brand-strong mb-2">
          <ShieldCheck className="h-3.5 w-3.5 text-brand" />
          <span>Official Safaricom M-PESA Tariff Schedule (Inclusive of 15% Excise)</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
          M-PESA Charges Calculator 2026
        </h1>
        <p className="mt-2 text-sm sm:text-base text-neutral-600 max-w-3xl leading-relaxed">
          Look up official fees for sending money to M-PESA or other networks, agent cash withdrawals, ATM withdrawals, and Paybill merchant payments.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-2xs space-y-5">
            <h2 className="text-base font-bold text-neutral-900 border-b border-neutral-100 pb-3">
              Transaction Details
            </h2>

            <Select
              label="Transaction Type"
              value={transactionType}
              onChange={val => setTransactionType(val as MpesaTransactionType)}
              options={[
                { label: 'Send Money to M-PESA User (P2P)', value: 'transfer_mpesa' },
                { label: 'Send Money to Other Network (Airtel Money)', value: 'transfer_other' },
                { label: 'Withdraw Cash from M-PESA Agent', value: 'withdraw_agent' },
                { label: 'Withdraw Cash from ATM', value: 'withdraw_atm' },
                { label: 'Pay to Paybill Business Number', value: 'paybill' },
                { label: 'Buy Goods and Services (Till Number - Free)', value: 'buygoods' },
              ]}
            />

            <MoneyInput
              label="Amount in Kenyan Shillings"
              value={amount}
              onChange={setAmount}
              currencySymbol="KES"
              hint="Max single transaction is KES 250,000; daily limit is KES 500,000."
              min={1}
              max={500000}
              required
            />

            {/* Cheaper Alternative Notice */}
            {mpesaResult.cheaperAlternatives.length > 0 && (
              <div className="rounded-lg bg-brand-soft/50 p-4 border border-brand/20 space-y-2">
                {mpesaResult.cheaperAlternatives.map((alt, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-brand-strong">
                    <Lightbulb className="h-4 w-4 shrink-0 mt-0.5 text-brand" />
                    <span>{alt.description}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Split Recommendation if over limit */}
            {mpesaResult.splitRecommendation && (
              <div className="rounded-lg bg-amber-50 p-4 border border-amber-200 text-xs text-amber-900 space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                  <span>Amount Exceeds Single Transaction Limit (KES 250,000)</span>
                </div>
                <p>
                  Safaricom caps single transfers at KES 250,000. To transfer KES {amount.toLocaleString()}, split into{' '}
                  <strong>{mpesaResult.splitRecommendation.numTransactions} transactions</strong> (e.g. KES 250,000 + KES{' '}
                  {mpesaResult.splitRecommendation.remainder.toLocaleString()}). Total combined fee will be approximately{' '}
                  <strong>KES {mpesaResult.splitRecommendation.totalFee.toFixed(2)}</strong>.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <ResultPanel
            title="M-PESA Fee Result"
            headlineLabel="M-PESA Transaction Fee"
            headlineValue={
              mpesaResult.isExceedingLimit
                ? 'Limit Exceeded'
                : mpesaResult.fee === 0
                ? 'FREE'
                : `KES ${mpesaResult.fee.toFixed(2)}`
            }
            subHeadline={
              mpesaResult.isExceedingLimit
                ? mpesaResult.limitError
                : `Total debited: KES ${mpesaResult.totalDebitedFromWallet.toLocaleString('en-US', { minimumFractionDigits: 2 })}`
            }
            rows={rows}
            sources={legalSources}
            copySummaryText={copySummaryText}
            shareTitle="M-PESA Transaction Fee Calculation"
            calloutMessage={
              mpesaResult.fee === 0 && !mpesaResult.isExceedingLimit
                ? {
                    type: 'success',
                    text: 'Zero Fee: This transaction is 100% free of charge under Safaricom tariffs.',
                  }
                : undefined
            }
          />
        </div>
      </div>

      <RelatedTools tools={related} />
      <FaqAccordion faqs={faqs} />
    </div>
  );
}
