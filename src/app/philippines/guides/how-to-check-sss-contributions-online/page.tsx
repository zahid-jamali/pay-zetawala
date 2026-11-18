import React from 'react';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SeoArticle, WorkedExampleItem, OfficialSourceLink } from '@/components/SeoArticle';
import { StructuredData } from '@/components/StructuredData';
import { getPhRates } from '@/lib/seo/rules-content';
import { Smartphone, Laptop, Calculator, CreditCard, ShieldAlert } from 'lucide-react';

export default function GuideHowToCheckSssContributionsOnline() {
  const phRates = getPhRates();

  const faqs = [
    {
      question: 'How do I register an account on the My.SSS member portal?',
      answer:
        'Visit member.sss.gov.ph and click "Register as a Member". Select your registration information preference (such as your UMID card number, registered mobile number, or savings account registered in the Disbursement Account Enrollment Module), fill out your details, and activate your account through the verification link sent to your registered email.',
    },
    {
      question: 'How long does it take for employer SSS contributions to reflect online?',
      answer:
        'Employers are required to remit SSS contributions by the last day of the month following the applicable payroll period. Once processed through the Electronic Contribution Collection System (e-CCS), contributions typically reflect on your My.SSS online ledger within 3 to 5 business days after the bank payment clears.',
    },
    {
      question: 'What should I do if my employer deducts SSS from my salary but it is not posted online?',
      answer:
        'First, present your payslips showing the SSS deductions to your company HR or payroll team to check if there is an unposted collection list or delayed payment reconciliation. If the employer refuses or repeatedly fails to remit within 30 days, you can lodge a formal Non-Remittance Complaint at any SSS branch or through the DOLE SEnA portal.',
    },
    {
      question: 'What is an SSS Payment Reference Number (PRN)?',
      answer:
        'A Payment Reference Number (PRN) is a system-generated code that links your payment directly to your individual SSS account. Voluntary, self-employed, and OFW members must generate a PRN on My.SSS or the SSS Mobile App before making contributions via Bayad centers, GCash, Maya, or bank channels.',
    },
    {
      question: 'Can I check my SSS salary loan balance and pension eligibility through the app?',
      answer:
        'Yes. The SSS Mobile App and My.SSS member portal show your total posted contributions, total Credited Years of Service (CYS), outstanding salary or calamity loan balances, and available loanable amounts.',
    },
  ];

  const workedExamples: WorkedExampleItem[] = [
    {
      title: 'Salary Loan Qualification Audit: 38 Posted Months with 8 Recent',
      scenario:
        'An office administrator wants to apply for a 1-month SSS salary loan. They log into My.SSS to check if they meet both the 36-month lifetime threshold and the 6-month recent payment requirement.',
      inputs: [
        { label: 'Total Lifetime Posted Months', value: '38 contributions' },
        { label: 'Contributions in Last 12 Months', value: '8 contributions' },
        { label: 'Average Last 12 MSC', value: '₱20,000.00' },
      ],
      steps: [
        { label: 'Lifetime Criteria (≥ 36 months)', formula: '38 >= 36 required', value: 'Qualified (Passed)' },
        { label: 'Recent Payment Criteria (≥ 6 of 12)', formula: '8 >= 6 required', value: 'Qualified (Passed)' },
        { label: 'Loan Type Authorized', formula: '1-month salary credit advance', value: '1-Month Loan', highlight: true },
        { label: 'Gross Loan Amount Available', formula: 'Average of last 12 MSCs', value: '₱20,000.00' },
      ],
      resultLabel: 'Available SSS Salary Loan',
      resultValue: '₱20,000.00',
      notes: 'Eligible for instant online loan application on My.SSS.',
    },
    {
      title: 'Generating a Voluntary Member PRN for ₱25,000 MSC',
      scenario:
        'A freelance graphic designer wants to pay voluntary SSS contributions for the current quarter under the 15% statutory rate.',
      inputs: [
        { label: 'Membership Status', value: 'Voluntary / Freelance' },
        { label: 'Chosen Monthly Salary Credit', value: '₱25,000.00' },
        { label: 'Statutory SSS Rate', value: '15.0% total' },
      ],
      steps: [
        { label: 'Regular SSS (15% of ₱20k MSC)', formula: '₱20,000 × 15%', value: '₱3,000.00' },
        { label: 'WISP Fund (15% of ₱5k MSC)', formula: '₱5,000 × 15%', value: '₱750.00' },
        { label: 'Combined Monthly Contribution', formula: '₱3,000 + ₱750', value: '₱3,750.00', highlight: true },
        { label: 'Quarterly Payment (3 Months)', formula: '₱3,750 × 3', value: '₱11,250.00' },
      ],
      resultLabel: 'Amount on Generated PRN',
      resultValue: '₱11,250.00',
      notes: 'Payable via GCash, Maya, or partner payment centers with valid PRN.',
    },
  ];

  const officialSources: OfficialSourceLink[] = [
    {
      name: 'Social Security System (SSS)',
      documentTitle: 'My.SSS Member Portal User Guide & Mobile App Manual',
      url: 'https://member.sss.gov.ph',
      verifiedDate: phRates.verifiedDate,
    },
    {
      name: 'Social Security System (SSS)',
      documentTitle: 'Circular No. 2024-006: Mandatory PRN for Contribution Collections',
      url: 'https://www.sss.gov.ph',
      verifiedDate: phRates.verifiedDate,
    },
  ];

  const toc = [
    { id: 'my-sss-portal', label: 'Step 1: Accessing the My.SSS Web Portal' },
    { id: 'mobile-app-guide', label: 'Step 2: Using the Official SSS Mobile App' },
    { id: 'reading-your-ledger', label: 'Step 3: Reading Your Actual Contribution Ledger' },
    { id: 'generating-prn', label: 'Step 4: Generating a PRN for Voluntary Payments' },
    { id: 'handling-missing-payments', label: 'Step 5: What to Do If Contributions Are Missing' },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <StructuredData
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Philippines', url: '/philippines/' },
          { name: 'Guides', url: '/philippines/' },
          { name: 'How to Check SSS Contributions Online', url: '/philippines/guides/how-to-check-sss-contributions-online/' },
        ]}
        article={{
          headline: 'How to Check SSS Contributions Online: Portal, App & PRN (2026)',
          description: 'Step-by-step instructions to check your posted monthly SSS contributions, use the SSS Mobile App, generate a PRN, and resolve missing remittances.',
          url: 'https://pay.zetawala.com/philippines/guides/how-to-check-sss-contributions-online/',
          datePublished: '2026-02-05T08:00:00+08:00',
          dateModified: '2026-11-18T00:00:00+08:00',
        }}
        faqs={faqs}
      />

      <Breadcrumbs
        items={[
          { label: 'Philippines', href: '/philippines/' },
          { label: 'Guides', href: '/philippines/' },
          { label: 'Check SSS Online' },
        ]}
      />

      <header className="border-b border-neutral-200 pb-6 pt-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft px-3 py-1 text-xs font-semibold text-brand-strong mb-2">
          <Smartphone className="h-3.5 w-3.5 text-brand" />
          <span>Member Services Walkthrough</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
          How to Check SSS Contributions Online
        </h1>
        <p className="mt-2 text-sm sm:text-base text-neutral-600 leading-relaxed">
          Step-by-step walkthrough to verify your posted monthly contributions, register on the My.SSS member portal, use the mobile app, and generate a Payment Reference Number (PRN).
        </p>
      </header>

      {/* Tool Shortcut */}
      <div className="mt-6 rounded-xl border border-brand/30 bg-brand-soft/20 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-bold text-neutral-900">Verify what your monthly deduction should be</h2>
          <p className="text-xs text-neutral-600">Cross-check your payslip deduction with the official 15% SSS bracket table.</p>
        </div>
        <Link
          href="/philippines/sss-contribution-calculator/"
          className="inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-brand-strong transition-colors shrink-0"
        >
          <Calculator className="h-4 w-4" />
          <span>SSS Contribution Calculator</span>
        </Link>
      </div>

      <SeoArticle
        quickAnswer="To check your SSS contributions online, log into the My.SSS portal at member.sss.gov.ph or download the official SSS Mobile App on Google Play or the iOS App Store. Navigate to 'Inquiry' > 'Contributions' to view your complete month-by-month payment history, total Credited Years of Service (CYS), and WISP savings balance."
        toc={toc}
        workedExamples={workedExamples}
        sources={officialSources}
        verifiedDate={phRates.verifiedDate}
      >
        <section id="my-sss-portal" className="space-y-4">
          <h2>Step 1: Accessing the My.SSS Web Portal</h2>
          <p>
            The official My.SSS web portal (<a href="https://member.sss.gov.ph" target="_blank" rel="noopener noreferrer" className="text-brand font-semibold hover:underline">member.sss.gov.ph</a>) is the primary self-service platform for Social Security System members.
          </p>
          <p>
            To access your records online:
          </p>
          <ol>
            <li>Go to <code>member.sss.gov.ph</code> using a secure desktop or mobile browser.</li>
            <li>Click <strong>Member</strong> on the portal homepage.</li>
            <li>If you are already registered, enter your <strong>User ID</strong> and <strong>Password</strong>, solve the captcha challenge, and click <strong>Submit</strong>.</li>
            <li>If you have not registered yet, click <strong>Register as a Member</strong>. You will be prompted to authenticate your identity using your Unified Multi-Purpose ID (UMID) card, mobile number registered with SSS, previous SSS payment receipt, or your bank account registered under the Disbursement Account Enrollment Module (DAEM).</li>
            <li>Follow the email activation link sent to your inbox to set your permanent login password.</li>
          </ol>
        </section>

        <section id="mobile-app-guide" className="space-y-4">
          <h2>Step 2: Using the Official SSS Mobile App</h2>
          <p>
            For quick access on smartphones, the SSS operates the official <strong>SSS Mobile App</strong>, available on the Google Play Store, Apple App Store, and Huawei AppGallery.
          </p>
          <p>
            The mobile app allows you to log in with your biometric credentials (fingerprint or Face ID) after initial setup. On the app home screen, tap <strong>Total Contributions</strong> to immediately view a summary card showing your lifetime contribution count, total amount paid, and last posted payment date.
          </p>
        </section>

        <section id="reading-your-ledger" className="space-y-4">
          <h2>Step 3: Reading Your Actual Contribution Ledger</h2>
          <p>
            Once inside the My.SSS portal, hover over the top navigation menu, select <strong>Inquiry</strong>, and click <strong>Contributions</strong>. Your screen displays the official SSS Contribution History Ledger.
          </p>
          <p>
            The ledger is organized into three key columns:
          </p>
          <ul>
            <li><strong>Applicable Month:</strong> The calendar month and year to which the contribution corresponds.</li>
            <li><strong>Monthly Salary Credit (MSC):</strong> The earnings bracket assigned for that month (e.g., ₱20,000 for regular salary plus any additional tier for WISP). This MSC determines your future pension and loan entitlements.</li>
            <li><strong>Date Posted:</strong> The exact date when the payment was remitted by your employer and credited to your permanent SSS masterfile.</li>
          </ul>
        </section>

        <section id="generating-prn" className="space-y-4">
          <h2>Step 4: Generating a PRN for Voluntary Payments</h2>
          <p>
            If you are an individual voluntary contributor, self-employed freelancer, non-working spouse, or Overseas Filipino Worker (OFW), payment centers and digital wallets will reject your payment without an active <strong>Payment Reference Number (PRN)</strong>.
          </p>
          <p>
            To generate your PRN:
          </p>
          <ol>
            <li>In the My.SSS portal, click <strong>Payment Reference Number (PRN)</strong> &gt; <strong>Generate PRN</strong>.</li>
            <li>Select your membership type (e.g., Voluntary, Self-Employed, OFW).</li>
            <li>Choose the applicable payment period (monthly or quarterly).</li>
            <li>Select your desired <strong>Monthly Salary Credit (MSC)</strong> from the dropdown menu. The system automatically computes your exact 15% contribution.</li>
            <li>Click <strong>Submit</strong>. A 14-digit alphanumeric PRN with a bar code and statement of account is generated.</li>
          </ol>
          <p>
            You can pay the PRN immediately through integrated online channels like GCash, Maya, ShopeePay, credit/debit card, or in person at Bayad Centers and partner commercial banks.
          </p>
        </section>

        <section id="handling-missing-payments" className="space-y-4">
          <h2>Step 5: What to Do If Contributions Are Missing</h2>
          <p>
            One of the most important reasons to audit your SSS records every quarter is to verify that your employer is faithfully remitting the deductions taken from your salary.
          </p>
          <p>
            If you notice months where your payslips indicate an SSS deduction but your online ledger displays a blank or unposted record:
          </p>
          <ul>
            <li><strong>Contact HR or Payroll First:</strong> Request the official SSS Special Bank Receipt (SBR) or validated Electronic Collection List (e-CL) for the missing months. Often, delayed postings stem from minor name discrepancies or unprocessed collection lists at the bank.</li>
            <li><strong>File an SSS Branch Inquiry:</strong> Visit the Member Services section of any SSS branch with your original payslips and employment contract. The SSS accounts officer will issue an employer verification notice.</li>
            <li><strong>Lodge a Legal Complaint:</strong> Under Republic Act No. 11199, failure or refusal by an employer to remit SSS contributions within 30 days is a criminal offense punishable by mandatory imprisonment of 6 to 12 years and heavy financial penalties. You can initiate a Single Entry Approach (SEnA) conference with DOLE to compel immediate remittance.</li>
          </ul>
        </section>
      </SeoArticle>
    </div>
  );
}
