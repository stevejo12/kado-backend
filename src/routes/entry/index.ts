import express, { Request, Response, NextFunction} from "express";
import { addUser } from "../../controller/index";

const router = express.Router();

router.post("/add", (req: Request, res: Response, next: NextFunction) => {
  addUser(req,res,next);

  // TODO
  // wrapper to determine success or fail of request
})

export default router;