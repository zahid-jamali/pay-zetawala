import {
  MTN_UG_TARIFF_BANDS,
  AIRTEL_UG_TARIFF_BANDS,
  UG_MOMO_MIN_TRANSACTION,
  UG_MOMO_MAX_SINGLE_TXN,
  UG_MOMO_MAX_BALANCE,
  UG_WITHDRAWAL_TAX_RATE,
  UgandaMomoBand,
} from '@/rules/ug/2026';

export type UgandaNetwork = 'mtn' | 'airtel';
export type UgandaTransactionType = 'send_p2p' | 'withdraw_agent' | 'send_to_bank';

export interface UgandaMomoInputs {
  amount: number;
  network?: UgandaNetwork;
  transactionType: UgandaTransactionType;
}

export interface UgandaMomoResult {
  amount: number;
  network: UgandaNetwork;
  transactionType: UgandaTransactionType;
  operatorFee: number;
  statutoryTaxRate: number; // 0.5%
  statutoryTaxAmount: number; // 0 for sends, 0.5% for withdrawals
  totalFee: number;
  totalDebitedFromWallet: number;
  isOverLimit: boolean;
  limitError?: string;
  band?: UgandaMomoBand;
}

export interface UgandaComparisonResult {
  amount: number;
  transactionType: UgandaTransactionType;
  mtn: UgandaMomoResult;
  airtel: UgandaMomoResult;
  cheaperNetwork: 'mtn' | 'airtel' | 'equal';
  difference: number;
}

/**
 * Calculate Uganda Mobile Money charges for MTN or Airtel.
 */
export function calculateUgandaMomo(inputs: UgandaMomoInputs): UgandaMomoResult {
  const { amount, network = 'mtn', transactionType } = inputs;

  if (amount < UG_MOMO_MIN_TRANSACTION.value) {
    return {
      amount,
      network,
      transactionType,
      operatorFee: 0,
      statutoryTaxRate: UG_WITHDRAWAL_TAX_RATE.value,
      statutoryTaxAmount: 0,
      totalFee: 0,
      totalDebitedFromWallet: 0,
      isOverLimit: true,
      limitError: `Minimum transaction amount is UGX ${UG_MOMO_MIN_TRANSACTION.value.toLocaleString()}.`,
    };
  }

  if (amount > UG_MOMO_MAX_SINGLE_TXN.value) {
    return {
      amount,
      network,
      transactionType,
      operatorFee: 0,
      statutoryTaxRate: UG_WITHDRAWAL_TAX_RATE.value,
      statutoryTaxAmount: 0,
      totalFee: 0,
      totalDebitedFromWallet: 0,
      isOverLimit: true,
      limitError: `Maximum transaction limit is UGX ${UG_MOMO_MAX_SINGLE_TXN.value.toLocaleString()}. Split into multiple transfers.`,
    };
  }

  const bands = network === 'airtel' ? AIRTEL_UG_TARIFF_BANDS : MTN_UG_TARIFF_BANDS;
  const band = bands.find(b => amount >= b.min && amount <= b.max);
  if (!band) {
    return {
      amount,
      network,
      transactionType,
      operatorFee: 0,
      statutoryTaxRate: UG_WITHDRAWAL_TAX_RATE.value,
      statutoryTaxAmount: 0,
      totalFee: 0,
      totalDebitedFromWallet: 0,
      isOverLimit: true,
      limitError: 'Amount is outside the supported tariff schedule.',
    };
  }

  let operatorFee = 0;
  let statutoryTaxAmount = 0;

  if (transactionType === 'send_p2p') {
    operatorFee = band.sendOnNetAndOffNet;
    statutoryTaxAmount = 0; // P2P sends are 100% exempt from the 0.5% tax
  } else if (transactionType === 'withdraw_agent') {
    operatorFee = band.agentWithdraw;
    // 0.5% statutory withdrawal tax under the Excise Duty Act
    statutoryTaxAmount = Math.round(amount * (UG_WITHDRAWAL_TAX_RATE.value / 100));
  } else if (transactionType === 'send_to_bank') {
    operatorFee = band.sendToBank ?? band.sendOnNetAndOffNet;
    statutoryTaxAmount = 0;
  }

  const totalFee = operatorFee + statutoryTaxAmount;
  const totalDebitedFromWallet = amount + totalFee;

  return {
    amount,
    network,
    transactionType,
    operatorFee,
    statutoryTaxRate: UG_WITHDRAWAL_TAX_RATE.value,
    statutoryTaxAmount,
    totalFee,
    totalDebitedFromWallet,
    isOverLimit: false,
    band,
  };
}

/**
 * Compare MTN Uganda MoMo vs Airtel Money Uganda charges for the same amount.
 */
export function compareUgandaMomo(
  amount: number,
  transactionType: UgandaTransactionType = 'withdraw_agent'
): UgandaComparisonResult {
  const mtn = calculateUgandaMomo({ amount, network: 'mtn', transactionType });
  const airtel = calculateUgandaMomo({ amount, network: 'airtel', transactionType });

  let cheaperNetwork: 'mtn' | 'airtel' | 'equal' = 'equal';
  const diff = Math.abs(mtn.totalFee - airtel.totalFee);

  if (mtn.totalFee < airtel.totalFee) {
    cheaperNetwork = 'mtn';
  } else if (airtel.totalFee < mtn.totalFee) {
    cheaperNetwork = 'airtel';
  }

  return {
    amount,
    transactionType,
    mtn,
    airtel,
    cheaperNetwork,
    difference: diff,
  };
}
