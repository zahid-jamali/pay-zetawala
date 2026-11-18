'use client';

import React, { useState, useMemo } from 'react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { NumberInput } from '@/components/NumberInput';
import { SegmentedControl } from '@/components/SegmentedControl';
import { ResultPanel, BreakdownRow, CalculationLegalSource } from '@/components/ResultPanel';
import { FaqAccordion } from '@/components/FaqAccordion';
import { RelatedTools } from '@/components/RelatedTools';
import { getRelatedPages } from '@/config/pages';
import { calculateTargetCgpa, GradingSystem } from '@/lib/ng/cgpa';
import { ShieldCheck, Target, AlertTriangle } from 'lucide-react';

export default function TargetCgpaCalculator() {
  const [system, setSystem] = useState<GradingSystem>('university_5_point');
  const [currentCgpa, setCurrentCgpa] = useState<number>(3.20);
  const [currentUnits, setCurrentUnits] = useState<number>(60);
  const [targetCgpa, setTargetCgpa] = useState<number>(3.50);
  const [remainingUnits, setRemainingUnits] = useState<number>(60);

  const targetResult = useMemo(() => {
    return calculateTargetCgpa({
      currentCgpa,
      currentUnits,
      targetCgpa,
      remainingUnits,
      system,
    });
  }, [currentCgpa, currentUnits, targetCgpa, remainingUnits, system]);

  const rows: BreakdownRow[] = [
    {
      label: 'Current Academic Standing',
      value: `${currentCgpa.toFixed(2)} CGPA`,
      sublabel: `Over ${currentUnits} completed credit units`,
    },
    {
      label: 'Target Desired CGPA',
      value: `${targetCgpa.toFixed(2)} CGPA`,
      highlight: true,
      sublabel: targetCgpa >= 4.5 ? 'First Class Honours goal' : targetCgpa >= 3.5 ? 'Second Class Upper goal' : 'Target classification goal',
    },
    {
      label: 'Remaining Credit Units',
      value: `${remainingUnits} units`,
    },
    {
      label: 'Required Semester GPA Needed',
      value: targetResult.isAchievable ? `${targetResult.requiredSemesterGpa.toFixed(2)} GPA` : 'Mathematically Impossible',
      highlight: true,
      sublabel: targetResult.isAchievable ? `Maintain this average across your next ${remainingUnits} units` : 'Exceeds maximum achievable scale',
    },
    {
      label: 'Maximum Achievable CGPA (Straight 5.0 / 4.0)',
      value: `${targetResult.maxAchievableCgpa.toFixed(2)} CGPA`,
      sublabel: 'Ceiling if you score perfect grades in all remaining courses',
    },
  ];

  const legalSources: CalculationLegalSource[] = [
    {
      title: 'Target CGPA Mathematical Model',
      documentNumber: 'Cumulative Quality Point Formula',
      summary: 'Solves required semester quality points: Required GPA = [Target CGPA × Total Units – Current Quality Points] ÷ Remaining Units.',
    },
  ];

  const copySummaryText = `Target CGPA Calculation:
Current CGPA: ${currentCgpa.toFixed(2)} on ${currentUnits} units
Target CGPA: ${targetCgpa.toFixed(2)}
Remaining Units: ${remainingUnits}
Required GPA Needed: ${targetResult.isAchievable ? targetResult.requiredSemesterGpa.toFixed(2) : 'Not Achievable'}
Max Achievable: ${targetResult.maxAchievableCgpa.toFixed(2)}
Calculated on Pay (https://pay.zetawala.com/nigeria/target-cgpa-calculator/)`;

  const related = getRelatedPages('ng-target');

  const faqs = [
    {
      question: 'How is the required Target GPA calculated?',
      answer:
        'The formula solves for the quality points needed to reach your target:<br/><br/><code>Required Total Points = Target CGPA × (Current Units + Remaining Units)</code><br/><code>Required GPA = (Required Total Points – Current Points) ÷ Remaining Units</code>',
    },
    {
      question: 'What if the required GPA is higher than 5.00?',
      answer:
        'If the required GPA exceeds 5.00 (or 4.00 for polytechnics), it is mathematically impossible to reach that exact target within the remaining credit units alone. You would need to take additional elective courses or retake carryover courses to increase total quality points.',
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <Breadcrumbs
        items={[
          { label: 'Nigeria', href: '/nigeria/' },
          { label: 'Target CGPA Calculator' },
        ]}
      />

      <div className="border-b border-neutral-200 pb-6 pt-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft px-3 py-1 text-xs font-semibold text-brand-strong mb-2">
          <ShieldCheck className="h-3.5 w-3.5 text-brand" />
          <span>Academic Target Planning Tool</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
          Target CGPA Calculator 2026
        </h1>
        <p className="mt-2 text-sm sm:text-base text-neutral-600 max-w-3xl leading-relaxed">
          Find out the exact semester GPA you need to average over your remaining credit units to graduate with First Class, Second Class Upper, or Polytechnic Distinction.
        </p>

        <div className="mt-6 max-w-md">
          <SegmentedControl<GradingSystem>
            value={system}
            onChange={setSystem}
            options={[
              { label: 'University (5.0 Scale)', value: 'university_5_point' },
              { label: 'Polytechnic (4.0 Scale)', value: 'polytechnic_4_point' },
            ]}
          />
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-2xs space-y-5">
            <h2 className="text-base font-bold text-neutral-900 border-b border-neutral-100 pb-3">
              Academic Parameters
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <NumberInput
                label="Current Cumulative CGPA"
                value={currentCgpa}
                onChange={setCurrentCgpa}
                step={0.01}
                min={0}
                max={system === 'university_5_point' ? 5.0 : 4.0}
                hint="Your CGPA up to your most recent completed semester."
                required
              />
              <NumberInput
                label="Current Units Completed"
                value={currentUnits}
                onChange={setCurrentUnits}
                min={1}
                max={250}
                suffix="units"
                hint="Total credit units registered and graded so far."
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-neutral-100">
              <NumberInput
                label="Desired Target CGPA"
                value={targetCgpa}
                onChange={setTargetCgpa}
                step={0.01}
                min={0}
                max={system === 'university_5_point' ? 5.0 : 4.0}
                hint="e.g. 4.50 for First Class or 3.50 for 2:1"
                required
              />
              <NumberInput
                label="Remaining Credit Units"
                value={remainingUnits}
                onChange={setRemainingUnits}
                min={1}
                max={150}
                suffix="units"
                hint="Units left to complete in remaining semesters."
                required
              />
            </div>

            <div className="p-4 rounded-lg bg-neutral-50 border border-neutral-200 text-xs text-neutral-700 leading-relaxed">
              <strong>Academic Advice:</strong> {targetResult.message}
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <ResultPanel
            title="Target Plan Summary"
            headlineLabel="Required Semester GPA"
            headlineValue={
              targetResult.isAchievable
                ? `${targetResult.requiredSemesterGpa.toFixed(2)} GPA`
                : 'Target Unachievable'
            }
            subHeadline={
              targetResult.isAchievable
                ? `Maintain this across your next ${remainingUnits} credit units`
                : `Max possible CGPA with straight 5.0s is ${targetResult.maxAchievableCgpa.toFixed(2)}`
            }
            rows={rows}
            sources={legalSources}
            copySummaryText={copySummaryText}
            shareTitle="Target CGPA Calculation"
            calloutMessage={{
              type: targetResult.isAchievable ? 'success' : 'warning',
              text: targetResult.isAchievable
                ? `Achievable: An average semester GPA of ${targetResult.requiredSemesterGpa.toFixed(2)} will reach your target CGPA of ${targetCgpa.toFixed(2)}.`
                : `Impossible: Even with perfect scores (${system === 'university_5_point' ? '5.0' : '4.0'} GPA), the highest achievable CGPA is ${targetResult.maxAchievableCgpa.toFixed(2)}.`,
            }}
          />
        </div>
      </div>

      <RelatedTools tools={related} />
      <FaqAccordion faqs={faqs} />
    </div>
  );
}
