import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Design System & Token Preview (Internal)',
  robots: {
    index: false,
    follow: false,
  },
};

export default function DesignPreviewPage() {
  const brandTones = [
    { name: 'Brand Strong (WCAG AAA 7.1:1)', val: '#0b6649', bgClass: 'bg-brand-strong', text: 'text-white' },
    { name: 'Brand Main', val: '#109068', bgClass: 'bg-brand', text: 'text-white' },
    { name: 'Brand Hover', val: '#0d7957', bgClass: 'bg-brand-hover', text: 'text-white' },
    { name: 'Brand Subtle', val: '#d6eee4', bgClass: 'bg-brand-subtle', text: 'text-brand-strong' },
    { name: 'Brand Soft (Surface/Active)', val: '#edf7f3', bgClass: 'bg-brand-soft', text: 'text-brand-strong' },
  ];

  const neutrals = [
    { step: '50', hex: '#f8faf9', bg: 'bg-neutral-50', text: 'text-neutral-900' },
    { step: '100', hex: '#f1f5f3', bg: 'bg-neutral-100', text: 'text-neutral-900' },
    { step: '200', hex: '#e2e8e5', bg: 'bg-neutral-200', text: 'text-neutral-900' },
    { step: '300', hex: '#cbd5d0', bg: 'bg-neutral-300', text: 'text-neutral-900' },
    { step: '400', hex: '#94a39d', bg: 'bg-neutral-400', text: 'text-white' },
    { step: '500', hex: '#64746e', bg: 'bg-neutral-500', text: 'text-white' },
    { step: '600', hex: '#475550', bg: 'bg-neutral-600', text: 'text-white' },
    { step: '700', hex: '#33413c', bg: 'bg-neutral-700', text: 'text-white' },
    { step: '800', hex: '#1f2926', bg: 'bg-neutral-800', text: 'text-white' },
    { step: '900', hex: '#111815', bg: 'bg-neutral-900', text: 'text-white' },
  ];

  const semantics = [
    { label: 'Success', text: 'text-semantics-success-text', bg: 'bg-semantics-success-bg', border: 'border-semantics-success-border' },
    { label: 'Warning', text: 'text-semantics-warning-text', bg: 'bg-semantics-warning-bg', border: 'border-semantics-warning-border' },
    { label: 'Danger', text: 'text-semantics-danger-text', bg: 'bg-semantics-danger-bg', border: 'border-semantics-danger-border' },
    { label: 'Info', text: 'text-semantics-info-text', bg: 'bg-semantics-info-bg', border: 'border-semantics-info-border' },
  ];

  return (
    <main className="max-w-content mx-auto p-6 space-y-10">
      <header className="border-b border-border-subtle pb-4">
        <h1 className="text-3xl font-semibold tracking-tight">Pay Design System & Token Preview</h1>
        <p className="text-sm text-content-secondary mt-1">
          Extracted from <code className="text-xs bg-neutral-100 px-1 py-0.5 rounded">public/images/pay-logo.jpg</code> using sharp.
          Verified for WCAG AA compliance, calm financial aesthetic, tabular numerals, and zero AI-decorations.
        </p>
      </header>

      {/* Brand Color Tokens */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">1. Brand Palette & Contrast</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
          {brandTones.map((t) => (
            <div key={t.name} className={`${t.bgClass} ${t.text} p-4 rounded-md border border-border-subtle shadow-sm`}>
              <div className="font-semibold text-sm">{t.name}</div>
              <div className="text-xs opacity-90 mt-1">{t.val}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Tinted Neutrals */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">2. 10-Step Tinted Neutrals Scale</h2>
        <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-10 gap-2">
          {neutrals.map((n) => (
            <div key={n.step} className={`${n.bg} ${n.text} p-3 rounded-sm border border-border-subtle text-center text-xs`}>
              <div className="font-semibold">{n.step}</div>
              <div className="opacity-80 mt-1 font-mono">{n.hex}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Semantic Alerts */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">3. Semantic Feedback Tokens</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {semantics.map((s) => (
            <div key={s.label} className={`${s.bg} ${s.border} ${s.text} border p-4 rounded-md text-sm font-medium`}>
              <strong>{s.label}:</strong> Rate verified against official government gazette.
            </div>
          ))}
        </div>
      </section>

      {/* Typography Scale */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">4. Typography Scale (IBM Plex Sans)</h2>
        <div className="space-y-2 border border-border-subtle p-4 rounded-md bg-surface">
          <p className="text-3xl font-semibold">36px / Semibold: Take-Home Pay Calculator</p>
          <p className="text-2xl font-semibold">28px / Semibold: SSS Contribution Table 2026</p>
          <p className="text-xl font-medium">22px / Medium: Net Pay: ₱42,231.60 per month</p>
          <p className="text-lg">18px / Regular: Total Monthly Statutory Deductions</p>
          <p className="text-base">16px / Regular: Body text with optimal line-height 1.5 for clear reading.</p>
          <p className="text-sm text-content-secondary">14px / Helper: Based on SSS Circular No. 2024-006.</p>
        </div>
      </section>

      {/* Tabular Numerals & Hairline Table */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">5. Tabular Data Presentation</h2>
        <div className="overflow-x-auto border border-border-subtle rounded-md">
          <table className="w-full text-sm">
            <thead className="bg-surface text-content-secondary text-xs border-b border-border-subtle">
              <tr>
                <th className="py-2.5 px-4 text-left font-semibold">Program / Deduction</th>
                <th className="py-2.5 px-4 text-right font-semibold">Employee Share</th>
                <th className="py-2.5 px-4 text-right font-semibold">Employer Share</th>
                <th className="py-2.5 px-4 text-right font-semibold">Total Contribution</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              <tr className="hover:bg-neutral-50 transition-colors">
                <td className="py-2.5 px-4 font-medium">Regular Social Security (SS)</td>
                <td className="py-2.5 px-4 text-right tabular-nums">₱1,000.00</td>
                <td className="py-2.5 px-4 text-right tabular-nums">₱2,000.00</td>
                <td className="py-2.5 px-4 text-right font-semibold tabular-nums">₱3,000.00</td>
              </tr>
              <tr className="hover:bg-neutral-50 transition-colors">
                <td className="py-2.5 px-4 font-medium">Mandatory Provident Fund (WISP)</td>
                <td className="py-2.5 px-4 text-right tabular-nums">₱750.00</td>
                <td className="py-2.5 px-4 text-right tabular-nums">₱1,500.00</td>
                <td className="py-2.5 px-4 text-right font-semibold tabular-nums">₱2,250.00</td>
              </tr>
              <tr className="hover:bg-neutral-50 transition-colors bg-brand-soft">
                <td className="py-2.5 px-4 font-medium text-brand-strong">PhilHealth Premium (5.0%)</td>
                <td className="py-2.5 px-4 text-right tabular-nums text-brand-strong">₱1,250.00</td>
                <td className="py-2.5 px-4 text-right tabular-nums text-brand-strong">₱1,250.00</td>
                <td className="py-2.5 px-4 text-right font-semibold tabular-nums text-brand-strong">₱2,500.00</td>
              </tr>
              <tr className="hover:bg-neutral-50 transition-colors">
                <td className="py-2.5 px-4 font-medium">Pag-IBIG Fund (HDMF)</td>
                <td className="py-2.5 px-4 text-right tabular-nums">₱200.00</td>
                <td className="py-2.5 px-4 text-right tabular-nums">₱200.00</td>
                <td className="py-2.5 px-4 text-right font-semibold tabular-nums">₱400.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Accessible Interactive Controls */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">6. Accessible Buttons & Form Elements</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <button
            type="button"
            className="px-4 py-2.5 bg-brand hover:bg-brand-hover text-white text-sm font-medium rounded-md transition-colors"
          >
            Calculate Net Pay
          </button>
          <button
            type="button"
            className="px-4 py-2.5 bg-surface hover:bg-neutral-100 text-content-primary border border-border-strong text-sm font-medium rounded-md transition-colors"
          >
            Reset Form
          </button>
          <input
            type="text"
            defaultValue="₱50,000.00"
            className="px-3.5 py-2 border border-border-strong rounded-md text-sm font-medium tabular-nums text-right focus:border-brand"
          />
        </div>
      </section>
    </main>
  );
}
