const express = require("express");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const Groq = require("groq-sdk");
require("dotenv").config();

const app = express();

/* ------------------ CORS FIX (Vercel + Localhost) ------------------ */
const allowedOrigins = [
  "http://localhost:3000",
  "https://pratik-dev.vercel.app" // <-- replace if your vercel link is different
];

const cors = require("cors");

app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://pratik-dev-five.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

/* ------------------ MongoDB Connection ------------------ */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("MongoDB Connection Error:", err));

/* ------------------ Contact Model ------------------ */
const Contact = require("./models/Contact");

/* ------------------ Email Setup (Render Compatible) ------------------ */
const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

transporter.verify((error, success) => {
  if (error) {
    console.log("SMTP ERROR:", error);
  } else {
    console.log("Email server ready");
  }
});

/* ------------------ Contact Route ------------------ */
app.post("/Contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const newContact = new Contact({ name, email, message });
    await newContact.save();

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "New Portfolio Contact Message",
      html: `
        <h3>New Message from Portfolio</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b><br/> ${message}</p>
      `
    });

    res.json({ msg: "Message sent successfully" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server Error" });
  }
});

/* ------------------ GROQ AI Chatbot ------------------ */
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `
You are a professional AI assistant for Pratik, a MERN Stack Developer.

Details:
Name: Pratik
Location: Bengaluru, India
Skills: Java, JavaScript, React, Node.js, MongoDB, Python

Projects:
1. FilmyAdda - OTT movie web app
2. TextFlow - Text formatting tool
3. FlappyBird - Python game

Contact Email: pratikmungaravadi8296@gmail.com

Answer politely and professionally like a personal portfolio assistant.
          `
        },
        {
          role: "user",
          content: userMessage
        }
      ],
      model: "llama-3.3-70b-versatile"
    });

    const reply = completion.choices[0].message.content;
    res.json({ reply });

  } catch (error) {
    console.log("Groq error:", error);
    res.status(500).json({ reply: "AI server error" });
  }
});

/* ------------------ Health Route (Important for Render) ------------------ */
app.get("/", (req, res) => {
  res.send("Portfolio Server Running");
});

/* ------------------ Server Start ------------------ */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});