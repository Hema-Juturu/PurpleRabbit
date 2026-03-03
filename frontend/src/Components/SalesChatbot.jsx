import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import api from "../axiosInstance";

const SalesChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

 const sendMessage = async () => {
  if (!input.trim()) return;

  const userMessage = { role: "user", text: input };

  setMessages((prev) => [...prev, userMessage]);
  setInput("");
  setLoading(true);

  try {
    const res = await api.post("/chat", {
      message: input,
    });

    console.log("Backend response:", res.data); // debug

    const botMessage = {
      role: "bot",
      text: res.data.reply,
    };

    setMessages((prev) => [...prev, botMessage]);
  } catch (error) {
    console.error("Chat error:", error);
  }

  setLoading(false);
};

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-purple-600 text-white p-4 rounded-full shadow-lg hover:bg-purple-700 transition"
      >
        {isOpen ? <X size={20} /> : <MessageCircle size={20} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-80 bg-white shadow-2xl rounded-2xl flex flex-col overflow-hidden z-50">
          <div className="bg-purple-600 text-white p-3 font-semibold">
            PurpleRabbit Assistant 🐰
          </div>

          <div className="flex-1 p-3 overflow-y-auto space-y-2 text-sm">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg max-w-[80%] ${
                  msg.role === "user"
                    ? "bg-purple-100 self-end ml-auto"
                    : "bg-gray-100"
                }`}
              >
                {msg.text}
              </div>
            ))}

            {loading && (
              <div className="bg-gray-100 p-2 rounded-lg w-fit">Typing...</div>
            )}
          </div>

          <div className="p-2 border-t flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about rent or buy..."
              className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="bg-purple-600 text-white px-3 rounded-lg hover:bg-purple-700"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SalesChatbot;
