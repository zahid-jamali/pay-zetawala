/**
 * Kenya Mobile Money Tariffs & Credit Facilities (in force 2026)
 * Official Sources: Safaricom PLC M-PESA Charges Schedule, Fuliza Mobile Terms,
 * M-Shwari Terms & Conditions, Finance Act 2023 (15% Excise Duty on Money Transfer).
 */

export interface VerifiedValue<T = number | string | boolean> {
  value: T;
  unit: string;
  validFrom: string;
  validTo: string | null;
  source: string;
  verifiedOn: string;
  confidence: 'high' | 'medium' | 'low';
}

export interface MpesaTariffBand {
  min: number;
  max: number;
  transferMpesa: number;
  transferOtherNetworks: number;
  agentWithdrawal: number | null; // null if not available
  atmWithdrawal: number | null;
}

export interface FulizaBand {
  min: number;
  max: number;
  dailyBaseFee: number;
  exciseDuty: number;
  totalDailyFee: number;
  freeDays: number; // 0 if none
}

export interface PaybillBand {
  min: number;
  max: number;
  charge: number;
}

// Limits (Safaricom Official Limits)
export const MPESA_MAX_DAILY_LIMIT: VerifiedValue<number> = {
  value: 500000,
  unit: 'KES',
  validFrom: '2023-08-15',
  validTo: null,
  source: 'Safaricom M-PESA Tariffs & Limits',
  verifiedOn: '2026-11-18',
  confidence: 'high',
};

export const MPESA_MAX_BALANCE: VerifiedValue<number> = {
  value: 500000,
  unit: 'KES',
  validFrom: '2023-08-15',
  validTo: null,
  source: 'Safaricom M-PESA Tariffs & Limits',
  verifiedOn: '2026-11-18',
  confidence: 'high',
};

export const MPESA_MAX_PER_TXN: VerifiedValue<number> = {
  value: 250000,
  unit: 'KES',
  validFrom: '2023-08-15',
  validTo: null,
  source: 'Safaricom M-PESA Tariffs & Limits',
  verifiedOn: '2026-11-18',
  confidence: 'high',
};

export const MPESA_MIN_AGENT_WITHDRAWAL: VerifiedValue<number> = {
  value: 50,
  unit: 'KES',
  validFrom: '2023-08-15',
  validTo: null,
  source: 'Safaricom M-PESA Tariffs & Limits',
  verifiedOn: '2026-11-18',
  confidence: 'high',
};

export const MPESA_EXCISE_DUTY_INCLUDED: VerifiedValue<boolean> = {
  value: true,
  unit: 'boolean',
  validFrom: '2023-07-29',
  validTo: null,
  source: 'Safaricom Notice / Finance Act 2023',
  verifiedOn: '2026-11-18',
  confidence: 'high',
};

// Band-by-Band M-PESA Customer Tariffs (Inclusive of 15% Excise Duty)
export const MPESA_TARIFF_BANDS: MpesaTariffBand[] = [
  { min: 1, max: 49, transferMpesa: 0, transferOtherNetworks: 0, agentWithdrawal: null, atmWithdrawal: null },
  { min: 50, max: 100, transferMpesa: 0, transferOtherNetworks: 0, agentWithdrawal: 11, atmWithdrawal: null },
  { min: 101, max: 500, transferMpesa: 7, transferOtherNetworks: 7, agentWithdrawal: 29, atmWithdrawal: 35 },
  { min: 501, max: 1000, transferMpesa: 13, transferOtherNetworks: 13, agentWithdrawal: 29, atmWithdrawal: 35 },
  { min: 1001, max: 1500, transferMpesa: 23, transferOtherNetworks: 23, agentWithdrawal: 29, atmWithdrawal: 35 },
  { min: 1501, max: 2500, transferMpesa: 33, transferOtherNetworks: 33, agentWithdrawal: 29, atmWithdrawal: 35 },
  { min: 2501, max: 3500, transferMpesa: 53, transferOtherNetworks: 53, agentWithdrawal: 52, atmWithdrawal: 69 },
  { min: 3501, max: 5000, transferMpesa: 57, transferOtherNetworks: 57, agentWithdrawal: 69, atmWithdrawal: 69 },
  { min: 5001, max: 7500, transferMpesa: 78, transferOtherNetworks: 78, agentWithdrawal: 87, atmWithdrawal: 115 },
  { min: 7501, max: 10000, transferMpesa: 90, transferOtherNetworks: 90, agentWithdrawal: 115, atmWithdrawal: 115 },
  { min: 10001, max: 15000, transferMpesa: 100, transferOtherNetworks: 100, agentWithdrawal: 167, atmWithdrawal: 203 },
  { min: 1501, max: 20000, transferMpesa: 105, transferOtherNetworks: 105, agentWithdrawal: 185, atmWithdrawal: 203 },
  { min: 20001, max: 35000, transferMpesa: 108, transferOtherNetworks: 108, agentWithdrawal: 197, atmWithdrawal: 203 },
  { min: 35001, max: 50000, transferMpesa: 108, transferOtherNetworks: 108, agentWithdrawal: 278, atmWithdrawal: null },
  { min: 50001, max: 250000, transferMpesa: 108, transferOtherNetworks: 108, agentWithdrawal: 309, atmWithdrawal: null },
];

// Pay to Paybill Customer Tariff (Table 6, Safaricom M-PESA Charges)
export const PAYBILL_CUSTOMER_BANDS: PaybillBand[] = [
  { min: 0, max: 100, charge: 0 },
  { min: 101, max: 500, charge: 3 },
  { min: 501, max: 1000, charge: 5 },
  { min: 1001, max: 1500, charge: 8 },
  { min: 1501, max: 2500, charge: 10 },
  { min: 2501, max: 3500, charge: 13 },
  { min: 3501, max: 5000, charge: 17 },
  { min: 5001, max: 7500, charge: 21 },
  { min: 7501, max: 10000, charge: 24 },
  { min: 10001, max: 15000, charge: 29 },
  { min: 15001, max: 20000, charge: 31 },
  { min: 20001, max: 25000, charge: 34 },
  { min: 25001, max: 30000, charge: 36 },
  { min: 30001, max: 35000, charge: 42 },
  { min: 35001, max: 40000, charge: 50 },
  { min: 40001, max: 45000, charge: 52 },
  { min: 45001, max: 250000, charge: 54 },
];

// Buy Goods Customer Charge (Always Free to consumer)
export const BUY_GOODS_CUSTOMER_CHARGE: VerifiedValue<number> = {
  value: 0,
  unit: 'KES',
  validFrom: '2023-08-15',
  validTo: null,
  source: 'Safaricom M-PESA Charges Table 5',
  verifiedOn: '2026-11-18',
  confidence: 'high',
};

// Fuliza M-PESA (Overdraft Facility)
export const FULIZA_ACCESS_FEE_RATE: VerifiedValue<number> = {
  value: 1.0,
  unit: '% of overdraft amount',
  validFrom: '2022-10-01',
  validTo: null,
  source: 'Safaricom Fuliza Terms & Conditions',
  verifiedOn: '2026-11-18',
  confidence: 'high',
};

export const FULIZA_MAX_TERM_DAYS: VerifiedValue<number> = {
  value: 30,
  unit: 'days',
  validFrom: '2022-10-01',
  validTo: null,
  source: 'Safaricom Fuliza Terms & Conditions',
  verifiedOn: '2026-11-18',
  confidence: 'high',
};

export const FULIZA_DAILY_BANDS: FulizaBand[] = [
  { min: 0, max: 100, dailyBaseFee: 0, exciseDuty: 0, totalDailyFee: 0, freeDays: 30 },
  { min: 101, max: 500, dailyBaseFee: 2.50, exciseDuty: 0.50, totalDailyFee: 3.00, freeDays: 3 },
  { min: 501, max: 1000, dailyBaseFee: 5.00, exciseDuty: 1.00, totalDailyFee: 6.00, freeDays: 3 },
  { min: 1001, max: 1500, dailyBaseFee: 18.00, exciseDuty: 3.60, totalDailyFee: 21.60, freeDays: 0 },
  { min: 1501, max: 2500, dailyBaseFee: 20.00, exciseDuty: 4.00, totalDailyFee: 24.00, freeDays: 0 },
  { min: 2501, max: 70000, dailyBaseFee: 25.00, exciseDuty: 5.00, totalDailyFee: 30.00, freeDays: 0 },
];

// M-Shwari 30-Day Loan (Safaricom & NCBA)
export const MSHWARI_FACILITATION_FEE_RATE: VerifiedValue<number> = {
  value: 7.5,
  unit: '% of loan amount',
  validFrom: '2023-07-01',
  validTo: null,
  source: 'Safaricom M-Shwari Terms & Conditions',
  verifiedOn: '2026-11-18',
  confidence: 'high',
};

export const MSHWARI_EXCISE_DUTY_RATE: VerifiedValue<number> = {
  value: 1.5,
  unit: '% of loan amount (20% of 7.5%)',
  validFrom: '2023-07-01',
  validTo: null,
  source: 'Safaricom M-Shwari Terms & Conditions',
  verifiedOn: '2026-11-18',
  confidence: 'high',
};

export const MSHWARI_TOTAL_CHARGE_RATE: VerifiedValue<number> = {
  value: 9.0,
  unit: '% of loan amount',
  validFrom: '2023-07-01',
  validTo: null,
  source: 'Safaricom M-Shwari Terms & Conditions',
  verifiedOn: '2026-11-18',
  confidence: 'high',
};

export const MSHWARI_TERM_DAYS: VerifiedValue<number> = {
  value: 30,
  unit: 'days',
  validFrom: '2023-07-01',
  validTo: null,
  source: 'Safaricom M-Shwari Terms & Conditions',
  verifiedOn: '2026-11-18',
  confidence: 'high',
};

export const MSHWARI_MIN_LOAN: VerifiedValue<number> = {
  value: 1000,
  unit: 'KES',
  validFrom: '2023-07-01',
  validTo: null,
  source: 'Safaricom M-Shwari Terms & Conditions',
  verifiedOn: '2026-11-18',
  confidence: 'high',
};

export const MSHWARI_MAX_LOAN: VerifiedValue<number> = {
  value: 1000000,
  unit: 'KES',
  validFrom: '2023-07-01',
  validTo: null,
  source: 'Safaricom M-Shwari Terms & Conditions',
  verifiedOn: '2026-11-18',
  confidence: 'high',
};
