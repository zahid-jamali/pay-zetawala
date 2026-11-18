import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { getPagesByCountry } from '@/config/pages';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { FaqAccordion } from '@/components/FaqAccordion';
import { ArrowRight, ShieldCheck, GraduationCap, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Nigeria University & Polytechnic CGPA Calculators 2026 | Pay',
  description:
    'Free Nigeria calculators for NUC 5.0 University CGPA, NBTE 4.0 Polytechnic CGPA, Semester GPA, and Target CGPA to reach First Class or 2:1 honours.',
};

export default function NigeriaHubPage() {
  const tools = getPagesByCountry('ng').filter(p => p.type === 'tool');

  const faqs = [
    {
      question: 'What is the standard university grading scale in Nigeria?',
      answer:
        'The National Universities Commission (NUC) BMAS and CCMAS guidelines mandate a <strong>5-point grading scale</strong> across Nigerian universities:<br/><br/>• 70% – 100%: Grade A (5.0 Points)<br/>• 60% – 69%: Grade B (4.0 Points)<br/>• 50% – 59%: Grade C (3.0 Points)<br/>• 45% – 49%: Grade D (2.0 Points)<br/>• 40% – 44%: Grade E (1.0 Point)<br/>• 0% – 39%: Grade F (0.0 Points)',
    },
    {
      question: 'What are the official NUC degree classifications?',
      answer:
        '• <strong>4.50 – 5.00:</strong> First Class Honours<br/>• <strong>3.50 – 4.49:</strong> Second Class Honours (Upper Division / 2:1)<br/>• <strong>2.40 – 3.49:</strong> Second Class Honours (Lower Division / 2:2)<br/>• <strong>1.50 – 2.39:</strong> Third Class Honours<br/>• <strong>Below 1.50:</strong> Fail / Ineligible to graduate (Pass degree was abolished nationally by NUC in 2013).',
    },
    {
      question: 'How do polytechnics grade in Nigeria?',
      answer:
        'The National Board for Technical Education (NBTE) specifies a <strong>4.0 scale</strong> for National Diploma (ND) and Higher National Diploma (HND) programs:<br/><br/>• 3.50 – 4.00: <strong>Distinction</strong><br/>• 3.00 – 3.49: <strong>Upper Credit</strong><br/>• 2.50 – 2.99: <strong>Lower Credit</strong><br/>• 2.00 – 2.49: <strong>Pass</strong><br/>• Below 2.00: Fail',
    },
    {
      question: 'How are repeated or carryover courses handled in CGPA?',
      answer:
        'Under NUC regulations, both the failed attempt (0.0 GP) and the successful retake are <strong>permanently included</strong> in the cumulative units registered and cumulative quality points earned. Retaking a course does not erase the original attempt from the denominator.',
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <Breadcrumbs items={[{ label: 'Nigeria' }]} />

      <div className="border-b border-neutral-200 pb-8 pt-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft px-3 py-1 text-xs font-semibold text-brand-strong mb-3">
          <ShieldCheck className="h-3.5 w-3.5 text-brand" />
          <span>Official NUC BMAS & NBTE Standards Compliant</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
          Nigeria Tertiary CGPA & Academic Grading Calculators
        </h1>
        <p className="mt-3 text-base text-neutral-600 max-w-3xl leading-relaxed">
          Accurate cumulative grade point average calculators for Nigerian universities (NUC 5.0 scale) and polytechnics (NBTE 4.0 scale). Calculate semester GPAs, track cumulative performance across multiple sessions, and compute target GPAs needed for First Class or Upper Credit.
        </p>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-bold text-neutral-900 mb-6">
          Grading Tools & Academic Calculators
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {tools.map(tool => (
            <Link
              key={tool.id}
              href={tool.path}
              className="group flex flex-col justify-between rounded-xl border border-neutral-200 bg-white p-6 shadow-2xs hover:border-brand-strong hover:shadow-md transition-all"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-neutral-500 mb-2">
                  <span>{tool.category}</span>
                  <GraduationCap className="h-4 w-4 text-brand" />
                </div>
                <h3 className="text-lg font-bold text-neutral-900 group-hover:text-brand-strong transition-colors">
                  {tool.shortTitle}
                </h3>
                <p className="mt-2 text-xs text-neutral-600 leading-relaxed">
                  {tool.description}
                </p>
              </div>
              <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-brand-strong">
                <span>Open calculator</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Primary NUC Standards Highlights */}
      <div className="mt-12 rounded-xl border border-neutral-200 bg-neutral-50 p-6 sm:p-8">
        <h2 className="text-lg font-bold text-neutral-900 mb-4">
          Nigeria Tertiary Grading Standards in Force
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-neutral-700 leading-relaxed">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-brand shrink-0 mt-0.5" />
            <div>
              <strong>NUC 5.0 Scale:</strong> First Class begins at 4.50; 2:1 begins at 3.50; 2:2 begins at 2.40; Third Class is 1.50 – 2.39.
            </div>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-brand shrink-0 mt-0.5" />
            <div>
              <strong>NBTE 4.0 Scale:</strong> Distinction begins at 3.50; Upper Credit is 3.00 – 3.49; Lower Credit is 2.50 – 2.99; Pass is 2.00 – 2.49.
            </div>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-brand shrink-0 mt-0.5" />
            <div>
              <strong>Pass Degree Abolition:</strong> The National Universities Commission abolished the Pass degree (1.00 – 1.49) nationally for all university intakes from 2013 onwards.
            </div>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-brand shrink-0 mt-0.5" />
            <div>
              <strong>Cumulative Retake Rule:</strong> Course units and grade points from failed attempts are never erased when retaking a carryover course.
            </div>
          </div>
        </div>
      </div>

      <FaqAccordion faqs={faqs} />
    </div>
  );
}
