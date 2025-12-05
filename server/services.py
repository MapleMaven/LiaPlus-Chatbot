import os
from dotenv import load_dotenv
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
import google.generativeai as genai

# Load environment variables
load_dotenv()

# Initialize VADER
vader_analyzer = SentimentIntensityAnalyzer()

# Initialize Gemini
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)


def analyze_message(text: str) -> dict:
    """
    Tier 2: Local sentiment analysis using VADER.
    
    Args:
        text: The message text to analyze
        
    Returns:
        dict with 'score' (float) and 'label' (str: Positive/Negative/Neutral)
    """
    scores = vader_analyzer.polarity_scores(text)
    compound_score = scores['compound']
    
    # Determine sentiment label based on compound score
    if compound_score > 0.05:
        label = "Positive"
    elif compound_score < -0.05:
        label = "Negative"
    else:
        label = "Neutral"
    
    return {
        "score": compound_score,
        "label": label
    }


def analyze_conversation(history: list) -> str:
    """
    Tier 1: Cloud-based conversation analysis using Gemini.
    
    Args:
        history: List of message objects with 'text', 'sender', 'sentiment' fields
        
    Returns:
        str: Summary text from Gemini LLM
    """
    if not GEMINI_API_KEY:
        return "Gemini API key not configured. Please add GEMINI_API_KEY to .env file."
    
    # Convert history to a readable transcript
    transcript_lines = []
    for msg in history:
        sender = msg.get('sender', 'unknown').capitalize()
        text = msg.get('text', '')
        transcript_lines.append(f"{sender}: {text}")
    
    transcript = "\n".join(transcript_lines)
    
    # Craft the prompt for Gemini
    prompt = f"""You are an empathetic AI assistant analyzing a conversation between a user and a chatbot.

Read this conversation transcript:

{transcript}

Please provide a comprehensive analysis including:
1. A summary of the user's emotional journey throughout the conversation
2. The overall sentiment (Positive, Negative, Neutral, or Mixed)
3. Key topics or themes discussed
4. Any notable emotional shifts or patterns

Provide your analysis in a clear, empathetic tone."""
    
    try:
        # Use Gemini 2.5 Flash model
        model = genai.GenerativeModel('gemini-2.5-flash')
        response = model.generate_content(prompt)
        
        # Clean up markdown formatting for natural text
        text = response.text
        # Remove markdown headers (##, ###, etc)
        import re
        text = re.sub(r'^#+\s*', '', text, flags=re.MULTILINE)
        # Remove bold/italic markers (**text**, *text*)
        text = re.sub(r'\*\*([^*]+)\*\*', r'\1', text)
        text = re.sub(r'\*([^*]+)\*', r'\1', text)
        
        return text
    except Exception as e:
        return f"Error generating analysis: {str(e)}"
