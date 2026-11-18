'use client';

import React, { useState, useMemo } from 'react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { MoneyInput } from '@/components/MoneyInput';
import { ResultPanel, BreakdownRow, CalculationLegalSource } from '@/components/ResultPanel';
import { FaqAccordion } from '@/components/FaqAccordion';
import { RelatedTools } from '@/components/RelatedTools';
import { getRelatedPages } from '@/config/pages';
import { calculateMpesaCharge } from '@/lib/ke/mpesa';
import { ShieldCheck, Building2 } from 'lucide-react';

export default function MpesaToBankChargesPage() {
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
      sublabel: 'Customer fee for transferring to bank Paybill number',
    },
    {
      label: 'Total Deducted from M-PESA Wallet',
      value: `KES ${paybillRes.totalDebitedFromWallet.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      highlight: true,
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
      documentNumber: 'Customer Tariff Table 6',
      summary: 'Regulates consumer charges when transferring funds to bank accounts via commercial bank Paybill pay numbers.',
    },
  ];

  const copySummaryText = `M-PESA to Bank Transfer Charge:
Amount: KES ${amount.toLocaleString()}
Paybill Transfer Fee: KES ${paybillRes.fee.toFixed(2)}
Total Debited: KES ${paybillRes.totalDebitedFromWallet.toLocaleString()}
Calculated on Pay (https://pay.zetawala.com/kenya/mpesa-to-bank-charges/)`;

  const related = getRelatedPages('ke-to-bank');

  const faqs = [
    {
      question: 'How are M-PESA to Bank transfers charged?',
      answer:
        'When transferring money from your M-PESA wallet to a bank account via a bank’s Paybill number (e.g., Equity Bank 247247, KCB 522522, Co-op 400200), Safaricom applies the <strong>Paybill Customer Tariff</strong>. Transfers up to KES 100 are free; KES 101–500 costs KES 3; KES 501–1,000 costs KES 5; KES 1,001–1,500 costs KES 8; and the maximum KES 250,000 costs KES 54.',
    },
    {
      question: 'Does the bank charge extra when receiving funds?',
      answer:
        'Most commercial banks do not charge an incoming deposit fee for M-PESA paybill transfers, though some may levy account maintenance or SMS alert fees depending on your specific account terms.',
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <Breadcrumbs
        items={[
          { label: 'Kenya', href: '/kenya/' },
          { label: 'M-PESA to Bank Charges' },
        ]}
      />

      <div className="border-b border-neutral-200 pb-6 pt-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft px-3 py-1 text-xs font-semibold text-brand-strong mb-2">
          <ShieldCheck className="h-3.5 w-3.5 text-brand" />
          <span>Table 6 Official Paybill Tariffs</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
          M-PESA to Bank Charges 2026
        </h1>
        <p className="mt-2 text-sm sm:text-base text-neutral-600 max-w-3xl leading-relaxed">
          Calculate the fee for transferring money from your Safaricom M-PESA wallet to commercial bank accounts via Paybill (KCB, Equity, Co-op, Stanbic, NCBA, and more).
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-2xs space-y-5">
            <h2 className="text-base font-bold text-neutral-900 border-b border-neutral-100 pb-3">
              Bank Paybill Transfer Amount
            </h2>

            <MoneyInput
              label="Amount to Transfer to Bank Account"
              value={amount}
              onChange={setAmount}
              currencySymbol="KES"
              hint="Maximum single transfer to bank is KES 250,000."
              min={1}
              max={250000}
              required
            />

            <div className="flex items-start gap-3 rounded-lg bg-neutral-50 p-4 border border-neutral-200 text-xs text-neutral-700">
              <Building2 className="h-5 w-5 text-neutral-600 shrink-0 mt-0.5" />
              <div>
                <strong>Supported Banks:</strong> Covers all Kenya commercial banks integrated with M-PESA Paybill (Equity Bank, KCB Bank, Co-operative Bank, NCBA, Absa Bank, Standard Chartered, DTB, I&M Bank).
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <ResultPanel
            title="M-PESA to Bank Fee"
            headlineLabel="Paybill Transfer Charge"
            headlineValue={paybillRes.fee === 0 ? 'FREE' : `KES ${paybillRes.fee.toFixed(2)}`}
            subHeadline={`Total wallet debit: KES ${paybillRes.totalDebitedFromWallet.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
            rows={rows}
            sources={legalSources}
            copySummaryText={copySummaryText}
            shareTitle="M-PESA to Bank Transfer Calculation"
          />
        </div>
      </div>

      <RelatedTools tools={related} />
      <FaqAccordion faqs={faqs} />
    </div>
  );
}
