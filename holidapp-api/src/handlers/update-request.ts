import {RequestHandler} from "express";
import * as admin from "firebase-admin";
import {z} from "zod";
import {RequestWithUser} from "../middleware/validate-token";

const UpdateRequestSchema = z.object({
  status: z.enum(["approved", "rejected"]),
  approverRemark: z.string().optional(),
});

export const updateRequest: (db: admin.firestore.Firestore) => RequestHandler =
    (db) => async (req: RequestWithUser, res) => {
      try {
          const update = UpdateRequestSchema.parse(req.body);
          if (req.user?.roles?.includes("approver")) {
              const docRef = db.collection("requests").doc(req.params.id);
              await docRef.update(update);
              /**
               * TODO: update gives the following error
               *  await docRef.update(update);
               *  response.js:1150
               *  >      : JSON.stringify(value);
               *  >             ^
               *  >
               *  >  TypeError: Converting circular structure to JSON
               *  >      --> starting at object with constructor 'Socket'
               */
              res.status(201).send({id: docRef.id});
          } else {
              res.status(403).send("Unauthorized");
          }
      } catch (error) {
        res.status(500).send(req);
      }
    };
