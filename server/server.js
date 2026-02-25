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


/* ---------------- Server ---------------- */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port", PORT));