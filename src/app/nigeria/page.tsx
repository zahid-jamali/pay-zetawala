import React from 'react';
import Link from 'next/link';
import { getPagesByCountry } from '@/config/pages';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { FaqAccordion } from '@/components/FaqAccordion';
import { StructuredData } from '@/components/StructuredData';
import { getNgRates } from '@/lib/seo/rules-content';
import { ArrowRight, ShieldCheck, Calculator, BookOpen, HelpCircle } from 'lucide-react';

export default function NigeriaHubPage() {
  const ngRates = getNgRates();
  const tools = getPagesByCountry('ng').filter((p) => p.type === 'tool');
  const guides = getPagesByCountry('ng').filter((p) => p.type === 'guide');

  const faqs = [
    {
      question: 'What is the standard university CGPA scale in Nigeria?',
      answer:
        `Under the benchmark guidelines of the National Universities Commission (NUC), all Nigerian federal, state, and private universities use a 5-point cumulative scale. First Class Honours starts at ${ngRates.nucFirstClassMin.toFixed(2)}, Second Class Upper (2:1) starts at ${ngRates.nucSecondClassUpperMin.toFixed(2)}, Second Class Lower (2:2) starts at ${ngRates.nucSecondClassLowerMin.toFixed(2)}, and Third Class starts at ${ngRates.nucThirdClassMin.toFixed(2)}.`,
    },
    {
      question: 'How do polytechnics grade students compared to universities?',
      answer:
        `Polytechnics and monotechnics in Nigeria operate under the National Board for Technical Education (NBTE) on a 4.00 cumulative scale. Awards include Distinction (${ngRates.nbteDistinctionMin.toFixed(2)}–4.00), Upper Credit (${ngRates.nbteUpperCreditMin.toFixed(2)}–3.49), Lower Credit (${ngRates.nbteLowerCreditMin.toFixed(2)}–2.99), and Pass (${ngRates.nbtePassMin.toFixed(2)}–2.49).`,
    },
    {
      question: 'Why should I never calculate my CGPA by averaging semester GPAs directly?',
      answer:
        'Averaging semester GPAs directly produces false numbers whenever semesters carry different credit units. In the Nigerian tertiary system, you must sum all Quality Points earned across all courses and divide by Total Credit Units registered.',
    },
    {
      question: 'How does an F grade affect my cumulative CGPA?',
      answer:
        'An F grade adds zero quality points while its full credit units remain in the denominator. When you retake the course, the new grade points and units are added to your cumulative total, but the historical semester record remains on your permanent transcript.',
    },
    {
      question: 'What minimum ND grade is needed for HND admission in Nigeria?',
      answer:
        'Admission into Higher National Diploma (HND) programmes requires a minimum of Lower Credit (2.50+ CGPA) and one year of post-ND Industrial Training (IT). Candidates with a Pass grade (2.00–2.49) require two full years of IT.',
    },
  ];

  return (
    <div>
      <StructuredData
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Nigeria', url: '/nigeria/' },
        ]}
        faqs={faqs}
      />

      {/* Hero Banner */}
      <section className="border-b border-neutral-200 bg-gradient-to-b from-white to-neutral-50/60 py-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Breadcrumbs items={[{ label: 'Nigeria' }]} />
          <div className="mt-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand-soft px-3 py-1 text-xs font-semibold text-brand-strong mb-3">
              <ShieldCheck className="h-3.5 w-3.5 text-brand" />
              <span>Official NUC &amp; NBTE Standards</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
              Nigeria CGPA &amp; Academic Calculators 2026
            </h1>
            <p className="mt-3 text-base text-neutral-700 max-w-3xl leading-relaxed">
              Free, accurate academic grading calculators for Nigerian universities and polytechnics. Calculate 5-point university CGPA, 4-point polytechnic diploma GPA, single-semester performance, and target GPAs needed for First Class or 2:1 honours.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {/* Degree & Diploma Classification Overview */}
        <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-neutral-200 gap-2">
            <div>
              <h2 className="text-base font-bold text-neutral-900">Nigerian Tertiary Grading Cutoffs</h2>
              <p className="text-xs text-neutral-600 mt-0.5">Harmonized by the National Universities Commission (NUC) &amp; National Board for Technical Education (NBTE)</p>
            </div>
            <span className="text-xs font-semibold text-neutral-600 bg-neutral-100 px-2.5 py-1 rounded self-start sm:self-auto">
              Verified: {ngRates.verifiedDate}
            </span>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-xs text-neutral-700">
              <thead className="bg-neutral-100 text-neutral-900 uppercase font-bold text-2xs tracking-wider">
                <tr>
                  <th className="py-3 px-3.5 font-bold">Classification Tier</th>
                  <th className="py-3 px-3.5 font-bold">University (NUC 5.0 Scale)</th>
                  <th className="py-3 px-3.5 font-bold">Polytechnic (NBTE 4.0 Scale)</th>
                  <th className="py-3 px-3.5 font-bold">Academic Distinction</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                <tr className="bg-brand-soft/50 border-l-4 border-l-brand">
                  <td className="py-3 px-3.5 font-bold text-brand-strong">Highest Honors</td>
                  <td className="py-3 px-3.5 font-bold text-neutral-900 tabular-nums">{ngRates.nucFirstClassMin.toFixed(2)} – 5.00 (First Class)</td>
                  <td className="py-3 px-3.5 font-bold text-neutral-900 tabular-nums">{ngRates.nbteDistinctionMin.toFixed(2)} – 4.00 (Distinction)</td>
                  <td className="py-3 px-3.5 text-neutral-700 font-medium">Summa / Magna Cum Laude</td>
                </tr>
                <tr className="hover:bg-neutral-50/50 transition-colors">
                  <td className="py-3 px-3.5 font-semibold text-neutral-900">Upper Middle Tier</td>
                  <td className="py-3 px-3.5 text-neutral-900 font-semibold tabular-nums">{ngRates.nucSecondClassUpperMin.toFixed(2)} – 4.49 (Second Class Upper / 2:1)</td>
                  <td className="py-3 px-3.5 text-neutral-900 font-semibold tabular-nums">{ngRates.nbteUpperCreditMin.toFixed(2)} – 3.49 (Upper Credit)</td>
                  <td className="py-3 px-3.5 text-neutral-700 font-medium">High Merit Standing</td>
                </tr>
                <tr className="hover:bg-neutral-50/50 transition-colors">
                  <td className="py-3 px-3.5 font-semibold text-neutral-900">Lower Middle Tier</td>
                  <td className="py-3 px-3.5 text-neutral-900 font-semibold tabular-nums">{ngRates.nucSecondClassLowerMin.toFixed(2)} – 3.49 (Second Class Lower / 2:2)</td>
                  <td className="py-3 px-3.5 text-neutral-900 font-semibold tabular-nums">{ngRates.nbteLowerCreditMin.toFixed(2)} – 2.99 (Lower Credit)</td>
                  <td className="py-3 px-3.5 text-neutral-700 font-medium">Standard Passing Honours</td>
                </tr>
                <tr className="hover:bg-neutral-50/50 transition-colors">
                  <td className="py-3 px-3.5 font-semibold text-neutral-900">Passing Tier</td>
                  <td className="py-3 px-3.5 text-neutral-900 font-semibold tabular-nums">{ngRates.nucThirdClassMin.toFixed(2)} – 2.39 (Third Class)</td>
                  <td className="py-3 px-3.5 text-neutral-900 font-semibold tabular-nums">{ngRates.nbtePassMin.toFixed(2)} – 2.49 (Pass)</td>
                  <td className="py-3 px-3.5 text-neutral-700 font-medium">Minimum Graduation Threshold</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Main Tools Grid */}
        <div className="mt-12">
          <h2 className="text-xl font-bold text-neutral-900 mb-6 flex items-center gap-2">
            <Calculator className="h-5 w-5 text-brand" />
            <span>Academic Calculators &amp; Planners</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {tools.map((tool) => (
              <Link
                key={tool.id}
                href={tool.path}
                className="group flex flex-col justify-between rounded-xl border border-neutral-200 bg-white p-6 shadow-2xs hover:border-brand hover:shadow-md transition-all"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold text-neutral-600 mb-2">
                    <span>{tool.category}</span>
                    <span className="text-brand-strong font-bold bg-brand-soft px-2 py-0.5 rounded">2026</span>
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 group-hover:text-brand-strong transition-colors">
                    {tool.shortTitle}
                  </h3>
                  <p className="mt-2 text-xs text-neutral-600 leading-relaxed">
                    {tool.description}
                  </p>
                </div>
                <div className="mt-6 flex items-center justify-between border-t border-neutral-100 pt-3">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-strong">
                    <span>Calculate Now</span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Comprehensive Guides */}
        <div className="mt-14">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-brand" />
              <span>Nigerian Academic &amp; Grading Guides ({guides.length})</span>
            </h2>
            <Link
              href="/nigeria/faq/"
              className="text-xs font-bold text-brand-strong hover:underline flex items-center gap-1"
            >
              <span>View All NG FAQs</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {guides.map((g) => (
              <Link
                key={g.id}
                href={g.path}
                className="group rounded-xl border border-neutral-200 bg-white p-4 shadow-2xs hover:border-brand hover:shadow-xs transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-2xs font-bold uppercase tracking-wider text-neutral-500 block mb-1">
                    Guide
                  </span>
                  <h3 className="text-sm font-bold text-neutral-900 group-hover:text-brand-strong transition-colors line-clamp-2">
                    {g.shortTitle}
                  </h3>
                  <p className="mt-1.5 text-2xs text-neutral-600 line-clamp-3 leading-relaxed">
                    {g.description}
                  </p>
                </div>
                <span className="mt-3 inline-flex items-center gap-1 text-2xs font-bold text-brand-strong">
                  <span>Read article</span>
                  <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* FAQ Hub Link Banner */}
        <div className="mt-14 rounded-xl border border-brand/30 bg-brand-soft p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-brand-strong mb-1">
              <HelpCircle className="h-4 w-4 text-brand" />
              <span>Questions about degree classifications, carryovers, or grade points?</span>
            </div>
            <p className="text-xs text-neutral-700 font-medium">Browse our 25+ detailed answers on NUC and NBTE tertiary grading standards.</p>
          </div>
          <Link
            href="/nigeria/faq/"
            className="inline-flex items-center gap-1.5 rounded-lg bg-brand hover:bg-brand-hover px-4 py-2 text-xs font-bold text-white shadow-xs transition-colors shrink-0"
          >
            <span>Open Nigeria FAQ Hub</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="mt-12">
          <FaqAccordion faqs={faqs} />
        </div>
      </div>
    </div>
  );
}