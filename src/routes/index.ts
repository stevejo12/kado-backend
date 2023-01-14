import { Router, Request, Response } from "express";
import entry from "./entry/index";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Eaaaaaxpress + Typescript Server");
})
router.use('/user', entry);

export default router;