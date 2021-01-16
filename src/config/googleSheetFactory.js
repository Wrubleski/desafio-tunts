const key = require("../../service-key.json");
const SheetService = require("../services/SheetService");

const { google } = require("googleapis");
const sheets = google.sheets("v4");
const spreadSheetID = "1MDALuLv3NnK7tgFbjIXp-gkp2P5tLD064PLLksaWilA";

// I'm using a Google Service Account to authenticate the API.
// Get yours on the google developer console, rename it to service-key.json and paste it on the project folder

const jwtClient = new google.auth.JWT(key.client_email, null, key.private_key, [
  "https://www.googleapis.com/auth/spreadsheets",
]);

exports.createSheetService = () => {
  return new SheetService(jwtClient, spreadSheetID, sheets);
};
