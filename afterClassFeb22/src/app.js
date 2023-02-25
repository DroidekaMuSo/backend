const express = require("express"),
  cors = require("cors"),
  displayRoutes = require("express-routemap");

const { API_VERSION, NODE_ENV, PORT } = require("./config/config"),
  corsConfig = require("./config/cors.config"),
  { mongoDBconnection } = require("./db/mongo.config");

class App {
  app;
  env;
  port;
  server;

  constructor(routes) {
    this.app = express();
    this.env = NODE_ENV || "development";
    this.port = Number(PORT) || 5000;

    this.connectToDataBase();
    this.initializeMiddleWares();
    this.initizalizeRoutes(routes);
  }

  getServer() {
    return this.app;
  }

  closeServer(done) {
    this.server = this.app.listen(this.port, () => {
      done();
    });
  }

  async connectToDataBase() {
    await mongoDBconnection();
  }

  initializeMiddleWares() {
    this.app.use(cors(corsConfig));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use("static", express.static(`${__dirname}/public`));
  }

  initizalizeRoutes(routes) {
    routes.forEach((route) => {
      this.app.use(`/api/${API_VERSION}`, route.router);
    });
  }

  listen() {
    this.app.listen(this.port, () => {
      displayRoutes(this.app);

      console.log(`=================================`);
      console.log(`======= ENV: ${this.env} =======`);
      console.log(` App running on the port ${this.port}`);
      console.log(`=================================`);
    });
  }
}

module.exports = App;
