const express = require("express");
const cors = require("cors");
const displayRoutes = require("express-routemap");
const handlebars = require("express-handlebars");
const path = require("path");

const corsConfig = require("./config/cors.config");

const { mongoDBconnection } = require("./db/mongo.config");
const { PORT, API_VERSION, NODE_ENV } = require("./config/config");

class App {
  app;
  env;
  port;
  server;

  constructor(routes) {
    this.app = express();
    this.env = NODE_ENV || "development";
    this.port = +PORT || 5_000;

    this.connectToDataBase();
    this.initializeHandlebars();
    this.initializeUses();
    this.initializeRouter(routes);
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
    try {
      await mongoDBconnection();
    } catch (error) {
      console.log(
        "🚀 ~ file: app.js:43 ~ App ~ connectToDataBase ~ error:",
        error
      );
    }
  }

  initializeUses() {
    try {
      this.app.use(cors(corsConfig));
      this.app.use(express.json());
      this.app.use(express.urlencoded({ extended: true }));
      this.app.use(
        "/static",
        express.static(`${path.join(__dirname, "/public")}}`)
      );
    } catch (error) {
      console.log(
        "🚀 ~ file: app.js:47 ~ App ~ initializeUses ~ error:",
        error
      );
    }
  }

  initializeHandlebars() {
    try {
      this.app.engine("handlebars", handlebars.engine());
      this.app.set("views", path.join(__dirname, "/views"));
      this.app.set("view engine", "handlebars");
    } catch (error) {
      console.log(
        "🚀 ~ file: app.js:57 ~ initializeHandlebars ~ error:",
        error
      );
    }
  }

  initializeRouter(routes) {
    try {
      routes.forEach((route) => {
        this.app.use(`/api/${API_VERSION}`, route.router);
      });
    } catch (error) {
      console.log("🚀 ~ file: app.js:63 ~ initializeRouter ~ error:", error);
    }
  }

  listen() {
    try {
      this.app.listen(this.port, () => {
        displayRoutes(this.app);

        console.log(`============ENV: ${this.env}=============`);
        console.log(`=====App rumming on port: ${PORT}========`);
      });
    } catch (error) {
      console.log("🚀 ~ file: app.js:94 ~ listen ~ error:", error);
    }
  }
}

module.exports = App;
