import {
  NUC_STANDARD_GRADE_SCALE,
  NUC_DEGREE_CLASSIFICATIONS,
  NBTE_STANDARD_GRADE_SCALE,
  NBTE_DIPLOMA_CLASSIFICATIONS,
  NUC_MAX_SCALE,
  NBTE_MAX_SCALE,
  UniversityGradeScale,
  PolytechnicGradeScale,
} from '@/rules/ng/grading';

export type GradingSystem = 'university_5_point' | 'polytechnic_4_point';

export interface CourseEntry {
  id: string;
  code: string;
  title?: string;
  units: number;
  score?: number;
  grade?: string;
  isRetake?: boolean;
}

export interface CourseCalculationResult extends CourseEntry {
  grade: string;
  gradePoint: number;
  qualityPoints: number;
}

export interface SemesterResult {
  semesterId: string;
  name: string;
  courses: CourseCalculationResult[];
  totalUnits: number;
  totalQualityPoints: number;
  gpa: number;
}

export interface CgpaResult {
  system: GradingSystem;
  semesters: SemesterResult[];
  semesterResults?: SemesterResult[];
  totalUnits: number;
  totalQualityPoints: number;
  cgpa: number;
  classification: string;
  classificationDescription: string;
  maxScale: number;
}

export interface TargetCgpaInputs {
  currentCgpa: number;
  currentUnits: number;
  targetCgpa: number;
  remainingUnits: number;
  system?: GradingSystem;
}

export interface TargetCgpaResult {
  system: GradingSystem;
  currentCgpa: number;
  currentUnits: number;
  targetCgpa: number;
  remainingUnits: number;
  requiredSemesterGpa: number;
  isAchievable: boolean;
  maxAchievableCgpa: number;
  message: string;
}

/**
 * Convert raw numerical percentage score to letter grade and grade point.
 */
export function scoreToGrade(
  score: number,
  system: GradingSystem = 'university_5_point'
): { grade: string; gradePoint: number } {
  const clampedScore = Math.max(0, Math.min(100, Math.round(score)));

  if (system === 'polytechnic_4_point') {
    const scale = NBTE_STANDARD_GRADE_SCALE.find(
      s => clampedScore >= s.minScore && clampedScore <= s.maxScore
    );
    return scale ? { grade: scale.grade, gradePoint: scale.gradeWeight } : { grade: 'F', gradePoint: 0.0 };
  }

  // University 5.0 point scale
  const scale = NUC_STANDARD_GRADE_SCALE.find(
    s => clampedScore >= s.minScore && clampedScore <= s.maxScore
  );
  return scale ? { grade: scale.grade, gradePoint: scale.gradePoint } : { grade: 'F', gradePoint: 0.0 };
}

/**
 * Convert letter grade directly to grade point.
 */
export function letterGradeToPoint(
  grade: string,
  system: GradingSystem = 'university_5_point'
): number {
  const upper = grade.trim().toUpperCase();

  if (system === 'polytechnic_4_point') {
    const item = NBTE_STANDARD_GRADE_SCALE.find(s => s.grade === upper);
    return item ? item.gradeWeight : 0.0;
  }

  const item = NUC_STANDARD_GRADE_SCALE.find(s => s.grade === upper);
  return item ? item.gradePoint : 0.0;
}

/**
 * Determine degree or diploma classification from CGPA.
 */
export function getClassification(
  cgpa: number,
  system: GradingSystem = 'university_5_point'
): { classification: string; description: string } {
  if (system === 'polytechnic_4_point') {
    const match = NBTE_DIPLOMA_CLASSIFICATIONS.find(
      c => cgpa >= c.minCgpa && cgpa <= c.maxCgpa
    );
    return match
      ? { classification: match.classification, description: match.description }
      : { classification: 'Fail', description: 'Below minimum passing standard' };
  }

  const match = NUC_DEGREE_CLASSIFICATIONS.find(
    c => cgpa >= c.minCgpa && cgpa <= c.maxCgpa
  );
  return match
    ? { classification: match.classification, description: match.description }
    : { classification: 'Fail', description: 'Below minimum passing standard' };
}

/**
 * Calculate GPA for a list of courses in a semester.
 */
export function calculateSemesterGpa(
  courses: CourseEntry[],
  system: GradingSystem = 'university_5_point',
  semesterId: string = 'sem_1',
  semesterName: string = 'Semester 1'
): SemesterResult {
  let totalUnits = 0;
  let totalQualityPoints = 0;

  const processedCourses: CourseCalculationResult[] = courses.map(course => {
    let grade = course.grade ? course.grade.trim().toUpperCase() : '';
    let gradePoint = 0;

    if (course.score !== undefined && course.score !== null) {
      const converted = scoreToGrade(course.score, system);
      grade = converted.grade;
      gradePoint = converted.gradePoint;
    } else if (grade) {
      gradePoint = letterGradeToPoint(grade, system);
    }

    const units = Math.max(0, course.units || 0);
    const qualityPoints = units * gradePoint;

    totalUnits += units;
    totalQualityPoints += qualityPoints;

    return {
      ...course,
      grade,
      gradePoint,
      qualityPoints: Math.round(qualityPoints * 100) / 100,
    };
  });

  const gpa = totalUnits > 0 ? totalQualityPoints / totalUnits : 0;

  return {
    semesterId,
    name: semesterName,
    courses: processedCourses,
    totalUnits,
    totalQualityPoints: Math.round(totalQualityPoints * 100) / 100,
    gpa: Math.round(gpa * 100) / 100,
  };
}

/**
 * Calculate Cumulative CGPA across multiple semesters.
 */
export function calculateCgpa(
  semesters: { id: string; name: string; courses: CourseEntry[] }[],
  system: GradingSystem = 'university_5_point'
): CgpaResult {
  const processedSemesters: SemesterResult[] = semesters.map(sem =>
    calculateSemesterGpa(sem.courses, system, sem.id, sem.name)
  );

  let cumulativeUnits = 0;
  let cumulativeQP = 0;

  processedSemesters.forEach(sem => {
    cumulativeUnits += sem.totalUnits;
    cumulativeQP += sem.totalQualityPoints;
  });

  const rawCgpa = cumulativeUnits > 0 ? cumulativeQP / cumulativeUnits : 0;
  const roundedCgpa = Math.round(rawCgpa * 100) / 100;
  const classInfo = getClassification(roundedCgpa, system);
  const maxScale = system === 'polytechnic_4_point' ? NBTE_MAX_SCALE.value : NUC_MAX_SCALE.value;

  return {
    system,
    semesters: processedSemesters,
    semesterResults: processedSemesters,
    totalUnits: cumulativeUnits,
    totalQualityPoints: Math.round(cumulativeQP * 100) / 100,
    cgpa: roundedCgpa,
    classification: classInfo.classification,
    classificationDescription: classInfo.description,
    maxScale,
  };
}

/**
 * Calculate required GPA to reach a target CGPA.
 */
export function calculateTargetCgpa(inputs: TargetCgpaInputs): TargetCgpaResult {
  const {
    currentCgpa,
    currentUnits,
    targetCgpa,
    remainingUnits,
    system = 'university_5_point',
  } = inputs;

  const maxScale = system === 'polytechnic_4_point' ? NBTE_MAX_SCALE.value : NUC_MAX_SCALE.value;

  if (remainingUnits <= 0) {
    return {
      system,
      currentCgpa,
      currentUnits,
      targetCgpa,
      remainingUnits,
      requiredSemesterGpa: 0,
      isAchievable: currentCgpa >= targetCgpa,
      maxAchievableCgpa: currentCgpa,
      message: currentCgpa >= targetCgpa
        ? 'Target already reached.'
        : 'Cannot change CGPA without remaining credit units.',
    };
  }

  const currentTqp = currentCgpa * currentUnits;
  const finalTotalUnits = currentUnits + remainingUnits;
  const requiredTotalTqp = targetCgpa * finalTotalUnits;
  const requiredSemesterTqp = requiredTotalTqp - currentTqp;
  const requiredGpa = requiredSemesterTqp / remainingUnits;

  // Maximum achievable CGPA if student scores straight 5.0 (or 4.0)
  const maxPossibleTqp = currentTqp + maxScale * remainingUnits;
  const maxAchievableCgpa = Math.round((maxPossibleTqp / finalTotalUnits) * 100) / 100;

  const roundedRequiredGpa = Math.round(requiredGpa * 100) / 100;

  if (requiredGpa > maxScale) {
    return {
      system,
      currentCgpa,
      currentUnits,
      targetCgpa,
      remainingUnits,
      requiredSemesterGpa: roundedRequiredGpa,
      isAchievable: false,
      maxAchievableCgpa,
      message: `A CGPA of ${targetCgpa.toFixed(2)} is mathematically impossible in ${remainingUnits} credit units. The maximum achievable CGPA with perfect grades (${maxScale.toFixed(1)} GPA) is ${maxAchievableCgpa.toFixed(2)}.`,
    };
  }

  if (requiredGpa <= 0) {
    return {
      system,
      currentCgpa,
      currentUnits,
      targetCgpa,
      remainingUnits,
      requiredSemesterGpa: 0,
      isAchievable: true,
      maxAchievableCgpa,
      message: `Your current CGPA is already well above ${targetCgpa.toFixed(2)}. You need a GPA of at least 0.00 to maintain this target.`,
    };
  }

  return {
    system,
    currentCgpa,
    currentUnits,
    targetCgpa,
    remainingUnits,
    requiredSemesterGpa: roundedRequiredGpa,
    isAchievable: true,
    maxAchievableCgpa,
    message: `You need an average semester GPA of ${roundedRequiredGpa.toFixed(2)} across your next ${remainingUnits} credit units to achieve a CGPA of ${targetCgpa.toFixed(2)}.`,
  };
}
