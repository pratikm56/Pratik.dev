require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { Groq } = require('groq-sdk');

const app = express();
const PORT = process.env.PORT || 5000;

// ==========================================
// 1. MIDDLEWARE
// ==========================================
// Allows your frontend to communicate with your backend
app.use(cors());
// Allows your server to read JSON data from frontend requests
app.use(express.json());

// ==========================================
// 2. DATABASE CONNECTION
// ==========================================
// Uses the environment variable to keep your password safe!
const MONGO_URI = process.env.MONGO_URI;

if (MONGO_URI) {
    mongoose.connect(MONGO_URI)
        .then(() => console.log('✅ Successfully connected to MongoDB Atlas'))
        .catch((err) => console.error('❌ MongoDB connection error:', err.message));
} else {
    console.warn('⚠️ No MONGO_URI found. Database is NOT connected.');
}

// ==========================================
// 3. SAFE MODEL IMPORTS
// ==========================================
// This try-catch prevents the server from crashing if the file name is misspelled
let Contact;
try {
    // Note: In Linux/Render, 'Contact.js' and 'contact.js' are completely different!
    Contact = require('./models/Contact'); 
} catch (error) {
    console.warn('⚠️ Could not find ./models/Contact.js. Check your spelling or folder structure.');
}

// ==========================================
// 4. AI ASSISTANT SETUP (GROQ)
// ==========================================
let groq;
if (process.env.GROQ_API_KEY) {
    groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
} else {
    console.warn('⚠️ No GROQ_API_KEY found. AI Chatbot will return errors.');
}

// ==========================================
// 5. ROUTES
// ==========================================

// Basic health check route
app.get('/', (req, res) => {
    res.send('Server is active and running.');
});

// AI Chatbot Route
app.post('/chat', async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ error: "Message is required" });
        }

        if (!groq) {
            return res.status(500).json({ error: "AI service is currently unconfigured on the server." });
        }

        // Call the Groq API
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: "You are an AI Assistant for a developer's portfolio. Be concise, professional, and helpful." },
                { role: "user", content: message }
            ],
            model: "llama3-8b-8192", // Standard fast model; change if you prefer another
        });

        const aiResponse = chatCompletion.choices[0]?.message?.content || "I couldn't process that.";
        
        // Send the response back to the frontend
        res.status(200).json({ response: aiResponse });

    } catch (error) {
        console.error("AI Chat Route Error:", error.message);
        // This triggers the 500 error in your frontend, safely showing the "Unable to connect" UI
        res.status(500).json({ error: "Unable to connect to AI server." });
    }
});

// ==========================================
// 6. START SERVER
// ==========================================
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});