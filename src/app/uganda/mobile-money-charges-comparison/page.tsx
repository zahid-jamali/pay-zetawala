'use client';

import React, { useState, useMemo } from 'react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { MoneyInput } from '@/components/MoneyInput';
import { Select } from '@/components/Select';
import { ResultPanel, BreakdownRow, CalculationLegalSource } from '@/components/ResultPanel';
import { FaqAccordion } from '@/components/FaqAccordion';
import { RelatedTools } from '@/components/RelatedTools';
import { SeoArticle, WorkedExampleItem, OfficialSourceLink } from '@/components/SeoArticle';
import { StructuredData } from '@/components/StructuredData';
import { getRelatedPages } from '@/config/pages';
import { compareUgandaMomo, UgandaTransactionType } from '@/lib/ug/momo';
import { getUgRates } from '@/lib/seo/rules-content';

export default function MobileMoneyComparisonPage() {
  const ugRates = getUgRates();
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
      label: 'MTN Total Fee (Operator + Tax)',
      value: `UGX ${comp.mtn.totalFee.toLocaleString('en-US')}`,
      sublabel: `Operator: UGX ${comp.mtn.operatorFee.toLocaleString()} | 0.5% Tax: UGX ${comp.mtn.statutoryTaxAmount.toLocaleString()}`,
    },
    {
      label: 'Airtel Total Fee (Operator + Tax)',
      value: `UGX ${comp.airtel.totalFee.toLocaleString('en-US')}`,
      sublabel: `Operator: UGX ${comp.airtel.operatorFee.toLocaleString()} | 0.5% Tax: UGX ${comp.airtel.statutoryTaxAmount.toLocaleString()}`,
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
      title: 'MTN & Airtel Uganda Interoperability Directives',
      documentNumber: 'Harmonized P2P & Cash-out Schedules',
      summary: `Regulated consumer tariffs across standard agent cash withdrawals and mobile wallet transfers. Max single transfer UGX ${ugRates.maxSingleTxn.toLocaleString()}.`,
    },
    {
      title: 'Uganda Revenue Authority (URA)',
      documentNumber: 'Excise Duty (Amendment) Act 2018',
      summary: '0.5% statutory tax applies equally to cash withdrawals on both networks.',
    },
  ];

  const copySummaryText = `Uganda Mobile Money Comparison (${ugRates.verifiedYear}):
Amount: UGX ${amount.toLocaleString()}
Transaction: ${transactionType.replace(/_/g, ' ')}
MTN Total Fee: UGX ${comp.mtn.totalFee.toLocaleString()}
Airtel Total Fee: UGX ${comp.airtel.totalFee.toLocaleString()}
Result: ${comp.cheaperNetwork === 'equal' ? 'Exact Price Parity' : `${comp.cheaperNetwork.toUpperCase()} is cheaper by UGX ${comp.difference.toLocaleString()}`}
Calculated on Pay (https://pay.zetawala.com/uganda/mobile-money-charges-comparison/)`;

  const related = getRelatedPages('ug-comparison');

  const faqs = [
    {
      question: 'Is MTN Mobile Money cheaper than Airtel Money in Uganda?',
      answer:
        'Across almost all standard consumer transaction bands (P2P transfers and agent withdrawals), MTN and Airtel charge identical fees due to national regulatory harmonization. Both also collect the identical 0.5% statutory government tax on cash withdrawals.',
    },
    {
      question: 'Which network has lower sending fees in Uganda?',
      answer:
        'Sending money to a registered user costs the same on both networks: UGX 100 for small amounts up to UGX 5,000, UGX 700 for UGX 15,001–30,000, and UGX 1,000 for UGX 60,001–125,000.',
    },
    {
      question: 'Does the 0.5% tax differ between MTN and Airtel?',
      answer:
        'No. The 0.5% tax is a national statutory excise duty enacted by the Parliament of Uganda under the Excise Duty Act. It applies uniformly to all cash withdrawals across all telecom operators.',
    },
    {
      question: 'Can I send money directly from MTN to an Airtel user?',
      answer:
        'Yes. Uganda has full mobile money interoperability. An MTN user can send funds directly to an Airtel Money recipient via *165#, and an Airtel user can send directly to MTN via *185#.',
    },
    {
      question: 'Which network has more agents across Uganda?',
      answer:
        'MTN has a larger total agent footprint in rural districts and trading centres, while Airtel maintains deep penetration in urban municipalities, Kampala, and commercial trading hubs.',
    },
    {
      question: 'Are merchant payments cheaper on MTN or Airtel?',
      answer:
        'Both MTN MoMoPay and Airtel Pay are 100% free of charge for consumers making purchases at merchant counters.',
    },
    {
      question: 'What is the daily transaction limit on both networks?',
      answer:
        'Both MTN MoMo and Airtel Money enforce a maximum daily transaction limit of UGX 10,000,000 under Bank of Uganda guidelines.',
    },
    {
      question: 'Can I withdraw Airtel Money from an MTN agent?',
      answer:
        'No. Cash withdrawals must be performed at an agent authorized for your specific network (MTN agent for MoMo; Airtel agent for Airtel Money), unless an agent operates dual-registered lines.',
    },
  ];

  const workedExamples: WorkedExampleItem[] = [
    {
      title: 'Agent Cash Withdrawal of UGX 100,000',
      scenario: 'Withdrawing UGX 100,000 cash from an agent on either network.',
      inputs: [
        { label: 'Withdrawal Principal', value: 'UGX 100,000' },
        { label: 'Channel', value: 'Authorized Agent Cash-Out' },
      ],
      steps: [
        { label: 'MTN Total Fee (Operator + Tax)', formula: 'UGX 2,400 + UGX 500 tax', value: 'UGX 2,900' },
        { label: 'Airtel Total Fee (Operator + Tax)', formula: 'UGX 2,400 + UGX 500 tax', value: 'UGX 2,900' },
        { label: 'Net Difference', formula: 'Exact Price Parity', value: 'UGX 0 Difference', highlight: true },
      ],
      resultLabel: 'Comparison Verdict',
      resultValue: 'Identical Pricing (UGX 2,900)',
      notes: 'Customer pays the exact same fee on either network.',
    },
    {
      title: 'P2P Transfer of UGX 20,000',
      scenario: 'Sending UGX 20,000 to a friend or merchant.',
      inputs: [
        { label: 'Transfer Amount', value: 'UGX 20,000' },
        { label: 'Channel', value: 'P2P Transfer to Registered User' },
      ],
      steps: [
        { label: 'MTN Transfer Fee', formula: 'UGX 15k–30k band', value: 'UGX 700' },
        { label: 'Airtel Transfer Fee', formula: 'UGX 15k–30k band', value: 'UGX 700' },
        { label: '0.5% Statutory Tax', formula: 'P2P transfers are 100% tax-exempt', value: 'UGX 0 (Tax-Free)' },
      ],
      resultLabel: 'Comparison Verdict',
      resultValue: 'Identical Pricing (UGX 700)',
      notes: 'Both networks charge UGX 700 with zero government tax.',
    },
  ];

  const officialSources: OfficialSourceLink[] = [
    {
      name: 'Bank of Uganda (BOU)',
      documentTitle: 'National Payment Systems Regulations & Interoperability Directives',
      url: 'https://www.bou.or.ug',
      verifiedDate: ugRates.verifiedDate,
    },
    {
      name: 'Uganda Revenue Authority (URA)',
      documentTitle: 'Excise Duty (Amendment) Act 2018 Guidelines',
      url: 'https://www.ura.go.ug',
      verifiedDate: ugRates.verifiedDate,
    },
  ];

  const quickAnswerText = `Comparing MTN MoMo and Airtel Money in Uganda shows uniform pricing across most standard P2P and agent cash-out tiers due to regulatory harmonization. Both networks apply the identical 0.5% statutory government tax on cash withdrawals. Both platforms enforce a UGX ${ugRates.maxSingleTxn.toLocaleString()} single transfer cap.`;

  const tocItems = [
    { id: 'tariff-comparison', label: 'Side-by-Side Fee Comparison' },
    { id: 'tax-rules', label: 'The 0.5% Tax Impact on Both Networks' },
    { id: 'interoperability', label: 'Cross-Network Sending Rules' },
    { id: 'agent-density', label: 'Agent Footprint & Merchant Acceptance' },
    { id: 'verdict', label: 'Which Network Is Better for You?' },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <StructuredData
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Uganda', url: '/uganda/' },
          { name: 'MTN vs Airtel Money Comparison 2026', url: '/uganda/mobile-money-charges-comparison/' },
        ]}
        webApp={{
          name: 'MTN vs Airtel Money Comparison 2026',
          url: '/uganda/mobile-money-charges-comparison/',
          description: 'Compare MTN Mobile Money and Airtel Uganda fees side by side for any amount to see which telecom is cheaper.',
          applicationCategory: 'FinanceApplication',
        }}
        faqs={faqs}
      />

      <Breadcrumbs
        items={[
          { label: 'Uganda', href: '/uganda/' },
          { label: 'MTN vs Airtel Money Comparison' },
        ]}
      />

      {/* Page Header */}
      <div className="border-b border-neutral-200 pb-6 pt-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
          MTN vs Airtel Money Comparison {ugRates.verifiedYear} (Uganda)
        </h1>
        <p className="mt-2 text-sm sm:text-base text-neutral-600 max-w-3xl leading-relaxed">
          Compare MTN Mobile Money and Airtel Uganda fees side by side for any transaction amount. Evaluate operator charges and 0.5% government cash-out taxes in real time.
        </p>
      </div>

      {/* Main Grid: Inputs Left, Result Right */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Inputs Column */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-2xs space-y-6">
            <h2 className="text-base font-bold text-neutral-900 border-b border-neutral-100 pb-3">
              Comparison Inputs
            </h2>

            <MoneyInput
              label="Transaction Amount"
              value={amount}
              onChange={setAmount}
              currencySymbol="UGX"
              hint={`Enter amount from UGX 500 up to UGX ${ugRates.maxSingleTxn.toLocaleString()}.`}
              min={500}
              max={ugRates.maxSingleTxn}
              required
            />

            <Select
              label="Transaction Type / Channel"
              value={transactionType}
              onChange={(val) => setTransactionType(val as UgandaTransactionType)}
              options={[
                { label: 'Agent Cash Withdrawal (0.5% Tax Included)', value: 'withdraw_agent' },
                { label: 'Send Money to Registered User (Tax-Free)', value: 'send_registered' },
                { label: 'Send Money to Bank Account', value: 'send_bank' },
              ]}
            />
          </div>
        </div>

        {/* Right Sticky Result Column */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
          <ResultPanel
            title="Comparison Outcome"
            headlineLabel="Cheapest Network"
            headlineValue={
              comp.cheaperNetwork === 'equal'
                ? 'Price Parity (Equal)'
                : `${comp.cheaperNetwork === 'mtn' ? 'MTN MoMo' : 'Airtel Money'} is cheaper`
            }
            subHeadline={
              comp.cheaperNetwork === 'equal'
                ? 'Both networks charge the exact same total fee'
                : `Save UGX ${comp.difference.toLocaleString()} on this transaction`
            }
            rows={rows}
            sources={legalSources}
            copySummaryText={copySummaryText}
            shareTitle="MTN vs Airtel Money Comparison"
          />
        </div>
      </div>

      {/* SEO Article */}
      <SeoArticle
        quickAnswer={quickAnswerText}
        toc={tocItems}
        workedExamples={workedExamples}
        sources={officialSources}
        verifiedDate={ugRates.verifiedDate}
      >
        <h2 id="tariff-comparison">Side-by-Side Fee Comparison: MTN vs Airtel</h2>
        <p>
          Uganda’s mobile money ecosystem is dominated by two primary networks: MTN Mobile Money and Airtel Money. Over recent years, regulatory interventions by the Bank of Uganda and Uganda Communications Commission (UCC) have resulted in standardized tariff bands across peer-to-peer sending and cash-outs.
        </p>
        <p>
          For almost all standard personal transaction values—such as sending UGX 20,000 or withdrawing UGX 50,000—both networks charge identical base operator fees.
        </p>

        <h2 id="tax-rules">The 0.5% Tax Impact on Both Networks</h2>
        <p>
          The statutory 0.5% mobile money tax enacted under the Excise Duty (Amendment) Act 2018 applies equally across all networks in Uganda. It is collected exclusively when cashing out at authorized agents or ATMs.
        </p>
        <p>
          Both MTN and Airtel calculate this tax as 0.5% of the gross cash-out principal and remit the proceeds directly to the Uganda Revenue Authority (URA). Neither network absorbs or alters this statutory tax.
        </p>

        <h2 id="interoperability">Cross-Network Sending Rules</h2>
        <p>
          Thanks to full national interoperability, sending money across networks (e.g. MTN to Airtel or Airtel to MTN) is seamless. The sender dials their usual USSD code (*165# for MTN, *185# for Airtel) and inputs the recipient’s mobile number. The funds credit the recipient’s wallet instantly.
        </p>

        <h2 id="agent-density">Agent Footprint &amp; Merchant Acceptance</h2>
        <p>
          While prices are virtually identical, key practical differences exist:
        </p>
        <ul>
          <li><strong>Agent Footprint:</strong> MTN possesses a slightly broader agent distribution across rural districts and upcountry towns. Airtel has rapid parity across major urban trading centres.</li>
          <li><strong>Merchant Acceptance:</strong> Both MTN MoMoPay and Airtel Pay are widely accepted at supermarkets, pharmacies, fuel stations, and restaurants, offering zero-fee digital checkout for consumers.</li>
        </ul>

        <h2 id="verdict">Which Network Is Better for You?</h2>
        <p>
          Because prices are tied in near-total parity, your choice should be based on network signal strength in your residential area, agent accessibility for cash-out float, and which telecom the majority of your family, business partners, or customers subscribe to.
        </p>
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
