import { Request, Response, NextFunction } from "express";

// TODO
// Setup Logger
const errorLogger = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("\x1b[31m", err);
  next(err);
}

export { errorLogger };