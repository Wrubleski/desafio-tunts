class StudentsNafService {
  calculateRequiredNaf(student) {
    const { testOne, testTwo, testThree, studentClassCondition } = student;

    if (
      !Number.isInteger(testOne) ||
      !Number.isInteger(testTwo) ||
      !Number.isInteger(testThree)
    ) {
      return {
        ...student,
        neededNafGrade: "ERROR. Test grade must be an integer.",
      };
    }

    const averageGrade = (testOne + testTwo + testThree) / 3;
    const naf = Math.ceil(100 - averageGrade);

    if (studentClassCondition === "Exame Final") {
      console.log(
        "Calculating required grade for student " +
          student.name +
          "'s final exam."
      );
      return { ...student, neededNafGrade: naf };
    }

    return { ...student, neededNafGrade: 0 };
  }
}
module.exports = StudentsNafService;
