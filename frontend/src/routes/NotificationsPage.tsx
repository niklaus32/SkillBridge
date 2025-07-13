import React from 'react';

export default function Notifications() {
  // Placeholder notifications for demonstration
  const notifications = [
    { id: 1, message: 'Welcome to SkillBridge!' },
    { id: 2, message: 'You have a new match.' },
  ];

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All Notifications</h1>
      <ul className="bg-white dark:bg-gray-800 rounded shadow divide-y divide-gray-200 dark:divide-gray-700">
        {notifications.length === 0 ? (
          <li className="p-4 text-gray-500">No notifications yet.</li>
        ) : (
          notifications.map((n) => (
            <li key={n.id} className="p-4">{n.message}</li>
          ))
        )}
      </ul>
    </div>
  );
}
