'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { siteConfig } from '@/config/site';

export const CountryNav: React.FC = () => {
  const pathname = usePathname();

  return (
    <div className="w-full border-b border-neutral-200 bg-neutral-50/50 py-2.5">
      <div className="mx-auto flex max-w-6xl items-center gap-2 px-4 sm:px-6 overflow-x-auto no-scrollbar">
        <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider shrink-0 mr-2">
          Country Hubs:
        </span>
        {siteConfig.supportedCountries.map(c => {
          const isActive = pathname.startsWith(c.path);
          return (
            <Link
              key={c.code}
              href={c.path}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-all shrink-0 ${
                isActive
                  ? 'bg-neutral-900 text-white shadow-2xs'
                  : 'bg-white border border-neutral-200 text-neutral-700 hover:border-neutral-300 hover:bg-neutral-100'
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
