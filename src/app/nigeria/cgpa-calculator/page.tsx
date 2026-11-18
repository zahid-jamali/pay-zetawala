'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ResultPanel, BreakdownRow, CalculationLegalSource } from '@/components/ResultPanel';
import { FaqAccordion } from '@/components/FaqAccordion';
import { RelatedTools } from '@/components/RelatedTools';
import { getRelatedPages } from '@/config/pages';
import { calculateCgpa, CourseEntry } from '@/lib/ng/cgpa';
import { ShieldCheck, Plus, Trash2, GraduationCap, RotateCcw } from 'lucide-react';

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
  const [semesters, setSemesters] = useState<SemesterState[]>(defaultSemesters);
  const [isClient, setIsClient] = useState(false);

  // Load from localStorage on client mount
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
      // Ignore
    }
  }, []);

  // Save to localStorage on changes
  useEffect(() => {
    if (isClient) {
      try {
        localStorage.setItem('pay_ng_university_cgpa', JSON.stringify(semesters));
      } catch {
        // Ignore
      }
    }
  }, [semesters, isClient]);

  const cgpaResult = useMemo(() => {
    return calculateCgpa(semesters, 'university_5_point');
  }, [semesters]);

  const addSemester = () => {
    const semNum = semesters.length + 1;
    const year = Math.ceil(semNum / 2);
    const sem = semNum % 2 === 1 ? 1 : 2;
    const newSem: SemesterState = {
      id: `sem_${Date.now()}`,
      name: `Year ${year}, Semester ${sem}`,
      courses: [
        { id: `c_${Date.now()}_1`, code: '', units: 3, grade: 'A' },
        { id: `c_${Date.now()}_2`, code: '', units: 3, grade: 'B' },
        { id: `c_${Date.now()}_3`, code: '', units: 2, grade: 'A' },
      ],
    };
    setSemesters([...semesters, newSem]);
  };

  const removeSemester = (semId: string) => {
    if (semesters.length <= 1) return;
    setSemesters(semesters.filter(s => s.id !== semId));
  };

  const addCourse = (semId: string) => {
    setSemesters(
      semesters.map(s => {
        if (s.id !== semId) return s;
        return {
          ...s,
          courses: [
            ...s.courses,
            { id: `c_${Date.now()}_${s.courses.length + 1}`, code: '', units: 3, grade: 'A' },
          ],
        };
      })
    );
  };

  const removeCourse = (semId: string, courseId: string) => {
    setSemesters(
      semesters.map(s => {
        if (s.id !== semId) return s;
        if (s.courses.length <= 1) return s;
        return {
          ...s,
          courses: s.courses.filter(c => c.id !== courseId),
        };
      })
    );
  };

  const updateCourse = (semId: string, courseId: string, field: keyof CourseEntry, value: any) => {
    setSemesters(
      semesters.map(s => {
        if (s.id !== semId) return s;
        return {
          ...s,
          courses: s.courses.map(c => {
            if (c.id !== courseId) return c;
            return { ...c, [field]: value };
          }),
        };
      })
    );
  };

  const resetToDefault = () => {
    if (confirm('Reset all semester courses back to sample template?')) {
      setSemesters(defaultSemesters);
    }
  };

  const rows: BreakdownRow[] = [
    {
      label: 'Cumulative Quality Points (TQP)',
      value: cgpaResult.totalQualityPoints.toFixed(2),
      sublabel: 'Sum of (Course Units × Grade Points)',
    },
    {
      label: 'Cumulative Credit Units Registered (TCU)',
      value: cgpaResult.totalUnits.toString(),
      sublabel: 'Total credit units in degree curriculum',
    },
    {
      label: 'Official Degree Classification',
      value: cgpaResult.classification,
      highlight: true,
      sublabel: cgpaResult.classificationDescription,
    },
    ...cgpaResult.semesters.map(sem => ({
      label: `${sem.name} GPA`,
      value: `${sem.gpa.toFixed(2)} (${sem.totalUnits} Units)`,
    })),
  ];

  const legalSources: CalculationLegalSource[] = [
    {
      title: 'National Universities Commission (NUC)',
      documentNumber: 'Benchmark Minimum Academic Standards (BMAS) & CCMAS',
      summary: '5.0 point scale: A=5.0, B=4.0, C=3.0, D=2.0, E=1.0, F=0.0. First Class starts at 4.50; 2:1 starts at 3.50; 2:2 starts at 2.40.',
    },
  ];

  const copySummaryText = `Nigeria University CGPA Result (NUC 5.0 Scale):
Cumulative CGPA: ${cgpaResult.cgpa.toFixed(2)} / 5.00
Degree Classification: ${cgpaResult.classification}
Total Credit Units: ${cgpaResult.totalUnits}
Total Quality Points: ${cgpaResult.totalQualityPoints.toFixed(2)}
Calculated on Pay (https://pay.zetawala.com/nigeria/cgpa-calculator/)`;

  const related = getRelatedPages('ng-cgpa');

  const faqs = [
    {
      question: 'How is CGPA calculated in Nigerian universities?',
      answer:
        'CGPA is calculated as: <code>Total Quality Points (TQP) ÷ Total Credit Units (TCU)</code>.<br/><br/>• For each course, multiply its credit units by the grade point (A=5, B=4, C=3, D=2, E=1, F=0) to get Quality Points.<br/>• Sum quality points across all semesters and divide by the total registered units.',
    },
    {
      question: 'Is my course data saved on this page?',
      answer:
        'Yes. All semester entries and courses are automatically preserved in your browser’s local storage. You can safely refresh the page or return later without losing your records.',
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <Breadcrumbs
        items={[
          { label: 'Nigeria', href: '/nigeria/' },
          { label: 'University CGPA Calculator (5.0)' },
        ]}
      />

      <div className="border-b border-neutral-200 pb-6 pt-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft px-3 py-1 text-xs font-semibold text-brand-strong mb-2">
          <ShieldCheck className="h-3.5 w-3.5 text-brand" />
          <span>Official NUC 5.0 Point Grading Scale</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
              Nigeria University CGPA Calculator
            </h1>
            <p className="mt-2 text-sm sm:text-base text-neutral-600 max-w-3xl leading-relaxed">
              Calculate your Cumulative Grade Point Average (CGPA) on the official NUC 5-point scale across all semesters. Supports course carryovers, auto-saving, and printable transcript view.
            </p>
          </div>
          <button
            type="button"
            onClick={resetToDefault}
            className="inline-flex items-center gap-1.5 rounded-md border border-neutral-300 bg-white px-3 py-1.5 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 shrink-0 self-start sm:self-auto"
          >
            <RotateCcw className="h-3.5 w-3.5 text-neutral-500" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Inputs: Semesters List */}
        <div className="lg:col-span-7 space-y-6">
          {semesters.map((sem, sIdx) => {
            const semRes = cgpaResult.semesters.find(s => s.semesterId === sem.id);
            return (
              <div key={sem.id} className="rounded-xl border border-neutral-200 bg-white shadow-2xs overflow-hidden">
                <div className="flex items-center justify-between border-b border-neutral-200 bg-neutral-50/80 px-5 py-3">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-sm text-neutral-900">{sem.name}</span>
                    {semRes && (
                      <span className="rounded-full bg-brand-soft px-2 py-0.5 text-xs font-bold text-brand-strong">
                        GPA: {semRes.gpa.toFixed(2)}
                      </span>
                    )}
                  </div>
                  {semesters.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSemester(sem.id)}
                      className="text-neutral-400 hover:text-danger text-xs p-1"
                      title="Remove Semester"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>

                <div className="p-5 space-y-3">
                  <div className="hidden sm:grid sm:grid-cols-12 gap-2 text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1 px-1">
                    <div className="col-span-5">Course Code / Title</div>
                    <div className="col-span-3">Credit Units</div>
                    <div className="col-span-3">Grade (A–F)</div>
                    <div className="col-span-1 text-right">Del</div>
                  </div>

                  {sem.courses.map(course => (
                    <div key={course.id} className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center">
                      <div className="sm:col-span-5">
                        <input
                          type="text"
                          value={course.code}
                          onChange={e => updateCourse(sem.id, course.id, 'code', e.target.value)}
                          placeholder="e.g. GST 101"
                          className="w-full rounded-md border border-neutral-300 py-1.5 px-2.5 text-xs font-medium text-neutral-900 focus:outline-none focus:ring-1 focus:ring-brand"
                        />
                      </div>
                      <div className="sm:col-span-3">
                        <select
                          value={course.units}
                          onChange={e => updateCourse(sem.id, course.id, 'units', parseInt(e.target.value) || 0)}
                          className="w-full rounded-md border border-neutral-300 py-1.5 px-2.5 text-xs font-medium text-neutral-900 focus:outline-none focus:ring-1 focus:ring-brand bg-white"
                        >
                          <option value={1}>1 Unit</option>
                          <option value={2}>2 Units</option>
                          <option value={3}>3 Units</option>
                          <option value={4}>4 Units</option>
                          <option value={5}>5 Units</option>
                          <option value={6}>6 Units</option>
                        </select>
                      </div>
                      <div className="sm:col-span-3">
                        <select
                          value={course.grade || 'A'}
                          onChange={e => updateCourse(sem.id, course.id, 'grade', e.target.value)}
                          className="w-full rounded-md border border-neutral-300 py-1.5 px-2.5 text-xs font-bold text-neutral-900 focus:outline-none focus:ring-1 focus:ring-brand bg-white"
                        >
                          <option value="A">A (70–100%) - 5.0 GP</option>
                          <option value="B">B (60–69%) - 4.0 GP</option>
                          <option value="C">C (50–59%) - 3.0 GP</option>
                          <option value="D">D (45–49%) - 2.0 GP</option>
                          <option value="E">E (40–44%) - 1.0 GP</option>
                          <option value="F">F (0–39%) - 0.0 GP</option>
                        </select>
                      </div>
                      <div className="sm:col-span-1 text-right">
                        <button
                          type="button"
                          onClick={() => removeCourse(sem.id, course.id)}
                          className="text-neutral-400 hover:text-danger p-1"
                          title="Remove Course"
                        >
                          <Trash2 className="h-3.5 w-3.5 inline" />
                        </button>
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => addCourse(sem.id)}
                    className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-strong hover:underline"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add Course</span>
                  </button>
                </div>
              </div>
            );
          })}

          <button
            type="button"
            onClick={addSemester}
            className="w-full flex items-center justify-center gap-2 rounded-xl border border-dashed border-neutral-300 bg-neutral-50/75 py-3 text-xs font-bold text-neutral-700 hover:bg-neutral-100 transition-colors"
          >
            <Plus className="h-4 w-4 text-brand" />
            <span>Add Next Semester</span>
          </button>
        </div>

        {/* Right Sticky Result Column */}
        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <ResultPanel
            title="Degree Classification"
            headlineLabel="Cumulative CGPA (5.0 Scale)"
            headlineValue={cgpaResult.cgpa.toFixed(2)}
            subHeadline={`${cgpaResult.classification} • Total: ${cgpaResult.totalUnits} credit units`}
            rows={rows}
            sources={legalSources}
            copySummaryText={copySummaryText}
            shareTitle="Nigeria University CGPA Calculation"
            calloutMessage={{
              type: cgpaResult.cgpa >= 3.50 ? 'success' : 'info',
              text:
                cgpaResult.cgpa >= 4.50
                  ? 'First Class Honours: Academic distinction standing.'
                  : cgpaResult.cgpa >= 3.50
                  ? 'Second Class Honours (Upper Division): 2:1 standing.'
                  : cgpaResult.cgpa >= 2.40
                  ? 'Second Class Honours (Lower Division): 2:2 standing.'
                  : 'Third Class standing.',
            }}
          />
        </div>
      </div>

      <RelatedTools tools={related} />
      <FaqAccordion faqs={faqs} />
    </div>
  );
}
