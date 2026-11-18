import React from 'react';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { StructuredData } from '@/components/StructuredData';
import { ShieldCheck, CheckCircle2, FileText, Cpu, RefreshCw, AlertCircle, ExternalLink } from 'lucide-react';
import { getPhRates, getKeRates, getUgRates, getNgGrading } from '@/lib/seo/rules-content';

export default function MethodologyPage() {
  const ph = getPhRates();
  const ke = getKeRates();
  const ug = getUgRates();
  const ng = getNgGrading();

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <Breadcrumbs items={[{ label: 'Methodology' }]} />
      <StructuredData
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Methodology', url: '/methodology/' },
        ]}
      />

      {/* Header */}
      <div className="border-b border-neutral-200 pb-8 pt-2">
        <div className="inline-flex items-center gap-2 rounded-full bg-brand-soft/60 px-3 py-1 text-xs font-semibold text-brand-strong mb-3">
          <ShieldCheck className="h-4 w-4" />
          <span>Statutory Integrity Standard</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
          Calculation Methodology &amp; Regulatory Verification
        </h1>
        <p className="mt-3 text-base text-neutral-600 leading-relaxed">
          How Pay verifies legal contribution rates, telecom tariffs, and academic grading standards. We maintain strict source verification protocols and pure functional calculation engines to ensure 100% calculation accuracy.
        </p>
        <p className="mt-2 text-xs text-neutral-500">Last verified: November 2026</p>
      </div>

      <div className="mt-8 space-y-12 text-sm text-neutral-700 leading-relaxed">
        {/* Core Principles */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-brand" />
            <span>1. The Verification Hierarchy</span>
          </h2>
          <p>
            Financial calculators often lose user trust when rates drift out of date or rely on blog posts and secondary aggregators. At Pay, every rate, bracket, and formula must satisfy our <strong>Primary Source Standard</strong>:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4">
              <span className="text-xs font-bold uppercase tracking-wider text-brand">Tier 1 (Required)</span>
              <h3 className="font-semibold text-neutral-900 mt-1">Official Circulars &amp; Gazettes</h3>
              <p className="mt-1 text-xs text-neutral-600">
                Direct statutory acts, gazette publications, and regulatory advisories published by the governing authority (e.g. SSS Circulars, BIR Revenue Regulations, Safaricom Tariffs).
              </p>
            </div>
            <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-700">Tier 2 (Corroborating)</span>
              <h3 className="font-semibold text-neutral-900 mt-1">Regulatory Releases</h3>
              <p className="mt-1 text-xs text-neutral-600">
                Central bank policy statements (CBK, BOU), federal ministries (NUC, NBTE), and official corporate portals.
              </p>
            </div>
            <div className="rounded-xl border border-red-200 bg-red-50/50 p-4">
              <span className="text-xs font-bold uppercase tracking-wider text-red-600">Banned (Zero Tolerance)</span>
              <h3 className="font-semibold text-neutral-900 mt-1">Secondary &amp; AI Aggregators</h3>
              <p className="mt-1 text-xs text-neutral-600">
                Blog posts, community forums, Reddit, Facebook posts, unverified calculator sites, or AI-generated rate summaries.
              </p>
            </div>
          </div>
        </section>

        {/* Technical Architecture */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
            <Cpu className="h-5 w-5 text-brand" />
            <span>2. Programmatic Calculation Engine Architecture</span>
          </h2>
          <p>
            To prevent calculation errors and ensure zero discrepancy between editorial copy and dynamic interactive tools, our system implements a dual-layer software architecture:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Decoupled Rule Definitions (<code>src/rules/</code>):</strong> All statutory rates, brackets, floors, and ceilings are defined in typed configuration files. No calculation rates are hard-coded in user interface components.
            </li>
            <li>
              <strong>Pure Functional Logic (<code>src/lib/</code>):</strong> Mathematical calculation functions are written as pure TypeScript functions with zero side effects. Given identical monetary inputs, they produce mathematically deterministic outputs.
            </li>
            <li>
              <strong>Automated Test Vector Suites (<code>tests/</code>):</strong> Calculation engines are evaluated against official test vectors derived from published payroll samples and tariff matrices via Vitest before every build.
            </li>
            <li>
              <strong>100% Client-Side Computation:</strong> Computations execute entirely inside the visitor’s web browser. No financial data, salary amounts, or transaction queries are sent over the network.
            </li>
          </ul>
        </section>

        {/* Country Sourcing Scope */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
            <FileText className="h-5 w-5 text-brand" />
            <span>3. Statutory Coverage &amp; Source Authority</span>
          </h2>

          <div className="space-y-4">
            <div className="rounded-xl border border-neutral-200 p-5 bg-white">
              <h3 className="font-bold text-neutral-900 flex items-center gap-2">
                <span>🇵🇭</span>
                <span>Philippines Payroll Deductions (2026 In Force)</span>
              </h3>
              <ul className="mt-2 space-y-1.5 text-xs text-neutral-600">
                <li>• <strong>SSS Contribution Rate:</strong> {ph.sssTotalRatePercent}% total ({ph.sssEeRatePercent}% employee / {ph.sssErRatePercent}% employer) governed by SSS Circular No. 2024-006. Minimum MSC ₱{ph.sssMinMsc.toLocaleString()}, regular MSC cap ₱{ph.sssRegularMscCap.toLocaleString()}, and total MSC cap ₱{ph.sssMaxTotalMsc.toLocaleString()} including mandatory WISP.</li>
                <li>• <strong>PhilHealth Premium:</strong> {ph.philhealthTotalRatePercent}% equal split ({ph.philhealthEeRatePercent}% employee / {ph.philhealthErRatePercent}% employer), monthly floor ₱{ph.philhealthFloor.toLocaleString()} (min premium ₱{ph.philhealthMinPremium.toLocaleString()}), monthly ceiling ₱{ph.philhealthCeiling.toLocaleString()} (max premium ₱{ph.philhealthMaxPremium.toLocaleString()}) pursuant to Universal Health Care Act (RA 11223) Advisory 2024-0013.</li>
                <li>• <strong>Pag-IBIG Fund:</strong> Maximum Monthly Fund Salary (MFS) ₱{ph.pagibigMaxMfs.toLocaleString()} under Pag-IBIG Circular No. 460. Mandatory employee deduction capped at ₱{ph.pagibigMaxEeContribution.toLocaleString()}, matched by ₱{ph.pagibigMaxErContribution.toLocaleString()} employer share.</li>
                <li>• <strong>BIR Withholding Tax:</strong> Graduated monthly tax brackets under Republic Act 10963 (TRAIN Law revised schedule). ₱0-₱20,833/month tax-exempt. 13th-month bonus tax exemption ceiling ₱{ph.taxExempt13thCeiling.toLocaleString()}.</li>
              </ul>
            </div>

            <div className="rounded-xl border border-neutral-200 p-5 bg-white">
              <h3 className="font-bold text-neutral-900 flex items-center gap-2">
                <span>🇰🇪</span>
                <span>Kenya Mobile Money &amp; Digital Credit (2026 In Force)</span>
              </h3>
              <ul className="mt-2 space-y-1.5 text-xs text-neutral-600">
                <li>• <strong>Safaricom M-PESA Tariffs:</strong> Official published consumer tariff schedule inclusive of 15% statutory excise duty. Free transfers for KSh 1-100 to registered users; maximum transfer fee KSh 108.</li>
                <li>• <strong>Central Bank of Kenya (CBK) Directives:</strong> Daily transaction limit KSh {ke.mpesaMaxDailyLimit.toLocaleString()}, single transaction limit KSh {ke.mpesaMaxPerTxn.toLocaleString()}, and wallet balance ceiling KSh {ke.mpesaMaxBalance.toLocaleString()}.</li>
                <li>• <strong>Fuliza Overdraft Fees:</strong> Access fee 1%, zero-fee grace period for KSh 101-1,000 up to Day 3, banded daily fees from KSh 0 to KSh 25.00/day.</li>
                <li>• <strong>M-Shwari 30-Day Loan:</strong> Fixed {ke.mshwariRatePercent}% loan facilitation fee for a {ke.mshwariDays}-day loan period under NCBA Bank tariff schedule.</li>
              </ul>
            </div>

            <div className="rounded-xl border border-neutral-200 p-5 bg-white">
              <h3 className="font-bold text-neutral-900 flex items-center gap-2">
                <span>🇺🇬</span>
                <span>Uganda Mobile Money &amp; URA Tax (2026 In Force)</span>
              </h3>
              <ul className="mt-2 space-y-1.5 text-xs text-neutral-600">
                <li>• <strong>URA Mobile Money Tax:</strong> {ug.withdrawalTaxRatePercent}% statutory excise duty applied exclusively to cash withdrawals under the Excise Duty (Amendment) Act. Peer-to-peer sending and merchant payments remain 100% tax-exempt.</li>
                <li>• <strong>Telecom Operator Schedules:</strong> Published MTN Uganda MoMo and Airtel Money tariff schedules for registered transfers, cross-network transfers, and agent cashouts.</li>
                <li>• <strong>Bank of Uganda Limits:</strong> Maximum single transaction limit UGX {ug.momoMaxSingleTxn.toLocaleString()} and maximum Tier 3 wallet balance UGX {ug.momoMaxBalance.toLocaleString()}.</li>
              </ul>
            </div>

            <div className="rounded-xl border border-neutral-200 p-5 bg-white">
              <h3 className="font-bold text-neutral-900 flex items-center gap-2">
                <span>🇳🇬</span>
                <span>Nigeria Academic Standards (2026 In Force)</span>
              </h3>
              <ul className="mt-2 space-y-1.5 text-xs text-neutral-600">
                <li>• <strong>NUC University 5.0 System:</strong> Benchmark Minimum Academic Standards (CCMAS): First Class ({ng.firstClassMin.toFixed(2)}-{ng.nucMaxScale.toFixed(2)}), Second Class Upper ({ng.secondUpperMin.toFixed(2)}-{(ng.firstClassMin - 0.01).toFixed(2)}), Second Class Lower ({ng.secondLowerMin.toFixed(2)}-{(ng.secondUpperMin - 0.01).toFixed(2)}), Third Class ({ng.thirdClassMin.toFixed(2)}-{(ng.secondLowerMin - 0.01).toFixed(2)}).</li>
                <li>• <strong>NBTE Polytechnic 4.0 System:</strong> National Board for Technical Education curriculum standards: Distinction (3.50-4.00), Upper Credit (3.00-3.49), Lower Credit (2.50-2.99), Pass (2.00-2.49).</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Update Monitoring & Corrections */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
            <RefreshCw className="h-5 w-5 text-brand" />
            <span>4. Regulatory Monitoring &amp; Error Correction Policy</span>
          </h2>
          <p>
            Statutory agencies periodically update contribution brackets and fee tables. Our research desk conducts monthly auditing sweeps and monitors statutory gazettes in real time:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>24-Hour Gazette Patch SLA:</strong> When a government regulator or major telecom operator publishes an official circular changing rates, our engineering team updates the corresponding rule module within 24 hours of primary source verification.
            </li>
            <li>
              <strong>Community Discrepancy Reporting:</strong> If you identify an upcoming circular, regional wage change, or telecom tariff adjustment, submit the official circular number or link through our <Link href="/contact/" className="text-brand-strong underline hover:text-brand">Contact Page</Link>. Our team independently validates the source document before merging changes into production.
            </li>
            <li>
              <strong>Transparent Versioning:</strong> Every tool page displays a &quot;Rates checked on [Date]&quot; stamp and lists the primary circular citations used in the calculation model.
            </li>
          </ul>
        </section>

        {/* Editorial Disclaimer */}
        <section className="rounded-xl border border-neutral-200 bg-neutral-50 p-6 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-800">
            <AlertCircle className="h-4 w-4 text-brand" />
            <span>Statutory Planning Disclaimer</span>
          </div>
          <p className="text-xs text-neutral-600 leading-relaxed">
            Pay provides computational models and rate tables for educational and personal financial planning purposes only. While our algorithms strictly follow published government regulations, formal payroll filings, loan underwriting, bank transfers, and university degree conferrals are governed exclusively by their respective statutory bodies.
          </p>
        </section>
      </div>
    </div>
  );
}
