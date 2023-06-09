const router = require("express").Router();

const studentModel = require("../model/student.model");
const studentsData = require("../data/students");

router.get("/insertion", async (req, res) => {
  try {
    let result = await studentModel.insertMany(studentsData);

    return res.json({
      message: "Students have been added",
      result,
    });
  } catch (error) {
    console.log(
      "🚀 ~ file: students.routes.js:10 ~ router.get ~ error:",
      error
    );
  }
});

router.get("/", async (req, res) => {
  try {
    const { gender } = req.query;

    const students = await studentModel
      .find(!gender ? {} : { gender: `${gender}` })
      .sort({ age: 1 });

    return res.json({
      message: "Students",
      students,
      length: students.length,
    });
  } catch (error) {
    console.log(
      "🚀 ~ file: students.routes.js:26 ~ router.get ~ error:",
      error
    );
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, lastName, age, id, course, grade, gender } = req.body;

    if (!name || !lastName || !age || !id || !course || !grade || !gender) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const user = { ...req.body };

    let result = await studentModel.create(user);

    return res.json({
      message: "User created",
      student: result,
    });
  } catch (error) {
    console.log(
      "🚀 ~ file: students.routes.js:46 ~ router.post ~ error:",
      error
    );
  }
});

router.get("/:sid", async (req, res) => {
  try {
    const { sid } = req.params;
    let student = await studentModel.findById({ _id: sid });

    if (!student) return res.json({ message: "User not found" });

    return res.json({ message: `Student with ID ${sid} found`, student });
  } catch (error) {
    console.log(
      "🚀 ~ file: students.routes.js:73 ~ router.get ~ error:",
      error
    );
  }
});

router.put("/:sid", async (req, res) => {
  try {
    const { sid } = req.params;
    const dataToUpdate = req.body;

    await studentModel.findByIdAndUpdate(sid, dataToUpdate);

    const student = await studentModel.findById(sid);

    return res.json({ message: `Student ${sid} has been updated`, student });
  } catch (error) {
    console.log(
      "🚀 ~ file: students.routes.js:73 ~ router.put ~ error:",
      error
    );
  }
});

router.delete("/:sid", async (req, res) => {
  try {
    const { sid } = req.params;

    await studentModel.findByIdAndDelete({ _id: sid });

    return res.json({
      message: `Student with Id ${sid} has been deleted`,
    });
  } catch (error) {
    console.log(
      "🚀 ~ file: students.routes.js:90 ~ router.delete ~ error:",
      error
    );
  }
});

router.get("/pagination", async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 5;
    const page = Number(req.query.page) || 1;
    const order = req.query.oder === "asc" ? 1 : -1;

    let result = await studentModel
      .find({})
      .limit(limit * 1)
      //   .skip(page * limit)
      .sort({ age: order });

    return res.json({
      message: "Pagination",
      students: result,
      page,
      limit,
    });
  } catch (error) {
    console.log(
      "🚀 ~ file: students.routes.js:107 ~ router.get ~ error:",
      error
    );
  }
});

router.get("/filters", async (req, res) => {
  try {
    const studnerOrder = await studentModel.find({}).sort({ age: -1 });

    const youngestStudent = await studentModel
      .find({})
      .sort({ age: 1 })
      .limit(1);

    const [, secondYoungestStudent] = await studentModel
      .find({})
      .sort({ age: 1 })
      .limit(2);

    const johnList = await studentModel.find({
      name: /^John.*/i,
    });

    const john29List = await studentModel.find({
      name: /^John.*/i,
      age: { $eq: 29 },
    });

    const twoNames = await studentModel.find({
      $or: [{ name: /^John.*/i }, { name: /^Jane.*/i }],
    });

    const greaterThan25 = await studentModel.find({ age: { $gt: 20 } });

    const lessThan20 = await studentModel.find({ age: { $lte: 20 } });

    const not22 = await studentModel.find({ $nor: [{ age: { $eq: 22 } }] });

    return res.json({
      message: "Many filters",
      studnerOrder,
      youngestStudent,
      secondYoungestStudent,
      johnList,
      john29List,
      twoNames,
      greaterThan25,
      lessThan20,
      not22,
    });
  } catch (error) {
    console.log(
      "🚀 ~ file: students.routes.js:134 ~ router.get ~ error:",
      error
    );
  }
});

router.get("/advance", async (req, res) => {
  try {
    const between22and25 = await studentModel.find({
      $and: [{ age: { $gte: 2 } }, { age: { $lte: 20 } }],
    });

    const updateStudentAge = await studentModel.updateOne(
      { _id: "648288439798b11ad5488251" },
      {
        $set: {
          age: 20,
          gender: "Female",
        },
      }
    );

    const updateStudentsAge = await studentModel.updateMany(
      { age: { $eq: 25 } },
      { $set: { age: 40 } }
    );

    const deleteJohns = await studentModel.deleteMany({ name: /^John.*/i });

    const deleteStudents = await studentModel.deleteMany({
      _id: { $exists: true },
    });

    return res.json({
      message: "Many filters",
      between22and25,
      updateStudentAge,
      updateStudentsAge,
      deleteJohns,
      deleteStudents,
    });
  } catch (error) {
    console.log(
      "🚀 ~ file: students.routes.js:186 ~ router.get ~ error:",
      error
    );
  }
});

module.exports = router;
