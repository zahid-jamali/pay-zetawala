import {
  MSHWARI_FACILITATION_FEE_RATE,
  MSHWARI_EXCISE_DUTY_RATE,
  MSHWARI_TOTAL_CHARGE_RATE,
  MSHWARI_TERM_DAYS,
  MSHWARI_MIN_LOAN,
  MSHWARI_MAX_LOAN,
} from '@/rules/ke/2026';

export interface MshwariCalculationInputs {
  loanAmount: number;
}

export interface MshwariCalculationResult {
  loanAmount: number;
  facilitationFeeRate: number; // 7.5%
  facilitationFee: number;
  exciseDutyRate: number; // 1.5% (20% of 7.5%)
  exciseDutyAmount: number;
  totalCostRate: number; // 9.0%
  totalFinanceCost: number;
  netDisbursedAmount: number; // Principal - upfront excise duty
  repaymentDueDay30: number; // Principal + 7.5% facilitation fee
  termDays: number;
  isOverLimit: boolean;
  limitError?: string;
}

/**
 * Calculate Safaricom & NCBA M-Shwari 30-day loan charges, net disbursement, and 30-day repayment.
 */
export function calculateMshwari(inputs: MshwariCalculationInputs): MshwariCalculationResult {
  const { loanAmount } = inputs;

  if (loanAmount < MSHWARI_MIN_LOAN.value) {
    return {
      loanAmount,
      facilitationFeeRate: MSHWARI_FACILITATION_FEE_RATE.value,
      facilitationFee: 0,
      exciseDutyRate: MSHWARI_EXCISE_DUTY_RATE.value,
      exciseDutyAmount: 0,
      totalCostRate: MSHWARI_TOTAL_CHARGE_RATE.value,
      totalFinanceCost: 0,
      netDisbursedAmount: 0,
      repaymentDueDay30: 0,
      termDays: MSHWARI_TERM_DAYS.value,
      isOverLimit: true,
      limitError: `Minimum M-Shwari loan amount is KES ${MSHWARI_MIN_LOAN.value.toLocaleString()}.`,
    };
  }

  if (loanAmount > MSHWARI_MAX_LOAN.value) {
    return {
      loanAmount,
      facilitationFeeRate: MSHWARI_FACILITATION_FEE_RATE.value,
      facilitationFee: 0,
      exciseDutyRate: MSHWARI_EXCISE_DUTY_RATE.value,
      exciseDutyAmount: 0,
      totalCostRate: MSHWARI_TOTAL_CHARGE_RATE.value,
      totalFinanceCost: 0,
      netDisbursedAmount: 0,
      repaymentDueDay30: 0,
      termDays: MSHWARI_TERM_DAYS.value,
      isOverLimit: true,
      limitError: `Maximum M-Shwari loan amount is KES ${MSHWARI_MAX_LOAN.value.toLocaleString()}.`,
    };
  }

  const facilitationFeeRate = MSHWARI_FACILITATION_FEE_RATE.value; // 7.5%
  const facilitationFee = Math.round((loanAmount * (facilitationFeeRate / 100)) * 100) / 100;

  const exciseDutyRate = MSHWARI_EXCISE_DUTY_RATE.value; // 1.5% (20% of 7.5%)
  const exciseDutyAmount = Math.round((loanAmount * (exciseDutyRate / 100)) * 100) / 100;

  const totalCostRate = MSHWARI_TOTAL_CHARGE_RATE.value; // 9.0%
  const totalFinanceCost = Math.round((facilitationFee + exciseDutyAmount) * 100) / 100;

  // Upfront deduction of excise duty
  const netDisbursedAmount = Math.round((loanAmount - exciseDutyAmount) * 100) / 100;

  // Due at 30 days: Principal + Facilitation Fee
  const repaymentDueDay30 = Math.round((loanAmount + facilitationFee) * 100) / 100;

  return {
    loanAmount,
    facilitationFeeRate,
    facilitationFee,
    exciseDutyRate,
    exciseDutyAmount,
    totalCostRate,
    totalFinanceCost,
    netDisbursedAmount,
    repaymentDueDay30,
    termDays: MSHWARI_TERM_DAYS.value,
    isOverLimit: false,
  };
}
