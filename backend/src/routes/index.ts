import eventRoutes from "./event.routes";
import { Express } from "express";

export function initRoutes(app: Express) {
  app.use("/api/event", eventRoutes);
  app.use("/healthcheck", (req, res) => res.send("OK"));

  return app;
}
