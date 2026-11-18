import React from 'react';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SeoArticle, WorkedExampleItem, OfficialSourceLink } from '@/components/SeoArticle';
import { StructuredData } from '@/components/StructuredData';
import { getKeRates } from '@/lib/seo/rules-content';
import { ShieldCheck, Calculator, AlertOctagon, HelpCircle } from 'lucide-react';

export default function GuideMpesaTransactionLimits() {
  const keRates = getKeRates();

  const faqs = [
    {
      question: 'What is the maximum amount I can send in a single M-PESA transaction?',
      answer:
        `Under official Central Bank of Kenya (CBK) directives, the single transaction limit for Safaricom M-PESA is KES ${keRates.mpesaMaxSingleTxn.toLocaleString()}. Any attempt to transfer KES 250,001 or more in one single push will be rejected by the system with a limit violation message.`,
    },
    {
      question: 'What is the maximum daily transaction limit on M-PESA?',
      answer:
        `The maximum daily transaction ceiling is KES ${keRates.mpesaMaxDailyLimit.toLocaleString()} per 24-hour cycle. This cumulative cap includes person-to-person transfers, merchant Lipa Na M-PESA payments, Paybill utility settlements, and agent cash withdrawals.`,
    },
    {
      question: 'What is the maximum account balance allowed in an M-PESA wallet?',
      answer:
        `The maximum wallet holding limit is KES ${keRates.mpesaMaxBalance.toLocaleString()}. An incoming transfer, deposit, or salary credit that would push your total balance above KES 500,000 will automatically bounce back to the sender.`,
    },
    {
      question: 'Can individual customers request an increase beyond the KES 500,000 limit?',
      answer:
        'No. The KES 500,000 wallet balance and daily transaction limits are statutory ceilings established under the National Payment System Act and Anti-Money Laundering (AML) regulations by the Central Bank of Kenya. Safaricom cannot grant exceptions for personal consumer SIMs.',
    },
    {
      question: 'Do business accounts (Till Numbers and Paybills) share the same limits as personal wallets?',
      answer:
        'No. Registered commercial enterprises, incorporated companies, and authorized merchant aggregators can apply for specialized Corporate Paybill and Merchant Till limits. With enhanced Know Your Customer (KYC) documentation and CBK authorization, corporate collection accounts can handle multi-million shilling daily volumes.',
    },
  ];

  const workedExamples: WorkedExampleItem[] = [
    {
      title: 'Sending KES 350,000 in a Single Day (Split Transactions)',
      scenario:
        'A contractor needs to purchase hardware supplies totaling KES 350,000. Because the amount exceeds the KES 250,000 per-transaction cap, they execute two sequential transfers.',
      inputs: [
        { label: 'Total Payment Required', value: 'KES 350,000.00' },
        { label: 'Single Transaction Cap', value: `KES ${keRates.mpesaMaxSingleTxn.toLocaleString()}.00` },
        { label: 'Daily Total Cap', value: `KES ${keRates.mpesaMaxDailyLimit.toLocaleString()}.00` },
      ],
      steps: [
        { label: 'Transaction 1 (Maximum Allowed)', formula: 'Max per-transaction limit', value: 'KES 250,000.00' },
        { label: 'Transaction 2 (Remaining Balance)', formula: 'KES 350,000 – KES 250,000', value: 'KES 100,000.00' },
        { label: 'Cumulative Daily Total', formula: 'KES 250,000 + KES 100,000', value: 'KES 350,000.00' },
        { label: 'Daily Ceiling Compliance', formula: 'KES 350,000 <= KES 500,000 cap', value: 'Compliant (Approved)', highlight: true },
      ],
      resultLabel: 'Execution Outcome',
      resultValue: '2 Successful Transfers',
      notes: 'Fully permissible within the KES 500,000 24-hour limit.',
    },
    {
      title: 'Incoming Payment Rejection: Wallet Balance Breach (KES 500k Limit)',
      scenario:
        'An exporter has KES 420,000 currently in their M-PESA wallet. A business associate attempts to send them KES 100,000 via M-PESA.',
      inputs: [
        { label: 'Current Wallet Balance', value: 'KES 420,000.00' },
        { label: 'Incoming Transfer Amount', value: 'KES 100,000.00' },
        { label: 'Resulting Projected Balance', value: 'KES 520,000.00' },
      ],
      steps: [
        { label: 'Statutory Wallet Limit', formula: 'CBK Maximum Balance Cap', value: `KES ${keRates.mpesaMaxBalance.toLocaleString()}.00` },
        { label: 'Projected Balance Check', formula: 'KES 420,000 + KES 100,000', value: 'KES 520,000.00' },
        { label: 'System Validation Result', formula: 'KES 520,000 exceeds KES 500,000 cap', value: 'REJECTED / FAILED', highlight: true },
      ],
      resultLabel: 'Resolution Required',
      resultValue: 'Withdraw / Move KES 20k First',
      notes: 'Customer must move funds to a bank account before receiving payment.',
    },
  ];

  const officialSources: OfficialSourceLink[] = [
    {
      name: 'Central Bank of Kenya (CBK)',
      documentTitle: 'Enhancement of Mobile Money Transaction Limits Circular (PR/2023/04)',
      url: 'https://www.centralbank.go.ke',
      verifiedDate: keRates.verifiedDate,
    },
    {
      name: 'Safaricom PLC',
      documentTitle: 'M-PESA Customer Tariffs & Approved Regulatory Transaction Ceilings',
      url: 'https://www.safaricom.co.ke/personal/m-pesa/tariffs',
      verifiedDate: keRates.verifiedDate,
    },
  ];

  const toc = [
    { id: 'per-transaction-limit', label: '1. The KES 250,000 Single Transaction Cap' },
    { id: 'daily-limit', label: '2. The KES 500,000 Daily Transaction Ceiling' },
    { id: 'account-balance-limit', label: '3. The KES 500,000 Maximum Wallet Holding Capacity' },
    { id: 'cbk-aml-framework', label: '4. Regulatory Rationale: CBK & Anti-Money Laundering' },
    { id: 'business-merchant-limits', label: '5. Business Accounts: Till & Paybill Extended Limits' },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <StructuredData
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Kenya', url: '/kenya/' },
          { name: 'Guides', url: '/kenya/' },
          { name: 'M-PESA Transaction Limits', url: '/kenya/guides/mpesa-transaction-limits/' },
        ]}
        article={{
          headline: 'M-PESA Limits 2026: Daily & Per-Transaction Rules Explained | Pay',
          description: 'A comprehensive review of the KES 250,000 single transaction cap, KES 500,000 daily ceiling, and KES 500,000 wallet balance limit on Safaricom M-PESA.',
          url: 'https://pay.zetawala.com/kenya/guides/mpesa-transaction-limits/',
          datePublished: '2026-03-01T08:00:00+03:00',
          dateModified: '2026-11-18T00:00:00+03:00',
        }}
        faqs={faqs}
      />

      <Breadcrumbs
        items={[
          { label: 'Kenya', href: '/kenya/' },
          { label: 'Guides', href: '/kenya/' },
          { label: 'M-PESA Limits Guide' },
        ]}
      />

      <header className="border-b border-neutral-200 pb-6 pt-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft px-3 py-1 text-xs font-semibold text-brand-strong mb-2">
          <ShieldCheck className="h-3.5 w-3.5 text-brand" />
          <span>Central Bank of Kenya Regulatory Rules</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
          M-PESA Limits: Daily &amp; Per-Transaction Rules
        </h1>
        <p className="mt-2 text-sm sm:text-base text-neutral-600 leading-relaxed">
          How the KES {keRates.mpesaMaxSingleTxn.toLocaleString()} single transaction limit, KES {keRates.mpesaMaxDailyLimit.toLocaleString()} daily ceiling, and KES {keRates.mpesaMaxBalance.toLocaleString()} wallet holding limits function under Central Bank of Kenya directives.
        </p>
      </header>

      {/* Tool Shortcut */}
      <div className="mt-6 rounded-xl border border-brand/30 bg-brand-soft/20 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-bold text-neutral-900">Calculate fees for large transactions</h2>
          <p className="text-xs text-neutral-600">See the exact tariff across all amount tiers up to KES 250,000.</p>
        </div>
        <Link
          href="/kenya/mpesa-charges-calculator/"
          className="inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-brand-strong transition-colors shrink-0"
        >
          <Calculator className="h-4 w-4" />
          <span>M-PESA Calculator</span>
        </Link>
      </div>

      <SeoArticle
        quickAnswer={`Under Central Bank of Kenya regulations, Safaricom M-PESA enforces three primary limits: (1) maximum of KES ${keRates.mpesaMaxSingleTxn.toLocaleString()} per single transaction, (2) cumulative daily transaction ceiling of KES ${keRates.mpesaMaxDailyLimit.toLocaleString()} per 24 hours, and (3) maximum wallet holding balance of KES ${keRates.mpesaMaxBalance.toLocaleString()}. Transactions exceeding these parameters fail automatically.`}
        toc={toc}
        workedExamples={workedExamples}
        sources={officialSources}
        verifiedDate={keRates.verifiedDate}
      >
        <section id="per-transaction-limit" className="space-y-4">
          <h2>1. The KES {keRates.mpesaMaxSingleTxn.toLocaleString()} Single Transaction Cap</h2>
          <p>
            The maximum amount an individual customer can send or withdraw in a single transaction on Safaricom M-PESA is <strong>KES {keRates.mpesaMaxSingleTxn.toLocaleString()}</strong>.
          </p>
          <p>
            Previously set at KES 70,000 and subsequently raised to KES 150,000, the Central Bank of Kenya authorized the expansion to KES 250,000 to accommodate high-value business commerce, digital school fee settlements, real estate rental transfers, and commercial supply chain purchases. If you attempt to initiate a transfer of KES 250,001 or more, the M-PESA SIM menu or M-PESA App will abort the request before PIN entry.
          </p>
        </section>

        <section id="daily-limit" className="space-y-4">
          <h2>2. The KES {keRates.mpesaMaxDailyLimit.toLocaleString()} Daily Transaction Ceiling</h2>
          <p>
            Regardless of how many individual transactions you conduct, your cumulative daily turnover across your M-PESA account cannot exceed <strong>KES {keRates.mpesaMaxDailyLimit.toLocaleString()}</strong> within any rolling 24-hour period.
          </p>
          <p>
            The daily ceiling combines all debit transactions originating from your wallet:
          </p>
          <ul>
            <li>Person-to-Person (P2P) transfers to Safaricom M-PESA lines.</li>
            <li>Interoperable transfers to Airtel Money and Telkom T-Kash numbers.</li>
            <li>Lipa Na M-PESA payments to Merchant Till Numbers (Buy Goods).</li>
            <li>Customer-paid and business-paid utility settlements to Paybill numbers.</li>
            <li>Cash withdrawals conducted at authorized Safaricom agents or cardless ATMs.</li>
          </ul>
        </section>

        <section id="account-balance-limit" className="space-y-4">
          <h2>3. The KES {keRates.mpesaMaxBalance.toLocaleString()} Maximum Wallet Holding Capacity</h2>
          <p>
            At no point can the total liquidity residing inside your M-PESA wallet exceed <strong>KES {keRates.mpesaMaxBalance.toLocaleString()}</strong>.
          </p>
          <p>
            This limit applies strictly to the net balance in your wallet. If you currently hold KES 450,000 in your account and someone sends you KES 60,000, the transaction will fail instantly. The sender will receive a notification stating: <em>&quot;The recipient&apos;s account balance would exceed the maximum allowable limit of KES 500,000.&quot;</em> To receive the funds, you must first withdraw or transfer at least KES 10,000 out of your wallet into a linked commercial bank account.
          </p>
        </section>

        <section id="cbk-aml-framework" className="space-y-4">
          <h2>4. Regulatory Rationale: CBK &amp; Anti-Money Laundering</h2>
          <p>
            Why are mobile money wallets capped at KES 500,000 while traditional commercial bank accounts have no statutory balance limits?
          </p>
          <p>
            The limits are enforced by the Central Bank of Kenya under the <strong>National Payment System Act</strong> and the <strong>Proceeds of Crime and Anti-Money Laundering Act (POCAMLA)</strong>. Mobile money was created as a retail payment instrument for financial inclusion, not a full-fledged prudential deposit-taking banking institution. Capping wallet balances curbs illicit capital flight, financial fraud, unauthorized offshore remittances, and systemic liquidity risks within the telecommunications sector.
          </p>
        </section>

        <section id="business-merchant-limits" className="space-y-4">
          <h2>5. Business Accounts: Till &amp; Paybill Extended Limits</h2>
          <p>
            While consumer personal lines are bound by the KES 500,000 daily cap, registered commercial entities can access significantly higher transaction thresholds through Safaricom Business services:
          </p>
          <ul>
            <li>
              <strong>Pochi La Biashara:</strong> Designed for micro-entrepreneurs, food vendors, and small kiosk operators. Operates on the standard consumer limit of KES 250,000 per transaction and KES 500,000 daily limit, but separates business receipts from personal funds.
            </li>
            <li>
              <strong>Lipa Na M-PESA Till Numbers (Buy Goods):</strong> Registered sole proprietors and limited liability corporations can apply for customized merchant profiles capable of processing multiple millions of shillings daily, with automated overnight sweeps directly into commercial bank accounts.
            </li>
            <li>
              <strong>Corporate Paybills:</strong> Utility companies, government agencies, universities, and large corporations maintain unlimited daily collection limits under direct Central Bank oversight.
            </li>
          </ul>
        </section>
      </SeoArticle>
    </div>
  );
}
