import {
  MPESA_TARIFF_BANDS,
  PAYBILL_CUSTOMER_BANDS,
  BUY_GOODS_CUSTOMER_CHARGE,
  MPESA_MAX_PER_TXN,
  MPESA_MAX_DAILY_LIMIT,
  MPESA_MIN_AGENT_WITHDRAWAL,
  MpesaTariffBand,
  PaybillBand,
} from '@/rules/ke/2026';

export type MpesaTransactionType =
  | 'transfer_mpesa'
  | 'transfer_other'
  | 'withdraw_agent'
  | 'withdraw_atm'
  | 'paybill'
  | 'buygoods';

export interface MpesaCalculationInputs {
  amount: number;
  transactionType: MpesaTransactionType;
}

export interface CheaperAlternative {
  type: string;
  description: string;
  suggestedAmount?: number;
  potentialSavings?: number;
}

export interface MpesaCalculationResult {
  amount: number;
  transactionType: MpesaTransactionType;
  fee: number;
  totalCostToCustomer: number; // amount + fee (or amount for withdrawals)
  totalDebitedFromWallet: number; // amount + fee
  isExceedingLimit: boolean;
  limitError?: string;
  band?: MpesaTariffBand | PaybillBand;
  exciseDutyIncluded: boolean;
  cheaperAlternatives: CheaperAlternative[];
  splitRecommendation?: {
    numTransactions: number;
    amountPerTxn: number;
    remainder: number;
    totalFee: number;
  };
}

/**
 * Calculate M-PESA transaction charges across all transaction types.
 */
export function calculateMpesaCharge(inputs: MpesaCalculationInputs): MpesaCalculationResult {
  const { amount, transactionType } = inputs;
  const cheaperAlternatives: CheaperAlternative[] = [];

  // Limits check
  if (amount <= 0) {
    return {
      amount,
      transactionType,
      fee: 0,
      totalCostToCustomer: 0,
      totalDebitedFromWallet: 0,
      isExceedingLimit: true,
      limitError: 'Amount must be greater than zero.',
      exciseDutyIncluded: true,
      cheaperAlternatives: [],
    };
  }

  if (amount > MPESA_MAX_PER_TXN.value) {
    // Exceeds max per transaction (KES 250,000)
    const numFullTxns = Math.floor(amount / MPESA_MAX_PER_TXN.value);
    const remainder = amount % MPESA_MAX_PER_TXN.value;

    let totalSplitFee = 0;
    if (transactionType === 'transfer_mpesa' || transactionType === 'transfer_other') {
      totalSplitFee = numFullTxns * 108 + (remainder > 0 ? calculateMpesaFeeOnly(remainder, transactionType) : 0);
    } else if (transactionType === 'withdraw_agent') {
      totalSplitFee = numFullTxns * 309 + (remainder > 0 ? calculateMpesaFeeOnly(remainder, transactionType) : 0);
    }

    return {
      amount,
      transactionType,
      fee: 0,
      totalCostToCustomer: 0,
      totalDebitedFromWallet: 0,
      isExceedingLimit: true,
      limitError: `The maximum allowed per single transaction is KES ${MPESA_MAX_PER_TXN.value.toLocaleString()}. Please split into multiple transactions.`,
      exciseDutyIncluded: true,
      cheaperAlternatives: [],
      splitRecommendation: {
        numTransactions: numFullTxns + (remainder > 0 ? 1 : 0),
        amountPerTxn: MPESA_MAX_PER_TXN.value,
        remainder,
        totalFee: totalSplitFee,
      },
    };
  }

  if (amount > MPESA_MAX_DAILY_LIMIT.value) {
    return {
      amount,
      transactionType,
      fee: 0,
      totalCostToCustomer: 0,
      totalDebitedFromWallet: 0,
      isExceedingLimit: true,
      limitError: `The maximum daily transaction limit on M-PESA is KES ${MPESA_MAX_DAILY_LIMIT.value.toLocaleString()}.`,
      exciseDutyIncluded: true,
      cheaperAlternatives: [],
    };
  }

  // Minimum checks
  if (transactionType === 'withdraw_agent' && amount < MPESA_MIN_AGENT_WITHDRAWAL.value) {
    return {
      amount,
      transactionType,
      fee: 0,
      totalCostToCustomer: 0,
      totalDebitedFromWallet: 0,
      isExceedingLimit: true,
      limitError: `The minimum amount for agent cash withdrawal is KES ${MPESA_MIN_AGENT_WITHDRAWAL.value}.`,
      exciseDutyIncluded: true,
      cheaperAlternatives: [],
    };
  }

  if (transactionType === 'withdraw_atm' && (amount < 200 || amount > 35000)) {
    return {
      amount,
      transactionType,
      fee: 0,
      totalCostToCustomer: 0,
      totalDebitedFromWallet: 0,
      isExceedingLimit: true,
      limitError: 'ATM withdrawals are only available for amounts between KES 200 and KES 35,000.',
      exciseDutyIncluded: true,
      cheaperAlternatives: [],
    };
  }

  // Buy Goods: always free for customer
  if (transactionType === 'buygoods') {
    return {
      amount,
      transactionType,
      fee: BUY_GOODS_CUSTOMER_CHARGE.value,
      totalCostToCustomer: amount,
      totalDebitedFromWallet: amount,
      isExceedingLimit: false,
      exciseDutyIncluded: true,
      cheaperAlternatives: [],
    };
  }

  // Paybill calculation
  if (transactionType === 'paybill') {
    const band = PAYBILL_CUSTOMER_BANDS.find(b => amount >= b.min && amount <= b.max);
    const fee = band ? band.charge : 0;
    return {
      amount,
      transactionType,
      fee,
      totalCostToCustomer: amount + fee,
      totalDebitedFromWallet: amount + fee,
      isExceedingLimit: false,
      band,
      exciseDutyIncluded: true,
      cheaperAlternatives,
    };
  }

  // Regular M-PESA Bands (Send or Withdraw)
  const band = MPESA_TARIFF_BANDS.find(b => amount >= b.min && amount <= b.max);
  if (!band) {
    return {
      amount,
      transactionType,
      fee: 0,
      totalCostToCustomer: 0,
      totalDebitedFromWallet: 0,
      isExceedingLimit: true,
      limitError: 'Amount is outside the supported tariff schedule.',
      exciseDutyIncluded: true,
      cheaperAlternatives: [],
    };
  }

  let fee = 0;
  if (transactionType === 'transfer_mpesa') {
    fee = band.transferMpesa;
  } else if (transactionType === 'transfer_other') {
    fee = band.transferOtherNetworks;
  } else if (transactionType === 'withdraw_agent') {
    if (band.agentWithdrawal === null) {
      return {
        amount,
        transactionType,
        fee: 0,
        totalCostToCustomer: 0,
        totalDebitedFromWallet: 0,
        isExceedingLimit: true,
        limitError: `Agent withdrawal is not available for KES ${amount}. Minimum is KES 50.`,
        exciseDutyIncluded: true,
        cheaperAlternatives: [],
      };
    }
    fee = band.agentWithdrawal;
  } else if (transactionType === 'withdraw_atm') {
    if (band.atmWithdrawal === null) {
      return {
        amount,
        transactionType,
        fee: 0,
        totalCostToCustomer: 0,
        totalDebitedFromWallet: 0,
        isExceedingLimit: true,
        limitError: `ATM withdrawal is not supported for KES ${amount}.`,
        exciseDutyIncluded: true,
        cheaperAlternatives: [],
      };
    }
    fee = band.atmWithdrawal;
  }

  // Check for band threshold optimization (e.g. if sending KES 501, fee is 13; if sending KES 500, fee is 7 -> saves KES 6!)
  const prevBand = MPESA_TARIFF_BANDS.find(b => b.max === band.min - 1);
  if (prevBand) {
    let prevFee = 0;
    if (transactionType === 'transfer_mpesa') prevFee = prevBand.transferMpesa;
    else if (transactionType === 'transfer_other') prevFee = prevBand.transferOtherNetworks;
    else if (transactionType === 'withdraw_agent') prevFee = prevBand.agentWithdrawal ?? 0;

    if (prevFee < fee && amount === band.min) {
      const savings = fee - prevFee;
      cheaperAlternatives.push({
        type: 'band_boundary_saving',
        description: `Sending or withdrawing KES ${prevBand.max} instead of KES ${amount} drops you into the lower band and saves KES ${savings} in fees.`,
        suggestedAmount: prevBand.max,
        potentialSavings: savings,
      });
    }
  }

  // Check ATM vs Agent comparison for withdrawals
  if (transactionType === 'withdraw_atm' && band.agentWithdrawal !== null && band.agentWithdrawal < fee) {
    cheaperAlternatives.push({
      type: 'agent_vs_atm',
      description: `Withdrawing from an M-PESA Agent costs KES ${band.agentWithdrawal} compared to KES ${fee} at an ATM (saving KES ${fee - band.agentWithdrawal}).`,
      potentialSavings: fee - band.agentWithdrawal,
    });
  }

  return {
    amount,
    transactionType,
    fee,
    totalCostToCustomer: amount + fee,
    totalDebitedFromWallet: amount + fee,
    isExceedingLimit: false,
    band,
    exciseDutyIncluded: true,
    cheaperAlternatives,
  };
}

/**
 * Helper to get fee only without bounds checks.
 */
function calculateMpesaFeeOnly(amount: number, type: MpesaTransactionType): number {
  const b = MPESA_TARIFF_BANDS.find(b => amount >= b.min && amount <= b.max);
  if (!b) return 0;
  if (type === 'transfer_mpesa') return b.transferMpesa;
  if (type === 'transfer_other') return b.transferOtherNetworks;
  if (type === 'withdraw_agent') return b.agentWithdrawal ?? 0;
  if (type === 'withdraw_atm') return b.atmWithdrawal ?? 0;
  return 0;
}
