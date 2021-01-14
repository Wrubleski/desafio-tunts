const { google } = require("googleapis");
const key = require("./service-key.json");
const spreadSheetID = "1MDALuLv3NnK7tgFbjIXp-gkp2P5tLD064PLLksaWilA";
const sheets = google.sheets("v4");

// I'm using a Google Service Account to authenticate the API.
// Get yours on the google developer console, rename it to service-key.json and paste it on the project folder

const jwtClient = new google.auth.JWT(key.client_email, null, key.private_key, [
  "https://www.googleapis.com/auth/spreadsheets",
]);

/**
 * Uses the google sheets API v4 to get data from the spreadsheet specified in sheetID at the top of the file.
 * @param {String} range the sheet name followed by the range of cells required in A1 notation. Must have a "!" between the name and range.
 */

const getData = async (range) => {
  const response = await sheets.spreadsheets.values.get({
    auth: jwtClient,
    spreadsheetId: spreadSheetID,
    range: range,
  });
  console.log("Data fetched from Googe Sheets");
  return response.data;
};

/**
 * Update the range of cells specified with the data provided. If no end is provided, will update a single cell.
 * @param {String} start initial cell, in A1 notation.
 * @param {Array} data the data to be populated in the range defined. Accept multiple nested arrays for multiline update, or a single array with one or more elements for single line update.
 * @param {String} end optional argument, the final cell in range, in A1 notation. Must start with ":"
 */

const updateCells = async (start, data, end = "") => {
  console.log("Updating spreadsheet...");
  const value = [data];
  await sheets.spreadsheets.values.update({
    auth: jwtClient,
    spreadsheetId: spreadSheetID,
    valueInputOption: "USER_ENTERED",
    range: "engenharia_de_software!" + start + end,
    resource: { values: value },
  });
};

async function main() {
  const { values } = await getData("engenharia_de_software!A2:H27");

  // Gets the number of classes from the sheet
  const splitSTR = values[0][0].split(":");
  const totalClasses = parseInt(splitSTR[1]);

  const absenceLimit = totalClasses * 0.25;

  const nameColumn = 1;
  const absencecolumn = 2;
  const P1Column = 3;
  const P2Column = 4;
  const P3Column = 5;
  const statusColumn = "G";
  const finalExamPassingGradeColumn = "H";

  const lowestPassingGrade = 50;
  const noExamPassingGrade = 70;

  // Loops over each student, and when a condition is meet, goes to the next on the line.
  // If no condition is meet, then the student is on final exam.
  for (let i = 2; i < values.length; i++) {
    const absence = parseInt(values[i][absencecolumn]);
    const student = values[i][nameColumn];

    // A correction factor of i + 2 is used to locate the correct line, since the sheet starts at 1 instead of 0,
    // and I'm not loading the first line of the sheet.
    const correctionFactor = i + 2;

    console.log("Calculating " + student + "'s absence rate.");
    if (absence > absenceLimit) {
      await updateCells(
        statusColumn + correctionFactor,
        ["Reprovado por Falta", 0],
        ":" + finalExamPassingGradeColumn + correctionFactor
      );
      continue;
    }

    // Sums P1, P2 and P3 for each student that did not flunk for absence
    console.log("Calculating " + student + "'s average grade.");
    const averageGrade =
      (parseInt(values[i][P1Column]) +
        parseInt(values[i][P2Column]) +
        parseInt(values[i][P3Column])) /
      3;

    console.log(
      "Calculating " + student + "'s approved or reproved status by grade."
    );
    if (averageGrade >= noExamPassingGrade) {
      await updateCells(
        statusColumn + correctionFactor,
        ["Aprovado", 0],
        ":" + finalExamPassingGradeColumn + correctionFactor
      );

      continue;
    } else if (averageGrade < lowestPassingGrade) {
      await updateCells(
        statusColumn + correctionFactor,
        ["Reprovado por Nota", 0],
        ":" + finalExamPassingGradeColumn + correctionFactor
      );

      continue;
    }

    console.log(
      "Student " +
        student +
        " could not be aproved or reproved based on grade.\nProceeding to calculate the NAF required to move on to the next grade."
    );

    // Since the spreadsheet uses 0 - 100 marks format, I opted in following the standard.
    // That way, naf ranges from 0 to 100, rounded to the next integer, if necessary.

    console.log("Calculating " + student + "'s NAF.");
    const naf = Math.ceil(100 - averageGrade);
    await updateCells(
      statusColumn + correctionFactor,
      ["Exame Final", naf],
      ":" + finalExamPassingGradeColumn + correctionFactor
    );
  }
  console.log("Done.");
}

main();
