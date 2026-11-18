import React from 'react';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SeoArticle, WorkedExampleItem, OfficialSourceLink } from '@/components/SeoArticle';
import { StructuredData } from '@/components/StructuredData';
import { getNgRates } from '@/lib/seo/rules-content';
import { Building2, Calculator, Award, GraduationCap, HelpCircle } from 'lucide-react';

export default function GuidePolytechnicGradingSystemExplained() {
  const ngRates = getNgRates();

  const faqs = [
    {
      question: 'What is the maximum CGPA scale for polytechnics in Nigeria?',
      answer:
        `Under the National Board for Technical Education (NBTE) unified grading curriculum, Nigerian polytechnics and monotechnics operate on a maximum ${ngRates.nbteMaxScale.toFixed(1)} scale. This applies to both National Diploma (ND) and Higher National Diploma (HND) programmes.`,
    },
    {
      question: 'What are the official NBTE diploma classification tiers?',
      answer:
        `The official NBTE classifications are: Distinction (${ngRates.nbteDistinctionMin.toFixed(2)} – 4.00), Upper Credit (${ngRates.nbteUpperCreditMin.toFixed(2)} – 3.49), Lower Credit (${ngRates.nbteLowerCreditMin.toFixed(2)} – 2.99), and Pass (${ngRates.nbtePassMin.toFixed(2)} – 2.49). Any score below 2.00 is classified as Fail.`,
    },
    {
      question: 'What minimum ND grade is required for HND admission in Nigeria?',
      answer:
        'To qualify for Higher National Diploma (HND) admission, a candidate must have completed a relevant National Diploma with at least a Lower Credit (2.50+ CGPA) and one year of post-ND Industrial Training (IT). Candidates with a Pass grade (2.00–2.49) are generally required to complete two full years of Industrial Training.',
    },
    {
      question: 'How does the NBTE 4.0 scale differ from the university NUC 5.0 scale?',
      answer:
        'Universities use a 6-letter 5-point scale (A=5.0, B=4.0, C=3.0, D=2.0, E=1.0, F=0.0). Polytechnics use an 11-band or 9-band system featuring intermediate fractional grades such as AB (3.50), BC (3.00), and CD (2.50), reflecting a more granular breakdown of technical and practical competencies.',
    },
    {
      question: 'Does your ND CGPA carry over to your HND program?',
      answer:
        'No. National Diploma (ND) and Higher National Diploma (HND) are distinct, separate academic qualifications. When you gain admission into HND1, your academic slate is reset to zero, and your HND CGPA is computed independently across your four HND semesters.',
    },
  ];

  const workedExamples: WorkedExampleItem[] = [
    {
      title: 'ND1 First Semester Calculation (10 Credit Units on 4.0 Scale)',
      scenario:
        'An electrical engineering student completes 4 technical courses totaling 10 credit units, scoring A, AB, B, and BC grades.',
      inputs: [
        { label: 'Academic Program', value: 'National Diploma 1 (ND1)' },
        { label: 'Grading System', value: 'NBTE 4.0 Scale' },
        { label: 'Total Units Registered', value: '10 credit units' },
      ],
      steps: [
        { label: 'EEC 111 (3 units × Grade A 4.00)', formula: '3 × 4.00 GP', value: '12.00 QP' },
        { label: 'EEC 112 (3 units × Grade AB 3.50)', formula: '3 × 3.50 GP', value: '10.50 QP' },
        { label: 'MTH 111 (2 units × Grade B 3.25)', formula: '2 × 3.25 GP', value: '6.50 QP' },
        { label: 'GNS 101 (2 units × Grade BC 3.00)', formula: '2 × 3.00 GP', value: '6.00 QP' },
        { label: 'Total Quality Points (TQP)', formula: '12.00 + 10.50 + 6.50 + 6.00', value: '35.00 QP', highlight: true },
        { label: 'Semester GPA Formula', formula: '35.00 TQP ÷ 10 TCU', value: '3.50 GPA' },
      ],
      resultLabel: 'Semester GPA Standing',
      resultValue: '3.50 GPA (Distinction Pace)',
      notes: 'Directly on pace for an overall Distinction diploma award.',
    },
    {
      title: 'Final HND Graduation Standing: Distinction Threshold (3.50 CGPA)',
      scenario:
        'An HND computer science student completes 70 total credit units across four semesters, accumulating 248.50 quality points.',
      inputs: [
        { label: 'Total HND Credit Units', value: '70 units' },
        { label: 'Total Quality Points Earned', value: '248.50 QP' },
      ],
      steps: [
        { label: 'HND Cumulative CGPA', formula: '248.50 TQP ÷ 70 TCU', value: '3.55 CGPA', highlight: true },
        { label: 'Distinction Benchmark (NBTE)', formula: 'Minimum 3.50 CGPA required', value: `${ngRates.nbteDistinctionMin.toFixed(2)} CGPA` },
        { label: 'Academic Classification', formula: '3.55 >= 3.50', value: 'Distinction Awarded', highlight: true },
      ],
      resultLabel: 'Diploma Honors Class',
      resultValue: 'Higher National Diploma with Distinction',
      notes: 'Eligible for direct university PGD or master’s conversion programs.',
    },
  ];

  const officialSources: OfficialSourceLink[] = [
    {
      name: 'National Board for Technical Education (NBTE)',
      documentTitle: 'Unified Grading System & Curriculum Guidelines for Technical Institutions',
      url: 'https://net.nbte.gov.ng',
      verifiedDate: ngRates.verifiedDate,
    },
    {
      name: 'Federal Ministry of Education (Nigeria)',
      documentTitle: 'Guidelines on Technical, Vocational & Monotechnic Education',
      url: 'https://education.gov.ng',
      verifiedDate: ngRates.verifiedDate,
    },
  ];

  const toc = [
    { id: 'nbte-scale-overview', label: '1. The NBTE 4.0 Unified Grading Scale' },
    { id: 'letter-grades-and-weights', label: '2. Letter Grades & Numerical Grade Weights' },
    { id: 'diploma-classifications', label: '3. Distinction, Upper Credit, Lower Credit & Pass' },
    { id: 'polytechnic-vs-university', label: '4. Polytechnic 4.0 vs University 5.0 Scales' },
    { id: 'hnd-admission-rules', label: '5. HND Admission & Industrial Training (IT) Rules' },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <StructuredData
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Nigeria', url: '/nigeria/' },
          { name: 'Guides', url: '/nigeria/' },
          { name: 'Polytechnic Grading System', url: '/nigeria/guides/polytechnic-grading-system-explained/' },
        ]}
        article={{
          headline: 'Polytechnic Grading System Explained: NBTE 4.0 Scale Guide (2026)',
          description: 'A complete breakdown of the NBTE 4.0 grading scale for National Diploma (ND) and Higher National Diploma (HND) programmes in Nigeria.',
          url: 'https://pay.zetawala.com/nigeria/guides/polytechnic-grading-system-explained/',
          datePublished: '2026-03-30T08:00:00+01:00',
          dateModified: '2026-11-18T01:00:00+01:00',
        }}
        faqs={faqs}
      />

      <Breadcrumbs
        items={[
          { label: 'Nigeria', href: '/nigeria/' },
          { label: 'Guides', href: '/nigeria/' },
          { label: 'NBTE Poly Grading' },
        ]}
      />

      <header className="border-b border-neutral-200 pb-6 pt-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft px-3 py-1 text-xs font-semibold text-brand-strong mb-2">
          <Building2 className="h-3.5 w-3.5 text-brand" />
          <span>Technical Education Standards</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
          Polytechnic Grading System Explained (NBTE Scale)
        </h1>
        <p className="mt-2 text-sm sm:text-base text-neutral-600 leading-relaxed">
          How the National Board for Technical Education (NBTE) 4.0 CGPA scale, fractional letter grades (AB, BC, CD), and diploma classifications operate in Nigerian polytechnics.
        </p>
      </header>

      {/* Tool Shortcut */}
      <div className="mt-6 rounded-xl border border-brand/30 bg-brand-soft/20 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-bold text-neutral-900">Calculate your polytechnic GPA</h2>
          <p className="text-xs text-neutral-600">Enter your course grades to compute your exact ND or HND cumulative average on the 4.0 scale.</p>
        </div>
        <Link
          href="/nigeria/polytechnic-cgpa-calculator/"
          className="inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-brand-strong transition-colors shrink-0"
        >
          <Calculator className="h-4 w-4" />
          <span>Polytechnic CGPA Calculator</span>
        </Link>
      </div>

      <SeoArticle
        quickAnswer={`Under the National Board for Technical Education (NBTE) 4.0 scale, diploma performance is classified into four tiers: Distinction (3.50 – 4.00), Upper Credit (3.00 – 3.49), Lower Credit (2.50 – 2.99), and Pass (2.00 – 2.49). HND admission requires at least Lower Credit with 1-year IT, or Pass with 2-year IT.`}
        toc={toc}
        workedExamples={workedExamples}
        sources={officialSources}
        verifiedDate={ngRates.verifiedDate}
      >
        <section id="nbte-scale-overview" className="space-y-4">
          <h2>1. The NBTE 4.0 Unified Grading Scale</h2>
          <p>
            In Nigeria, polytechnics, monotechnics, and specialized colleges of technology are regulated by the <strong>National Board for Technical Education (NBTE)</strong>.
          </p>
          <p>
            Unlike federal and state universities that grade on a 5.00 cumulative ceiling, the NBTE enforces a <strong>4.00 maximum cumulative grade point average</strong>. This system applies universally to both the two-year National Diploma (ND) and the subsequent two-year Higher National Diploma (HND) programs across all accredited polytechnics in Nigeria (such as Yaba College of Technology, Kaduna Polytechnic, The Polytechnic Ibadan, and Federal Polytechnic Nekede).
          </p>
        </section>

        <section id="letter-grades-and-weights" className="space-y-4">
          <h2>2. Letter Grades &amp; Numerical Grade Weights</h2>
          <p>
            The NBTE unified grading system uses granular grade bands that accommodate technical continuous assessment, laboratory workshops, and practical examinations:
          </p>
          <div className="overflow-x-auto rounded-lg border border-neutral-200 my-4">
            <table className="w-full text-left text-sm text-neutral-700">
              <thead className="bg-neutral-100 text-xs font-bold uppercase text-neutral-800">
                <tr>
                  <th className="px-4 py-3">Raw Examination Score</th>
                  <th className="px-4 py-3">Letter Grade</th>
                  <th className="px-4 py-3">Grade Point Weight</th>
                  <th className="px-4 py-3">Academic Meaning</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                <tr>
                  <td className="px-4 py-3 font-medium">75% – 100%</td>
                  <td className="px-4 py-3 font-bold text-brand">A</td>
                  <td className="px-4 py-3 font-bold">4.00</td>
                  <td className="px-4 py-3">Excellent</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">70% – 74%</td>
                  <td className="px-4 py-3 font-bold">AB</td>
                  <td className="px-4 py-3 font-bold">3.50</td>
                  <td className="px-4 py-3">Very Good</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">65% – 69%</td>
                  <td className="px-4 py-3 font-bold">B</td>
                  <td className="px-4 py-3 font-bold">3.25</td>
                  <td className="px-4 py-3">Good</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">60% – 64%</td>
                  <td className="px-4 py-3 font-bold">BC</td>
                  <td className="px-4 py-3 font-bold">3.00</td>
                  <td className="px-4 py-3">Above Average</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">55% – 59%</td>
                  <td className="px-4 py-3 font-bold">C</td>
                  <td className="px-4 py-3 font-bold">2.75</td>
                  <td className="px-4 py-3">Average</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">50% – 54%</td>
                  <td className="px-4 py-3 font-bold">CD</td>
                  <td className="px-4 py-3 font-bold">2.50</td>
                  <td className="px-4 py-3">Below Average</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">45% – 49%</td>
                  <td className="px-4 py-3 font-bold">D</td>
                  <td className="px-4 py-3 font-bold">2.25</td>
                  <td className="px-4 py-3">Fair</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">40% – 44%</td>
                  <td className="px-4 py-3 font-bold">E</td>
                  <td className="px-4 py-3 font-bold">2.00</td>
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

        <section id="diploma-classifications" className="space-y-4">
          <h2>3. Distinction, Upper Credit, Lower Credit &amp; Pass</h2>
          <p>
            Upon concluding your 4th semester in an ND or HND programme, your final cumulative grade point average (CGPA) dictates the official honors classification on your diploma certificate:
          </p>
          <div className="overflow-x-auto rounded-lg border border-neutral-200 my-4">
            <table className="w-full text-left text-sm text-neutral-700">
              <thead className="bg-neutral-100 text-xs font-bold uppercase text-neutral-800">
                <tr>
                  <th className="px-4 py-3">Diploma Classification</th>
                  <th className="px-4 py-3">CGPA Range</th>
                  <th className="px-4 py-3">University Equivalent</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                <tr className="bg-brand-soft/20 font-semibold text-brand-strong">
                  <td className="px-4 py-3 font-bold">Distinction</td>
                  <td className="px-4 py-3 font-mono font-bold">{ngRates.nbteDistinctionMin.toFixed(2)} – 4.00</td>
                  <td className="px-4 py-3">First Class Honours (4.50+)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Upper Credit</td>
                  <td className="px-4 py-3 font-mono font-semibold">{ngRates.nbteUpperCreditMin.toFixed(2)} – 3.49</td>
                  <td className="px-4 py-3">Second Class Upper / 2:1 (3.50+)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Lower Credit</td>
                  <td className="px-4 py-3 font-mono">{ngRates.nbteLowerCreditMin.toFixed(2)} – 2.99</td>
                  <td className="px-4 py-3">Second Class Lower / 2:2 (2.40+)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Pass</td>
                  <td className="px-4 py-3 font-mono">{ngRates.nbtePassMin.toFixed(2)} – 2.49</td>
                  <td className="px-4 py-3">Third Class (1.50+)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section id="polytechnic-vs-university" className="space-y-4">
          <h2>4. Polytechnic 4.0 vs University 5.0 Scales</h2>
          <p>
            The fundamental differences between the two systems are structural:
          </p>
          <ul>
            <li><strong>Scale Ceiling:</strong> Universities peak at 5.00, whereas polytechnics peak at 4.00.</li>
            <li><strong>Degree Separation:</strong> A university bachelor&apos;s degree runs continuously across 4 or 5 years under one cumulative CGPA. In contrast, polytechnic education is decoupled into two separate, independent two-year degrees: National Diploma (ND) and Higher National Diploma (HND).</li>
            <li><strong>Direct Entry (DE) Conversion:</strong> ND graduates with a minimum of Upper Credit (3.00+) can apply through JAMB Direct Entry for admission directly into 200-level bachelor&apos;s degree programs in Nigerian universities.</li>
          </ul>
        </section>

        <section id="hnd-admission-rules" className="space-y-4">
          <h2>5. HND Admission &amp; Industrial Training (IT) Rules</h2>
          <p>
            Graduating with your National Diploma does not guarantee immediate progression to HND:
          </p>
          <ul>
            <li><strong>Candidates with Lower Credit (2.50+) or Upper Credit / Distinction:</strong> Must complete a mandatory <strong>one-year post-ND Industrial Training (IT)</strong> with an accredited industrial or commercial firm before gaining admission into HND1.</li>
            <li><strong>Candidates with a Pass Grade (2.00 – 2.49):</strong> Must complete <strong>two full years of post-ND Industrial Training</strong> before polytechnic academic boards will consider their HND application.</li>
          </ul>
        </section>
      </SeoArticle>
    </div>
  );
}
