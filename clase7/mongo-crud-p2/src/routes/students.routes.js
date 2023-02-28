const { Router } = require("express");

const studentsData = require("../data/students"),
  studentsModel = require("../model/students.model");

const router = Router();

router.get("/insertion", async (req, res) => {
  try {
    let result = await studentsModel.insertMany(studentsData);
    return res.json({
      message: "Students added",
      result,
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const { gender } = req.query;

    const result = await studentsModel
      .find(!gender ? {} : { gender: `${gender}` })
      .sort({ age: 1 });

    return res.json({
      message: "Students",
      students: result,
      studentsSize: result.length,
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, lastName, age, dni, course, grade, gender } = req.body;

    if (!name || !lastName || !age || !dni || !course || !grade || !gender) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    let user = { name, lastName, age, dni, course, grade, gender };
    let result = await studentsModel.create(user);

    return res.status(200).json({
      message: "User added",
      user: result,
    });
  } catch (error) {
    console.log(error);
  }
});

//TODO
router.get("/:sid", async (req, res) => { });

router.put("/:sid", async (req, res) => {
  try {
    const id = req.params.sid;
    const dataToUpdate = req.body;

    let result = await studentsModel.updateOne(
      { id: id },
      { $set: dataToUpdate }
    );

    return res.status(200).json({
      message: "User updated",
      user: result,
    });
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:sid", async (req, res) => {
  try {
    const id = req.params.sid;
    let result = await studentsModel.deleteOne({ id: id });

    return res.status(200).json({
      message: "User deleted",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/pagination ", async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 5;
    const page = Number(req.query.page) || 1;
    const order = req.query.order === "asc" ? 1 : -1;

    const result = await studentsModel
      .find()
      .limit(limit * 1)
      .skip(page * limit)
      .sort({ age: order });

    return res.status(200).json({
      message: "Students list",
      students: result,
      page,
      limit,
    });
  } catch (error) {
    console.log(error);
  }
});
router.get("/filters", async (req, res) => {
  try {
    //TODO: Sort students by age
    const studentsOrder = await studentsModel.find({}).sort({ age: -1 });

    //TODO: Find the youngest student
    const youngestStudent = await studentsModel
      .find({})
      .sort({ age: 1 })
      .limit(1);

    //TODO: Find the second youngest student
    const secondYoungestStudent = await studentsModel
      .find({})
      .sort({ age: 1 })
      .limit(2);


    //TODO: All students named Juan 
    const JuansStudents = await studentsModel
      .find({ name: /^juan.*/i, })


    //TODO: All students named Juan and are 29 years old
    const JuansStudents29 = await studentsModel
      .find({ name: /^juan.*/i, age: { $eq: 29 } })

  } catch (error) {
    console.log(error);
  }
});

router.get("/highLevel", async (req, res) => { });

module.exports = router;
