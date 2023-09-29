import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";

// initialize firebase inorder to access its services
admin.initializeApp(functions.config().firebase);

// initialize express server
const app = express();
app.use(cors({origin: true}));
const main = express();

main.use("/api/v1", app);
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({extended: false}));

// initialize the database and the collection
const db = admin.firestore();

app.get("/user/:email", async (req, res) => {
    try {
        const userQuerySnapshot =
            await db.doc(`users/${req.params.email}`).get();
        res.status(200).json({
            email: userQuerySnapshot.id,
            ...userQuerySnapshot.data(),
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

// Create a request
app.post('/request', async (req, res) => {
  try {
    const requestData = req.body;
    const docRef = await db.collection('requests').add(requestData);
    res.status(201).send({ id: docRef.id });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a request (approve, reject, delete)
app.put('/request/:id', async (req, res) => {
  try {
    const requestId = req.params.id;
    const updates = req.body;
    await db.collection('requests').doc(requestId).update(updates);
    res.status(200).send('Request updated successfully.');
  } catch (error) {
    res.status(500).send(error);
  }
});

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
