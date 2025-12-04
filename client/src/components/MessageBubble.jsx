import React from 'react'

export default function MessageBubble({ text, sender, sentiment }) {
  const isUser = sender === 'user'
  
  const getSentimentColor = () => {
    if (!sentiment) return 'bg-gray-200 text-gray-700'
    switch (sentiment.toLowerCase()) {
      case 'positive':
        return 'bg-green-100 text-green-700'
      case 'negative':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-gray-200 text-gray-700'
    }
  }

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[70%] ${isUser ? 'order-2' : 'order-1'}`}>
        <div
          className={`px-4 py-2 rounded-lg ${
            isUser
              ? 'bg-blue-600 text-white rounded-br-none'
              : 'bg-gray-200 text-gray-800 rounded-bl-none'
          }`}
        >
          <p className="text-sm">{text}</p>
        </div>
        
        {/* Sentiment Badge (Tier 2 Feature) */}
        {sentiment && !isUser && (
          <div className="mt-1">
            <span
              className={`inline-block text-xs px-2 py-1 rounded-full ${getSentimentColor()}`}
            >
              {sentiment}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
