import React from 'react';
import { ChatMessage } from '../types';
import { FileText } from 'lucide-react';

interface ChatMessageItemProps {
  message: ChatMessage;
}

export const ChatMessageItem: React.FC<ChatMessageItemProps> = ({ message }) => {
  const isAI = message.sender === 'ai';
  
  return (
    <div className={`flex ${isAI ? 'justify-start' : 'justify-end'}`}>
      <div 
        className={`max-w-[75%] rounded-2xl px-4 py-2 ${
          isAI 
            ? 'bg-white border border-gray-200 text-gray-800' 
            : 'bg-indigo-600 text-white'
        } shadow-sm animate-fade-in-up`}
      >
        <div className="mb-1 text-sm">
          {message.content}
        </div>
        
        {message.attachments && message.attachments.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {message.attachments.map((attachment, index) => (
              <div 
                key={index} 
                className={`flex items-center space-x-1 text-xs px-2 py-1 rounded ${
                  isAI ? 'bg-gray-100' : 'bg-indigo-700'
                }`}
              >
                <FileText className="h-3 w-3" />
                <span>attachment.pdf</span>
              </div>
            ))}
          </div>
        )}
        
        <div className={`text-xs mt-1 ${isAI ? 'text-gray-500' : 'text-indigo-200'}`}>
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};