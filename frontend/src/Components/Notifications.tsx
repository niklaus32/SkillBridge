import { useState, useRef, useEffect } from 'react';

export default function Notifications() {
  const [notifsOpen, setNotifsOpen] = useState(false);
  const notificationsRef = useRef<HTMLDivElement>(null);
  // Placeholder notifications
  const notifications = [
    { id: 1, message: 'Welcome to SkillBridge!' },
    { id: 2, message: 'You have a new match.' },
  ]
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
                setNotifsOpen(false);
            }
        }
        if (notifsOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [notifsOpen]);
  
  return (
    <div className="relative">
      <button
        className="relative p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
        onClick={() => setNotifsOpen((o) => !o)}
        aria-label="Notifications"
      >
        <span role="img" aria-label="bell">Notifications</span>
        {notifications.length > 0 && (
          <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
        )}
      </button>
      {notifsOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 shadow-lg rounded p-2 z-10">
          <h4 className="font-semibold mb-2">Notifications</h4>
          <ul>
            {notifications.map(n => (
              <li key={n.id} className="py-1 border-b border-gray-200 dark:border-gray-700 last:border-0">{n.message}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
