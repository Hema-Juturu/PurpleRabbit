import express from "express";
import axios from "axios";
import Product from "../models/Product.js";
import process from "process";
import { saveChat,getChatHistory,deleteChats } from "../Controllers/chatController.js";


const router = express.Router();

const models = [
  "mistralai/mistral-7b-instruct:free",
  "meta-llama/llama-3.2-3b-instruct:free",
  "qwen/qwen2.5-vl-3b-instruct:free",
  "openai/gpt-oss-120b:free",
  "openai/gpt-oss-20b:free",
  "meta-llama/llama-3.3-70b-instruct:free",
  "meta-llama/llama-3.2-3b-instruct:free",
  "nousresearch/hermes-3-llama-3.1-405b:free",
];

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ error: "Message required" });
    }

    if (!process.env.OPENROUTER_API_KEY) {
      return res.status(500).json({ error: "Missing API key" });
    }

    const cleanMessage = message.trim().toLowerCase();
    const greetings = ["hi", "hello", "hey", "good morning", "good evening"];

    if (greetings.includes(cleanMessage)) {
      return res.json({
        reply:
          "Hello 👋 I'm PurpleRabbit AI. I can help you find products to buy or rent. What are you looking for today?",
        products: [],
      });
    }

    const stopWords = new Set([
      "i",
      "me",
      "my",
      "we",
      "our",
      "you",
      "your",
      "need",
      "want",
      "looking",
      "searching",
      "find",
      "show",
      "give",
      "get",
      "for",
      "the",
      "a",
      "an",
      "to",
      "of",
      "with",
      "and",
      "or",
      "in",
      "on",
      "at",
      "from",
      "please",
      "can",
      "could",
      "should",
      "would",
      "is",
      "are",
      "was",
      "were",
      "be",
      "rent",
      "buy",
      "dress",
      "kurti",
      "kurtha",
      "set",
      "pant",
      "top",
    ]);
    const keywords = cleanMessage
      .split(" ")
      .filter((word) => word.length > 2 && !stopWords.has(word));

    let products = await Product.find({
      $or: [
        { name: { $regex: keywords.join("|"), $options: "i" } },
        { category: { $regex: keywords.join("|"), $options: "i" } },
        { description: { $regex: keywords.join("|"), $options: "i" } },
      ],
    }).limit(5);

    if (!products.length) {
      return res.json({
        reply:
          "Sorry, we don't have that item yet on PurpleRabbit. You can explore our collections for Men, Women,kids and home .",
        products: [],
      });
    }

    const productList = products
      .map(
        (p) =>
          `${p.name} | Rent: ₹${p.rentPrice || "N/A"}/day | Buy: ₹${p.price} }`,
      )
      .join("\n");
    const systemPrompt = `
You are PurpleRabbit AI, a smart shopping assistant.

PurpleRabbit is an e-commerce + rental platform.

Available products:
${productList}

Your goals:
- Help users decide whether to RENT or BUY
- Recommend the best products from the list
- Be friendly and persuasive
- Keep answers short

Rules:
- Suggest 2-3 products maximum
- If user needs short-term → recommend RENT
- If long-term → recommend BUY
- Always end with a friendly call to action.
`;

    // 🔁 Try AI models until one works
    for (const model of models) {
      try {
        const response = await axios.post(
          "https://openrouter.ai/api/v1/chat/completions",
          {
            model,
            max_tokens: 300,
            temperature: 0.7,
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: cleanMessage },
            ],
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
              "Content-Type": "application/json",
            },
            timeout: 10000,
          },
        );

        const aiReply = response.data?.choices?.[0]?.message?.content?.trim();

        if (!aiReply) {
          continue;
        }

        const productIds = products.map((p) => p._id);

        return res.json({
          reply: aiReply,
          model,
          products: productIds,
        });
      } catch (err) {
      }
    }
    res.status(500).json({
      reply:
        "Sorry, I'm having trouble generating a response right now. Please try again later.",
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});
router.post("/save", saveChat);
router.get("/:userId", getChatHistory);
router.delete("/:userId", deleteChats);
export default router;
