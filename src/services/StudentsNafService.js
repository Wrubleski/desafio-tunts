class StudentsNafService {
  calculateRequiredNaf(student) {
    const { testOne, testTwo, testThree, studentClassCondition } = student;
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

    return student;
  }
}
module.exports = StudentsNafService;
