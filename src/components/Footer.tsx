import React from 'react';
import Link from 'next/link';
import { siteConfig } from '@/config/site';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 text-slate-700 text-sm">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 sm:grid-cols-2">
          {/* Philippines Column */}
          <div>
            <h3 className="font-bold text-slate-900 mb-3.5 flex items-center gap-1.5 text-sm tracking-tight">
              <span>🇵🇭</span>
              <span>Philippines</span>
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/philippines/salary-calculator/" className="text-slate-600 hover:text-emerald-700 hover:underline transition-colors font-medium">
                  Salary &amp; Take-Home Pay
                </Link>
              </li>
              <li>
                <Link href="/philippines/13th-month-pay-calculator/" className="text-slate-600 hover:text-emerald-700 hover:underline transition-colors font-medium">
                  13th Month Pay Calculator
                </Link>
              </li>
              <li>
                <Link href="/philippines/sss-contribution-calculator/" className="text-slate-600 hover:text-emerald-700 hover:underline transition-colors font-medium">
                  SSS Contribution (15%)
                </Link>
              </li>
              <li>
                <Link href="/philippines/sss-pension-calculator/" className="text-slate-600 hover:text-emerald-700 hover:underline transition-colors font-medium">
                  SSS Retirement Pension
                </Link>
              </li>
              <li>
                <Link href="/philippines/sss-salary-loan-calculator/" className="text-slate-600 hover:text-emerald-700 hover:underline transition-colors font-medium">
                  SSS Salary Loan Amortization
                </Link>
              </li>
              <li>
                <Link href="/philippines/philhealth-contribution-calculator/" className="text-slate-600 hover:text-emerald-700 hover:underline transition-colors font-medium">
                  PhilHealth Premium (5.0%)
                </Link>
              </li>
              <li>
                <Link href="/philippines/pag-ibig-contribution-calculator/" className="text-slate-600 hover:text-emerald-700 hover:underline transition-colors font-medium">
                  Pag-IBIG Savings (₱200 Cap)
                </Link>
              </li>
              <li>
                <Link href="/philippines/sss-contribution-table/" className="text-slate-600 hover:text-emerald-700 hover:underline transition-colors font-medium">
                  Official SSS Bracket Table
                </Link>
              </li>
              <li>
                <Link href="/philippines/withholding-tax-table/" className="text-slate-600 hover:text-emerald-700 hover:underline transition-colors font-medium">
                  BIR TRAIN Tax Table
                </Link>
              </li>
            </ul>
          </div>

          {/* Kenya Column */}
          <div>
            <h3 className="font-bold text-slate-900 mb-3.5 flex items-center gap-1.5 text-sm tracking-tight">
              <span>🇰🇪</span>
              <span>Kenya</span>
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/kenya/mpesa-charges-calculator/" className="text-slate-600 hover:text-emerald-700 hover:underline transition-colors font-medium">
                  M-PESA Charges (All Types)
                </Link>
              </li>
              <li>
                <Link href="/kenya/mpesa-withdrawal-charges/" className="text-slate-600 hover:text-emerald-700 hover:underline transition-colors font-medium">
                  M-PESA Withdrawal (Agent &amp; ATM)
                </Link>
              </li>
              <li>
                <Link href="/kenya/mpesa-to-bank-charges/" className="text-slate-600 hover:text-emerald-700 hover:underline transition-colors font-medium">
                  M-PESA to Bank (Paybill)
                </Link>
              </li>
              <li>
                <Link href="/kenya/fuliza-charges-calculator/" className="text-slate-600 hover:text-emerald-700 hover:underline transition-colors font-medium">
                  Fuliza Overdraft Fees
                </Link>
              </li>
              <li>
                <Link href="/kenya/m-shwari-loan-calculator/" className="text-slate-600 hover:text-emerald-700 hover:underline transition-colors font-medium">
                  M-Shwari 30-Day Loan
                </Link>
              </li>
              <li>
                <Link href="/kenya/mpesa-tariffs/" className="text-slate-600 hover:text-emerald-700 hover:underline transition-colors font-medium">
                  Official M-PESA Tariff Schedule
                </Link>
              </li>
            </ul>
          </div>

          {/* Uganda Column */}
          <div>
            <h3 className="font-bold text-slate-900 mb-3.5 flex items-center gap-1.5 text-sm tracking-tight">
              <span>🇺🇬</span>
              <span>Uganda</span>
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/uganda/mobile-money-charges-comparison/" className="text-slate-600 hover:text-emerald-700 hover:underline transition-colors font-medium">
                  MTN vs Airtel MoMo Comparison
                </Link>
              </li>
              <li>
                <Link href="/uganda/mtn-mobile-money-charges/" className="text-slate-600 hover:text-emerald-700 hover:underline transition-colors font-medium">
                  MTN Uganda MoMo Rates
                </Link>
              </li>
              <li>
                <Link href="/uganda/airtel-money-charges/" className="text-slate-600 hover:text-emerald-700 hover:underline transition-colors font-medium">
                  Airtel Money Uganda Rates
                </Link>
              </li>
            </ul>
          </div>

          {/* Nigeria & Site Column */}
          <div>
            <h3 className="font-bold text-slate-900 mb-3.5 flex items-center gap-1.5 text-sm tracking-tight">
              <span>🇳🇬</span>
              <span>Nigeria &amp; Site</span>
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/nigeria/cgpa-calculator/" className="text-slate-600 hover:text-emerald-700 hover:underline transition-colors font-medium">
                  University CGPA (5.0 Scale)
                </Link>
              </li>
              <li>
                <Link href="/nigeria/polytechnic-cgpa-calculator/" className="text-slate-600 hover:text-emerald-700 hover:underline transition-colors font-medium">
                  Polytechnic CGPA (4.0 Scale)
                </Link>
              </li>
              <li>
                <Link href="/nigeria/gpa-calculator/" className="text-slate-600 hover:text-emerald-700 hover:underline transition-colors font-medium">
                  Semester GPA Calculator
                </Link>
              </li>
              <li>
                <Link href="/nigeria/target-cgpa-calculator/" className="text-slate-600 hover:text-emerald-700 hover:underline transition-colors font-medium">
                  Target CGPA Calculator
                </Link>
              </li>
              <li className="pt-2.5 border-t border-slate-200">
                <Link href="/about/" className="text-slate-700 hover:text-emerald-700 hover:underline font-semibold transition-colors">
                  About &amp; Primary Sources
                </Link>
              </li>
              <li>
                <Link href="/sitemap/" className="text-slate-600 hover:text-emerald-700 hover:underline transition-colors font-medium">
                  HTML Sitemap
                </Link>
              </li>
              <li>
                <Link href="/privacy/" className="text-slate-600 hover:text-emerald-700 hover:underline transition-colors font-medium">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms/" className="text-slate-600 hover:text-emerald-700 hover:underline transition-colors font-medium">
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal notice and Disclaimer */}
        <div className="mt-10 border-t border-slate-200 pt-6 text-xs text-slate-600 space-y-2.5 leading-relaxed">
          <p>
            <strong className="font-bold text-slate-800">Official Rates Verification:</strong> All calculation tables and statutory schedules are verified against official government circulars and published corporate notices (SSS, PhilHealth, Pag-IBIG, BIR TRAIN Law, Safaricom, MTN Uganda, Airtel Uganda, NUC, and NBTE) in force for 2026.
          </p>
          <p>
            <strong className="font-bold text-slate-800">Disclaimer:</strong> {siteConfig.brandName} is an independent computing reference provided free of charge for informational and planning purposes only. It does not constitute official payroll certification, banking authorization, or academic advisory.
          </p>
        </div>

        {/* Parent Network Footer Line */}
        <div className="mt-6 border-t border-slate-200 pt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {siteConfig.brandName}. All calculations are executed locally in your browser.</p>
          <p className="mt-2 sm:mt-0">
            <a
              href={siteConfig.parentNetwork.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-emerald-700 underline font-semibold transition-colors"
            >
              {siteConfig.parentNetwork.footerText}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
