import express from "express";
import {
  createEvent,
  readEvents,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController";

const router = express.Router();

router.post("/", createEvent);

router.get("/", readEvents);

router.put("/:id", updateEvent);

router.delete("/:id", deleteEvent);

export default router;
