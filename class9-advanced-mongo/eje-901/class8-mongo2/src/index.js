const App = require("./app");

const BaseRouter = require("./routes/base.routes");
const CoursesRouter = require("./routes/courses.routes");
const StudentsRouter = require("./routes/students.routes");
const ViewsRouter = require("./routes/views.routes");

const app = new App([
  new BaseRouter(),
  new CoursesRouter(),
  new StudentsRouter(),
  new ViewsRouter(),
  
]);

app.listen();
