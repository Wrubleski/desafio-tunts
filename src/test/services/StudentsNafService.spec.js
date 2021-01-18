// Using mocha to run some simple tests.
// Since the mocha syntax makes it simple to understand what is being tested,
// I won't document how the tests works.

"use strict";

const assert = require("assert");
const StudentsNafService = require("../../services/StudentsNafService");
const studentsNafService = new StudentsNafService();
const dummyStudent = require("../dummies/studentDummy");

describe("Students Naf Service Test.", () => {
  before(() => {
    console.log("Starting tests on StudentsNafService class.");
  });

  describe("Testing calculateRequiredNaf method.", () => {
    it("Should return neededNafGrade: 50", () => {
      assert.deepStrictEqual(
        studentsNafService.calculateRequiredNaf({
          ...dummyStudent,
          testOne: 50,
          testTwo: 50,
          testThree: 50,
          studentClassCondition: "Exame Final",
        }),
        {
          ...dummyStudent,
          testOne: 50,
          testTwo: 50,
          testThree: 50,
          studentClassCondition: "Exame Final",
          neededNafGrade: 50,
        }
      );
    });

    it("Should return neededNafGrade: 40", () => {
      assert.deepStrictEqual(
        studentsNafService.calculateRequiredNaf({
          ...dummyStudent,
          testOne: 60,
          testTwo: 60,
          testThree: 60,
          studentClassCondition: "Exame Final",
        }),
        {
          ...dummyStudent,
          testOne: 60,
          testTwo: 60,
          testThree: 60,
          studentClassCondition: "Exame Final",
          neededNafGrade: 40,
        }
      );
    });

    it("Should return neededNafGrade: 'ERROR. Test grade must be an integer.'", () => {
      assert.deepStrictEqual(
        studentsNafService.calculateRequiredNaf({
          ...dummyStudent,
          testOne: "60",
          testTwo: 60,
          testThree: 60,
          studentClassCondition: "Exame Final",
        }),
        {
          ...dummyStudent,
          testOne: "60",
          testTwo: 60,
          testThree: 60,
          studentClassCondition: "Exame Final",
          neededNafGrade: "ERROR. Test grade must be an integer.",
        }
      );
    });

    it("Should return neededNafGrade: 0", () => {
      assert.deepStrictEqual(
        studentsNafService.calculateRequiredNaf({
          ...dummyStudent,
          studentClassCondition: "Aprovado",
        }),
        {
          ...dummyStudent,
          studentClassCondition: "Aprovado",
          neededNafGrade: 0,
        }
      );
    });

    it("Should return neededNafGrade: 0", () => {
      assert.deepStrictEqual(
        studentsNafService.calculateRequiredNaf({
          ...dummyStudent,
          studentClassCondition: "Reprovado por Nota",
        }),
        {
          ...dummyStudent,
          studentClassCondition: "Reprovado por Nota",
          neededNafGrade: 0,
        }
      );
    });

    it("Should return neededNafGrade: 0", () => {
      assert.deepStrictEqual(
        studentsNafService.calculateRequiredNaf({
          ...dummyStudent,
          studentClassCondition: "Reprovado por Falta",
        }),
        {
          ...dummyStudent,
          studentClassCondition: "Reprovado por Falta",
          neededNafGrade: 0,
        }
      );
    });

    after(() => {
      console.log("Test finished");
    });
  });
});
