/**
 * Apply all the required changes to the students, and finally update the sheet with the data.
 */

const StudentsAbscenseService = require("./StudentsAbscenseService");
const StudentsGradeStatusService = require("./StudentsGradeStatusService");
const StudentsNafService = require("./StudentsNafService");

class CalculateStudentsGradeService {
  constructor(studentsRepository, classInformation) {
    this.studentsRepository = studentsRepository;
    this.classInformation = classInformation;
  }

  async studentAprovalStatus(students) {
    const studentsAbscenseService = new StudentsAbscenseService(
      this.classInformation
    );
    const studentsGradeStatusService = new StudentsGradeStatusService();
    const studentsNafService = new StudentsNafService();

    // Iterating over the students array, and updating its required information.
    students = students.map((student) => {
      student = studentsAbscenseService.isHeldBackForAbsence(student);
      student = studentsGradeStatusService.updateGradeStatus(student);
      student = studentsNafService.calculateRequiredNaf(student);

      return student;
    });

    // Finally, update the spreadsheet with the required information.
    await this.studentsRepository.bulkUpdate(students);
    return "Finished updating the spreadsheet.";
  }
}

module.exports = CalculateStudentsGradeService;
