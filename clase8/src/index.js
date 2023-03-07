//App
const App = require("./app");

//Routes
const BaseRoute = require("./routes/base.routes");
const CoursesRoutes = require("./routes/courses.routes");
const StudentsRoutes = require("./routes/students.routes");
const ViewsRoutes = require("./routes/views.routes");

console.log(CoursesRoutes)

const app = new App([
  new BaseRoute(),
  new CoursesRoutes(),
  new StudentsRoutes(),
  new ViewsRoutes(),
]);

app.listen();
