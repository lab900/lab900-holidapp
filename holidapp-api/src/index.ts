import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import { createRequest } from "./handlers/create-request";
import { validateFirebaseIdToken, localAuth } from "./middleware/validate-token";

// initialize firebase inorder to access its services
admin.initializeApp(functions.config().firebase);

// initialize express server
const app = express();
app.use(cors({origin: true}));
const main = express();

main.use("/api/v1", app);
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({extended: false}));

// Add the middleware to your routes
app.use(localAuth);

// initialize the database and the collection
const db = admin.firestore();

// Create a holiday request
app.post('/request', createRequest(db));

// Update a request (approve, reject, delete)
app.put('/request/:id', createRequest(db));

// List all of my requests
app.get('/requests/my', async (req, res) => {
  try {
    const email = req.query.email;
    const querySnapshot = await db.collection('requests').where('requester', '==', email).get();
    const requests = querySnapshot.docs.map(doc => doc.data());
    res.status(200).send(requests);
  } catch (error) {
    res.status(500).send(error);
  }
});

// List all open requests (for approvers)
app.get('/requests/open', async (req, res) => {
  try {
    const querySnapshot = await db.collection('requests').where('answeredOn', '==', null).get();
    const requests = querySnapshot.docs.map(doc => doc.data());
    res.status(200).send(requests);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Export the Firebase Function
export const holidayRequests = functions.https.onRequest(app);


export const webApi = functions.https.onRequest(main);
