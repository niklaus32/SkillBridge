import React from "react";

export default function Connect() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center bg-white dark:bg-zinc-900 transition-colors">
      <div className="w-full max-w-2xl p-8 bg-white dark:bg-gray-900 rounded-lg shadow-md text-center transition-colors">
        <h1 className="text-3xl font-bold text-indigo-700 dark:text-white mb-2">Connect</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Find and match with people who share your skills and goals.
        </p>
        <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
          Start Matching
        </button>
      </div>
    </section>
  );
}
