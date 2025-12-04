import React from 'react'

export default function App() {
  return (
    <div className="h-screen flex flex-col bg-slate-50">
      <header className="p-4 shadow-md bg-white">
        <h1 className="text-xl font-semibold">LiaPlus</h1>
      </header>

      <main className="flex-1 overflow-auto p-4">
        {/* Chat area will go here */}
        <div className="text-center text-slate-400">Chat UI will appear here.</div>
      </main>

      <footer className="p-4 bg-white">
        <div className="flex gap-2">
          <input className="flex-1 px-3 py-2 border rounded" placeholder="Type a message..." />
          <button className="px-4 py-2 bg-blue-600 text-white rounded">Send</button>
        </div>
      </footer>
    </div>
  )
}
