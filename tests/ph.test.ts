import { describe, it, expect } from 'vitest';
import {
  calculateSalary,
  calculatePhilHealth,
  calculatePagIbig,
  calculateSss,
  calculateWithholdingTax,
  reverseNetToGross,
} from '../src/lib/ph/salary';
import {
  calculateThirteenthMonthStandard,
  calculateThirteenthMonthMonthly,
} from '../src/lib/ph/thirteenth-month';
import { calculateSssPension } from '../src/lib/ph/pension';
import { calculateSssSalaryLoan } from '../src/lib/ph/salary-loan';

describe('Philippines Salary & Deductions (Test Vectors)', () => {
  it('PH-NET-01: Low Income (₱4,500)', () => {
    const res = calculateSalary({ monthlyBasic: 4500 });
    expect(res.sss.eeTotal).toBe(250.0);
    expect(res.philhealth.employeeShare).toBe(250.0);
    expect(res.pagibig.employeeShare).toBe(90.0);
    expect(res.totalEmployeeDeductions).toBe(590.0);
    expect(res.taxableIncome).toBe(3910.0);
    expect(res.tax.withholdingTax).toBe(0.0);
    expect(res.netPay).toBe(3910.0);
  });

  it('PH-NET-02: Kasambahay Exception (< ₱5,000 domestic worker wage)', () => {
    const res = calculateSalary({
      monthlyBasic: 4500,
      employmentType: 'kasambahay',
    });
    expect(res.sss.eeTotal).toBe(0.0);
    expect(res.philhealth.employeeShare).toBe(0.0);
    expect(res.pagibig.employeeShare).toBe(0.0);
    expect(res.totalEmployeeDeductions).toBe(0.0);
    expect(res.netPay).toBe(4500.0);
  });

  it('PH-NET-03: Bracket Boundary at ₱15,000 (EC transition to ₱30)', () => {
    const res = calculateSalary({ monthlyBasic: 15000 });
    expect(res.sss.totalMsc).toBe(15000);
    expect(res.sss.eeTotal).toBe(750.0);
    expect(res.sss.erEc).toBe(30.0);
    expect(res.sss.erTotal).toBe(1530.0);
    expect(res.philhealth.employeeShare).toBe(375.0);
    expect(res.pagibig.employeeShare).toBe(200.0);
    expect(res.totalEmployeeDeductions).toBe(1325.0);
    expect(res.taxableIncome).toBe(13675.0);
    expect(res.tax.withholdingTax).toBe(0.0);
    expect(res.netPay).toBe(13675.0);
  });

  it('PH-NET-04: Bracket Boundary at ₱20,000 (Regular SS Max before WISP)', () => {
    const res = calculateSalary({ monthlyBasic: 20000 });
    expect(res.sss.regularMsc).toBe(20000);
    expect(res.sss.mpfMsc).toBe(0);
    expect(res.sss.eeRegularSs).toBe(1000.0);
    expect(res.sss.eeMpf).toBe(0);
    expect(res.sss.eeTotal).toBe(1000.0);
    expect(res.philhealth.employeeShare).toBe(500.0);
    expect(res.pagibig.employeeShare).toBe(200.0);
    expect(res.totalEmployeeDeductions).toBe(1700.0);
    expect(res.taxableIncome).toBe(18300.0);
    expect(res.tax.withholdingTax).toBe(0.0);
    expect(res.netPay).toBe(18300.0);
  });

  it('PH-NET-05: Mid-Tier with Withholding Tax & WISP (₱50,000)', () => {
    const res = calculateSalary({ monthlyBasic: 50000 });
    expect(res.sss.totalMsc).toBe(35000);
    expect(res.sss.regularMsc).toBe(20000);
    expect(res.sss.mpfMsc).toBe(15000);
    expect(res.sss.eeRegularSs).toBe(1000.0);
    expect(res.sss.eeMpf).toBe(750.0);
    expect(res.sss.eeTotal).toBe(1750.0);
    expect(res.sss.erTotal).toBe(3530.0);
    expect(res.philhealth.employeeShare).toBe(1250.0);
    expect(res.pagibig.employeeShare).toBe(200.0);
    expect(res.totalEmployeeDeductions).toBe(3200.0);
    expect(res.taxableIncome).toBe(46800.0);
    expect(res.tax.withholdingTax).toBe(4568.4);
    expect(res.netPay).toBe(42231.6);
  });

  it('PH-NET-06: High Income with PhilHealth Ceiling Exceeded (₱120,000)', () => {
    const res = calculateSalary({ monthlyBasic: 120000 });
    expect(res.sss.eeTotal).toBe(1750.0);
    expect(res.philhealth.mbs).toBe(100000);
    expect(res.philhealth.employeeShare).toBe(2500.0);
    expect(res.pagibig.employeeShare).toBe(200.0);
    expect(res.totalEmployeeDeductions).toBe(4450.0);
    expect(res.taxableIncome).toBe(115550.0);
    expect(res.tax.withholdingTax).toBe(20762.55);
    expect(res.netPay).toBe(94787.45);
  });

  it('Reverse Gross calculation matches forward calculation', () => {
    const net = 42231.6;
    const gross = reverseNetToGross(net);
    expect(Math.round(gross)).toBe(50000);
  });
});

describe('Philippines SSS Retirement Pension (Test Vectors)', () => {
  it('PH-PEN-01: Minimum Pension Formula (10 CYS, Low AMSC ₱5,000)', () => {
    const res = calculateSssPension({ amsc: 5000, cys: 10, numDependents: 0 });
    expect(res.isEligible).toBe(true);
    expect(res.formula1).toBe(1300.0);
    expect(res.formula2).toBe(2000.0);
    expect(res.formula3).toBe(1200.0);
    expect(res.basicMonthlyPension).toBe(2000.0);
    expect(res.additionalBenefit).toBe(1000.0);
    expect(res.totalMonthlyPension).toBe(3000.0);
    expect(res.annualPayout).toBe(39000.0);
  });

  it('PH-PEN-02: Formula 1 Dominant (25 CYS, AMSC ₱15,000)', () => {
    const res = calculateSssPension({ amsc: 15000, cys: 25 });
    expect(res.formula1).toBe(7800.0);
    expect(res.formula2).toBe(6000.0);
    expect(res.formula3).toBe(2400.0);
    expect(res.basicMonthlyPension).toBe(7800.0);
    expect(res.totalMonthlyPension).toBe(8800.0);
  });

  it('PH-PEN-03: Maximum Regular SS Pension (35 CYS, Max AMSC ₱20,000)', () => {
    const res = calculateSssPension({ amsc: 20000, cys: 35 });
    expect(res.formula1).toBe(14300.0);
    expect(res.formula2).toBe(8000.0);
    expect(res.formula3).toBe(2400.0);
    expect(res.basicMonthlyPension).toBe(14300.0);
    expect(res.totalMonthlyPension).toBe(15300.0);
  });

  it('PH-PEN-04: Pension with Dependent Children', () => {
    const res = calculateSssPension({ amsc: 15000, cys: 25, numDependents: 2 });
    expect(res.basicMonthlyPension).toBe(7800.0);
    expect(res.dependentAllowancePerChild).toBe(780.0);
    expect(res.totalDependentAllowance).toBe(1560.0);
    expect(res.totalMonthlyPension).toBe(10360.0);
    expect(res.thirteenthMonthPension).toBe(8800.0);
  });
});

describe('Philippines SSS Salary Loan (Test Vectors)', () => {
  it('PH-LOAN-01: 1-Month Salary Loan (₱15,000, 8% interest)', () => {
    const res = calculateSssSalaryLoan({
      averageMsc: 15000,
      postedContributions: 36,
    });
    expect(res.isEligible).toBe(true);
    expect(res.loanType).toBe('one_month');
    expect(res.grossLoanAmount).toBe(15000);
    expect(res.serviceFeeAmount).toBe(150.0);
    expect(res.netLoanProceeds).toBe(14850.0);
    expect(res.interestRateAnnual).toBe(8.0);
    expect(res.monthlyAmortization).toBe(678.41);
    expect(res.schedule.length).toBe(24);
  });

  it('PH-LOAN-02: 2-Month Salary Loan (₱40,000 max, 10% condoned)', () => {
    const res = calculateSssSalaryLoan({
      averageMsc: 20000,
      postedContributions: 72,
      priorCondonation: true,
    });
    expect(res.isEligible).toBe(true);
    expect(res.loanType).toBe('two_month');
    expect(res.grossLoanAmount).toBe(40000);
    expect(res.serviceFeeAmount).toBe(400.0);
    expect(res.netLoanProceeds).toBe(39600.0);
    expect(res.interestRateAnnual).toBe(10.0);
    expect(res.monthlyAmortization).toBe(1845.8);
  });
});

describe('Philippines 13th Month Pay (Test Vectors)', () => {
  it('PH-13TH-01: Full-Year Regular Employee (₱30,000)', () => {
    const res = calculateThirteenthMonthStandard({ monthlyBasic: 30000, monthsWorked: 12 });
    expect(res.thirteenthMonthPay).toBe(30000.0);
    expect(res.exemptPortion).toBe(30000.0);
    expect(res.taxableExcess).toBe(0.0);
  });

  it('PH-13TH-02: Resigned Employee in June (₱24,000 pro-rated)', () => {
    const res = calculateThirteenthMonthStandard({ monthlyBasic: 24000, monthsWorked: 6 });
    expect(res.thirteenthMonthPay).toBe(12000.0);
    expect(res.taxableExcess).toBe(0.0);
  });

  it('PH-13TH-03: Salary Increase Mid-Year', () => {
    const monthlyEarnings = [
      20000, 20000, 20000, 20000, 20000, // 5 months @ 20k = 100k
      26000, 26000, 26000, 26000, 26000, 26000, 26000, // 7 months @ 26k = 182k
    ];
    const res = calculateThirteenthMonthMonthly({ monthlyEarnings });
    expect(res.totalBasicSalaryEarned).toBe(282000.0);
    expect(res.thirteenthMonthPay).toBe(23500.0);
  });

  it('PH-13TH-04: Exclusions from Basic Salary', () => {
    // Only basic ₱300k counts, OT/bonuses excluded: 12 months average of 25,000
    const res = calculateThirteenthMonthStandard({ monthlyBasic: 25000, monthsWorked: 12 });
    expect(res.thirteenthMonthPay).toBe(25000.0);
  });

  it('PH-13TH-05: Taxable Excess Over ₱90,000 Exemption Ceiling', () => {
    const res = calculateThirteenthMonthStandard({ monthlyBasic: 150000, monthsWorked: 12 });
    expect(res.thirteenthMonthPay).toBe(150000.0);
    expect(res.exemptPortion).toBe(90000.0);
    expect(res.taxableExcess).toBe(60000.0);
  });
});
