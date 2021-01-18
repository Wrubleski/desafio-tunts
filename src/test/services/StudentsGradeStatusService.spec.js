// Using mocha to run some simple tests.
// Since the mocha syntax makes it simple to understand what is being tested,
// I won't document how the tests works.

"use strict";

const assert = require("assert");
const StudentGradeStatusService = require("../../services/StudentsGradeStatusService");
const dummyStudent = require("../dummies/studentDummy");
const studentGradeStatusService = new StudentGradeStatusService();

describe("Student Grade Status Service Test.", () => {
  before(() => {
    console.log("Starting tests on StudentGradeStatusService class.");
  });

  describe("Testing updateGradeStatus method.", () => {
    it("Should return studentClassCondition: 'Aprovado'", () => {
      assert.deepStrictEqual(
        studentGradeStatusService.updateGradeStatus({
          ...dummyStudent,
          testOne: 100,
          testTwo: 100,
          testThree: 100,
        }),
        {
          ...dummyStudent,
          testOne: 100,
          testTwo: 100,
          testThree: 100,
          studentClassCondition: "Aprovado",
        }
      );
    });

    it("Should return studentClassCondition: 'Reprovado por Nota'", () => {
      assert.deepStrictEqual(
        studentGradeStatusService.updateGradeStatus({
          ...dummyStudent,
          testOne: 0,
          testTwo: 0,
          testThree: 0,
        }),
        {
          ...dummyStudent,
          testOne: 0,
          testTwo: 0,
          testThree: 0,
          studentClassCondition: "Reprovado por Nota",
        }
      );
    });

    it("Should return studentClassCondition: 'Aprovado'", () => {
      assert.deepStrictEqual(
        studentGradeStatusService.updateGradeStatus({
          ...dummyStudent,
          testOne: 70,
          testTwo: 70,
          testThree: 70,
        }),
        {
          ...dummyStudent,
          testOne: 70,
          testTwo: 70,
          testThree: 70,
          studentClassCondition: "Aprovado",
        }
      );
    });

    it("Should return studentClassCondition: 'Exame Final'", () => {
      assert.deepStrictEqual(
        studentGradeStatusService.updateGradeStatus({
          ...dummyStudent,
          testOne: 70,
          testTwo: 70,
          testThree: 69,
        }),
        {
          ...dummyStudent,
          testOne: 70,
          testTwo: 70,
          testThree: 69,
          studentClassCondition: "Exame Final",
        }
      );
    });

    it("Should return studentClassCondition: 'Exame Final'", () => {
      assert.deepStrictEqual(
        studentGradeStatusService.updateGradeStatus({
          ...dummyStudent,
          testOne: 50,
          testTwo: 50,
          testThree: 50,
        }),
        {
          ...dummyStudent,
          testOne: 50,
          testTwo: 50,
          testThree: 50,
          studentClassCondition: "Exame Final",
        }
      );
    });

    it("Should return studentClassCondition: 'Reprovado por Nota'", () => {
      assert.deepStrictEqual(
        studentGradeStatusService.updateGradeStatus({
          ...dummyStudent,
          testOne: 50,
          testTwo: 50,
          testThree: 49,
        }),
        {
          ...dummyStudent,
          testOne: 50,
          testTwo: 50,
          testThree: 49,
          studentClassCondition: "Reprovado por Nota",
        }
      );
    });

    it("Should return studentClassCondition: 'ERROR. Test grade must be an integer.'", () => {
      assert.deepStrictEqual(
        studentGradeStatusService.updateGradeStatus({
          ...dummyStudent,
          testOne: "40",
          testTwo: "40",
          testThree: "40",
        }),
        {
          ...dummyStudent,
          testOne: "40",
          testTwo: "40",
          testThree: "40",
          studentClassCondition: "ERROR. Test grade must be an integer.",
        }
      );
    });

    after(() => {
      console.log("Test finished");
    });
  });
});
