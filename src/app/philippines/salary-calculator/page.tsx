'use client';

import React, { useState, useMemo } from 'react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { MoneyInput } from '@/components/MoneyInput';
import { Select } from '@/components/Select';
import { SegmentedControl } from '@/components/SegmentedControl';
import { ResultPanel, BreakdownRow, CalculationLegalSource } from '@/components/ResultPanel';
import { FaqAccordion } from '@/components/FaqAccordion';
import { RelatedTools } from '@/components/RelatedTools';
import { SeoArticle, WorkedExampleItem, OfficialSourceLink } from '@/components/SeoArticle';
import { StructuredData } from '@/components/StructuredData';
import { getRelatedPages } from '@/config/pages';
import { calculateSalary, reverseNetToGross, PayFrequency, EmploymentType } from '@/lib/ph/salary';
import { getPhRates } from '@/lib/seo/rules-content';
import { ArrowRightLeft } from 'lucide-react';

export default function PhilippineSalaryCalculator() {
  const phRates = getPhRates();
  const [mode, setMode] = useState<'gross_to_net' | 'net_to_gross'>('gross_to_net');
  const [basicSalary, setBasicSalary] = useState<number>(35000);
  const [desiredNet, setDesiredNet] = useState<number>(30000);
  const [payFrequency, setPayFrequency] = useState<PayFrequency>('monthly');
  const [employmentType, setEmploymentType] = useState<EmploymentType>('employed');
  const [viewTab, setViewTab] = useState<'employee' | 'employer'>('employee');
  const [taxableAllowances, setTaxableAllowances] = useState<number>(0);
  const [nonTaxableAllowances, setNonTaxableAllowances] = useState<number>(0);
  const [showAllowances, setShowAllowances] = useState<boolean>(false);

  // Compute forward result
  const forwardResult = useMemo(() => {
    return calculateSalary({
      monthlyBasic: basicSalary,
      taxableAllowances,
      nonTaxableAllowances,
      payFrequency,
      employmentType,
    });
  }, [basicSalary, taxableAllowances, nonTaxableAllowances, payFrequency, employmentType]);

  // Compute reverse gross if in net-to-gross mode
  const calculatedGross = useMemo(() => {
    if (mode === 'net_to_gross') {
      return reverseNetToGross(desiredNet, payFrequency);
    }
    return 0;
  }, [mode, desiredNet, payFrequency]);

  const activeSalaryResult = useMemo(() => {
    if (mode === 'net_to_gross') {
      return calculateSalary({
        monthlyBasic: calculatedGross,
        taxableAllowances: 0,
        nonTaxableAllowances: 0,
        payFrequency,
        employmentType,
      });
    }
    return forwardResult;
  }, [mode, calculatedGross, forwardResult, payFrequency, employmentType]);

  // Breakdown rows for ResultPanel
  const employeeRows: BreakdownRow[] = [
    { label: 'Monthly Basic Salary', value: `₱${activeSalaryResult.grossPay.toLocaleString('en-US', { minimumFractionDigits: 2 })}` },
    ...(taxableAllowances > 0 ? [{ label: 'Taxable Allowances', value: `₱${taxableAllowances.toLocaleString('en-US', { minimumFractionDigits: 2 })}` }] : []),
    ...(nonTaxableAllowances > 0 ? [{ label: 'Non-Taxable Allowances', value: `₱${nonTaxableAllowances.toLocaleString('en-US', { minimumFractionDigits: 2 })}` }] : []),
    {
      label: `SSS Contribution (EE ${phRates.sssEeRate}%)`,
      value: `-₱${activeSalaryResult.sss.eeTotal.toFixed(2)}`,
      sublabel: activeSalaryResult.sss.eeMpf > 0 ? `Regular: ₱${activeSalaryResult.sss.eeRegularSs.toFixed(2)} | WISP: ₱${activeSalaryResult.sss.eeMpf.toFixed(2)}` : 'Regular Social Security',
      isDeduction: true,
    },
    {
      label: `PhilHealth (EE ${phRates.philhealthEeRate}%)`,
      value: `-₱${activeSalaryResult.philhealth.employeeShare.toFixed(2)}`,
      sublabel: `MBS basis: ₱${activeSalaryResult.philhealth.mbs.toLocaleString()}`,
      isDeduction: true,
    },
    {
      label: 'Pag-IBIG Fund (EE)',
      value: `-₱${activeSalaryResult.pagibig.employeeShare.toFixed(2)}`,
      sublabel: `Capped at ₱${phRates.pagibigMaxEeContribution.toFixed(2)} max fund salary basis`,
      isDeduction: true,
    },
    {
      label: 'Total Statutory Deductions',
      value: `-₱${activeSalaryResult.totalEmployeeDeductions.toFixed(2)}`,
      highlight: true,
      isDeduction: true,
    },
    {
      label: 'Taxable Income',
      value: `₱${activeSalaryResult.taxableIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      sublabel: 'Gross basic minus statutory contributions',
    },
    {
      label: 'BIR Withholding Tax',
      value: activeSalaryResult.tax.withholdingTax === 0 ? '₱0.00 (Exempt)' : `-₱${activeSalaryResult.tax.withholdingTax.toFixed(2)}`,
      sublabel: `TRAIN Bracket ${activeSalaryResult.tax.bracketNumber} (${(activeSalaryResult.tax.marginalRate * 100).toFixed(0)}% marginal rate)`,
      isDeduction: activeSalaryResult.tax.withholdingTax > 0,
    },
    {
      label: payFrequency === 'semi-monthly' ? 'Semi-Monthly Net Pay (Per Cutoff)' : 'Monthly Net Take-Home Pay',
      value: `₱${activeSalaryResult.netPayPerPeriod.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      highlight: true,
    },
  ];

  const employerRows: BreakdownRow[] = [
    { label: 'Basic Gross Compensation', value: `₱${activeSalaryResult.grossPay.toLocaleString('en-US', { minimumFractionDigits: 2 })}` },
    {
      label: `SSS Employer Share (${phRates.sssErRate}%)`,
      value: `+₱${(activeSalaryResult.sss.erRegularSs + activeSalaryResult.sss.erMpf).toFixed(2)}`,
      sublabel: `Regular: ₱${activeSalaryResult.sss.erRegularSs.toFixed(2)} | WISP: ₱${activeSalaryResult.sss.erMpf.toFixed(2)}`,
    },
    {
      label: 'Employees Compensation (EC)',
      value: `+₱${activeSalaryResult.sss.erEc.toFixed(2)}`,
      sublabel: '100% employer-funded state insurance fund',
    },
    {
      label: `PhilHealth Employer Share (${phRates.philhealthErRate}%)`,
      value: `+₱${activeSalaryResult.philhealth.employerShare.toFixed(2)}`,
    },
    {
      label: 'Pag-IBIG Employer Share (2%)',
      value: `+₱${activeSalaryResult.pagibig.employerShare.toFixed(2)}`,
      sublabel: `Mandatory ₱${phRates.pagibigMaxErContribution.toFixed(2)} match`,
    },
    {
      label: 'Total Employer Monthly Cost',
      value: `₱${activeSalaryResult.employerTotalCost.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      highlight: true,
    },
  ];

  const legalSources: CalculationLegalSource[] = [
    {
      title: 'Social Security System (SSS)',
      documentNumber: 'Circular No. 2024-006 & RA 11199',
      summary: `${phRates.sssTotalRate}% total contribution rate. ₱${phRates.sssMaxTotalMsc.toLocaleString()} max MSC partitioned into ₱${phRates.sssRegularMscCap.toLocaleString()} regular SS and ₱${(phRates.sssMaxTotalMsc - phRates.sssRegularMscCap).toLocaleString()} Mandatory Provident Fund (WISP).`,
    },
    {
      title: 'Philippine Health Insurance Corporation',
      documentNumber: 'PhilHealth Advisory No. 2025-0002',
      summary: `${phRates.philhealthTotalRate.toFixed(1)}% premium rate with ₱${phRates.philhealthIncomeFloor.toLocaleString()} floor and ₱${phRates.philhealthIncomeCeiling.toLocaleString()} ceiling. Split 50% employee / 50% employer.`,
    },
    {
      title: 'Home Development Mutual Fund (Pag-IBIG)',
      documentNumber: 'Circular No. 460 & DBM CL 2024-2',
      summary: `Maximum monthly fund salary of ₱${phRates.pagibigMaxMfs.toLocaleString()}. Employee and employer share capped at ₱${phRates.pagibigMaxEeContribution.toFixed(2)} each.`,
    },
    {
      title: 'Bureau of Internal Revenue (BIR)',
      documentNumber: 'Revenue Regulations No. 11-2018 (TRAIN Law)',
      summary: `Taxable income up to ₱${phRates.taxExemptMonthly.toLocaleString()}/month (₱${phRates.taxExemptAnnual.toLocaleString()}/year) is 0% tax-exempt. Mandatory contributions subtracted before tax.`,
    },
  ];

  const copySummaryText = `Philippine Salary Calculation (${phRates.verifiedYear} Legal Rates):
Monthly Basic Salary: ₱${activeSalaryResult.grossPay.toLocaleString('en-US', { minimumFractionDigits: 2 })}
- SSS EE Share: ₱${activeSalaryResult.sss.eeTotal.toFixed(2)}
- PhilHealth EE: ₱${activeSalaryResult.philhealth.employeeShare.toFixed(2)}
- Pag-IBIG EE: ₱${activeSalaryResult.pagibig.employeeShare.toFixed(2)}
Total Statutory Deductions: ₱${activeSalaryResult.totalEmployeeDeductions.toFixed(2)}
- BIR Withholding Tax: ₱${activeSalaryResult.tax.withholdingTax.toFixed(2)}
Net Take-Home Pay (Monthly): ₱${activeSalaryResult.netPay.toLocaleString('en-US', { minimumFractionDigits: 2 })}
Semi-Monthly Cut-off: ₱${(activeSalaryResult.netPay / 2).toLocaleString('en-US', { minimumFractionDigits: 2 })}
Calculated on Pay (https://pay.zetawala.com/philippines/salary-calculator/)`;

  const related = getRelatedPages('ph-salary');

  const faqs = [
    {
      question: 'How is Philippine Net Take-Home Pay calculated in 2026?',
      answer:
        'Net Pay is calculated as: Gross Pay minus SSS Employee Share minus PhilHealth Employee Share minus Pag-IBIG Employee Share minus BIR Withholding Tax. SSS, PhilHealth, and Pag-IBIG contributions are non-taxable and are subtracted from gross earnings first to determine your Taxable Compensation Income.',
    },
    {
      question: 'What is the SSS WISP / Mandatory Provident Fund?',
      answer:
        'Under RA 11199, regular Social Security MSC is capped at ₱20,000. For compensation above ₱20,000 up to the ₱35,000 ceiling, the remaining MSC is automatically allocated to the Worker’s Investment and Savings Program (WISP), an individual retirement savings fund managed by SSS that earns tax-free dividends.',
    },
    {
      question: 'How do semi-monthly cut-offs work in Philippine payroll?',
      answer:
        'Most Philippine companies disburse salaries on the 15th and 30th (or 10th and 25th). While withholding tax is often computed per semi-monthly cutoff using the BIR semi-monthly table, mandatory government contributions (SSS, PhilHealth, Pag-IBIG) are calculated based on your total monthly compensation and are either deducted once a month or split 50/50 across both cutoffs.',
    },
    {
      question: 'Are domestic workers (Kasambahay) subject to statutory deductions?',
      answer:
        'Under RA 10361 (Batas Kasambahay) and SSS Circular 2024-007, for domestic workers receiving a monthly wage of less than ₱5,000, the household employer is legally obligated to pay 100% of the SSS, PhilHealth, and Pag-IBIG contributions without any deduction from the domestic worker’s wage.',
    },
    {
      question: 'What is the BIR tax-exempt threshold in 2026?',
      answer:
        'Under Republic Act 10963 (TRAIN Law), employees with annual taxable income not exceeding ₱250,000 (equivalent to ₱20,833.33 per month) are entirely exempt from personal income tax (0% withholding tax rate).',
    },
    {
      question: 'Are overtime and night differential pay taxable?',
      answer:
        'Yes. For regular employees, overtime pay, night shift differential, and holiday premiums form part of gross taxable compensation income and are subject to withholding tax after mandatory statutory contributions are deducted.',
    },
    {
      question: 'What is the maximum deduction for Pag-IBIG Fund?',
      answer:
        'Under Pag-IBIG Circular No. 460, the maximum fund salary basis is set at ₱10,000. The standard 2% employee contribution rate results in a maximum monthly employee deduction of exactly ₱200.00, matched by an employer contribution of ₱200.00.',
    },
    {
      question: 'How does PhilHealth calculate monthly premiums?',
      answer:
        'PhilHealth applies a 5.0% premium rate to your Monthly Basic Salary, bounded between a floor of ₱10,000 and a ceiling of ₱100,000. The resulting premium is split equally: 2.5% deducted from the employee and 2.5% paid by the employer.',
    },
  ];

  const workedExamples: WorkedExampleItem[] = [
    {
      title: 'Mid-Level Professional (₱35,000 Gross Salary)',
      scenario: 'A private sector regular employee receiving ₱35,000 monthly basic salary without allowances.',
      inputs: [
        { label: 'Monthly Basic Pay', value: '₱35,000.00' },
        { label: 'Employment Status', value: 'Private Regular Employee' },
      ],
      steps: [
        { label: 'SSS Employee Share (Max ₱35k MSC)', formula: '₱1,000 regular SS + ₱750 WISP', value: '-₱1,750.00', isDeduction: true },
        { label: 'PhilHealth Employee Share (2.5%)', formula: '₱35,000 × 2.5%', value: '-₱875.00', isDeduction: true },
        { label: 'Pag-IBIG Employee Share', formula: '2% of ₱10,000 capped MFS', value: '-₱200.00', isDeduction: true },
        { label: 'Total Statutory Deductions', formula: '₱1,750 + ₱875 + ₱200', value: '-₱2,825.00', highlight: true },
        { label: 'Taxable Compensation Income', formula: '₱35,000 - ₱2,825', value: '₱32,175.00' },
        { label: 'BIR TRAIN Withholding Tax', formula: '15% of excess over ₱20,833', value: '-₱1,701.25', isDeduction: true },
      ],
      resultLabel: 'Monthly Net Take-Home Pay',
      resultValue: '₱30,473.75',
      notes: 'Semi-monthly disbursement: ₱15,236.88 per cutoff.',
    },
    {
      title: 'Entry-Level Associate (₱18,000 Gross Salary)',
      scenario: 'An entry-level employee receiving ₱18,000 monthly basic pay, falling below the taxable threshold.',
      inputs: [
        { label: 'Monthly Basic Pay', value: '₱18,000.00' },
        { label: 'Employment Status', value: 'Private Regular Employee' },
      ],
      steps: [
        { label: 'SSS Employee Share (₱18k MSC)', formula: '₱18,000 × 5%', value: '-₱900.00', isDeduction: true },
        { label: 'PhilHealth Employee Share (2.5%)', formula: '₱18,000 × 2.5%', value: '-₱450.00', isDeduction: true },
        { label: 'Pag-IBIG Employee Share', formula: 'Capped standard match', value: '-₱200.00', isDeduction: true },
        { label: 'Total Statutory Deductions', formula: '₱900 + ₱450 + ₱200', value: '-₱1,550.00', highlight: true },
        { label: 'Taxable Compensation Income', formula: '₱18,000 - ₱1,550', value: '₱16,450.00' },
        { label: 'BIR Withholding Tax', formula: 'Income ≤ ₱20,833 (Bracket 1)', value: '₱0.00 (Exempt)', highlight: true },
      ],
      resultLabel: 'Monthly Net Take-Home Pay',
      resultValue: '₱16,450.00',
      notes: '100% tax-exempt under TRAIN Law.',
    },
  ];

  const officialSources: OfficialSourceLink[] = [
    {
      name: 'Social Security System (SSS)',
      documentTitle: 'Circular No. 2024-006 & RA 11199 Schedule',
      url: 'https://www.sss.gov.ph',
      verifiedDate: phRates.verifiedDate,
    },
    {
      name: 'Philippine Health Insurance Corporation (PhilHealth)',
      documentTitle: 'PhilHealth Advisory No. 2025-0002 (5.0% Rate)',
      url: 'https://www.philhealth.gov.ph',
      verifiedDate: phRates.verifiedDate,
    },
    {
      name: 'Pag-IBIG Fund (HDMF)',
      documentTitle: 'Circular No. 460 & DBM Circular Letter 2024-2',
      url: 'https://www.pagibigfund.gov.ph',
      verifiedDate: phRates.verifiedDate,
    },
    {
      name: 'Bureau of Internal Revenue (BIR)',
      documentTitle: 'Revenue Regulations No. 11-2018 (TRAIN Table Annex E)',
      url: 'https://www.bir.gov.ph',
      verifiedDate: phRates.verifiedDate,
    },
  ];

  const quickAnswerText = `In ${phRates.verifiedYear}, Philippine net take-home pay is computed as Gross Basic Salary minus mandatory statutory contributions (SSS ${phRates.sssEeRate}%, PhilHealth ${phRates.philhealthEeRate}%, Pag-IBIG ₱${phRates.pagibigMaxEeContribution.toFixed(2)} cap) and BIR TRAIN withholding tax. Mandatory contributions are fully non-taxable and deducted before calculating tax.`;

  const tocItems = [
    { id: 'net-pay-formula', label: 'Net Take-Home Pay Formula' },
    { id: 'statutory-deductions', label: 'Mandatory Government Deductions' },
    { id: 'train-tax-brackets', label: 'BIR Withholding Tax Brackets' },
    { id: 'semi-monthly-cutoffs', label: 'Semi-Monthly vs Monthly Payroll' },
    { id: 'kasambahay-rules', label: 'Domestic Worker (Kasambahay) Exemptions' },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <StructuredData
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Philippines', url: '/philippines/' },
          { name: 'Salary Calculator 2026', url: '/philippines/salary-calculator/' },
        ]}
        webApp={{
          name: 'Philippine Salary Calculator 2026',
          url: '/philippines/salary-calculator/',
          description: 'Calculate net take-home pay, SSS 15% rate, PhilHealth 5%, Pag-IBIG, and BIR TRAIN withholding taxes.',
          applicationCategory: 'FinanceApplication',
        }}
        faqs={faqs}
      />

      <Breadcrumbs
        items={[
          { label: 'Philippines', href: '/philippines/' },
          { label: 'Salary Calculator' },
        ]}
      />

      {/* Page Header */}
      <div className="border-b border-neutral-200 pb-6 pt-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
          Philippine Salary Calculator {phRates.verifiedYear}
        </h1>
        <p className="mt-2 text-sm sm:text-base text-neutral-600 max-w-3xl leading-relaxed">
          Calculate your exact net take-home pay, statutory deductions, and withholding tax under the TRAIN Law. Supports standard gross-to-net computation and reverse net-to-gross salary matching.
        </p>

        {/* Calculation Mode Switcher */}
        <div className="mt-6 inline-flex rounded-lg border border-neutral-200 bg-neutral-100 p-1">
          <button
            type="button"
            onClick={() => setMode('gross_to_net')}
            className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${
              mode === 'gross_to_net'
                ? 'bg-white text-neutral-900 shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Gross to Net (Standard)
          </button>
          <button
            type="button"
            onClick={() => setMode('net_to_gross')}
            className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all flex items-center gap-1.5 ${
              mode === 'net_to_gross'
                ? 'bg-white text-neutral-900 shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <ArrowRightLeft className="h-3.5 w-3.5" />
            <span>Net to Gross (Reverse)</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Inputs Left, Result Right (Above fold on mobile) */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Inputs Column */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-2xs space-y-6">
            <h2 className="text-base font-bold text-neutral-900 border-b border-neutral-100 pb-3">
              {mode === 'gross_to_net' ? 'Salary & Compensation Inputs' : 'Target Net Pay Input'}
            </h2>

            {mode === 'gross_to_net' ? (
              <MoneyInput
                label="Monthly Basic Salary"
                value={basicSalary}
                onChange={setBasicSalary}
                currencySymbol="₱"
                hint="Contractual basic pay before allowances, overtime, or statutory deductions."
                min={0}
                max={1000000}
                required
              />
            ) : (
              <div className="space-y-4">
                <MoneyInput
                  label="Desired Monthly Net Take-Home Pay"
                  value={desiredNet}
                  onChange={setDesiredNet}
                  currencySymbol="₱"
                  hint="The net cash amount you wish to receive in your bank account."
                  min={0}
                  max={800000}
                  required
                />
                <div className="rounded-lg bg-brand-soft/40 p-3.5 text-xs text-brand-strong border border-brand/20">
                  <strong>Reverse Match Result:</strong> To receive ₱{desiredNet.toLocaleString()} net, an employer must offer a Monthly Basic Salary of approximately <strong>₱{calculatedGross.toLocaleString('en-US', { minimumFractionDigits: 2 })}</strong>.
                </div>
              </div>
            )}

            {/* Pay Frequency */}
            <SegmentedControl<PayFrequency>
              label="Pay Frequency Display"
              value={payFrequency}
              onChange={setPayFrequency}
              options={[
                { label: 'Monthly Breakdown', value: 'monthly' },
                { label: 'Semi-Monthly (Per Cut-off)', value: 'semi-monthly' },
              ]}
            />

            {/* Employment Type */}
            <Select
              label="Employment Category"
              value={employmentType}
              onChange={(val) => setEmploymentType(val as EmploymentType)}
              options={[
                { label: 'Private Sector Employee (Regular)', value: 'employed' },
                { label: 'Domestic Worker (Kasambahay - RA 10361)', value: 'kasambahay' },
                { label: 'Self-Employed / Freelancer', value: 'self_employed' },
                { label: 'Voluntary Member', value: 'voluntary' },
                { label: 'Overseas Filipino Worker (OFW)', value: 'ofw' },
              ]}
              hint="Domestic workers earning under ₱5,000 have contributions 100% paid by the employer."
            />

            {/* Optional Allowances Toggle */}
            {mode === 'gross_to_net' && (
              <div className="pt-2 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setShowAllowances(!showAllowances)}
                  className="text-xs font-semibold text-brand-strong hover:underline flex items-center gap-1"
                >
                  {showAllowances ? '– Hide optional allowances' : '+ Add taxable & non-taxable allowances'}
                </button>

                {showAllowances && (
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <MoneyInput
                      label="Taxable Allowances"
                      value={taxableAllowances}
                      onChange={setTaxableAllowances}
                      currencySymbol="₱"
                      hint="Subject to withholding tax (performance incentives, sales commissions)."
                    />
                    <MoneyInput
                      label="Non-Taxable Allowances"
                      value={nonTaxableAllowances}
                      onChange={setNonTaxableAllowances}
                      currencySymbol="₱"
                      hint="De minimis benefits within BIR ceilings (rice subsidy, uniform allowance)."
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Sticky Result Column */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
          <div className="flex rounded-lg border border-neutral-200 bg-neutral-100 p-1">
            <button
              type="button"
              onClick={() => setViewTab('employee')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${
                viewTab === 'employee' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Employee Net Pay
            </button>
            <button
              type="button"
              onClick={() => setViewTab('employer')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${
                viewTab === 'employer' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Employer Total Cost
            </button>
          </div>

          <ResultPanel
            title={viewTab === 'employee' ? 'Net Take-Home Pay' : 'Total Employer Cost'}
            headlineLabel={
              viewTab === 'employee'
                ? payFrequency === 'semi-monthly'
                  ? 'Per Cut-off Take-Home Pay'
                  : 'Monthly Net Take-Home Pay'
                : 'Total Monthly Employer Cost'
            }
            headlineValue={
              viewTab === 'employee'
                ? `₱${activeSalaryResult.netPayPerPeriod.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                : `₱${activeSalaryResult.employerTotalCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
            }
            subHeadline={
              viewTab === 'employee'
                ? payFrequency === 'semi-monthly'
                  ? `Monthly equivalent: ₱${activeSalaryResult.netPay.toLocaleString('en-US', { minimumFractionDigits: 2 })}`
                  : `Semi-monthly cut-off: ₱${(activeSalaryResult.netPay / 2).toLocaleString('en-US', { minimumFractionDigits: 2 })}`
                : `Basic gross ₱${activeSalaryResult.grossPay.toLocaleString()} + mandatory employer contributions`
            }
            rows={viewTab === 'employee' ? employeeRows : employerRows}
            sources={legalSources}
            copySummaryText={copySummaryText}
            shareTitle="Philippine Salary Calculation 2026"
            calloutMessage={
              activeSalaryResult.tax.withholdingTax === 0
                ? {
                    type: 'success',
                    text: '₱0 Withholding Tax: Taxable income is within the ₱20,833/month TRAIN Law tax-exempt threshold.',
                  }
                : undefined
            }
          />
        </div>
      </div>

      {/* Long-Form In-Depth SEO Article */}
      <SeoArticle
        quickAnswer={quickAnswerText}
        toc={tocItems}
        workedExamples={workedExamples}
        sources={officialSources}
        verifiedDate={phRates.verifiedDate}
      >
        <h2 id="net-pay-formula">How Is Philippine Net Take-Home Pay Calculated?</h2>
        <p>
          Computing your net take-home pay in the Philippines involves a statutory sequence mandated by the National Internal Revenue Code (NIRC) and social legislation. Every month, private sector employers subtract three government-mandated contributions before computing your tax obligation.
        </p>
        <p>
          The legal calculation sequence follows this exact formula:
        </p>
        <div className="not-prose my-4 rounded-lg bg-neutral-900 p-4 font-mono text-sm text-brand-light">
          Net Pay = Gross Taxable Income - (SSS EE Share + PhilHealth EE Share + Pag-IBIG EE Share) - BIR Withholding Tax
        </div>
        <p>
          Under Republic Act No. 10963, also known as the Tax Reform for Acceleration and Inclusion (TRAIN) Law, employee contributions to the Social Security System (SSS), Philippine Health Insurance Corporation (PhilHealth), and Home Development Mutual Fund (Pag-IBIG) are strictly non-taxable exclusions. They must be deducted from your basic compensation first. The remainder is your <em>Taxable Compensation Income</em>, which serves as the tax base for BIR withholding tax tables.
        </p>

        <h2 id="statutory-deductions">Mandatory Government Deductions in 2026</h2>
        <p>
          In 2026, three primary statutory institutions collect monthly contributions from Philippine wage earners. Here is how each deduction operates under current law:
        </p>
        <h3>1. Social Security System (SSS)</h3>
        <p>
          Under Republic Act No. 11199 (Social Security Act of 2018) and SSS Circular No. 2024-006, the total contribution rate is {phRates.sssTotalRate}%. For private employees, this is divided between the employer ({phRates.sssErRate}%) and the employee ({phRates.sssEeRate}%). The Monthly Salary Credit (MSC) spans from a minimum of ₱{phRates.sssMinMsc.toLocaleString()} to a maximum of ₱{phRates.sssMaxTotalMsc.toLocaleString()}.
        </p>
        <p>
          Crucially, regular Social Security benefits cap at an MSC of ₱{phRates.sssRegularMscCap.toLocaleString()}. For salaries exceeding ₱{phRates.sssRegularMscCap.toLocaleString()} up to ₱{phRates.sssMaxTotalMsc.toLocaleString()}, the excess MSC is automatically deposited into the Worker’s Investment and Savings Program (WISP), a tax-exempt provident fund that accumulates personalized retirement savings.
        </p>

        <h3>2. PhilHealth Premium</h3>
        <p>
          Pursuant to the Universal Health Care Act (RA 11223) and PhilHealth Advisory No. 2025-0002, the premium rate is {phRates.philhealthTotalRate.toFixed(1)}% of basic monthly salary. The statutory income floor is ₱{phRates.philhealthIncomeFloor.toLocaleString()} (yielding a minimum monthly premium of ₱{phRates.philhealthMinPremium.toFixed(2)}) and the income ceiling is ₱{phRates.philhealthIncomeCeiling.toLocaleString()} (yielding a maximum monthly premium of ₱{phRates.philhealthMaxPremium.toFixed(2)}). The cost is split equally: {phRates.philhealthEeRate}% paid by the employee and {phRates.philhealthErRate}% paid by the employer.
        </p>

        <h3>3. Pag-IBIG Fund (HDMF)</h3>
        <p>
          Under HDMF Circular No. 460 and Department of Budget and Management Circular Letter 2024-2, the maximum Monthly Fund Salary (MFS) basis is ₱{phRates.pagibigMaxMfs.toLocaleString()}. At the standard 2% contribution rate, the maximum deduction for an employee is capped at ₱{phRates.pagibigMaxEeContribution.toFixed(2)} per month, with a mandatory matching employer share of ₱{phRates.pagibigMaxErContribution.toFixed(2)}.
        </p>

        <div className="not-prose my-6 overflow-x-auto rounded-xl border border-neutral-200">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-100 text-neutral-800 uppercase font-bold">
              <tr>
                <th className="p-3">Agency</th>
                <th className="p-3">Total Rate</th>
                <th className="p-3">Employee Share</th>
                <th className="p-3">Employer Share</th>
                <th className="p-3">Maximum Monthly Basis</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 text-neutral-700">
              <tr>
                <td className="p-3 font-semibold text-neutral-900">SSS</td>
                <td className="p-3">{phRates.sssTotalRate}%</td>
                <td className="p-3">{phRates.sssEeRate}% (Max ₱1,750)</td>
                <td className="p-3">{phRates.sssErRate}% + EC (₱10-₱30)</td>
                <td className="p-3">₱{phRates.sssMaxTotalMsc.toLocaleString()} MSC</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-neutral-900">PhilHealth</td>
                <td className="p-3">{phRates.philhealthTotalRate.toFixed(1)}%</td>
                <td className="p-3">{phRates.philhealthEeRate}% (Max ₱2,500)</td>
                <td className="p-3">{phRates.philhealthErRate}% (Max ₱2,500)</td>
                <td className="p-3">₱{phRates.philhealthIncomeCeiling.toLocaleString()} Ceiling</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-neutral-900">Pag-IBIG</td>
                <td className="p-3">4.0%</td>
                <td className="p-3">2.0% (Capped at ₱200)</td>
                <td className="p-3">2.0% (Capped at ₱200)</td>
                <td className="p-3">₱{phRates.pagibigMaxMfs.toLocaleString()} MFS</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 id="train-tax-brackets">BIR Withholding Tax Brackets (TRAIN Law)</h2>
        <p>
          Personal income tax in the Philippines is graduated. Effective under Revenue Regulations No. 11-2018, individual taxpayers earning ₱{phRates.taxExemptAnnual.toLocaleString()} or less annually (equivalent to ₱{phRates.taxExemptMonthly.toLocaleString()} per month in taxable income) owe ₱0.00 in income tax.
        </p>
        <p>
          For compensation above ₱{phRates.taxExemptMonthly.toLocaleString()}, the BIR applies marginal tax rates ranging from 15% to 35% on the excess over each bracket floor. Because statutory contributions reduce your taxable compensation, an employee with a gross salary of ₱22,000 often pays zero income tax because their net taxable pay falls below the ₱{phRates.taxExemptMonthly.toLocaleString()} boundary.
        </p>

        <h2 id="semi-monthly-cutoffs">Semi-Monthly vs Monthly Payroll Disbursals</h2>
        <p>
          Most companies in Metro Manila and throughout the Philippines disburse payroll semi-monthly, typically on the 15th and 30th or the 10th and 25th of each month. Companies handle statutory deductions in one of two standard ways:
        </p>
        <ul>
          <li><strong>Split Cut-off Method:</strong> SSS is deducted on the first cut-off, while PhilHealth and Pag-IBIG are deducted on the second cut-off.</li>
          <li><strong>Proportional 50/50 Method:</strong> Total statutory contributions are split evenly, deducting 50% on the first cut-off and 50% on the second cut-off.</li>
        </ul>
        <p>
          Withholding taxes are calculated per cut-off using the BIR semi-monthly withholding tax table, ensuring your cumulative tax withholdings stay aligned with annual tax liabilities during year-end tax annualization.
        </p>

        <h2 id="kasambahay-rules">Domestic Worker (Kasambahay) Exemptions</h2>
        <p>
          Under Republic Act No. 10361 (Batas Kasambahay) and SSS Circular No. 2024-007, special statutory protections apply to household workers. If a Kasambahay receives a monthly cash wage of less than ₱5,000, the household employer is required by law to pay 100% of the SSS, PhilHealth, and Pag-IBIG contributions. No deduction whatsoever may be made from the domestic worker’s take-home pay. For wages of ₱5,000 and above, the standard employee-employer cost sharing applies.
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
