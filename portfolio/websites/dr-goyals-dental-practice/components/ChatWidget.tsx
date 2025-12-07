import React, { useState, useRef, useEffect } from 'react';
import { MessageCircleIcon, XIcon, SendIcon } from './Icons';
import { ChatMessage, ChatRole } from '../types';
import { sendChatMessage } from '../services/geminiService';

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => setIsOpen(!isOpen);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Listen for custom open event
  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-chat', handleOpen);
    return () => window.removeEventListener('open-chat', handleOpen);
  }, []);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: ChatRole.USER, text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const response = await sendChatMessage(messages, input);
    
    setMessages(prev => [...prev, { role: ChatRole.MODEL, text: response }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 bg-white border border-gray-200 shadow-2xl rounded-lg overflow-hidden flex flex-col h-[500px]">
          <div className="bg-black text-white p-4 flex justify-between items-center">
            <h3 className="font-serif italic tracking-wide">Sanya - Dr. Goyal's Dental Practice</h3>
            <button onClick={toggleChat} className="hover:text-gray-300">
              <XIcon />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-gray-400 mt-20 text-sm">
                <p>Welcome to Dr. Goyal's Dental Practice.</p>
                <p>How may I assist you today?</p>
              </div>
            )}
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === ChatRole.USER ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-lg text-sm ${msg.role === ChatRole.USER ? 'bg-black text-white' : 'bg-gray-200 text-black'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-200 text-black p-3 rounded-lg text-xs animate-pulse">
                  Thinking...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 border-t bg-white flex items-center gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask a question..."
              className="flex-1 bg-transparent outline-none text-sm p-2"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="p-2 text-black hover:bg-gray-100 rounded-full disabled:opacity-50"
            >
              <SendIcon />
            </button>
          </div>
        </div>
      )}
      
      {/* Floating button only visible when chat is closed AND not triggered by footer usually, but keeping it as alternative access */}
      {!isOpen && (
        <button 
          onClick={toggleChat}
          className="bg-black hover:bg-gray-800 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-105 hidden"
        >
          <MessageCircleIcon />
        </button>
      )}
    </div>
  );
};
