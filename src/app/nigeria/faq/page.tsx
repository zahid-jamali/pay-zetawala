import React from 'react';
import { FaqHubPage, FaqCategorySection } from '@/components/FaqHubPage';
import { getNgGrading } from '@/lib/seo/rules-content';

export default function NigeriaFaqPage() {
  const ng = getNgGrading();

  const categories: FaqCategorySection[] = [
    {
      id: 'nuc-grading',
      title: 'NUC 5-Point Grading Scale & Cut-Offs',
      description: 'Official National Universities Commission (NUC) score ranges, grade letters, and grade points.',
      items: [
        {
          question: 'What is the standard university grading scale in Nigeria?',
          answer: 'The National Universities Commission (NUC) Benchmark Minimum Academic Standards (BMAS/CCMAS) mandate a 5.0 cumulative grade point average (CGPA) system: A (70-100%, 5 points), B (60-69%, 4 points), C (50-59%, 3 points), D (45-49%, 2 points), and F (0-44%, 0 points). Grade E was abolished in standard federal guidelines.',
          plainAnswer: 'The NUC 5.0 scale: A (70-100%, 5 pts), B (60-69%, 4 pts), C (50-59%, 3 pts), D (45-49%, 2 pts), and F (0-44%, 0 pts).',
        },
        {
          question: 'What CGPA is required for First Class Honours in Nigeria?',
          answer: `Under standard NUC guidelines, a Cumulative Grade Point Average of ${ng.firstClassMin.toFixed(2)} to ${ng.nucMaxScale.toFixed(2)} is required to graduate with First Class Honours.`,
          plainAnswer: `A CGPA between ${ng.firstClassMin.toFixed(2)} and ${ng.nucMaxScale.toFixed(2)} earns First Class Honours.`,
        },
        {
          question: 'What are the CGPA ranges for Second Class Upper (2:1) and Lower (2:2)?',
          answer: `Second Class Honours (Upper Division / 2:1) requires a CGPA of ${ng.secondUpperMin.toFixed(2)} to ${(ng.firstClassMin - 0.01).toFixed(2)}. Second Class Honours (Lower Division / 2:2) requires a CGPA of ${ng.secondLowerMin.toFixed(2)} to ${(ng.secondUpperMin - 0.01).toFixed(2)}.`,
          plainAnswer: `Second Class Upper (2:1) is ${ng.secondUpperMin.toFixed(2)}–${(ng.firstClassMin - 0.01).toFixed(2)}; Second Class Lower (2:2) is ${ng.secondLowerMin.toFixed(2)}–${(ng.secondUpperMin - 0.01).toFixed(2)}.`,
        },
        {
          question: 'What is the minimum CGPA to avoid probation or withdrawal?',
          answer: 'Most Nigerian universities place students on academic probation if their CGPA falls below 1.50 (or 1.00 in some institutions) at the end of a session. Failing to raise it after probation leads to withdrawal or transfer.',
          plainAnswer: 'A CGPA below 1.50 typically triggers academic probation; failing to improve leads to advised withdrawal.',
        },
        {
          question: 'What is Third Class and Pass degree?',
          answer: `Third Class Honours is awarded for a CGPA of ${ng.thirdClassMin.toFixed(2)} to ${(ng.secondLowerMin - 0.01).toFixed(2)}. A Pass degree is awarded for a CGPA of 1.00 to ${(ng.thirdClassMin - 0.01).toFixed(2)}, although many universities have phased out Pass degrees.`,
          plainAnswer: `Third Class is ${ng.thirdClassMin.toFixed(2)}–${(ng.secondLowerMin - 0.01).toFixed(2)}. Below 1.50 is either a Pass or academic failure depending on the university.`,
        },
      ],
    },
    {
      id: 'gpa-cgpa-formulas',
      title: 'How GPA and CGPA Are Calculated',
      description: 'Mathematical formulas for Grade Points, Quality Points, Total Credit Units, and Cumulative GPA.',
      items: [
        {
          question: 'What is the formula for calculating Semester GPA?',
          answer: 'Semester GPA = Total Quality Points (TQP) ÷ Total Credit Units (TCU). Quality points for each course are calculated as: Credit Units × Grade Point (e.g. 3 units × 5 points for an A = 15 QP). Sum all course QPs and divide by total units.',
          plainAnswer: 'GPA = Total Quality Points (Credit Units × Grade Points) divided by Total Credit Units.',
        },
        {
          question: 'What is the difference between GPA and CGPA?',
          answer: 'GPA (Grade Point Average) measures your academic performance during a single semester. CGPA (Cumulative Grade Point Average) measures your overall academic standing from Year 1 through your current semester across all registered courses.',
          plainAnswer: 'GPA is for a single semester; CGPA is the cumulative weighted average across all semesters combined.',
        },
        {
          question: 'Can you calculate CGPA by simply averaging your semester GPAs?',
          answer: 'No! Simply adding semester GPAs and dividing by the number of semesters is a common mistake. Because semesters often have different total credit units (e.g. 21 units vs 16 units), CGPA must be computed as: Total Cumulative Quality Points (all semesters) ÷ Total Cumulative Credit Units (all semesters).',
          plainAnswer: 'No. CGPA must be calculated using cumulative quality points divided by cumulative credit units, weighting semesters by their unit load.',
        },
        {
          question: 'Do general studies (GST) courses carry the same weight as departmental courses?',
          answer: 'Yes, proportionally to their credit units. A 2-unit GST course carries the exact same weight as a 2-unit core engineering or law course. Every registered credit unit impacts your CGPA equally regardless of course code.',
          plainAnswer: 'Yes. Course weight is determined strictly by its credit units (e.g. 2 units or 3 units), not by whether it is GST or departmental.',
        },
      ],
    },
    {
      id: 'polytechnic-nbte',
      title: 'Polytechnic NBTE 4.0 Grading System',
      description: 'National Board for Technical Education (NBTE) classification for ND and HND programs.',
      items: [
        {
          question: 'What is the official grading scale for Nigerian Polytechnics?',
          answer: `The National Board for Technical Education (NBTE) uses a ${ng.nbteMaxScale.toFixed(1)} scale: Distinction (3.50-4.00), Upper Credit (3.00-3.49), Lower Credit (2.50-2.99), and Pass (2.00-2.49). Below 2.00 is a Fail.`,
          plainAnswer: `The NBTE 4.0 scale: Distinction (3.50–4.00), Upper Credit (3.00–3.49), Lower Credit (2.50–2.99), and Pass (2.00–2.49).`,
        },
        {
          question: 'Is an HND Upper Credit equivalent to a University Second Class Upper?',
          answer: 'For employment and public service entry, NBTE Upper Credit (3.00-3.49 on 4.0 scale) is generally treated as equivalent to Second Class Upper (3.50-4.49 on 5.0 scale), while Distinction is comparable to First Class.',
          plainAnswer: 'Yes. An Upper Credit in ND/HND is broadly recognized as equivalent to a University Second Class Upper (2:1).',
        },
        {
          question: 'Do National Diploma (ND) grades combine with Higher National Diploma (HND) grades?',
          answer: 'No. ND and HND are treated as separate academic credentials. You graduate with a distinct ND CGPA on completion of your 2-year National Diploma, and a fresh CGPA starts from scratch for your 2-year HND program.',
          plainAnswer: 'No. ND and HND programs have independent CGPAs and separate graduation certificates.',
        },
      ],
    },
    {
      id: 'carryovers-spills',
      title: 'Carryover Courses, Spilling & Grade Forgiveness',
      description: 'How failed courses affect your transcripts, units, and graduation timeline.',
      items: [
        {
          question: 'How does an F (Carryover) affect your CGPA?',
          answer: 'An F awards 0 quality points, but the credit units are still counted in your Total Credit Units denominator. When you retake the course, the new grade points and the retake units are added to your cumulative record in most universities.',
          plainAnswer: 'An F adds 0 quality points while adding full credit units to the denominator, dragging down your average until cleared.',
        },
        {
          question: 'Does retaking a course replace the old F on your transcript?',
          answer: 'In the majority of Nigerian public and private universities, the original F remains on your transcript alongside the new passing grade. Both sets of units and points are computed into the cumulative CGPA unless your institution operates a specific grade replacement policy.',
          plainAnswer: 'Usually both attempts appear on the transcript and factor into the cumulative totals, though some private universities offer grade replacement.',
        },
        {
          question: 'What is a "spillover" year in Nigerian universities?',
          answer: 'A spillover (spill) occurs when a student fails to pass all mandatory core courses or earn sufficient credit units to graduate within the standard duration (e.g. 4 or 5 years), requiring an additional session to clear carryovers.',
          plainAnswer: 'A spillover is an extra semester or academic year required to clear outstanding failed courses before graduation.',
        },
        {
          question: 'Can you graduate if you have an uncleared elective course?',
          answer: 'If the course is an elective and you have already satisfied the minimum total elective credit units required for graduation by your department, an uncleared elective will not stop your graduation, though the F will affect your final CGPA.',
          plainAnswer: 'Yes, provided you have satisfied all department core requirements and met the minimum total credit units.',
        },
      ],
    },
    {
      id: 'improving-cgpa',
      title: 'Target CGPA & Academic Recovery',
      description: 'Mathematical realities of moving from 2:2 to 2:1, unit deficits, and final year strategies.',
      items: [
        {
          question: 'Is it possible to move from Second Class Lower (2:2) to Second Class Upper (2:1)?',
          answer: 'Yes, but it depends heavily on your current academic level and unit accumulation. Recovering in 200 Level or 300 Level is very achievable with consistent 4.0+ semester GPAs. In final year (400L/500L), recovery requires achieving straight A\'s across high-unit courses.',
          plainAnswer: 'Yes. It is easiest in 200L/300L with consistent 4.0+ GPAs, while final year recovery requires near-perfect grades due to accumulated units.',
        },
        {
          question: 'Why does your CGPA become harder to change in final year?',
          answer: 'Because of mathematical weighting. In Year 1, 20 credit units represent 100% of your total. By Year 4, you may have accumulated 120 credit units, meaning 20 new units only represent 14% of your total cumulative weight. Each new semester has a diminishing mathematical effect.',
          plainAnswer: 'Because accumulated total credit units dilute the mathematical weight of any single semester\'s grades.',
        },
        {
          question: 'How do project units and SIWES/internships impact your final CGPA?',
          answer: 'Final year research projects typically carry 4 to 6 credit units, and SIWES/industrial attachment carries 3 to 6 units. Because of their heavy unit weighting, scoring an A (5.0) in these practical courses provides a significant boost to your graduating CGPA.',
          plainAnswer: 'Project and SIWES courses carry 4 to 6 credit units each, making an A in these courses a powerful boost to your final standing.',
        },
      ],
    },
  ];

  return (
    <FaqHubPage
      countryName="Nigeria"
      countryFlag="🇳🇬"
      title="Nigeria University CGPA & Grading FAQs (2026)"
      description="Official answers to top questions about NUC 5.0 degree classification thresholds, First Class and 2:1 cut-offs, polytechnic NBTE 4.0 scales, carryover course mathematics, and semester GPA calculation."
      breadcrumbs={[
        { name: 'Home', url: '/' },
        { name: 'Nigeria', url: '/nigeria/' },
        { name: 'Frequently Asked Questions', url: '/nigeria/faq/' },
      ]}
      categories={categories}
      relatedTools={[
        {
          title: 'University CGPA Calculator (5.0 Scale)',
          href: '/nigeria/cgpa-calculator/',
          description: 'Calculate your cumulative CGPA across up to 10 semesters with auto-save and NUC degree class prediction.',
        },
        {
          title: 'Polytechnic CGPA Calculator (4.0 Scale)',
          href: '/nigeria/polytechnic-cgpa-calculator/',
          description: 'NBTE 4.0 grading tool for ND and HND students with Distinction and Upper Credit classifications.',
        },
        {
          title: 'Semester GPA Calculator',
          href: '/nigeria/gpa-calculator/',
          description: 'Compute single-semester grade point average with course unit weights and quality points breakdown.',
        },
        {
          title: 'Target CGPA Calculator',
          href: '/nigeria/target-cgpa-calculator/',
          description: 'Find out the exact GPA required in remaining semesters to achieve First Class or 2:1.',
        },
      ]}
      relatedGuides={[
        {
          title: 'How to Calculate CGPA Manually in Nigerian Universities',
          href: '/nigeria/guides/how-to-calculate-cgpa-manually/',
          description: 'Step-by-step mathematical guide to quality points, credit units, and NUC formulas with worked examples.',
        },
        {
          title: 'Nigerian University Degree Classification Explained',
          href: '/nigeria/guides/nigerian-degree-classification/',
          description: 'Full analysis of First Class, 2:1, 2:2, Third Class cut-offs and career implications.',
        },
        {
          title: 'How to Move from Second Class Lower to Upper',
          href: '/nigeria/guides/how-to-move-from-second-class-lower-to-upper/',
          description: 'Mathematical recovery plan for 200L, 300L, and 400L students seeking to cross the 3.50 threshold.',
        },
        {
          title: 'Polytechnic Grading System Explained (NBTE 4.0 Scale)',
          href: '/nigeria/guides/polytechnic-grading-system-explained/',
          description: 'ND and HND grading standards, Distinction thresholds, and comparisons with university systems.',
        },
      ]}
      sources={[
        {
          title: 'National Universities Commission (NUC) BMAS/CCMAS Guidelines',
          url: 'https://www.nuc.edu.ng',
          authority: 'National Universities Commission',
        },
        {
          title: 'National Board for Technical Education (NBTE) Curriculum & Grading Standards',
          url: 'https://www.nbte.gov.ng',
          authority: 'National Board for Technical Education',
        },
      ]}
      ratesCheckedDate="November 2026"
    />
  );
}
