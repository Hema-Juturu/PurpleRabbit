import { useState, useEffect, useRef } from "react";
import { MessageCircle, X } from "lucide-react";
import api from "../axiosInstance";
import { useNavigate } from "react-router-dom";
import {
  selectCurrentUser,
  selectCurrentUserId,
} from "../features/auth/authSlice";
import { useSelector } from "react-redux";

const SalesChatbot = ({ isOpen, setIsOpen }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const userId = localStorage.getItem("userId");
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  /* ---------------- LOAD CHAT HISTORY ---------------- */

  useEffect(() => {
    const loadChats = async () => {
      try {
        const res = await api.get(`/chat/${userId}`);

        const formatted = res.data.map((c) => ({
          role: c.role === "assistant" ? "bot" : "user",
          text: c.message,
          prods: c.products,
        }));
        setMessages(formatted);
      } catch (err) {
        console.error("Failed to load chats", err);
      }
    };

    if (userId && isOpen) loadChats();
  }, [userId, isOpen]);

  /* ---------------- SEND MESSAGE ---------------- */

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    setInput("");
    setLoading(true);

    try {
      /* Save USER message */
      await api.post("/chat/save", {
        userId,
        role: "user",
        message: input,
      });

      /* Call AI */
      const res = await api.post("/chat", {
        message: input,
      });

      const botMessage = {
        role: "bot",
        text: res.data.reply,
        prods: res.data.products || [],
      };

      setMessages((prev) => [...prev, botMessage]);

      /* Save BOT message */
      await api.post("/chat/save", {
        userId,
        role: "assistant",
        message: res.data.reply,
        products: res.data.products || [],
      });
    } catch (error) {
      console.error("Chat error:", error);
    }

    setLoading(false);
  };

  /* ---------------- AUTO SCROLL ---------------- */

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const openProductsPage = (products) => {
    navigate("/chat-results", {
      state: { products },
    });
  };
  const user = useSelector(selectCurrentUser);
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) return null;
  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="hidden lg:flex fixed bottom-6 right-6 bg-purple-600 text-white p-4 rounded-full shadow-lg hover:bg-purple-700"
      >
        <MessageCircle size={20} />
      </button>

      {isOpen && (
        <div className="fixed bottom-20 right-6 max-w-[60vw] max-h-[70vh] bg-white shadow-2xl rounded-2xl flex flex-col z-50">
          <div className="bg-purple-600 text-white p-3 font-semibold flex justify-between">
            <span>Chat Buddy 🐰</span>
            <X size={20} onClick={() => setIsOpen(false)} />
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto space-y-2 text-sm">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg max-w-[80%] ${
                  msg.role === "user"
                    ? "bg-purple-100 ml-auto w-fit"
                    : "bg-gray-100 w-fit"
                }`}
              >
                {msg.text}

                {msg.prods?.length > 0 && (
                  <button
                    onClick={() => openProductsPage(msg.prods)}
                    className="block mt-2 text-purple-600 underline"
                  >
                    View {msg.prods.length} Products
                  </button>
                )}
              </div>
            ))}

            {loading && (
              <div className="bg-gray-100 p-2 rounded-lg w-fit">Typing...</div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
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
