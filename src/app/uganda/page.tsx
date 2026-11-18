import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { getPagesByCountry } from '@/config/pages';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { FaqAccordion } from '@/components/FaqAccordion';
import { ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Uganda Mobile Money Tariffs & 0.5% Tax Calculators 2026 | Pay',
  description:
    'Free Uganda calculators for MTN MoMo and Airtel Money transfer charges, agent cash-outs, and the 0.5% government statutory withdrawal tax.',
};

export default function UgandaHubPage() {
  const tools = getPagesByCountry('ug').filter(p => p.type === 'tool');

  const faqs = [
    {
      question: 'What is the government mobile money tax in Uganda?',
      answer:
        'Under the Excise Duty (Amendment) Act passed by the Parliament of Uganda, a <strong>0.5% statutory tax</strong> is levied on all mobile money cash withdrawals at agents. This tax applies strictly to cash-outs and does NOT apply when sending money (P2P transfers) or making utility payments.',
    },
    {
      question: 'Are MTN MoMo and Airtel Money rates the same in Uganda?',
      answer:
        'Yes. Both MTN Uganda and Airtel Money Uganda operate under harmonized peer-to-peer sending tariffs (e.g., UGX 100 for transfers up to 2,500 UGX, UGX 500 for up to 60,000 UGX, and UGX 1,000 for up to 500,000 UGX) and identical agent cash-out tiers.',
    },
    {
      question: 'What are the limits on mobile money in Uganda?',
      answer:
        'The standard maximum single transaction limit is <strong>5,000,000 UGX</strong>, and the maximum account wallet balance ceiling is <strong>20,000,000 UGX</strong> for standard verified accounts.',
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <Breadcrumbs items={[{ label: 'Uganda' }]} />

      <div className="border-b border-neutral-200 pb-8 pt-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft px-3 py-1 text-xs font-semibold text-brand-strong mb-3">
          <ShieldCheck className="h-3.5 w-3.5 text-brand" />
          <span>MTN MoMo, Airtel Money & 0.5% URA Tax Verified</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
          Uganda Mobile Money Tariffs & Tax Calculators
        </h1>
        <p className="mt-3 text-base text-neutral-600 max-w-3xl leading-relaxed">
          Compute sending charges, agent cash-out fees, and the 0.5% statutory government withdrawal tax for MTN Uganda and Airtel Money. Compare both operators side-by-side to find the lowest fee.
        </p>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-bold text-neutral-900 mb-6">
          Uganda Mobile Money Tools
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {tools.map(tool => (
            <Link
              key={tool.id}
              href={tool.path}
              className="group flex flex-col justify-between rounded-xl border border-neutral-200 bg-white p-6 shadow-2xs hover:border-brand-strong hover:shadow-md transition-all"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-neutral-500 mb-2">
                  <span>{tool.category}</span>
                  <span className="text-brand-strong font-bold">2026</span>
                </div>
                <h3 className="text-lg font-bold text-neutral-900 group-hover:text-brand-strong transition-colors">
                  {tool.shortTitle}
                </h3>
                <p className="mt-2 text-xs text-neutral-600 leading-relaxed">
                  {tool.description}
                </p>
              </div>
              <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-brand-strong">
                <span>Open calculator</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-12 rounded-xl border border-neutral-200 bg-neutral-50 p-6 sm:p-8">
        <h2 className="text-lg font-bold text-neutral-900 mb-4">
          Uganda Statutory Tax Rules (2026)
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-neutral-700 leading-relaxed">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-brand shrink-0 mt-0.5" />
            <div>
              <strong>0.5% Cash-Out Tax:</strong> Automatically deducted by the operator upon withdrawing cash from any agent, remitted directly to the Uganda Revenue Authority (URA).
            </div>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-brand shrink-0 mt-0.5" />
            <div>
              <strong>Tax-Free P2P Transfers:</strong> Sending money to another mobile phone is 100% exempt from the 0.5% government tax.
            </div>
          </div>
        </div>
      </div>

      <FaqAccordion faqs={faqs} />
    </div>
  );
}
