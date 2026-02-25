🌐 Pratik.dev — Personal Portfolio Website
A full-stack developer portfolio built using the MERN Stack to showcase my projects, technical skills, and contact details.
🔗 Live Website: https://pratik-dev-five.vercel.app
🔗 Backend API: https://pratik-dev.onrender.com

👨‍💻 About Me
Hi, I'm Pratik Mungarwadi, a Full Stack Web Developer passionate about building responsive web applications and solving real-world problems using modern technologies.
This portfolio highlights:

My projects
Skills & technologies
Education
Contact form with database storage


🚀 Tech Stack
Frontend

React.js
Tailwind CSS
Axios
Responsive UI/UX

Backend

Node.js
Express.js
MongoDB Atlas
Mongoose

Deployment

Frontend → Vercel
Backend → Render
Database → MongoDB Atlas


✨ Features

Fully responsive portfolio website
Smooth scrolling navigation
Hero, About, Skills, Projects, Education & Contact sections
Contact form connected to MongoDB database
Messages stored securely in database
SEO optimized (OpenGraph preview supported)
Social preview image when sharing link


📂 Project Structure
Pratik.dev
│
├── client/     (React Frontend)
│   ├── src/
│   └── public/
│
├── server/     (Node + Express Backend)
│   ├── models/
│   └── server.js
│
└── README.md


⚙️ Installation & Setup (Local Development)
1️⃣ Clone Repository
git clone https://github.com/pratikm56/Pratik.dev.git
cd Pratik.dev


2️⃣ Setup Backend
cd server
npm install

Create .env file inside server:
MONGO_URI=your_mongodb_connection_string
PORT=5000

Run backend:
node server.js


3️⃣ Setup Frontend
cd ../client
npm install
npm start

Website runs at:
http://localhost:3000


📬 Contact Form
The contact form sends data to the backend API:
POST /contact

The message is stored in MongoDB Atlas and confirmed on the UI.

🌍 Deployment



Service
Purpose




Vercel
Frontend Hosting


Render
Backend API Hosting


MongoDB Atlas
Database




🔐 Environment Variables
Create server/.env
MONGO_URI=your_mongodb_atlas_uri

⚠️ Do NOT upload .env to GitHub.

📸 Social Preview
The file:
client/public/preview.png

is used for WhatsApp, LinkedIn and social media preview cards.

🧠 What I Learned

Full MERN stack integration
REST API creation
MongoDB database handling
CORS & deployment debugging
Production deployment (Render + Vercel)
Environment variables & security
SEO & OpenGraph configuration


📌 Future Improvements

Admin dashboard to view messages
Blog section
Resume download analytics
Authentication system


🙌 Acknowledgement
Built with dedication and continuous learning.
Made with ❤️ by Pratik Mungarwadi
