# 🚀 BEYOND-CHATS  
AI-Powered Blog Enhancement Platform

Beyond Chats is a full-stack application that scrapes blog articles, enhances them using Large Language Models (LLMs), and displays both the **original** and **AI-rewritten** versions for comparison.

The project demonstrates real-world backend scraping, AI content generation, secure API handling, and a clean frontend comparison UI.

---

## ✨ Features

- Scrape articles from external blogs
- Store original articles in a Laravel backend
- Fetch related articles using Google Search (SerpAPI)
- Rewrite content using LLMs (OpenAI / Groq)
- Save AI-generated content separately from original
- View **Original vs Updated (AI)** articles in the frontend
- Secure handling of environment variables (no secrets committed)

---

## 🧱 Tech Stack

### Backend
- Laravel (PHP)
- RESTful APIs (CRUD)
- MySQL
- Artisan commands for scraping

### AI / Processing Layer
- Node.js (ES Modules)
- Cheerio (HTML parsing)
- SerpAPI (Google Search)
- OpenAI / Groq (LLM-based rewriting)

### Frontend
- React
- Tailwind CSS
- Tab-based UI for Original vs Updated articles

---

## 🖥️ Local Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/hardik0777/BEYOND-CHATS.git
cd BEYOND-CHATS

###2️⃣ Backend (Laravel) Setup
cd beyondchats-backend
composer install
cp .env.example .env
php artisan key:generate


##Update .env with your database credentials:
DB_DATABASE=beyondchats
DB_USERNAME=root
DB_PASSWORD=


##Run migrations:
php artisan migrate
Start the backend server:
php artisan serve


Backend will run at: http://127.0.0.1:8000

###3️⃣ AI Service (Node.js) Setup
cd ../beyondchats-ai
npm install

##Create a .env file:
OPENAI_API_KEY=your_openai_key
GROQ_API_KEY=your_groq_key
SERP_API_KEY=your_serpapi_key
BACKEND_API=http://127.0.0.1:8000/api


Run the AI processing service: node src/index.js

###4️⃣ Frontend Setup
cd ../beyondchats-frontend
npm install
npm run dev


Frontend will run at:http://localhost:5173

###🔄 Data Flow / Architecture Diagram
┌────────────┐
│  Frontend  │
│  (React)   │
└─────┬──────┘
      │  Fetch Articles
      ▼
┌────────────┐
│  Laravel   │
│  Backend   │
│  (API)     │
└─────┬──────┘
      │  Send Articles
      ▼
┌────────────┐
│ Node.js AI │
│ Processor  │
│            │
│ - SerpAPI  │
│ - Cheerio  │
│ - LLMs     │
└─────┬──────┘
      │  Updated Content
      ▼
┌────────────┐
│  Laravel   │
│  Backend   │
│ (Save AI)  │
└─────┬──────┘
      │
      ▼
┌────────────┐
│  Frontend  │
│ Original ↔ │
│ Updated    │
└────────────┘

###🗄️ Database Design (Simplified)

articles table
->id
->title
->slug
->url
->content (original article)
->updated_content (AI-rewritten article)
->published_at
->created_at
->updated_at

###🌐 Live Demo
🔗 Frontend Live URL
https://your-frontend-live-link.vercel.app

##You can check:

->Original scraped article
->AI-rewritten updated article
->Tab-based comparison UI

Replace the URL above with your deployed frontend link (Vercel / Netlify).

###🔐 Security Notes

->.env files are ignored using .gitignore
->API keys are never committed
->GitHub secret scanning enabled
->Clean git history with no leaked secrets

###📈 Future Enhancements

->Article version history
->Citation and reference highlighting
->Plagiarism detection
->User authentication
->Admin dashboard
->AI rewrite quality scoring

###👨‍💻 Author
Hardik
Full-Stack Developer | AI Enthusiast

###⭐ Final Note

->This project demonstrates:
->Full-stack system design
->Real-world web scraping
->Secure AI integration
->Production-ready Git practices
