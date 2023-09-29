import * as functions from "firebase-functions";

// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript
//
import {google} from "googleapis";

export default async function getData(): Promise<any> {
  const auth = new google.auth.JWT({
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  const sheets = google.sheets({version: "v4", auth});
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: "1aZ9tHcpQiqDbCmC0lowaRqMUm00oA5bCOMsBxFEOqAU",
    range: "September",
  });
  const rows = res.data.values;
  if (!rows || rows.length === 0) {
    console.log("No data found.");
    return;
  }
  rows.forEach((row) => {
    // Print columns A and E, which correspond to indices 0 and 4.
    console.log(`${row[0]}, ${row[1]}`);
  });
  return rows;
}

export const integrationSheets =
    functions.https.onRequest(async (request, response) => {
      const data = await getData();
      functions.logger.info("Hello logs!", {structuredData: true});
      response.send("Hello from Integration Sheets!");
      response.send("test " + data);
    });
