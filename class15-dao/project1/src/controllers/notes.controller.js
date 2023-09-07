const notesServices = require("../services/notes.service");

const getNotes = async (req, res) => {
  try {
    const notes = await notesServices.getNotes(req, res);

    return res.json({
      message: "Get notes",
      notes,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getNote = async (req, res) => {
  try {
    const note = await notesServices.getNote(req, res);

    if (!note) {
      return res.status(400).json({ message: "Note not found" });
    }

    return res.status(200).json({
      message: "Get note by Id",
      note,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (title.length === 0 || content.length === 0) {
      return res.json({ message: "Title or content cannot be blank" });
    }

    const create = await notesServices.createNote(req, res);

    if (!create.acknowledged) {
      return res.status(500).json({
        message: `Note has been created but couldn't be linked`,
      });
    }

    return res.json({
      message: "Note has been created and linked succesfully",
      note: req.body,
      linked: create,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteNote = async (req, res) => {
  try {
    const deleteNote = await notesServices.deleteNote(req, res);

    return res.json({
      message: "Note deletedd with ADMIN role",
      note: deleteNote,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getNotes,
  getNote,
  createNote,
  deleteNote,
};
