import {NextFunction, Request, RequestHandler, Response} from "express";
import {User} from "../models/User";
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

export interface RequestWithUser extends Request {
  user?: User;
}

// Express middleware that validates Firebase ID Tokens passed in the Authorization HTTP header.
// The Firebase ID token needs to be passed as a Bearer token in the Authorization HTTP header like this:
// `Authorization: Bearer <Firebase ID Token>`.
// when decoded successfully, the ID Token content will be added as `req.user`.
export const validateFirebaseIdToken: (
  db: admin.firestore.Firestore
) => RequestHandler =
  (db) => async (req: RequestWithUser, res: Response, next: NextFunction) => {
    functions.logger.log(
      "Check if request is authorized with Firebase ID token"
    );

    if (
      (!req.headers.authorization ||
        !req.headers.authorization.startsWith("Bearer ")) &&
      !(req.cookies && req.cookies.__session)
    ) {
      functions.logger.error(
        "No Firebase ID token was passed as a Bearer token in the Authorization header.",
        "Make sure you authorize your request by providing the following HTTP header:",
        "Authorization: Bearer <Firebase ID Token>",
        'or by passing a "__session" cookie.'
      );
      res.status(403).send("Unauthorized");
      return;
    }

    let idToken;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      functions.logger.log('Found "Authorization" header');
      // Read the ID Token from the Authorization header.
      idToken = req.headers.authorization.split("Bearer ")[1];
    } else if (req.cookies) {
      functions.logger.log('Found "__session" cookie');
      // Read the ID Token from cookie.
      idToken = req.cookies.__session;
    } else {
      // No cookie
      res.status(403).send("Unauthorized");
      return;
    }

    try {
      const decodedIdToken = await admin.auth().verifyIdToken(idToken);
      functions.logger.log("ID Token correctly decoded", decodedIdToken);
      if (decodedIdToken.email) {
        const userSnapshot = await db
          .collection("users")
          .doc(decodedIdToken.email)
          .get();
        if (!userSnapshot.exists) {
          functions.logger.error("No user found in the database");
          res.status(403).send("Unauthorized");
          return;
        }
        req.user = userSnapshot.data() as User;
      }
      next();
      return;
    } catch (error) {
      functions.logger.error("Error while verifying Firebase ID token:", error);
      res.status(403).send("Unauthorized");
      return;
    }
  };

export const localAuth: (db: admin.firestore.Firestore) => RequestHandler =
  (db) => async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      functions.logger.info("Looking for user in db...");
      const userSnapshot = await db
        .collection("users")
        .doc("luis.santos@lab900.com")
        .get();
      if (!userSnapshot.exists) {
        functions.logger.error("No user found in the database");
        res.status(403).send("Unauthorized");
        return;
      }
      req.user = userSnapshot.data() as User;
      functions.logger.info("User found in the database", req.user);
      next();
    } catch (error) {
      functions.logger.error(
        "Error while fetching user from the database:",
        error
      );
      res.status(403).send("Unauthorized");
    }
  };
