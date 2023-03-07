import express, { Request, Response, NextFunction} from "express";
import { addUser, loggedInUser } from "../../controller/index";
import { generateJWT, hashPassword } from "../../helpers/user";
import { cNewUser, LoginInfo, userTokenInfo } from "../../models/entry.model";

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

router.post("/getByLogin", async (req: Request, res: Response, next: NextFunction) => {
  let user: LoginInfo = {
    email: req.body.email,
    password: req.body.password
  }

  return loggedInUser(user, res, next);
})

router.get("/generateRefreshToken", (req: Request, res: Response, next: NextFunction) => {
  let userInfo: userTokenInfo = {
    id: req.body.id
  }

  return generateJWT(userInfo.id);
})

export default router;