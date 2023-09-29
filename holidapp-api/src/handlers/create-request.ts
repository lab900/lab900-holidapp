import { RequestHandler } from "express";
import * as admin from "firebase-admin";
import { z } from "zod";
import { RequestWithUser } from "../middleware/validate-token";
import { Request } from "../models/Request";

const CreateRequestSchema = z.object({
  from: z.string().datetime(),
  to: z.string().datetime(),
  halfDays: z.array(z.string().datetime()),
  requesterRemark: z.string().optional(),
});

export const createRequest: (db: admin.firestore.Firestore) => RequestHandler =
  (db) => async (req: RequestWithUser, res) => {
    try {
      const request = CreateRequestSchema.parse(req.body);

      const requestData: Request = {
        ...request,
        createdOn: new Date(),
        requester: req.user!.email,
        days: 0,
      };

      const docRef = await db.collection("requests").add(requestData);
      res.status(201).send({ id: docRef.id });
    } catch (error) {
      res.status(500).send(error);
    }
  };
