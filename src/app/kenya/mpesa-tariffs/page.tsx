'use client';

import React, { useState } from 'react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { BracketTable, ColumnDef } from '@/components/BracketTable';
import { FaqAccordion } from '@/components/FaqAccordion';
import { RelatedTools } from '@/components/RelatedTools';
import { getRelatedPages } from '@/config/pages';
import { MPESA_TARIFF_BANDS, PAYBILL_CUSTOMER_BANDS, MpesaTariffBand, PaybillBand } from '@/rules/ke/2026';
import { ShieldCheck, Info } from 'lucide-react';

export default function MpesaTariffsPage() {
  const [userAmount, setUserAmount] = useState<number>(1500);

  const tariffColumns: ColumnDef<MpesaTariffBand>[] = [
    {
      header: 'Amount Range (KES)',
      accessor: b => `${b.min.toLocaleString()} – ${b.max.toLocaleString()}`,
      className: 'font-semibold text-neutral-900',
    },
    {
      header: 'Transfer to M-PESA',
      accessor: b => (b.transferMpesa === 0 ? 'FREE' : `KES ${b.transferMpesa}`),
      align: 'right',
      className: 'font-bold text-neutral-900',
    },
    {
      header: 'Transfer to Other Networks',
      accessor: b => (b.transferOtherNetworks === 0 ? 'FREE' : `KES ${b.transferOtherNetworks}`),
      align: 'right',
    },
    {
      header: 'Agent Cash Withdrawal',
      accessor: b => (b.agentWithdrawal === null ? '—' : `KES ${b.agentWithdrawal}`),
      align: 'right',
      className: 'font-semibold text-brand-strong',
    },
    {
      header: 'ATM Cash Withdrawal',
      accessor: b => (b.atmWithdrawal === null ? '—' : `KES ${b.atmWithdrawal}`),
      align: 'right',
      className: 'text-neutral-600',
    },
  ];

  const paybillColumns: ColumnDef<PaybillBand>[] = [
    {
      header: 'Payment Range (KES)',
      accessor: b => `${b.min.toLocaleString()} – ${b.max.toLocaleString()}`,
      className: 'font-semibold text-neutral-900',
    },
    {
      header: 'Customer Paybill Charge',
      accessor: b => (b.charge === 0 ? 'FREE' : `KES ${b.charge}`),
      align: 'right',
      className: 'font-bold text-brand-strong',
    },
  ];

  const related = getRelatedPages('ke-tariffs');

  const faqs = [
    {
      question: 'Are these Safaricom M-PESA charges current for 2026?',
      answer:
        'Yes. This tariff table is published pursuant to Safaricom PLC guidelines and incorporates the 15% excise duty mandated under the Kenya Finance Act 2023. All prices shown are the exact amounts debited from your wallet.',
    },
    {
      question: 'Why are some ATM withdrawal cells empty?',
      answer:
        'ATM cash-outs are restricted by banking hardware to denominations between KES 200 and KES 35,000. For amounts below KES 200 or above KES 35,000, you must withdraw at an authorized M-PESA agent.',
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <Breadcrumbs
        items={[
          { label: 'Kenya', href: '/kenya/' },
          { label: 'Official M-PESA Tariffs' },
        ]}
      />

      <div className="border-b border-neutral-200 pb-6 pt-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft px-3 py-1 text-xs font-semibold text-brand-strong mb-2">
          <ShieldCheck className="h-3.5 w-3.5 text-brand" />
          <span>Official Safaricom PLC Published Schedule</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
          Official Safaricom M-PESA Tariff Schedule 2026
        </h1>
        <p className="mt-2 text-sm sm:text-base text-neutral-600 max-w-3xl leading-relaxed">
          The complete, official customer charge schedule for sending money, agent cash withdrawals, ATM withdrawals, and Paybill merchant transactions. Inclusive of 15% excise duty.
        </p>

        {/* Highlight Amount input */}
        <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-neutral-50 p-4 rounded-xl border border-neutral-200">
          <div className="text-xs font-semibold text-neutral-700">
            Highlight your transaction amount in the tables:
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs font-bold text-neutral-500">KES</span>
            <input
              type="number"
              value={userAmount}
              onChange={e => setUserAmount(parseFloat(e.target.value) || 0)}
              step={100}
              min={1}
              className="rounded-md border border-neutral-300 py-1.5 px-3 text-xs font-medium tabular-nums w-32 focus:outline-none focus:ring-1 focus:ring-brand"
            />
          </div>
        </div>
      </div>

      {/* Main Tariff Table */}
      <BracketTable<MpesaTariffBand>
        title="M-PESA Customer Tariffs: Send & Cash Withdrawal"
        subtitle="Inclusive of 15% Excise Duty (Finance Act 2023)"
        columns={tariffColumns}
        data={MPESA_TARIFF_BANDS}
        highlightRowPredicate={b => userAmount >= b.min && userAmount <= b.max}
        searchPredicate={(b, term) => {
          const s = `${b.min} ${b.max} ${b.transferMpesa} ${b.agentWithdrawal}`;
          return s.includes(term);
        }}
        searchPlaceholder="Filter bands..."
      />

      {/* Paybill Customer Tariff Table */}
      <BracketTable<PaybillBand>
        title="Paybill Customer Charges (Table 6)"
        subtitle="Customer fees when transferring money to Paybill business numbers and banks"
        columns={paybillColumns}
        data={PAYBILL_CUSTOMER_BANDS}
        highlightRowPredicate={b => userAmount >= b.min && userAmount <= b.max}
      />

      {/* Informative guidelines */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8 text-xs text-neutral-700 leading-relaxed">
        <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-2xs space-y-2">
          <h3 className="font-bold text-neutral-900 text-sm flex items-center gap-1.5">
            <Info className="h-4 w-4 text-brand" />
            <span>Official Transaction & Account Limits</span>
          </h3>
          <ul className="list-disc pl-4 space-y-1">
            <li><strong>Maximum per single transaction:</strong> KES 250,000</li>
            <li><strong>Maximum daily transaction limit:</strong> KES 500,000</li>
            <li><strong>Maximum wallet balance:</strong> KES 500,000</li>
            <li><strong>Minimum agent withdrawal:</strong> KES 50</li>
          </ul>
        </div>

        <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-2xs space-y-2">
          <h3 className="font-bold text-neutral-900 text-sm flex items-center gap-1.5">
            <Info className="h-4 w-4 text-brand" />
            <span>Zero-Rated Services (Always Free)</span>
          </h3>
          <ul className="list-disc pl-4 space-y-1">
            <li><strong>Buy Goods & Services (Till Number):</strong> 100% FREE for customer</li>
            <li><strong>M-PESA Balance Inquiry:</strong> FREE via *334# or M-PESA App</li>
            <li><strong>Airtime Purchase via M-PESA:</strong> FREE</li>
            <li><strong>Sending KES 1 – 49:</strong> FREE to any mobile network</li>
          </ul>
        </div>
      </div>

      <RelatedTools tools={related} />
      <FaqAccordion faqs={faqs} />
    </div>
  );
}
