# LiaPlus Chatbot - Sentiment Analysis Chatbot

A Full-Stack sentiment analysis chatbot that provides **real-time message-level sentiment detection** (Tier 2) and **AI-powered conversation summaries** (Tier 1).

## 🎯 Features

- **Dual-Tier Sentiment Analysis Architecture:**
  - **Tier 2 (Local):** Instant message-level sentiment analysis using VADER
  - **Tier 1 (Cloud):** Context-aware conversation summary using Google Gemini AI
- **Real-time Chat Interface** with sentiment badges
- **Human-like Typing Delays** for natural conversation flow
- **End Conversation Analysis** with emotional journey insights
- **Modern UI** built with React + Tailwind CSS
- **RESTful API** with FastAPI backend

## 🏗️ Architecture

### Tech Stack

**Frontend:**
- React 18 (Vite)
- Tailwind CSS
- Axios for API calls

**Backend:**
- Python 3.x
- FastAPI
- VADER Sentiment Analysis (Local)
- Google Gemini 2.5 Flash (Cloud)
- Uvicorn server

### Project Structure

```
LiaPlus-Chatbot/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── MessageBubble.jsx    # Individual message with sentiment badge
│   │   │   ├── ChatInterface.jsx    # Main chat UI
│   │   │   └── SummaryModal.jsx     # Conversation analysis modal
│   │   ├── App.jsx                   # Main app with API integration
│   │   └── index.css                 # Tailwind styles
│   └── package.json
│
├── server/                 # Python FastAPI Backend
│   ├── main.py            # API endpoints (/chat, /analyze)
│   ├── services.py        # Sentiment analysis logic (VADER + Gemini)
│   ├── requirements.txt   # Python dependencies
│   └── .env.example       # Environment variables template
│
└── README.md
```

## 🚀 Setup Instructions

### Prerequisites

- Node.js (v18+)
- Python 3.x
- Google Gemini API Key ([Get one here](https://makersuite.google.com/app/apikey))

### 1. Clone the Repository

```bash
git clone https://github.com/MapleMaven/LiaPlus-Chatbot.git
cd LiaPlus-Chatbot
```

### 2. Backend Setup

```bash
# Navigate to server directory
cd server

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
.\venv\Scripts\Activate.ps1
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Configure environment variables
cp .env.example .env
# Edit .env and add your GEMINI_API_KEY
```

### 3. Frontend Setup

```bash
# Navigate to client directory (from root)
cd client

# Install dependencies
npm install
```

## 🎮 Running the Application

### Start Backend Server

```bash
cd server
# Activate venv first (see above)
uvicorn main:app --reload --port 8000
```

Backend will run on: `http://localhost:8000`

### Start Frontend Development Server

```bash
cd client
npm run dev
```

Frontend will run on: `http://localhost:5173`

Open your browser and visit `http://localhost:5173`

## 📡 API Endpoints

### POST `/chat`

Process user message with instant sentiment analysis.

**Request:**
```json
{
  "text": "I love this chatbot!"
}
```

**Response:**
```json
{
  "bot_text": "I'm glad you're in a good mood! How can I help you today?",
  "sentiment": "Positive"
}
```

### POST `/analyze`

Analyze entire conversation with AI-powered insights.

**Request:**
```json
{
  "history": [
    {"id": 1, "text": "Hello!", "sender": "user", "sentiment": null},
    {"id": 2, "text": "Hi there!", "sender": "bot", "sentiment": "Positive"}
  ]
}
```

**Response:**
```json
{
  "summary": "The user's emotional journey shows consistent positive engagement..."
}
```

## 🧠 How It Works

### Tier 2: Instant Sentiment (VADER)

1. User types a message
2. Backend receives message via `/chat` endpoint
3. VADER analyzes sentiment locally (< 100ms)
4. Returns bot response with sentiment label
5. Frontend displays message with colored sentiment badge

**Logic:**
- Compound score > 0.05 → Positive (Green badge)
- Compound score < -0.05 → Negative (Red badge)
- Otherwise → Neutral (Gray badge)

### Tier 1: Conversation Analysis (Gemini)

1. User clicks "End Conversation"
2. Frontend sends full message history to `/analyze` endpoint
3. Backend formats conversation as transcript
4. Gemini 2.5 Flash analyzes emotional journey, patterns, and overall sentiment
5. Returns comprehensive summary
6. Frontend displays in modal popup

## 🎨 UI Features

- **Auto-scroll** to latest messages
- **Sentiment badges** on bot messages (color-coded)
- **Typing indicator** during bot response
- **Human-like delays** (800-2000ms) for realistic feel
- **Responsive design** with Tailwind CSS
- **Clean, modern interface**

## 🔒 Security Notes

- `.env` file is gitignored (never commit API keys)
- CORS configured for `localhost:5173` only
- API key stored server-side only

## 📝 Development Notes

This project follows a **modular architecture** with strict separation between:
- **UI Layer** (React components)
- **API Layer** (FastAPI endpoints)
- **Service Layer** (Sentiment analysis logic)

**Key Design Decisions:**
- VADER for speed (Tier 2: real-time feedback)
- Gemini for accuracy (Tier 1: deep analysis)
- In-memory storage (suitable for 2-day sprint)
- Rule-based bot responses (focus on sentiment architecture)

## 🚧 Future Enhancements

- [ ] Persistent storage (MongoDB/PostgreSQL)
- [ ] User authentication
- [ ] Conversation history management
- [ ] More intelligent bot responses using Gemini for each message
- [ ] Export conversation analysis as PDF
- [ ] Multi-language sentiment support

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Built by Kaushik as part of the LiaPlus internship assessment.

---

**Note:** This is a demonstration project showcasing dual-tier sentiment analysis architecture. The focus is on the technical implementation of VADER (local) and Gemini (cloud) integration rather than conversational AI.