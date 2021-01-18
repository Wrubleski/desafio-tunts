/**
 * All operations that involve students absence should go here.
 */

class StudentsAbscenseService {
  constructor(classInformation) {
    this.classInformation = classInformation;
  }

  // Right now, I only have the isHeldBackForAbsence method, which determines
  // that the student will be held back if he have more than 25% absence rate.
  isHeldBackForAbsence(student) {
    console.log(
      "Checking if student " + student.name + " will be held back for absence."
    );
    if (!Number.isInteger(student.absence)) {
      return {
        ...student,
        studentClassCondition: "ERROR, student.absence is not a number.",
      };
    }
    const absenceLimit = this.classInformation.totalSemesterClasses * 0.25;

    if (student.absence > absenceLimit) {
      console.log(
        "Student " + student.name + " will be held back for absence."
      );
      return {
        ...student,
        studentClassCondition: "Reprovado por Falta",
      };
    }

    return student;
  }
}

module.exports = StudentsAbscenseService;
