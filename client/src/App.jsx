import React from 'react'
import ChatInterface from './components/ChatInterface'
import SummaryModal from './components/SummaryModal'

export default function App() {
  // Placeholder props for now - will implement state in Step 3
  const mockMessages = []
  const mockSendMessage = (text) => console.log('Sent:', text)
  const mockEndConversation = () => console.log('End conversation')
  
  return (
    <>
      <ChatInterface
        messages={mockMessages}
        onSendMessage={mockSendMessage}
        isLoading={false}
        onEndConversation={mockEndConversation}
      />
      <SummaryModal isOpen={false} onClose={() => {}} summary="" />
    </>
  )
}
