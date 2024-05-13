import mongoose, { Schema, Document, Model } from "mongoose";

// Define interface for MyEvent
export interface MyEvent {
  _id: string;
  description: string;
  price: number;
  start: Date;
  end: Date;
}

// Define Mongoose schema
const MyEventSchema: Schema = new Schema<MyEvent>({
  description: { type: String, required: true },
  price: { type: Number, required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
});

// Define Mongoose model
// interface MyEventModel extends MyEvent, Document {}
// const MyEventModel = mongoose.model<MyEventModel>("MyEvent", MyEventSchema);
const MyEventModel: Model<MyEvent> = mongoose.model<MyEvent>(
  "MyEvent",
  MyEventSchema
);

export default MyEventModel;
