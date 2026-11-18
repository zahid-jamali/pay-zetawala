/**
 * Uganda Mobile Money Tariffs & Government Withdrawal Taxes (in force 2026)
 * Official Sources: MTN Uganda MoMo Tariffs, Airtel Uganda Mobile Money Fees,
 * Uganda Revenue Authority (Excise Duty (Amendment) Act 2018).
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

export interface UgandaMomoBand {
  min: number;
  max: number;
  sendOnNetAndOffNet: number;
  sendToBank: number | null;
  agentWithdraw: number;
  atmWithdraw: number | null;
  statutoryTaxRate: number; // 0.005 (0.5%)
}

// Limits (MTN & Airtel Uganda Standard Account Limits)
export const UG_MOMO_MIN_TRANSACTION: VerifiedValue<number> = {
  value: 500,
  unit: 'UGX',
  validFrom: '2024-01-01',
  validTo: null,
  source: 'MTN Uganda MoMo Tariffs',
  verifiedOn: '2026-11-18',
  confidence: 'high',
};

export const UG_MOMO_MAX_SINGLE_TXN: VerifiedValue<number> = {
  value: 5000000,
  unit: 'UGX',
  validFrom: '2024-01-01',
  validTo: null,
  source: 'MTN Uganda MoMo Tariffs',
  verifiedOn: '2026-11-18',
  confidence: 'high',
};

export const UG_MOMO_MAX_BALANCE: VerifiedValue<number> = {
  value: 20000000,
  unit: 'UGX',
  validFrom: '2024-01-01',
  validTo: null,
  source: 'MTN Uganda MoMo Tariffs',
  verifiedOn: '2026-11-18',
  confidence: 'high',
};

// Government Statutory Withdrawal Tax (Excise Duty Act)
export const UG_WITHDRAWAL_TAX_RATE: VerifiedValue<number> = {
  value: 0.5,
  unit: '% of withdrawal amount',
  validFrom: '2018-11-01',
  validTo: null,
  source: 'Excise Duty (Amendment) Act 2018 / URA',
  verifiedOn: '2026-11-18',
  confidence: 'high',
};

// MTN Mobile Money Uganda Official Tariff Bands
export const MTN_UG_TARIFF_BANDS: UgandaMomoBand[] = [
  { min: 500, max: 2500, sendOnNetAndOffNet: 100, sendToBank: null, agentWithdraw: 330, atmWithdraw: null, statutoryTaxRate: 0.005 },
  { min: 2501, max: 5000, sendOnNetAndOffNet: 100, sendToBank: 1500, agentWithdraw: 440, atmWithdraw: 1150, statutoryTaxRate: 0.005 },
  { min: 5001, max: 15000, sendOnNetAndOffNet: 500, sendToBank: 1500, agentWithdraw: 700, atmWithdraw: 1150, statutoryTaxRate: 0.005 },
  { min: 15001, max: 30000, sendOnNetAndOffNet: 500, sendToBank: 1500, agentWithdraw: 880, atmWithdraw: 1150, statutoryTaxRate: 0.005 },
  { min: 30001, max: 45000, sendOnNetAndOffNet: 500, sendToBank: 1500, agentWithdraw: 1210, atmWithdraw: 1400, statutoryTaxRate: 0.005 },
  { min: 45001, max: 60000, sendOnNetAndOffNet: 500, sendToBank: 1500, agentWithdraw: 1500, atmWithdraw: 1400, statutoryTaxRate: 0.005 },
  { min: 60001, max: 125000, sendOnNetAndOffNet: 1000, sendToBank: 1500, agentWithdraw: 1925, atmWithdraw: 2150, statutoryTaxRate: 0.005 },
  { min: 125001, max: 250000, sendOnNetAndOffNet: 1000, sendToBank: 2250, agentWithdraw: 3575, atmWithdraw: 4000, statutoryTaxRate: 0.005 },
  { min: 25001, max: 500000, sendOnNetAndOffNet: 1000, sendToBank: 4100, agentWithdraw: 7000, atmWithdraw: 6650, statutoryTaxRate: 0.005 },
  { min: 500001, max: 1000000, sendOnNetAndOffNet: 1500, sendToBank: 6150, agentWithdraw: 12500, atmWithdraw: 11950, statutoryTaxRate: 0.005 },
  { min: 1000001, max: 2000000, sendOnNetAndOffNet: 2000, sendToBank: 9250, agentWithdraw: 15000, atmWithdraw: null, statutoryTaxRate: 0.005 },
  { min: 2000001, max: 4000000, sendOnNetAndOffNet: 2000, sendToBank: 11300, agentWithdraw: 18000, atmWithdraw: null, statutoryTaxRate: 0.005 },
  { min: 4000001, max: 5000000, sendOnNetAndOffNet: 2000, sendToBank: 11300, agentWithdraw: 20000, atmWithdraw: null, statutoryTaxRate: 0.005 },
];

// Airtel Money Uganda Official Tariff Bands (Harmonized with MTN)
export const AIRTEL_UG_TARIFF_BANDS: UgandaMomoBand[] = [
  { min: 500, max: 2500, sendOnNetAndOffNet: 100, sendToBank: null, agentWithdraw: 330, atmWithdraw: null, statutoryTaxRate: 0.005 },
  { min: 2501, max: 5000, sendOnNetAndOffNet: 100, sendToBank: 1500, agentWithdraw: 440, atmWithdraw: 1150, statutoryTaxRate: 0.005 },
  { min: 5001, max: 15000, sendOnNetAndOffNet: 500, sendToBank: 1500, agentWithdraw: 700, atmWithdraw: 1150, statutoryTaxRate: 0.005 },
  { min: 15001, max: 30000, sendOnNetAndOffNet: 500, sendToBank: 1500, agentWithdraw: 880, atmWithdraw: 1150, statutoryTaxRate: 0.005 },
  { min: 30001, max: 45000, sendOnNetAndOffNet: 500, sendToBank: 1500, agentWithdraw: 1210, atmWithdraw: 1400, statutoryTaxRate: 0.005 },
  { min: 45001, max: 60000, sendOnNetAndOffNet: 500, sendToBank: 1500, agentWithdraw: 1500, atmWithdraw: 1400, statutoryTaxRate: 0.005 },
  { min: 60001, max: 125000, sendOnNetAndOffNet: 1000, sendToBank: 1500, agentWithdraw: 1925, atmWithdraw: 2150, statutoryTaxRate: 0.005 },
  { min: 125001, max: 250000, sendOnNetAndOffNet: 1000, sendToBank: 2250, agentWithdraw: 3575, atmWithdraw: 4000, statutoryTaxRate: 0.005 },
  { min: 250001, max: 500000, sendOnNetAndOffNet: 1000, sendToBank: 4100, agentWithdraw: 7000, atmWithdraw: 6650, statutoryTaxRate: 0.005 },
  { min: 500001, max: 1000000, sendOnNetAndOffNet: 1500, sendToBank: 6150, agentWithdraw: 12500, atmWithdraw: 11950, statutoryTaxRate: 0.005 },
  { min: 1000001, max: 2000000, sendOnNetAndOffNet: 2000, sendToBank: 9250, agentWithdraw: 15000, atmWithdraw: null, statutoryTaxRate: 0.005 },
  { min: 2000001, max: 4000000, sendOnNetAndOffNet: 2000, sendToBank: 11300, agentWithdraw: 18000, atmWithdraw: null, statutoryTaxRate: 0.005 },
  { min: 4000001, max: 5000000, sendOnNetAndOffNet: 2000, sendToBank: 11300, agentWithdraw: 20000, atmWithdraw: null, statutoryTaxRate: 0.005 },
];
