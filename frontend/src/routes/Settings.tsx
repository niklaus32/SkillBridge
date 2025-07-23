import { useState } from 'react';
import ThemeToggle from '../Components/ThemeToggle';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

const SECTIONS = [
  { key: 'profile', label: 'Profile', path: 'profile' },
  { key: 'account', label: 'Account', path: 'account' },
  { key: 'notifications', label: 'Notifications', path: 'notifications' },
  { key: 'appearance', label: 'Appearance', path: 'appearance' },
];

export default function Settings() {
  const navigate = useNavigate();
  const location = useLocation();
  // Support both /settings and /settings/:section
  const pathParts = location.pathname.split('/');
  const sectionPath = pathParts[pathParts.length - 1];
  const currentSection = SECTIONS.find(s => s.path === sectionPath)?.key || 'profile';

  return (
    <div className="max-w-5xl mx-auto w-full p-0 flex flex-row gap-0">
      {/* Sidebar - GitHub style */}
      <aside className="w-64 min-h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col py-8 px-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Settings</h2>
        <nav className="flex flex-col gap-1">
          {SECTIONS.map((s) => (
            <button
              key={s.key}
              className={`text-left px-4 py-2 rounded font-medium text-base transition-colors ${currentSection === s.key ? 'bg-gray-100 dark:bg-gray-900 text-indigo-700 dark:text-indigo-300 border-l-4 border-indigo-500' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
              onClick={() => navigate(`/settings/${s.path}`)}
            >
              {s.label}
            </button>
          ))}
        </nav>
      </aside>
      {/* Main content - subpage */}
      <main className="flex-1 bg-white dark:bg-gray-900 min-h-screen p-0">
        <div className="bg-white dark:bg-gray-900 min-h-screen p-10">
          <Routes>
            <Route path="profile" element={<ProfileSettings />} />
            <Route path="account" element={<AccountSettings />} />
            <Route path="notifications" element={<NotificationSettings />} />
            <Route path="appearance" element={<AppearanceSettings />} />
            <Route path="" element={<ProfileSettings />} />
            <Route path="*" element={<ProfileSettings />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}


function ProfileSettings() {
  const [form, setForm] = useState({
    name: '',
    lastName: '',
    username: '',
  });
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Edit Profile</h1>
      <form className="space-y-6">
        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-300">First Name</label>
            <input className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
          </div>
          <div className="w-1/2">
            <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-300">Last Name</label>
            <input className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring" value={form.lastName} onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))} />
          </div>
        </div>
        <div>
          <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-300">Username</label>
          <input className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring" value={form.username} onChange={e => setForm(f => ({ ...f, username: e.target.value }))} />
        </div>
        <button type="button" className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700">Save</button>
      </form>
    </div>
  );
}

function AccountSettings() {
  const [privacy, setPrivacy] = useState('public');
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Account Settings</h1>
      <div className="mb-6">
        <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-300">Profile Privacy</label>
        <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded" value={privacy} onChange={e => setPrivacy(e.target.value)}>
          <option className="text-black" value="public">Public</option>
          <option value="private">Private</option>
        </select>
      </div>
      <button type="button" className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700">Save</button>
    </div>
  );
}

function NotificationSettings() {
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(false);
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Notification Settings</h1>
      <div className="mb-6 flex flex-col gap-4">
        <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
          <input type="checkbox" checked={emailNotif} onChange={e => setEmailNotif(e.target.checked)} />
          Email notifications
        </label>
        <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
          <input type="checkbox" checked={pushNotif} onChange={e => setPushNotif(e.target.checked)} />
          Push notifications
        </label>
      </div>
      <button type="button" className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700">Save</button>
    </div>
  );
}

function AppearanceSettings() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Appearance</h1>
      <label className="block font-semibold text-lg mb-4 dark:text-white">Theme</label>
      <ThemeToggle />
      <div className="mt-4 text-gray-500 dark:text-gray-400">Switch between light and dark mode for the app interface.</div>
    </div>
  );
}

