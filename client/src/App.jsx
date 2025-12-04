import React, { useState } from 'react'
import ChatInterface from './components/ChatInterface'
import SummaryModal from './components/SummaryModal'

export default function App() {
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [showSummary, setShowSummary] = useState(false)
  const [summary, setSummary] = useState('')
  const [nextId, setNextId] = useState(1)

  // Mock sentiment responses
  const getMockSentiment = () => {
    const sentiments = ['Positive', 'Negative', 'Neutral']
    return sentiments[Math.floor(Math.random() * sentiments.length)]
  }

  // Mock bot responses
  const getMockBotResponse = (userMessage) => {
    const responses = [
      "That's interesting! Tell me more.",
      "I understand how you feel.",
      "How does that make you feel?",
      "Can you elaborate on that?",
      "I see what you mean.",
      "That's a great point!",
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  const sendMessage = (text) => {
    // Add user message immediately
    const userMessage = {
      id: nextId,
      text: text,
      sender: 'user',
      sentiment: null,
    }
    setMessages((prev) => [...prev, userMessage])
    setNextId(nextId + 1)

    // Simulate bot typing and response
    setIsLoading(true)
    setTimeout(() => {
      const sentiment = getMockSentiment()
      const botMessage = {
        id: nextId + 1,
        text: getMockBotResponse(text),
        sender: 'bot',
        sentiment: sentiment,
      }
      setMessages((prev) => [...prev, botMessage])
      setNextId(nextId + 2)
      setIsLoading(false)
    }, 1000)
  }

  const handleEndConversation = () => {
    // Mock summary generation
    setShowSummary(true)
    const mockSummary = `Conversation Summary:\n\nYou exchanged ${messages.length} messages during this conversation. The bot detected various emotional tones throughout the chat. This is a mock analysis that will be replaced with AI-powered insights in the backend integration phase.\n\nOverall Sentiment: Mixed\nKey Topics: General conversation\nEmotional Journey: The conversation showed varied emotional responses.`
    setSummary(mockSummary)
  }

  const handleCloseSummary = () => {
    setShowSummary(false)
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
      />
    </>
  )
}
