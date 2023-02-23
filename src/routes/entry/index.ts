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
    profilePicture: "https://images.pexels.com/photos/1310524/pexels-photo-1310524.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  }

  return addUser(cReq,res,next);
})

export default router;