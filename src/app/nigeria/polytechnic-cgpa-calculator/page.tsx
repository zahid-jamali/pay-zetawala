'use client';

import React, { useState, useMemo } from 'react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ResultPanel, BreakdownRow, CalculationLegalSource } from '@/components/ResultPanel';
import { FaqAccordion } from '@/components/FaqAccordion';
import { RelatedTools } from '@/components/RelatedTools';
import { SeoArticle, WorkedExampleItem, OfficialSourceLink } from '@/components/SeoArticle';
import { StructuredData } from '@/components/StructuredData';
import { getRelatedPages } from '@/config/pages';
import { calculateCgpa, CourseEntry } from '@/lib/ng/cgpa';
import { getNgRates } from '@/lib/seo/rules-content';
import { Plus, Trash2, Award } from 'lucide-react';

interface PolytechnicSemester {
  id: string;
  name: string;
  courses: CourseEntry[];
}

const defaultPolySemesters: PolytechnicSemester[] = [
  {
    id: 'poly_sem_1',
    name: 'ND 1, Semester 1',
    courses: [
      { id: 'p1', code: 'COM 111', units: 3, grade: 'A' },
      { id: 'p2', code: 'COM 112', units: 3, grade: 'AB' },
      { id: 'p3', code: 'COM 113', units: 2, grade: 'B' },
      { id: 'p4', code: 'GNS 101', units: 2, grade: 'BC' },
      { id: 'p5', code: 'MTH 111', units: 3, grade: 'C' },
    ],
  },
  {
    id: 'poly_sem_2',
    name: 'ND 1, Semester 2',
    courses: [
      { id: 'p6', code: 'COM 121', units: 3, grade: 'A' },
      { id: 'p7', code: 'COM 122', units: 3, grade: 'AB' },
      { id: 'p8', code: 'COM 123', units: 3, grade: 'B' },
      { id: 'p9', code: 'GNS 102', units: 2, grade: 'AB' },
    ],
  },
];

export default function PolytechnicCgpaCalculator() {
  const ngRates = getNgRates();
  const [semesters, setSemesters] = useState<PolytechnicSemester[]>(defaultPolySemesters);

  const cgpaResult = useMemo(() => {
    return calculateCgpa(semesters, 'polytechnic_4_point');
  }, [semesters]);

  const addSemester = () => {
    const semNum = semesters.length + 1;
    const year = Math.ceil(semNum / 2);
    const sem = semNum % 2 === 1 ? 1 : 2;
    const level = year <= 2 ? `ND ${year}` : `HND ${year - 2}`;
    const newSem: PolytechnicSemester = {
      id: `poly_sem_${Date.now()}`,
      name: `${level}, Semester ${sem}`,
      courses: [
        { id: `c_${Date.now()}_1`, code: '', units: 3, grade: 'A' },
        { id: `c_${Date.now()}_2`, code: '', units: 3, grade: 'AB' },
        { id: `c_${Date.now()}_3`, code: '', units: 2, grade: 'B' },
      ],
    };
    setSemesters([...semesters, newSem]);
  };

  const removeSemester = (id: string) => {
    if (semesters.length <= 1) return;
    setSemesters(semesters.filter((s) => s.id !== id));
  };

  const addCourse = (semId: string) => {
    setSemesters(
      semesters.map((s) => {
        if (s.id === semId) {
          return {
            ...s,
            courses: [...s.courses, { id: `c_${Date.now()}`, code: '', units: 3, grade: 'AB' }],
          };
        }
        return s;
      })
    );
  };

  const removeCourse = (semId: string, courseId: string) => {
    setSemesters(
      semesters.map((s) => {
        if (s.id === semId) {
          return {
            ...s,
            courses: s.courses.filter((c) => c.id !== courseId),
          };
        }
        return s;
      })
    );
  };

  const updateCourse = (semId: string, courseId: string, field: 'code' | 'units' | 'grade', value: unknown) => {
    setSemesters(
      semesters.map((s) => {
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
      })
    );
  };

  const rows: BreakdownRow[] = [
    {
      label: 'Cumulative Grade Point Average',
      value: `${cgpaResult.cgpa.toFixed(2)} / 4.00`,
      highlight: true,
      sublabel: 'Official NBTE 4-point polytechnic scale',
    },
    {
      label: 'Diploma Classification Award',
      value: cgpaResult.classification,
      highlight: true,
      sublabel:
        cgpaResult.cgpa >= ngRates.nbteDistinctionMin
          ? 'Distinction Award'
          : cgpaResult.cgpa >= ngRates.nbteUpperCreditMin
          ? 'Upper Credit Award'
          : cgpaResult.cgpa >= ngRates.nbteLowerCreditMin
          ? 'Lower Credit Award'
          : 'Pass Award',
    },
    {
      label: 'Total Registered Course Units',
      value: `${cgpaResult.totalUnits} Units`,
    },
    {
      label: 'Total Quality Points (TQP)',
      value: `${cgpaResult.totalQualityPoints.toFixed(2)} Points`,
    },
    {
      label: 'Completed Semesters Analyzed',
      value: `${semesters.length} Semesters`,
    },
  ];

  const legalSources: CalculationLegalSource[] = [
    {
      title: 'National Board for Technical Education (NBTE)',
      documentNumber: 'Standards for Curriculum & Evaluation in Polytechnics',
      summary: 'Codifies the 4.0 grade point standard: A=4.0, AB=3.5, B=3.25, BC=3.0, C=2.75, CD=2.5, D=2.25, E=2.0, F=0.0. Distinction cutoff is 3.50.',
    },
  ];

  const copySummaryText = `Nigerian Polytechnic CGPA Summary (NBTE 4.0 Scale):
Cumulative CGPA: ${cgpaResult.cgpa.toFixed(2)} / 4.00
Diploma Classification: ${cgpaResult.classification}
Total Credit Units: ${cgpaResult.totalUnits}
Total Quality Points: ${cgpaResult.totalQualityPoints.toFixed(2)}
Calculated on Pay (https://pay.zetawala.com/nigeria/polytechnic-cgpa-calculator/)`;

  const related = getRelatedPages('ng-poly');

  const faqs = [
    {
      question: 'How is Polytechnic CGPA calculated in Nigeria?',
      answer:
        'Under NBTE guidelines, CGPA is calculated on a 4.0 scale by dividing Total Quality Points (TQP) by Total Credit Units (TCU): CGPA = Total Quality Points ÷ Total Credit Units. Courses utilize weighted letter marks (A=4.0, AB=3.5, B=3.25, BC=3.0, C=2.75, CD=2.5, D=2.25, E=2.0, F=0.0).',
    },
    {
      question: 'What CGPA is required for Distinction in a Nigerian polytechnic?',
      answer:
        'To graduate with Distinction in National Diploma (ND) or Higher National Diploma (HND) programmes, an NBTE student must achieve a cumulative CGPA of 3.50 to 4.00.',
    },
    {
      question: 'What is the cutoff for Upper Credit in polytechnics?',
      answer:
        'Upper Credit requires a cumulative CGPA between 3.00 and 3.49. This is equivalent to Second Class Upper (2:1) in university programmes.',
    },
    {
      question: 'What is the cutoff for Lower Credit and Pass?',
      answer:
        'Lower Credit requires a CGPA of 2.50 to 2.99. Pass requires a CGPA of 2.00 to 2.49. Any cumulative score below 2.00 results in failure to graduate.',
    },
    {
      question: 'Are ND and HND CGPAs combined together?',
      answer:
        'No. National Diploma (ND) and Higher National Diploma (HND) are completely independent academic programmes. Your ND CGPA finishes upon graduation and Industrial Training (IT); your HND starts with a fresh 0.00 CGPA in HND 1 Semester 1.',
    },
    {
      question: 'Can an Upper Credit polytechnic graduate apply for direct entry to university?',
      answer:
        'Yes. Most Nigerian federal and state universities accept National Diploma (ND) graduates with Upper Credit or Distinction for Direct Entry (DE) into 200-level university degree programmes.',
    },
    {
      question: 'Why do Nigerian polytechnics use AB and BC grades?',
      answer:
        'The NBTE uses an expanded 9-tier marking scheme (75+ A, 70–74 AB, 65–69 B, 60–64 BC, 55–59 C, 50–54 CD, 45–49 D, 40–44 E, 0–39 F) to provide more granular evaluation of technical skills and continuous practical assessments.',
    },
    {
      question: 'How do carryovers work in polytechnics?',
      answer:
        'If you score an F (below 40%), the credit units are counted in your registered total with 0 quality points. You must carry over the course and re-sit it in the appropriate semester.',
    },
  ];

  const workedExamples: WorkedExampleItem[] = [
    {
      title: 'ND Computer Science Student (24 Units)',
      scenario: 'A student completing 24 units across ND 1 with strong technical scores.',
      inputs: [
        { label: 'Total Units Registered', value: '24 Credit Units' },
        { label: 'Grade Profile', value: '6 Units A, 12 Units AB, 6 Units B' },
      ],
      steps: [
        { label: 'QP for Grade A (4.0)', formula: '6 units × 4.00', value: '24.00 QP' },
        { label: 'QP for Grade AB (3.5)', formula: '12 units × 3.50', value: '42.00 QP' },
        { label: 'QP for Grade B (3.25)', formula: '6 units × 3.25', value: '19.50 QP' },
        { label: 'Total Quality Points (TQP)', formula: '24 + 42 + 19.5', value: '85.50 QP' },
        { label: 'CGPA Calculation', formula: '85.50 QP ÷ 24 Units', value: '3.56 / 4.00', highlight: true },
      ],
      resultLabel: 'Diploma Classification Award',
      resultValue: 'Distinction',
      notes: 'Exceeds the 3.50 NBTE Distinction cutoff.',
    },
    {
      title: 'HND Electrical Engineering Student (26 Units)',
      scenario: 'An HND student completing 26 units with Upper Credit performance.',
      inputs: [
        { label: 'Total Units Registered', value: '26 Credit Units' },
        { label: 'Grade Profile', value: '6 Units AB, 14 Units B, 6 Units BC' },
      ],
      steps: [
        { label: 'QP for Grade AB (3.5)', formula: '6 units × 3.50', value: '21.00 QP' },
        { label: 'QP for Grade B (3.25)', formula: '14 units × 3.25', value: '45.50 QP' },
        { label: 'QP for Grade BC (3.0)', formula: '6 units × 3.00', value: '18.00 QP' },
        { label: 'Total Quality Points (TQP)', formula: '21 + 45.5 + 18', value: '84.50 QP' },
        { label: 'CGPA Calculation', formula: '84.50 QP ÷ 26 Units', value: '3.25 / 4.00', highlight: true },
      ],
      resultLabel: 'Diploma Classification Award',
      resultValue: 'Upper Credit',
      notes: 'Strong Upper Credit standing (3.00–3.49).',
    },
  ];

  const officialSources: OfficialSourceLink[] = [
    {
      name: 'National Board for Technical Education (NBTE)',
      documentTitle: 'Standard Curriculum & Evaluation Guidelines for Polytechnics',
      url: 'https://www.nbte.gov.ng',
      verifiedDate: ngRates.verifiedDate,
    },
  ];

  const quickAnswerText = `Under official National Board for Technical Education (NBTE) standards, Nigerian polytechnic CGPA is computed on a 4.0 scale with split grade weights (A=4.0, AB=3.5, B=3.25, BC=3.0, C=2.75, CD=2.5, D=2.25, E=2.0, F=0.0). Distinction requires a CGPA of 3.50 to 4.00, and Upper Credit requires 3.00 to 3.49.`;

  const tocItems = [
    { id: 'poly-formula', label: 'The NBTE 4.0 CGPA Formula' },
    { id: 'poly-scale', label: 'The 9-Tier Marking Scheme (A to F with AB & BC)' },
    { id: 'diploma-classes', label: 'Diploma Classifications (Distinction to Pass)' },
    { id: 'nd-vs-hnd', label: 'ND vs HND: Independent CGPA Records' },
    { id: 'direct-entry', label: 'Direct Entry Requirements for University' },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <StructuredData
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Nigeria', url: '/nigeria/' },
          { name: 'Polytechnic CGPA Calculator', url: '/nigeria/polytechnic-cgpa-calculator/' },
        ]}
        webApp={{
          name: 'Polytechnic CGPA Calculator (4.0 Scale)',
          url: '/nigeria/polytechnic-cgpa-calculator/',
          description: 'Calculate your ND or HND cumulative GPA using the official NBTE 4.0 grading scale with Distinction and Upper Credit bands.',
          applicationCategory: 'EducationalApplication',
        }}
        faqs={faqs}
      />

      <Breadcrumbs
        items={[
          { label: 'Nigeria', href: '/nigeria/' },
          { label: 'Polytechnic CGPA Calculator (4.0)' },
        ]}
      />

      {/* Page Header */}
      <div className="border-b border-neutral-200 pb-6 pt-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
          Polytechnic CGPA Calculator (4.0 Scale)
        </h1>
        <p className="mt-2 text-sm sm:text-base text-neutral-600 max-w-3xl leading-relaxed">
          Compute your National Diploma (ND) or Higher National Diploma (HND) cumulative grade point average using the official National Board for Technical Education (NBTE) 4.0 grading scale.
        </p>
      </div>

      {/* Main Grid: Inputs Left, Result Right */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Inputs Column */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-neutral-900">Polytechnic Semesters</h2>
            <button
              type="button"
              onClick={addSemester}
              className="inline-flex items-center gap-1 rounded-md bg-brand px-3 py-1 text-xs font-bold text-white shadow-2xs hover:bg-brand-strong"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add Semester</span>
            </button>
          </div>

          <div className="space-y-6">
            {semesters.map((sem, sIdx) => {
              const semRes = cgpaResult.semesters[sIdx];
              return (
                <div key={sem.id} className="rounded-xl border border-neutral-200 bg-white p-5 shadow-2xs">
                  <div className="flex items-center justify-between border-b border-neutral-100 pb-3 mb-4">
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-brand" />
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

                  {/* Course rows */}
                  <div className="space-y-2">
                    <div className="grid grid-cols-12 gap-2 text-2xs font-bold uppercase tracking-wider text-neutral-500 px-1">
                      <div className="col-span-5">Course Code</div>
                      <div className="col-span-3 text-center">Credit Units</div>
                      <div className="col-span-3 text-center">NBTE Grade</div>
                      <div className="col-span-1"></div>
                    </div>

                    {sem.courses.map((course) => (
                      <div key={course.id} className="grid grid-cols-12 gap-2 items-center">
                        <div className="col-span-5">
                          <input
                            type="text"
                            value={course.code}
                            onChange={(e) => updateCourse(sem.id, course.id, 'code', e.target.value)}
                            placeholder="e.g. COM 111"
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
                            <option value="A">A (4.00)</option>
                            <option value="AB">AB (3.50)</option>
                            <option value="B">B (3.25)</option>
                            <option value="BC">BC (3.00)</option>
                            <option value="C">C (2.75)</option>
                            <option value="CD">CD (2.50)</option>
                            <option value="D">D (2.25)</option>
                            <option value="E">E (2.00)</option>
                            <option value="F">F (0.00)</option>
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
            title="Polytechnic Standing"
            headlineLabel="Cumulative CGPA"
            headlineValue={`${cgpaResult.cgpa.toFixed(2)}`}
            subHeadline={`Award: ${cgpaResult.classification}`}
            rows={rows}
            sources={legalSources}
            copySummaryText={copySummaryText}
            shareTitle="Polytechnic CGPA Summary"
            calloutMessage={
              cgpaResult.cgpa >= ngRates.nbteDistinctionMin
                ? {
                    type: 'success',
                    text: 'Distinction Standing: Your CGPA is 3.50 or above, qualifying for the Distinction diploma award.',
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
        <h2 id="poly-formula">The NBTE 4.0 CGPA Formula</h2>
        <p>
          In Nigerian polytechnics, monotechnics, and colleges of technology, academic evaluation is supervised by the National Board for Technical Education (NBTE). While universities evaluate on a 5.0 scale, polytechnics operate on a dedicated 4.0 cumulative grade point average system.
        </p>
        <p>
          The governing formula is:
        </p>
        <div className="not-prose my-4 rounded-lg bg-neutral-900 p-4 font-mono text-sm text-brand-light">
          Polytechnic CGPA = Total Quality Points (TQP) ÷ Total Credit Units (TCU)
        </div>

        <h2 id="poly-scale">The 9-Tier Marking Scheme (A to F with AB &amp; BC)</h2>
        <p>
          The NBTE utilizes an expanded 9-tier marking scheme designed to reward intermediate technical proficiency:
        </p>

        <div className="not-prose my-6 overflow-x-auto rounded-xl border border-neutral-200">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-100 text-neutral-800 uppercase font-bold">
              <tr>
                <th className="p-3">Percentage Mark</th>
                <th className="p-3">Letter Grade</th>
                <th className="p-3">Grade Weight</th>
                <th className="p-3">Evaluation Remark</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 text-neutral-700">
              <tr>
                <td className="p-3">75% – 100%</td>
                <td className="p-3 font-bold text-neutral-900">A</td>
                <td className="p-3 font-bold text-brand-strong">4.00</td>
                <td className="p-3">Distinction</td>
              </tr>
              <tr>
                <td className="p-3">70% – 74%</td>
                <td className="p-3 font-bold text-neutral-900">AB</td>
                <td className="p-3 font-semibold">3.50</td>
                <td className="p-3">Very Good</td>
              </tr>
              <tr>
                <td className="p-3">65% – 69%</td>
                <td className="p-3 font-bold text-neutral-900">B</td>
                <td className="p-3 font-semibold">3.25</td>
                <td className="p-3">Good</td>
              </tr>
              <tr>
                <td className="p-3">60% – 64%</td>
                <td className="p-3 font-bold text-neutral-900">BC</td>
                <td className="p-3 font-semibold">3.00</td>
                <td className="p-3">Above Average</td>
              </tr>
              <tr>
                <td className="p-3">55% – 59%</td>
                <td className="p-3 font-bold text-neutral-900">C</td>
                <td className="p-3 font-semibold">2.75</td>
                <td className="p-3">Average</td>
              </tr>
              <tr>
                <td className="p-3">50% – 54%</td>
                <td className="p-3 font-bold text-neutral-900">CD</td>
                <td className="p-3 font-semibold">2.50</td>
                <td className="p-3">Fair</td>
              </tr>
              <tr>
                <td className="p-3">45% – 49%</td>
                <td className="p-3 font-bold text-neutral-900">D</td>
                <td className="p-3 font-semibold">2.25</td>
                <td className="p-3">Pass</td>
              </tr>
              <tr>
                <td className="p-3">40% – 44%</td>
                <td className="p-3 font-bold text-neutral-900">E</td>
                <td className="p-3 font-semibold">2.00</td>
                <td className="p-3">Poor Pass</td>
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

        <h2 id="diploma-classes">Diploma Classifications (Distinction to Pass)</h2>
        <p>
          Final diploma awards for both National Diploma (ND) and Higher National Diploma (HND) programmes follow these statutory cutoffs:
        </p>
        <ul>
          <li><strong>Distinction:</strong> 3.50 – 4.00 CGPA. The highest award in polytechnic education.</li>
          <li><strong>Upper Credit:</strong> 3.00 – 3.49 CGPA. Qualifies candidates for university Direct Entry (DE) into 200-level programmes.</li>
          <li><strong>Lower Credit:</strong> 2.50 – 2.99 CGPA. Standard diploma certification.</li>
          <li><strong>Pass:</strong> 2.00 – 2.49 CGPA. Minimum graduation cutoff.</li>
        </ul>

        <h2 id="nd-vs-hnd">ND vs HND: Independent CGPA Records</h2>
        <p>
          Students often ask whether their National Diploma (ND) grades carry over into their Higher National Diploma (HND). Under NBTE regulations, ND and HND are legally separate programmes. Once you complete ND 2 and complete your mandatory one-year Industrial Training (IT), your ND transcript is closed. When you gain admission into HND 1, your CGPA resets to 0.00.
        </p>

        <h2 id="direct-entry">Direct Entry Requirements for University</h2>
        <p>
          National Diploma graduates wishing to transition to university degrees via the Joint Admissions and Matriculation Board (JAMB) Direct Entry must meet specific institutional cutoffs. Most federal and state universities require a minimum of Upper Credit (3.00+ CGPA) for admission into related engineering, computing, or environmental science faculties.
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
