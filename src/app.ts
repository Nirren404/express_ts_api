import express, { type Request, type Response } from "express";
import userRoutes from "./routes/user.routes";
import { timeStamp } from "node:console";
import { errorHandler } from "./middleware/error.middleware";
import authRoutes from "./routes/auth.routes";

export const createApp = () => {
  const app = express();
  app.use(express.json());

  app.use("/api/auth", authRoutes);
  app.use("/api/users", userRoutes);

  // * Error handling middleware
  app.use(errorHandler);

  // Health check endpoint
  app.get("/health", (req: Request, res: Response) => {
    res
      .status(200)
      .json({ status: "ok", timeStamp: new Date().toDateString() });
  });
  return app;
};
