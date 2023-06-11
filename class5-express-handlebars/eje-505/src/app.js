const express = require("express");
const displayRoutes = require("express-routemap");
const handlebars = require("express-handlebars");
const path = require("path");

//Routers
const viewsRouter = require("./routers/views.router.js");
const userRouter = require("./routers/user.router.js");

const PORT = 8080;
const BASE_PREFIX = "api";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));

app.engine("handlebars", handlebars.engine());
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "handlebars");

app.use("/", viewsRouter);
app.use(`/${BASE_PREFIX}/users`, userRouter);

app.listen(PORT, () => {
  displayRoutes(app);
  console.log(`API running on port ${PORT}`);
});
