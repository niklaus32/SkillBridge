import React from "react";


export default function Projects() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center">
      <div className="w-full max-w-2xl p-8 bg-white rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold text-indigo-700 mb-2">Projects</h1>
        <p className="text-gray-600 mb-6">Showcase your work and discover projects from others.</p>
        <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition">Add New Project</button>
      </div>
    </section>
  );
}
