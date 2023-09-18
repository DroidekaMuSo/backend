import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import displayRoutes from "express-routemap";
import path from "path";

import emailRouter from "./routes/email.router.js";
import { MONGO_URL, PORT, __dirname } from "./utils/constants.js";

try {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser);
  app.use("/static", express.static(path.join(__dirname, "../","../", "/public")));


  app.use("/api/email", emailRouter);

  mongoose
    .connect(MONGO_URL)
    .then((con) => {
      console.log("🚀 ~ file: index.js:19 ~ mongoose.connect ~ connected");
    })
    .then(() => {
      app.listen(PORT, () => {
        console.log(`🚀 API running on port ${PORT}`);
        displayRoutes(app);
      });
    });
} catch (error) {
  console.log("🚀 ~ file: index.js:9 ~ error:", error);
}
