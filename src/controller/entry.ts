import { NextFunction, Response } from "express";
import { ResponseWrapper } from "../helpers/responseWrapper";
import { cNewUser, LoginInfo } from "../models/entry.model";
import { createNewUser, getUserByEmailAndPassword } from "../services";

const addUser = async (req: cNewUser, res: Response, next: NextFunction): Promise<Response> => {
  const response: ResponseWrapper = new ResponseWrapper(res);

  const dbResponse = await createNewUser(req.cUser);

  return response.created(dbResponse);
}

const loggedInUser = async (user: LoginInfo, res: Response, next: NextFunction) => {
  const response: ResponseWrapper = new ResponseWrapper(res);

  const dbResponse = await getUserByEmailAndPassword(user.email, user.password);

  return response.created(dbResponse);
}

export { addUser, loggedInUser };