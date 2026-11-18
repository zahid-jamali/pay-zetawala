import React from 'react';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SeoArticle, WorkedExampleItem, OfficialSourceLink } from '@/components/SeoArticle';
import { StructuredData } from '@/components/StructuredData';
import { getUgRates } from '@/lib/seo/rules-content';
import { Receipt, Calculator, Scale, HelpCircle } from 'lucide-react';

export default function GuideMobileMoneyWithdrawalTaxExplained() {
  const ugRates = getUgRates();
  const taxPct = (ugRates.withdrawalTaxRate * 100).toFixed(1); // 0.5%

  const faqs = [
    {
      question: 'Does the 0.5% mobile money tax apply when sending money in Uganda?',
      answer:
        'No. Under the Excise Duty (Amendment) Act 2018, the 0.5% government tax applies strictly to mobile money cash withdrawals (cash-out at agent). Sending money person-to-person (P2P), depositing money into your wallet, paying utility bills, and purchasing merchant goods are completely exempt from the 0.5% excise duty.',
    },
    {
      question: 'How is the 0.5% withdrawal tax collected?',
      answer:
        'The tax is automatically deducted from your wallet balance by the telecom operator (MTN MoMo or Airtel Money) at the exact moment you initiate a cash withdrawal. The telecom remits the collected tax directly to the Uganda Revenue Authority (URA).',
    },
    {
      question: 'Is the 0.5% tax included in the telecom agent withdrawal fee?',
      answer:
        'No. The 0.5% tax is an extra statutory government levy added on top of the telecom operator’s agent withdrawal tariff band. For instance, when withdrawing UGX 50,000, you pay the telecom tariff fee plus an additional UGX 250 government excise duty.',
    },
    {
      question: 'Why was the mobile money tax reduced from 1% to 0.5%?',
      answer:
        'In July 2018, the government initially enacted a 1% tax on all mobile money transactions (deposits, transfers, and withdrawals). Following widespread public outcry, business resistance, and a sharp decline in digital transactions, Parliament passed the Excise Duty (Amendment) Act in November 2018, slashing the tax to 0.5% and restricting it solely to cash withdrawals.',
    },
    {
      question: 'Can I avoid the 0.5% tax by paying for goods directly with mobile money?',
      answer:
        'Yes. You can completely avoid the 0.5% withdrawal tax by keeping your money in digital form and paying merchants via MTN MoMoPay or Airtel Merchant Pay, or settling utility bills (such as Umeme Yaka and NWSC water) directly from your wallet balance.',
    },
  ];

  const workedExamples: WorkedExampleItem[] = [
    {
      title: 'Everyday Cash-Out of UGX 50,000 at an Agent',
      scenario:
        'An individual withdraws UGX 50,000 in cash from an authorized MTN MoMo or Airtel Money agent in Kampala.',
      inputs: [
        { label: 'Withdrawal Amount', value: 'UGX 50,000' },
        { label: 'Statutory Excise Tax Rate', value: `${taxPct}%` },
        { label: 'Governing Law', value: 'Excise Duty (Amendment) Act 2018' },
      ],
      steps: [
        { label: 'Government Excise Duty (0.5%)', formula: '0.5% × UGX 50,000', value: 'UGX 250', highlight: true },
        { label: 'Estimated Telecom Agent Fee', formula: 'Standard tariff band fee', value: 'UGX 1,450' },
        { label: 'Total Transaction Cost', formula: 'UGX 1,450 telecom + UGX 250 tax', value: 'UGX 1,700' },
        { label: 'Total Deducted from Wallet', formula: 'UGX 50,000 principal + UGX 1,700', value: 'UGX 51,700' },
      ],
      resultLabel: 'Government Tax Paid',
      resultValue: 'UGX 250',
      notes: 'Customer receives UGX 50,000 cash from the agent.',
    },
    {
      title: 'Commercial Business Cash-Out of UGX 500,000',
      scenario:
        'A produce trader withdraws UGX 500,000 in cash to pay rural farmers for crop deliveries.',
      inputs: [
        { label: 'Withdrawal Amount', value: 'UGX 500,000' },
        { label: 'Statutory Excise Tax Rate', value: `${taxPct}%` },
      ],
      steps: [
        { label: 'Government Excise Duty (0.5%)', formula: '0.5% × UGX 500,000', value: 'UGX 2,500', highlight: true },
        { label: 'Telecom Agent Withdrawal Fee', formula: 'UGX 500,000 tariff tier', value: 'UGX 7,000' },
        { label: 'Total Fees & Taxes', formula: 'UGX 7,000 fee + UGX 2,500 tax', value: 'UGX 9,500' },
        { label: 'Total Deducted from Wallet', formula: 'UGX 500,000 + UGX 9,500', value: 'UGX 509,500' },
      ],
      resultLabel: 'Statutory Tax Remitted to URA',
      resultValue: 'UGX 2,500',
      notes: 'Total deduction: UGX 509,500.',
    },
  ];

  const officialSources: OfficialSourceLink[] = [
    {
      name: 'Uganda Revenue Authority (URA)',
      documentTitle: 'Excise Duty (Amendment) Act 2018 Guidelines & Mobile Money Tax Schedule',
      url: 'https://www.ura.go.ug',
      verifiedDate: ugRates.verifiedDate,
    },
    {
      name: 'Parliament of Uganda',
      documentTitle: 'Excise Duty (Amendment) Act, 2018 (Act 11 of 2018)',
      url: 'https://www.parliament.go.ug',
      verifiedDate: ugRates.verifiedDate,
    },
  ];

  const toc = [
    { id: 'tax-origins', label: '1. Legislative Background: The 2018 Excise Duty Act' },
    { id: 'why-cashout-only', label: '2. Why the 0.5% Tax Applies Only to Cash-Out' },
    { id: 'how-it-is-calculated', label: '3. Exact Mathematical Formula & Telecom Split' },
    { id: 'exempt-transactions', label: '4. Completely Exempt Mobile Money Transactions' },
    { id: 'avoiding-the-tax', label: '5. Legitimate Ways to Avoid Paying the 0.5% Tax' },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <StructuredData
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Uganda', url: '/uganda/' },
          { name: 'Guides', url: '/uganda/' },
          { name: 'Mobile Money Tax Explained', url: '/uganda/guides/mobile-money-withdrawal-tax-explained/' },
        ]}
        article={{
          headline: 'Uganda 0.5% Mobile Money Tax Explained: Rules & Calculation (2026)',
          description: 'Everything you need to know about Uganda’s 0.5% mobile money cash withdrawal tax under the Excise Duty (Amendment) Act 2018, exemptions, and URA rules.',
          url: 'https://pay.zetawala.com/uganda/guides/mobile-money-withdrawal-tax-explained/',
          datePublished: '2026-03-10T08:00:00+03:00',
          dateModified: '2026-11-18T00:00:00+03:00',
        }}
        faqs={faqs}
      />

      <Breadcrumbs
        items={[
          { label: 'Uganda', href: '/uganda/' },
          { label: 'Guides', href: '/uganda/' },
          { label: '0.5% MoMo Tax Explained' },
        ]}
      />

      <header className="border-b border-neutral-200 pb-6 pt-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft px-3 py-1 text-xs font-semibold text-brand-strong mb-2">
          <Receipt className="h-3.5 w-3.5 text-brand" />
          <span>Uganda Revenue Authority Guide</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
          Uganda 0.5% Mobile Money Tax Explained
        </h1>
        <p className="mt-2 text-sm sm:text-base text-neutral-600 leading-relaxed">
          How the statutory {taxPct}% excise duty applies to mobile money cash withdrawals, why sending money is tax-free, and how the tax is remitted to the Uganda Revenue Authority.
        </p>
      </header>

      {/* Tool Shortcut */}
      <div className="mt-6 rounded-xl border border-brand/30 bg-brand-soft/20 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-bold text-neutral-900">Compare MTN MoMo and Airtel Money fees</h2>
          <p className="text-xs text-neutral-600">See telecom tariffs and the 0.5% tax calculated automatically for any withdrawal amount.</p>
        </div>
        <Link
          href="/uganda/mobile-money-charges-comparison/"
          className="inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-brand-strong transition-colors shrink-0"
        >
          <Calculator className="h-4 w-4" />
          <span>MoMo Comparison Tool</span>
        </Link>
      </div>

      <SeoArticle
        quickAnswer={`Under the Excise Duty (Amendment) Act 2018, Uganda levies a ${taxPct}% excise duty exclusively on mobile money cash withdrawals (cash-out at agent). Sending money person-to-person (P2P), deposits, bill payments, and merchant MoMoPay transactions are 100% tax-free. The 0.5% tax is deducted from your wallet at the time of withdrawal and remitted to the URA.`}
        toc={toc}
        workedExamples={workedExamples}
        sources={officialSources}
        verifiedDate={ugRates.verifiedDate}
      >
        <section id="tax-origins" className="space-y-4">
          <h2>1. Legislative Background: The 2018 Excise Duty Act</h2>
          <p>
            In July 2018, the Government of Uganda initially introduced a sweeping 1.0% excise duty on all mobile money transactions, including deposits, transfers, and cash-outs. The tax met with immediate public dissatisfaction, parliamentary debate, and legal challenges, as digital transaction volumes plunged across both MTN Uganda and Airtel Uganda networks.
          </p>
          <p>
            In response, Parliament passed the <strong>Excise Duty (Amendment) Act, 2018 (Act 11 of 2018)</strong> in November 2018. The legislation made two decisive corrections:
          </p>
          <ul>
            <li>It slashed the statutory excise tax rate from 1.0% to <strong>0.5%</strong>.</li>
            <li>It restricted the tax strictly and solely to <strong>cash withdrawals</strong> from mobile money accounts.</li>
          </ul>
        </section>

        <section id="why-cashout-only" className="space-y-4">
          <h2>2. Why the 0.5% Tax Applies Only to Cash-Out</h2>
          <p>
            The deliberate policy intention of confining the 0.5% excise duty to cash withdrawals was to accelerate financial inclusion and encourage a cashless economy in Uganda.
          </p>
          <p>
            By making person-to-person transfers and digital bill payments tax-free, the law incentivizes individuals and businesses to keep funds inside the digital ecosystem rather than converting digital shillings back into physical paper cash notes.
          </p>
        </section>

        <section id="how-it-is-calculated" className="space-y-4">
          <h2>3. Exact Mathematical Formula &amp; Telecom Split</h2>
          <p>
            Whenever you withdraw funds at an authorized agent:
          </p>
          <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 font-mono text-sm text-neutral-800">
            <code>Total Wallet Deduction = Withdrawal Principal + Operator Tariff Fee + (0.005 × Principal)</code>
          </div>
          <p>
            The telecom operator (MTN MoMo or Airtel Money) acts as a statutory tax withholding agent for the Uganda Revenue Authority (URA). The operator retains its tariff fee to compensate the local agent and cover network operational costs, while the 0.5% tax component is swept directly into the Consolidated Fund.
          </p>
        </section>

        <section id="exempt-transactions" className="space-y-4">
          <h2>4. Completely Exempt Mobile Money Transactions</h2>
          <p>
            The following routine transactions carry <strong>ZERO (0.0%) government tax</strong>:
          </p>
          <ul>
            <li><strong>Cash Deposits:</strong> Depositing cash into your own or another user&apos;s mobile wallet at an agent.</li>
            <li><strong>Peer-to-Peer Transfers (P2P):</strong> Sending money to friends, family, or business associates on MTN MoMo or Airtel Money.</li>
            <li><strong>Utility Settlements:</strong> Paying electricity tokens (Umeme Yaka), National Water and Sewerage Corporation (NWSC) water bills, or Pay-TV subscriptions (DStv, GOtv, StarTimes).</li>
            <li><strong>Merchant Payments:</strong> Buying goods at supermarkets, pharmacies, or restaurants using MTN MoMoPay or Airtel Merchant Pay.</li>
            <li><strong>Bank-to-Wallet &amp; Wallet-to-Bank:</strong> Moving funds between linked commercial bank accounts and your mobile wallet.</li>
          </ul>
        </section>

        <section id="avoiding-the-tax" className="space-y-4">
          <h2>5. Legitimate Ways to Avoid Paying the 0.5% Tax</h2>
          <p>
            Consumers and small business owners in Uganda can eliminate withdrawal tax costs entirely by embracing digital payment rails:
          </p>
          <ol>
            <li><strong>Pay Merchants Digitally:</strong> Instead of withdrawing cash to buy fuel or groceries, ask the merchant for their MoMoPay merchant code or Airtel Till. You pay zero tax on merchant transactions.</li>
            <li><strong>Transfer to Bank Account:</strong> If you maintain a bank account with zero-fee ATM cash withdrawals, transfer funds from your wallet to your bank account and withdraw cash using your Visa or Mastercard debit card.</li>
          </ol>
        </section>
      </SeoArticle>
    </div>
  );
}
