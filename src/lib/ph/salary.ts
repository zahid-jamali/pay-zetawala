import {
  SSS_EMPLOYED_BRACKETS,
  SSS_KASAMBAHAY_EMPLOYER_FULL_THRESHOLD,
  PHILHEALTH_PREMIUM_RATE,
  PHILHEALTH_INCOME_FLOOR,
  PHILHEALTH_INCOME_CEILING,
  PAGIBIG_MAX_FUND_SALARY,
  PAGIBIG_MAX_EE_SHARE,
  PAGIBIG_MAX_ER_SHARE,
  BIR_MONTHLY_TAX_BRACKETS,
  BIR_SEMI_MONTHLY_TAX_BRACKETS,
  SssBracket,
} from '@/rules/ph/2026';

export type EmploymentType = 'employed' | 'kasambahay' | 'self_employed' | 'voluntary' | 'ofw';
export type PayFrequency = 'monthly' | 'semi-monthly';

export interface PhilHealthResult {
  mbs: number;
  totalPremium: number;
  employeeShare: number;
  employerShare: number;
}

export interface PagIbigResult {
  fundSalary: number;
  employeeShare: number;
  employerShare: number;
  totalContribution: number;
}

export interface SssResult {
  bracket: SssBracket;
  regularMsc: number;
  mpfMsc: number;
  totalMsc: number;
  eeRegularSs: number;
  eeMpf: number;
  eeTotal: number;
  erRegularSs: number;
  erMpf: number;
  erEc: number;
  erTotal: number;
  totalContribution: number;
}

export interface TaxResult {
  taxableIncome: number;
  withholdingTax: number;
  bracketNumber: number;
  baseTax: number;
  marginalRate: number;
}

export interface SalaryCalculationResult {
  grossPay: number;
  taxableAllowances: number;
  nonTaxableAllowances: number;
  payFrequency: PayFrequency;
  employmentType: EmploymentType;
  sss: SssResult;
  philhealth: PhilHealthResult;
  pagibig: PagIbigResult;
  totalEmployeeDeductions: number;
  taxableIncome: number;
  tax: TaxResult;
  netPay: number;
  netPayPerPeriod: number;
  employerTotalCost: number;
}

/**
 * Calculate PhilHealth Monthly Premium (5.0%, floor ₱10k, ceiling ₱100k, 50-50 split)
 */
export function calculatePhilHealth(monthlyBasic: number): PhilHealthResult {
  const mbs = Math.min(Math.max(monthlyBasic, PHILHEALTH_INCOME_FLOOR.value), PHILHEALTH_INCOME_CEILING.value);
  const totalPremium = Math.round(mbs * (PHILHEALTH_PREMIUM_RATE.value / 100) * 100) / 100;
  const employeeShare = Math.round((totalPremium / 2) * 100) / 100;
  const employerShare = Math.round((totalPremium - employeeShare) * 100) / 100;

  return { mbs, totalPremium, employeeShare, employerShare };
}

/**
 * Calculate Pag-IBIG Fund Contribution (2% EE / 2% ER capped at ₱10k MFS = ₱200 each)
 */
export function calculatePagIbig(monthlyBasic: number): PagIbigResult {
  const fundSalary = Math.min(monthlyBasic, PAGIBIG_MAX_FUND_SALARY.value);
  let eeRate = 0.02;
  if (monthlyBasic <= 1500) {
    eeRate = 0.01;
  }
  const employeeShare = Math.min(Math.round(fundSalary * eeRate * 100) / 100, PAGIBIG_MAX_EE_SHARE.value);
  const employerShare = Math.min(Math.round(fundSalary * 0.02 * 100) / 100, PAGIBIG_MAX_ER_SHARE.value);
  const totalContribution = Math.round((employeeShare + employerShare) * 100) / 100;

  return { fundSalary, employeeShare, employerShare, totalContribution };
}

/**
 * Calculate SSS Contribution based on SSS Circular No. 2024-006 / 2024-007
 */
export function calculateSss(monthlyBasic: number, employmentType: EmploymentType = 'employed'): SssResult {
  let bracket = SSS_EMPLOYED_BRACKETS.find((b) => monthlyBasic >= b.minComp && monthlyBasic <= b.maxComp);
  if (!bracket) {
    bracket = SSS_EMPLOYED_BRACKETS[SSS_EMPLOYED_BRACKETS.length - 1];
  }

  // Handle domestic worker (Kasambahay) earning below ₱5,000 threshold
  if (employmentType === 'kasambahay' && monthlyBasic < SSS_KASAMBAHAY_EMPLOYER_FULL_THRESHOLD.value) {
    // Under Batas Kasambahay, employer pays 100% of contribution, employee pays 0
    return {
      bracket,
      regularMsc: bracket.regularMsc,
      mpfMsc: bracket.mpfMsc,
      totalMsc: bracket.totalMsc,
      eeRegularSs: 0,
      eeMpf: 0,
      eeTotal: 0,
      erRegularSs: Math.round(bracket.totalMsc * 0.15 * 100) / 100,
      erMpf: 0,
      erEc: bracket.erEc,
      erTotal: Math.round((bracket.totalMsc * 0.15 + bracket.erEc) * 100) / 100,
      totalContribution: Math.round((bracket.totalMsc * 0.15 + bracket.erEc) * 100) / 100,
    };
  }

  return {
    bracket,
    regularMsc: bracket.regularMsc,
    mpfMsc: bracket.mpfMsc,
    totalMsc: bracket.totalMsc,
    eeRegularSs: bracket.eeRegularSs,
    eeMpf: bracket.eeMpf,
    eeTotal: bracket.eeTotal,
    erRegularSs: bracket.erRegularSs,
    erMpf: bracket.erMpf,
    erEc: bracket.erEc,
    erTotal: bracket.erTotal,
    totalContribution: bracket.totalContribution,
  };
}

/**
 * Calculate BIR Withholding Tax on compensation under TRAIN Law (RR 11-2018)
 */
export function calculateWithholdingTax(taxableIncome: number, frequency: PayFrequency = 'monthly'): TaxResult {
  const brackets = frequency === 'monthly' ? BIR_MONTHLY_TAX_BRACKETS : BIR_SEMI_MONTHLY_TAX_BRACKETS;
  const roundedIncome = Math.max(0, taxableIncome);

  let matched = brackets[0];
  for (const b of brackets) {
    if (roundedIncome >= b.minComp && roundedIncome <= b.maxComp) {
      matched = b;
      break;
    }
  }

  let withholdingTax = 0;
  if (matched.bracket > 1) {
    const excess = roundedIncome - matched.excessOver;
    withholdingTax = Math.round((matched.baseTax + excess * matched.marginalRate) * 100) / 100;
  }

  return {
    taxableIncome: roundedIncome,
    withholdingTax,
    bracketNumber: matched.bracket,
    baseTax: matched.baseTax,
    marginalRate: matched.marginalRate,
  };
}

/**
 * Full Salary Calculation (Gross to Net, Deductions, and Employer Cost)
 */
export function calculateSalary(params: {
  monthlyBasic: number;
  taxableAllowances?: number;
  nonTaxableAllowances?: number;
  payFrequency?: PayFrequency;
  employmentType?: EmploymentType;
}): SalaryCalculationResult {
  const {
    monthlyBasic,
    taxableAllowances = 0,
    nonTaxableAllowances = 0,
    payFrequency = 'monthly',
    employmentType = 'employed',
  } = params;

  const grossPay = monthlyBasic + taxableAllowances + nonTaxableAllowances;

  let sss = calculateSss(monthlyBasic, employmentType);
  let philhealth = calculatePhilHealth(monthlyBasic);
  let pagibig = calculatePagIbig(monthlyBasic);

  // Kasambahay below ₱5,000 has 0 statutory employee deductions (employer shoulders 100% per RA 10361)
  if (employmentType === 'kasambahay' && monthlyBasic < SSS_KASAMBAHAY_EMPLOYER_FULL_THRESHOLD.value) {
    philhealth = {
      ...philhealth,
      employeeShare: 0,
      employerShare: philhealth.totalPremium,
    };
    pagibig = {
      ...pagibig,
      employeeShare: 0,
      employerShare: pagibig.totalContribution,
    };
  }

  const totalEmployeeDeductions = sss.eeTotal + philhealth.employeeShare + pagibig.employeeShare;

  const taxableIncome = Math.max(0, monthlyBasic + taxableAllowances - totalEmployeeDeductions);
  const tax = calculateWithholdingTax(taxableIncome, payFrequency);

  const netPay = Math.round((grossPay - totalEmployeeDeductions - tax.withholdingTax) * 100) / 100;
  const netPayPerPeriod = payFrequency === 'semi-monthly' ? Math.round((netPay / 2) * 100) / 100 : netPay;

  const employerTotalCost = Math.round((grossPay + sss.erTotal + philhealth.employerShare + pagibig.employerShare) * 100) / 100;

  return {
    grossPay,
    taxableAllowances,
    nonTaxableAllowances,
    payFrequency,
    employmentType,
    sss,
    philhealth,
    pagibig,
    totalEmployeeDeductions,
    taxableIncome,
    tax,
    netPay,
    netPayPerPeriod,
    employerTotalCost,
  };
}

/**
 * Reverse Calculation: Net to Gross
 * Finds the required Monthly Basic Salary to achieve a desired Net Pay.
 */
export function reverseNetToGross(targetNet: number, payFrequency: PayFrequency = 'monthly'): number {
  if (targetNet <= 0) return 0;

  let low = targetNet;
  let high = targetNet * 2.5;
  let best = low;

  for (let i = 0; i < 50; i++) {
    const mid = (low + high) / 2;
    const res = calculateSalary({ monthlyBasic: mid, payFrequency });
    if (Math.abs(res.netPay - targetNet) < 0.01) {
      return Math.round(mid * 100) / 100;
    }
    if (res.netPay < targetNet) {
      low = mid;
    } else {
      best = mid;
      high = mid;
    }
  }

  return Math.round(best * 100) / 100;
}
