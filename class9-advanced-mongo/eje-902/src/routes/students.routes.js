const router = require("express").Router();
const StudentsController = require("../dao/controllers/students.controller");

const studentsController = new StudentsController();

router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 4 } = req.query;
    const data = await studentsController.paginate(page, limit);

    const {
      docs,
      totalDocs,
      limit: limitPag,
      totalPages,
      hasPrevPage,
      hasNextPage,
      nextPage,
      prevPage,
    } = data.studentsPaginate;

    return res.json({
      message: "Stundents",
      students: docs,
      studentAverage: data.studentsAverage[0].average,
      length: totalDocs,
      limit: limitPag,
      page,
      totalPages,
      hasNextPage,
      nextPage,
      hasPrevPage,
      prevPage,
    });
  } catch (error) {
    console.log("🚀 ~ file: students.routes.js:9 ~ router.get ~ error:", error);
  }
});

module.exports = router;
