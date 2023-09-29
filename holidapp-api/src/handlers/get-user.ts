import {RequestHandler} from "express";
import {RequestWithUser} from "../middleware/validate-token";

export const getUser: RequestHandler = async (req: RequestWithUser, res) => {
  console.log("-> getUser", req.user);
  try {
    res.status(201).send({user: req.user});
  } catch (error) {
    res.status(500).send(error);
  }
};
