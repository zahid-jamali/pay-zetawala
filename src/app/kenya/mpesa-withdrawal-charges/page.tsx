'use client';

import React, { useState, useMemo } from 'react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { MoneyInput } from '@/components/MoneyInput';
import { SegmentedControl } from '@/components/SegmentedControl';
import { ResultPanel, BreakdownRow, CalculationLegalSource } from '@/components/ResultPanel';
import { FaqAccordion } from '@/components/FaqAccordion';
import { RelatedTools } from '@/components/RelatedTools';
import { getRelatedPages } from '@/config/pages';
import { calculateMpesaCharge } from '@/lib/ke/mpesa';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function MpesaWithdrawalChargesPage() {
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
      label: method === 'withdraw_agent' ? 'Agent Withdrawal Fee' : 'ATM Withdrawal Fee',
      value: activeRes.isExceedingLimit ? 'Not Available' : `KES ${activeRes.fee.toFixed(2)}`,
      highlight: true,
      sublabel: 'Inclusive of 15% excise duty',
    },
    {
      label: 'Total Deducted from M-PESA Wallet',
      value: activeRes.isExceedingLimit ? '—' : `KES ${activeRes.totalDebitedFromWallet.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      highlight: true,
    },
    {
      label: 'Comparison: Agent vs ATM',
      value:
        agentRes.fee < atmRes.fee
          ? `Agent is KES ${(atmRes.fee - agentRes.fee).toFixed(2)} cheaper`
          : agentRes.fee > atmRes.fee
          ? `ATM is KES ${(agentRes.fee - atmRes.fee).toFixed(2)} cheaper`
          : 'Both cost the exact same',
      sublabel: `Agent: KES ${agentRes.fee} | ATM: ${atmRes.isExceedingLimit ? 'Unavailable' : `KES ${atmRes.fee}`}`,
    },
  ];

  const legalSources: CalculationLegalSource[] = [
    {
      title: 'Safaricom M-PESA Withdrawal Tariff',
      documentNumber: 'Official Table 1 & Table 2',
      summary: 'Agent cash-out is available from KES 50 up to KES 250,000. ATM withdrawals are available from KES 200 up to KES 35,000.',
    },
  ];

  const copySummaryText = `M-PESA Cash Withdrawal Charge:
Amount: KES ${amount.toLocaleString()}
Method: ${method === 'withdraw_agent' ? 'M-PESA Agent' : 'ATM Cash-Out'}
Fee: KES ${activeRes.fee.toFixed(2)}
Total Wallet Deduction: KES ${activeRes.totalDebitedFromWallet.toLocaleString()}
Calculated on Pay (https://pay.zetawala.com/kenya/mpesa-withdrawal-charges/)`;

  const related = getRelatedPages('ke-withdraw');

  const faqs = [
    {
      question: 'What is the minimum amount I can withdraw at an M-PESA agent?',
      answer:
        'The minimum cash withdrawal amount at an authorized M-PESA agent is <strong>KES 50</strong> (fee is KES 11). For ATM withdrawals, the minimum is <strong>KES 200</strong>.',
    },
    {
      question: 'Is it cheaper to withdraw from an ATM or an Agent?',
      answer:
        'For amounts between KES 500 and KES 2,500, agent withdrawal costs KES 29 while ATM withdrawal costs KES 35 (saving KES 6 at an agent). For KES 2,501 to KES 3,500, agent withdrawal is KES 52 vs ATM KES 69 (saving KES 17 at an agent). ATM withdrawals are capped at KES 35,000 per transaction.',
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <Breadcrumbs
        items={[
          { label: 'Kenya', href: '/kenya/' },
          { label: 'M-PESA Withdrawal Charges' },
        ]}
      />

      <div className="border-b border-neutral-200 pb-6 pt-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft px-3 py-1 text-xs font-semibold text-brand-strong mb-2">
          <ShieldCheck className="h-3.5 w-3.5 text-brand" />
          <span>Agent & ATM Cash-Out Tariffs</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
          M-PESA Withdrawal Charges 2026
        </h1>
        <p className="mt-2 text-sm sm:text-base text-neutral-600 max-w-3xl leading-relaxed">
          Compare agent cash-out charges versus ATM withdrawal fees on Safaricom M-PESA. Find the cheapest withdrawal method and band boundaries.
        </p>

        <div className="mt-6">
          <SegmentedControl<'withdraw_agent' | 'withdraw_atm'>
            value={method}
            onChange={setMethod}
            options={[
              { label: 'Withdraw at M-PESA Agent', value: 'withdraw_agent' },
              { label: 'Withdraw at ATM (KCB, Equity, DTB, etc.)', value: 'withdraw_atm' },
            ]}
          />
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-2xs space-y-5">
            <h2 className="text-base font-bold text-neutral-900 border-b border-neutral-100 pb-3">
              Withdrawal Amount
            </h2>

            <MoneyInput
              label="Cash Amount to Withdraw"
              value={amount}
              onChange={setAmount}
              currencySymbol="KES"
              hint={method === 'withdraw_agent' ? 'Min: KES 50, Max: KES 250,000 per transaction' : 'Min: KES 200, Max: KES 35,000 per ATM cash-out'}
              min={50}
              max={250000}
              required
            />

            {/* Side-by-side comparison box */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className={`p-4 rounded-lg border text-xs ${method === 'withdraw_agent' ? 'border-brand bg-brand-soft/30' : 'border-neutral-200 bg-neutral-50'}`}>
                <div className="font-bold text-neutral-900 mb-1">Agent Cash-Out</div>
                <div className="text-lg font-extrabold text-neutral-900 tabular-nums">
                  {agentRes.isExceedingLimit ? 'N/A' : `KES ${agentRes.fee}`}
                </div>
                <p className="text-neutral-500 mt-1">Available at all M-PESA agents</p>
              </div>

              <div className={`p-4 rounded-lg border text-xs ${method === 'withdraw_atm' ? 'border-brand bg-brand-soft/30' : 'border-neutral-200 bg-neutral-50'}`}>
                <div className="font-bold text-neutral-900 mb-1">ATM Cash-Out</div>
                <div className="text-lg font-extrabold text-neutral-900 tabular-nums">
                  {atmRes.isExceedingLimit ? 'N/A' : `KES ${atmRes.fee}`}
                </div>
                <p className="text-neutral-500 mt-1">Capped at KES 35,000</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <ResultPanel
            title="Withdrawal Fee Result"
            headlineLabel={method === 'withdraw_agent' ? 'Agent Withdrawal Fee' : 'ATM Withdrawal Fee'}
            headlineValue={activeRes.isExceedingLimit ? 'Limit Exceeded' : `KES ${activeRes.fee.toFixed(2)}`}
            subHeadline={activeRes.isExceedingLimit ? activeRes.limitError : `Total wallet deduction: KES ${activeRes.totalDebitedFromWallet.toLocaleString()}`}
            rows={rows}
            sources={legalSources}
            copySummaryText={copySummaryText}
            shareTitle="M-PESA Withdrawal Charge Calculation"
          />
        </div>
      </div>

      <RelatedTools tools={related} />
      <FaqAccordion faqs={faqs} />
    </div>
  );
}
