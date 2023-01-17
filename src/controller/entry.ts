import { NextFunction, Request, Response } from "express";
import { cNewUser } from "../models/entry.model";
// import { EntryService } from "../services/index";

const addUser = (req: cNewUser, res: Response, next: NextFunction) => {
  try {
    // const service = new EntryService();

    // TODO
    // pisahin newUser data nya kesini.
    // nanti buat dipass ke service
    console.log('req body:', req.body);

    // res.json(await service.create())
  } catch (err: any) {
    if (err instanceof Error) {
      console.error(`Error while creating new user`, err.message);
    } else if (typeof err === "string") {
      console.error(err);
    }
  }
}

export { addUser };