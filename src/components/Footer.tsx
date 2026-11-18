import React from 'react';
import Link from 'next/link';
import { siteConfig } from '@/config/site';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-50 text-neutral-600 text-sm">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 sm:grid-cols-2">
          {/* Philippines Column */}
          <div>
            <h3 className="font-semibold text-neutral-900 mb-3 flex items-center gap-1.5">
              <span>🇵🇭</span>
              <span>Philippines</span>
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/philippines/salary-calculator/" className="hover:text-brand-strong hover:underline">
                  Salary & Take-Home Pay
                </Link>
              </li>
              <li>
                <Link href="/philippines/13th-month-pay-calculator/" className="hover:text-brand-strong hover:underline">
                  13th Month Pay Calculator
                </Link>
              </li>
              <li>
                <Link href="/philippines/sss-contribution-calculator/" className="hover:text-brand-strong hover:underline">
                  SSS Contribution (15%)
                </Link>
              </li>
              <li>
                <Link href="/philippines/sss-pension-calculator/" className="hover:text-brand-strong hover:underline">
                  SSS Retirement Pension
                </Link>
              </li>
              <li>
                <Link href="/philippines/sss-salary-loan-calculator/" className="hover:text-brand-strong hover:underline">
                  SSS Salary Loan Amortization
                </Link>
              </li>
              <li>
                <Link href="/philippines/philhealth-contribution-calculator/" className="hover:text-brand-strong hover:underline">
                  PhilHealth Premium (5.0%)
                </Link>
              </li>
              <li>
                <Link href="/philippines/pag-ibig-contribution-calculator/" className="hover:text-brand-strong hover:underline">
                  Pag-IBIG Savings (₱200 Cap)
                </Link>
              </li>
              <li>
                <Link href="/philippines/sss-contribution-table/" className="hover:text-brand-strong hover:underline">
                  Official SSS Bracket Table
                </Link>
              </li>
              <li>
                <Link href="/philippines/withholding-tax-table/" className="hover:text-brand-strong hover:underline">
                  BIR TRAIN Tax Table
                </Link>
              </li>
            </ul>
          </div>

          {/* Kenya Column */}
          <div>
            <h3 className="font-semibold text-neutral-900 mb-3 flex items-center gap-1.5">
              <span>🇰🇪</span>
              <span>Kenya</span>
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/kenya/mpesa-charges-calculator/" className="hover:text-brand-strong hover:underline">
                  M-PESA Charges (All Types)
                </Link>
              </li>
              <li>
                <Link href="/kenya/mpesa-withdrawal-charges/" className="hover:text-brand-strong hover:underline">
                  M-PESA Withdrawal (Agent & ATM)
                </Link>
              </li>
              <li>
                <Link href="/kenya/mpesa-to-bank-charges/" className="hover:text-brand-strong hover:underline">
                  M-PESA to Bank (Paybill)
                </Link>
              </li>
              <li>
                <Link href="/kenya/fuliza-charges-calculator/" className="hover:text-brand-strong hover:underline">
                  Fuliza Overdraft Fees
                </Link>
              </li>
              <li>
                <Link href="/kenya/m-shwari-loan-calculator/" className="hover:text-brand-strong hover:underline">
                  M-Shwari 30-Day Loan
                </Link>
              </li>
              <li>
                <Link href="/kenya/mpesa-tariffs/" className="hover:text-brand-strong hover:underline">
                  Official M-PESA Tariff Schedule
                </Link>
              </li>
            </ul>
          </div>

          {/* Uganda Column */}
          <div>
            <h3 className="font-semibold text-neutral-900 mb-3 flex items-center gap-1.5">
              <span>🇺🇬</span>
              <span>Uganda</span>
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/uganda/mobile-money-charges-comparison/" className="hover:text-brand-strong hover:underline">
                  MTN vs Airtel MoMo Comparison
                </Link>
              </li>
              <li>
                <Link href="/uganda/mtn-mobile-money-charges/" className="hover:text-brand-strong hover:underline">
                  MTN Uganda MoMo Rates
                </Link>
              </li>
              <li>
                <Link href="/uganda/airtel-money-charges/" className="hover:text-brand-strong hover:underline">
                  Airtel Money Uganda Rates
                </Link>
              </li>
            </ul>
          </div>

          {/* Nigeria & Site Column */}
          <div>
            <h3 className="font-semibold text-neutral-900 mb-3 flex items-center gap-1.5">
              <span>🇳🇬</span>
              <span>Nigeria & Site</span>
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/nigeria/cgpa-calculator/" className="hover:text-brand-strong hover:underline">
                  University CGPA (5.0 Scale)
                </Link>
              </li>
              <li>
                <Link href="/nigeria/polytechnic-cgpa-calculator/" className="hover:text-brand-strong hover:underline">
                  Polytechnic CGPA (4.0 Scale)
                </Link>
              </li>
              <li>
                <Link href="/nigeria/gpa-calculator/" className="hover:text-brand-strong hover:underline">
                  Semester GPA Calculator
                </Link>
              </li>
              <li>
                <Link href="/nigeria/target-cgpa-calculator/" className="hover:text-brand-strong hover:underline">
                  Target CGPA Calculator
                </Link>
              </li>
              <li className="pt-2 border-t border-neutral-200">
                <Link href="/about/" className="hover:text-brand-strong hover:underline font-medium">
                  About & Primary Sources
                </Link>
              </li>
              <li>
                <Link href="/sitemap/" className="hover:text-brand-strong hover:underline">
                  HTML Sitemap
                </Link>
              </li>
              <li>
                <Link href="/privacy/" className="hover:text-brand-strong hover:underline">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms/" className="hover:text-brand-strong hover:underline">
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal notice and Disclaimer */}
        <div className="mt-8 border-t border-neutral-200 pt-6 text-xs text-neutral-500 space-y-2">
          <p>
            <strong>Official Rates Verification:</strong> All calculation tables and statutory schedules are verified against official government circulars and published corporate notices (SSS, PhilHealth, Pag-IBIG, BIR TRAIN Law, Safaricom, MTN Uganda, Airtel Uganda, NUC, and NBTE) in force for 2026.
          </p>
          <p>
            <strong>Disclaimer:</strong> {siteConfig.brandName} is an independent computing reference provided free of charge for informational and planning purposes only. It does not constitute official payroll certification, banking authorization, or academic advisory.
          </p>
        </div>

        {/* Parent Network Footer Line (Zetawala appears ONLY here) */}
        <div className="mt-6 border-t border-neutral-200 pt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} {siteConfig.brandName}. All calculations are executed locally in your browser.</p>
          <p className="mt-2 sm:mt-0">
            <a
              href={siteConfig.parentNetwork.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-600 hover:text-neutral-900 underline font-medium"
            >
              {siteConfig.parentNetwork.footerText}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
