"use strict";

const assert = require("assert");
const StudentsAbscenseService = require("../../services/StudentsAbscenseService");
const dummyStudent = require("../dummies/studentDummy");
const dummyClass = require("../dummies/classDummy");
const studentsAbscenseService = new StudentsAbscenseService({
  ...dummyClass,
  totalSemesterClasses: 60,
});

describe("Students Abssense Service Test", () => {
  before(() => {
    console.log("Starting test on StudentsAbscenseService class.");
  });

  describe("Testing isHeldBackForAbsence method.", () => {
    it("Should return studentClassCondition: 'Reprovado por Falta'", () => {
      assert.deepStrictEqual(
        studentsAbscenseService.isHeldBackForAbsence({
          ...dummyStudent,
          absence: 50,
        }),
        {
          ...dummyStudent,
          absence: 50,
          studentClassCondition: "Reprovado por Falta",
        }
      );
    });

    it("Should return studentClassCondition: ''", () => {
      assert.deepStrictEqual(
        studentsAbscenseService.isHeldBackForAbsence({
          ...dummyStudent,
          absence: 0,
        }),
        {
          ...dummyStudent,
          absence: 0,
        }
      );
    });

    it("Should return studentClassCondition: 'Reprovado por Falta'", () => {
      assert.deepStrictEqual(
        studentsAbscenseService.isHeldBackForAbsence({
          ...dummyStudent,
          absence: 16,
        }),
        {
          ...dummyStudent,
          absence: 16,
          studentClassCondition: "Reprovado por Falta",
        }
      );
    });

    it("Should return studentClassCondition: ''", () => {
      assert.deepStrictEqual(
        studentsAbscenseService.isHeldBackForAbsence({
          ...dummyStudent,
          absence: 15,
        }),
        {
          ...dummyStudent,
          absence: 15,
        }
      );
    });

    it("Should return studentClassCondition: ''", () => {
      assert.deepStrictEqual(
        studentsAbscenseService.isHeldBackForAbsence({
          ...dummyStudent,
          absence: 14,
        }),
        {
          ...dummyStudent,
          absence: 14,
        }
      );
    });

    it("Should return studentClassCondition: ''", () => {
      assert.deepStrictEqual(
        studentsAbscenseService.isHeldBackForAbsence({
          ...dummyStudent,
          absence: -1,
        }),
        {
          ...dummyStudent,
          absence: -1,
        }
      );
    });

    it("Should return studentClassCondition: 'Reprovado por Falta'", () => {
      assert.deepStrictEqual(
        studentsAbscenseService.isHeldBackForAbsence({
          ...dummyStudent,
          absence: 999,
        }),
        {
          ...dummyStudent,
          absence: 999,
          studentClassCondition: "Reprovado por Falta",
        }
      );
    });

    it("Should return studentClassCondition: 'Reprovado por Falta'", () => {
      assert.deepStrictEqual(
        studentsAbscenseService.isHeldBackForAbsence({
          ...dummyStudent,
          absence: "30",
        }),
        {
          ...dummyStudent,
          absence: "30",
          studentClassCondition: "Reprovado por Falta",
        }
      );
    });

    it("Should return studentClassCondition: 'ERROR, student.absence is not a number'", () => {
      assert.deepStrictEqual(
        studentsAbscenseService.isHeldBackForAbsence({
          ...dummyStudent,
          absence: "aaaa",
        }),
        {
          ...dummyStudent,
          absence: "aaaa",
          studentClassCondition: "ERROR, student.absence is not a number.",
        }
      );
    });

    after(() => {
      console.log("Test finished");
    });
  });
});
