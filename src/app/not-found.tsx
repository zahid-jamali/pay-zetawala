import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Search, Home, Calculator } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 text-center">
      <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-brand-soft text-brand-strong font-black text-2xl mb-6">
        404
      </div>

      <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
        Page Not Found
      </h1>
      <p className="mt-3 text-base text-neutral-600 max-w-lg mx-auto">
        The calculation page or statutory guide you requested could not be found. It may have moved or been updated under a new regulation.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-strong transition-colors"
        >
          <Home className="h-4 w-4" />
          <span>Back to Home</span>
        </Link>
        <Link
          href="/sitemap/"
          className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 bg-white px-5 py-2.5 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors"
        >
          <Search className="h-4 w-4 text-neutral-500" />
          <span>Browse HTML Sitemap</span>
        </Link>
      </div>

      <div className="mt-12 rounded-xl border border-neutral-200 bg-neutral-50 p-6 text-left">
        <h2 className="text-sm font-bold text-neutral-900 uppercase tracking-wider mb-4 flex items-center gap-2">
          <Calculator className="h-4 w-4 text-brand" />
          <span>Explore Calculators by Country</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link
            href="/philippines/"
            className="flex items-center justify-between p-3 rounded-lg bg-white border border-neutral-200 hover:border-brand text-xs font-semibold text-neutral-900 group"
          >
            <span>🇵🇭 Philippines (Salary, SSS, Tax)</span>
            <span className="text-brand group-hover:translate-x-0.5 transition-transform">&rarr;</span>
          </Link>
          <Link
            href="/kenya/"
            className="flex items-center justify-between p-3 rounded-lg bg-white border border-neutral-200 hover:border-brand text-xs font-semibold text-neutral-900 group"
          >
            <span>🇰🇪 Kenya (M-PESA, Fuliza, Loans)</span>
            <span className="text-brand group-hover:translate-x-0.5 transition-transform">&rarr;</span>
          </Link>
          <Link
            href="/uganda/"
            className="flex items-center justify-between p-3 rounded-lg bg-white border border-neutral-200 hover:border-brand text-xs font-semibold text-neutral-900 group"
          >
            <span>🇺🇬 Uganda (MTN MoMo, Airtel, Tax)</span>
            <span className="text-brand group-hover:translate-x-0.5 transition-transform">&rarr;</span>
          </Link>
          <Link
            href="/nigeria/"
            className="flex items-center justify-between p-3 rounded-lg bg-white border border-neutral-200 hover:border-brand text-xs font-semibold text-neutral-900 group"
          >
            <span>🇳🇬 Nigeria (University &amp; Poly CGPA)</span>
            <span className="text-brand group-hover:translate-x-0.5 transition-transform">&rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
