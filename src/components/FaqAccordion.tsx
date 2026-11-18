'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  faqs: FaqItem[];
  title?: string;
  className?: string;
}

export const FaqAccordion: React.FC<FaqAccordionProps> = ({
  faqs,
  title = 'Frequently Asked Questions',
  className = '',
}) => {
  const [openIndexes, setOpenIndexes] = useState<number[]>([0]); // First item open by default

  const toggleIndex = (index: number) => {
    setOpenIndexes(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <section className={`mt-12 pt-8 border-t border-slate-200 ${className}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 mb-6">
        {title}
      </h2>

      <div className="divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white shadow-xs overflow-hidden">
        {faqs.map((faq, index) => {
          const isOpen = openIndexes.includes(index);
          return (
            <div key={index} className="transition-colors">
              <button
                type="button"
                onClick={() => toggleIndex(index)}
                className={`flex w-full items-center justify-between p-4 sm:p-5 text-left text-sm sm:text-base font-bold text-slate-900 transition-colors focus-visible:outline-brand ${
                  isOpen ? 'bg-slate-50/60' : 'hover:bg-slate-50'
                }`}
                aria-expanded={isOpen}
              >
                <span>{faq.question}</span>
                {isOpen ? (
                  <ChevronUp className="h-5 w-5 text-slate-700 shrink-0 ml-3" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-slate-500 shrink-0 ml-3" />
                )}
              </button>
              {isOpen && (
                <div className="px-4 pb-5 sm:px-5 sm:pb-6 text-sm text-slate-700 leading-relaxed pt-1 bg-slate-50/30">
                  <div
                    className="space-y-2 [&_p]:text-slate-700 [&_strong]:text-slate-900 [&_strong]:font-semibold [&_a]:text-emerald-800 [&_a]:underline [&_a]:font-medium hover:[&_a]:text-emerald-900"
                    dangerouslySetInnerHTML={{ __html: faq.answer }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
