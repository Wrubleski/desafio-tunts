class StudentsAbscenseService {
  constructor(classInformation) {
    this.classInformation = classInformation;
  }

  isHeldBackForAbsence(student) {
    console.log(
      "Checking if student " + student.name + " will be held back for absence."
    );
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
