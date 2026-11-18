import React from 'react';
import { FaqHubPage, FaqCategorySection } from '@/components/FaqHubPage';
import { getUgRates } from '@/lib/seo/rules-content';

export default function UgandaFaqPage() {
  const ug = getUgRates();

  const categories: FaqCategorySection[] = [
    {
      id: 'mtn-momo',
      title: 'MTN Uganda Mobile Money (MoMo) Charges',
      description: 'Sending rates, agent cash withdrawal fees, and balance requirements for MTN MoMo.',
      items: [
        {
          question: 'How much does it cost to send money to another MTN MoMo user?',
          answer: 'Sending money to a registered MTN MoMo user is banded by amount. Sending UGX 5,000 costs UGX 100, UGX 50,000 costs UGX 500, and UGX 1,000,000 costs UGX 1,000.',
          plainAnswer: 'Sending to an MTN user ranges from UGX 100 for small transfers up to UGX 2,000 for transfers over UGX 2,000,000.',
        },
        {
          question: 'What is the fee for withdrawing money from an MTN MoMo agent?',
          answer: `Agent withdrawal fees are based on the transaction amount plus the mandatory ${ug.withdrawalTaxRatePercent}% government tax. For example, withdrawing UGX 50,000 costs UGX 1,450 (network fee) plus UGX 250 (0.5% URA tax), totaling UGX 1,700.`,
          plainAnswer: `Agent withdrawals incur both the MTN operator tariff and the statutory ${ug.withdrawalTaxRatePercent}% URA tax.`,
        },
        {
          question: 'What is the maximum amount you can send on MTN MoMo in a single transaction?',
          answer: `The maximum single transaction limit on MTN MoMo is UGX ${ug.momoMaxSingleTxn.toLocaleString()} under Bank of Uganda regulatory guidelines.`,
          plainAnswer: `The maximum single transaction limit is UGX ${ug.momoMaxSingleTxn.toLocaleString()}.`,
        },
        {
          question: 'How do you check your MTN MoMo balance and tariff?',
          answer: 'You can check your current balance and view fee tables by dialing *165# on your MTN line or through the MTN MoMo mobile application.',
          plainAnswer: 'Dial *165# or check the MTN MoMo App.',
        },
        {
          question: 'Are deposits into an MTN MoMo wallet free?',
          answer: 'Yes. Depositing cash into your own MTN Mobile Money account at an authorized agent is free of charge.',
          plainAnswer: 'Yes. Cash deposits into your own MTN wallet are completely free.',
        },
      ],
    },
    {
      id: 'airtel-money',
      title: 'Airtel Money Uganda Charges',
      description: 'Tariffs for sending, withdrawing, and merchant payments on Airtel Money.',
      items: [
        {
          question: 'How much does it cost to send money to an Airtel Money user in Uganda?',
          answer: 'Sending between registered Airtel Money users is competitively priced. Sending UGX 10,000 costs UGX 100, UGX 100,000 costs UGX 800, and UGX 1,000,000 costs UGX 1,000.',
          plainAnswer: 'Transfers to Airtel users range from UGX 100 for small amounts up to UGX 2,000 for large amounts.',
        },
        {
          question: 'Is Airtel Money cheaper than MTN MoMo for withdrawals?',
          answer: 'Airtel Money and MTN MoMo maintain very similar withdrawal tariffs across most tiers, and both must collect the exact same 0.5% statutory URA withdrawal tax. In certain mid-tier brackets (UGX 30,000-60,000), Airtel\'s network fee is slightly lower.',
          plainAnswer: 'Both networks have similar tariffs and the exact same 0.5% tax, but Airtel has slightly cheaper network fees on select mid-tier bands.',
        },
        {
          question: 'What USSD code is used for Airtel Money transactions?',
          answer: 'Airtel Money in Uganda is accessed by dialing *185# from an active Airtel SIM card, or via the My Airtel mobile app.',
          plainAnswer: 'Dial *185# or use the My Airtel app.',
        },
        {
          question: 'What is the maximum account balance allowed on Airtel Money?',
          answer: `Under Bank of Uganda regulations, Tier 3 fully KYC-verified accounts can hold a maximum balance of UGX ${ug.momoMaxBalance.toLocaleString()}.`,
          plainAnswer: `Fully KYC-verified accounts can hold up to UGX ${ug.momoMaxBalance.toLocaleString()}.`,
        },
      ],
    },
    {
      id: 'ura-tax',
      title: '0.5% URA Mobile Money Withdrawal Tax',
      description: 'Legal basis, calculation method, exemptions, and sending vs withdrawal tax rules.',
      items: [
        {
          question: 'What is the 0.5% mobile money tax in Uganda?',
          answer: `Under the Excise Duty (Amendment) Act, the Government of Uganda imposes an excise duty of ${ug.withdrawalTaxRatePercent}% exclusively on cash withdrawals from mobile money wallets.`,
          plainAnswer: `The Excise Duty Act mandates a ${ug.withdrawalTaxRatePercent}% excise tax on all cash withdrawals from mobile money wallets.`,
        },
        {
          question: 'Does the 0.5% tax apply when sending money or paying for goods?',
          answer: 'No. The 0.5% mobile money tax applies strictly to cash withdrawals (cashing out at an agent). Sending money person-to-person, paying school fees, utility bills, or paying merchants via MoMoPay / Airtel Pay is exempt from this tax.',
          plainAnswer: 'No. The tax applies only to cash withdrawals. Sending money and paying merchants are exempt.',
        },
        {
          question: 'How is the 0.5% withdrawal tax calculated?',
          answer: 'The tax is computed as 0.005 × Principal Withdrawal Amount. For example, withdrawing UGX 100,000 incurs UGX 500 tax; withdrawing UGX 1,000,000 incurs UGX 5,000 tax. This is added on top of the operator’s agent withdrawal fee.',
          plainAnswer: 'Tax = 0.5% × Withdrawal Amount. For example, UGX 100,000 carries a UGX 500 tax.',
        },
        {
          question: 'Why was the original 1% tax reduced to 0.5%?',
          answer: 'The Parliament of Uganda initially passed a 1% tax on all mobile money transactions (including deposits and transfers) in 2018. Following widespread public backlash and economic impact on financial inclusion, it was reduced to 0.5% and restricted strictly to cash withdrawals.',
          plainAnswer: 'Parliament reduced the rate from 1% to 0.5% and limited it strictly to withdrawals to protect digital commerce and financial inclusion.',
        },
      ],
    },
    {
      id: 'cross-network',
      title: 'Cross-Network Transfers (MTN to Airtel & Vice Versa)',
      description: 'Interoperability, fees for sending across networks, and instant switching.',
      items: [
        {
          question: 'Can you send money directly from MTN MoMo to an Airtel Money number?',
          answer: 'Yes. Direct mobile money interoperability is supported in Uganda. You can send funds from an MTN line to an Airtel line using the *165# menu or MoMo App by selecting "Send to Other Networks".',
          plainAnswer: 'Yes. Direct inter-network transfer is supported via *165# or the MoMo App.',
        },
        {
          question: 'Is it more expensive to send money across networks?',
          answer: 'Yes. Cross-network transfers carry higher fees than on-network transfers due to inter-operator switching and settlement clearing fees. For example, sending UGX 50,000 across networks costs more than sending within the same network.',
          plainAnswer: 'Yes. Cross-network transfers cost slightly more than sending within the same telecom network.',
        },
        {
          question: 'Does the recipient of a cross-network transfer pay to receive money?',
          answer: 'No. The recipient does not pay any fee to receive the funds into their wallet. However, if they subsequently withdraw the cash at an agent, standard agent withdrawal fees and the 0.5% URA tax apply.',
          plainAnswer: 'No. Receiving funds is always free; fees and taxes only apply if the recipient cashes out at an agent.',
        },
      ],
    },
    {
      id: 'limits-security',
      title: 'Transaction Limits & Account Security',
      description: 'Tier requirements, daily caps, scam prevention, and wallet limits.',
      items: [
        {
          question: 'What are the mobile money account tiers in Uganda?',
          answer: 'The Bank of Uganda categorizes mobile money accounts into Tier 1 (basic, lower daily caps), Tier 2 (National ID verified, moderate limits), and Tier 3 (fully verified with proof of income/residence, holding up to UGX 20,000,000).',
          plainAnswer: 'Accounts are tiered from Tier 1 (basic) to Tier 3 (fully verified holding up to UGX 20,000,000).',
        },
        {
          question: 'What is the daily transaction limit for mobile money in Uganda?',
          answer: `The standard daily transaction limit for fully verified individual accounts is UGX ${ug.momoMaxDailyLimit.toLocaleString()}.`,
          plainAnswer: `The daily limit is UGX ${ug.momoMaxDailyLimit.toLocaleString()} for verified individual accounts.`,
        },
        {
          question: 'What should you do if you send money to the wrong number?',
          answer: 'Immediately contact customer care: dial 100 on MTN or Airtel. If the wrong recipient has not yet withdrawn the funds, customer service can initiate an account freeze and reversal protocol in accordance with UCC guidelines.',
          plainAnswer: 'Immediately dial customer care on 100 to freeze the transaction before the wrong recipient cashes out.',
        },
        {
          question: 'Is paying merchants via MoMoPay or Airtel Pay free for customers?',
          answer: 'Yes. Paying merchants for groceries, fuel, shopping, and restaurant meals using MoMoPay or Airtel Pay merchant codes is completely free of charge (UGX 0 fee and 0% tax).',
          plainAnswer: 'Yes. Merchant payments via MoMoPay and Airtel Pay are 100% free for customers.',
        },
      ],
    },
  ];

  return (
    <FaqHubPage
      countryName="Uganda"
      countryFlag="🇺🇬"
      title="Uganda Mobile Money & 0.5% Tax FAQs (2026)"
      description="Official answers to top questions about MTN Mobile Money tariffs, Airtel Money charges, the statutory 0.5% URA withdrawal tax, cross-network transfer fees, and Bank of Uganda transaction limits."
      breadcrumbs={[
        { name: 'Home', url: '/' },
        { name: 'Uganda', url: '/uganda/' },
        { name: 'Frequently Asked Questions', url: '/uganda/faq/' },
      ]}
      categories={categories}
      relatedTools={[
        {
          title: 'MTN vs Airtel MoMo Comparison',
          href: '/uganda/mobile-money-charges-comparison/',
          description: 'Compare side-by-side sending and withdrawal charges between MTN and Airtel Uganda.',
        },
        {
          title: 'MTN Mobile Money Charges Calculator',
          href: '/uganda/mtn-mobile-money-charges/',
          description: 'Calculate exact fees for on-network sending, off-network transfers, and agent cashouts.',
        },
        {
          title: 'Airtel Money Charges Calculator',
          href: '/uganda/airtel-money-charges/',
          description: 'See the full tariff breakdown and 0.5% URA excise duty for any Airtel Money amount.',
        },
      ]}
      relatedGuides={[
        {
          title: 'Mobile Money Withdrawal Tax Explained: The 0.5% Law',
          href: '/uganda/guides/mobile-money-withdrawal-tax-explained/',
          description: 'Full statutory breakdown of the Excise Duty Act, exempt transactions, and tax calculation.',
        },
        {
          title: 'MTN vs Airtel Money: Which Is Cheaper in 2026?',
          href: '/uganda/guides/mtn-vs-airtel-money-which-is-cheaper/',
          description: 'Band-by-band tariff comparison across small transfers, mid-tier transactions, and agent cashouts.',
        },
      ]}
      sources={[
        {
          title: 'Uganda Revenue Authority (URA) Excise Duty Guidelines',
          url: 'https://www.ura.go.ug',
          authority: 'Uganda Revenue Authority',
        },
        {
          title: 'Bank of Uganda National Payment Systems Regulations',
          url: 'https://www.bou.or.ug',
          authority: 'Bank of Uganda',
        },
        {
          title: 'MTN Uganda MoMo Tariff Directory',
          url: 'https://www.mtn.co.ug',
          authority: 'MTN Uganda',
        },
        {
          title: 'Airtel Uganda Mobile Money Tariff Schedule',
          url: 'https://www.airtel.co.ug',
          authority: 'Airtel Uganda',
        },
      ]}
      ratesCheckedDate="November 2026"
    />
  );
}
