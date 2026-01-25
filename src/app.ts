import express, { type Request, type Response } from "express";
import productRoutes from "./routes/product.routes";
import { timeStamp } from "node:console";
import e from "express";
import { errorHandler } from "./middleware/error.middleware";

export const createApp = () => {
  const app = express();

  app.use(express.json());

  // Product routes
  app.use("/api/products", productRoutes);
  app.use("/api/products/:id", productRoutes);

  app.get("/health", (req: Request, res: Response) => {
    res
      .status(200)
      .json({ status: "ok", timeStamp: new Date().toDateString() });
  });
  app.use(errorHandler);

  return app;
};
