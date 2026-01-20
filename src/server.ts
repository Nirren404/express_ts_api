import dotenv from "dotenv";
import { createApp } from "./app";
import { dot } from "node:test/reporters";
import mongoose from "mongoose";

dotenv.config();

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;
const MONGO_ENV = process.env.NODE_END || "development";
const MONGO_URI = process.env.MONGO_URI ?? "mongodb://localhost:27017";
const startServer = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.info("✅Connected to MongoDB");

    const app = createApp();

    app.listen(PORT, () => {
      console.log(
        ` Server running in ${process.env.NODE_ENV}  http://localhost:${PORT} `,
      );
    });
  } catch (error) {
    console.error("❌Failed to connect to MongoDB", error);
    process.exit(1);
  }
};

startServer();
