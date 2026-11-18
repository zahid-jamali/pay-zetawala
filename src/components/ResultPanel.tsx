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
  isEarning?: boolean;
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
    <div className={`w-full rounded-xl border border-neutral-200 bg-white shadow-xs overflow-hidden ${className}`}>
      {/* Panel Header & Actions */}
      <div className="flex items-center justify-between border-b border-neutral-200 bg-neutral-50 px-5 py-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-800">
          {title}
        </h2>
        <div className="flex items-center gap-1.5">
          <CopyResultButton textToCopy={copySummaryText} />
          <ShareButton title={shareTitle} text={copySummaryText} />
          <PrintButton />
        </div>
      </div>

      {/* Main Result Headline Display */}
      <div className="p-6 border-b border-neutral-200 bg-brand-soft/40">
        <p className="text-xs font-bold uppercase tracking-wider text-brand-strong">
          {headlineLabel}
        </p>
        <p className="mt-1 text-3xl sm:text-4xl font-black text-neutral-900 tabular-nums tracking-tight">
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
          className={`px-5 py-3 text-xs font-semibold border-b ${
            calloutMessage.type === 'success'
              ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
              : calloutMessage.type === 'warning'
              ? 'bg-amber-50 text-amber-950 border-amber-300'
              : 'bg-blue-50 text-blue-950 border-blue-200'
          }`}
        >
          {calloutMessage.text}
        </div>
      )}

      {/* Breakdown Rows Table */}
      <div className="divide-y divide-neutral-200/70">
        {rows.map((row, idx) => {
          const isEarning = row.isEarning || (typeof row.value === 'string' && row.value.trim().startsWith('+'));
          return (
            <div
              key={idx}
              className={`flex items-center justify-between px-5 py-3 text-sm transition-colors ${
                row.highlight
                  ? 'bg-brand-soft/30 font-bold border-l-4 border-brand'
                  : idx % 2 === 1
                  ? 'bg-neutral-50/60'
                  : 'bg-white'
              }`}
            >
              <div>
                <span className={`text-neutral-800 ${row.highlight ? 'font-bold text-neutral-900' : 'font-medium'}`}>
                  {row.label}
                </span>
                {row.sublabel && (
                  <span className="block text-[11px] text-neutral-600 font-medium mt-0.5">
                    {row.sublabel}
                  </span>
                )}
              </div>
              <div className="text-right">
                <span
                  className={`tabular-nums ${
                    row.isDeduction
                      ? 'text-red-700 font-semibold'
                      : isEarning
                      ? 'text-emerald-700 font-semibold'
                      : row.highlight
                      ? 'text-neutral-900 font-black text-base'
                      : 'text-neutral-900 font-semibold'
                  }`}
                >
                  {typeof row.value === 'number'
                    ? row.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                    : row.value}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Expandable "How this was calculated" section */}
      {sources && sources.length > 0 && (
        <div className="border-t border-neutral-200 bg-neutral-50/80 p-4">
          <button
            type="button"
            onClick={() => setSourcesOpen(!sourcesOpen)}
            className="flex w-full items-center justify-between text-xs font-bold text-neutral-800 hover:text-neutral-950 focus-visible:outline-brand"
            aria-expanded={sourcesOpen}
          >
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-brand-strong" />
              <span>How this was calculated (Legal Sources)</span>
            </div>
            {sourcesOpen ? (
              <ChevronUp className="h-4 w-4 text-neutral-600" />
            ) : (
              <ChevronDown className="h-4 w-4 text-neutral-600" />
            )}
          </button>

          {sourcesOpen && (
            <div className="mt-3 space-y-2.5 pt-3 border-t border-neutral-200 text-xs text-neutral-700">
              {sources.map((src, i) => (
                <div key={i} className="rounded-lg bg-white p-3 border border-neutral-200 shadow-2xs">
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-bold text-neutral-900">{src.title}</span>
                    {src.url && (
                      <a
                        href={src.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand-strong hover:text-brand-hover font-semibold hover:underline inline-flex items-center gap-1 text-[11px] shrink-0"
                      >
                        <span>Official doc</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                  <p className="text-[11px] text-neutral-600 font-medium mt-0.5">{src.documentNumber}</p>
                  <p className="mt-1 text-neutral-700 leading-relaxed">{src.summary}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
