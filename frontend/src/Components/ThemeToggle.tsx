import { useState, useEffect, useRef } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'system' | 'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved === 'dark' || saved === 'light' || saved === 'system') return saved as 'system' | 'dark' | 'light';
      return 'system';
    }
    return 'system';
  });

  // Dropdown state
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function applyTheme(mode: 'system' | 'dark' | 'light') {
      if (mode === 'system') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
          document.documentElement.classList.add('dark');
          document.body.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
          document.body.classList.remove('dark');
        }
      } else if (mode === 'dark') {
        document.documentElement.classList.add('dark');
        document.body.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
        document.body.classList.remove('dark');
      }
    }
    applyTheme(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Close dropdown on outside click
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

  // Listen for system theme changes if 'system' is selected
  useEffect(() => {
    if (theme !== 'system') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => {
      if (theme === 'system') {
        if (mq.matches) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [theme]);

  const options = [
    { value: 'system', label: 'System Default' },
    { value: 'light', label: 'Light Mode' },
    { value: 'dark', label: 'Dark Mode' },
  ];

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        className={`flex items-center gap-2 px-6 py-3 rounded-full shadow font-semibold mb-2 transition-all duration-200 border-2 ${theme === 'dark' ? 'bg-indigo-700 text-white border-indigo-700' : theme === 'light' ? 'bg-indigo-100 text-indigo-700 border-indigo-200' : 'bg-white text-indigo-700 border-indigo-200'}`}
        onClick={() => setOpen((v) => !v)}
        aria-label="Theme menu"
      >
        {options.find(o => o.value === theme)?.label}
        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
      </button>
      {open && (
        <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-30">
          {options.map(opt => (
            <button
              key={opt.value}
              className={`block w-full text-left px-4 py-2 rounded-lg font-medium transition-colors ${theme === opt.value ? 'bg-indigo-100 dark:bg-indigo-700 text-indigo-700 dark:text-white' : 'hover:bg-indigo-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200'}`}
              onClick={() => { setTheme(opt.value as 'system' | 'dark' | 'light'); setOpen(false); }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}