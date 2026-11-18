'use client';

import React, { useState, useMemo } from 'react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SegmentedControl } from '@/components/SegmentedControl';
import { ResultPanel, BreakdownRow, CalculationLegalSource } from '@/components/ResultPanel';
import { FaqAccordion } from '@/components/FaqAccordion';
import { RelatedTools } from '@/components/RelatedTools';
import { getRelatedPages } from '@/config/pages';
import { calculateSemesterGpa, CourseEntry, GradingSystem } from '@/lib/ng/cgpa';
import { ShieldCheck, Plus, Trash2 } from 'lucide-react';

const initialCourses: CourseEntry[] = [
  { id: '1', code: 'Course 1', units: 3, grade: 'A' },
  { id: '2', code: 'Course 2', units: 3, grade: 'B' },
  { id: '3', code: 'Course 3', units: 2, grade: 'A' },
  { id: '4', code: 'Course 4', units: 2, grade: 'C' },
];

export default function SingleSemesterGpaCalculator() {
  const [system, setSystem] = useState<GradingSystem>('university_5_point');
  const [courses, setCourses] = useState<CourseEntry[]>(initialCourses);

  const semResult = useMemo(() => {
    return calculateSemesterGpa(courses, system);
  }, [courses, system]);

  const addCourse = () => {
    setCourses([
      ...courses,
      { id: `c_${Date.now()}`, code: `Course ${courses.length + 1}`, units: 3, grade: 'A' },
    ]);
  };

  const removeCourse = (id: string) => {
    if (courses.length <= 1) return;
    setCourses(courses.filter(c => c.id !== id));
  };

  const updateCourse = (id: string, field: keyof CourseEntry, value: any) => {
    setCourses(
      courses.map(c => {
        if (c.id !== id) return c;
        return { ...c, [field]: value };
      })
    );
  };

  const rows: BreakdownRow[] = [
    {
      label: 'Semester Grade Point Average (GPA)',
      value: semResult.gpa.toFixed(2),
      highlight: true,
      sublabel: `Out of ${system === 'university_5_point' ? '5.00' : '4.00'} maximum scale`,
    },
    {
      label: 'Total Credit Units Registered (TCU)',
      value: semResult.totalUnits.toString(),
    },
    {
      label: 'Total Quality Points Earned (TQP)',
      value: semResult.totalQualityPoints.toFixed(2),
      sublabel: 'Sum of (Credit Units × Grade Points)',
    },
    ...semResult.courses.map(c => ({
      label: `${c.code || 'Course'} (${c.units} units × ${c.gradePoint} GP)`,
      value: `${c.qualityPoints.toFixed(2)} QP`,
    })),
  ];

  const legalSources: CalculationLegalSource[] = [
    {
      title: system === 'university_5_point' ? 'NUC BMAS Guidelines' : 'NBTE Standards',
      documentNumber: 'Standard Tertiary Grading Regulations',
      summary: 'Semester GPA formula: Total Quality Points divided by Total Registered Credit Units.',
    },
  ];

  const copySummaryText = `Semester GPA Calculation (${system === 'university_5_point' ? 'University 5.0' : 'Polytechnic 4.0'}):
GPA: ${semResult.gpa.toFixed(2)}
Total Credit Units: ${semResult.totalUnits}
Total Quality Points: ${semResult.totalQualityPoints.toFixed(2)}
Calculated on Pay (https://pay.zetawala.com/nigeria/gpa-calculator/)`;

  const related = getRelatedPages('ng-gpa');

  const faqs = [
    {
      question: 'How is a single semester GPA computed?',
      answer:
        'Multiply the credit units of each course by the grade point earned (e.g., 3 units × 5.0 GP for an A = 15.0 Quality Points). Sum all quality points and divide by the total credit units registered for the semester.',
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <Breadcrumbs
        items={[
          { label: 'Nigeria', href: '/nigeria/' },
          { label: 'Semester GPA Calculator' },
        ]}
      />

      <div className="border-b border-neutral-200 pb-6 pt-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft px-3 py-1 text-xs font-semibold text-brand-strong mb-2">
          <ShieldCheck className="h-3.5 w-3.5 text-brand" />
          <span>Single Semester Grading Tool</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
          Nigeria Semester GPA Calculator 2026
        </h1>
        <p className="mt-2 text-sm sm:text-base text-neutral-600 max-w-3xl leading-relaxed">
          Quickly compute your semester Grade Point Average (GPA) by entering your course credit units and grades.
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
          <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-2xs space-y-4">
            <h2 className="text-base font-bold text-neutral-900 border-b border-neutral-100 pb-3">
              Semester Courses
            </h2>

            <div className="space-y-3">
              {courses.map(course => (
                <div key={course.id} className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center">
                  <div className="sm:col-span-5">
                    <input
                      type="text"
                      value={course.code}
                      onChange={e => updateCourse(course.id, 'code', e.target.value)}
                      placeholder="Course Code"
                      className="w-full rounded-md border border-neutral-300 py-1.5 px-2.5 text-xs font-medium text-neutral-900 focus:outline-none focus:ring-1 focus:ring-brand"
                    />
                  </div>
                  <div className="sm:col-span-3">
                    <select
                      value={course.units}
                      onChange={e => updateCourse(course.id, 'units', parseInt(e.target.value) || 0)}
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
                      onChange={e => updateCourse(course.id, 'grade', e.target.value)}
                      className="w-full rounded-md border border-neutral-300 py-1.5 px-2.5 text-xs font-bold text-neutral-900 focus:outline-none focus:ring-1 focus:ring-brand bg-white"
                    >
                      {system === 'university_5_point' ? (
                        <>
                          <option value="A">A (5.0 GP)</option>
                          <option value="B">B (4.0 GP)</option>
                          <option value="C">C (3.0 GP)</option>
                          <option value="D">D (2.0 GP)</option>
                          <option value="E">E (1.0 GP)</option>
                          <option value="F">F (0.0 GP)</option>
                        </>
                      ) : (
                        <>
                          <option value="A">A (4.00)</option>
                          <option value="AB">AB (3.50)</option>
                          <option value="B">B (3.25)</option>
                          <option value="BC">BC (3.00)</option>
                          <option value="C">C (2.75)</option>
                          <option value="CD">CD (2.50)</option>
                          <option value="D">D (2.25)</option>
                          <option value="E">E (2.00)</option>
                          <option value="F">F (0.00)</option>
                        </>
                      )}
                    </select>
                  </div>
                  <div className="sm:col-span-1 text-right">
                    <button
                      type="button"
                      onClick={() => removeCourse(course.id)}
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
                onClick={addCourse}
                className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-strong hover:underline"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add Course</span>
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <ResultPanel
            title="Semester Result"
            headlineLabel="Semester Grade Point Average"
            headlineValue={semResult.gpa.toFixed(2)}
            subHeadline={`Total: ${semResult.totalUnits} credit units • ${semResult.totalQualityPoints.toFixed(2)} quality points`}
            rows={rows}
            sources={legalSources}
            copySummaryText={copySummaryText}
            shareTitle="Semester GPA Calculation"
          />
        </div>
      </div>

      <RelatedTools tools={related} />
      <FaqAccordion faqs={faqs} />
    </div>
  );
}
