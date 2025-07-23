// App.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import NoteForm from "./Components/NoteForm";
import NoteItem from "./Components/NoteItem";
import "./App.css";

const API_URL = "http://localhost:5000/api/notes";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({ title: "", content: "" });
  const [editId, setEditId] = useState(null);

  const fetchNotes = async () => {
    const res = await axios.get(API_URL);
    setNotes(res.data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await axios.put(`${API_URL}/${editId}`, form);
      setEditId(null);
    } else {
      await axios.post(API_URL, form);
    }
    setForm({ title: "", content: "" });
    fetchNotes();
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchNotes();
  };

  const handleEdit = (note) => {
    setEditId(note._id);
    setForm({ title: note.title, content: note.content });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">
          Notes Manager
        </h1>

        <NoteForm
          form={form}
          setForm={setForm}
          handleSubmit={handleSubmit}
          editId={editId}
        />

        <div className="space-y-4">
          {notes.length === 0 ? (
            <p className="text-gray-500 text-center">No notes yet.</p>
          ) : (
            notes.map((note) => (
              <NoteItem
                key={note._id}
                note={note}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
