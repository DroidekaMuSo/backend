const notesModel = require("../model/notes.model");
const userModel = require("../model/user.model");

const getNotes = async (req, res) => {
  try {
    const notes = await notesModel.find({}).lean();

    return notes;
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getNote = async (req, res) => {
  try {
    const { noteId } = req.params;
    const note = await notesModel.findById({ _id: noteId });

    if (!note) {
      return null;
    }

    return note;
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createNote = async (req, res) => {
  try {
    const bodyNote = req.body;

    const newNote = await notesModel.create(bodyNote);

    const {
      user: { id },
    } = req.user;

    const userData = await userModel.findById({ _id: id });
    await userData.notes.push({ note: newNote._id });

    const updateNote = await userModel.updateOne({ _id: id });

    return updateNote;
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteNote = async (req, res) => {
  try {
    const { noteId } = req.params;

    const deleteNote = await notesModel.deleteOne({ _id: noteId });

    return deleteNote
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
