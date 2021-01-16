class ClassRepository {
  constructor(sheetService) {
    this.sheetService = sheetService;
  }

  async getClassInformation() {
    console.log("Getting class informatin data.");
    const { values: data } = await this.sheetService.getData(
      "engenharia_de_software!A1:B2"
    );

    return {
      className: data[0][0],
      totalSemesterClasses: parseInt(data[1][0].split(":")[1]),
    };
  }
}

module.exports = ClassRepository;
