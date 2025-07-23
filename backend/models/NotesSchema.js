const mongoose = require("mongoose");
const NotesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: "#ffffff",
    },
    tag: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", NotesSchema);
