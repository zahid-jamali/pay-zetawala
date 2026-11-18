import React from 'react';
import { FaqHubPage, FaqCategorySection } from '@/components/FaqHubPage';
import { getPhRates } from '@/lib/seo/rules-content';

export default function PhilippinesFaqPage() {
  const ph = getPhRates();

  const categories: FaqCategorySection[] = [
    {
      id: 'sss-contributions',
      title: 'SSS Contributions & Mandatory WISP',
      description: 'Rules governing the 15% contribution rate, Monthly Salary Credit (MSC), and the Mandatory Provident Fund.',
      items: [
        {
          question: 'What is the official SSS contribution rate for 2026?',
          answer: `The official SSS contribution rate is ${ph.sssTotalRatePercent}% of your Monthly Salary Credit (MSC). For formally employed workers, this is split between the employer (${ph.sssErRatePercent}%) and the employee (${ph.sssEeRatePercent}%).`,
          plainAnswer: `The official SSS contribution rate is ${ph.sssTotalRatePercent}% of your Monthly Salary Credit (MSC). For formally employed workers, this is split between the employer (${ph.sssErRatePercent}%) and the employee (${ph.sssEeRatePercent}%).`,
        },
        {
          question: 'What are the minimum and maximum SSS salary credits (MSC)?',
          answer: `The minimum Monthly Salary Credit is ₱${ph.sssMinMsc.toLocaleString()}, corresponding to a total contribution of ₱${(ph.sssMinMsc * ph.sssTotalRate).toLocaleString()}. The maximum total MSC is ₱${ph.sssMaxTotalMsc.toLocaleString()}, capped across regular SSS and WISP.`,
          plainAnswer: `The minimum Monthly Salary Credit is ₱${ph.sssMinMsc.toLocaleString()} and the maximum total MSC is ₱${ph.sssMaxTotalMsc.toLocaleString()}.`,
        },
        {
          question: 'What is the Mandatory Provident Fund (WISP)?',
          answer: `The Workers' Investment and Savings Program (WISP) is a compulsory tax-free retirement fund managed by SSS. Any monthly salary credit in excess of ₱${ph.sssRegularMscCap.toLocaleString()} up to ₱${ph.sssMaxTotalMsc.toLocaleString()} automatically flows into WISP to boost your eventual retirement payout.`,
          plainAnswer: `The Workers' Investment and Savings Program (WISP) is a compulsory tax-free retirement fund managed by SSS. Any monthly salary credit in excess of ₱${ph.sssRegularMscCap.toLocaleString()} up to ₱${ph.sssMaxTotalMsc.toLocaleString()} automatically flows into WISP.`,
        },
        {
          question: 'What is the maximum regular SSS contribution an employee can pay?',
          answer: `For regular SSS, the maximum salary credit cap is ₱${ph.sssRegularMscCap.toLocaleString()}. At the ${ph.sssEeRatePercent}% employee share, the regular SSS deduction maxes out at ₱${(ph.sssRegularMscCap * ph.sssEeRate).toLocaleString()}. If earning ₱${ph.sssMaxTotalMsc.toLocaleString()} or more, the employee also contributes ₱${((ph.sssMaxTotalMsc - ph.sssRegularMscCap) * ph.sssEeRate).toLocaleString()} to WISP, totaling ₱${(ph.sssMaxTotalMsc * ph.sssEeRate).toLocaleString()}.`,
          plainAnswer: `At the ${ph.sssEeRatePercent}% employee share, the regular SSS deduction maxes out at ₱${(ph.sssRegularMscCap * ph.sssEeRate).toLocaleString()} plus up to ₱${((ph.sssMaxTotalMsc - ph.sssRegularMscCap) * ph.sssEeRate).toLocaleString()} in WISP.`,
        },
        {
          question: 'Who pays the Employees\' Compensation (EC) contribution?',
          answer: 'The Employees\' Compensation (EC) contribution is paid 100% by the employer (₱10 for MSC under ₱15,000; ₱30 for MSC of ₱15,000 and above). It is never deducted from the employee\'s take-home pay.',
          plainAnswer: 'The Employees\' Compensation (EC) contribution is paid 100% by the employer (₱10 to ₱30) and is never deducted from employee pay.',
        },
        {
          question: 'How do self-employed and voluntary members pay SSS?',
          answer: `Self-employed and voluntary members pay the full ${ph.sssTotalRatePercent}% contribution themselves, based on their declared monthly income bracket. They also have an optional WISP Plus facility for voluntary top-ups.`,
          plainAnswer: `Self-employed and voluntary members pay the full ${ph.sssTotalRatePercent}% contribution themselves based on their declared monthly earnings.`,
        },
      ],
    },
    {
      id: 'sss-loans-pension',
      title: 'SSS Loans & Retirement Pension',
      description: 'Eligibility requirements, calculation formulas, and amortization rules for SSS benefits.',
      items: [
        {
          question: 'How many monthly contributions are needed to qualify for an SSS salary loan?',
          answer: 'To qualify for a one-month salary loan, you must have posted at least 36 monthly contributions, with at least 6 posted within the last 12 months. For a two-month salary loan, you need at least 72 posted contributions with 6 in the last 12 months.',
          plainAnswer: '36 posted contributions (with 6 in the last 12 months) for a one-month loan; 72 contributions for a two-month loan.',
        },
        {
          question: 'What is the interest rate on an SSS salary loan?',
          answer: 'The SSS salary loan charges a statutory interest rate of 10% per annum computed on a diminishing balance over a 24-month (2-year) amortization period. There is also a 1% advance service fee deducted upon disbursement.',
          plainAnswer: '10% per annum on a diminishing balance over 24 months, with a 1% service fee deducted at disbursement.',
        },
        {
          question: 'How is the SSS monthly retirement pension calculated?',
          answer: 'SSS computes three statutory formulas and awards the highest: (1) ₱300 + 20% of Average Monthly Salary Credit (AMSC) + 2% of AMSC for each Credited Year of Service (CYS) above 10; (2) 40% of AMSC; or (3) statutory minimums (₱1,200 for 10-19 CYS, ₱2,400 for 20+ CYS). In addition, all pensioners receive a mandatory ₱1,000 across-the-board benefit plus an annual 13th-month pension.',
          plainAnswer: 'SSS calculates three statutory formulas and awards the highest of the three, plus a permanent ₱1,000 across-the-board benefit and an annual 13th-month pension.',
        },
        {
          question: 'At what age can you retire and claim an SSS pension?',
          answer: 'Optional retirement begins at age 60 if you are separated from employment or ceased self-employment, with at least 120 monthly contributions. Mandatory retirement is at age 65 regardless of employment status.',
          plainAnswer: 'Age 60 (optional, if separated from employment) or age 65 (mandatory), requiring at least 120 posted monthly contributions.',
        },
        {
          question: 'What happens if you reach age 60 or 65 with fewer than 120 SSS contributions?',
          answer: 'Members who reach retirement age without the required 120 monthly contributions are not eligible for a monthly lifetime pension. Instead, SSS provides a lump-sum retirement refund equal to the total contributions paid by the member and employer, plus legal interest.',
          plainAnswer: 'You receive a lump-sum refund of all paid contributions plus interest rather than a monthly lifetime pension.',
        },
      ],
    },
    {
      id: 'philhealth',
      title: 'PhilHealth Contributions',
      description: 'Premium rates, salary floor, salary ceiling, and equal cost-sharing rules.',
      items: [
        {
          question: 'What is the current PhilHealth contribution rate in 2026?',
          answer: `The PhilHealth premium rate is ${ph.philhealthTotalRatePercent}% of the employee's basic monthly salary. This is split exactly 50/50 between the employer (${ph.philhealthErRatePercent}%) and the employee (${ph.philhealthEeRatePercent}%).`,
          plainAnswer: `The PhilHealth premium rate is ${ph.philhealthTotalRatePercent}%, split equally between employer (${ph.philhealthErRatePercent}%) and employee (${ph.philhealthEeRatePercent}%).`,
        },
        {
          question: 'What are the PhilHealth monthly salary floor and ceiling?',
          answer: `The income floor is ₱${ph.philhealthFloor.toLocaleString()} per month (minimum premium ₱${ph.philhealthMinPremium.toLocaleString()}), and the income ceiling is ₱${ph.philhealthCeiling.toLocaleString()} per month (maximum premium ₱${ph.philhealthMaxPremium.toLocaleString()}).`,
          plainAnswer: `The monthly income floor is ₱${ph.philhealthFloor.toLocaleString()} (₱${ph.philhealthMinPremium.toLocaleString()} premium) and the ceiling is ₱${ph.philhealthCeiling.toLocaleString()} (₱${ph.philhealthMaxPremium.toLocaleString()} premium).`,
        },
        {
          question: 'What is the maximum PhilHealth deduction from an employee\'s paycheck?',
          answer: `Because the maximum premium at the ₱${ph.philhealthCeiling.toLocaleString()} ceiling is ₱${ph.philhealthMaxPremium.toLocaleString()}, an employee's 50% share can never exceed ₱${(ph.philhealthMaxPremium / 2).toLocaleString()} per month (or ₱${(ph.philhealthMaxPremium / 4).toLocaleString()} per semi-monthly cutoff).`,
          plainAnswer: `The employee's share is capped at ₱${(ph.philhealthMaxPremium / 2).toLocaleString()} per month (₱${(ph.philhealthMaxPremium / 4).toLocaleString()} semi-monthly).`,
        },
        {
          question: 'Does overtime, holiday pay, or commission increase PhilHealth deductions?',
          answer: 'No. PhilHealth contributions are computed strictly on your basic monthly salary. Overtime, night differentials, hazard pay, and sales commissions are excluded from the PhilHealth calculation base.',
          plainAnswer: 'No. PhilHealth contributions are based solely on fixed basic monthly salary, excluding overtime and variable allowances.',
        },
        {
          question: 'How do Overseas Filipino Workers (OFWs) pay PhilHealth?',
          answer: `Under Universal Health Care guidelines, direct-contributor OFWs pay the ${ph.philhealthTotalRatePercent}% premium based on their declared monthly income, subject to the statutory floor and ceiling, paid annually or semi-annually prior to overseas deployment.`,
          plainAnswer: `OFWs pay ${ph.philhealthTotalRatePercent}% of their monthly income, within the statutory ₱${ph.philhealthFloor.toLocaleString()} to ₱${ph.philhealthCeiling.toLocaleString()} salary band.`,
        },
      ],
    },
    {
      id: 'pagibig',
      title: 'Pag-IBIG Fund (HDMF) Savings',
      description: 'Mandatory savings rates, maximum salary cap, and MP2 voluntary savings.',
      items: [
        {
          question: 'What is the maximum mandatory Pag-IBIG contribution for employees?',
          answer: `Under Circular No. 460, the maximum Monthly Fund Salary (MFS) is ₱${ph.pagibigMaxMfs.toLocaleString()}. At the statutory ${ph.pagibigEeRatePercent}% rate, the maximum employee deduction is exactly ₱${ph.pagibigMaxEeContribution.toLocaleString()} per month. The employer matches with ₱${ph.pagibigMaxErContribution.toLocaleString()}, creating a total monthly savings of ₱${(ph.pagibigMaxEeContribution + ph.pagibigMaxErContribution).toLocaleString()}.`,
          plainAnswer: `The maximum employee deduction is ₱${ph.pagibigMaxEeContribution.toLocaleString()} per month, matched by ₱${ph.pagibigMaxErContribution.toLocaleString()} from the employer.`,
        },
        {
          question: 'Can an employee contribute more than ₱200 per month to regular Pag-IBIG?',
          answer: 'Yes. While ₱200 is the statutory ceiling for mandatory matching, employees can submit a request to their employer HR to increase their personal regular savings (Pag-IBIG Regular Savings) above ₱200, or invest in the voluntary Modified Pag-IBIG 2 (MP2) program.',
          plainAnswer: 'Yes. Employees can voluntarily increase their regular Pag-IBIG savings or open a high-yield MP2 account.',
        },
        {
          question: 'Is Pag-IBIG MP2 mandatory or voluntary?',
          answer: 'Pag-IBIG MP2 is 100% voluntary. It is a 5-year government-backed savings facility with tax-free dividends that historically exceed regular bank savings and inflation rates.',
          plainAnswer: 'MP2 is 100% voluntary, offering tax-free dividend yields with a 5-year lock-in period.',
        },
        {
          question: 'Are Pag-IBIG contributions deductible before income tax?',
          answer: `Yes. Mandatory statutory Pag-IBIG contributions (up to ₱${ph.pagibigMaxEeContribution.toLocaleString()}/month) are excluded from gross income when calculating BIR withholding tax.`,
          plainAnswer: `Yes. Statutory employee contributions up to ₱${ph.pagibigMaxEeContribution.toLocaleString()} per month are fully tax-exempt.`,
        },
      ],
    },
    {
      id: 'tax',
      title: 'BIR Withholding Tax & TRAIN Law',
      description: 'Tax brackets, taxable income formula, and semi-monthly withholding rules.',
      items: [
        {
          question: 'At what monthly income do you start paying Philippine income tax?',
          answer: 'Under the BIR TRAIN Law (Republic Act 10963), individuals with taxable monthly income of ₱20,833 or less (₱250,000 annually) are subject to 0% withholding tax.',
          plainAnswer: 'Employees with taxable monthly income of ₱20,833 or less (₱250,000 annually) pay 0% income tax.',
        },
        {
          question: 'How is taxable income calculated for payroll tax withholding?',
          answer: 'Taxable Income = Gross Salary − Non-taxable Allowances (de minimis) − Statutory Deductions (Employee SSS + PhilHealth + Pag-IBIG). The BIR graduated tax rate is applied only to this net balance.',
          plainAnswer: 'Taxable income equals gross pay minus de minimis allowances and employee statutory contributions (SSS, PhilHealth, Pag-IBIG).',
        },
        {
          question: 'How do the 2026 BIR tax brackets work?',
          answer: 'Taxable monthly income is taxed in brackets: ₱0-₱20,833 at 0%; over ₱20,833 to ₱33,333 at 15% of excess; over ₱33,333 to ₱66,667 at ₱1,875 + 20%; over ₱66,667 to ₱166,667 at ₱8,541.80 + 25%; over ₱166,667 to ₱666,667 at ₱33,541.80 + 30%; and over ₱666,667 at ₱183,541.80 + 35%.',
          plainAnswer: 'Monthly taxable pay is taxed progressively from 0% (up to ₱20,833) to 35% (over ₱666,667) under the revised TRAIN Law rates.',
        },
        {
          question: 'Are statutory contributions (SSS, PhilHealth, Pag-IBIG) subject to tax?',
          answer: 'No. Mandatory employee shares of SSS, PhilHealth, and Pag-IBIG are statutory deductions that are deducted before applying withholding tax tables. They are 100% tax-free.',
          plainAnswer: 'No. SSS, PhilHealth, and Pag-IBIG employee contributions are deducted before tax is computed.',
        },
      ],
    },
    {
      id: 'thirteenth-month',
      title: '13th Month Pay & Kasambahay Regulations',
      description: 'Mandatory deadlines, computation formula, resignations, and domestic worker rules.',
      items: [
        {
          question: 'When must 13th month pay be paid in the Philippines?',
          answer: 'Under Presidential Decree No. 851 and DOLE guidelines, employers must disburse the 13th month pay on or before December 24 of every calendar year.',
          plainAnswer: 'On or before December 24 of every year, as mandated by Presidential Decree No. 851.',
        },
        {
          question: 'How is 13th month pay computed?',
          answer: '13th Month Pay = Total Basic Salary Earned During the Calendar Year ÷ 12. Overtime pay, night differentials, commissions, and unused leave monetizations are excluded from the basic salary base unless stipulated in employment contracts or CBAs.',
          plainAnswer: 'Total basic salary earned during the calendar year divided by 12.',
        },
        {
          question: 'Is 13th month pay taxable?',
          answer: `13th month pay and other productivity incentives are tax-exempt up to the statutory ceiling of ₱${ph.taxExempt13thCeiling.toLocaleString()}. Any portion of bonuses exceeding ₱${ph.taxExempt13thCeiling.toLocaleString()} is added to gross taxable income in the December payroll reconciliation.`,
          plainAnswer: `13th month pay is tax-exempt up to ₱${ph.taxExempt13thCeiling.toLocaleString()}. Any excess is subject to withholding tax.`,
        },
        {
          question: 'Are resigned or terminated employees entitled to 13th month pay?',
          answer: 'Yes. An employee who resigns or whose contract ends at any time during the year is entitled to pro-rated 13th month pay in proportion to the months worked, included in their final clearance pay.',
          plainAnswer: 'Yes. Resigned employees receive pro-rated 13th month pay calculated from January 1 up to their last day.',
        },
        {
          question: 'What are the rules for domestic workers (Kasambahay)?',
          answer: 'Under the Kasambahay Law (Republic Act 10361), if the domestic worker earns less than ₱5,000 per month, the employer must pay 100% of both the employer and employee shares for SSS, PhilHealth, and Pag-IBIG. If the worker earns ₱5,000 or more, standard proportional employee deductions apply.',
          plainAnswer: 'Employers must pay 100% of SSS, PhilHealth, and Pag-IBIG contributions if the domestic worker earns under ₱5,000/month.',
        },
      ],
    },
  ];

  return (
    <FaqHubPage
      countryName="Philippines"
      countryFlag="🇵🇭"
      title="Philippines Payroll, SSS, and Tax FAQs (2026)"
      description="Official answers to top questions about Philippine take-home pay, SSS 15% contributions, PhilHealth 5% premium sharing, Pag-IBIG ₱200 cap, BIR withholding tax brackets, and 13th-month pay rules."
      breadcrumbs={[
        { name: 'Home', url: '/' },
        { name: 'Philippines', url: '/philippines/' },
        { name: 'Frequently Asked Questions', url: '/philippines/faq/' },
      ]}
      categories={categories}
      relatedTools={[
        {
          title: 'Philippine Salary Calculator',
          href: '/philippines/salary-calculator/',
          description: 'Calculate net take-home pay with automated SSS, PhilHealth, Pag-IBIG, and BIR tax deductions.',
        },
        {
          title: '13th Month Pay Calculator',
          href: '/philippines/13th-month-pay-calculator/',
          description: 'Compute full or pro-rated 13th month pay and check your ₱90,000 tax-exempt ceiling.',
        },
        {
          title: 'SSS Contribution Calculator',
          href: '/philippines/sss-contribution-calculator/',
          description: 'See the exact breakdown between regular SSS, Mandatory WISP, and employer EC contributions.',
        },
        {
          title: 'SSS Retirement Pension Calculator',
          href: '/philippines/sss-pension-calculator/',
          description: 'Estimate your monthly pension under statutory formulas, CYS credited years, and the ₱1,000 benefit.',
        },
      ]}
      relatedGuides={[
        {
          title: 'SSS Contribution Changes & Bracket Schedule',
          href: '/philippines/guides/sss-contribution-changes/',
          description: 'Full analysis of the 15% rate, WISP mandatory thresholds, and employer vs employee cost splits.',
        },
        {
          title: 'Is 13th Month Pay Taxable? Rules & Exemptions',
          href: '/philippines/guides/is-13th-month-pay-taxable/',
          description: 'How the ₱90,000 bonus cap works under BIR regulations and when taxes are withheld.',
        },
        {
          title: 'PhilHealth Contribution Explained',
          href: '/philippines/guides/philhealth-contribution-explained/',
          description: 'How the 5% premium rate, ₱10,000 floor, and ₱100,000 ceiling apply to your monthly salary.',
        },
      ]}
      sources={[
        {
          title: 'SSS Circular No. 2024-006 (2025-2026 Schedule)',
          url: 'https://www.sss.gov.ph',
          authority: 'Social Security System Philippines',
        },
        {
          title: 'PhilHealth Advisory 2024-0013 (Universal Health Care)',
          url: 'https://www.philhealth.gov.ph',
          authority: 'Philippine Health Insurance Corporation',
        },
        {
          title: 'Pag-IBIG Circular No. 460 (Max MFS ₱10,000)',
          url: 'https://www.pagibigfund.gov.ph',
          authority: 'Home Development Mutual Fund',
        },
        {
          title: 'Republic Act 10963 (TRAIN Law Withholding Tables)',
          url: 'https://www.bir.gov.ph',
          authority: 'Bureau of Internal Revenue',
        },
      ]}
      ratesCheckedDate="November 2026"
    />
  );
}
