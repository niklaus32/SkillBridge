import { useState } from 'react';

const SECTIONS = [
  { key: 'profile', label: 'Profile' },
  { key: 'account', label: 'Account' },
  { key: 'notifications', label: 'Notifications' },
  { key: 'appearance', label: 'Appearance' },
];

export default function Settings() {
  const [section, setSection] = useState('profile');

  return (
    <div className="max-w-3xl mx-auto p-4 flex flex-col md:flex-row gap-6">
      <aside className="w-full md:w-1/4 bg-white dark:bg-gray-800 rounded shadow p-4 mb-4 md:mb-0">
        <h2 className="text-lg font-bold mb-4">Settings</h2>
        <nav className="flex flex-col gap-2">
          {SECTIONS.map((s) => (
            <button
              key={s.key}
              className={`text-left px-3 py-2 rounded hover:bg-blue-100 dark:hover:bg-gray-700 ${section === s.key ? 'bg-blue-600 text-white dark:bg-blue-500' : ''}`}
              onClick={() => setSection(s.key)}
            >
              {s.label}
            </button>
          ))}
        </nav>
      </aside>
      <main className="flex-1 bg-white dark:bg-gray-800 rounded shadow p-6">
        {section === 'profile' && <ProfileSettings />}
        {section === 'account' && <AccountSettings />}
        {section === 'notifications' && <NotificationSettings />}
        {section === 'appearance' && <AppearanceSettings />}
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
    <div>
      <h3 className="text-xl font-semibold mb-4">Edit Profile</h3>
      <form className="space-y-4 max-w-md">
        <div className="flex gap-2">
          <div className="w-1/2">
            <label className="block font-medium mb-1">First Name</label>
            <input className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
          </div>
          <div className="w-1/2">
            <label className="block font-medium mb-1">Last Name</label>
            <input className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring" value={form.lastName} onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))} />
          </div>
        </div>
        <div>
          <label className="block font-medium mb-1">Username</label>
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
    <div>
      <h3 className="text-xl font-semibold mb-4">Account Settings</h3>
      <div className="mb-4">
        <label className="block font-medium mb-1">Profile Privacy</label>
        <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded" value={privacy} onChange={e => setPrivacy(e.target.value)}>
          <option value="public">Public</option>
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
    <div>
      <h3 className="text-xl font-semibold mb-4">Notification Settings</h3>
      <div className="mb-4 flex flex-col gap-2">
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={emailNotif} onChange={e => setEmailNotif(e.target.checked)} />
          Email notifications
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={pushNotif} onChange={e => setPushNotif(e.target.checked)} />
          Push notifications
        </label>
      </div>
      <button type="button" className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700">Save</button>
    </div>
  );
}

import { useEffect } from 'react';

function AppearanceSettings() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved === 'dark' || saved === 'light') return saved;
      // system default
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else if (theme === 'light') {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      // system
      localStorage.removeItem('theme');
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [theme]);

  function handleThemeChange(value: string) {
    setTheme(value);
  }

  function handleSave() {
    // Optionally show a toast or feedback
  }

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Appearance</h3>
      <div className="mb-4">
        <label className="block font-medium mb-1">Theme</label>
        <select
          className="w-full px-3 py-2 border border-gray-700 dark:border-gray-700 rounded"
          value={theme}
          onChange={e => handleThemeChange(e.target.value)}
        >
          <option value="system">System Default</option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>
      <button
        type="button"
        className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={handleSave}
      >
        Save
      </button>
    </div>
  );
}
