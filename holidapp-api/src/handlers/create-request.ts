import { RequestHandler } from "express";
import * as admin from "firebase-admin";
import { z } from "zod";

export const createRequest: (db: admin.firestore.Firestore) => RequestHandler =
  (db) => async (req, res) => {
    try {
      const requestData = req.body;
      const docRef = await db.collection("requests").add(requestData);
      res.status(201).send({ id: docRef.id });
    } catch (error) {
      res.status(500).send(error);
    }
  };
