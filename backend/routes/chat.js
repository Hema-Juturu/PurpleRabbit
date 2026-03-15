import express from "express";
import axios from "axios";
import Product from "../models/Product.js";
import process from "process";
import {
  saveChat,
  getChatHistory,
  deleteChats,
} from "../Controllers/chatController.js";
import { removeStopwords, eng } from "stopword";

const router = express.Router();

const models = [
  "meta-llama/llama-3.3-70b-instruct:free",
  "nousresearch/hermes-3-llama-3.1-405b:free",
  "google/gemma-3-27b-it:free",
  "mistralai/mistral-7b-instruct:free",
  "qwen/qwen3-235b-a22b:free",
  "stepfun/step-3.5-flash:free"
];

const intentWords = [
  "looking",
  "searching",
  "find",
  "show",
  "give",
  "get",
  "need",
  "want",
  "please",
  "rent",
  "buy",
];
const customStopwords = [...eng, ...intentWords];

const generalQuestions = [
  "what can you do",
  "how does this work",
  "what do you sell",
  "what is purplerabbit",
  "help",
  "what are your categories",
  "what do you offer",
  "tell me about yourself",
  "who are you",
  "how do i",
  "how does",
  "what is",
  "explain",
  "difference between",
];

// ✅ Helper: call AI with any prompt
const callAI = async (systemPrompt, userMessage) => {
  for (const model of models) {
    try {
      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model,
          max_tokens: 200,
          temperature: 0.7,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userMessage },
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
        console.warn(`Model ${model} returned empty reply, trying next...`);
        continue;
      }

      return { reply: aiReply, model };
    } catch (modelError) {
      const status = modelError.response?.status;
      const reason =
        modelError.response?.data?.error?.message || modelError.message;
      console.warn(`Model ${model} failed [${status || "timeout"}]: ${reason}`);
    }
  }
  return null; // all models failed
};

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ error: "Message is required" });
    }

    if (!process.env.OPENROUTER_API_KEY) {
      return res
        .status(500)
        .json({ error: "Server misconfiguration: missing API key" });
    }

    const cleanMessage = message.trim().toLowerCase();

    // ✅ Greeting handler (no AI needed)
    const greetings = ["hi", "hello", "hey", "good morning", "good evening"];
    if (greetings.includes(cleanMessage)) {
      return res.json({
        reply:
          "Hello 👋 I'm PurpleRabbit AI. I can help you find products to buy or rent. What are you looking for today?",
        products: [],
      });
    }

    // ✅ General question → AI answers dynamically (no DB fetch)
    const isGeneralQuestion = generalQuestions.some((q) =>
      cleanMessage.includes(q),
    );

    if (isGeneralQuestion) {
      const generalSystemPrompt = `
You are PurpleRabbit AI, a smart and friendly shopping assistant for PurpleRabbit.

About PurpleRabbit:
- It is an e-commerce + rental platform
- Users can BUY products to keep or RENT them for short-term use
- Categories: Men, Women, Kids, Home essentials
- Renting is ideal for events, occasions, or short-term needs
- Buying is ideal for regular, long-term use

Your job:
- Answer the user's question naturally and helpfully
- Be conversational, warm, and concise
- Always end by encouraging them to search for a product
- Never give the same generic reply — tailor your response to what they actually asked
`;

      const result = await callAI(generalSystemPrompt, cleanMessage);

      if (!result) {
        return res.status(503).json({
          reply:
            "Sorry, I'm having trouble responding right now. Please try again later.",
        });
      }

      return res.json({
        reply: result.reply,
        model: result.model,
        products: [],
      });
    }

    // ✅ Product search flow
    const keywords = removeStopwords(
      cleanMessage.split(" "),
      customStopwords,
    ).filter((word) => word.length > 2);

    if (!keywords.length) {
      return res.json({
        reply:
          "Could you be more specific? Try something like 'red kurti', 'men kurtha', or 'kids dress'.",
        products: [],
      });
    }

    let products;
    try {
      products = await Product.find({
        $or: [
          { name: { $regex: keywords.join("|"), $options: "i" } },
          { category: { $regex: keywords.join("|"), $options: "i" } },
          { description: { $regex: keywords.join("|"), $options: "i" } },
        ],
      }).limit(5);
    } catch (dbError) {
      console.error("Database error:", dbError.message);
      return res
        .status(500)
        .json({ error: "Failed to fetch products. Please try again." });
    }

    if (!products.length) {
      return res.json({
        reply:
          "Sorry, we don't have that item yet on PurpleRabbit. You can explore our collections for Men, Women, Kids and Home.",
        products: [],
      });
    }

    const productList = products
      .map(
        (p) =>
          `${p.name} | Rent: ₹${p.rentPrice || "N/A"}/day | Buy: ₹${p.price}`,
      )
      .join("\n");

    const productSystemPrompt = `
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

    const result = await callAI(productSystemPrompt, cleanMessage);

    if (!result) {
      return res.status(503).json({
        reply:
          "Sorry, I'm having trouble generating a response right now. Please try again later.",
      });
    }

    return res.json({
      reply: result.reply,
      model: result.model,
      products: products.map((p) => p._id),
    });
  } catch (error) {
    console.error("Unexpected error in /chat:", error.message);
    return res
      .status(500)
      .json({ error: "An unexpected error occurred. Please try again." });
  }
});

router.post("/save", saveChat);
router.get("/:userId", getChatHistory);
router.delete("/:userId", deleteChats);

export default router;
