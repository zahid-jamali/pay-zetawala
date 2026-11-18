import {
  FULIZA_ACCESS_FEE_RATE,
  FULIZA_DAILY_BANDS,
  FULIZA_MAX_TERM_DAYS,
  FulizaBand,
} from '@/rules/ke/2026';

export interface FulizaCalculationInputs {
  amount: number;
  days: number; // Duration until repayment (1 to 30 days)
}

export interface FulizaCalculationResult {
  amount: number;
  days: number;
  accessFeeRate: number;
  accessFee: number;
  dailyBaseFee: number;
  dailyExciseDuty: number;
  dailyTotalFee: number;
  freeGraceDays: number;
  chargeableDays: number;
  totalMaintenanceFees: number;
  totalFinanceCost: number;
  totalSettlementAmount: number;
  effectivePercentageCost: number;
  band?: FulizaBand;
  isOverLimit: boolean;
  limitError?: string;
}

/**
 * Calculate Fuliza M-PESA overdraft charges, access fees, and daily maintenance fees.
 */
export function calculateFuliza(inputs: FulizaCalculationInputs): FulizaCalculationResult {
  const { amount, days } = inputs;

  if (amount <= 0) {
    return {
      amount,
      days,
      accessFeeRate: FULIZA_ACCESS_FEE_RATE.value,
      accessFee: 0,
      dailyBaseFee: 0,
      dailyExciseDuty: 0,
      dailyTotalFee: 0,
      freeGraceDays: 0,
      chargeableDays: 0,
      totalMaintenanceFees: 0,
      totalFinanceCost: 0,
      totalSettlementAmount: 0,
      effectivePercentageCost: 0,
      isOverLimit: true,
      limitError: 'Overdraft amount must be greater than zero.',
    };
  }

  if (amount > 70000) {
    return {
      amount,
      days,
      accessFeeRate: FULIZA_ACCESS_FEE_RATE.value,
      accessFee: 0,
      dailyBaseFee: 0,
      dailyExciseDuty: 0,
      dailyTotalFee: 0,
      freeGraceDays: 0,
      chargeableDays: 0,
      totalMaintenanceFees: 0,
      totalFinanceCost: 0,
      totalSettlementAmount: 0,
      effectivePercentageCost: 0,
      isOverLimit: true,
      limitError: 'The maximum Fuliza facility limit is KES 70,000.',
    };
  }

  const validDays = Math.min(Math.max(1, Math.floor(days)), FULIZA_MAX_TERM_DAYS.value);

  // Upfront 1% access fee
  const accessFeeRate = FULIZA_ACCESS_FEE_RATE.value; // 1%
  const accessFee = Math.round((amount * (accessFeeRate / 100)) * 100) / 100;

  // Find daily maintenance band
  const band = FULIZA_DAILY_BANDS.find(b => amount >= b.min && amount <= b.max);
  if (!band) {
    return {
      amount,
      days: validDays,
      accessFeeRate,
      accessFee,
      dailyBaseFee: 0,
      dailyExciseDuty: 0,
      dailyTotalFee: 0,
      freeGraceDays: 0,
      chargeableDays: 0,
      totalMaintenanceFees: 0,
      totalFinanceCost: accessFee,
      totalSettlementAmount: amount + accessFee,
      effectivePercentageCost: Math.round(((accessFee / amount) * 100) * 100) / 100,
      isOverLimit: true,
      limitError: 'Amount is outside the supported Fuliza tariff range.',
    };
  }

  // Grace period and chargeable days
  // If amount <= 100: 0 daily fee for 30 days
  // If amount 101 - 1000: free if repaid within first 3 days (days <= 3 -> 0 daily fees).
  // If repaid after day 3, daily maintenance applies to each elapsed midnight cycle past the grace period.
  // For bands with 0 free days (above 1,000 KES): charged for each midnight cycle (i.e. days - 1, per test vector KE-FULIZA-02: repaid on day 10 -> 9 cycles).
  let chargeableDays = 0;
  if (band.freeDays >= 30) {
    chargeableDays = 0;
  } else if (band.freeDays > 0) {
    if (validDays <= band.freeDays) {
      chargeableDays = 0;
    } else {
      chargeableDays = validDays - band.freeDays;
    }
  } else {
    // 0 free days: midnight applies starting midnight of Day 1
    chargeableDays = Math.max(0, validDays - 1);
  }

  const totalMaintenanceFees = Math.round((chargeableDays * band.totalDailyFee) * 100) / 100;
  const totalFinanceCost = Math.round((accessFee + totalMaintenanceFees) * 100) / 100;
  const totalSettlementAmount = Math.round((amount + totalFinanceCost) * 100) / 100;
  const effectivePercentageCost = Math.round(((totalFinanceCost / amount) * 100) * 100) / 100;

  return {
    amount,
    days: validDays,
    accessFeeRate,
    accessFee,
    dailyBaseFee: band.dailyBaseFee,
    dailyExciseDuty: band.exciseDuty,
    dailyTotalFee: band.totalDailyFee,
    freeGraceDays: band.freeDays,
    chargeableDays,
    totalMaintenanceFees,
    totalFinanceCost,
    totalSettlementAmount,
    effectivePercentageCost,
    band,
    isOverLimit: false,
  };
}
