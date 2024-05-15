import { Request, Response } from "express";
import MyEventModel from "../models/eventModel";

// Create event
export const createEvent = async (req: Request, res: Response) => {
  try {
    const { description, price, start, end } = req.body;
    const newEvent = await MyEventModel.create({
      description: description,
      price: price,
      start: start,
      end: end,
    });
    res.status(201).json(newEvent);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// Read events
export const readEvents = async (req: Request, res: Response) => {
  try {
    const events = await MyEventModel.find();
    res.json(events);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// Update event
export const updateEvent = async (req: Request, res: Response) => {
  try {
    const updatedEvent = await MyEventModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedEvent);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
// Delete event
export const deleteEvent = async (req: Request, res: Response) => {
  try {
    await MyEventModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Event deleted" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
