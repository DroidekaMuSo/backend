//Dependecies
const express = require("express");
const cors = require("cors");
const displayRoutes = require("express-routemap");
const handlebars = require("express-handlebars");

//Files
const corsConfig = require("./config/cors.config");
const { mongoDBconnection } = require("./db/mongo.config");
const { PORT, NODE_ENV } = require("./config/config");
//Development constants
const API_VERSION = "v1";

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
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initHandlebars();
  }

  getServer() {
    try {
      return this.app;
    } catch (error) {
      console.log("🚀 ~ file: app.js:35 ~ App ~ getServer ~ error:", error);
    }
  }

  closeServer(done) {
    try {
      this.server = this.app.listen(this.port, () => {
        done();
      });
    } catch (error) {
      console.log("🚀 ~ file: app.js:45 ~ App ~ closeServer ~ error:", error);
    }
  }

  async connectToDataBase() {
    try {
      await mongoDBconnection();
    } catch (error) {
      console.log(
        "🚀 ~ file: app.js:54 ~ App ~ connectToDataBase ~ error:",
        error
      );
    }
  }

  //Middlewares
  initializeMiddlewares() {
    try {
      this.app.use(cors(corsConfig));
      this.app.use(express.json());
      this.app.use(express.urlencoded({ extended: true }));
      this.app.use("/static", express.static(`${__dirname}/public`));
    } catch (error) {
      console.log(
        "🚀 ~ file: app.js:68 ~ App ~ initializeMiddlewares ~ error:",
        error
      );
    }
  }

  initHandlebars() {
    try {
      this.app.engine("handlebars", handlebars.engine());
      this.app.set("views", __dirname + "/views");
      this.app.set("view engine", "handlebars");
    } catch (error) {
      console.log(
        "🚀 ~ file: app.js:82 ~ App ~ initHandlebars ~ error:",
        error
      );
    }
  }

  initializeRoutes(routes) {
    try {
      routes.forEach((route) => {
        this.app.use(`/api/${API_VERSION}`, route.router);
      });
    } catch (error) {
      console.log(
        "🚀 ~ file: app.js:92 ~ App ~ initializeRoutes ~ error:",
        error
      );
    }
  }

  listen() {
    try {
      this.app.listen(this.port, () => {
        displayRoutes(this.app);
        console.log(`=================================`);
        console.log(`======= ENV: ${this.env} =======`);
        console.log(`🚀 App listening on the port ${this.port}`);
        console.log(`=================================`);
      });
    } catch (error) {
      console.log("🚀 ~ file: app.js:112 ~ App ~ listen ~ error:", error);
    }
  }
}

module.exports = App;
