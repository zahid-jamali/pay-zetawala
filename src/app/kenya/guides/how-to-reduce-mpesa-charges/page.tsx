import React from 'react';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SeoArticle, WorkedExampleItem, OfficialSourceLink } from '@/components/SeoArticle';
import { StructuredData } from '@/components/StructuredData';
import { getKeRates } from '@/lib/seo/rules-content';
import { PiggyBank, Calculator, Table, ArrowDownRight } from 'lucide-react';

export default function GuideHowToReduceMpesaCharges() {
  const keRates = getKeRates();

  const faqs = [
    {
      question: 'Is sending money under KES 100 on M-PESA really free?',
      answer:
        'Yes. Person-to-person (P2P) transfers between registered Safaricom M-PESA users for amounts between KES 1 and KES 100 carry an official tariff of KES 0.00. You can send up to three zero-rated transactions to the same recipient daily.',
    },
    {
      question: 'Why is Lipa Na M-PESA Buy Goods cheaper than sending money?',
      answer:
        'When you pay via Buy Goods (merchant Till Number), the service is 100% free of charge for the retail customer (KES 0.00 fee). The merchant absorbs the commercial processing charge. In contrast, sending money directly to a personal phone number charges you standard P2P tariff fees.',
    },
    {
      question: 'Is it cheaper to withdraw cash from an agent or an ATM in Kenya?',
      answer:
        'For amounts between KES 200 and KES 2,500, agent withdrawals cost KES 29 to KES 35, while ATM cardless withdrawals cost KES 35. For amounts between KES 7,501 and KES 20,000, agent withdrawal costs KES 87 to KES 115, whereas ATM cash-out costs a flat KES 203. Thus, agent withdrawal is significantly cheaper for amounts above KES 5,000.',
    },
    {
      question: 'Can I split large transactions to save on M-PESA fees?',
      answer:
        'Generally, no. Safaricom’s graduated tariff structure is tiered so that sending one combined sum is almost always cheaper than splitting into two transfers. The only exception is micro-payments under KES 100, which are zero-rated.',
    },
    {
      question: 'Are bank-to-M-PESA transfers subject to transaction charges?',
      answer:
        'Following Central Bank of Kenya directives, regulated bank-to-wallet transfers incur reduced tariff schedules compared to standard P2P rates. Furthermore, moving funds from your M-PESA wallet into your own linked bank account via integrated mobile banking apps (e.g., KCB M-PESA, Equity EazzyBanking) often carries lower fees than agent cash-out.',
    },
  ];

  const workedExamples: WorkedExampleItem[] = [
    {
      title: 'Merchant Payment: Buy Goods Till vs Sending Money (KES 2,500)',
      scenario:
        'A shopper buys weekly groceries at a supermarket totaling KES 2,500. They consider whether to send money to the cashier or pay through the store’s Buy Goods Till Number.',
      inputs: [
        { label: 'Purchase Amount', value: 'KES 2,500.00' },
        { label: 'Payment Channel Options', value: 'Till Number vs P2P Send' },
      ],
      steps: [
        { label: 'Option A: Lipa Na M-PESA Buy Goods (Till)', formula: 'Official customer tariff', value: 'KES 0.00 (FREE)', highlight: true },
        { label: 'Option B: Send Money to Phone Number', formula: 'KES 1,501–2,500 P2P band fee', value: 'KES 34.00 fee', isDeduction: true },
        { label: 'Instant Net Savings', formula: 'KES 34 – KES 0', value: 'KES 34.00 saved' },
      ],
      resultLabel: 'Recommended Channel Fee',
      resultValue: 'KES 0.00',
      notes: 'Always ask for the store Till number to avoid P2P fees.',
    },
    {
      title: 'Cash Withdrawal: Agent vs ATM for KES 10,000',
      scenario:
        'A university student needs to withdraw KES 10,000 in cash from their M-PESA wallet and has both an authorized Safaricom agent and a bank ATM nearby.',
      inputs: [
        { label: 'Cash Withdrawal Amount', value: 'KES 10,000.00' },
        { label: 'Available Cash-Out Channels', value: 'M-PESA Agent vs Cardless ATM' },
      ],
      steps: [
        { label: 'Option A: Authorized M-PESA Agent', formula: 'KES 7,501–10,000 tariff band', value: 'KES 115.00 fee', highlight: true },
        { label: 'Option B: Cardless ATM Cash-Out', formula: 'KES 10,001–20,000 ATM tariff', value: 'KES 203.00 fee', isDeduction: true },
        { label: 'Difference / Cost Savings', formula: 'KES 203 – KES 115', value: 'KES 88.00 saved' },
      ],
      resultLabel: 'Agent Cash-Out Fee',
      resultValue: 'KES 115.00',
      notes: 'Agent withdrawal saves KES 88 on a KES 10,000 cashout.',
    },
  ];

  const officialSources: OfficialSourceLink[] = [
    {
      name: 'Safaricom PLC',
      documentTitle: 'Official M-PESA Consumer Tariffs & Cost Reduction Tips',
      url: 'https://www.safaricom.co.ke/personal/m-pesa/tariffs',
      verifiedDate: keRates.verifiedDate,
    },
    {
      name: 'Central Bank of Kenya (CBK)',
      documentTitle: 'National Payment System Regulations & Pricing Principles',
      url: 'https://www.centralbank.go.ke',
      verifiedDate: keRates.verifiedDate,
    },
  ];

  const toc = [
    { id: 'under-100-rule', label: '1. The Free Under-100 Transfer Advantage' },
    { id: 'buy-goods-vs-send', label: '2. Buy Goods (Till) vs Send Money to Phone' },
    { id: 'agent-vs-atm', label: '3. Agent Withdrawal vs ATM Cash-Out Comparison' },
    { id: 'paybill-optimization', label: '4. Paybill Cost Optimization & Customer-Paid Fees' },
    { id: 'bank-wallet-tricks', label: '5. Moving Funds via Bank Apps vs Direct Cash-Out' },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <StructuredData
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Kenya', url: '/kenya/' },
          { name: 'Guides', url: '/kenya/' },
          { name: 'How to Reduce M-PESA Charges', url: '/kenya/guides/how-to-reduce-mpesa-charges/' },
        ]}
        article={{
          headline: 'How to Reduce M-PESA Charges in Kenya (2026 Practical Guide)',
          description: 'Actionable tips to save money on Safaricom M-PESA: free under-100 transfers, Till vs Paybill rules, and agent vs ATM cashout savings.',
          url: 'https://pay.zetawala.com/kenya/guides/how-to-reduce-mpesa-charges/',
          datePublished: '2026-02-22T08:00:00+03:00',
          dateModified: '2026-11-18T00:00:00+03:00',
        }}
        faqs={faqs}
      />

      <Breadcrumbs
        items={[
          { label: 'Kenya', href: '/kenya/' },
          { label: 'Guides', href: '/kenya/' },
          { label: 'Reduce M-PESA Charges' },
        ]}
      />

      <header className="border-b border-neutral-200 pb-6 pt-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft px-3 py-1 text-xs font-semibold text-brand-strong mb-2">
          <PiggyBank className="h-3.5 w-3.5 text-brand" />
          <span>Cost Optimization Guide</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
          How to Reduce M-PESA Charges in Kenya
        </h1>
        <p className="mt-2 text-sm sm:text-base text-neutral-600 leading-relaxed">
          Smart strategies to minimize Safaricom transaction fees: leveraging zero-fee transfers under KES 100, choosing merchant Till Numbers over personal transfers, and optimizing cash-out channels.
        </p>
      </header>

      {/* Tool Shortcut */}
      <div className="mt-6 rounded-xl border border-brand/30 bg-brand-soft/20 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-bold text-neutral-900">Check official tariffs before sending</h2>
          <p className="text-xs text-neutral-600">Enter any amount to see the exact fee across all M-PESA channels.</p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/kenya/mpesa-charges-calculator/"
            className="inline-flex items-center gap-1.5 rounded-lg bg-brand px-3.5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-brand-strong transition-colors"
          >
            <Calculator className="h-3.5 w-3.5" />
            <span>M-PESA Calculator</span>
          </Link>
          <Link
            href="/kenya/mpesa-tariffs/"
            className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-300 bg-white px-3.5 py-2 text-xs font-semibold text-neutral-800 shadow-xs hover:bg-neutral-50 transition-colors"
          >
            <Table className="h-3.5 w-3.5 text-neutral-600" />
            <span>Tariff Schedule</span>
          </Link>
        </div>
      </div>

      <SeoArticle
        quickAnswer="You can significantly cut M-PESA fees by: (1) using zero-fee transfers (KES 0) for amounts from KES 1 to KES 100, (2) paying merchants via Lipa Na M-PESA Buy Goods Till Numbers (always KES 0 for customers) instead of sending to personal numbers, and (3) withdrawing cash at authorized agents instead of ATMs for amounts over KES 5,000."
        toc={toc}
        workedExamples={workedExamples}
        sources={officialSources}
        verifiedDate={keRates.verifiedDate}
      >
        <section id="under-100-rule" className="space-y-4">
          <h2>1. The Free Under-100 Transfer Advantage</h2>
          <p>
            Under official Safaricom tariffs approved by the Central Bank of Kenya, sending money between registered M-PESA users for any amount between <strong>KES 1 and KES 100 carries an official fee of KES 0.00</strong>.
          </p>
          <p>
            This zero-rating was instituted to support micro-payments in the informal economy. For small peer-to-peer repayments, reimbursing transport fares, or sending airtime funds, keep transactions at or below KES 100 whenever feasible to enjoy 100% fee-free transfers.
          </p>
        </section>

        <section id="buy-goods-vs-send" className="space-y-4">
          <h2>2. Buy Goods (Till) vs Send Money to Phone</h2>
          <p>
            One of the most frequent mistakes Kenyan consumers make when paying retail merchants, supermarkets, petrol stations, or restaurants is using <strong>Send Money</strong> rather than <strong>Lipa Na M-PESA Buy Goods</strong>:
          </p>
          <ul>
            <li><strong>Lipa Na M-PESA Buy Goods (Till Number):</strong> Completely <strong>FREE (KES 0.00)</strong> for the customer. The retailer absorbs the small merchant service commission.</li>
            <li><strong>Send Money (Personal Phone Number):</strong> Incurs full P2P transfer fees. Sending KES 3,000 to a phone number costs KES 53, while paying that exact amount to a Buy Goods Till costs KES 0.00.</li>
          </ul>
          <p>
            Always ask small vendors if they have a registered Till Number before sending funds to their personal Safaricom line.
          </p>
        </section>

        <section id="agent-vs-atm" className="space-y-4">
          <h2>3. Agent Withdrawal vs ATM Cash-Out Comparison</h2>
          <p>
            When converting your mobile wallet balance into physical cash, your choice of channel impacts your cost:
          </p>
          <div className="overflow-x-auto rounded-lg border border-neutral-200 my-4">
            <table className="w-full text-left text-sm text-neutral-700">
              <thead className="bg-neutral-100 text-xs font-bold uppercase text-neutral-800">
                <tr>
                  <th className="px-4 py-3">Withdrawal Amount</th>
                  <th className="px-4 py-3">M-PESA Agent Fee</th>
                  <th className="px-4 py-3">Cardless ATM Fee</th>
                  <th className="px-4 py-3">Cheaper Option</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                <tr>
                  <td className="px-4 py-3 font-medium">KES 500</td>
                  <td className="px-4 py-3 font-bold text-brand">KES 29.00</td>
                  <td className="px-4 py-3">KES 35.00</td>
                  <td className="px-4 py-3 text-brand font-semibold">Agent (Save KES 6)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">KES 2,000</td>
                  <td className="px-4 py-3 font-bold text-brand">KES 35.00</td>
                  <td className="px-4 py-3">KES 35.00</td>
                  <td className="px-4 py-3">Equal (KES 35)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">KES 5,000</td>
                  <td className="px-4 py-3 font-bold text-brand">KES 69.00</td>
                  <td className="px-4 py-3">KES 70.00</td>
                  <td className="px-4 py-3 text-brand font-semibold">Agent (Save KES 1)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">KES 10,000</td>
                  <td className="px-4 py-3 font-bold text-brand">KES 115.00</td>
                  <td className="px-4 py-3">KES 203.00</td>
                  <td className="px-4 py-3 text-brand font-semibold">Agent (Save KES 88)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">KES 20,000</td>
                  <td className="px-4 py-3 font-bold text-brand">KES 185.00</td>
                  <td className="px-4 py-3">KES 203.00</td>
                  <td className="px-4 py-3 text-brand font-semibold">Agent (Save KES 18)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            For amounts above KES 5,000, authorized Safaricom agents are significantly more cost-effective than cardless ATM withdrawals.
          </p>
        </section>

        <section id="paybill-optimization" className="space-y-4">
          <h2>4. Paybill Cost Optimization &amp; Customer-Paid Fees</h2>
          <p>
            Unlike Buy Goods Till Numbers, Paybill business payments fall into two distinct administrative categories:
          </p>
          <ul>
            <li><strong>Business-Paid Paybills:</strong> The receiving company absorbs the processing fee (e.g., certain prepaid electricity tokens and select mobile apps). The customer pays KES 0.00.</li>
            <li><strong>Customer-Paid Paybills:</strong> The sender pays a graduated tariff fee ranging from KES 5 up to KES 110 depending on the amount.</li>
          </ul>
          <p>
            When paying utility bills or school fees, check if the institution provides an integrated online bank portal or Direct Debit facility that eliminates consumer Paybill convenience fees.
          </p>
        </section>

        <section id="bank-wallet-tricks" className="space-y-4">
          <h2>5. Moving Funds via Bank Apps vs Direct Cash-Out</h2>
          <p>
            If you need cash in hand and possess an active account with major Kenyan commercial banks (such as KCB, Equity Bank, Co-operative Bank, or NCBA):
          </p>
          <ol>
            <li>Transfer money from your M-PESA wallet into your bank account using the bank&apos;s designated Paybill number or mobile banking app.</li>
            <li>Withdraw the cash directly from your bank&apos;s own ATM using your debit card.</li>
          </ol>
          <p>
            Because debit card ATM withdrawals at your home bank typically charge a nominal flat fee (e.g., KES 30 to KES 35), this method is substantially cheaper for large sums (such as KES 30,000 to KES 70,000) than paying an agent withdrawal fee of KES 197 or KES 309.
          </p>
        </section>
      </SeoArticle>
    </div>
  );
}
