import React from 'react';
import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Terms of Use & Disclaimer | Pay',
  description:
    'Terms of Use and financial disclaimer for Pay calculators. Computational tools provided free of charge for informational purposes.',
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <Breadcrumbs items={[{ label: 'Terms of Use' }]} />

      <div className="border-b border-neutral-200 pb-8 pt-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
          Terms of Use & Disclaimer
        </h1>
        <p className="mt-2 text-xs text-neutral-500">Last updated: November 18, 2026</p>
      </div>

      <div className="mt-8 space-y-6 text-sm text-neutral-700 leading-relaxed">
        <h2 className="text-lg font-bold text-neutral-900">1. Acceptance of Terms</h2>
        <p>
          By accessing and using {siteConfig.brandName} ({siteConfig.domain}), you agree to be bound by these Terms of Use and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
        </p>

        <h2 className="text-lg font-bold text-neutral-900">2. Financial & Legal Disclaimer</h2>
        <p>
          The calculators, tables, and information provided on {siteConfig.brandName} are designed solely for educational, informational, and personal planning purposes. Although our editorial team exercises rigorous diligence in verifying all rates against official agency circulars (SSS, PhilHealth, Pag-IBIG, BIR, Safaricom, MTN Uganda, Airtel Uganda, NUC, and NBTE), computational results do NOT constitute formal payroll certification, certified tax advice, legal counsel, or official bank statements.
        </p>
        <p className="mt-2">
          Users are strongly encouraged to consult certified public accountants (CPAs), licensed financial advisors, or the respective statutory government agencies for binding official determinations.
        </p>

        <h2 className="text-lg font-bold text-neutral-900">3. Intellectual Property & Brand Ownership</h2>
        <p>
          All calculator code, layout designs, and custom typography on {siteConfig.brandName} are proprietary works published by the Zetawala network. The brand name and domain are protected under copyright and trademark law.
        </p>

        <h2 className="text-lg font-bold text-neutral-900">4. Modifications to Schedules</h2>
        <p>
          Statutory contribution schedules, excise duties, and mobile money tariffs are subject to legislative amendment and regulatory revision at any time. While Pay actively monitors update gazettes, we do not warrant that all content is at every second free from intervening statutory changes.
        </p>
      </div>
    </div>
  );
}
