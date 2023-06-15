const router = require("express").Router();
const ViewsController = require("../dao/controllers/views.controller");

const viewsController = new ViewsController();

router.get("/students", async (req, res) => {
  try {
    const { page = 1 } = req.query;

    const getStudents = await viewsController.paginate(page);

    const { docs, hasPrevPage, hasNextPage, nextPage, prevPage } = getStudents;

    return res.render("students", {
      students: docs,
      page,
      hasPrevPage,
      hasNextPage,
      prevPage,
      nextPage,
      style: "students.css",
      title: "Students",
    });
  } catch (error) {
    console.log("🚀 ~ file: views.routes.js:6 ~ router.get ~ error:", error);
  }
});

module.exports = router;
