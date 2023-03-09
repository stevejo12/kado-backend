import express, { Express, Request, Response } from "express";
import http from "http";
import bodyParser from "body-parser"
import cors from "cors";
import routes from "./src/routes/index";
import logger from "./src/middlewares/logger";

const app: Express = express();
const port = process.env.PORT;

app.use(cors())
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get("/", (req: Request, res: Response) => {
  res.send("Express + Typescript Server");
})

app.use("/v1", routes)

const server = http.createServer(app);
server.listen(port, () => {
  logger.info(`⚡️[server]: Server is running at http://localhost:${port}`)
})

