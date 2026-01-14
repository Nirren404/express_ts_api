import express, { type Request, type Response } from "express";
import productRoutes from "./routes/product.routes";
import { timeStamp } from "node:console";

export const createApp = () => {
  const app = express();

  // Product routes
  app.use("/api/products", productRoutes);
  app.use("/api/products/:id", productRoutes);

  app.use(express.json());

  app.get("/health", (req: Request, res: Response) => {
    res
      .status(200)
      .json({ status: "ok", timeStamp: new Date().toDateString() });
  });
  return app;
};
