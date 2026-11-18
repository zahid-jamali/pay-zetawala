import React from 'react';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SeoArticle, WorkedExampleItem, OfficialSourceLink } from '@/components/SeoArticle';
import { StructuredData } from '@/components/StructuredData';
import { getNgRates } from '@/lib/seo/rules-content';
import { BookOpen, Calculator, PenTool, Award, HelpCircle } from 'lucide-react';

export default function GuideHowToCalculateCgpaManually() {
  const ngRates = getNgRates();

  const faqs = [
    {
      question: 'Why should I never average my two semester GPAs to find my CGPA?',
      answer:
        'Averaging semester GPAs directly (e.g., [4.00 + 3.00] ÷ 2 = 3.50) is mathematically wrong unless both semesters carried the exact same number of credit units. Under the NUC weighted credit system, you must sum all quality points across both semesters and divide by the total credit units registered.',
    },
    {
      question: 'What are Quality Points (QP) and how are they calculated?',
      answer:
        'Quality Points represent the weighted value of a course. Multiply the course’s Credit Units (CU) by the numerical Grade Point (GP) earned: Quality Points = Credit Units × Grade Point. For example, earning an A (5.0 GP) in a 3-unit course generates exactly 15.0 quality points.',
    },
    {
      question: 'What happens to my CGPA if I score an F grade?',
      answer:
        'An F grade awards 0.00 quality points, but the credit units of the failed course remain in your cumulative credit units denominator. This lowers your CGPA immediately.',
    },
    {
      question: 'When I retake and pass a carryover course, is the previous F removed?',
      answer:
        'Under standard National Universities Commission (NUC) guidelines, the initial F grade remains on your official academic transcript. When you retake the course, the new grade points and units are added to your cumulative total, diluting the original failure with positive quality points.',
    },
    {
      question: 'How do 1-unit and 2-unit elective courses affect my CGPA?',
      answer:
        'Every registered course on your approved course form contributes to your Total Credit Units and Total Quality Points. While 1-unit courses carry less mathematical weight than 4-unit core subjects, multiple A grades in 1-unit and 2-unit electives provide vital incremental quality points.',
    },
  ];

  const workedExamples: WorkedExampleItem[] = [
    {
      title: 'Manual Calculation for Semester 1 (15 Total Credit Units)',
      scenario:
        'A 100-level university student completes 5 courses totaling 15 credit units, scoring 3 A grades, 1 B grade, and 1 C grade.',
      inputs: [
        { label: 'System', value: 'NUC 5.0 Scale' },
        { label: 'Total Courses Registered', value: '5 courses' },
        { label: 'Total Registered Units (TCU)', value: '15 units' },
      ],
      steps: [
        { label: 'MTH 101 (3 units × Grade A 5.0)', formula: '3 × 5.0 GP', value: '15.00 QP' },
        { label: 'PHY 101 (3 units × Grade A 5.0)', formula: '3 × 5.0 GP', value: '15.00 QP' },
        { label: 'CHM 101 (3 units × Grade B 4.0)', formula: '3 × 4.0 GP', value: '12.00 QP' },
        { label: 'BIO 101 (3 units × Grade A 5.0)', formula: '3 × 5.0 GP', value: '15.00 QP' },
        { label: 'GST 101 (3 units × Grade C 3.0)', formula: '3 × 3.0 GP', value: '9.00 QP' },
        { label: 'Total Quality Points (TQP)', formula: '15 + 15 + 12 + 15 + 9', value: '66.00 QP', highlight: true },
        { label: 'Semester GPA Formula', formula: '66.00 TQP ÷ 15 TCU', value: '4.40 GPA' },
      ],
      resultLabel: 'First Semester GPA',
      resultValue: '4.40 GPA',
      notes: 'Strong Second Class Upper performance.',
    },
    {
      title: 'Calculating Cumulative CGPA Across Both Semesters (Year 1)',
      scenario:
        'The same student completes Semester 2 with 18 credit units and 81.00 quality points (Semester 2 GPA = 4.50).',
      inputs: [
        { label: 'Semester 1 Record', value: '15 units • 66.00 QP (4.40 GPA)' },
        { label: 'Semester 2 Record', value: '18 units • 81.00 QP (4.50 GPA)' },
      ],
      steps: [
        { label: 'Cumulative Credit Units (CCU)', formula: '15 units + 18 units', value: '33 credit units' },
        { label: 'Cumulative Quality Points (CQP)', formula: '66.00 QP + 81.00 QP', value: '147.00 QP', highlight: true },
        { label: 'Cumulative CGPA Formula', formula: '147.00 CQP ÷ 33 CCU', value: '4.45 CGPA', highlight: true },
        { label: 'Incorrect Simple Average', formula: '(4.40 + 4.50) ÷ 2', value: '4.45 (Fluke match due to unit proximity)' },
      ],
      resultLabel: 'Year 1 Cumulative CGPA',
      resultValue: '4.45 CGPA',
      notes: 'Just 0.05 points shy of First Class Honours (4.50).',
    },
  ];

  const officialSources: OfficialSourceLink[] = [
    {
      name: 'National Universities Commission (NUC)',
      documentTitle: 'Benchmark Minimum Academic Standards (BMAS) & CCMAS Grading Guidelines',
      url: 'https://www.nuc.edu.ng',
      verifiedDate: ngRates.verifiedDate,
    },
    {
      name: 'Committee of Vice-Chancellors of Nigerian Universities (CVCNU)',
      documentTitle: 'Academic Transcript & Credit System Regulatory Framework',
      url: 'https://cvcnu.org',
      verifiedDate: ngRates.verifiedDate,
    },
  ];

  const toc = [
    { id: 'fundamental-terms', label: '1. The Core Vocabulary: CU, GP, QP, TCU & TQP' },
    { id: 'grade-point-scale', label: '2. The Official NUC 5.0 Grade Point Scale' },
    { id: 'step-by-step-gpa', label: '3. Step-by-Step Guide: Calculating Single Semester GPA' },
    { id: 'combining-semesters', label: '4. How to Calculate Cumulative CGPA Across Semesters' },
    { id: 'common-mistakes', label: '5. Common Errors: Why Simple Averages Fail' },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <StructuredData
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Nigeria', url: '/nigeria/' },
          { name: 'Guides', url: '/nigeria/' },
          { name: 'How to Calculate CGPA Manually', url: '/nigeria/guides/how-to-calculate-cgpa-manually/' },
        ]}
        article={{
          headline: 'How to Calculate CGPA Manually in Nigeria (Pen & Paper Guide)',
          description: 'A step-by-step mathematical guide to calculating Grade Point Average using Credit Units, Quality Points, and Total Credit Units with worked examples.',
          url: 'https://pay.zetawala.com/nigeria/guides/how-to-calculate-cgpa-manually/',
          datePublished: '2026-03-20T08:00:00+01:00',
          dateModified: '2026-11-18T00:00:00+01:00',
        }}
        faqs={faqs}
      />

      <Breadcrumbs
        items={[
          { label: 'Nigeria', href: '/nigeria/' },
          { label: 'Guides', href: '/nigeria/' },
          { label: 'Calculate CGPA Manually' },
        ]}
      />

      <header className="border-b border-neutral-200 pb-6 pt-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft px-3 py-1 text-xs font-semibold text-brand-strong mb-2">
          <PenTool className="h-3.5 w-3.5 text-brand" />
          <span>Academic Math Primer</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
          How to Calculate CGPA Manually in Nigeria
        </h1>
        <p className="mt-2 text-sm sm:text-base text-neutral-600 leading-relaxed">
          Master the exact pen-and-paper formulas for Credit Units, Grade Points, and Quality Points under the National Universities Commission (NUC) 5.0 grading system.
        </p>
      </header>

      {/* Tool Shortcut */}
      <div className="mt-6 rounded-xl border border-brand/30 bg-brand-soft/20 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-bold text-neutral-900">Prefer an automated tool?</h2>
          <p className="text-xs text-neutral-600">Enter your course grades into our multi-semester calculator to get your CGPA instantly.</p>
        </div>
        <Link
          href="/nigeria/cgpa-calculator/"
          className="inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-brand-strong transition-colors shrink-0"
        >
          <Calculator className="h-4 w-4" />
          <span>University CGPA Calculator</span>
        </Link>
      </div>

      <SeoArticle
        quickAnswer="To calculate CGPA manually: (1) multiply each course’s Credit Units by its Grade Point (A=5, B=4, C=3, D=2, E=1, F=0) to get Quality Points, (2) sum all Quality Points to get Total Quality Points (TQP), (3) sum all units to get Total Credit Units (TCU), and (4) divide TQP by TCU. Repeat across all semesters using cumulative totals."
        toc={toc}
        workedExamples={workedExamples}
        sources={officialSources}
        verifiedDate={ngRates.verifiedDate}
      >
        <section id="fundamental-terms" className="space-y-4">
          <h2>1. The Core Vocabulary: CU, GP, QP, TCU &amp; TQP</h2>
          <p>
            Before calculating your academic standing with pen and paper, you must understand the five fundamental terms used across all Nigerian tertiary institutions:
          </p>
          <ul>
            <li><strong>Credit Units (CU):</strong> The institutional weight assigned to a course based on weekly lecture, laboratory, or tutorial hours (typically 1 to 6 units).</li>
            <li><strong>Grade Point (GP):</strong> The numerical value corresponding to your earned letter grade (e.g., A = 5.0, B = 4.0).</li>
            <li><strong>Quality Points (QP):</strong> The product of Credit Units and Grade Points for a single course: <code>QP = CU × GP</code>.</li>
            <li><strong>Total Credit Units (TCU):</strong> The sum of all credit units registered in a semester.</li>
            <li><strong>Total Quality Points (TQP):</strong> The sum of all quality points generated by all courses in that semester.</li>
          </ul>
        </section>

        <section id="grade-point-scale" className="space-y-4">
          <h2>2. The Official NUC 5.0 Grade Point Scale</h2>
          <p>
            Under the benchmark standards of the National Universities Commission (NUC), percentage marks earned in continuous assessments (CA) and final examinations translate into the following standard 5-point scale:
          </p>
          <div className="overflow-x-auto rounded-lg border border-neutral-200 my-4">
            <table className="w-full text-left text-sm text-neutral-700">
              <thead className="bg-neutral-100 text-xs font-bold uppercase text-neutral-800">
                <tr>
                  <th className="px-4 py-3">Percentage Score</th>
                  <th className="px-4 py-3">Letter Grade</th>
                  <th className="px-4 py-3">Grade Point (GP)</th>
                  <th className="px-4 py-3">Academic Performance Level</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                <tr>
                  <td className="px-4 py-3 font-medium">70% – 100%</td>
                  <td className="px-4 py-3 font-bold text-brand">A</td>
                  <td className="px-4 py-3 font-bold">5.00</td>
                  <td className="px-4 py-3">Excellent</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">60% – 69%</td>
                  <td className="px-4 py-3 font-bold">B</td>
                  <td className="px-4 py-3 font-bold">4.00</td>
                  <td className="px-4 py-3">Very Good</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">50% – 59%</td>
                  <td className="px-4 py-3 font-bold">C</td>
                  <td className="px-4 py-3 font-bold">3.00</td>
                  <td className="px-4 py-3">Good</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">45% – 49%</td>
                  <td className="px-4 py-3 font-bold">D</td>
                  <td className="px-4 py-3 font-bold">2.00</td>
                  <td className="px-4 py-3">Fair</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">40% – 44%</td>
                  <td className="px-4 py-3 font-bold">E</td>
                  <td className="px-4 py-3 font-bold">1.00</td>
                  <td className="px-4 py-3">Pass</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">0% – 39%</td>
                  <td className="px-4 py-3 font-bold text-danger">F</td>
                  <td className="px-4 py-3 font-bold text-danger">0.00</td>
                  <td className="px-4 py-3 text-danger font-semibold">Fail</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section id="step-by-step-gpa" className="space-y-4">
          <h2>3. Step-by-Step Guide: Calculating Single Semester GPA</h2>
          <p>
            To compute your GPA on paper at the end of a semester:
          </p>
          <ol>
            <li>Draw a table with four columns: Course Code, Credit Units (CU), Grade Point (GP), and Quality Points (QP).</li>
            <li>For each course, multiply CU by GP to determine its QP.</li>
            <li>Add all numbers in the Credit Units column to get your <strong>Total Credit Units (TCU)</strong>.</li>
            <li>Add all numbers in the Quality Points column to get your <strong>Total Quality Points (TQP)</strong>.</li>
            <li>Divide TQP by TCU: <code>Semester GPA = TQP ÷ TCU</code>. Round to two decimal places.</li>
          </ol>
        </section>

        <section id="combining-semesters" className="space-y-4">
          <h2>4. How to Calculate Cumulative CGPA Across Semesters</h2>
          <p>
            Your Cumulative Grade Point Average (CGPA) represents your continuous academic performance from 100-level up to the current semester:
          </p>
          <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 font-mono text-sm text-neutral-800">
            <code>Cumulative CGPA = (Total Cumulative Quality Points from ALL Semesters) ÷ (Total Cumulative Credit Units from ALL Semesters)</code>
          </div>
          <p>
            For example, if you earned 65.00 QP across 15 units in Semester 1, and 85.00 QP across 20 units in Semester 2:
          </p>
          <ul>
            <li>Cumulative Quality Points = 65.00 + 85.00 = 150.00 QP</li>
            <li>Cumulative Credit Units = 15 + 20 = 35 units</li>
            <li>CGPA = 150.00 ÷ 35 = <strong>4.29 CGPA</strong></li>
          </ul>
        </section>

        <section id="common-mistakes" className="space-y-4">
          <h2>5. Common Errors: Why Simple Averages Fail</h2>
          <p>
            The single most pervasive calculation blunder committed by university students is taking the simple average of their semester GPAs:
          </p>
          <p>
            Imagine a student has a 4.00 GPA in Semester 1 (10 units) and a 3.00 GPA in Semester 2 (20 units). Taking the simple average yields (4.00 + 3.00) ÷ 2 = 3.50.
          </p>
          <p>
            However, calculating via the official weighted credit system:
          </p>
          <ul>
            <li>Semester 1 QP = 10 × 4.0 = 40.0 QP</li>
            <li>Semester 2 QP = 20 × 3.0 = 60.0 QP</li>
            <li>Total QP = 100.0 QP over 30 units</li>
            <li>True CGPA = 100.0 ÷ 30 = <strong>3.33 CGPA</strong></li>
          </ul>
          <p>
            Because Semester 2 carried twice as many credit units, its lower performance dominates the cumulative average. Always use cumulative quality points divided by cumulative units.
          </p>
        </section>
      </SeoArticle>
    </div>
  );
}
