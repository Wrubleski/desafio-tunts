/**
 * The ClassRepository's responsibility is to parse the class information,
 *  like class name and total semester class.
 */
class ClassRepository {
  constructor(sheetClient) {
    this.sheetClient = sheetClient;
  }

  async getClassInformation() {
    console.log("Getting class informatin data.");
    const { values: data } = await this.sheetClient.getData(
      "engenharia_de_software!A1:B2"
    );

    return {
      className: data[0][0],
      totalSemesterClasses: parseInt(data[1][0].split(":")[1]),
    };
  }
}

module.exports = ClassRepository;
