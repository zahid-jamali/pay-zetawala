'use client';

import React, { useState, useMemo } from 'react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ResultPanel, BreakdownRow, CalculationLegalSource } from '@/components/ResultPanel';
import { FaqAccordion } from '@/components/FaqAccordion';
import { RelatedTools } from '@/components/RelatedTools';
import { getRelatedPages } from '@/config/pages';
import { calculateCgpa, CourseEntry } from '@/lib/ng/cgpa';
import { ShieldCheck, Plus, Trash2 } from 'lucide-react';

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

  const rows: BreakdownRow[] = [
    {
      label: 'Cumulative Quality Points',
      value: cgpaResult.totalQualityPoints.toFixed(2),
    },
    {
      label: 'Total Credit Units',
      value: cgpaResult.totalUnits.toString(),
    },
    {
      label: 'Diploma Classification',
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
      title: 'National Board for Technical Education (NBTE)',
      documentNumber: 'NBTE Curriculum & Course Specifications',
      summary: '4.00 point scale: Distinction (3.50–4.00), Upper Credit (3.00–3.49), Lower Credit (2.50–2.99), Pass (2.00–2.49).',
    },
  ];

  const copySummaryText = `Nigeria Polytechnic CGPA Result (NBTE 4.0 Scale):
Cumulative CGPA: ${cgpaResult.cgpa.toFixed(2)} / 4.00
Classification: ${cgpaResult.classification}
Total Units: ${cgpaResult.totalUnits}
Quality Points: ${cgpaResult.totalQualityPoints.toFixed(2)}
Calculated on Pay (https://pay.zetawala.com/nigeria/polytechnic-cgpa-calculator/)`;

  const related = getRelatedPages('ng-polytechnic');

  const faqs = [
    {
      question: 'What is the NBTE 4.0 grading scale for polytechnics?',
      answer:
        'The NBTE 4.0 scale grades are:<br/><br/>• A (75–100%) = 4.00<br/>• AB (70–74%) = 3.50<br/>• B (65–69%) = 3.25<br/>• BC (60–64%) = 3.00<br/>• C (55–59%) = 2.75<br/>• CD (50–54%) = 2.50<br/>• D (45–49%) = 2.25<br/>• E (40–44%) = 2.00<br/>• F (0–39%) = 0.00',
    },
    {
      question: 'What CGPA is required for an Upper Credit in Nigerian polytechnics?',
      answer:
        'A CGPA between <strong>3.00 and 3.49</strong> qualifies for Upper Credit. A CGPA of <strong>3.50 and above</strong> earns Distinction.',
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <Breadcrumbs
        items={[
          { label: 'Nigeria', href: '/nigeria/' },
          { label: 'Polytechnic CGPA Calculator (4.0)' },
        ]}
      />

      <div className="border-b border-neutral-200 pb-6 pt-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft px-3 py-1 text-xs font-semibold text-brand-strong mb-2">
          <ShieldCheck className="h-3.5 w-3.5 text-brand" />
          <span>Official NBTE 4.0 Point Grading Scale</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
          Nigeria Polytechnic CGPA Calculator 2026
        </h1>
        <p className="mt-2 text-sm sm:text-base text-neutral-600 max-w-3xl leading-relaxed">
          Compute your National Diploma (ND) and Higher National Diploma (HND) CGPA on the official NBTE 4.0 scale (Distinction, Upper Credit, Lower Credit, Pass).
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-6">
          {semesters.map(sem => {
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
                  {sem.courses.map(course => (
                    <div key={course.id} className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center">
                      <div className="sm:col-span-5">
                        <input
                          type="text"
                          value={course.code}
                          onChange={e => updateCourse(sem.id, course.id, 'code', e.target.value)}
                          placeholder="e.g. COM 111"
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
            <span>Add Next Polytechnic Semester</span>
          </button>
        </div>

        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <ResultPanel
            title="Diploma Classification"
            headlineLabel="Polytechnic CGPA (4.0 Scale)"
            headlineValue={cgpaResult.cgpa.toFixed(2)}
            subHeadline={`${cgpaResult.classification} • Total: ${cgpaResult.totalUnits} credit units`}
            rows={rows}
            sources={legalSources}
            copySummaryText={copySummaryText}
            shareTitle="Nigeria Polytechnic CGPA Calculation"
          />
        </div>
      </div>

      <RelatedTools tools={related} />
      <FaqAccordion faqs={faqs} />
    </div>
  );
}
