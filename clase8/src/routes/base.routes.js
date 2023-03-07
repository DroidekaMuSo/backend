const { Router } = require("express");

class BaseRoute {
  path = "/alive";
  router = Router();

  constructor() {
    this.initBaseRoutes();
  }

  initBaseRoutes() {
    try {
      this.router.get(`${this.path}`, (req, res) => {
        res.json({
          ok: true,
          message: `I'm an API and I'm running`,
        });
      });
    } catch (error) {
      console.log(
        "🚀 ~ file: base.routes.js:20 ~ BaseRoute ~ initBaseRoutes ~ error:",
        error
      );
    }
  }
}

module.exports = BaseRoute;
