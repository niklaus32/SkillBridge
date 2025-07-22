import React, { useState } from "react";

export default function Chat() {
  const [messages, setMessages] = useState([
    { sender: "Alice", text: "Hi there!" },
    { sender: "You", text: "Hello!" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { sender: "You", text: input }]);
    setInput("");
  };

  return (
    <section className="flex min-h-[60vh] items-center justify-center">
      <div className="w-full max-w-2xl p-8 bg-white rounded-lg shadow-md flex flex-col h-[60vh]">
        <h1 className="text-3xl font-bold text-indigo-700 mb-4 text-center">Chat</h1>
        <div className="flex-1 overflow-y-auto mb-4 space-y-2">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}>
              <div className={`px-4 py-2 rounded-lg max-w-xs ${msg.sender === "You" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-800"}`}>
                <span className="block text-xs font-semibold mb-1">{msg.sender}</span>
                <span>{msg.text}</span>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSend} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            className="flex-1 border rounded px-3 py-2"
            placeholder="Type your message..."
          />
          <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition">Send</button>
        </form>
      </div>
    </section>
  );
}

