import Chat from "../models/Chat.js";

export const saveChat = async (req, res) => {
  try {
    const { userId, role, message, products } = req.body;

    const chat = await Chat.create({
      userId,
      role,
      message,
      products: products || [], // store products if present
    });

    res.status(201).json(chat);
  } catch (error) {
    res.status(500).json({ error: "Failed to save chat" });
  }
};

export const getChatHistory = async (req, res) => {
  try {
    const { userId } = req.params;

    const chats = await Chat.find({ userId }).sort({ createdAt: 1 }).limit(50);

    res.json(chats);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch chats" });
  }
};

export const deleteChats = async (req, res) => {
  try {
    const { userId } = req.params;

    await Chat.deleteMany({ userId });

    res.json({ message: "Chats deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete chats" });
  }
};
