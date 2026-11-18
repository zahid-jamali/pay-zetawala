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
    <section className={`mt-12 pt-8 border-t border-neutral-200 ${className}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h2 className="text-xl font-bold tracking-tight text-neutral-900 mb-6">
        {title}
      </h2>

      <div className="divide-y divide-neutral-200 rounded-lg border border-neutral-200 bg-white shadow-2xs overflow-hidden">
        {faqs.map((faq, index) => {
          const isOpen = openIndexes.includes(index);
          return (
            <div key={index} className="transition-colors">
              <button
                type="button"
                onClick={() => toggleIndex(index)}
                className="flex w-full items-center justify-between p-4 sm:p-5 text-left text-sm sm:text-base font-semibold text-neutral-900 hover:bg-neutral-50 focus-visible:outline-brand"
                aria-expanded={isOpen}
              >
                <span>{faq.question}</span>
                {isOpen ? (
                  <ChevronUp className="h-5 w-5 text-neutral-500 shrink-0 ml-3" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-neutral-500 shrink-0 ml-3" />
                )}
              </button>
              {isOpen && (
                <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-sm text-neutral-600 leading-relaxed pt-1">
                  <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
