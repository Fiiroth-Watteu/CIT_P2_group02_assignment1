// Part A - arrays and types
//
// Fill in each TODO. Do not change the signatures: the parameter types and
// the return types are part of the task.
//
//     npm run build
//     npm start

import { Student, Enrolment, students, courses, enrolments } from './data.js';

// --- A1. The grade report -------------------------------------------------

/**
 * One line per enrolment of a student, in the order the enrolments appear:
 *
 *     CS-101 Intro. to Computer Science: 12
 *     BIO-301 Genetics: not awarded
 *
 * A grade of null is "not awarded". The lines are joined with a newline, and
 * a student with no enrolments gives an empty string.
 *
 * You need enrolments and courses. filter, map, find, a template literal and
 * join. No for loops in this file.
 */
export function gradeReport(studentId: string): string {
  //wip
  //how am i supposed to find the correct course name? how do i compare a courseid from the enrolments with the id of the courses itself to get the course name?
  const output = enrolments
  .filter(g => g.studentId === studentId)
  .map(g => `${g.courseId} ${courses.find(c => c.courseId === g.courseId)?.title}: ${g.grade}`)
  .join("\n");
  return output;
  //what is the question mark after the find() for the courses array?!? why is it needed there????? what does it do with the array? googling for 3 DAYS turns up nothing relating to arrays
  //throw new Error('not implemented');
}

// --- A2. Averaging --------------------------------------------------------

/**
 * The average of a student's awarded grades, on the Danish 7-point scale
 * (12, 10, 7, 4, 02, 00, -3), rounded to one decimal.
 *
 * Grades are stored as strings, so '02' and '00' keep their leading zero.
 * Enrolments with no grade yet do not count. A student with no awarded
 * grades gives 0: divide only when there is something to divide by.
 *
 *     averageGrade('00128')   // 11  (12 and 10)
 */
export function averageGrade(studentId: string): number {
  //collect the relevant entries for the given studentid that also have grades that are awarded (not null)

  const input = enrolments.filter(g => g.studentId === studentId && g.grade != null);
  if(input.length == 0) {
    return 0;
  }
  let grades = input.map(g => g.grade)
  .filter((g): g is string => g != null)
  .map(g => parseInt(g));
  const output = grades.reduce((t, ag) => t + ag, 0) / grades.length;
  return output;
}

// --- A3. Who is missing a grade ------------------------------------------

/**
 * The names of the students who have at least one enrolment without a grade,
 * sorted alphabetically and without repeats.
 */
export function awaitingGrades(): string[] {
  // wip
  const noGradeStudent = enrolments.filter(ng => ng.grade === null)
  .map(ng => students.filter(ngs => ngs.id === ng.studentId))
  .filter((ngn): ngn is string => ngn != null)
  return noGradeNames;
  //throw new Error('not implemented');
}

// --- A4. A family of formatters ------------------------------------------

/**
 * Returns a function that formats a student in the chosen style:
 *
 *     formatterFor('short')(student)   // 'Zhang'
 *     formatterFor('long')(student)    // 'Zhang (Comp. Sci.), 102 credits'
 *
 * The style may only be one of two strings. Try passing 'medium' and read
 * the error the compiler gives you.
 */
export function formatterFor(style: 'short' | 'long'): (student: Student) => string {
  // TODO
  throw new Error('not implemented');
}

// --- A5. Changing nothing -------------------------------------------------

/**
 * A new array in which the students of one department have extra credits.
 * Everyone else is unchanged, and the students array itself must not change
 * at all: build new objects with the three dots.
 */
export function raiseCredits(list: Student[], deptName: string, extra: number): Student[] {
  // TODO
  throw new Error('not implemented');
}
