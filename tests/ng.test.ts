import { describe, it, expect } from 'vitest';
import {
  calculateSemesterGpa,
  calculateCgpa,
  calculateTargetCgpa,
  scoreToGrade,
  getClassification,
} from '../src/lib/ng/cgpa';

describe('Nigeria Tertiary CGPA Calculations (Test Vectors)', () => {
  it('NG-CGPA-01: University Semester GPA Calculation', () => {
    const courses = [
      { id: '1', code: 'MTH 101', units: 3, score: 76 }, // A (5.0) -> 15.0
      { id: '2', code: 'PHY 101', units: 3, score: 64 }, // B (4.0) -> 12.0
      { id: '3', code: 'CHM 101', units: 3, score: 53 }, // C (3.0) -> 9.0
      { id: '4', code: 'BIO 101', units: 2, score: 47 }, // D (2.0) -> 4.0
      { id: '5', code: 'GST 101', units: 2, score: 42 }, // E (1.0) -> 2.0
    ];

    const res = calculateSemesterGpa(courses, 'university_5_point');
    expect(res.totalUnits).toBe(13);
    expect(res.totalQualityPoints).toBe(42.0);
    expect(res.gpa).toBe(3.23);
  });

  it('NG-CGPA-02: University Degree Class Boundary (4.50 vs 4.49)', () => {
    // Exactly 4.50
    expect(getClassification(4.50, 'university_5_point').classification).toBe('First Class Honours');
    // Exactly 4.49
    expect(getClassification(4.49, 'university_5_point').classification).toBe('Second Class Honours (Upper Division)');
  });

  it('NG-CGPA-03: University Intermediate Class Boundaries', () => {
    expect(getClassification(3.50, 'university_5_point').classification).toBe('Second Class Honours (Upper Division)');
    expect(getClassification(3.49, 'university_5_point').classification).toBe('Second Class Honours (Lower Division)');
    expect(getClassification(2.40, 'university_5_point').classification).toBe('Second Class Honours (Lower Division)');
    expect(getClassification(2.39, 'university_5_point').classification).toBe('Third Class Honours');
    expect(getClassification(1.50, 'university_5_point').classification).toBe('Third Class Honours');
    expect(getClassification(1.49, 'university_5_point').classification).toBe('Pass');
    expect(getClassification(0.99, 'university_5_point').classification).toBe('Fail');
  });

  it('NG-CGPA-04: Repeated / Carryover Course Under NUC Cumulative Rule', () => {
    const semesters = [
      {
        id: 'sem1',
        name: 'Year 1 Sem 1',
        courses: [
          { id: 'c1', code: 'CVE 201', units: 3, score: 35 }, // Grade F (0.0 GP) -> 0.0 QP
        ],
      },
      {
        id: 'sem2',
        name: 'Year 2 Sem 1',
        courses: [
          { id: 'c2', code: 'CVE 201', units: 3, score: 65, isRetake: true }, // Grade B (4.0 GP) -> 12.0 QP
        ],
      },
    ];

    const res = calculateCgpa(semesters, 'university_5_point');
    expect(res.totalUnits).toBe(6);
    expect(res.totalQualityPoints).toBe(12.0);
    expect(res.cgpa).toBe(2.0); // 12.0 / 6 = 2.00
  });

  it('NG-CGPA-05: Polytechnic NBTE 4.0 Scale Calculation', () => {
    const courses = [
      { id: '1', code: 'COM 111', units: 3, score: 82 }, // A (4.00) -> 12.00
      { id: '2', code: 'COM 112', units: 3, score: 72 }, // AB (3.50) -> 10.50
      { id: '3', code: 'COM 113', units: 2, score: 67 }, // B (3.25) -> 6.50
      { id: '4', code: 'GNS 101', units: 2, score: 61 }, // BC (3.00) -> 6.00
      { id: '5', code: 'MTH 111', units: 3, score: 56 }, // C (2.75) -> 8.25
    ];

    const res = calculateSemesterGpa(courses, 'polytechnic_4_point');
    expect(res.totalUnits).toBe(13);
    expect(res.totalQualityPoints).toBe(43.25);
    expect(res.gpa).toBe(3.33);

    const classification = getClassification(res.gpa, 'polytechnic_4_point');
    expect(classification.classification).toBe('Upper Credit');
  });

  it('NG-CGPA-06: Polytechnic Distinction Boundary (3.50)', () => {
    expect(getClassification(3.50, 'polytechnic_4_point').classification).toBe('Distinction');
    expect(getClassification(3.49, 'polytechnic_4_point').classification).toBe('Upper Credit');
  });

  it('Target CGPA Calculator identifies achievable vs impossible targets', () => {
    // Achievable: Current 3.20 on 60 units, target 3.50 with 60 remaining units
    // (3.50 * 120 - 3.20 * 60) / 60 = (420 - 192) / 60 = 228 / 60 = 3.80
    const achievable = calculateTargetCgpa({
      currentCgpa: 3.20,
      currentUnits: 60,
      targetCgpa: 3.50,
      remainingUnits: 60,
      system: 'university_5_point',
    });
    expect(achievable.isAchievable).toBe(true);
    expect(achievable.requiredSemesterGpa).toBe(3.80);

    // Impossible: Current 2.0 on 100 units, target 4.50 with 20 remaining units
    // Max possible = (200 + 100) / 120 = 2.50
    const impossible = calculateTargetCgpa({
      currentCgpa: 2.00,
      currentUnits: 100,
      targetCgpa: 4.50,
      remainingUnits: 20,
      system: 'university_5_point',
    });
    expect(impossible.isAchievable).toBe(false);
    expect(impossible.maxAchievableCgpa).toBe(2.50);
  });
});
