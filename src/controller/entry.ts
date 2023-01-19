import { NextFunction, Request, Response } from "express";
import { ResponseWrapper } from "../helpers/responseWrapper";
import { cNewUser } from "../models/entry.model";
import { createNewUser } from "../services";

const addUser = async (req: cNewUser, res: Response, next: NextFunction): Promise<Response> => {
  const response: ResponseWrapper = new ResponseWrapper(res);

  // TODO
  // CHECK IF THE USERNAME OR EMAIL ALREADY EXIST

  const dbResponse = await createNewUser(req.cUser);

  return response.created(dbResponse);
}

export { addUser };