'use client';

import React, { useState, useMemo } from 'react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { NumberInput } from '@/components/NumberInput';
import { SegmentedControl } from '@/components/SegmentedControl';
import { ResultPanel, BreakdownRow, CalculationLegalSource } from '@/components/ResultPanel';
import { FaqAccordion } from '@/components/FaqAccordion';
import { RelatedTools } from '@/components/RelatedTools';
import { SeoArticle, WorkedExampleItem, OfficialSourceLink } from '@/components/SeoArticle';
import { StructuredData } from '@/components/StructuredData';
import { getRelatedPages } from '@/config/pages';
import { calculateTargetCgpa, GradingSystem } from '@/lib/ng/cgpa';
import { getNgRates } from '@/lib/seo/rules-content';
import { ShieldCheck, Target, AlertTriangle } from 'lucide-react';

export default function TargetCgpaCalculator() {
  const ngRates = getNgRates();
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

  const maxScale = system === 'university_5_point' ? ngRates.nucMaxScale : ngRates.nbteMaxScale;

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
      sublabel:
        system === 'university_5_point'
          ? targetCgpa >= ngRates.nucFirstClassMin
            ? 'First Class Honours threshold'
            : targetCgpa >= ngRates.nucSecondClassUpperMin
            ? 'Second Class Upper (2:1) threshold'
            : targetCgpa >= ngRates.nucSecondClassLowerMin
            ? 'Second Class Lower (2:2) threshold'
            : 'Third Class threshold'
          : targetCgpa >= ngRates.nbteDistinctionMin
          ? 'Distinction diploma threshold'
          : targetCgpa >= ngRates.nbteUpperCreditMin
          ? 'Upper Credit diploma threshold'
          : 'Lower Credit diploma threshold',
    },
    {
      label: 'Remaining Credit Units to Take',
      value: `${remainingUnits} units`,
      sublabel: `Total degree units will be ${currentUnits + remainingUnits}`,
    },
    {
      label: 'Required Semester GPA Needed',
      value: targetResult.isAchievable ? `${targetResult.requiredSemesterGpa.toFixed(2)} GPA` : 'Mathematically Impossible',
      highlight: true,
      sublabel: targetResult.isAchievable
        ? `Maintain this average across all your remaining ${remainingUnits} credit units`
        : `Exceeds the maximum scale ceiling of ${maxScale.toFixed(2)}`,
    },
    {
      label: `Maximum Achievable CGPA (Straight ${maxScale.toFixed(1)}s)`,
      value: `${targetResult.maxAchievableCgpa.toFixed(2)} CGPA`,
      sublabel: `Highest possible CGPA if you earn straight ${maxScale.toFixed(1)}s in every remaining course`,
    },
  ];

  const legalSources: CalculationLegalSource[] = [
    {
      title: 'Cumulative Quality Point Mathematical Model',
      documentNumber: system === 'university_5_point' ? 'NUC BMAS / CCMAS Regulations' : 'NBTE Unified Grading Standards',
      summary: 'Required GPA = [Target CGPA × (Current Units + Remaining Units) – (Current CGPA × Current Units)] ÷ Remaining Units.',
    },
  ];

  const copySummaryText = `Nigeria Target CGPA Calculation (${system === 'university_5_point' ? 'University 5.0 Scale' : 'Polytechnic 4.0 Scale'}):
Current CGPA: ${currentCgpa.toFixed(2)} on ${currentUnits} units
Target CGPA: ${targetCgpa.toFixed(2)}
Remaining Units: ${remainingUnits}
Required GPA Needed: ${targetResult.isAchievable ? targetResult.requiredSemesterGpa.toFixed(2) : 'Not Achievable'}
Max Achievable CGPA: ${targetResult.maxAchievableCgpa.toFixed(2)}
Calculated on Pay (https://pay.zetawala.com/nigeria/target-cgpa-calculator/)`;

  const related = getRelatedPages('ng-target');

  const faqs = [
    {
      question: 'How is the required Target GPA calculated in Nigeria?',
      answer:
        'The formula computes the total quality points needed to graduate with your target classification: Total Quality Points Needed = Target CGPA × Total Degree Units (Current + Remaining). By subtracting your currently earned quality points (Current CGPA × Current Units), we determine the remaining quality points needed. Dividing this figure by your remaining credit units yields your required GPA.',
    },
    {
      question: 'What does it mean if the calculator says "Mathematically Impossible"?',
      answer:
        `If the required GPA exceeds ${maxScale.toFixed(2)}, you cannot reach that target CGPA even if you earn straight A grades in every remaining course. This occurs because the large number of completed credit units has firmly anchored your CGPA.`,
    },
    {
      question: 'What is the "credit anchor effect" in CGPA computation?',
      answer:
        'The more credit units you accumulate, the harder it becomes to move your CGPA up or down. A student with 120 completed units has eight times more resistance to CGPA changes than a fresher with only 15 units.',
    },
    {
      question: 'Can I increase my remaining credit units to make my target achievable?',
      answer:
        'Yes. You can consult your academic advisor to register optional elective courses within departmental credit limits, or retake eligible carryover courses to substitute failing grades with passing grade points.',
    },
    {
      question: 'What GPA do I need to move from Second Class Lower to Second Class Upper?',
      answer:
        `Under the NUC system, Second Class Upper starts at ${ngRates.nucSecondClassUpperMin.toFixed(2)}. For example, a student entering 300-level with 60 units at a 3.10 CGPA needs an average GPA of 3.90 across their next 60 units to graduate with a 3.50.`,
    },
    {
      question: 'How does a carryover affect my target CGPA calculation?',
      answer:
        'When you clear a carryover course, its new credit units and grade points are added to your cumulative total. However, the initial 0.00 quality points from the failed attempt remain permanently in your cumulative denominator, requiring higher grades in other courses to compensate.',
    },
    {
      question: 'Can polytechnic students use this target calculator for Distinction?',
      answer:
        `Yes. Switch the calculator to the "Polytechnic (4.0 Scale)" toggle. Distinction requires a minimum CGPA of ${ngRates.nbteDistinctionMin.toFixed(2)}, while Upper Credit requires ${ngRates.nbteUpperCreditMin.toFixed(2)}.`,
    },
    {
      question: 'What is the maximum achievable CGPA shown in the results?',
      answer:
        `The maximum achievable CGPA represents your academic ceiling if you score straight A grades (${maxScale.toFixed(2)} GP) in all remaining credit units. If your target CGPA exceeds this ceiling, the target is mathematically unreachable within the entered remaining units.`,
    },
  ];

  const workedExamples: WorkedExampleItem[] = [
    {
      title: 'Worked Example 1: 300-Level Student Targeting Second Class Upper (2:1)',
      scenario:
        `A university undergraduate has completed 60 credit units with a 3.20 CGPA (Second Class Lower) and has 60 units remaining before graduation. They want to graduate with a 3.50 CGPA (Second Class Upper).`,
      breakdown: [
        { label: 'Completed Credit Units', value: '60 units' },
        { label: 'Current Earned Quality Points (3.20 × 60)', value: '192.00 QP' },
        { label: 'Target CGPA Desired', value: `${ngRates.nucSecondClassUpperMin.toFixed(2)} CGPA` },
        { label: 'Total Degree Units (60 + 60)', value: '120 units' },
        { label: 'Total Quality Points Needed (3.50 × 120)', value: '420.00 QP' },
        { label: 'Remaining Quality Points Needed (420.00 – 192.00)', value: '228.00 QP' },
        { label: 'Required Semester GPA (228.00 ÷ 60 remaining units)', value: '3.80 GPA' },
      ],
      summary:
        'The student needs to maintain an average semester GPA of 3.80 across their remaining 60 units (a solid mix of mostly B and A grades) to graduate with Second Class Honours (Upper Division).',
    },
    {
      title: 'Worked Example 2: Final-Year Student Target Unattainable (> 5.00 GPA)',
      scenario:
        `A 400-level engineering student has completed 110 credit units with a 4.10 CGPA and has only 30 units remaining in their final year. They want to graduate with a First Class Honours (4.50 CGPA).`,
      breakdown: [
        { label: 'Completed Credit Units', value: '110 units' },
        { label: 'Current Earned Quality Points (4.10 × 110)', value: '451.00 QP' },
        { label: 'Target CGPA Desired (First Class)', value: `${ngRates.nucFirstClassMin.toFixed(2)} CGPA` },
        { label: 'Total Degree Units (110 + 30)', value: '140 units' },
        { label: 'Total Quality Points Needed (4.50 × 140)', value: '630.00 QP' },
        { label: 'Remaining Quality Points Needed (630.00 – 451.00)', value: '179.00 QP' },
        { label: 'Required Semester GPA (179.00 ÷ 30 remaining units)', value: '5.97 GPA' },
        { label: 'Maximum Possible GPA on NUC Scale', value: '5.00 GPA' },
        { label: 'Maximum Achievable CGPA (Straight 5.0s)', value: '4.29 CGPA' },
      ],
      summary:
        'Because 5.97 exceeds the maximum possible 5.00 scale, graduating with a First Class is mathematically impossible. Even with perfect straight As (5.00 GPA) in all remaining 30 units, the student will finish with a 4.29 CGPA (a very strong Second Class Upper).',
    },
  ];

  const officialSources: OfficialSourceLink[] = [
    {
      title: 'National Universities Commission (NUC)',
      url: 'https://www.nuc.edu.ng/',
      description: 'Standard grading system and degree classification thresholds for Nigerian universities.',
    },
    {
      title: 'National Board for Technical Education (NBTE)',
      url: 'https://net.nbte.gov.ng/',
      description: 'Official diploma classification thresholds and curriculum guidelines for Nigerian polytechnics.',
    },
  ];

  const toc = [
    { id: 'target-cgpa-formula', title: 'The Target CGPA Mathematical Formula' },
    { id: 'credit-anchor-effect', title: 'The Credit Anchor Effect Across Academic Levels' },
    { id: 'what-if-impossible', title: 'What to Do When Your Target GPA Exceeds 5.00' },
    { id: 'target-by-classification', title: 'Target Benchmarks by Degree & Diploma Class' },
    { id: 'actionable-tactics', title: 'Actionable Tactics to Hit Your Required Target GPA' },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <StructuredData
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Nigeria', url: '/nigeria/' },
          { name: 'Target CGPA Calculator', url: '/nigeria/target-cgpa-calculator/' },
        ]}
        webApp={{
          name: 'Target CGPA Calculator for Nigerian Universities & Polytechnics',
          url: '/nigeria/target-cgpa-calculator/',
          description: 'Calculate the exact semester GPA needed in remaining credit units to reach your target degree or diploma classification in Nigeria.',
          applicationCategory: 'EducationalApplication',
        }}
        faqs={faqs}
      />

      <Breadcrumbs
        items={[
          { label: 'Nigeria', href: '/nigeria/' },
          { label: 'Target CGPA Calculator' },
        ]}
      />

      <div className="border-b border-neutral-200 pb-6 pt-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft px-3 py-1 text-xs font-semibold text-brand-strong mb-2">
          <Target className="h-3.5 w-3.5 text-brand" />
          <span>Academic Goal Planner</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
          Target CGPA Calculator for Nigerian Universities & Polytechnics
        </h1>

        <div className="mt-4 rounded-xl border border-brand/20 bg-brand-soft/40 p-4 text-sm text-neutral-800 leading-relaxed max-w-3xl">
          <strong>Quick Answer:</strong> To find the GPA required in your remaining semesters to hit a target CGPA, calculate the total quality points needed: <code>Target CGPA × Total Degree Units (Completed + Remaining)</code>, subtract your current earned quality points, and divide by remaining credit units. If the required GPA exceeds {maxScale.toFixed(2)}, the target is mathematically unreachable within those units.
        </div>

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
              Your Academic Standing &amp; Goals
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                  Current CGPA
                </label>
                <NumberInput
                  value={currentCgpa}
                  onChange={setCurrentCgpa}
                  min={0}
                  max={maxScale}
                  step={0.01}
                  placeholder="e.g. 3.20"
                />
                <span className="text-2xs text-neutral-500 mt-1 block">
                  Your cumulative CGPA up to last semester (0.00 – {maxScale.toFixed(2)})
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                  Completed Credit Units
                </label>
                <NumberInput
                  value={currentUnits}
                  onChange={setCurrentUnits}
                  min={1}
                  max={250}
                  step={1}
                  placeholder="e.g. 60"
                />
                <span className="text-2xs text-neutral-500 mt-1 block">
                  Total credit units already completed and graded
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                  Target Desired CGPA
                </label>
                <NumberInput
                  value={targetCgpa}
                  onChange={setTargetCgpa}
                  min={0}
                  max={maxScale}
                  step={0.01}
                  placeholder="e.g. 3.50"
                />
                <span className="text-2xs text-neutral-500 mt-1 block">
                  The final CGPA you want to graduate with
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                  Remaining Credit Units
                </label>
                <NumberInput
                  value={remainingUnits}
                  onChange={setRemainingUnits}
                  min={1}
                  max={150}
                  step={1}
                  placeholder="e.g. 60"
                />
                <span className="text-2xs text-neutral-500 mt-1 block">
                  Total credit units left to register until graduation
                </span>
              </div>
            </div>

            {!targetResult.isAchievable && (
              <div className="rounded-lg border border-danger/20 bg-danger/5 p-3.5 flex items-start gap-2.5">
                <AlertTriangle className="h-5 w-5 text-danger shrink-0 mt-0.5" />
                <div className="text-xs text-neutral-800 leading-relaxed">
                  <strong className="text-danger font-semibold">Target Exceeds Scale Ceiling:</strong> To reach {targetCgpa.toFixed(2)} CGPA, you would need an average GPA of{' '}
                  <span className="font-bold text-danger">{targetResult.requiredSemesterGpa.toFixed(2)}</span> across your remaining {remainingUnits} units, which is greater than the {maxScale.toFixed(2)} scale limit. Your maximum achievable CGPA is{' '}
                  <span className="font-bold text-neutral-900">{targetResult.maxAchievableCgpa.toFixed(2)}</span>.
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <ResultPanel
            title="Target Analysis"
            headlineLabel="Required Semester GPA"
            headlineValue={targetResult.isAchievable ? `${targetResult.requiredSemesterGpa.toFixed(2)} GPA` : 'Not Achievable'}
            subHeadline={
              targetResult.isAchievable
                ? `Need average of ${targetResult.requiredSemesterGpa.toFixed(2)} over next ${remainingUnits} credit units`
                : `Maximum possible is ${targetResult.maxAchievableCgpa.toFixed(2)} CGPA with straight As`
            }
            rows={rows}
            sources={legalSources}
            copySummaryText={copySummaryText}
            shareTitle="Target CGPA Calculation"
          />
        </div>
      </div>

      <SeoArticle
        toc={toc}
        workedExamples={workedExamples}
        officialSources={officialSources}
        ratesCheckedDate={ngRates.verifiedDate}
      >
        <section id="target-cgpa-formula" className="space-y-4">
          <h2 className="text-2xl font-bold text-neutral-900">The Target CGPA Mathematical Formula</h2>
          <p className="text-neutral-700 leading-relaxed">
            In the Nigerian tertiary education system governed by the National Universities Commission (NUC) and the National Board for Technical Education (NBTE), cumulative grade point average represents the ratio of all accumulated quality points to all registered credit units.
          </p>
          <p className="text-neutral-700 leading-relaxed">
            When planning to reach a specific academic class, you solve for the unknown required quality points in your remaining coursework. The mathematical derivation is straightforward:
          </p>
          <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 space-y-2 text-sm text-neutral-800 font-mono">
            <p>1. Total Degree Units = Current Units + Remaining Units</p>
            <p>2. Target Total Quality Points = Target CGPA × Total Degree Units</p>
            <p>3. Current Earned Quality Points = Current CGPA × Current Units</p>
            <p>4. Remaining Quality Points Needed = Target Total Points – Current Earned Points</p>
            <p>5. Required Remaining GPA = Remaining Points Needed ÷ Remaining Units</p>
          </div>
        </section>

        <section id="credit-anchor-effect" className="space-y-4">
          <h2 className="text-2xl font-bold text-neutral-900">The Credit Anchor Effect Across Academic Levels</h2>
          <p className="text-neutral-700 leading-relaxed">
            The single most important principle in Nigerian degree planning is the &quot;credit anchor effect.&quot; In your 100-level and 200-level sessions, your completed credit units are relatively low (30 to 60 units). At this stage, each upcoming semester accounts for a significant fraction of your total academic record, making your CGPA highly responsive to high semester GPAs.
          </p>
          <p className="text-neutral-700 leading-relaxed">
            By contrast, once you enter 400-level or 500-level with 100 to 140 completed units, your accumulated credit units act as a heavy anchor. An exceptional 4.80 semester GPA across a 15-unit term will only nudge a 120-unit CGPA by approximately 0.10 to 0.15 points. Understanding this reality prevents unrealistic final-year expectations and highlights the urgency of academic turnaround during 200-level and 300-level.
          </p>
        </section>

        <section id="what-if-impossible" className="space-y-4">
          <h2 className="text-2xl font-bold text-neutral-900">What to Do When Your Target GPA Exceeds 5.00</h2>
          <p className="text-neutral-700 leading-relaxed">
            If our calculator indicates that your required GPA is greater than {maxScale.toFixed(2)}, it is mathematically impossible to reach that exact target under your currently planned course load. However, several strategic avenues remain:
          </p>
          <ul className="list-disc list-inside space-y-2 text-neutral-700">
            <li><strong>Focus on the Maximum Achievable CGPA:</strong> Look at the maximum achievable CGPA row in our results. Even if you cannot reach a First Class (4.50), aiming for straight As might elevate you to a very high Second Class Upper (e.g., 4.30), which commands outstanding respect in postgraduate admissions and corporate recruiting.</li>
            <li><strong>Register Additional Elective Courses:</strong> By taking approved elective courses to increase your remaining credit units (the denominator), you create more opportunities to accumulate positive quality points (the numerator).</li>
            <li><strong>Clear Outstanding Carryovers:</strong> Retaking courses where you received an F grade allows you to earn 3.0, 4.0, or 5.0 grade points on the new attempt, substantially boosting your cumulative quality points.</li>
          </ul>
        </section>

        <section id="target-by-classification" className="space-y-4">
          <h2 className="text-2xl font-bold text-neutral-900">Target Benchmarks by Degree &amp; Diploma Class</h2>
          <p className="text-neutral-700 leading-relaxed">
            The table below outlines the official statutory minimum CGPA required for each graduation honors tier under NUC and NBTE standards:
          </p>
          <div className="overflow-x-auto rounded-lg border border-neutral-200">
            <table className="w-full text-left text-sm text-neutral-700">
              <thead className="bg-neutral-100 text-xs font-bold uppercase text-neutral-800">
                <tr>
                  <th className="px-4 py-3">Classification Tier</th>
                  <th className="px-4 py-3">University (NUC 5.0 Scale)</th>
                  <th className="px-4 py-3">Polytechnic (NBTE 4.0 Scale)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                <tr>
                  <td className="px-4 py-3 font-semibold text-neutral-900">Highest Tier</td>
                  <td className="px-4 py-3">First Class Honours (≥ {ngRates.nucFirstClassMin.toFixed(2)})</td>
                  <td className="px-4 py-3">Distinction (≥ {ngRates.nbteDistinctionMin.toFixed(2)})</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-neutral-900">Upper Middle Tier</td>
                  <td className="px-4 py-3">Second Class Upper (2:1) (≥ {ngRates.nucSecondClassUpperMin.toFixed(2)})</td>
                  <td className="px-4 py-3">Upper Credit (≥ {ngRates.nbteUpperCreditMin.toFixed(2)})</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-neutral-900">Lower Middle Tier</td>
                  <td className="px-4 py-3">Second Class Lower (2:2) (≥ {ngRates.nucSecondClassLowerMin.toFixed(2)})</td>
                  <td className="px-4 py-3">Lower Credit (≥ {ngRates.nbteLowerCreditMin.toFixed(2)})</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-neutral-900">Passing Tier</td>
                  <td className="px-4 py-3">Third Class (≥ {ngRates.nucThirdClassMin.toFixed(2)})</td>
                  <td className="px-4 py-3">Pass (≥ {ngRates.nbtePassMin.toFixed(2)})</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section id="actionable-tactics" className="space-y-4">
          <h2 className="text-2xl font-bold text-neutral-900">Actionable Tactics to Hit Your Required Target GPA</h2>
          <p className="text-neutral-700 leading-relaxed">
            Consistently achieving a 4.00+ semester GPA requires disciplined academic tactics tailored to Nigerian tertiary examination grading:
          </p>
          <ul className="list-disc list-inside space-y-2 text-neutral-700">
            <li><strong>Master Past Examination Questions:</strong> Lecturers in Nigerian universities and polytechnics frequently test core theoretical paradigms across recurring multi-year examination patterns. Thoroughly solving the past 5 to 7 years of past questions is essential.</li>
            <li><strong>Maximize Continuous Assessment (CA) Points:</strong> Continuous assessment accounts for 30% to 40% of your course grade. Scoring 34 out of 40 in test and laboratory assignments means you only need 36 out of 60 in the final examination to secure an A grade (70%).</li>
            <li><strong>Prioritize High-Credit Courses:</strong> Allocate study time proportionally to credit units. Earning an A in a 4-unit course generates 20.0 quality points, whereas an A in a 1-unit course yields only 5.0 quality points.</li>
          </ul>
        </section>
      </SeoArticle>

      <RelatedTools tools={related} />
      <FaqAccordion faqs={faqs} />
    </div>
  );
}
