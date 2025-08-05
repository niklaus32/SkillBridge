import React from "react";
import { Link } from "react-router-dom";

export default function Projects() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center rounded-lg">
      <div className="w-full max-w-2xl p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md text-center">
        <h1 className="text-5xl font-extrabold text-indigo-600 mb-4 drop-shadow-lg">Projects</h1>
        <p className="text-xl text-gray-700 dark:text-white mb-8 max-w-xl mx-auto">Showcase your work and discover projects from others.</p>
        <Link to="/register" className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
          Create New Project
        </Link>
      </div>
    </section>
  );
}
