const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

/* ---------------- CORS (VERY IMPORTANT) ---------------- */
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

/* ---------------- MongoDB Connection ---------------- */
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("MongoDB Error:", err));

/* ---------------- Contact Model ---------------- */
const Contact = require("./models/Contact");

/* ---------------- Home Route ---------------- */
app.get("/", (req, res) => {
  res.send("Portfolio Backend Running");
});

/* ---------------- CONTACT ROUTE ---------------- */
app.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success:false, msg:"All fields required" });
    }

    const newMessage = new Contact({
      name,
      email,
      message
    });

    await newMessage.save();

    console.log("New Contact Message Saved:", name);

    res.status(200).json({
      success: true,
      msg: "Message saved successfully"
    });

  } catch (error) {
    console.error("Contact Error:", error);
    res.status(500).json({
      success:false,
      msg:"Server Error"
    });
  }
});

/* ---------------- CHATBOT ROUTE ---------------- */

const Groq = require("groq-sdk");

// IMPORTANT: check if key exists
const GROQ_KEY = process.env.GROQ_API_KEY;

if (!GROQ_KEY) {
  console.log("❌ GROQ_API_KEY NOT FOUND in environment variables");
}

const groq = new Groq({
  apiKey: GROQ_API_KEY
});

app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    if (!userMessage) {
      return res.status(400).json({
        reply: "Please type a message."
      });
    }

    console.log("User message:", userMessage);

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `
You are Pratik's personal AI portfolio assistant.

About Pratik:
- MERN Stack Developer
- Location: Bengaluru, India
- Skills: React, Node.js, MongoDB, JavaScript, Java, Python

Projects:
1. FilmyAdda - OTT movie website
2. TextFlow - Text formatting tool
3. FlappyBird - Python game

If someone asks contact:
Email: pratikmungaravadi8296@gmail.com

Speak professionally and concisely.
`
        },
        {
          role: "user",
          content: userMessage
        }
      ],

      model: "llama3-70b-8192",
      temperature: 0.7,
      max_tokens: 500
    });

    const reply = completion.choices[0].message.content;

    console.log("AI reply generated");

    res.status(200).json({
      reply: reply
    });

  } catch (error) {

    // THIS WILL SHOW THE REAL ERROR IN RENDER LOGS
    console.error("🔥 GROQ ERROR:");
    console.error(error);

    // Instead of crashing frontend, send safe message
    res.status(200).json({
      reply: "AI server is starting... please try again in 20 seconds ⏳"
    });
  }
});

/* ---------------- Server ---------------- */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port", PORT));