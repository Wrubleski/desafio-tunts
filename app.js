/**
 * I tried to encapsulate every funcionality on its own class,
 * following the single responsibility principle.
 * Service's responsibilities are to manipulate the data according to its rules.
 * Repositories make the interface between the "database" and the logic.
 * The googleSheetFactory on the config folder just create a new authenticated sheetClient.
 * And the SheetClient talks with the google API.
 */

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
