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

// define google cloud function name
interface User {
  email: string,
  quota?: Map<number, number>,
  roles?: string[],
}

app.get("/user/:email", async (req, res) => {
  try {
    const userQuerySnapshot =
      await db.doc(`users/${req.params.email}`).get();
    res.status(200).json({
      email: userQuerySnapshot.id,
      ...userQuerySnapshot.data(),
    } as User);
  } catch (error) {
    res.status(500).send(error);
  }
});

export const webApi = functions.https.onRequest(main);
