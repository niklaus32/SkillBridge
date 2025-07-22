import React from "react";


export default function Connect() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center">
      <div className="w-full max-w-2xl p-8 bg-white rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold text-indigo-700 mb-2">Connect</h1>
        <p className="text-gray-600 mb-6">Find and match with people who share your skills and goals.</p>
        <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition">Start Matching</button>
      </div>
    </section>
  );
}
