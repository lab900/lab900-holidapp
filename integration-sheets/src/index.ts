import * as functions from "firebase-functions";
import {PubSub} from "@google-cloud/pubsub";
import {google} from "googleapis";

const PUB_SUB_DATA_EXPORT_TOPIC = "holidapp-updates";
const OFFICE_SHEET = "1aZ9tHcpQiqDbCmC0lowaRqMUm00oA5bCOMsBxFEOqAU";
// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript
//


export const integrationSheets =
    functions.https.onRequest((request, response) => {
      functions.logger.info("sending...!", {structuredData: true});
      const topic = new PubSub().topic(PUB_SUB_DATA_EXPORT_TOPIC);
      const json = {foo: "bar"};
      topic.publishMessage({
        json,
      });
      response.send("Message sent 4!");
    });

export const startSheetIntegration = functions
    .region("us-central1")
    .runWith({})
    .pubsub.topic(PUB_SUB_DATA_EXPORT_TOPIC)
    .onPublish(async (message) => {
      functions.logger.info("received:" + message, {structuredData: true});

      await getData();

      functions.logger.info("done:" + message, {structuredData: true});

      //        await databaseExport(sheetId);
    });

// eslint-disable-next-line require-jsdoc
export default async function getData(): Promise<any> {
  const auth = new google.auth.JWT({
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    // eslint-disable-next-line max-len
    key: "",
    email: "holidap-runner@lab900-holidapp.iam.gserviceaccount.com",
    keyId: "44004405bdc8aad8ff17c855ab041b044fa59a62",
  });
  const sheets = google.sheets({version: "v4", auth});
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: OFFICE_SHEET,
    range: "September 2023",
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

const openSheet = (sheetId: string, holidayRequest: any) => {

    openSheet()

    // for each month between from and to, do the update:
        // get the worksheet for the month
        // get the row for the employee
        // get the columns for the dates between from and to
        // update the values for the columns to HOL / blank / ... based on the holiday request status

}

const getMonthYearNamesForDates = (from: date, to: date) string[]  => {
    return ["September 2023", "October 2023"];
}


const findEmployeeRow = (worksheet, employeeEmail): int => {

}

const findDateColumns = (worksheet, from: date, to: date): int[] => {

}

const getCellValueForHolidayStatus(status: string): string => {
    // approved -> HOL
    // rejected -> blank
}


const openWorkSheet = (sheets, worksheetName: string): worksheet => {

    // open the google sheet and find the right worksheet based on the date

}
