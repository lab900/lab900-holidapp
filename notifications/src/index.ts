import * as functions from "firebase-functions";
import {PubSub} from "@google-cloud/pubsub";

// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript
//

const MY_SLACK_WEBHOOK_URL = "https://hooks.slack.com/services/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";
const SlackNotify = require("slack-notify");
const slack = SlackNotify(MY_SLACK_WEBHOOK_URL);
const PUB_SUB_DATA_EXPORT_TOPIC = "holidapp-updates";

export const triggerPubSub =
    functions.https.onRequest((request, response) => {
      functions.logger.info("sending...!", {structuredData: true});
      const topic = new PubSub().topic(PUB_SUB_DATA_EXPORT_TOPIC);
      topic.publishJSON({"hello": "world"});
      response.send("Message sent 4!");
    });

export const notificationHttp =
    functions.https.onRequest((request, response) => {
      functions.logger.info("sending...!");
      slack.send({
        channel: "#holidapp",
        text: "Here is my notification",
        username: "holidapp",
        // icon_url: "https://storage.googleapis.com/com-huapii-lab900-data/assets/logo-1024x883.png",
      });
    });
export const notifications =
    functions.region("us-central1")
        .runWith({})
        .pubsub.topic(PUB_SUB_DATA_EXPORT_TOPIC)
        .onPublish(async (message) => {
          functions.logger.info("received:" + Buffer.from(message.data, "base64").toString(), {structuredData: true});
          slack.send({
            channel: "#holidapp",
            text: "Here is my notification",
            username: "holidapp",
            icon_url: "https://storage.googleapis.com/com-huapii-lab900-data/assets/logo-1024x883.png",
          });
        });
