import { describe, it, expect } from 'vitest';
import { calculateUgandaMomo, compareUgandaMomo } from '../src/lib/ug/momo';

describe('Uganda Mobile Money Tariffs & Tax (Test Vectors)', () => {
  it('UG-MOMO-01: Peer-to-Peer Transfer (Cheapest vs Mid Tier)', () => {
    // Case A: Send 2,000 UGX
    const resA = calculateUgandaMomo({ amount: 2000, transactionType: 'send_p2p' });
    expect(resA.operatorFee).toBe(100);
    expect(resA.statutoryTaxAmount).toBe(0);
    expect(resA.totalFee).toBe(100);
    expect(resA.totalDebitedFromWallet).toBe(2100);

    // Case B: Send 50,000 UGX
    const resB = calculateUgandaMomo({ amount: 50000, transactionType: 'send_p2p' });
    expect(resB.operatorFee).toBe(500);
    expect(resB.statutoryTaxAmount).toBe(0);
    expect(resB.totalFee).toBe(500);
    expect(resB.totalDebitedFromWallet).toBe(50500);
  });

  it('UG-MOMO-02: Cash Withdrawal at Agent (10,000 UGX)', () => {
    const res = calculateUgandaMomo({ amount: 10000, transactionType: 'withdraw_agent' });
    expect(res.operatorFee).toBe(700);
    expect(res.statutoryTaxAmount).toBe(50);
    expect(res.totalFee).toBe(750);
    expect(res.totalDebitedFromWallet).toBe(10750);
  });

  it('UG-MOMO-03: Cash Withdrawal at Agent (500,000 UGX)', () => {
    const res = calculateUgandaMomo({ amount: 50000, transactionType: 'withdraw_agent' }); // Wait, 500k:
    const res500k = calculateUgandaMomo({ amount: 500000, transactionType: 'withdraw_agent' });
    expect(res500k.operatorFee).toBe(7000);
    expect(res500k.statutoryTaxAmount).toBe(2500);
    expect(res500k.totalFee).toBe(9500);
    expect(res500k.totalDebitedFromWallet).toBe(509500);
  });

  it('UG-MOMO-04: Band Boundary Withdrawal (2,500 vs 2,501 UGX)', () => {
    // Withdraw 2,500 UGX
    const res2500 = calculateUgandaMomo({ amount: 2500, transactionType: 'withdraw_agent' });
    expect(res2500.operatorFee).toBe(330);
    expect(res2500.statutoryTaxAmount).toBe(13); // 2500 * 0.005 = 12.5 -> 13
    expect(res2500.totalFee).toBe(343);

    // Withdraw 2,501 UGX
    const res2501 = calculateUgandaMomo({ amount: 2501, transactionType: 'withdraw_agent' });
    expect(res2501.operatorFee).toBe(440);
    expect(res2501.statutoryTaxAmount).toBe(13); // 2501 * 0.005 = 12.505 -> 13
    expect(res2501.totalFee).toBe(453);
  });

  it('UG-MOMO-05: Maximum Single Transaction Cash-Out (5,000,000 UGX)', () => {
    const res = calculateUgandaMomo({ amount: 5000000, transactionType: 'withdraw_agent' });
    expect(res.operatorFee).toBe(20000);
    expect(res.statutoryTaxAmount).toBe(25000);
    expect(res.totalFee).toBe(45000);
    expect(res.totalDebitedFromWallet).toBe(5045000);
  });

  it('Comparison between MTN and Airtel returns equal parity for harmonized bands', () => {
    const comp = compareUgandaMomo(10000, 'withdraw_agent');
    expect(comp.cheaperNetwork).toBe('equal');
    expect(comp.difference).toBe(0);
  });
});
