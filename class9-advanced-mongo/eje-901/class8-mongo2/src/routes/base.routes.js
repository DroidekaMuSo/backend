const { Router } = require("express");

class BaseRoute {
  path = "/alive";
  router = Router();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(`${this.path}`, (req, res) => {
      try {
        return res.status(200).json({
          message: "I'm an API and I'm alive ",
        });
      } catch (error) {
        console.log(
          "🚀 ~ file: base.routes.js:15 ~ BaseRoute ~ router.get ~ error:",
          error
        );
      }
    });
  }
}

module.exports = BaseRoute;
