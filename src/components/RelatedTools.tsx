import React from 'react';
import Link from 'next/link';
import { PageDef } from '@/config/pages';
import { ArrowRight } from 'lucide-react';

interface RelatedToolsProps {
  tools: PageDef[];
  title?: string;
  className?: string;
}

export const RelatedTools: React.FC<RelatedToolsProps> = ({
  tools,
  title = 'Related Calculators & Tables',
  className = '',
}) => {
  if (!tools || tools.length === 0) return null;

  return (
    <section className={`mt-12 pt-8 border-t border-slate-200 ${className}`}>
      <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 mb-6">
        {title}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map(tool => (
          <Link
            key={tool.id}
            href={tool.path}
            className="group flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-xs hover:border-emerald-600 hover:shadow-sm transition-all"
          >
            <div>
              <div className="flex items-center justify-between text-xs mb-2.5">
                <span className="text-xs font-semibold text-neutral-600">{tool.category}</span>
                <span className="inline-block rounded bg-slate-100 border border-slate-200 px-2 py-0.5 text-2xs font-bold text-slate-700 uppercase tracking-wider">
                  {tool.country}
                </span>
              </div>
              <h3 className="text-base font-bold text-neutral-900 group-hover:text-brand-strong transition-colors">
                {tool.shortTitle}
              </h3>
              <p className="mt-2 text-xs text-neutral-600 leading-relaxed line-clamp-2">
                {tool.description}
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-brand-strong group-hover:text-emerald-900 pt-2 border-t border-slate-100">
              <span>Open calculator</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
