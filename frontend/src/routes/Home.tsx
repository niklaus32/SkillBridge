import React from "react";


export default function Home() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center rounded-lg">
      <div className="w-full max-w-2xl p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md text-center">
        <h1 className="text-5xl font-extrabold text-indigo-700 mb-4 drop-shadow-lg">
          Welcome to SkillBridge
        </h1>
        <p className="text-xl text-gray-700 dark:text-white mb-8 max-w-xl mx-auto">
          Connect with people who share your skills and goals. Showcase your
          projects, join events, and grow together.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-4 justify-center">
          <a
            href="/connect"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
          >
            Find Connections
          </a>
          <a
            href="/projects"
            className="px-6 py-3 bg-white border border-indigo-600 text-indigo-700 rounded-lg shadow hover:bg-indigo-50 transition"
          >
            Explore Projects
          </a>
        </div>
      </div>
    </section>
  );
}
