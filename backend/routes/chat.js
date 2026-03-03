import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  if (!process.env.OPENROUTER_API_KEY) {
    return res.status(500).json({ error: "API key missing" });
  }

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "nvidia/nemotron-nano-9b-v2",
        max_tokens: 300,
        temperature: 0.7,
        messages: [
          {
            role: "system",
            content: `
You are a smart sales assistant for PurpleRabbit.
PurpleRabbit is an e-commerce + rental platform.
Help users decide whether to rent or buy.
Be persuasive but friendly.
Always suggest relevant products.
End with a call to action.
`,
          },
          { role: "user", content: message },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    res.json({
      reply: response.data.choices[0].message.content,
    });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "AI error" });
  }
});

export default router;
