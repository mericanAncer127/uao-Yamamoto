import express, { NextFunction, Response, Request } from "express";
import bodyParser from "body-parser";
import http from "http";
import cors from "cors";

import { initRoutes } from "./routes";
import { initDB } from "./startup/db";

const app = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use(cors());

initDB();
initRoutes(app);

http
  .createServer(app)
  .listen(5000, () => console.log(`server running at port 5000`));
