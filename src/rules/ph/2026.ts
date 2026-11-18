/**
 * Philippines Legal Rates & Contribution Schedules (in force 2026)
 * Official Sources: SSS Circulars 2024-006/007/008/009/010, SSS Circular 2025-004,
 * PhilHealth Advisory 2025-0002, Pag-IBIG Circular 460 / DBM CL 2024-2, BIR RR 11-2018 (TRAIN Law),
 * Presidential Decree No. 851.
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

export interface SssBracket {
  minComp: number;
  maxComp: number; // Use Infinity for over
  regularMsc: number;
  mpfMsc: number;
  totalMsc: number;
  erRegularSs: number;
  erMpf: number;
  erEc: number;
  erTotal: number;
  eeRegularSs: number;
  eeMpf: number;
  eeTotal: number;
  totalContribution: number;
}

export interface BirTaxBracket {
  bracket: number;
  minComp: number;
  maxComp: number; // Use Infinity for top bracket
  baseTax: number;
  marginalRate: number; // percentage (e.g. 0.15 for 15%)
  excessOver: number;
}

// SSS Contribution Rate & Caps (Circular No. 2024-006)
export const SSS_TOTAL_RATE: VerifiedValue<number> = {
  value: 15.0,
  unit: '%',
  validFrom: '2025-01-01',
  validTo: null,
  source: 'SSS Circular No. 2024-006',
  verifiedOn: '2026-11-18',
  confidence: 'high',
};

export const SSS_ER_RATE: VerifiedValue<number> = {
  value: 10.0,
  unit: '%',
  validFrom: '2025-01-01',
  validTo: null,
  source: 'SSS Circular No. 2024-006',
  verifiedOn: '2026-11-18',
  confidence: 'high',
};

export const SSS_EE_RATE: VerifiedValue<number> = {
  value: 5.0,
  unit: '%',
  validFrom: '2025-01-01',
  validTo: null,
  source: 'SSS Circular No. 2024-006',
  verifiedOn: '2026-11-18',
  confidence: 'high',
};

export const SSS_MIN_MSC: VerifiedValue<number> = {
  value: 5000,
  unit: 'PHP',
  validFrom: '2025-01-01',
  validTo: null,
  source: 'SSS Circular No. 2024-006',
  verifiedOn: '2026-11-18',
  confidence: 'high',
};

export const SSS_MAX_MSC: VerifiedValue<number> = {
  value: 35000,
  unit: 'PHP',
  validFrom: '2025-01-01',
  validTo: null,
  source: 'SSS Circular No. 2024-006',
  verifiedOn: '2026-11-18',
  confidence: 'high',
};

export const SSS_REGULAR_MSC_CAP: VerifiedValue<number> = {
  value: 20000,
  unit: 'PHP',
  validFrom: '2025-01-01',
  validTo: null,
  source: 'SSS Circular No. 2024-006',
  verifiedOn: '2026-11-18',
  confidence: 'high',
};

export const SSS_KASAMBAHAY_EMPLOYER_FULL_THRESHOLD: VerifiedValue<number> = {
  value: 5000,
  unit: 'PHP',
  validFrom: '2025-01-01',
  validTo: null,
  source: 'SSS Circular No. 2024-007 / RA 10361',
  verifiedOn: '2026-11-18',
  confidence: 'high',
};

export const SSS_OFW_MIN_MSC: VerifiedValue<number> = {
  value: 8000,
  unit: 'PHP',
  validFrom: '2025-01-01',
  validTo: null,
  source: 'SSS Circular No. 2024-010',
  verifiedOn: '2026-11-18',
  confidence: 'high',
};

// Full Regular Employment SSS Contribution Brackets (Circular No. 2024-006, Page 2)
export const SSS_EMPLOYED_BRACKETS: SssBracket[] = [
  { minComp: 0, maxComp: 5249.99, regularMsc: 5000, mpfMsc: 0, totalMsc: 5000, erRegularSs: 500, erMpf: 0, erEc: 10, erTotal: 510, eeRegularSs: 250, eeMpf: 0, eeTotal: 250, totalContribution: 760 },
  { minComp: 5250, maxComp: 5749.99, regularMsc: 5500, mpfMsc: 0, totalMsc: 5500, erRegularSs: 550, erMpf: 0, erEc: 10, erTotal: 560, eeRegularSs: 275, eeMpf: 0, eeTotal: 275, totalContribution: 835 },
  { minComp: 5750, maxComp: 6249.99, regularMsc: 6000, mpfMsc: 0, totalMsc: 6000, erRegularSs: 600, erMpf: 0, erEc: 10, erTotal: 610, eeRegularSs: 300, eeMpf: 0, eeTotal: 300, totalContribution: 910 },
  { minComp: 6250, maxComp: 6749.99, regularMsc: 6500, mpfMsc: 0, totalMsc: 6500, erRegularSs: 650, erMpf: 0, erEc: 10, erTotal: 660, eeRegularSs: 325, eeMpf: 0, eeTotal: 325, totalContribution: 985 },
  { minComp: 6750, maxComp: 7249.99, regularMsc: 7000, mpfMsc: 0, totalMsc: 7000, erRegularSs: 700, erMpf: 0, erEc: 10, erTotal: 710, eeRegularSs: 350, eeMpf: 0, eeTotal: 350, totalContribution: 1060 },
  { minComp: 7250, maxComp: 7749.99, regularMsc: 7500, mpfMsc: 0, totalMsc: 7500, erRegularSs: 750, erMpf: 0, erEc: 10, erTotal: 760, eeRegularSs: 375, eeMpf: 0, eeTotal: 375, totalContribution: 1135 },
  { minComp: 7750, maxComp: 8249.99, regularMsc: 8000, mpfMsc: 0, totalMsc: 8000, erRegularSs: 800, erMpf: 0, erEc: 10, erTotal: 810, eeRegularSs: 400, eeMpf: 0, eeTotal: 400, totalContribution: 1210 },
  { minComp: 8250, maxComp: 8749.99, regularMsc: 8500, mpfMsc: 0, totalMsc: 8500, erRegularSs: 850, erMpf: 0, erEc: 10, erTotal: 860, eeRegularSs: 425, eeMpf: 0, eeTotal: 425, totalContribution: 1285 },
  { minComp: 8750, maxComp: 9249.99, regularMsc: 9000, mpfMsc: 0, totalMsc: 9000, erRegularSs: 900, erMpf: 0, erEc: 10, erTotal: 910, eeRegularSs: 450, eeMpf: 0, eeTotal: 450, totalContribution: 1360 },
  { minComp: 9250, maxComp: 9749.99, regularMsc: 9500, mpfMsc: 0, totalMsc: 9500, erRegularSs: 950, erMpf: 0, erEc: 10, erTotal: 960, eeRegularSs: 475, eeMpf: 0, eeTotal: 475, totalContribution: 1435 },
  { minComp: 9750, maxComp: 10249.99, regularMsc: 10000, mpfMsc: 0, totalMsc: 10000, erRegularSs: 1000, erMpf: 0, erEc: 10, erTotal: 1010, eeRegularSs: 500, eeMpf: 0, eeTotal: 500, totalContribution: 1510 },
  { minComp: 10250, maxComp: 10749.99, regularMsc: 10500, mpfMsc: 0, totalMsc: 10500, erRegularSs: 1050, erMpf: 0, erEc: 10, erTotal: 1060, eeRegularSs: 525, eeMpf: 0, eeTotal: 525, totalContribution: 1585 },
  { minComp: 10750, maxComp: 11249.99, regularMsc: 11000, mpfMsc: 0, totalMsc: 11000, erRegularSs: 1100, erMpf: 0, erEc: 10, erTotal: 1110, eeRegularSs: 550, eeMpf: 0, eeTotal: 550, totalContribution: 1660 },
  { minComp: 11250, maxComp: 11749.99, regularMsc: 11500, mpfMsc: 0, totalMsc: 11500, erRegularSs: 1150, erMpf: 0, erEc: 10, erTotal: 1160, eeRegularSs: 575, eeMpf: 0, eeTotal: 575, totalContribution: 1735 },
  { minComp: 11750, maxComp: 12249.99, regularMsc: 12000, mpfMsc: 0, totalMsc: 12000, erRegularSs: 1200, erMpf: 0, erEc: 10, erTotal: 1210, eeRegularSs: 600, eeMpf: 0, eeTotal: 600, totalContribution: 1810 },
  { minComp: 12250, maxComp: 12749.99, regularMsc: 12500, mpfMsc: 0, totalMsc: 12500, erRegularSs: 1250, erMpf: 0, erEc: 10, erTotal: 1260, eeRegularSs: 625, eeMpf: 0, eeTotal: 625, totalContribution: 1885 },
  { minComp: 12750, maxComp: 13249.99, regularMsc: 13000, mpfMsc: 0, totalMsc: 13000, erRegularSs: 1300, erMpf: 0, erEc: 10, erTotal: 1310, eeRegularSs: 650, eeMpf: 0, eeTotal: 650, totalContribution: 1960 },
  { minComp: 13250, maxComp: 13749.99, regularMsc: 13500, mpfMsc: 0, totalMsc: 13500, erRegularSs: 1350, erMpf: 0, erEc: 10, erTotal: 1360, eeRegularSs: 675, eeMpf: 0, eeTotal: 675, totalContribution: 2035 },
  { minComp: 13750, maxComp: 14249.99, regularMsc: 14000, mpfMsc: 0, totalMsc: 14000, erRegularSs: 1400, erMpf: 0, erEc: 10, erTotal: 1410, eeRegularSs: 700, eeMpf: 0, eeTotal: 700, totalContribution: 2110 },
  { minComp: 14250, maxComp: 14749.99, regularMsc: 14500, mpfMsc: 0, totalMsc: 14500, erRegularSs: 1450, erMpf: 0, erEc: 10, erTotal: 1460, eeRegularSs: 725, eeMpf: 0, eeTotal: 725, totalContribution: 2185 },
  { minComp: 14750, maxComp: 15249.99, regularMsc: 15000, mpfMsc: 0, totalMsc: 15000, erRegularSs: 1500, erMpf: 0, erEc: 30, erTotal: 1530, eeRegularSs: 750, eeMpf: 0, eeTotal: 750, totalContribution: 2280 },
  { minComp: 15250, maxComp: 15749.99, regularMsc: 15500, mpfMsc: 0, totalMsc: 15500, erRegularSs: 1550, erMpf: 0, erEc: 30, erTotal: 1580, eeRegularSs: 775, eeMpf: 0, eeTotal: 775, totalContribution: 2355 },
  { minComp: 15750, maxComp: 16249.99, regularMsc: 16000, mpfMsc: 0, totalMsc: 16000, erRegularSs: 1600, erMpf: 0, erEc: 30, erTotal: 1630, eeRegularSs: 800, eeMpf: 0, eeTotal: 800, totalContribution: 2430 },
  { minComp: 16250, maxComp: 16749.99, regularMsc: 16500, mpfMsc: 0, totalMsc: 16500, erRegularSs: 1650, erMpf: 0, erEc: 30, erTotal: 1680, eeRegularSs: 825, eeMpf: 0, eeTotal: 825, totalContribution: 2505 },
  { minComp: 16750, maxComp: 17249.99, regularMsc: 17000, mpfMsc: 0, totalMsc: 17000, erRegularSs: 1700, erMpf: 0, erEc: 30, erTotal: 1730, eeRegularSs: 850, eeMpf: 0, eeTotal: 850, totalContribution: 2580 },
  { minComp: 17250, maxComp: 17749.99, regularMsc: 17500, mpfMsc: 0, totalMsc: 17500, erRegularSs: 1750, erMpf: 0, erEc: 30, erTotal: 1780, eeRegularSs: 875, eeMpf: 0, eeTotal: 875, totalContribution: 2655 },
  { minComp: 17750, maxComp: 18249.99, regularMsc: 18000, mpfMsc: 0, totalMsc: 18000, erRegularSs: 1800, erMpf: 0, erEc: 30, erTotal: 1830, eeRegularSs: 900, eeMpf: 0, eeTotal: 900, totalContribution: 2730 },
  { minComp: 18250, maxComp: 18749.99, regularMsc: 18500, mpfMsc: 0, totalMsc: 18500, erRegularSs: 1850, erMpf: 0, erEc: 30, erTotal: 1880, eeRegularSs: 925, eeMpf: 0, eeTotal: 925, totalContribution: 2805 },
  { minComp: 18750, maxComp: 19249.99, regularMsc: 19000, mpfMsc: 0, totalMsc: 19000, erRegularSs: 1900, erMpf: 0, erEc: 30, erTotal: 1930, eeRegularSs: 950, eeMpf: 0, eeTotal: 950, totalContribution: 2880 },
  { minComp: 19250, maxComp: 19749.99, regularMsc: 19500, mpfMsc: 0, totalMsc: 19500, erRegularSs: 1950, erMpf: 0, erEc: 30, erTotal: 1980, eeRegularSs: 975, eeMpf: 0, eeTotal: 975, totalContribution: 2955 },
  { minComp: 19750, maxComp: 20249.99, regularMsc: 20000, mpfMsc: 0, totalMsc: 20000, erRegularSs: 2000, erMpf: 0, erEc: 30, erTotal: 2030, eeRegularSs: 1000, eeMpf: 0, eeTotal: 1000, totalContribution: 3030 },
  { minComp: 20250, maxComp: 20749.99, regularMsc: 20000, mpfMsc: 500, totalMsc: 20500, erRegularSs: 2000, erMpf: 50, erEc: 30, erTotal: 2080, eeRegularSs: 1000, eeMpf: 25, eeTotal: 1025, totalContribution: 3105 },
  { minComp: 20750, maxComp: 21249.99, regularMsc: 20000, mpfMsc: 1000, totalMsc: 21000, erRegularSs: 2000, erMpf: 100, erEc: 30, erTotal: 2130, eeRegularSs: 1000, eeMpf: 50, eeTotal: 1050, totalContribution: 3180 },
  { minComp: 21250, maxComp: 21749.99, regularMsc: 20000, mpfMsc: 1500, totalMsc: 21500, erRegularSs: 2000, erMpf: 150, erEc: 30, erTotal: 2180, eeRegularSs: 1000, eeMpf: 75, eeTotal: 1075, totalContribution: 3255 },
  { minComp: 21750, maxComp: 22249.99, regularMsc: 20000, mpfMsc: 2000, totalMsc: 22000, erRegularSs: 2000, erMpf: 200, erEc: 30, erTotal: 2230, eeRegularSs: 1000, eeMpf: 100, eeTotal: 1100, totalContribution: 3330 },
  { minComp: 22250, maxComp: 22749.99, regularMsc: 20000, mpfMsc: 2500, totalMsc: 22500, erRegularSs: 2000, erMpf: 250, erEc: 30, erTotal: 2280, eeRegularSs: 1000, eeMpf: 125, eeTotal: 1125, totalContribution: 3405 },
  { minComp: 22750, maxComp: 23249.99, regularMsc: 20000, mpfMsc: 3000, totalMsc: 23000, erRegularSs: 2000, erMpf: 300, erEc: 30, erTotal: 2330, eeRegularSs: 1000, eeMpf: 150, eeTotal: 1150, totalContribution: 3480 },
  { minComp: 23250, maxComp: 23749.99, regularMsc: 20000, mpfMsc: 3500, totalMsc: 23500, erRegularSs: 2000, erMpf: 350, erEc: 30, erTotal: 2380, eeRegularSs: 1000, eeMpf: 175, eeTotal: 1175, totalContribution: 3555 },
  { minComp: 23750, maxComp: 24249.99, regularMsc: 20000, mpfMsc: 4000, totalMsc: 24000, erRegularSs: 2000, erMpf: 400, erEc: 30, erTotal: 2430, eeRegularSs: 1000, eeMpf: 200, eeTotal: 1200, totalContribution: 3630 },
  { minComp: 24250, maxComp: 24749.99, regularMsc: 20000, mpfMsc: 4500, totalMsc: 24500, erRegularSs: 2000, erMpf: 450, erEc: 30, erTotal: 2480, eeRegularSs: 1000, eeMpf: 225, eeTotal: 1225, totalContribution: 3705 },
  { minComp: 24750, maxComp: 25249.99, regularMsc: 20000, mpfMsc: 5000, totalMsc: 25000, erRegularSs: 2000, erMpf: 500, erEc: 30, erTotal: 2530, eeRegularSs: 1000, eeMpf: 250, eeTotal: 1250, totalContribution: 3780 },
  { minComp: 25250, maxComp: 25749.99, regularMsc: 20000, mpfMsc: 5500, totalMsc: 25500, erRegularSs: 2000, erMpf: 550, erEc: 30, erTotal: 2580, eeRegularSs: 1000, eeMpf: 275, eeTotal: 1275, totalContribution: 3855 },
  { minComp: 25750, maxComp: 26249.99, regularMsc: 20000, mpfMsc: 6000, totalMsc: 26000, erRegularSs: 2000, erMpf: 600, erEc: 30, erTotal: 2630, eeRegularSs: 1000, eeMpf: 300, eeTotal: 1300, totalContribution: 3930 },
  { minComp: 26250, maxComp: 26749.99, regularMsc: 20000, mpfMsc: 6500, totalMsc: 26500, erRegularSs: 2000, erMpf: 650, erEc: 30, erTotal: 2680, eeRegularSs: 1000, eeMpf: 325, eeTotal: 1325, totalContribution: 4005 },
  { minComp: 26750, maxComp: 27249.99, regularMsc: 20000, mpfMsc: 7000, totalMsc: 27000, erRegularSs: 2000, erMpf: 700, erEc: 30, erTotal: 2730, eeRegularSs: 1000, eeMpf: 350, eeTotal: 1350, totalContribution: 4080 },
  { minComp: 27250, maxComp: 27749.99, regularMsc: 20000, mpfMsc: 7500, totalMsc: 27500, erRegularSs: 2000, erMpf: 750, erEc: 30, erTotal: 2780, eeRegularSs: 1000, eeMpf: 375, eeTotal: 1375, totalContribution: 4155 },
  { minComp: 27750, maxComp: 28249.99, regularMsc: 20000, mpfMsc: 8000, totalMsc: 28000, erRegularSs: 2000, erMpf: 800, erEc: 30, erTotal: 2830, eeRegularSs: 1000, eeMpf: 400, eeTotal: 1400, totalContribution: 4230 },
  { minComp: 28250, maxComp: 28749.99, regularMsc: 20000, mpfMsc: 8500, totalMsc: 28500, erRegularSs: 2000, erMpf: 850, erEc: 30, erTotal: 2880, eeRegularSs: 1000, eeMpf: 425, eeTotal: 1425, totalContribution: 4305 },
  { minComp: 28750, maxComp: 29249.99, regularMsc: 20000, mpfMsc: 9000, totalMsc: 29000, erRegularSs: 2000, erMpf: 900, erEc: 30, erTotal: 2930, eeRegularSs: 1000, eeMpf: 450, eeTotal: 1450, totalContribution: 4380 },
  { minComp: 29250, maxComp: 29749.99, regularMsc: 20000, mpfMsc: 9500, totalMsc: 29500, erRegularSs: 2000, erMpf: 950, erEc: 30, erTotal: 2980, eeRegularSs: 1000, eeMpf: 475, eeTotal: 1475, totalContribution: 4455 },
  { minComp: 29750, maxComp: 30249.99, regularMsc: 20000, mpfMsc: 10000, totalMsc: 30000, erRegularSs: 2000, erMpf: 1000, erEc: 30, erTotal: 3030, eeRegularSs: 1000, eeMpf: 500, eeTotal: 1500, totalContribution: 4530 },
  { minComp: 30250, maxComp: 30749.99, regularMsc: 20000, mpfMsc: 10500, totalMsc: 30500, erRegularSs: 2000, erMpf: 1050, erEc: 30, erTotal: 3080, eeRegularSs: 1000, eeMpf: 525, eeTotal: 1525, totalContribution: 4605 },
  { minComp: 30750, maxComp: 31249.99, regularMsc: 20000, mpfMsc: 11000, totalMsc: 31000, erRegularSs: 2000, erMpf: 1100, erEc: 30, erTotal: 3130, eeRegularSs: 1000, eeMpf: 550, eeTotal: 1550, totalContribution: 4680 },
  { minComp: 31250, maxComp: 31749.99, regularMsc: 20000, mpfMsc: 11500, totalMsc: 31500, erRegularSs: 2000, erMpf: 1150, erEc: 30, erTotal: 3180, eeRegularSs: 1000, eeMpf: 575, eeTotal: 1575, totalContribution: 4755 },
  { minComp: 31750, maxComp: 32249.99, regularMsc: 20000, mpfMsc: 12000, totalMsc: 32000, erRegularSs: 2000, erMpf: 1200, erEc: 30, erTotal: 3230, eeRegularSs: 1000, eeMpf: 600, eeTotal: 1600, totalContribution: 4830 },
  { minComp: 32250, maxComp: 32749.99, regularMsc: 20000, mpfMsc: 12500, totalMsc: 32500, erRegularSs: 2000, erMpf: 1250, erEc: 30, erTotal: 3280, eeRegularSs: 1000, eeMpf: 625, eeTotal: 1625, totalContribution: 4905 },
  { minComp: 32750, maxComp: 33249.99, regularMsc: 20000, mpfMsc: 13000, totalMsc: 33000, erRegularSs: 2000, erMpf: 1300, erEc: 30, erTotal: 3330, eeRegularSs: 1000, eeMpf: 650, eeTotal: 1650, totalContribution: 4980 },
  { minComp: 33250, maxComp: 33749.99, regularMsc: 20000, mpfMsc: 13500, totalMsc: 33500, erRegularSs: 2000, erMpf: 1350, erEc: 30, erTotal: 3380, eeRegularSs: 1000, eeMpf: 675, eeTotal: 1675, totalContribution: 5055 },
  { minComp: 33750, maxComp: 34249.99, regularMsc: 20000, mpfMsc: 14000, totalMsc: 34000, erRegularSs: 2000, erMpf: 1400, erEc: 30, erTotal: 3430, eeRegularSs: 1000, eeMpf: 700, eeTotal: 1700, totalContribution: 5130 },
  { minComp: 34250, maxComp: 34749.99, regularMsc: 20000, mpfMsc: 14500, totalMsc: 34500, erRegularSs: 2000, erMpf: 1450, erEc: 30, erTotal: 3480, eeRegularSs: 1000, eeMpf: 725, eeTotal: 1725, totalContribution: 5205 },
  { minComp: 34750, maxComp: Infinity, regularMsc: 20000, mpfMsc: 15000, totalMsc: 35000, erRegularSs: 2000, erMpf: 1500, erEc: 30, erTotal: 3530, eeRegularSs: 1000, eeMpf: 750, eeTotal: 1750, totalContribution: 5280 },
];

// PhilHealth Constants (Advisory No. 2025-0002)
export const PHILHEALTH_PREMIUM_RATE: VerifiedValue<number> = {
  value: 5.0,
  unit: '%',
  validFrom: '2024-01-01',
  validTo: null,
  source: 'PhilHealth Advisory No. 2025-0002',
  verifiedOn: '2026-11-18',
  confidence: 'high',
};

export const PHILHEALTH_INCOME_FLOOR: VerifiedValue<number> = {
  value: 10000,
  unit: 'PHP',
  validFrom: '2024-01-01',
  validTo: null,
  source: 'PhilHealth Advisory No. 2025-0002',
  verifiedOn: '2026-11-18',
  confidence: 'high',
};

export const PHILHEALTH_INCOME_CEILING: VerifiedValue<number> = {
  value: 100000,
  unit: 'PHP',
  validFrom: '2024-01-01',
  validTo: null,
  source: 'PhilHealth Advisory No. 2025-0002',
  verifiedOn: '2026-11-18',
  confidence: 'high',
};

// Pag-IBIG Fund Constants (Circular No. 460 / DBM CL 2024-2)
export const PAGIBIG_MAX_FUND_SALARY: VerifiedValue<number> = {
  value: 10000,
  unit: 'PHP',
  validFrom: '2024-02-01',
  validTo: null,
  source: 'Pag-IBIG Circular No. 460 / DBM CL 2024-2',
  verifiedOn: '2026-11-18',
  confidence: 'high',
};

export const PAGIBIG_MAX_EE_SHARE: VerifiedValue<number> = {
  value: 200,
  unit: 'PHP',
  validFrom: '2024-02-01',
  validTo: null,
  source: 'Pag-IBIG Circular No. 460',
  verifiedOn: '2026-11-18',
  confidence: 'high',
};

export const PAGIBIG_MAX_ER_SHARE: VerifiedValue<number> = {
  value: 200,
  unit: 'PHP',
  validFrom: '2024-02-01',
  validTo: null,
  source: 'Pag-IBIG Circular No. 460',
  verifiedOn: '2026-11-18',
  confidence: 'high',
};

// BIR Withholding Tax Monthly Brackets (Annex E, RR 11-2018)
export const BIR_MONTHLY_TAX_BRACKETS: BirTaxBracket[] = [
  { bracket: 1, minComp: 0, maxComp: 20833, baseTax: 0, marginalRate: 0.0, excessOver: 0 },
  { bracket: 2, minComp: 20833.01, maxComp: 33332, baseTax: 0, marginalRate: 0.15, excessOver: 20833 },
  { bracket: 3, minComp: 33333, maxComp: 66666, baseTax: 1875, marginalRate: 0.20, excessOver: 33333 },
  { bracket: 4, minComp: 66667, maxComp: 166666, baseTax: 8541.80, marginalRate: 0.25, excessOver: 66667 },
  { bracket: 5, minComp: 166667, maxComp: 666666, baseTax: 33541.80, marginalRate: 0.30, excessOver: 166667 },
  { bracket: 6, minComp: 666667, maxComp: Infinity, baseTax: 183541.80, marginalRate: 0.35, excessOver: 666667 },
];

// BIR Semi-Monthly Withholding Tax Brackets (Annex E, RR 11-2018)
export const BIR_SEMI_MONTHLY_TAX_BRACKETS: BirTaxBracket[] = [
  { bracket: 1, minComp: 0, maxComp: 10417, baseTax: 0, marginalRate: 0.0, excessOver: 0 },
  { bracket: 2, minComp: 10417.01, maxComp: 16666, baseTax: 0, marginalRate: 0.15, excessOver: 10417 },
  { bracket: 3, minComp: 16667, maxComp: 33332, baseTax: 937.50, marginalRate: 0.20, excessOver: 16667 },
  { bracket: 4, minComp: 33333, maxComp: 83332, baseTax: 4270.70, marginalRate: 0.25, excessOver: 33333 },
  { bracket: 5, minComp: 83333, maxComp: 333332, baseTax: 16770.70, marginalRate: 0.30, excessOver: 83333 },
  { bracket: 6, minComp: 333333, maxComp: Infinity, baseTax: 91770.70, marginalRate: 0.35, excessOver: 333333 },
];

// 13th Month Pay & Other Benefits Tax Exemption Ceiling (NIRC Section 32(B)(7)(e))
export const TAX_EXEMPT_13TH_MONTH_CEILING: VerifiedValue<number> = {
  value: 90000,
  unit: 'PHP/year',
  validFrom: '2018-01-01',
  validTo: null,
  source: 'NIRC Sec 32(B)(7)(e) / RA 10963',
  verifiedOn: '2026-11-18',
  confidence: 'high',
};

// SSS Pension Constants (RA 11199 & EO 54)
export const SSS_PENSION_ADDITIONAL_BENEFIT: VerifiedValue<number> = {
  value: 1000,
  unit: 'PHP/month',
  validFrom: '2017-01-01',
  validTo: null,
  source: 'Executive Order No. 54 / SSS Guidelines',
  verifiedOn: '2026-11-18',
  confidence: 'high',
};

export const SSS_MIN_PENSION_10_CYS: VerifiedValue<number> = {
  value: 1200,
  unit: 'PHP/month',
  validFrom: '1997-05-01',
  validTo: null,
  source: 'RA 11199 Section 12',
  verifiedOn: '2026-11-18',
  confidence: 'high',
};

export const SSS_MIN_PENSION_20_CYS: VerifiedValue<number> = {
  value: 2400,
  unit: 'PHP/month',
  validFrom: '1997-05-01',
  validTo: null,
  source: 'RA 11199 Section 12',
  verifiedOn: '2026-11-18',
  confidence: 'high',
};

// SSS Salary Loan Constants (Circular No. 2025-004)
export const SSS_LOAN_INTEREST_RATE_STANDARD: VerifiedValue<number> = {
  value: 8.0,
  unit: '% p.a. (diminishing)',
  validFrom: '2025-06-01',
  validTo: null,
  source: 'SSS Circular No. 2025-004',
  verifiedOn: '2026-11-18',
  confidence: 'high',
};

export const SSS_LOAN_INTEREST_RATE_CONDONED: VerifiedValue<number> = {
  value: 10.0,
  unit: '% p.a. (diminishing)',
  validFrom: '2025-06-01',
  validTo: null,
  source: 'SSS Circular No. 2025-004',
  verifiedOn: '2026-11-18',
  confidence: 'high',
};

export const SSS_LOAN_SERVICE_FEE_RATE: VerifiedValue<number> = {
  value: 1.0,
  unit: '% of loan amount',
  validFrom: '2025-06-01',
  validTo: null,
  source: 'SSS Circular No. 2025-004',
  verifiedOn: '2026-11-18',
  confidence: 'high',
};

export const SSS_LOAN_TERM_MONTHS: VerifiedValue<number> = {
  value: 24,
  unit: 'months',
  validFrom: '2025-06-01',
  validTo: null,
  source: 'SSS Circular No. 2025-004',
  verifiedOn: '2026-11-18',
  confidence: 'high',
};

export const SSS_LOAN_MAX_MSC_BASIS: VerifiedValue<number> = {
  value: 20000,
  unit: 'PHP',
  validFrom: '2025-06-01',
  validTo: null,
  source: 'SSS Circular No. 2025-004',
  verifiedOn: '2026-11-18',
  confidence: 'high',
};
