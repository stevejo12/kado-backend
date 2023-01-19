import express, { Express, Request, Response } from "express";
import http from "http";
import winston from "winston";
import dotenv from "dotenv";
import bodyParser from "body-parser"
import routes from "./src/routes/index";
import logger from "./src/middlewares/logger";

const app: Express = express();
const port = process.env.PORT;

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

