class StudentsGradeStatusService {
  updateGradeStatus(student) {
    console.log("Checking student " + student.name + "'s grade.");
    const { testOne, testTwo, testThree } = student;

    if (
      !Number.isInteger(testOne) ||
      !Number.isInteger(testTwo) ||
      !Number.isInteger(testThree)
    ) {
      return {
        ...student,
        studentClassCondition: "ERROR. Test grade must be an integer.",
      };
    }

    const averageGrade = (testOne + testTwo + testThree) / 3;

    if (student.studentClassCondition === "Reprovado por Falta") {
      return student;
    }

    if (averageGrade >= 70) {
      console.log(
        "Student " +
          student.name +
          " will be moved on to the next grade. Average grade greater or equal to 70."
      );
      return {
        ...student,
        studentClassCondition: "Aprovado",
      };
    }

    if (averageGrade < 50) {
      console.log(
        "Student " +
          student.name +
          " will be held back. Average grade less than 50."
      );
      return {
        ...student,
        studentClassCondition: "Reprovado por Nota",
      };
    }

    console.log(
      "Student " + student.name + " will need to take the final exam."
    );
    return {
      ...student,
      studentClassCondition: "Exame Final",
    };
  }
}

module.exports = StudentsGradeStatusService;
