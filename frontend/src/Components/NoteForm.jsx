// components/NoteForm.jsx
import React from "react";

export default function NoteForm({ form, setForm, handleSubmit, editId }) {
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow p-6 rounded-lg mb-6 space-y-4"
    >
      <input
        type="text"
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />
      <textarea
        placeholder="Content"
        value={form.content}
        onChange={(e) => setForm({ ...form, content: e.target.value })}
        className="w-full border border-gray-300 p-3 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
        rows={4}
        required
      />
      <button
        type="submit"
        className="bg-blue-600 text-white font-medium px-6 py-2 rounded-md hover:bg-blue-700 transition"
      >
        {editId ? "Update Note" : "Add Note"}
      </button>
    </form>
  );
}
