'use client';

import React, { useState } from 'react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { BracketTable, ColumnDef } from '@/components/BracketTable';
import { FaqAccordion } from '@/components/FaqAccordion';
import { RelatedTools } from '@/components/RelatedTools';
import { SeoArticle, OfficialSourceLink } from '@/components/SeoArticle';
import { StructuredData } from '@/components/StructuredData';
import { getRelatedPages } from '@/config/pages';
import { MPESA_TARIFF_BANDS, PAYBILL_CUSTOMER_BANDS, MpesaTariffBand, PaybillBand } from '@/rules/ke/2026';
import { getKeRates } from '@/lib/seo/rules-content';

export default function MpesaTariffsPage() {
  const keRates = getKeRates();
  const [userAmount, setUserAmount] = useState<number>(1500);

  const tariffColumns: ColumnDef<MpesaTariffBand>[] = [
    {
      header: 'Amount Range (KES)',
      accessor: (b) => `${b.min.toLocaleString()} – ${b.max.toLocaleString()}`,
      className: 'font-semibold text-neutral-900',
    },
    {
      header: 'Transfer to M-PESA',
      accessor: (b) => (b.transferMpesa === 0 ? 'FREE' : `KES ${b.transferMpesa}`),
      align: 'right',
      className: 'font-bold text-neutral-900',
    },
    {
      header: 'Transfer to Other Networks',
      accessor: (b) => (b.transferOtherNetworks === 0 ? 'FREE' : `KES ${b.transferOtherNetworks}`),
      align: 'right',
    },
    {
      header: 'Agent Cash Withdrawal',
      accessor: (b) => (b.agentWithdrawal === null ? '—' : `KES ${b.agentWithdrawal}`),
      align: 'right',
      className: 'font-semibold text-brand-strong',
    },
    {
      header: 'ATM Cash Withdrawal',
      accessor: (b) => (b.atmWithdrawal === null ? '—' : `KES ${b.atmWithdrawal}`),
      align: 'right',
      className: 'text-neutral-600',
    },
  ];

  const paybillColumns: ColumnDef<PaybillBand>[] = [
    {
      header: 'Payment Range (KES)',
      accessor: (b) => `${b.min.toLocaleString()} – ${b.max.toLocaleString()}`,
      className: 'font-semibold text-neutral-900',
    },
    {
      header: 'Customer Paybill Charge',
      accessor: (b) => (b.charge === 0 ? 'FREE' : `KES ${b.charge}`),
      align: 'right',
      className: 'font-bold text-brand-strong',
    },
  ];

  const related = getRelatedPages('ke-tariffs');

  const faqs = [
    {
      question: 'What is the complete M-PESA tariff schedule for 2026?',
      answer:
        'The official tariff schedule published by Safaricom covers all transactions from KES 1 to KES 250,000 across multiple channels: P2P transfers, other network transfers, agent withdrawals, and ATM cash-outs. All charges are inclusive of 15% excise duty.',
    },
    {
      question: 'Which M-PESA transactions are completely free?',
      answer:
        'Transfers of KES 1 to KES 100 to another registered M-PESA user, Lipa Na M-PESA Buy Goods retail purchases, checking account balance (*334#), and M-PESA deposits at authorized agents are 100% free of charge.',
    },
    {
      question: 'What are the limits on an M-PESA account?',
      answer:
        'The maximum single transaction limit is KES 250,000. The maximum daily transaction limit is KES 500,000, and the maximum balance allowed in an M-PESA account is KES 500,000.',
    },
    {
      question: 'Do M-PESA charges change depending on time of day?',
      answer:
        'No. Safaricom M-PESA charges are fixed by tariff band and do not vary based on time, weekends, or public holidays.',
    },
    {
      question: 'How do Paybill charges differ from Buy Goods charges?',
      answer:
        'Buy Goods (Till Number) is always free for customers. Paybill can be configured by the merchant as either customer-paid (where the customer pays standard Paybill band fees) or business-paid (free for the customer).',
    },
    {
      question: 'What is the ATM withdrawal limit on M-PESA?',
      answer:
        'Cardless ATM withdrawals on M-PESA are limited to a maximum of KES 20,000 per transaction at participating ATM terminals.',
    },
    {
      question: 'How much does it cost to send money to an unregistered user?',
      answer:
        'Safaricom has phased out separate higher tariffs for unregistered mobile numbers; transfers to other Kenyan mobile networks (Airtel and Telkom) operate under the standardized cross-network tariff shown in this table.',
    },
    {
      question: 'Where can I verify official Safaricom tariffs?',
      answer:
        'Official tariffs are gazetted and published on the official Safaricom website (safaricom.co.ke/personal/m-pesa/tariffs) and displayed at all authorized M-PESA agent shops across Kenya.',
    },
  ];

  const officialSources: OfficialSourceLink[] = [
    {
      name: 'Safaricom PLC',
      documentTitle: 'Official M-PESA Comprehensive Tariff Schedule',
      url: 'https://www.safaricom.co.ke/personal/m-pesa/tariffs',
      verifiedDate: keRates.verifiedDate,
    },
    {
      name: 'Kenya Revenue Authority (KRA)',
      documentTitle: 'Finance Act 2023 (15% Excise Duty on Cellular Money Transfers)',
      url: 'https://www.kra.go.ke',
      verifiedDate: keRates.verifiedDate,
    },
  ];

  const quickAnswerText = `The official 2026 Safaricom M-PESA tariff schedule outlines exact charges for sending money, agent cash-outs, ATM withdrawals, and Paybills up to KES ${keRates.mpesaMaxSingleTxn.toLocaleString()} per transaction. P2P transfers of KES 100 or less and Buy Goods till payments are completely free (KES 0).`;

  const tocItems = [
    { id: 'tariff-schedule-summary', label: 'Tariff Schedule Structure & Bands' },
    { id: 'p2p-and-cashout', label: 'P2P Sending vs Agent Cash-Out Rates' },
    { id: 'paybill-merchant-schedule', label: 'Customer Paybill Charge Bands' },
    { id: 'limits-and-cbk-rules', label: 'CBK Wallet & Daily Limits' },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <StructuredData
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Kenya', url: '/kenya/' },
          { name: 'M-PESA Tariffs 2026', url: '/kenya/mpesa-tariffs/' },
        ]}
        dataset={{
          name: 'Official Safaricom M-PESA Tariff Schedule 2026',
          description: 'Comprehensive official tariff schedule for Safaricom M-PESA in Kenya, showing transfer fees, agent cash-out charges, ATM fees, and Paybill tiers.',
          url: '/kenya/mpesa-tariffs/',
          temporalCoverage: '2024/2026',
          keywords: ['M-PESA tariffs', 'Safaricom charges', 'agent withdrawal', 'Kenya mobile money fees', 'Paybill charges'],
        }}
        faqs={faqs}
      />

      <Breadcrumbs
        items={[
          { label: 'Kenya', href: '/kenya/' },
          { label: 'M-PESA Tariffs' },
        ]}
      />

      {/* Page Header */}
      <div className="border-b border-neutral-200 pb-6 pt-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
          Official M-PESA Tariff Table {keRates.verifiedYear}
        </h1>
        <p className="mt-2 text-sm sm:text-base text-neutral-600 max-w-3xl leading-relaxed">
          The complete, searchable Safaricom M-PESA tariff schedule. Look up official charges for sending money, agent withdrawals, cardless ATM cash-outs, and Paybill business payments.
        </p>
      </div>

      {/* Amount Filter Box */}
      <div className="mt-8 rounded-xl border border-neutral-200 bg-white p-5 shadow-2xs">
        <div className="max-w-md">
          <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
            Highlight an Amount in the Tariff Tables
          </label>
          <div className="flex gap-3">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 font-medium text-xs">KES</span>
              <input
                type="number"
                value={userAmount || ''}
                onChange={(e) => setUserAmount(parseFloat(e.target.value) || 0)}
                placeholder="e.g. 1500"
                className="w-full rounded-lg border border-neutral-300 py-2 pl-10 pr-3 text-sm text-neutral-900 focus:border-brand focus:outline-hidden focus:ring-2 focus:ring-brand/20"
              />
            </div>
            <button
              type="button"
              onClick={() => setUserAmount(1500)}
              className="rounded-lg bg-neutral-100 px-3 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-200"
            >
              Reset (1,500)
            </button>
          </div>
          <p className="mt-1.5 text-xs text-neutral-500">
            The corresponding tariff tier is automatically highlighted across both tables.
          </p>
        </div>
      </div>

      {/* Table 1: Standard P2P & Cash-Out Tariffs */}
      <div className="mt-8">
        <BracketTable<MpesaTariffBand>
          title="M-PESA Transfer & Cash Withdrawal Tariffs (Official Schedule)"
          data={MPESA_TARIFF_BANDS}
          columns={tariffColumns}
          highlightRowPredicate={(b) => userAmount >= b.min && userAmount <= b.max}
        />
      </div>

      {/* Table 2: Paybill Tariffs */}
      <div className="mt-10">
        <BracketTable<PaybillBand>
          title="M-PESA Pay to Paybill Customer Charges"
          data={PAYBILL_CUSTOMER_BANDS}
          columns={paybillColumns}
          highlightRowPredicate={(b) => userAmount >= b.min && userAmount <= b.max}
        />
      </div>

      {/* SEO Article */}
      <SeoArticle
        quickAnswer={quickAnswerText}
        toc={tocItems}
        sources={officialSources}
        verifiedDate={keRates.verifiedDate}
      >
        <h2 id="tariff-schedule-summary">Tariff Schedule Structure &amp; Fee Bands</h2>
        <p>
          The Safaricom M-PESA tariff schedule operates on a banded tiered model. Rather than charging a continuous percentage fee on transactions, payments are grouped into statutory value brackets spanning from KES 1 up to KES {keRates.mpesaMaxSingleTxn.toLocaleString()}.
        </p>
        <p>
          In 2026, all customer charges include the mandatory 15% Excise Duty under the Kenya Finance Act 2023. Transactions in the lowest bracket (KES 1 to KES 100) are exempt from transfer fees, enabling zero-cost micro-payments nationwide.
        </p>

        <h2 id="p2p-and-cashout">P2P Sending vs Agent Cash-Out Rates</h2>
        <p>
          Sending money to another registered M-PESA user is substantially cheaper than withdrawing cash:
        </p>
        <ul>
          <li><strong>Sending KES 500:</strong> Transfer fee is KES 7.00; agent withdrawal fee is KES 29.00.</li>
          <li><strong>Sending KES 2,500:</strong> Transfer fee is KES 34.00; agent withdrawal fee is KES 52.00.</li>
          <li><strong>Sending KES 10,000:</strong> Transfer fee is KES 90.00; agent withdrawal fee is KES 115.00.</li>
        </ul>
        <p>
          Users can reduce expenditure by utilizing direct digital transfers or Lipa Na M-PESA Buy Goods tills (which charge KES 0.00 to the shopper) instead of cashing out physical paper money.
        </p>

        <h2 id="paybill-merchant-schedule">Customer Paybill Charge Bands</h2>
        <p>
          Business Paybill transactions allow customers to pay utility bills, school fees, and bank deposits. Under the standard customer-paid tariff model:
        </p>
        <ul>
          <li>Payments up to KES 100 are completely free.</li>
          <li>Payments from KES 101 to KES 500 incur a KES 5.00 charge.</li>
          <li>Payments from KES 501 to KES 1,000 incur a KES 10.00 charge.</li>
          <li>Payments from KES 1,001 to KES 5,000 incur a KES 34.00 charge.</li>
          <li>Payments from KES 5,001 to KES 10,000 incur a KES 58.00 charge.</li>
          <li>Payments from KES 10,001 to KES 250,000 range between KES 62.00 and KES 108.00.</li>
        </ul>

        <h2 id="limits-and-cbk-rules">Central Bank of Kenya (CBK) Wallet &amp; Daily Limits</h2>
        <p>
          To maintain anti-money laundering (AML) compliance and consumer security, the Central Bank of Kenya enforces three primary operational caps on all personal mobile money accounts:
        </p>
        <ul>
          <li><strong>Maximum Single Transaction:</strong> KES {keRates.mpesaMaxSingleTxn.toLocaleString()} per transfer.</li>
          <li><strong>Maximum Daily Limit:</strong> KES {keRates.mpesaMaxDailyLimit.toLocaleString()} cumulative within any 24-hour cycle.</li>
          <li><strong>Maximum Account Balance:</strong> KES {keRates.mpesaMaxBalance.toLocaleString()} maximum holding capacity in the wallet.</li>
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
