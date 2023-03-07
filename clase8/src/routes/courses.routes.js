const { Router } = require("express");

class CoursesRoutes {
  path = "/courses";
  router = Router();

  constructor() {
    this.initCoursesRoutes();
  }

  initCoursesRoutes() {
    this.router.get(`${this.path}`, async (res, req) => {});
    this.router.get(`${this.path}/:cid`, async (res, req) => {});
    this.router.post(`${this.path}`, async (res, req) => {});
    this.router.put(`${this.path}/:cid`, async (res, req) => {});
  }
}

module.exports = CoursesRoutes;
