/**
 * Everything regarding the grade needed on the final exam (naf) should go here.
 */

class StudentsNafService {
  // calculateRequiredNaf calculate the avarege grade and update the
  // neededNafGrade's student propriety accordingly.
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
    // 5 <= (m + naf)/2  ----- naf => 10 - m
    // I'am following the standard grade of two digits as the other grades on the sheet.
    // That way, the naf can be between 0 and 100.
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
