import * as functions from "firebase-functions";

// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript
//
export const integrationPaymo =
    functions.https.onRequest((request, response) => {
        functions.logger.info("Hello logs!", {structuredData: true});
        response.send("Hello from Integration Paymo!");
    });
