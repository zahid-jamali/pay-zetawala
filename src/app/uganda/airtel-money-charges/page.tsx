'use client';

import React, { useState, useMemo } from 'react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { MoneyInput } from '@/components/MoneyInput';
import { Select } from '@/components/Select';
import { ResultPanel, BreakdownRow, CalculationLegalSource } from '@/components/ResultPanel';
import { FaqAccordion } from '@/components/FaqAccordion';
import { RelatedTools } from '@/components/RelatedTools';
import { getRelatedPages } from '@/config/pages';
import { calculateUgandaMomo, UgandaTransactionType } from '@/lib/ug/momo';
import { ShieldCheck } from 'lucide-react';

export default function AirtelMoneyChargesPage() {
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
      sublabel: res.statutoryTaxAmount > 0 ? 'Excise Duty Act (cash withdrawals only)' : 'P2P sending is 100% tax-free',
    },
    {
      label: 'Total Transaction Cost',
      value: `UGX ${res.totalFee.toLocaleString('en-US')}`,
      highlight: true,
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
      summary: 'Regulates cash withdrawals, P2P transfers, bank deposits, and transaction ceilings.',
    },
    {
      title: 'Uganda Revenue Authority (URA)',
      documentNumber: 'Excise Duty (Amendment) Act 2018',
      summary: '0.5% statutory tax applies to all cash withdrawals across all telecom operators.',
    },
  ];

  const copySummaryText = `Airtel Money Uganda Calculation:
Transaction: ${transactionType === 'send_p2p' ? 'Send P2P' : transactionType === 'withdraw_agent' ? 'Agent Cash Withdrawal' : 'Send to Bank'}
Amount: UGX ${amount.toLocaleString()}
Airtel Fee: UGX ${res.operatorFee.toLocaleString()}
Government 0.5% Tax: UGX ${res.statutoryTaxAmount.toLocaleString()}
Total Fee: UGX ${res.totalFee.toLocaleString()}
Total Debited: UGX ${res.totalDebitedFromWallet.toLocaleString()}
Calculated on Pay (https://pay.zetawala.com/uganda/airtel-money-charges/)`;

  const related = getRelatedPages('ug-airtel');

  const faqs = [
    {
      question: 'What are the charges for sending money on Airtel Money in Uganda?',
      answer:
        'Sending money peer-to-peer on Airtel Money is charged based on bands: <strong>UGX 100</strong> for amounts up to 2,500 UGX, <strong>UGX 500</strong> for amounts up to 60,000 UGX, and <strong>UGX 1,000</strong> for amounts up to 500,000 UGX. No government tax is deducted on P2P sends.',
    },
    {
      question: 'How much tax is deducted when withdrawing from an Airtel agent?',
      answer:
        'A mandatory <strong>0.5% government statutory tax</strong> is deducted from your wallet for every cash withdrawal at an Airtel agent, in addition to Airtel’s published agent fee.',
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <Breadcrumbs
        items={[
          { label: 'Uganda', href: '/uganda/' },
          { label: 'Airtel Money Charges' },
        ]}
      />

      <div className="border-b border-neutral-200 pb-6 pt-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft px-3 py-1 text-xs font-semibold text-brand-strong mb-2">
          <ShieldCheck className="h-3.5 w-3.5 text-brand" />
          <span>Official Airtel Uganda & 0.5% Tax Compliant</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
          Airtel Money Charges Uganda 2026
        </h1>
        <p className="mt-2 text-sm sm:text-base text-neutral-600 max-w-3xl leading-relaxed">
          Compute sending charges, agent cash-out fees, and the 0.5% government statutory withdrawal tax on Airtel Money Uganda.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-2xs space-y-5">
            <h2 className="text-base font-bold text-neutral-900 border-b border-neutral-100 pb-3">
              Airtel Money Transaction
            </h2>

            <Select
              label="Transaction Type"
              value={transactionType}
              onChange={val => setTransactionType(val as UgandaTransactionType)}
              options={[
                { label: 'Withdraw Cash from Agent (Fee + 0.5% Tax)', value: 'withdraw_agent' },
                { label: 'Send Money to Airtel / Other Network User (No Tax)', value: 'send_p2p' },
                { label: 'Send Money to Bank Account', value: 'send_to_bank' },
              ]}
            />

            <MoneyInput
              label="Transaction Amount in UGX"
              value={amount}
              onChange={setAmount}
              currencySymbol="UGX"
              hint="Minimum transaction is 500 UGX; maximum single transaction is 5,000,000 UGX."
              min={500}
              max={5000000}
              required
            />
          </div>
        </div>

        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <ResultPanel
            title="Airtel Money Summary"
            headlineLabel="Total Fee (Fee + 0.5% Tax)"
            headlineValue={res.isOverLimit ? 'Limit Exceeded' : `UGX ${res.totalFee.toLocaleString('en-US')}`}
            subHeadline={res.isOverLimit ? res.limitError : `Total debited: UGX ${res.totalDebitedFromWallet.toLocaleString('en-US')}`}
            rows={rows}
            sources={legalSources}
            copySummaryText={copySummaryText}
            shareTitle="Airtel Money Uganda Fee Calculation"
          />
        </div>
      </div>

      <RelatedTools tools={related} />
      <FaqAccordion faqs={faqs} />
    </div>
  );
}
