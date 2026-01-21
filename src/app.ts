import express, { type Request, type Response } from "express";
import userRoutes from "./routes/user.routes";
import { timeStamp } from "node:console";

export const createApp = () => {
  const app = express();
  app.use(express.json());
  app.use("/api/user", userRoutes);

  // Health check endpoint

  app.get("/health", (req: Request, res: Response) => {
    res
      .status(200)
      .json({ status: "ok", timeStamp: new Date().toDateString() });
  });
  return app;
};
