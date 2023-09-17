import expres from "express";
import displayRoutes from "express-routemap";
import path from "path";

import userRoutes from "./routes/user.routes.js";

import { PORT, __dirname } from "./utils/constants.js";

console.log("🚀 ~ file: index.js:8 ~ __dirname:", __dirname);
console.log("🚀 ~ file: index.js:8 ~ PORT:", PORT);

const app = expres();

app.use(expres.urlencoded({ extended: true }));
app.use(expres.static(path.join(__dirname, "../", "/public")));

app.use("/api/user", userRoutes);

app.listen(PORT, () => {
  console.log(`API running on port: ${PORT}`);
  displayRoutes(app);
});
