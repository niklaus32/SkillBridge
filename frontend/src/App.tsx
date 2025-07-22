
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from "./routes/Home";
import Connect from "./routes/Connect";
import Projects from "./routes/Projects";
import Calendar from "./routes/Calendar";
import Chat from "./routes/Chat";
import Register from "./routes/Register";
import Login from "./routes/Login";


// Dummy auth state for demonstration; replace with Firebase Auth logic
const useAuth = () => {
  // Replace with real auth state from Firebase
  const [user, setUser] = useState({ name: "Demo User" }); // Pretend logged in
  return {
    user,
    login: () => setUser({ name: "Demo User" }),
    logout: () => setUser(null),
  };
};

function ProfileDropdown({ onLogout }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        className="flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="font-semibold text-indigo-700">Profile</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-20">
          <Link to="/profile" className="block px-4 py-2 hover:bg-indigo-50">Profile</Link>
          <Link to="/settings" className="block px-4 py-2 hover:bg-indigo-50">Settings</Link>
          <button
            className="block w-full text-left px-4 py-2 hover:bg-indigo-50 text-red-600"
            onClick={() => { setOpen(false); onLogout(); }}
          >Logout</button>
        </div>
      )}
    </div>
  );
}

function AuthButtons() {
  return (
    <Link to="/register">
      <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition">Sign Up</button>
    </Link>
  );
}

function App() {
  const auth = useAuth();
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
        <header className="bg-white shadow sticky top-0 z-10">
          <div className="max-w-5xl mx-auto flex items-center justify-between p-4">
            <Link to="/" className="text-2xl font-extrabold text-indigo-700 tracking-tight">Skillbridge</Link>
            <nav className="flex gap-6 text-lg items-center">
              <Link to="/connect" className="hover:text-indigo-600 transition">Connect</Link>
              <Link to="/projects" className="hover:text-indigo-600 transition">Projects</Link>
              <Link to="/calendar" className="hover:text-indigo-600 transition">Calendar</Link>
              <Link to="/chat" className="hover:text-indigo-600 transition">Chat</Link>
              {auth.user ? (
                <ProfileDropdown onLogout={auth.logout} />
              ) : (
                <AuthButtons />
              )}
            </nav>
          </div>
        </header>
        <main className="flex-1 max-w-5xl mx-auto w-full p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/connect" element={<Connect />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
