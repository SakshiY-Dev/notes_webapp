import { FaStickyNote } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";

const Navbar = ({ searchQuery, setSearchQuery }) => {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
      {/* Left - Logo & Title */}
      <div className="flex items-center gap-2 text-blue-600 text-2xl font-bold">
        <FaStickyNote className="text-yellow-400 text-3xl" />
        <span>Notes Manager</span>
      </div>

      {/* Right - Search Bar */}
      <div className="flex items-center w-full md:w-[450px] gap-2">
        <input
          type="text"
          placeholder="Search notes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
          <FaSearch />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
