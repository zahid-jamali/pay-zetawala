import React from 'react';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SeoArticle, WorkedExampleItem, OfficialSourceLink } from '@/components/SeoArticle';
import { StructuredData } from '@/components/StructuredData';
import { getNgRates } from '@/lib/seo/rules-content';
import { GraduationCap, Calculator, Target, Award, HelpCircle } from 'lucide-react';

export default function GuideNigerianDegreeClassification() {
  const ngRates = getNgRates();

  const faqs = [
    {
      question: 'What are the official NUC degree classification boundaries in Nigeria?',
      answer:
        `Under National Universities Commission (NUC) standards, the 5.0 scale classifications are: First Class Honours (${ngRates.nucFirstClassMin.toFixed(2)} – 5.00), Second Class Honours Upper Division / 2:1 (${ngRates.nucSecondClassUpperMin.toFixed(2)} – 4.49), Second Class Honours Lower Division / 2:2 (${ngRates.nucSecondClassLowerMin.toFixed(2)} – 3.49), and Third Class Honours (${ngRates.nucThirdClassMin.toFixed(2)} – 2.39).`,
    },
    {
      question: 'Does a 4.49 CGPA get rounded up to a First Class (4.50)?',
      answer:
        'No. Nigerian universities enforce strict non-rounding policies for degree honors. Under NUC BMAS regulations, a final CGPA of 4.49 is classified as Second Class Honours (Upper Division). Senate approvals do not round up fractional grade points across classification thresholds.',
    },
    {
      question: 'Was the Pass degree abolished in Nigerian universities?',
      answer:
        'Yes. In 2013, the National Universities Commission (NUC) formally abolished the Pass degree classification (formerly 1.00 – 1.49). Under current CCMAS regulations, students falling below a 1.50 CGPA at the end of a session are placed on academic probation or advised to withdraw.',
    },
    {
      question: 'Why do most Nigerian graduate trainee jobs require a minimum 2:1 degree?',
      answer:
        'Major corporate employers (such as top accounting firms, commercial banks, FMCG conglomerates, and oil and gas multinationals) receive tens of thousands of applications for few openings. A Second Class Upper (2:1 / 3.50+ CGPA) serves as an automated academic filter for aptitude tests and initial screening.',
    },
    {
      question: 'Can a Third Class or 2:2 graduate pursue a master’s degree?',
      answer:
        'Yes. Graduates with Second Class Lower (2:2) are widely eligible for postgraduate master’s programs across Nigerian federal, state, and private universities. Graduates with Third Class typically complete a one-year Postgraduate Diploma (PGD) with a credit or distinction standing to qualify for master’s admission.',
    },
  ];

  const workedExamples: WorkedExampleItem[] = [
    {
      title: 'Threshold Boundary Case: 3.49 CGPA (Second Class Lower vs Upper)',
      scenario:
        'An economics undergraduate completes all degree requirements with 130 credit units and 454.00 total quality points.',
      inputs: [
        { label: 'Total Completed Credit Units', value: '130 units' },
        { label: 'Total Quality Points (TQP)', value: '454.00 QP' },
        { label: 'Raw Mathematical Ratio', value: '454 ÷ 130 = 3.4923' },
      ],
      steps: [
        { label: 'Final Truncated/Rounded CGPA', formula: 'Calculated to 2 decimal places', value: '3.49 CGPA' },
        { label: 'Second Class Upper (2:1) Cutoff', formula: 'NUC statutory minimum', value: `${ngRates.nucSecondClassUpperMin.toFixed(2)} CGPA` },
        { label: 'Deficit from 2:1 Classification', formula: '3.50 – 3.49', value: '0.01 CGPA deficit', isDeduction: true },
        { label: 'Final Senate Classification', formula: 'Falls in 2.40–3.49 band', value: 'Second Class Lower (2:2)', highlight: true },
      ],
      resultLabel: 'Official Degree Award',
      resultValue: 'Second Class (Lower Division)',
      notes: 'No rounding up to 3.50 is permitted under NUC rules.',
    },
    {
      title: 'First Class Honours Clearance at Exactly 4.50 CGPA',
      scenario:
        'A computer engineering student completes 140 credit units with 630.00 total quality points.',
      inputs: [
        { label: 'Total Completed Credit Units', value: '140 units' },
        { label: 'Total Quality Points Earned', value: '630.00 QP' },
      ],
      steps: [
        { label: 'CGPA Ratio', formula: '630.00 TQP ÷ 140 TCU', value: '4.5000 CGPA' },
        { label: 'First Class Benchmark', formula: 'NUC minimum First Class cutoff', value: `${ngRates.nucFirstClassMin.toFixed(2)} CGPA` },
        { label: 'Qualification Result', formula: '4.50 >= 4.50 required', value: 'Qualified for First Class', highlight: true },
      ],
      resultLabel: 'Degree Classification',
      resultValue: 'First Class Honours',
      notes: 'Eligible for university valedictory honors and national scholarships.',
    },
  ];

  const officialSources: OfficialSourceLink[] = [
    {
      name: 'National Universities Commission (NUC)',
      documentTitle: 'Core Curriculum Minimum Academic Standards (CCMAS) & Degree Classification Manual',
      url: 'https://www.nuc.edu.ng',
      verifiedDate: ngRates.verifiedDate,
    },
    {
      name: 'Federal Ministry of Education (Nigeria)',
      documentTitle: 'National Policy on Tertiary Education Standards',
      url: 'https://education.gov.ng',
      verifiedDate: ngRates.verifiedDate,
    },
  ];

  const toc = [
    { id: 'nuc-classification-scale', label: '1. Official NUC 5.0 Degree Classification Scale' },
    { id: 'first-class-honours', label: '2. First Class Honours (4.50 – 5.00)' },
    { id: 'second-class-upper', label: '3. Second Class Upper / 2:1 (3.50 – 4.49)' },
    { id: 'second-class-lower', label: '4. Second Class Lower / 2:2 (2.40 – 3.49)' },
    { id: 'third-class-and-abolished-pass', label: '5. Third Class & Abolition of the Pass Degree' },
    { id: 'career-impact', label: '6. Career, Scholarship & Postgraduate Implications' },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <StructuredData
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Nigeria', url: '/nigeria/' },
          { name: 'Guides', url: '/nigeria/' },
          { name: 'Nigerian Degree Classification', url: '/nigeria/guides/nigerian-degree-classification/' },
        ]}
        article={{
          headline: 'Nigerian University Degree Classification (NUC 5.0 Scale Guide)',
          description: 'Official NUC grading cutoffs for First Class, Second Class Upper (2:1), Second Class Lower (2:2), and Third Class degrees in Nigerian universities.',
          url: 'https://pay.zetawala.com/nigeria/guides/nigerian-degree-classification/',
          datePublished: '2026-03-25T08:00:00+01:00',
          dateModified: '2026-11-18T00:00:00+01:00',
        }}
        faqs={faqs}
      />

      <Breadcrumbs
        items={[
          { label: 'Nigeria', href: '/nigeria/' },
          { label: 'Guides', href: '/nigeria/' },
          { label: 'Degree Classification' },
        ]}
      />

      <header className="border-b border-neutral-200 pb-6 pt-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft px-3 py-1 text-xs font-semibold text-brand-strong mb-2">
          <GraduationCap className="h-3.5 w-3.5 text-brand" />
          <span>Academic Honors Benchmark</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
          Nigerian University Degree Classification (NUC Scale)
        </h1>
        <p className="mt-2 text-sm sm:text-base text-neutral-600 leading-relaxed">
          The official National Universities Commission (NUC) 5.0 CGPA boundaries for First Class, Second Class Upper (2:1), Second Class Lower (2:2), and Third Class honors.
        </p>
      </header>

      {/* Tool Shortcut */}
      <div className="mt-6 rounded-xl border border-brand/30 bg-brand-soft/20 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-bold text-neutral-900">Plan your target classification</h2>
          <p className="text-xs text-neutral-600">See what semester GPA you need in remaining courses to graduate with a 2:1 or First Class.</p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/nigeria/cgpa-calculator/"
            className="inline-flex items-center gap-1.5 rounded-lg bg-brand px-3.5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-brand-strong transition-colors"
          >
            <Calculator className="h-3.5 w-3.5" />
            <span>CGPA Calculator</span>
          </Link>
          <Link
            href="/nigeria/target-cgpa-calculator/"
            className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-300 bg-white px-3.5 py-2 text-xs font-semibold text-neutral-800 shadow-xs hover:bg-neutral-50 transition-colors"
          >
            <Target className="h-3.5 w-3.5 text-neutral-600" />
            <span>Target Planner</span>
          </Link>
        </div>
      </div>

      <SeoArticle
        quickAnswer={`Under the National Universities Commission (NUC) 5.0 scale, degrees are classified into four tiers: First Class Honours (4.50 – 5.00), Second Class Honours Upper Division / 2:1 (3.50 – 4.49), Second Class Honours Lower Division / 2:2 (2.40 – 3.49), and Third Class Honours (1.50 – 2.39). The Pass degree was formally abolished in 2013.`}
        toc={toc}
        workedExamples={workedExamples}
        sources={officialSources}
        verifiedDate={ngRates.verifiedDate}
      >
        <section id="nuc-classification-scale" className="space-y-4">
          <h2>1. Official NUC 5.0 Degree Classification Scale</h2>
          <p>
            In the Nigerian university system, degree classifications are harmonized by the <strong>National Universities Commission (NUC)</strong> through the Core Curriculum Minimum Academic Standards (CCMAS).
          </p>
          <div className="overflow-x-auto rounded-lg border border-neutral-200 my-4">
            <table className="w-full text-left text-sm text-neutral-700">
              <thead className="bg-neutral-100 text-xs font-bold uppercase text-neutral-800">
                <tr>
                  <th className="px-4 py-3">Degree Classification</th>
                  <th className="px-4 py-3">Common Designation</th>
                  <th className="px-4 py-3">CGPA Range (5.0 Scale)</th>
                  <th className="px-4 py-3">Honours Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                <tr className="bg-brand-soft/20 font-semibold text-brand-strong">
                  <td className="px-4 py-3 font-bold">First Class Honours</td>
                  <td className="px-4 py-3">First Class</td>
                  <td className="px-4 py-3 font-mono font-bold">{ngRates.nucFirstClassMin.toFixed(2)} – 5.00</td>
                  <td className="px-4 py-3">Summa / Magna Cum Laude equivalent</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Second Class Honours (Upper Division)</td>
                  <td className="px-4 py-3 font-bold">2:1</td>
                  <td className="px-4 py-3 font-mono font-semibold">{ngRates.nucSecondClassUpperMin.toFixed(2)} – 4.49</td>
                  <td className="px-4 py-3">Upper Honours</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Second Class Honours (Lower Division)</td>
                  <td className="px-4 py-3 font-bold">2:2</td>
                  <td className="px-4 py-3 font-mono">{ngRates.nucSecondClassLowerMin.toFixed(2)} – 3.49</td>
                  <td className="px-4 py-3">Lower Honours</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Third Class Honours</td>
                  <td className="px-4 py-3">Third Class</td>
                  <td className="px-4 py-3 font-mono">{ngRates.nucThirdClassMin.toFixed(2)} – 2.39</td>
                  <td className="px-4 py-3">Passing Honours</td>
                </tr>
                <tr className="bg-neutral-50 text-neutral-400">
                  <td className="px-4 py-3 font-medium line-through">Pass Degree</td>
                  <td className="px-4 py-3 line-through">Pass</td>
                  <td className="px-4 py-3 font-mono line-through">1.00 – 1.49</td>
                  <td className="px-4 py-3 font-bold text-danger">ABOLISHED (2013)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section id="first-class-honours" className="space-y-4">
          <h2>2. First Class Honours (4.50 – 5.00)</h2>
          <p>
            Graduating with First Class Honours represents the highest academic pinnacle in Nigerian universities. To achieve this standing, a student must maintain a cumulative average composed predominantly of A grades (70% and above) across their entire four, five, or six years of study.
          </p>
          <p>
            First Class graduates are traditionally awarded presidential scholarships, automatic retention opportunities as graduate assistants in university faculties, and preferred consideration for international graduate funding.
          </p>
        </section>

        <section id="second-class-upper" className="space-y-4">
          <h2>3. Second Class Upper / 2:1 (3.50 – 4.49)</h2>
          <p>
            Second Class Honours (Upper Division), popularly termed &quot;Two-One&quot; (2:1), spans from a 3.50 CGPA to 4.49 CGPA.
          </p>
          <p>
            This tier represents strong academic mastery. It is the golden benchmark sought by undergraduate students across Nigeria because it meets the baseline qualifying threshold for virtually all major corporate recruitment schemes, management trainee cohorts, and competitive master&apos;s scholarship grants (such as the Petroleum Technology Development Fund and Chevening).
          </p>
        </section>

        <section id="second-class-lower" className="space-y-4">
          <h2>4. Second Class Lower / 2:2 (2.40 – 3.49)</h2>
          <p>
            Second Class Honours (Lower Division), commonly called &quot;Two-Two&quot; (2:2), is awarded to graduates finishing between 2.40 and 3.49 CGPA.
          </p>
          <p>
            Statistically, the majority of Nigerian university graduates finish within the 2:2 bracket. While certain conservative accounting and consulting firms restrict entry-level intakes to 2:1 holders, 2:2 graduates excel widely across banking, civil service, entrepreneurship, technology, and industry by bolstering their credentials with professional certifications (such as ICAN, ACCA, PMP, or AWS).
          </p>
        </section>

        <section id="third-class-and-abolished-pass" className="space-y-4">
          <h2>5. Third Class &amp; Abolition of the Pass Degree</h2>
          <p>
            Third Class Honours covers the 1.50 to 2.39 CGPA range. In 2013, the NUC abolished the Pass degree (1.00 to 1.49) to elevate university standards.
          </p>
          <p>
            Under current regulations, students whose cumulative grade point falls below 1.50 at the end of an academic session are placed on probation. If the performance remains below 1.50 following the probationary term, the student is advised to withdraw (withdrawn from the university).
          </p>
        </section>

        <section id="career-impact" className="space-y-4">
          <h2>6. Career, Scholarship &amp; Postgraduate Implications</h2>
          <p>
            Your degree classification influences your immediate post-graduation trajectory:
          </p>
          <ul>
            <li><strong>Graduate Trainee Screening:</strong> Organizations like PwC, KPMG, Deloitte, EY, NLNG, and commercial banks routinely set an automated filter requiring a minimum 2:1 degree.</li>
            <li><strong>Direct Master&apos;s Admission:</strong> Federal and state universities require a minimum of Second Class Lower (2:2) for direct entry into Master of Science (M.Sc.) programs. Third Class graduates typically enroll in a one-year Postgraduate Diploma (PGD) before progressing to master&apos;s study.</li>
            <li><strong>Foreign Scholarships:</strong> Prestigious international awards like Chevening, Commonwealth, and PTDF overseas scholarships strictly mandate a minimum 2:1 qualification.</li>
          </ul>
        </section>
      </SeoArticle>
    </div>
  );
}
