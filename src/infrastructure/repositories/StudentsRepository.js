class StudentsRepository {
  constructor(sheetClient) {
    this.sheetClient = sheetClient;
  }

  async getStudents() {
    console.log("Getting students information data.");
    const { values: data } = await this.sheetClient.getData(
      "engenharia_de_software!A4:H27"
    );
    return data.map((currElement) => {
      return {
        id: parseInt(currElement[0]),
        name: currElement[1],
        absence: parseInt(currElement[2]),
        testOne: parseInt(currElement[3]),
        testTwo: parseInt(currElement[4]),
        testThree: parseInt(currElement[5]),
        studentClassCondition: null,
        neededNafGrade: null,
      };
    });
  }

  async bulkUpdate(students) {
    const rangeStart = "G4";
    const rangeEnd = ":H27";

    const data = students.map((student) => {
      return [student.studentClassCondition, student.neededNafGrade];
    });

    await this.sheetClient.putData(rangeStart, data, rangeEnd);
  }
}
module.exports = StudentsRepository;
