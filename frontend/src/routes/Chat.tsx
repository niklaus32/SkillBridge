import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Chat() {
  const [user] = useAuthState(auth);

  if (!user) {
    // Ad for guests
    return (
      <section className="flex min-h-[60vh] items-center justify-center rounded-lg">
        <div className="w-full max-w-2xl p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md text-center">
          <h1 className="text-5xl font-extrabold text-indigo-600 mb-4 drop-shadow-lg">SkillBridge Chat</h1>
          <p className="text-xl text-gray-700 dark:text-white mb-8 max-w-xl mx-auto">
            Instantly connect with other users! Share ideas, collaborate on projects, and build your network in real time.<br /><br />
            <span className="font-semibold text-indigo-700 dark:text-indigo-300">Sign up now to unlock chat and more.</span>
          </p>
          <Link to="/register" className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors text-lg">
            Join SkillBridge
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="flex min-h-[60vh] items-center justify-center rounded-lg">
      <div className="w-full max-w-3xl p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md flex flex-col h-[60vh]">
        <h1 className="text-3xl font-bold text-indigo-600 mb-4">Messages</h1>
        <div className="flex flex-1 overflow-hidden rounded-lg border dark:border-gray-700">
          {/* Sidebar: Conversations */}
          <aside className="w-1/3 bg-gray-50 dark:bg-gray-900 border-r dark:border-gray-700 overflow-y-auto">
            <div className="p-4 font-semibold text-gray-700 dark:text-gray-200">Chats</div>
            <ul>
              <li className="px-4 py-3 hover:bg-indigo-100 dark:hover:bg-gray-800 cursor-pointer border-b dark:border-gray-700">Jane Doe</li>
              <li className="px-4 py-3 hover:bg-indigo-100 dark:hover:bg-gray-800 cursor-pointer border-b dark:border-gray-700">John Smith</li>
              <li className="px-4 py-3 hover:bg-indigo-100 dark:hover:bg-gray-800 cursor-pointer">Project Group</li>
            </ul>
          </aside>
          {/* Main chat area */}
          <main className="flex-1 flex flex-col">
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="flex flex-col gap-4">
                <div className="self-start bg-indigo-100 dark:bg-indigo-700 text-indigo-900 dark:text-white px-4 py-2 rounded-2xl max-w-xs">Hey! 👋</div>
                <div className="self-end bg-indigo-600 text-white px-4 py-2 rounded-2xl max-w-xs">Hi! How are you?</div>
                <div className="self-start bg-indigo-100 dark:bg-indigo-700 text-indigo-900 dark:text-white px-4 py-2 rounded-2xl max-w-xs">Doing great, thanks!</div>
              </div>
            </div>
            <form className="flex p-2 border-t dark:border-gray-700">
              <input
                type="text"
                className="flex-1 px-4 py-2 rounded-l-2xl bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none"
                placeholder="Type a message..."
                disabled
              />
              <button type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded-r-2xl font-semibold hover:bg-indigo-700 transition-colors" disabled>
                Send
              </button>
            </form>
          </main>
        </div>
      </div>
    </section>
  );
}

