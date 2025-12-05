import React, { useState } from 'react'
import axios from 'axios'
import ChatInterface from './components/ChatInterface'
import SummaryModal from './components/SummaryModal'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

export default function App() {
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [showSummary, setShowSummary] = useState(false)
  const [summary, setSummary] = useState('')
  const [nextId, setNextId] = useState(1)

  const sendMessage = async (text) => {
    // Add user message immediately
    const userMessage = {
      id: nextId,
      text: text,
      sender: 'user',
      sentiment: null,
    }
    setMessages((prev) => [...prev, userMessage])
    setNextId(nextId + 1)

    // Call backend API
    setIsLoading(true)
    try {
      const response = await axios.post(`${API_BASE_URL}/chat`, { text })
      
      // Random typing delay (800-2000ms) for human-like feel
      const typingDelay = Math.floor(Math.random() * 1201) + 800
      await new Promise(resolve => setTimeout(resolve, typingDelay))
      
      const botMessage = {
        id: nextId + 1,
        text: response.data.bot_text,
        sender: 'bot',
        sentiment: response.data.sentiment,
      }
      setMessages((prev) => [...prev, botMessage])
      setNextId(nextId + 2)
    } catch (error) {
      console.error('Error sending message:', error)
      // Fallback bot message on error
      const errorMessage = {
        id: nextId + 1,
        text: 'Sorry, I encountered an error. Please try again.',
        sender: 'bot',
        sentiment: 'Neutral',
      }
      setMessages((prev) => [...prev, errorMessage])
      setNextId(nextId + 2)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEndConversation = async () => {
    setShowSummary(true)
    setSummary('Analyzing conversation...')
    
    try {
      const response = await axios.post(`${API_BASE_URL}/analyze`, {
        history: messages
      })
      
      // Calculate sentiment statistics
      const sentimentCounts = { Positive: 0, Negative: 0, Neutral: 0 }
      messages.forEach(msg => {
        if (msg.sender === 'bot' && msg.sentiment) {
          sentimentCounts[msg.sentiment] = (sentimentCounts[msg.sentiment] || 0) + 1
        }
      })
      
      const statsText = `\n\n📊 Sentiment Statistics:\n• ${sentimentCounts.Positive} Positive messages\n• ${sentimentCounts.Negative} Negative messages\n• ${sentimentCounts.Neutral} Neutral messages\n• Total: ${messages.length} messages exchanged`
      
      setSummary(response.data.summary + statsText)
    } catch (error) {
      console.error('Error analyzing conversation:', error)
      setSummary('Sorry, I could not analyze the conversation. Please ensure the backend server is running.')
    }
  }

  const handleCloseSummary = () => {
    setShowSummary(false)
  }

  const handleNewConversation = () => {
    setMessages([])
    setNextId(1)
    setShowSummary(false)
    setSummary('')
  }

  return (
    <>
      <ChatInterface
        messages={messages}
        onSendMessage={sendMessage}
        isLoading={isLoading}
        onEndConversation={handleEndConversation}
      />
      <SummaryModal
        isOpen={showSummary}
        onClose={handleCloseSummary}
        summary={summary}
        onNewConversation={handleNewConversation}
      />
    </>
  )
}
