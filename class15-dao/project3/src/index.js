import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import displayRoutes from "express-routemap";
import cors from "cors";

import businessRouter from "./routes/business.routes.js";
import ordersRouter from "./routes/orders.routes.js";
import userRouter from "./routes/user.routes.js";

import { MONGO_URL, PORT } from "./utils/constants.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5500",
    methods: ["GET", "PUT", "DELETE", "POST"],
  })
);

app.use("/api/users", userRouter);
app.use("/api/bussiness", businessRouter);
app.use("/api/orders", ordersRouter)

mongoose
  .connect(MONGO_URL)
  .then((conn) => {
    console.log("🚀 ~ file: index.js:22 ~ Connected!");
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`API running on port: ${PORT}`);
      displayRoutes(app);
    });
  })
  .catch((err) => {
    console.log("🚀 ~ file: index.js:22 ~ mongoose.connect ~ err:", err);
  });

