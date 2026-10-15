// Part B - higher-order functions and closures
//
// Each of these either takes a function, returns one, or both.


// These functions demonstrate higher-order functions and closures.
// They take functions as arguments, return functions, or both.
// They can be used to create and combine reusable student tests.

import { Student } from './data.js';

/** A test on a student. Used by everything below. */
export type Test = (student: Student) => boolean;

// --- B1. The opposite test ------------------------------------------------

/**
 * Takes a test and returns the opposite test:
 *
 *     const inCs = (s: Student) => s.deptName === 'Comp. Sci.';
 *     students.filter(not(inCs));      // everyone else
 *
 * One line is enough, once you see what has to be returned.
 */

/**
 * Returns a new test that gives the opposite result.
 * If the original test returns true, the new test returns false.
 * If the original test returns false, the new test returns true.
 */

export function not(test: Test): Test {
  return (student) => !test(student);
}

// --- B2. One pass, two answers -------------------------------------------

/**
 * Splits a list in two by a test, in one pass: those that pass first, those
 * that fail second.
 *
 *     const [passing, failing] = partition(students, s => s.totCred >= 60);
 *
 * The return type is a tuple, so the two arrays cannot be mixed up, and the
 * caller can take them apart by position.
 */

/**
 * Splits students into two groups using a test.
 * The first array contains students who pass the test.
 * The second array contains students who fail the test.
 * Uses reduce() to process the list in one pass.
 * Returns both arrays as a tuple.
 */

export function partition(list: Student[], test: Test): [Student[], Student[]] {
  return list.reduce<[Student[], Student[]]>(
    ([passing, failing], student) => {
      if (test(student)) {
        passing.push(student);
      } else {
        failing.push(student);
      }

      return [passing, failing];
    },
    [[], []]
  );
}

// --- B3. Do it once -------------------------------------------------------

/**
 * The parameter is a calculation: a function that takes no arguments and
 * returns a number. Takes such a function and returns a new one that runs
 * it the first time it is called and never again. Every later call hands
 * back the number from the first call, without calculating it again:
 *
 *     let calls = 0;
 *     const count = once(() => { calls++; return students.length; });
 *     count();   // 13, calls is now 1
 *     count();   // 13, calls is still 1
 *
 * Be ready to say where the saved number lives after once has returned.
 */

/**
 * Returns a function that runs the calculation only once.
 * Saves the result from the first calculation.
 * Returns the saved result on every later call.
 * Uses a closure to remember the result and call status.
 */

export function once(calculation: () => number): () => number {
  let called = false;
  let result: number;

  return () => {
    if (!called) {
      result = calculation();
      called = true;
    }

    return result;
  };
}

// --- B4. All of them ------------------------------------------------------

/**
 * Combines any number of tests into one test that passes only when all of
 * them do:
 *
 *     const senior = allOf(inDepartment('Comp. Sci.'), atLeast(60));
 *
 * The three dots in a parameter list gather the arguments into an array.
 * With no tests at all, everything passes: there is nothing to fail.
 */

/**
 * Combines multiple tests into one test.
 * Returns true only when all tests pass.
 * Uses the every() method to check each test.
 * If no tests are provided, the result is true.
 */

export function allOf(...tests: Test[]): Test {
  return (student) => tests.every((test) => test(student));
}

// Two small helpers to build tests with, given to you.

/**
 * Creates a test that checks a student's department.
 * Returns true when the department matches the given name.
 */

export const inDepartment = (deptName: string): Test =>
  (student: Student) => student.deptName === deptName;

/**
 * Creates a test that checks a student's total credits.
 * Returns true when the credits meet or exceed the given number.
 */

export const atLeast = (credits: number): Test =>
  (student: Student) => student.totCred >= credits;
