import express, { type Request, type Response } from "express";
import { timeStamp } from "node:console";
import userRoutes from "./routes/user.routes";
import orderRoutes from "./routes/orders.routes";
import productRoutes from "./routes/products.routes";

export const createApp = () => {
  const app = express();

  app.use(express.json());

  app.use("/users", userRoutes);
  app.use("/orders", orderRoutes);
  app.use("/products", productRoutes);

  app.get("/health", (req: Request, res: Response) => {
    res
      .status(200)
      .json({ status: "ok", timeStamp: new Date().toDateString() });
  });
  return app;
};
