import { useState, useRef, useEffect } from "react";
import axios from "axios";

// Backend URL (local now, Render later)
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export default function Chatbot() {

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);

  // Auto scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat, loading]);

  const sendMessage = async () => {
    if (!message.trim() || loading) return;

    const userMsg = message.trim();

    // Clear input immediately
    setMessage("");

    // Show user message instantly
    setChat(prev => [...prev, { sender: "user", text: userMsg }]);

    // Show typing indicator
    setLoading(true);

    try {
      const res = await axios.post(`${API_URL}/chat`, {
        message: userMsg
      });

      const botReply = res.data.reply || "No response";

      setChat(prev => [...prev, { sender: "bot", text: botReply }]);

    } catch (error) {
      setChat(prev => [
        ...prev,
        { sender: "bot", text: "⚠️ Unable to connect to AI server." }
      ]);
    }

    setLoading(false);
  };

  return (
    <>
      {/* Floating Bot Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-blue-500 hover:bg-blue-600 text-white w-14 h-14 rounded-full shadow-xl text-2xl z-50"
      >
        🤖
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-24 right-6 w-80 h-[420px] bg-white rounded-2xl shadow-2xl flex flex-col z-50">

          {/* Header */}
          <div className="bg-blue-500 text-white px-4 py-3 rounded-t-2xl font-semibold">
            Pratik AI Assistant
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3">

            {chat.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg max-w-[75%] text-sm ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white ml-auto"
                    : "bg-gray-200 text-black"
                }`}
              >
                {msg.text}
              </div>
            ))}

            {/* Typing Indicator */}
            {loading && (
              <div className="bg-gray-200 text-black p-2 rounded-lg max-w-[75%] text-sm">
                Pratik AI is typing...
              </div>
            )}

            <div ref={bottomRef}></div>
          </div>

          {/* Input */}
          <div className="flex border-t">

            <input
              className="flex-1 px-3 py-2 outline-black text-black"
              placeholder="Ask about me..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !loading) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
            />

            <button
              onClick={sendMessage}
              disabled={loading}
              className={`px-4 text-white text-sm ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {loading ? "..." : "Send"}
            </button>

          </div>
        </div>
      )}
    </>
  );
}