// The SheetClient is responsible for making the calls to the google sheets API,
// based on the parsed data received from the StudentsRepository.

class SheetClient {
  constructor(auth, spreadsheetId, sheets) {
    this.auth = auth;
    this.spreadsheetId = spreadsheetId;
    this.sheets = sheets;
  }

  /**
   * Uses the google sheets API v4 to get data from the spreadsheet specified in sheetID at the top of the file.
   * @param {String} range the sheet name followed by the range of cells required in A1 notation. Must have a "!" between the name and range.
   */
  async getData(range) {
    this.response = await this.sheets.spreadsheets.values.get({
      auth: this.auth,
      spreadsheetId: this.spreadsheetId,
      range: range,
    });
    console.log("Data fetched from Googe Sheets");
    return this.response.data;
  }

  /**
   * Update the range of cells specified with the data provided. If no end is provided, will update a single cell.
   * @param {String} start initial cell, in A1 notation.
   * @param {Array} data the data to be populated in the range defined. Accept multiple nested arrays for multiline update, or a single array with one or more elements for single line update.
   * @param {String} end optional argument, the final cell in range, in A1 notation. Must start with ":"
   */

  async putData(start, data, end = "") {
    console.log("Updating spreadsheet...");
    await this.sheets.spreadsheets.values.update({
      auth: this.auth,
      spreadsheetId: this.spreadsheetId,
      valueInputOption: "USER_ENTERED",
      range: "engenharia_de_software!" + start + end,
      resource: { values: data },
    });
  }
}

module.exports = SheetClient;
