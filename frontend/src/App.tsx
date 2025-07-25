
import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from "./routes/Home";
import Connect from "./routes/Connect";
import Projects from "./routes/Projects";
import Calendar from "./routes/Calendar";
import Chat from "./routes/Chat";
import Register from "./routes/Register";
import Login from "./routes/Login";
import Settings from "./routes/Settings";
import Profile from "./routes/Profile";

import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

const useAuth = () => {
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);
  return {
    user,
    login: () => {}, // Login handled in Login/Register pages
    logout: () => signOut(auth),
  };
};

function ProfileDropdown({ onLogout }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  const handleButtonClick = (cb?: () => void) => {
    setOpen(false);
    if (cb) cb();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex items-center gap-2 px-4 py-2 bg-indigo-50 dark:bg-indigo-700 dark:hover:bg-indigo-800 rounded-lg hover:bg-indigo-100 transition"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="font-semibold text-indigo-700 dark:text-white">Profile</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-20">
          <Link to="/profile" className="block px-4 py-2 hover:bg-indigo-50 dark:hover:bg-gray-900 rounded-lg" onClick={() => handleButtonClick()}>Profile</Link>
          <Link to="/settings" className="block px-4 py-2 hover:bg-indigo-50 dark:hover:bg-gray-900 rounded-lg" onClick={() => handleButtonClick()}>Settings</Link>
          <button
            className="block w-full text-left px-4 py-2 hover:bg-indigo-50 dark:hover:bg-gray-900 rounded-lg text-red-600"
            onClick={() => handleButtonClick(onLogout)}
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
  const navigate = useNavigate();

  useEffect(() => {
    // Check localStorage or system preference for theme
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (stored === 'dark' || (!stored && prefersDark)) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
  }, []);

  const handleLogout = async () => {
    await auth.logout();
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:bg-zinc-900 dark:text-gray-100 flex flex-col">
      <header className="bg-white dark:bg-gray-800 shadow sticky top-0 z-10">
        <div className="max-w-5xl mx-auto flex items-center justify-between p-4">
          <Link to="/" className="text-2xl font-extrabold text-indigo-600 tracking-tight">SkillBridge</Link>
          <nav className="flex gap-6 text-lg items-center">
            <Link to="/connect" className="hover:text-indigo-600 transition">Connect</Link>
            <Link to="/projects" className="hover:text-indigo-600 transition">Projects</Link>
            <Link to="/calendar" className="hover:text-indigo-600 transition">Calendar</Link>
            <Link to="/chat" className="hover:text-indigo-600 transition">Chat</Link>
            {auth.user ? (
              <ProfileDropdown onLogout={handleLogout} />
            ) : (
              <AuthButtons />
            )}
          </nav>
        </div>
      </header>
      <main className="flex-1 bg-white dark:bg-zinc-900 transition-colors">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/connect" element={<Connect />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/settings/*" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
