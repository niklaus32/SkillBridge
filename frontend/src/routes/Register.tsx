import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";

export default function Register() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.firstName || !form.lastName || !form.username || !form.email || !form.password) {
      setError("All fields are required.");
      return;
    }
    setError("");
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
      await updateProfile(userCredential.user, {
        displayName: `${form.firstName} ${form.lastName}`,
      });
      // Optionally redirect or show success
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <section className="flex min-h-[60vh] items-center justify-center bg-white dark:bg-zinc-900">
      <form onSubmit={handleSubmit} className="w-full max-w-md p-8 bg-white dark:bg-gray-900 rounded-lg shadow-md flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-indigo-700 mb-2 text-center">Sign Up</h1>
        {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
        <div className="flex gap-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={form.firstName}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-1/2"
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={form.lastName}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-1/2"
            required
          />
        </div>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="border rounded px-3 py-2"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="border rounded px-3 py-2"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="border rounded px-3 py-2"
          required
        />
        <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition">Sign Up</button>
        <div className="text-center mt-2 text-sm text-gray-600">
          Already have an account?
        </div>
        <Link to="/login">
          <button type="button" className="w-full mt-1 bg-white border border-indigo-600 text-indigo-700 py-2 rounded-lg font-semibold hover:bg-indigo-50 transition">Sign In</button>
        </Link>
      </form>
    </section>
  );
}
