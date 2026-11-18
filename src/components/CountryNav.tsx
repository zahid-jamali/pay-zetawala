'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { siteConfig } from '@/config/site';

export const CountryNav: React.FC = () => {
  const pathname = usePathname();

  return (
    <div className="w-full border-b border-slate-200 bg-slate-50/70 py-2.5">
      <div className="mx-auto flex max-w-6xl items-center gap-2 px-4 sm:px-6 overflow-x-auto no-scrollbar">
        <span className="text-xs font-bold text-slate-700 uppercase tracking-wider shrink-0 mr-2">
          Country Hubs:
        </span>
        {siteConfig.supportedCountries.map(c => {
          const isActive = pathname.startsWith(c.path);
          return (
            <Link
              key={c.code}
              href={c.path}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-all shrink-0 shadow-xs ${
                isActive
                  ? 'bg-slate-900 text-white border border-slate-900 shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:border-emerald-600 hover:text-emerald-700 hover:bg-emerald-50/40'
              }`}
            >
              <span>{c.flag}</span>
              <span>{c.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
