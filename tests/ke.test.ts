import { describe, it, expect } from 'vitest';
import { calculateMpesaCharge } from '../src/lib/ke/mpesa';
import { calculateFuliza } from '../src/lib/ke/fuliza';
import { calculateMshwari } from '../src/lib/ke/mshwari';

describe('Kenya Safaricom M-PESA Charges (Test Vectors)', () => {
  it('KE-MPESA-01: Transfer Cheapest Band & Agent Withdrawal Floor', () => {
    // Case A: Send KES 45 to M-PESA
    const resA = calculateMpesaCharge({ amount: 45, transactionType: 'transfer_mpesa' });
    expect(resA.fee).toBe(0);
    expect(resA.totalCostToCustomer).toBe(45);

    // Case B: Send KES 45 to Other Network
    const resB = calculateMpesaCharge({ amount: 45, transactionType: 'transfer_other' });
    expect(resB.fee).toBe(0);

    // Case C: Withdraw KES 45 at Agent (Below min KES 50)
    const resC = calculateMpesaCharge({ amount: 45, transactionType: 'withdraw_agent' });
    expect(resC.isExceedingLimit).toBe(true);

    // Case D: Withdraw KES 50 at Agent
    const resD = calculateMpesaCharge({ amount: 50, transactionType: 'withdraw_agent' });
    expect(resD.isExceedingLimit).toBe(false);
    expect(resD.fee).toBe(11);
  });

  it('KE-MPESA-02: Band Boundary Transitions', () => {
    // Boundary at KES 500
    expect(calculateMpesaCharge({ amount: 500, transactionType: 'transfer_mpesa' }).fee).toBe(7);
    expect(calculateMpesaCharge({ amount: 501, transactionType: 'transfer_mpesa' }).fee).toBe(13);

    // Boundary at KES 1,000
    expect(calculateMpesaCharge({ amount: 1000, transactionType: 'transfer_mpesa' }).fee).toBe(13);
    expect(calculateMpesaCharge({ amount: 1001, transactionType: 'transfer_mpesa' }).fee).toBe(23);

    // Boundary at KES 2,500 for agent withdrawal
    expect(calculateMpesaCharge({ amount: 2500, transactionType: 'withdraw_agent' }).fee).toBe(29);
    expect(calculateMpesaCharge({ amount: 2501, transactionType: 'withdraw_agent' }).fee).toBe(52);
  });

  it('KE-MPESA-03: Highest Tiers and Limits', () => {
    // Send KES 70,000
    expect(calculateMpesaCharge({ amount: 70000, transactionType: 'transfer_mpesa' }).fee).toBe(108);

    // Withdraw KES 70,000
    expect(calculateMpesaCharge({ amount: 70000, transactionType: 'withdraw_agent' }).fee).toBe(309);

    // Send KES 260,000 (Exceeds KES 250,000 per txn)
    const resOver = calculateMpesaCharge({ amount: 260000, transactionType: 'transfer_mpesa' });
    expect(resOver.isExceedingLimit).toBe(true);
    expect(resOver.splitRecommendation).toBeDefined();
    expect(resOver.splitRecommendation?.numTransactions).toBe(2);
  });
});

describe('Kenya Safaricom Fuliza (Test Vectors)', () => {
  it('KE-FULIZA-01: Overdraft Repaid Within 3-Day Grace Window (KES 800)', () => {
    const res = calculateFuliza({ amount: 800, days: 2 });
    expect(res.accessFee).toBe(8.0);
    expect(res.freeGraceDays).toBe(3);
    expect(res.chargeableDays).toBe(0);
    expect(res.totalMaintenanceFees).toBe(0.0);
    expect(res.totalFinanceCost).toBe(8.0);
    expect(res.totalSettlementAmount).toBe(808.0);
  });

  it('KE-FULIZA-02: Overdraft Repaid on Day 10 (KES 5,000)', () => {
    const res = calculateFuliza({ amount: 5000, days: 10 });
    expect(res.accessFee).toBe(50.0);
    expect(res.freeGraceDays).toBe(0);
    expect(res.dailyTotalFee).toBe(30.0);
    expect(res.chargeableDays).toBe(9);
    expect(res.totalMaintenanceFees).toBe(270.0);
    expect(res.totalFinanceCost).toBe(320.0);
    expect(res.totalSettlementAmount).toBe(5320.0);
  });
});

describe('Kenya M-Shwari 30-Day Loan (Test Vectors)', () => {
  it('KE-MSHWARI-01: 30-Day Loan of KES 10,000', () => {
    const res = calculateMshwari({ loanAmount: 10000 });
    expect(res.facilitationFee).toBe(750.0);
    expect(res.exciseDutyAmount).toBe(150.0);
    expect(res.totalFinanceCost).toBe(900.0);
    expect(res.netDisbursedAmount).toBe(9850.0);
    expect(res.repaymentDueDay30).toBe(10750.0);
  });
});
