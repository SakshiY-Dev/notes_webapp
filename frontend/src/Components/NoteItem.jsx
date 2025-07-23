// components/NoteItem.jsx

export default function NoteItem({ note, handleEdit, handleDelete }) {
  return (
    <div className="bg-white border border-gray-200 p-4 rounded-md shadow-sm hover:shadow-md transition">
      <h2 className="text-xl font-semibold text-gray-800">{note.title}</h2>
      <p className="text-gray-700 mt-1 whitespace-pre-line">{note.content}</p>
      <div className="mt-4 flex gap-2">
        <button
          onClick={() => handleEdit(note)}
          className="bg-yellow-400 text-white px-4 py-1 rounded-md hover:bg-yellow-500"
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete(note._id)}
          className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
