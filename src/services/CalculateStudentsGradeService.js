const StudentsAbscenseService = require("./StudentsAbscenseService");
const StudentsGradeStatusService = require("./StudentsGradeStatusService");
const StudentsNafService = require("./StudentsNafService");

class CalculateStudentsGradeService {
  constructor(studentsRepository, classInformation) {
    this.studentsRepository = studentsRepository;
    this.classInformation = classInformation;
  }

  studentAprovalStatus(students) {
    const studentsAbscenseService = new StudentsAbscenseService(
      this.classInformation
    );
    const studentsGradeStatusService = new StudentsGradeStatusService();
    const studentsNafService = new StudentsNafService();
    students = students.map((student) => {
      student = studentsAbscenseService.isHeldBackForAbsence(student);
      student = studentsGradeStatusService.updateGradeStatus(student);
      student = studentsNafService.calculateRequiredNaf(student);

      return student;
    });

    this.studentsRepository.bulkUpdate(students);
  }
}

module.exports = CalculateStudentsGradeService;
