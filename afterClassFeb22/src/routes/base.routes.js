const { Router } = require("express");

class BaseRoute {
  path = "/alive";
  router = Router();

  constructor() {
    this.initBaseRoute();
  }

  initBaseRoute() {
    this.router.get(`${this.path}`, (req, res) => {
      res.status(200).json({
        ok: true,
        message: "API alive",
      });
    });
  }
}

module.exports = BaseRoute;
