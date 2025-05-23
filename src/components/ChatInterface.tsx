import React, { useState, useRef, useEffect } from 'react';
import { Paperclip, Send } from 'lucide-react';
import { ChatMessage } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { generateAIResponse } from '../utils/aiResponse';
import { ChatMessageItem } from './ChatMessageItem';

export const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: "👋 Hi there! I'm your EduAssist AI. How can I help you manage your students today?",
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: uuidv4(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking and typing
    setTimeout(async () => {
      const aiResponse = await generateAIResponse(inputValue);
      
      const aiMessage: ChatMessage = {
        id: uuidv4(),
        content: aiResponse,
        sender: 'ai',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b bg-white shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800">Student Management Assistant</h2>
        <p className="text-sm text-gray-500">Ask me anything about student management</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <ChatMessageItem key={message.id} message={message} />
        ))}
        
        {isTyping && (
          <div className="flex items-center space-x-2 text-gray-500">
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <span className="text-sm">AI is typing...</span>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t bg-white p-4">
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <button
            type="button"
            className="p-2 rounded-full text-gray-500 hover:text-indigo-600 hover:bg-gray-100 transition-colors"
            aria-label="Attach file"
          >
            <Paperclip className="h-5 w-5" />
          </button>
          
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 rounded-full border border-gray-300 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          
          <button
            type="submit"
            disabled={!inputValue.trim()}
            className={`p-2 rounded-full ${
              inputValue.trim()
                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                : 'bg-gray-200 text-gray-400'
            } transition-colors`}
            aria-label="Send message"
          >
            <Send className="h-5 w-5" />
          </button>
        </form>
        
        <div className="mt-3 flex flex-wrap gap-2">
          {['List all students', 'Add new student', 'Search for a student', 'Show academic reports'].map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => setInputValue(suggestion)}
              className="text-xs px-3 py-1.5 bg-gray-100 text-gray-800 rounded-full hover:bg-indigo-100 hover:text-indigo-800 transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};