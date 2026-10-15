// Part A - arrays and types
//
// Fill in each TODO. Do not change the signatures: the parameter types and
// the return types are part of the task.
//
//     npm run build
//     npm start

import { parse } from 'path';
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

/* v1: filter the student's enrolments
const mine = enrolments.filter(e => e.studentId === studentId);
console.log(mine);

v2: find one course (fixed id, just to test find)
const kursus = courses.find(c => c.courseId === 'BIO-101');
console.log(kursus);

v3: map each enrolment to its course id
const ider = mine.map(e => e.courseId);
console.log(ider);

v4: find the course for every enrolment, keep the title
const titler = mine.map(e => {
  const kursus = courses.find(c => c.courseId === e.courseId);
  return kursus?.title;
});
console.log(titler);

v5: one line of text per enrolment (now the map in the final version)
The final version is v5 plus join. */

export function gradeReport(studentId: string): string {
  /* the student's enrolments (empty array if there are none) */
  const myEnrollments = enrolments.filter(e => e.studentId === studentId);

  const linjer = myEnrollments.map(e => {
    /* an enrolment only has the course id, so look up the course for the title */
    const kursus = courses.find(c => c.courseId === e.courseId);
    /* ?? only applies to null, so grades like '02' are left alone */
    return `${e.courseId} ${kursus?.title}: ${e.grade ?? 'not awarded'}`;
  });

  /* one block of text, newline between lines ([] gives '') */
  return linjer.join('\n');
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

  /* the student's enrolments (empty array if there are none) */
  const myEnrollments = enrolments.filter(e => e.studentId === studentId);
  
  /* a constant that gets all the grades from enrollments without the ones that haven't been graded */
  //const myEnrollmentsWithGrades = myEnrollments.filter(e => e.grade !== null);
  /* Constant that takes the grades(as strings) and maps them into an array of numbers. We use radix 10 to use the normal 10-number system */
  //const gradesAsNumbers = myEnrollmentsWithGrades.map(e => parseInt(e.grade as string, 10));

  const gradesAsNumbers = myEnrollments
  .map(e => e.grade)                          // e.grade is string | null []
  .filter((g): g is string => g !== null)    // g is a string[]
  .map(g => parseInt(g, 10));                // g is now a number[]
  
  // If there are no grades, return 0 to avoid division by zero
  if (gradesAsNumbers.length === 0) {
    return 0;
  }

  const initialvalue = 0;
  
  // Use reduce to calculate the sum of the grades divided by the number of grades to get the average. The initial value is set to 0.
  const average = gradesAsNumbers.reduce((acc, grade) => acc + grade / gradesAsNumbers.length, initialvalue );
  
  /* Math.round only rounds to whole numbers, so shift one decimal first. Example with grades 0, 10 and 7: average 5.666 -> * 10 = 56.66 -> round = 57 -> / 10 = 5.7 */
  return Math.round(average * 10) / 10;

}
// --- A3. Who is missing a grade ------------------------------------------

/**
 * The names of the students who have at least one enrolment without a grade,
 * sorted alphabetically and without repeats.
 */
export function awaitingGrades(): string[] {
  const names = enrolments
    /* keep only the enrolments that are still waiting for a grade */
    .filter(e => e.grade === null)
    /* look up each student by id and take the name (undefined if not found) */
    .map(e => students.find(s => s.id === e.studentId)?.name)
    /* drop the undefined values, so TypeScript knows this is string[] */
    .filter((n): n is string => n !== undefined);

  /* keep a name only at its first position, so every name appears once */
  const unique = names.filter((navn, i) => names.indexOf(navn) === i);

  /* localeCompare sorts by language rules; plain sort() compares raw character codes, which puts æ, ø and å in the wrong place */
  return unique.sort((a, b) => a.localeCompare(b, 'da'));
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
