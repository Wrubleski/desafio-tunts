const googleSheetFactory = require("./src/config/googleSheetFactory");
const StudentsRepository = require("./src/infrastructure/repositories/StudentsRepository");
const ClassRepository = require("./src/infrastructure/repositories/ClassRepository");
const CalculateStudentsGradeService = require("./src/services/CalculateStudentsGradeService");

async function main() {
  const sheetClient = googleSheetFactory.createSheetClient();
  const studentsRepository = new StudentsRepository(sheetClient);
  const classRepository = new ClassRepository(sheetClient);
  let students = await studentsRepository.getStudents();
  const classInformation = await classRepository.getClassInformation();
  const calculateStudentsGradeService = new CalculateStudentsGradeService(
    studentsRepository,
    classInformation
  );
  calculateStudentsGradeService.studentAprovalStatus(students);
}

main();
