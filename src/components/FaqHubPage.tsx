import React from 'react';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { StructuredData, BreadcrumbItem, FaqItem } from '@/components/StructuredData';
import { ShieldCheck, HelpCircle, ArrowRight, ExternalLink, CalendarCheck, BookOpen, Calculator } from 'lucide-react';

export interface FaqQuestionItem {
  id?: string;
  question: string;
  answer: string | React.ReactNode;
  plainAnswer?: string; // string for JSON-LD schema if answer contains JSX
}

export interface FaqCategorySection {
  id: string;
  title: string;
  description?: string;
  items: FaqQuestionItem[];
}

export interface RelatedItem {
  title: string;
  href: string;
  description: string;
}

export interface FaqHubPageProps {
  countryName: string;
  countryFlag: string;
  title: string;
  description: string;
  breadcrumbs: BreadcrumbItem[];
  categories: FaqCategorySection[];
  relatedTools?: RelatedItem[];
  relatedGuides?: RelatedItem[];
  sources?: { title: string; url: string; authority?: string }[];
  ratesCheckedDate?: string;
}

export const FaqHubPage: React.FC<FaqHubPageProps> = ({
  countryName,
  countryFlag,
  title,
  description,
  breadcrumbs,
  categories,
  relatedTools,
  relatedGuides,
  sources,
  ratesCheckedDate = 'November 2026',
}) => {
  // Extract all questions for FAQPage structured data
  const jsonLdFaqs: FaqItem[] = categories.flatMap((cat) =>
    cat.items.map((item) => ({
      question: item.question,
      answer:
        item.plainAnswer ||
        (typeof item.answer === 'string'
          ? item.answer
          : item.question), // fallback
    }))
  );

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <Breadcrumbs items={breadcrumbs.map((b) => ({ label: b.name, href: b.url }))} />
      <StructuredData breadcrumbs={breadcrumbs} faqs={jsonLdFaqs} />

      {/* Hero Header */}
      <div className="border-b border-neutral-200 pb-8 pt-2">
        <div className="inline-flex items-center gap-2 rounded-full bg-brand-soft/60 px-3 py-1 text-xs font-semibold text-brand-strong mb-3">
          <span>{countryFlag}</span>
          <span>{countryName} Official Q&amp;A Hub</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
          {title}
        </h1>
        <p className="mt-3 text-base text-neutral-600 leading-relaxed">
          {description}
        </p>

        {/* Verification badge */}
        <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-neutral-500">
          <div className="flex items-center gap-1.5 text-brand font-medium">
            <ShieldCheck className="h-4 w-4" />
            <span>Verified from Official 2026 Gazettes &amp; Schedules</span>
          </div>
          <div className="flex items-center gap-1">
            <CalendarCheck className="h-3.5 w-3.5" />
            <span>Last audited: {ratesCheckedDate}</span>
          </div>
        </div>
      </div>

      {/* Category Quick Jump Bar */}
      {categories.length > 1 && (
        <nav aria-label="Topic index" className="mt-6 rounded-xl border border-neutral-200 bg-neutral-50 p-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-700 mb-3">
            <HelpCircle className="h-4 w-4 text-brand" />
            <span>Browse Questions by Topic</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium text-neutral-700 hover:border-brand hover:text-brand-strong transition-colors"
              >
                {cat.title} ({cat.items.length})
              </a>
            ))}
          </div>
        </nav>
      )}

      {/* Main FAQ Content Grouped by Category */}
      <div className="mt-10 space-y-12">
        {categories.map((category) => (
          <section key={category.id} id={category.id} className="scroll-mt-24 space-y-4">
            <div className="border-b border-neutral-200 pb-2">
              <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-brand"></span>
                <span>{category.title}</span>
              </h2>
              {category.description && (
                <p className="mt-1 text-xs text-neutral-500">{category.description}</p>
              )}
            </div>

            <div className="divide-y divide-neutral-200 rounded-xl border border-neutral-200 bg-white">
              {category.items.map((item, idx) => (
                <article key={item.id || idx} className="p-5 sm:p-6 space-y-2">
                  <h3 className="text-base sm:text-lg font-semibold text-neutral-900 flex items-start gap-2">
                    <span className="text-brand font-bold text-sm mt-0.5">Q:</span>
                    <span>{item.question}</span>
                  </h3>
                  <div className="pl-5 text-sm text-neutral-700 leading-relaxed space-y-2">
                    {typeof item.answer === 'string' ? (
                      <p>{item.answer}</p>
                    ) : (
                      item.answer
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Related Tools Section */}
      {relatedTools && relatedTools.length > 0 && (
        <section className="mt-14 border-t border-neutral-200 pt-8">
          <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-neutral-800 mb-4">
            <Calculator className="h-4 w-4 text-brand" />
            <span>Interactive Calculators for These Questions</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group rounded-xl border border-neutral-200 bg-white p-5 hover:border-brand hover:shadow-xs transition-all"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-neutral-900 group-hover:text-brand-strong">
                    {tool.title}
                  </h3>
                  <ArrowRight className="h-4 w-4 text-neutral-400 group-hover:text-brand group-hover:translate-x-0.5 transition-all" />
                </div>
                <p className="mt-2 text-xs text-neutral-500 line-clamp-2">
                  {tool.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Related Guides Section */}
      {relatedGuides && relatedGuides.length > 0 && (
        <section className="mt-8">
          <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-neutral-800 mb-4">
            <BookOpen className="h-4 w-4 text-brand" />
            <span>In-Depth Statutory Guides</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedGuides.map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="group rounded-xl border border-neutral-200 bg-white p-5 hover:border-brand hover:shadow-xs transition-all"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-neutral-900 group-hover:text-brand-strong">
                    {guide.title}
                  </h3>
                  <ArrowRight className="h-4 w-4 text-neutral-400 group-hover:text-brand group-hover:translate-x-0.5 transition-all" />
                </div>
                <p className="mt-2 text-xs text-neutral-500 line-clamp-2">
                  {guide.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Official Sources & Verification Footer */}
      {sources && sources.length > 0 && (
        <section className="mt-12 rounded-xl border border-neutral-200 bg-neutral-50 p-6 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-700">
            <ShieldCheck className="h-4 w-4 text-brand" />
            <span>Official Regulatory References &amp; Circulars</span>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {sources.map((src) => (
              <li key={src.url} className="flex items-start gap-1.5">
                <ExternalLink className="h-3.5 w-3.5 text-neutral-400 shrink-0 mt-0.5" />
                <div>
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-brand-strong hover:underline"
                  >
                    {src.title}
                  </a>
                  {src.authority && (
                    <span className="block text-neutral-500">{src.authority}</span>
                  )}
                </div>
              </li>
            ))}
          </ul>
          <p className="text-xs text-neutral-500 border-t border-neutral-200 pt-3">
            <strong>Editorial Disclaimer:</strong> Answers provided are compiled directly from published statutory regulations and verified fee schedules in force as of {ratesCheckedDate}. They serve as informational references and do not substitute for formal legal, accounting, or banking advice.
          </p>
        </section>
      )}
    </div>
  );
};
