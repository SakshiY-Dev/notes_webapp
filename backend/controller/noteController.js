const Note = require("../models/NotesSchema");

// Create a new note
const createNote = async (req, res) => {
  try {
    const { title, content, color, tag } = req.body;

    // Create note with color and tag (if provided)
    const note = await Note.create({
      title,
      content,
      color: color || "#ffffff", // Optional default
      tag: tag || "", // Optional default
    });

    res.status(200).json(note);
  } catch (error) {
    console.error("Error creating note:", error);
    res.status(400).json({ message: error.message });
  }
};

// Get all notes (latest first)
const getNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(400).json({ message: error.message });
  }
};

// Update a note by ID
const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedNote = await Note.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedNote);
  } catch (error) {
    console.error("Error updating note:", error);
    res.status(400).json({ message: error.message });
  }
};

// Delete a note by ID
const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedNote = await Note.findByIdAndDelete(id);

    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
};
