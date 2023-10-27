import * as functions from "firebase-functions";
import {PubSub} from "@google-cloud/pubsub";
import {google, sheets_v4} from "googleapis";

const PUB_SUB_DATA_EXPORT_TOPIC = "holidapp-updates";
const OFFICE_SHEET = "1aZ9tHcpQiqDbCmC0lowaRqMUm00oA5bCOMsBxFEOqAU";


const auth = new google.auth.JWT({
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  // eslint-disable-next-line max-len
  key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDsoLz/+4vfPJEE\nlsiAa2/tHp67wjIQunKldHoVisIkO5wIPgefrwDmEWDiZiMWr/75i3PHMGCjnBLR\nLv4mSaSaKiIRA/TregUNVqU6PNWhADeRzDJV/M+RSSwcGVB/qk/HoOI7rlpnfJ+1\nfj07bymrVvfBsG6jvMSjWWT8vcv6j1lb6unvc4c1jL0krIVHwg5KTitrg1DokMQ9\nYzGllP6mFlhZdZcDx3M6gwICCrzc08a2h2stBQIJLNs/Ij/Csg0Vp2Y07bgJOOtD\nOkpPy6nh5HqI41G8zdo6BHUL5is3mvVQTUVDnZPbmPT+CvcNRiSninLaqOanIxfW\nm8TXXiqTAgMBAAECggEAHUvhWogYTzE+eyT3+f5TQzZRTMnETRHoc9ex7czaMIY4\n0URsyTZvlAx+xEkE+yAbH2ZGlVjF/juqkL+Ss8bWXEfvI9ArmKPo0Df0CPvTLzXJ\nq4FukfrU8BXxIiF4N/YsHnkqyVzS0JE7bMsOZbdjn1ULI63mZNtQNTEyMaCGCqVL\n5naYYYIThGULKkoAaB6a1kXJgnDSlYiukBLsNId54R50EGjfuUVdNTWY5HKnClj+\nLKhoppo7S6zWIFTWbUOffMU35JdEEPo9cIVUNPGpQ3Giw3/p9PnWv1nbfEOvSj+/\nhsgDVMKHHCz2427zdFearwMnNhlTJi05GKZCGNj44QKBgQD4RANMhwbsSUGzA/by\nld1nxNiTwfZeyAuQKclUJHYualycGSN4oPFBKMvwxVo6NuvCfsQ8Yf2L906IOEVI\nGpJLiSBC3VSadtGDOhxPZCcps2FbP8Yw2CvTA9D3ARYB8OCg4bHwsO5CMA/HLZkL\naiUw9T2hley/PPQs2FY+Uk9SmQKBgQDz/+kqb1nU9f4yWBMxU5aw15jPPzcYq54g\nDL1BiVVh+jdlFPDgSlG7W8Uitu4c5eO1isjiOEq62kXAuOc6mn4hk3JbYbiE3Djj\nT4NsXfxEdBWCcbq1V1tNBttAQ0BeWJ2gQzU6zbBFBxfA05rocP5G+Fjc1uwyiUe9\nT/HEYwNOCwKBgQCMQtCiUb8Fi7XEj77a+vRlhf7eK70ne1mdDx6hnR/vxUOhJUq3\nAiaLK6Nc2gLJ1PGJptjzTGFUzFnf9/qca/avGj/Rxv3fbrWbsB8Cc5D0rFWamgM8\n4USRKRzMEB8A5bfi7N/9HdjeKA0h+I74tfVhHYy+V9ezi5pgI7FF8HbEMQKBgQDu\nzlLYc28KXVBS2Zy/ND5SClDG1eoIvT7fw1gfolfsssYwqlQuUM65ftHsbfmSUvWQ\noqqFre6F/kcynkXBN5+nIPZVtciwUBFleFb6YuoZ3TuIFeNUxJDZTJKdzLRdIoHz\nbpPUX6fbh1uaIACG6sATmdDvI3K861tJT8siGH4NjQKBgCGHhH7Ae+eK9qq+OGkU\nt9n8a+LFQuXrO1GwHSNy01Rrf8iypqUaru/FjxZ7A+CIRppZrDIe4JWPovi25XT5\nv530vs9UfwixTFnGRv01hymJn5O3k6xzFXZfqXFkzKUgagWCb9m7nWCQmeR+ht3r\nGFpaKqOA4JvqWxTnTz+9U84p\n-----END PRIVATE KEY-----\n",
  email: "holidap-runner@lab900-holidapp.iam.gserviceaccount.com",
  keyId: "44004405bdc8aad8ff17c855ab041b044fa59a62",
});


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

const openSheet = async (sheetId: string, holidayRequest: Request) => {
  const sheets = google.sheets({version: "v4", auth});
  // eslint-disable-next-line max-len
  const worksheetNames = getMonthYearNamesForDates(new Date(holidayRequest.from), new Date(holidayRequest.to));

  for (const worksheetName of worksheetNames) {
    const worksheetData = await openWorkSheet(sheets, worksheetName);
    if (worksheetData == null) {
      continue;
    }
    const employeeRow = findEmployeeRow(worksheetData, holidayRequest.requester);

    // Get all days in this month that are between from and to

    var dateColumn = findDateColumn(worksheetData, new Date(holidayRequest.from));
      var newCellValue = getCellValueForHolidayStatus(holidayRequest.status);

      // Get the columns for the dates between from and to


  }

  // for each month between from and to, do the update:
  // get the worksheet for the month
  // get the row for the employee
  // get the columns for the dates between from and to
  // eslint-disable-next-line max-len
  // update the values for the columns to HOL / blank / ... based on the holiday request status
};

const getDatesInPeriodAndMonth = (month: number, from: Date, to: Date): [] => {
    const current = new Date(from);
    const days= [];
    while (current.getMonth() == from.getMonth() && current.getDay() <= to.getDay()) {
        // eslint-disable-next-line max-len
        days.push(current);
        current.setDate(current.getDate() + 1);
    }
    return days;
}

const getMonthYearNamesForDates = (from: Date, to: Date): string[] => {
  const monthYearNames = [];
  const current = new Date(from);
  while (current.getFullYear() <= to.getFullYear() &&
          current.getMonth() <= to.getMonth()) {
    // eslint-disable-next-line max-len
    monthYearNames.push(current.toLocaleString("default", {month: "long"}) + " " + current.getFullYear());
    current.setMonth(current.getMonth() + 1);
  }
  return monthYearNames;
};

// eslint-disable-next-line camelcase,max-len
const findEmployeeRow = (worksheetData: any[][], employeeEmail: string): number => {
  const employeeEmailColumnIndex = 1;
  // eslint-disable-next-line max-len
  const employeeEmailColumn = worksheetData.map((row) => row[employeeEmailColumnIndex]);
  return employeeEmailColumn.indexOf(employeeEmail);
};

const findDateColumn = (worksheetData: any[][], date: Date): number | null => {

    // convert the date in this format: dd/MM/yyyy
    var convertedDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    // Checking date format: "05/09/2023"

    const datesRow = 2;
    const datesRowData = worksheetData[datesRow];
    return datesRowData.indexOf(convertedDate);
};

// eslint-disable-next-line camelcase,max-len
 const openWorkSheet = async (sheets: sheets_v4.Sheets, worksheetName: string):Promise<any[][] | null | undefined> => {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: OFFICE_SHEET,
    range: worksheetName,
  });
  return res.data.values;
};

const getCellValueForHolidayStatus(status: string): string => {
    return status === "approved" ? "HOL" : "";
}

export interface Request {
    status: "pending" | "approved" | "rejected",
    answeredOn?: Date,
    approver?: string, // User.email
    requesterRemark?: string
    approverRemark?: string
    requester: string // User.email
    from: string // Date
    to: string // Date
    createdOn: Date,
    days: number,
    halfDays: string[]
    year: number
}
