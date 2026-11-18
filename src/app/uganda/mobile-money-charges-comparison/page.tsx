'use client';

import React, { useState, useMemo } from 'react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { MoneyInput } from '@/components/MoneyInput';
import { Select } from '@/components/Select';
import { ResultPanel, BreakdownRow, CalculationLegalSource } from '@/components/ResultPanel';
import { FaqAccordion } from '@/components/FaqAccordion';
import { RelatedTools } from '@/components/RelatedTools';
import { getRelatedPages } from '@/config/pages';
import { compareUgandaMomo, UgandaTransactionType } from '@/lib/ug/momo';
import { ShieldCheck, Check, ArrowRightLeft } from 'lucide-react';

export default function MobileMoneyComparisonPage() {
  const [amount, setAmount] = useState<number>(100000);
  const [transactionType, setTransactionType] = useState<UgandaTransactionType>('withdraw_agent');

  const comp = useMemo(() => {
    return compareUgandaMomo(amount, transactionType);
  }, [amount, transactionType]);

  const rows: BreakdownRow[] = [
    {
      label: 'Transaction Amount',
      value: `UGX ${amount.toLocaleString('en-US')}`,
    },
    {
      label: 'MTN Total Fee (Operator + 0.5% Tax)',
      value: `UGX ${comp.mtn.totalFee.toLocaleString('en-US')}`,
      sublabel: `Operator: UGX ${comp.mtn.operatorFee.toLocaleString()} | Tax: UGX ${comp.mtn.statutoryTaxAmount.toLocaleString()}`,
    },
    {
      label: 'Airtel Total Fee (Operator + 0.5% Tax)',
      value: `UGX ${comp.airtel.totalFee.toLocaleString('en-US')}`,
      sublabel: `Operator: UGX ${comp.airtel.operatorFee.toLocaleString()} | Tax: UGX ${comp.airtel.statutoryTaxAmount.toLocaleString()}`,
    },
    {
      label: 'Cost Comparison Result',
      value:
        comp.cheaperNetwork === 'equal'
          ? 'Equal Pricing (Parity)'
          : `${comp.cheaperNetwork === 'mtn' ? 'MTN' : 'Airtel'} is UGX ${comp.difference.toLocaleString()} cheaper`,
      highlight: true,
    },
    {
      label: 'Total Wallet Debit (MTN vs Airtel)',
      value: `UGX ${comp.mtn.totalDebitedFromWallet.toLocaleString('en-US')}`,
      sublabel: `MTN: UGX ${comp.mtn.totalDebitedFromWallet.toLocaleString()} | Airtel: UGX ${comp.airtel.totalDebitedFromWallet.toLocaleString()}`,
    },
  ];

  const legalSources: CalculationLegalSource[] = [
    {
      title: 'MTN & Airtel Uganda Interoperability',
      documentNumber: 'Harmonized P2P & Cash-out Schedules',
      summary: 'Regulated consumer tariffs across standard agent cash withdrawals and mobile wallet transfers.',
    },
    {
      title: 'Uganda Revenue Authority (URA)',
      documentNumber: 'Excise Duty (Amendment) Act 2018',
      summary: '0.5% withdrawal tax uniformly applied across both MTN and Airtel networks.',
    },
  ];

  const copySummaryText = `Uganda Mobile Money Comparison:
Transaction: ${transactionType === 'withdraw_agent' ? 'Agent Cash Withdrawal' : 'Send P2P'}
Amount: UGX ${amount.toLocaleString()}
- MTN MoMo Total Fee: UGX ${comp.mtn.totalFee.toLocaleString()}
- Airtel Money Total Fee: UGX ${comp.airtel.totalFee.toLocaleString()}
Comparison: ${comp.cheaperNetwork === 'equal' ? 'Exact Price Parity' : `${comp.cheaperNetwork.toUpperCase()} is cheaper by UGX ${comp.difference.toLocaleString()}`}
Calculated on Pay (https://pay.zetawala.com/uganda/mobile-money-charges-comparison/)`;

  const related = getRelatedPages('ug-comparison');

  const faqs = [
    {
      question: 'Which is cheaper in Uganda: MTN MoMo or Airtel Money?',
      answer:
        'For peer-to-peer sending and agent cash withdrawals, MTN Uganda and Airtel Money maintain <strong>harmonized, identical fee tiers</strong> across almost all standard brackets. Both networks also deduct the exact same 0.5% statutory government withdrawal tax on agent cash-outs.',
    },
    {
      question: 'Can I send money directly from MTN MoMo to Airtel Money in Uganda?',
      answer:
        'Yes. Both networks support cross-network interoperability. Under standard peer-to-peer tariffs, sending to an Airtel number from MTN costs the same as sending to an MTN number.',
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <Breadcrumbs
        items={[
          { label: 'Uganda', href: '/uganda/' },
          { label: 'Mobile Money Comparison' },
        ]}
      />

      <div className="border-b border-neutral-200 pb-6 pt-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft px-3 py-1 text-xs font-semibold text-brand-strong mb-2">
          <ShieldCheck className="h-3.5 w-3.5 text-brand" />
          <span>Side-by-Side MTN vs Airtel Comparison</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
          MTN vs Airtel Money Uganda Comparison 2026
        </h1>
        <p className="mt-2 text-sm sm:text-base text-neutral-600 max-w-3xl leading-relaxed">
          Compare MTN MoMo and Airtel Money charges side-by-side for any transaction amount. Check operator fees, the 0.5% government tax, and total wallet debits.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-2xs space-y-5">
            <h2 className="text-base font-bold text-neutral-900 border-b border-neutral-100 pb-3">
              Comparison Inputs
            </h2>

            <Select
              label="Transaction Type"
              value={transactionType}
              onChange={val => setTransactionType(val as UgandaTransactionType)}
              options={[
                { label: 'Agent Cash Withdrawal (Fee + 0.5% Tax)', value: 'withdraw_agent' },
                { label: 'Send P2P (Transfer to Mobile User - No Tax)', value: 'send_p2p' },
                { label: 'Send Money to Bank Account', value: 'send_to_bank' },
              ]}
            />

            <MoneyInput
              label="Amount in UGX"
              value={amount}
              onChange={setAmount}
              currencySymbol="UGX"
              hint="Min: 500 UGX, Max: 5,000,000 UGX per single transaction."
              min={500}
              max={5000000}
              required
            />

            {/* Side-by-side visual cards */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl border border-neutral-200 bg-amber-50/50 text-xs space-y-2">
                <div className="font-bold text-amber-950 flex items-center justify-between">
                  <span>MTN MoMo</span>
                  <span className="text-[10px] bg-amber-200 text-amber-900 px-1.5 py-0.5 rounded font-semibold">Yellow</span>
                </div>
                <div className="text-lg font-extrabold text-neutral-900 tabular-nums">
                  UGX {comp.mtn.totalFee.toLocaleString('en-US')}
                </div>
                <p className="text-neutral-500">
                  Fee: UGX {comp.mtn.operatorFee.toLocaleString()} + Tax: UGX {comp.mtn.statutoryTaxAmount.toLocaleString()}
                </p>
              </div>

              <div className="p-4 rounded-xl border border-neutral-200 bg-rose-50/50 text-xs space-y-2">
                <div className="font-bold text-rose-950 flex items-center justify-between">
                  <span>Airtel Money</span>
                  <span className="text-[10px] bg-rose-200 text-rose-900 px-1.5 py-0.5 rounded font-semibold">Red</span>
                </div>
                <div className="text-lg font-extrabold text-neutral-900 tabular-nums">
                  UGX {comp.airtel.totalFee.toLocaleString('en-US')}
                </div>
                <p className="text-neutral-500">
                  Fee: UGX {comp.airtel.operatorFee.toLocaleString()} + Tax: UGX {comp.airtel.statutoryTaxAmount.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <ResultPanel
            title="Comparison Summary"
            headlineLabel="Cheaper Operator Result"
            headlineValue={
              comp.cheaperNetwork === 'equal'
                ? 'Exact Price Parity'
                : `${comp.cheaperNetwork === 'mtn' ? 'MTN' : 'Airtel'} is Cheaper`
            }
            subHeadline={
              comp.cheaperNetwork === 'equal'
                ? 'Both operators charge the exact same fee for this amount'
                : `Difference: UGX ${comp.difference.toLocaleString()} savings`
            }
            rows={rows}
            sources={legalSources}
            copySummaryText={copySummaryText}
            shareTitle="MTN vs Airtel Uganda MoMo Comparison"
            calloutMessage={{
              type: 'info',
              text: 'Price Parity: MTN and Airtel have harmonized mobile money tariffs in Uganda. You pay the same fee on either network.',
            }}
          />
        </div>
      </div>

      <RelatedTools tools={related} />
      <FaqAccordion faqs={faqs} />
    </div>
  );
}
