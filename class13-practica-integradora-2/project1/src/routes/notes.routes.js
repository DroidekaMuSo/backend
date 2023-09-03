const handlePolicies = require("../middlewares/handlePolicies.middleware");
const notesModel = require("../model/note.model");
const userModel = require("../model/user.model");

const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    const notes = await notesModel.find({});

    return res.json({ message: "Get notes", notes });
  } catch (error) {
    console.log("🚀 ~ file: notes.routes.js:6 ~ router.get ~ error:", error);
  }
});

router.get("/:nodeId", async (req, res) => {
  try {
    const { nodeId } = req.params;

    const findNote = await notesModel.findById({ _id: nodeId });
    if (!findNote) {
      return res.status(401).json({ message: `Note ${nodeId} not found` });
    }

    return res.json({
      message: "Get note by Id for USER role",
      note: findNote,
    });
  } catch (error) {
    console.log("🚀 ~ file: notes.routes.js:18 ~ router.get ~ error:", error);
  }
});

router.post("/", handlePolicies(["USER", "ADMIN"]), async (req, res) => {
  try {
    const { title, content } = req.body;

    const noteToAdd = { title, content };
    const createNote = await notesModel.create(noteToAdd);

    const {
      user: { id },
    } = req.user;

    const userData = await userModel.findById({ _id: id });
    userData.notes.push({ note: createNote._id });
    const updateNotes = await userModel.updateOne({ _id: id }, userData);

    if (!updateNotes.acknowledged) {
      return res.status(500).json({
        message: "Note was created, but it could not be linked",
      });
    }

    return res.json({
      message: `Note was created and linked`,
      note: createNote,
      linked: updateNotes,
    });
  } catch (error) {
    console.log("🚀 ~ file: notes.routes.js:37 ~ router.post ~ error:", error);
  }
});

router.delete("/:noteId", handlePolicies(["ADMIN"]), async (req, res) => {
  try {
    const { noteId } = req.params;

    const deleteNote = await notesModel.deleteOne({ _id: noteId });

    return res.json({
      message: "Delete note by Id with ADMIN role",
      note: deleteNote,
    });
  } catch (error) {
    console.log(
      "🚀 ~ file: notes.routes.js:70 ~ router.delete ~ error:",
      error
    );
  }
});

module.exports = router;
