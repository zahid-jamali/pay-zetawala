import React from 'react';
import { FaqHubPage, FaqCategorySection } from '@/components/FaqHubPage';

export default function GlobalFaqPage() {
  const categories: FaqCategorySection[] = [
    {
      id: 'platform-privacy',
      title: 'Platform Architecture & Privacy',
      description: 'How Pay works, client-side execution, and our zero-data retention model.',
      items: [
        {
          question: 'What is Pay and how does it work?',
          answer: 'Pay is a free, ad-light financial and academic calculation platform providing verified calculators for salary deductions, mobile money fees, and university grading across the Philippines, Kenya, Uganda, and Nigeria. All tools are built as static single-page calculators where calculations occur instantly in your browser.',
          plainAnswer: 'Pay is a free calculation platform providing verified salary, mobile money, and university grade calculators for the Philippines, Kenya, Uganda, and Nigeria.',
        },
        {
          question: 'Does Pay store or transmit my personal numbers or salary?',
          answer: 'Never. Pay operates on a strictly client-side computational architecture. Every formula executes within your browser\'s local JavaScript engine. Your salary figures, transaction amounts, grades, and loan details never leave your device, are never transmitted to external servers, and are never saved to analytics databases.',
          plainAnswer: 'No. All calculations run strictly inside your browser. No financial, academic, or personal data is transmitted or stored on any server.',
        },
        {
          question: 'Do you use cookies or track users across the web?',
          answer: 'No. Pay uses zero tracking cookies, zero third-party advertising trackers, and zero behavioral profiling scripts. Privacy is fundamental to our product.',
          plainAnswer: 'Pay uses zero tracking cookies and zero behavioral profiling scripts.',
        },
      ],
    },
    {
      id: 'data-accuracy',
      title: 'Statutory Verification & Accuracy',
      description: 'How rates are sourced, tested, and updated across national regulators.',
      items: [
        {
          question: 'How are statutory rates and fee tables verified?',
          answer: 'Every rate, contribution table, tax bracket, and fee schedule is sourced directly from primary government circulars, statutory gazettes, and official corporate notices (such as SSS, PhilHealth, Pag-IBIG, BIR, Safaricom, MTN Uganda, Airtel Uganda, NUC, and NBTE). We never rely on secondary blog posts or unverified aggregators.',
          plainAnswer: 'All numbers are verified against official government circulars, gazettes, and published corporate tariffs.',
        },
        {
          question: 'How frequently are rates updated?',
          answer: 'Our statutory research desk monitors regulatory gazettes and corporate tariff announcements continuously. When a regulatory agency or telecom operator issues a circular updating rates or brackets, our system updates the underlying rules files and synchronizes all calculators simultaneously.',
          plainAnswer: 'We monitor regulatory gazettes continuously and update rule files immediately upon official policy changes.',
        },
        {
          question: 'Are Pay calculations officially accepted by employers or banks?',
          answer: 'Pay provides informational planning estimates based on current published statutory rules. While our formulas mirror official regulatory schedules with high precision, enterprise payroll reconciliation, loan approvals, and official tax returns must be certified through designated statutory portals (e.g. SSS My.SSS, BIR eFPS, Safaricom statements).',
          plainAnswer: 'Pay calculations mirror official statutes for planning, but formal payroll filings and bank transactions must follow designated official portals.',
        },
      ],
    },
    {
      id: 'usage-support',
      title: 'Usage, Offline Access & Corrections',
      description: 'Free access terms, reporting discrepancies, and device compatibility.',
      items: [
        {
          question: 'Is Pay completely free to use?',
          answer: 'Yes. All calculators, rate tables, and educational guides on Pay are 100% free with no paywalls, mandatory registrations, or subscription fees.',
          plainAnswer: 'Yes. All calculators and guides are 100% free with no registration or fees required.',
        },
        {
          question: 'Can I use Pay calculators offline on mobile?',
          answer: 'Yes. Once a calculator page loads on your device, all computation scripts are cached locally. You can enter amounts, switch toggles, and view breakdowns even when mobile data or Wi-Fi is temporarily disconnected.',
          plainAnswer: 'Yes. Because calculations are executed client-side, loaded pages function even without an active internet connection.',
        },
        {
          question: 'How do I report an error or suggest a new tool?',
          answer: 'If you identify a new circular, a tariff update, or a formula discrepancy, please contact our research team at contact@zetawala.com or through our Contact page. Include the circular number or official URL and our team will verify and update the rule tables promptly.',
          plainAnswer: 'Submit rate updates or feedback with the official circular reference to contact@zetawala.com.',
        },
        {
          question: 'Who operates and maintains Pay?',
          answer: 'Pay is an independent digital utility developed and maintained by the Zetawala network, dedicated to building fast, transparent, and privacy-respecting financial and academic web utilities.',
          plainAnswer: 'Pay is developed and maintained by the Zetawala network.',
        },
      ],
    },
  ];

  return (
    <FaqHubPage
      countryName="Global"
      countryFlag="🌐"
      title="Frequently Asked Questions | Pay"
      description="Learn how Pay verifies statutory deduction rates, our client-side zero-data privacy architecture, offline calculation support, and how to submit rate updates."
      breadcrumbs={[
        { name: 'Home', url: '/' },
        { name: 'Frequently Asked Questions', url: '/faq/' },
      ]}
      categories={categories}
      relatedTools={[
        {
          title: 'Philippine Salary Calculator',
          href: '/philippines/salary-calculator/',
          description: 'Official SSS 15%, PhilHealth 5%, Pag-IBIG ₱200 cap, and BIR TRAIN tax deductions.',
        },
        {
          title: 'Kenya M-PESA Charges Calculator',
          href: '/kenya/mpesa-charges-calculator/',
          description: 'Sending fees, agent cashout tariffs, and Fuliza overdraft fees with 15% excise duty.',
        },
        {
          title: 'Uganda MoMo Comparison',
          href: '/uganda/mobile-money-charges-comparison/',
          description: 'Side-by-side comparison of MTN and Airtel Uganda rates and the 0.5% URA withdrawal tax.',
        },
        {
          title: 'Nigeria University CGPA Calculator',
          href: '/nigeria/cgpa-calculator/',
          description: 'Standard NUC 5.0 degree classification calculator with multi-semester auto-save.',
        },
      ]}
      relatedGuides={[
        {
          title: 'Calculation Methodology & Official Sources',
          href: '/methodology/',
          description: 'Review our verification protocols, test vector methodology, and primary source gazettes.',
        },
        {
          title: 'About Pay: Mission & Editorial Principles',
          href: '/about/',
          description: 'Why we built an ad-light, client-side calculator network with zero tracking.',
        },
        {
          title: 'Zero Data Retention Privacy Policy',
          href: '/privacy/',
          description: 'Full details on our client-side computational architecture and local storage usage.',
        },
      ]}
      sources={[
        {
          title: 'Republic of the Philippines Official Gazette',
          url: 'https://www.officialgazette.gov.ph',
          authority: 'Government of the Philippines',
        },
        {
          title: 'Central Bank of Kenya (CBK) Directives',
          url: 'https://www.centralbank.go.ke',
          authority: 'Central Bank of Kenya',
        },
        {
          title: 'Bank of Uganda National Payment Systems Directives',
          url: 'https://www.bou.or.ug',
          authority: 'Bank of Uganda',
        },
        {
          title: 'National Universities Commission (NUC) Academic Standards',
          url: 'https://www.nuc.edu.ng',
          authority: 'Federal Ministry of Education Nigeria',
        },
      ]}
      ratesCheckedDate="November 2026"
    />
  );
}
