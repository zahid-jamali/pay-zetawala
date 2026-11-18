import {
  SSS_LOAN_INTEREST_RATE_STANDARD,
  SSS_LOAN_INTEREST_RATE_CONDONED,
  SSS_LOAN_SERVICE_FEE_RATE,
  SSS_LOAN_TERM_MONTHS,
  SSS_LOAN_MAX_MSC_BASIS,
} from '@/rules/ph/2026';

export interface SssSalaryLoanInputs {
  averageMsc: number; // Average of the member's last 12 Monthly Salary Credits (capped at ₱20k regular MSC)
  postedContributions: number; // Total posted monthly contributions (>= 36 for 1-month loan; >= 72 for 2-month)
  contributionsLast12Months?: number; // Must be >= 6 to be eligible
  priorCondonation?: boolean; // Has availed penalty condonation in last 5 years (8% vs 10%)
  desiredLoanType?: 'auto' | 'one_month' | 'two_month';
}

export interface AmortizationScheduleRow {
  month: number;
  beginningBalance: number;
  monthlyPayment: number;
  principal: number;
  interest: number;
  endingBalance: number;
  balance?: number;
}

export interface SssSalaryLoanResult {
  isEligible: boolean;
  ineligibilityReason?: string;
  loanType: 'one_month' | 'two_month';
  averageMsc: number;
  mscBasis: number;
  grossLoanAmount: number;
  serviceFeeRate: number;
  serviceFeeAmount: number;
  netLoanProceeds: number;
  interestRateAnnual: number;
  monthlyInterestRate: number;
  termMonths: number;
  monthlyAmortization: number;
  totalRepayment: number;
  totalRepayable?: number;
  totalInterest: number;
  schedule: AmortizationScheduleRow[];
  amortizationSchedule?: AmortizationScheduleRow[];
}

/**
 * Calculate SSS Salary Loan terms, net proceeds, and diminishing-balance amortization schedule.
 * Based on SSS Circular No. 2025-004.
 */
export function calculateSssSalaryLoan(inputs: SssSalaryLoanInputs): SssSalaryLoanResult {
  const {
    averageMsc,
    postedContributions,
    contributionsLast12Months = 6,
    priorCondonation = false,
    desiredLoanType = 'auto',
  } = inputs;

  let isEligible = true;
  let ineligibilityReason: string | undefined;

  if (postedContributions < 36) {
    isEligible = false;
    ineligibilityReason = 'A minimum of 36 posted monthly contributions is required to apply for an SSS salary loan.';
  } else if (contributionsLast12Months < 6) {
    isEligible = false;
    ineligibilityReason = 'At least 6 contributions must be posted within the last 12 months prior to application.';
  }

  // Determine loan type
  let loanType: 'one_month' | 'two_month' = 'one_month';
  if (desiredLoanType === 'two_month') {
    if (postedContributions < 72) {
      isEligible = false;
      ineligibilityReason = 'A 2-month salary loan requires at least 72 posted monthly contributions.';
    }
    loanType = 'two_month';
  } else if (desiredLoanType === 'one_month') {
    loanType = 'one_month';
  } else {
    // Auto mode: if 72 or more contributions, qualify for 2-month loan
    loanType = postedContributions >= 72 ? 'two_month' : 'one_month';
  }

  // Cap MSC basis at maximum regular MSC (₱20,000)
  const mscBasis = Math.min(Math.max(0, averageMsc), SSS_LOAN_MAX_MSC_BASIS.value);
  const multiplier = loanType === 'two_month' ? 2 : 1;
  const grossLoanAmount = mscBasis * multiplier;

  // Service fee: 1% deducted upfront
  const serviceFeeRate = SSS_LOAN_SERVICE_FEE_RATE.value; // 1.0%
  const serviceFeeAmount = Math.round((grossLoanAmount * (serviceFeeRate / 100)) * 100) / 100;
  const netLoanProceeds = grossLoanAmount - serviceFeeAmount;

  // Interest rate: 8% standard or 10% if condonation in past 5 years
  const interestRateAnnual = priorCondonation
    ? SSS_LOAN_INTEREST_RATE_CONDONED.value
    : SSS_LOAN_INTEREST_RATE_STANDARD.value;

  const termMonths = SSS_LOAN_TERM_MONTHS.value; // 24 months
  const monthlyRate = interestRateAnnual / 100 / 12;

  // Diminishing balance monthly amortization formula:
  // A = P * [ r(1+r)^n ] / [ (1+r)^n - 1 ]
  let monthlyAmortization = 0;
  if (grossLoanAmount > 0 && termMonths > 0) {
    const factor = Math.pow(1 + monthlyRate, termMonths);
    monthlyAmortization = grossLoanAmount * ((monthlyRate * factor) / (factor - 1));
  }
  monthlyAmortization = Math.round(monthlyAmortization * 100) / 100;

  // Generate 24-month amortization schedule
  const schedule: AmortizationScheduleRow[] = [];
  let currentBalance = grossLoanAmount;
  let totalInterest = 0;
  let totalRepayment = 0;

  for (let m = 1; m <= termMonths; m++) {
    const interestCharge = Math.round(currentBalance * monthlyRate * 100) / 100;
    let principalPaid = monthlyAmortization - interestCharge;

    // Adjust for the final month
    if (m === termMonths || principalPaid > currentBalance) {
      principalPaid = currentBalance;
      const finalPayment = Math.round((principalPaid + interestCharge) * 100) / 100;
      schedule.push({
        month: m,
        beginningBalance: Math.round(currentBalance * 100) / 100,
        monthlyPayment: finalPayment,
        principal: Math.round(principalPaid * 100) / 100,
        interest: interestCharge,
        endingBalance: 0,
      });
      totalInterest += interestCharge;
      totalRepayment += finalPayment;
      currentBalance = 0;
      break;
    }

    const endingBalance = currentBalance - principalPaid;
    schedule.push({
      month: m,
      beginningBalance: Math.round(currentBalance * 100) / 100,
      monthlyPayment: monthlyAmortization,
      principal: Math.round(principalPaid * 100) / 100,
      interest: interestCharge,
      endingBalance: Math.round(endingBalance * 100) / 100,
    });

    totalInterest += interestCharge;
    totalRepayment += monthlyAmortization;
    currentBalance = endingBalance;
  }

  return {
    isEligible,
    ineligibilityReason,
    loanType,
    averageMsc,
    mscBasis,
    grossLoanAmount,
    serviceFeeRate,
    serviceFeeAmount,
    netLoanProceeds,
    interestRateAnnual,
    monthlyInterestRate: monthlyRate,
    termMonths,
    monthlyAmortization,
    totalRepayment: Math.round(totalRepayment * 100) / 100,
    totalRepayable: Math.round(totalRepayment * 100) / 100,
    totalInterest: Math.round(totalInterest * 100) / 100,
    schedule,
    amortizationSchedule: schedule,
  };
}
