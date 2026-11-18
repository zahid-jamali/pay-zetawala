import { TAX_EXEMPT_13TH_MONTH_CEILING } from '@/rules/ph/2026';

export interface ThirteenthMonthStandardInput {
  monthlyBasic: number;
  monthsWorked: number; // 1 to 12
  otherBenefits?: number;
}

export interface ThirteenthMonthMonthlyInput {
  monthlyEarnings: number[]; // Array of up to 12 monthly basic salaries
  otherBenefits?: number;
}

export interface ThirteenthMonthResult {
  totalBasicSalaryEarned: number;
  thirteenthMonthPay: number;
  otherBenefits: number;
  totalBenefits: number;
  exemptPortion: number;
  taxableExcess: number;
  paymentDeadline: string;
}

/**
 * Calculate 13th Month Pay (Standard Mode)
 */
export function calculateThirteenthMonthStandard(input: ThirteenthMonthStandardInput): ThirteenthMonthResult {
  const { monthlyBasic, monthsWorked, otherBenefits = 0 } = input;
  const validMonths = Math.min(Math.max(monthsWorked, 1), 12);
  const totalBasicSalaryEarned = Math.round(monthlyBasic * validMonths * 100) / 100;
  const thirteenthMonthPay = Math.round((totalBasicSalaryEarned / 12) * 100) / 100;

  const totalBenefits = Math.round((thirteenthMonthPay + otherBenefits) * 100) / 100;
  const exemptPortion = Math.min(totalBenefits, TAX_EXEMPT_13TH_MONTH_CEILING.value);
  const taxableExcess = Math.max(0, Math.round((totalBenefits - exemptPortion) * 100) / 100);

  return {
    totalBasicSalaryEarned,
    thirteenthMonthPay,
    otherBenefits,
    totalBenefits,
    exemptPortion,
    taxableExcess,
    paymentDeadline: 'On or before December 24',
  };
}

/**
 * Calculate 13th Month Pay (Month-by-Month Mode for raises, unpaid leaves, resignation)
 */
export function calculateThirteenthMonthMonthly(input: ThirteenthMonthMonthlyInput): ThirteenthMonthResult {
  const { monthlyEarnings, otherBenefits = 0 } = input;
  const totalBasicSalaryEarned = Math.round(monthlyEarnings.reduce((acc, curr) => acc + (curr || 0), 0) * 100) / 100;
  const thirteenthMonthPay = Math.round((totalBasicSalaryEarned / 12) * 100) / 100;

  const totalBenefits = Math.round((thirteenthMonthPay + otherBenefits) * 100) / 100;
  const exemptPortion = Math.min(totalBenefits, TAX_EXEMPT_13TH_MONTH_CEILING.value);
  const taxableExcess = Math.max(0, Math.round((totalBenefits - exemptPortion) * 100) / 100);

  return {
    totalBasicSalaryEarned,
    thirteenthMonthPay,
    otherBenefits,
    totalBenefits,
    exemptPortion,
    taxableExcess,
    paymentDeadline: 'On or before December 24',
  };
}
