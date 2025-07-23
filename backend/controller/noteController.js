const Note = require("../models/NotesSchema");

// Create a new note

const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = await Note.create({ title, content });
    res.status(200).json(note);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
    console.log(error);
  }
};

//getting all the notes from the database

const getNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

//update a note by a given id

const updateNote = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedNote = await Note.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedNote);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedNote = await Note.findByIdAndDelete(id);
    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
};
