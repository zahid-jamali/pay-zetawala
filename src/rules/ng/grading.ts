/**
 * Nigeria Tertiary CGPA Grading Standards
 * Official Sources: National Universities Commission (NUC) BMAS & CCMAS Standards,
 * National Board for Technical Education (NBTE) Standard Curriculum & Specifications.
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

export interface UniversityGradeScale {
  grade: string;
  minScore: number;
  maxScore: number;
  gradePoint: number;
  description: string;
}

export interface DegreeClassification {
  classification: string;
  minCgpa: number;
  maxCgpa: number;
  description: string;
}

export interface PolytechnicGradeScale {
  grade: string;
  minScore: number;
  maxScore: number;
  gradeWeight: number;
  description: string;
}

export interface DiplomaClassification {
  classification: string;
  minCgpa: number;
  maxCgpa: number;
  description: string;
}

// NUC University Constants
export const NUC_MAX_SCALE: VerifiedValue<number> = {
  value: 5.0,
  unit: 'points',
  validFrom: '1989-01-01',
  validTo: null,
  source: 'NUC BMAS / CCMAS Guidelines',
  verifiedOn: '2026-11-18',
  confidence: 'high',
};

export const NUC_MIN_GRADUATION_CGPA: VerifiedValue<number> = {
  value: 1.50,
  unit: 'CGPA',
  validFrom: '2013-09-01',
  validTo: null,
  source: 'NUC Abolition of Pass Degree Policy',
  verifiedOn: '2026-11-18',
  confidence: 'high',
};

// Standard NUC 6-Tier University Letter Grade Scale (BMAS & CCMAS)
export const NUC_STANDARD_GRADE_SCALE: UniversityGradeScale[] = [
  { grade: 'A', minScore: 70, maxScore: 100, gradePoint: 5.0, description: 'Excellent' },
  { grade: 'B', minScore: 60, maxScore: 69, gradePoint: 4.0, description: 'Very Good' },
  { grade: 'C', minScore: 50, maxScore: 59, gradePoint: 3.0, description: 'Good' },
  { grade: 'D', minScore: 45, maxScore: 49, gradePoint: 2.0, description: 'Fair / Pass' },
  { grade: 'E', minScore: 40, maxScore: 44, gradePoint: 1.0, description: 'Pass' },
  { grade: 'F', minScore: 0, maxScore: 39, gradePoint: 0.0, description: 'Fail' },
];

// NUC 5-Tier Variant (Universities that removed Grade E)
export const NUC_NO_E_GRADE_SCALE: UniversityGradeScale[] = [
  { grade: 'A', minScore: 70, maxScore: 100, gradePoint: 5.0, description: 'Excellent' },
  { grade: 'B', minScore: 60, maxScore: 69, gradePoint: 4.0, description: 'Very Good' },
  { grade: 'C', minScore: 50, maxScore: 59, gradePoint: 3.0, description: 'Good' },
  { grade: 'D', minScore: 45, maxScore: 49, gradePoint: 2.0, description: 'Pass' },
  { grade: 'F', minScore: 0, maxScore: 44, gradePoint: 0.0, description: 'Fail' },
];

// NUC University Degree Classifications
export const NUC_DEGREE_CLASSIFICATIONS: DegreeClassification[] = [
  { classification: 'First Class Honours', minCgpa: 4.50, maxCgpa: 5.00, description: 'Highest academic honour' },
  { classification: 'Second Class Honours (Upper Division)', minCgpa: 3.50, maxCgpa: 4.49, description: '2:1 honours' },
  { classification: 'Second Class Honours (Lower Division)', minCgpa: 2.40, maxCgpa: 3.49, description: '2:2 honours' },
  { classification: 'Third Class Honours', minCgpa: 1.50, maxCgpa: 2.39, description: '3rd class honours' },
  { classification: 'Pass', minCgpa: 1.00, maxCgpa: 1.49, description: 'Abolished by NUC; retained for legacy cohorts' },
];

// NBTE Polytechnic Constants (ND & HND Programs)
export const NBTE_MAX_SCALE: VerifiedValue<number> = {
  value: 4.0,
  unit: 'points',
  validFrom: '2001-01-01',
  validTo: null,
  source: 'NBTE Curriculum & Course Specifications',
  verifiedOn: '2026-11-18',
  confidence: 'high',
};

export const NBTE_MIN_GRADUATION_CGPA: VerifiedValue<number> = {
  value: 2.00,
  unit: 'CGPA',
  validFrom: '2001-01-01',
  validTo: null,
  source: 'NBTE Curriculum Standards',
  verifiedOn: '2026-11-18',
  confidence: 'high',
};

// NBTE Standard Course Marking Scheme (4.0 Scale)
export const NBTE_STANDARD_GRADE_SCALE: PolytechnicGradeScale[] = [
  { grade: 'A', minScore: 75, maxScore: 100, gradeWeight: 4.00, description: 'Distinction' },
  { grade: 'AB', minScore: 70, maxScore: 74, gradeWeight: 3.50, description: 'Very Good' },
  { grade: 'B', minScore: 65, maxScore: 69, gradeWeight: 3.25, description: 'Good' },
  { grade: 'BC', minScore: 60, maxScore: 64, gradeWeight: 3.00, description: 'Above Average' },
  { grade: 'C', minScore: 55, maxScore: 59, gradeWeight: 2.75, description: 'Average' },
  { grade: 'CD', minScore: 50, maxScore: 54, gradeWeight: 2.50, description: 'Fair' },
  { grade: 'D', minScore: 45, maxScore: 49, gradeWeight: 2.25, description: 'Pass' },
  { grade: 'E', minScore: 40, maxScore: 44, gradeWeight: 2.00, description: 'Poor Pass' },
  { grade: 'F', minScore: 0, maxScore: 39, gradeWeight: 0.00, description: 'Fail' },
];

// NBTE Polytechnic Diploma Classifications (ND / HND)
export const NBTE_DIPLOMA_CLASSIFICATIONS: DiplomaClassification[] = [
  { classification: 'Distinction', minCgpa: 3.50, maxCgpa: 4.00, description: 'Distinction award' },
  { classification: 'Upper Credit', minCgpa: 3.00, maxCgpa: 3.49, description: 'Upper credit award' },
  { classification: 'Lower Credit', minCgpa: 2.50, maxCgpa: 2.99, description: 'Lower credit award' },
  { classification: 'Pass', minCgpa: 2.00, maxCgpa: 2.49, description: 'Pass award' },
  { classification: 'Fail', minCgpa: 0.00, maxCgpa: 1.99, description: 'Unsatisfactory performance' },
];

// Repeated Course Policy Rule (Cumulative Inclusion)
export const REPEATED_COURSE_HANDLING: VerifiedValue<string> = {
  value: 'cumulative_retention',
  unit: 'policy_string',
  validFrom: '1989-01-01',
  validTo: null,
  source: 'NUC BMAS / NBTE Standard Regulations',
  verifiedOn: '2026-11-18',
  confidence: 'high',
};
