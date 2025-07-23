import { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import { MdDelete, MdEdit, MdSave, MdCancel } from "react-icons/md";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const API_URL = "http://localhost:5000/api/notes";

const App = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("");
  const [color, setColor] = useState("#FADADD");
  const [notes, setNotes] = useState([]);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [editData, setEditData] = useState({
    title: "",
    content: "",
    tag: "",
    color: "",
  });

  // 🆕 Search state

  useEffect(() => {
    fetchNotes();
  }, []);
  useEffect(() => {
    setSearchTerm(searchQuery);
  }, [searchQuery]);

  const fetchNotes = async () => {
    try {
      const res = await axios.get(API_URL);
      setNotes(res.data.reverse());
    } catch {
      toast.error("Failed to load notes");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim())
      return toast.error("Title and content required");

    try {
      await axios.post(API_URL, { title, content, tag, color });
      toast.success("Note added!");
      setTitle("");
      setContent("");
      setTag("");
      setColor("#FADADD");
      fetchNotes();
    } catch {
      toast.error("Error adding note");
    }
  };

  const handleEdit = (note) => {
    setEditingNoteId(note._id);
    setEditData({
      title: note.title,
      content: note.content,
      tag: note.tag || "",
      color: note.color || "#ffffff",
    });
  };

  const handleUpdate = async (id) => {
    const { title, content, tag, color } = editData;
    if (!title.trim() || !content.trim())
      return toast.error("Fields cannot be empty");

    try {
      await axios.put(`${API_URL}/${id}`, { title, content, tag, color });
      toast.success("Note updated");
      setEditingNoteId(null);
      fetchNotes();
    } catch {
      toast.error("Failed to update");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      toast.success("Note deleted");
      fetchNotes();
    } catch {
      toast.error("Failed to delete note");
    }
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (note.tag || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFFAFA] to-[#FDF6F0] text-gray-800">
      <Toaster position="top-right" />
      <Navbar setSearchQuery={setSearchQuery} />

      <div className="max-w-3xl mx-auto px-4 py-10">
        <p className="text-lg md:text-xl font-medium mb-6 text-center">
          Your <span className="text-pink-500 font-bold">personal space</span>{" "}
          to <span className="text-blue-500 font-semibold">capture</span>,{" "}
          <span className="text-blue-500 font-semibold">edit</span>, and{" "}
          <span className="text-blue-500 font-semibold">organize</span> your
          thoughts.
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-lg p-6 space-y-4"
        >
          <input
            type="text"
            placeholder="Note Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-pink-200 rounded-md bg-pink-50 focus:outline-pink-400"
          />
          <textarea
            placeholder="Note Content..."
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-4 py-2 border border-pink-200 rounded-md bg-pink-50 resize-none focus:outline-pink-400"
          ></textarea>
          <input
            type="text"
            placeholder="Tag (optional)"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            className="w-full px-4 py-2 border border-pink-200 rounded-md bg-pink-50 focus:outline-pink-400"
          />
          <div className="flex items-center gap-4">
            <label className="font-medium text-sm">Color:</label>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-10 h-8 border-2 border-pink-300 rounded"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-pink-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-pink-600 transition"
          >
            Add Note
          </button>
        </form>

        <h2 className="text-xl font-bold my-6">Your Notes</h2>
        <div className="space-y-4">
          {filteredNotes.map((note) => (
            <div
              key={note._id}
              className=" p-4 rounded-lg shadow-md transition-transform transform hover:scale-[1.01] border"
              style={{ backgroundColor: note.color }}
            >
              {editingNoteId === note._id ? (
                <>
                  <input
                    value={editData.title}
                    onChange={(e) =>
                      setEditData({ ...editData, title: e.target.value })
                    }
                    className="w-full border rounded px-2 py-1 mb-2"
                  />
                  <textarea
                    rows={3}
                    value={editData.content}
                    onChange={(e) =>
                      setEditData({ ...editData, content: e.target.value })
                    }
                    className="w-full border rounded px-2 py-1 mb-2"
                  />
                  <input
                    placeholder="Tag"
                    value={editData.tag}
                    onChange={(e) =>
                      setEditData({ ...editData, tag: e.target.value })
                    }
                    className="w-full border rounded px-2 py-1 mb-2"
                  />
                  <input
                    type="color"
                    value={editData.color}
                    onChange={(e) =>
                      setEditData({ ...editData, color: e.target.value })
                    }
                    className="mb-2 w-10 h-8"
                  />
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleUpdate(note._id)}
                      className="text-green-600"
                      title="Save"
                    >
                      <MdSave size={22} />
                    </button>
                    <button
                      onClick={() => setEditingNoteId(null)}
                      className="text-gray-600"
                      title="Cancel"
                    >
                      <MdCancel size={22} />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-lg font-bold text-pink-600">
                    {note.title}
                  </h3>
                  <p className="text-gray-800 mb-1 whitespace-pre-line">
                    {note.content}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-600 mt-2">
                    <div className="flex gap-3 flex-wrap">
                      {note.tag && (
                        <span className="bg-pink-100 text-pink-600 px-2 py-0.5 rounded-full font-medium text-xs">
                          #{note.tag}
                        </span>
                      )}
                      {note.createdAt && (
                        <span className="italic text-xs text-gray-500">
                          {new Date(note.createdAt).toLocaleString()}
                        </span>
                      )}
                    </div>
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleEdit(note)}
                        title="Edit"
                        className="text-yellow-500"
                      >
                        <MdEdit size={20} />
                      </button>
                      <button
                        onClick={() =>
                          toast.custom((t) => (
                            <div className="bg-white p-4 rounded shadow-md text-sm">
                              <p>Delete this note?</p>
                              <div className="flex gap-3 mt-2">
                                <button
                                  onClick={() => {
                                    handleDelete(note._id);
                                    toast.dismiss(t.id);
                                  }}
                                  className="text-red-600"
                                >
                                  Yes
                                </button>
                                <button
                                  onClick={() => toast.dismiss(t.id)}
                                  className="text-gray-500"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ))
                        }
                        title="Delete"
                        className="text-red-500"
                      >
                        <MdDelete size={20} />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
