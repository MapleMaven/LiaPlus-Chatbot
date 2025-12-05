from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from services import analyze_message, analyze_conversation
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="LiaPlus Backend API")

# CORS configuration to allow requests from frontend (localhost:5173)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request/Response Models
class ChatRequest(BaseModel):
    text: str

class ChatResponse(BaseModel):
    bot_text: str
    sentiment: str

class Message(BaseModel):
    id: int
    text: str
    sender: str
    sentiment: Optional[str] = None

class AnalyzeRequest(BaseModel):
    history: List[Message]

class AnalyzeResponse(BaseModel):
    summary: str

@app.get("/")
async def root():
    return {"message": "LiaPlus Backend API is running"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """
    Process user message and return bot response with sentiment analysis.
    
    Tier 2: Uses VADER for instant message-level sentiment analysis.
    """
    # Analyze sentiment using VADER (Tier 2)
    sentiment_result = analyze_message(request.text)
    
    # Generate bot response based on sentiment
    label = sentiment_result["label"]
    
    # Simple rule-based responses based on sentiment
    if label == "Positive":
        bot_responses = [
            f"I see you are feeling {label}! That's wonderful to hear.",
            "Your positive energy is great! Tell me more.",
            "I'm glad you're in a good mood! How can I help you today?"
        ]
    elif label == "Negative":
        bot_responses = [
            f"I sense you are feeling {label}. I'm here to listen.",
            "I understand this might be difficult. Would you like to talk about it?",
            "I'm sorry you're going through this. How can I support you?"
        ]
    else:  # Neutral
        bot_responses = [
            "I see. Tell me more about that.",
            "Interesting. What else would you like to share?",
            "I'm listening. Please continue."
        ]
    
    # Pick first response (can be randomized)
    import random
    bot_text = random.choice(bot_responses)
    
    return ChatResponse(
        bot_text=bot_text,
        sentiment=label
    )

@app.post("/analyze", response_model=AnalyzeResponse)
async def analyze(request: AnalyzeRequest):
    """
    Analyze the entire conversation and generate a summary.
    
    Tier 1: Uses Gemini API for context-aware conversation analysis.
    """
    # Convert Pydantic models to dicts for the service layer
    history_dicts = [msg.model_dump() for msg in request.history]
    
    # Call Gemini analysis (Tier 1)
    summary_text = analyze_conversation(history_dicts)
    
    return AnalyzeResponse(summary=summary_text)
