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

export default function MtnMobileMoneyChargesPage() {
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
      sublabel: 'Standard MTN Uganda tariff tier',
    },
    {
      label: '0.5% Government Statutory Tax',
      value: res.statutoryTaxAmount > 0 ? `UGX ${res.statutoryTaxAmount.toLocaleString('en-US')}` : 'UGX 0 (Tax-Exempt)',
      isDeduction: res.statutoryTaxAmount > 0,
      sublabel: res.statutoryTaxAmount > 0 ? 'Excise Duty Act 2018 (applies to cash-outs only)' : 'P2P sending is 100% tax-free',
    },
    {
      label: 'Total Transaction Cost',
      value: `UGX ${res.totalFee.toLocaleString('en-US')}`,
      highlight: true,
      sublabel: 'Operator fee + government tax',
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
      summary: 'Regulates sending to MTN/other networks, agent cash-outs, bank transfers, and account transaction limits.',
    },
    {
      title: 'Parliament of Uganda & URA',
      documentNumber: 'Excise Duty (Amendment) Act 2018',
      summary: '0.5% statutory tax levied strictly on cash withdrawals from mobile money wallets across all telecom providers.',
    },
  ];

  const copySummaryText = `MTN Uganda Mobile Money Calculation:
Transaction: ${transactionType === 'send_p2p' ? 'Send P2P' : transactionType === 'withdraw_agent' ? 'Agent Cash Withdrawal' : 'Send to Bank'}
Amount: UGX ${amount.toLocaleString()}
MTN Fee: UGX ${res.operatorFee.toLocaleString()}
Government 0.5% Tax: UGX ${res.statutoryTaxAmount.toLocaleString()}
Total Fee: UGX ${res.totalFee.toLocaleString()}
Total Debited: UGX ${res.totalDebitedFromWallet.toLocaleString()}
Calculated on Pay (https://pay.zetawala.com/uganda/mtn-mobile-money-charges/)`;

  const related = getRelatedPages('ug-mtn');

  const faqs = [
    {
      question: 'How much does it cost to withdraw cash on MTN MoMo in Uganda?',
      answer:
        'Withdrawing cash from an MTN agent incurs both the <strong>MTN agent cash-out fee</strong> (based on the tier) plus the <strong>0.5% government statutory tax</strong>. For example, withdrawing 10,000 UGX incurs a 700 UGX operator fee + 50 UGX tax = 750 UGX total.',
    },
    {
      question: 'Is there a tax on sending money peer-to-peer on MTN?',
      answer:
        'No. Under the amended Excise Duty Act, sending money from one mobile wallet to another is <strong>100% exempt from the 0.5% tax</strong>. You only pay the flat MTN sending fee.',
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <Breadcrumbs
        items={[
          { label: 'Uganda', href: '/uganda/' },
          { label: 'MTN MoMo Charges' },
        ]}
      />

      <div className="border-b border-neutral-200 pb-6 pt-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft px-3 py-1 text-xs font-semibold text-brand-strong mb-2">
          <ShieldCheck className="h-3.5 w-3.5 text-brand" />
          <span>Official MTN Uganda & 0.5% Tax Compliant</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
          MTN Mobile Money Charges Uganda 2026
        </h1>
        <p className="mt-2 text-sm sm:text-base text-neutral-600 max-w-3xl leading-relaxed">
          Calculate exact fees for sending money, agent cash withdrawals, and the 0.5% government statutory withdrawal tax on MTN Uganda MoMo.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-2xs space-y-5">
            <h2 className="text-base font-bold text-neutral-900 border-b border-neutral-100 pb-3">
              MTN MoMo Transaction
            </h2>

            <Select
              label="Transaction Type"
              value={transactionType}
              onChange={val => setTransactionType(val as UgandaTransactionType)}
              options={[
                { label: 'Withdraw Cash from Agent (Fee + 0.5% Tax)', value: 'withdraw_agent' },
                { label: 'Send Money to MTN / Other Network User (No Tax)', value: 'send_p2p' },
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
            title="MTN MoMo Fee Summary"
            headlineLabel="Total Fee (Fee + 0.5% Tax)"
            headlineValue={res.isOverLimit ? 'Limit Exceeded' : `UGX ${res.totalFee.toLocaleString('en-US')}`}
            subHeadline={res.isOverLimit ? res.limitError : `Total debited: UGX ${res.totalDebitedFromWallet.toLocaleString('en-US')}`}
            rows={rows}
            sources={legalSources}
            copySummaryText={copySummaryText}
            shareTitle="MTN MoMo Uganda Fee Calculation"
          />
        </div>
      </div>

      <RelatedTools tools={related} />
      <FaqAccordion faqs={faqs} />
    </div>
  );
}
