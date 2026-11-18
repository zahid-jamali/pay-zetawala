import React from 'react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { siteConfig } from '@/config/site';

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />

      <div className="border-b border-neutral-200 pb-8 pt-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
          Privacy Policy
        </h1>
        <p className="mt-2 text-xs text-neutral-500">Last updated: November 18, 2026</p>
      </div>

      <div className="mt-8 space-y-6 text-sm text-neutral-700 leading-relaxed">
        <h2 className="text-lg font-bold text-neutral-900">1. Client-Side Computational Architecture</h2>
        <p>
          {siteConfig.brandName} is built as a fully static web platform. When you enter numbers into any calculator (including monthly salaries, allowances, transfer amounts, loan figures, or academic grades), <strong>100% of the mathematical computation occurs locally within your own browser</strong>. No values are transmitted to our servers, logged in telemetry databases, or exposed to third parties.
        </p>

        <h2 className="text-lg font-bold text-neutral-900">2. Local Storage Usage</h2>
        <p>
          Certain calculators (such as the Nigeria CGPA Calculator) offer convenience auto-saving so that you do not lose your course list when refreshing the page. This information is saved exclusively in your browser’s own <code>localStorage</code> database and never leaves your device. You can clear this data at any time through your browser settings or by clicking &quot;Reset&quot; on the tool.
        </p>

        <h2 className="text-lg font-bold text-neutral-900">3. Cookies and Analytics</h2>
        <p>
          {siteConfig.brandName} does not set tracking cookies, behavioral profiling cookies, or targeted advertising identifiers. Static assets are delivered through global content delivery networks solely to deliver pages quickly and securely.
        </p>

        <h2 className="text-lg font-bold text-neutral-900">4. Contact Information</h2>
        <p>
          If you have any questions regarding this policy or our data practices, please reach out via email at <code>contact@zetawala.com</code>.
        </p>
      </div>
    </div>
  );
}
