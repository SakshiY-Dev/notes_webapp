# 📝 notes_webapp

A full-stack **Notes Management Application** built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js).  
Users can securely **create**, **read**, **update**, and **delete** notes. The frontend is styled with **Tailwind CSS** to provide a modern and responsive UI.

---

## 🚀 Features

- ✅ Create personal notes
- 📝 Edit existing notes
- ❌ Delete notes
- 👀 View all your notes
- 🎨 Responsive UI with Tailwind CSS
- 🔐 Backend API with Node.js and Express.js
- 📦 MongoDB for persistent storage

---

## 🛠️ Tech Stack
### Frontend
- **React.js** – Frontend JavaScript library for building UI
- **Tailwind CSS** – Utility-first CSS framework for styling
- **Vite** – Fast frontend build tool (if used)

### Backend
- **Node.js** – JavaScript runtime for building the server
- **Express.js** – Web framework for Node.js

### Database
- **MongoDB** – NoSQL database for storing notes
- **Mongoose** – ODM to interact with MongoDB easily

### Others
- **RESTful APIs** – Communication between frontend and backend
- **Axios or Fetch API** – For making HTTP requests
- **dotenv** – To manage environment variables


##  Clone the repository

git clone https://github.com/SakshiY-Dev/notes_webapp.git
cd notes_webapp

## Backend Setup
cd backend
npm install

## Create a .env file inside the backend/ folder and add:

MONGO_URI=your_mongodb_connection_string
PORT=5000

## Start the backend server:
npm start


## Frontend Setup
### Open a new terminal:
cd frontend
npm install
npm run dev

## API Endpoints 
Method	  Endpoint	       Description
GET	     /api/notes	        Get all notes
POST	   /api/notes	        Create a new note
PUT	     /api/notes/:id 	  Update a note
DELETE   /api/notes/:id	    Delete a note

### This project is licensed under the MIT License.




