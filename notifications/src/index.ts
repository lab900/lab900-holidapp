import * as functions from "firebase-functions";

// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript
//

const MY_SLACK_WEBHOOK_URL = "https://hooks.slack.com/services/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";
const SlackNotify = require("slack-notify");
const slack = SlackNotify(MY_SLACK_WEBHOOK_URL);
const PUB_SUB_DATA_EXPORT_TOPIC = "holidapp-updates";
export const notifications =
    functions.region("us-central1")
        .runWith({})
        .pubsub.topic(PUB_SUB_DATA_EXPORT_TOPIC)
        .onPublish(async (message) => {
          functions.logger.info("received:" + message, {structuredData: true});
          slack.send({
            channel: "#holidapp",
            text: "Here is my notification",
            username: "holidapp",
            icon_url: "https://storage.googleapis.com/com-huapii-lab900-data/assets/logo-1024x883.png",
          });
        });
