'use client';

import React, { useState, useMemo } from 'react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SegmentedControl } from '@/components/SegmentedControl';
import { ResultPanel, BreakdownRow, CalculationLegalSource } from '@/components/ResultPanel';
import { FaqAccordion } from '@/components/FaqAccordion';
import { RelatedTools } from '@/components/RelatedTools';
import { SeoArticle, WorkedExampleItem, OfficialSourceLink } from '@/components/SeoArticle';
import { StructuredData } from '@/components/StructuredData';
import { getRelatedPages } from '@/config/pages';
import { calculateSemesterGpa, CourseEntry, GradingSystem } from '@/lib/ng/cgpa';
import { getNgRates } from '@/lib/seo/rules-content';
import { ShieldCheck, Plus, Trash2 } from 'lucide-react';

const initialCourses: CourseEntry[] = [
  { id: '1', code: 'MTH 101', units: 3, grade: 'A' },
  { id: '2', code: 'PHY 101', units: 3, grade: 'B' },
  { id: '3', code: 'CHM 101', units: 3, grade: 'A' },
  { id: '4', code: 'GST 101', units: 2, grade: 'C' },
  { id: '5', code: 'BIO 101', units: 2, grade: 'B' },
];

export default function SingleSemesterGpaCalculator() {
  const ngRates = getNgRates();
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
    setCourses(courses.filter((c) => c.id !== id));
  };

  const updateCourse = (id: string, field: keyof CourseEntry, value: any) => {
    setCourses(
      courses.map((c) => {
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
    ...semResult.courses.map((c) => ({
      label: `${c.code || 'Course'} (${c.units} units × ${c.gradePoint.toFixed(2)} GP)`,
      value: `${c.qualityPoints.toFixed(2)} QP`,
    })),
  ];

  const legalSources: CalculationLegalSource[] = [
    {
      title: system === 'university_5_point' ? 'NUC BMAS / CCMAS Regulations' : 'NBTE Curriculum Guidelines',
      documentNumber: system === 'university_5_point' ? 'National Universities Commission Standard' : 'NBTE Standard',
      summary: 'Semester GPA = Total Quality Points (TQP) ÷ Total Credit Units Registered (TCU).',
    },
  ];

  const copySummaryText = `Nigeria Semester GPA Calculation (${system === 'university_5_point' ? 'University 5.0' : 'Polytechnic 4.0'}):
GPA: ${semResult.gpa.toFixed(2)}
Total Credit Units: ${semResult.totalUnits}
Total Quality Points: ${semResult.totalQualityPoints.toFixed(2)}
Calculated on Pay (https://pay.zetawala.com/nigeria/gpa-calculator/)`;

  const related = getRelatedPages('ng-gpa');

  const faqs = [
    {
      question: 'How is a single semester GPA calculated in Nigeria?',
      answer:
        'To calculate your semester GPA, multiply the credit units of each registered course by the numerical grade point assigned to your letter grade (for instance, an A in a 3-unit course yields 3 × 5.0 = 15 quality points). Add together all quality points earned across every course, then divide that sum by the total credit units registered for the semester.',
    },
    {
      question: 'What is the difference between GPA and CGPA?',
      answer:
        'GPA (Grade Point Average) measures your academic performance within a single semester. CGPA (Cumulative Grade Point Average) evaluates your cumulative performance across all completed semesters from your first year up to the current term, calculated as cumulative quality points divided by cumulative credit units.',
    },
    {
      question: 'Does an F grade count toward total credit units in the GPA calculation?',
      answer:
        'Yes. An F grade contributes 0.00 quality points to your total, but the credit units of the failed course remain fully in the denominator. This significantly pulls down your semester GPA.',
    },
    {
      question: 'How does an F affect my semester standing if I pass other courses?',
      answer:
        'Because the units of the failed course are counted without adding any quality points, your average drops sharply. For example, failing a 3-unit course means 0 points added for 3 units, requiring 15 quality points from other courses just to offset the denominator load.',
    },
    {
      question: 'What is the maximum achievable semester GPA in Nigerian universities?',
      answer:
        `Under the National Universities Commission (NUC) 5-point scale, the maximum achievable GPA is ${ngRates.nucMaxScale.toFixed(2)}, achieved when a student scores straight A grades in all registered courses. Under NBTE polytechnic rules, the maximum is ${ngRates.nbteMaxScale.toFixed(2)}.`,
    },
    {
      question: 'What happens to carryover courses taken in a subsequent semester?',
      answer:
        'When you register a carryover course, its credit units and new grade are recorded in that semester’s GPA computation. In Nigerian universities, the previous semester’s GPA remains on record, while your cumulative CGPA factors in both the failed attempt and the retaken attempt.',
    },
    {
      question: 'Do elective courses count toward my semester GPA?',
      answer:
        'Yes. Every course you formally register on your semester course registration form, whether compulsory core, required general study (GST), or optional departmental elective, is included in your semester TCU and GPA calculation.',
    },
    {
      question: 'How do polytechnics grade semester courses on the 4.0 scale?',
      answer:
        `Polytechnics regulated by NBTE use an 11-band or 9-band scale ranging from A (4.00) down to F (0.00), with intermediate steps such as AB (3.50), B (3.25), BC (3.00), C (2.75), CD (2.50), D (2.25), and E (2.00).`,
    },
  ];

  const workedExamples: WorkedExampleItem[] = [
    {
      title: 'Worked Example 1: University 100-Level First Semester (5.0 Scale)',
      scenario:
        'A 100-level engineering student registers 5 courses totaling 13 credit units, scoring 3 A grades, 1 B grade, and 1 C grade.',
      breakdown: [
        { label: 'MTH 101 (3 units, Grade A = 5.0 GP)', value: '15.00 Quality Points' },
        { label: 'PHY 101 (3 units, Grade B = 4.0 GP)', value: '12.00 Quality Points' },
        { label: 'CHM 101 (3 units, Grade A = 5.0 GP)', value: '15.00 Quality Points' },
        { label: 'GST 101 (2 units, Grade C = 3.0 GP)', value: '6.00 Quality Points' },
        { label: 'BIO 101 (2 units, Grade A = 5.0 GP)', value: '10.00 Quality Points' },
        { label: 'Total Registered Units (TCU)', value: '13 credit units' },
        { label: 'Total Quality Points (TQP)', value: '58.00 Quality Points' },
        { label: 'Semester GPA Formula (58.00 ÷ 13)', value: '4.46 GPA' },
      ],
      summary:
        'With a semester GPA of 4.46, the student is performing near the First Class threshold (4.50), establishing a strong foundation for their cumulative degree classification.',
    },
    {
      scenario:
        'An ND1 computer science polytechnic student completes 4 courses totaling 10 credit units, earning A, AB, B, and BC grades.',
      title: 'Worked Example 2: Polytechnic ND1 First Semester (4.0 Scale)',
      breakdown: [
        { label: 'COM 111 (3 units, Grade A = 4.00 GP)', value: '12.00 Quality Points' },
        { label: 'COM 112 (3 units, Grade AB = 3.50 GP)', value: '10.50 Quality Points' },
        { label: 'MTH 111 (2 units, Grade B = 3.25 GP)', value: '6.50 Quality Points' },
        { label: 'GNS 101 (2 units, Grade BC = 3.00 GP)', value: '6.00 Quality Points' },
        { label: 'Total Registered Units (TCU)', value: '10 credit units' },
        { label: 'Total Quality Points (TQP)', value: '35.00 Quality Points' },
        { label: 'Semester GPA Formula (35.00 ÷ 10)', value: '3.50 GPA' },
      ],
      summary:
        'The student earns a semester GPA of 3.50, placing them precisely on track for a Distinction diploma classification (3.50+).',
    },
  ];

  const officialSources: OfficialSourceLink[] = [
    {
      title: 'National Universities Commission (NUC)',
      url: 'https://www.nuc.edu.ng/',
      description: 'Benchmark Minimum Academic Standards (BMAS) and Core Curriculum Minimum Academic Standards (CCMAS).',
    },
    {
      title: 'National Board for Technical Education (NBTE)',
      url: 'https://net.nbte.gov.ng/',
      description: 'Standards and Unified Grading Guidelines for Nigerian Polytechnics and Monotechnics.',
    },
  ];

  const toc = [
    { id: 'how-semester-gpa-works', title: 'How Semester GPA Is Calculated' },
    { id: 'quality-points-explained', title: 'Understanding Credit Units and Quality Points' },
    { id: 'university-vs-polytechnic', title: 'University 5.0 vs Polytechnic 4.0 Scale' },
    { id: 'impact-of-carryovers', title: 'How Failed and Carryover Courses Affect GPA' },
    { id: 'practical-tips', title: 'Strategies to Maximize Your Semester GPA' },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <StructuredData
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Nigeria', url: '/nigeria/' },
          { name: 'Semester GPA Calculator', url: '/nigeria/gpa-calculator/' },
        ]}
        webApp={{
          name: 'Nigeria Semester GPA Calculator 2026',
          url: '/nigeria/gpa-calculator/',
          description: 'Compute single-semester GPA for Nigerian universities (5.0 scale) and polytechnics (4.0 scale) with course-level quality points.',
          applicationCategory: 'EducationalApplication',
        }}
        faqs={faqs}
      />

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

        <div className="mt-4 rounded-xl border border-brand/20 bg-brand-soft/40 p-4 text-sm text-neutral-800 leading-relaxed max-w-3xl">
          <strong>Quick Answer:</strong> To calculate your semester Grade Point Average (GPA) in Nigeria, multiply the credit units of each course by the grade point earned (A=5.0, B=4.0, C=3.0, D=2.0, E=1.0, F=0.0 on the NUC scale) to get Quality Points. Sum the quality points and divide by total registered credit units: <code>GPA = Total Quality Points ÷ Total Credit Units</code>.
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
          <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-2xs space-y-4">
            <h2 className="text-base font-bold text-neutral-900 border-b border-neutral-100 pb-3">
              Semester Courses ({courses.length})
            </h2>

            <div className="space-y-3">
              {courses.map((course) => (
                <div key={course.id} className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center">
                  <div className="sm:col-span-5">
                    <input
                      type="text"
                      value={course.code}
                      onChange={(e) => updateCourse(course.id, 'code', e.target.value)}
                      placeholder="Course Code (e.g. MTH 101)"
                      className="w-full rounded-md border border-neutral-300 py-1.5 px-2.5 text-xs font-medium text-neutral-900 focus:outline-none focus:ring-1 focus:ring-brand"
                    />
                  </div>
                  <div className="sm:col-span-3">
                    <select
                      value={course.units}
                      onChange={(e) => updateCourse(course.id, 'units', parseInt(e.target.value) || 0)}
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
                      onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
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

      <SeoArticle
        toc={toc}
        workedExamples={workedExamples}
        officialSources={officialSources}
        ratesCheckedDate={ngRates.verifiedDate}
      >
        <section id="how-semester-gpa-works" className="space-y-4">
          <h2 className="text-2xl font-bold text-neutral-900">How Semester GPA Is Calculated</h2>
          <p className="text-neutral-700 leading-relaxed">
            In the Nigerian tertiary education system, Grade Point Average (GPA) represents a student&apos;s academic performance within a specific term. Every course registered on your official semester course registration slip carries a prescribed number of credit units, typically ranging from 1 to 6 units depending on lecture hours, practical laboratories, and tutorial sessions.
          </p>
          <p className="text-neutral-700 leading-relaxed">
            When semester examinations are marked, raw percentage scores are translated into letter grades according to the institution&apos;s academic regulations. Each letter grade corresponds to an exact grade point value. By multiplying the course&apos;s credit unit load by this grade point, you obtain the Quality Points (QP) generated by that course. The sum of all Quality Points divided by the Total Credit Units registered yields your semester GPA.
          </p>
        </section>

        <section id="quality-points-explained" className="space-y-4">
          <h2 className="text-2xl font-bold text-neutral-900">Understanding Credit Units and Quality Points</h2>
          <p className="text-neutral-700 leading-relaxed">
            The weighted credit system ensures that substantial core subjects influence your grade point average more heavily than brief introductory or elective courses. For example, a 4-unit engineering mathematics course contributes twice as many quality points to both your numerator and denominator as a 2-unit general studies elective.
          </p>
          <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4">
            <h3 className="font-semibold text-neutral-900 mb-2">Fundamental Mathematical Formulas:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-neutral-700">
              <li><code>Quality Points (QP) = Credit Units (CU) × Grade Point (GP)</code></li>
              <li><code>Total Quality Points (TQP) = Σ (CU × GP) across all semester courses</code></li>
              <li><code>Total Credit Units (TCU) = Σ (CU) across all registered courses</code></li>
              <li><code>Semester GPA = TQP ÷ TCU</code></li>
            </ul>
          </div>
        </section>

        <section id="university-vs-polytechnic" className="space-y-4">
          <h2 className="text-2xl font-bold text-neutral-900">University 5.0 vs Polytechnic 4.0 Scale</h2>
          <p className="text-neutral-700 leading-relaxed">
            Nigerian universities operate under the regulatory guidelines of the National Universities Commission (NUC), utilizing the 5.00 cumulative scale. In contrast, polytechnics and monotechnics award National Diplomas (ND) and Higher National Diplomas (HND) under the National Board for Technical Education (NBTE), which mandates a 4.00 cumulative scale.
          </p>
          <div className="overflow-x-auto rounded-lg border border-neutral-200">
            <table className="w-full text-left text-sm text-neutral-700">
              <thead className="bg-neutral-100 text-xs font-bold uppercase text-neutral-800">
                <tr>
                  <th className="px-4 py-3">Score Range</th>
                  <th className="px-4 py-3">Letter Grade</th>
                  <th className="px-4 py-3">NUC University GP</th>
                  <th className="px-4 py-3">NBTE Polytechnic GP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                <tr>
                  <td className="px-4 py-3 font-medium">70% – 100%</td>
                  <td className="px-4 py-3 font-bold text-brand">A</td>
                  <td className="px-4 py-3">5.00</td>
                  <td className="px-4 py-3">4.00</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">65% – 69%</td>
                  <td className="px-4 py-3">AB (Poly) / B (Uni)</td>
                  <td className="px-4 py-3">4.00</td>
                  <td className="px-4 py-3">3.50</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">60% – 64%</td>
                  <td className="px-4 py-3 font-bold">B</td>
                  <td className="px-4 py-3">4.00</td>
                  <td className="px-4 py-3">3.25</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">50% – 59%</td>
                  <td className="px-4 py-3">C / BC</td>
                  <td className="px-4 py-3">3.00</td>
                  <td className="px-4 py-3">3.00 – 2.75</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">45% – 49%</td>
                  <td className="px-4 py-3">D / CD</td>
                  <td className="px-4 py-3">2.00</td>
                  <td className="px-4 py-3">2.50 – 2.25</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">40% – 44%</td>
                  <td className="px-4 py-3">E</td>
                  <td className="px-4 py-3">1.00</td>
                  <td className="px-4 py-3">2.00</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">0% – 39%</td>
                  <td className="px-4 py-3 font-bold text-danger">F</td>
                  <td className="px-4 py-3">0.00</td>
                  <td className="px-4 py-3">0.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section id="impact-of-carryovers" className="space-y-4">
          <h2 className="text-2xl font-bold text-neutral-900">How Failed and Carryover Courses Affect GPA</h2>
          <p className="text-neutral-700 leading-relaxed">
            One of the most persistent misconceptions among Nigerian undergraduates is that an F grade is simply &quot;dropped&quot; or erased upon retaking the course. In reality, under standard NUC rules, failing a course adds zero quality points while the credit units remain permanently lodged in the denominator of that semester.
          </p>
          <p className="text-neutral-700 leading-relaxed">
            When you sit for a carryover exam in a subsequent session, the new units and grade points are credited to that future term. While your overall CGPA improves as positive quality points are added, the historical semester GPA of the term where the failure occurred remains unchanged on your permanent academic transcript.
          </p>
        </section>

        <section id="practical-tips" className="space-y-4">
          <h2 className="text-2xl font-bold text-neutral-900">Strategies to Maximize Your Semester GPA</h2>
          <p className="text-neutral-700 leading-relaxed">
            Because credit unit weighting determines the magnitude of your quality points, optimizing your study schedule around high-unit courses yields the highest return on academic effort:
          </p>
          <ul className="list-disc list-inside space-y-2 text-neutral-700">
            <li><strong>Prioritize 3-unit and 4-unit courses:</strong> Earning an A in a 4-unit course contributes 20.0 quality points, whereas an A in a 1-unit practical course delivers only 5.0 quality points.</li>
            <li><strong>Eliminate F grades completely:</strong> A single D grade (2.0 GP) in a 3-unit course yields 6 quality points; an F yields zero points, effectively wasting the credit load.</li>
            <li><strong>Protect continuous assessment (CA) marks:</strong> Nigerian universities generally allot 30% to 40% of the total mark to tests, practicals, and assignments. Securing 32 out of 40 in CA allows you to achieve an A with a 38/60 exam performance.</li>
          </ul>
        </section>
      </SeoArticle>

      <RelatedTools tools={related} />
      <FaqAccordion faqs={faqs} />
    </div>
  );
}
