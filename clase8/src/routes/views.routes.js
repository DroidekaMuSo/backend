const { Router } = require("express");

class ViewsRoutes {
  path = "/views";
  router = Router();

  constructor() {
    this.initViewsRoutes();
  }

  initViewsRoutes() {
    this.router.get(`${this.path}/students`, async (req, res) => {
      try {
        let students = [{ name: "Test", lastName: "Last Name", dni: "DNI" }];

        res.render("students", { students });
      } catch (error) {
        console.log(error);
      }
    });

    this.router.get(`${this.path}/courses`, async (res, req) => {
      try {
        let courses = [];

        res.render("courser", courses);
      } catch (error) {
        console.log(error);
      }
    });
  }
}

module.exports = ViewsRoutes;
