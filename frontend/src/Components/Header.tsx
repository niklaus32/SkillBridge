
import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import Notifications from './Notifications';

// Simulate authentication state (replace with real auth logic later)
const isLoggedIn = true; // Change to true to simulate logged-in state

export default function Header() {
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    }
    if (profileOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [profileOpen]);

  return (
    <header className="w-full bg-white dark:bg-gray-800 shadow p-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Link to="/" className="text-lg font-bold text-blue-600 dark:text-blue-400 hover:underline">SkillBridge</Link>
        <form className="hidden md:block relative">
          <span className="absolute left-2 top-1.5 text-gray-400 dark:text-gray-500 pointer-events-none">
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
          </span>
          <input
            type="text"
            placeholder="Search..."
            className="pl-8 pr-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring"
          />
        </form>
      </div>
      <nav className="flex items-center gap-4">
        <Link to="/" className="hover:text-blue-400">Home</Link>
        <Link to="/projects" className="hover:text-blue-400">Projects</Link>
        <Link to="/connect" className="hover:text-blue-400">Connect</Link>
        <Link to="/chat" className="hover:text-blue-400">Chat</Link>
        <div><Notifications /> </div>
        {!isLoggedIn ? (
          <Link to="/register" className="hover:underline">Register</Link>
        ) : (
          <div className="relative" ref={profileRef}>
            <button
              className="hover:text-blue-400 flex items-center gap-1"
              onClick={() => setProfileOpen((open) => !open)}
              type="button"
              aria-haspopup="true"
              aria-expanded={profileOpen}
            >
              Profile
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
            </button>
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 shadow-lg rounded z-20">
                <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Profile</Link>
                <Link to="/yourProjects" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Your Projects</Link>
                <Link to="/settings" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Settings</Link>
              </div>
            )}
          </div>
        )}

      </nav>
    </header>
  );
}
