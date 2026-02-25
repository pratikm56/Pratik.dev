// 1️⃣ IMPORTS
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const nodemailer = require("nodemailer");

const Groq = require("groq-sdk");
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// 2️⃣ APP
const app = express();

// 3️⃣ MIDDLEWARE
const cors = require("cors");

app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://pratik-dev.vercel.app"
  ],
  methods: ["GET", "POST"],
  credentials: true
}));

// 4️⃣ TEST ROUTE
app.get("/", (req, res) => {
  res.send("Portfolio Server Running");
});

// 5️⃣ DATABASE CONNECTION
console.log("ENV VALUE =>", process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("MongoDB Connection Error:", err));

// EMAIL TRANSPORTER
const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});
transporter.verify((error, success) => {
  if (error) {
    console.log("SMTP ERROR:", error);
  } else {
    console.log("Email server ready");
  }
});

// 6️⃣ IMPORT MODEL
const Contact = require("./models/Contact");

// 7️⃣ CONTACT ROUTE
app.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Save to database
    const newContact = new Contact({ name, email, message });
    await newContact.save();

    // Send email notification
    const mailOptions = {
  from: `"Pratik Portfolio" <${process.env.EMAIL_USER}>`,
  to: process.env.EMAIL_USER,
  replyTo: email,
  subject: `New message from ${name}`,
  html: `
    <h2>New Portfolio Contact</h2>
    <p><b>Name:</b> ${name}</p>
    <p><b>Email:</b> ${email}</p>
    <p><b>Message:</b></p>
    <p>${message}</p>
    <hr/>
    <p>You can directly reply to this email to contact them.</p>
  `,
};

    await transporter.sendMail(mailOptions);
    console.log("EMAIL SENT SUCCESSFULLY");

    res.json({ msg: "Message sent and email delivered!" });

  } catch (error) {
    console.log("Mail error:", error);
    res.status(500).json({ msg: "Error sending message" });
  }
});

// 8️⃣ START SERVER (ALWAYS LAST)


app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const completion = await groq.chat.completions.create({
      messages: [
        {
        role: "system",
        content: `
        You are Pratik's portfolio AI assistant.

        STRICT RULES:
        - Answer in MAXIMUM 3 short sentences.
        - Do NOT write paragraphs.
        - Keep replies under 70 words.
        - Be direct and professional.
        - If explanation is long, summarize it.
        `
        },
        {
          role: "user",
          content: userMessage
        }
      ],
      model: "llama-3.1-8b-instant",
        temperature: 0.7,
            max_tokens: 150
    });

    res.json({
      reply: completion.choices[0].message.content
    });

  } catch (error) {
    console.log("Groq error:", error);
    res.status(500).json({ reply: "AI server error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));