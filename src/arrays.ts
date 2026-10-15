// Part A - arrays and types
//
// Fill in each TODO. Do not change the signatures: the parameter types and
// the return types are part of the task.
//
//     npm run build
//     npm start

// This file contains functions for working with student grades,
// enrolments, and student information.
// The functions use array methods to process the data.

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

/**
 * Creates a grade report for a student.
 * Filters enrolments using the student ID.
 * Finds the course title for each enrolment.
 * Displays "not awarded" if the grade is null.
 * Joins all report lines with newline characters.
 */

export function gradeReport(studentId: string): string {
  return enrolments
    .filter((enrolment) => enrolment.studentId === studentId)
    .map((enrolment) => {
      const course = courses.find(
        (course) => course.courseId === enrolment.courseId
      );

      const grade = enrolment.grade === null
        ? 'not awarded'
        : enrolment.grade;

      return `${enrolment.courseId} ${course?.title}: ${grade}`;
    })
    .join('\n');
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
/**
 * Calculates the average of a student's awarded grades.
 * Excludes enrolments where the grade is null.
 * Converts grade strings into numbers.
 * Uses reduce() to calculate the total of the grades.
 * Returns 0 if the student has no awarded grades.
 * Rounds the average to one decimal place.
 */

export function averageGrade(studentId: string): number {
  const grades = enrolments
    .filter(
      (enrolment) =>
        enrolment.studentId === studentId &&
        enrolment.grade !== null
    )
    .map((enrolment) => Number(enrolment.grade));

  if (grades.length === 0) {
    return 0;
  }

  const total = grades.reduce((sum, grade) => sum + grade, 0);
  const average = total / grades.length;

  return Math.round(average * 10) / 10;
}
// --- A3. Who is missing a grade ------------------------------------------

/**
 * The names of the students who have at least one enrolment without a grade,
 * sorted alphabetically and without repeats.
 */
/**
 * Finds students who have at least one enrolment without a grade.
 * Filters enrolments where the grade is null.
 * Finds the names of the students.
 * Removes duplicate names using Set.
 * Removes undefined values and sorts the names alphabetically.
 */
export function awaitingGrades(): string[] {
  return [...new Set(
    enrolments
      .filter((enrolment) => enrolment.grade === null)
      .map((enrolment) => {
       const student = students.find(
         (student) => student.id === enrolment.studentId
      );
        return student?.name;
      })
      .filter((name): name is string => name !== undefined)
  )].sort();
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
/**
 * Returns a function that formats student information.
 * The short style returns only the student's name.
 * The long style returns the name, department, and total credits.
 * The returned function takes a Student object as its argument.
 */
export function formatterFor(style: 'short' | 'long'): (student: Student) => string {
  if (style === 'short') {
    return (student) => student.name;
  }

  return (student) =>
    `${student.name} (${student.deptName}), ${student.totCred} credits`;
}

// --- A5. Changing nothing -------------------------------------------------

/**
 * A new array in which the students of one department have extra credits.
 * Everyone else is unchanged, and the students array itself must not change
 * at all: build new objects with the three dots.
 */
/**
 * Returns a new array with extra credits for a chosen department.
 * Uses map() to create a new array of students.
 * Uses the spread operator to copy each student object.
 * Adds extra credits only to students in the selected department.
 * Keeps the original student array and objects unchanged.
 */
export function raiseCredits(list: Student[], deptName: string, extra: number): Student[] {
  return list.map((student) => {
    if (student.deptName === deptName) {
      return {
        ...student,
        totCred: student.totCred + extra
      };
    }

    return { ...student };
  });
}
