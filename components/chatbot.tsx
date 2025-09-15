"use client";

import { useState, useRef, useEffect } from "react";

type ChatMessage = {
  id: string;
  role: "user" | "bot";
  text: string;
};

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: "m1", role: "bot", text: "Hi! I'm Softcode Assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const [isLoading, setIsLoading] = useState(false);

  const send = async () => {
    const text = input.trim();
    if (!text) return;
    
    const userMsg: ChatMessage = { id: String(Date.now()), role: "user", text };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: text }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      
      if (data.error) {
        console.error('API Error:', data.error, data.details);
        throw new Error(data.error);
      }
      
      setMessages((m) => [
        ...m,
        {
          id: String(Date.now() + 1),
          role: "bot",
          text: data.response || "I'm sorry, I couldn't process your request. Please try again.",
        },
      ]);
    } catch (error) {
      console.error('Chatbot error:', error);
      setMessages((m) => [
        ...m,
        {
          id: String(Date.now() + 1),
          role: "bot",
          text: "I'm sorry, I'm having trouble connecting right now. Please try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Toggle Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="shadow-lg rounded-full bg-green-600 hover:bg-green-700 text-white h-14 w-14 flex items-center justify-center border-2 border-white"
          aria-label="Open chat"
        >
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a4 4 0 0 1-4 4H7l-4 4V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"/></svg>
        </button>
      )}

      {/* Chat Panel */}
      {open && (
        <div className="w-[340px] sm:w-[380px] h-[480px] bg-white rounded-2xl border-2 border-b-4 overflow-hidden shadow-xl flex flex-col">
          {/* Header */}
          <div className="bg-green-600 text-white px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="/mascot.svg" alt="Assistant" className="h-7 w-7 rounded" />
              <div>
                <div className="font-semibold">Softcode Assistant</div>
                <div className="text-xs text-white/80">Online now</div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/90 hover:text-white">✕</button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 space-y-3 bg-gray-50 overflow-y-auto">
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`${
                    m.role === "user"
                      ? "bg-green-600 text-white"
                      : "bg-white text-neutral-800 border"
                  } max-w-[80%] rounded-2xl px-3 py-2 text-sm shadow-sm`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white text-neutral-800 border max-w-[80%] rounded-2xl px-3 py-2 text-sm shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-xs text-gray-500">AI is thinking...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Quick actions */}
          <div className="px-3 pb-2 pt-1 bg-gray-50 flex gap-2 flex-wrap">
            {["Course help", "Explain code", "Fix an error"].map((q) => (
              <button
                key={q}
                onClick={() => !isLoading && setInput(q)}
                disabled={isLoading}
                className="text-xs rounded-full border px-3 py-1 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Composer */}
          <div className="p-2 border-t bg-white flex items-center gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !isLoading && send()}
              disabled={isLoading}
              placeholder="Type your message..."
              className="flex-1 rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 disabled:bg-gray-100"
            />
            <button
              onClick={send}
              disabled={isLoading}
              className="rounded-md bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-3 py-2 text-sm font-semibold"
            >
              {isLoading ? 'Sending...' : 'Send'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 