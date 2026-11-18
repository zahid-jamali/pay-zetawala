import React from 'react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { siteConfig } from '@/config/site';
import { Mail, AlertCircle } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <Breadcrumbs items={[{ label: 'Contact' }]} />

      <div className="border-b border-neutral-200 pb-8 pt-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
          Contact Editorial & Verification Team
        </h1>
        <p className="mt-3 text-base text-neutral-600 leading-relaxed">
          Notice a new government circular or mobile money tariff adjustment? Let us know so our researchers can verify the primary document and update the engine.
        </p>
      </div>

      <div className="mt-8 space-y-8 text-sm text-neutral-700">
        <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-2.5 text-base font-bold text-neutral-900">
            <Mail className="h-5 w-5 text-brand" />
            <span>Email Communications</span>
          </div>
          <p className="text-neutral-600 text-xs">
            For regulatory submissions, rate corrections, and general inquiries:
          </p>
          <div className="inline-block rounded-md bg-neutral-100 px-3 py-2 text-sm font-semibold text-neutral-900 select-all">
            contact@zetawala.com
          </div>
        </div>

        <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-6 space-y-3">
          <div className="flex items-center gap-2 font-bold text-neutral-900 text-sm">
            <AlertCircle className="h-4 w-4 text-brand" />
            <span>Submission Guidelines for Rate Updates</span>
          </div>
          <p className="text-xs text-neutral-600 leading-relaxed">
            To maintain our high confidence level, please include:
          </p>
          <ul className="list-disc pl-5 text-xs text-neutral-600 space-y-1">
            <li>The official agency circular number or gazette publication name</li>
            <li>A link to the official government portal or published PDF</li>
            <li>The effective date (and sunset date if applicable)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
