const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const nodemailer = require("nodemailer");
const Groq = require("groq-sdk");
require("dotenv").config();

const app = express();

/* ================= CORS (FINAL FIX) =================
   Allows your Vercel site + localhost
   Also prevents browser blocking requests
*/
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://pratik-dev-five.vercel.app"
  ],
  methods: ["GET", "POST"],
  credentials: true
}));

app.use(express.json());

/* ================= MongoDB ================= */

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("MongoDB Error:", err));

/* ================= Contact Model ================= */

const Contact = require("./models/contact");

/* ================= Email Setup ================= */

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

transporter.verify((error) => {
  if (error) {
    console.log("SMTP ERROR:", error);
  } else {
    console.log("Email server ready");
  }
});

/* ================= Contact Route ================= */

app.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Save to MongoDB
    const newContact = new Contact({ name, email, message });
    await newContact.save();

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "New Portfolio Contact Message",
      html: `
        <h2>New Contact Message</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b><br>${message}</p>
      `
    });

    res.json({ msg: "Message sent successfully" });

  } catch (err) {
    console.log("Contact Error:", err);
    res.status(500).json({ msg: "Server Error" });
  }
});

/* ================= GROQ AI CHATBOT ================= */

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
You are Pratik's professional AI portfolio assistant.

Your job:
Help recruiters understand his skills and projects quickly.

About Pratik:
Location: Bengaluru, India
Role: MERN Stack Developer

Skills:
React, Node.js, Express.js, MongoDB, JavaScript, Java, Python, Tailwind CSS, REST APIs, Git/GitHub, Deployment

Projects:
1. AI Portfolio Website (with chatbot)
2. FilmyAdda movie web app
3. TextFlow formatting tool
4. FlappyBird Python game

Contact Email: pratikmungaravadi8296@gmail.com

Rules:
- Keep answers short (3-5 lines)
- Be professional and polite
- Encourage recruiter to contact him
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
    console.log("Groq Error:", error);
    res.status(500).json({ reply: "AI server error" });
  }
});

/* ================= Health Check Route ================= */

app.get("/", (req, res) => {
  res.send("Portfolio Server Running");
});

/* ================= Start Server ================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});