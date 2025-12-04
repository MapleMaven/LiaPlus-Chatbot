import React, { useRef, useEffect } from 'react'
import MessageBubble from './MessageBubble'

export default function ChatInterface({ 
  messages, 
  onSendMessage, 
  isLoading,
  onEndConversation 
}) {
  const [inputValue, setInputValue] = React.useState('')
  const messagesEndRef = useRef(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (inputValue.trim() && !isLoading) {
      onSendMessage(inputValue)
      setInputValue('')
    }
  }

  return (
    <div className="h-screen flex flex-col bg-slate-50">
      {/* Header */}
      <header className="p-4 shadow-md bg-white flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-800">LiaPlus Chatbot</h1>
        <button
          onClick={onEndConversation}
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
          disabled={messages.length === 0}
        >
          End Conversation
        </button>
      </header>

      {/* Messages Area - Scrollable */}
      <main className="flex-1 overflow-auto p-4">
        <div className="max-w-3xl mx-auto">
          {messages.length === 0 ? (
            <div className="text-center text-slate-400 mt-20">
              <p className="text-lg">Start a conversation with LiaPlus!</p>
            </div>
          ) : (
            messages.map((msg) => (
              <MessageBubble
                key={msg.id}
                text={msg.text}
                sender={msg.sender}
                sentiment={msg.sentiment}
              />
            ))
          )}
          
          {/* Typing Indicator */}
          {isLoading && (
            <div className="flex justify-start mb-4">
              <div className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg rounded-bl-none">
                <span className="text-sm">Typing...</span>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Input Area - Fixed Bottom */}
      <footer className="p-4 bg-white border-t">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type a message..."
              disabled={isLoading}
            />
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:bg-blue-300"
              disabled={isLoading || !inputValue.trim()}
            >
              Send
            </button>
          </div>
        </form>
      </footer>
    </div>
  )
}
