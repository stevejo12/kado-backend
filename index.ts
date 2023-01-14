import express, { Express, Request, Response } from "express";
import http from "http";
import dotenv from "dotenv";
import bodyParser from "body-parser"
import routes from "./src/routes/index";

dotenv.config();

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
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})

