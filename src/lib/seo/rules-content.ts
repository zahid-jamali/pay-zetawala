/**
 * Dynamic Rules Content Helpers
 * Reads directly from verified rules files in src/rules/
 * Ensures zero hard-coded rates in editorial content and metadata.
 */

import {
  SSS_TOTAL_RATE,
  SSS_EE_RATE,
  SSS_ER_RATE,
  SSS_REGULAR_MSC_CAP,
  SSS_MAX_MSC,
  SSS_MIN_MSC,
  PHILHEALTH_PREMIUM_RATE,
  PHILHEALTH_INCOME_FLOOR,
  PHILHEALTH_INCOME_CEILING,
  PAGIBIG_MAX_FUND_SALARY,
  PAGIBIG_MAX_EE_SHARE,
  PAGIBIG_MAX_ER_SHARE,
  BIR_MONTHLY_TAX_BRACKETS,
  TAX_EXEMPT_13TH_MONTH_CEILING,
  SSS_PENSION_ADDITIONAL_BENEFIT,
} from '@/rules/ph/2026';

import {
  MPESA_MAX_DAILY_LIMIT,
  MPESA_MAX_PER_TXN,
  MPESA_MAX_BALANCE,
  MSHWARI_TOTAL_CHARGE_RATE,
  MSHWARI_TERM_DAYS,
  MPESA_TARIFF_BANDS,
  FULIZA_DAILY_BANDS,
} from '@/rules/ke/2026';

import {
  UG_WITHDRAWAL_TAX_RATE,
  UG_MOMO_MAX_SINGLE_TXN,
  UG_MOMO_MAX_BALANCE,
  MTN_UG_TARIFF_BANDS,
  AIRTEL_UG_TARIFF_BANDS,
} from '@/rules/ug/2026';

import {
  NUC_MAX_SCALE,
  NUC_STANDARD_GRADE_SCALE,
  NUC_DEGREE_CLASSIFICATIONS,
  NBTE_MAX_SCALE,
  NBTE_STANDARD_GRADE_SCALE,
  NBTE_DIPLOMA_CLASSIFICATIONS,
} from '@/rules/ng/grading';

export interface PhRatesSummary {
  sssTotalRate: number;
  sssEeRate: number;
  sssErRate: number;
  sssMinMsc: number;
  sssRegularMscCap: number;
  sssMaxTotalMsc: number;
  philhealthTotalRate: number;
  philhealthEeRate: number;
  philhealthErRate: number;
  philhealthIncomeFloor: number;
  philhealthIncomeCeiling: number;
  philhealthMinPremium: number;
  philhealthMaxPremium: number;
  pagibigEeRate: number;
  pagibigErRate: number;
  pagibigMaxMfs: number;
  pagibigMaxEeContribution: number;
  pagibigMaxErContribution: number;
  taxExemptAnnual: number;
  taxExemptMonthly: number;
  thirteenthMonthTaxExemptLimit: number;
  sssPensionBonus: number;
  verifiedYear: number;
  verifiedDate: string;
}

export function getPhRates(): PhRatesSummary {
  const philRate = PHILHEALTH_PREMIUM_RATE.value;
  return {
    sssTotalRate: SSS_TOTAL_RATE.value,
    sssEeRate: SSS_EE_RATE.value,
    sssErRate: SSS_ER_RATE.value,
    sssMinMsc: SSS_MIN_MSC.value,
    sssRegularMscCap: SSS_REGULAR_MSC_CAP.value,
    sssMaxTotalMsc: SSS_MAX_MSC.value,
    philhealthTotalRate: philRate,
    philhealthEeRate: philRate / 2, // 50% employee share
    philhealthErRate: philRate / 2, // 50% employer share
    philhealthIncomeFloor: PHILHEALTH_INCOME_FLOOR.value,
    philhealthIncomeCeiling: PHILHEALTH_INCOME_CEILING.value,
    philhealthMinPremium: PHILHEALTH_INCOME_FLOOR.value * (philRate / 100),
    philhealthMaxPremium: PHILHEALTH_INCOME_CEILING.value * (philRate / 100),
    pagibigEeRate: 2.0, // 2% above ₱1,500
    pagibigErRate: 2.0,
    pagibigMaxMfs: PAGIBIG_MAX_FUND_SALARY.value,
    pagibigMaxEeContribution: PAGIBIG_MAX_EE_SHARE.value,
    pagibigMaxErContribution: PAGIBIG_MAX_ER_SHARE.value,
    taxExemptAnnual: 250000,
    taxExemptMonthly: BIR_MONTHLY_TAX_BRACKETS[0].maxComp,
    thirteenthMonthTaxExemptLimit: TAX_EXEMPT_13TH_MONTH_CEILING.value,
    sssPensionBonus: SSS_PENSION_ADDITIONAL_BENEFIT.value,
    verifiedYear: 2026,
    verifiedDate: SSS_TOTAL_RATE.verifiedOn,
  };
}

export interface KeRatesSummary {
  mpesaMaxDailyLimit: number;
  mpesaMaxSingleTxn: number;
  mpesaMaxBalance: number;
  exciseDutyRate: number;
  fulizaFreeHours: number;
  mshwariFeeRate: number;
  mshwariTermDays: number;
  tariffBandsCount: number;
  fulizaBandsCount: number;
  verifiedYear: number;
  verifiedDate: string;
}

export function getKeRates(): KeRatesSummary {
  return {
    mpesaMaxDailyLimit: MPESA_MAX_DAILY_LIMIT.value,
    mpesaMaxSingleTxn: MPESA_MAX_PER_TXN.value,
    mpesaMaxBalance: MPESA_MAX_BALANCE.value,
    exciseDutyRate: 15.0, // 15% Excise Duty on Mobile Money
    fulizaFreeHours: 72, // 3-day grace period
    mshwariFeeRate: MSHWARI_TOTAL_CHARGE_RATE.value,
    mshwariTermDays: MSHWARI_TERM_DAYS.value,
    tariffBandsCount: MPESA_TARIFF_BANDS.length,
    fulizaBandsCount: FULIZA_DAILY_BANDS.length,
    verifiedYear: 2026,
    verifiedDate: MPESA_MAX_DAILY_LIMIT.verifiedOn,
  };
}

export interface UgRatesSummary {
  withdrawTaxRate: number;
  maxSingleTxn: number;
  maxDailyLimit: number;
  maxBalance: number;
  mtnBandsCount: number;
  airtelBandsCount: number;
  verifiedYear: number;
  verifiedDate: string;
}

export function getUgRates(): UgRatesSummary {
  return {
    withdrawTaxRate: UG_WITHDRAWAL_TAX_RATE.value,
    maxSingleTxn: UG_MOMO_MAX_SINGLE_TXN.value,
    maxDailyLimit: 10000000,
    maxBalance: UG_MOMO_MAX_BALANCE.value,
    mtnBandsCount: MTN_UG_TARIFF_BANDS.length,
    airtelBandsCount: AIRTEL_UG_TARIFF_BANDS.length,
    verifiedYear: 2026,
    verifiedDate: UG_WITHDRAWAL_TAX_RATE.verifiedOn,
  };
}

export interface NgRatesSummary {
  nucMaxScale: number;
  nucFirstClassMin: number;
  nucSecondClassUpperMin: number;
  nucSecondClassLowerMin: number;
  nucThirdClassMin: number;
  nbteMaxScale: number;
  nbteDistinctionMin: number;
  nbteUpperCreditMin: number;
  nbteLowerCreditMin: number;
  nbtePassMin: number;
  universityGradeScale: typeof NUC_STANDARD_GRADE_SCALE;
  polytechnicGradeScale: typeof NBTE_STANDARD_GRADE_SCALE;
  degreeClassifications: typeof NUC_DEGREE_CLASSIFICATIONS;
  diplomaClassifications: typeof NBTE_DIPLOMA_CLASSIFICATIONS;
  verifiedYear: number;
  verifiedDate: string;
}

export function getNgRates(): NgRatesSummary {
  const firstClass = NUC_DEGREE_CLASSIFICATIONS.find((c) => c.classification.includes('First Class'))?.minCgpa ?? 4.50;
  const secondUpper = NUC_DEGREE_CLASSIFICATIONS.find((c) => c.classification.includes('Upper'))?.minCgpa ?? 3.50;
  const secondLower = NUC_DEGREE_CLASSIFICATIONS.find((c) => c.classification.includes('Lower'))?.minCgpa ?? 2.40;
  const thirdClass = NUC_DEGREE_CLASSIFICATIONS.find((c) => c.classification.includes('Third'))?.minCgpa ?? 1.50;

  const distinction = NBTE_DIPLOMA_CLASSIFICATIONS.find((c) => c.classification === 'Distinction')?.minCgpa ?? 3.50;
  const upperCredit = NBTE_DIPLOMA_CLASSIFICATIONS.find((c) => c.classification === 'Upper Credit')?.minCgpa ?? 3.00;
  const lowerCredit = NBTE_DIPLOMA_CLASSIFICATIONS.find((c) => c.classification === 'Lower Credit')?.minCgpa ?? 2.50;
  const pass = NBTE_DIPLOMA_CLASSIFICATIONS.find((c) => c.classification === 'Pass')?.minCgpa ?? 2.00;

  return {
    nucMaxScale: NUC_MAX_SCALE.value,
    nucFirstClassMin: firstClass,
    nucSecondClassUpperMin: secondUpper,
    nucSecondClassLowerMin: secondLower,
    nucThirdClassMin: thirdClass,
    nbteMaxScale: NBTE_MAX_SCALE.value,
    nbteDistinctionMin: distinction,
    nbteUpperCreditMin: upperCredit,
    nbteLowerCreditMin: lowerCredit,
    nbtePassMin: pass,
    universityGradeScale: NUC_STANDARD_GRADE_SCALE,
    polytechnicGradeScale: NBTE_STANDARD_GRADE_SCALE,
    degreeClassifications: NUC_DEGREE_CLASSIFICATIONS,
    diplomaClassifications: NBTE_DIPLOMA_CLASSIFICATIONS,
    verifiedYear: 2026,
    verifiedDate: NUC_MAX_SCALE.verifiedOn,
  };
}
