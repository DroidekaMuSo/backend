const router = require("express").Router();
const notesController = require("../controllers/notes.controller");
const handlePolicies = require("../middlewares/handlePolicies.middleware");

router.get("/", notesController.getNotes);

router.get("/:noteId", notesController.getNote);

router.post("/", handlePolicies(["ADMIN", "USER"]), notesController.createNote);

router.delete("/:noteId", notesController.deleteNote);

module.exports = router;
