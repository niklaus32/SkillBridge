import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function Login() {
  const [form, setForm] = useState({
    identifier: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.identifier || !form.password) {
      setError("Both fields are required.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      // Only email login is supported by Firebase Auth by default
      await signInWithEmailAndPassword(auth, form.identifier, form.password);
      navigate("/");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex min-h-[60vh] items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-md p-8 bg-white rounded-lg shadow-md flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-indigo-700 mb-2 text-center">Sign In</h1>
        {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
        <input
          type="text"
          name="identifier"
          placeholder="Username or Email"
          value={form.identifier}
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
        <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition" disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </button>
        <div className="text-center mt-2 text-sm text-gray-600">
          Don't have an account?
        </div>
        <Link to="/register">
          <button type="button" className="w-full mt-1 bg-white border border-indigo-600 text-indigo-700 py-2 rounded-lg font-semibold hover:bg-indigo-50 transition">Sign Up</button>
        </Link>
      </form>
    </section>
  );
}
