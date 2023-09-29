import { RequestHandler } from "express";
import * as admin from "firebase-admin";
import { z } from "zod";
import { RequestWithUser } from "../middleware/validate-token";


const UpdateRequestSchema = z.object({
  status: z.enum(["approved", "rejected"]),
  approverRemark: z.string().optional(),
});

export const updateRequest: (db: admin.firestore.Firestore) => RequestHandler =
  (db) => async (req: RequestWithUser, res) => {
    try {
      const request = UpdateRequestSchema.parse(req.body);
      const docRef = db.collection('requests').doc(req.params.id);
      await docRef.update(request);
      res.status(201).send({ id: docRef.id });
    } catch (error) {
      res.status(500).send(error);
    }
  };
