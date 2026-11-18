'use client';

import React, { useState, useMemo } from 'react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { MoneyInput } from '@/components/MoneyInput';
import { Select } from '@/components/Select';
import { SegmentedControl } from '@/components/SegmentedControl';
import { ResultPanel, BreakdownRow, CalculationLegalSource } from '@/components/ResultPanel';
import { FaqAccordion } from '@/components/FaqAccordion';
import { RelatedTools } from '@/components/RelatedTools';
import { getRelatedPages } from '@/config/pages';
import { calculateSalary, reverseNetToGross, PayFrequency, EmploymentType } from '@/lib/ph/salary';
import { ShieldCheck, ArrowRightLeft } from 'lucide-react';

export default function PhilippineSalaryCalculator() {
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
      label: 'SSS Contribution (EE)',
      value: `-₱${activeSalaryResult.sss.eeTotal.toFixed(2)}`,
      sublabel: activeSalaryResult.sss.eeMpf > 0 ? `Regular: ₱${activeSalaryResult.sss.eeRegularSs.toFixed(2)} | WISP: ₱${activeSalaryResult.sss.eeMpf.toFixed(2)}` : 'Regular Social Security',
      isDeduction: true,
    },
    {
      label: 'PhilHealth (EE 2.5%)',
      value: `-₱${activeSalaryResult.philhealth.employeeShare.toFixed(2)}`,
      sublabel: `MBS basis: ₱${activeSalaryResult.philhealth.mbs.toLocaleString()}`,
      isDeduction: true,
    },
    {
      label: 'Pag-IBIG Fund (EE)',
      value: `-₱${activeSalaryResult.pagibig.employeeShare.toFixed(2)}`,
      sublabel: 'Capped at ₱200 max fund salary basis',
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
      label: 'SSS Employer Share (10%)',
      value: `+₱${(activeSalaryResult.sss.erRegularSs + activeSalaryResult.sss.erMpf).toFixed(2)}`,
      sublabel: `Regular: ₱${activeSalaryResult.sss.erRegularSs.toFixed(2)} | WISP: ₱${activeSalaryResult.sss.erMpf.toFixed(2)}`,
    },
    {
      label: 'Employees Compensation (EC)',
      value: `+₱${activeSalaryResult.sss.erEc.toFixed(2)}`,
      sublabel: '100% employer-funded state insurance fund',
    },
    {
      label: 'PhilHealth Employer Share (2.5%)',
      value: `+₱${activeSalaryResult.philhealth.employerShare.toFixed(2)}`,
    },
    {
      label: 'Pag-IBIG Employer Share (2%)',
      value: `+₱${activeSalaryResult.pagibig.employerShare.toFixed(2)}`,
      sublabel: 'Mandatory ₱200 match',
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
      summary: '15% contribution rate effective Jan 2025. ₱35,000 max MSC partitioned into ₱20,000 regular SS and ₱15,000 Mandatory Provident Fund (WISP).',
    },
    {
      title: 'Philippine Health Insurance Corporation',
      documentNumber: 'PhilHealth Advisory No. 2025-0002',
      summary: '5.0% premium rate with ₱10,000 income floor and ₱100,000 income ceiling. Split 50% employee / 50% employer.',
    },
    {
      title: 'Home Development Mutual Fund (Pag-IBIG)',
      documentNumber: 'Circular No. 460 & DBM CL 2024-2',
      summary: 'Maximum monthly fund salary (MFS) of ₱10,000. Employee and employer share capped at ₱200.00 each.',
    },
    {
      title: 'Bureau of Internal Revenue (BIR)',
      documentNumber: 'Revenue Regulations No. 11-2018 (TRAIN Law)',
      summary: 'Taxable income up to ₱20,833.33/month (₱250,000/year) is 0% tax-exempt. Mandatory contributions are subtracted before tax.',
    },
  ];

  const copySummaryText = `Philippine Salary Calculation (2026 Legal Rates):
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
        'Net Pay is calculated as: <code>Gross Pay - (SSS Employee Share + PhilHealth Employee Share + Pag-IBIG Employee Share + BIR Withholding Tax)</code>. SSS, PhilHealth, and Pag-IBIG contributions are non-taxable and are subtracted from gross earnings first to determine your Taxable Compensation Income.',
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
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <Breadcrumbs
        items={[
          { label: 'Philippines', href: '/philippines/' },
          { label: 'Salary Calculator' },
        ]}
      />

      {/* Page Header */}
      <div className="border-b border-neutral-200 pb-6 pt-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft px-3 py-1 text-xs font-semibold text-brand-strong mb-2">
          <ShieldCheck className="h-3.5 w-3.5 text-brand" />
          <span>Official 2026 Rates (15% SSS, 5% PhilHealth, ₱200 Pag-IBIG)</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
          Philippine Salary Calculator 2026
        </h1>
        <p className="mt-2 text-sm sm:text-base text-neutral-600 max-w-3xl leading-relaxed">
          Calculate your exact net take-home pay, statutory deductions, and withholding tax under the TRAIN Law. Supports both standard forward calculation and reverse net-to-gross salary matching.
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

      {/* Main Grid: Inputs Left, Result Right */}
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
                hint="Your contractual basic pay before allowances, overtime, or statutory deductions."
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
                  hint="The net cash amount you want to receive in your bank account."
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
              onChange={val => setEmploymentType(val as EmploymentType)}
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
                      hint="Subject to withholding tax (e.g. performance incentives, sales commissions)."
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
          {/* View Tab: Employee Net Pay vs Employer Total Cost */}
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

      {/* Related Calculators */}
      <RelatedTools tools={related} />

      {/* FAQs */}
      <FaqAccordion faqs={faqs} />
    </div>
  );
}
