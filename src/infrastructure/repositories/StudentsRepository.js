/**
 * The StudentsRepository's responsibility is to parse the data and communicate with the SheetClient,
 * which in turn make the call to the API with the data received.
 */

class StudentsRepository {
  constructor(sheetClient) {
    this.sheetClient = sheetClient;
  }

  // Gets the data from the sheet engenharia_de_software from the spreadsheet initialized
  // on the SheetClient. The data range is defined here, after the name of the sheet, in A1 notation.

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

  // Parse the data and update the sheet in the specified range.
  // Each array nested on the primary one is equal to one line on the sheet.
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
