'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ResultPanel, BreakdownRow, CalculationLegalSource } from '@/components/ResultPanel';
import { FaqAccordion } from '@/components/FaqAccordion';
import { RelatedTools } from '@/components/RelatedTools';
import { SeoArticle, WorkedExampleItem, OfficialSourceLink } from '@/components/SeoArticle';
import { StructuredData } from '@/components/StructuredData';
import { getRelatedPages } from '@/config/pages';
import { calculateCgpa, CourseEntry } from '@/lib/ng/cgpa';
import { getNgRates } from '@/lib/seo/rules-content';
import { Plus, Trash2, GraduationCap, RotateCcw } from 'lucide-react';

interface SemesterState {
  id: string;
  name: string;
  courses: CourseEntry[];
}

const defaultSemesters: SemesterState[] = [
  {
    id: 'sem_1',
    name: 'Year 1, Semester 1',
    courses: [
      { id: 'c1', code: 'MTH 101', units: 3, grade: 'A' },
      { id: 'c2', code: 'PHY 101', units: 3, grade: 'B' },
      { id: 'c3', code: 'CHM 101', units: 3, grade: 'B' },
      { id: 'c4', code: 'BIO 101', units: 2, grade: 'A' },
      { id: 'c5', code: 'GST 101', units: 2, grade: 'A' },
    ],
  },
  {
    id: 'sem_2',
    name: 'Year 1, Semester 2',
    courses: [
      { id: 'c6', code: 'MTH 102', units: 3, grade: 'A' },
      { id: 'c7', code: 'PHY 102', units: 3, grade: 'A' },
      { id: 'c8', code: 'CHM 102', units: 3, grade: 'B' },
      { id: 'c9', code: 'GST 102', units: 2, grade: 'B' },
    ],
  },
];

export default function UniversityCgpaCalculator() {
  const ngRates = getNgRates();
  const [semesters, setSemesters] = useState<SemesterState[]>(defaultSemesters);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    try {
      const saved = localStorage.getItem('pay_ng_university_cgpa');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setSemesters(parsed);
        }
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  const saveToStorage = (updated: SemesterState[]) => {
    setSemesters(updated);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('pay_ng_university_cgpa', JSON.stringify(updated));
      } catch {
        // Ignore storage errors
      }
    }
  };

  const addSemester = () => {
    const nextNum = semesters.length + 1;
    const year = Math.ceil(nextNum / 2);
    const sem = nextNum % 2 === 1 ? 1 : 2;
    const newSem: SemesterState = {
      id: `sem_${Date.now()}`,
      name: `Year ${year}, Semester ${sem}`,
      courses: [
        { id: `c_${Date.now()}_1`, code: '', units: 3, grade: 'A' },
        { id: `c_${Date.now()}_2`, code: '', units: 3, grade: 'B' },
      ],
    };
    saveToStorage([...semesters, newSem]);
  };

  const removeSemester = (semId: string) => {
    if (semesters.length <= 1) return;
    saveToStorage(semesters.filter((s) => s.id !== semId));
  };

  const addCourse = (semId: string) => {
    const updated = semesters.map((s) => {
      if (s.id === semId) {
        return {
          ...s,
          courses: [...s.courses, { id: `c_${Date.now()}`, code: '', units: 3, grade: 'A' }],
        };
      }
      return s;
    });
    saveToStorage(updated);
  };

  const removeCourse = (semId: string, courseId: string) => {
    const updated = semesters.map((s) => {
      if (s.id === semId) {
        return {
          ...s,
          courses: s.courses.filter((c) => c.id !== courseId),
        };
      }
      return s;
    });
    saveToStorage(updated);
  };

  const updateCourse = (semId: string, courseId: string, field: 'code' | 'units' | 'grade', value: unknown) => {
    const updated = semesters.map((s) => {
      if (s.id === semId) {
        return {
          ...s,
          courses: s.courses.map((c) => {
            if (c.id === courseId) {
              return { ...c, [field]: value };
            }
            return c;
          }),
        };
      }
      return s;
    });
    saveToStorage(updated);
  };

  const resetAll = () => {
    saveToStorage(defaultSemesters);
  };

  // Compute overall CGPA
  const cgpaResult = useMemo(() => {
    return calculateCgpa(semesters);
  }, [semesters]);

  const rows: BreakdownRow[] = [
    {
      label: 'Cumulative Grade Point Average',
      value: `${cgpaResult.cgpa.toFixed(2)} / 5.00`,
      highlight: true,
      sublabel: 'Official NUC 5-point university scale',
    },
    {
      label: 'Degree Classification Award',
      value: cgpaResult.classification,
      highlight: true,
      sublabel:
        cgpaResult.cgpa >= ngRates.nucFirstClassMin
          ? 'First Class Honours'
          : cgpaResult.cgpa >= ngRates.nucSecondClassUpperMin
          ? 'Second Class Honours (Upper Division)'
          : cgpaResult.cgpa >= ngRates.nucSecondClassLowerMin
          ? 'Second Class Honours (Lower Division)'
          : 'Third Class Honours',
    },
    {
      label: 'Total Registered Credit Units (TCC)',
      value: `${cgpaResult.totalUnits} Units`,
      sublabel: 'Total course credit units attempted',
    },
    {
      label: 'Total Quality Points (TQP)',
      value: `${cgpaResult.totalQualityPoints.toFixed(1)} Points`,
      sublabel: 'Sum of (Credit Units × Grade Point)',
    },
    {
      label: 'Completed Semesters Analyzed',
      value: `${semesters.length} Semesters`,
    },
  ];

  const legalSources: CalculationLegalSource[] = [
    {
      title: 'National Universities Commission (NUC)',
      documentNumber: 'BMAS & CCMAS Grading Benchmark Guidelines',
      summary: `Codifies the 5-point grading standard: A=5, B=4, C=3, D=2, E=1, F=0. Minimum graduation cutoff is CGPA 1.00 (Pass) or 1.50 (Third Class).`,
    },
  ];

  const copySummaryText = `Nigerian University CGPA Summary (NUC 5.0 Scale):
Cumulative CGPA: ${cgpaResult.cgpa.toFixed(2)} / 5.00
Degree Classification: ${cgpaResult.classification}
Total Credit Units: ${cgpaResult.totalUnits}
Total Quality Points: ${cgpaResult.totalQualityPoints.toFixed(1)}
Semesters: ${semesters.length}
Calculated on Pay (https://pay.zetawala.com/nigeria/cgpa-calculator/)`;

  const related = getRelatedPages('ng-cgpa');

  const faqs = [
    {
      question: 'How is CGPA calculated in Nigerian universities?',
      answer:
        'CGPA is calculated by dividing your Total Quality Points (TQP) by your Total Credit Units (TCU) across all semesters completed: CGPA = Total Quality Points ÷ Total Credit Units. Each course’s Quality Points equal its course unit weight multiplied by the grade point earned (A=5, B=4, C=3, D=2, E=1, F=0).',
    },
    {
      question: 'What CGPA is required for First Class Honours in Nigeria?',
      answer:
        'Under National Universities Commission (NUC) standards, First Class Honours requires a Cumulative Grade Point Average of 4.50 to 5.00 on the 5-point scale.',
    },
    {
      question: 'What is the cutoff for Second Class Upper (2:1)?',
      answer:
        'Second Class Honours (Upper Division), commonly known as a 2:1 degree, requires a CGPA between 3.50 and 4.49.',
    },
    {
      question: 'What is the cutoff for Second Class Lower (2:2)?',
      answer:
        'Second Class Honours (Lower Division), commonly known as a 2:2 degree, requires a CGPA between 2.40 and 3.49 under the NUC benchmark.',
    },
    {
      question: 'How do carryover courses affect your CGPA in Nigeria?',
      answer:
        'When you fail a course (grade F with 0 grade points), the credit units are still counted in your Total Credit Units (TCU). When you re-register and pass the carryover course, the new grade points and credit units are added to your cumulative record under NUC standards.',
    },
    {
      question: 'Has the NUC abolished the Pass degree in Nigeria?',
      answer:
        'Yes. The National Universities Commission abolished the Pass degree (CGPA 1.00–1.49) for all undergraduate programmes entering tertiary education since 2013. The lowest graduating degree classification is now Third Class Honours (1.50–2.39).',
    },
    {
      question: 'What is the CCMAS grading policy?',
      answer:
        'The Core Curriculum and Minimum Academic Standards (CCMAS) introduced by the NUC retains the 5-point cumulative grade point scale while standardizing 70% of degree content nationally, leaving 30% for institutional specialization.',
    },
    {
      question: 'Does this calculator save my courses automatically?',
      answer:
        'Yes. All entered semesters, courses, units, and grades are automatically stored locally in your browser storage so you can track your academic progress throughout your university programme.',
    },
  ];

  const workedExamples: WorkedExampleItem[] = [
    {
      title: 'First-Year Engineering Student (24 Units)',
      scenario: 'A 100-level engineering student completing two semesters with high marks in core sciences.',
      inputs: [
        { label: 'Total Credit Units Registered', value: '24 Units' },
        { label: 'Grade Distribution', value: '12 Units of A, 12 Units of B' },
      ],
      steps: [
        { label: 'Quality Points for Grade A Courses', formula: '12 units × 5.0 points', value: '60.0 QP' },
        { label: 'Quality Points for Grade B Courses', formula: '12 units × 4.0 points', value: '48.0 QP' },
        { label: 'Total Quality Points (TQP)', formula: '60.0 + 48.0', value: '108.0 QP' },
        { label: 'CGPA Computation', formula: '108.0 QP ÷ 24 Units', value: '4.50 / 5.00', highlight: true },
      ],
      resultLabel: 'Degree Classification Award',
      resultValue: 'First Class Honours',
      notes: 'Meets the exact NUC 4.50 First Class threshold.',
    },
    {
      title: 'Faculty of Social Sciences Student (30 Units)',
      scenario: 'A student completing 30 credit units with a mixture of A, B, and C grades.',
      inputs: [
        { label: 'Total Credit Units Registered', value: '30 Units' },
        { label: 'Grade Distribution', value: '6 Units of A, 18 Units of B, 6 Units of C' },
      ],
      steps: [
        { label: 'Quality Points for Grade A', formula: '6 units × 5.0', value: '30.0 QP' },
        { label: 'Quality Points for Grade B', formula: '18 units × 4.0', value: '72.0 QP' },
        { label: 'Quality Points for Grade C', formula: '6 units × 3.0', value: '18.0 QP' },
        { label: 'Total Quality Points (TQP)', formula: '30 + 72 + 18', value: '120.0 QP' },
        { label: 'CGPA Computation', formula: '120.0 QP ÷ 30 Units', value: '4.00 / 5.00', highlight: true },
      ],
      resultLabel: 'Degree Classification Award',
      resultValue: 'Second Class Upper (2:1)',
      notes: 'Strong 2:1 honours positioning.',
    },
  ];

  const officialSources: OfficialSourceLink[] = [
    {
      name: 'National Universities Commission (NUC)',
      documentTitle: 'Benchmark Minimum Academic Standards (BMAS & CCMAS)',
      url: 'https://www.nuc.edu.ng',
      verifiedDate: ngRates.verifiedDate,
    },
  ];

  const quickAnswerText = `Under official National Universities Commission (NUC) standards, Cumulative Grade Point Average (CGPA) is calculated by dividing total Quality Points (QP) by total Credit Units (CU) on a 5.0 scale. First Class Honours requires a CGPA of 4.50 to 5.00, and Second Class Upper (2:1) requires 3.50 to 4.49.`;

  const tocItems = [
    { id: 'cgpa-formula', label: 'The NUC CGPA Formula' },
    { id: 'grading-scale', label: 'Official 5-Point Grade Point Scale' },
    { id: 'degree-classifications', label: 'NUC Degree Classifications & Cutoffs' },
    { id: 'carryover-handling', label: 'Carryover Courses & Repeated Units' },
    { id: 'ccmas-updates', label: 'CCMAS Academic Benchmark Guidelines' },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <StructuredData
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Nigeria', url: '/nigeria/' },
          { name: 'CGPA Calculator (5.0 Scale)', url: '/nigeria/cgpa-calculator/' },
        ]}
        webApp={{
          name: 'CGPA Calculator for Nigerian Universities (5.0 Scale)',
          url: '/nigeria/cgpa-calculator/',
          description: 'Calculate your cumulative GPA on the official NUC 5.0 scale across multiple semesters with unit weighting.',
          applicationCategory: 'EducationalApplication',
        }}
        faqs={faqs}
      />

      <Breadcrumbs
        items={[
          { label: 'Nigeria', href: '/nigeria/' },
          { label: 'University CGPA Calculator (5.0)' },
        ]}
      />

      {/* Page Header */}
      <div className="border-b border-neutral-200 pb-6 pt-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
          CGPA Calculator for Nigerian Universities (5.0 Scale)
        </h1>
        <p className="mt-2 text-sm sm:text-base text-neutral-600 max-w-3xl leading-relaxed">
          Calculate your semester GPA and cumulative CGPA using the official National Universities Commission (NUC) 5-point grading system. Accurately factors in course credit units and degree classification awards.
        </p>
      </div>

      {/* Main Grid: Inputs Left, Result Right */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Inputs Column */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-neutral-900">Semesters &amp; Course Units</h2>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={resetAll}
                className="inline-flex items-center gap-1 rounded-md border border-neutral-200 bg-white px-2.5 py-1 text-xs font-semibold text-neutral-600 hover:bg-neutral-50 shadow-2xs"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Reset Sample</span>
              </button>
              <button
                type="button"
                onClick={addSemester}
                className="inline-flex items-center gap-1 rounded-md bg-brand px-3 py-1 text-xs font-bold text-white shadow-2xs hover:bg-brand-strong"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add Semester</span>
              </button>
            </div>
          </div>

          {/* Semesters Cards */}
          <div className="space-y-6">
            {semesters.map((sem, sIdx) => {
              const semRes = cgpaResult.semesters[sIdx];
              return (
                <div key={sem.id} className="rounded-xl border border-neutral-200 bg-white p-5 shadow-2xs">
                  <div className="flex items-center justify-between border-b border-neutral-100 pb-3 mb-4">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-brand" />
                      <h3 className="text-sm font-bold text-neutral-900">{sem.name}</h3>
                    </div>
                    <div className="flex items-center gap-3">
                      {semRes && (
                        <span className="text-xs font-semibold text-brand-strong bg-brand-soft/30 px-2 py-0.5 rounded">
                          GPA: {semRes.gpa.toFixed(2)} ({semRes.totalUnits} Units)
                        </span>
                      )}
                      {semesters.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeSemester(sem.id)}
                          className="text-neutral-400 hover:text-red-600 transition-colors"
                          title="Delete Semester"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Course rows table */}
                  <div className="space-y-2">
                    <div className="grid grid-cols-12 gap-2 text-2xs font-bold uppercase tracking-wider text-neutral-500 px-1">
                      <div className="col-span-5">Course Code / Title</div>
                      <div className="col-span-3 text-center">Credit Units</div>
                      <div className="col-span-3 text-center">Grade</div>
                      <div className="col-span-1"></div>
                    </div>

                    {sem.courses.map((course) => (
                      <div key={course.id} className="grid grid-cols-12 gap-2 items-center">
                        <div className="col-span-5">
                          <input
                            type="text"
                            value={course.code}
                            onChange={(e) => updateCourse(sem.id, course.id, 'code', e.target.value)}
                            placeholder="e.g. MTH 101"
                            className="w-full rounded-md border border-neutral-200 px-2.5 py-1.5 text-xs text-neutral-900 focus:border-brand focus:outline-hidden"
                          />
                        </div>
                        <div className="col-span-3">
                          <select
                            value={course.units}
                            onChange={(e) => updateCourse(sem.id, course.id, 'units', parseInt(e.target.value, 10))}
                            className="w-full rounded-md border border-neutral-200 px-2 py-1.5 text-xs text-neutral-900 focus:border-brand focus:outline-hidden text-center"
                          >
                            <option value={1}>1 Unit</option>
                            <option value={2}>2 Units</option>
                            <option value={3}>3 Units</option>
                            <option value={4}>4 Units</option>
                            <option value={5}>5 Units</option>
                            <option value={6}>6 Units</option>
                          </select>
                        </div>
                        <div className="col-span-3">
                          <select
                            value={course.grade}
                            onChange={(e) => updateCourse(sem.id, course.id, 'grade', e.target.value)}
                            className="w-full rounded-md border border-neutral-200 px-2 py-1.5 text-xs text-neutral-900 focus:border-brand focus:outline-hidden text-center font-bold"
                          >
                            <option value="A">A (5.0)</option>
                            <option value="B">B (4.0)</option>
                            <option value="C">C (3.0)</option>
                            <option value="D">D (2.0)</option>
                            <option value="E">E (1.0)</option>
                            <option value="F">F (0.0)</option>
                          </select>
                        </div>
                        <div className="col-span-1 text-right">
                          {sem.courses.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeCourse(sem.id, course.id)}
                              className="text-neutral-300 hover:text-red-500 transition-colors p-1"
                              title="Delete Course"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 pt-3 border-t border-neutral-100">
                    <button
                      type="button"
                      onClick={() => addCourse(sem.id)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-brand-strong hover:underline"
                    >
                      <Plus className="h-3 w-3" />
                      <span>Add Course</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Sticky Result Column */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
          <ResultPanel
            title="Academic Standing Summary"
            headlineLabel="Cumulative CGPA"
            headlineValue={`${cgpaResult.cgpa.toFixed(2)}`}
            subHeadline={`Award: ${cgpaResult.classification}`}
            rows={rows}
            sources={legalSources}
            copySummaryText={copySummaryText}
            shareTitle="Nigerian University CGPA"
            calloutMessage={
              cgpaResult.cgpa >= ngRates.nucFirstClassMin
                ? {
                    type: 'success',
                    text: 'First Class Standing: Your CGPA is currently 4.50 or above, qualifying for First Class Honours.',
                  }
                : undefined
            }
          />
        </div>
      </div>

      {/* SEO Article */}
      <SeoArticle
        quickAnswer={quickAnswerText}
        toc={tocItems}
        workedExamples={workedExamples}
        sources={officialSources}
        verifiedDate={ngRates.verifiedDate}
      >
        <h2 id="cgpa-formula">The Official NUC CGPA Formula</h2>
        <p>
          In Nigerian universities, your academic performance across semesters is measured using the Cumulative Grade Point Average (CGPA). Under the standards established by the National Universities Commission (NUC), CGPA is computed using the weighted credit unit system.
        </p>
        <p>
          The governing mathematical formula is:
        </p>
        <div className="not-prose my-4 rounded-lg bg-neutral-900 p-4 font-mono text-sm text-brand-light">
          CGPA = Total Quality Points (TQP) ÷ Total Credit Units (TCU)
        </div>
        <p>
          Where each course’s <em>Quality Points</em> equal its Credit Units (CU) multiplied by the Grade Point (GP) earned. For example, earning an &quot;A&quot; in a 3-unit course yields 15 Quality Points (3 × 5 = 15).
        </p>

        <h2 id="grading-scale">Official 5-Point Grade Point Scale</h2>
        <p>
          The standard NUC grading benchmark maps percentage examination marks to letter grades and numerical grade points:
        </p>

        <div className="not-prose my-6 overflow-x-auto rounded-xl border border-neutral-200">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-100 text-neutral-800 uppercase font-bold">
              <tr>
                <th className="p-3">Score Range (%)</th>
                <th className="p-3">Letter Grade</th>
                <th className="p-3">Grade Point (GP)</th>
                <th className="p-3">Academic Definition</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 text-neutral-700">
              <tr>
                <td className="p-3">70% – 100%</td>
                <td className="p-3 font-bold text-neutral-900">A</td>
                <td className="p-3 font-bold text-brand-strong">5.00</td>
                <td className="p-3">Excellent</td>
              </tr>
              <tr>
                <td className="p-3">60% – 69%</td>
                <td className="p-3 font-bold text-neutral-900">B</td>
                <td className="p-3 font-semibold">4.00</td>
                <td className="p-3">Very Good</td>
              </tr>
              <tr>
                <td className="p-3">50% – 59%</td>
                <td className="p-3 font-bold text-neutral-900">C</td>
                <td className="p-3 font-semibold">3.00</td>
                <td className="p-3">Good</td>
              </tr>
              <tr>
                <td className="p-3">45% – 49%</td>
                <td className="p-3 font-bold text-neutral-900">D</td>
                <td className="p-3 font-semibold">2.00</td>
                <td className="p-3">Fair / Average</td>
              </tr>
              <tr>
                <td className="p-3">40% – 44%</td>
                <td className="p-3 font-bold text-neutral-900">E</td>
                <td className="p-3 font-semibold">1.00</td>
                <td className="p-3">Pass</td>
              </tr>
              <tr>
                <td className="p-3">0% – 39%</td>
                <td className="p-3 font-bold text-red-700">F</td>
                <td className="p-3 font-bold text-red-700">0.00</td>
                <td className="p-3">Fail</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 id="degree-classifications">NUC Degree Classifications &amp; Cutoffs</h2>
        <p>
          Upon completion of your undergraduate degree programme, your final cumulative CGPA determines your graduation degree class:
        </p>
        <ul>
          <li><strong>First Class Honours:</strong> 4.50 – 5.00 CGPA. The highest academic distinction in Nigerian tertiary education.</li>
          <li><strong>Second Class Honours (Upper Division / 2:1):</strong> 3.50 – 4.49 CGPA. Qualifies candidates for top corporate graduate trainee schemes and international postgraduate scholarships.</li>
          <li><strong>Second Class Honours (Lower Division / 2:2):</strong> 2.40 – 3.49 CGPA. Standard honours degree award.</li>
          <li><strong>Third Class Honours:</strong> 1.50 – 2.39 CGPA. Lowest honours classification awarded under current NUC guidelines.</li>
        </ul>

        <h2 id="carryover-handling">Carryover Courses &amp; Repeated Units</h2>
        <p>
          A common source of confusion is how carryover courses (courses with an initial grade of F) affect your cumulative standing. In Nigerian universities, failing a course does not erase the credit units from your cumulative record.
        </p>
        <p>
          The original credit units remain in your Total Credit Units (TCU) with zero quality points. When you register the carryover course in a subsequent semester and pass it, both the new credit units and the newly earned quality points are added to your cumulative total.
        </p>

        <h2 id="ccmas-updates">CCMAS Academic Benchmark Guidelines</h2>
        <p>
          The Core Curriculum and Minimum Academic Standards (CCMAS) implemented by the National Universities Commission modernizes undergraduate degree programmes while preserving the 5.0 CGPA scale. It emphasizes practical skills and continuous assessment while enforcing rigorous external moderation across all federal, state, and private universities in Nigeria.
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
