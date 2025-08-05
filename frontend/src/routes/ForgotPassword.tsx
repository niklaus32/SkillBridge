import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent! Check your inbox.");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex min-h-[60vh] items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-md p-8 bg-white dark:bg-gray-900 rounded-lg shadow-md flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-indigo-700 dark:text-indigo-300 mb-2 text-center">Reset Password</h1>
        {message && <div className="text-green-600 text-sm mb-2">{message}</div>}
        {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="border rounded px-3 py-2"
          required
        />
        <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-70 disabled:cursor-not-allowed dark:bg-indigo-700 dark:hover:bg-indigo-800 dark:text-white" disabled={loading}>
          {loading ? "Sending..." : "Send Reset Email"}
        </button>
        <Link to="/login" className="text-xs text-indigo-600 hover:underline dark:text-indigo-300 text-center mt-2">Back to Sign In</Link>
      </form>
    </section>
  );
}
