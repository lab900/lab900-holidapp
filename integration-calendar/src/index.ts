import * as functions from "firebase-functions";
// import axios from "axios";
import {google} from "googleapis";
// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript
//
export const integrationCalendar =
    functions.https.onRequest((request, response) => {
      functions.logger.info("Hello logs!", {structuredData: true});
      const fromDate: Date = request.body.get("from");
      const toDate: Date = request.body.get("to");
      createEvent(undefined, fromDate, toDate);
      response.status(201);
    });

const createEvent = (auth: any, dateStart: Date, dateEnd: Date) => {
  const calendar = google.calendar({version: "v3", auth});

  const event = {
    "start": {
      "dateTime": dateStart.toUTCString(),
      "timeZone": "Belgium/Brussels",
    },
    "end": {
      "dateTime": dateEnd.toUTCString(),
      "timeZone": "Belgium/Brussels",
    },
    "eventType": "outOfOffice",
  };

  calendar.events.insert({
    calendarId: "primary",
    requestBody: event,
  });
};
