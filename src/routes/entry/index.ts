import express, { Request, Response, NextFunction} from "express";
import { addUser } from "../../controller/index";
import { hashPassword } from "../../helpers/user";
import { cNewUser } from "../../models/entry.model";

const router = express.Router();

router.post("/add", async (req: Request, res: Response, next: NextFunction) => {
  const cReq = req as cNewUser;
  cReq.cUser = {
    username: req.body.username,
    email: req.body.email,
    password: await hashPassword(req.body.password as string),
    profilePicture: req.body.profilePicture
  }

  addUser(cReq,res,next);

  // TODO
  // wrapper to determine success or fail of request
  res.send(cReq.cUser);
})

export default router;