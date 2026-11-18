# Financial & Educational Calculators: Verified Test Vectors

**Document Version:** 1.0  
**Verification Date:** November 18, 2026  
**Purpose:** Hand-computed verification test vectors and edge cases for the core financial, mobile money, and academic calculators at https://pay.zetawala.com.

---

## 1. Philippines Net Salary & Mandatory Deductions

### Test Vector PH-NET-01: Low Income (Below SSS Regular Minimum MSC)
- **Inputs:** Monthly Basic Salary = ₱4,500.00. Regular private employment.
- **SSS Computation:**
  - Salary ₱4,500 is in bracket "Below ₱5,250.00" -> MSC = ₱5,000.00.
  - Regular SS EE share = 5% of ₱5,000 = **₱250.00**.
  - Regular SS ER share = 10% of ₱5,000 = ₱500.00; EC ER = ₱10.00; Total ER = ₱510.00.
  - MPF (WISP) = ₱0.00.
- **PhilHealth Computation:**
  - Salary ₱4,500 is below the ₱10,000.00 floor. Floor applies: MBS = ₱10,000.00.
  - Total Premium = 5.0% of ₱10,000 = ₱500.00.
  - Employee Share (50%) = **₱250.00**; Employer Share (50%) = ₱250.00.
- **Pag-IBIG Computation:**
  - Salary ₱4,500 > ₱1,500. Rate = 2% EE, 2% ER.
  - EE share = 2% of ₱4,500 = **₱90.00** (below ₱200 cap).
  - ER share = 2% of ₱4,500 = ₱90.00.
- **Total Employee Deductions:** ₱250.00 + ₱250.00 + ₱90.00 = **₱590.00**.
- **Taxable Income:** ₱4,500.00 - ₱590.00 = ₱3,910.00.
- **Withholding Tax:** ₱3,910.00 <= ₱20,833.00 (Bracket 1) -> **₱0.00**.
- **Net Take-Home Pay:** ₱4,500.00 - ₱590.00 = **₱3,910.00**.

---

### Test Vector PH-NET-02: Kasambahay Exception (< ₱5,000 domestic worker wage)
- **Inputs:** Domestic Worker (Kasambahay), Monthly Wage = ₱4,500.00.
- **SSS Kasambahay Rule (RA 10361 & SSS Circular 2024-007):**
  - Wage ₱4,500 is in bracket "₱4,250 – ₱4,749.99" -> MSC = ₱4,500.00.
  - Because wage < ₱5,000.00, Household Employer pays 100% of contribution:
    - Employer SS = 15% of ₱4,500 = ₱675.00; EC ER = ₱10.00; Total ER = ₱685.00.
    - Kasambahay (EE) SSS Share = **₱0.00**.
- **PhilHealth & Pag-IBIG Kasambahay Rule:**
  - For domestic workers earning < ₱5,000, the employer also shoulders the PhilHealth and Pag-IBIG contributions.
  - Kasambahay Net Pay = **₱4,500.00** (₱0 deduction).

---

### Test Vector PH-NET-03: Bracket Boundary at ₱15,000 (EC transition)
- **Inputs:** Monthly Basic Salary = ₱15,000.00.
- **SSS Computation:**
  - Salary ₱15,000.00 is in bracket "₱14,750.00 – ₱15,249.99" -> MSC = ₱15,000.00.
  - Employee Share = 5% of ₱15,000 = **₱750.00**.
  - Employer SS = 10% of ₱15,000 = ₱1,500.00.
  - Employer EC: At MSC ₱15,000, EC increases from ₱10 to **₱30.00**.
  - Employer Total = ₱1,500.00 + ₱30.00 = ₱1,530.00.
- **PhilHealth Computation:**
  - 5% of ₱15,000 = ₱750.00. Employee Share (50%) = **₱375.00**; Employer = ₱375.00.
- **Pag-IBIG Computation:**
  - 2% of ₱15,000 = ₱300.00, capped at **₱200.00**.
  - Employee Share = **₱200.00**; Employer Share = ₱200.00.
- **Total Employee Deductions:** ₱750.00 + ₱375.00 + ₱200.00 = **₱1,325.00**.
- **Taxable Income:** ₱15,000.00 - ₱1,325.00 = ₱13,675.00.
- **Withholding Tax:** ₱13,675.00 <= ₱20,833.00 (Bracket 1) -> **₱0.00**.
- **Net Take-Home Pay:** ₱15,000.00 - ₱1,325.00 = **₱13,675.00**.

---

### Test Vector PH-NET-04: Bracket Boundary at ₱20,000 (Regular SS Max before WISP)
- **Inputs:** Monthly Basic Salary = ₱20,000.00.
- **SSS Computation:**
  - Bracket "₱19,750.00 – ₱20,249.99" -> Total MSC = ₱20,000.00 (Regular SS = ₱20,000, MPF = ₱0).
  - Employee Share = 5% of ₱20,000 = **₱1,000.00** (Regular SS Max).
  - Employer Share = 10% of ₱20,000 + ₱30 EC = ₱2,030.00.
- **PhilHealth:** 5% of ₱20,000 = ₱1,000.00. EE share = **₱500.00**.
- **Pag-IBIG:** Capped at **₱200.00**.
- **Total Employee Deductions:** ₱1,000.00 + ₱500.00 + ₱200.00 = **₱1,700.00**.
- **Taxable Income:** ₱20,000.00 - ₱1,700.00 = ₱18,300.00.
- **Withholding Tax:** ₱18,300.00 <= ₱20,833.00 -> **₱0.00**.
- **Net Take-Home Pay:** ₱20,000.00 - ₱1,700.00 = **₱18,300.00**.

---

### Test Vector PH-NET-05: Mid-Tier with Withholding Tax & WISP
- **Inputs:** Monthly Basic Salary = ₱50,000.00.
- **SSS Computation:**
  - Salary ₱50,000.00 > ₱34,750.00 -> Capped at Maximum MSC = ₱35,000.00.
  - Regular SS MSC = ₱20,000.00; MPF (WISP) MSC = ₱15,000.00.
  - Regular SS EE Share (5%) = ₱1,000.00.
  - MPF (WISP) EE Share (5%) = ₱750.00.
  - Total SSS EE Share = **₱1,750.00**.
  - Total SSS ER Share = ₱2,000 (SS) + ₱1,500 (MPF) + ₱30 (EC) = ₱3,530.00.
- **PhilHealth Computation:**
  - 5% of ₱50,000 = ₱2,500.00.
  - EE Share (50%) = **₱1,250.00**; ER Share = ₱1,250.00.
- **Pag-IBIG Computation:**
  - Capped at MFS ₱10,000 -> EE Share = **₱200.00**; ER Share = ₱200.00.
- **Total Employee Deductions:** ₱1,750.00 + ₱1,250.00 + ₱200.00 = **₱3,200.00**.
- **Taxable Income:** ₱50,000.00 - ₱3,200.00 = **₱46,800.00**.
- **Withholding Tax (TRAIN Monthly Bracket 3: ₱33,333 – ₱66,666):**
  - Base Tax = ₱1,875.00.
  - Excess over ₱33,333.00 = ₱46,800.00 - ₱33,333.00 = ₱13,467.00.
  - Marginal Tax (20%) = 20% of ₱13,467.00 = ₱2,693.40.
  - Total Monthly Withholding Tax = ₱1,875.00 + ₱2,693.40 = **₱4,568.40**.
- **Net Take-Home Pay:** ₱50,000.00 - ₱3,200.00 - ₱4,568.40 = **₱42,231.60**.

---

### Test Vector PH-NET-06: High Income (PhilHealth Ceiling Exceeded)
- **Inputs:** Monthly Basic Salary = ₱120,000.00.
- **SSS Deductions:** MSC capped at ₱35,000.00 -> EE Share = **₱1,750.00**.
- **PhilHealth Deductions:**
  - Salary ₱120,000.00 exceeds ₱100,000.00 ceiling. Capped at MBS = ₱100,000.00.
  - Maximum Total Premium = 5% of ₱100,000 = ₱5,000.00.
  - EE Share (50%) = **₱2,500.00**; ER Share = ₱2,500.00.
- **Pag-IBIG Deductions:** Capped at **₱200.00**.
- **Total Employee Deductions:** ₱1,750.00 + ₱2,500.00 + ₱200.00 = **₱4,450.00**.
- **Taxable Income:** ₱120,000.00 - ₱4,450.00 = **₱115,550.00**.
- **Withholding Tax (TRAIN Monthly Bracket 4: ₱66,667 – ₱166,666):**
  - Base Tax = ₱8,541.80.
  - Excess over ₱66,667.00 = ₱115,550.00 - ₱66,667.00 = ₱48,883.00.
  - Marginal Tax (25%) = 25% of ₱48,883.00 = ₱12,220.75.
  - Total Monthly Withholding Tax = ₱8,541.80 + ₱12,220.75 = **₱20,762.55**.
- **Net Take-Home Pay:** ₱120,000.00 - ₱4,450.00 - ₱20,762.55 = **₱94,787.45**.

---

## 2. Philippines SSS Retirement Pension

### Test Vector PH-PEN-01: Minimum Pension Formula (10 CYS, Low AMSC)
- **Inputs:** AMSC = ₱5,000.00; CYS = 10 years; 0 dependents.
- **Step 1 - Formula 1:**
  $$300 + (0.20 \times 5,000) + [0.02 \times 5,000 \times (10 - 10)] = 300 + 1,000 + 0 = \text{₱1,300.00}$$
- **Step 2 - Formula 2:**
  $$0.40 \times 5,000 = \text{₱2,000.00}$$
- **Step 3 - Formula 3 (Minimum Pension for 10 <= CYS < 20):**
  $$\text{₱1,200.00}$$
- **Step 4 - Highest Result:** $\max(1,300, 2,000, 1,200) = \text{₱2,000.00}$.
- **Step 5 - Add Additional Benefit:** $\text{₱2,000.00} + \text{₱1,000.00} = \mathbf{₱3,000.00}$ per month.
- **Annual Payout (with 13th month):** $13 \times \text{₱3,000.00} = \mathbf{₱39,000.00}$.

---

### Test Vector PH-PEN-02: Formula 1 Dominant (25 CYS, AMSC ₱15,000)
- **Inputs:** AMSC = ₱15,000.00; CYS = 25 years; 0 dependents.
- **Step 1 - Formula 1:**
  $$300 + (0.20 \times 15,000) + [0.02 \times 15,000 \times (25 - 10)] = 300 + 3,000 + (300 \times 15) = 300 + 3,000 + 4,500 = \mathbf{₱7,800.00}$$
- **Step 2 - Formula 2:**
  $$0.40 \times 15,000 = \text{₱6,000.00}$$
- **Step 3 - Formula 3 (CYS >= 20):**
  $$\text{₱2,400.00}$$
- **Step 4 - Highest Result:** $\max(7,800, 6,000, 2,400) = \text{₱7,800.00}$.
- **Step 5 - Add Additional Benefit:** $\text{₱7,800.00} + \text{₱1,000.00} = \mathbf{₱8,800.00}$ per month.

---

### Test Vector PH-PEN-03: Maximum Regular SS Pension (35 CYS, Max AMSC ₱20,000)
- **Inputs:** AMSC = ₱20,000.00 (Max Regular SS MSC); CYS = 35 years; 0 dependents.
- **Step 1 - Formula 1:**
  $$300 + (0.20 \times 20,000) + [0.02 \times 20,000 \times (35 - 10)] = 300 + 4,000 + (400 \times 25) = 300 + 4,000 + 10,000 = \mathbf{₱14,300.00}$$
- **Step 2 - Formula 2:**
  $$0.40 \times 20,000 = \text{₱8,000.00}$$
- **Step 3 - Formula 3:** $\text{₱2,400.00}$.
- **Step 4 - Basic Monthly Pension:** $\mathbf{₱14,300.00}$.
- **Step 5 - Total Payout:** $\text{₱14,300.00} + \text{₱1,000.00} = \mathbf{₱15,300.00}$ per month.

---

### Test Vector PH-PEN-04: Pension with Dependent Children
- **Inputs:** Basic Pension = ₱7,800.00; 2 qualified dependent minor children.
- **Dependent's Pension Formula:** $\max(10\% \times \text{Basic Pension}, 250) = \max(0.10 \times 7,800, 250) = \max(780, 250) = \text{₱780.00}$ per child.
- **For 2 children:** $2 \times \text{₱780.00} = \text{₱1,560.00}$.
- **Total Monthly Pension:** $\text{₱7,800.00 (Basic)} + \text{₱1,000.00 (Add'l)} + \text{₱1,560.00 (Dependents)} = \mathbf{₱10,360.00}$.
- **December 13th-Month Pension:** Equal to Basic Monthly Pension = **₱7,800.00** (excludes dependent allowance).

---

## 3. Philippines SSS Salary Loan

### Test Vector PH-LOAN-01: 1-Month Salary Loan (Initial Borrowing)
- **Inputs:** Posted Contributions = 36 months (6 in last 12 months); Average of last 12 MSCs = ₱15,000.00; Status = Good Standing.
- **Approved Principal Amount:** Average MSC = **₱15,000.00**.
- **Service Fee (1% deducted upfront):** $1\% \times 15,000 = \mathbf{₱150.00}$.
- **Interest Rate:** 8.0% per annum on diminishing balance.
- **Repayment Term:** 24 equal monthly installments.
- **Monthly Amortization Formula:**
  $$A = P \times \frac{r(1+r)^n}{(1+r)^n - 1}$$
  Where $P = 15,000$, monthly rate $r = \frac{0.08}{12} \approx 0.0066667$, $n = 24$.
  $$A = 15,000 \times \frac{0.0066667 \times (1.0066667)^{24}}{(1.0066667)^{24} - 1} \approx 15,000 \times 0.0452273 = \mathbf{₱678.41}\text{ / month}.$$
- **Total Repayment over 24 months:** $24 \times 678.41 = \mathbf{₱16,281.84}$.
- **Total Interest Paid:** $16,281.84 - 15,000.00 = \mathbf{₱1,281.84}$.

---

### Test Vector PH-LOAN-02: 2-Month Salary Loan (Max Amount ₱40,000)
- **Inputs:** Posted Contributions = 72 months; Average of last 12 MSCs = ₱20,000.00; Prior Condonation = Yes (in past 5 years).
- **Approved Principal Amount:** $2 \times \text{₱20,000.00} = \mathbf{₱40,000.00}$ (Maximum allowable salary loan).
- **Service Fee (1%):** $1\% \times 40,000 = \mathbf{₱400.00}$.
- **Interest Rate:** 10.0% per annum (due to prior condonation).
- **Monthly Rate:** $r = \frac{0.10}{12} \approx 0.0083333$, $n = 24$.
  $$A = 40,000 \times \frac{0.0083333 \times (1.0083333)^{24}}{(1.0083333)^{24} - 1} \approx 40,000 \times 0.0461449 = \mathbf{₱1,845.80}\text{ / month}.$$
- **Total Repayment:** $24 \times 1,845.80 = \mathbf{₱44,299.20}$.

---

## 4. Philippines 13th Month Pay

### Test Vector PH-13TH-01: Full-Year Regular Employee
- **Inputs:** Basic Salary = ₱30,000.00 / month; Worked entire 12 months with no unpaid leaves.
- **Calculation:**
  $$\text{13th Month Pay} = \frac{12 \times \text{₱30,000.00}}{12} = \mathbf{₱30,000.00}$$
- **Tax Status:** ₱30,000.00 <= ₱90,000.00 tax exemption ceiling -> **100% Tax-Exempt**.

---

### Test Vector PH-13TH-02: Resigned Employee in June (Pro-rated)
- **Inputs:** Resigned effective June 30; Monthly basic salary = ₱24,000.00; Worked January through June (6 months).
- **Calculation:**
  $$\text{Total Basic Salary Earned in Year} = 6 \times \text{₱24,000.00} = \text{₱144,000.00}$$
  $$\text{Pro-rated 13th Month Pay} = \frac{\text{₱144,000.00}}{12} = \mathbf{₱12,000.00}$$
- **Payable Deadline:** Included in final pay, typically released within 30 days from separation.

---

### Test Vector PH-13TH-03: Salary Increase Mid-Year
- **Inputs:** Jan–May (5 months) at ₱20,000.00/month; Jun–Dec (7 months) at ₱26,000.00/month.
- **Calculation:**
  $$\text{Total Basic Earned} = (5 \times 20,000) + (7 \times 26,000) = 100,000 + 182,000 = \text{₱282,000.00}$$
  $$\text{13th Month Pay} = \frac{\text{₱282,000.00}}{12} = \mathbf{₱23,500.00}$$

---

### Test Vector PH-13TH-04: Exclusions from Basic Salary
- **Inputs:** Employee received: Basic Salary = ₱300,000.00 for the year, Overtime Pay = ₱45,000.00, Night Shift Differential = ₱18,000.00, Performance Bonus = ₱50,000.00.
- **Rule:** Under PD 851, OT, Night Diff, and discretionary bonuses are **excluded** from Basic Salary.
- **Calculation:**
  $$\text{13th Month Pay} = \frac{\text{₱300,000.00}}{12} = \mathbf{₱25,000.00}$$

---

### Test Vector PH-13TH-05: Taxable Excess Over ₱90,000 Exemption Ceiling
- **Inputs:** Executive with Monthly Basic Salary = ₱150,000.00.
- **13th Month Pay:** $\frac{12 \times 150,000}{12} = \text{₱150,000.00}$.
- **Exempt Portion:** ₱90,000.00.
- **Taxable Excess:** $\text{₱150,000.00} - \text{₱90,000.00} = \mathbf{₱60,000.00}$.
- **Tax Treatment:** ₱60,000.00 is added to December compensation and subjected to withholding tax.

---

## 5. Kenya Safaricom M-PESA, Fuliza & M-Shwari

### Test Vector KE-MPESA-01: Transfer Cheapest Band & Agent Withdrawal Floor
- **Case A - Send KES 45 to M-PESA User:**
  - Band 1 – 49 KES -> Fee = **0.00 KES (FREE)**.
- **Case B - Send KES 45 to Airtel Money User:**
  - Band 1 – 49 KES -> Fee = **0.00 KES (FREE)**.
- **Case C - Withdraw KES 45 at Agent:**
  - Amount is below minimum agent cash withdrawal limit (KES 50) -> **Transaction Rejected (Min KES 50)**.
- **Case D - Withdraw KES 50 at Agent:**
  - Band 50 – 100 KES -> Fee = **11.00 KES**.

---

### Test Vector KE-MPESA-02: Band Boundary Transitions
- **Boundary at KES 500:**
  - Send KES 500 to M-PESA user: Band 101 – 500 -> Fee = **7.00 KES**.
  - Send KES 501 to M-PESA user: Band 501 – 1,000 -> Fee = **13.00 KES**.
- **Boundary at KES 1,000:**
  - Send KES 1,000: Fee = **13.00 KES**.
  - Send KES 1,001: Band 1,001 – 1,500 -> Fee = **23.00 KES**.
- **Boundary at KES 2,500:**
  - Withdraw KES 2,500 at Agent: Band 1,501 – 2,500 -> Fee = **29.00 KES**.
  - Withdraw KES 2,501 at Agent: Band 2,501 – 3,500 -> Fee = **52.00 KES**.

---

### Test Vector KE-MPESA-03: Highest Tiers and Daily Limits
- **Send KES 70,000:**
  - Band 50,001 – 250,000 KES -> Fee = **108.00 KES** (capped maximum fee).
- **Withdraw KES 70,000 at Agent:**
  - Band 50,001 – 250,000 KES -> Fee = **309.00 KES**.
- **Send KES 260,000:**
  - Exceeds per-transaction limit (KES 250,000) -> **Rejected**. Must be split into two transfers (e.g. 250,000 + 10,000). Total fee = 108 + 100 = 208 KES.

---

### Test Vector KE-FULIZA-01: Overdraft Repaid Within 3-Day Grace Window
- **Inputs:** Fuliza Overdraft Amount = KES 800.00. Repaid on Day 2.
- **1% Upfront Access Fee:** $1\% \times 800 = \mathbf{KES 8.00}$.
- **Daily Maintenance Fee (Band KES 501 – 1,000):**
  - Standard rate = KES 6.00 / day (incl. 20% excise).
  - Repaid within the first 3 days -> Daily maintenance fee is **KES 0.00 (FREE)**.
- **Total Fuliza Cost:** KES 8.00.
- **Total Amount Repaid from M-PESA Account:** $800.00 + 8.00 = \mathbf{KES 808.00}$.

---

### Test Vector KE-FULIZA-02: Overdraft Repaid on Day 10 (Tier 2,501 - 70,000)
- **Inputs:** Fuliza Overdraft = KES 5,000.00. Repaid on Day 10.
- **1% Upfront Access Fee:** $1\% \times 5,000 = \mathbf{KES 50.00}$.
- **Daily Maintenance Fee (Band KES 2,501 – 70,000):**
  - Base fee = KES 25.00, 20% Excise Duty = KES 5.00 -> Total = **KES 30.00 / day**.
  - Grace Period: None for balances above KES 1,000.
  - Number of days charged: 9 daily cycles (applied midnight starting day 1).
  - Maintenance Fees = $9 \times 30.00 = \mathbf{KES 270.00}$.
- **Total Finance Cost:** $50.00 + 270.00 = \mathbf{KES 320.00}$.
- **Total Settlement:** $5,000.00 + 320.00 = \mathbf{KES 5,320.00}$.

---

### Test Vector KE-MSHWARI-01: 30-Day Loan of KES 10,000
- **Inputs:** Requested M-Shwari Loan = KES 10,000.00. Term = 30 days.
- **Loan Facilitation Fee:** $7.5\% \times 10,000 = \mathbf{KES 750.00}$.
- **Excise Duty on Facilitation Fee:** $20\% \times 750.00 = \mathbf{KES 150.00}$ (1.5% of principal).
- **Total Loan Charge:** $750.00 + 150.00 = \mathbf{KES 900.00}$ (9.0% total).
- **Disbursement Deduction Rule:** Excise duty (KES 150.00) is deducted upfront upon release.
- **Net Cash Disbursed to M-PESA Wallet:** $10,000.00 - 150.00 = \mathbf{KES 9,850.00}$.
- **Repayment Due at Day 30:** Principal + Facilitation Fee = $10,000.00 + 750.00 = \mathbf{KES 10,750.00}$.

---

## 6. Uganda Mobile Money (MTN & Airtel)

### Test Vector UG-MOMO-01: Peer-to-Peer Transfer (Cheapest vs Mid Tier)
- **Case A - Send 2,000 UGX:**
  - Tier 500 – 2,500 UGX -> Transfer Fee = **100 UGX**.
  - Amount deducted from sender: $2,000 + 100 = \mathbf{2,100\text{ UGX}}$.
- **Case B - Send 50,000 UGX:**
  - Tier 45,001 – 60,000 UGX -> Transfer Fee = **500 UGX**.
  - Amount deducted from sender: $50,000 + 500 = \mathbf{50,500\text{ UGX}}$.

---

### Test Vector UG-MOMO-02: Cash Withdrawal at Agent (10,000 UGX)
- **Inputs:** Withdrawal Amount = 10,000 UGX.
- **Operator Agent Withdrawal Fee:**
  - Tier 5,001 – 15,000 UGX -> Agent Fee = **700 UGX**.
- **0.5% Government Statutory Withdrawal Tax:**
  - $0.005 \times 10,000 = \mathbf{50\text{ UGX}}$.
- **Total Transaction Cost:** $700 + 50 = \mathbf{750\text{ UGX}}$.
- **Total Balance Deducted from Mobile Wallet:** $10,000 + 750 = \mathbf{10,750\text{ UGX}}$.

---

### Test Vector UG-MOMO-03: Cash Withdrawal at Agent (500,000 UGX)
- **Inputs:** Withdrawal Amount = 500,000 UGX.
- **Operator Agent Withdrawal Fee:**
  - Tier 250,001 – 500,000 UGX -> Agent Fee = **7,000 UGX**.
- **0.5% Government Statutory Withdrawal Tax:**
  - $0.005 \times 500,000 = \mathbf{2,500\text{ UGX}}$.
- **Total Transaction Cost:** $7,000 + 2,500 = \mathbf{9,500\text{ UGX}}$.
- **Total Balance Deducted:** $500,000 + 9,500 = \mathbf{509,500\text{ UGX}}$.

---

### Test Vector UG-MOMO-04: Band Boundary Withdrawal (2,500 vs 2,501 UGX)
- **Withdraw 2,500 UGX:**
  - Tier 500 – 2,500 UGX -> Agent Fee = 330 UGX; Tax = $0.005 \times 2,500 = 12.5 \approx \text{13 UGX}$.
  - Total Fee = **343 UGX**.
- **Withdraw 2,501 UGX:**
  - Tier 2,501 – 5,000 UGX -> Agent Fee = 440 UGX; Tax = $0.005 \times 2,501 = 12.5 \approx \text{13 UGX}$.
  - Total Fee = **453 UGX**.

---

### Test Vector UG-MOMO-05: Maximum Single Transaction Cash-Out (5,000,000 UGX)
- **Inputs:** Withdrawal Amount = 5,000,000 UGX (maximum limit).
- **Operator Agent Withdrawal Fee:**
  - Tier 4,000,001 – 5,000,000 UGX -> Agent Fee = **20,000 UGX**.
- **0.5% Government Statutory Withdrawal Tax:**
  - $0.005 \times 5,000,000 = \mathbf{25,000\text{ UGX}}$.
- **Total Fee:** $20,000 + 25,000 = \mathbf{45,000\text{ UGX}}$.
- **Total Balance Deducted:** $\mathbf{5,045,000\text{ UGX}}$.

---

## 7. Nigeria Tertiary CGPA (University & Polytechnic)

### Test Vector NG-CGPA-01: University Semester GPA Calculation
- **Courses Registered (Semester 1):**
  - MTH 101 (3 units): Score 76% -> Grade A (5.0 GP) -> Quality Points = $3 \times 5.0 = 15.0$
  - PHY 101 (3 units): Score 64% -> Grade B (4.0 GP) -> Quality Points = $3 \times 4.0 = 12.0$
  - CHM 101 (3 units): Score 53% -> Grade C (3.0 GP) -> Quality Points = $3 \times 3.0 = 9.0$
  - BIO 101 (2 units): Score 47% -> Grade D (2.0 GP) -> Quality Points = $2 \times 2.0 = 4.0$
  - GST 101 (2 units): Score 42% -> Grade E (1.0 GP) -> Quality Points = $2 \times 1.0 = 2.0$
- **Total Credit Units (TCE):** $3 + 3 + 3 + 2 + 2 = \mathbf{13}$ units.
- **Total Quality Points (TQP):** $15.0 + 12.0 + 9.0 + 4.0 + 2.0 = \mathbf{42.0}$ points.
- **Semester GPA:**
  $$\text{GPA} = \frac{42.0}{13} \approx \mathbf{3.23}$$

---

### Test Vector NG-CGPA-02: University Degree Class Boundary (4.50 vs 4.49)
- **Case A - Exactly 4.50 CGPA:**
  - Cumulative Credit Units = 120.
  - Cumulative Quality Points = 540.
  - $\text{CGPA} = \frac{540}{120} = 4.5000$.
  - Classification: **First Class Honours** ($4.50 – 5.00$).
- **Case B - Exactly 4.49 CGPA:**
  - Cumulative Units = 120, Quality Points = 539.
  - $\text{CGPA} = \frac{539}{120} \approx 4.4917 \rightarrow 4.49$.
  - Classification: **Second Class Honours (Upper Division)** ($3.50 – 4.49$).

---

### Test Vector NG-CGPA-03: University Intermediate Class Boundaries
- **Boundary 3.50:** $\ge 3.50$ = Second Class Upper; $3.49$ = Second Class Lower.
- **Boundary 2.40:** $\ge 2.40$ = Second Class Lower; $2.39$ = Third Class Honours.
- **Boundary 1.50:** $\ge 1.50$ = Third Class Honours; $< 1.50$ = Fail / Ineligible to graduate under NUC post-2013 regulations.

---

### Test Vector NG-CGPA-04: Repeated / Carryover Course Under NUC Cumulative Rule
- **Semester 1:**
  - Student registered CVE 201 (3 units) and scored 35% -> Grade F (0.0 GP).
  - TQP earned for course = $3 \times 0.0 = 0.0$.
  - 3 credit units added to cumulative units registered.
- **Semester 3 (Retake):**
  - Student retakes CVE 201 (3 units) and scores 65% -> Grade B (4.0 GP).
  - TQP earned in retake = $3 \times 4.0 = 12.0$.
  - 3 credit units added again to cumulative units.
- **Net Cumulative Impact Across Both Semesters:**
  - Total Credit Units for CVE 201 = $3 + 3 = 6$ units.
  - Total Quality Points earned = $0.0 + 12.0 = 12.0$ points.
  - Effective Average GP for the course = $\frac{12.0}{6} = 2.00$ (equivalent to Grade D). Both attempts remain permanent in the denominator.

---

### Test Vector NG-CGPA-05: Polytechnic NBTE 4.0 Scale Calculation
- **Courses Registered (ND 1 Semester 1):**
  - COM 111 (3 units): Score 82% -> Grade A (4.00 GP) -> Quality Points = $3 \times 4.00 = 12.00$
  - COM 112 (3 units): Score 72% -> Grade AB (3.50 GP) -> Quality Points = $3 \times 3.50 = 10.50$
  - COM 113 (2 units): Score 67% -> Grade B (3.25 GP) -> Quality Points = $2 \times 3.25 = 6.50$
  - GNS 101 (2 units): Score 61% -> Grade BC (3.00 GP) -> Quality Points = $2 \times 3.00 = 6.00$
  - MTH 111 (3 units): Score 56% -> Grade C (2.75 GP) -> Quality Points = $3 \times 2.75 = 8.25$
- **Total Credit Units:** $3 + 3 + 2 + 2 + 3 = \mathbf{13}$ units.
- **Total Quality Points:** $12.00 + 10.50 + 6.50 + 6.00 + 8.25 = \mathbf{43.25}$ points.
- **Semester GPA:**
  $$\text{GPA} = \frac{43.25}{13} \approx \mathbf{3.33}$$
- **Diploma Classification:** **Upper Credit** ($3.00 – 3.49$).

---

### Test Vector NG-CGPA-06: Polytechnic Distinction Boundary (3.50)
- **Cumulative Units:** 72 units.
- **Scenario A:** 252 Quality Points -> $\text{CGPA} = \frac{252}{72} = \mathbf{3.5000} \rightarrow$ **Distinction** ($3.50 – 4.00$).
- **Scenario B:** 251 Quality Points -> $\text{CGPA} = \frac{251}{72} \approx \mathbf{3.4861} \rightarrow$ **Upper Credit** ($3.00 – 3.49$).
