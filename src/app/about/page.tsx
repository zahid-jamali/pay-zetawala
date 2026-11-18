import React from 'react';
import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { siteConfig } from '@/config/site';
import { ShieldCheck, Lock, Award, BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Pay — Verification Standards & Primary Sources | Pay',
  description:
    'Learn about Pay’s primary-source verification standards, 100% browser-based computational privacy, and official government data sources.',
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <Breadcrumbs items={[{ label: 'About' }]} />

      <div className="border-b border-neutral-200 pb-8 pt-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
          About Pay
        </h1>
        <p className="mt-3 text-base text-neutral-600 leading-relaxed">
          Accurate, calm, and trustworthy computational tools for everyday financial decisions and academic milestones in the Philippines, Kenya, Uganda, and Nigeria.
        </p>
      </div>

      <div className="mt-8 space-y-10 text-neutral-700 text-sm leading-relaxed">
        {/* Mission */}
        <div>
          <h2 className="text-xl font-bold text-neutral-900 mb-3">Our Core Purpose</h2>
          <p>
            When calculating monthly net salaries, mobile money remittance fees, or university degree classifications, a wrong number or outdated table creates serious confusion and financial mistrust. Yet across the web, most ranking calculator pages run on obsolete 2021–2023 rates, lack statutory citations, or bury users under intrusive popup advertisements.
          </p>
          <p className="mt-3">
            {siteConfig.brandName} was built to provide an uncompromising alternative: zero outdated estimates, zero recycled blog formulas, and zero server-side data retention. Every single formula on this site is coded directly against verified regulatory gazettes and official company circulars.
          </p>
        </div>

        {/* Verification Standards */}
        <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-6">
          <h2 className="text-lg font-bold text-neutral-900 mb-4 flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-brand" />
            <span>Strict Primary-Source Research Standards</span>
          </h2>
          <p className="mb-4 text-xs text-neutral-600">
            Our editorial and development workflow prohibits taking values from secondary blogs, forums, or third-party calculator tools. All rates are transcribed directly from:
          </p>
          <ul className="space-y-2 text-xs">
            <li><strong>Philippines:</strong> SSS Circulars (2024-006 to 2024-010, 2025-004), PhilHealth Advisory 2025-0002, Pag-IBIG Circular 460 / DBM CL 2024-2, and BIR Revenue Regulations No. 11-2018 (TRAIN Law).</li>
            <li><strong>Kenya:</strong> Safaricom PLC M-PESA Customer Tariffs Schedule, Fuliza Terms & Conditions, NCBA M-Shwari Terms, and the Kenya Finance Act 2023.</li>
            <li><strong>Uganda:</strong> MTN Uganda MoMo Tariffs, Airtel Money Uganda Schedule, and the Uganda Revenue Authority (Excise Duty Act).</li>
            <li><strong>Nigeria:</strong> National Universities Commission (NUC BMAS/CCMAS) and National Board for Technical Education (NBTE) Standard Curriculum.</li>
          </ul>
        </div>

        {/* Privacy */}
        <div>
          <h2 className="text-xl font-bold text-neutral-900 mb-3 flex items-center gap-2">
            <Lock className="h-5 w-5 text-brand" />
            <span>100% Client-Side Privacy Guarantee</span>
          </h2>
          <p>
            Your compensation and academic records are your private business. Pay operates as a fully static website: all calculations run purely in JavaScript inside your browser. No salaries, amounts, grades, or personal details are ever transmitted across the network, stored on servers, or tracked across sessions.
          </p>
        </div>

        {/* Network Attribution */}
        <div className="pt-6 border-t border-neutral-200 text-xs text-neutral-500">
          <p>
            {siteConfig.brandName} is developed and maintained as an independent public utility by the Zetawala network (<a href={siteConfig.parentNetwork.url} target="_blank" rel="noopener noreferrer" className="underline hover:text-neutral-900 font-semibold">{siteConfig.parentNetwork.name}</a>).
          </p>
        </div>
      </div>
    </div>
  );
}
