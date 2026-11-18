import {
  SSS_PENSION_ADDITIONAL_BENEFIT,
  SSS_MIN_PENSION_10_CYS,
  SSS_MIN_PENSION_20_CYS,
  SSS_REGULAR_MSC_CAP,
  SSS_MIN_MSC,
} from '@/rules/ph/2026';

export interface SssPensionInputs {
  amsc: number; // Average Monthly Salary Credit (₱5,000 to ₱20,000)
  cys: number; // Credited Years of Service (>= 10 for pension)
  numDependents?: number; // Qualified minor children (up to 5)
  age?: number;
  isEmployed?: boolean;
}

export interface SssPensionResult {
  isEligible: boolean;
  ineligibilityReason?: string;
  amscUsed: number;
  cys: number;
  formula1: number;
  formula2: number;
  formula3: number;
  basicMonthlyPension: number; // BMP = max(f1, f2, f3)
  additionalBenefit: number; // ₱1,000 under EO 54
  dependentAllowancePerChild: number;
  numDependents: number;
  totalDependentAllowance: number;
  totalMonthlyPension: number;
  thirteenthMonthPension: number;
  annualPayout: number;
}

/**
 * Compute SSS Retirement Pension under RA 11199 & EO 54.
 */
export function calculateSssPension(inputs: SssPensionInputs): SssPensionResult {
  const { amsc, cys, numDependents = 0, age, isEmployed = false } = inputs;

  // Validate eligibility
  let isEligible = true;
  let ineligibilityReason: string | undefined;

  if (cys < 10) {
    isEligible = false;
    ineligibilityReason = 'At least 10 Credited Years of Service (120 monthly contributions) are required for a monthly pension. Members with fewer than 120 contributions are eligible for a lump-sum retirement refund instead.';
  } else if (age !== undefined) {
    if (age < 60) {
      isEligible = false;
      ineligibilityReason = 'Minimum retirement age is 60 years old (optional retirement) or 65 years old (technical/mandatory retirement).';
    } else if (age < 65 && isEmployed) {
      isEligible = false;
      ineligibilityReason = 'For retirement between ages 60 and 64, the member must be separated from employment or have ceased self-employment.';
    }
  }

  // Cap AMSC between official regular min and max (₱5,000 - ₱20,000)
  const amscUsed = Math.min(
    Math.max(amsc, SSS_MIN_MSC.value),
    SSS_REGULAR_MSC_CAP.value
  );

  // Formula 1: ₱300 + 20% of AMSC + 2% of AMSC for each CYS in excess of 10
  const excessCys = Math.max(0, cys - 10);
  const formula1 = 300 + 0.20 * amscUsed + 0.02 * amscUsed * excessCys;

  // Formula 2: 40% of AMSC
  const formula2 = 0.40 * amscUsed;

  // Formula 3: Statutory Minimum Pension
  let formula3 = 0;
  if (cys >= 20) {
    formula3 = SSS_MIN_PENSION_20_CYS.value; // ₱2,400
  } else if (cys >= 10) {
    formula3 = SSS_MIN_PENSION_10_CYS.value; // ₱1,200
  }

  // Basic Monthly Pension (BMP) is the highest of the three statutory formulas
  const basicMonthlyPension = Math.max(formula1, formula2, formula3);

  // Additional benefit under EO 54
  const additionalBenefit = SSS_PENSION_ADDITIONAL_BENEFIT.value; // ₱1,000

  // Dependent children allowance: 10% of BMP or ₱250, whichever is higher, for up to 5 children
  const clampedDependents = Math.min(Math.max(0, Math.floor(numDependents)), 5);
  const dependentAllowancePerChild = Math.max(0.10 * basicMonthlyPension, 250);
  const totalDependentAllowance = clampedDependents * dependentAllowancePerChild;

  // Total monthly pension = BMP + additional benefit + dependent allowances
  const totalMonthlyPension = basicMonthlyPension + additionalBenefit + totalDependentAllowance;

  // 13th month pension in December = BMP + additional benefit (dependent allowances excluded)
  const thirteenthMonthPension = basicMonthlyPension + additionalBenefit;

  // Annual payout = (12 months of total monthly pension) + 13th month pension
  const annualPayout = totalMonthlyPension * 12 + thirteenthMonthPension;

  return {
    isEligible,
    ineligibilityReason,
    amscUsed,
    cys,
    formula1: Math.round(formula1 * 100) / 100,
    formula2: Math.round(formula2 * 100) / 100,
    formula3,
    basicMonthlyPension: Math.round(basicMonthlyPension * 100) / 100,
    additionalBenefit,
    dependentAllowancePerChild: Math.round(dependentAllowancePerChild * 100) / 100,
    numDependents: clampedDependents,
    totalDependentAllowance: Math.round(totalDependentAllowance * 100) / 100,
    totalMonthlyPension: Math.round(totalMonthlyPension * 100) / 100,
    thirteenthMonthPension: Math.round(thirteenthMonthPension * 100) / 100,
    annualPayout: Math.round(annualPayout * 100) / 100,
  };
}
