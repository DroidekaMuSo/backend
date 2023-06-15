const router = require("express").Router();

const studentModel = require("../dao/model/students.model");

router.get("/", async (req, res) => {
  try {
    const students = await studentModel.getStudents();

    return res.status(200).json({ message: "All students", students });
  } catch (error) {
    console.log("🚀 ~ file: students.router.js:7 ~ router.get ~ error:", error);
  }
});

router.get("/groups", async (req, res) => {
  try {
    const studentsByGrade = await studentModel.aggregate([
      { $group: { _id: "$grade", students: { $push: "$$ROOT" } } },
      { $sort: { _id: 1 } },
    ]);

    const studnetsByGradeV2 = await studentModel.aggregate([
      { $sort: { grade: 1 } },
      { $group: { _id: "$grade", students: { $push: "$$ROOT" } } },
    ]);

    const studentsInGroups = await studentModel.aggregate([
      { $group: { _id: "$group", students: { $push: "$$ROOT" } } },
    ]);

    return res.status(200).json({
      message: "Groups",
      studentsByGrade,
      studnetsByGradeV2,
      studentsInGroups,
    });
  } catch (error) {
    console.log(
      "🚀 ~ file: students.router.js:19 ~ router.get ~ error:",
      error
    );
  }
});

router.get("/average/group", async (req, res) => {
  try {
    const { group } = req.query;

    if (!group) {
return res.status(400).json({message:"Gender has not been specified"})
    }

    const studentAverageByGroup = await studentModel.aggregate([
      { $match: { group: `${group.toLocaleLowerCase()}` } },
      {
        $group: {
          _id: `${group.toLocaleLowerCase()}`,
          average: { $avg: "$grade" },
        },
      },
    ]);

    return res.status(200).json({ studentAverageByGroup });

  } catch (error) {
    console.log(
      "🚀 ~ file: students.router.js:49 ~ router.get ~ error:",
      error
    );
  }
});

router.get("/average/general", async (req, res) => {
  try {
    const generalAverage = await studentModel.aggregate([
      { $group: { _id: "Students", average: { $avg: "$grade" } } },
    ]);

    return res.status(200).json({ generalAverage });
  } catch (error) {
    console.log(
    "🚀 ~ file: students.router.js:65 ~ router.get ~ error:",
    error
    );
  }
});

router.get("/avergae/grade/:gender", async (req, res) => {
  try {
    //~ req.query is better for this route

    const { gender } = req.params;

    if (gender.toLowerCase() === "m") {
      const maleStudentsAverage = await studentModel.aggregate([
        { $match: { gender: "male" } },
        { $group: { _id: "Men", average: { $avg: "$grade" } } },
      ]);

      return res.status(200).json({ maleStudentsAverage });
    }

    if (gender.toLowerCase() === "f") {
      const femaleStudentsAverage = await studentModel.aggregate([
        { $match: { gender: "female" } },
        {
          $group: { _id: "Women", average: { $avg: "$grade" } },
        },
      ]);

      return res.status(200).json({ femaleStudentsAverage });
    }

    if (gender.toLowerCase() !== "f" || gender.toLowerCase() !== "m") {
      return res.status(400).json({
        message: `Gender ${gender} is not in the system `,
      });
    }

    //* Using params to create just one query
    // const genderStunderAverage = await studentsModel.aggregate([
    //   { $match: { gender: `${gender}` } },
    //   {
    //     $group: {
    //       _id: `${gender}`,
    //       promedio: { $avg: "$grade" },
    //       cantidad: { $sum: "$grade" },
    //       cantidadEst: { $sum: 1 },
    //     },
    //   },
    // ]);

    return res.status(200).json({ genderStunderAverage });
  } catch (error) {
    console.log(
    "🚀 ~ file: students.router.js:80 ~ router.get ~ error:",
    error
    );
  }
});

module.exports = router;
