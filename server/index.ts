import express from "express";
import bodyParser from "body-parser";
import http from "http";
import cors from "cors";

import { initRoutes } from "./routes";
import { initDB } from "./startup/db";

const port = process.env.PORT || 3900;
const app = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use(cors());

initDB();
initRoutes(app);

http
  .createServer(app)
  .listen(port, () => console.log(`server running at port ${port}`));
