'use client';

import React, { useState } from 'react';
import { CopyResultButton } from './CopyResultButton';
import { ShareButton } from './ShareButton';
import { PrintButton } from './PrintButton';
import { ChevronDown, ChevronUp, ExternalLink, ShieldCheck } from 'lucide-react';

export interface BreakdownRow {
  label: string;
  value: string | number;
  highlight?: boolean;
  sublabel?: string;
  isDeduction?: boolean;
}

export interface CalculationLegalSource {
  title: string;
  documentNumber: string;
  url?: string;
  summary: string;
}

interface ResultPanelProps {
  title: string;
  headlineValue: string;
  headlineLabel: string;
  subHeadline?: string;
  rows: BreakdownRow[];
  sources?: CalculationLegalSource[];
  copySummaryText: string;
  shareTitle: string;
  className?: string;
  calloutMessage?: {
    type: 'info' | 'success' | 'warning';
    text: string;
  };
}

export const ResultPanel: React.FC<ResultPanelProps> = ({
  title,
  headlineValue,
  headlineLabel,
  subHeadline,
  rows,
  sources,
  copySummaryText,
  shareTitle,
  className = '',
  calloutMessage,
}) => {
  const [sourcesOpen, setSourcesOpen] = useState(false);

  return (
    <div className={`w-full rounded-xl border border-neutral-200 bg-white shadow-sm overflow-hidden ${className}`}>
      {/* Panel Header & Actions */}
      <div className="flex items-center justify-between border-b border-neutral-200 bg-neutral-50/75 px-5 py-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-600">
          {title}
        </h2>
        <div className="flex items-center gap-1.5">
          <CopyResultButton textToCopy={copySummaryText} />
          <ShareButton title={shareTitle} text={copySummaryText} />
          <PrintButton />
        </div>
      </div>

      {/* Main Result Display */}
      <div className="p-6 border-b border-neutral-200 bg-brand-soft/20">
        <p className="text-xs font-semibold uppercase tracking-wider text-brand-strong">
          {headlineLabel}
        </p>
        <p className="mt-1 text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 tabular-nums">
          {headlineValue}
        </p>
        {subHeadline && (
          <p className="mt-1.5 text-xs text-neutral-600 font-medium">
            {subHeadline}
          </p>
        )}
      </div>

      {/* Callout Message (e.g. Grace Period notice, limit warning) */}
      {calloutMessage && (
        <div
          className={`px-5 py-3 text-xs font-medium border-b border-neutral-200 ${
            calloutMessage.type === 'success'
              ? 'bg-emerald-50 text-emerald-800'
              : calloutMessage.type === 'warning'
              ? 'bg-amber-50 text-amber-800'
              : 'bg-sky-50 text-sky-800'
          }`}
        >
          {calloutMessage.text}
        </div>
      )}

      {/* Breakdown Rows Table */}
      <div className="divide-y divide-neutral-100">
        {rows.map((row, idx) => (
          <div
            key={idx}
            className={`flex items-center justify-between px-5 py-3 text-sm ${
              row.highlight ? 'bg-neutral-50/80 font-bold' : ''
            }`}
          >
            <div>
              <span className={`text-neutral-800 ${row.highlight ? 'font-bold' : 'font-medium'}`}>
                {row.label}
              </span>
              {row.sublabel && (
                <span className="block text-[11px] text-neutral-500 font-normal">
                  {row.sublabel}
                </span>
              )}
            </div>
            <div className="text-right">
              <span
                className={`tabular-nums ${
                  row.isDeduction
                    ? 'text-danger font-semibold'
                    : row.highlight
                    ? 'text-brand-strong font-bold text-base'
                    : 'text-neutral-900 font-semibold'
                }`}
              >
                {typeof row.value === 'number'
                  ? row.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                  : row.value}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Expandable "How this was calculated" section */}
      {sources && sources.length > 0 && (
        <div className="border-t border-neutral-200 bg-neutral-50/60 p-4">
          <button
            type="button"
            onClick={() => setSourcesOpen(!sourcesOpen)}
            className="flex w-full items-center justify-between text-xs font-semibold text-neutral-700 hover:text-neutral-950 focus-visible:outline-brand"
            aria-expanded={sourcesOpen}
          >
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-brand" />
              <span>How this was calculated (Legal Sources)</span>
            </div>
            {sourcesOpen ? (
              <ChevronUp className="h-4 w-4 text-neutral-500" />
            ) : (
              <ChevronDown className="h-4 w-4 text-neutral-500" />
            )}
          </button>

          {sourcesOpen && (
            <div className="mt-3 space-y-3 pt-3 border-t border-neutral-200 text-xs text-neutral-600">
              {sources.map((src, i) => (
                <div key={i} className="rounded-md bg-white p-2.5 border border-neutral-200 shadow-2xs">
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-semibold text-neutral-900">{src.title}</span>
                    {src.url && (
                      <a
                        href={src.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand-strong hover:underline inline-flex items-center gap-1 text-[11px] shrink-0"
                      >
                        <span>Official doc</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                  <p className="text-[11px] text-neutral-500 mt-0.5">{src.documentNumber}</p>
                  <p className="mt-1 text-neutral-700">{src.summary}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
