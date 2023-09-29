import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import {createRequest} from "./handlers/create-request";
import {updateRequest} from "./handlers/update-request";

import {RequestWithUser, localAuth} from "./middleware/validate-token";

// initialize firebase inorder to access its services
admin.initializeApp(functions.config().firebase);

const main = express();

// initialize the database and the collection
const db = admin.firestore();

// Add the middleware to your routes
main.use(cors({ origin: true }));
main.use(localAuth(db));
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({extended: false}));

// Get Authenticated User
main.get("/user", async (req: RequestWithUser, res) => {
  res.status(200).send({user: req?.user});
});

// Create a holiday request
main.post("/request", createRequest(db));

// Update a request (approve, reject, delete)
main.put("/request/:id", updateRequest(db));

// List all of my requests
main.get("/requests/my/:year", async (req: RequestWithUser, res) => {
  try {
    const email = req.user?.email;
    const year = Number(req.params.year);
    functions.logger.info("Looking for requestst in db, email: ", email);
    functions.logger.info("Looking for requestst in db, year: ", year);

    const querySnapshot = await db
        .collection("requests")
        .where("requester", "==", email)
        .where("year", "==", year)
        .get();
    const requests = querySnapshot.docs.map((doc) => doc.data());
    res.status(200).send(requests);
  } catch (error) {
    res.status(500).send(error);
  }
});

// List all open requests (for approvers)
main.get("/requests/open", async (req, res) => {
  try {
    const querySnapshot = await db
        .collection("requests")
        .where("answeredOn", "==", null)
        .get();
    const requests = querySnapshot.docs.map((doc) => doc.data());
    res.status(200).send(requests);
  } catch (error) {
    res.status(500).send(error);
  }
});

export const webApi = functions.https.onRequest(main);
