'use client';

import React, { useState } from 'react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SegmentedControl } from '@/components/SegmentedControl';
import { BracketTable, ColumnDef } from '@/components/BracketTable';
import { FaqAccordion } from '@/components/FaqAccordion';
import { RelatedTools } from '@/components/RelatedTools';
import { getRelatedPages } from '@/config/pages';
import {
  BIR_MONTHLY_TAX_BRACKETS,
  BIR_SEMI_MONTHLY_TAX_BRACKETS,
  BirTaxBracket,
} from '@/rules/ph/2026';
import { ShieldCheck, Calculator } from 'lucide-react';

export default function WithholdingTaxTablePage() {
  const [tableFrequency, setTableFrequency] = useState<'monthly' | 'semi-monthly'>('monthly');
  const [exampleIncome, setExampleIncome] = useState<number>(46800);

  const activeBrackets = tableFrequency === 'monthly' ? BIR_MONTHLY_TAX_BRACKETS : BIR_SEMI_MONTHLY_TAX_BRACKETS;

  const columns: ColumnDef<BirTaxBracket>[] = [
    {
      header: 'Bracket',
      accessor: b => `Bracket ${b.bracket}`,
      className: 'font-bold text-neutral-900',
    },
    {
      header: tableFrequency === 'monthly' ? 'Monthly Taxable Compensation' : 'Semi-Monthly Taxable Compensation',
      accessor: b =>
        b.maxComp === Infinity
          ? `₱${b.minComp.toLocaleString('en-US', { minimumFractionDigits: 2 })} and above`
          : `₱${b.minComp.toLocaleString('en-US', { minimumFractionDigits: 2 })} – ₱${b.maxComp.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
    },
    {
      header: 'Prescribed Withholding Tax',
      accessor: b => {
        if (b.bracket === 1) return '₱0.00 (Tax Exempt)';
        const base = b.baseTax > 0 ? `₱${b.baseTax.toLocaleString('en-US', { minimumFractionDigits: 2 })} + ` : '';
        const pct = `${(b.marginalRate * 100).toFixed(0)}%`;
        const excess = ` over ₱${b.excessOver.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
        return `${base}${pct}${excess}`;
      },
      className: 'font-semibold text-brand-strong',
    },
  ];

  // Calculate live example
  const matchedBracket = activeBrackets.find(b => exampleIncome >= b.minComp && exampleIncome <= b.maxComp) || activeBrackets[0];
  const excessAmount = Math.max(0, exampleIncome - matchedBracket.excessOver);
  const marginalTax = Math.round(excessAmount * matchedBracket.marginalRate * 100) / 100;
  const totalTax = Math.round((matchedBracket.baseTax + marginalTax) * 100) / 100;

  const related = getRelatedPages('ph-tax-table');

  const faqs = [
    {
      question: 'Which deductions are subtracted before computing withholding tax?',
      answer:
        'Under Section 32 of the Tax Code and BIR Revenue Regulations, the following items are <strong>fully excluded from gross income</strong> before withholding tax is applied:<br/><br/>1. SSS Employee Contributions (Regular SS + WISP)<br/>2. PhilHealth Employee Premium<br/>3. Pag-IBIG Mandatory Employee Savings<br/>4. Union dues<br/>5. De minimis benefits within BIR threshold limits<br/>6. 13th month pay and other benefits up to the ₱90,000 tax-exempt ceiling.',
    },
    {
      question: 'Are minimum wage earners exempt from withholding tax?',
      answer:
        'Yes. Statutory Minimum Wage Earners (SMWE) in the private and public sector are <strong>100% exempt from income tax</strong> on their basic minimum wage, as well as on their holiday pay, overtime pay, night shift differential pay, and hazard pay.',
    },
    {
      question: 'Did the TRAIN Law rates change in 2026?',
      answer:
        'No further rate change took effect in 2026. The revised withholding tax schedule under Section 24(A)(2)(a) of the Tax Code (as amended by RA 10963) took effect on January 1, 2023 and remains the legal schedule in force.',
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <Breadcrumbs
        items={[
          { label: 'Philippines', href: '/philippines/' },
          { label: 'Withholding Tax Table' },
        ]}
      />

      <div className="border-b border-neutral-200 pb-6 pt-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft px-3 py-1 text-xs font-semibold text-brand-strong mb-2">
          <ShieldCheck className="h-3.5 w-3.5 text-brand" />
          <span>BIR Revenue Regulations No. 11-2018 (TRAIN Law)</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
          BIR Withholding Tax Table 2026
        </h1>
        <p className="mt-2 text-sm sm:text-base text-neutral-600 max-w-3xl leading-relaxed">
          Official monthly and semi-monthly revised withholding tax tables for compensation income earners in the Philippines under Republic Act No. 10963 (TRAIN Law).
        </p>

        {/* Table Selector */}
        <div className="mt-6">
          <SegmentedControl<'monthly' | 'semi-monthly'>
            value={tableFrequency}
            onChange={setTableFrequency}
            options={[
              { label: 'Monthly Tax Table', value: 'monthly' },
              { label: 'Semi-Monthly Tax Table (Per Cut-off)', value: 'semi-monthly' },
            ]}
          />
        </div>
      </div>

      {/* Official Tax Table */}
      <BracketTable<BirTaxBracket>
        title={`Revised ${tableFrequency === 'monthly' ? 'Monthly' : 'Semi-Monthly'} Withholding Tax Table`}
        subtitle="Source: BIR Revenue Regulations No. 11-2018 / Republic Act No. 10963"
        columns={columns}
        data={activeBrackets}
        highlightRowPredicate={b => exampleIncome >= b.minComp && exampleIncome <= b.maxComp}
      />

      {/* Interactive Worked Example Box */}
      <div className="my-8 rounded-xl border border-neutral-200 bg-white p-6 shadow-2xs">
        <div className="flex items-center gap-2 text-base font-bold text-neutral-900 border-b border-neutral-100 pb-3">
          <Calculator className="h-5 w-5 text-brand" />
          <span>Interactive Worked Tax Calculation Example</span>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div>
            <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
              Enter Taxable Compensation Income:
            </label>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-neutral-500">₱</span>
              <input
                type="number"
                value={exampleIncome}
                onChange={e => setExampleIncome(parseFloat(e.target.value) || 0)}
                step={500}
                min={0}
                className="w-full rounded-md border border-neutral-300 py-2 px-3 text-sm font-semibold tabular-nums focus:outline-none focus:ring-1 focus:ring-brand"
              />
            </div>
            <p className="mt-1 text-xs text-neutral-500">
              Taxable income = Gross basic salary minus SSS, PhilHealth, and Pag-IBIG employee contributions.
            </p>
          </div>

          <div className="rounded-lg bg-neutral-50 p-4 border border-neutral-200 text-xs space-y-1.5 text-neutral-700">
            <div className="flex justify-between">
              <span>Matched Bracket:</span>
              <span className="font-bold text-neutral-900">Bracket {matchedBracket.bracket}</span>
            </div>
            <div className="flex justify-between">
              <span>Base Tax:</span>
              <span className="tabular-nums font-semibold">₱{matchedBracket.baseTax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Excess over ₱{matchedBracket.excessOver.toLocaleString()}:</span>
              <span className="tabular-nums font-semibold">₱{excessAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Marginal Tax ({(matchedBracket.marginalRate * 100).toFixed(0)}% of excess):</span>
              <span className="tabular-nums font-semibold">₱{marginalTax.toFixed(2)}</span>
            </div>
            <div className="pt-2 border-t border-neutral-200 flex justify-between text-sm font-bold text-brand-strong">
              <span>Total Withholding Tax:</span>
              <span className="tabular-nums">₱{totalTax.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      <RelatedTools tools={related} />
      <FaqAccordion faqs={faqs} />
    </div>
  );
}
