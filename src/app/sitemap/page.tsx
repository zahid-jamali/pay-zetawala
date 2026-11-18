import React from 'react';
import Link from 'next/link';
import { PAGES, CountryCode } from '@/config/pages';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ArrowRight } from 'lucide-react';

export default function HtmlSitemapPage() {
  const countries: { code: CountryCode; name: string; flag: string }[] = [
    { code: 'ph', name: 'Philippines', flag: '🇵🇭' },
    { code: 'ke', name: 'Kenya', flag: '🇰🇪' },
    { code: 'ug', name: 'Uganda', flag: '🇺🇬' },
    { code: 'ng', name: 'Nigeria', flag: '🇳🇬' },
    { code: 'global', name: 'General & Site Pages', flag: '🌐' },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <Breadcrumbs items={[{ label: 'Sitemap' }]} />

      <div className="border-b border-neutral-200 pb-6 pt-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
          All Calculators & Official Tables Directory
        </h1>
        <p className="mt-2 text-sm sm:text-base text-neutral-600 max-w-3xl leading-relaxed">
          Explore every verified tool, official contribution table, and tariff guide published on Pay.
        </p>
      </div>

      <div className="mt-10 space-y-12">
        {countries.map(c => {
          const countryPages = PAGES.filter(p => p.country === c.code);
          return (
            <div key={c.code} className="border-b border-neutral-100 pb-8 last:border-b-0">
              <h2 className="text-xl font-bold text-neutral-900 mb-4 flex items-center gap-2">
                <span>{c.flag}</span>
                <span>{c.name}</span>
                <span className="text-xs font-semibold text-neutral-500 font-normal">
                  ({countryPages.length} pages)
                </span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {countryPages.map(page => (
                  <Link
                    key={page.id}
                    href={page.path}
                    className="group rounded-lg border border-neutral-200 bg-white p-4 shadow-2xs hover:border-brand-strong hover:shadow-xs transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
                        {page.category}
                      </div>
                      <h3 className="text-sm font-bold text-neutral-900 group-hover:text-brand-strong transition-colors">
                        {page.shortTitle}
                      </h3>
                      <p className="mt-1 text-xs text-neutral-600 line-clamp-2">
                        {page.description}
                      </p>
                    </div>
                    <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-brand-strong">
                      <span>Open</span>
                      <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
