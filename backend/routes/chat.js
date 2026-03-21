import express from "express";
import axios from "axios";
import Product from "../models/Product.js";
import process from "process";
import { saveChat, getChatHistory, deleteChats } from "../Controllers/chatController.js";
import { removeStopwords, eng } from "stopword";
import { validateToken } from "../middleware/auth.js";
import { roles } from "../middleware/roles.js";

const router = express.Router();
const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const models = [
  "meta-llama/llama-3.3-70b-instruct:free",
  "nousresearch/hermes-3-llama-3.1-405b:free",
  "google/gemma-3-27b-it:free",
  "mistralai/mistral-7b-instruct:free",
  "qwen/qwen3-235b-a22b:free",
  "stepfun/step-3.5-flash:free",
];

const callAI = async (systemPrompt, userMessage) => {
  for (const model of models) {
    try {
      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model,
          max_tokens: 500,
          temperature: 0.7,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userMessage },
          ] ,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
          },
          timeout: 10000,
        }
      );

      const aiReply = response.data?.choices?.[0]?.message?.content?.trim();
      if (!aiReply) {
        console.warn(`Model ${model} returned empty reply, trying next...`);
        continue;
      }
      return { reply: aiReply, model };
    } catch (modelError) {
      const status = modelError.response?.status;
      const reason = modelError.response?.data?.error?.message || modelError.message;
      console.warn(`Model ${model} failed [${status || "timeout"}]: ${reason}`);
      await new Promise((r) => setTimeout(r, 300));
    }
  }
  return null;
};

const classifyIntent = async (message) => {
  const result = await callAI(
    `You are an intent classifier for a shopping chatbot called PurpleRabbit.
Classify the user message into exactly ONE of these labels:
- greeting       → hi, hello, hey, good morning, etc.
- general_question → questions about how the platform works, categories, about PurpleRabbit
- product_search → user wants to find or browse a product
- rent_intent    → user explicitly wants to rent something (mentions "rent", "for a day", "for an event", "wedding", "occasion")
- buy_intent     → user explicitly wants to buy/purchase/keep something

Reply with ONLY the label. No punctuation. No explanation.`,
    message
  );
  const label = result?.reply?.trim().toLowerCase();
  const valid = ["greeting", "general_question", "product_search", "rent_intent", "buy_intent"];
  return valid.includes(label) ? label : "product_search";
};

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ error: "Message is required" });
    }

    if (!process.env.OPENROUTER_API_KEY) {
      return res.status(500).json({ error: "Server misconfiguration: missing API key" });
    }

    const cleanMessage = message.trim().toLowerCase().slice(0, 500);

    const intent = await classifyIntent(cleanMessage);
    console.log(`Intent classified as: ${intent}`);

    if (intent === "greeting") {
      return res.json({
        reply: "Hello! I'm PurpleRabbit AI. I can help you find products to buy or rent. What are you looking for today?",
        products: [],
      });
    }

    if (intent === "general_question") {
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
        return res.status(503).json({ reply: "Sorry, I'm having trouble responding right now. Please try again later." });
      }
      return res.json({ reply: result.reply, model: result.model, products: [] });
    }

    const intentHint =
      intent === "rent_intent" ? "The user wants to RENT. Recommend renting." :
      intent === "buy_intent"  ? "The user wants to BUY. Recommend buying." :
      "Ask or infer whether they want to rent or buy.";

    const intentWords = ["looking", "searching", "find", "show", "give", "get", "need", "want", "please", "rent", "buy"];
    const customStopwords = [...eng, ...intentWords];

    const keywords = removeStopwords(cleanMessage.split(" "), customStopwords).filter(
      (word) => word.length > 2
    );

    if (!keywords.length) {
      return res.json({
        reply: "Could you be more specific? Try something like 'red kurti', 'men kurtha', or 'kids dress'.",
        products: [],
      });
    }

    let products;
    try {
      const regexPattern = keywords.map(escapeRegex).join("|");
      products = await Product.find({
        $or: [
          { name:        { $regex: regexPattern, $options: "i" } },
          { category:    { $regex: regexPattern, $options: "i" } },
          { description: { $regex: regexPattern, $options: "i" } },
        ],
      }).limit(5);
    } catch (dbError) {
      console.error("Database error:", dbError.message);
      return res.status(500).json({ error: "Failed to fetch products. Please try again." });
    }

    if (!products.length) {
      return res.json({
        reply: "Sorry, we don't have that item yet on PurpleRabbit. You can explore our collections for Men, Women, Kids and Home.",
        products: [],
      });
    }

    const productList = products
      .map((p) => `${p.name} | Rent: ₹${p.rentPrice || "N/A"}/day | Buy: ₹${p.price}`)
      .join("\n");

    const productSystemPrompt = `
You are PurpleRabbit AI, a smart shopping assistant.
PurpleRabbit is an e-commerce + rental platform.

Available products:
${productList}

Intent hint: ${intentHint}

Your goals:
- Help users decide whether to RENT or BUY based on the intent hint
- Recommend the best products from the list
- Be friendly and persuasive
- Keep answers short (2-3 sentences max)

Rules:
- Suggest 2-3 products maximum
- Always end with a friendly call to action
`;

    const result = await callAI(productSystemPrompt, cleanMessage);
    if (!result) {
      return res.status(503).json({
        reply: "Sorry, I'm having trouble generating a response right now. Please try again later.",
      });
    }

    return res.json({
      reply: result.reply,
      model: result.model,
      products: products.map((p) => p._id),
    });

  } catch (error) {
    console.error("Unexpected error in /chat:", error.message);
    return res.status(500).json({ error: "An unexpected error occurred. Please try again." });
  }
});

router.post("/save", validateToken, roles("user", "admin"), saveChat);
router.get("/:userId", validateToken, roles("user", "admin"), getChatHistory);
router.delete("/:userId", validateToken, roles("user", "admin"), deleteChats);

export default router;