// TODO: Documentar o codigo, talvez fazer testes unitarios?

const googleSheetFactory = require("./src/config/googleSheetFactory");
const StudentsRepository = require("./src/repositories/StudentsRepository");
const ClassRepository = require("./src/repositories/ClassRepository");
const StudentsAbscenseService = require("./src/services/StudentsAbscenseService");
const StudentsGradeStatusService = require("./src/services/StudentsGradeStatusService");
const StudentsNafService = require("./src/services/StudentsNafService");

async function main() {
  const sheetService = googleSheetFactory.createSheetService();
  const studentsRepository = new StudentsRepository(sheetService);
  const classRepository = new ClassRepository(sheetService);
  let students = await studentsRepository.getStudents();
  const classInformation = await classRepository.getClassInformation();
  const studentsAbscenseService = new StudentsAbscenseService(classInformation);
  const studentsGradeStatusService = new StudentsGradeStatusService();
  const studentsNafService = new StudentsNafService();

  students = students.map((student) => {
    student = studentsAbscenseService.isHeldBackForAbsence(student);
    student = studentsGradeStatusService.updateGradeStatus(student);
    student = studentsNafService.calculateRequiredNaf(student);

    return student;
  });

  studentsRepository.bulkUpdate(students);
}

main();
