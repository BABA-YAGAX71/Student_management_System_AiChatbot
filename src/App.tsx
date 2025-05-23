import React from 'react';
import { Sidebar } from './components/Sidebar';
import { ChatInterface } from './components/ChatInterface';
import { StudentProvider } from './context/StudentContext';

function App() {
  return (
    <StudentProvider>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <ChatInterface />
        </div>
      </div>
    </StudentProvider>
  );
}

export default App;