import {RequestHandler} from "express";
import * as admin from "firebase-admin";
import {z} from "zod";
import {RequestWithUser} from "../middleware/validate-token";
import {Request} from "../models/Request";
import * as functions from "firebase-functions";

const CreateRequestSchema = z.object({
  from: z.string(),
  to: z.string(),
  halfDays: z.array(z.string()),
  requesterRemark: z.string().optional(),
});

export const createRequest: (db: admin.firestore.Firestore) => RequestHandler =
  (db) => async (req: RequestWithUser, res) => {
    try {
      const request = CreateRequestSchema.parse(req.body);
      functions.logger.log("Creating holiday request for user: ",
          req.user?.email);
      const requestData: Request = {
        ...request,
        status: "pending",
        createdOn: new Date(),
        year: new Date().getFullYear(),
        requester: req.user!.email,
        days: 0,
      };

      const docRef = await db.collection("requests").add(requestData);
      res.status(201).send({id: docRef.id});
    } catch (error) {
      res.status(500).send(error);
    }
  };
