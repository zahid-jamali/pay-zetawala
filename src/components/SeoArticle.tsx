import React from 'react';
import Link from 'next/link';
import { ShieldCheck, BookOpen, ExternalLink, CalendarCheck } from 'lucide-react';

export interface WorkedExampleItem {
  title: string;
  scenario: string;
  inputs?: { label: string; value: string }[];
  steps?: { label: string; formula?: string; value: string; isDeduction?: boolean; highlight?: boolean }[];
  breakdown?: { label: string; value: string }[];
  summary?: string;
  resultLabel?: string;
  resultValue?: string;
  notes?: string;
}

export interface OfficialSourceLink {
  name?: string;
  title?: string;
  url: string;
  documentTitle?: string;
  description?: string;
  verifiedDate?: string;
}

export interface SeoArticleProps {
  quickAnswer?: string;
  toc?: { id: string; label?: string; title?: string }[];
  children: React.ReactNode;
  workedExamples?: WorkedExampleItem[];
  sources?: OfficialSourceLink[];
  officialSources?: OfficialSourceLink[];
  verifiedDate?: string;
  ratesCheckedDate?: string;
  disclaimer?: string;
}

export const SeoArticle: React.FC<SeoArticleProps> = ({
  quickAnswer,
  toc,
  children,
  workedExamples,
  sources,
  officialSources,
  verifiedDate,
  ratesCheckedDate,
  disclaimer = 'Calculations are provided for informational and planning purposes based on current published statutes. For official enterprise payroll filings, tax settlements, or loan agreements, always verify with the relevant statutory authority.',
}) => {
  const activeSources = sources || officialSources || [];
  const activeDate = verifiedDate || ratesCheckedDate || 'November 2026';

  return (
    <div className="mt-12 space-y-10 border-t border-neutral-200 pt-10">
      {/* Quick Answer / Featured Snippet Target */}
      {quickAnswer && (
        <div className="rounded-xl border border-brand/20 bg-brand-soft/30 p-5 sm:p-6 shadow-2xs">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-strong">
            <ShieldCheck className="h-4 w-4 text-brand" />
            <span>Quick Answer (Direct Rule)</span>
          </div>
          <p className="mt-2 text-base sm:text-lg font-medium text-neutral-900 leading-relaxed">
            {quickAnswer}
          </p>
        </div>
      )}

      {/* Table of Contents */}
      {toc && toc.length > 0 && (
        <nav aria-label="Table of Contents" className="rounded-xl border border-neutral-200 bg-neutral-50 p-5">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-700">
            <BookOpen className="h-4 w-4 text-neutral-500" />
            <span>In This Guide</span>
          </div>
          <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-neutral-700">
            {toc.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="inline-flex items-center gap-1.5 text-brand-strong hover:underline hover:text-brand"
                >
                  <span className="text-neutral-400">#</span>
                  <span>{item.label || item.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {/* Main Long-Form Article Body */}
      <article className="prose prose-neutral max-w-none prose-headings:scroll-mt-24 prose-headings:font-bold prose-headings:text-neutral-900 prose-p:text-neutral-700 prose-p:leading-relaxed prose-li:text-neutral-700 prose-table:text-sm prose-th:bg-neutral-100 prose-th:p-3 prose-td:p-3 prose-td:border-b prose-td:border-neutral-200">
        {children}
      </article>

      {/* Worked Numerical Examples */}
      {workedExamples && workedExamples.length > 0 && (
        <section className="space-y-6 pt-4">
          <div className="border-b border-neutral-200 pb-3">
            <h2 className="text-2xl font-bold tracking-tight text-neutral-900">
              Worked Real-World Examples
            </h2>
            <p className="mt-1 text-sm text-neutral-600">
              See how the statutory rules and formulas apply step-by-step with real figures.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {workedExamples.map((example, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-neutral-200 bg-white p-5 sm:p-6 shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <span className="inline-block rounded-md bg-neutral-100 px-2.5 py-1 text-xs font-bold text-neutral-700 mb-2">
                    Example #{idx + 1}
                  </span>
                  <h3 className="text-lg font-bold text-neutral-900">{example.title}</h3>
                  <p className="mt-1.5 text-xs text-neutral-600">{example.scenario}</p>

                  {/* Input parameters */}
                  {example.inputs && example.inputs.length > 0 && (
                    <div className="mt-4 rounded-lg bg-neutral-50 p-3 space-y-1.5 border border-neutral-100">
                      <span className="text-2xs font-bold uppercase tracking-wider text-neutral-500 block">
                        Starting Inputs
                      </span>
                      {example.inputs.map((inp, i) => (
                        <div key={i} className="flex justify-between text-xs">
                          <span className="text-neutral-600">{inp.label}:</span>
                          <span className="font-semibold text-neutral-900">{inp.value}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Calculation Steps */}
                  {example.steps && example.steps.length > 0 && (
                    <div className="mt-4 space-y-2 border-t border-neutral-100 pt-3">
                      <span className="text-2xs font-bold uppercase tracking-wider text-neutral-500 block">
                        Calculation Steps
                      </span>
                      {example.steps.map((st, sIdx) => (
                        <div key={sIdx} className="flex justify-between items-baseline text-xs py-0.5">
                          <div className="pr-2">
                            <span className="text-neutral-700 font-medium">{st.label}</span>
                            {st.formula && (
                              <span className="block text-2xs text-neutral-500 font-mono">
                                {st.formula}
                              </span>
                            )}
                          </div>
                          <span
                            className={`font-semibold shrink-0 ${
                              st.isDeduction
                                ? 'text-red-700'
                                : st.highlight
                                ? 'text-brand-strong font-bold'
                                : 'text-neutral-900'
                            }`}
                          >
                            {st.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Generic breakdown list if steps not provided */}
                  {example.breakdown && example.breakdown.length > 0 && (
                    <div className="mt-4 space-y-1.5 border-t border-neutral-100 pt-3">
                      <span className="text-2xs font-bold uppercase tracking-wider text-neutral-500 block">
                        Calculation Steps
                      </span>
                      {example.breakdown.map((item, bIdx) => (
                        <div key={bIdx} className="flex justify-between text-xs py-0.5">
                          <span className="text-neutral-700">{item.label}</span>
                          <span className="font-semibold text-neutral-900 font-mono">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Final Result Card or Summary */}
                {example.resultValue ? (
                  <div className="mt-6 rounded-lg bg-brand-soft/40 border border-brand/20 p-3.5 flex justify-between items-center">
                    <div>
                      <span className="text-2xs font-bold uppercase tracking-wider text-brand-strong block">
                        {example.resultLabel || 'Final Result'}
                      </span>
                      {example.notes && (
                        <span className="text-2xs text-neutral-600 block mt-0.5">{example.notes}</span>
                      )}
                    </div>
                    <span className="text-lg font-extrabold text-neutral-900 font-mono">
                      {example.resultValue}
                    </span>
                  </div>
                ) : example.summary ? (
                  <div className="mt-4 rounded-lg bg-brand-soft/30 border border-brand/20 p-3 text-xs text-neutral-800">
                    {example.summary}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Sources & Verification Date Box */}
      {activeSources.length > 0 && (
        <footer className="rounded-xl border border-neutral-200 bg-neutral-50 p-5 sm:p-6 space-y-4 text-xs text-neutral-600">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-200 pb-3">
            <div className="flex items-center gap-2 text-neutral-900 font-bold">
              <CalendarCheck className="h-4 w-4 text-brand" />
              <span>Official Legal Sources &amp; Verification</span>
            </div>
            <span className="text-2xs font-semibold text-neutral-500">
              Last checked on {activeDate}
            </span>
          </div>

          <ul className="space-y-1.5">
            {activeSources.map((src, i) => (
              <li key={i} className="flex items-center justify-between">
                <span className="text-neutral-800 font-medium">
                  {src.name || src.title} — <span className="text-neutral-600">{src.documentTitle || src.description}</span>
                </span>
                <a
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-brand-strong hover:underline ml-2"
                >
                  <span>Official Link</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            ))}
          </ul>

          <div className="pt-2 text-2xs text-neutral-500 border-t border-neutral-200 leading-normal">
            <strong>Disclaimer:</strong> {disclaimer}
          </div>
        </footer>
      )}
    </div>
  );
};
