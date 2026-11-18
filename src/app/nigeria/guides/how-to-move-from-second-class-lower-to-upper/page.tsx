import React from 'react';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SeoArticle, WorkedExampleItem, OfficialSourceLink } from '@/components/SeoArticle';
import { StructuredData } from '@/components/StructuredData';
import { getNgRates } from '@/lib/seo/rules-content';
import { TrendingUp, Calculator, Target, Award, CheckCircle2 } from 'lucide-react';

export default function GuideHowToMoveFromSecondClassLowerToUpper() {
  const ngRates = getNgRates();
  const targetMin = ngRates.nucSecondClassUpperMin; // 3.50

  const faqs = [
    {
      question: 'Is it realistically possible to move from a 2:2 to a 2:1 in a Nigerian university?',
      answer:
        'Yes, provided you make the turnaround early (during 200-level or 300-level) when you still have a substantial number of remaining credit units. The more credit units left, the easier it is mathematically to elevate your cumulative quality points to the 3.50 cutoff.',
    },
    {
      question: 'What is the "credit anchor effect" in university grading?',
      answer:
        'The credit anchor effect means that as your completed credit units accumulate, each subsequent semester carries a smaller percentage of your total degree record. A high 4.50 semester GPA in 200-level (after 30 units) produces a massive CGPA leap, whereas the same 4.50 in 400-level (after 120 units) moves the needle by only a fraction of a point.',
    },
    {
      question: 'Can I move from 2:2 to 2:1 in my final year (400-level)?',
      answer:
        'It depends on your current CGPA and the number of remaining units. If your 300-level CGPA is 3.35 or higher, earning straight As and Bs in your final year can push you over 3.50. However, if your CGPA is 2.80 with only 30 units remaining, reaching 3.50 is mathematically impossible because the required GPA exceeds the 5.00 maximum scale.',
    },
    {
      question: 'How do Continuous Assessment (CA) scores help me reach a 2:1?',
      answer:
        'Continuous Assessment (tests, quizzes, assignments, practicals) accounts for 30% to 40% of your total course grade. Securing 32 out of 40 in CA gives you an insurmountable safety margin, allowing you to achieve an A (70%+) with just a modest 38/60 performance in the final examination.',
    },
    {
      question: 'Should I register additional elective courses to boost my CGPA?',
      answer:
        'Yes, if you are confident of scoring A grades in them. High-performing elective courses add positive quality points (e.g., 5.0 GP per unit), expanding your numerator and raising your cumulative average. However, never take extra electives if they will dilute your study time for heavy core courses.',
    },
  ];

  const workedExamples: WorkedExampleItem[] = [
    {
      title: '200-Level Turnaround Plan: 3.00 CGPA with 80 Units Remaining',
      scenario:
        'A student completes Year 1 (40 credit units) with a 3.00 CGPA and wants to graduate with a 3.50 (Second Class Upper) over their remaining 80 units.',
      inputs: [
        { label: 'Completed Credit Units', value: '40 units' },
        { label: 'Current CGPA', value: '3.00 CGPA' },
        { label: 'Current Earned Quality Points', value: '120.00 QP' },
        { label: 'Remaining Credit Units', value: '80 units' },
        { label: 'Target Final CGPA', value: `${targetMin.toFixed(2)} CGPA` },
      ],
      steps: [
        { label: 'Total Degree Units', formula: '40 current + 80 remaining', value: '120 credit units' },
        { label: 'Total Quality Points Needed', formula: '3.50 × 120 units', value: '420.00 QP' },
        { label: 'Remaining Quality Points Needed', formula: '420.00 – 120.00 earned', value: '300.00 QP' },
        { label: 'Required Remaining Semester GPA', formula: '300.00 QP ÷ 80 remaining units', value: '3.75 GPA', highlight: true },
      ],
      resultLabel: 'Target Feasibility',
      resultValue: '3.75 GPA Needed (Very Achievable)',
      notes: 'Requires a steady mix of B (4.0) and A (5.0) grades across remaining sessions.',
    },
    {
      title: 'Late Final-Year Attempt: 3.20 CGPA with 30 Units Remaining',
      scenario:
        'A 400-level student entering their final year has 100 completed units at 3.20 CGPA and only 30 units remaining before graduation.',
      inputs: [
        { label: 'Completed Credit Units', value: '100 units' },
        { label: 'Current Earned Quality Points', value: '320.00 QP' },
        { label: 'Remaining Units Left', value: '30 units' },
        { label: 'Target CGPA', value: `${targetMin.toFixed(2)} CGPA` },
      ],
      steps: [
        { label: 'Total Degree Units', formula: '100 + 30', value: '130 units' },
        { label: 'Target Quality Points', formula: '3.50 × 130', value: '455.00 QP' },
        { label: 'Remaining Quality Points Required', formula: '455.00 – 320.00', value: '135.00 QP' },
        { label: 'Required Final-Year GPA', formula: '135.00 QP ÷ 30 units', value: '4.50 GPA', highlight: true },
      ],
      resultLabel: 'Target Feasibility',
      resultValue: '4.50 GPA Needed (Difficult)',
      notes: 'Requires a pure First Class performance (mostly A grades) across all final-year courses.',
    },
  ];

  const officialSources: OfficialSourceLink[] = [
    {
      name: 'National Universities Commission (NUC)',
      documentTitle: 'Guidelines on Academic Standing, Probation & Degree Honors Standards',
      url: 'https://www.nuc.edu.ng',
      verifiedDate: ngRates.verifiedDate,
    },
    {
      name: 'Academic Affairs Divisions (Federal & State Universities)',
      documentTitle: 'Undergraduate Academic Regulations Handbook',
      url: 'https://www.nuc.edu.ng',
      verifiedDate: ngRates.verifiedDate,
    },
  ];

  const toc = [
    { id: 'math-of-recovery', label: '1. The Mathematics of Grade Improvement' },
    { id: 'the-credit-anchor', label: '2. Understanding the Credit Unit Anchor Effect' },
    { id: 'recovery-by-level', label: '3. Turnaround Feasibility by Academic Level (200L to 400L)' },
    { id: 'continuous-assessment-tactics', label: '4. Continuous Assessment (CA) Dominance' },
    { id: 'tactical-checklist', label: '5. Actionable Tactics: Past Questions & Course Scheduling' },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <StructuredData
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Nigeria', url: '/nigeria/' },
          { name: 'Guides', url: '/nigeria/' },
          { name: 'How to Move from 2:2 to 2:1', url: '/nigeria/guides/how-to-move-from-second-class-lower-to-upper/' },
        ]}
        article={{
          headline: 'How to Move from Second Class Lower (2:2) to Upper (2:1) in Nigeria',
          description: 'A realistic mathematical and strategic guide to elevating your university CGPA from Second Class Lower to Upper Division across 200, 300, and 400 levels.',
          url: 'https://pay.zetawala.com/nigeria/guides/how-to-move-from-second-class-lower-to-upper/',
          datePublished: '2026-03-28T08:00:00+01:00',
          dateModified: '2026-11-18T01:00:00+01:00',
        }}
        faqs={faqs}
      />

      <Breadcrumbs
        items={[
          { label: 'Nigeria', href: '/nigeria/' },
          { label: 'Guides', href: '/nigeria/' },
          { label: 'Move from 2:2 to 2:1' },
        ]}
      />

      <header className="border-b border-neutral-200 pb-6 pt-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft px-3 py-1 text-xs font-semibold text-brand-strong mb-2">
          <TrendingUp className="h-3.5 w-3.5 text-brand" />
          <span>Academic Turnaround Strategy</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
          How to Move from Second Class Lower to Upper in Nigeria
        </h1>
        <p className="mt-2 text-sm sm:text-base text-neutral-600 leading-relaxed">
          The mathematical reality of credit unit weighting, required semester GPAs, and high-impact study tactics to elevate your CGPA to 3.50+.
        </p>
      </header>

      {/* Tool Shortcut */}
      <div className="mt-6 rounded-xl border border-brand/30 bg-brand-soft/20 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-bold text-neutral-900">Calculate your required GPA instantly</h2>
          <p className="text-xs text-neutral-600">Enter your current CGPA, completed units, and remaining units to see your required GPA.</p>
        </div>
        <Link
          href="/nigeria/target-cgpa-calculator/"
          className="inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-brand-strong transition-colors shrink-0"
        >
          <Target className="h-4 w-4" />
          <span>Target CGPA Calculator</span>
        </Link>
      </div>

      <SeoArticle
        quickAnswer={`Moving from a Second Class Lower (2.40–3.49) to a Second Class Upper (${targetMin.toFixed(2)}+) requires solving for your remaining quality points: Required GPA = [(${targetMin.toFixed(2)} × Total Units) – Current Earned Points] ÷ Remaining Units. The earlier you begin (200L or 300L), the lower your required semester GPA. Securing 32+/40 in continuous assessment is the most effective tactic.`}
        toc={toc}
        workedExamples={workedExamples}
        sources={officialSources}
        verifiedDate={ngRates.verifiedDate}
      >
        <section id="math-of-recovery" className="space-y-4">
          <h2>1. The Mathematics of Grade Improvement</h2>
          <p>
            Many Nigerian undergraduates wish for a 2:1 degree without understanding the exact arithmetic of academic recovery. Wishful thinking does not move a transcript; quality points do.
          </p>
          <p>
            Your degree classification is determined strictly by the ratio of your Total Quality Points (TQP) to Total Credit Units (TCU). To elevate your cumulative average to the statutory <strong>{targetMin.toFixed(2)}</strong> threshold for Second Class Honours (Upper Division), you must generate more quality points per unit in future semesters than you did in your initial years.
          </p>
        </section>

        <section id="the-credit-anchor" className="space-y-4">
          <h2>2. Understanding the Credit Unit Anchor Effect</h2>
          <p>
            The fundamental law of CGPA progression is the <strong>credit anchor effect</strong>:
          </p>
          <ul>
            <li>
              <strong>At 100-Level / 200-Level:</strong> You have completed only 30 to 50 credit units. Each subsequent semester represents 30% to 50% of your total academic record. A strong 4.20 semester GPA will immediately drag a low 2.70 CGPA upward by 0.40 to 0.60 points.
            </li>
            <li>
              <strong>At 400-Level:</strong> You have accumulated 110 to 140 credit units. A single 15-unit final semester represents barely 10% of your academic history. Even an outstanding 4.80 semester GPA will only budge your cumulative CGPA by approximately 0.10 to 0.15 points.
            </li>
          </ul>
          <p>
            This mathematical reality means that academic turnaround must begin immediately upon completing 100-level or early in 200-level. Waiting until your penultimate or final year makes a 2:1 mathematically inaccessible.
          </p>
        </section>

        <section id="recovery-by-level" className="space-y-4">
          <h2>3. Turnaround Feasibility by Academic Level (200L to 400L)</h2>
          <div className="overflow-x-auto rounded-lg border border-neutral-200 my-4">
            <table className="w-full text-left text-sm text-neutral-700">
              <thead className="bg-neutral-100 text-xs font-bold uppercase text-neutral-800">
                <tr>
                  <th className="px-4 py-3">Starting Level</th>
                  <th className="px-4 py-3">Typical Completed Units</th>
                  <th className="px-4 py-3">Current CGPA</th>
                  <th className="px-4 py-3">Required Remaining GPA</th>
                  <th className="px-4 py-3">Feasibility Assessment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                <tr>
                  <td className="px-4 py-3 font-medium">Entering 200-Level</td>
                  <td className="px-4 py-3">35 units</td>
                  <td className="px-4 py-3">2.80</td>
                  <td className="px-4 py-3 font-bold text-brand">3.75 GPA</td>
                  <td className="px-4 py-3 text-brand font-semibold">High (Solid B/A mix across 6 terms)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Entering 300-Level</td>
                  <td className="px-4 py-3">70 units</td>
                  <td className="px-4 py-3">3.10</td>
                  <td className="px-4 py-3 font-bold text-brand">3.97 GPA</td>
                  <td className="px-4 py-3 text-brand font-semibold">Moderate (Need mostly Bs and As)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Entering 400-Level</td>
                  <td className="px-4 py-3">105 units</td>
                  <td className="px-4 py-3">3.15</td>
                  <td className="px-4 py-3 font-bold text-danger">4.55 GPA</td>
                  <td className="px-4 py-3 text-danger font-semibold">Mathematically Impossible (Exceeds 4.50)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Entering 400-Level</td>
                  <td className="px-4 py-3">105 units</td>
                  <td className="px-4 py-3">3.38</td>
                  <td className="px-4 py-3 font-bold text-brand">3.92 GPA</td>
                  <td className="px-4 py-3 text-brand font-semibold">Achievable (Requires strong final year)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section id="continuous-assessment-tactics" className="space-y-4">
          <h2>4. Continuous Assessment (CA) Dominance</h2>
          <p>
            In Nigerian universities, the grading distribution typically allocates <strong>30% or 40%</strong> of the total grade to Continuous Assessment (tests, midterm exams, laboratory practicals, seminar presentations, and individual assignments) and <strong>60% or 70%</strong> to the final examination.
          </p>
          <p>
            Top students do not earn 2:1 degrees by relying solely on intense cramming during examination week. They lock in their A and B grades during the semester:
          </p>
          <ul>
            <li>If you score <strong>34 out of 40 in CA</strong>, you only need <strong>36 out of 60</strong> in the final examination to hit 70% and earn an A (5.0 GP).</li>
            <li>If you score a mediocre <strong>18 out of 40 in CA</strong>, you would need an almost impossible <strong>52 out of 60 (87%)</strong> in the examination hall just to salvage an A grade.</li>
          </ul>
        </section>

        <section id="tactical-checklist" className="space-y-4">
          <h2>5. Actionable Tactics: Past Questions &amp; Course Scheduling</h2>
          <p>
            Implement these proven operational tactics each term:
          </p>
          <ol>
            <li><strong>Solve 7 Years of Past Questions:</strong> Lecturers in Nigerian universities routinely structure examination questions around core pedagogical patterns. Solving the past 5 to 7 years of past exam papers reveals the exact topics, formats, and calculation methods preferred by each course professor.</li>
            <li><strong>Prioritize High-Credit Courses:</strong> Allocate your weekly study hours according to credit units. Earning an A in a 4-unit course produces 20.0 quality points, whereas an A in a 1-unit course yields only 5.0 quality points. Never spend equal study time on a 1-unit elective and a 4-unit departmental core.</li>
            <li><strong>Form High-Accountability Study Cohorts:</strong> Group study with colleagues who are actively pursuing First Class or 2:1 standing creates positive peer pressure and ensures you never miss test announcements or assignment submission deadlines.</li>
          </ol>
        </section>
      </SeoArticle>
    </div>
  );
}
