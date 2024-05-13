import mongoose from "mongoose";
require("dotenv").config();
// Connect to DB from env variable url, create instance
export function initDB() {
  const db = process.env.MONGODB_URI || "mongodb://localhost:27017/test";

  mongoose
    .connect(db, {
      user: process.env.MONGODB_USER,
      pass: process.env.MONGODB_PASSWORD,
    })
    .then(() => {
      console.log(`Connected to ${db}...`);
    })
    .catch((err) => {
      console.log(err);
    });
}
