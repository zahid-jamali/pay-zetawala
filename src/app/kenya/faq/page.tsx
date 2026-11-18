import React from 'react';
import { FaqHubPage, FaqCategorySection } from '@/components/FaqHubPage';
import { getKeRates } from '@/lib/seo/rules-content';

export default function KenyaFaqPage() {
  const ke = getKeRates();

  const categories: FaqCategorySection[] = [
    {
      id: 'mpesa-sending',
      title: 'M-PESA Sending Charges & Rates',
      description: 'Fees for transferring money to registered Safaricom users, other mobile networks, and unregistered recipients.',
      items: [
        {
          question: 'Is it free to send small amounts on M-PESA?',
          answer: 'Yes. Transfers of KSh 1 to KSh 100 to registered M-PESA users and other mobile network users (Airtel, Telkom) are completely free (KSh 0 fee).',
          plainAnswer: 'Transfers of KSh 1 to KSh 100 to registered users are completely free (KSh 0 fee).',
        },
        {
          question: 'Are published M-PESA tariffs inclusive of government taxes?',
          answer: 'Yes. All Safaricom M-PESA fee tables include the statutory 15% excise duty on mobile money transfer services mandated by the Finance Act. What you see on the tariff is the total deducted.',
          plainAnswer: 'Yes. All published Safaricom M-PESA fees include the 15% government excise duty.',
        },
        {
          question: 'How much does it cost to send KSh 1,000 on M-PESA?',
          answer: 'Sending KSh 1,000 to another registered M-PESA user costs KSh 13. Sending to an unregistered recipient costs KSh 13 if collected, while cross-network transfer to Airtel or Telkom costs KSh 13.',
          plainAnswer: 'Sending KSh 1,000 to a registered user costs KSh 13.',
        },
        {
          question: 'What is the maximum fee for sending money on M-PESA?',
          answer: 'The highest transfer fee on the official Safaricom tariff is KSh 108, which applies to sending amounts between KSh 50,001 and KSh 250,000 to registered users.',
          plainAnswer: 'The maximum transfer fee is KSh 108 for sending KSh 50,001 to KSh 250,000 to registered users.',
        },
        {
          question: 'Does sending money to an unregistered user cost more?',
          answer: 'Unregistered users receive a voucher code. While small amounts cost the same, higher amounts (e.g. above KSh 2,500) can incur higher withdrawal voucher charges. Registered-to-registered transfers are always cheaper.',
          plainAnswer: 'Unregistered transfers generate withdrawal vouchers and can incur higher cashout fees at an agent.',
        },
        {
          question: 'Can you reverse an accidental M-PESA transfer?',
          answer: 'Yes. You can initiate a reversal immediately by forwarding the entire M-PESA confirmation SMS to 456, or by opening the M-PESA App or Safaricom App and selecting "Reverse Transaction" within 2 hours.',
          plainAnswer: 'Yes. Forward the transaction SMS to 456 or initiate a reversal via the M-PESA App.',
        },
      ],
    },
    {
      id: 'agent-atm-withdrawals',
      title: 'Agent & ATM Cash Withdrawals',
      description: 'Tariffs for withdrawing cash at Safaricom M-PESA agents and partner bank ATMs.',
      items: [
        {
          question: 'How much does it cost to withdraw KSh 1,000 at an M-PESA agent?',
          answer: 'Withdrawing KSh 1,000 at a Safaricom agent costs KSh 29. You must have at least KSh 1,029 in your M-PESA balance to complete the cashout.',
          plainAnswer: 'Withdrawing KSh 1,000 at an agent costs KSh 29.',
        },
        {
          question: 'What is the maximum withdrawal fee at an agent?',
          answer: 'The maximum agent withdrawal charge is KSh 309, which applies to withdrawals between KSh 50,001 and the single-transaction limit of KSh 250,000.',
          plainAnswer: 'The maximum agent withdrawal fee is KSh 309 for amounts between KSh 50,001 and KSh 250,000.',
        },
        {
          question: 'Can you withdraw cash from an ATM without an ATM card?',
          answer: 'Yes. You can generate an ATM withdrawal authorization code via *334# or the M-PESA App. ATM cashout bands range from KSh 200 to KSh 20,000, with fees ranging from KSh 35 to KSh 203.',
          plainAnswer: 'Yes. You can generate an ATM authorization code from your phone and withdraw up to KSh 20,000 per transaction.',
        },
        {
          question: 'Why is ATM withdrawal more expensive than agent withdrawal for smaller amounts?',
          answer: 'ATM networks incur interbank switching and automated teller servicing fees. For amounts under KSh 2,500, agent cashouts are significantly cheaper than ATM withdrawals.',
          plainAnswer: 'ATM withdrawals carry higher processing overhead, making agent cashouts cheaper for transactions under KSh 2,500.',
        },
        {
          question: 'What is the minimum amount you can withdraw from an M-PESA agent?',
          answer: 'The minimum withdrawal amount at an agent is KSh 50, which carries a fee of KSh 11.',
          plainAnswer: 'The minimum agent withdrawal is KSh 50 with a KSh 11 fee.',
        },
      ],
    },
    {
      id: 'fuliza',
      title: 'Fuliza M-PESA Overdraft Fees',
      description: 'Access fees, zero-rated grace periods, daily facility charges, and credit limits.',
      items: [
        {
          question: 'Is Fuliza free if repaid within the same day?',
          answer: 'No. While Fuliza offers a 3-day grace period for small overdrafts (KSh 101 to KSh 1,000 where daily charges start on day 4), a 1% access fee is charged immediately upon drawdown. Overdrafts up to KSh 100 carry KSh 0 daily fee throughout.',
          plainAnswer: 'Overdrafts up to KSh 100 have KSh 0 daily fee. Overdrafts of KSh 101-1,000 enjoy a 3-day zero-fee grace period before daily charges begin.',
        },
        {
          question: 'What are the daily fees for Fuliza overdrafts?',
          answer: 'Daily fees are banded: KSh 101-500: KSh 2.50/day (after day 3); KSh 501-1,000: KSh 6.00/day (after day 3); KSh 1,001-1,500: KSh 18.00/day; KSh 1,501-2,500: KSh 20.00/day; KSh 2,501-70,000: KSh 25.00/day.',
          plainAnswer: 'Daily fees range from KSh 0 (under KSh 100) up to KSh 25.00/day for balances between KSh 2,501 and KSh 70,000.',
        },
        {
          question: 'How is Fuliza automatically repaid?',
          answer: 'Fuliza automatically deducts any incoming funds to your M-PESA account (including deposits, received payments, or Paybill reversals) until the outstanding principal and accrued daily maintenance fees are fully cleared.',
          plainAnswer: 'Any funds received or deposited into your M-PESA wallet are automatically swept to pay off your active Fuliza balance.',
        },
        {
          question: 'Can you withdraw Fuliza cash at an M-PESA agent?',
          answer: 'No. Fuliza is an overdraft service designed exclusively for completing Send Money, Lipa Na M-PESA (Buy Goods), and Paybill transactions when your wallet balance is insufficient. You cannot cash out Fuliza at an agent or ATM.',
          plainAnswer: 'No. Fuliza can only complete Send Money, Paybill, and Buy Goods transactions; direct cash withdrawal is not permitted.',
        },
        {
          question: 'How do you increase your Fuliza credit limit?',
          answer: 'Fuliza limits are reviewed periodically by NCBA and Safaricom algorithms based on your M-PESA transaction volume, consistent on-time repayments, and account history. Frequent borrowing and prompt same-day repayment boost your limit.',
          plainAnswer: 'Your limit increases automatically based on consistent M-PESA usage and early repayment of outstanding overdrafts.',
        },
      ],
    },
    {
      id: 'mshwari',
      title: 'M-Shwari 30-Day Loans',
      description: 'Facilitation fees, repayment terms, roll-over penalties, and comparison with Fuliza.',
      items: [
        {
          question: 'What is the loan facilitation fee on M-Shwari?',
          answer: `M-Shwari charges a flat facilitation fee of ${ke.mshwariRatePercent}% of the loan principal for a ${ke.mshwariDays}-day loan term. For example, borrowing KSh 10,000 incurs a fee of KSh 750, with a total repayment of KSh 10,750.`,
          plainAnswer: `M-Shwari charges a flat ${ke.mshwariRatePercent}% loan facilitation fee for a ${ke.mshwariDays}-day period.`,
        },
        {
          question: 'What happens if you do not pay your M-Shwari loan within 30 days?',
          answer: 'If unpaid after 30 days, your loan is rolled over for an additional 30 days and an additional 7.5% facility fee is applied to the remaining outstanding balance. Continued default leads to CRB listing and account freeze.',
          plainAnswer: 'The loan rolls over for another 30 days with an additional 7.5% fee applied to the outstanding balance.',
        },
        {
          question: 'Which is cheaper: Fuliza or M-Shwari?',
          answer: 'For short-term borrowing of 1 to 5 days, Fuliza is often cheaper due to fixed daily fees. For borrowing periods of 10 to 30 days, M-Shwari is substantially cheaper because its 7.5% flat fee does not compound daily.',
          plainAnswer: 'Fuliza is cheaper for 1 to 5 days; M-Shwari is cheaper for borrowing over 10 to 30 days.',
        },
        {
          question: 'Can you withdraw M-Shwari funds into cash?',
          answer: 'Yes. Unlike Fuliza, M-Shwari loan funds are disbursed directly into your M-PESA wallet, allowing you to withdraw the cash at an agent, send it to another user, or pay bills.',
          plainAnswer: 'Yes. M-Shwari loan funds are deposited into your M-PESA balance and can be cashed out at any agent.',
        },
      ],
    },
    {
      id: 'limits-merchant',
      title: 'Limits, Balances & Merchant Payments',
      description: 'Daily transaction caps, wallet balance ceilings, Paybill, and Lipa Na M-PESA fees.',
      items: [
        {
          question: 'What is the maximum M-PESA daily transaction limit in 2026?',
          answer: `The Central Bank of Kenya (CBK) approved daily transaction limit is KSh ${ke.mpesaMaxDailyLimit.toLocaleString()} per day across all transactions.`,
          plainAnswer: `The daily transaction limit is KSh ${ke.mpesaMaxDailyLimit.toLocaleString()} per day.`,
        },
        {
          question: 'What is the maximum amount you can send or hold in a single transaction?',
          answer: `The maximum per-transaction limit is KSh ${ke.mpesaMaxPerTxn.toLocaleString()}, and the maximum wallet balance you can hold in your M-PESA account at any time is KSh ${ke.mpesaMaxBalance.toLocaleString()}.`,
          plainAnswer: `The single transaction cap is KSh ${ke.mpesaMaxPerTxn.toLocaleString()} and maximum wallet balance is KSh ${ke.mpesaMaxBalance.toLocaleString()}.`,
        },
        {
          question: 'Does paying via Lipa Na M-PESA (Buy Goods / Till Number) cost money?',
          answer: 'No. Paying for goods and services at an M-PESA Buy Goods till number is completely free for the customer (KSh 0 fee). The merchant pays the transaction processing fee.',
          plainAnswer: 'No. Buy Goods (Till) payments are free for the customer; the merchant pays the processing fee.',
        },
        {
          question: 'How do Paybill charges work?',
          answer: 'Paybill charges depend on whether the business owner has absorbed the fee or passed it to the customer. For customer-paid Paybills (e.g. utility bills or school fees), standard published business tariff bands apply.',
          plainAnswer: 'Paybill charges depend on the merchant setup; some businesses absorb the fee while others pass published tariff rates to the customer.',
        },
        {
          question: 'How much does it cost to transfer money from M-PESA to a bank account?',
          answer: 'M-PESA to bank transfers are processed via Paybill. Regulated bank Paybill charges are discounted compared to standard peer-to-peer sending tariffs under CBK guidelines.',
          plainAnswer: 'Bank transfers use regulated Paybill tariffs, which are discounted compared to peer-to-peer transfers.',
        },
      ],
    },
  ];

  return (
    <FaqHubPage
      countryName="Kenya"
      countryFlag="🇰🇪"
      title="Kenya M-PESA, Fuliza, and Mobile Money FAQs (2026)"
      description="Clear, verified answers to top questions about Safaricom M-PESA transfer fees, agent and ATM withdrawal charges, Fuliza daily interest rates, M-Shwari loans, and CBK transaction limits."
      breadcrumbs={[
        { name: 'Home', url: '/' },
        { name: 'Kenya', url: '/kenya/' },
        { name: 'Frequently Asked Questions', url: '/kenya/faq/' },
      ]}
      categories={categories}
      relatedTools={[
        {
          title: 'M-PESA Charges Calculator',
          href: '/kenya/mpesa-charges-calculator/',
          description: 'Calculate exact fees for sending to registered users, other networks, and agent cashouts.',
        },
        {
          title: 'M-PESA Withdrawal Charges',
          href: '/kenya/mpesa-withdrawal-charges/',
          description: 'Compare agent vs ATM withdrawal charges and see the total balance required to cash out.',
        },
        {
          title: 'Fuliza Charges Calculator',
          href: '/kenya/fuliza-charges-calculator/',
          description: 'Estimate access fees and accumulated daily maintenance charges for any overdraft duration.',
        },
        {
          title: 'M-Shwari Loan Calculator',
          href: '/kenya/m-shwari-loan-calculator/',
          description: 'See the 7.5% facilitation fee, 30-day repayment total, and rollover cost comparison.',
        },
      ]}
      relatedGuides={[
        {
          title: 'How to Reduce M-PESA Charges: 7 Practical Rules',
          href: '/kenya/guides/how-to-reduce-mpesa-charges/',
          description: 'Tips for grouping transactions, utilizing Buy Goods, and avoiding expensive withdrawal brackets.',
        },
        {
          title: 'Fuliza Explained: Daily Fees, 3-Day Grace Period & Limits',
          href: '/kenya/guides/fuliza-explained-cost-and-limits/',
          description: 'Deep dive into zero-rating rules, NCBA facility fees, and credit limit growth.',
        },
        {
          title: 'M-Shwari vs Fuliza: Which Loan Is Cheaper?',
          href: '/kenya/guides/m-shwari-vs-fuliza/',
          description: 'Breakdown of when fixed 7.5% fees beat compounding daily charges based on loan duration.',
        },
      ]}
      sources={[
        {
          title: 'Safaricom Official M-PESA Tariff Schedule (2025-2026)',
          url: 'https://www.safaricom.co.ke',
          authority: 'Safaricom PLC',
        },
        {
          title: 'Central Bank of Kenya (CBK) Mobile Money Transaction Limits',
          url: 'https://www.centralbank.go.ke',
          authority: 'Central Bank of Kenya',
        },
        {
          title: 'NCBA Bank M-Shwari Terms & Tariff Guide',
          url: 'https://ke.ncbagroup.com',
          authority: 'NCBA Bank Kenya',
        },
      ]}
      ratesCheckedDate="November 2026"
    />
  );
}
