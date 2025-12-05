import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_root_endpoint():
    """Test the root endpoint returns correct message"""
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "LiaPlus Backend API is running"}

def test_health_check():
    """Test the health check endpoint"""
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "healthy"}

def test_chat_endpoint_positive_sentiment():
    """Test chat endpoint with positive message"""
    response = client.post(
        "/chat",
        json={"text": "I love this chatbot!"}
    )
    assert response.status_code == 200
    data = response.json()
    assert "bot_text" in data
    assert "sentiment" in data
    assert data["sentiment"] == "Positive"

def test_chat_endpoint_negative_sentiment():
    """Test chat endpoint with negative message"""
    response = client.post(
        "/chat",
        json={"text": "I hate this."}
    )
    assert response.status_code == 200
    data = response.json()
    assert "bot_text" in data
    assert "sentiment" in data
    assert data["sentiment"] == "Negative"

def test_chat_endpoint_neutral_sentiment():
    """Test chat endpoint with neutral message"""
    response = client.post(
        "/chat",
        json={"text": "The weather is cloudy."}
    )
    assert response.status_code == 200
    data = response.json()
    assert "bot_text" in data
    assert "sentiment" in data
    assert data["sentiment"] == "Neutral"

def test_analyze_endpoint():
    """Test analyze endpoint with conversation history"""
    response = client.post(
        "/analyze",
        json={
            "history": [
                {"id": 1, "text": "Hello!", "sender": "user", "sentiment": None},
                {"id": 2, "text": "Hi there!", "sender": "bot", "sentiment": "Positive"}
            ]
        }
    )
    assert response.status_code == 200
    data = response.json()
    assert "summary" in data
    assert isinstance(data["summary"], str)
    assert len(data["summary"]) > 0

def test_chat_endpoint_invalid_request():
    """Test chat endpoint with missing text field"""
    response = client.post("/chat", json={})
    assert response.status_code == 422  # Validation error
