import * as functions from "firebase-functions";
import {PubSub} from "@google-cloud/pubsub";

const PUB_SUB_DATA_EXPORT_TOPIC = "holidapp-updates";
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
      //        await databaseExport(sheetId);
    });
