import express, { type Request, type Response } from "express";
import { timeStamp } from "node:console";
import userRoutes from "./routes/user.routes";

export const createApp = () => {
  const app = express();

  app.use(express.json());

  // User Routes
  app.use("/api/users", userRoutes);

  app.get("/health", (req: Request, res: Response) => {
    res
      .status(200)
      .json({ status: "ok", timeStamp: new Date().toDateString() });
  });
  return app;
};
