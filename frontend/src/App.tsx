import { Outlet } from 'react-router-dom';
import Header from './Components/Header';

import { useEffect } from 'react';

export default function App() {
  // Theme persistence and switching
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header />
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
}
