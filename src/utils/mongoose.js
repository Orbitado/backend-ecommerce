import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const { MONGO_LINK } = process.env;

if (!MONGO_LINK) {
  throw new Error("MONGO_LINK is not defined");
}

export function connectDb() {
  mongoose
    .connect(MONGO_LINK)
    .then(() => {
      try {
        console.log(`Connected to MongoDB`);
      } catch (error) {
        console.log(error);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
